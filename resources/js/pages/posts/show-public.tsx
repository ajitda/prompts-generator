import Meta from '@/components/meta';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    Check,
    Copy,
    Facebook,
    Linkedin,
    Share2,
    Sparkles,
    Twitter,
} from 'lucide-react';
import { useState } from 'react';

interface PublicPost {
    title: string;
    content: string;
    image_url: string | null;
    created_at: string;
    meta_title?: string;
    meta_description?: string;
}

export default function ShowPublic({ post }: { post: PublicPost }) {
    const [copied, setCopied] = useState(false);

    const description = post.content
        .replace(/<[^>]*>?/gm, '')
        .substring(0, 160)
        .trim();

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = post.title;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <PublicLayout>
            <Head>
                <title>{post.meta_title || post.title}</title>
                <meta
                    name="description"
                    content={post.meta_description || description}
                />
                {post.image_url && (
                    <meta name="image" content={post.image_url} />
                )}
                <meta name="type" content="article" />
            </Head>
            <Meta
                title={post.meta_title || post.title}
                description={post.meta_description || description.slice(0, 160)}
                image={post.image_url || ''}
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
                            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 shadow-elegant">
                                <img
                                    src={post.image_url}
                                    alt={post.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                            </div>
                        )}
                    </header>

                    <div
                        className="blog-content prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl max-w-none leading-loose"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Social Share Buttons */}
                    <div className="mt-12 flex flex-col gap-6 rounded-2xl border border-border/40 bg-muted/20 p-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Share2 className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">
                                    Share this article
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    Spread the knowledge with your network
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-xl hover:border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]"
                                >
                                    <Twitter className="h-4 w-4" />
                                </Button>
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-xl hover:border-[#1877F2]/30 hover:bg-[#1877F2]/10 hover:text-[#1877F2]"
                                >
                                    <Facebook className="h-4 w-4" />
                                </Button>
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-xl hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
                                >
                                    <Linkedin className="h-4 w-4" />
                                </Button>
                            </a>
                            <div className="mx-2 h-6 w-px bg-border/40" />
                            <Button
                                variant="outline"
                                onClick={copyToClipboard}
                                className="h-10 rounded-xl px-4"
                            >
                                {copied ? (
                                    <>
                                        <Check className="mr-2 h-4 w-4 text-green-500" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="mr-2 h-4 w-4" />
                                        Copy Link
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
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
