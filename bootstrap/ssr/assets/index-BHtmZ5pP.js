import { a as createLucideIcon } from "./createLucideIcon-BMlcDIBX.js";
import { a as applyUrlDefaults, q as queryParams } from "./index-3UqiGNe9.js";
const __iconNode = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("BookOpen", __iconNode);
const showPublic = (args, options) => ({
  url: showPublic.url(args, options),
  method: "get"
});
showPublic.definition = {
  methods: ["get", "head"],
  url: "/blog/{post}"
};
showPublic.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { post: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "slug" in args) {
    args = { post: args.slug };
  }
  if (Array.isArray(args)) {
    args = {
      post: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    post: typeof args.post === "object" ? args.post.slug : args.post
  };
  return showPublic.definition.url.replace("{post}", parsedArgs.post.toString()).replace(/\/+$/, "") + queryParams(options);
};
showPublic.get = (args, options) => ({
  url: showPublic.url(args, options),
  method: "get"
});
showPublic.head = (args, options) => ({
  url: showPublic.url(args, options),
  method: "head"
});
const showPublicForm = (args, options) => ({
  action: showPublic.url(args, options),
  method: "get"
});
showPublicForm.get = (args, options) => ({
  action: showPublic.url(args, options),
  method: "get"
});
showPublicForm.head = (args, options) => ({
  action: showPublic.url(args, {
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
showPublic.form = showPublicForm;
const indexPublic = (options) => ({
  url: indexPublic.url(options),
  method: "get"
});
indexPublic.definition = {
  methods: ["get", "head"],
  url: "/blog"
};
indexPublic.url = (options) => {
  return indexPublic.definition.url + queryParams(options);
};
indexPublic.get = (options) => ({
  url: indexPublic.url(options),
  method: "get"
});
indexPublic.head = (options) => ({
  url: indexPublic.url(options),
  method: "head"
});
const indexPublicForm = (options) => ({
  action: indexPublic.url(options),
  method: "get"
});
indexPublicForm.get = (options) => ({
  action: indexPublic.url(options),
  method: "get"
});
indexPublicForm.head = (options) => ({
  action: indexPublic.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
indexPublic.form = indexPublicForm;
const index = (options) => ({
  url: index.url(options),
  method: "get"
});
index.definition = {
  methods: ["get", "head"],
  url: "/posts"
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
const create = (options) => ({
  url: create.url(options),
  method: "get"
});
create.definition = {
  methods: ["get", "head"],
  url: "/posts/create"
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
  url: "/posts"
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
const show = (args, options) => ({
  url: show.url(args, options),
  method: "get"
});
show.definition = {
  methods: ["get", "head"],
  url: "/posts/{post}"
};
show.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { post: args };
  }
  if (Array.isArray(args)) {
    args = {
      post: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    post: args.post
  };
  return show.definition.url.replace("{post}", parsedArgs.post.toString()).replace(/\/+$/, "") + queryParams(options);
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
const edit = (args, options) => ({
  url: edit.url(args, options),
  method: "get"
});
edit.definition = {
  methods: ["get", "head"],
  url: "/posts/{post}/edit"
};
edit.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { post: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { post: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      post: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    post: typeof args.post === "object" ? args.post.id : args.post
  };
  return edit.definition.url.replace("{post}", parsedArgs.post.toString()).replace(/\/+$/, "") + queryParams(options);
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
  url: "/posts/{post}"
};
update.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { post: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { post: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      post: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    post: typeof args.post === "object" ? args.post.id : args.post
  };
  return update.definition.url.replace("{post}", parsedArgs.post.toString()).replace(/\/+$/, "") + queryParams(options);
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
  url: "/posts/{post}"
};
destroy.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { post: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { post: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      post: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    post: typeof args.post === "object" ? args.post.id : args.post
  };
  return destroy.definition.url.replace("{post}", parsedArgs.post.toString()).replace(/\/+$/, "") + queryParams(options);
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
const posts = {
  showPublic: Object.assign(showPublic, showPublic),
  indexPublic: Object.assign(indexPublic, indexPublic),
  index: Object.assign(index, index),
  create: Object.assign(create, create),
  store: Object.assign(store, store),
  show: Object.assign(show, show),
  edit: Object.assign(edit, edit),
  update: Object.assign(update, update),
  destroy: Object.assign(destroy, destroy)
};
export {
  BookOpen as B,
  posts as p
};
