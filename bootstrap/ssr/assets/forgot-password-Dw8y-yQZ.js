import { j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { l as login } from "./index-Cm2O5opL.js";
import { e as email } from "./index-BxjRhtqJ.js";
import { LoaderCircle } from "lucide-react";
import { I as InputError } from "./input-error-BxiP7EW1.js";
import { T as TextLink } from "./text-link-CWmgQtHl.js";
import { B as Button } from "./button-TIWYqyVf.js";
import { I as Input } from "./input-BjgwYVx7.js";
import { L as Label } from "./label-BGQd_FCH.js";
import { A as AuthLayout } from "./auth-layout-yP9LyPXA.js";
import "@inertiajs/core";
import "lodash-es";
import "laravel-precognition";
import "@inertiajs/core/server";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index--D7ld9AJ.js";
import "./index-DFfij-Hh.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "./public-header-B7wuJHzd.js";
import "./logo-LJNW8YKn.js";
function ForgotPassword({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AuthLayout,
    {
      title: "Forgot password",
      description: "Enter your email to receive a password reset link",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: "Forgot password" }),
        status && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: status }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form_default, { ...email.form(), children: ({ processing, errors }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  name: "email",
                  autoComplete: "off",
                  autoFocus: true,
                  placeholder: "email@example.com"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-6 flex items-center justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full",
                disabled: processing,
                "data-test": "email-password-reset-link-button",
                children: [
                  processing && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                  "Email password reset link"
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-x-1 text-center text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Or, return to" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextLink, { href: login(), children: "log in" })
          ] })
        ] })
      ]
    }
  );
}
export {
  ForgotPassword as default
};
