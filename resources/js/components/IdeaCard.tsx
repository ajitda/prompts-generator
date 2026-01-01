import { Copy, Check, Image, MessageSquare, BarChart3 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
interface IdeaCardProps {
  idea: {
    Title: string;
    Thumbnail_Concept: string;
    Hook_Script: string;
    Difficulty: string;
  };
  index: number;
  onSelect: () => void;
}

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-700",
};

const IdeaCard = ({ idea, index, onSelect }: IdeaCardProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    // toast({
    //   title: "Copied!",
    //   description: `${field} copied to clipboard`,
    // });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyAll = async () => {
    const fullText = `Title: ${idea.Title}\n\nThumbnail Concept: ${idea.Thumbnail_Concept}\n\nHook Script: ${idea.Hook_Script}\n\nDifficulty: ${idea.Difficulty}`;
    await navigator.clipboard.writeText(fullText);
    setCopiedField("all");
    // toast({
    //   title: "Copied!",
    //   description: "Full idea copied to clipboard",
    // });
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div
      className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
            {index + 1}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[idea.Difficulty] || difficultyColors.Medium}`}>
            {idea.Difficulty}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyAll}
          className="text-muted-foreground hover:text-foreground"
        >
          {copiedField === "all" ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span className="ml-1 text-xs">Copy All</span>
        </Button>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <div className="group">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Title</span>
            <button
              onClick={() => copyToClipboard(idea.Title, "Title")}
              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copiedField === "Title" ? (
                <Check className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
              )}
            </button>
          </div>
          <p className="font-semibold text-lg leading-snug">{idea.Title}</p>
        </div>

        {/* Thumbnail Concept */}
        <div className="group">
          <div className="flex items-center gap-2 mb-1">
            <Image className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Thumbnail Concept</span>
            <button
              onClick={() => copyToClipboard(idea.Thumbnail_Concept, "Thumbnail")}
              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copiedField === "Thumbnail" ? (
                <Check className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
              )}
            </button>
          </div>
          <p className="text-muted-foreground leading-relaxed">{idea.Thumbnail_Concept}</p>
        </div>

        {/* Hook Script */}
        <div className="group">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Hook Script</span>
            <button
              onClick={() => copyToClipboard(idea.Hook_Script, "Hook")}
              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copiedField === "Hook" ? (
                <Check className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
              )}
            </button>
          </div>
          <p className="text-foreground bg-secondary/50 rounded-lg p-3 italic leading-relaxed">
            "{idea.Hook_Script}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
