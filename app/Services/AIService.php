<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Exception;

class AIService
{
    protected $providers = [
        \App\Services\AI\GeminiProvider::class,
        \App\Services\AI\GroqProvider::class,
        \App\Services\AI\OpenRouterProvider::class,
    ];

    /**
     * Orchestrates the 4-step Video Script Process
     */
    public function generateVideoScript(string $keyword, string $audience, string $duration): string
    {
        // STEP 1: Define the structured meta-prompt
        $structuredPrompt = <<<PROMPT
            You are a professional content strategist and video script writer. 
            Follow this EXACT 4-step process to generate a high-quality video script:

            STEP 1: INTENT
            Keyword: "{$keyword}"
            Audience: "{$audience}"
            Duration: "{$duration}"

            STEP 2: IDEA GENERATION
            Generate the best professional video content idea for this keyword. 
            Include: Title, Core Message, and Value to the viewer.

            STEP 3: STORY GENERATION
            Expand that idea into a compelling story using this structure:
            1. Hook (first 5 seconds)
            2. Problem
            3. Solution
            4. Real-world example
            5. Closing insight

            STEP 4: VIDEO SCRIPT
            Convert the story into a spoken script. 
            Requirements: Conversational but professional, short sentences, suitable for voice-over, timed for {$duration}.

            Return ONLY the final result starting from STEP 2. Use clear headings and professional formatting.
            PROMPT;

        return $this->executeWithFallback($structuredPrompt);
    }

    /**
     * Handles provider failover logic
     */
    protected function executeWithFallback(string $fullPrompt): string
    {
        foreach ($this->providers as $providerClass) {
            $providerName = class_basename($providerClass);

            try {
                $provider = app($providerClass);
                $result = $provider->generate($fullPrompt);

                Log::info("AI_SERVICE: Success using {$providerName}.");
                return $result;

            } catch (Exception $e) {
                Log::warning("AI_SERVICE: {$providerName} failed: " . $e->getMessage());
                continue;
            }
        }

        throw new Exception('All AI providers failed to generate the script.');
    }
}
