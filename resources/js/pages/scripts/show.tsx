import { index as scriptsIndex } from '@/actions/App/Http/Controllers/ScriptController';
import IdeaCard from '@/components/IdeaCard';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'AI Video Scripts',
        href: scriptsIndex().url,
    },
];

export default function Show({ ideas, script }: Props) {
    const scriptContent = script.script?.script || 'No script content found.';
    const tone = script.script?.tone || 'Professional';

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={`Script - ${script.keyword}`} />

                <div className="mx-auto sm:px-6 lg:px-8 py-12 max-w-5xl">
                    <div className="space-y-6">
                        {ideas.map((item, index) => (
                            <IdeaCard
                                key={index}
                                index={index}
                                idea={item.idea}
                                // onSelect={() => handleSelectIdea(idea)}
                            />
                        ))}
                    </div>

                    {/* <ScriptView
                        selectedIdea={script.title || script.keyword}
                        script={scriptContent}
                        tone={tone}
                        onBack={() => window.history.back()}
                        onRegenerate={() => {                        
                            console.log("Regenerate requested");
                        }}
                        onStartOver={() => router.get(scriptsIndex().url)}
                        isLoading={false}
                    /> */}
                </div>
            </AppLayout>
        </>
    );
}
