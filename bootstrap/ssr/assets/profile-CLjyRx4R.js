import { r as reactExports, j as jsxRuntimeExports, F as Form_default, u as usePage, H as Head_default, L as Link_default } from "../ssr.js";
import { q as queryParams } from "./index--D7ld9AJ.js";
import { s as send } from "./index-BVZoIs4X.js";
import { H as HeadingSmall, S as SettingsLayout } from "./layout-DUSTUjnp.js";
import { I as InputError } from "./input-error-DKbyWYwW.js";
import { B as Button } from "./createLucideIcon-DxBA2hfx.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogTitle, d as DialogDescription, e as DialogFooter, f as DialogClose } from "./dialog-CXSQh3Ki.js";
import { I as Input } from "./input-BjSWeg-A.js";
import { L as Label } from "./label-ZPBNkTjD.js";
import { A as AppLayout, e as edit$1 } from "./app-layout-B766uKWo.js";
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
import "./index-Do_dwBzt.js";
import "./index-BKq0lOP8.js";
import "@radix-ui/primitive";
import "./dropdown-menu-C5jyS0V-.js";
import "@floating-ui/react-dom";
import "aria-hidden";
import "react-remove-scroll";
import "use-sync-external-store/shim";
import "./index-Dye-FuDj.js";
import "./index-8HAZ9HbM.js";
import "./video-stECLQZx.js";
import "./message-square-CyQY6ja3.js";
import "./sparkles-BFjwokJ6.js";
import "./chevron-right-Ce1b_jbN.js";
const edit = (options) => ({
  url: edit.url(options),
  method: "get"
});
edit.definition = {
  methods: ["get", "head"],
  url: "/settings/profile"
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
  method: "patch"
});
update.definition = {
  methods: ["patch"],
  url: "/settings/profile"
};
update.url = (options) => {
  return update.definition.url + queryParams(options);
};
update.patch = (options) => ({
  url: update.url(options),
  method: "patch"
});
const updateForm = (options) => ({
  action: update.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm.patch = (options) => ({
  action: update.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update.form = updateForm;
const destroy = (options) => ({
  url: destroy.url(options),
  method: "delete"
});
destroy.definition = {
  methods: ["delete"],
  url: "/settings/profile"
};
destroy.url = (options) => {
  return destroy.definition.url + queryParams(options);
};
destroy.delete = (options) => ({
  url: destroy.url(options),
  method: "delete"
});
const destroyForm = (options) => ({
  action: destroy.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm.delete = (options) => ({
  action: destroy.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy.form = destroyForm;
const ProfileController = { update, destroy };
function DeleteUser() {
  const passwordInput = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HeadingSmall,
      {
        title: "Delete account",
        description: "Delete your account and all of its resources"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-0.5 text-red-600 dark:text-red-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Warning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Please proceed with caution, this cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            "data-test": "delete-user-button",
            children: "Delete account"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Are you sure you want to delete your account?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Form_default,
            {
              ...ProfileController.destroy.form(),
              options: {
                preserveScroll: true
              },
              onError: () => passwordInput.current?.focus(),
              resetOnSuccess: true,
              className: "space-y-6",
              children: ({ resetAndClearErrors, processing, errors }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "password",
                      className: "sr-only",
                      children: "Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "password",
                      type: "password",
                      name: "password",
                      ref: passwordInput,
                      placeholder: "Password",
                      autoComplete: "current-password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.password })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "secondary",
                      onClick: () => resetAndClearErrors(),
                      children: "Cancel"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "destructive",
                      disabled: processing,
                      asChild: true,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "submit",
                          "data-test": "confirm-delete-user-button",
                          children: "Delete account"
                        }
                      )
                    }
                  )
                ] })
              ] })
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const breadcrumbs = [
  {
    title: "Profile settings",
    href: edit$1().url
  }
];
function Profile({
  mustVerifyEmail,
  status
}) {
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: "Profile settings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsLayout, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          HeadingSmall,
          {
            title: "Profile information",
            description: "Update your name and email address"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Form_default,
          {
            ...ProfileController.update.form(),
            options: {
              preserveScroll: true
            },
            className: "space-y-6",
            children: ({ processing, recentlySuccessful, errors }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "name",
                    className: "mt-1 block w-full",
                    defaultValue: auth.user.name,
                    name: "name",
                    required: true,
                    autoComplete: "name",
                    placeholder: "Full name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputError,
                  {
                    className: "mt-2",
                    message: errors.name
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
                    className: "mt-1 block w-full",
                    defaultValue: auth.user.email,
                    name: "email",
                    required: true,
                    autoComplete: "username",
                    placeholder: "Email address"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputError,
                  {
                    className: "mt-2",
                    message: errors.email
                  }
                )
              ] }),
              mustVerifyEmail && auth.user.email_verified_at === null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "-mt-4 text-sm text-muted-foreground", children: [
                  "Your email address is unverified.",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link_default,
                    {
                      href: send(),
                      as: "button",
                      className: "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500",
                      children: "Click here to resend the verification email."
                    }
                  )
                ] }),
                status === "verification-link-sent" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm font-medium text-green-600", children: "A new verification link has been sent to your email address." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    disabled: processing,
                    "data-test": "update-profile-button",
                    children: "Save"
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
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteUser, {})
    ] })
  ] });
}
export {
  Profile as default
};
