import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { Link, router } from '@inertiajs/react';
import { Check, Copy, RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingState from './LoadingState';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

interface AIPrompt {
    Style: string;
    Content: string;
    Engine: string;
}

interface PromptGeneratorProps {
    initialGuestCredits?: number | null;
    isAuthenticated?: boolean;
    userCredits?: number | null;
}

const PromptGenerator = ({
    initialGuestCredits,
    isAuthenticated,
    userCredits,
}: PromptGeneratorProps) => {
    const currentCredits = isAuthenticated
        ? (userCredits ?? 0)
        : (initialGuestCredits ?? 0);
    const [fingerprint, setFingerprint] = useState<string | null>(null);
    const [keyword, setKeyword] = useState('');
    const [prompts, setPrompts] = useState<AIPrompt[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    useEffect(() => {
        const loadFingerprint = async () => {
            try {
                const fp = await FingerprintJS.load();
                const result = await fp.get();
                setFingerprint(result.visitorId);
                // Set cookie for server-side access
                document.cookie = `browser_fingerprint=${result.visitorId}; path=/; max-age=31536000`;
            } catch (error) {
                console.error('Error loading FingerprintJS:', error);
            }
        };
        loadFingerprint();
    }, []);

    const handleGenerate = async () => {
        if (!keyword.trim()) return;
        if (currentCredits <= 0) {
            toast.error('You have no credits left.');
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('/prompts/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                    ...(fingerprint && {
                        'X-Browser-Fingerprint': fingerprint,
                    }),
                },
                body: JSON.stringify({ keyword }),
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            setPrompts(data.prompts);
            router.reload({
                only: ['menu_data', 'initialGuestCredits', 'userCredits'],
            });
        } catch (err: any) {
            toast.error(err.message || 'Failed to generate prompts');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
        toast.success('Copied to clipboard!');
    };

    return (
        <div className="mx-auto w-full max-w-4xl">
            <div className="mb-8 rounded-2xl border bg-card p-6 shadow-card">
                <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                    <Input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        placeholder="Enter your topic (e.g. Cyberpunk city at night)"
                        className="h-14"
                    />
                    <Button
                        size="xl"
                        onClick={handleGenerate}
                        disabled={
                            !keyword ||
                            isLoading ||
                            !fingerprint ||
                            currentCredits <= 0
                        }
                    >
                        <Sparkles className="h-5 w-5" />
                        Generate Prompts
                    </Button>
                </div>
            </div>

            {isLoading && (
                <LoadingState message="Engineering high-quality prompts..." />
            )}

            {!isLoading && prompts.length > 0 && (
                <div className="grid gap-6">
                    {prompts.map((p, index) => (
                        <Card
                            key={index}
                            className="animate-reveal border-border/40 bg-card/50 p-6 backdrop-blur-xl transition-all hover:shadow-lg"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black tracking-widest text-primary uppercase">
                                        {p.Style}
                                    </span>
                                    <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                        {p.Engine}
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="transition-colors hover:bg-primary/10 hover:text-primary"
                                    onClick={() =>
                                        copyToClipboard(p.Content, index)
                                    }
                                >
                                    {copiedIndex === index ? (
                                        <Check className="h-4 w-4" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            <p className="mb-4 text-lg leading-relaxed font-medium whitespace-pre-wrap text-foreground italic">
                                "{p.Content}"
                            </p>
                        </Card>
                    ))}

                    <div className="mt-12 flex justify-center">
                        <Button
                            variant="outline"
                            className="h-14 rounded-2xl border-border/40 px-8 text-xs font-black tracking-widest uppercase"
                            onClick={() => {
                                setKeyword('');
                                setPrompts([]);
                            }}
                        >
                            <RotateCcw className="mr-3 h-4 w-4" />
                            Start Over
                        </Button>
                    </div>
                </div>
            )}

            {!isLoading && prompts.length === 0 && !isAuthenticated && (
                <div className="animate-reveal mt-[-20px] mb-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        You have {currentCredits} free credits left.
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
        </div>
    );
};

export default PromptGenerator;
