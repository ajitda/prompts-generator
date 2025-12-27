<?php

namespace App\Services\AI;

use App\Contracts\AIProviderInterface;
use Illuminate\Support\Facades\Http;
use Exception;

class GeminiProvider implements AIProviderInterface
{
    public function generate(string $keyword): string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.gemini.key'),
            'HTTP-Referer' => config('app.url'),
        ])->timeout(15)->post('https://generativelanguage.googleapis.com/v1beta/openai/', [
            'model' => 'google/gemini-2.0-flash-001',
            'messages' => [
               ["role" => "system", "content" => "You are an expert prompt generator."],
                ['role' => 'user', 'content' => "Generate a creative prompt for: $keyword"]
            ],
        ]);

        if (!$response->successful()) {
            throw new Exception('Gemini API Error: ' . $response->body());
        }
        return $response->json($response->body()) ?? throw new Exception('Empty response');
      //   return $response->json('choices.0.message.content') ?? throw new Exception('Empty response');
    }
}