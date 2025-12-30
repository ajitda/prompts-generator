import {
    index as promptsIndex,
} from '@/actions/App/Http/Controllers/PromptController';
import ScriptView from '@/components/ScriptView';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

interface Props {
    prompt: {
        id: number;
        keyword: string;
        prompt: any;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'AI Prompts',
        href: promptsIndex().url,
    },
];

export default function Show({ prompt }: Props) {


    // console.log('check from prompts show:', prompt);
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className='px-8 py-8'>
                <Head title={`Prompt - ${prompt.keyword}`} />

                <ScriptView
                    selectedIdea={prompt.keyword}
                    showExisting={true}
                    script={prompt.prompt}
                    onBack={() => window.history.back()}
                    onRegenerate={() => {
                        console.log("Regenerate requested");
                    }}
                    onStartOver={() => router.get(promptsIndex().url)}
                    isLoading={false}
                /></div>
            </AppLayout>
        </>
    );
}
