<?php

namespace App\Http\Controllers;

use App\Models\Prompt;
use App\Services\AIService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PromptController extends Controller
{
    public function __construct(protected AIService $aiService){}

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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dump($request->all());
        $validated = $request->validate([
            'keyword' => 'required|string|max:255',
            'prompt' => 'required|string',
        ], [
            'keyword.required' => 'Keyword is required.',
            'keyword.max' => 'Keyword must not exceed 255 characters.',
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

    public function generate(Request $request): JsonResponse
    {
        $request->validate(['keyword' => 'required|string|max:255']);

        try {
            $content = $this->aiService->generatePrompt($request->keyword);
            
            return response()->json([
                'success' => true,
                'prompt' => $content
            ]);
        } catch (Exception $e) {
            report($e); // Logs the error automatically
            return response()->json(['message' => 'AI Generation failed'], 500);
        }
        // $validated = $request->validate([
        //     'keyword' => 'required|string|max:255',
        // ]);

        // $apiKey = config('services.aiKey.api_key');
        // // Ensure the full model path for OpenRouter is used
        // $model = 'google/gemini-2.0-flash-001';
        // $apiUrl = "https://openrouter.ai/api/v1/chat/completions";

        // try {
        //     $response = Http::withHeaders([
        //         'Authorization' => 'Bearer ' . $apiKey,
        //         'Content-Type' => 'application/json',
        //         // Optional but recommended for OpenRouter tracking
        //         'HTTP-Referer' => config('app.url'),
        //     ])->post($apiUrl, [
        //                 'model' => $model,
        //                 'messages' => [
        //                     [
        //                         'role' => 'user',
        //                         'content' => "Generate a creative prompt for: " . $validated['keyword']
        //                     ]
        //                 ]
        //             ]);

        //     if ($response->successful()) {
        //         $responseData = $response->json();

        //         // Extract the generated text from the response
        //         $generatedText = $responseData['choices'][0]['message']['content'] ?? null;

        //         session([
        //             'keyword' => $validated['keyword'],
        //             'ai_response' => $generatedText
        //         ]);
                
        //         return response()->json([
        //             'success' => true,
        //             'prompt' => $generatedText, // Return the clean text
        //             'raw' => $responseData,  // Useful for debugging
        //         ]);
        //     }

        //     return response()->json([
        //         'success' => false,
        //         'message' => 'API request failed.',
        //         'error' => $response->json(),
        //     ], $response->status());

        // } catch (Exception $e) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Exception: ' . $e->getMessage(),
        //     ], 500);
        // }
    }

}
