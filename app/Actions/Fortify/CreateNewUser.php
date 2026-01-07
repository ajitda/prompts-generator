<?php

namespace App\Actions\Fortify;

use App\Models\User;
use App\Models\Script;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $request = app(Request::class); // Manually resolve Request instance
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
            'credits' => 10, // Assign initial credits
        ]);

        // Sync guest data
        $fingerprint = $request->cookie('browser_fingerprint') ?? $request->header('X-Browser-Fingerprint');

        if ($fingerprint) {
            Script::where('fingerprint', $fingerprint)
                ->whereNull('user_id')
                ->update(['user_id' => $user->id]);

            // Optionally, clear the guest credits from the session
            Session::forget('guest_credits');
        }

        return $user;
    }
}
