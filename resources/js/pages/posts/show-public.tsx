import Meta from '@/components/meta';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import { Link } from '@inertiajs/react';
import { Calendar, Sparkles } from 'lucide-react';

interface PublicPost {
    title: string;
    content: string;
    image_url: string | null;
    created_at: string;
}

export default function ShowPublic({ post }: { post: PublicPost }) {
    // Basic HTML stripping for description
    const description = post.content
        .replace(/<[^>]*>?/gm, '')
        .substring(0, 160)
        .trim();

    return (
        <PublicLayout>
            <Meta
                title={post.title}
                description={description}
                image={post.image_url || undefined}
                type="article"
            />

            <main className="container mx-auto max-w-4xl px-4 py-16">
                <article>
                    <header className="mb-10">
                        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {post.created_at}
                        </div>
                        <h1 className="mb-8 text-2xl leading-relaxed font-extrabold tracking-wide md:text-3xl lg:text-4xl">
                            {post.title}
                        </h1>
                        {post.image_url && (
                            <div className="shadow-elegant relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50">
                                <img
                                    src={post.image_url}
                                    alt={post.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        )}
                    </header>

                    <div
                        className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl max-w-none leading-loose"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>

                <div className="mt-16 border-t border-border/50 pt-10">
                    <div className="rounded-2xl bg-muted/50 p-8 text-center">
                        <h3 className="mb-4 text-2xl font-bold">
                            Ready to boost your YouTube growth?
                        </h3>
                        <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
                            Join thousands of creators using our AI to generate
                            high-performing video ideas and scripts.
                        </p>
                        <Link href="/youtube">
                            <Button
                                size="lg"
                                className="bg-primary text-primary-foreground"
                            >
                                <Sparkles className="mr-2 h-4 w-4" />
                                Start Generating Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
