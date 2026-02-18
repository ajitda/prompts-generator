import { r as reactExports, j as jsxRuntimeExports, H as Head_default, F as Form_default } from "../ssr.js";
import { I as InputError } from "./input-error-DKbyWYwW.js";
import { B as Button } from "./createLucideIcon-DxBA2hfx.js";
import { I as Input } from "./input-BjSWeg-A.js";
import { I as InputOTP, K as Kt, O as OTP_MAX_LENGTH, a as InputOTPGroup, b as InputOTPSlot } from "./use-two-factor-auth-CJNp0PXi.js";
import { A as AuthLayout } from "./auth-layout-DiMFsbDD.js";
import { s as store } from "./index-BKq0lOP8.js";
import "side-channel";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./public-header-DXP46-i_.js";
import "./dropdown-menu-C5jyS0V-.js";
import "@radix-ui/primitive";
import "@floating-ui/react-dom";
import "aria-hidden";
import "react-remove-scroll";
import "./chevron-down-D42UBSfq.js";
import "./index-Dye-FuDj.js";
import "./index--D7ld9AJ.js";
function TwoFactorChallenge() {
  const [showRecoveryInput, setShowRecoveryInput] = reactExports.useState(false);
  const [code, setCode] = reactExports.useState("");
  const authConfigContent = reactExports.useMemo(() => {
    if (showRecoveryInput) {
      return {
        title: "Recovery Code",
        description: "Please confirm access to your account by entering one of your emergency recovery codes.",
        toggleText: "login using an authentication code"
      };
    }
    return {
      title: "Authentication Code",
      description: "Enter the authentication code provided by your authenticator application.",
      toggleText: "login using a recovery code"
    };
  }, [showRecoveryInput]);
  const toggleRecoveryMode = (clearErrors) => {
    setShowRecoveryInput(!showRecoveryInput);
    clearErrors();
    setCode("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AuthLayout,
    {
      title: authConfigContent.title,
      description: authConfigContent.description,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: "Two-Factor Authentication" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Form_default,
          {
            ...store.form(),
            className: "space-y-4",
            resetOnError: true,
            resetOnSuccess: !showRecoveryInput,
            children: ({ errors, processing, clearErrors }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              showRecoveryInput ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    name: "recovery_code",
                    type: "text",
                    placeholder: "Enter recovery code",
                    autoFocus: showRecoveryInput,
                    required: true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputError,
                  {
                    message: errors.recovery_code
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center space-y-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputOTP,
                  {
                    name: "code",
                    maxLength: OTP_MAX_LENGTH,
                    value: code,
                    onChange: (value) => setCode(value),
                    disabled: processing,
                    pattern: Kt,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputOTPGroup, { children: Array.from(
                      { length: OTP_MAX_LENGTH },
                      (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        InputOTPSlot,
                        {
                          index
                        },
                        index
                      )
                    ) })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.code })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full",
                  disabled: processing,
                  children: "Continue"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "or you can " }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "cursor-pointer text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500",
                    onClick: () => toggleRecoveryMode(clearErrors),
                    children: authConfigContent.toggleText
                  }
                )
              ] })
            ] })
          }
        ) })
      ]
    }
  );
}
export {
  TwoFactorChallenge as default
};
