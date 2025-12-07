<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Services\GamificationService;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    protected $gamificationService;

    public function __construct(GamificationService $gamificationService)
    {
        $this->gamificationService = $gamificationService;
    }

    /**
     * Get all bookings
     */
    public function index()
    {
        $bookings = Booking::with(['user', 'court'])
            ->orderBy('date', 'desc')
            ->get();

        return response()->json($bookings);
    }

    /**
     * Approve a booking
     */
    public function approve($id)
    {
        $booking = Booking::findOrFail($id);
        
        if ($booking->status === 'approved') {
            return response()->json([
                'message' => 'Booking is already approved',
            ], 400);
        }

        $booking->status = 'approved';
        $booking->save();

        // Award points and check badges
        $user = $booking->user;
        $this->gamificationService->awardBookingPoints($user);
        $newBadges = $this->gamificationService->checkAndAwardBadges($user);

        return response()->json([
            'message' => 'Booking approved successfully',
            'booking' => $booking,
            'new_badges' => $newBadges,
        ]);
    }

    /**
     * Reject a booking
     */
    public function reject($id)
    {
        $booking = Booking::findOrFail($id);
        
        $booking->status = 'rejected';
        $booking->save();

        return response()->json([
            'message' => 'Booking rejected successfully',
            'booking' => $booking,
        ]);
    }
}
