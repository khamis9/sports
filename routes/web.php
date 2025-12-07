<?php

use Illuminate\Support\Facades\Route;

// Serve React app for all routes (SPA)
Route::get('/{any}', function () {
    $indexPath = public_path('index.html');
    
    if (!file_exists($indexPath)) {
        $publicContents = scandir(public_path());
        $debugInfo = [
            'expected_path' => $indexPath,
            'public_path' => public_path(),
            'public_contents' => $publicContents,
            'file_exists' => file_exists($indexPath),
            'is_readable' => is_readable(public_path()),
        ];
        abort(500, 'Frontend not built. Debug info: ' . json_encode($debugInfo));
    }
    
    return response()->file($indexPath);
})->where('any', '.*');
