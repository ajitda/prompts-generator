<?php

use App\Http\Controllers\PromptController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::post('/prompts/generate', [PromptController::class, 'generatePrompt'])->name('prompts.generate');
    Route::post('prompts', [PromptController::class, 'store'])->name('prompts.store');
});

Route::get('/prompts', [PromptController::class, 'index'])->name('prompts.index');

require __DIR__.'/settings.php';
