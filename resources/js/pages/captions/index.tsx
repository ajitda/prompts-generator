import CaptionGenerator from '@/components/CaptionGenerator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Caption Generator',
        href: '/youtube/captions',
    },
];

export default function CaptionsIndex() {
    const { props } = usePage<any>();
    const { isAuthenticated } = props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>TikTok & Instagram Caption Generator</title>
                <meta
                    name="description"
                    content="Generate high-engagement captions for TikTok and Instagram using AI."
                />
            </Head>
            <div className="min-h-screen bg-background">
                <main className="container mx-auto px-4 py-12 md:py-20">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-black tracking-tight text-foreground md:text-6xl">
                            Social Media{' '}
                            <span className="text-gradient">Caption</span>{' '}
                            Generator
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Create viral-worthy captions for TikTok and
                            Instagram in seconds. Built for creators who want to
                            save time and boost engagement.
                        </p>
                    </div>

                    <CaptionGenerator isAuthenticated={isAuthenticated} />
                </main>
            </div>
        </AppLayout>
    );
}
