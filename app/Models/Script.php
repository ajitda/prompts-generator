<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Script extends Model
{
    protected $fillable = [
        'user_id',
        'fingerprint',
        'keyword',
        'title',
        'idea',
        'story',
        'script',
    ];

    protected $casts = [
        'idea' => 'array',  
        'story' => 'array', 
        'script' => 'array', 
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
