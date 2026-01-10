import { j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { I as InputError } from "./input-error-BAXsLgaJ.js";
import { B as Button } from "./button-CkHcfFL4.js";
import { I as Input } from "./input-Pi6_Jx3x.js";
import { L as Label } from "./label-Cz6ecBJd.js";
import { S as Spinner } from "./spinner-CWHtRx-6.js";
import { A as AuthLayout } from "./auth-layout-Dcx1kGQl.js";
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
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "lucide-react";
import "./public-header-BeG1FJzI.js";
import "./dropdown-menu-DJaFPoPg.js";
import "@radix-ui/react-dropdown-menu";
import "./index-Cm2O5opL.js";
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
