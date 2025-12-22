<?php

namespace App\Http\Controllers;

use App\Models\Prompt;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Js;

class PromptController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $prompts = Auth::check() 
            ? Prompt::where('user_id', Auth::id())
                ->latest()
                ->paginate(10)
                ->withQueryString()
            : null;

        if ($prompts) {
            $prompts->getCollection()->transform(fn($prompt) => [
                'id' => $prompt->id,
                'type' => $prompt->type,
                'keyword' => $prompt->keyword,
                'prompt' => $prompt->prompt,
                'created_at' => $prompt->created_at->format('d M Y'),
            ]);
        }

        return Inertia::render('prompts/index', [
            'prompts' => $prompts,
            'isAuthenticated' => Auth::check(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
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
            $prompt = $this->generatePrompt( $validated['keyword']);

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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dump($request->all());
        $validated = $request->validate([
            'type' => 'required|in:image,text,video',
            'keyword' => 'required|string|max:255',
            'prompt' => 'required|string|max:2000',
        ], [
            'type.required' => 'Prompt type is required.',
            'type.in' => 'Invalid prompt type.',
            'keyword.required' => 'Keyword is required.',
            'keyword.max' => 'Keyword must not exceed 255 characters.',
            'prompt.required' => 'Prompt content is required.',
            'prompt.max' => 'Prompt must not exceed 2000 characters.',
        ]);

        try {
            $prompt = Prompt::create([
                'user_id' => Auth::id(),
                'type' => $validated['type'],
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
        //
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
        try {
            if ($prompt->user_id !== Auth::id()) {
                return redirect()->back()
                    ->with('error', 'Unauthorized action.');
            }

            $prompt->delete();

            return redirect()->route('prompts.index')
                ->with('success', 'Prompt deleted successfully.');
        } catch (Exception $e) {
            Log::error('Error deleting prompt: ' . $e->getMessage());
            
            return redirect()->back()
                ->with('error', 'Failed to delete prompt. Please try again.');
        }
    }

    public function generatePrompt(Request $request): JsonResponse
    {
        
        
        $validated = $request->validate([
            'keyword' => 'required|string|max:255',
        ]);

        $keyword = $validated['keyword'];

        $prompt = new Prompt();

        return response()->json([
            'success' => true,
            'prompt' => $prompt,
        ]);
    }
}
