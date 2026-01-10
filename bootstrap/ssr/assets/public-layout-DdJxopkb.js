import { u as usePage, j as jsxRuntimeExports, H as Head_default } from "../ssr.js";
import { P as PublicHeader, a as PublicFooter } from "./public-header-B85cygj2.js";
function Meta({
  title,
  description = "Generate high-performing YouTube video ideas, titles, and scripts with our AI-powered tool.",
  image,
  canonical,
  type = "website"
}) {
  const { url, props } = usePage();
  const appUrl = props.app_url || "https://videogen.test";
  const siteName = props.name || "Video Idea Generator";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const currentUrl = canonical || `${appUrl}${url}`;
  const defaultImage = `${appUrl}/og-image.png`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Head_default, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: currentUrl }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:site_name", content: siteName }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: fullTitle }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: currentUrl }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: image || defaultImage }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:title", content: fullTitle }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:image", content: image || defaultImage })
  ] });
}
function PublicLayout({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicHeader, {}),
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicFooter, {})
  ] });
}
export {
  Meta as M,
  PublicLayout as P
};
