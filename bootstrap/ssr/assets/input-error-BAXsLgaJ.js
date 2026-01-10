import { j as jsxRuntimeExports } from "../ssr.js";
import { c as cn } from "./button-CkHcfFL4.js";
function InputError({
  message,
  className = "",
  ...props
}) {
  return message ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    "p",
    {
      ...props,
      className: cn("text-sm text-red-600 dark:text-red-400", className),
      children: message
    }
  ) : null;
}
export {
  InputError as I
};
