<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->get()->map(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'image' => $post->image ? Storage::url($post->image) : null,
                'image_original_name' => $post->image_original_name,
                'status' => $post->status,
                'scheduled_at' => $post->scheduled_at ? $post->scheduled_at->format('Y-m-d H:i') : null,
                'meta_title' => $post->meta_title,
                'meta_description' => $post->meta_description,
            ];
        });

        return Inertia::render('posts/index', ['posts' => $posts]);
    }

    public function create()
    {
        return Inertia::render('posts/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048', // 2MB Max
            'status' => 'required|in:published,draft,scheduled',
            'scheduled_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $validated['image'] = $file->store('posts', 'public'); // Saves to storage/app/public/posts
            $validated['image_original_name'] = $file->getClientOriginalName();
        }

        $post = Post::create($validated);

        if ($post->status === 'published') {
            \App\Jobs\PostToSocialMediaJob::dispatch($post);
        }

        return redirect()->route('posts.index')->with('success', 'Post created successfully.');
    }

    public function edit(Post $post)
    {
        return Inertia::render('posts/edit', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'image' => $post->image ? Storage::url($post->image) : null,
                'image_original_name' => $post->image_original_name,
                'status' => $post->status,
                'scheduled_at' => $post->scheduled_at ? $post->scheduled_at->format('Y-m-d\TH:i') : null,
                'meta_title' => $post->meta_title,
                'meta_description' => $post->meta_description,
            ]
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'status' => 'required|in:published,draft,scheduled',
            'scheduled_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }

            $file = $request->file('image');
            $validated['image'] = $file->store('posts', 'public');
            $validated['image_original_name'] = $file->getClientOriginalName();
        } else {
            // Remove image from validated data so it's not updated to null
            unset($validated['image']);
        }

        $wasDraft = $post->status === 'draft';
        $post->update($validated);

        if ($wasDraft && $post->status === 'published') {
            \App\Jobs\PostToSocialMediaJob::dispatch($post);
        }

        return redirect()->route('posts.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post)
    {
        // Clean up the file from storage before deleting the record
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->delete();

        return redirect()->back()->with('success', 'Post deleted.');
    }

    public function indexPublic()
    {
        // Changed 'image_path' to 'image' to match your migration
        $posts = Post::latest()
            ->where('status', 'published')
            ->select(['id', 'title', 'slug', 'image', 'created_at'])
            ->paginate(12);

        return Inertia::render('posts/index-public', [
            'posts' => $posts
        ]);
    }

    public function showPublic(Post $post)
    {
        if ($post->status !== 'published') {
            abort(404);
        }

        return Inertia::render('posts/show-public', [
            'post' => [
                'title' => $post->title,
                'content' => $post->content,
                'meta_title' => $post->meta_title,
                'meta_description' => $post->meta_description,
                // Changed $post->image_path to $post->image
                'image_url' => $post->image ? asset('storage/' . $post->image) : null,
                'created_at' => $post->created_at->format('M d, Y'),
            ]
        ]);
    }
}