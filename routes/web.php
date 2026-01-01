<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\PromptController;
use App\Http\Controllers\ScriptController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/prompts-generator', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::post('/prompts/generate', [PromptController::class, 'generate'])->name('prompts.generate');

Route::post('/scripts/ideas', [ScriptController::class, 'generateIdeas'])->name('scripts.generateIdeas');
Route::post('/scripts/story', [ScriptController::class, 'generateStory'])->name('scripts.generateStory');
Route::post('/scripts/final', [ScriptController::class, 'generateScript'])->name('scripts.generateScript');

Route::get('/prompts-generator/blog/{post:slug}', [PostController::class, 'showPublic'])
    ->name('posts.show.public');

Route::get('/prompts-generator/blog', [PostController::class, 'indexPublic'])
    ->name('posts.index.public');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/prompts-generator/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');    
    
    Route::resource('prompts-generator/prompts', PromptController::class)
    ->names('prompts')
    ->parameters(['prompts' => 'prompt']);
    
    Route::resource('prompts-generator/scripts', ScriptController::class)
    ->names('scripts')
    ->parameters(['scripts' => 'script']);

    Route::middleware('can:admin')->group(function () {
        Route::resource('/prompts-generator/posts', PostController::class)
            ->names('posts')
            ->parameters(['posts' => 'post']);
    });
});

require __DIR__.'/settings.php';
