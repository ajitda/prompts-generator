<?php

use App\Http\Controllers\PromptController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/prompts-generator', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::post('/prompts/generate', [PromptController::class, 'generate'])->name('prompts.generate');

Route::post('/prompts/reset', function () {
    session()->forget('session_data');
    return back();
})->name('prompts.reset');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/prompts-generator/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');    
    
    Route::resource('prompts-generator/prompts', PromptController::class)
    ->names('prompts')
    ->parameters(['prompts' => 'prompt']);    
});

require __DIR__.'/settings.php';
