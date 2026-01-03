import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Check, Copy, RefreshCw, Sparkles } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ScriptViewProps {
    selectedIdea: string;
    script: string;
    tone?: string | null;
    onBack: () => void;
    onRegenerate: () => void;
    onStartOver: () => void;
    isLoading: boolean;
    showExisting?: boolean;
}

const ScriptView = ({
    selectedIdea,
    script,
    tone = null,
    onBack,
    onRegenerate,
    onStartOver,
    isLoading,
    showExisting = false,
}: ScriptViewProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(script);
            setCopied(true);
            toast.success('Copied to clipboard');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Couldn't copy");
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
                {!showExisting && (
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 font-medium text-muted-foreground hover:text-foreground text-sm transition-colors duration-250"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to story
                    </button>
                )}

                <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="space-y-2">
                        {!showExisting && (
                            <div className="flex items-center gap-3">
                                <div className="flex justify-center items-center bg-success/10 rounded-xl w-10 h-10">
                                    <Check className="w-5 h-5 text-success" />
                                </div>
                                <h2 className="font-semibold text-foreground text-2xl">
                                    Your script is ready
                                </h2>
                            </div>
                        )}
                        <p className="text-muted-foreground">{selectedIdea}</p>
                    </div>

                    <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full text-secondary-foreground text-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        {tone}
                    </div>
                </div>
            </div>

            <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 border-border border-b">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-base">
                                Full Script
                            </CardTitle>
                            <CardDescription>
                                Ready to record or refine
                            </CardDescription>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleCopy}
                            className="gap-2"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    Copy script
                                </>
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="max-w-none prose prose-sm">
                        <pre className="bg-transparent m-0 p-0 overflow-visible font-sans text-foreground leading-relaxed whitespace-pre-wrap">
                            {script}
                        </pre>
                    </div>
                </CardContent>
            </Card>

            <div className="flex sm:flex-row flex-col gap-3 pt-4">
                <Button
                    variant="secondary"
                    onClick={onRegenerate}
                    disabled={isLoading}
                    className="gap-2"
                >
                    <RefreshCw
                        className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
                    />
                    Regenerate script
                </Button>
                <Button
                    //   variant="soft"
                    onClick={onStartOver}
                    className="gap-2"
                >
                    Start with a new idea
                </Button>
            </div>

            <p className="pt-2 text-muted-foreground text-sm text-center">
                Every great video starts with a single spark ✨
            </p>
        </div>
    );
};

export default ScriptView;
