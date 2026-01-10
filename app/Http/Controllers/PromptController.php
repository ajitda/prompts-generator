<?php

namespace App\Http\Controllers;

use App\Models\Prompt;
use App\Services\AIService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache; // Added for cache invalidation
use Illuminate\Support\Facades\Log; // Already present, but good to confirm
use Inertia\Inertia;

class PromptController extends Controller
{
    public function __construct(protected AIService $aiService)
    {
    }

    public function index(Request $request)
    {
        $isAuthenticated = Auth::check();
        $fingerprint = $request->header('X-Browser-Fingerprint');

        $promptsQuery = Prompt::latest();

        if ($isAuthenticated) {
            $user = Auth::user();
            $promptsQuery->where(function ($query) use ($user, $fingerprint) {
                $query->where('user_id', $user->id)
                    ->orWhere('fingerprint', $fingerprint);
            });
        } else {
            $promptsQuery->where('fingerprint', $fingerprint);
        }

        $guestCredits = session('guest_credits', 5);
        $userCredits = $isAuthenticated ? Auth::user()->credits : 0;

        $prompts = $promptsQuery->paginate(10);

        return Inertia::render('prompts/index', [
            'prompts' => $prompts,
            'isAuthenticated' => $isAuthenticated,
            'initialGuestCredits' => $isAuthenticated ? null : $guestCredits,
            'userCredits' => $isAuthenticated ? $userCredits : null,
        ]);
    }

    // The original create method is replaced by the new generate method's functionality
    // and the store method handles saving. This method is removed as per the new structure.

    public function store(Request $request)
    {
        // dump($request->all());
        $validated = $request->validate([
            'keyword' => 'required|string|max:1000',
            'prompt' => 'required|string',
        ], [
            'keyword.required' => 'Keyword is required.',
            'prompt.required' => 'Prompt content is required.',
        ]);

        try {
            $prompt = Prompt::create([
                'user_id' => Auth::id(),
                'keyword' => $validated['keyword'],
                'prompt' => $validated['prompt'],
            ]);

            return redirect()->route('prompts.index')
                ->with('success', 'Prompt saved successfully.');
        } catch (Exception $e) {
            Log::error('Error saving prompt: ' . $e->getMessage());

            return redirect()->back()
                ->with('error', 'Failed to save prompt. Please try again.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Prompt $prompt)
    {
        $isAuthenticated = Auth::check();

        return Inertia::render('prompts/show', [
            'prompt' => $prompt,
            'isAuthenticated' => $isAuthenticated,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prompt $prompt)
    {
        if ($prompt->user_id !== Auth::id()) {
            return back()->with('error', 'Unauthorized.');
        }

        $prompt->delete();
        return redirect()->route('prompts.index')->with('success', 'Deleted.');
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
            'keyword' => 'required|string|min:2|max:255',
        ]);

        try {
            $rawPrompts = $this->aiService->generatePrompt($validated['keyword']);
            $decodedPrompts = json_decode($rawPrompts, true, 512, JSON_THROW_ON_ERROR);

            $prompt = Prompt::create([
                'user_id' => $isAuthenticated ? $user->id : null,
                'fingerprint' => $fingerprint,
                'keyword' => $validated['keyword'],
                'prompt' => $decodedPrompts,
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
                'prompt_id' => $prompt->id,
                'prompts' => $decodedPrompts,
            ]);
        } catch (Exception $e) {
            Log::error('Prompt generation failed', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Failed to generate prompts.'], 500);
        }
    }
}
