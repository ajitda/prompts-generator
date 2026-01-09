import { jsxs, jsx } from "react/jsx-runtime";
import { P as PublicLayout, M as Meta } from "./public-layout-Dv5XCN_t.js";
import { B as Button } from "./button-CIfObXh5.js";
import { Head, Link } from "@inertiajs/react";
import { Calendar, Sparkles } from "lucide-react";
import "./public-header-DAxnNsXI.js";
import "./logo-LJNW8YKn.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function ShowPublic({ post }) {
  const description = post.content.replace(/<[^>]*>?/gm, "").substring(0, 160).trim();
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: post.meta_title || post.title }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: post.meta_description || description
        }
      ),
      post.image_url && /* @__PURE__ */ jsx("meta", { name: "image", content: post.image_url }),
      /* @__PURE__ */ jsx("meta", { name: "type", content: "article" })
    ] }),
    /* @__PURE__ */ jsx(
      Meta,
      {
        title: post.meta_title || post.title,
        description: post.meta_description || description.slice(0, 160),
        image: post.image_url || ""
      }
    ),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto max-w-4xl px-4 py-16", children: [
      /* @__PURE__ */ jsxs("article", { children: [
        /* @__PURE__ */ jsxs("header", { className: "mb-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
            post.created_at
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "mb-8 text-2xl leading-relaxed font-extrabold tracking-wide md:text-3xl lg:text-4xl", children: post.title }),
          post.image_url && /* @__PURE__ */ jsxs("div", { className: "shadow-elegant relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: post.image_url,
                alt: post.title,
                className: "h-full w-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "blog-content prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl max-w-none leading-loose",
            dangerouslySetInnerHTML: { __html: post.content }
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 border-t border-border/50 pt-10", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-muted/50 p-8 text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-2xl font-bold", children: "Ready to boost your YouTube growth?" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mb-6 max-w-xl text-muted-foreground", children: "Join thousands of creators using our AI to generate high-performing video ideas and scripts." }),
        /* @__PURE__ */ jsx(Link, { href: "/youtube", children: /* @__PURE__ */ jsxs(
          Button,
          {
            size: "lg",
            className: "bg-primary text-primary-foreground",
            children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "mr-2 h-4 w-4" }),
              "Start Generating Now"
            ]
          }
        ) })
      ] }) })
    ] })
  ] });
}
export {
  ShowPublic as default
};
