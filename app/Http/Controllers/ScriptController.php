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
                ->through(fn($s) => [
                    'id' => $s->id,
                    'keyword' => $s->keyword,
                    'prompt' => $s->script,
                    'created_at' => $s->created_at->format('d M Y'),
                ])
            : null;

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

        if (!is_array($decodedIdeas) || count($decodedIdeas) === 0 || !isset($decodedIdeas[0]['Title'])) {
            throw new Exception('AI returned invalid idea structure');
        }

        $script = Script::create([
            'user_id' => Auth::id(),
            'keyword' => $validated['keyword'],
            'idea'    => $decodedIdeas,
        ]);

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
        // Log::info('Request Data:', $request->all());

        $validated = $request->validate([
            'script_id' => 'required|exists:scripts,id',
            'title' => 'required|string',
        ]);

        try {
            $script = Script::where('id', $validated['script_id']) // Use validated data
                ->where('user_id', Auth::id())
                ->firstOrFail();

            // 2. Use $validated['title'] to ensure it's not null
            $rawStory = $this->aiService->generateStory($validated['title']);

            $decodedStory = json_decode($rawStory, true);

            $script->update([
                'title' => $validated['title'],
                'story' => $decodedStory,
            ]);

            return response()->json([
                'success' => true,
                'story' => $decodedStory['sections'] ?? [],
            ]);
        } catch (Exception $e) {
            // This will now catch structural errors or AI failures
            Log::error('Story generation failed: ' . $e->getMessage());
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
            Log::error('Script generation failed: '.$e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to generate script.'], 500);
        }
    }

}
