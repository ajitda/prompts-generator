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
        $prompts = Auth::check() 
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
            'prompts' => $prompts,
        ]);
    }

    public function generate(Request $request)
    {
        $validated = $request->validate([
            'keyword' => 'required|string|max:255',
            'audience' => 'required|string',
            'duration' => 'required|string',
        ]);

        try {
            $content = $this->aiService->generateVideoScript(
                $validated['keyword'],
                $validated['audience'],
                $validated['duration']
            );

            // PERSISTENT STORAGE: This stays until session is cleared
            session([
                'session_data' => [
                    'savedKeyword' => $validated['keyword'],
                    'savedAudience' => $validated['audience'],
                    'savedDuration' => $validated['duration'],
                    'savedPrompt' => $content,
                ]
            ]);

            return back();
        } catch (Exception $e) {
            return back()->withErrors(['keyword' => 'AI Generation failed']);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'keyword' => 'required|string|max:1000',
            'prompt' => 'required|string',
        ]);

        Prompt::create([
            'user_id' => Auth::id(),
            'keyword' => $validated['keyword'],
            'prompt' => $validated['prompt'],
        ]);

        return redirect()->route('prompts.index')->with('success', 'Script saved.');
    }

    public function destroy(Prompt $prompt)
    {
        if ($prompt->user_id !== Auth::id()) {
            return back()->with('error', 'Unauthorized.');
        }

        $prompt->delete();
        return redirect()->route('prompts.index')->with('success', 'Deleted.');
    }
}
