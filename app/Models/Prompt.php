<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prompt extends Model
{
    protected $fillable = [
        'user_id',
        'fingerprint',
        'keyword',
        'prompt',
    ];

    protected $casts = [
        'prompt' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected static function booted()
    {
        // Clear cache for the specific user who owns the record
        $clearCache = function ($model) {
            \Illuminate\Support\Facades\Cache::forget("sidebar_menu_user_{$model->user_id}");
        };

        static::created($clearCache);
        static::updated($clearCache);
        static::deleted($clearCache);
    }
}
