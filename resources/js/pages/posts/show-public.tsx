import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Sparkles } from 'lucide-react';

interface PublicPost {
    title: string;
    content: string;
    image_url: string | null;
    created_at: string;
}

export default function ShowPublic({ post }: { post: PublicPost }) {
    return (
        <div className="min-h-screen bg-background">
            <Head title={`${post.title} - Video Idea Generator`} />

            {/* Header - Matching Home */}
            <header className="sticky top-0 z-50 border-b border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-gradient-hero flex h-8 w-8 items-center justify-center rounded-lg">
                            <Sparkles className="text-primary-foreground h-4 w-4" />
                        </div>
                        <span className="text-lg font-bold">
                            Video Idea Generator
                        </span>
                    </Link>
                    <nav className="hidden items-center gap-6 text-sm md:flex">
                        <Link
                            href="/"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Home
                        </Link>
                        <Link
                            href="/blogs"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Blogs
                        </Link>
                    </nav>
                    <Link href="/video-idea-generator">
                        <Button variant="default" size="sm">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="container mx-auto max-w-4xl px-4 py-16">
                {/* <Link
                    href="/blogs"
                    className="hover:text-primary mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to all blogs
                </Link> */}

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
                        <Link href="/video-idea-generator">
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

            {/* Footer - Matching Home */}
            <footer className="mt-20 border-t border-border/50">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-hero flex h-6 w-6 items-center justify-center rounded-md">
                                <Sparkles className="text-primary-foreground h-3 w-3" />
                            </div>
                            <span className="text-sm font-semibold">
                                Video Idea Generator
                            </span>
                        </div>
                        <p className="text-center text-sm text-muted-foreground">
                            Helping creators publish with clarity since 2025
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <a
                                href="#"
                                className="transition-colors hover:text-foreground"
                            >
                                Privacy
                            </a>
                            <a
                                href="#"
                                className="transition-colors hover:text-foreground"
                            >
                                Terms
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
