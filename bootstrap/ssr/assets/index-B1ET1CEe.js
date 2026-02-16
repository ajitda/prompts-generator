import { b as useForm, j as jsxRuntimeExports, L as Link_default } from "../ssr.js";
import { A as AppLayout, P as Plus, B as Badge } from "./app-layout-CBdqLOnj.js";
import { a as createLucideIcon, B as Button } from "./createLucideIcon-BMlcDIBX.js";
import { p as posts } from "./index-BHtmZ5pP.js";
import { C as Clock } from "./clock-H6lxfV2h.js";
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
import "./dropdown-menu-mwAGrZTw.js";
import "./index-BAof5wf_.js";
import "./index-B9NLp086.js";
import "./index-3UqiGNe9.js";
import "./video-D2v1Njvn.js";
import "./message-square-862q_v-w.js";
import "./sparkles-BQca7fAS.js";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("Pen", __iconNode$1);
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("Trash2", __iconNode);
const breadcrumbs = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Blog Management",
    href: posts.index().url
  }
];
function Index({ posts: posts$1 }) {
  const { delete: destroy } = useForm({});
  const handleDelete = (id) => {
    if (confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    )) {
      destroy(posts.destroy(id).url);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { breadcrumbs, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-reveal space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between gap-4 md:flex-row md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black tracking-tight text-foreground", children: "Blog Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-medium text-muted-foreground", children: "Create and manage your articles for the community." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link_default, { href: posts.create().url, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "group h-11 rounded-xl px-6 shadow-lg transition-all hover:opacity-90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4 transition-transform group-hover:rotate-90" }),
        "Create New Article"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border/40 bg-card/50 shadow-elegant backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border/40 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-left text-[11px] font-bold tracking-wider text-muted-foreground uppercase", children: "Article Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-left text-[11px] font-bold tracking-wider text-muted-foreground uppercase", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-left text-[11px] font-bold tracking-wider text-muted-foreground uppercase", children: "Scheduled At" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-40 p-4 text-right text-[11px] font-bold tracking-wider text-muted-foreground uppercase", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/40 font-medium", children: posts$1.length > 0 ? posts$1.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "group transition-colors hover:bg-muted/30",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground transition-colors group-hover:text-primary", children: p.title }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: p.status === "published" ? "default" : p.status === "scheduled" ? "outline" : "secondary",
                className: "rounded-lg px-2.5 py-0.5 text-[10px] font-black tracking-widest uppercase",
                children: p.status
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: p.scheduled_at ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              p.scheduled_at
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground/40", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link_default,
                {
                  href: posts.edit(p.id).url,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-8 w-8 rounded-lg text-muted-foreground transition-colors hover:text-primary",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-4 w-4" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 rounded-lg text-destructive/60 transition-colors hover:bg-destructive/10 hover:text-destructive",
                  onClick: () => handleDelete(p.id),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] }) })
          ]
        },
        p.id
      )) : /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 4,
          className: "p-12 text-center text-muted-foreground italic",
          children: "No articles found. Start by creating your first post!"
        }
      ) }) })
    ] }) })
  ] }) });
}
export {
  Index as default
};
