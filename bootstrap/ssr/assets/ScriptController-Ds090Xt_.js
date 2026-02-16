import { q as queryParams, a as applyUrlDefaults } from "./index-3UqiGNe9.js";
const indexeead2cc10890942e10f92884e5bdc477 = (options) => ({
  url: indexeead2cc10890942e10f92884e5bdc477.url(options),
  method: "get"
});
indexeead2cc10890942e10f92884e5bdc477.definition = {
  methods: ["get", "head"],
  url: "/youtube"
};
indexeead2cc10890942e10f92884e5bdc477.url = (options) => {
  return indexeead2cc10890942e10f92884e5bdc477.definition.url + queryParams(options);
};
indexeead2cc10890942e10f92884e5bdc477.get = (options) => ({
  url: indexeead2cc10890942e10f92884e5bdc477.url(options),
  method: "get"
});
indexeead2cc10890942e10f92884e5bdc477.head = (options) => ({
  url: indexeead2cc10890942e10f92884e5bdc477.url(options),
  method: "head"
});
const indexeead2cc10890942e10f92884e5bdc477Form = (options) => ({
  action: indexeead2cc10890942e10f92884e5bdc477.url(options),
  method: "get"
});
indexeead2cc10890942e10f92884e5bdc477Form.get = (options) => ({
  action: indexeead2cc10890942e10f92884e5bdc477.url(options),
  method: "get"
});
indexeead2cc10890942e10f92884e5bdc477Form.head = (options) => ({
  action: indexeead2cc10890942e10f92884e5bdc477.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
indexeead2cc10890942e10f92884e5bdc477.form = indexeead2cc10890942e10f92884e5bdc477Form;
const indexe01f7fa0166704d728762cc90ac64200 = (options) => ({
  url: indexe01f7fa0166704d728762cc90ac64200.url(options),
  method: "get"
});
indexe01f7fa0166704d728762cc90ac64200.definition = {
  methods: ["get", "head"],
  url: "/scripts"
};
indexe01f7fa0166704d728762cc90ac64200.url = (options) => {
  return indexe01f7fa0166704d728762cc90ac64200.definition.url + queryParams(options);
};
indexe01f7fa0166704d728762cc90ac64200.get = (options) => ({
  url: indexe01f7fa0166704d728762cc90ac64200.url(options),
  method: "get"
});
indexe01f7fa0166704d728762cc90ac64200.head = (options) => ({
  url: indexe01f7fa0166704d728762cc90ac64200.url(options),
  method: "head"
});
const indexe01f7fa0166704d728762cc90ac64200Form = (options) => ({
  action: indexe01f7fa0166704d728762cc90ac64200.url(options),
  method: "get"
});
indexe01f7fa0166704d728762cc90ac64200Form.get = (options) => ({
  action: indexe01f7fa0166704d728762cc90ac64200.url(options),
  method: "get"
});
indexe01f7fa0166704d728762cc90ac64200Form.head = (options) => ({
  action: indexe01f7fa0166704d728762cc90ac64200.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
indexe01f7fa0166704d728762cc90ac64200.form = indexe01f7fa0166704d728762cc90ac64200Form;
const index = {};
const showaa80e45278a474431e0053ec7e0bb21f = (args, options) => ({
  url: showaa80e45278a474431e0053ec7e0bb21f.url(args, options),
  method: "get"
});
showaa80e45278a474431e0053ec7e0bb21f.definition = {
  methods: ["get", "head"],
  url: "/youtube/{script}"
};
showaa80e45278a474431e0053ec7e0bb21f.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { script: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { script: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      script: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    script: typeof args.script === "object" ? args.script.id : args.script
  };
  return showaa80e45278a474431e0053ec7e0bb21f.definition.url.replace("{script}", parsedArgs.script.toString()).replace(/\/+$/, "") + queryParams(options);
};
showaa80e45278a474431e0053ec7e0bb21f.get = (args, options) => ({
  url: showaa80e45278a474431e0053ec7e0bb21f.url(args, options),
  method: "get"
});
showaa80e45278a474431e0053ec7e0bb21f.head = (args, options) => ({
  url: showaa80e45278a474431e0053ec7e0bb21f.url(args, options),
  method: "head"
});
const showaa80e45278a474431e0053ec7e0bb21fForm = (args, options) => ({
  action: showaa80e45278a474431e0053ec7e0bb21f.url(args, options),
  method: "get"
});
showaa80e45278a474431e0053ec7e0bb21fForm.get = (args, options) => ({
  action: showaa80e45278a474431e0053ec7e0bb21f.url(args, options),
  method: "get"
});
showaa80e45278a474431e0053ec7e0bb21fForm.head = (args, options) => ({
  action: showaa80e45278a474431e0053ec7e0bb21f.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
showaa80e45278a474431e0053ec7e0bb21f.form = showaa80e45278a474431e0053ec7e0bb21fForm;
const show0ad67968511ca3af21ee49a65d71d031 = (args, options) => ({
  url: show0ad67968511ca3af21ee49a65d71d031.url(args, options),
  method: "get"
});
show0ad67968511ca3af21ee49a65d71d031.definition = {
  methods: ["get", "head"],
  url: "/scripts/{script}"
};
show0ad67968511ca3af21ee49a65d71d031.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { script: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { script: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      script: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    script: typeof args.script === "object" ? args.script.id : args.script
  };
  return show0ad67968511ca3af21ee49a65d71d031.definition.url.replace("{script}", parsedArgs.script.toString()).replace(/\/+$/, "") + queryParams(options);
};
show0ad67968511ca3af21ee49a65d71d031.get = (args, options) => ({
  url: show0ad67968511ca3af21ee49a65d71d031.url(args, options),
  method: "get"
});
show0ad67968511ca3af21ee49a65d71d031.head = (args, options) => ({
  url: show0ad67968511ca3af21ee49a65d71d031.url(args, options),
  method: "head"
});
const show0ad67968511ca3af21ee49a65d71d031Form = (args, options) => ({
  action: show0ad67968511ca3af21ee49a65d71d031.url(args, options),
  method: "get"
});
show0ad67968511ca3af21ee49a65d71d031Form.get = (args, options) => ({
  action: show0ad67968511ca3af21ee49a65d71d031.url(args, options),
  method: "get"
});
show0ad67968511ca3af21ee49a65d71d031Form.head = (args, options) => ({
  action: show0ad67968511ca3af21ee49a65d71d031.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show0ad67968511ca3af21ee49a65d71d031.form = show0ad67968511ca3af21ee49a65d71d031Form;
const generateIdeas = (options) => ({
  url: generateIdeas.url(options),
  method: "post"
});
generateIdeas.definition = {
  methods: ["post"],
  url: "/generate/ideas"
};
generateIdeas.url = (options) => {
  return generateIdeas.definition.url + queryParams(options);
};
generateIdeas.post = (options) => ({
  url: generateIdeas.url(options),
  method: "post"
});
const generateIdeasForm = (options) => ({
  action: generateIdeas.url(options),
  method: "post"
});
generateIdeasForm.post = (options) => ({
  action: generateIdeas.url(options),
  method: "post"
});
generateIdeas.form = generateIdeasForm;
const generateStory = (options) => ({
  url: generateStory.url(options),
  method: "post"
});
generateStory.definition = {
  methods: ["post"],
  url: "/generate/story"
};
generateStory.url = (options) => {
  return generateStory.definition.url + queryParams(options);
};
generateStory.post = (options) => ({
  url: generateStory.url(options),
  method: "post"
});
const generateStoryForm = (options) => ({
  action: generateStory.url(options),
  method: "post"
});
generateStoryForm.post = (options) => ({
  action: generateStory.url(options),
  method: "post"
});
generateStory.form = generateStoryForm;
const generateScript = (options) => ({
  url: generateScript.url(options),
  method: "post"
});
generateScript.definition = {
  methods: ["post"],
  url: "/generate/final"
};
generateScript.url = (options) => {
  return generateScript.definition.url + queryParams(options);
};
generateScript.post = (options) => ({
  url: generateScript.url(options),
  method: "post"
});
const generateScriptForm = (options) => ({
  action: generateScript.url(options),
  method: "post"
});
generateScriptForm.post = (options) => ({
  action: generateScript.url(options),
  method: "post"
});
generateScript.form = generateScriptForm;
const generateDetailedScript = (options) => ({
  url: generateDetailedScript.url(options),
  method: "post"
});
generateDetailedScript.definition = {
  methods: ["post"],
  url: "/generate/detailed"
};
generateDetailedScript.url = (options) => {
  return generateDetailedScript.definition.url + queryParams(options);
};
generateDetailedScript.post = (options) => ({
  url: generateDetailedScript.url(options),
  method: "post"
});
const generateDetailedScriptForm = (options) => ({
  action: generateDetailedScript.url(options),
  method: "post"
});
generateDetailedScriptForm.post = (options) => ({
  action: generateDetailedScript.url(options),
  method: "post"
});
generateDetailedScript.form = generateDetailedScriptForm;
const create = (options) => ({
  url: create.url(options),
  method: "get"
});
create.definition = {
  methods: ["get", "head"],
  url: "/scripts/manage/create"
};
create.url = (options) => {
  return create.definition.url + queryParams(options);
};
create.get = (options) => ({
  url: create.url(options),
  method: "get"
});
create.head = (options) => ({
  url: create.url(options),
  method: "head"
});
const createForm = (options) => ({
  action: create.url(options),
  method: "get"
});
createForm.get = (options) => ({
  action: create.url(options),
  method: "get"
});
createForm.head = (options) => ({
  action: create.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
create.form = createForm;
const store = (options) => ({
  url: store.url(options),
  method: "post"
});
store.definition = {
  methods: ["post"],
  url: "/scripts/manage"
};
store.url = (options) => {
  return store.definition.url + queryParams(options);
};
store.post = (options) => ({
  url: store.url(options),
  method: "post"
});
const storeForm = (options) => ({
  action: store.url(options),
  method: "post"
});
storeForm.post = (options) => ({
  action: store.url(options),
  method: "post"
});
store.form = storeForm;
const edit = (args, options) => ({
  url: edit.url(args, options),
  method: "get"
});
edit.definition = {
  methods: ["get", "head"],
  url: "/scripts/manage/{script}/edit"
};
edit.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { script: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { script: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      script: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    script: typeof args.script === "object" ? args.script.id : args.script
  };
  return edit.definition.url.replace("{script}", parsedArgs.script.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit.get = (args, options) => ({
  url: edit.url(args, options),
  method: "get"
});
edit.head = (args, options) => ({
  url: edit.url(args, options),
  method: "head"
});
const editForm = (args, options) => ({
  action: edit.url(args, options),
  method: "get"
});
editForm.get = (args, options) => ({
  action: edit.url(args, options),
  method: "get"
});
editForm.head = (args, options) => ({
  action: edit.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
edit.form = editForm;
const update = (args, options) => ({
  url: update.url(args, options),
  method: "put"
});
update.definition = {
  methods: ["put", "patch"],
  url: "/scripts/manage/{script}"
};
update.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { script: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { script: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      script: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    script: typeof args.script === "object" ? args.script.id : args.script
  };
  return update.definition.url.replace("{script}", parsedArgs.script.toString()).replace(/\/+$/, "") + queryParams(options);
};
update.put = (args, options) => ({
  url: update.url(args, options),
  method: "put"
});
update.patch = (args, options) => ({
  url: update.url(args, options),
  method: "patch"
});
const updateForm = (args, options) => ({
  action: update.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm.put = (args, options) => ({
  action: update.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
updateForm.patch = (args, options) => ({
  action: update.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "PATCH",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
update.form = updateForm;
const destroy = (args, options) => ({
  url: destroy.url(args, options),
  method: "delete"
});
destroy.definition = {
  methods: ["delete"],
  url: "/scripts/manage/{script}"
};
destroy.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { script: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { script: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      script: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    script: typeof args.script === "object" ? args.script.id : args.script
  };
  return destroy.definition.url.replace("{script}", parsedArgs.script.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy.delete = (args, options) => ({
  url: destroy.url(args, options),
  method: "delete"
});
const destroyForm = (args, options) => ({
  action: destroy.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroyForm.delete = (args, options) => ({
  action: destroy.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "post"
});
destroy.form = destroyForm;
const getCredits = (options) => ({
  url: getCredits.url(options),
  method: "get"
});
getCredits.definition = {
  methods: ["get", "head"],
  url: "/user/credits"
};
getCredits.url = (options) => {
  return getCredits.definition.url + queryParams(options);
};
getCredits.get = (options) => ({
  url: getCredits.url(options),
  method: "get"
});
getCredits.head = (options) => ({
  url: getCredits.url(options),
  method: "head"
});
const getCreditsForm = (options) => ({
  action: getCredits.url(options),
  method: "get"
});
getCreditsForm.get = (options) => ({
  action: getCredits.url(options),
  method: "get"
});
getCreditsForm.head = (options) => ({
  action: getCredits.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
getCredits.form = getCreditsForm;
export {
  index as i
};
