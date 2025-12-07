<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BadgeController extends Controller
{
    /**
     * Get user's badges
     */
    public function myBadges()
    {
        $badges = auth()->user()->badges;

        return response()->json($badges);
    }
}
