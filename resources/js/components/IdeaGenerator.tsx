import { StorySection } from '@/types';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
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
const IdeaGenerator = () => {
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
    };

    /* ---------------- IDEAS ---------------- */

    const handleGenerateIdeas = async () => {
        if (!keyword.trim()) return;

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
        } catch (err) {
            toast.error('Failed to generate ideas');
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
                    <div className="flex gap-4">
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
                            onClick={handleGenerateIdeas}
                            disabled={!keyword}
                        >
                            <Sparkles className="h-5 w-5" />
                            Generate Ideas
                        </Button>
                    </div>
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
                    {ideas.map((idea, index) => (
                        <IdeaCard
                            key={index}
                            idea={idea}
                            index={index}
                            onSelect={() => handleSelectIdea(idea)}
                        />
                    ))}
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
