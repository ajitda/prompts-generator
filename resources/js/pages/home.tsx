import React from 'react'
import { Sparkles, Zap, Target, Lightbulb, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';
import Hero from '@/components/Hero';
function home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">AI Video Idea Generator</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it works</a>
          </nav>
          <Link href="/ai-video-generator">
            <Button variant="default" size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <Hero />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link href="/ai-video-generator">
            <Button variant="hero" size="lg" className="text-base px-8">
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Ideas Now
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg" className="text-base px-8">
              See How It Works
            </Button>
          </a>
        </div>

        {/* Features Section */}
        <section id="features" className="mt-24 md:mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="text-gradient">Beat Creator's Block</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get strategic, data-driven video ideas that are built to perform—not random suggestions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-elegant transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">High-CTR Titles</h3>
              <p className="text-muted-foreground text-sm">
                Every title is crafted under 60 characters with curiosity-driven hooks that demand clicks.
              </p>
            </div>

            <div className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-elegant transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Thumbnail Concepts</h3>
              <p className="text-muted-foreground text-sm">
                Get vivid, visual thumbnail ideas that pair perfectly with your titles for maximum impact.
              </p>
            </div>

            <div className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-elegant transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Hook Scripts</h3>
              <p className="text-muted-foreground text-sm">
                Copy-ready opening lines that grab attention in the first 5 seconds and boost retention.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mt-24 md:mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Go from stuck to publishing in under 60 seconds.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-hero text-primary-foreground font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Enter Your Niche</h3>
              <p className="text-muted-foreground text-sm">
                Type in your topic, niche, or content area.
              </p>
            </div>

            <div className="hidden md:block w-12 h-0.5 bg-border"></div>

            <div className="flex-1 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-hero text-primary-foreground font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Generates Ideas</h3>
              <p className="text-muted-foreground text-sm">
                Our YouTube strategist AI creates 5 viral-worthy ideas.
              </p>
            </div>

            <div className="hidden md:block w-12 h-0.5 bg-border"></div>

            <div className="flex-1 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-hero text-primary-foreground font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Copy & Create</h3>
              <p className="text-muted-foreground text-sm">
                Pick your favorite, copy it, and start creating.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/ai-video-generator">
              <Button variant="hero" size="lg" className="text-base px-8">
                <Zap className="w-5 h-5 mr-2" />
                Try It Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-hero flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-semibold text-sm">AI Video Idea Generator</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Helping creators publish with clarity since 2025
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default home
