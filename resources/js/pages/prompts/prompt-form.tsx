import InputError from "@/components/input-error";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SharedData } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";
import { Check, Copy, Save, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PromptForm() {

    const { auth, env = {} } = usePage<SharedData>().props;

    // const { geminiKey } = env?.geminiKey || '';

    // console.log('Gemeni key available:', !!geminiKey);

    const promptsCanonical = '/prompts';
    const promptsStore = () => ({ url: promptsCanonical });

    const { data, setData, post, errors, processing, reset } = useForm({
        keyword: '',
        prompt: '',
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
                    'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '',
                },
                body: JSON.stringify({
                    keyword: data.keyword 
                }),
            });

            const result = await response.json();
            if (result.success) {
                setGeneratedPrompt(result.prompt);
                setData('prompt', result.prompt);
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
            },
            onError: (error) => console.error('Error saving prompt:', error),
            onFinish: () => {
                toast.success('Prompt saved successfully!');
            },
        });
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Generate Your Prompt</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" autoComplete="off">

                        {/* Keyword Input */}
                        <div>
                            <Label htmlFor="keyword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                What do you want the AI to do?
                            </Label>
                            <textarea
                                value={data.keyword}
                                onChange={(e) => setData('keyword', e.target.value)}
                                onKeyDown={handleKeyDown}
                                name="keyword"
                                id="keyword"
                                disabled={processing || isGenerating}
                                placeholder="Example: Write a blog post about sustainable living for beginners"
                                className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 focus:outline-none transition-colors min-h-[120px] resize-y"
                            />
                            <InputError message={errors.keyword} />
                        </div>

                        {/* Examples Section */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5">
                            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">
                                Quick Examples (Click to use):
                            </h3>
                            <div className="space-y-3">
                                {['Write an email to a client about project delay',
                                    'Create a study plan for learning Python',
                                    'Generate a social media post for a coffee shop',
                                    'Write a product description for a smartwatch'].map((example, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setData('keyword', example)}
                                            className="bg-white dark:bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="text-lg">
                                                    {['📧', '📚', '☕', '💻'][index]}
                                                </span>
                                                <span className="text-gray-700 dark:text-gray-300">{example}</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <div>
                            <button
                                onClick={handleGenerate}
                                disabled={!data.keyword.trim() || isGenerating || processing}
                                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-4 px-10 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="inline-block mr-2 h-5 w-5" />
                                        Generate Optimized Prompt
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Loading Spinner */}
                        {isGenerating && (
                            <div className="text-center py-8">
                                <div className="inline-block w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
                                <p className="text-purple-600 dark:text-purple-400">Generating your optimized prompt...</p>
                            </div>
                        )}

                        {/* Generated Prompt */}
                        {generatedPrompt && (
                            <>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        ✅ Your Optimized Prompt:
                                    </h2>
                                    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border-l-4 border-purple-500 whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed min-h-[120px]">
                                        {generatedPrompt}
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <button
                                            type='button'
                                            onClick={handleCopy}
                                            disabled={processing}
                                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="inline-block mr-2 h-4 w-4" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="inline-block mr-2 h-4 w-4" />
                                                    Copy to Clipboard
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-semibold py-4 px-10 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="inline-block mr-2 h-5 w-5" />
                                                {auth?.user ? 'Save Prompt' : 'Login to Save Prompt'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
