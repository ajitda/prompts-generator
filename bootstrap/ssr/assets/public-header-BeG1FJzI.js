import { j as jsxRuntimeExports, L as Link_default, u as usePage } from "../ssr.js";
import { L as Logo, D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem } from "./dropdown-menu-DJaFPoPg.js";
import { B as Button } from "./button-CkHcfFL4.js";
import { ChevronDown } from "lucide-react";
function PublicFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-20 border-t border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-between gap-4 md:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link_default, { href: "/", className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: Logo, alt: "", width: "150" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Helping creators publish with clarity since 2025" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link_default,
        {
          href: "/privacy",
          className: "transition-colors hover:text-foreground",
          children: "Privacy"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link_default,
        {
          href: "/terms",
          className: "transition-colors hover:text-foreground",
          children: "Terms"
        }
      )
    ] })
  ] }) }) });
}
function PublicHeader() {
  const { url } = usePage();
  const isHome = url === "/";
  const isBlogs = url.startsWith("/blog");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 border-b border-border/50 bg-card/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex h-16 items-center justify-between px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link_default, { href: "/", className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: Logo, alt: "", width: "150" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-6 text-sm md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link_default,
        {
          href: "/",
          className: `transition-colors hover:text-foreground ${isHome ? "font-medium text-foreground" : "text-muted-foreground"}`,
          children: "Home"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link_default,
        {
          href: "/#features",
          className: "text-muted-foreground transition-colors hover:text-foreground",
          children: "Features"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link_default,
        {
          href: "/#how-it-works",
          className: "text-muted-foreground transition-colors hover:text-foreground",
          children: "How it works"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link_default,
        {
          href: "/blog",
          className: `transition-colors hover:text-foreground ${isBlogs ? "font-medium text-foreground" : "text-muted-foreground"}`,
          children: "Blogs"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuTrigger, { className: "flex cursor-pointer items-center gap-1 text-muted-foreground outline-hidden transition-colors hover:text-foreground", children: [
          "More Tools ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DropdownMenuContent,
          {
            align: "end",
            className: "w-56 border-border/50 bg-card backdrop-blur-xl",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link_default,
                {
                  href: "/youtube",
                  className: "w-full cursor-pointer",
                  children: "YouTube Video Idea Generator"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link_default,
                {
                  href: "/captions",
                  className: "w-full cursor-pointer",
                  children: "TikTok/Instagram Captions"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link_default,
                {
                  href: "/prompts",
                  className: "w-full cursor-pointer",
                  children: "Prompt Generator"
                }
              ) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link_default, { href: "/youtube", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", size: "sm", children: "Get Started" }) })
  ] }) });
}
export {
  PublicHeader as P,
  PublicFooter as a
};
