import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WelcomeProps, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import PromptForm from './prompts/prompt-form';

const promptsCanonical = '/prompts';

export default function Welcome({
    canRegister = true,
    prompts,
    isAuthenticated
}: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;
    const [apiProvider, setApiProvider] = useState('groq');
    const [apiKey, setApiKey] = useState('');
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [copied, setCopied] = useState(false);    

    const examples = [
        'Write a marketing email for a new eco-friendly water bottle',
        'Create a lesson plan for teaching photosynthesis to 7th graders',
        'Generate creative names for a coffee shop with a vintage theme',
        'Write Python code to scrape product prices from an e-commerce site'
    ];

    const handleApiProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setApiProvider(e.target.value);
    };

    const handleExampleClick = (example: string) => {
        setUserInput(example);
    };

    const copyPrompt = () => {
        navigator.clipboard.writeText(generatedPrompt).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const generatePrompt = async () => {
        if (!userInput.trim()) {
            alert('Please enter what you want the AI to do');
            return;
        }

        setLoading(true);

        // Simulate API call - replace with actual implementation
        setTimeout(() => {
            const optimizedPrompt = `You are an expert content creator specializing in ${userInput}. 

Create a comprehensive and engaging piece that includes:
1. Clear structure with introduction, body, and conclusion
2. Actionable insights and practical tips
3. Engaging tone suitable for general audience
4. Specific examples and real-world applications
5. SEO-friendly formatting with proper headings

Ensure the content is original, valuable, and provides concrete value to readers. Focus on quality over quantity, and maintain a professional yet approachable tone throughout.

Topic: ${userInput}`;

            setGeneratedPrompt(optimizedPrompt);
            setLoading(false);
        }, 1500);
    };

    return (
        <>
            <Head>
                <title>Prompt Generator - Transform Ideas into Powerful AI Prompts</title>
                <meta name="description" content="Transform simple ideas into detailed, optimized AI prompts for better results. Free prompt generation tool with support for multiple AI providers." />
                <meta name="keywords" content="AI prompt generator, optimized prompts, Groq, Gemini, prompt engineering, AI content creation" />
                <meta property="og:title" content="AI Prompt Generator - Create Powerful AI Prompts" />
                <meta property="og:description" content="Transform your basic ideas into detailed, structured prompts that get better results from AI models." />
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={promptsCanonical} />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 p-4 md:p-8">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-10">
                    <header className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white flex items-center justify-center gap-2">
                            <span className="text-2xl">🤖</span>Prompt Generator
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Transform simple ideas into powerful, optimized AI prompts
                        </p>
                    </header>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-lg p-4 mb-6">
                        <p className="font-medium text-gray-800 dark:text-yellow-200">
                            <span className="text-lg mr-1">💡</span>
                            <strong>How it works:</strong> Enter your basic idea and select an AI model. The generator will create a detailed, structured prompt that gets better results from AI tools.
                        </p>
                    </div>

                    <div className="space-y-6">                       

                        <PromptForm />

                        {/* Info Card */}
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle>About Prompt Engineering</CardTitle>
                            </CardHeader>
                            <CardContent className="prose dark:prose-invert max-w-none">
                                <p>
                                    Prompt engineering is the art and science of crafting inputs that get the best possible outputs from AI models.
                                    A well-structured prompt can dramatically improve the quality, relevance, and usefulness of AI-generated content.
                                </p>

                                <h3 className="text-xl font-semibold mt-6 mb-3">Key Elements of Effective Prompts</h3>
                                <ul className="space-y-2">
                                    <li><strong>Clear Instructions:</strong> Be specific about what you want the AI to do</li>
                                    <li><strong>Context Setting:</strong> Provide background information when necessary</li>
                                    <li><strong>Role Assignment:</strong> Tell the AI what persona or expert to embody</li>
                                    <li><strong>Format Requirements:</strong> Specify the desired output structure and style</li>
                                    <li><strong>Constraints:</strong> Set boundaries for length, tone, and content limitations</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">Why Optimize Your Prompts?</h3>
                                <p>
                                    Optimized prompts lead to better AI responses, reduced need for revisions, and more consistent results
                                    across different AI models. Our generator helps you include all the necessary elements automatically.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
