import { j as jsxRuntimeExports, H as Head_default } from "../ssr.js";
import { I as IdeaCard } from "./IdeaCard-C0HsjeKp.js";
import { A as AppLayout } from "./app-layout-CBdqLOnj.js";
import "util";
import "stream";
import "path";
import "http";
import "https";
import "url";
import "fs";
import "crypto";
import "http2";
import "assert";
import "tty";
import "os";
import "zlib";
import "events";
import "node:cluster";
import "process";
import "async_hooks";
import "./createLucideIcon-BMlcDIBX.js";
import "./check-dH_DnImb.js";
import "./copy-B5Hu-Xl0.js";
import "./message-square-862q_v-w.js";
import "./dropdown-menu-mwAGrZTw.js";
import "./index-BAof5wf_.js";
import "./index-B9NLp086.js";
import "./index-3UqiGNe9.js";
import "./index-BHtmZ5pP.js";
import "./video-D2v1Njvn.js";
import "./sparkles-BQca7fAS.js";
const IdeaCardContainer = ({ script }) => {
  const ideas = script.idea ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: ideas.map((idea, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    IdeaCard,
    {
      index,
      idea
    },
    index
  )) });
};
function Show({ script, type }) {
  const isIdeaGenerator = type === "youtube_idea";
  const toolTitle = isIdeaGenerator ? "YouTube Video Idea Generator" : "Video Script Generator";
  const toolHref = isIdeaGenerator ? "/youtube" : "/scripts";
  const breadcrumbs = [
    {
      title: toolTitle,
      href: toolHref
    }
  ];
  script.script?.script || "No script content found.";
  script.script?.tone || "Professional";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: `Script - ${script.keyword}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-5xl py-12 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold", children: [
        "Your Video Ideas for",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
          '"',
          script.keyword,
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IdeaCardContainer, { script })
    ] }) })
  ] }) });
}
export {
  Show as default
};
