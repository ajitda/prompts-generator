import { r as reactExports, j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { q as queryParams } from "./index--D7ld9AJ.js";
import { I as InputError } from "./input-error-DKbyWYwW.js";
import { A as AppLayout } from "./app-layout-BhbfzW2M.js";
import { a as edit$1, S as SettingsLayout, H as HeadingSmall } from "./layout-CMNDxzOY.js";
import { B as Button } from "./createLucideIcon-DxBA2hfx.js";
import { I as Input } from "./input-BjSWeg-A.js";
import { L as Label } from "./label-ZPBNkTjD.js";
import { K as Ke } from "./transition-BHuzg_0Z.js";
import "side-channel";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "@radix-ui/primitive";
import "./dropdown-menu-C5jyS0V-.js";
import "@floating-ui/react-dom";
import "aria-hidden";
import "react-remove-scroll";
import "./index-Do_dwBzt.js";
import "use-sync-external-store/shim";
import "./index-Dye-FuDj.js";
import "./index-8HAZ9HbM.js";
import "./video-stECLQZx.js";
import "./message-square-CyQY6ja3.js";
import "./sparkles-BFjwokJ6.js";
import "./index-BKq0lOP8.js";
const edit = (options) => ({
  url: edit.url(options),
  method: "get"
});
edit.definition = {
  methods: ["get", "head"],
  url: "/settings/password"
};
edit.url = (options) => {
  return edit.definition.url + queryParams(options);
};
edit.get = (options) => ({
  url: edit.url(options),
  method: "get"
});
edit.head = (options) => ({
  url: edit.url(options),
  method: "head"
});
const editForm = (options) => ({
  action: edit.url(options),
  method: "get"
});
editForm.get = (options) => ({
  action: edit.url(options),
  method: "get"
});
editForm.head = (options) => ({
  action: edit.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit.form = editForm;
const update = (options) => ({
  url: update.url(options),
  method: "put"
});
update.definition = {
  methods: ["put"],
  url: "/settings/password"
};
update.url = (options) => {
  return update.definition.url + queryParams(options);
};
update.put = (options) => ({
  url: update.url(options),
  method: "put"
});
const updateForm = (options) => ({
  action: update.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm.put = (options) => ({
  action: update.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update.form = updateForm;
const PasswordController = { update };
const breadcrumbs = [
  {
    title: "Password settings",
    href: edit$1().url
  }
];
function Password() {
  const passwordInput = reactExports.useRef(null);
  const currentPasswordInput = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: "Password settings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HeadingSmall,
        {
          title: "Update password",
          description: "Ensure your account is using a long, random password to stay secure"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Form_default,
        {
          ...PasswordController.update.form(),
          options: {
            preserveScroll: true
          },
          resetOnError: [
            "password",
            "password_confirmation",
            "current_password"
          ],
          resetOnSuccess: true,
          onError: (errors) => {
            if (errors.password) {
              passwordInput.current?.focus();
            }
            if (errors.current_password) {
              currentPasswordInput.current?.focus();
            }
          },
          className: "space-y-6",
          children: ({ errors, processing, recentlySuccessful }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "current_password", children: "Current password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "current_password",
                  ref: currentPasswordInput,
                  name: "current_password",
                  type: "password",
                  className: "mt-1 block w-full",
                  autoComplete: "current-password",
                  placeholder: "Current password"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputError,
                {
                  message: errors.current_password
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "New password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "password",
                  ref: passwordInput,
                  name: "password",
                  type: "password",
                  className: "mt-1 block w-full",
                  autoComplete: "new-password",
                  placeholder: "New password"
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
                  name: "password_confirmation",
                  type: "password",
                  className: "mt-1 block w-full",
                  autoComplete: "new-password",
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  disabled: processing,
                  "data-test": "update-password-button",
                  children: "Save password"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Ke,
                {
                  show: recentlySuccessful,
                  enter: "transition ease-in-out",
                  enterFrom: "opacity-0",
                  leave: "transition ease-in-out",
                  leaveTo: "opacity-0",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-600", children: "Saved" })
                }
              )
            ] })
          ] })
        }
      )
    ] }) })
  ] });
}
export {
  Password as default
};
