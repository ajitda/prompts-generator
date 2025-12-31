import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, FileText, ArrowLeft, Sparkles } from "lucide-react";

interface StorySection {
  title: string;
  content: string;
  icon: string;
}

interface StoryViewProps {
  selectedIdea: string;
  story: StorySection[];
  onRegenerate: () => void;
  onGenerateScript: () => void;
  onBack: () => void;
  isLoading: boolean;
}

const StoryView = ({ 
  selectedIdea, 
  story, 
  onRegenerate, 
  onGenerateScript, 
  onBack,
  isLoading 
}: StoryViewProps) => {
  const sectionIcons: Record<string, React.ReactNode> = {
    "🎣": <span className="text-2xl">🎣</span>,
    "📖": <span className="text-2xl">📖</span>,
    "🎯": <span className="text-2xl">🎯</span>,
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="space-y-4">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-250 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to ideas
        </button>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Building story for:</p>
          <h2 className="text-2xl font-semibold text-foreground">{selectedIdea}</h2>
        </div>
      </div>

      <div className="space-y-4">
        {story.map((section, index) => (
          <Card key={index} className="fade-in-delayed overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                {sectionIcons[section.icon] || <Sparkles className="w-5 h-5 text-primary" />}
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button 
          variant="secondary" 
          onClick={onRegenerate}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Try a different version
        </Button>
        <Button 
          onClick={onGenerateScript}
          disabled={isLoading}
          className="gap-2"
        >
          <FileText className="w-4 h-4" />
          Generate full script
        </Button>
      </div>

      <p className="text-sm text-muted-foreground text-center pt-2">
        No rush — creativity takes shape at its own pace
      </p>
    </div>
  );
};

export default StoryView;
