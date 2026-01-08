import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Caption {
    Style: string;
    Content: string;
    Hashtags: string;
}

interface ShowProps {
    caption: {
        id: number;
        topic: string;
        content: Caption[];
        created_at: string;
    };
}

export default function CaptionShow({ caption }: ShowProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Caption Generator',
            href: '/captions',
        },
        {
            title: caption.topic,
            href: `/captions/${caption.id}`,
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
            <Head title={`Captions: ${caption.topic}`} />
            <div className="min-h-screen bg-background py-16">
                <div className="container mx-auto max-w-4xl px-4 font-sans">
                    <div className="mb-8">
                        <Link href="/captions">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" /> Back to
                                Generator
                            </Button>
                        </Link>
                    </div>

                    <div className="mb-12">
                        <h1 className="mb-2 text-3xl font-black tracking-tight">
                            Captions for:{' '}
                            <span className="text-gradient">
                                "{caption.topic}"
                            </span>
                        </h1>
                        <p className="text-sm font-medium text-muted-foreground">
                            Generated on{' '}
                            {new Date(caption.created_at).toLocaleDateString(
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
                        {caption.content.map((item, index) => (
                            <Card
                                key={index}
                                className="animate-reveal border-border/40 bg-card/50 p-6 backdrop-blur-xl transition-all hover:shadow-lg"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black tracking-widest text-primary uppercase">
                                        {item.Style}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="transition-colors hover:bg-primary/10 hover:text-primary"
                                        onClick={() =>
                                            copyToClipboard(
                                                `${item.Content}\n\n${item.Hashtags}`,
                                                index,
                                            )
                                        }
                                    >
                                        {copiedIndex === index ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                <p className="mb-4 text-lg leading-relaxed font-medium whitespace-pre-wrap text-foreground">
                                    {item.Content}
                                </p>
                                <p className="text-sm font-bold tracking-tight text-primary">
                                    {item.Hashtags}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
