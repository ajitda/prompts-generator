<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prompt extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'keyword',
        'prompt',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
