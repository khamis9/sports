<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    /**
     * Get top 10 users by points and wins
     */
    public function index()
    {
        $leaderboard = User::select('id', 'name', 'points', 'level', 'wins', 'total_matches')
            ->orderBy('points', 'desc')
            ->orderBy('wins', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($user, $index) {
                $user->rank = $index + 1;
                $user->win_rate = $user->total_matches > 0 
                    ? round(($user->wins / $user->total_matches) * 100, 2) 
                    : 0;
                return $user;
            });

        return response()->json($leaderboard);
    }
}
