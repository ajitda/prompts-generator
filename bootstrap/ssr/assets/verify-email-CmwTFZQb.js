import { j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { T as TextLink } from "./text-link-DMS5Hcym.js";
import { B as Button } from "./button-CkHcfFL4.js";
import { S as Spinner } from "./spinner-CWHtRx-6.js";
import { A as AuthLayout } from "./auth-layout-Dcx1kGQl.js";
import { a as logout } from "./index-Cm2O5opL.js";
import { s as send } from "./index-BVZoIs4X.js";
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
import "lucide-react";
import "./public-header-BeG1FJzI.js";
import "./dropdown-menu-DJaFPoPg.js";
import "@radix-ui/react-dropdown-menu";
import "./index--D7ld9AJ.js";
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
