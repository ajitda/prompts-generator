import IdeaCard from '@/components/IdeaCard';
import LoadingState from '@/components/LoadingState';
import ScriptView from '@/components/ScriptView';
import StoryView from '@/components/StoryView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SharedData, StorySection } from '@/types';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { usePage } from '@inertiajs/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
interface Idea {
    Title: string;
    Thumbnail_Concept: string;
    Hook_Script: string;
    Difficulty: string;
}

type AppStep = 'input' | 'ideas' | 'story' | 'script';

interface ScriptFormProps {
    initialGuestCredits: number | null;
    isAuthenticated: boolean;
    userCredits: number | null;
}

const ScriptForm = () => {
    const { props } = usePage<SharedData & ScriptFormProps>();
    const { auth, initialGuestCredits, isAuthenticated, userCredits } = props;

    // Use userCredits if authenticated, otherwise use initialGuestCredits (which will be updated by session)
    const currentCredits = isAuthenticated
        ? (userCredits ?? 0)
        : (initialGuestCredits ?? 0);

    const [step, setStep] = useState<AppStep>('input');
    const [scriptId, setScriptId] = useState<number | null>(null);
    const [keyword, setKeyword] = useState('');
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [selectedIdea, setSelectedIdea] = useState('');
    const [story, setStory] = useState<StorySection[]>([]);
    const [script, setScript] = useState('');
    const [tone, setTone] = useState('Conversational & Educational');
    const [isLoading, setIsLoading] = useState(false);
    const [fingerprint, setFingerprint] = useState<string | null>(null);

    useEffect(() => {
        const loadFingerprint = async () => {
            try {
                const fp = await FingerprintJS.load();
                const result = await fp.get();
                setFingerprint(result.visitorId);
            } catch (error) {
                console.error('Error loading FingerprintJS:', error);
            }
        };
        loadFingerprint();
    }, []);

    // Helper for CSRF and Headers
    const requestHeaders = {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':
            (document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content') as string) || '',
        'X-Browser-Fingerprint': fingerprint,
    };

    const handleSaveIdeas = async (scriptId: number, ideas: string[]) => {
        const requestHeaders = {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN':
                (document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute('content') as string) || '',
            ...(fingerprint && { 'X-Browser-Fingerprint': fingerprint }),
        };

        try {
            await fetch(`/scripts/${scriptId}`, {
                method: 'PUT',
                headers: requestHeaders,
                body: JSON.stringify({ idea: ideas }),
            });
        } catch (error) {
            console.error('Failed to save ideas:', error);
            toast.error('Failed to save ideas');
        }
    };

    const handleGenerateIdeas = async () => {
        if (!keyword.trim()) return;
        if (currentCredits <= 0) {
            toast.error(
                'You have no generations left. Please sign up for more.',
            );
            return;
        }
        console.log(requestHeaders, 'requestHeaders');
        setIsLoading(true);
        try {
            const res = await fetch('/scripts/ideas', {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify({ keyword }),
            });
            const data = await res.json();
            if (data.success) {
                setIdeas(data.ideas);
                setScriptId(data.script_id);
                setStep('ideas');
                handleSaveIdeas(data.script_id, data.ideas);
            } else throw new Error(data.message);
        } catch (_error: unknown) {
            toast.error((_error as Error).message || 'Error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectIdea = async (idea: string) => {
        setSelectedIdea(idea);
        setIsLoading(true);
        setStep('story');
        try {
            const res = await fetch('/scripts/story', {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify({ script_id: scriptId, title: idea }),
            });
            const data = await res.json();
            if (data.success) {
                setStory(data.story);
            } else throw new Error(data.message);
        } catch (_error: unknown) {
            toast.error((_error as Error).message || 'Error');
            console.log('check error:', _error);
            setStep('ideas');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateScript = async () => {
        setIsLoading(true);
        setStep('script');
        try {
            const res = await fetch('/scripts/final', {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify({ script_id: scriptId }),
            });
            const data = await res.json();
            if (data.success) {
                setScript(data.script);
                setTone(data.tone);
            } else throw new Error(data.message);
        } catch (_error: unknown) {
            console.error('Full Error Details:', _error); // Add this line!
            toast.error((_error as Error).message || 'Error');
            setStep('story');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartOver = () => {
        setStep('input');
        setKeyword('');
        setScriptId(null);
        setIdeas([]);
        setSelectedIdea('');
        setStory([]);
        setScript('');
    };

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto max-w-3xl px-6">
                {step === 'input' && !isLoading && (
                    <div className="animate-fade-in flex min-h-[60vh] flex-col items-center justify-center">
                        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                            <Sparkles className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="mb-4 text-center text-4xl font-bold text-balance">
                            What's your video about?
                        </h1>
                        <div className="w-full max-w-lg space-y-4">
                            <Input
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="e.g., productivity tips for students"
                                className="h-14 text-center text-lg"
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && handleGenerateIdeas()
                                }
                            />
                            <Button
                                variant="default"
                                onClick={handleGenerateIdeas}
                                disabled={
                                    !keyword.trim() ||
                                    currentCredits <= 0 ||
                                    !fingerprint
                                }
                                size="lg"
                                className="w-full gap-2"
                            >
                                Generate video ideas{' '}
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                            {!isAuthenticated && (
                                <p className="text-center text-sm text-muted-foreground">
                                    You have {currentCredits} free credits left.
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {isLoading && (
                    <LoadingState
                        message={
                            step === 'input'
                                ? 'Exploring possibilities...'
                                : step === 'ideas'
                                  ? 'Crafting your story...'
                                  : 'Writing your script...'
                        }
                    />
                )}

                {step === 'ideas' && !isLoading && (
                    <div className="animate-fade-in space-y-8">
                        <div className="space-y-3 text-center">
                            <h2 className="text-3xl font-semibold">
                                Let's explore a few directions
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {ideas.map((idea, index) => (
                                <IdeaCard
                                    key={index}
                                    idea={idea}
                                    index={index}
                                />
                            ))}
                        </div>
                        <Button
                            variant="ghost"
                            onClick={handleStartOver}
                            className="w-full"
                        >
                            ← Try a different topic
                        </Button>
                    </div>
                )}

                {step === 'story' && !isLoading && (
                    <StoryView
                        selectedIdea={selectedIdea}
                        story={story}
                        onRegenerate={() => handleSelectIdea(selectedIdea)}
                        onGenerateScript={handleGenerateScript}
                        onBack={() => setStep('ideas')}
                        isLoading={isLoading}
                    />
                )}

                {step === 'script' && !isLoading && (
                    <ScriptView
                        selectedIdea={selectedIdea}
                        script={script}
                        tone={tone}
                        onBack={() => setStep('story')}
                        onRegenerate={handleGenerateScript}
                        onStartOver={handleStartOver}
                        isLoading={isLoading}
                    />
                )}
            </main>
        </div>
    );
};

export default ScriptForm;
