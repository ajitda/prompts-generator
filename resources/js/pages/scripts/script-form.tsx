import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StorySection } from "@/types";
import IdeaCard from "@/components/IdeaCard";
import StoryView from "@/components/StoryView";
import ScriptView from "@/components/ScriptView";
import LoadingState from "@/components/LoadingState";
import toast from "react-hot-toast";

type AppStep = "input" | "ideas" | "story" | "script";

const ScriptForm = () => {
    const [step, setStep] = useState<AppStep>("input");
    const [scriptId, setScriptId] = useState<number | null>(null);
    const [keyword, setKeyword] = useState("");
    const [ideas, setIdeas] = useState<string[]>([]);
    const [selectedIdea, setSelectedIdea] = useState("");
    const [story, setStory] = useState<StorySection[]>([]);
    const [script, setScript] = useState("");
    const [tone, setTone] = useState("Conversational & Educational");
    const [isLoading, setIsLoading] = useState(false);

    // Helper for CSRF and Headers
    const requestHeaders = {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') as string) || '',
        // 'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
    };

    const handleGenerateIdeas = async () => {
        if (!keyword.trim()) return;
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
                setStep("ideas");
            } else throw new Error(data.message);
        } catch (error: any) {
            toast.success("Error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectIdea = async (idea: string) => {
        setSelectedIdea(idea);
        setIsLoading(true);
        setStep("story");
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
        } catch (error: any) {
            toast.error("Error");
            console.log('check error:', error);
            setStep("ideas");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateScript = async () => {
        setIsLoading(true);
        setStep("script");
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
        } catch (error: any) {
            console.error("Full Error Details:", error); // Add this line!
            toast.error(error.message || "Error");
            setStep("story");
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartOver = () => {
        setStep("input");
        setKeyword("");
        setScriptId(null);
        setIdeas([]);
        setSelectedIdea("");
        setStory([]);
        setScript("");
    };

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-6 max-w-3xl">
                {step === "input" && !isLoading && (
                   <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-center mb-4 text-balance text-4xl font-bold">What's your video about?</h1>
                        <div className="w-full max-w-lg space-y-4">
                            <Input 
                                value={keyword} 
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="e.g., productivity tips for students"
                                className="text-center text-lg h-14"
                                onKeyDown={(e) => e.key === "Enter" && handleGenerateIdeas()}
                            />
                            <Button onClick={handleGenerateIdeas} disabled={!keyword.trim()} size="lg" className="w-full gap-2">
                                Generate video ideas <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                   </div>
                )}

                {isLoading && (
                    <LoadingState
                        message={step === "input" ? "Exploring possibilities..." : step === "ideas" ? "Crafting your story..." : "Writing your script..."} 
                    />
                )}

                {step === "ideas" && !isLoading && (
                    <div className="animate-fade-in space-y-8">
                        <div className="text-center space-y-3">
                            <h2 className="text-3xl font-semibold">Let's explore a few directions</h2>
                        </div>
                        <div className="space-y-3">
                            {ideas.map((idea, index) => (
                                <IdeaCard key={index} idea={idea} index={index} onSelect={() => handleSelectIdea(idea)} />
                            ))}
                        </div>
                        <Button variant="ghost" onClick={handleStartOver} className="w-full">← Try a different topic</Button>
                    </div>
                )}

                {step === "story" && !isLoading && (
                    <StoryView 
                        selectedIdea={selectedIdea} 
                        story={story} 
                        onRegenerate={() => handleSelectIdea(selectedIdea)} 
                        onGenerateScript={handleGenerateScript} 
                        onBack={() => setStep("ideas")}
                        isLoading={isLoading} 
                    />
                )}

                {step === "script" && !isLoading && (
                    <ScriptView
                        selectedIdea={selectedIdea} 
                        script={script} 
                        tone={tone} 
                        onBack={() => setStep("story")} 
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