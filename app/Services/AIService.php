<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Exception;

class AIService
{
    protected $providers = [
        \App\Services\AI\GeminiProvider::class,
        \App\Services\AI\OpenRouterProvider::class,
        \App\Services\AI\GroqProvider::class,
        \App\Services\AI\HuggingFaceProvider::class,
    ];

    public function generatePrompt(string $keyword): string
    {
        foreach ($this->providers as $providerClass) {
            $providerName = class_basename($providerClass);

            try {
                
                $provider = app($providerClass); 
                
                // Now $provider is an OBJECT, so we can call methods on it
                $result = $provider->generate($keyword);

                Log::info("AI_FALLBACK: Success using {$providerName}.");
                return $result;

            } catch (Exception $e) {
                Log::warning("AI_FALLBACK: {$providerName} failed. Error: " . $e->getMessage());
                continue; 
            }
        }

        throw new Exception('All AI providers exhausted.');
    }
}
