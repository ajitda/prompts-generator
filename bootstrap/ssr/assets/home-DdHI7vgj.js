import { jsxs, jsx } from "react/jsx-runtime";
import { Sparkles, Target, Lightbulb, TrendingUp, Zap } from "lucide-react";
import { H as Hero } from "./Hero-DvcbgsAL.js";
import { P as PublicLayout, M as Meta } from "./public-layout-Dv5XCN_t.js";
import { B as Button } from "./button-CIfObXh5.js";
import { Link } from "@inertiajs/react";
import "./public-header-DAxnNsXI.js";
import "./logo-LJNW8YKn.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function home() {
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(
      Meta,
      {
        title: "Free Idea Generator Hub: YouTube, Business & Social",
        description: "Beat creator's block with our AI YouTube strategist. Generate viral-worthy video ideas, high-CTR titles, and engaging scripts in seconds."
      }
    ),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 py-16 md:py-24", children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row", children: [
        /* @__PURE__ */ jsx(Link, { href: "youtube", children: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "default",
            size: "lg",
            className: "px-8 text-base",
            children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "mr-2 h-5 w-5" }),
              "Generate Ideas Now"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("a", { href: "#how-it-works", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "lg",
            className: "px-8 text-base",
            children: "See How It Works"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "features", className: "mt-24 md:mt-32", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: [
            "Everything You Need to",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "Beat Creator's Block" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-muted-foreground", children: "Get strategic, data-driven video ideas that are built to perform—not random suggestions." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-5xl gap-6 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "hover:shadow-elegant rounded-xl border border-border/50 bg-card p-6 transition-shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(Target, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold", children: "High-CTR Titles" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Every title is crafted under 60 characters with curiosity-driven hooks that demand clicks." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hover:shadow-elegant rounded-xl border border-border/50 bg-card p-6 transition-shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10", children: /* @__PURE__ */ jsx(Lightbulb, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold", children: "Thumbnail Concepts" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Get vivid, visual thumbnail ideas that pair perfectly with your titles for maximum impact." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hover:shadow-elegant rounded-xl border border-border/50 bg-card p-6 transition-shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(TrendingUp, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold", children: "Hook Scripts" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Copy-ready opening lines that grab attention in the first 5 seconds and boost retention." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "how-it-works", className: "mt-24 md:mt-32", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: [
            "How It ",
            /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "Works" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-muted-foreground", children: "Go from stuck to publishing in under 60 seconds." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 md:flex-row", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold", children: "Enter Your Niche" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Type in your topic, niche, or content area." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden h-0.5 w-12 bg-primary/80 md:block" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold", children: "AI Generates Ideas" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Our YouTube strategist AI creates 5 viral-worthy ideas." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden h-0.5 w-12 bg-primary/80 md:block" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold", children: "Copy & Create" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Pick your favorite, copy it, and start creating." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsx(Link, { href: "/youtube", children: /* @__PURE__ */ jsxs(Button, { variant: "default", size: "lg", children: [
          /* @__PURE__ */ jsx(Zap, { className: "mr-2 h-5 w-5" }),
          "Try It Free"
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  home as default
};
