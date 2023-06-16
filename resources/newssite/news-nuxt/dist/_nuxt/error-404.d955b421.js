import { a as _export_sfc, b as useHead, o as openBlock, e as createElementBlock, f as createBaseVNode, t as toDisplayString, h as createVNode, w as withCtx, i as createTextVNode, j as __nuxt_component_0, p as pushScopeId, k as popScopeId } from "./entry.f4fd6454.js";
const error404_vue_vue_type_style_index_0_scoped_30d2164e_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-30d2164e"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "fixed left-0 right-0 spotlight z-10" }, null, -1));
const _hoisted_3 = { class: "max-w-520px text-center z-20" };
const _hoisted_4 = ["textContent"];
const _hoisted_5 = ["textContent"];
const _hoisted_6 = { class: "w-full flex items-center justify-center" };
const _sfc_main = {
  __name: "error-404",
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    statusCode: {
      type: Number,
      default: 404
    },
    statusMessage: {
      type: String,
      default: "Not Found"
    },
    description: {
      type: String,
      default: "Sorry, the page you are looking for could not be found."
    },
    backHome: {
      type: String,
      default: "Go back home"
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.statusCode} - ${props.statusMessage} | ${props.appName}`,
      script: [],
      style: [
        {
          children: `*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e0e0e0}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, .5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1.5}h1,p{margin:0}h1{font-size:inherit;font-weight:inherit}`
        }
      ]
    });
    return (_ctx, _cache) => {
      const _component_NuxtLink = __nuxt_component_0;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _hoisted_2,
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("h1", {
            class: "text-8xl sm:text-10xl font-medium mb-8",
            textContent: toDisplayString(__props.statusCode)
          }, null, 8, _hoisted_4),
          createBaseVNode("p", {
            class: "text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight",
            textContent: toDisplayString(__props.description)
          }, null, 8, _hoisted_5),
          createBaseVNode("div", _hoisted_6, [
            createVNode(_component_NuxtLink, {
              to: "/",
              class: "gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(__props.backHome), 1)
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
};
const error404 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-30d2164e"]]);
export {
  error404 as default
};
