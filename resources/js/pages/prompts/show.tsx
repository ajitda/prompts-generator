import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface AIPrompt {
    Style: string;
    Content: string;
    Engine: string;
}

interface ShowProps {
    prompt: {
        id: number;
        keyword: string;
        prompt: AIPrompt[];
        created_at: string;
    };
}

export default function PromptShow({ prompt }: ShowProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Prompt Generator',
            href: '/prompts',
        },
        {
            title: prompt.keyword,
            href: `/prompts/${prompt.id}`,
        },
    ];

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
        toast.success('Copied to clipboard!');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`AI Prompts: ${prompt.keyword}`} />
            <div className="min-h-screen bg-background py-8">
                <div className="container mx-auto max-w-4xl px-4 font-sans">
                    <div className="mb-8">
                        <Link href="/prompts">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" /> Back to
                                Generator
                            </Button>
                        </Link>
                    </div>

                    <div className="mb-12">
                        <h1 className="mb-2 text-3xl font-black tracking-tight">
                            Prompts for:{' '}
                            <span className="text-gradient">
                                "{prompt.keyword}"
                            </span>
                        </h1>
                        <p className="text-sm font-medium text-muted-foreground">
                            Generated on{' '}
                            {new Date(prompt.created_at).toLocaleDateString(
                                'en-US',
                                {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                },
                            )}
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {prompt.prompt.map((item, index) => (
                            <Card
                                key={index}
                                className="animate-reveal border-border/40 bg-card/50 p-6 backdrop-blur-xl transition-all hover:shadow-lg"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black tracking-widest text-primary uppercase">
                                            {item.Style}
                                        </span>
                                        <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                            {item.Engine}
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="transition-colors hover:bg-primary/10 hover:text-primary"
                                        onClick={() =>
                                            copyToClipboard(item.Content, index)
                                        }
                                    >
                                        {copiedIndex === index ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                <p className="mb-4 text-lg leading-relaxed font-medium whitespace-pre-wrap text-foreground italic">
                                    "{item.Content}"
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
