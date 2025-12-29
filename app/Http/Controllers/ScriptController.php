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
     * STEP 2 – Generate ideas from keyword
     */
    public function generateIdeas(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'keyword' => 'required|string|min:2|max:255',
        ]);

        try {
            // Assume AI returns raw JSON string: ["Idea 1", "Idea 2"]
            $rawIdeas = $this->aiService->generateIdeas($validated['keyword']);
            $decodedIdeas = json_decode($rawIdeas, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('Invalid JSON format from AI Service');
            }

            $script = Script::create([
                'user_id' => Auth::id(),
                'keyword' => $validated['keyword'],
                'idea'    => $decodedIdeas, // Pass array, Laravel casts to JSON
            ]);

            return response()->json([
                'success'   => true,
                'script_id' => $script->id,
                'ideas'     => $decodedIdeas,
            ]);
        } catch (Exception $e) {
            Log::error('Idea generation failed: '.$e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to generate ideas.'], 500);
        }
    }

    /**
     * STEP 3 – Generate story sections
     */
    public function generateStory(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'script_id' => 'required|exists:scripts,id',
            'title'     => 'required|string|max:255',
        ]);

        try {
            $script = Script::where('id', $validated['script_id'])
                ->where('user_id', Auth::id())
                ->firstOrFail();

            $rawStory = $this->aiService->generateStory($validated['title']);
            $decodedStory = json_decode($rawStory, true);

            $script->update([
                'title' => $validated['title'],
                'story' => $decodedStory, // Stores as JSON in DB
            ]);

            return response()->json([
                'success' => true,
                // Return just the sections for the frontend loop
                'story'   => $decodedStory['sections'] ?? [], 
            ]);
        } catch (Exception $e) {
            Log::error('Story generation failed: '.$e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to generate story.'], 500);
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

            if (empty($script->story)) {
                return response()->json(['success' => false, 'message' => 'Story context missing.'], 422);
            }

            // Passing previous data to AI for context
            $rawScript = $this->aiService->generateScript($script->title, json_encode($script->story));
            $decodedScript = json_decode($rawScript, true);

            $script->update([
                'script' => $decodedScript,
            ]);

            return response()->json([
                'success' => true,
                'script'  => $decodedScript['script'] ?? '',
                'tone'    => $decodedScript['tone'] ?? '',
            ]);
        } catch (Exception $e) {
            Log::error('Script generation failed: '.$e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to generate script.'], 500);
        }
    }

}
