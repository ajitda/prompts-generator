import { Head } from '@inertiajs/react';

interface PublicPost {
    title: string;
    content: string;
    image_url: string | null;
    created_at: string;
}

export default function ShowPublic({ post }: { post: PublicPost }) {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <Head title={post.title} />
            
            <article className="prose prose-lg mx-auto dark:prose-invert">
                <header className="mb-8">
                    <p className="text-sm text-muted-foreground">{post.created_at}</p>
                    <h1 className="text-4xl font-extrabold tracking-tight">{post.title}</h1>
                </header>

                {post.image_url && (
                    <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full rounded-xl mb-8 object-cover max-h-[400px]" 
                    />
                )}

                {/* We use dangerouslySetInnerHTML because TinyMCE saves HTML content */}
                <div 
                    className="mt-6"
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                />
            </article>
            
            <div className="mt-12 pt-6 border-t">
                <a href="/prompts-generator" className="text-blue-600 hover:underline">← Back to Home</a>
            </div>
        </div>
    );
}
