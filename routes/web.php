<?php

use App\Http\Controllers\PromptController;
use App\Http\Controllers\ScriptController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () { // Changed path from '/video-idea-generator' to '/'
    return Inertia::render('home', [ // Changed component from 'welcome' to 'home'
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');



Route::post('/prompts/generate', [PromptController::class, 'generate'])->name('prompts.generate');

Route::post('/scripts/ideas', [ScriptController::class, 'generateIdeas'])->name('scripts.generateIdeas');
Route::post('/scripts/story', [ScriptController::class, 'generateStory'])->name('scripts.generateStory');
Route::post('/scripts/final', [ScriptController::class, 'generateScript'])->name('scripts.generateScript');


Route::get('video-idea-generator', [ScriptController::class, 'index'])->name('scripts.index');
Route::get('video-idea-generator/{script}', [ScriptController::class, 'show'])->name('scripts.show');
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/video-idea-generator/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('video-idea-generator/prompts', PromptController::class)
        ->names('prompts')
        ->parameters(['prompts' => 'prompt']);

    Route::resource('video-idea-generator/scripts', ScriptController::class)
        ->names('scripts')
        ->parameters(['scripts' => 'script'])
        ->except(['index', 'show']);

    Route::get('/user/credits', [ScriptController::class, 'getCredits'])->name('user.credits');
});

require __DIR__ . '/settings.php';
