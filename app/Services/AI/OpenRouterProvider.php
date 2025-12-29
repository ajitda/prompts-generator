<?php

namespace App\Services\AI;

use App\Contracts\AIProviderInterface;
use Illuminate\Support\Facades\Http;
use Exception;

class OpenRouterProvider implements AIProviderInterface
{

    public function generate(string $prompt): string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.openrouter.key'),
            'HTTP-Referer' => config('app.url'),
        ])->timeout(20)->post('https://openrouter.ai/api/v1/chat/completions', [
                    'model' => 'google/gemini-2.0-flash-001',
                    'messages' => [['role' => 'user', 'content' => $prompt]],
                ]);

        if (!$response->successful()) {
            throw new \Exception('OpenRouter Error: ' . $response->status());
        }

        return $response->json('choices.0.message.content') ?? throw new \Exception('Empty OpenRouter response');
    }
    
}
