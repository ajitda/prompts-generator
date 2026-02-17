import { r as reactExports, j as jsxRuntimeExports } from "../ssr.js";
import { a as createLucideIcon, B as Button } from "./createLucideIcon-BMlcDIBX.js";
import { C as Check } from "./check-dH_DnImb.js";
import { C as Copy } from "./copy-B5Hu-Xl0.js";
import { M as MessageSquare } from "./message-square-862q_v-w.js";
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
export {
  IdeaCard as I
};
