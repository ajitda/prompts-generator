import {
    ArrowRight,
    Lightbulb,
    Sparkles,
    Target,
    TrendingUp,
    Zap,
} from 'lucide-react';

import Hero from '@/components/Hero';
import Meta from '@/components/meta';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import { Link } from '@inertiajs/react';
import ToolsShowcase from '@/components/ToolsShowcase';

function home() {
    return (
        <PublicLayout>
            <Meta
                title="Free Idea Generator Hub: YouTube, Business & Social"
                description="Beat creator's block with our AI YouTube strategist. Generate viral-worthy video ideas, high-CTR titles, and engaging scripts in seconds."
            />
            {/* Hero Section */}
            <main className="container mx-auto px-4 py-16 md:py-24">
                <section className="flex flex-col items-center">
                    <Hero />

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a href="#tools">
                            <Button
                                variant="hero"
                                size="lg"
                                className="h-12 px-8 text-base"
                            >
                                <Sparkles className="mr-2 h-5 w-5" />
                                Explore All Tools
                            </Button>
                        </a>
                        <Link href="/youtube">
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-12 px-8 text-base"
                            >
                                Try YouTube Generator
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Tools Section */}
                <ToolsShowcase />

                {/* Features Section */}
                <section id="features" className="mt-24 md:mt-32">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">
                            Everything You Need to{' '}
                            <span className="text-gradient">
                                Beat Creator's Block
                            </span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Get strategic, data-driven video ideas that are
                            built to perform—not random suggestions.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-border/50 bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-elegant">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                                <Target className="h-7 w-7 text-primary" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold">
                                High-CTR Titles
                            </h3>
                            <p className="leading-relaxed text-muted-foreground">
                                Every title is crafted under 60 characters with
                                curiosity-driven hooks that demand clicks.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border/50 bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-elegant">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                                <Lightbulb className="h-7 w-7 text-primary" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold">
                                Thumbnail Concepts
                            </h3>
                            <p className="leading-relaxed text-muted-foreground">
                                Get vivid, visual thumbnail ideas that pair
                                perfectly with your titles for maximum impact.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border/50 bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-elegant">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                                <TrendingUp className="h-7 w-7 text-primary" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold">
                                Hook Scripts
                            </h3>
                            <p className="leading-relaxed text-muted-foreground">
                                Copy-ready opening lines that grab attention in
                                the first 5 seconds and boost retention.
                            </p>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="mt-24 md:mt-32">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">
                            How It <span className="text-gradient">Works</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Go from stuck to publishing in under 60 seconds.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-3">
                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                                1
                            </div>
                            <h3 className="mb-3 text-xl font-bold">
                                Enter Your Niche
                            </h3>
                            <p className="text-muted-foreground">
                                Type in your topic, niche, or content area.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                                2
                            </div>
                            <h3 className="mb-3 text-xl font-bold">
                                AI Generates Ideas
                            </h3>
                            <p className="text-muted-foreground">
                                Our strategist AI creates viral-worthy
                                variations.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                                3
                            </div>
                            <h3 className="mb-3 text-xl font-bold">
                                Copy & Create
                            </h3>
                            <p className="text-muted-foreground">
                                Pick your favorite, copy it, and start creating.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/youtube">
                            <Button
                                variant="hero"
                                size="lg"
                                className="h-14 px-10 text-lg"
                            >
                                <Zap className="mr-2 h-5 w-5 fill-current" />
                                Try It Free Now
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
        </PublicLayout>
    );
}

export default home;
