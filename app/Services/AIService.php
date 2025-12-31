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
        \App\Services\AI\OpenRouterProvider::class,
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
        $prompt = "Write a YouTube script for Idea: '{$selectedIdea}'. 
                   Context: {$storyContext}. 
                   Include [TIMESTAMPS] and [Stage Directions]. Tone: Conversational.
                   Return ONLY JSON: {\"script\": \"...\", \"tone\": \"...\"}";

        return $this->cleanAndRun('generate', $prompt);
    }

    public function generatePrompt(string $keyword): string
    {
        $prompt = "Write a high-quality AI prompt for: '{$keyword}'. Return ONLY a JSON object: {\"prompt\": \"...\"}";
        return $this->cleanAndRun('generate', $prompt);
    }

    /**
     * The Logic: Clean the AI response before returning it to the Controller
     */
    protected function cleanAndRun(string $method, string $payload): string
    {
        $rawResponse = $this->runProviders($method, $payload);

        // 1. Find the first occurrence of { or [ and the last occurrence of } or ]
        $firstBracket = strpos($rawResponse, '{') === false ? strpos($rawResponse, '[') : strpos($rawResponse, '{');
        $lastBracket = strrpos($rawResponse, '}') === false ? strrpos($rawResponse, ']') : strrpos($rawResponse, '}');

        if ($firstBracket === false || $lastBracket === false) {
            Log::error("AI Service returned no JSON structures: " . substr($rawResponse, 0, 100));
            throw new Exception('AI response format was invalid.');
        }

        // 2. Extract only the JSON part
        $clean = substr($rawResponse, $firstBracket, ($lastBracket - $firstBracket) + 1);
        $clean = trim($clean);

        return $clean;
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
                continue; // Move to the next provider in the array
            }
        }

        throw new Exception('All AI providers failed to generate the script.');
    }

}
