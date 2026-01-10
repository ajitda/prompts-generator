import { u as usePage, j as jsxRuntimeExports, H as Head_default, L as Link_default } from "../ssr.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BqcUKBWb.js";
import { A as AppLayout } from "./app-layout-CxZ_9sDH.js";
import { Video } from "lucide-react";
import "side-channel";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./button-CkHcfFL4.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "./dropdown-menu-DJaFPoPg.js";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
import "./index-Cm2O5opL.js";
import "./index--D7ld9AJ.js";
import "./index-B6anorhi.js";
import "@radix-ui/react-collapsible";
function Welcome() {
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Head_default, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "AI Content Generator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meta",
        {
          name: "description",
          content: "Generate optimized AI prompts and professional YouTube video scripts in minutes. Built for working professionals."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meta",
        {
          name: "keywords",
          content: "Video Idea Generator, AI video script generator, YouTube scripts, AI productivity"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: "/" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-xl dark:bg-gray-900", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-4 text-4xl font-bold text-gray-900 dark:text-white", children: "AI Content Generator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300", children: "Turn keywords into optimized AI prompts and professional video scripts using a structured, step-by-step AI workflow." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex flex-col items-center justify-center transition hover:shadow-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Video, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI Video Script Generator" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "Generate professional YouTube video scripts from a single keyword using a proven storytelling framework." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "flex list-inside list-disc items-center justify-center gap-4 space-y-1 text-sm text-gray-500 dark:text-gray-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Ideas → Story → Final Script" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Built for working professionals" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "60–90 second optimized scripts" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link_default,
            {
              href: "youtube",
              className: "mt-4 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700",
              children: "Create Video Scripts →"
            }
          )
        ] })
      ] }) }),
      !auth?.user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-gray-600 dark:text-gray-300", children: "Sign in to save your prompts and scripts." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link_default,
          {
            href: "/login",
            className: "rounded-lg bg-gray-900 px-8 py-3 font-semibold text-white transition hover:bg-gray-800",
            children: "Login / Register"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Welcome as default
};
