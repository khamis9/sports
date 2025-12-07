<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'access_token' => $token,
        ], 201);
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = auth('api')->user();

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'access_token' => $token,
        ]);
    }

    /**
     * Logout user
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    /**
     * Get authenticated user profile
     */
    public function profile()
    {
        $user = auth('api')->user();
        
        // Load relationships
        $user->load(['badges', 'bookings', 'matchResults']);

        // Calculate win rate
        $user->win_rate = $user->total_matches > 0 
            ? round(($user->wins / $user->total_matches) * 100, 2) 
            : 0;

        return response()->json($user);
    }

    /**
     * Refresh token
     */
    public function refresh()
    {
        $token = auth('api')->refresh();

        return response()->json([
            'token' => $token,
        ]);
    }
}
