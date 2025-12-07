<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserBadge;
use App\Models\Booking;
use Carbon\Carbon;

class GamificationService
{
    /**
     * Award points to user
     */
    public function awardPoints(User $user, int $points, string $reason = '')
    {
        $user->points += $points;
        $user->level = floor($user->points / 100) + 1;
        $user->save();

        return $user;
    }

    /**
     * Check and award booking points
     */
    public function awardBookingPoints(User $user)
    {
        // +10 points per approved booking
        $this->awardPoints($user, 10, 'Approved booking');

        // Check for 3 bookings in a week
        $weekStart = Carbon::now()->startOfWeek();
        $weeklyBookings = Booking::where('user_id', $user->id)
            ->where('status', 'approved')
            ->where('created_at', '>=', $weekStart)
            ->count();

        if ($weeklyBookings >= 3) {
            $this->awardPoints($user, 5, '3 bookings this week');
        }

        return $user;
    }

    /**
     * Check and award badges based on user achievements
     */
    public function checkAndAwardBadges(User $user)
    {
        $badges = [];

        // First booking - Rookie badge
        if ($user->bookings()->where('status', 'approved')->count() === 1) {
            if (!$this->hasBadge($user, 'Rookie')) {
                $this->awardBadge($user, 'Rookie');
                $badges[] = 'Rookie';
            }
        }

        // 5 total bookings - Active Player badge
        if ($user->bookings()->where('status', 'approved')->count() >= 5) {
            if (!$this->hasBadge($user, 'Active Player')) {
                $this->awardBadge($user, 'Active Player');
                $badges[] = 'Active Player';
            }
        }

        // 10 total bookings - Pro Player badge
        if ($user->bookings()->where('status', 'approved')->count() >= 10) {
            if (!$this->hasBadge($user, 'Pro Player')) {
                $this->awardBadge($user, 'Pro Player');
                $badges[] = 'Pro Player';
            }
        }

        return $badges;
    }

    /**
     * Award a badge to user
     */
    public function awardBadge(User $user, string $badgeName)
    {
        return UserBadge::create([
            'user_id' => $user->id,
            'badge_name' => $badgeName,
        ]);
    }

    /**
     * Check if user has a badge
     */
    public function hasBadge(User $user, string $badgeName)
    {
        return UserBadge::where('user_id', $user->id)
            ->where('badge_name', $badgeName)
            ->exists();
    }

    /**
     * Update match statistics
     */
    public function updateMatchStats(User $user, string $result)
    {
        $user->total_matches++;
        
        if ($result === 'win') {
            $user->wins++;
        } else {
            $user->losses++;
        }
        
        $user->save();

        return $user;
    }
}
