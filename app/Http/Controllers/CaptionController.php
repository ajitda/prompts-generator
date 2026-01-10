<?php

namespace App\Http\Controllers;

use App\Models\Caption;
use App\Services\AIService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class CaptionController extends Controller
{
    public function __construct(protected AIService $aiService)
    {
    }

    public function index(Request $request)
    {
        $isAuthenticated = Auth::check();
        $fingerprint = $request->header('X-Browser-Fingerprint');

        $captionsQuery = Caption::latest();

        if ($isAuthenticated) {
            $user = Auth::user();
            $captionsQuery->where(function ($query) use ($user, $fingerprint) {
                $query->where('user_id', $user->id)
                    ->orWhere('fingerprint', $fingerprint);
            });
        } else {
            $captionsQuery->where('fingerprint', $fingerprint);
        }

        $guestCredits = session('guest_credits', 5);
        $userCredits = $isAuthenticated ? Auth::user()->credits : 0;

        $captions = $captionsQuery->paginate(10);

        return Inertia::render('captions/index', [
            'captions' => $captions,
            'isAuthenticated' => $isAuthenticated,
            'initialGuestCredits' => $isAuthenticated ? null : $guestCredits,
            'userCredits' => $isAuthenticated ? $userCredits : null,
        ]);
    }

    public function generate(Request $request): JsonResponse
    {
        $isAuthenticated = Auth::check();
        $user = Auth::user();
        $fingerprint = $request->header('X-Browser-Fingerprint');

        // Credit check
        if ($isAuthenticated) {
            if ($user->credits <= 0) {
                return response()->json(['success' => false, 'message' => 'You have no credits left.'], 403);
            }
        } else {
            $guestCredits = session('guest_credits', 5);
            if ($guestCredits <= 0) {
                return response()->json(['success' => false, 'message' => 'You have no guest credits left. Please sign up to get more.'], 403);
            }
        }

        $validated = $request->validate([
            'topic' => 'required|string|min:2|max:255',
        ]);

        try {
            $rawCaptions = $this->aiService->generateCaptions($validated['topic']);
            $decodedCaptions = json_decode($rawCaptions, true, 512, JSON_THROW_ON_ERROR);

            $caption = Caption::create([
                'user_id' => $isAuthenticated ? $user->id : null,
                'fingerprint' => $fingerprint,
                'topic' => $validated['topic'],
                'content' => $decodedCaptions,
            ]);

            // Credit deduction
            if ($isAuthenticated) {
                $user->decrement('credits');
            } else {
                session(['guest_credits' => $guestCredits - 1]);
            }

            // Invalidate cache
            if ($isAuthenticated) {
                Cache::forget("sidebar_menu_user_{$user->id}");
            } else {
                Cache::forget("sidebar_menu_guest_{$fingerprint}");
            }

            return response()->json([
                'success' => true,
                'caption_id' => $caption->id,
                'captions' => $decodedCaptions,
            ]);
        } catch (Exception $e) {
            Log::error('Caption generation failed', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Failed to generate captions.'], 500);
        }
    }

    public function show(Caption $caption)
    {
        $isAuthenticated = Auth::check();

        return Inertia::render('captions/show', [
            'caption' => $caption,
            'isAuthenticated' => $isAuthenticated,
        ]);
    }
}