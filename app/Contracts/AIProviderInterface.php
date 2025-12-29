<?php

namespace App\Contracts;

interface AIProviderInterface {
    /** @throws \Exception */
    public function generate(string $prompt): string;
}
