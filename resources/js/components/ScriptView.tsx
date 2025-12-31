import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Copy, Check, ArrowLeft, RefreshCw, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

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
  tone=null, 
  onBack, 
  onRegenerate,
  onStartOver,
  isLoading,
  showExisting=false
}: ScriptViewProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy");
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="space-y-4">
        {!showExisting && (
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-250 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to story
        </button>
        )}
        
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-2">
            {!showExisting && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-success" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Your script is ready</h2>
            </div>
            )}
            <p className="text-muted-foreground">{selectedIdea}</p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm">
            <Sparkles className="w-3.5 h-3.5" />
            {tone}
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Full Script</CardTitle>
              <CardDescription>Ready to record or refine</CardDescription>
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
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-foreground leading-relaxed bg-transparent p-0 m-0 overflow-visible">
              {script}
            </pre>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button 
          variant="secondary" 
          onClick={onRegenerate}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
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

      <p className="text-sm text-muted-foreground text-center pt-2">
        Every great video starts with a single spark ✨
      </p>
    </div>
  );
};

export default ScriptView;
