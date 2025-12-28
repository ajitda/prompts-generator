<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Script extends Model
{
    protected $fillable = [
        'user_id',
        'keyword',
        'title',
        'idea',
        'story',
        'script',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
