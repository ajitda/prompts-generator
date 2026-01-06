<?php

namespace App\Actions\Fortify;

use App\Models\User;
use App\Models\Script;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Illuminate\Support\Facades\Session;

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
        $fingerprint = request()->fingerprint();

        if ($fingerprint) {
            Script::where('fingerprint', $fingerprint)
                ->update(['user_id' => $user->id, 'fingerprint' => null]);

            // Optionally, clear the guest credits from the session
            Session::forget('guest_credits');
        }

        return $user;
    }
}
