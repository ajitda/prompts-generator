import { jsxs, jsx } from "react/jsx-runtime";
import { Check, Copy, BarChart3, Image, MessageSquare } from "lucide-react";
import { useState } from "react";
import { B as Button } from "./button-CIfObXh5.js";
const difficultyColors = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-700"
};
const IdeaCard = ({ idea, index, onSelect }) => {
  const [copiedField, setCopiedField] = useState(null);
  const copyToClipboard = async (text, field) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2e3);
  };
  const copyAll = async () => {
    const fullText = `Title: ${idea.Title}

Thumbnail Concept: ${idea.Thumbnail_Concept}

Hook Script: ${idea.Hook_Script}

Difficulty: ${idea.Difficulty}`;
    await navigator.clipboard.writeText(fullText);
    setCopiedField("all");
    setTimeout(() => setCopiedField(null), 2e3);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: { animationDelay: `${index * 100}ms` },
      onClick: onSelect,
      className: "hover:shadow-card-hover cursor-pointer rounded-xl border border-border/50 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold", children: index + 1 }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `rounded-full px-3 py-1 text-xs font-medium ${difficultyColors[idea.Difficulty] || difficultyColors.Medium}`,
                children: idea.Difficulty
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: copyAll,
              className: "text-muted-foreground hover:text-foreground",
              children: [
                copiedField === "all" ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-green-600" }) : /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { className: "ml-1 text-xs", children: "Copy All" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "group", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(BarChart3, { className: "text-primary h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium tracking-wide text-muted-foreground uppercase", children: "Title" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => copyToClipboard(idea.Title, "Title"),
                  className: "ml-auto opacity-0 transition-opacity group-hover:opacity-100",
                  children: copiedField === "Title" ? /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 text-green-600" }) : /* @__PURE__ */ jsx(Copy, { className: "h-3.5 w-3.5 text-muted-foreground hover:text-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg leading-snug font-semibold", children: idea.Title })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "group", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Image, { className: "h-4 w-4 text-accent" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium tracking-wide text-muted-foreground uppercase", children: "Thumbnail Concept" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => copyToClipboard(
                    idea.Thumbnail_Concept,
                    "Thumbnail"
                  ),
                  className: "ml-auto opacity-0 transition-opacity group-hover:opacity-100",
                  children: copiedField === "Thumbnail" ? /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 text-green-600" }) : /* @__PURE__ */ jsx(Copy, { className: "h-3.5 w-3.5 text-muted-foreground hover:text-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-muted-foreground", children: idea.Thumbnail_Concept })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "group", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(MessageSquare, { className: "text-primary h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium tracking-wide text-muted-foreground uppercase", children: "Hook Script" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => copyToClipboard(idea.Hook_Script, "Hook"),
                  className: "ml-auto opacity-0 transition-opacity group-hover:opacity-100",
                  children: copiedField === "Hook" ? /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 text-green-600" }) : /* @__PURE__ */ jsx(Copy, { className: "h-3.5 w-3.5 text-muted-foreground hover:text-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "rounded-lg bg-secondary/50 p-3 leading-relaxed text-foreground italic", children: [
              '"',
              idea.Hook_Script,
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
