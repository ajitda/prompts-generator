<?php

namespace App\Services\AI;

use App\Contracts\AIProviderInterface;
use Illuminate\Support\Facades\Http;
use Exception;

class HuggingFaceProvider implements AIProviderInterface
{
    public function generate(string $keyword): string
    {
        $apiKey = config('services.huggingface.key');
        if (!$apiKey) {
            throw new Exception('Hugging Face API key not found.');
        }

        $model = "mistralai/Mistral-7B-Instruct-v0.3";
        $url = "https://router.huggingface.co/models/" . $model;

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
        ])->timeout(30)->post($url, [
                    'inputs' => "<s>[INST] $keyword [/INST]",
                    'parameters' => [
                        'max_new_tokens' => 2048,
                        'return_full_text' => false,
                    ],
                ]);

        if (!$response->successful()) {
            throw new Exception('Hugging Face Error: ' . $response->body());
        }

        // HF returns an array of objects for text generation
        $result = $response->json();
        return $result[0]['generated_text'] ?? throw new Exception('HF: No text generated');
    }
}
