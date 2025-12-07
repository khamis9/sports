<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    protected $fillable = [
        'title',
        'description',
        'points_reward',
    ];

    // Relationships
    public function userChallenges()
    {
        return $this->hasMany(UserChallenge::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_challenges')
                    ->withPivot('completed')
                    ->withTimestamps();
    }
}
