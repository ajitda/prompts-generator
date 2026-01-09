import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { i as index } from "./PromptController-BWYLHRJD.js";
import { S as ScriptView } from "./ScriptView-DaUoxdHU.js";
import { A as AppLayout } from "./app-layout-CGh0R-OD.js";
import { Head, router } from "@inertiajs/react";
import "./index--D7ld9AJ.js";
import "./button-CIfObXh5.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./card-BKW9IOpa.js";
import "lucide-react";
import "react";
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
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(AppLayout, { breadcrumbs, children: /* @__PURE__ */ jsxs("div", { className: "px-8 py-8", children: [
    /* @__PURE__ */ jsx(Head, { title: `Prompt - ${prompt.keyword}` }),
    /* @__PURE__ */ jsx(
      ScriptView,
      {
        selectedIdea: prompt.keyword,
        showExisting: true,
        script: prompt.prompt,
        onBack: () => window.history.back(),
        onRegenerate: () => {
          console.log("Regenerate requested");
        },
        onStartOver: () => router.get(index().url),
        isLoading: false
      }
    )
  ] }) }) });
}
export {
  Show as default
};
