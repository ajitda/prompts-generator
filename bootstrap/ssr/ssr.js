import { jsx } from "react/jsx-runtime";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "Laravel";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(
      `./pages/${name}.tsx`,
      /* @__PURE__ */ Object.assign({ "./pages/auth/confirm-password.tsx": () => import("./assets/confirm-password-BJjB4206.js"), "./pages/auth/forgot-password.tsx": () => import("./assets/forgot-password-w5Gf1YnT.js"), "./pages/auth/login.tsx": () => import("./assets/login-ByRYwbRO.js"), "./pages/auth/register.tsx": () => import("./assets/register-D6-zN83H.js"), "./pages/auth/reset-password.tsx": () => import("./assets/reset-password-IEdb1zA4.js"), "./pages/auth/two-factor-challenge.tsx": () => import("./assets/two-factor-challenge-MaIW_Ye-.js"), "./pages/auth/verify-email.tsx": () => import("./assets/verify-email-BmkvglbA.js"), "./pages/dashboard.tsx": () => import("./assets/dashboard-CeM57RET.js"), "./pages/home.tsx": () => import("./assets/home-DdHI7vgj.js"), "./pages/posts/create.tsx": () => import("./assets/create-Zl582sFF.js"), "./pages/posts/edit.tsx": () => import("./assets/edit-D0Xhy_NX.js"), "./pages/posts/index-public.tsx": () => import("./assets/index-public-m8mA7Bng.js"), "./pages/posts/index.tsx": () => import("./assets/index-CTZ_5The.js"), "./pages/posts/show-public.tsx": () => import("./assets/show-public-BmsT2cBN.js"), "./pages/privacy.tsx": () => import("./assets/privacy-Dbs-ZjWz.js"), "./pages/prompts/index.tsx": () => import("./assets/index-8QdLOXta.js"), "./pages/prompts/prompt-form.tsx": () => import("./assets/prompt-form-B1F14V91.js"), "./pages/prompts/show.tsx": () => import("./assets/show-UtwTwcS1.js"), "./pages/scripts/index.tsx": () => import("./assets/index-RO1igLfF.js"), "./pages/scripts/script-form.tsx": () => import("./assets/script-form-CUGhxYdI.js"), "./pages/scripts/show.tsx": () => import("./assets/show-DOfdJhTX.js"), "./pages/settings/appearance.tsx": () => import("./assets/appearance-BbI3LHgU.js"), "./pages/settings/password.tsx": () => import("./assets/password-D5r2tooi.js"), "./pages/settings/profile.tsx": () => import("./assets/profile-BvQrgSK4.js"), "./pages/settings/two-factor.tsx": () => import("./assets/two-factor-DspUiLCB.js"), "./pages/terms.tsx": () => import("./assets/terms-DbcPWu-_.js"), "./pages/welcome.tsx": () => import("./assets/welcome-CAsHMtN1.js") })
    ),
    setup: ({ App, props }) => {
      return /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);
