import { j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { l as login } from "./index-B9NLp086.js";
import { q as queryParams } from "./index-3UqiGNe9.js";
import { I as InputError } from "./input-error-DKSNVi8Y.js";
import { T as TextLink } from "./text-link-CVWx7PYR.js";
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
import "./index-BAof5wf_.js";
import "./loader-circle-DIBqLg7O.js";
import "./public-header-DZ0kH5I-.js";
import "./dropdown-menu-mwAGrZTw.js";
import "./chevron-down-DAe0EYng.js";
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
