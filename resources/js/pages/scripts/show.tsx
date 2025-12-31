import {
    index as scriptsIndex,
} from '@/actions/App/Http/Controllers/ScriptController';
import ScriptView from '@/components/ScriptView';
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
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'AI Video Scripts',
        href: scriptsIndex().url,
    },
];

export default function Show({ script }: Props) {

    const scriptContent = script.script?.script || "No script content found.";
    const tone = script.script?.tone || "Professional";

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={`Script - ${script.keyword}`} />

                <div className="py-12 max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <ScriptView
                        selectedIdea={script.title || script.keyword}
                        script={scriptContent}
                        tone={tone}
                        onBack={() => window.history.back()}
                        onRegenerate={() => {                        
                            console.log("Regenerate requested");
                        }}
                        onStartOver={() => router.get(scriptsIndex().url)}
                        isLoading={false}
                    />
                </div>
            </AppLayout>
        </>
    );
}
