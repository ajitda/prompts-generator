<?php

namespace App\Contracts;

interface AIProviderInterface {
    /** @throws \Exception */
    public function generate(string $keyword): string;
}
