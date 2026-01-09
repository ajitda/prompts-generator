import { j as jsxRuntimeExports, L as Link_default } from "../ssr.js";
import { P as PublicLayout, M as Meta } from "./public-layout-CVdJgUC6.js";
import { p as posts } from "./index-B6anorhi.js";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./public-header-B7wuJHzd.js";
import "./logo-LJNW8YKn.js";
import "./button-TIWYqyVf.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./index--D7ld9AJ.js";
function IndexPublic({ posts: posts$1 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Meta,
      {
        title: "Blog",
        description: "Insights, tips, and strategies for YouTube growth and AI-powered content creation."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-20 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mb-4 text-2xl font-extrabold tracking-tight md:text-4xl", children: [
          "Our ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Blog" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-2xl text-sm text-muted-foreground md:text-xl", children: "Stay ahead of the competition with the latest tips, tricks, and insights on AI-driven content creation and YouTube growth." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3", children: posts$1.data.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link_default,
        {
          href: posts.showPublic(post.slug).url,
          className: "group hover:shadow-elegant flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:-translate-y-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] w-full overflow-hidden bg-muted", children: [
              post?.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: `/storage/${post.image}`,
                  alt: post.title,
                  className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 opacity-20" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                new Date(
                  post.created_at
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "group-hover:text-primary mb-3 line-clamp-2 text-xl font-bold transition-colors", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-primary mt-auto flex items-center text-sm font-semibold group-hover:underline", children: [
                "Read Article",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" })
              ] })
            ] })
          ]
        },
        post.id
      )) }),
      posts$1.links.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 flex justify-center gap-2", children: posts$1.links.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link_default,
        {
          href: link.url,
          dangerouslySetInnerHTML: { __html: link.label },
          className: `flex h-10 min-w-[40px] items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors ${link.active ? "bg-primary text-primary-foreground border-primary shadow-sm" : "border-border/50 bg-card text-muted-foreground hover:bg-muted"} ${!link.url ? "pointer-events-none opacity-40" : ""}`
        },
        i
      )) })
    ] })
  ] });
}
export {
  IndexPublic as default
};
