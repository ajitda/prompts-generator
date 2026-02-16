import { j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { T as TextLink } from "./text-link-CVWx7PYR.js";
import { B as Button } from "./createLucideIcon-BMlcDIBX.js";
import { S as Spinner } from "./spinner-C8O4hgbI.js";
import { A as AuthLayout } from "./auth-layout-C3DC7uHa.js";
import { a as logout } from "./index-B9NLp086.js";
import { s as send } from "./index-CR_w9jZj.js";
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
import "./loader-circle-DIBqLg7O.js";
import "./public-header-DZ0kH5I-.js";
import "./dropdown-menu-mwAGrZTw.js";
import "./chevron-down-DAe0EYng.js";
import "./index-3UqiGNe9.js";
function VerifyEmail({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AuthLayout,
    {
      title: "Verify email",
      description: "Please verify your email address by clicking on the link we just emailed to you.",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: "Email verification" }),
        status === "verification-link-sent" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form_default, { ...send.form(), className: "space-y-6 text-center", children: ({ processing }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: processing, variant: "secondary", children: [
            processing && /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
            "Resend verification email"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextLink,
            {
              href: logout(),
              className: "mx-auto block text-sm",
              children: "Log out"
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  VerifyEmail as default
};
