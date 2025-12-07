<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MatchResult extends Model
{
    protected $fillable = [
        'user_id',
        'opponent_name',
        'user_score',
        'opponent_score',
        'result',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
