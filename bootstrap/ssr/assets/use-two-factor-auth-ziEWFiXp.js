import { r as reactExports, j as jsxRuntimeExports } from "../ssr.js";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import { c as cn } from "./button-CkHcfFL4.js";
import { q as qrCode, b as secretKey, f as recoveryCodes } from "./index-BKq0lOP8.js";
const InputOTP = reactExports.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  OTPInput,
  {
    ref,
    containerClassName: cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    ),
    className: cn("disabled:cursor-not-allowed", className),
    ...props
  }
));
InputOTP.displayName = "InputOTP";
const InputOTPGroup = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center", className), ...props }));
InputOTPGroup.displayName = "InputOTPGroup";
const InputOTPSlot = reactExports.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = reactExports.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      ),
      ...props,
      children: [
        char,
        hasFakeCaret && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" }) })
      ]
    }
  );
});
InputOTPSlot.displayName = "InputOTPSlot";
const InputOTPSeparator = reactExports.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, role: "separator", ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, {}) }));
InputOTPSeparator.displayName = "InputOTPSeparator";
const OTP_MAX_LENGTH = 6;
const fetchJson = async (url) => {
  const response = await fetch(url, {
    headers: { Accept: "application/json" }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  return response.json();
};
const useTwoFactorAuth = () => {
  const [qrCodeSvg, setQrCodeSvg] = reactExports.useState(null);
  const [manualSetupKey, setManualSetupKey] = reactExports.useState(null);
  const [recoveryCodesList, setRecoveryCodesList] = reactExports.useState([]);
  const [errors, setErrors] = reactExports.useState([]);
  const hasSetupData = reactExports.useMemo(
    () => qrCodeSvg !== null && manualSetupKey !== null,
    [qrCodeSvg, manualSetupKey]
  );
  const fetchQrCode = reactExports.useCallback(async () => {
    try {
      const { svg } = await fetchJson(qrCode.url());
      setQrCodeSvg(svg);
    } catch {
      setErrors((prev) => [...prev, "Failed to fetch QR code"]);
      setQrCodeSvg(null);
    }
  }, []);
  const fetchSetupKey = reactExports.useCallback(async () => {
    try {
      const { secretKey: key } = await fetchJson(
        secretKey.url()
      );
      setManualSetupKey(key);
    } catch {
      setErrors((prev) => [...prev, "Failed to fetch a setup key"]);
      setManualSetupKey(null);
    }
  }, []);
  const clearErrors = reactExports.useCallback(() => {
    setErrors([]);
  }, []);
  const clearSetupData = reactExports.useCallback(() => {
    setManualSetupKey(null);
    setQrCodeSvg(null);
    clearErrors();
  }, [clearErrors]);
  const fetchRecoveryCodes = reactExports.useCallback(async () => {
    try {
      clearErrors();
      const codes = await fetchJson(recoveryCodes.url());
      setRecoveryCodesList(codes);
    } catch {
      setErrors((prev) => [...prev, "Failed to fetch recovery codes"]);
      setRecoveryCodesList([]);
    }
  }, [clearErrors]);
  const fetchSetupData = reactExports.useCallback(async () => {
    try {
      clearErrors();
      await Promise.all([fetchQrCode(), fetchSetupKey()]);
    } catch {
      setQrCodeSvg(null);
      setManualSetupKey(null);
    }
  }, [clearErrors, fetchQrCode, fetchSetupKey]);
  return {
    qrCodeSvg,
    manualSetupKey,
    recoveryCodesList,
    hasSetupData,
    errors,
    clearErrors,
    clearSetupData,
    fetchQrCode,
    fetchSetupKey,
    fetchSetupData,
    fetchRecoveryCodes
  };
};
export {
  InputOTP as I,
  OTP_MAX_LENGTH as O,
  InputOTPGroup as a,
  InputOTPSlot as b,
  useTwoFactorAuth as u
};
