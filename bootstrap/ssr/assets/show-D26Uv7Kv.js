import { r as reactExports, j as jsxRuntimeExports, H as Head_default, L as Link_default } from "../ssr.js";
import { B as Button } from "./button-CkHcfFL4.js";
import { C as Card } from "./card-BqcUKBWb.js";
import { A as AppLayout } from "./app-layout-BzJRehLM.js";
import { ArrowLeft, Check, Copy } from "lucide-react";
import toast from "react-hot-toast";
import "side-channel";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "./dropdown-menu-DJaFPoPg.js";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
import "./index-Cm2O5opL.js";
import "./index--D7ld9AJ.js";
import "./index-B6anorhi.js";
import "@radix-ui/react-collapsible";
function CaptionShow({ caption }) {
  const [copiedIndex, setCopiedIndex] = reactExports.useState(null);
  const breadcrumbs = [
    {
      title: "Caption Generator",
      href: "/captions"
    },
    {
      title: caption.topic,
      href: `/captions/${caption.id}`
    }
  ];
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2e3);
    toast.success("Copied to clipboard!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: `Captions: ${caption.topic}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-4xl px-4 font-sans", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link_default, { href: "/captions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to Generator"
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mb-2 text-3xl font-black tracking-tight", children: [
          "Captions for:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gradient", children: [
            '"',
            caption.topic,
            '"'
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-muted-foreground", children: [
          "Generated on",
          " ",
          new Date(caption.created_at).toLocaleDateString(
            "en-US",
            {
              day: "numeric",
              month: "long",
              year: "numeric"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: caption.content.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "animate-reveal border-border/40 bg-card/50 p-6 backdrop-blur-xl transition-all hover:shadow-lg",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black tracking-widest text-primary uppercase", children: item.Style }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "transition-colors hover:bg-primary/10 hover:text-primary",
                  onClick: () => copyToClipboard(
                    `${item.Content}

${item.Hashtags}`,
                    index
                  ),
                  children: copiedIndex === index ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-lg leading-relaxed font-medium whitespace-pre-wrap text-foreground", children: item.Content }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold tracking-tight text-primary", children: item.Hashtags })
          ]
        },
        index
      )) })
    ] }) })
  ] });
}
export {
  CaptionShow as default
};
