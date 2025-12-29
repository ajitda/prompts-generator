<?php

namespace App\Http\Controllers;

use App\Models\Script;
use App\Services\AIService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ScriptController extends Controller
{
    public function __construct(protected AIService $aiService){}
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $scripts = Auth::check()
            ? Script::where('user_id', Auth::id())
                ->latest()
                ->paginate(10)
                ->withQueryString()
            : null;

        if ($scripts) {
            $scripts->getCollection()->transform(fn ($script) => [
                'id' => $script->id,
                'keyword' => $script->keyword,
                'title' => $script->title,
                'created_at' => $script->created_at->format('d M Y'),
            ]);
        }

        return Inertia::render('scripts/index', [
            'scripts' => $scripts,
            'isAuthenticated' => Auth::check(),
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
            'script' => $script,
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
        //
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
            Log::error('Script deletion failed: '.$e->getMessage());

            return redirect()->back()
                ->with('error', 'Failed to delete script.');
        }

    }

    /**
     * STEP 2 – Generate ideas
     */
    public function generateIdeas(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'keyword' => 'required|string|min:2|max:255',
        ]);

        try {
            $ideas = $this->aiService->generateIdeas($validated['keyword']);

            session([
                'last_keyword' => $request->keyword,
                'ideas' => $ideas
            ]);
            
            $script = Script::create([
                'user_id' => Auth::id(),
                'keyword' => $validated['keyword'],
                'idea' => $ideas,
            ]);

            return response()->json([
                'success' => true,
                'script_id' => $script->id,
                'ideas' => $ideas,
            ]);
        } catch (Exception $e) {
            Log::error('Idea generation failed: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to generate ideas.',
            ], 500);
        }
    }

    /**
     * STEP 3 – Generate story
     */
    public function generateStory(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'script_id' => 'required|exists:scripts,id',
            'title' => 'required|string|max:255',
        ]);

        try {
            $script = Script::where('id', $validated['script_id'])
                ->where('user_id', Auth::id())
                ->firstOrFail();

            $story = $this->aiService->generateStory($validated['title']);

            session([
                'last_keyword' => $request->keyword,
                'story' => $story
            ]);
            
            $script->update([
                'title' => $validated['title'],
                'story' => $story,
            ]);

            return response()->json([
                'success' => true,
                'story' => $story,
            ]);
        } catch (Exception $e) {
            Log::error('Story generation failed: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to generate story.',
            ], 500);
        }
    }

    /**
     * STEP 4 – Generate final video script
     */
    public function generateScript(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'script_id' => 'required|exists:scripts,id',
        ]);

        try {
            $script = Script::where('id', $validated['script_id'])
                ->where('user_id', Auth::id())
                ->firstOrFail();

            if (!$script->story) {
                return response()->json([
                    'success' => false,
                    'message' => 'Story is missing.',
                ], 422);
            }

            $finalScript = $this->aiService->generateScript($script->story);

            session([
                'last_keyword' => $request->keyword,
                'script' => $finalScript
            ]);
            
            $script->update([
                'script' => $finalScript,
            ]);

            return response()->json([
                'success' => true,
                'script' => $finalScript,
            ]);
        } catch (Exception $e) {
            Log::error('Script generation failed: '.$e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to generate script.',
            ], 500);
        }
    }

}
