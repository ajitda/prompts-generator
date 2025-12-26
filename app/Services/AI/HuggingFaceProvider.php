<?php

namespace App\Services\AI;

use App\Contracts\AIProviderInterface;
use Illuminate\Support\Facades\Http;
use Exception;

class HuggingFaceProvider implements AIProviderInterface
{
    public function generate(string $keyword): string
    {
        // Replace with your preferred model path from Hugging Face
        $model = "mistralai/Mistral-7B-Instruct-v0.3";
        $url = "https://api-inference.huggingface.co/models/" . $model;

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.huggingface.key'),
            'Content-Type' => 'application/json',
        ])->timeout(15)->post($url, [
            'inputs' => "<s>[INST] Generate a creative prompt for: $keyword [/INST]",
            'parameters' => [
                'max_new_tokens' => 500,
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
