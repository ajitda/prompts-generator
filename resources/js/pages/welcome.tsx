import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Video } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout>
            <Head>
                <title>AI Content Generator</title>
                <meta
                    name="description"
                    content="Generate optimized AI prompts and professional YouTube video scripts in minutes. Built for working professionals."
                />
                <meta
                    name="keywords"
                    content="Video Idea Generator, AI video script generator, YouTube scripts, AI productivity"
                />
                <link rel="canonical" href="/" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br p-6">
                <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-xl dark:bg-gray-900">
                    {/* HERO */}
                    <header className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                            AI Content Generator
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                            Turn keywords into optimized AI prompts and
                            professional video scripts using a structured,
                            step-by-step AI workflow.
                        </p>
                    </header>

                    {/* TOOLS */}
                    <div className="">
                        {/* Video Idea Generator */}
                        {/* <Card className="hover:shadow-lg transition">
                            <CardHeader>
                                <CardTitle>Video Idea Generator</CardTitle>
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
                                    href="/video-idea-generator/prompts"
                                    className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                                >
                                    Generate Prompts →
                                </Link>
                            </CardContent>
                        </Card> */}

                        {/* VIDEO SCRIPT GENERATOR */}
                        <Card className="flex flex-col items-center justify-center transition hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Video />
                                    <span>AI Video Script Generator</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center space-y-4">
                                <p className="text-gray-600 dark:text-gray-300">
                                    Generate professional YouTube video scripts
                                    from a single keyword using a proven
                                    storytelling framework.
                                </p>

                                <ul className="flex list-inside list-disc items-center justify-center gap-4 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                                    <li>Ideas → Story → Final Script</li>
                                    <li>Built for working professionals</li>
                                    <li>60–90 second optimized scripts</li>
                                </ul>

                                <Link
                                    href="video-idea-generator"
                                    className="mt-4 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    Create Video Scripts →
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    {/* FOOTER CTA */}
                    {!auth?.user && (
                        <div className="mt-12 text-center">
                            <p className="mb-4 text-gray-600 dark:text-gray-300">
                                Sign in to save your prompts and scripts.
                            </p>
                            <Link
                                href="/login"
                                className="rounded-lg bg-gray-900 px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
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
