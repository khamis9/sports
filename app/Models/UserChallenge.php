<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserChallenge extends Model
{
    protected $fillable = [
        'user_id',
        'challenge_id',
        'completed',
    ];

    protected $casts = [
        'completed' => 'boolean',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function challenge()
    {
        return $this->belongsTo(Challenge::class);
    }
}
