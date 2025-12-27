import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import PromptForm from './prompts/prompt-form';

export default function Welcome() {
    return (
        <AppLayout>
            <Head title="Video Script Generator" />

            <div className="min-h-screen bg-slate-50 dark:bg-black p-4 md:p-12">
                <div className="max-w-3xl mx-auto">
                    <header className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                            AI Video Script Generator
                        </h1>
                        <p className="text-gray-500 text-lg">
                            Turn one keyword into a structured, professional video script.
                        </p>
                    </header>

                    {/* THIS MUST BE HERE */}
                    <PromptForm />
                </div>
            </div>
        </AppLayout>
    );
}
