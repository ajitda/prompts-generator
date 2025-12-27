<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PromptResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'keyword' => $this->keyword,
            'prompt' => $this->prompt,
            'created_at' => $this->created_at->format('d M Y'),
        ];
    }
}
