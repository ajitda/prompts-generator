import { r as reactExports, j as jsxRuntimeExports, L as Link_default, a as router3, u as usePage, H as Head_default } from "../ssr.js";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { Sparkles, Check, Copy, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { L as LoadingState } from "./LoadingState-j_yxnCDU.js";
import { B as Button } from "./button-TIWYqyVf.js";
import { C as Card } from "./card-MbFmKuYg.js";
import { I as Input } from "./input-BjgwYVx7.js";
import { A as AppLayout } from "./app-layout-UE3TY_Q_.js";
import "side-channel";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "./dropdown-menu-UN199YB4.js";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
import "./index-Cm2O5opL.js";
import "./index--D7ld9AJ.js";
import "./index-B6anorhi.js";
import "@radix-ui/react-collapsible";
const CaptionGenerator = ({
  initialGuestCredits,
  isAuthenticated,
  userCredits
}) => {
  const currentCredits = isAuthenticated ? userCredits ?? 0 : initialGuestCredits ?? 0;
  const [fingerprint, setFingerprint] = reactExports.useState(null);
  const [topic, setTopic] = reactExports.useState("");
  const [captions, setCaptions] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [copiedIndex, setCopiedIndex] = reactExports.useState(null);
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
  const handleGenerate = async () => {
    if (!topic.trim()) return;
    if (currentCredits <= 0) {
      toast.error("You have no generations left.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/captions/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
          ...fingerprint && {
            "X-Browser-Fingerprint": fingerprint
          }
        },
        body: JSON.stringify({ topic })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setCaptions(data.captions);
      router3.reload({
        only: ["menu_data", "initialGuestCredits", "userCredits"]
      });
    } catch (err) {
      toast.error(err.message || "Failed to generate captions");
    } finally {
      setIsLoading(false);
    }
  };
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2e3);
    toast.success("Copied to clipboard!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 rounded-2xl border bg-card p-6 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 md:flex-row md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: topic,
          onChange: (e) => setTopic(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && handleGenerate(),
          placeholder: "Enter your post topic (e.g. My morning coffee routine)",
          className: "h-14"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "xl",
          onClick: handleGenerate,
          disabled: !topic || isLoading || !fingerprint || currentCredits <= 0,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }),
            "Generate Captions"
          ]
        }
      )
    ] }) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingState, { message: "Generating viral captions..." }),
    !isLoading && captions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      captions.map((caption, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "animate-reveal border-border/40 bg-card/50 p-6 backdrop-blur-xl transition-all hover:shadow-lg",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black tracking-widest text-primary uppercase", children: caption.Style }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "transition-colors hover:bg-primary/10 hover:text-primary",
                  onClick: () => copyToClipboard(
                    `${caption.Content}

${caption.Hashtags}`,
                    index
                  ),
                  children: copiedIndex === index ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-lg leading-relaxed font-medium whitespace-pre-wrap text-foreground", children: caption.Content }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold tracking-tight text-primary", children: caption.Hashtags })
          ]
        },
        index
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "h-14 rounded-2xl border-border/40 px-8 text-xs font-black tracking-widest uppercase",
          onClick: () => {
            setTopic("");
            setCaptions([]);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "mr-3 h-4 w-4" }),
            "Start Over"
          ]
        }
      ) })
    ] }),
    !isLoading && captions.length === 0 && !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-reveal mt-[-20px] mb-8 text-center", children: [
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
    ] })
  ] });
};
const breadcrumbs = [
  {
    title: "Caption Generator",
    href: "/youtube/captions"
  }
];
function CaptionsIndex() {
  const { props } = usePage();
  const { isAuthenticated, initialGuestCredits, userCredits } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Head_default, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "TikTok & Instagram Caption Generator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meta",
        {
          name: "description",
          content: "Generate high-engagement captions for TikTok and Instagram using AI."
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-12 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mb-4 text-4xl font-black tracking-tight text-foreground md:text-6xl", children: [
          "Social Media",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Caption" }),
          " ",
          "Generator"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-2xl text-lg text-muted-foreground", children: "Create viral-worthy captions for TikTok and Instagram in seconds. Built for creators who want to save time and boost engagement." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CaptionGenerator,
        {
          isAuthenticated,
          initialGuestCredits,
          userCredits
        }
      )
    ] }) })
  ] });
}
export {
  CaptionsIndex as default
};
