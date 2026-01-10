import PromptGenerator from '@/components/PromptGenerator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Prompt Generator',
        href: '/prompts',
    },
];

export default function PromptsIndex() {
    const { props } = usePage<any>();
    const { isAuthenticated, initialGuestCredits, userCredits } = props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>Prompt Generator - Midjourney, DALL-E, & ChatGPT</title>
                <meta
                    name="description"
                    content="Generate high-quality AI prompts for image generation and AI conversations."
                />
            </Head>
            <div className="min-h-screen bg-background">
                <main className="container mx-auto px-4 py-12 md:py-20">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-black tracking-tight text-foreground md:text-6xl">
                            <span className="text-gradient">Prompt</span>{' '}
                            Generator
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Engineer the perfect prompts for Midjourney, Gemini, Grok, Deepseek,
                            and ChatGPT in seconds. Unlock the full potential of
                            AI.
                        </p>
                    </div>

                    <PromptGenerator
                        isAuthenticated={isAuthenticated}
                        initialGuestCredits={initialGuestCredits}
                        userCredits={userCredits}
                    />
                </main>
            </div>
        </AppLayout>
    );
}
