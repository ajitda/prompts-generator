import { r as reactExports, j as jsxRuntimeExports } from "../ssr.js";
import { b as createLucideIcon, B as Button } from "./createLucideIcon-DxBA2hfx.js";
import { C as Check } from "./check-2g5mg3H-.js";
import { C as Copy } from "./copy-BiOVhSOM.js";
import { M as MessageSquare } from "./message-square-CyQY6ja3.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent } from "./card-CqYzDAC4.js";
import { z as zt } from "./index-CeNWS0RB.js";
import { A as ArrowLeft } from "./arrow-left-DhtKOkIO.js";
import { S as Sparkles } from "./sparkles-BFjwokJ6.js";
import { R as RefreshCw } from "./refresh-cw-DueGN9ey.js";
import { F as FileText } from "./file-text-CVdbGrR6.js";
const __iconNode$1 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("ChartColumn", __iconNode$1);
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("Image", __iconNode);
const difficultyColors = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-700"
};
const IdeaCard = ({ idea, index, onSelect }) => {
  const [copiedField, setCopiedField] = reactExports.useState(null);
  const isScript = !!idea.Visual_Concept || !!idea.Concept_Brief;
  const visualLabel = isScript ? "Visual Style" : "Thumbnail Concept";
  const briefLabel = isScript ? "Concept Brief" : "Hook Script";
  const visualContent = idea.Visual_Concept || idea.Thumbnail_Concept || "";
  const briefContent = idea.Concept_Brief || idea.Hook_Script || "";
  const copyToClipboard = async (text, field) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2e3);
  };
  const copyAll = async () => {
    const fullText = `Title: ${idea.Title}

${visualLabel}: ${visualContent}

${briefLabel}: ${briefContent}

Difficulty: ${idea.Difficulty}`;
    await navigator.clipboard.writeText(fullText);
    setCopiedField("all");
    setTimeout(() => setCopiedField(null), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { animationDelay: `${index * 100}ms` },
      onClick: onSelect,
      className: "hover:shadow-card-hover cursor-pointer rounded-xl border border-border/50 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold", children: index + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `rounded-full px-3 py-1 text-xs font-medium ${difficultyColors[idea.Difficulty] || difficultyColors.Medium}`,
                children: idea.Difficulty
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: (e) => {
                e.stopPropagation();
                copyAll();
              },
              className: "text-muted-foreground hover:text-foreground",
              children: [
                copiedField === "all" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "Copy All" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "text-primary h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium tracking-wide text-muted-foreground uppercase", children: "Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    copyToClipboard(idea.Title, "Title");
                  },
                  className: "ml-auto opacity-0 transition-opacity group-hover:opacity-100",
                  children: copiedField === "Title" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5 text-muted-foreground hover:text-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg leading-snug font-semibold", children: idea.Title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium tracking-wide text-muted-foreground uppercase", children: visualLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    copyToClipboard(visualContent, "Visual");
                  },
                  className: "ml-auto opacity-0 transition-opacity group-hover:opacity-100",
                  children: copiedField === "Visual" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5 text-muted-foreground hover:text-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed text-muted-foreground", children: visualContent })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "text-primary h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium tracking-wide text-muted-foreground uppercase", children: briefLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    copyToClipboard(briefContent, "Brief");
                  },
                  className: "ml-auto opacity-0 transition-opacity group-hover:opacity-100",
                  children: copiedField === "Brief" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5 text-muted-foreground hover:text-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "rounded-lg bg-secondary/50 p-3 leading-relaxed text-foreground italic", children: [
              '"',
              briefContent,
              '"'
            ] })
          ] })
        ] })
      ]
    }
  );
};
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
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      zt.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2e3);
    } catch {
      zt.error("Couldn't copy");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      !showExisting && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onBack,
          className: "inline-flex items-center gap-2 font-medium text-muted-foreground hover:text-foreground text-sm transition-colors duration-250",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to story"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-between items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          !showExisting && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center bg-success/10 rounded-xl w-10 h-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-success" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-2xl", children: "Your script is ready" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: selectedIdea })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full text-secondary-foreground text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          tone
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "bg-muted/30 border-border border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Full Script" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Ready to record or refine" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "secondary",
            size: "sm",
            onClick: handleCopy,
            className: "gap-2",
            children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
              "Copied"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
              "Copy script"
            ] })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-none prose prose-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "bg-transparent m-0 p-0 overflow-visible font-sans text-foreground leading-relaxed whitespace-pre-wrap", children: script }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex sm:flex-row flex-col gap-3 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "secondary",
          onClick: onRegenerate,
          disabled: isLoading,
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                className: `h-4 w-4 ${isLoading ? "animate-spin" : ""}`
              }
            ),
            "Regenerate script"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: onStartOver,
          className: "gap-2",
          children: "Start with a new idea"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-muted-foreground text-sm text-center", children: "Every great video starts with a single spark ✨" })
  ] });
};
const StoryView = ({
  selectedIdea,
  story,
  onRegenerate,
  onGenerateScript,
  onBack,
  isLoading,
  readOnly = false
}) => {
  const sectionIcons = {
    "🎣": /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🎣" }),
    "📖": /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "📖" }),
    "🎯": /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🎯" })
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onBack,
          className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-250 text-sm font-medium",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to ideas"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: readOnly ? "Outline for:" : "Building story for:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-foreground", children: selectedIdea })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: story.map((section, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "fade-in-delayed overflow-hidden text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        sectionIcons[section.icon] || /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: section.title })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: section.content }) })
    ] }, index)) }),
    !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "secondary",
            onClick: onRegenerate,
            disabled: isLoading,
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${isLoading ? "animate-spin" : ""}` }),
              "Try a different version"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: onGenerateScript,
            disabled: isLoading,
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
              "Generate full script"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center pt-2", children: "No rush — creativity takes shape at its own pace" })
    ] })
  ] });
};
export {
  IdeaCard as I,
  StoryView as S,
  ScriptView as a
};
