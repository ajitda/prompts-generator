<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
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
        $fingerprint = $request->header('X-Browser-Fingerprint');

        if ($fingerprint) {
            // We'll store the fingerprint in the session so it's easily accessible throughout the request lifecycle.
            Session::put('browser_fingerprint', $fingerprint);
            Log::info('Browser fingerprint from header: ' . $fingerprint);
        } else {
            Log::warning('X-Browser-Fingerprint header missing.');
            // Optionally, you could fall back to a session ID or generate one if the header is always expected.
            // For now, if missing, the footprint won't be set in the session, which will result in null being stored.
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
