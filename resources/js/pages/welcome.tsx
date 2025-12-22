import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WelcomeProps, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import PromptForm from './prompts/prompt-form';

const promptsCanonical = '/prompts';

export default function Welcome({
    canRegister = true,
    prompts,
    isAuthenticated
}: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head>
                <title>Prompt Generator - Create Professional Prompts for Image, Text & Video</title>
                <meta name="description" content="Generate high-quality AI prompts for images, text, and video content. Free prompt generator tool with instant results and save your favorites." />
                <meta name="keywords" content="AI prompt generator, image prompts, text prompts, video prompts, AI content creation, free prompt tool" />
                <meta property="og:title" content="AI Prompt Generator - Free Tool for Content Creation" />
                <meta property="og:description" content="Create professional AI prompts instantly for any content type. Generate, save, and reuse your best prompts." />
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={promptsCanonical} />
            </Head>

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-gray-900 dark:text-white">
                        Prompt Generator
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Create professional prompts for images, text, and video content in seconds
                    </p>
                </header>
                
                <PromptForm />

                {isAuthenticated && prompts?.data && prompts.data.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Saved Prompts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {prompts.data.map((prompt) => (
                                    <article
                                        key={prompt.id}
                                        className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 capitalize">
                                                    {prompt.type}
                                                </span>
                                                <span className="text-sm font-medium">{prompt.keyword}</span>
                                            </div>
                                            <time className="text-xs text-gray-500" dateTime={prompt.created_at}>
                                                {new Date(prompt.created_at).toLocaleDateString('en-US', { 
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </time>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {prompt.prompt}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>What is a Prompt Generator?</CardTitle>
                    </CardHeader>
                    <CardContent className="prose dark:prose-invert max-w-none">
                        <p>
                            A prompt generator is a powerful tool designed to help content creators, marketers, and AI enthusiasts 
                            craft effective prompts for various artificial intelligence applications. Our generator specializes in creating 
                            optimized prompts for image generation (like DALL-E, Midjourney), text content (ChatGPT, GPT-4), and video 
                            creation tools.
                        </p>
                        
                        <h3 className="text-xl font-semibold mt-6 mb-3">Why Use Our Prompt Generator?</h3>
                        <ul className="space-y-2">
                            <li><strong>Save Time:</strong> Generate professional prompts in seconds instead of spending hours crafting them</li>
                            <li><strong>Improve Quality:</strong> Our templates are optimized for better AI output quality and consistency</li>
                            <li><strong>Learn Best Practices:</strong> Understand how to structure prompts effectively for different content types</li>
                            <li><strong>Build Your Library:</strong> Save and organize your favorite prompts for future use</li>
                            <li><strong>Free to Use:</strong> No credit card required, start generating prompts immediately</li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-6 mb-3">How to Use the Prompt Generator</h3>
                        <ol className="space-y-2">
                            <li>Select your desired content type: Image, Text, or Video</li>
                            <li>Enter a keyword or topic that describes what you want to create</li>
                            <li>Click "Generate Prompt" to receive an optimized AI prompt</li>
                            <li>Copy the prompt to use in your favorite AI tool</li>
                            <li>Optionally save it to your account for future reference</li>
                        </ol>

                        <h3 className="text-xl font-semibold mt-6 mb-3">Tips for Better Prompts</h3>
                        <p>
                            While our generator provides excellent starting points, here are some tips to further enhance your prompts:
                            Be specific with details, include style preferences, specify desired mood or tone, and mention technical 
                            requirements like resolution or format when relevant.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
