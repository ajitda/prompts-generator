import { j as jsxRuntimeExports, L as Link_default } from "../ssr.js";
import { P as PublicHeader, a as PublicFooter } from "./public-header-B7wuJHzd.js";
import { h as home } from "./index-Cm2O5opL.js";
function AuthSimpleLayout({
  children,
  title,
  description
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-svh flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex flex-1 flex-col items-center justify-center p-6 md:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link_default,
          {
            href: home(),
            className: "flex flex-col items-center gap-2 font-medium",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: title })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-medium", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground", children: description })
        ] })
      ] }),
      children
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicFooter, {})
  ] });
}
function AuthLayout({
  children,
  title,
  description,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthSimpleLayout, { title, description, ...props, children });
}
export {
  AuthLayout as A
};
