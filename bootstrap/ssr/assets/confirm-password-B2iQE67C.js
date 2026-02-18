import { j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { I as InputError } from "./input-error-DKbyWYwW.js";
import { B as Button } from "./createLucideIcon-DxBA2hfx.js";
import { I as Input } from "./input-BjSWeg-A.js";
import { L as Label } from "./label-ZPBNkTjD.js";
import { S as Spinner } from "./spinner-DCw4ktgA.js";
import { A as AuthLayout } from "./auth-layout-DiMFsbDD.js";
import { s as store } from "./index-DFfij-Hh.js";
import "side-channel";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Do_dwBzt.js";
import "./loader-circle-COMdnHZp.js";
import "./public-header-DXP46-i_.js";
import "./dropdown-menu-C5jyS0V-.js";
import "@radix-ui/primitive";
import "@floating-ui/react-dom";
import "aria-hidden";
import "react-remove-scroll";
import "./chevron-down-D42UBSfq.js";
import "./index-Dye-FuDj.js";
import "./index--D7ld9AJ.js";
function ConfirmPassword() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AuthLayout,
    {
      title: "Confirm your password",
      description: "This is a secure area of the application. Please confirm your password before continuing.",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: "Confirm password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form_default, { ...store.form(), resetOnSuccess: ["password"], children: ({ processing, errors }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "password",
                type: "password",
                name: "password",
                placeholder: "Password",
                autoComplete: "current-password",
                autoFocus: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.password })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full",
              disabled: processing,
              "data-test": "confirm-password-button",
              children: [
                processing && /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
                "Confirm password"
              ]
            }
          ) })
        ] }) })
      ]
    }
  );
}
export {
  ConfirmPassword as default
};
