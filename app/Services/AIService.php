<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Exception;

class AIService
{
    protected $providers = [
        // \App\Services\AI\GeminiProvider::class,
        \App\Services\AI\OpenRouterProvider::class,
        \App\Services\AI\GroqProvider::class,
        \App\Services\AI\HuggingFaceProvider::class,
    ];

    public function generateIdeas(string $keyword): string
    {
        $prompt = "You are a YouTube content strategist. Generate 5 unique video ideas for: '{$keyword}'. 
                   Return ONLY a raw JSON array of strings. No markdown, no preamble.";

        return $this->cleanAndRun('generate', $prompt);
    }

    public function generateStory(string $selectedIdea): string
    {
        $prompt = "Create a narrative outline for: '{$selectedIdea}'. 
                   Structure: Hook (🎣), Journey (📖), Takeaway (🎯). 
                   Return ONLY valid JSON: {\"sections\": [{\"title\": \"...\", \"content\": \"...\", \"icon\": \"...\"}]}";

        return $this->cleanAndRun('generate', $prompt);
    }

    public function generateScript(string $selectedIdea, string $storyContext): string
    {
        // $storyContext is already a JSON string from the DB
        $prompt = "Write a YouTube script for Idea: '{$selectedIdea}'. 
                   Context: {$storyContext}. 
                   Include [TIMESTAMPS] and [Stage Directions]. Tone: Conversational.
                   Return ONLY JSON: {\"script\": \"...\", \"tone\": \"...\"}";

        return $this->cleanAndRun('generate', $prompt);
    }

    /**
     * The Logic: Clean the AI response before returning it to the Controller
     */
    protected function cleanAndRun(string $method, string $payload): string
    {
        $rawResponse = $this->runProviders($method, $payload);
        
        // 1. Remove Markdown code blocks (e.g., ```json ... ```)
        $clean = preg_replace('/```(?:json)?\n?|```/', '', $rawResponse);
        
        // 2. Trim whitespace/newlines
        $clean = trim($clean);

        // 3. Validation: Check if it's actually JSON
        if (!str_starts_with($clean, '{') && !str_starts_with($clean, '[')) {
            Log::error("AI Service returned non-JSON content: " . substr($clean, 0, 100));
            throw new Exception('AI response format was invalid.');
        }

        return $clean;
    }

    /**
 * Shared provider fallback logic
 */
    protected function runProviders(string $method, string $payload): string
    {
        foreach ($this->providers as $providerClass) {
            // Get the name for logging before instantiating
            $providerName = class_basename($providerClass);

            try {
                $provider = app($providerClass);

                // Execute the AI call
                $result = $provider->$method($payload);

                // CORRECTED: Use $providerName (string) instead of $provider (object)
                Log::info("AI_FALLBACK: Success using {$providerName} ({$method}).");

                return $result;

            } catch (Exception $e) {
                Log::warning("AI_FALLBACK: {$providerName} failed ({$method}). Error: " . $e->getMessage());
                continue; // Move to the next provider in the array
            }
        }

        throw new Exception('All AI providers exhausted.');
    }

}
