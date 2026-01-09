import { u as useForm, j as jsxRuntimeExports, L as Link_default } from "../ssr.js";
import { B as Button } from "./button-TIWYqyVf.js";
import { A as AppLayout } from "./app-layout-DgUhOw1Y.js";
import { p as posts } from "./index-B6anorhi.js";
import { Plus, Edit2, Trash2 } from "lucide-react";
import "qs";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
import "./index-Cm2O5opL.js";
import "./index--D7ld9AJ.js";
import "./logo-LJNW8YKn.js";
import "@radix-ui/react-collapsible";
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
  const { delete: destroy } = useForm();
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shadow-elegant overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border/40 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-left text-[11px] font-bold tracking-wider text-muted-foreground uppercase", children: "Article Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-40 p-4 text-right text-[11px] font-bold tracking-wider text-muted-foreground uppercase", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/40 font-medium", children: posts$1.length > 0 ? posts$1.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "group transition-colors hover:bg-muted/30",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground transition-colors group-hover:text-primary", children: p.title }) }) }),
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
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Edit2, { className: "h-4 w-4" })
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
          colSpan: 2,
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
