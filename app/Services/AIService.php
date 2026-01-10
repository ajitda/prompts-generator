<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Exception;

class AIService
{
    protected $providers = [
        \App\Services\AI\GroqProvider::class,
        \App\Services\AI\GeminiProvider::class,
        \App\Services\AI\OpenRouterProvider::class,
        \App\Services\AI\HuggingFaceProvider::class,
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
        $prompt = <<<PROMPT
You are a world-class Prompt Engineer expert in Midjourney, DALL-E, and ChatGPT prompts.

Task:
Generate 3 unique, high-quality AI prompts for: "{$keyword}".

Constraints:
- Include different categories (e.g., Photorealistic, Artistic, Minimalist, Detailed, Abstract).
- Prompts should be detailed and optimized for the best AI output.
- Tone should be clear and professional.

Output Format:
You must output STRICT JSON ONLY.
No explanations. No markdown. No extra text.

JSON Structure (Array of 5 objects):
[
  {
    "Style": "Photorealistic | Artistic | Minimalist | Detailed | Abstract",
    "Content": "string (the full AI prompt)",
    "Engine": "Midjourney | DALL-E | Stable Diffusion | ChatGPT"
  }
]
PROMPT;

        return $this->cleanAndRun('generate', $prompt);
    }

    public function generateCaptions(string $topic): string
    {
        $prompt = <<<PROMPT
You are a world-class Social Media Manager expert in TikTok and Instagram engagement.

Task:
Generate 3 unique, high-engagement captions for a TikTok or Instagram post about: "{$topic}".

Constraints:
- Include relevant emojis.
- Include a mix of styles (e.g., Short & Punchy, Storytelling, Call to Action, Question-based, Humorous).
- Include 3-5 trending and relevant hashtags for each.
- Tone must be trendy and platform-appropriate.

Output Format:
You must output STRICT JSON ONLY.
No explanations. No markdown. No extra text.

JSON Structure (Array of 5 objects):
[
  {
    "Style": "Short & Punchy | Storytelling | CTA | Question | Humorous",
    "Content": "string (the caption body with emojis)",
    "Hashtags": "string (space-separated hashtags)"
  }
]
PROMPT;

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
