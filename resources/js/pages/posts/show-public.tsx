import { Head } from '@inertiajs/react';

interface PublicPost {
    title: string;
    content: string;
    image_url: string | null;
    created_at: string;
}

export default function ShowPublic({ post }: { post: PublicPost }) {
    return (
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <Head title={post.title} />

            <article className="prose prose-lg dark:prose-invert mx-auto">
                <header className="mb-8">
                    <p className="text-sm text-muted-foreground">
                        {post.created_at}
                    </p>
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        {post.title}
                    </h1>
                </header>

                {post.image_url && (
                    <img
                        src={post.image_url}
                        alt={post.title}
                        className="mb-8 max-h-[400px] w-full rounded-xl object-cover"
                    />
                )}

                {/* We use dangerouslySetInnerHTML because TinyMCE saves HTML content */}
                <div
                    className="mt-6"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>

            <div className="mt-12 border-t pt-6">
                <a
                    href="/prompts-generator"
                    className="text-blue-600 hover:underline"
                >
                    ← Back to Home
                </a>
            </div>
        </div>
    );
}
