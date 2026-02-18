import { q as queryParams } from "./index--D7ld9AJ.js";
const login = (options) => ({
  url: login.url(options),
  method: "get"
});
login.definition = {
  methods: ["get", "head"],
  url: "/login"
};
login.url = (options) => {
  return login.definition.url + queryParams(options);
};
login.get = (options) => ({
  url: login.url(options),
  method: "get"
});
login.head = (options) => ({
  url: login.url(options),
  method: "head"
});
const loginForm = (options) => ({
  action: login.url(options),
  method: "get"
});
loginForm.get = (options) => ({
  action: login.url(options),
  method: "get"
});
loginForm.head = (options) => ({
  action: login.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
login.form = loginForm;
const logout = (options) => ({
  url: logout.url(options),
  method: "post"
});
logout.definition = {
  methods: ["post"],
  url: "/logout"
};
logout.url = (options) => {
  return logout.definition.url + queryParams(options);
};
logout.post = (options) => ({
  url: logout.url(options),
  method: "post"
});
const logoutForm = (options) => ({
  action: logout.url(options),
  method: "post"
});
logoutForm.post = (options) => ({
  action: logout.url(options),
  method: "post"
});
logout.form = logoutForm;
const register = (options) => ({
  url: register.url(options),
  method: "get"
});
register.definition = {
  methods: ["get", "head"],
  url: "/register"
};
register.url = (options) => {
  return register.definition.url + queryParams(options);
};
register.get = (options) => ({
  url: register.url(options),
  method: "get"
});
register.head = (options) => ({
  url: register.url(options),
  method: "head"
});
const registerForm = (options) => ({
  action: register.url(options),
  method: "get"
});
registerForm.get = (options) => ({
  action: register.url(options),
  method: "get"
});
registerForm.head = (options) => ({
  action: register.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
register.form = registerForm;
const home = (options) => ({
  url: home.url(options),
  method: "get"
});
home.definition = {
  methods: ["get", "head"],
  url: "/"
};
home.url = (options) => {
  return home.definition.url + queryParams(options);
};
home.get = (options) => ({
  url: home.url(options),
  method: "get"
});
home.head = (options) => ({
  url: home.url(options),
  method: "head"
});
const homeForm = (options) => ({
  action: home.url(options),
  method: "get"
});
homeForm.get = (options) => ({
  action: home.url(options),
  method: "get"
});
homeForm.head = (options) => ({
  action: home.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
home.form = homeForm;
const privacy = (options) => ({
  url: privacy.url(options),
  method: "get"
});
privacy.definition = {
  methods: ["get", "head"],
  url: "/privacy"
};
privacy.url = (options) => {
  return privacy.definition.url + queryParams(options);
};
privacy.get = (options) => ({
  url: privacy.url(options),
  method: "get"
});
privacy.head = (options) => ({
  url: privacy.url(options),
  method: "head"
});
const privacyForm = (options) => ({
  action: privacy.url(options),
  method: "get"
});
privacyForm.get = (options) => ({
  action: privacy.url(options),
  method: "get"
});
privacyForm.head = (options) => ({
  action: privacy.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
privacy.form = privacyForm;
const terms = (options) => ({
  url: terms.url(options),
  method: "get"
});
terms.definition = {
  methods: ["get", "head"],
  url: "/terms"
};
terms.url = (options) => {
  return terms.definition.url + queryParams(options);
};
terms.get = (options) => ({
  url: terms.url(options),
  method: "get"
});
terms.head = (options) => ({
  url: terms.url(options),
  method: "head"
});
const termsForm = (options) => ({
  action: terms.url(options),
  method: "get"
});
termsForm.get = (options) => ({
  action: terms.url(options),
  method: "get"
});
termsForm.head = (options) => ({
  action: terms.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
terms.form = termsForm;
const dashboard = (options) => ({
  url: dashboard.url(options),
  method: "get"
});
dashboard.definition = {
  methods: ["get", "head"],
  url: "/scripts/dashboard"
};
dashboard.url = (options) => {
  return dashboard.definition.url + queryParams(options);
};
dashboard.get = (options) => ({
  url: dashboard.url(options),
  method: "get"
});
dashboard.head = (options) => ({
  url: dashboard.url(options),
  method: "head"
});
const dashboardForm = (options) => ({
  action: dashboard.url(options),
  method: "get"
});
dashboardForm.get = (options) => ({
  action: dashboard.url(options),
  method: "get"
});
dashboardForm.head = (options) => ({
  action: dashboard.url({
    [options?.mergeQuery ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...options?.query ?? options?.mergeQuery ?? {}
    }
  }),
  method: "get"
});
dashboard.form = dashboardForm;
export {
  logout as a,
  dashboard as d,
  home as h,
  login as l,
  register as r
};
