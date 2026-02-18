import { j as jsxRuntimeExports, H as Head_default, a as router3 } from "../ssr.js";
import { I as IdeaCard, S as StoryView, a as ScriptView } from "./StoryView-GvGmD4kP.js";
import { S as SceneView } from "./SceneView-cAVGwz5w.js";
import { A as AppLayout } from "./app-layout-BhbfzW2M.js";
import "side-channel";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./createLucideIcon-DxBA2hfx.js";
import "./check-2g5mg3H-.js";
import "./copy-BiOVhSOM.js";
import "./message-square-CyQY6ja3.js";
import "./card-CqYzDAC4.js";
import "./index-CeNWS0RB.js";
import "goober";
import "./arrow-left-DhtKOkIO.js";
import "./sparkles-BFjwokJ6.js";
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
const IdeaCardContainer = ({ script }) => {
  const ideas = script.idea ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: ideas.map((idea, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    IdeaCard,
    {
      index,
      idea,
      onSelect: () => {
      }
    },
    index
  )) });
};
function Show({ script, type }) {
  const isIdeaGenerator = type === "youtube_idea";
  const toolTitle = isIdeaGenerator ? "YouTube Video Idea Generator" : "Video Script Generator";
  const toolHref = isIdeaGenerator ? "/youtube" : "/scripts";
  const breadcrumbs = [
    {
      title: toolTitle,
      href: toolHref
    },
    {
      title: "History",
      href: toolHref
    }
  ];
  const selectedConcept = script.idea?.find((i) => i.Title === script.title);
  const storySections = script.story?.sections || [];
  const scenes = script.script?.scenes || [];
  const plainScript = script.script?.script || "";
  const tone = script.script?.tone || "Professional";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: `History - ${script.keyword}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-black tracking-tight md:text-4xl text-foreground", children: [
          "Script History: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
            '"',
            script.keyword,
            '"'
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Detailed breakdown of your generated content" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-1 bg-primary rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold uppercase tracking-wider text-foreground/80", children: selectedConcept ? "Selected Concept" : "Generated Ideas" })
        ] }),
        selectedConcept ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          IdeaCard,
          {
            index: 0,
            idea: selectedConcept,
            onSelect: () => {
            }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(IdeaCardContainer, { script })
      ] }),
      storySections.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-1 bg-amber-500 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold uppercase tracking-wider text-foreground/80", children: "Visual Outline & Storyboard" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StoryView,
          {
            selectedIdea: script.title,
            story: storySections,
            onRegenerate: () => {
            },
            onGenerateScript: () => {
            },
            onBack: () => {
            },
            isLoading: false,
            readOnly: true
          }
        )
      ] }),
      (scenes.length > 0 || plainScript) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-1 bg-green-500 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold uppercase tracking-wider text-foreground/80", children: "Final Generated Script" })
        ] }),
        scenes.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          SceneView,
          {
            selectedIdea: script.title,
            scenes,
            tone,
            onBack: () => {
            },
            onRegenerate: () => {
            },
            onStartOver: () => router3.get(toolHref),
            isLoading: false,
            readOnly: true
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScriptView,
          {
            selectedIdea: script.title,
            script: plainScript,
            tone,
            onBack: () => {
            },
            onRegenerate: () => {
            },
            onStartOver: () => router3.get(toolHref),
            isLoading: false,
            showExisting: true
          }
        )
      ] })
    ] }) })
  ] }) });
}
export {
  Show as default
};
