import { j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { u as update } from "./index-BxjRhtqJ.js";
import { I as InputError } from "./input-error-BxiP7EW1.js";
import { B as Button } from "./button-TIWYqyVf.js";
import { I as Input } from "./input-BjgwYVx7.js";
import { L as Label } from "./label-BGQd_FCH.js";
import { S as Spinner } from "./spinner-ZfimL0Vg.js";
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
import "lucide-react";
import "./public-header-B7wuJHzd.js";
import "./logo-LJNW8YKn.js";
import "./index-Cm2O5opL.js";
function ResetPassword({ token, email }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AuthLayout,
    {
      title: "Reset password",
      description: "Please enter your new password below",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: "Reset password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Form_default,
          {
            ...update.form(),
            transform: (data) => ({ ...data, token, email }),
            resetOnSuccess: ["password", "password_confirmation"],
            children: ({ processing, errors }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "email",
                    type: "email",
                    name: "email",
                    autoComplete: "email",
                    value: email,
                    className: "mt-1 block w-full",
                    readOnly: true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputError,
                  {
                    message: errors.email,
                    className: "mt-2"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "password",
                    type: "password",
                    name: "password",
                    autoComplete: "new-password",
                    className: "mt-1 block w-full",
                    autoFocus: true,
                    placeholder: "Password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.password })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password_confirmation", children: "Confirm password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "password_confirmation",
                    type: "password",
                    name: "password_confirmation",
                    autoComplete: "new-password",
                    className: "mt-1 block w-full",
                    placeholder: "Confirm password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputError,
                  {
                    message: errors.password_confirmation,
                    className: "mt-2"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  className: "mt-4 w-full",
                  disabled: processing,
                  "data-test": "reset-password-button",
                  children: [
                    processing && /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
                    "Reset password"
                  ]
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
export {
  ResetPassword as default
};
