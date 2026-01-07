import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { Check, Copy, Save, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function PromptForm() {
    const { auth, session_data } = usePage<SharedData>().props;

    const promptsCanonical = '/video-idea-generator/prompts';
    const promptsStore = () => ({ url: promptsCanonical });

    const { data, setData, post, errors, processing, reset } = useForm({
        keyword: session_data?.savedKeyword || '',
        prompt: session_data?.savedPrompt || '',
    });

    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!data.keyword.trim()) return;

        setIsGenerating(true);
        try {
            const response = await fetch('/prompts/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        document.querySelector<HTMLMetaElement>(
                            'meta[name="csrf-token"]',
                        )?.content || '',
                },
                body: JSON.stringify({
                    keyword: data.keyword,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setGeneratedPrompt(result.prompt);
                // setData('prompt', result.prompt);
                toast.success('Prompt generated successfully!');
            } else {
                toast.error(result.message || 'Failed to generate prompt');
            }
        } catch (error) {
            console.error('Error generating prompt:', error);
            toast.error('Failed to generate prompt');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleGenerate();
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(generatedPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!auth?.user) {
            router.visit('/login');
            return;
        }

        post(promptsStore().url, {
            onSuccess: () => {
                reset();
                setGeneratedPrompt('');
                toast.success('Prompt saved successfully!');
            },
            onError: (errors) => {
                console.error('Validation Errors:', errors);
                toast.error('Failed to save. Check requirements.');
            },
        });
    };

    useEffect(() => {
        if (session_data?.savedPrompt) {
            const savedPrompt = session_data.savedPrompt;
            setGeneratedPrompt(savedPrompt);
        }
    }, [session_data?.savedPrompt]);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Generate Your Prompt</CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-6"
                        autoComplete="off"
                    >
                        {/* Keyword Input */}
                        <div>
                            <Label
                                htmlFor="keyword"
                                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                What do you want the AI to do?
                            </Label>
                            <textarea
                                value={data.keyword}
                                onChange={(e) =>
                                    setData('keyword', e.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                name="keyword"
                                id="keyword"
                                disabled={processing || isGenerating}
                                placeholder="Example: Write a blog post about sustainable living for beginners"
                                className="min-h-[120px] w-full resize-y rounded-lg border-2 border-gray-200 bg-white p-4 text-gray-900 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-purple-800"
                            />
                            <InputError message={errors.keyword} />
                        </div>

                        {/* Examples Section */}
                        <div className="rounded-xl bg-blue-50 p-5 dark:bg-blue-900/20">
                            <h3 className="mb-3 text-lg font-semibold text-blue-800 dark:text-blue-300">
                                Quick Examples (Click to use):
                            </h3>
                            <div className="space-y-3">
                                {[
                                    'Write an email to a client about project delay',
                                    'Create a study plan for learning Python',
                                    'Generate a social media post for a coffee shop',
                                    'Write a product description for a smartwatch',
                                ].map((example, index) => (
                                    <div
                                        key={index}
                                        onClick={() =>
                                            setData('keyword', example)
                                        }
                                        className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="text-lg">
                                                {
                                                    ['📧', '📚', '☕', '💻'][
                                                        index
                                                    ]
                                                }
                                            </span>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {example}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <div>
                            <Button
                                onClick={handleGenerate}
                                disabled={
                                    !data.keyword.trim() ||
                                    isGenerating ||
                                    processing
                                }
                                className="w-full transform cursor-pointer rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-10 py-4 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:from-purple-700 hover:to-purple-900 hover:shadow-lg disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="mr-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 inline-block h-5 w-5" />
                                        Generate Optimized Prompt
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Loading Spinner */}
                        {isGenerating && (
                            <div className="py-8 text-center">
                                <div className="mb-4 inline-block h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
                                <p className="text-purple-600 dark:text-purple-400">
                                    Generating your optimized prompt...
                                </p>
                            </div>
                        )}

                        {/* Generated Prompt */}
                        {generatedPrompt && (
                            <>
                                <div className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                                        Your Optimized Prompt:
                                    </h2>
                                    <div className="min-h-[120px] rounded-lg border-l-4 border-purple-500 bg-white p-5 leading-relaxed whitespace-pre-wrap text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                                        {generatedPrompt}
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <Button
                                            // type='Button'
                                            onClick={handleCopy}
                                            disabled={processing}
                                            className="rounded-lg bg-green-600 px-8 py-3 font-medium text-white transition-colors hover:bg-green-700"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="mr-2 inline-block h-4 w-4" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="mr-2 inline-block h-4 w-4" />
                                                    Copy to Clipboard
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full transform rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800 px-10 py-4 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-indigo-900 hover:shadow-lg disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="mr-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 inline-block h-5 w-5" />
                                                {auth?.user
                                                    ? 'Save Prompt'
                                                    : 'Login to Save Prompt'}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </>
                        )}
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
