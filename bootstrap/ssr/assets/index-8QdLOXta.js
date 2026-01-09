import { jsxs, jsx } from "react/jsx-runtime";
import { i as index } from "./PromptController-BWYLHRJD.js";
import { A as AppLayout } from "./app-layout-CGh0R-OD.js";
import { usePage, router, Head } from "@inertiajs/react";
import { useState, useCallback } from "react";
import PromptForm from "./prompt-form-B1F14V91.js";
import "./index--D7ld9AJ.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "lucide-react";
import "./button-CIfObXh5.js";
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
import "./input-error-CJMlUpAM.js";
import "./card-BKW9IOpa.js";
import "./label-Dh-MmM5y.js";
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
  const [sortConfig, setSortConfig] = useState({
    field: filters?.sort,
    direction: filters?.direction
  });
  useCallback(
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
      router.get(index().url, {
        preserveScroll: true,
        preserveState: true,
        replace: true
      });
    },
    [sortConfig]
  );
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: "AI Prompts Generator" }),
    /* @__PURE__ */ jsx("div", { className: "rounded-lg-xl flex h-full flex-1 flex-col gap-4 overflow-x-auto p-8", children: /* @__PURE__ */ jsx(PromptForm, {}) })
  ] });
}
export {
  Index as default
};
