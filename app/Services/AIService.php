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
    $isScriptFlow = $type === 'video_script';

    if ($isScriptFlow) {
      $prompt = <<<PROMPT
You are a creative YouTube content strategist. Generate exactly 5 unique, engaging video ideas based on the user's keyword or topic. Each idea should:
- Be specific and actionable
- Have potential for good viewer engagement
- Be suitable for creators of all experience levels
- Feel fresh and not overly generic

Topic: "{$keyword}"

Return ONLY a JSON array with 5 strings, each being a video title idea. No explanations, just the JSON array.
Example format: ["Idea 1", "Idea 2", "Idea 3", "Idea 4", "Idea 5"]
PROMPT;
    } else {
      $persona = "You are a world-class YouTube Strategist and Scriptwriter expert in high-CTR (Click Through Rate) and high-retention content.";
      $task = "Generate 5 unique, viral-worthy YouTube video ideas for the Topic/Niche: '{$keyword}'.";
      $formatGuidance = "- Focus on How-to, Lists, Challenges, or Mistakes formats\n- Titles must be curiosity-driven and under 60 characters";
      $constraints = "- Hook scripts must be EXACTLY 2 compelling spoken sentences\n- Mix difficulty levels across ideas";
      $jsonStructure = <<<JSON
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
    }

    return $this->cleanAndRun('generate', $prompt);
  }


  public function generateStory(string $selectedIdea, string $type = 'youtube_idea'): string
  {
    $isScriptFlow = $type === 'video_script';

    if ($isScriptFlow) {
      $prompt = <<<PROMPT
You are a YouTube content strategist and storytelling expert. Create a narrative outline for a YouTube video based on the given idea. 

Idea: "{$selectedIdea}"

Structure it in exactly 3 parts:

1. THE HOOK (🎣) - An attention-grabbing opening that makes viewers want to keep watching. Include a specific suggestion for what to say or show in the first 10-15 seconds.

2. THE JOURNEY (📖) - The main content flow. Break down 3-4 key points to cover, with suggested pacing and transitions.

3. THE TAKEAWAY (🎯) - A memorable conclusion with a clear call-to-action that feels natural, not pushy.

Return ONLY valid JSON in this exact format:
{
  "sections": [
    {"title": "The Hook", "content": "...", "icon": "🎣"},
    {"title": "The Journey", "content": "...", "icon": "📖"},
    {"title": "The Takeaway", "content": "...", "icon": "🎯"}
  ]
}
PROMPT;
    } else {
      $prompt = "Create a narrative outline for: '{$selectedIdea}'. Structure: Hook (🎣), Journey (📖), Takeaway (🎯). Return ONLY valid JSON: {\"sections\": [{\"title\": \"...\", \"content\": \"...\", \"icon\": \"...\"}]}";
    }

    return $this->cleanAndRun('generate', $prompt);
  }

  public function generateScript(string $selectedIdea, string $storyContext): string
  {
    $prompt = <<<PROMPT
You are an expert YouTube scriptwriter known for creating engaging, conversational content. Based on the video idea and story outline provided, write a complete, ready-to-record script.

Video Idea: "{$selectedIdea}"
Story Outline Context: {$storyContext}

Guidelines:
- Use a conversational, friendly tone
- Include [TIMESTAMPS] to mark sections (e.g., [HOOK - 0:00-0:15])
- Write naturally as if speaking to a friend
- Include brief stage directions in [brackets] where helpful
- Aim for 5-7 minutes of content (roughly 800-1000 words)
- Make the opening hook compelling
- End with a soft, natural call-to-action

Return ONLY valid JSON in this exact format:
{
  "script": "The full script text here...",
  "tone": "Brief description of the tone (e.g., 'Conversational & Educational')"
}
PROMPT;

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

    if (empty($rawResponse)) {
      throw new Exception('AI response is empty');
    }

    $cleanResponse = $this->sanitizeJson($rawResponse);

    return $cleanResponse;
  }

  /**
   * Robustly sanitize and repair AI-generated JSON
   */
  protected function sanitizeJson(string $json): string
  {
    // 1. Remove Markdown code blocks
    $json = preg_replace('/^```(?:json)?\s+/i', '', trim($json));
    $json = preg_replace('/\s+```$/', '', $json);
    $json = trim($json);

    // 2. Extract JSON part if there is preamble/postscript
    $firstBracket = strpos($json, '{');
    $firstSquare = strpos($json, '[');
    $startPos = false;

    if ($firstBracket !== false && $firstSquare !== false) {
      $startPos = min($firstBracket, $firstSquare);
    } else {
      $startPos = ($firstBracket !== false) ? $firstBracket : $firstSquare;
    }

    if ($startPos !== false) {
      $lastBracket = strrpos($json, '}');
      $lastSquare = strrpos($json, ']');
      $endPos = ($lastBracket !== false && $lastSquare !== false) ? max($lastBracket, $lastSquare) : (($lastBracket !== false) ? $lastBracket : $lastSquare);

      if ($endPos !== false && $endPos > $startPos) {
        $json = substr($json, $startPos, $endPos - $startPos + 1);
      }
    }

    // 3. Handle multiple top-level objects not in an array (common with some AI models)
    if (str_starts_with($json, '{') && !str_contains(substr($json, 0, 10), '[')) {
      // Check if there are multiple objects (e.g., } { or } \n {)
      if (preg_match('/\}\s*\{/', $json)) {
        $json = '[' . preg_replace('/\}\s*\{/', '},{', $json) . ']';
      }
    }

    // 4. Sanitize control characters (0-31) that break json_decode
    // We target literal newlines, tabs, and other control chars inside JSON string values.
    // This regex matches a JSON string value and we process its content.
    $json = preg_replace_callback('/"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"/s', function ($matches) {
      $content = $matches[1];
      // Replace literal control characters with their escaped versions
      $search = ["\n", "\r", "\t", "\x08", "\x0c"];
      $replace = ["\\n", "\\r", "\\t", "\\b", "\\f"];
      return '"' . str_replace($search, $replace, $content) . '"';
    }, $json);

    return $json;
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
   * This now uses the new prompt format requested by the user.
   */
  public function generateDetailedVideoScript(string $title, string $storyContext): string
  {
    $prompt = <<<PROMPT
You are an expert YouTube scriptwriter known for creating engaging, conversational content. Based on the video idea and story outline provided, write a complete, ready-to-record script.

Video Idea: "{$title}"
Story Outline Context: {$storyContext}

Guidelines:
- Use a conversational, friendly tone
- Include [TIMESTAMPS] to mark sections (e.g., [HOOK - 0:00-0:15])
- Write naturally as if speaking to a friend
- Include brief stage directions in [brackets] where helpful
- Aim for 5-7 minutes of content (roughly 800-1000 words)
- Make the opening hook compelling
- End with a soft, natural call-to-action

Return ONLY valid JSON in this exact format:
{
  "script": "The full script text here...",
  "tone": "Brief description of the tone (e.g., 'Conversational & Educational')"
}
PROMPT;

    return $this->cleanAndRun('generate', $prompt);
  }

}
