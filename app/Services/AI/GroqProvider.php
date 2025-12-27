<?php

namespace App\Services\AI;

use App\Contracts\AIProviderInterface;
use Illuminate\Support\Facades\Http;
use Exception;

class GroqProvider implements AIProviderInterface
{
    public function generate(string $keyword): string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.groq.key'),
            'Content-Type' => 'application/json',
        ])->timeout(10)->post('https://api.groq.com/openai/v1/chat/completions', [
            'model' => 'llama-3.3-70b-versatile', 
            'messages' => [
                ['role' => 'system', 'content' => 'You are a creative prompt engineer.'],
                ['role' => 'user', 'content' => "Create a detailed prompt for: $keyword"]
            ],
            'temperature' => 0.7,
            'max_tokens' => 500,
        ]);

        if (!$response->successful()) {
            throw new Exception('Groq API Error: ' . ($response->json('error.message') ?? 'Unknown error'));
        }

        return $response->json('choices.0.message.content');
    }
}
