import { jsxs, jsx } from "react/jsx-runtime";
import { Sparkles, ArrowLeft, RefreshCw, FileText } from "lucide-react";
import { B as Button } from "./button-CIfObXh5.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BKW9IOpa.js";
const LoadingState = ({ message, submessage }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-16 animate-fade-in", children: [
    /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 animate-gentle-bounce", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-8 h-8 text-primary" }) }),
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium text-foreground mb-2", children: message }),
    submessage && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center max-w-md", children: submessage }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5 mt-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary/40 animate-pulse", style: { animationDelay: "0ms" } }),
      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary/40 animate-pulse", style: { animationDelay: "150ms" } }),
      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary/40 animate-pulse", style: { animationDelay: "300ms" } })
    ] })
  ] });
};
const StoryView = ({
  selectedIdea,
  story,
  onRegenerate,
  onGenerateScript,
  onBack,
  isLoading
}) => {
  const sectionIcons = {
    "🎣": /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🎣" }),
    "📖": /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "📖" }),
    "🎯": /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🎯" })
  };
  return /* @__PURE__ */ jsxs("div", { className: "animate-fade-in space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onBack,
          className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-250 text-sm font-medium",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to ideas"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Building story for:" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-foreground", children: selectedIdea })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: story.map((section, index) => /* @__PURE__ */ jsxs(Card, { className: "fade-in-delayed overflow-hidden", children: [
      /* @__PURE__ */ jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        sectionIcons[section.icon] || /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: section.title })
      ] }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: section.content }) })
    ] }, index)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-4", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "secondary",
          onClick: onRegenerate,
          disabled: isLoading,
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: `w-4 h-4 ${isLoading ? "animate-spin" : ""}` }),
            "Try a different version"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: onGenerateScript,
          disabled: isLoading,
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }),
            "Generate full script"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center pt-2", children: "No rush — creativity takes shape at its own pace" })
  ] });
};
export {
  LoadingState as L,
  StoryView as S
};
