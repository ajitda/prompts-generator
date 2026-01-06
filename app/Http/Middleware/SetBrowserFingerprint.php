<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;

class SetBrowserFingerprint
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // This middleware now only initializes guest credits.
        // The browser fingerprint is retrieved directly via request()->fingerprint()
        // where it's needed (e.g., in controllers, actions).

        if (!Session::has('guest_credits')) {
            Session::put('guest_credits', 5);
            Log::info('Guest credits initialized to 5.');
        } else {
            Log::info('Existing guest credits: ' . Session::get('guest_credits'));
        }

        return $next($request);
    }
}
