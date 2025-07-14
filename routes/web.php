<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('welcome'))->name('home');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');

    Route::get('companies/check-slug-availability', [CompanyController::class, 'checkSlugAvailability'])
        ->middleware('throttle:10,1')
        ->name('companies.check-slug');
    Route::resource('companies', CompanyController::class);

    Route::middleware(['ensure.has.active.company'])->group(function (): void {
        Route::resource('customers', CustomerController::class);
        Route::resource('customers.projects', ProjectController::class)->shallow();
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
