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
      // Prompt optimized for high-engagement, authentic YouTube titles
      $prompt = <<<PROMPT
You are a viral YouTube Creator known for titles that people can't help but click. Generate 5 authentic, high-performing YouTube titles for: "{$keyword}".

### CREATOR TITLE SECRETS:
- **The "Story" Hook**: Start a story that the viewer needs to finish (e.g., "I tried [X] for 30 days...", "Why I finally left [X]").
- **Extreme Authenticity**: Use conversational, slightly hyperbolic, or highly personal language (e.g., "The truth about...", "I'm shocked by [X]").
- **High Stakes**: Make it feel like something important is at risk (e.g., "Stop doing this before you [X]", "The mistake that cost me [Amount]").
- **Pattern Interrupt**: Use words like "Finally", "Actually", "Shocking", or "Secret".
- **MrBeast Style**: Keep it simple, punchy, and high-intensity.

### REAL-WORLD EXAMPLES:
- "I'm quitting [X]. (not clickbait)"
- "This $[Price] [X] is actually perfect."
- "The only way to [X] in 2024 (it's not what you think)."
- "7 things I wish I knew before starting [X]."
- "I used [X] for a week and my life changed."

Return ONLY a JSON array of 5 strings (titles).
PROMPT;
    } else {
    // Prompt for the general Video Idea Generator tool
    $prompt = <<<PROMPT
You are a world-class YouTube Strategist and Creative Director. Generate 5 viral-worthy video concepts that sound like they came from a top-tier creator for: "{$keyword}".

### VIRAL PHILOSOPHY:
- **Curiosity Gap**: Raise a question that can only be answered by watching.
- **Visual-First**: Titles that imply a great thumbnail visual.
- **Natural Language**: Write how people actually talk, not how an AI writes.
- **The "Must-Watch" Factor**: Every title should feel like an event.

Return ONLY a JSON array of 5 objects in this exact format:
[
  {
    "Title": "A high-stakes, viral-style YouTube title",
    "Thumbnail_Concept": "A vivid, story-driven thumbnail visual description",
    "Hook_Script": "2 high-energy, pattern-interrupt sentences that stop the scroll",
    "Difficulty": "Easy | Medium | Hard"
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
