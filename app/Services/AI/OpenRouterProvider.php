<?php

namespace App\Services\AI;

use App\Contracts\AIProviderInterface;
use Illuminate\Support\Facades\Http;
use Exception;

class OpenRouterProvider implements AIProviderInterface
{

    public function generate(string $prompt): string
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . config('services.openrouter.key'),
                'HTTP-Referer' => config('app.url'),
                'X-Title' => config('app.name'), // Recommended by OpenRouter
            ])->timeout(120) //(2 minutes) Increased timeout for free models
                ->post('https://openrouter.ai/api/v1/chat/completions', [
                    'model' => 'google/gemma-3-27b-it:free',
                    'messages' => [['role' => 'user', 'content' => $prompt]],
                ]);

            if ($response->failed()) {
                throw new Exception("OpenRouter HTTP Error: {$response->status()}");
            }

            $content = $response->json('choices.0.message.content');

            if (is_null($content) || $content === '') {
                // Check for specific error messages in the body
                $errorMessage = $response->json('error.message') ?? 'Unknown error / Empty content';
                throw new Exception("OpenRouter API Error: {$errorMessage}");
            }

            return $content;

        } catch (Exception $e) {
            \Log::warning("AI Provider Failure: " . $e->getMessage());
            throw $e;
        }
    }
    
}
