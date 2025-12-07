<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourtController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\MatchResultController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\Admin\CourtController as AdminCourtController;
use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::get('/leaderboard', [LeaderboardController::class, 'index']);
Route::get('/courts', [CourtController::class, 'index']);
Route::get('/courts/{id}', [CourtController::class, 'show']);

// Auth routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
    });
});

// Protected routes (require authentication)
Route::middleware('auth:api')->group(function () {
    
    // Bookings
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/my', [BookingController::class, 'myBookings']);
    
    // Match Results
    Route::post('/matches', [MatchResultController::class, 'store']);
    
    // Badges
    Route::get('/badges/my', [BadgeController::class, 'myBadges']);
    
    // Challenges
    Route::get('/challenges', [ChallengeController::class, 'index']);
    Route::post('/challenges/{id}/complete', [ChallengeController::class, 'complete']);
    
    // Admin routes
    Route::prefix('admin')->group(function () {
        // Courts
        Route::post('/courts', [AdminCourtController::class, 'store']);
        Route::put('/courts/{id}', [AdminCourtController::class, 'update']);
        Route::delete('/courts/{id}', [AdminCourtController::class, 'destroy']);
        
        // Bookings
        Route::get('/bookings', [AdminBookingController::class, 'index']);
        Route::put('/bookings/{id}/approve', [AdminBookingController::class, 'approve']);
        Route::put('/bookings/{id}/reject', [AdminBookingController::class, 'reject']);
    });
});
