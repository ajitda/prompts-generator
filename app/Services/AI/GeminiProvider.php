<?php

namespace App\Services\AI;

use App\Contracts\AIProviderInterface;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Exception;
use Illuminate\Support\Facades\Log;

class GeminiProvider implements AIProviderInterface
{
    public function generate(string $keyword): string
    {
        $apiKey = config('services.gemini.key');
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={$apiKey}";

        /**
         * RETRY STRATEGY: 
         * Retries 3 times. The '100, 200, 400' are milliseconds to wait between attempts.
         * Only retries on 429 (Rate Limit) or 5xx (Server Error).
         */
        $response = Http::retry(3, 100, function (Exception $exception, $request) {
            return $exception instanceof RequestException &&
                in_array($exception->response->status(), [429, 500, 503]);
        })->timeout(15)->post($url, [
                    'system_instruction' => ['parts' => [['text' => 'You are an expert.']]],
                    'contents' => [['role' => 'user', 'parts' => [['text' => "Prompt for: $keyword"]]]],
                ]);

        if ($response->failed()) {
            $this->handleApiError($response);
        }

        return $response->json('candidates.0.content.parts.0.text')
            ?? throw new Exception('Gemini returned an empty content body.');
    }

    private function handleApiError(Response $response): void
    {
        $status = $response->status();
        $error = $response->json('error.message') ?? 'Unknown Gemini Error';

        Log::error("Gemini API Failure", [
            'status' => $status,
            'error' => $error,
            'payload' => $response->body()
        ]);

        match ($status) {
            429 => throw new Exception("Rate limit exceeded (429). Please slow down."),
            400 => throw new Exception("Invalid request (400). Check your prompt or parameters."),
            403 => throw new Exception("API Key permission denied (403). Check your Google AI Studio settings."),
            500, 503 => throw new Exception("Google's servers are temporarily overloaded (5xx)."),
            default => throw new Exception("Gemini API Error: $error ($status)"),
        };
    }
}