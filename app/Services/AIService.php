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

  /* ---------------- IDEAS GENERATOR ---------------- */

  public function generateIdeas(string $keyword, string $type = 'youtube_idea'): string
  {
    if ($type === 'video_script') {
      // Prompt specifically for the Script Generation workflow
      $prompt = <<<PROMPT
You are a YouTube Content Strategist. Generate 5 unique, high-potential video titles for a scriptwriting workflow.
Topic: "{$keyword}"

Constraints:
- Focus on actionable, structured concepts.
- Return ONLY a JSON array of 5 strings (titles).
PROMPT;
    } else {
    // Prompt for the general Video Idea Generator tool
    $prompt = <<<PROMPT
You are a world-class YouTube Strategist. Generate 5 viral-worthy video concepts for the Topic: "{$keyword}".

Return ONLY a JSON array of 5 objects in this format:
[
  {
    "Title": "High CTR Title",
    "Thumbnail_Concept": "Visual description",
    "Hook_Script": "2 magnetic sentences",
    "Difficulty": "Easy|Medium|Hard"
  }
]
PROMPT;
    }

    return $this->cleanAndRun('generate', $prompt);
  }

  /* ---------------- STORY OUTLINE ---------------- */

  public function generateStory(string $selectedIdea, string $type = 'youtube_idea'): string
  {
    $prompt = <<<PROMPT
You are a YouTube Storytelling Expert. Create a narrative structure for: "{$selectedIdea}".

Structure: Hook (🎣), Journey (📖), Takeaway (🎯).

Return ONLY valid JSON:
{
  "sections": [
    {"title": "The Hook", "content": "...", "icon": "🎣"},
    {"title": "The Journey", "content": "...", "icon": "📖"},
    {"title": "The Takeaway", "content": "...", "icon": "🎯"}
  ]
}
PROMPT;

    return $this->cleanAndRun('generate', $prompt);
  }

  /* ---------------- SCRIPT GENERATION ---------------- */

  public function generateScript(string $selectedIdea, string $storyContext): string
  {
    return $this->generateUniversalScript($selectedIdea, $storyContext);
  }

  public function generateDetailedVideoScript(string $title, string $storyContext): string
  {
    return $this->generateUniversalScript($title, $storyContext);
  }

  protected function generateUniversalScript(string $title, string $storyContext): string
  {
    $prompt = <<<PROMPT
You are a professional YouTube Creator. Write a record-ready script.

Video Title: "{$title}"
Context: {$storyContext}

### FORMAT:
- No headings (no "SCENE 1", "HOOK", etc.).
- Continuous flow of dialogue.
- Use [brackets] for visual cues inside the text.
- Double line breaks between paragraphs.
- Use a conversational, friendly tone
- Include [TIMESTAMPS] to mark sections (e.g., [HOOK - 0:00-0:15])
- Write naturally as if speaking to a friend
- Include brief stage directions in [brackets] where helpful
- Aim for 2-4 minutes of content (roughly 400-600 words)
- Make the opening hook compelling
- End with a soft, natural call-to-action

Return ONLY valid JSON:
{
  "script": "[Visual: ...] \"Dialogue here...\"",
  "tone": "Brief description"
}
PROMPT;

    return $this->cleanAndRun('generate', $prompt);
  }

  /* ---------------- OTHER UTILITIES ---------------- */

  public function generatePrompt(string $keyword): string
  {
    $prompt = <<<PROMPT
Create a high-quality AI prompt for: "{$keyword}".
Format: JSON with "prompt" and "target_ai".
PROMPT;
    return $this->cleanAndRun('generate', $prompt);
  }

  public function generateCaptions(string $topic): string
  {
    $prompt = <<<PROMPT
Generate 3 social media captions for: "{$topic}".
Format: JSON array of objects with "Style", "Content", "Hashtags".
PROMPT;
    return $this->cleanAndRun('generate', $prompt);
  }

  protected function cleanAndRun(string $method, string $payload): string
  {
    $rawResponse = $this->runProviders($method, $payload);
    if (empty($rawResponse)) throw new Exception('AI response is empty');
    return $this->sanitizeJson($rawResponse);
  }

  protected function sanitizeJson(string $json): string
  {
    $json = preg_replace('/^```(?:json)?\s+/i', '', trim($json));
    $json = preg_replace('/\s+```$/', '', $json);
    $json = trim($json);
    $firstBracket = strpos($json, '{');
    $firstSquare = strpos($json, '[');
    $startPos = ($firstBracket !== false && $firstSquare !== false) ? min($firstBracket, $firstSquare) : (($firstBracket !== false) ? $firstBracket : $firstSquare);

    if ($startPos !== false) {
      $lastBracket = strrpos($json, '}');
      $lastSquare = strrpos($json, ']');
      $endPos = ($lastBracket !== false && $lastSquare !== false) ? max($lastBracket, $lastSquare) : (($lastBracket !== false) ? $lastBracket : $lastSquare);
      if ($endPos !== false && $endPos > $startPos) {
        $json = substr($json, $startPos, $endPos - $startPos + 1);
      }
    }
    
    // Fix for broken escape characters in JSON
    $json = preg_replace_callback('/"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"/s', function ($matches) {
        $content = $matches[1];
        // Ensure newlines/tabs are properly escaped for valid JSON
        $search = ["\n", "\r", "\t"];
        $replace = ["\\n", "\\r", "\\t"];
        return '"' . str_replace($search, $replace, $content) . '"';
    }, $json);

    return $json;
  }

  protected function runProviders(string $method, string $payload): string
  {
    foreach ($this->providers as $providerClass) {
      try {
        $provider = app($providerClass);
        $result = $provider->$method($payload);
        Log::info("AI_FALLBACK: Success using " . class_basename($providerClass));
        return $result;
      } catch (Exception $e) {
        Log::warning("AI_FALLBACK: " . class_basename($providerClass) . " failed. Error: " . $e->getMessage());
        continue;
      }
    }
    throw new Exception('All AI providers failed.');
  }
}
