import { StorySection } from '@/types';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import IdeaCard from './IdeaCard';
import LoadingState from './LoadingState';
import ScriptView from './ScriptView';
import StoryView from './StoryView';
import { Button } from './ui/button';
import { Input } from './ui/input';

type AppStep = 'input' | 'ideas' | 'story' | 'script';
interface Idea {
    Title: string;
    Thumbnail_Concept: string;
    Hook_Script: string;
    Difficulty: string;
}

interface IdeaGeneratorProps {
    initialGuestCredits?: number | null;
    isAuthenticated?: boolean;
    userCredits?: number | null;
}

const IdeaGenerator = ({
    initialGuestCredits,
    isAuthenticated,
    userCredits,
}: IdeaGeneratorProps) => {
    const currentCredits = isAuthenticated
        ? (userCredits ?? 0)
        : (initialGuestCredits ?? 0);
    const [fingerprint, setFingerprint] = useState<string | null>(null);

    useEffect(() => {
        const loadFingerprint = async () => {
            try {
                const fp = await FingerprintJS.load();
                const result = await fp.get();
                setFingerprint(result.visitorId);
                // Set cookie for server-side access (sidebar, initial props)
                document.cookie = `browser_fingerprint=${result.visitorId}; path=/; max-age=31536000`;
            } catch (error) {
                console.error('Error loading FingerprintJS:', error);
            }
        };
        loadFingerprint();
    }, []);
    const [step, setStep] = useState<AppStep>('input');
    const [keyword, setKeyword] = useState('');
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [selectedIdea, setSelectedIdea] = useState('');
    const [story, setStory] = useState<StorySection[]>([]);
    const [script, setScript] = useState('');
    const [tone, setTone] = useState('Conversational & Educational');
    const [scriptId, setScriptId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    const requestHeaders = {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':
            document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content') || '',
        ...(fingerprint && { 'X-Browser-Fingerprint': fingerprint }),
    };

    /* ---------------- IDEAS ---------------- */

    const handleGenerateIdeas = async () => {
        if (!keyword.trim()) return;
        if (currentCredits <= 0) {
            toast.error('You have no generations left.');
            return;
        }

        setIsLoading(true);
        setHasGenerated(true);

        try {
            const res = await fetch('/scripts/ideas', {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify({ keyword }),
            });

            const data = await res.json();

            if (!data.success) throw new Error(data.message);

            setIdeas(data.ideas);
            setScriptId(data.script_id);
            setStep('ideas');

            // Reload sidebar menu
            router.reload({ only: ['menu_data'] });
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    /* ---------------- STORY ---------------- */

    const handleSelectIdea = async (idea: any) => {
        console.log(idea, 'idea selected');
        setSelectedIdea(idea);
        setStep('story');
        setIsLoading(true);

        try {
            const res = await fetch('/scripts/story', {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify({
                    script_id: scriptId,
                    title: idea.Title,
                }),
            });

            const data = await res.json();
            if (!data.success) throw new Error();

            setStory(data.story);
        } catch {
            toast.error('Failed to generate story');
            setStep('ideas');
        } finally {
            setIsLoading(false);
        }
    };

    /* ---------------- SCRIPT ---------------- */

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
            if (!data.success) throw new Error();

            setScript(data.script);
            setTone(data.tone);
        } catch {
            toast.error('Failed to generate script');
            setStep('story');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartOver = () => {
        setStep('input');
        setKeyword('');
        setIdeas([]);
        setSelectedIdea('');
        setStory([]);
        setScript('');
        setHasGenerated(false);
    };

    return (
        <div className="mx-auto w-full max-w-4xl">
            {/* INPUT */}
            {step === 'input' && !isLoading && (
                <div className="mb-8 rounded-2xl border bg-card p-6 shadow-card">
                    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                        <Input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && handleGenerateIdeas()
                            }
                            placeholder="Enter your topic"
                            className="h-14"
                        />
                        <Button
                            size="xl"
                            variant="hero"
                            onClick={handleGenerateIdeas}
                            disabled={
                                !keyword || currentCredits <= 0 || !fingerprint
                            }
                        >
                            <Sparkles className="h-5 w-5" />
                            Generate Ideas
                        </Button>
                    </div>
                </div>
            )}
            {!isAuthenticated && step === 'input' && !isLoading && (
                <div className="mt-[-20px] mb-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        You have {currentCredits} free generations left.
                    </p>
                    <p className="mt-1 text-sm font-bold">
                        Please{' '}
                        <Link
                            href="/login"
                            className="text-primary hover:underline"
                        >
                            Login
                        </Link>
                        <span className="mx-1 text-muted-foreground">/</span>
                        <Link
                            href="/register"
                            className="text-primary hover:underline"
                        >
                            Signup
                        </Link>
                        <span className="text-muted-foreground">
                            {' '}
                            for 10 more credit
                        </span>
                    </p>
                </div>
            )}

            {isLoading && (
                <LoadingState
                    message={
                        step === 'ideas'
                            ? 'Generating ideas...'
                            : step === 'story'
                              ? 'Crafting your story...'
                              : 'Writing your script...'
                    }
                />
            )}

            {/* IDEAS */}
            {step === 'ideas' && hasGenerated && !isLoading && (
                <div className="space-y-6">
                    <div className="mb-8 text-start">
                        <h2 className="text-2xl font-black tracking-tight">
                            Your Generated Ideas for{' '}
                            <span className="text-gradient">"{keyword}"</span>
                        </h2>
                    </div>

                    <div className="grid gap-6">
                        {ideas.map((idea, index) => (
                            <IdeaCard
                                key={index}
                                idea={idea}
                                index={index}
                                onSelect={() => handleSelectIdea(idea)}
                            />
                        ))}
                    </div>

                    <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-border/10 pt-8 md:flex-row">
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-14 w-full rounded-2xl border-border/40 px-8 text-[11px] font-black tracking-widest uppercase transition-all hover:bg-muted/50 md:w-auto"
                            onClick={() => setStep('input')}
                        >
                            <ArrowLeft className="mr-3 h-4 w-4" />
                            Change Topic
                        </Button>
                        <Button
                            variant="default"
                            size="lg"
                            className="h-14 w-full rounded-2xl bg-indigo-600 px-10 text-[11px] font-black tracking-widest text-white uppercase shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02] hover:opacity-90 md:w-auto"
                            onClick={handleGenerateIdeas}
                            disabled={currentCredits <= 0}
                        >
                            <RotateCcw className="mr-3 h-4 w-4" />
                            Regenerate Ideas
                        </Button>
                    </div>
                </div>
            )}

            {/* STORY */}
            {step === 'story' && !isLoading && (
                <StoryView
                    selectedIdea={selectedIdea}
                    story={story}
                    onGenerateScript={handleGenerateScript}
                    onBack={() => setStep('ideas')}
                    onRegenerate={function (): void {
                        throw new Error('Function not implemented.');
                    }}
                    isLoading={false}
                />
            )}

            {/* SCRIPT */}
            {step === 'script' && !isLoading && (
                <ScriptView
                    selectedIdea={selectedIdea}
                    script={script}
                    tone={tone}
                    onBack={() => setStep('story')}
                    onStartOver={handleStartOver}
                    onRegenerate={function (): void {
                        throw new Error('Function not implemented.');
                    }}
                    isLoading={false}
                />
            )}
        </div>
    );
};

export default IdeaGenerator;
