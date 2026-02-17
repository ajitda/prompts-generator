import IdeaCard from '@/components/IdeaCard';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

interface Idea {
    idea: {
        Title: string;
        Thumbnail_Concept: string;
        Hook_Script: string;
        Difficulty: string;
    };
}

interface Props {
    ideas: Idea[];
    script: {
        id: number;
        keyword: string;
        title: string;
        script: any;
        idea: any;
    };
    type: 'youtube_idea' | 'video_script';
}

const IdeaCardContainer = ({ script }: { script: any }) => {
    const ideas = script.idea ?? [];
    return (
        <>
            {ideas.map((idea: any, index: number) => (
                <IdeaCard
                    key={index}
                    index={index}
                    idea={idea}
                // onSelect={() => handleSelectIdea(idea)}
                />
            ))}
        </>
    );
};

export default function Show({ script, type }: Props) {
    const isIdeaGenerator = type === 'youtube_idea';
    const toolTitle = isIdeaGenerator ? 'YouTube Video Idea Generator' : 'Video Script Generator';
    const toolHref = isIdeaGenerator ? '/youtube' : '/scripts';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: toolTitle,
            href: toolHref,
        },
    ];

    const scriptContent = script.script?.script || 'No script content found.';
    const tone = script.script?.tone || 'Professional';

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={`Script - ${script.keyword}`} />

                <div className="mx-auto max-w-5xl py-12 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold">
                            Your Video Ideas for{' '}
                            <span className="text-primary">
                                "{script.keyword}"
                            </span>
                        </h2>
                        <IdeaCardContainer script={script} />
                    </div>

                    {/* <ScriptView
                        selectedIdea={script.title || script.keyword}
                        script={scriptContent}
                        tone={tone}
                        onBack={() => window.history.back()}
                        onRegenerate={() => {
                            console.log("Regenerate requested");
                        }}
                        onStartOver={() => router.get(isIdeaGenerator ? '/youtube' : '/scripts')}
                        isLoading={false}
                    /> */}
                </div>
            </AppLayout>
        </>
    );
}
