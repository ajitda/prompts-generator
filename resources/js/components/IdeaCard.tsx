import { BarChart3, Check, ChevronRight, Copy, Image, MessageSquare } from 'lucide-react';
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
    isHistory?: boolean;
}

const difficultyColors: Record<string, string> = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-amber-100 text-amber-700',
    Hard: 'bg-red-100 text-red-700',
};

const IdeaCard = ({ idea, index, onSelect, isHistory = false }: IdeaCardProps) => {
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
        const fullText = isHistory 
            ? idea.Title 
            : `Title: ${idea.Title}\n\n${visualLabel}: ${visualContent}\n\n${briefLabel}: ${briefContent}\n\nDifficulty: ${idea.Difficulty}`;
        await navigator.clipboard.writeText(fullText);
        setCopiedField('all');
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={isHistory ? undefined : onSelect}
            className={`rounded-xl border border-border/50 bg-card p-6 shadow-card transition-all duration-300 ${isHistory ? '' : 'hover:shadow-card-hover group cursor-pointer hover:-translate-y-1'}`}
        >
          

            <div className="space-y-4">
                {/* Title */}
                <div>
                    <div className="mb-1 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Title
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <p className="text-lg font-semibold leading-snug text-foreground">
                            {idea.Title}
                        </p>
                        {!isHistory && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                                <ChevronRight className="h-5 w-5" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Visual Concept */}
                {visualContent && (
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
                )}

                {/* Concept Brief / Hook Script */}
                {briefContent && (
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
                )}
            </div>
        </div>
    );
};

export default IdeaCard;
