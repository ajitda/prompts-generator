import { j as jsxRuntimeExports, r as reactExports, F as Form_default, H as Head_default } from "../ssr.js";
import { S as SettingsLayout, H as HeadingSmall } from "./layout-UDwk9eZn.js";
import { c as cn, B as Button } from "./button-TIWYqyVf.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent } from "./card-MbFmKuYg.js";
import { r as regenerateRecoveryCodes, c as confirm, a as show, d as disable, e as enable } from "./index-BKq0lOP8.js";
import { AlertCircleIcon, LockKeyhole, EyeOff, Eye, RefreshCw, ScanLine, Check, Copy, ShieldBan, ShieldCheck } from "lucide-react";
import { cva } from "class-variance-authority";
import { I as InputError } from "./input-error-BxiP7EW1.js";
import { D as Dialog, b as DialogContent, g as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-kKRTTdj7.js";
import { I as InputOTP, O as OTP_MAX_LENGTH, a as InputOTPGroup, b as InputOTPSlot, u as useTwoFactorAuth } from "./use-two-factor-auth-DZv87LFY.js";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { S as Spinner } from "./spinner-ZfimL0Vg.js";
import { A as AppLayout, B as Badge } from "./app-layout-DgUhOw1Y.js";
import "side-channel";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "@radix-ui/react-separator";
import "./index--D7ld9AJ.js";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
import "./index-Cm2O5opL.js";
import "./index-B6anorhi.js";
import "./logo-LJNW8YKn.js";
import "@radix-ui/react-collapsible";
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "text-destructive-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-foreground/80"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-title",
      className: cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      ),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      ),
      ...props
    }
  );
}
function AlertError({
  errors,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircleIcon, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: title || "Something went wrong." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-inside list-disc text-sm", children: Array.from(new Set(errors)).map((error, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: error }, index)) }) })
  ] });
}
function TwoFactorRecoveryCodes({
  recoveryCodesList,
  fetchRecoveryCodes,
  errors
}) {
  const [codesAreVisible, setCodesAreVisible] = reactExports.useState(false);
  const codesSectionRef = reactExports.useRef(null);
  const canRegenerateCodes = recoveryCodesList.length > 0 && codesAreVisible;
  const toggleCodesVisibility = reactExports.useCallback(async () => {
    if (!codesAreVisible && !recoveryCodesList.length) {
      await fetchRecoveryCodes();
    }
    setCodesAreVisible(!codesAreVisible);
    if (!codesAreVisible) {
      setTimeout(() => {
        codesSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      });
    }
  }, [codesAreVisible, recoveryCodesList.length, fetchRecoveryCodes]);
  reactExports.useEffect(() => {
    if (!recoveryCodesList.length) {
      fetchRecoveryCodes();
    }
  }, [recoveryCodesList.length, fetchRecoveryCodes]);
  const RecoveryCodeIconComponent = codesAreVisible ? EyeOff : Eye;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { className: "size-4", "aria-hidden": "true" }),
        "2FA Recovery Codes"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Recovery codes let you regain access if you lose your 2FA device. Store them in a secure password manager." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 select-none sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: toggleCodesVisibility,
            className: "w-fit",
            "aria-expanded": codesAreVisible,
            "aria-controls": "recovery-codes-section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RecoveryCodeIconComponent,
                {
                  className: "size-4",
                  "aria-hidden": "true"
                }
              ),
              codesAreVisible ? "Hide" : "View",
              " Recovery Codes"
            ]
          }
        ),
        canRegenerateCodes && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Form_default,
          {
            ...regenerateRecoveryCodes.form(),
            options: { preserveScroll: true },
            onSuccess: fetchRecoveryCodes,
            children: ({ processing }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "secondary",
                type: "submit",
                disabled: processing,
                "aria-describedby": "regenerate-warning",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, {}),
                  " Regenerate Codes"
                ]
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          id: "recovery-codes-section",
          className: `relative overflow-hidden transition-all duration-300 ${codesAreVisible ? "h-auto opacity-100" : "h-0 opacity-0"}`,
          "aria-hidden": !codesAreVisible,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-3", children: errors?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(AlertError, { errors }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ref: codesSectionRef,
                className: "grid gap-1 rounded-lg bg-muted p-4 font-mono text-sm",
                role: "list",
                "aria-label": "Recovery codes",
                children: recoveryCodesList.length ? recoveryCodesList.map((code, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    role: "listitem",
                    className: "select-text",
                    children: code
                  },
                  index
                )) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "space-y-2",
                    "aria-label": "Loading recovery codes",
                    children: Array.from(
                      { length: 8 },
                      (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-4 animate-pulse rounded bg-muted-foreground/20",
                          "aria-hidden": "true"
                        },
                        index
                      )
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { id: "regenerate-warning", children: [
              "Each recovery code can be used once to access your account and will be removed after use. If you need more, click",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "Regenerate Codes" }),
              " ",
              "above."
            ] }) })
          ] }) })
        }
      )
    ] })
  ] });
}
function useClipboard() {
  const [copiedText, setCopiedText] = reactExports.useState(null);
  const copy = reactExports.useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  }, []);
  return [copiedText, copy];
}
function GridScanIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 rounded-full border border-border bg-card p-0.5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-full border border-border bg-muted p-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid grid-cols-5 opacity-50", children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "border-r border-border last:border-r-0"
      },
      `col-${i + 1}`
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid grid-rows-5 opacity-50", children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "border-b border-border last:border-b-0"
      },
      `row-${i + 1}`
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "relative z-20 size-6 text-foreground" })
  ] }) });
}
function TwoFactorSetupStep({
  qrCodeSvg,
  manualSetupKey,
  buttonText,
  onNextStep,
  errors
}) {
  const [copiedText, copy] = useClipboard();
  const IconComponent = copiedText === manualSetupKey ? Check : Copy;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: errors?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(AlertError, { errors }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex max-w-md overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto aspect-square w-64 rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "z-10 flex h-full w-full items-center justify-center p-5", children: qrCodeSvg ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "aspect-square w-full rounded-lg bg-white p-2 [&_svg]:size-full",
        dangerouslySetInnerHTML: {
          __html: qrCodeSvg
        }
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full space-x-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", onClick: onNextStep, children: buttonText }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex w-full items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 top-1/2 h-px w-full bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative bg-card px-2 py-1", children: "or, enter the code manually" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full space-x-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full items-stretch overflow-hidden rounded-xl border border-border", children: !manualSetupKey ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-muted p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          readOnly: true,
          value: manualSetupKey,
          className: "h-full w-full bg-background p-3 text-foreground outline-none"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => copy(manualSetupKey),
          className: "border-l border-border px-3 hover:bg-muted",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-4" })
        }
      )
    ] }) }) })
  ] }) });
}
function TwoFactorVerificationStep({
  onClose,
  onBack
}) {
  const [code, setCode] = reactExports.useState("");
  const pinInputContainerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setTimeout(() => {
      pinInputContainerRef.current?.querySelector("input")?.focus();
    }, 0);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Form_default,
    {
      ...confirm.form(),
      onSuccess: () => onClose(),
      resetOnError: true,
      resetOnSuccess: true,
      children: ({
        processing,
        errors
      }) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: pinInputContainerRef,
          className: "relative w-full space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-col items-center space-y-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputOTP,
                {
                  id: "otp",
                  name: "code",
                  maxLength: OTP_MAX_LENGTH,
                  onChange: setCode,
                  disabled: processing,
                  pattern: REGEXP_ONLY_DIGITS,
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
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputError,
                {
                  message: errors?.confirmTwoFactorAuthentication?.code
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full space-x-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "flex-1",
                  onClick: onBack,
                  disabled: processing,
                  children: "Back"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "flex-1",
                  disabled: processing || code.length < OTP_MAX_LENGTH,
                  children: "Confirm"
                }
              )
            ] })
          ]
        }
      ) })
    }
  );
}
function TwoFactorSetupModal({
  isOpen,
  onClose,
  requiresConfirmation,
  twoFactorEnabled,
  qrCodeSvg,
  manualSetupKey,
  clearSetupData,
  fetchSetupData,
  errors
}) {
  const [showVerificationStep, setShowVerificationStep] = reactExports.useState(false);
  const modalConfig = reactExports.useMemo(() => {
    if (twoFactorEnabled) {
      return {
        title: "Two-Factor Authentication Enabled",
        description: "Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.",
        buttonText: "Close"
      };
    }
    if (showVerificationStep) {
      return {
        title: "Verify Authentication Code",
        description: "Enter the 6-digit code from your authenticator app",
        buttonText: "Continue"
      };
    }
    return {
      title: "Enable Two-Factor Authentication",
      description: "To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app",
      buttonText: "Continue"
    };
  }, [twoFactorEnabled, showVerificationStep]);
  const handleModalNextStep = reactExports.useCallback(() => {
    if (requiresConfirmation) {
      setShowVerificationStep(true);
      return;
    }
    clearSetupData();
    onClose();
  }, [requiresConfirmation, clearSetupData, onClose]);
  const resetModalState = reactExports.useCallback(() => {
    setShowVerificationStep(false);
    if (twoFactorEnabled) {
      clearSetupData();
    }
  }, [twoFactorEnabled, clearSetupData]);
  reactExports.useEffect(() => {
    if (isOpen && !qrCodeSvg) {
      fetchSetupData();
    }
  }, [isOpen, qrCodeSvg, fetchSetupData]);
  const handleClose = reactExports.useCallback(() => {
    resetModalState();
    onClose();
  }, [onClose, resetModalState]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: (open) => !open && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "flex items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GridScanIcon, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: modalConfig.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-center", children: modalConfig.description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center space-y-5", children: showVerificationStep ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      TwoFactorVerificationStep,
      {
        onClose,
        onBack: () => setShowVerificationStep(false)
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      TwoFactorSetupStep,
      {
        qrCodeSvg,
        manualSetupKey,
        buttonText: modalConfig.buttonText,
        onNextStep: handleModalNextStep,
        errors
      }
    ) })
  ] }) });
}
const breadcrumbs = [
  {
    title: "Two-Factor Authentication",
    href: show.url()
  }
];
function TwoFactor({
  requiresConfirmation = false,
  twoFactorEnabled = false
}) {
  const {
    qrCodeSvg,
    hasSetupData,
    manualSetupKey,
    clearSetupData,
    fetchSetupData,
    recoveryCodesList,
    fetchRecoveryCodes,
    errors
  } = useTwoFactorAuth();
  const [showSetupModal, setShowSetupModal] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: "Two-Factor Authentication" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HeadingSmall,
        {
          title: "Two-Factor Authentication",
          description: "Manage your two-factor authentication settings"
        }
      ),
      twoFactorEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start justify-start space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", children: "Enabled" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "With two-factor authentication enabled, you will be prompted for a secure, random pin during login, which you can retrieve from the TOTP-supported application on your phone." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TwoFactorRecoveryCodes,
          {
            recoveryCodesList,
            fetchRecoveryCodes,
            errors
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative inline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Form_default, { ...disable.form(), children: ({ processing }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "destructive",
            type: "submit",
            disabled: processing,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldBan, {}),
              " Disable 2FA"
            ]
          }
        ) }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start justify-start space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "Disabled" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "When you enable two-factor authentication, you will be prompted for a secure pin during login. This pin can be retrieved from a TOTP-supported application on your phone." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: hasSetupData ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowSetupModal(true),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, {}),
              "Continue Setup"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Form_default,
          {
            ...enable.form(),
            onSuccess: () => setShowSetupModal(true),
            children: ({ processing }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: processing,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, {}),
                  "Enable 2FA"
                ]
              }
            )
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TwoFactorSetupModal,
        {
          isOpen: showSetupModal,
          onClose: () => setShowSetupModal(false),
          requiresConfirmation,
          twoFactorEnabled,
          qrCodeSvg,
          manualSetupKey,
          clearSetupData,
          fetchSetupData,
          errors
        }
      )
    ] }) })
  ] });
}
export {
  TwoFactor as default
};
