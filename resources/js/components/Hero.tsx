import { Sparkles, Zap } from 'lucide-react';

const Hero = () => {
    return (
        <div className="mb-12 space-y-6 text-center">
            <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered YouTube Strategy</span>
            </div>

            <h1 className="text-4xl leading-tight font-extrabold md:text-5xl lg:text-6xl">
                Turn Any Niche Into{' '}
                <span className="text-gradient">Viral YouTube Ideas</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Beat creator's block in seconds. Get strategic, high-CTR video
                ideas tailored to your niche—complete with titles, thumbnail
                concepts, and hook scripts.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Zap className="text-primary h-4 w-4" />
                    <span>5 Ideas per Generation</span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="text-primary h-4 w-4" />
                    <span>Copy-Ready Scripts</span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="text-primary h-4 w-4" />
                    <span>Free to Use</span>
                </div>
            </div>
        </div>
    );
};

export default Hero;
