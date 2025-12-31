import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, ArrowRight } from "lucide-react";

interface IdeaCardProps {
  idea: string;
  index: number;
  onSelect: () => void;
}

const IdeaCard = ({ idea, index, onSelect }: IdeaCardProps) => {
  return (
    <Card 
    //   interactive 
      onClick={onSelect}
      className="group fade-in-delayed"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-250">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-medium leading-relaxed">{idea}</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-250 group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdeaCard;
