<?php

use App\Http\Controllers\PromptController;
use App\Http\Controllers\ScriptController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () { // Changed path from '/ai-video-generator' to '/'
    return Inertia::render('home', [ // Changed component from 'welcome' to 'home'
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/ai-video-generator', function () {
    $guestCredits = session('guest_credits', 5);
    $isAuthenticated = Auth::check();
    $userCredits = $isAuthenticated ? Auth::user()->credits : 0;

    return Inertia::render('scripts/script-form', [
        'initialGuestCredits' => $isAuthenticated ? null : $guestCredits,
        'isAuthenticated' => $isAuthenticated,
        'userCredits' => $isAuthenticated ? $userCredits : null,
    ]);
})->name('script-generator');

Route::post('/prompts/generate', [PromptController::class, 'generate'])->name('prompts.generate');

Route::post('/scripts/ideas', [ScriptController::class, 'generateIdeas'])->name('scripts.generateIdeas');
Route::post('/scripts/story', [ScriptController::class, 'generateStory'])->name('scripts.generateStory');
Route::post('/scripts/final', [ScriptController::class, 'generateScript'])->name('scripts.generateScript');


Route::get('ai-video-generator/scripts', [ScriptController::class, 'index'])->name('scripts.index');
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/ai-video-generator/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('ai-video-generator/prompts', PromptController::class)
        ->names('prompts')
        ->parameters(['prompts' => 'prompt']);

    Route::resource('ai-video-generator/scripts', ScriptController::class)
        ->names('scripts')
        ->parameters(['scripts' => 'script'])
        ->except(['index']);

    Route::get('/user/credits', [ScriptController::class, 'getCredits'])->name('user.credits');
});

require __DIR__ . '/settings.php';
