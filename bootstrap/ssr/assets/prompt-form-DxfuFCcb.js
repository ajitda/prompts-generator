import { u as usePage, b as useForm, r as reactExports, j as jsxRuntimeExports, a as router3 } from "../ssr.js";
import { I as InputError } from "./input-error-BAXsLgaJ.js";
import { B as Button } from "./button-CkHcfFL4.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BqcUKBWb.js";
import { L as Label } from "./label-Cz6ecBJd.js";
import { Sparkles, Check, Copy, Save } from "lucide-react";
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
import "@radix-ui/react-label";
function PromptForm() {
  const { auth, session_data } = usePage().props;
  const promptsCanonical = "/youtube/prompts";
  const promptsStore = () => ({ url: promptsCanonical });
  const { data, setData, post, errors, processing, reset } = useForm({
    keyword: session_data?.savedKeyword || "",
    prompt: session_data?.savedPrompt || ""
  });
  const [generatedPrompt, setGeneratedPrompt] = reactExports.useState("");
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(false);
  const handleGenerate = async () => {
    if (!data.keyword.trim()) return;
    setIsGenerating(true);
    try {
      const response = await fetch("/prompts/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector(
            'meta[name="csrf-token"]'
          )?.content || ""
        },
        body: JSON.stringify({
          keyword: data.keyword
        })
      });
      const result = await response.json();
      if (result.success) {
        setGeneratedPrompt(result.prompt);
        toast.success("Prompt generated successfully!");
      } else {
        toast.error(result.message || "Failed to generate prompt");
      }
    } catch (error) {
      console.error("Error generating prompt:", error);
      toast.error("Failed to generate prompt");
    } finally {
      setIsGenerating(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGenerate();
    }
  };
  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!auth?.user) {
      router3.visit("/login");
      return;
    }
    post(promptsStore().url, {
      onSuccess: () => {
        reset();
        setGeneratedPrompt("");
        toast.success("Prompt saved successfully!");
      },
      onError: (errors2) => {
        console.error("Validation Errors:", errors2);
        toast.error("Failed to save. Check requirements.");
      }
    });
  };
  reactExports.useEffect(() => {
    if (session_data?.savedPrompt) {
      const savedPrompt = session_data.savedPrompt;
      setGeneratedPrompt(savedPrompt);
    }
  }, [session_data?.savedPrompt]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Generate Your Prompt" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "grid grid-cols-1 gap-6",
        autoComplete: "off",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "keyword",
                className: "mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300",
                children: "What do you want the AI to do?"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: data.keyword,
                onChange: (e) => setData("keyword", e.target.value),
                onKeyDown: handleKeyDown,
                name: "keyword",
                id: "keyword",
                disabled: processing || isGenerating,
                placeholder: "Example: Write a blog post about sustainable living for beginners",
                className: "min-h-[120px] w-full resize-y rounded-lg border-2 border-gray-200 bg-white p-4 text-gray-900 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-purple-800"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputError, { message: errors.keyword })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-blue-50 p-5 dark:bg-blue-900/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-lg font-semibold text-blue-800 dark:text-blue-300", children: "Quick Examples (Click to use):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
              "Write an email to a client about project delay",
              "Create a study plan for learning Python",
              "Generate a social media post for a coffee shop",
              "Write a product description for a smartwatch"
            ].map((example, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                onClick: () => setData("keyword", example),
                className: "cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: ["📧", "📚", "☕", "💻"][index] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700 dark:text-gray-300", children: example })
                ] })
              },
              index
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleGenerate,
              disabled: !data.keyword.trim() || isGenerating || processing,
              className: "w-full transform cursor-pointer rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-10 py-4 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:from-purple-700 hover:to-purple-900 hover:shadow-lg disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50",
              children: isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mr-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" }),
                "Generating..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mr-2 inline-block h-5 w-5" }),
                "Generate Optimized Prompt"
              ] })
            }
          ) }),
          isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 inline-block h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-purple-600 dark:text-purple-400", children: "Generating your optimized prompt..." })
          ] }),
          generatedPrompt && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-gray-50 p-6 dark:bg-gray-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-xl font-semibold text-gray-900 dark:text-white", children: "Your Optimized Prompt:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[120px] rounded-lg border-l-4 border-purple-500 bg-white p-5 leading-relaxed whitespace-pre-wrap text-gray-700 dark:bg-gray-900 dark:text-gray-300", children: generatedPrompt }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleCopy,
                  disabled: processing,
                  className: "rounded-lg bg-green-600 px-8 py-3 font-medium text-white transition-colors hover:bg-green-700",
                  children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-2 inline-block h-4 w-4" }),
                    "Copied!"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "mr-2 inline-block h-4 w-4" }),
                    "Copy to Clipboard"
                  ] })
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: processing,
                className: "w-full transform rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800 px-10 py-4 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-indigo-900 hover:shadow-lg disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50",
                children: processing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mr-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" }),
                  "Saving..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 inline-block h-5 w-5" }),
                  auth?.user ? "Save Prompt" : "Login to Save Prompt"
                ] })
              }
            ) })
          ] })
        ]
      }
    ) })
  ] }) });
}
export {
  PromptForm as default
};
