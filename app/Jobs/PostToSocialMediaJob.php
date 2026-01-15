<?php

namespace App\Jobs;

use App\Models\Post;
use App\Services\SocialMediaService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class PostToSocialMediaJob implements ShouldQueue
{
    use \Illuminate\Foundation\Queue\Queueable;

    protected $post;

    /**
     * Create a new job instance.
     */
    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    /**
     * Execute the job.
     */
    public function handle(SocialMediaService $socialMediaService): void
    {
        $socialMediaService->postToAllPlatforms($this->post);
    }
}
