import { u as useForm, j as jsxRuntimeExports, H as Head_default } from "../ssr.js";
import { B as Button } from "./button-TIWYqyVf.js";
import { I as Input } from "./input-BjgwYVx7.js";
import { L as Label } from "./label-BGQd_FCH.js";
import { T as Textarea } from "./textarea-Du8ce-Bq.js";
import { A as AppLayout } from "./app-layout-DgUhOw1Y.js";
import { p as posts } from "./index-B6anorhi.js";
import { Editor } from "@tinymce/tinymce-react";
import { ArrowLeft, Plus } from "lucide-react";
import "qs";
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
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
import "./index-Cm2O5opL.js";
import "./index--D7ld9AJ.js";
import "./logo-LJNW8YKn.js";
import "@radix-ui/react-collapsible";
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shadow-elegant overflow-hidden rounded-[32px] border border-border/40 bg-card/50 p-8 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
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
              children: processing ? "Processing..." : "Publish Article"
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
