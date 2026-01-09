import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { B as Button } from "./button-CIfObXh5.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent } from "./card-BKW9IOpa.js";
import { ArrowLeft, Check, Sparkles, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
const ScriptView = ({
  selectedIdea,
  script,
  tone = null,
  onBack,
  onRegenerate,
  onStartOver,
  isLoading,
  showExisting = false
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2e3);
    } catch {
      toast.error("Couldn't copy");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      !showExisting && /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onBack,
          className: "inline-flex items-center gap-2 font-medium text-muted-foreground hover:text-foreground text-sm transition-colors duration-250",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to story"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between items-start gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          !showExisting && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center bg-success/10 rounded-xl w-10 h-10", children: /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-success" }) }),
            /* @__PURE__ */ jsx("h2", { className: "font-semibold text-foreground text-2xl", children: "Your script is ready" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: selectedIdea })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full text-secondary-foreground text-sm", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          tone
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsx(CardHeader, { className: "bg-muted/30 border-border border-b", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-base", children: "Full Script" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Ready to record or refine" })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "secondary",
            size: "sm",
            onClick: handleCopy,
            className: "gap-2",
            children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }),
              "Copied"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Copy, { className: "w-4 h-4" }),
              "Copy script"
            ] })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-none prose prose-sm", children: /* @__PURE__ */ jsx("pre", { className: "bg-transparent m-0 p-0 overflow-visible font-sans text-foreground leading-relaxed whitespace-pre-wrap", children: script }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex sm:flex-row flex-col gap-3 pt-4", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "secondary",
          onClick: onRegenerate,
          disabled: isLoading,
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsx(
              RefreshCw,
              {
                className: `h-4 w-4 ${isLoading ? "animate-spin" : ""}`
              }
            ),
            "Regenerate script"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: onStartOver,
          className: "gap-2",
          children: "Start with a new idea"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("p", { className: "pt-2 text-muted-foreground text-sm text-center", children: "Every great video starts with a single spark ✨" })
  ] });
};
export {
  ScriptView as S
};
