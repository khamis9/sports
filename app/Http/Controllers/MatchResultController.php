<?php

namespace App\Http\Controllers;

use App\Models\MatchResult;
use App\Services\GamificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MatchResultController extends Controller
{
    protected $gamificationService;

    public function __construct(GamificationService $gamificationService)
    {
        $this->gamificationService = $gamificationService;
    }

    /**
     * Store match result
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'opponent_name' => 'required|string|max:255',
            'user_score' => 'required|integer|min:0',
            'opponent_score' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Determine result
        $result = $request->user_score > $request->opponent_score ? 'win' : 'loss';

        $matchResult = MatchResult::create([
            'user_id' => auth()->id(),
            'opponent_name' => $request->opponent_name,
            'user_score' => $request->user_score,
            'opponent_score' => $request->opponent_score,
            'result' => $result,
        ]);

        // Update user stats
        $user = auth()->user();
        $this->gamificationService->updateMatchStats($user, $result);

        return response()->json([
            'message' => 'Match result recorded successfully',
            'match_result' => $matchResult,
            'user_stats' => [
                'total_matches' => $user->total_matches,
                'wins' => $user->wins,
                'losses' => $user->losses,
            ],
        ], 201);
    }
}
