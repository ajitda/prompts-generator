<?php

namespace App\Services\AI;

use App\Contracts\AIProviderInterface;
use Illuminate\Support\Facades\Http;
use Exception;

class GroqProvider implements AIProviderInterface
{
    public function generate(string $keyword): string
    {
        $apiKey = config('services.groq.key');
        if (!$apiKey) {
            throw new Exception('Groq API key not found.');
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
        ])->timeout(30)->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => 'llama-3.3-70b-versatile',
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are an expert scriptwriter. Output STRICT JSON ONLY.'],
                        ['role' => 'user', 'content' => $keyword]
                    ],
                    'temperature' => 0.7,
                    'max_tokens' => 2048,
                ]);

        if (!$response->successful()) {
            throw new Exception('Groq API Error: ' . ($response->json('error.message') ?? 'Unknown error'));
        }

        return $response->json('choices.0.message.content');
    }
}
