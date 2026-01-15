<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SocialMediaService
{
    public function postToAllPlatforms(Post $post)
    {
        $this->postToFacebook($post);
        $this->postToLinkedIn($post);
    }

    public function postToFacebook(Post $post)
    {
        $token = config('services.facebook.token');
        $pageId = config('services.facebook.page_id');

        if (!$token || !$pageId) {
            Log::warning('Facebook credentials not set.');
            return;
        }

        try {
            $response = Http::post("https://graph.facebook.com/{$pageId}/feed", [
                'message' => $post->title . "\n\n" . strip_tags($post->content),
                'link' => route('posts.showPublic', $post->slug),
                'access_token' => $token,
            ]);

            if ($response->failed()) {
                Log::error('Facebook post failed: ' . $response->body());
            }
        } catch (\Exception $e) {
            Log::error('Facebook post exception: ' . $e->getMessage());
        }
    }


    public function postToLinkedIn(Post $post)
    {
        $token = config('services.linkedin.token');
        $urn = config('services.linkedin.urn');

        if (!$token || !$urn) {
            Log::warning('LinkedIn credentials not set.');
            return;
        }

        try {
            $response = Http::withToken($token)->post('https://api.linkedin.com/v2/ugcPosts', [
                'author' => "urn:li:person:{$urn}",
                'lifecycleState' => 'PUBLISHED',
                'specificContent' => [
                    'com.linkedin.ugc.ShareContent' => [
                        'shareCommentary' => [
                            'text' => $post->title . "\n\n" . strip_tags($post->content),
                        ],
                        'shareMediaCategory' => 'ARTICLE',
                        'media' => [
                            [
                                'status' => 'READY',
                                'originalUrl' => route('posts.showPublic', $post->slug),
                            ],
                        ],
                    ],
                ],
                'visibility' => [
                    'com.linkedin.ugc.MemberNetworkVisibility' => 'PUBLIC',
                ],
            ]);

            if ($response->failed()) {
                Log::error('LinkedIn post failed: ' . $response->body());
            }
        } catch (\Exception $e) {
            Log::error('LinkedIn post exception: ' . $e->getMessage());
        }
    }
}
