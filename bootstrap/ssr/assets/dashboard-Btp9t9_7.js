import { r as reactExports, j as jsxRuntimeExports, H as Head_default } from "../ssr.js";
import { A as AppLayout } from "./app-layout-CBdqLOnj.js";
import { d as dashboard } from "./index-B9NLp086.js";
import "util";
import "stream";
import "path";
import "http";
import "https";
import "url";
import "fs";
import "crypto";
import "http2";
import "assert";
import "tty";
import "os";
import "zlib";
import "events";
import "node:cluster";
import "process";
import "async_hooks";
import "./createLucideIcon-BMlcDIBX.js";
import "./dropdown-menu-mwAGrZTw.js";
import "./index-BAof5wf_.js";
import "./index-3UqiGNe9.js";
import "./index-BHtmZ5pP.js";
import "./video-D2v1Njvn.js";
import "./message-square-862q_v-w.js";
import "./sparkles-BQca7fAS.js";
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
