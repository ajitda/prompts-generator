import { r as reactExports, j as jsxRuntimeExports, L as Link_default, b as router3, a as usePage, H as Head_default } from "../ssr.js";
import { i as index } from "./ScriptController-DN8f1sXF.js";
import { H as Hero } from "./Hero-q9kHZ9gv.js";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { Sparkles, ArrowLeft, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { I as IdeaCard } from "./IdeaCard-D7JaeDyx.js";
import { L as LoadingState, S as StoryView } from "./StoryView-C0ptjWwE.js";
import { S as ScriptView } from "./ScriptView-XY6c0IG4.js";
import { B as Button } from "./button-TIWYqyVf.js";
import { I as Input } from "./input-BjgwYVx7.js";
import { A as AppLayout } from "./app-layout-DgUhOw1Y.js";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index--D7ld9AJ.js";
import "./card-MbFmKuYg.js";
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
  const [fingerprint, setFingerprint] = reactExports.useState(null);
  reactExports.useEffect(() => {
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
  const [step, setStep] = reactExports.useState("input");
  const [keyword, setKeyword] = reactExports.useState("");
  const [ideas, setIdeas] = reactExports.useState([]);
  const [selectedIdea, setSelectedIdea] = reactExports.useState("");
  const [story, setStory] = reactExports.useState([]);
  const [script, setScript] = reactExports.useState("");
  const [tone, setTone] = reactExports.useState("Conversational & Educational");
  const [scriptId, setScriptId] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [hasGenerated, setHasGenerated] = reactExports.useState(false);
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
      router3.reload({ only: ["menu_data"] });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-4xl", children: [
    step === "input" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 rounded-2xl border bg-card p-6 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 md:flex-row md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: keyword,
          onChange: (e) => setKeyword(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && handleGenerateIdeas(),
          placeholder: "Enter your topic",
          className: "h-14"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "xl",
          onClick: handleGenerateIdeas,
          disabled: !keyword || currentCredits <= 0 || !fingerprint,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }),
            "Generate Ideas"
          ]
        }
      )
    ] }) }),
    !isAuthenticated && step === "input" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-[-20px] mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "You have ",
        currentCredits,
        " free generations left."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm font-bold", children: [
        "Please",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link_default,
          {
            href: "/login",
            className: "text-primary hover:underline",
            children: "Login"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1 text-muted-foreground", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link_default,
          {
            href: "/register",
            className: "text-primary hover:underline",
            children: "Signup"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          " ",
          "for 10 more credit"
        ] })
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoadingState,
      {
        message: step === "ideas" ? "Generating ideas..." : step === "story" ? "Crafting your story..." : "Writing your script..."
      }
    ),
    step === "ideas" && hasGenerated && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 text-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-black tracking-tight", children: [
        "Your Generated Ideas for",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gradient", children: [
          '"',
          keyword,
          '"'
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: ideas.map((idea, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        IdeaCard,
        {
          idea,
          index: index2,
          onSelect: () => handleSelectIdea(idea)
        },
        index2
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col items-center justify-center gap-4 border-t border-border/10 pt-8 md:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "lg",
            className: "h-14 w-full rounded-2xl border-border/40 px-8 text-[11px] font-black tracking-widest uppercase transition-all hover:bg-muted/50 md:w-auto",
            onClick: () => setStep("input"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-3 h-4 w-4" }),
              "Change Topic"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "default",
            size: "lg",
            onClick: handleGenerateIdeas,
            disabled: currentCredits <= 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "mr-3 h-4 w-4" }),
              "Regenerate Ideas"
            ]
          }
        )
      ] })
    ] }),
    step === "story" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
    step === "script" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  const [sortConfig, setSortConfig] = reactExports.useState({
    field: filters?.sort,
    direction: filters?.direction
  });
  reactExports.useCallback(
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
      router3.get(index().url, {
        preserveScroll: true,
        preserveState: true,
        replace: true
      });
    },
    [sortConfig]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Head_default, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "AI Video Scripts Generator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meta",
        {
          name: "description",
          content: "Generate professional YouTube video scripts using AI. Keyword to script in minutes."
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-12 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
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
