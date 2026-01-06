<?php

namespace App\Http\Controllers;

use App\Models\Script;
use App\Models\User;
use App\Services\AIService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ScriptController extends Controller
{
    public function __construct(protected AIService $aiService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) // Inject Request to get fingerprint
    {
        $isAuthenticated = Auth::check();
        $fingerprint = $request->fingerprint(); // Get the current fingerprint

        $scriptsQuery = Script::latest();

        if ($isAuthenticated) {
            $user = Auth::user(); // Ensure $user is defined when authenticated
            $scriptsQuery->where(function ($query) use ($user, $fingerprint) {
                $query->where('user_id', $user->id)
                      ->orWhere('fingerprint', $fingerprint);
            });
        } else {
            // For non-authenticated users, only show scripts matching their current fingerprint
            $scriptsQuery->where('fingerprint', $fingerprint);
        }

        $scripts = $scriptsQuery->paginate(10)
            ->withQueryString()
            ->through(fn($s) => [
                'id' => $s->id,
                'keyword' => $s->keyword,
                'prompt' => $s->script,
                'created_at' => $s->created_at->format('d M Y'),
            ]);

        return Inertia::render('scripts/index', [
            'scripts' => $scripts,
            'isAuthenticated' => $isAuthenticated,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Script $script)
    {
        if ($script->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('scripts/show', [
            'script' => $script
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Script $script)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Script $script)
    {
        if ($script->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'idea' => 'nullable|array',
            'title' => 'nullable|string|max:255',
            'story' => 'nullable|array',
            'script' => 'nullable|array',
        ]);

        $script->update($validated);

        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Script $script)
    {
        try {
            if ($script->user_id !== Auth::id()) {
                return redirect()->back()->with('error', 'Unauthorized action.');
            }

            $script->delete();

            return redirect()->route('scripts.index')
                ->with('success', 'Script deleted successfully.');
        } catch (Exception $e) {
            Log::error('Script deletion failed: ' . $e->getMessage());

            return redirect()->back()
                ->with('error', 'Failed to delete script.');
        }
    }

    public function getCredits(): JsonResponse
    {
        $user = Auth::user();
        return response()->json(['credits' => $user ? $user->credits : 0]);
    }


    /**
     * STEP 2 – Generate ideas from keyword
     */
   public function generateIdeas(Request $request): JsonResponse
    {
        $isAuthenticated = Auth::check();
        $user = Auth::user(); // Defined here for consistent access
        $fingerprint = request()->fingerprint();
        Log::info('Fingerprint from request()->fingerprint(): ' . $fingerprint);
        Log::info('Is Authenticated: ' . ($isAuthenticated ? 'true' : 'false'));
        if ($isAuthenticated) {
            Log::info('Authenticated User ID: ' . $user->id);
        }


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
            $rawIdeas = $this->aiService->generateIdeas($validated['keyword']);

            // Trim whitespace
            $trimmed = trim($rawIdeas);

            // Check if it's multiple top-level objects not inside an array
            if (str_starts_with($trimmed, '{')) {
                // Match all objects individually
                preg_match_all('/\{.*?\}(?=\s*,\s*|$)/s', $trimmed, $matches);

                if (!empty($matches[0])) {
                    // Wrap them in an array
                    $rawIdeas = '[' . implode(',', $matches[0]) . ']';
                }
            }

            // Decode JSON safely
            $decodedIdeas = json_decode($rawIdeas, true, 512, JSON_THROW_ON_ERROR);

            $script = Script::create([
                'user_id' => $isAuthenticated ? $user->id : null,
                'fingerprint' => $fingerprint, // Always store fingerprint, regardless of authentication
                'keyword' => $validated['keyword'],
                'idea'    => $decodedIdeas,
            ]);

            // credit deduction here, before return
            if ($isAuthenticated) {
                $user->decrement('credits');
            } else {
                session(['guest_credits' => $guestCredits - 1]);
            }

            return response()->json([
                'success'   => true,
                'script_id' => $script->id,
                'ideas'     => $decodedIdeas,
            ]);
        } catch (\JsonException $e) {
            Log::error('JSON decode failed', [
                'raws' => $rawIdeas ?? null,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'AI returned malformed JSON.'
            ], 500);
        } catch (Exception $e) {
            Log::error('Idea generation failed', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to generate ideas.'
            ], 500);
        }
    }



    /**
     * STEP 3 – Generate story sections
     */
    public function generateStory(Request $request): JsonResponse
    {
        $isAuthenticated = Auth::check();
        $user = Auth::user();
        $fingerprint = request()->fingerprint();

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
            'script_id' => 'required|exists:scripts,id',
            'title' => 'required|string',
        ]);

        try {
            $scriptQuery = Script::where('id', $validated['script_id']);

            if ($isAuthenticated) {
                $scriptQuery->where('user_id', $user->id);
            } else {
                $scriptQuery->where('fingerprint', $fingerprint);
            }

            $script = $scriptQuery->firstOrFail();

            $rawStory = $this->aiService->generateStory($validated['title']);
            $decodedStory = json_decode($rawStory, true);

            $script->update([
                'title' => $validated['title'],
                'story' => $decodedStory,
            ]);

            // Credit deduction
            if ($isAuthenticated) {
                $user->decrement('credits');
            } else {
                session(['guest_credits' => $guestCredits - 1]);
            }

            return response()->json([
                'success' => true,
                'story' => $decodedStory['sections'] ?? [],
            ]);
        } catch (Exception $e) {
            Log::error('Story generation failed: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to generate story.'], 500);
        }
    }

    /**
     * STEP 4 – Generate final video script
     */
    public function generateScript(Request $request): JsonResponse
    {
        $isAuthenticated = Auth::check();
        $user = Auth::user();
        $fingerprint = request()->fingerprint();

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
            'script_id' => 'required|exists:scripts,id',
            'title' => 'required|string',
        ]);

        try {
            $scriptQuery = Script::where('id', $validated['script_id']);

            if ($isAuthenticated) {
                $scriptQuery->where('user_id', $user->id);
            } else {
                $scriptQuery->where('fingerprint', $fingerprint);
            }

            $script = $scriptQuery->firstOrFail();

            if (empty($script->story)) {
                return response()->json(['success' => false, 'message' => 'Story context missing.'], 422);
            }

            // Passing previous data to AI for context
            $rawScript = $this->aiService->generateScript($script->title, json_encode($script->story));
            $decodedScript = json_decode($rawScript, true);

            $script->update([
                'script' => $decodedScript,
            ]);

            // Credit deduction
            if ($isAuthenticated) {
                $user->decrement('credits');
            } else {
                session(['guest_credits' => $guestCredits - 1]);
            }


            if (!$decodedScript) {
                Log::error('AI Service returned invalid JSON: ' . $rawScript);
                return response()->json(['success' => false, 'message' => 'Invalid AI response.'], 500);
            }

            return response()->json([
                'success' => true,
                'script' => $decodedScript['script'] ?? '',
                'tone' => $decodedScript['tone'] ?? 'Neutral', // Provide a fallback
            ]);
        } catch (Exception $e) {
            Log::error('Script generation failed: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to generate script.'], 500);
        }
    }
}
