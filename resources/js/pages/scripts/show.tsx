import IdeaCard from '@/components/IdeaCard';
import SceneView from '@/components/SceneView';
import ScriptView from '@/components/ScriptView';
import StoryView from '@/components/StoryView';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

interface Props {
    script: {
        id: number;
        keyword: string;
        title: string;
        script: any;
        idea: any;
        story: any;
        type: string;
    };
    type: 'youtube_idea' | 'video_script';
}

export default function Show({ script, type }: Props) {
    const isIdeaGenerator = type === 'youtube_idea';
    const toolTitle = isIdeaGenerator ? 'YouTube Video Idea Generator' : 'Video Script Generator';
    const toolHref = isIdeaGenerator ? '/youtube' : '/scripts';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: toolTitle,
            href: toolHref,
        },
        {
            title: 'History',
            href: toolHref,
        }
    ];

    // Transform if it's an array of strings (new prompt format)
    const formattedIdeas = Array.isArray(script.idea) && typeof script.idea[0] === 'string'
        ? script.idea.map((title: string) => ({
            Title: title,
            Difficulty: 'Medium'
        }))
        : (script.idea ?? []);

    const selectedConcept = formattedIdeas.find((i: any) => i.Title === script.title);
    const storySections = script.story?.sections || [];
    const scenes = script.script?.scenes || [];
    const plainScript = script.script?.script || '';
    const tone = script.script?.tone || 'Professional';

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={`History - ${script.keyword}`} />

                <div className="mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        {/* Keyword Section */}
                        <div className="space-y-4 text-center">
                            <h1 className="text-3xl font-black tracking-tight md:text-4xl text-foreground">
                                Script History: <span className="text-primary">"{script.keyword}"</span>
                            </h1>
                            <p className="text-muted-foreground">Detailed breakdown of your generated content</p>
                        </div>

                        {/* 1. Selected Idea (if exists) or All Ideas */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b pb-4">
                                <div className="h-8 w-1 bg-primary rounded-full" />
                                <h2 className="text-xl font-bold uppercase tracking-wider text-foreground/80">
                                    {selectedConcept ? 'Selected Concept' : 'Generated Ideas'}
                                </h2>
                            </div>

                            {selectedConcept ? (
                                <IdeaCard
                                    index={0}
                                    idea={selectedConcept}
                                    onSelect={() => { }}
                                />
                            ) : (
                                <div className="grid gap-6">
                                    {formattedIdeas.map((idea: any, index: number) => (
                                        <IdeaCard
                                            key={index}
                                            index={index}
                                            idea={idea}
                                            onSelect={() => { }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 2. Storyboard/Outline (if exists) */}
                        {storySections.length > 0 && (
                            <div className="space-y-6 text-foreground">
                                <div className="flex items-center gap-3 border-b pb-4">
                                    <div className="h-8 w-1 bg-amber-500 rounded-full" />
                                    <h2 className="text-xl font-bold uppercase tracking-wider text-foreground/80">Visual Outline & Storyboard</h2>
                                </div>
                                <StoryView
                                     selectedIdea={script.title}
                                     story={storySections}
                                     onRegenerate={() => { }}
                                     onGenerateScript={() => { }}
                                     onBack={() => { }}
                                     isLoading={false}
                                     readOnly={true}
                                 />
                            </div>
                        )}

                        {/* 3. Final Script (Scenes or Plain Text) */}
                        {(scenes.length > 0 || plainScript) && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 border-b pb-4">
                                    <div className="h-8 w-1 bg-green-500 rounded-full" />
                                    <h2 className="text-xl font-bold uppercase tracking-wider text-foreground/80">Final Generated Script</h2>
                                </div>
                                {scenes.length > 0 ? (
                                    <SceneView
                                        selectedIdea={script.title}
                                        scenes={scenes}
                                        tone={tone}
                                        onBack={() => { }}
                                        onRegenerate={() => { }}
                                        onStartOver={() => router.get(toolHref)}
                                        isLoading={false}
                                        readOnly={true}
                                    />
                                ) : (
                                    <ScriptView
                                        selectedIdea={script.title}
                                        script={plainScript}
                                        tone={tone}
                                        onBack={() => { }}
                                        onRegenerate={() => { }}
                                        onStartOver={() => router.get(toolHref)}
                                        isLoading={false}
                                        showExisting={true}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
