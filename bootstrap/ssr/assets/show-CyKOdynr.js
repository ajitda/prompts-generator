import { j as jsxRuntimeExports, H as Head_default } from "../ssr.js";
import { i as index } from "./ScriptController-DN8f1sXF.js";
import { I as IdeaCard } from "./IdeaCard-D7JaeDyx.js";
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
import "lucide-react";
import "./button-TIWYqyVf.js";
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
const breadcrumbs = [
  {
    title: "Youtube Video Idea Generator",
    href: index().url
  }
];
const IdeaCardContainer = ({ script }) => {
  const ideas = script.idea ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: ideas.map((idea, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    IdeaCard,
    {
      index: index2,
      idea
    },
    index2
  )) });
};
function Show({ script }) {
  script.script?.script || "No script content found.";
  script.script?.tone || "Professional";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: `Script - ${script.keyword}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-5xl py-12 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold", children: [
        "Your Video Ideas for",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
          '"',
          script.keyword,
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IdeaCardContainer, { script })
    ] }) })
  ] }) });
}
export {
  Show as default
};
