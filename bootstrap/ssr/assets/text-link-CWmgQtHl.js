import { j as jsxRuntimeExports, L as Link_default } from "../ssr.js";
import { c as cn } from "./button-TIWYqyVf.js";
function TextLink({
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link_default,
    {
      className: cn(
        "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500",
        className
      ),
      ...props,
      children
    }
  );
}
export {
  TextLink as T
};
