<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Exception;

class AIService
{
    protected $providers = [
        \App\Services\AI\GeminiProvider::class,
        \App\Services\AI\OpenRouterProvider::class,
        // \App\Services\AI\GroqProvider::class,
    ];


    public function generateIdeas(string $keyword): string
    {
        $prompt = <<<PROMPT
You are a world-class YouTube Strategist and Scriptwriter expert in high-CTR (Click Through Rate) and high-retention content.

Task:
The user provides a Topic or Niche. Generate 5 unique, viral-worthy YouTube video ideas.

Constraints:
- Avoid generic titles like "Introduction to {$keyword}"
- Focus on How-to, Lists, Challenges, or Mistakes formats
- Titles must be under 60 characters
- Tone must be exciting, energetic, and confident
- Hook scripts must be EXACTLY 2 compelling spoken sentences
- Mix difficulty levels across ideas (Easy | Medium | Hard)

Output Format:
You must output STRICT JSON ONLY.
No explanations. No markdown. No extra text.

JSON Structure (Array of 5 objects):
[
  {
    "Title": "string (under 60 characters, curiosity-driven)",
    "Thumbnail_Concept": "string (1 vivid sentence describing the thumbnail)",
    "Hook_Script": "string (exactly 2 spoken sentences)",
    "Difficulty": "Easy | Medium | Hard"
  }
]

Topic:
"{$keyword}"

Remember:
- Titles must create curiosity and urgency
- Thumbnail concepts must be visually striking and clickable
- Hook scripts must immediately promise value or transformation
PROMPT;

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

        // Trim whitespace
        $rawResponse = trim($rawResponse);

        // If it starts with '{' and has '},{', wrap in array
        if (str_starts_with($rawResponse, '{') && str_contains($rawResponse, '},{')) {
            $rawResponse = '[' . $rawResponse . ']';
        }

        // Ensure it starts with { or [
        $firstChar = $rawResponse[0] ?? '';
        if (!in_array($firstChar, ['{', '['])) {
            // Try to extract JSON from first { to last }
            $firstBracket = strpos($rawResponse, '{');
            $lastBracket = strrpos($rawResponse, '}');
            if ($firstBracket === false || $lastBracket === false) {
                throw new Exception('AI response format invalid');
            }
            $rawResponse = substr($rawResponse, $firstBracket, $lastBracket - $firstBracket + 1);
        }

        return $rawResponse;
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

        throw new Exception('All AI providers failed to generate the script.');
    }

}
