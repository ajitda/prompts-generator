import { jsx, jsxs } from "react/jsx-runtime";
import { Link, usePage } from "@inertiajs/react";
import { L as Logo } from "./logo-LJNW8YKn.js";
import { B as Button } from "./button-CIfObXh5.js";
function PublicFooter() {
  return /* @__PURE__ */ jsx("footer", { className: "mt-20 border-t border-border/50", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-between gap-4 md:flex-row", children: [
    /* @__PURE__ */ jsx(Link, { href: "/", className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("img", { src: Logo, alt: "", width: "150" }) }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Helping creators publish with clarity since 2025" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/privacy",
          className: "transition-colors hover:text-foreground",
          children: "Privacy"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
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
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 border-b border-border/50 bg-card/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex h-16 items-center justify-between px-4", children: [
    /* @__PURE__ */ jsx(Link, { href: "/", className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("img", { src: Logo, alt: "", width: "150" }) }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden items-center gap-6 text-sm md:flex", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/",
          className: `transition-colors hover:text-foreground ${isHome ? "font-medium text-foreground" : "text-muted-foreground"}`,
          children: "Home"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/#features",
          className: "text-muted-foreground transition-colors hover:text-foreground",
          children: "Features"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/#how-it-works",
          className: "text-muted-foreground transition-colors hover:text-foreground",
          children: "How it works"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/blog",
          className: `transition-colors hover:text-foreground ${isBlogs ? "font-medium text-foreground" : "text-muted-foreground"}`,
          children: "Blogs"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Link, { href: "/youtube", children: /* @__PURE__ */ jsx(Button, { variant: "default", size: "sm", children: "Get Started" }) })
  ] }) });
}
export {
  PublicHeader as P,
  PublicFooter as a
};
