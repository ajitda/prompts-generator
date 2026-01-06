<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;

class SetBrowserFootprint
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->hasCookie('browser_footprint')) {
            $footprint = Str::uuid()->toString();
            Cookie::queue('browser_footprint', $footprint, 60 * 24 * 365);
            Log::info('New browser footprint set: ' . $footprint);
        } else {
            Log::info('Existing browser footprint: ' . $request->cookie('browser_footprint'));
        }

        if (!Session::has('guest_credits')) {
            Session::put('guest_credits', 5);
            Log::info('Guest credits initialized to 5.');
        } else {
            Log::info('Existing guest credits: ' . Session::get('guest_credits')); 
        }

        return $next($request);
    }
}
