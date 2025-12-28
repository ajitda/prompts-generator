import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SharedData } from '@/types';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout>
            <Head>
                <title>AI Content Generator for Professionals</title>
                <meta
                    name="description"
                    content="Generate optimized AI prompts and professional YouTube video scripts in minutes. Built for working professionals."
                />
                <meta
                    name="keywords"
                    content="AI prompt generator, AI video script generator, YouTube scripts, AI productivity"
                />
                <link rel="canonical" href="/" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br p-6">
                <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">

                    {/* HERO */}
                    <header className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            🚀 AI Content Generator for Professionals
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Turn keywords into optimized AI prompts and professional video scripts
                            using a structured, step-by-step AI workflow.
                        </p>
                    </header>

                    {/* TOOLS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* PROMPT GENERATOR */}
                        <Card className="hover:shadow-lg transition">
                            <CardHeader>
                                <CardTitle>🤖 AI Prompt Generator</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-300">
                                    Create structured, optimized prompts that deliver better results
                                    across all AI models.
                                </p>

                                <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 space-y-1">
                                    <li>SEO-friendly prompt structure</li>
                                    <li>Works with multiple AI providers</li>
                                    <li>Save & reuse prompts</li>
                                </ul>

                                <Link
                                    href="/prompts-generator"
                                    className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                                >
                                    Generate Prompts →
                                </Link>
                            </CardContent>
                        </Card>

                        {/* VIDEO SCRIPT GENERATOR */}
                        <Card className="hover:shadow-lg transition">
                            <CardHeader>
                                <CardTitle>🎬 AI Video Script Generator</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-300">
                                    Generate professional YouTube video scripts from a single keyword
                                    using a proven storytelling framework.
                                </p>

                                <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 space-y-1">
                                    <li>Ideas → Story → Final Script</li>
                                    <li>Built for working professionals</li>
                                    <li>60–90 second optimized scripts</li>
                                </ul>

                                <Link
                                    href="/video-scripts"
                                    className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                                >
                                    Create Video Scripts →
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    {/* FOOTER CTA */}
                    {!auth?.user && (
                        <div className="text-center mt-12">
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Sign in to save your prompts and scripts.
                            </p>
                            <Link
                                href="/login"
                                className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-8 rounded-lg font-semibold transition"
                            >
                                Login / Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
