<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PublishScheduledPosts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'posts:publish-scheduled';
    protected $description = 'Publish scheduled posts and share them on social media';

    public function handle()
    {
        $posts = \App\Models\Post::where('status', 'scheduled')
            ->whereNotNull('scheduled_at')
            ->where('scheduled_at', '<=', now())
            ->get();

        if ($posts->isEmpty()) {
            $this->info('No scheduled posts to publish.');
            return;
        }

        foreach ($posts as $post) {
            $post->update(['status' => 'published']);
            $this->info("Published: {$post->title}");

            // Trigger social media posting
            \App\Jobs\PostToSocialMediaJob::dispatch($post);
        }

        $this->info('Scheduled posts publishing process completed.');
    }
}
