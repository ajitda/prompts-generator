import { Lightbulb, Sparkles, Target, TrendingUp, Zap } from 'lucide-react';

import Hero from '@/components/Hero';
import Meta from '@/components/meta';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import { Link } from '@inertiajs/react';

function home() {
    return (
        <PublicLayout>
            <Meta
                title="AI YouTube Video Idea Generator"
                description="Beat creator's block with our AI YouTube strategist. Generate viral-worthy video ideas, high-CTR titles, and engaging scripts in seconds."
            />
            {/* Hero Section */}
            <main className="container mx-auto px-4 py-16 md:py-24">
                <Hero />

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href="youtube">
                        <Button
                            variant="hero"
                            size="lg"
                            className="bg-indigo-600 px-8 text-base text-white"
                        >
                            <Sparkles className="mr-2 h-5 w-5" />
                            Generate Ideas Now
                        </Button>
                    </Link>
                    <a href="#how-it-works">
                        <Button
                            variant="outline"
                            size="lg"
                            className="px-8 text-base"
                        >
                            See How It Works
                        </Button>
                    </a>
                </div>

                {/* Features Section */}
                <section id="features" className="mt-24 md:mt-32">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            Everything You Need to{' '}
                            <span className="text-gradient">
                                Beat Creator's Block
                            </span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            Get strategic, data-driven video ideas that are
                            built to perform—not random suggestions.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
                        <div className="hover:shadow-elegant rounded-xl border border-border/50 bg-card p-6 transition-shadow">
                            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                                <Target className="text-primary h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">
                                High-CTR Titles
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Every title is crafted under 60 characters with
                                curiosity-driven hooks that demand clicks.
                            </p>
                        </div>

                        <div className="hover:shadow-elegant rounded-xl border border-border/50 bg-card p-6 transition-shadow">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                                <Lightbulb className="text-primary h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">
                                Thumbnail Concepts
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Get vivid, visual thumbnail ideas that pair
                                perfectly with your titles for maximum impact.
                            </p>
                        </div>

                        <div className="hover:shadow-elegant rounded-xl border border-border/50 bg-card p-6 transition-shadow">
                            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                                <TrendingUp className="text-primary h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">
                                Hook Scripts
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Copy-ready opening lines that grab attention in
                                the first 5 seconds and boost retention.
                            </p>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="mt-24 md:mt-32">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            How It <span className="text-gradient">Works</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            Go from stuck to publishing in under 60 seconds.
                        </p>
                    </div>

                    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 md:flex-row">
                        <div className="flex-1 text-center">
                            <div className="bg-gradient-hero text-primary-foreground mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
                                1
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">
                                Enter Your Niche
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Type in your topic, niche, or content area.
                            </p>
                        </div>

                        <div className="hidden h-0.5 w-12 bg-border md:block"></div>

                        <div className="flex-1 text-center">
                            <div className="bg-gradient-hero text-primary-foreground mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
                                2
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">
                                AI Generates Ideas
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Our YouTube strategist AI creates 5 viral-worthy
                                ideas.
                            </p>
                        </div>

                        <div className="hidden h-0.5 w-12 bg-border md:block"></div>

                        <div className="flex-1 text-center">
                            <div className="bg-gradient-hero text-primary-foreground mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
                                3
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">
                                Copy & Create
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Pick your favorite, copy it, and start creating.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/youtube">
                            <Button
                                variant="hero"
                                size="lg"
                                className="bg-indigo-600 px-8 text-base text-white"
                            >
                                <Zap className="mr-2 h-5 w-5" />
                                Try It Free
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
        </PublicLayout>
    );
}

export default home;
