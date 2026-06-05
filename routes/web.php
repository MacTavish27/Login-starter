<?php

use App\Http\Controllers\Auth\SocialAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// The homepage is the login screen. Authenticated visitors are sent to the
// dashboard by the "guest" middleware. The login form posts to Fortify's
// /login route regardless of which URL renders it.
Route::get('/', fn (Request $request) => Inertia::render('auth/login', [
    'canResetPassword' => Features::enabled(Features::resetPasswords()),
    'status' => $request->session()->get('status'),
]))->middleware('guest')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('auth/{provider}/redirect', [SocialAuthController::class, 'redirect'])
    ->name('social.redirect');
Route::get('auth/{provider}/callback', [SocialAuthController::class, 'callback'])
    ->name('social.callback');

require __DIR__.'/settings.php';
