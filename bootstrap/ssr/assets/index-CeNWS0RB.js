import { r as reactExports } from "../ssr.js";
import { keyframes, styled, setup, css } from "goober";
var Z = (e) => typeof e == "function", h = (e, t) => Z(e) ? e(t) : e;
var W = /* @__PURE__ */ (() => {
  let e = 0;
  return () => (++e).toString();
})(), E = /* @__PURE__ */ (() => {
  let e;
  return () => {
    if (e === void 0 && typeof window < "u") {
      let t = matchMedia("(prefers-reduced-motion: reduce)");
      e = !t || t.matches;
    }
    return e;
  };
})();
var re = 20, k = "default";
var H = (e, t) => {
  let { toastLimit: o } = e.settings;
  switch (t.type) {
    case 0:
      return { ...e, toasts: [t.toast, ...e.toasts].slice(0, o) };
    case 1:
      return { ...e, toasts: e.toasts.map((r) => r.id === t.toast.id ? { ...r, ...t.toast } : r) };
    case 2:
      let { toast: s } = t;
      return H(e, { type: e.toasts.find((r) => r.id === s.id) ? 1 : 0, toast: s });
    case 3:
      let { toastId: a } = t;
      return { ...e, toasts: e.toasts.map((r) => r.id === a || a === void 0 ? { ...r, dismissed: true, visible: false } : r) };
    case 4:
      return t.toastId === void 0 ? { ...e, toasts: [] } : { ...e, toasts: e.toasts.filter((r) => r.id !== t.toastId) };
    case 5:
      return { ...e, pausedAt: t.time };
    case 6:
      let i = t.time - (e.pausedAt || 0);
      return { ...e, pausedAt: void 0, toasts: e.toasts.map((r) => ({ ...r, pauseDuration: r.pauseDuration + i })) };
  }
}, v = [], j = { toasts: [], pausedAt: void 0, settings: { toastLimit: re } }, f = {}, Y = (e, t = k) => {
  f[t] = H(f[t] || j, e), v.forEach(([o, s]) => {
    o === t && s(f[t]);
  });
}, _ = (e) => Object.keys(f).forEach((t) => Y(e, t)), Q = (e) => Object.keys(f).find((t) => f[t].toasts.some((o) => o.id === e)), S = (e = k) => (t) => {
  Y(t, e);
};
var ie = (e, t = "blank", o) => ({ createdAt: Date.now(), visible: true, dismissed: false, type: t, ariaProps: { role: "status", "aria-live": "polite" }, message: e, pauseDuration: 0, ...o, id: (o == null ? void 0 : o.id) || W() }), P = (e) => (t, o) => {
  let s = ie(t, e, o);
  return S(s.toasterId || Q(s.id))({ type: 2, toast: s }), s.id;
}, n = (e, t) => P("blank")(e, t);
n.error = P("error");
n.success = P("success");
n.loading = P("loading");
n.custom = P("custom");
n.dismiss = (e, t) => {
  let o = { type: 3, toastId: e };
  t ? S(t)(o) : _(o);
};
n.dismissAll = (e) => n.dismiss(void 0, e);
n.remove = (e, t) => {
  let o = { type: 4, toastId: e };
  t ? S(t)(o) : _(o);
};
n.removeAll = (e) => n.remove(void 0, e);
n.promise = (e, t, o) => {
  let s = n.loading(t.loading, { ...o, ...o == null ? void 0 : o.loading });
  return typeof e == "function" && (e = e()), e.then((a) => {
    let i = t.success ? h(t.success, a) : void 0;
    return i ? n.success(i, { id: s, ...o, ...o == null ? void 0 : o.success }) : n.dismiss(s), a;
  }).catch((a) => {
    let i = t.error ? h(t.error, a) : void 0;
    i ? n.error(i, { id: s, ...o, ...o == null ? void 0 : o.error }) : n.dismiss(s);
  }), e;
};
var de = keyframes`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`, me = keyframes`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`, le = keyframes`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`, C = styled("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e) => e.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${de} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${me} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e) => e.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${le} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;
var Te = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, F = styled("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e) => e.secondary || "#e0e0e0"};
  border-right-color: ${(e) => e.primary || "#616161"};
  animation: ${Te} 1s linear infinite;
`;
var ge = keyframes`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`, he = keyframes`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`, L = styled("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e) => e.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ge} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${he} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e) => e.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`;
var be = styled("div")`
  position: absolute;
`, Se = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`, Ae = keyframes`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`, Pe = styled("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ae} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`, $ = ({ toast: e }) => {
  let { icon: t$1, type: o, iconTheme: s } = e;
  return t$1 !== void 0 ? typeof t$1 == "string" ? reactExports.createElement(Pe, null, t$1) : t$1 : o === "blank" ? null : reactExports.createElement(Se, null, reactExports.createElement(F, { ...s }), o !== "loading" && reactExports.createElement(be, null, o === "error" ? reactExports.createElement(C, { ...s }) : reactExports.createElement(L, { ...s })));
};
var Re = (e) => `
0% {transform: translate3d(0,${e * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`, Ee = (e) => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e * -150}%,-1px) scale(.6); opacity:0;}
`, ve = "0%{opacity:0;} 100%{opacity:1;}", De = "0%{opacity:1;} 100%{opacity:0;}", Oe = styled("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`, Ie = styled("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`, ke = (e, t) => {
  let s = e.includes("top") ? 1 : -1, [a, i] = E() ? [ve, De] : [Re(s), Ee(s)];
  return { animation: t ? `${keyframes(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards` : `${keyframes(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)` };
};
reactExports.memo(({ toast: e, position: t$1, style: o, children: s }) => {
  let a = e.height ? ke(e.position || t$1 || "top-center", e.visible) : { opacity: 0 }, i = reactExports.createElement($, { toast: e }), r = reactExports.createElement(Ie, { ...e.ariaProps }, h(e.message, e));
  return reactExports.createElement(Oe, { className: e.className, style: { ...a, ...o, ...e.style } }, typeof s == "function" ? s({ icon: i, message: r }) : reactExports.createElement(reactExports.Fragment, null, i, r));
});
setup(reactExports.createElement);
css`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;
var zt = n;
export {
  zt as z
};
