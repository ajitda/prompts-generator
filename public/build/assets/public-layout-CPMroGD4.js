import { c as j, L as n, u as N, j as t } from './app-Cwp10g0-.js';
import { b as k, B as S } from './createLucideIcon-BcYgupJn.js';
import { D as _, L as p, c as v, a as w, b as y } from './logo-7M_vJBux.js';
const D = [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]],
    L = k('ChevronDown', D);
function P() {
    const e = j.c(3);
    let r, o;
    e[0] === Symbol.for('react.memo_cache_sentinel')
        ? ((r = t.jsx(n, {
              href: '/',
              className: 'flex items-center gap-2',
              children: t.jsx('img', { src: p, alt: '', width: '150' }),
          })),
          (o = t.jsx('p', {
              className: 'text-sm text-muted-foreground',
              children: 'Helping creators publish with clarity since 2025',
          })),
          (e[0] = r),
          (e[1] = o))
        : ((r = e[0]), (o = e[1]));
    let s;
    return (
        e[2] === Symbol.for('react.memo_cache_sentinel')
            ? ((s = t.jsx('footer', {
                  className: 'mt-20 border-t border-border/50',
                  children: t.jsx('div', {
                      className: 'container mx-auto px-4 py-6',
                      children: t.jsxs('div', {
                          className:
                              'flex flex-col items-center justify-between gap-4 md:flex-row',
                          children: [
                              r,
                              o,
                              t.jsxs('div', {
                                  className:
                                      'flex items-center gap-4 text-sm text-muted-foreground',
                                  children: [
                                      t.jsx(n, {
                                          href: '/privacy',
                                          className:
                                              'transition-colors hover:text-foreground',
                                          children: 'Privacy',
                                      }),
                                      t.jsx(n, {
                                          href: '/terms',
                                          className:
                                              'transition-colors hover:text-foreground',
                                          children: 'Terms',
                                      }),
                                  ],
                              }),
                          ],
                      }),
                  }),
              })),
              (e[2] = s))
            : (s = e[2]),
        s
    );
}
function C() {
    const e = j.c(15),
        { url: r } = N(),
        o = r === '/',
        s = r.startsWith('/blog');
    let l;
    e[0] === Symbol.for('react.memo_cache_sentinel')
        ? ((l = t.jsx(n, {
              href: '/',
              className: 'flex items-center gap-2',
              children: t.jsx('img', { src: p, alt: '', width: '150' }),
          })),
          (e[0] = l))
        : (l = e[0]);
    const c = `transition-colors hover:text-foreground ${o ? 'font-medium text-foreground' : 'text-muted-foreground'}`;
    let i;
    e[1] !== c
        ? ((i = t.jsx(n, { href: '/', className: c, children: 'Home' })),
          (e[1] = c),
          (e[2] = i))
        : (i = e[2]);
    let d, f;
    e[3] === Symbol.for('react.memo_cache_sentinel')
        ? ((d = t.jsx(n, {
              href: '/#features',
              className:
                  'text-muted-foreground transition-colors hover:text-foreground',
              children: 'Features',
          })),
          (f = t.jsx(n, {
              href: '/#how-it-works',
              className:
                  'text-muted-foreground transition-colors hover:text-foreground',
              children: 'How it works',
          })),
          (e[3] = d),
          (e[4] = f))
        : ((d = e[3]), (f = e[4]));
    const b = `transition-colors hover:text-foreground ${s ? 'font-medium text-foreground' : 'text-muted-foreground'}`;
    let a;
    e[5] !== b
        ? ((a = t.jsx(n, { href: '/blog', className: b, children: 'Blogs' })),
          (e[5] = b),
          (e[6] = a))
        : (a = e[6]);
    let h;
    e[7] === Symbol.for('react.memo_cache_sentinel')
        ? ((h = t.jsxs(_, {
              className:
                  'flex cursor-pointer items-center gap-1 text-muted-foreground outline-hidden transition-colors hover:text-foreground',
              children: ['More Tools ', t.jsx(L, { className: 'h-4 w-4' })],
          })),
          (e[7] = h))
        : (h = e[7]);
    let u;
    e[8] === Symbol.for('react.memo_cache_sentinel')
        ? ((u = t.jsxs(w, {
              children: [
                  h,
                  t.jsx(y, {
                      align: 'end',
                      className:
                          'w-56 border-border/50 bg-card backdrop-blur-xl',
                      children: t.jsx(v, {
                          asChild: !0,
                          children: t.jsx(n, {
                              href: '/captions',
                              className: 'w-full cursor-pointer',
                              children: 'TikTok/Instagram Captions',
                          }),
                      }),
                  }),
              ],
          })),
          (e[8] = u))
        : (u = e[8]);
    let m;
    e[9] !== i || e[10] !== a
        ? ((m = t.jsxs('nav', {
              className: 'hidden items-center gap-6 text-sm md:flex',
              children: [i, d, f, a, u],
          })),
          (e[9] = i),
          (e[10] = a),
          (e[11] = m))
        : (m = e[11]);
    let x;
    e[12] === Symbol.for('react.memo_cache_sentinel')
        ? ((x = t.jsx(n, {
              href: '/youtube',
              children: t.jsx(S, {
                  variant: 'default',
                  size: 'sm',
                  children: 'Get Started',
              }),
          })),
          (e[12] = x))
        : (x = e[12]);
    let g;
    return (
        e[13] !== m
            ? ((g = t.jsx('header', {
                  className:
                      'sticky top-0 z-50 border-b border-border/50 bg-card/50 backdrop-blur-sm',
                  children: t.jsxs('div', {
                      className:
                          'container mx-auto flex h-16 items-center justify-between px-4',
                      children: [l, m, x],
                  }),
              })),
              (e[13] = m),
              (e[14] = g))
            : (g = e[14]),
        g
    );
}
function $(e) {
    const r = j.c(4),
        { children: o } = e;
    let s;
    r[0] === Symbol.for('react.memo_cache_sentinel')
        ? ((s = t.jsx(C, {})), (r[0] = s))
        : (s = r[0]);
    let l;
    r[1] === Symbol.for('react.memo_cache_sentinel')
        ? ((l = t.jsx(P, {})), (r[1] = l))
        : (l = r[1]);
    let c;
    return (
        r[2] !== o
            ? ((c = t.jsxs('div', {
                  className: 'min-h-screen bg-background text-foreground',
                  children: [s, o, l],
              })),
              (r[2] = o),
              (r[3] = c))
            : (c = r[3]),
        c
    );
}
export { $ as P };
