import { q as queryParams, a as applyUrlDefaults } from "./index--D7ld9AJ.js";
const generateStory = (options) => ({
  url: generateStory.url(options),
  method: "post"
});
generateStory.definition = {
  methods: ["post"],
  url: "/scripts/story"
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
  url: "/scripts/final"
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
const generateIdeas = (options) => ({
  url: generateIdeas.url(options),
  method: "post"
});
generateIdeas.definition = {
  methods: ["post"],
  url: "/scripts/ideas"
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
const index = (options) => ({
  url: index.url(options),
  method: "get"
});
index.definition = {
  methods: ["get", "head"],
  url: "/youtube"
};
index.url = (options) => {
  return index.definition.url + queryParams(options);
};
index.get = (options) => ({
  url: index.url(options),
  method: "get"
});
index.head = (options) => ({
  url: index.url(options),
  method: "head"
});
const indexForm = (options) => ({
  action: index.url(options),
  method: "get"
});
indexForm.get = (options) => ({
  action: index.url(options),
  method: "get"
});
indexForm.head = (options) => ({
  action: index.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
index.form = indexForm;
const show = (args, options) => ({
  url: show.url(args, options),
  method: "get"
});
show.definition = {
  methods: ["get", "head"],
  url: "/youtube/{script}"
};
show.url = (args, options) => {
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
  return show.definition.url.replace("{script}", parsedArgs.script.toString()).replace(/\/+$/, "") + queryParams(options);
};
show.get = (args, options) => ({
  url: show.url(args, options),
  method: "get"
});
show.head = (args, options) => ({
  url: show.url(args, options),
  method: "head"
});
const showForm = (args, options) => ({
  action: show.url(args, options),
  method: "get"
});
showForm.get = (args, options) => ({
  action: show.url(args, options),
  method: "get"
});
showForm.head = (args, options) => ({
  action: show.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
show.form = showForm;
const create = (options) => ({
  url: create.url(options),
  method: "get"
});
create.definition = {
  methods: ["get", "head"],
  url: "/youtube/scripts/create"
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
  url: "/youtube/scripts"
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
  url: "/youtube/scripts/{script}/edit"
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
  url: "/youtube/scripts/{script}"
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
  url: "/youtube/scripts/{script}"
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
