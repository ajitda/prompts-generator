<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Exception;

class AIService
{
    protected $providers = [
        \App\Services\AI\GeminiProvider::class,
        \App\Services\AI\OpenRouterProvider::class,
        \App\Services\AI\GroqProvider::class,
        \App\Services\AI\HuggingFaceProvider::class,
    ];

    /**
     * Existing prompt generator (unchanged)
     */
    public function generatePrompt(string $keyword): string
    {
        return $this->runProviders('generatePrompt', $keyword);
    }

    /**
     * STEP 2 – Generate video ideas
     */
    public function generateIdeas(string $keyword): string
    {
        $prompt = <<<PROMPT
            Generate 5 professional video content ideas for the keyword: "{$keyword}"

            Constraints:
            - Target audience: Working professionals
            - Tone: Professional, practical
            - Duration: 60–90 seconds
            - Each idea must include:
            - Title
            - Core message
            - Value to the viewer
            PROMPT;

        return $this->runProviders('generate', $prompt);
    }

    /**
     * STEP 3 – Generate story
     */
    public function generateStory(string $title): string
    {
        $prompt = <<<PROMPT
            Create a compelling story for a professional video based on this idea:

            Title: "{$title}"

            Story structure:
            1. Hook (first 5 seconds)
            2. Problem
            3. Solution
            4. Real-world example
            5. Closing insight

            Tone: Confident, professional
            PROMPT;

        return $this->runProviders('generate', $prompt);
    }

    /**
     * STEP 4 – Generate final video script
     */
    public function generateScript(string $story): string
    {
        $prompt = <<<PROMPT
            Convert the following story into a professional video script.

            Requirements:
            - Conversational but professional
            - Short sentences
            - Clear pacing
            - Suitable for voice-over
            - 60–90 seconds

            Story:
            {$story}
            PROMPT;

        return $this->runProviders('generate', $prompt);
    }

    /**
     * Shared provider fallback logic
     */
    protected function runProviders(string $method, string $payload): string
    {
        foreach ($this->providers as $providerClass) {
            $providerName = class_basename($providerClass);

            try {
                $provider = app($providerClass);

                $result = $provider->$method($payload);

                Log::info("AI_FALLBACK: Success using {$providerName} ({$method}).");

                return $result;

            } catch (Exception $e) {
                Log::warning("AI_FALLBACK: {$providerName} failed ({$method}). Error: " . $e->getMessage());
                continue;
            }
        }

        throw new Exception('All AI providers exhausted.');
    }
}
