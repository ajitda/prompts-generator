<?php

namespace App\Services\AI;

use App\Contracts\AIProviderInterface;
use Illuminate\Support\Facades\Http;
use Exception;

class OpenRouterProvider implements AIProviderInterface
{
    public function generate(string $keyword): string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.openrouter.key'),
            'HTTP-Referer' => config('app.url'),
        ])->timeout(15)->post('https://openrouter.ai/api/v1/chat/completions', [
            'model' => 'google/gemini-2.0-flash-001',
            'messages' => [
                ['role' => 'user', 'content' => "Generate a creative prompt for: $keyword"]
            ],
        ]);

        if (!$response->successful()) {
            throw new Exception('OpenRouter API Error: ' . $response->body());
        }

        return $response->json('choices.0.message.content') ?? throw new Exception('Empty response');
    }
}
