<?php

use App\Http\Controllers\CaptionController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PromptController;
use App\Http\Controllers\ScriptController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Auth;

Route::get('/sitemap.xml', [SitemapController::class, 'index']);

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

// YouTube Video Idea Generator
Route::get('youtube', [ScriptController::class, 'index'])->name('youtube.index')->defaults('type', 'youtube_idea');
Route::get('youtube/{script}', [ScriptController::class, 'show'])->name('youtube.show')->whereNumber('script');

// Video Script Generator
Route::get('scripts', [ScriptController::class, 'index'])->name('scripts.index')->defaults('type', 'video_script');
Route::get('scripts/{script}', [ScriptController::class, 'show'])->name('scripts.show')->whereNumber('script');

// Shared Generation Routes (Type will be passed in request)
Route::post('/generate/ideas', [ScriptController::class, 'generateIdeas'])->name('generate.ideas');
Route::post('/generate/story', [ScriptController::class, 'generateStory'])->name('generate.story');
Route::post('/generate/final', [ScriptController::class, 'generateScript'])->name('generate.script');
Route::post('/generate/detailed', [ScriptController::class, 'generateDetailedScript'])->name('generate.detailed');

Route::get('/blog/{post:slug}', [PostController::class, 'showPublic'])->name('posts.showPublic');
Route::get('/blog', [PostController::class, 'indexPublic'])->name('posts.indexPublic');

Route::get('/prompts', [PromptController::class, 'index'])->name('prompts.index');
Route::get('/prompts/{prompt}', [PromptController::class, 'show'])->name('prompts.show')->whereNumber('prompt');
Route::post('/prompts/generate', [PromptController::class, 'generate'])->name('prompts.generate');

Route::get('/captions', [CaptionController::class, 'index'])->name('captions.index');
Route::get('/captions/{caption}', [CaptionController::class, 'show'])->name('captions.show')->whereNumber('caption');
Route::post('/captions/generate', [CaptionController::class, 'generate'])->name('captions.generate');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/scripts/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('scripts/manage', ScriptController::class)
        ->names('scripts')
        ->parameters(['manage' => 'script'])
        ->except(['index', 'show']);

    Route::get('/user/credits', [ScriptController::class, 'getCredits'])->name('user.credits');

    Route::middleware('can:admin')->group(function () {
        Route::resource('/posts', PostController::class)
            ->names('posts')
            ->parameters(['posts' => 'post']);
    });

});

require __DIR__ . '/settings.php';
