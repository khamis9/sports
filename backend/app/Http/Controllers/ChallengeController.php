<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Models\UserChallenge;
use App\Services\GamificationService;
use Illuminate\Http\Request;

class ChallengeController extends Controller
{
    protected $gamificationService;

    public function __construct(GamificationService $gamificationService)
    {
        $this->gamificationService = $gamificationService;
    }

    /**
     * Get all challenges with user's completion status
     */
    public function index()
    {
        $challenges = Challenge::all()->map(function ($challenge) {
            $userChallenge = UserChallenge::where('user_id', auth()->id())
                ->where('challenge_id', $challenge->id)
                ->first();

            $challenge->is_completed = $userChallenge ? $userChallenge->completed : false;
            return $challenge;
        });

        return response()->json($challenges);
    }

    /**
     * Complete a challenge
     */
    public function complete($id)
    {
        $challenge = Challenge::findOrFail($id);
        $user = auth()->user();

        // Check if already completed
        $userChallenge = UserChallenge::where('user_id', $user->id)
            ->where('challenge_id', $challenge->id)
            ->first();

        if ($userChallenge && $userChallenge->completed) {
            return response()->json([
                'message' => 'Challenge already completed',
            ], 400);
        }

        // Mark as completed
        if ($userChallenge) {
            $userChallenge->completed = true;
            $userChallenge->save();
        } else {
            UserChallenge::create([
                'user_id' => $user->id,
                'challenge_id' => $challenge->id,
                'completed' => true,
            ]);
        }

        // Award points
        $this->gamificationService->awardPoints($user, $challenge->points_reward, 'Challenge completed');

        // Award "Weekly Champ" badge
        if (!$this->gamificationService->hasBadge($user, 'Weekly Champ')) {
            $this->gamificationService->awardBadge($user, 'Weekly Champ');
        }

        return response()->json([
            'message' => 'Challenge completed successfully',
            'points_awarded' => $challenge->points_reward,
            'user' => $user->fresh(),
        ]);
    }
}
