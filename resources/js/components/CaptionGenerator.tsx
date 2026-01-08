import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { Link, router } from '@inertiajs/react';
import { Check, Copy, RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingState from './LoadingState';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

interface Caption {
    Style: string;
    Content: string;
    Hashtags: string;
}

interface CaptionGeneratorProps {
    isAuthenticated?: boolean;
}

const CaptionGenerator = ({ isAuthenticated }: CaptionGeneratorProps) => {
    const [fingerprint, setFingerprint] = useState<string | null>(null);
    const [topic, setTopic] = useState('');
    const [captions, setCaptions] = useState<Caption[]>([]);
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
        if (!topic.trim()) return;
        setIsLoading(true);

        try {
            const res = await fetch('/captions/generate', {
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
                body: JSON.stringify({ topic }),
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            setCaptions(data.captions);
            router.reload({ only: ['menu_data'] });
        } catch (err: any) {
            toast.error(err.message || 'Failed to generate captions');
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
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        placeholder="Enter your post topic (e.g. My morning coffee routine)"
                        className="h-14"
                    />
                    <Button
                        size="xl"
                        onClick={handleGenerate}
                        disabled={!topic || isLoading || !fingerprint}
                    >
                        <Sparkles className="h-5 w-5" />
                        Generate Captions
                    </Button>
                </div>
            </div>

            {isLoading && (
                <LoadingState message="Generating viral captions..." />
            )}

            {!isLoading && captions.length > 0 && (
                <div className="grid gap-6">
                    {captions.map((caption, index) => (
                        <Card
                            key={index}
                            className="animate-reveal border-border/40 bg-card/50 p-6 backdrop-blur-xl transition-all hover:shadow-lg"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black tracking-widest text-primary uppercase">
                                    {caption.Style}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="transition-colors hover:bg-primary/10 hover:text-primary"
                                    onClick={() =>
                                        copyToClipboard(
                                            `${caption.Content}\n\n${caption.Hashtags}`,
                                            index,
                                        )
                                    }
                                >
                                    {copiedIndex === index ? (
                                        <Check className="h-4 w-4" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            <p className="mb-4 text-lg leading-relaxed font-medium whitespace-pre-wrap text-foreground">
                                {caption.Content}
                            </p>
                            <p className="text-sm font-bold tracking-tight text-primary">
                                {caption.Hashtags}
                            </p>
                        </Card>
                    ))}

                    <div className="mt-12 flex justify-center">
                        <Button
                            variant="outline"
                            className="h-14 rounded-2xl border-border/40 px-8 text-xs font-black tracking-widest uppercase"
                            onClick={() => {
                                setTopic('');
                                setCaptions([]);
                            }}
                        >
                            <RotateCcw className="mr-3 h-4 w-4" />
                            Start Over
                        </Button>
                    </div>
                </div>
            )}

            {!isLoading && captions.length === 0 && !isAuthenticated && (
                <div className="animate-reveal mt-[-20px] mb-8 text-center">
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
                            for more features
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default CaptionGenerator;
