import { r as reactExports, j as jsxRuntimeExports, L as Link_default } from "../ssr.js";
import { c as cn, B as Button, i as isSameUrl, r as resolveUrl } from "./createLucideIcon-BMlcDIBX.js";
import { P as Primitive } from "./index-BAof5wf_.js";
import { q as queryParams } from "./index-3UqiGNe9.js";
import { e as edit$2 } from "./app-layout-CBdqLOnj.js";
import { a as show } from "./index-CGcLs10H.js";
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator-root",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function HeadingSmall({
  title,
  description
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-0.5 text-base font-medium", children: title }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: description })
  ] });
}
function Heading({
  title,
  description
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 space-y-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold tracking-tight", children: title }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: description })
  ] });
}
const edit$1 = (options) => ({
  url: edit$1.url(options),
  method: "get"
});
edit$1.definition = {
  methods: ["get", "head"],
  url: "/settings/appearance"
};
edit$1.url = (options) => {
  return edit$1.definition.url + queryParams(options);
};
edit$1.get = (options) => ({
  url: edit$1.url(options),
  method: "get"
});
edit$1.head = (options) => ({
  url: edit$1.url(options),
  method: "head"
});
const editForm$1 = (options) => ({
  action: edit$1.url(options),
  method: "get"
});
editForm$1.get = (options) => ({
  action: edit$1.url(options),
  method: "get"
});
editForm$1.head = (options) => ({
  action: edit$1.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit$1.form = editForm$1;
({
  edit: Object.assign(edit$1, edit$1)
});
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
({
  edit: Object.assign(edit, edit),
  update: Object.assign(update, update)
});
const sidebarNavItems = [
  {
    title: "Profile",
    href: edit$2(),
    icon: null
  },
  {
    title: "Password",
    href: edit(),
    icon: null
  },
  {
    title: "Two-Factor Auth",
    href: show(),
    icon: null
  },
  {
    title: "Appearance",
    href: edit$1(),
    icon: null
  }
];
function SettingsLayout({ children }) {
  if (typeof window === "undefined") {
    return null;
  }
  const currentPath = window.location.pathname;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Heading,
      {
        title: "Settings",
        description: "Manage your profile and account settings"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row lg:space-x-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "w-full max-w-xl lg:w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col space-y-1 space-x-0", children: sidebarNavItems.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "ghost",
          asChild: true,
          className: cn("w-full justify-start", {
            "bg-muted": isSameUrl(
              currentPath,
              item.href
            )
          }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link_default, { href: item.href, children: [
            item.icon && /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4" }),
            item.title
          ] })
        },
        `${resolveUrl(item.href)}-${index}`
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-6 lg:hidden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 md:max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-xl space-y-12", children }) })
    ] })
  ] });
}
export {
  HeadingSmall as H,
  SettingsLayout as S,
  edit as a,
  edit$1 as e
};
