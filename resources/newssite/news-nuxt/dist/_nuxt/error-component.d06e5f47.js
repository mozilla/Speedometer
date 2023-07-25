import { o as openBlock, c as createBlock, n as normalizeProps, g as guardReactiveProps, u as unref, d as defineAsyncComponent, _ as __vitePreload } from "./entry.185106a5.js";
const _sfc_main = {
  __name: "nuxt-error-page",
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const { error } = props;
    (error.stack || "").split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n");
    const statusCode = Number(error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = error.message || error.toString();
    const stack = void 0;
    const _Error404 = /* @__PURE__ */ defineAsyncComponent(() => __vitePreload(() => import("./error-404.20c1102c.js"), true ? ["./error-404.20c1102c.js","./entry.185106a5.js","./entry.037ba6ce.css","./error-404.90cb55fb.css"] : void 0, import.meta.url).then((r) => r.default || r));
    const _Error = /* @__PURE__ */ defineAsyncComponent(() => __vitePreload(() => import("./error-500.6164ba02.js"), true ? ["./error-500.6164ba02.js","./entry.185106a5.js","./entry.037ba6ce.css","./error-500.95775872.css"] : void 0, import.meta.url).then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ErrorTemplate), normalizeProps(guardReactiveProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) })), null, 16);
    };
  }
};
const _sfc_main$1 = _sfc_main;
export {
  _sfc_main$1 as default
};
