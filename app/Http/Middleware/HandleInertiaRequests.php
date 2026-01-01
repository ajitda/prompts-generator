<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();

        $menuData = [
            'prompts' => [],
            'scripts' => []
        ];

        if ($user) {
            $cacheKey = "sidebar_menu_user_{$user->id}";

            $menuData = Cache::remember($cacheKey, now()->addDay(), function () use ($user) {
                return [
                    'prompts' => $user->prompts()->latest()->limit(10)->get(['id', 'keyword']),
                    'scripts' => $user->scripts()->latest()->limit(10)->get(['id', 'keyword']),
                ];
            });
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'credits' => $request->user()->credits,
                ] : null,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'session_data' => [
                'savedKeyword' => $request->session()->get('last_keyword'),
                'savedPrompt' => $request->session()->get('ai_response'),
                'savedIdeas' => $request->session()->get('ideas'),
                'savedStory' => $request->session()->get('story'),
                'savedScript' => $request->session()->get('script'),
            ],
            'menu_data' => $menuData,
        ];
    }
}
