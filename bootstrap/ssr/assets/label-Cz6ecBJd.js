import { j as jsxRuntimeExports } from "../ssr.js";
import * as LabelPrimitive from "@radix-ui/react-label";
import { c as cn } from "./button-CkHcfFL4.js";
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
export {
  Label as L
};
