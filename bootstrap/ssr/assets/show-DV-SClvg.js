import { j as jsxRuntimeExports, H as Head_default, b as router3 } from "../ssr.js";
import { i as index } from "./PromptController-BWYLHRJD.js";
import { S as ScriptView } from "./ScriptView-XY6c0IG4.js";
import { A as AppLayout } from "./app-layout-DgUhOw1Y.js";
import "qs";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index--D7ld9AJ.js";
import "./button-TIWYqyVf.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./card-MbFmKuYg.js";
import "lucide-react";
import "react-hot-toast";
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
    title: "AI Prompts",
    href: index().url
  }
];
function Show({ prompt }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { breadcrumbs, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: `Prompt - ${prompt.keyword}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScriptView,
      {
        selectedIdea: prompt.keyword,
        showExisting: true,
        script: prompt.prompt,
        onBack: () => window.history.back(),
        onRegenerate: () => {
          console.log("Regenerate requested");
        },
        onStartOver: () => router3.get(index().url),
        isLoading: false
      }
    )
  ] }) }) });
}
export {
  Show as default
};
