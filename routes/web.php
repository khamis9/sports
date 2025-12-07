<?php

use Illuminate\Support\Facades\Route;

// Serve React app for all routes (SPA)
Route::get('/{any}', function () {
    $indexPath = public_path('index.html');
    
    if (!file_exists($indexPath)) {
        abort(500, 'Frontend not built. index.html not found at: ' . $indexPath);
    }
    
    return response()->file($indexPath);
})->where('any', '.*');
