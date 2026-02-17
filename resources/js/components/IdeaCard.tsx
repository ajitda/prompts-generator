import { BarChart3, Check, Copy, Image, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
interface IdeaCardProps {
    idea: {
        Title: string;
        Thumbnail_Concept?: string;
        Hook_Script?: string;
        Visual_Concept?: string;
        Concept_Brief?: string;
        Difficulty: string;
    };
    index: number;
    onSelect: () => void;
}

const difficultyColors: Record<string, string> = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-amber-100 text-amber-700',
    Hard: 'bg-red-100 text-red-700',
};

const IdeaCard = ({ idea, index, onSelect }: IdeaCardProps) => {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const isScript = !!idea.Visual_Concept || !!idea.Concept_Brief;
    const visualLabel = isScript ? 'Visual Style' : 'Thumbnail Concept';
    const briefLabel = isScript ? 'Concept Brief' : 'Hook Script';

    const visualContent = idea.Visual_Concept || idea.Thumbnail_Concept || '';
    const briefContent = idea.Concept_Brief || idea.Hook_Script || '';

    const copyToClipboard = async (text: string, field: string) => {
        await navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const copyAll = async () => {
        const fullText = `Title: ${idea.Title}\n\n${visualLabel}: ${visualContent}\n\n${briefLabel}: ${briefContent}\n\nDifficulty: ${idea.Difficulty}`;
        await navigator.clipboard.writeText(fullText);
        setCopiedField('all');
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={onSelect}
            className="hover:shadow-card-hover cursor-pointer rounded-xl border border-border/50 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1"
        >
            <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                        {index + 1}
                    </span>
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${difficultyColors[idea.Difficulty] || difficultyColors.Medium}`}
                    >
                        {idea.Difficulty}
                    </span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        copyAll();
                    }}
                    className="text-muted-foreground hover:text-foreground"
                >
                    {copiedField === 'all' ? (
                        <Check className="h-4 w-4 text-green-600" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                    <span className="ml-1 text-xs">Copy All</span>
                </Button>
            </div>

            <div className="space-y-4">
                {/* Title */}
                <div className="group">
                    <div className="mb-1 flex items-center gap-2">
                        <BarChart3 className="text-primary h-4 w-4" />
                        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Title
                        </span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(idea.Title, 'Title');
                            }}
                            className="ml-auto opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            {copiedField === 'Title' ? (
                                <Check className="h-3.5 w-3.5 text-green-600" />
                            ) : (
                                <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                            )}
                        </button>
                    </div>
                    <p className="text-lg leading-snug font-semibold">
                        {idea.Title}
                    </p>
                </div>

                {/* Visual Concept */}
                <div className="group">
                    <div className="mb-1 flex items-center gap-2">
                        <Image className="h-4 w-4 text-accent" />
                        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            {visualLabel}
                        </span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(visualContent, 'Visual');
                            }}
                            className="ml-auto opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            {copiedField === 'Visual' ? (
                                <Check className="h-3.5 w-3.5 text-green-600" />
                            ) : (
                                <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                            )}
                        </button>
                    </div>
                    <p className="leading-relaxed text-muted-foreground">
                        {visualContent}
                    </p>
                </div>

                {/* Concept Brief / Hook Script */}
                <div className="group">
                    <div className="mb-1 flex items-center gap-2">
                        <MessageSquare className="text-primary h-4 w-4" />
                        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            {briefLabel}
                        </span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(briefContent, 'Brief');
                            }}
                            className="ml-auto opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            {copiedField === 'Brief' ? (
                                <Check className="h-3.5 w-3.5 text-green-600" />
                            ) : (
                                <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                            )}
                        </button>
                    </div>
                    <p className="rounded-lg bg-secondary/50 p-3 leading-relaxed text-foreground italic">
                        "{briefContent}"
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IdeaCard;
