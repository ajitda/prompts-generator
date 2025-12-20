import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SharedData } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";
import { Check, Copy, Image, LoaderCircle, Save, Sparkles, Text, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const promptTypes = [
    {
        value: 'image',
        label: 'Image',
        icon: Image,
        color: 'bg-blue-500',
        description: 'Create a highly detailed, photorealistic image of {$keyword}. Use vibrant colors, dramatic lighting, and professional composition. Incorporate depth of field, dynamic angles, and rich textures. Style: 4K ultra HD, cinematic quality, award-winning photography. Render with meticulous attention to detail and atmosphere.'
    },
    {
        value: 'text',
        label: 'Text',
        icon: Text,
        color: 'bg-green-500',
        description: 'Write compelling, engaging content about {$keyword}. Include key benefits, unique features, and actionable insights that provide real value to readers. Use clear headings, bullet points for readability, and incorporate relevant examples. Tone: Professional yet conversational, informative, and SEO-optimized. Structure with strong opening hook, detailed body, and clear call-to-action.'
    },
    {
        value: 'video',
        label: 'Video',
        icon: Video,
        color: 'bg-purple-500',
        description: 'Produce a captivating video showcasing {$keyword}. Include dynamic transitions, engaging visual effects, and professional background music. Structure: Attention-grabbing opening (5s), main content with clear messaging (20-45s), strong call-to-action (5s). Duration: 30-60 seconds, optimized for social media platforms. Use text overlays, smooth animations, and maintain consistent branding throughout.'
    },
];

export default function PromptForm() {

    const { auth } = usePage<SharedData>().props;

    const promptsCanonical = '/prompts';
    const promptsStore = () => ({ url: promptsCanonical });

    const { data, setData, post, errors, processing, reset } = useForm({
        type: 'image' as 'image' | 'text' | 'video',
        keyword: '',
        prompt: '',
    });

    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

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
                body: JSON.stringify({ type: data.type, keyword: data.keyword }),
            });

            const result = await response.json();
            if (result.success) {
                setGeneratedPrompt(result.prompt);
                setData('prompt', result.prompt);
            }
        } catch (error) {
            console.error('Error generating prompt:', error);
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

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Generate Your Prompt</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" autoComplete="off">
                        <div className="col-span-6 sm:col-span-4">
                            <Label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-3">
                                Select Prompt Type
                            </Label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {promptTypes?.map((type) => {
                                    const Icon = type.icon;
                                    const isSelected = data.type === type.value;
                                    return (
                                        <Button
                                            key={type.value}
                                            onClick={(e: { preventDefault: () => void }) => {
                                                e.preventDefault();
                                                setData('type', type.value as any);
                                            }}
                                            disabled={processing || isGenerating}
                                            className={`cursor-pointer p-4 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${isSelected
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-blue-500'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                                }`}
                                            aria-pressed={isSelected}
                                        >
                                            <Icon className={`h-8 w-8 mx-auto mb-2 ${isSelected ? 'text-blue-500' : 'text-gray-400'
                                                }`} />
                                            <span className="font-medium block mb-1">{type.label}</span>
                                        </Button>
                                    );
                                })}
                            </div>
                            <InputError message={errors.type} />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                            <Label htmlFor="keyword" className="block text-sm font-medium text-gray-700">
                                Enter Keyword or Topic
                            </Label>
                            <Input
                                value={data.keyword}
                                onChange={(e) => setData('keyword', e.target.value)}
                                onKeyDown={handleKeyDown}
                                type="text"
                                name="keyword"
                                id="keyword"
                                disabled={processing || isGenerating}
                                placeholder="e.g., sunset over mountains, business proposal, product demo"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Be specific for better results. Press Enter to generate.
                            </p>
                            <InputError message={errors.keyword} />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                            <Button
                                onClick={handleGenerate}
                                disabled={!data.keyword.trim() || isGenerating || processing}
                                className="cursor-pointer w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                {isGenerating && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                                {isGenerating ? (
                                    'Generating...'
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        Generate Prompt
                                    </>
                                )}
                            </Button>
                        </div>

                        {generatedPrompt && (
                            <>
                                <div className="col-span-6 sm:col-span-4">
                                    <div className="relative">
                                        <Label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                                            Generated Prompt
                                        </Label>
                                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 min-h-[120px]">
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{generatedPrompt}</p>
                                        </div>
                                        <Button
                                            type='button'
                                            variant="outline"
                                            size="sm"
                                            onClick={handleCopy}
                                            className="cursor-pointer absolute top-0 right-0"
                                            disabled={processing}
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="h-4 w-4 mr-1" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-4 w-4 mr-1" />
                                                    Copy
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                    <InputError message={errors.prompt} />
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="cursor-pointer w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {processing && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                                        {processing ? 'Saving...' : (
                                            <>
                                                <Save className="mr-2 h-5 w-5" />
                                                {auth?.user ? 'Save Prompt' : 'Login to save'}
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
