import { StorySection } from '@/types';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, RotateCcw, Sparkles, Film, ListChecks } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import IdeaCard from './IdeaCard';
import LoadingState from './LoadingState';
import SceneView from './SceneView';
import ScriptView from './ScriptView';
import StoryView from './StoryView';
import { Button } from './ui/button';
import { Input } from './ui/input';

type AppStep = 'input' | 'concepts' | 'outline' | 'script';

interface Concept {
    Title: string;
    Thumbnail_Concept?: string;
    Hook_Script?: string;
    Visual_Concept?: string;
    Concept_Brief?: string;
    Difficulty: string;
}

interface Scene {
    scene_number: number;
    visual: string;
    audio: string;
    duration: string;
}

interface VideoScriptGeneratorProps {
    initialGuestCredits?: number | null;
    isAuthenticated?: boolean;
    userCredits?: number | null;
}

const VideoScriptGenerator = ({
    initialGuestCredits,
    isAuthenticated,
    userCredits,
}: VideoScriptGeneratorProps) => {
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
                document.cookie = `browser_fingerprint=${result.visitorId}; path=/; max-age=31536000`;
            } catch (error) {
                console.error('Error loading FingerprintJS:', error);
            }
        };
        loadFingerprint();
    }, []);

    const [step, setStep] = useState<AppStep>('input');
    const [keyword, setKeyword] = useState('');
    const [concepts, setConcepts] = useState<Concept[]>([]);
    const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
    const [story, setStory] = useState<StorySection[]>([]);
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [plainScript, setPlainScript] = useState<string>('');
    const [tone, setTone] = useState('Professional & Engaging');
    const [scriptId, setScriptId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const requestHeaders = {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        ...(fingerprint && { 'X-Browser-Fingerprint': fingerprint }),
    };

    const handleGenerateConcepts = async () => {
        if (!keyword.trim()) return;
        if (currentCredits <= 0) {
            toast.error('You have no generations left.');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/generate/ideas', {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify({ keyword, type: 'video_script' }),
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            // Transform if it's an array of strings (new prompt format)
            const formattedIdeas = Array.isArray(data.ideas) && typeof data.ideas[0] === 'string'
                ? data.ideas.map((title: string) => ({
                    Title: title,
                    Difficulty: 'Medium'
                }))
                : data.ideas;

            setConcepts(formattedIdeas);
            setScriptId(data.script_id);
            setStep('concepts');

            router.reload({
                only: ['menu_data', 'initialGuestCredits', 'userCredits'],
            });
        } catch (err: unknown) {
            const error = err as Error;
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectConcept = async (concept: Concept) => {
        setSelectedConcept(concept);
        setStep('outline');
        setIsLoading(true);

        try {
            const res = await fetch('/generate/story', {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify({
                    script_id: scriptId,
                    title: concept.Title,
                }),
            });

            const data = await res.json();
            if (!data.success) throw new Error();

            setStory(data.story);
            router.reload({ only: ['initialGuestCredits', 'userCredits'] });
        } catch {
            toast.error('Failed to generate outline');
            setStep('concepts');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateDetailedScript = async () => {
        setIsLoading(true);
        setStep('script');

        try {
            const res = await fetch('/generate/detailed', {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify({
                    script_id: scriptId,
                    title: selectedConcept?.Title,
                }),
            });

            const data = await res.json();
            if (!data.success) throw new Error();

            // Handle both scene-based and plain-text script formats
            setScenes(data.scenes || []);
            setPlainScript(data.script || '');
            setTone(data.tone);

            router.reload({ only: ['initialGuestCredits', 'userCredits'] });
        } catch {
            toast.error('Failed to generate script');
            setStep('outline');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartOver = () => {
        setStep('input');
        setKeyword('');
        setConcepts([]);
        setSelectedConcept(null);
        setStory([]);
        setScenes([]);
        setPlainScript('');
    };

    return (
        <div className="mx-auto mt-4 w-full max-w-4xl">
            {step === 'input' && !isLoading && (
                <div className="mb-8 rounded-2xl border bg-card p-8 shadow-premium">
                    <div className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Film className="w-5 h-5 text-primary" />
                                Video Project Topic
                            </h2>
                            <p className="text-sm text-muted-foreground">What is your video about? Be as specific as possible.</p>
                        </div>
                        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                            <Input
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerateConcepts()}
                                placeholder="e.g., How to start a small business in 2026"
                                className="h-14 text-lg"
                            />
                            <Button
                                size="xl"
                                onClick={handleGenerateConcepts}
                                disabled={!keyword || currentCredits <= 0 || !fingerprint}
                                className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                            >
                                <Sparkles className="h-5 w-5" />
                                Generate Concepts
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {!isAuthenticated && step === 'input' && !isLoading && (
                <div className="mt-[-20px] mb-8 text-center bg-muted/30 p-4 rounded-xl border border-dashed">
                    <p className="text-sm font-medium">
                        You have <span className="text-primary font-bold">{currentCredits}</span> free script credits left.
                    </p>
                    <p className="mt-1 text-xs">
                        <Link href="/login" className="text-primary font-bold hover:underline">Login</Link> or <Link href="/register" className="text-primary font-bold hover:underline">Sign up</Link> to get 10 more credits.
                    </p>
                </div>
            )}

            {isLoading && (
                <LoadingState
                    message={
                        step === 'concepts'
                            ? 'Researching viral concepts...'
                            : step === 'outline'
                                ? 'Building the visual outline...'
                                : 'Compiling detailed scene-by-scene script...'
                    }
                />
            )}

            {step === 'concepts' && !isLoading && (
                <div className="space-y-6 animate-fade-in">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <ListChecks className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Script Concepts</h2>
                            <p className="text-muted-foreground">Choose a direction for your video on <span className="font-bold">"{keyword}"</span></p>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {concepts.map((concept, index) => (
                            <IdeaCard
                                key={index}
                                idea={concept}
                                index={index}
                                onSelect={() => handleSelectConcept(concept)}
                            />
                        ))}
                    </div>

                    <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t pt-8 md:flex-row">
                        <Button variant="outline" size="lg" className="h-14 w-full md:w-auto" onClick={() => setStep('input')}>
                            <ArrowLeft className="mr-3 h-4 w-4" />
                            Different Topic
                        </Button>
                        <Button variant="secondary" size="lg" className="h-14" onClick={handleGenerateConcepts} disabled={currentCredits <= 0}>
                            <RotateCcw className="mr-3 h-4 w-4" />
                            New Concepts
                        </Button>
                    </div>
                </div>
            )}

            {step === 'outline' && !isLoading && (
                <StoryView
                    selectedIdea={selectedConcept?.Title || ''}
                    story={story}
                    onGenerateScript={handleGenerateDetailedScript}
                    onBack={() => setStep('concepts')}
                    onRegenerate={() => handleSelectConcept(selectedConcept!)}
                    isLoading={isLoading}
                />
            )}

            {step === 'script' && !isLoading && (
                scenes.length > 0 ? (
                    <SceneView
                        selectedIdea={selectedConcept?.Title || ''}
                        scenes={scenes}
                        tone={tone}
                        onBack={() => setStep('outline')}
                        onStartOver={handleStartOver}
                        onRegenerate={handleGenerateDetailedScript}
                        isLoading={isLoading}
                        readOnly={false}
                    />
                ) : (
                    <ScriptView
                        selectedIdea={selectedConcept?.Title || ''}
                        script={plainScript}
                        tone={tone}
                        onBack={() => setStep('outline')}
                        onStartOver={handleStartOver}
                        onRegenerate={handleGenerateDetailedScript}
                        isLoading={isLoading}
                        showExisting={false}
                    />
                )
            )}
        </div>
    );
};

export default VideoScriptGenerator;
