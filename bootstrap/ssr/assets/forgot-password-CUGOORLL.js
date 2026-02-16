import { j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { l as login } from "./index-B9NLp086.js";
import { e as email } from "./index-Pn4D3hF1.js";
import { I as InputError } from "./input-error-DKSNVi8Y.js";
import { T as TextLink } from "./text-link-CVWx7PYR.js";
import { B as Button } from "./createLucideIcon-BMlcDIBX.js";
import { I as Input } from "./input-B7w_vN6s.js";
import { L as Label } from "./label-BcYIePfo.js";
import { A as AuthLayout } from "./auth-layout-C3DC7uHa.js";
import { L as LoaderCircle } from "./loader-circle-DIBqLg7O.js";
import "util";
import "stream";
import "path";
import "http";
import "https";
import "url";
import "fs";
import "crypto";
import "http2";
import "assert";
import "tty";
import "os";
import "zlib";
import "events";
import "node:cluster";
import "process";
import "async_hooks";
import "./index-3UqiGNe9.js";
import "./index-CfRrNjAS.js";
import "./index-BAof5wf_.js";
import "./public-header-DZ0kH5I-.js";
import "./dropdown-menu-mwAGrZTw.js";
import "./chevron-down-DAe0EYng.js";
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
