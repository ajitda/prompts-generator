import { j as jsxRuntimeExports } from "../ssr.js";
import { a as cn } from "./createLucideIcon-DxBA2hfx.js";
import { L as LoaderCircle } from "./loader-circle-COMdnHZp.js";
function Spinner({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    LoaderCircle,
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
