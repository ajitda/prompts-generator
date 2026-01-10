import { j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { I as InputError } from "./input-error-BxiP7EW1.js";
import { T as TextLink } from "./text-link-CWmgQtHl.js";
import { c as cn, B as Button } from "./button-TIWYqyVf.js";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { I as Input } from "./input-BjgwYVx7.js";
import { L as Label } from "./label-BGQd_FCH.js";
import { S as Spinner } from "./spinner-ZfimL0Vg.js";
import { A as AuthLayout } from "./auth-layout-Cl3VdDJQ.js";
import { r as register } from "./index-Cm2O5opL.js";
import { q as queryParams } from "./index--D7ld9AJ.js";
import { r as request } from "./index-BxjRhtqJ.js";
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
import "./public-header-B85cygj2.js";
import "./dropdown-menu-UN199YB4.js";
import "@radix-ui/react-dropdown-menu";
import "./index-DFfij-Hh.js";
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}
const store = (options) => ({
  url: store.url(options),
  method: "post"
});
store.definition = {
  methods: ["post"],
  url: "/login"
};
store.url = (options) => {
  return store.definition.url + queryParams(options);
};
store.post = (options) => ({
  url: store.url(options),
  method: "post"
});
const storeForm = (options) => ({
  action: store.url(options),
  method: "post"
});
storeForm.post = (options) => ({
  action: store.url(options),
  method: "post"
});
store.form = storeForm;
({
  store: Object.assign(store, store)
});
function Login({
  status,
  canResetPassword,
  canRegister
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AuthLayout,
    {
      title: "Log in to your account",
      description: "Enter your email and password below to log in",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: "Log in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Form_default,
          {
            ...store.form(),
            resetOnSuccess: ["password"],
            className: "flex flex-col gap-6",
            children: ({ processing, errors }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "email",
                      type: "email",
                      name: "email",
                      required: true,
                      autoFocus: true,
                      tabIndex: 1,
                      autoComplete: "email",
                      placeholder: "email@example.com"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.email })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
                    canResetPassword && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TextLink,
                      {
                        href: request(),
                        className: "ml-auto text-sm",
                        tabIndex: 5,
                        children: "Forgot password?"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "password",
                      type: "password",
                      name: "password",
                      required: true,
                      tabIndex: 2,
                      autoComplete: "current-password",
                      placeholder: "Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.password })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      id: "remember",
                      name: "remember",
                      tabIndex: 3
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "remember", children: "Remember me" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    className: "mt-4 w-full",
                    tabIndex: 4,
                    disabled: processing,
                    "data-test": "login-button",
                    children: [
                      processing && /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
                      "Log in"
                    ]
                  }
                )
              ] }),
              canRegister && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm text-muted-foreground", children: [
                "Don't have an account?",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(TextLink, { href: register(), tabIndex: 5, children: "Sign up" })
              ] })
            ] })
          }
        ),
        status && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: status })
      ]
    }
  );
}
export {
  Login as default
};
