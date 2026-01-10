<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Caption extends Model
{
    protected $fillable = [
        'user_id',
        'fingerprint',
        'topic',
        'content',
    ];

    protected $casts = [
        'content' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
