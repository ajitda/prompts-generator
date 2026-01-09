<?php

use App\Http\Controllers\CaptionController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PromptController;
use App\Http\Controllers\ScriptController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('home', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/privacy', function () {
    return Inertia::render('privacy');
})->name('privacy');

Route::get('/terms', function () {
    return Inertia::render('terms');
})->name('terms');

Route::post('/scripts/story', [ScriptController::class, 'generateStory'])->name('scripts.generateStory');
Route::post('/scripts/final', [ScriptController::class, 'generateScript'])->name('scripts.generateScript');

Route::get('/blog/{post:slug}', [PostController::class, 'showPublic'])
    ->name('posts.showPublic');

Route::get('/blog', [PostController::class, 'indexPublic'])
    ->name('posts.indexPublic');

Route::post('/prompts/generate', [PromptController::class, 'generate'])->name('prompts.generate');

Route::post('/scripts/ideas', [ScriptController::class, 'generateIdeas'])->name('scripts.generateIdeas');
Route::post('/scripts/story', [ScriptController::class, 'generateStory'])->name('scripts.generateStory');
Route::post('/scripts/final', [ScriptController::class, 'generateScript'])->name('scripts.generateScript');


Route::get('youtube', [ScriptController::class, 'index'])->name('scripts.index');
Route::get('youtube/{script}', [ScriptController::class, 'show'])->name('scripts.show')->whereNumber('script');

Route::get('/captions', [CaptionController::class, 'index'])->name('captions.index');
Route::get('/captions/{caption}', [CaptionController::class, 'show'])->name('captions.show')->whereNumber('caption');
Route::post('/captions/generate', [CaptionController::class, 'generate'])->name('captions.generate');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/youtube/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('youtube/prompts', PromptController::class)
        ->names('prompts')
        ->parameters(['prompts' => 'prompt']);

    Route::resource('youtube/scripts', ScriptController::class)
        ->names('scripts')
        ->parameters(['scripts' => 'script'])
        ->except(['index', 'show']);

    Route::get('/user/credits', [ScriptController::class, 'getCredits'])->name('user.credits');

    Route::middleware('can:admin')->group(function () {
        Route::resource('/prompts-generator/posts', PostController::class)
            ->names('posts')
            ->parameters(['posts' => 'post']);
    });

});

require __DIR__ . '/settings.php';
