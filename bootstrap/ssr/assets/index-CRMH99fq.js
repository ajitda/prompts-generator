import { a as usePage, r as reactExports, b as router3, j as jsxRuntimeExports, H as Head_default } from "../ssr.js";
import { i as index } from "./PromptController-BWYLHRJD.js";
import { A as AppLayout } from "./app-layout-DgUhOw1Y.js";
import PromptForm from "./prompt-form-DUhD8cKi.js";
import "lodash-es";
import "qs";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index--D7ld9AJ.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "lucide-react";
import "./button-TIWYqyVf.js";
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
import "./input-error-BxiP7EW1.js";
import "./card-MbFmKuYg.js";
import "./label-BGQd_FCH.js";
import "@radix-ui/react-label";
import "react-hot-toast";
const breadcrumbs = [
  {
    title: "AI Prompts",
    href: index().url
  }
];
function Index() {
  const { props } = usePage();
  const { prompts, filters = {}, perPageOptions } = props;
  const [sortConfig, setSortConfig] = reactExports.useState({
    field: filters?.sort,
    direction: filters?.direction
  });
  reactExports.useCallback(
    (overrideParams = {}) => {
      const params = {
        // search: localSearch,
        // min_price: localMinPrice,
        // max_price: localMaxPrice,
        sort: sortConfig.field,
        direction: sortConfig.direction,
        // per_page: products?.per_page || 2,
        ...overrideParams
      };
      Object.keys(params).forEach((key) => {
      });
      router3.get(index().url, {
        preserveScroll: true,
        preserveState: true,
        replace: true
      });
    },
    [sortConfig]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: "AI Prompts Generator" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg-xl flex h-full flex-1 flex-col gap-4 overflow-x-auto p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PromptForm, {}) })
  ] });
}
export {
  Index as default
};
