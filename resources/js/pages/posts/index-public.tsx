import { Button } from '@/components/ui/button';
import postsRoutes from '@/routes/posts';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BookOpen, Calendar, Sparkles } from 'lucide-react';

interface PostSummary {
    id: number;
    title: string;
    slug: string;
    image: string | null;
    created_at: string;
}

interface Props {
    posts: {
        data: PostSummary[];
        links: any[];
    };
}

export default function IndexPublic({ posts }: Props) {
    return (
        <div className="min-h-screen bg-background">
            <Head title="Blog - Video Idea Generator" />

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
                            className="font-medium text-foreground transition-colors"
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

            <main className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="mb-20 text-center">
                    <h1 className="mb-4 text-2xl font-extrabold tracking-tight md:text-4xl">
                        Our <span className="text-gradient">Blog</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-xl">
                        Stay ahead of the competition with the latest tips,
                        tricks, and insights on AI-driven content creation and
                        YouTube growth.
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.data.map((post) => (
                        <Link
                            key={post.id}
                            href={postsRoutes.showPublic(post.slug).url}
                            className="group hover:shadow-elegant flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:-translate-y-1"
                        >
                            <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                                {post?.image ? (
                                    <img
                                        src={`/storage/${post.image}`}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-muted-foreground">
                                        <BookOpen className="h-10 w-10 opacity-20" />
                                    </div>
                                )}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {new Date(
                                        post.created_at,
                                    ).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </div>
                                <h2 className="group-hover:text-primary mb-3 line-clamp-2 text-xl font-bold transition-colors">
                                    {post.title}
                                </h2>
                                <div className="text-primary mt-auto flex items-center text-sm font-semibold group-hover:underline">
                                    Read Article
                                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {posts.links.length > 3 && (
                    <div className="mt-16 flex justify-center gap-2">
                        {posts.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors ${
                                    link.active
                                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                                        : 'border-border/50 bg-card text-muted-foreground hover:bg-muted'
                                } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                            />
                        ))}
                    </div>
                )}
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
