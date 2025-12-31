import { Sparkles } from "lucide-react";

interface LoadingStateProps {
  message: string;
  submessage?: string;
}

const LoadingState = ({ message, submessage }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 animate-gentle-bounce">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-medium text-foreground mb-2">{message}</h3>
      {submessage && (
        <p className="text-muted-foreground text-center max-w-md">{submessage}</p>
      )}
      <div className="flex gap-1.5 mt-6">
        <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

export default LoadingState;
