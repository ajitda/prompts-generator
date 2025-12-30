<?php

namespace App\Http\Controllers;

use App\Models\Prompt;
use App\Services\AIService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PromptController extends Controller
{
    public function __construct(protected AIService $aiService) {}

    public function index()
    {
        $paginatedPrompts = Auth::check()
            ? Prompt::where('user_id', Auth::id())
                ->latest()
                ->paginate(10)
                ->through(fn($p) => [
                    'id' => $p->id,
                    'keyword' => $p->keyword,
                    'prompt' => $p->prompt,
                    'created_at' => $p->created_at->format('d M Y'),
                ])
            : null;

        return Inertia::render('prompts/index', [
            'promptsList' => $paginatedPrompts,
            'isAuthenticated' => Auth::check(),
        ]);
    }

    public function create(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'keyword' => 'required|string|max:255|min:2',
        ], [
            'keyword.required' => 'Please enter a keyword or topic.',
            'keyword.min' => 'Keyword must be at least 2 characters.',
            'keyword.max' => 'Keyword must not exceed 255 characters.',
        ]);

        try {
            $prompt = $this->generate( $validated['keyword']);

            return response()->json([
                'success' => true,
                'prompt' => $prompt,
            ]);
        } catch (Exception $e) {
            Log::error('Error generating prompt: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate prompt. Please try again.',
            ], 500);
        }
    }

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
        if ($prompt->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('prompts/show', [
            'prompt' => $prompt,
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
        $request->validate(['keyword' => 'required|string|max:255']);
        
        
        try {
            $content = $this->aiService->generatePrompt($request->keyword);
            
            session([
                'last_keyword' => $request->keyword,
                'ai_response' => $content
            ]);
            
            return response()->json([
                'success' => true,
                'prompt' => $content
            ]);
        } catch (Exception $e) {
            report($e); // Logs the error automatically
            return response()->json(['message' => 'AI Generation failed'], 500);
        }
    }
}
