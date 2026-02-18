import { b as useForm, j as jsxRuntimeExports, H as Head_default } from "../ssr.js";
import { B as Button } from "./createLucideIcon-DxBA2hfx.js";
import { I as Input } from "./input-BjSWeg-A.js";
import { L as Label } from "./label-ZPBNkTjD.js";
import { E as Editor, T as Textarea, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./Editor-BrhLpcMC.js";
import { A as AppLayout, P as Plus } from "./app-layout-B766uKWo.js";
import { p as posts } from "./index-8HAZ9HbM.js";
import { A as ArrowLeft } from "./arrow-left-DhtKOkIO.js";
import { C as Calendar } from "./calendar-Cq-NUcVG.js";
import "side-channel";
import "axios";
import "laravel-precognition";
import "http";
import "process";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Do_dwBzt.js";
import "@radix-ui/number";
import "@radix-ui/primitive";
import "./dropdown-menu-C5jyS0V-.js";
import "@floating-ui/react-dom";
import "aria-hidden";
import "react-remove-scroll";
import "./index-DR70ZhTK.js";
import "./chevron-down-D42UBSfq.js";
import "./check-2g5mg3H-.js";
import "prop-types";
import "use-sync-external-store/shim";
import "./index-Dye-FuDj.js";
import "./index--D7ld9AJ.js";
import "./video-stECLQZx.js";
import "./message-square-CyQY6ja3.js";
import "./sparkles-BFjwokJ6.js";
import "./chevron-right-Ce1b_jbN.js";
const breadcrumbs = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Blog Management",
    href: posts.index().url
  },
  {
    title: "Compose Article",
    href: posts.create().url
  }
];
function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    content: "",
    status: "draft",
    scheduled_at: "",
    image: null,
    meta_title: "",
    meta_description: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(posts.store().url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head_default, { title: "Compose New Article" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-reveal space-y-8 pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "rounded-xl",
            onClick: () => window.history.back(),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black tracking-tight text-foreground md:text-3xl", children: "Compose New Article" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-medium text-muted-foreground", children: "Draft a new blog post for your audience." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-[32px] border border-border/40 bg-card/50 p-8 shadow-elegant backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "title",
              className: "px-1 text-xs font-black tracking-widest text-muted-foreground uppercase",
              children: "Title"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "title",
              placeholder: "Enter a catchy title...",
              className: "h-14 rounded-xl border-border/40 bg-muted/20 text-lg font-bold focus:ring-primary/20",
              value: data.title,
              onChange: (e) => setData("title", e.target.value)
            }
          ),
          errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-xs font-bold text-destructive", children: errors.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "content",
              className: "px-1 text-xs font-black tracking-widest text-muted-foreground uppercase",
              children: "Content"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Editor,
            {
              onEditorChange: (newValue) => setData("content", newValue),
              value: data.content,
              licenseKey: "gpl",
              init: {
                height: 800,
                menubar: true,
                base_url: "/tinymce",
                suffix: ".min",
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "preview",
                  "help",
                  "wordcount"
                ],
                toolbar: "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style: "body { font-family:Inter,Arial,sans-serif; font-size:14px; background-color: #fcfdfe; }",
                skin: "oxide"
              }
            }
          ) }),
          errors.content && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-xs font-bold text-destructive", children: errors.content })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "meta_title",
                  className: "px-1 text-xs font-black tracking-widest text-muted-foreground uppercase",
                  children: "Meta Title"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "meta_title",
                  placeholder: "SEO optimized title...",
                  className: "h-12 rounded-xl border-border/40 bg-muted/20 focus:ring-primary/20",
                  value: data.meta_title,
                  onChange: (e) => setData(
                    "meta_title",
                    e.target.value
                  )
                }
              ),
              errors.meta_title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-xs font-bold text-destructive", children: errors.meta_title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "meta_description",
                  className: "px-1 text-xs font-black tracking-widest text-muted-foreground uppercase",
                  children: "Meta Description"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "meta_description",
                  placeholder: "Short summary for SEO...",
                  className: "min-h-[120px] rounded-xl border-border/40 bg-muted/20 focus:ring-primary/20",
                  value: data.meta_description,
                  onChange: (e) => setData(
                    "meta_description",
                    e.target.value
                  )
                }
              ),
              errors.meta_description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-xs font-bold text-destructive", children: errors.meta_description })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "status",
                    className: "px-1 text-xs font-black tracking-widest text-muted-foreground uppercase",
                    children: "Status"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: data.status,
                    onValueChange: (value) => setData("status", value),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 rounded-xl border-border/40 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select status" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "draft", children: "Draft" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "scheduled", children: "Scheduled" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "published", children: "Published" })
                      ] })
                    ]
                  }
                ),
                errors.status && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-xs font-bold text-destructive", children: errors.status })
              ] }),
              data.status === "scheduled" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in space-y-2 fade-in slide-in-from-top-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "scheduled_at",
                    className: "px-1 text-xs font-black tracking-widest text-muted-foreground uppercase",
                    children: "Schedule Publishing"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "scheduled_at",
                      type: "datetime-local",
                      className: "h-12 rounded-xl border-border/40 bg-muted/20 focus:ring-primary/20",
                      value: data.scheduled_at,
                      onChange: (e) => setData(
                        "scheduled_at",
                        e.target.value
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted-foreground opacity-50" })
                ] }),
                errors.scheduled_at && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-xs font-bold text-destructive", children: errors.scheduled_at })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "image",
                  className: "px-1 text-xs font-black tracking-widest text-muted-foreground uppercase",
                  children: "Featured Image"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                data.image && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/40 bg-muted/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: URL.createObjectURL(
                        data.image
                      ),
                      alt: "Preview",
                      className: "h-full w-full object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0.5 text-[10px] font-black tracking-[0.2em] text-white/80 uppercase", children: "Preview Mode" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[250px] truncate text-sm font-bold text-white", children: data.image.name })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative flex flex-col gap-4 overflow-hidden rounded-[2rem] border border-dashed border-border/60 bg-muted/5 p-8 transition-all hover:border-primary/40 hover:bg-muted/10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center justify-center space-y-2 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 rounded-full bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-6 w-6" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "Click to upload or drag & drop" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium text-muted-foreground", children: "PNG, JPG or WEBP up to 2MB" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "image",
                      type: "file",
                      className: "absolute inset-0 h-full w-full cursor-pointer opacity-0",
                      onChange: (e) => setData(
                        "image",
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  )
                ] })
              ] }),
              errors.image && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-xs font-bold text-destructive", children: errors.image })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-4 border-t border-border/10 pt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              className: "h-12 rounded-xl px-8 text-[11px] font-black tracking-widest uppercase",
              onClick: () => window.history.back(),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "h-12 rounded-xl px-10 text-[11px] font-black tracking-widest uppercase transition-all hover:scale-[1.02]",
              disabled: processing,
              children: processing ? "Processing..." : data.status === "published" ? "Publish Now" : data.status === "scheduled" ? "Schedule Post" : "Save as Draft"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Create as default
};
