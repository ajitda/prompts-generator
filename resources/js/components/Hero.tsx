import { Instagram, MessageSquare, Sparkles, Video, Zap } from 'lucide-react';

const Hero = () => {
    return (
        <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Creator Tools</span>
            </div>

            <h1 className="text-4xl leading-tight font-extrabold md:text-5xl lg:text-6xl">
                Create <span className="text-gradient">Viral Content</span>
                <br />
                Across Every Platform
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Beat creator's block in seconds. Get strategic, high-performing
                content ideas for YouTube, TikTok, Instagram, and more—all
                powered by AI.
            </p>

            {/* Platform Icons */}
            <div className="flex items-center justify-center gap-4 pt-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/50 bg-card shadow-card">
                    <Video className="h-6 w-6 text-primary" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/50 bg-card shadow-card">
                    <Instagram className="h-6 w-6 text-primary" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/50 bg-card shadow-card">
                    <MessageSquare className="h-6 w-6 text-blue-400" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-primary-foreground bg-gradient-hero">
                    +3
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-sm text-muted-foreground md:gap-6">
                <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>3+ AI Tools</span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Copy-Ready Content</span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>100% Free to Use</span>
                </div>
            </div>
        </div>
    );
};

export default Hero;
