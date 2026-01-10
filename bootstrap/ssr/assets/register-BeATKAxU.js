import { j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { l as login } from "./index-Cm2O5opL.js";
import { q as queryParams } from "./index--D7ld9AJ.js";
import { I as InputError } from "./input-error-BAXsLgaJ.js";
import { T as TextLink } from "./text-link-DMS5Hcym.js";
import { B as Button } from "./button-CkHcfFL4.js";
import { I as Input } from "./input-Pi6_Jx3x.js";
import { L as Label } from "./label-Cz6ecBJd.js";
import { S as Spinner } from "./spinner-CWHtRx-6.js";
import { A as AuthLayout } from "./auth-layout-D5Bdgu7_.js";
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
import "./public-header-Pc312wvq.js";
import "./dropdown-menu-DJaFPoPg.js";
import "@radix-ui/react-dropdown-menu";
const store = (options) => ({
  url: store.url(options),
  method: "post"
});
store.definition = {
  methods: ["post"],
  url: "/register"
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
function Register() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AuthLayout,
    {
      title: "Create an account",
      description: "Enter your details below to create your account",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: "Register" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Form_default,
          {
            ...store.form(),
            resetOnSuccess: ["password", "password_confirmation"],
            disableWhileProcessing: true,
            className: "flex flex-col gap-6",
            children: ({ processing, errors }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "name",
                      type: "text",
                      required: true,
                      autoFocus: true,
                      tabIndex: 1,
                      autoComplete: "name",
                      name: "name",
                      placeholder: "Full name"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InputError,
                    {
                      message: errors.name,
                      className: "mt-2"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "email",
                      type: "email",
                      required: true,
                      tabIndex: 2,
                      autoComplete: "email",
                      name: "email",
                      placeholder: "email@example.com"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.email })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "password",
                      type: "password",
                      required: true,
                      tabIndex: 3,
                      autoComplete: "new-password",
                      name: "password",
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
                      required: true,
                      tabIndex: 4,
                      autoComplete: "new-password",
                      name: "password_confirmation",
                      placeholder: "Confirm password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InputError,
                    {
                      message: errors.password_confirmation
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    className: "mt-2 w-full",
                    tabIndex: 5,
                    "data-test": "register-user-button",
                    children: [
                      processing && /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
                      "Create account"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm text-muted-foreground", children: [
                "Already have an account?",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(TextLink, { href: login(), tabIndex: 6, children: "Log in" })
              ] })
            ] })
          }
        )
      ]
    }
  );
}
export {
  Register as default
};
