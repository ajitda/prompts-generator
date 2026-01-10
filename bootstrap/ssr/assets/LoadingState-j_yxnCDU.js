import { j as jsxRuntimeExports } from "../ssr.js";
import { Sparkles } from "lucide-react";
const LoadingState = ({ message, submessage }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 animate-gentle-bounce", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-medium text-foreground mb-2", children: message }),
    submessage && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center max-w-md", children: submessage }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary/40 animate-pulse", style: { animationDelay: "0ms" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary/40 animate-pulse", style: { animationDelay: "150ms" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary/40 animate-pulse", style: { animationDelay: "300ms" } })
    ] })
  ] });
};
export {
  LoadingState as L
};
