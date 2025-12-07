<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Create a new booking
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'court_id' => 'required|exists:courts,id',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $booking = Booking::create([
            'user_id' => auth()->id(),
            'court_id' => $request->court_id,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'status' => 'pending',
        ]);

        $booking->load(['court', 'user']);

        return response()->json([
            'message' => 'Booking created successfully',
            'booking' => $booking,
        ], 201);
    }

    /**
     * Get user's bookings
     */
    public function myBookings()
    {
        $bookings = Booking::where('user_id', auth()->id())
            ->with(['court'])
            ->orderBy('date', 'desc')
            ->get();

        return response()->json($bookings);
    }
}
