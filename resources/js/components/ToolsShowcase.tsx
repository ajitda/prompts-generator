import { Instagram, MessageSquare, Sparkles, Video } from 'lucide-react';
import ToolCard from './ToolCard';

const tools = [
    {
        title: 'YouTube Ideas Generator',
        description:
            'Generate viral-worthy video ideas, high-CTR titles, and engaging hook scripts in seconds.',
        icon: Video,
        href: '/youtube',
        badge: 'Popular',
        gradient: 'primary' as const,
    },
    {
        title: 'Prompt Generator',
        description:
            'Engineer the perfect prompts for Midjourney, ChatGPT, Gemini, Grok, and Deepseek.',
        icon: MessageSquare,
        href: '/prompts',
        badge: 'Popular',
        gradient: 'accent' as const,
    },
    {
        title: 'Tiktok/Instagram Captions Generator',
        description:
            'Create high-engagement captions for TikTok, Instagram, and more with optimized hashtags.',
        icon: Instagram,
        href: '/captions',
        badge: 'Popular',
        gradient: 'primary' as const,
    },
];

const ToolsShowcase = () => {
    return (
        <section id="tools" className="mt-24 md:mt-32">
            <div className="mb-12 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                    <Sparkles className="h-4 w-4" />
                    <span>AI Creator Hub</span>
                </div>
                <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">
                    One Platform,{' '}
                    <span className="text-gradient">
                        All Your Content Needs
                    </span>
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    From YouTube to TikTok to Instagram—generate scroll-stopping
                    content ideas in seconds with our suite of AI-powered tools.
                </p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool, index) => (
                    <div
                        key={tool.title}
                        className="animate-reveal h-full"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <ToolCard {...tool} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ToolsShowcase;
