import { r as reactExports, j as jsxRuntimeExports } from "../ssr.js";
import { a as cn, B as Button } from "./createLucideIcon-DxBA2hfx.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent } from "./card-CqYzDAC4.js";
import { z as zt } from "./index-CeNWS0RB.js";
import { A as ArrowLeft } from "./arrow-left-DhtKOkIO.js";
import { C as Check } from "./check-2g5mg3H-.js";
import { S as Sparkles } from "./sparkles-BFjwokJ6.js";
import { C as Copy } from "./copy-BiOVhSOM.js";
import { M as Monitor } from "./monitor-CfbrvXgx.js";
import { C as Clock } from "./clock-lrMVSSaL.js";
import { R as RefreshCw } from "./refresh-cw-DueGN9ey.js";
const Table = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&_tr]:last-child:border-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "th",
  {
    ref,
    className: cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "td",
  {
    ref,
    className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
const SceneView = ({
  selectedIdea,
  scenes,
  tone = null,
  onBack,
  onRegenerate,
  onStartOver,
  isLoading,
  readOnly = false
}) => {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = async () => {
    try {
      const text = scenes.map(
        (s) => `Scene ${s.scene_number} (${s.duration}s)
Visual: ${s.visual}
Audio: ${s.audio}`
      ).join("\n\n");
      await navigator.clipboard.writeText(text);
      setCopied(true);
      zt.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2e3);
    } catch {
      zt.error("Couldn't copy");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onBack,
          className: "inline-flex items-center gap-2 font-medium text-muted-foreground hover:text-foreground text-sm transition-colors duration-250",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to outline"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-between items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center bg-success/10 rounded-xl w-10 h-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-success" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-2xl", children: "Your Detailed Script is Ready" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: selectedIdea })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-secondary px-4 py-2 rounded-full text-secondary-foreground text-sm font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
          "Tone: ",
          tone || "Professional"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden shadow-premium border-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "bg-muted/30 border-border border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Scene-by-Scene Storyboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
            "Total Est. Duration: ",
            scenes.reduce((acc, s) => acc + (parseInt(s.duration) || 0), 0),
            "s"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "default",
            size: "sm",
            onClick: handleCopy,
            className: "gap-2 shadow-sm",
            children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
              "Copied"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
              "Copy Everything"
            ] })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-16", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "min-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-4 h-4" }),
            "Visual / Storyboard"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "min-w-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
            "Narration / Audio"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-24 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
            "Time"
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: scenes.map((scene) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-muted/20 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-bold text-muted-foreground", children: scene.scene_number }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm leading-relaxed", children: scene.visual }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm leading-relaxed font-medium", children: scene.audio }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right tabular-nums text-primary font-bold", children: [
            scene.duration,
            "s"
          ] })
        ] }, scene.scene_number)) })
      ] }) })
    ] }),
    !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex sm:flex-row flex-col gap-3 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: onRegenerate,
          disabled: isLoading,
          className: "gap-2 h-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                className: `h-4 w-4 ${isLoading ? "animate-spin" : ""}`
              }
            ),
            "Regenerate script"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: onStartOver,
          className: "gap-2 h-12 px-8",
          children: "Start new video"
        }
      )
    ] })
  ] });
};
export {
  SceneView as S
};
