<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    // AI keys

    'openrouter' => [
        'key' => env('OPENROUTER_API_KEY'),
    ],

    'groq' => [
        'key' => env('GROQ_API_KEY'),
    ],
    'huggingface' => [
        'key' => env('HF_API_KEY'),
    ],
    'gemini' => [
        'key' => env('GEMINI_API_KEY'),
    ],

    'facebook' => [
        'token' => env('FACEBOOK_ACCESS_TOKEN'),
        'page_id' => env('FACEBOOK_PAGE_ID'),
    ],

    'instagram' => [
        'token' => env('INSTAGRAM_ACCESS_TOKEN'),
        'account_id' => env('INSTAGRAM_ACCOUNT_ID'),
    ],

    'twitter' => [
        'consumer_key' => env('TWITTER_CONSUMER_KEY'),
        'consumer_secret' => env('TWITTER_CONSUMER_SECRET'),
        'access_token' => env('TWITTER_ACCESS_TOKEN'),
        'access_token_secret' => env('TWITTER_ACCESS_TOKEN_SECRET'),
    ],

    'linkedin' => [
        'token' => env('LINKEDIN_ACCESS_TOKEN'),
        'urn' => env('LINKEDIN_URN'),
    ],

];
