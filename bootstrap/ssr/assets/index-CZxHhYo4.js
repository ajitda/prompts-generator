import { r as reactExports, j as jsxRuntimeExports, L as Link_default, a as router3, u as usePage, H as Head_default } from "../ssr.js";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { z as zt } from "./index-CeNWS0RB.js";
import { I as IdeaCard, S as StoryView, a as ScriptView } from "./StoryView-GvGmD4kP.js";
import { L as LoadingState } from "./LoadingState-BmFRMusO.js";
import { b as createLucideIcon, B as Button } from "./createLucideIcon-DxBA2hfx.js";
import { I as Input } from "./input-BjSWeg-A.js";
import { S as Sparkles } from "./sparkles-BFjwokJ6.js";
import { A as ArrowLeft } from "./arrow-left-DhtKOkIO.js";
import { R as RotateCcw } from "./rotate-ccw-Bi0jdyaW.js";
import { S as SceneView } from "./SceneView-cAVGwz5w.js";
import { A as AppLayout } from "./app-layout-BhbfzW2M.js";
import { Z as Zap } from "./zap-5YGQ18vS.js";
import "side-channel";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "goober";
import "./check-2g5mg3H-.js";
import "./copy-BiOVhSOM.js";
import "./message-square-CyQY6ja3.js";
import "./card-CqYzDAC4.js";
import "./refresh-cw-DueGN9ey.js";
import "./file-text-CVdbGrR6.js";
import "./monitor-CfbrvXgx.js";
import "./clock-lrMVSSaL.js";
import "@radix-ui/primitive";
import "./dropdown-menu-C5jyS0V-.js";
import "@floating-ui/react-dom";
import "aria-hidden";
import "react-remove-scroll";
import "./index-Do_dwBzt.js";
import "use-sync-external-store/shim";
import "./index-Dye-FuDj.js";
import "./index--D7ld9AJ.js";
import "./index-8HAZ9HbM.js";
import "./video-stECLQZx.js";
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
];
const Film = createLucideIcon("Film", __iconNode$1);
const __iconNode = [
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }],
  ["path", { d: "M13 6h8", key: "15sg57" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 18h8", key: "oe0vm4" }]
];
const ListChecks = createLucideIcon("ListChecks", __iconNode);
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
  const [selectedIdea, setSelectedIdea] = reactExports.useState(null);
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
      zt.error("You have no generations left.");
      return;
    }
    setIsLoading(true);
    setHasGenerated(true);
    try {
      const res = await fetch("/generate/ideas", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({ keyword, type: "youtube_idea" })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setIdeas(data.ideas);
      setScriptId(data.script_id);
      setStep("ideas");
      router3.reload({
        only: ["menu_data", "initialGuestCredits", "userCredits"]
      });
    } catch (err) {
      const error = err;
      zt.error(error.message);
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
      const res = await fetch("/generate/story", {
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
      router3.reload({
        only: ["initialGuestCredits", "userCredits"]
      });
    } catch {
      zt.error("Failed to generate story");
      setStep("ideas");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGenerateScript = async () => {
    setIsLoading(true);
    setStep("script");
    try {
      const res = await fetch("/generate/final", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
          script_id: scriptId,
          title: selectedIdea?.Title
        })
      });
      const data = await res.json();
      if (!data.success) throw new Error();
      setScript(data.script);
      setTone(data.tone);
      router3.reload({
        only: ["initialGuestCredits", "userCredits"]
      });
    } catch {
      zt.error("Failed to generate script");
      setStep("story");
    } finally {
      setIsLoading(false);
    }
  };
  const handleStartOver = () => {
    setStep("input");
    setKeyword("");
    setIdeas([]);
    setSelectedIdea(null);
    setStory([]);
    setScript("");
    setHasGenerated(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-4 w-full max-w-4xl", children: [
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
        " free credits left."
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: ideas.map((idea, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        IdeaCard,
        {
          idea,
          index,
          onSelect: () => handleSelectIdea(idea)
        },
        index
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
        selectedIdea: selectedIdea?.Title || "",
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
        selectedIdea: selectedIdea?.Title || "",
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
const VideoScriptGenerator = ({
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
  const [concepts, setConcepts] = reactExports.useState([]);
  const [selectedConcept, setSelectedConcept] = reactExports.useState(null);
  const [story, setStory] = reactExports.useState([]);
  const [scenes, setScenes] = reactExports.useState([]);
  const [tone, setTone] = reactExports.useState("Professional & Engaging");
  const [scriptId, setScriptId] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const requestHeaders = {
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
    ...fingerprint && { "X-Browser-Fingerprint": fingerprint }
  };
  const handleGenerateConcepts = async () => {
    if (!keyword.trim()) return;
    if (currentCredits <= 0) {
      zt.error("You have no generations left.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/generate/ideas", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({ keyword, type: "video_script" })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setConcepts(data.ideas);
      setScriptId(data.script_id);
      setStep("concepts");
      router3.reload({
        only: ["menu_data", "initialGuestCredits", "userCredits"]
      });
    } catch (err) {
      const error = err;
      zt.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSelectConcept = async (concept) => {
    setSelectedConcept(concept);
    setStep("outline");
    setIsLoading(true);
    try {
      const res = await fetch("/generate/story", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
          script_id: scriptId,
          title: concept.Title
        })
      });
      const data = await res.json();
      if (!data.success) throw new Error();
      setStory(data.story);
      router3.reload({ only: ["initialGuestCredits", "userCredits"] });
    } catch {
      zt.error("Failed to generate outline");
      setStep("concepts");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGenerateDetailedScript = async () => {
    setIsLoading(true);
    setStep("script");
    try {
      const res = await fetch("/generate/detailed", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
          script_id: scriptId,
          title: selectedConcept?.Title
        })
      });
      const data = await res.json();
      if (!data.success) throw new Error();
      setScenes(data.scenes);
      setTone(data.tone);
      router3.reload({ only: ["initialGuestCredits", "userCredits"] });
    } catch {
      zt.error("Failed to generate detailed script");
      setStep("outline");
    } finally {
      setIsLoading(false);
    }
  };
  const handleStartOver = () => {
    setStep("input");
    setKeyword("");
    setConcepts([]);
    setSelectedConcept(null);
    setStory([]);
    setScenes([]);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-4 w-full max-w-4xl", children: [
    step === "input" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 rounded-2xl border bg-card p-8 shadow-premium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-5 h-5 text-primary" }),
          "Video Project Topic"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "What is your video about? Be as specific as possible." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 md:flex-row md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: keyword,
            onChange: (e) => setKeyword(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && handleGenerateConcepts(),
            placeholder: "e.g., How to start a small business in 2026",
            className: "h-14 text-lg"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "xl",
            onClick: handleGenerateConcepts,
            disabled: !keyword || currentCredits <= 0 || !fingerprint,
            className: "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }),
              "Generate Concepts"
            ]
          }
        )
      ] })
    ] }) }),
    !isAuthenticated && step === "input" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-[-20px] mb-8 text-center bg-muted/30 p-4 rounded-xl border border-dashed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
        "You have ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold", children: currentCredits }),
        " free script credits left."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link_default, { href: "/login", className: "text-primary font-bold hover:underline", children: "Login" }),
        " or ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link_default, { href: "/register", className: "text-primary font-bold hover:underline", children: "Sign up" }),
        " to get 10 more credits."
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoadingState,
      {
        message: step === "concepts" ? "Researching viral concepts..." : step === "outline" ? "Building the visual outline..." : "Compiling detailed scene-by-scene script..."
      }
    ),
    step === "concepts" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-primary/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "w-6 h-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black tracking-tight", children: "Script Concepts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            "Choose a direction for your video on ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
              '"',
              keyword,
              '"'
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: concepts.map((concept, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        IdeaCard,
        {
          idea: concept,
          index,
          onSelect: () => handleSelectConcept(concept)
        },
        index
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col items-center justify-center gap-4 border-t pt-8 md:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "lg", className: "h-14 w-full md:w-auto", onClick: () => setStep("input"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-3 h-4 w-4" }),
          "Different Topic"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", size: "lg", className: "h-14", onClick: handleGenerateConcepts, disabled: currentCredits <= 0, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "mr-3 h-4 w-4" }),
          "New Concepts"
        ] })
      ] })
    ] }),
    step === "outline" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      StoryView,
      {
        selectedIdea: selectedConcept?.Title || "",
        story,
        onGenerateScript: handleGenerateDetailedScript,
        onBack: () => setStep("concepts"),
        onRegenerate: () => {
        },
        isLoading: false
      }
    ),
    step === "script" && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SceneView,
      {
        selectedIdea: selectedConcept?.Title || "",
        scenes,
        tone,
        onBack: () => setStep("outline"),
        onStartOver: handleStartOver,
        onRegenerate: handleGenerateDetailedScript,
        isLoading
      }
    )
  ] });
};
function VideoScripts() {
  const { props } = usePage();
  const {
    type = "youtube_idea",
    scripts,
    filters = {},
    initialGuestCredits,
    isAuthenticated,
    userCredits
  } = props;
  const isIdeaGenerator = type === "youtube_idea";
  const toolTitle = isIdeaGenerator ? "YouTube Video Idea Generator" : "Video Script Generator";
  const breadcrumbs = [
    {
      title: toolTitle,
      href: isIdeaGenerator ? "/youtube" : "/scripts"
    }
  ];
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
      router3.get(isIdeaGenerator ? "/youtube" : "/scripts", {
        preserveScroll: true,
        preserveState: true,
        replace: true
      });
    },
    [sortConfig, isIdeaGenerator]
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 space-y-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI-Powered YouTube Strategy" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl leading-tight font-extrabold md:text-5xl lg:text-6xl", children: isIdeaGenerator ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Turn Any Niche Into",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Viral YouTube Ideas" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Generate Professional",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Video Scripts" }),
          " In Seconds"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl", children: isIdeaGenerator ? "Beat creator's block in seconds. Get strategic, high-CTR video ideas tailored to your niche—complete with titles, thumbnail concepts, and hook scripts." : "Go from keyword to a scene-by-scene professional video script. Perfect for YouTube, TikTok, or corporate videos." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isIdeaGenerator ? "5 Ideas per Generation" : "5 Scripts per Generation" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Copy-Ready Scripts" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Free to Use" })
          ] })
        ] })
      ] }),
      isIdeaGenerator ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        IdeaGenerator,
        {
          initialGuestCredits,
          isAuthenticated,
          userCredits
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        VideoScriptGenerator,
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
