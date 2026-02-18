import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Check, Copy, RefreshCw, Sparkles, Clock, Monitor } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Scene {
    scene_number: number;
    visual: string;
    audio: string;
    duration: string;
}

interface SceneViewProps {
    selectedIdea: string;
    scenes: Scene[];
    tone?: string | null;
    onBack: () => void;
    onRegenerate: () => void;
    onStartOver: () => void;
    isLoading: boolean;
}

const SceneView = ({
    selectedIdea,
    scenes,
    tone = null,
    onBack,
    onRegenerate,
    onStartOver,
    isLoading,
}: SceneViewProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            const text = scenes.map(s =>
                `Scene ${s.scene_number} (${s.duration}s)\nVisual: ${s.visual}\nAudio: ${s.audio}`
            ).join('\n\n');
            await navigator.clipboard.writeText(text);
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
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 font-medium text-muted-foreground hover:text-foreground text-sm transition-colors duration-250"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to outline
                </button>

                <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center bg-success/10 rounded-xl w-10 h-10">
                                <Check className="w-5 h-5 text-success" />
                            </div>
                            <h2 className="font-semibold text-foreground text-2xl">
                                Your Detailed Script is Ready
                            </h2>
                        </div>
                        <p className="text-muted-foreground font-medium">{selectedIdea}</p>
                    </div>

                    <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full text-secondary-foreground text-sm font-semibold">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Tone: {tone || 'Professional'}
                    </div>
                </div>
            </div>

            <Card className="overflow-hidden shadow-premium border-none">
                <CardHeader className="bg-muted/30 border-border border-b">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-lg">Scene-by-Scene Storyboard</CardTitle>
                            <CardDescription>
                                Total Est. Duration: {scenes.reduce((acc, s) => acc + (parseInt(s.duration) || 0), 0)}s
                            </CardDescription>
                        </div>
                        <Button
                            variant="default"
                            size="sm"
                            onClick={handleCopy}
                            className="gap-2 shadow-sm"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    Copy Everything
                                </>
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-16">#</TableHead>
                                <TableHead className="min-w-[200px]">
                                    <div className="flex items-center gap-2">
                                        <Monitor className="w-4 h-4" />
                                        Visual / Storyboard
                                    </div>
                                </TableHead>
                                <TableHead className="min-w-[300px]">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        Narration / Audio
                                    </div>
                                </TableHead>
                                <TableHead className="w-24 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Clock className="w-4 h-4" />
                                        Time
                                    </div>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {scenes.map((scene) => (
                                <TableRow key={scene.scene_number} className="hover:bg-muted/20 transition-colors">
                                    <TableCell className="font-bold text-muted-foreground">{scene.scene_number}</TableCell>
                                    <TableCell className="text-sm leading-relaxed">{scene.visual}</TableCell>
                                    <TableCell className="text-sm leading-relaxed font-medium">{scene.audio}</TableCell>
                                    <TableCell className="text-right tabular-nums text-primary font-bold">{scene.duration}s</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex sm:flex-row flex-col gap-3 pt-4">
                <Button
                    variant="outline"
                    onClick={onRegenerate}
                    disabled={isLoading}
                    className="gap-2 h-12"
                >
                    <RefreshCw
                        className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
                    />
                    Regenerate script
                </Button>
                <Button
                    onClick={onStartOver}
                    className="gap-2 h-12 px-8"
                >
                    Start new video
                </Button>
            </div>
        </div>
    );
};

export default SceneView;
