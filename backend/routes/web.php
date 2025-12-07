<?php

use Illuminate\Support\Facades\Route;

// Serve React app for all routes (SPA)
Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');
