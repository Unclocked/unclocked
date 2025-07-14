<?php

use App\Http\Controllers\CompanyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('welcome'))->name('home');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');

    // Put specific routes before resource routes to avoid conflicts
    Route::get('companies/check-slug-availability', [CompanyController::class, 'checkSlugAvailability'])
        ->middleware('throttle:10,1')
        ->name('companies.check-slug');
    Route::resource('companies', CompanyController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
