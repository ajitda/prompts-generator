import { r as reactExports, j as jsxRuntimeExports, H as Head_default, L as Link_default } from "../ssr.js";
import { B as Button } from "./createLucideIcon-DxBA2hfx.js";
import { C as Card } from "./card-CqYzDAC4.js";
import { A as AppLayout } from "./app-layout-B766uKWo.js";
import { z as zt } from "./index-CeNWS0RB.js";
import { A as ArrowLeft } from "./arrow-left-DhtKOkIO.js";
import { C as Check } from "./check-2g5mg3H-.js";
import { C as Copy } from "./copy-BiOVhSOM.js";
import "side-channel";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "@radix-ui/primitive";
import "./dropdown-menu-C5jyS0V-.js";
import "@floating-ui/react-dom";
import "aria-hidden";
import "react-remove-scroll";
import "./index-Do_dwBzt.js";
import "use-sync-external-store/shim";
import "./index-Dye-FuDj.js";
import "./index--D7ld9AJ.js";
import "./index-8HAZ9HbM.js";
import "./video-stECLQZx.js";
import "./message-square-CyQY6ja3.js";
import "./sparkles-BFjwokJ6.js";
import "./chevron-right-Ce1b_jbN.js";
import "goober";
function PromptShow({ prompt }) {
  const [copiedIndex, setCopiedIndex] = reactExports.useState(null);
  const breadcrumbs = [
    {
      title: "Prompt Generator",
      href: "/prompts"
    },
    {
      title: prompt.keyword,
      href: `/prompts/${prompt.id}`
    }
  ];
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2e3);
    zt.success("Copied to clipboard!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: `AI Prompts: ${prompt.keyword}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-4xl px-4 font-sans", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link_default, { href: "/prompts", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to Generator"
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mb-2 text-3xl font-black tracking-tight", children: [
          "Prompts for:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gradient", children: [
            '"',
            prompt.keyword,
            '"'
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-muted-foreground", children: [
          "Generated on",
          " ",
          new Date(prompt.created_at).toLocaleDateString(
            "en-US",
            {
              day: "numeric",
              month: "long",
              year: "numeric"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: prompt.prompt.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "animate-reveal border-border/40 bg-card/50 p-6 backdrop-blur-xl transition-all hover:shadow-lg",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black tracking-widest text-primary uppercase", children: item.Style }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-3 py-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase", children: item.Engine })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "transition-colors hover:bg-primary/10 hover:text-primary",
                  onClick: () => copyToClipboard(item.Content, index),
                  children: copiedIndex === index ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4 text-lg leading-relaxed font-medium whitespace-pre-wrap text-foreground italic", children: [
              '"',
              item.Content,
              '"'
            ] })
          ]
        },
        index
      )) })
    ] }) })
  ] });
}
export {
  PromptShow as default
};
