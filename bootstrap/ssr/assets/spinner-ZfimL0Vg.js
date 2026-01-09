import { j as jsxRuntimeExports } from "../ssr.js";
import { Loader2Icon } from "lucide-react";
import { c as cn } from "./button-TIWYqyVf.js";
function Spinner({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Loader2Icon,
    {
      role: "status",
      "aria-label": "Loading",
      className: cn("size-4 animate-spin", className),
      ...props
    }
  );
}
export {
  Spinner as S
};
