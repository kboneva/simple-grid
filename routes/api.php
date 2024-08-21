<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ButtonController;

Route::controller(ButtonController::class)->group(function () {
    Route::get('/buttons', 'index');
    Route::post('/buttons', 'store');
    Route::get('/buttons/{id}', 'show');
    Route::put('/buttons/{id}', 'update');
    Route::delete('/buttons/{id}', 'destroy');
});