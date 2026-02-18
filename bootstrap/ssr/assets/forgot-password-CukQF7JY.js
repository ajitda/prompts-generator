import { j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { l as login } from "./index-Dye-FuDj.js";
import { e as email } from "./index-BxjRhtqJ.js";
import { I as InputError } from "./input-error-DKbyWYwW.js";
import { T as TextLink } from "./text-link-CKSSXPZF.js";
import { B as Button } from "./createLucideIcon-DxBA2hfx.js";
import { I as Input } from "./input-BjSWeg-A.js";
import { L as Label } from "./label-ZPBNkTjD.js";
import { A as AuthLayout } from "./auth-layout-DiMFsbDD.js";
import { L as LoaderCircle } from "./loader-circle-COMdnHZp.js";
import "side-channel";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index--D7ld9AJ.js";
import "./index-DFfij-Hh.js";
import "./index-Do_dwBzt.js";
import "./public-header-DXP46-i_.js";
import "./dropdown-menu-C5jyS0V-.js";
import "@radix-ui/primitive";
import "@floating-ui/react-dom";
import "aria-hidden";
import "react-remove-scroll";
import "./chevron-down-D42UBSfq.js";
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
