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

Route::post('/prompts/generate', [PromptController::class, 'generate'])->name('prompts.generate');

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/prompts-generator', [PromptController::class,'index'])->name('promts.index');

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');    
    
    Route::resource('prompts', PromptController::class)->except(['index']);    
});

require __DIR__.'/settings.php';
