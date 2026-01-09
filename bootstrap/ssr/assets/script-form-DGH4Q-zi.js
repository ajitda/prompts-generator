import { a as usePage, r as reactExports, j as jsxRuntimeExports } from "../ssr.js";
import { Sparkles, ArrowRight } from "lucide-react";
import { B as Button } from "./button-TIWYqyVf.js";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { I as Input } from "./input-BjgwYVx7.js";
import { I as IdeaCard } from "./IdeaCard-D7JaeDyx.js";
import { L as LoadingState, S as StoryView } from "./StoryView-C0ptjWwE.js";
import { S as ScriptView } from "./ScriptView-XY6c0IG4.js";
import toast from "react-hot-toast";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./card-MbFmKuYg.js";
const ScriptForm = () => {
  const { props } = usePage();
  const { auth, initialGuestCredits, isAuthenticated, userCredits } = props;
  const currentCredits = isAuthenticated ? userCredits ?? 0 : initialGuestCredits ?? 0;
  const [step, setStep] = reactExports.useState("input");
  const [scriptId, setScriptId] = reactExports.useState(null);
  const [keyword, setKeyword] = reactExports.useState("");
  const [ideas, setIdeas] = reactExports.useState([]);
  const [selectedIdea, setSelectedIdea] = reactExports.useState("");
  const [story, setStory] = reactExports.useState([]);
  const [script, setScript] = reactExports.useState("");
  const [tone, setTone] = reactExports.useState("Conversational & Educational");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [fingerprint, setFingerprint] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const loadFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setFingerprint(result.visitorId);
      } catch (error) {
        console.error("Error loading FingerprintJS:", error);
      }
    };
    loadFingerprint();
  }, []);
  const requestHeaders = {
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
    "X-Browser-Fingerprint": fingerprint
  };
  const handleSaveIdeas = async (scriptId2, ideas2) => {
    const requestHeaders2 = {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
      ...fingerprint && { "X-Browser-Fingerprint": fingerprint }
    };
    try {
      await fetch(`/scripts/${scriptId2}`, {
        method: "PUT",
        headers: requestHeaders2,
        body: JSON.stringify({ idea: ideas2 })
      });
    } catch (error) {
      console.error("Failed to save ideas:", error);
      toast.error("Failed to save ideas");
    }
  };
  const handleGenerateIdeas = async () => {
    if (!keyword.trim()) return;
    if (currentCredits <= 0) {
      toast.error("You have no generations left. Please sign up for more.");
      return;
    }
    console.log(requestHeaders, "requestHeaders");
    setIsLoading(true);
    try {
      const res = await fetch("/scripts/ideas", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({ keyword })
      });
      const data = await res.json();
      if (data.success) {
        setIdeas(data.ideas);
        setScriptId(data.script_id);
        setStep("ideas");
        handleSaveIdeas(data.script_id, data.ideas);
      } else throw new Error(data.message);
    } catch (_error) {
      toast.error(_error.message || "Error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSelectIdea = async (idea) => {
    setSelectedIdea(idea);
    setIsLoading(true);
    setStep("story");
    try {
      const res = await fetch("/scripts/story", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({ script_id: scriptId, title: idea })
      });
      const data = await res.json();
      if (data.success) {
        setStory(data.story);
      } else throw new Error(data.message);
    } catch (_error) {
      toast.error(_error.message || "Error");
      console.log("check error:", _error);
      setStep("ideas");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGenerateScript = async () => {
    setIsLoading(true);
    setStep("script");
    try {
      const res = await fetch("/scripts/final", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({ script_id: scriptId })
      });
      const data = await res.json();
      if (data.success) {
        setScript(data.script);
        setTone(data.tone);
      } else throw new Error(data.message);
    } catch (_error) {
      console.error("Full Error Details:", _error);
      toast.error(_error.message || "Error");
      setStep("story");
    } finally {
      setIsLoading(false);
    }
  };
  const handleStartOver = () => {
    setStep("input");
    setKeyword("");
    setScriptId(null);
    setIdeas([]);
    setSelectedIdea("");
    setStory([]);
    setScript("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-6 max-w-3xl", children: [
    step === "input" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in flex flex-col items-center justify-center min-h-[60vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center mb-4 text-balance text-4xl font-bold", children: "What's your video about?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: keyword,
            onChange: (e) => setKeyword(e.target.value),
            placeholder: "e.g., productivity tips for students",
            className: "text-center text-lg h-14",
            onKeyDown: (e) => e.key === "Enter" && handleGenerateIdeas()
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "default", onClick: handleGenerateIdeas, disabled: !keyword.trim() || currentCredits <= 0 || !fingerprint, size: "lg", className: "w-full gap-2", children: [
          "Generate video ideas ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] }),
        !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
          "You have ",
          currentCredits,
          " free generations left."
        ] })
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoadingState,
      {
        message: step === "input" ? "Exploring possibilities..." : step === "ideas" ? "Crafting your story..." : "Writing your script..."
      }
    ),
    step === "ideas" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold", children: "Let's explore a few directions" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ideas.map((idea, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(IdeaCard, { idea, index }, index)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: handleStartOver, className: "w-full", children: "← Try a different topic" })
    ] }),
    step === "story" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      StoryView,
      {
        selectedIdea,
        story,
        onRegenerate: () => handleSelectIdea(selectedIdea),
        onGenerateScript: handleGenerateScript,
        onBack: () => setStep("ideas"),
        isLoading
      }
    ),
    step === "script" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScriptView,
      {
        selectedIdea,
        script,
        tone,
        onBack: () => setStep("story"),
        onRegenerate: handleGenerateScript,
        onStartOver: handleStartOver,
        isLoading
      }
    )
  ] }) });
};
export {
  ScriptForm as default
};
