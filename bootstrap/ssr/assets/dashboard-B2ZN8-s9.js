import { r as reactExports, j as jsxRuntimeExports, H as Head_default } from "../ssr.js";
import { A as AppLayout } from "./app-layout-DgUhOw1Y.js";
import { d as dashboard } from "./index-Cm2O5opL.js";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "lucide-react";
import "./button-TIWYqyVf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
import "./index--D7ld9AJ.js";
import "./index-B6anorhi.js";
import "./logo-LJNW8YKn.js";
import "@radix-ui/react-collapsible";
function PlaceholderPattern({ className }) {
  const patternId = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className, fill: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: patternId, x: "0", y: "0", width: "10", height: "10", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M-3 13 15-5M-5 5l18-18M-1 21 17 3" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { stroke: "none", fill: `url(#${patternId})`, width: "100%", height: "100%" })
  ] });
}
const breadcrumbs = [
  {
    title: "Dashboard",
    href: dashboard().url
  }
];
function Dashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: "Dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid auto-rows-min gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderPattern, { className: "absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderPattern, { className: "absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderPattern, { className: "absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderPattern, { className: "absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" }) })
    ] })
  ] });
}
export {
  Dashboard as default
};
