import { jsxs, jsx } from "react/jsx-runtime";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BKW9IOpa.js";
import { A as AppLayout } from "./app-layout-CGh0R-OD.js";
import { usePage, Head, Link } from "@inertiajs/react";
import { Video } from "lucide-react";
import "./button-CIfObXh5.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "react";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
import "./index-Cm2O5opL.js";
import "./index--D7ld9AJ.js";
import "./index-B6anorhi.js";
import "./logo-LJNW8YKn.js";
import "@radix-ui/react-collapsible";
function Welcome() {
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "AI Content Generator" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Generate optimized AI prompts and professional YouTube video scripts in minutes. Built for working professionals."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Video Idea Generator, AI video script generator, YouTube scripts, AI productivity"
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "/" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br p-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-xl dark:bg-gray-900", children: [
      /* @__PURE__ */ jsxs("header", { className: "mb-12 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold text-gray-900 dark:text-white", children: "AI Content Generator" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300", children: "Turn keywords into optimized AI prompts and professional video scripts using a structured, step-by-step AI workflow." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsxs(Card, { className: "flex flex-col items-center justify-center transition hover:shadow-lg", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Video, {}),
          /* @__PURE__ */ jsx("span", { children: "AI Video Script Generator" })
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col items-center justify-center space-y-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "Generate professional YouTube video scripts from a single keyword using a proven storytelling framework." }),
          /* @__PURE__ */ jsxs("ul", { className: "flex list-inside list-disc items-center justify-center gap-4 space-y-1 text-sm text-gray-500 dark:text-gray-400", children: [
            /* @__PURE__ */ jsx("li", { children: "Ideas → Story → Final Script" }),
            /* @__PURE__ */ jsx("li", { children: "Built for working professionals" }),
            /* @__PURE__ */ jsx("li", { children: "60–90 second optimized scripts" })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "youtube",
              className: "mt-4 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700",
              children: "Create Video Scripts →"
            }
          )
        ] })
      ] }) }),
      !auth?.user && /* @__PURE__ */ jsxs("div", { className: "mt-12 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-gray-600 dark:text-gray-300", children: "Sign in to save your prompts and scripts." }),
        /* @__PURE__ */ jsx(
          Link,
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
