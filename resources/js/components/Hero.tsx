import { Sparkles, Zap } from "lucide-react";

const Hero = () => {
  return (
    <div className="text-center space-y-6 mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
        <Sparkles className="w-4 h-4" />
        <span>AI-Powered YouTube Strategy</span>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
        Turn Any Niche Into{" "}
        <span className="text-gradient">Viral YouTube Ideas</span>
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Beat creator's block in seconds. Get strategic, high-CTR video ideas
        tailored to your niche—complete with titles, thumbnail concepts, and hook scripts.
      </p>

      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span>5 Ideas per Generation</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span>Copy-Ready Scripts</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span>Free to Use</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
