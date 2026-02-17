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


  public function generateIdeas(string $keyword, string $type = 'youtube_idea'): string
  {
    $isScript = $type === 'video_script';

    $persona = $isScript
      ? "You are a professional Video Producer and Screenwriter expert in corporate, educational, and narrative video production."
      : "You are a world-class YouTube Strategist and Scriptwriter expert in high-CTR (Click Through Rate) and high-retention content.";

    $task = $isScript
      ? "Generate 5 professional video script concepts for a '{$keyword}'. These should be structured as high-level production concepts."
      : "Generate 5 unique, viral-worthy YouTube video ideas for the Topic/Niche: '{$keyword}'.";

    $formatGuidance = $isScript
      ? "- Focus on Narrative, Educational, or Commercial formats\n- Titles should be descriptive and professional"
      : "- Focus on How-to, Lists, Challenges, or Mistakes formats\n- Titles must be curiosity-driven and under 60 characters";

    $constraints = $isScript
      ? "- Highlight production value and scene flow\n- Overview should explain the core message and target audience\n- Visual style should describe the look and feel"
      : "- Hook scripts must be EXACTLY 2 compelling spoken sentences\n- Mix difficulty levels across ideas";

    $jsonStructure = $isScript
      ? <<<JSON
[
  {
    "Title": "string",
    "Visual_Concept": "string (vivid description of visual style/aesthetic)",
    "Concept_Brief": "string (2-3 sentences explaining the narrative/educational goal)",
    "Difficulty": "Easy | Medium | Hard"
  }
]
JSON
      : <<<JSON
[
  {
    "Title": "string",
    "Thumbnail_Concept": "string (1 vivid sentence describing the visual focus)",
    "Hook_Script": "string (exactly 2 spoken sentences)",
    "Difficulty": "Easy | Medium | Hard"
  }
]
JSON;

    $prompt = <<<PROMPT
{$persona}

Task:
{$task}

Topic/Niche:
"{$keyword}"

Constraints:
- Avoid generic titles
{$formatGuidance}
- Tone must be appropriate for the format
{$constraints}
- Mix difficulty levels across ideas (Easy | Medium | Hard)

Output Format:
You must output STRICT JSON ONLY.
No explanations. No markdown. No extra text.

JSON Structure:
{$jsonStructure}
PROMPT;

    return $this->cleanAndRun('generate', $prompt);
  }


  public function generateStory(string $selectedIdea, string $type = 'youtube_idea'): string
  {
    $isScript = $type === 'video_script';

    $prompt = $isScript
      ? "Create a professional video storyboard and narrative outline for: '{$selectedIdea}'. Focus on production architecture, scene sequences, and key messaging. Return ONLY valid JSON: {\"sections\": [{\"title\": \"...\", \"content\": \"...\", \"icon\": \"...\"}]}"
      : "Create a narrative outline for: '{$selectedIdea}'. Structure: Hook (🎣), Journey (📖), Takeaway (🎯). Return ONLY valid JSON: {\"sections\": [{\"title\": \"...\", \"content\": \"...\", \"icon\": \"...\"}]}";

    return $this->cleanAndRun('generate', $prompt);
  }

  public function generateScript(string $selectedIdea, string $storyContext): string
  {
    $prompt = "Write a comprehensive video script for: '{$selectedIdea}'.
                   Context: {$storyContext}.
                   Include [TIMESTAMPS] and [Stage Directions]. 
                   Tone: Appropriate for the topic (Professional if corporate, Conversational if YouTube).
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

JSON Structure (Array of 3 objects):
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

JSON Structure (Array of 3 objects):
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
    if (empty($rawResponse)) {
      throw new Exception('AI response is empty');
    }

    $firstChar = $rawResponse[0] ?? '';
    if (!in_array($firstChar, ['{', '['])) {
      // Try to extract JSON from first { to last }
      $firstBracket = strpos($rawResponse, '{');
      $firstSquare = strpos($rawResponse, '[');
      $startPos = false;

      if ($firstBracket !== false && $firstSquare !== false) {
        $startPos = min($firstBracket, $firstSquare);
      } else {
        $startPos = $firstBracket !== false ? $firstBracket : $firstSquare;
      }

      $lastBracket = strrpos($rawResponse, '}');
      $lastSquare = strrpos($rawResponse, ']');
      $endPos = false;

      if ($lastBracket !== false && $lastSquare !== false) {
        $endPos = max($lastBracket, $lastSquare);
      } else {
        $endPos = $lastBracket !== false ? $lastBracket : $lastSquare;
      }

      if ($startPos === false || $endPos === false) {
        throw new Exception('AI response format invalid');
      }
      $rawResponse = substr($rawResponse, $startPos, $endPos - $startPos + 1);
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

  /**
   * A separate, more detailed video script generator.
   * This does not interfere with the existing generateScript() method.
   */
  public function generateDetailedVideoScript(string $title, string $storyContext): string
  {
    $prompt = <<<PROMPT
You are a professional Video Producer and Scriptwriter specializing in high-quality video productions.
Task:
Generate a comprehensive, scene-by-scene professional video script for: "{$title}"
Context provided: {$storyContext}

Requirements:
- Break the script into logical business or narrative [SCENES].
- Each scene must include: [VISUAL] description (camera angles, B-roll, on-screen text), [AUDIO] script (voiceover or dialogue), and [DURATION] estimate.
- Use a professional, authoritative, or engaging tone as appropriate.
- Focus on production value and clear messaging.
- Output MUST be STRICT JSON.

JSON Structure:
{
  "title": "string",
  "scenes": [
    {
      "scene_number": 1,
      "visual": "vivid production description (e.g., MCU of presenter, B-roll of office, text overlay)",
      "audio": "the actual spoken words or voiceover",
      "duration": "estimated seconds"
    }
  ],
  "tone": "string"
}
PROMPT;
    // Reuse the existing cleanAndRun logic to benefit from provider fallback and JSON cleaning
    return $this->cleanAndRun('generate', $prompt);
  }

}
