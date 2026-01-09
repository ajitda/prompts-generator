import { jsxs, jsx } from "react/jsx-runtime";
import { P as PublicHeader, a as PublicFooter } from "./public-header-DAxnNsXI.js";
import { h as home } from "./index-Cm2O5opL.js";
import { Link } from "@inertiajs/react";
function AuthSimpleLayout({
  children,
  title,
  description
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-svh flex-col bg-background", children: [
    /* @__PURE__ */ jsx(PublicHeader, {}),
    /* @__PURE__ */ jsx("main", { className: "flex flex-1 flex-col items-center justify-center p-6 md:p-10", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-sm rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: home(),
            className: "flex flex-col items-center gap-2 font-medium",
            children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: title })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-medium", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-muted-foreground", children: description })
        ] })
      ] }),
      children
    ] }) }) }),
    /* @__PURE__ */ jsx(PublicFooter, {})
  ] });
}
function AuthLayout({
  children,
  title,
  description,
  ...props
}) {
  return /* @__PURE__ */ jsx(AuthSimpleLayout, { title, description, ...props, children });
}
export {
  AuthLayout as A
};
