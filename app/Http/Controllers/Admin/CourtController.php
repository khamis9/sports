<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Court;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourtController extends Controller
{
    /**
     * Create a new court
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $court = Court::create($request->all());

        return response()->json([
            'message' => 'Court created successfully',
            'court' => $court,
        ], 201);
    }

    /**
     * Update a court
     */
    public function update(Request $request, $id)
    {
        $court = Court::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $court->update($request->all());

        return response()->json([
            'message' => 'Court updated successfully',
            'court' => $court,
        ]);
    }

    /**
     * Delete a court
     */
    public function destroy($id)
    {
        $court = Court::findOrFail($id);
        $court->delete();

        return response()->json([
            'message' => 'Court deleted successfully',
        ]);
    }
}
