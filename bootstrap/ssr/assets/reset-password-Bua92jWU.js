import { j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { u as update } from "./index-Pn4D3hF1.js";
import { I as InputError } from "./input-error-DKSNVi8Y.js";
import { B as Button } from "./createLucideIcon-BMlcDIBX.js";
import { I as Input } from "./input-B7w_vN6s.js";
import { L as Label } from "./label-BcYIePfo.js";
import { S as Spinner } from "./spinner-C8O4hgbI.js";
import { A as AuthLayout } from "./auth-layout-C3DC7uHa.js";
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
import "./loader-circle-DIBqLg7O.js";
import "./public-header-DZ0kH5I-.js";
import "./dropdown-menu-mwAGrZTw.js";
import "./chevron-down-DAe0EYng.js";
import "./index-B9NLp086.js";
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
