<?php

namespace App\Http\Controllers;

use App\Models\Court;
use Illuminate\Http\Request;

class CourtController extends Controller
{
    /**
     * Get all courts
     */
    public function index()
    {
        $courts = Court::all();
        
        return response()->json($courts);
    }

    /**
     * Get single court
     */
    public function show($id)
    {
        $court = Court::findOrFail($id);
        
        return response()->json($court);
    }
}
