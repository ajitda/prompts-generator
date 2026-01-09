import { jsxs, jsx } from "react/jsx-runtime";
import { i as index } from "./ScriptController-DN8f1sXF.js";
import { H as Hero } from "./Hero-DvcbgsAL.js";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { Link, router, usePage, Head } from "@inertiajs/react";
import { Sparkles, ArrowLeft, RotateCcw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { I as IdeaCard } from "./IdeaCard-D-KOEEom.js";
import { L as LoadingState, S as StoryView } from "./StoryView-BtIdTaWm.js";
import { S as ScriptView } from "./ScriptView-DaUoxdHU.js";
import { B as Button } from "./button-CIfObXh5.js";
import { I as Input } from "./input-dpZCab5p.js";
import { A as AppLayout } from "./app-layout-CGh0R-OD.js";
import "./index--D7ld9AJ.js";
import "./card-BKW9IOpa.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
import "./index-Cm2O5opL.js";
import "./index-B6anorhi.js";
import "./logo-LJNW8YKn.js";
import "@radix-ui/react-collapsible";
const IdeaGenerator = ({
  initialGuestCredits,
  isAuthenticated,
  userCredits
}) => {
  const currentCredits = isAuthenticated ? userCredits ?? 0 : initialGuestCredits ?? 0;
  const [fingerprint, setFingerprint] = useState(null);
  useEffect(() => {
    const loadFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setFingerprint(result.visitorId);
        document.cookie = `browser_fingerprint=${result.visitorId}; path=/; max-age=31536000`;
      } catch (error) {
        console.error("Error loading FingerprintJS:", error);
      }
    };
    loadFingerprint();
  }, []);
  const [step, setStep] = useState("input");
  const [keyword, setKeyword] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState("");
  const [story, setStory] = useState([]);
  const [script, setScript] = useState("");
  const [tone, setTone] = useState("Conversational & Educational");
  const [scriptId, setScriptId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const requestHeaders = {
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
    ...fingerprint && { "X-Browser-Fingerprint": fingerprint }
  };
  const handleGenerateIdeas = async () => {
    if (!keyword.trim()) return;
    if (currentCredits <= 0) {
      toast.error("You have no generations left.");
      return;
    }
    setIsLoading(true);
    setHasGenerated(true);
    try {
      const res = await fetch("/scripts/ideas", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({ keyword })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setIdeas(data.ideas);
      setScriptId(data.script_id);
      setStep("ideas");
      router.reload({ only: ["menu_data"] });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSelectIdea = async (idea) => {
    console.log(idea, "idea selected");
    setSelectedIdea(idea);
    setStep("story");
    setIsLoading(true);
    try {
      const res = await fetch("/scripts/story", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
          script_id: scriptId,
          title: idea.Title
        })
      });
      const data = await res.json();
      if (!data.success) throw new Error();
      setStory(data.story);
    } catch {
      toast.error("Failed to generate story");
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
      if (!data.success) throw new Error();
      setScript(data.script);
      setTone(data.tone);
    } catch {
      toast.error("Failed to generate script");
      setStep("story");
    } finally {
      setIsLoading(false);
    }
  };
  const handleStartOver = () => {
    setStep("input");
    setKeyword("");
    setIdeas([]);
    setSelectedIdea("");
    setStory([]);
    setScript("");
    setHasGenerated(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-4xl", children: [
    step === "input" && !isLoading && /* @__PURE__ */ jsx("div", { className: "mb-8 rounded-2xl border bg-card p-6 shadow-card", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 md:flex-row md:justify-between", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          value: keyword,
          onChange: (e) => setKeyword(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && handleGenerateIdeas(),
          placeholder: "Enter your topic",
          className: "h-14"
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          size: "xl",
          onClick: handleGenerateIdeas,
          disabled: !keyword || currentCredits <= 0 || !fingerprint,
          children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }),
            "Generate Ideas"
          ]
        }
      )
    ] }) }),
    !isAuthenticated && step === "input" && !isLoading && /* @__PURE__ */ jsxs("div", { className: "mt-[-20px] mb-8 text-center", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "You have ",
        currentCredits,
        " free generations left."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm font-bold", children: [
        "Please",
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/login",
            className: "text-primary hover:underline",
            children: "Login"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "mx-1 text-muted-foreground", children: "/" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/register",
            className: "text-primary hover:underline",
            children: "Signup"
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
          " ",
          "for 10 more credit"
        ] })
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsx(
      LoadingState,
      {
        message: step === "ideas" ? "Generating ideas..." : step === "story" ? "Crafting your story..." : "Writing your script..."
      }
    ),
    step === "ideas" && hasGenerated && !isLoading && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-8 text-start", children: /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black tracking-tight", children: [
        "Your Generated Ideas for",
        " ",
        /* @__PURE__ */ jsxs("span", { className: "text-gradient", children: [
          '"',
          keyword,
          '"'
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-6", children: ideas.map((idea, index2) => /* @__PURE__ */ jsx(
        IdeaCard,
        {
          idea,
          index: index2,
          onSelect: () => handleSelectIdea(idea)
        },
        index2
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-col items-center justify-center gap-4 border-t border-border/10 pt-8 md:flex-row", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "lg",
            className: "h-14 w-full rounded-2xl border-border/40 px-8 text-[11px] font-black tracking-widest uppercase transition-all hover:bg-muted/50 md:w-auto",
            onClick: () => setStep("input"),
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-3 h-4 w-4" }),
              "Change Topic"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "default",
            size: "lg",
            onClick: handleGenerateIdeas,
            disabled: currentCredits <= 0,
            children: [
              /* @__PURE__ */ jsx(RotateCcw, { className: "mr-3 h-4 w-4" }),
              "Regenerate Ideas"
            ]
          }
        )
      ] })
    ] }),
    step === "story" && !isLoading && /* @__PURE__ */ jsx(
      StoryView,
      {
        selectedIdea,
        story,
        onGenerateScript: handleGenerateScript,
        onBack: () => setStep("ideas"),
        onRegenerate: function() {
          throw new Error("Function not implemented.");
        },
        isLoading: false
      }
    ),
    step === "script" && !isLoading && /* @__PURE__ */ jsx(
      ScriptView,
      {
        selectedIdea,
        script,
        tone,
        onBack: () => setStep("story"),
        onStartOver: handleStartOver,
        onRegenerate: function() {
          throw new Error("Function not implemented.");
        },
        isLoading: false
      }
    )
  ] });
};
const breadcrumbs = [
  {
    title: "Youtube Video Idea Generator",
    href: index().url
  }
];
function VideoScripts() {
  const { props } = usePage();
  const {
    scripts,
    filters = {},
    perPageOptions,
    initialGuestCredits,
    isAuthenticated,
    userCredits
  } = props;
  const [sortConfig, setSortConfig] = useState({
    field: filters?.sort,
    direction: filters?.direction
  });
  useCallback(
    (overrideParams = {}) => {
      const params = {
        // search: localSearch,
        // min_price: localMinPrice,
        // max_price: localMaxPrice,
        sort: sortConfig.field,
        direction: sortConfig.direction,
        // per_page: products?.per_page || 2,
        ...overrideParams
      };
      Object.keys(params).forEach((key) => {
      });
      router.get(index().url, {
        preserveScroll: true,
        preserveState: true,
        replace: true
      });
    },
    [sortConfig]
  );
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "AI Video Scripts Generator" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Generate professional YouTube video scripts using AI. Keyword to script in minutes."
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 py-12 md:py-20", children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(
        IdeaGenerator,
        {
          initialGuestCredits,
          isAuthenticated,
          userCredits
        }
      )
    ] }) })
  ] });
}
export {
  VideoScripts as default
};
