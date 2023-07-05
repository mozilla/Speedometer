/*! For license information please see index-f4f65c47759a8c08.js.LICENSE.txt */
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([ [ 405 ], {
    4184: function(e, t) {
        var i;
        !function() {
            "use strict";
            var a = {}.hasOwnProperty;
            function s() {
                for (var e = [], t = 0; t < arguments.length; t++) {
                    var i = arguments[t];
                    if (i) {
                        var l = typeof i;
                        if ("string" === l || "number" === l) e.push(i); else if (Array.isArray(i)) {
                            if (i.length) {
                                var n = s.apply(null, i);
                                n && e.push(n);
                            }
                        } else if ("object" === l) {
                            if (i.toString !== Object.prototype.toString && !i.toString.toString().includes("[native code]")) {
                                e.push(i.toString());
                                continue;
                            }
                            for (var r in i) a.call(i, r) && i[r] && e.push(r);
                        }
                    }
                }
                return e.join(" ");
            }
            e.exports ? (s.default = s, e.exports = s) : void 0 === (i = function() {
                return s;
            }.apply(t, [])) || (e.exports = i);
        }();
    },
    5557: function(e, t, i) {
        (window.__NEXT_P = window.__NEXT_P || []).push([ "/", function() {
            return i(7465);
        } ]);
    },
    3740: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), Object.defineProperty(t, "default", {
            enumerable: !0,
            get: function() {
                return b;
            }
        });
        const a = i(8754), s = i(1757)._(i(7294)), l = a._(i(2636)), n = i(7757), r = i(3735), u = i(3341), c = (i(4210), 
        a._(i(7746))), o = {
            deviceSizes: [ 640, 750, 828, 1080, 1200, 1920, 2048, 3840 ],
            imageSizes: [ 16, 32, 48, 64, 96, 128, 256, 384 ],
            path: "/_next/image",
            loader: "default",
            dangerouslyAllowSVG: !1,
            unoptimized: !0
        };
        new Map;
        function m(e) {
            return void 0 !== e.default;
        }
        function d(e) {
            let {config: t, src: i, unoptimized: a, width: s, quality: l, sizes: n, loader: r} = e;
            if (a) return {
                src: i,
                srcSet: void 0,
                sizes: void 0
            };
            const {widths: u, kind: c} = function(e, t, i) {
                let {deviceSizes: a, allSizes: s} = e;
                if (i) {
                    const e = /(^|\s)(1?\d?\d)vw/g, t = [];
                    for (let a; a = e.exec(i); a) t.push(parseInt(a[2]));
                    if (t.length) {
                        const e = .01 * Math.min(...t);
                        return {
                            widths: s.filter((t => t >= a[0] * e)),
                            kind: "w"
                        };
                    }
                    return {
                        widths: s,
                        kind: "w"
                    };
                }
                return "number" != typeof t ? {
                    widths: a,
                    kind: "w"
                } : {
                    widths: [ ...new Set([ t, 2 * t ].map((e => s.find((t => t >= e)) || s[s.length - 1]))) ],
                    kind: "x"
                };
            }(t, s, n), o = u.length - 1;
            return {
                sizes: n || "w" !== c ? n : "100vw",
                srcSet: u.map(((e, a) => r({
                    config: t,
                    src: i,
                    quality: l,
                    width: e
                }) + " " + ("w" === c ? e : a + 1) + c)).join(", "),
                src: r({
                    config: t,
                    src: i,
                    quality: l,
                    width: u[o]
                })
            };
        }
        function p(e) {
            return void 0 === e ? e : "number" == typeof e ? Number.isFinite(e) ? e : NaN : "string" == typeof e && /^[0-9]+$/.test(e) ? parseInt(e, 10) : NaN;
        }
        function h(e, t, i, a, s, l, n) {
            if (!e || e["data-loaded-src"] === t) return;
            e["data-loaded-src"] = t;
            ("decode" in e ? e.decode() : Promise.resolve()).catch((() => {})).then((() => {
                if (e.parentElement && e.isConnected) {
                    if ("blur" === i && l(!0), null == a ? void 0 : a.current) {
                        const t = new Event("load");
                        Object.defineProperty(t, "target", {
                            writable: !1,
                            value: e
                        });
                        let i = !1, s = !1;
                        a.current({
                            ...t,
                            nativeEvent: t,
                            currentTarget: e,
                            target: e,
                            isDefaultPrevented: () => i,
                            isPropagationStopped: () => s,
                            persist: () => {},
                            preventDefault: () => {
                                i = !0, t.preventDefault();
                            },
                            stopPropagation: () => {
                                s = !0, t.stopPropagation();
                            }
                        });
                    }
                    (null == s ? void 0 : s.current) && s.current(e);
                }
            }));
        }
        function g(e) {
            const [t, i] = s.version.split("."), a = parseInt(t, 10), l = parseInt(i, 10);
            return a > 18 || 18 === a && l >= 3 ? {
                fetchPriority: e
            } : {
                fetchpriority: e
            };
        }
        const v = (0, s.forwardRef)(((e, t) => {
            let {imgAttributes: i, heightInt: a, widthInt: l, qualityInt: n, className: r, imgStyle: u, blurStyle: c, isLazy: o, fetchPriority: m, fill: d, placeholder: p, loading: v, srcString: b, config: q, unoptimized: f, loader: w, onLoadRef: _, onLoadingCompleteRef: y, setBlurComplete: j, setShowAltText: x, onLoad: P, onError: N, ...E} = e;
            return v = o ? "lazy" : v, s.default.createElement(s.default.Fragment, null, s.default.createElement("img", {
                ...E,
                ...g(m),
                loading: v,
                width: l,
                height: a,
                decoding: "async",
                "data-nimg": d ? "fill" : "1",
                className: r,
                style: {
                    ...u,
                    ...c
                },
                ...i,
                ref: (0, s.useCallback)((e => {
                    t && ("function" == typeof t ? t(e) : "object" == typeof t && (t.current = e)), 
                    e && (N && (e.src = e.src), e.complete && h(e, b, p, _, y, j));
                }), [ b, p, _, y, j, N, f, t ]),
                onLoad: e => {
                    h(e.currentTarget, b, p, _, y, j);
                },
                onError: e => {
                    x(!0), "blur" === p && j(!0), N && N(e);
                }
            }));
        })), b = (0, s.forwardRef)(((e, t) => {
            let {src: i, sizes: a, unoptimized: h = !1, priority: b = !1, loading: q, className: f, quality: w, width: _, height: y, fill: j, style: x, onLoad: P, onLoadingComplete: N, placeholder: E = "empty", blurDataURL: S, fetchPriority: k, layout: C, objectFit: A, objectPosition: M, lazyBoundary: I, lazyRoot: T, ...L} = e;
            const U = (0, s.useContext)(u.ImageConfigContext), V = (0, s.useMemo)((() => {
                const e = o || U || r.imageConfigDefault, t = [ ...e.deviceSizes, ...e.imageSizes ].sort(((e, t) => e - t)), i = e.deviceSizes.sort(((e, t) => e - t));
                return {
                    ...e,
                    allSizes: t,
                    deviceSizes: i
                };
            }), [ U ]);
            let R = L, F = R.loader || c.default;
            delete R.loader;
            const O = "__next_img_default" in F;
            if (O) {
                if ("custom" === V.loader) throw new Error('Image with src "' + i + '" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader');
            } else {
                const e = F;
                F = t => {
                    const {config: i, ...a} = t;
                    return e(a);
                };
            }
            if (C) {
                "fill" === C && (j = !0);
                const e = {
                    responsive: "100vw",
                    fill: "100vw"
                }, t = {
                    intrinsic: {
                        maxWidth: "100%",
                        height: "auto"
                    },
                    responsive: {
                        width: "100%",
                        height: "auto"
                    }
                }[C];
                t && (x = {
                    ...x,
                    ...t
                });
                const i = e[C];
                i && !a && (a = i);
            }
            let D, B, z = "", H = p(_), W = p(y);
            if (function(e) {
                return "object" == typeof e && (m(e) || function(e) {
                    return void 0 !== e.src;
                }(e));
            }(i)) {
                const e = m(i) ? i.default : i;
                if (!e.src) throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " + JSON.stringify(e));
                if (!e.height || !e.width) throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " + JSON.stringify(e));
                if (D = e.blurWidth, B = e.blurHeight, S = S || e.blurDataURL, z = e.src, !j) if (H || W) {
                    if (H && !W) {
                        const t = H / e.width;
                        W = Math.round(e.height * t);
                    } else if (!H && W) {
                        const t = W / e.height;
                        H = Math.round(e.width * t);
                    }
                } else H = e.width, W = e.height;
            }
            i = "string" == typeof i ? i : z;
            let Q = !b && ("lazy" === q || void 0 === q);
            (!i || i.startsWith("data:") || i.startsWith("blob:")) && (h = !0, Q = !1), V.unoptimized && (h = !0), 
            O && i.endsWith(".svg") && !V.dangerouslyAllowSVG && (h = !0), b && (k = "high");
            const [G, J] = (0, s.useState)(!1), [K, $] = (0, s.useState)(!1), Z = p(w);
            const Y = Object.assign(j ? {
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectFit: A,
                objectPosition: M
            } : {}, K ? {} : {
                color: "transparent"
            }, x), X = "blur" === E && S && !G ? {
                backgroundSize: Y.objectFit || "cover",
                backgroundPosition: Y.objectPosition || "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundImage: 'url("data:image/svg+xml;charset=utf-8,' + (0, n.getImageBlurSvg)({
                    widthInt: H,
                    heightInt: W,
                    blurWidth: D,
                    blurHeight: B,
                    blurDataURL: S,
                    objectFit: Y.objectFit
                }) + '")'
            } : {};
            const ee = d({
                config: V,
                src: i,
                unoptimized: h,
                width: H,
                quality: Z,
                sizes: a,
                loader: F
            });
            let te = i;
            const ie = (0, s.useRef)(P);
            (0, s.useEffect)((() => {
                ie.current = P;
            }), [ P ]);
            const ae = (0, s.useRef)(N);
            (0, s.useEffect)((() => {
                ae.current = N;
            }), [ N ]);
            const se = {
                isLazy: Q,
                imgAttributes: ee,
                heightInt: W,
                widthInt: H,
                qualityInt: Z,
                className: f,
                imgStyle: Y,
                blurStyle: X,
                loading: q,
                config: V,
                fetchPriority: k,
                fill: j,
                unoptimized: h,
                placeholder: E,
                loader: F,
                srcString: te,
                onLoadRef: ie,
                onLoadingCompleteRef: ae,
                setBlurComplete: J,
                setShowAltText: $,
                ...R
            };
            return s.default.createElement(s.default.Fragment, null, s.default.createElement(v, {
                ...se,
                ref: t
            }), b ? s.default.createElement(l.default, null, s.default.createElement("link", {
                key: "__nimg-" + ee.src + ee.srcSet + ee.sizes,
                rel: "preload",
                as: "image",
                href: ee.srcSet ? void 0 : ee.src,
                imageSrcSet: ee.srcSet,
                imageSizes: ee.sizes,
                crossOrigin: R.crossOrigin,
                ...g(k)
            })) : null);
        }));
        ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
            value: !0
        }), Object.assign(t.default, t), e.exports = t.default);
    },
    7757: function(e, t) {
        "use strict";
        function i(e) {
            let {widthInt: t, heightInt: i, blurWidth: a, blurHeight: s, blurDataURL: l, objectFit: n} = e;
            const r = a && s ? "1" : "20", u = a || t, c = s || i, o = l.startsWith("data:image/jpeg") ? "%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%" : "";
            if (u && c) return "%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 " + u + " " + c + "'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='" + r + "'/%3E" + o + "%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='" + l + "'/%3E%3C/svg%3E";
            return "%3Csvg xmlns='http%3A//www.w3.org/2000/svg'%3E%3Cimage style='filter:blur(20px)' preserveAspectRatio='" + ("contain" === n ? "xMidYMid" : "cover" === n ? "xMidYMid slice" : "none") + "' x='0' y='0' height='100%25' width='100%25' href='" + l + "'/%3E%3C/svg%3E";
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), Object.defineProperty(t, "getImageBlurSvg", {
            enumerable: !0,
            get: function() {
                return i;
            }
        });
    },
    7746: function(e, t) {
        "use strict";
        function i(e) {
            let {config: t, src: i, width: a, quality: s} = e;
            return t.path + "?url=" + encodeURIComponent(i) + "&w=" + a + "&q=" + (s || 75);
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), Object.defineProperty(t, "default", {
            enumerable: !0,
            get: function() {
                return a;
            }
        }), i.__next_img_default = !0;
        const a = i;
    },
    7465: function(e, t, i) {
        "use strict";
        i.r(t), i.d(t, {
            default: function() {
                return hi;
            }
        });
        var a = {};
        i.r(a), i.d(a, {
            login: function() {
                return We;
            },
            more: function() {
                return Qe;
            }
        });
        var s = {};
        i.r(s), i.d(s, {
            a11y: function() {
                return Ke;
            },
            legal: function() {
                return Je;
            },
            social: function() {
                return Ge;
            }
        });
        var l, n = i(5893), r = i(7294);
        function u() {
            return u = Object.assign ? Object.assign.bind() : function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a]);
                }
                return e;
            }, u.apply(this, arguments);
        }
        !function(e) {
            e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
        }(l || (l = {}));
        const c = "popstate";
        function o(e, t) {
            if (!1 === e || null == e) throw new Error(t);
        }
        function m(e, t) {
            if (!e) {
                "undefined" != typeof console && console.warn(t);
                try {
                    throw new Error(t);
                } catch (e) {}
            }
        }
        function d(e, t) {
            return {
                usr: e.state,
                key: e.key,
                idx: t
            };
        }
        function p(e, t, i, a) {
            return void 0 === i && (i = null), u({
                pathname: "string" == typeof e ? e : e.pathname,
                search: "",
                hash: ""
            }, "string" == typeof t ? g(t) : t, {
                state: i,
                key: t && t.key || a || Math.random().toString(36).substr(2, 8)
            });
        }
        function h(e) {
            let {pathname: t = "/", search: i = "", hash: a = ""} = e;
            return i && "?" !== i && (t += "?" === i.charAt(0) ? i : "?" + i), a && "#" !== a && (t += "#" === a.charAt(0) ? a : "#" + a), 
            t;
        }
        function g(e) {
            let t = {};
            if (e) {
                let i = e.indexOf("#");
                i >= 0 && (t.hash = e.substr(i), e = e.substr(0, i));
                let a = e.indexOf("?");
                a >= 0 && (t.search = e.substr(a), e = e.substr(0, a)), e && (t.pathname = e);
            }
            return t;
        }
        function v(e, t, i, a) {
            void 0 === a && (a = {});
            let {window: s = document.defaultView, v5Compat: n = !1} = a, r = s.history, m = l.Pop, g = null, v = b();
            function b() {
                return (r.state || {
                    idx: null
                }).idx;
            }
            function q() {
                m = l.Pop;
                let e = b(), t = null == e ? null : e - v;
                v = e, g && g({
                    action: m,
                    location: w.location,
                    delta: t
                });
            }
            function f(e) {
                let t = "null" !== s.location.origin ? s.location.origin : s.location.href, i = "string" == typeof e ? e : h(e);
                return o(t, "No window.location.(origin|href) available to create URL for href: " + i), 
                new URL(i, t);
            }
            null == v && (v = 0, r.replaceState(u({}, r.state, {
                idx: v
            }), ""));
            let w = {
                get action() {
                    return m;
                },
                get location() {
                    return e(s, r);
                },
                listen(e) {
                    if (g) throw new Error("A history only accepts one active listener");
                    return s.addEventListener(c, q), g = e, () => {
                        s.removeEventListener(c, q), g = null;
                    };
                },
                createHref(e) {
                    return t(s, e);
                },
                createURL: f,
                encodeLocation(e) {
                    let t = f(e);
                    return {
                        pathname: t.pathname,
                        search: t.search,
                        hash: t.hash
                    };
                },
                push: function(e, t) {
                    m = l.Push;
                    let a = p(w.location, e, t);
                    i && i(a, e), v = b() + 1;
                    let u = d(a, v), c = w.createHref(a);
                    try {
                        r.pushState(u, "", c);
                    } catch (e) {
                        s.location.assign(c);
                    }
                    n && g && g({
                        action: m,
                        location: w.location,
                        delta: 1
                    });
                },
                replace: function(e, t) {
                    m = l.Replace;
                    let a = p(w.location, e, t);
                    i && i(a, e), v = b();
                    let s = d(a, v), u = w.createHref(a);
                    r.replaceState(s, "", u), n && g && g({
                        action: m,
                        location: w.location,
                        delta: 0
                    });
                },
                go(e) {
                    return r.go(e);
                }
            };
            return w;
        }
        var b;
        !function(e) {
            e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
        }(b || (b = {}));
        new Set([ "lazy", "caseSensitive", "path", "id", "index", "children" ]);
        function q(e, t, i) {
            void 0 === i && (i = "/");
            let a = M(("string" == typeof t ? g(t) : t).pathname || "/", i);
            if (null == a) return null;
            let s = f(e);
            !function(e) {
                e.sort(((e, t) => e.score !== t.score ? t.score - e.score : function(e, t) {
                    let i = e.length === t.length && e.slice(0, -1).every(((e, i) => e === t[i]));
                    return i ? e[e.length - 1] - t[t.length - 1] : 0;
                }(e.routesMeta.map((e => e.childrenIndex)), t.routesMeta.map((e => e.childrenIndex)))));
            }(s);
            let l = null;
            for (let e = 0; null == l && e < s.length; ++e) l = k(s[e], A(a));
            return l;
        }
        function f(e, t, i, a) {
            void 0 === t && (t = []), void 0 === i && (i = []), void 0 === a && (a = "");
            let s = (e, s, l) => {
                let n = {
                    relativePath: void 0 === l ? e.path || "" : l,
                    caseSensitive: !0 === e.caseSensitive,
                    childrenIndex: s,
                    route: e
                };
                n.relativePath.startsWith("/") && (o(n.relativePath.startsWith(a), 'Absolute route path "' + n.relativePath + '" nested under path "' + a + '" is not valid. An absolute child route path must start with the combined path of all its parent routes.'), 
                n.relativePath = n.relativePath.slice(a.length));
                let r = U([ a, n.relativePath ]), u = i.concat(n);
                e.children && e.children.length > 0 && (o(!0 !== e.index, 'Index routes must not have child routes. Please remove all child routes from route path "' + r + '".'), 
                f(e.children, t, u, r)), (null != e.path || e.index) && t.push({
                    path: r,
                    score: S(r, e.index),
                    routesMeta: u
                });
            };
            return e.forEach(((e, t) => {
                var i;
                if ("" !== e.path && null != (i = e.path) && i.includes("?")) for (let i of w(e.path)) s(e, t, i); else s(e, t);
            })), t;
        }
        function w(e) {
            let t = e.split("/");
            if (0 === t.length) return [];
            let [i, ...a] = t, s = i.endsWith("?"), l = i.replace(/\?$/, "");
            if (0 === a.length) return s ? [ l, "" ] : [ l ];
            let n = w(a.join("/")), r = [];
            return r.push(...n.map((e => "" === e ? l : [ l, e ].join("/")))), s && r.push(...n), 
            r.map((t => e.startsWith("/") && "" === t ? "/" : t));
        }
        const _ = /^:\w+$/, y = 3, j = 2, x = 1, P = 10, N = -2, E = e => "*" === e;
        function S(e, t) {
            let i = e.split("/"), a = i.length;
            return i.some(E) && (a += N), t && (a += j), i.filter((e => !E(e))).reduce(((e, t) => e + (_.test(t) ? y : "" === t ? x : P)), a);
        }
        function k(e, t) {
            let {routesMeta: i} = e, a = {}, s = "/", l = [];
            for (let e = 0; e < i.length; ++e) {
                let n = i[e], r = e === i.length - 1, u = "/" === s ? t : t.slice(s.length) || "/", c = C({
                    path: n.relativePath,
                    caseSensitive: n.caseSensitive,
                    end: r
                }, u);
                if (!c) return null;
                Object.assign(a, c.params);
                let o = n.route;
                l.push({
                    params: a,
                    pathname: U([ s, c.pathname ]),
                    pathnameBase: V(U([ s, c.pathnameBase ])),
                    route: o
                }), "/" !== c.pathnameBase && (s = U([ s, c.pathnameBase ]));
            }
            return l;
        }
        function C(e, t) {
            "string" == typeof e && (e = {
                path: e,
                caseSensitive: !1,
                end: !0
            });
            let [i, a] = function(e, t, i) {
                void 0 === t && (t = !1);
                void 0 === i && (i = !0);
                m("*" === e || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were "' + e.replace(/\*$/, "/*") + '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "' + e.replace(/\*$/, "/*") + '".');
                let a = [], s = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, ((e, t) => (a.push(t), 
                "/([^\\/]+)")));
                e.endsWith("*") ? (a.push("*"), s += "*" === e || "/*" === e ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : i ? s += "\\/*$" : "" !== e && "/" !== e && (s += "(?:(?=\\/|$))");
                let l = new RegExp(s, t ? void 0 : "i");
                return [ l, a ];
            }(e.path, e.caseSensitive, e.end), s = t.match(i);
            if (!s) return null;
            let l = s[0], n = l.replace(/(.)\/+$/, "$1"), r = s.slice(1);
            return {
                params: a.reduce(((e, t, i) => {
                    if ("*" === t) {
                        let e = r[i] || "";
                        n = l.slice(0, l.length - e.length).replace(/(.)\/+$/, "$1");
                    }
                    return e[t] = function(e, t) {
                        try {
                            return decodeURIComponent(e);
                        } catch (i) {
                            return m(!1, 'The value for the URL param "' + t + '" will not be decoded because the string "' + e + '" is a malformed URL segment. This is probably due to a bad percent encoding (' + i + ")."), 
                            e;
                        }
                    }(r[i] || "", t), e;
                }), {}),
                pathname: l,
                pathnameBase: n,
                pattern: e
            };
        }
        function A(e) {
            try {
                return decodeURI(e);
            } catch (t) {
                return m(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (' + t + ")."), 
                e;
            }
        }
        function M(e, t) {
            if ("/" === t) return e;
            if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
            let i = t.endsWith("/") ? t.length - 1 : t.length, a = e.charAt(i);
            return a && "/" !== a ? null : e.slice(i) || "/";
        }
        function I(e, t, i, a) {
            return "Cannot include a '" + e + "' character in a manually specified `to." + t + "` field [" + JSON.stringify(a) + "].  Please separate it out to the `to." + i + '` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.';
        }
        function T(e) {
            return e.filter(((e, t) => 0 === t || e.route.path && e.route.path.length > 0));
        }
        function L(e, t, i, a) {
            let s;
            void 0 === a && (a = !1), "string" == typeof e ? s = g(e) : (s = u({}, e), o(!s.pathname || !s.pathname.includes("?"), I("?", "pathname", "search", s)), 
            o(!s.pathname || !s.pathname.includes("#"), I("#", "pathname", "hash", s)), o(!s.search || !s.search.includes("#"), I("#", "search", "hash", s)));
            let l, n = "" === e || "" === s.pathname, r = n ? "/" : s.pathname;
            if (a || null == r) l = i; else {
                let e = t.length - 1;
                if (r.startsWith("..")) {
                    let t = r.split("/");
                    for (;".." === t[0]; ) t.shift(), e -= 1;
                    s.pathname = t.join("/");
                }
                l = e >= 0 ? t[e] : "/";
            }
            let c = function(e, t) {
                void 0 === t && (t = "/");
                let {pathname: i, search: a = "", hash: s = ""} = "string" == typeof e ? g(e) : e, l = i ? i.startsWith("/") ? i : function(e, t) {
                    let i = t.replace(/\/+$/, "").split("/");
                    return e.split("/").forEach((e => {
                        ".." === e ? i.length > 1 && i.pop() : "." !== e && i.push(e);
                    })), i.length > 1 ? i.join("/") : "/";
                }(i, t) : t;
                return {
                    pathname: l,
                    search: R(a),
                    hash: F(s)
                };
            }(s, l), m = r && "/" !== r && r.endsWith("/"), d = (n || "." === r) && i.endsWith("/");
            return c.pathname.endsWith("/") || !m && !d || (c.pathname += "/"), c;
        }
        const U = e => e.join("/").replace(/\/\/+/g, "/"), V = e => e.replace(/\/+$/, "").replace(/^\/*/, "/"), R = e => e && "?" !== e ? e.startsWith("?") ? e : "?" + e : "", F = e => e && "#" !== e ? e.startsWith("#") ? e : "#" + e : "";
        Error;
        function O(e) {
            return null != e && "number" == typeof e.status && "string" == typeof e.statusText && "boolean" == typeof e.internal && "data" in e;
        }
        const D = [ "post", "put", "patch", "delete" ], B = (new Set(D), [ "get", ...D ]);
        new Set(B), new Set([ 301, 302, 303, 307, 308 ]), new Set([ 307, 308 ]), "undefined" != typeof window && void 0 !== window.document && window.document.createElement;
        Symbol("deferred");
        function z() {
            return z = Object.assign ? Object.assign.bind() : function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a]);
                }
                return e;
            }, z.apply(this, arguments);
        }
        const H = r.createContext(null);
        const W = r.createContext(null);
        const Q = r.createContext(null);
        const G = r.createContext(null);
        const J = r.createContext({
            outlet: null,
            matches: [],
            isDataRoute: !1
        });
        const K = r.createContext(null);
        function $() {
            return null != r.useContext(G);
        }
        function Z() {
            return $() || o(!1), r.useContext(G).location;
        }
        function Y(e) {
            r.useContext(Q).static || r.useLayoutEffect(e);
        }
        function X() {
            let {isDataRoute: e} = r.useContext(J);
            return e ? function() {
                let {router: e} = ce(re.UseNavigateStable), t = me(ue.UseNavigateStable), i = r.useRef(!1);
                return Y((() => {
                    i.current = !0;
                })), r.useCallback((function(a, s) {
                    void 0 === s && (s = {}), i.current && ("number" == typeof a ? e.navigate(a) : e.navigate(a, z({
                        fromRouteId: t
                    }, s)));
                }), [ e, t ]);
            }() : function() {
                $() || o(!1);
                let {basename: e, navigator: t} = r.useContext(Q), {matches: i} = r.useContext(J), {pathname: a} = Z(), s = JSON.stringify(T(i).map((e => e.pathnameBase))), l = r.useRef(!1);
                return Y((() => {
                    l.current = !0;
                })), r.useCallback((function(i, n) {
                    if (void 0 === n && (n = {}), !l.current) return;
                    if ("number" == typeof i) return void t.go(i);
                    let r = L(i, JSON.parse(s), a, "path" === n.relative);
                    "/" !== e && (r.pathname = "/" === r.pathname ? e : U([ e, r.pathname ])), (n.replace ? t.replace : t.push)(r, n.state, n);
                }), [ e, t, s, a ]);
            }();
        }
        function ee(e, t) {
            let {relative: i} = void 0 === t ? {} : t, {matches: a} = r.useContext(J), {pathname: s} = Z(), l = JSON.stringify(T(a).map((e => e.pathnameBase)));
            return r.useMemo((() => L(e, JSON.parse(l), s, "path" === i)), [ e, l, s, i ]);
        }
        function te(e, t, i) {
            $() || o(!1);
            let {navigator: a} = r.useContext(Q), {matches: s} = r.useContext(J), n = s[s.length - 1], u = n ? n.params : {}, c = (n && n.pathname, 
            n ? n.pathnameBase : "/");
            n && n.route;
            let m, d = Z();
            if (t) {
                var p;
                let e = "string" == typeof t ? g(t) : t;
                "/" === c || (null == (p = e.pathname) ? void 0 : p.startsWith(c)) || o(!1), m = e;
            } else m = d;
            let h = m.pathname || "/", v = q(e, {
                pathname: "/" === c ? h : h.slice(c.length) || "/"
            });
            let b = ne(v && v.map((e => Object.assign({}, e, {
                params: Object.assign({}, u, e.params),
                pathname: U([ c, a.encodeLocation ? a.encodeLocation(e.pathname).pathname : e.pathname ]),
                pathnameBase: "/" === e.pathnameBase ? c : U([ c, a.encodeLocation ? a.encodeLocation(e.pathnameBase).pathname : e.pathnameBase ])
            }))), s, i);
            return t && b ? r.createElement(G.Provider, {
                value: {
                    location: z({
                        pathname: "/",
                        search: "",
                        hash: "",
                        state: null,
                        key: "default"
                    }, m),
                    navigationType: l.Pop
                }
            }, b) : b;
        }
        function ie() {
            let e = function() {
                var e;
                let t = r.useContext(K), i = oe(ue.UseRouteError), a = me(ue.UseRouteError);
                if (t) return t;
                return null == (e = i.errors) ? void 0 : e[a];
            }(), t = O(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), i = e instanceof Error ? e.stack : null, a = "rgba(200,200,200, 0.5)", s = {
                padding: "0.5rem",
                backgroundColor: a
            };
            return r.createElement(r.Fragment, null, r.createElement("h2", null, "Unexpected Application Error!"), r.createElement("h3", {
                style: {
                    fontStyle: "italic"
                }
            }, t), i ? r.createElement("pre", {
                style: s
            }, i) : null, null);
        }
        const ae = r.createElement(ie, null);
        class se extends r.Component {
            constructor(e) {
                super(e), this.state = {
                    location: e.location,
                    revalidation: e.revalidation,
                    error: e.error
                };
            }
            static getDerivedStateFromError(e) {
                return {
                    error: e
                };
            }
            static getDerivedStateFromProps(e, t) {
                return t.location !== e.location || "idle" !== t.revalidation && "idle" === e.revalidation ? {
                    error: e.error,
                    location: e.location,
                    revalidation: e.revalidation
                } : {
                    error: e.error || t.error,
                    location: t.location,
                    revalidation: e.revalidation || t.revalidation
                };
            }
            componentDidCatch(e, t) {
                console.error("React Router caught the following error during render", e, t);
            }
            render() {
                return this.state.error ? r.createElement(J.Provider, {
                    value: this.props.routeContext
                }, r.createElement(K.Provider, {
                    value: this.state.error,
                    children: this.props.component
                })) : this.props.children;
            }
        }
        function le(e) {
            let {routeContext: t, match: i, children: a} = e, s = r.useContext(H);
            return s && s.static && s.staticContext && (i.route.errorElement || i.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = i.route.id), 
            r.createElement(J.Provider, {
                value: t
            }, a);
        }
        function ne(e, t, i) {
            var a;
            if (void 0 === t && (t = []), void 0 === i && (i = null), null == e) {
                var s;
                if (null == (s = i) || !s.errors) return null;
                e = i.matches;
            }
            let l = e, n = null == (a = i) ? void 0 : a.errors;
            if (null != n) {
                let e = l.findIndex((e => e.route.id && (null == n ? void 0 : n[e.route.id])));
                e >= 0 || o(!1), l = l.slice(0, Math.min(l.length, e + 1));
            }
            return l.reduceRight(((e, a, s) => {
                let u = a.route.id ? null == n ? void 0 : n[a.route.id] : null, c = null;
                i && (c = a.route.errorElement || ae);
                let o = t.concat(l.slice(0, s + 1)), m = () => {
                    let t;
                    return t = u ? c : a.route.Component ? r.createElement(a.route.Component, null) : a.route.element ? a.route.element : e, 
                    r.createElement(le, {
                        match: a,
                        routeContext: {
                            outlet: e,
                            matches: o,
                            isDataRoute: null != i
                        },
                        children: t
                    });
                };
                return i && (a.route.ErrorBoundary || a.route.errorElement || 0 === s) ? r.createElement(se, {
                    location: i.location,
                    revalidation: i.revalidation,
                    component: c,
                    error: u,
                    children: m(),
                    routeContext: {
                        outlet: null,
                        matches: o,
                        isDataRoute: !0
                    }
                }) : m();
            }), null);
        }
        var re, ue;
        function ce(e) {
            let t = r.useContext(H);
            return t || o(!1), t;
        }
        function oe(e) {
            let t = r.useContext(W);
            return t || o(!1), t;
        }
        function me(e) {
            let t = function(e) {
                let t = r.useContext(J);
                return t || o(!1), t;
            }(), i = t.matches[t.matches.length - 1];
            return i.route.id || o(!1), i.route.id;
        }
        !function(e) {
            e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate";
        }(re || (re = {})), function(e) {
            e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", 
            e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", 
            e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", 
            e.UseRouteId = "useRouteId";
        }(ue || (ue = {}));
        function de(e) {
            o(!1);
        }
        function pe(e) {
            let {basename: t = "/", children: i = null, location: a, navigationType: s = l.Pop, navigator: n, static: u = !1} = e;
            $() && o(!1);
            let c = t.replace(/^\/*/, "/"), m = r.useMemo((() => ({
                basename: c,
                navigator: n,
                static: u
            })), [ c, n, u ]);
            "string" == typeof a && (a = g(a));
            let {pathname: d = "/", search: p = "", hash: h = "", state: v = null, key: b = "default"} = a, q = r.useMemo((() => {
                let e = M(d, c);
                return null == e ? null : {
                    location: {
                        pathname: e,
                        search: p,
                        hash: h,
                        state: v,
                        key: b
                    },
                    navigationType: s
                };
            }), [ c, d, p, h, v, b, s ]);
            return null == q ? null : r.createElement(Q.Provider, {
                value: m
            }, r.createElement(G.Provider, {
                children: i,
                value: q
            }));
        }
        function he(e) {
            let {children: t, location: i} = e;
            return te(ve(t), i);
        }
        var ge;
        !function(e) {
            e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error";
        }(ge || (ge = {}));
        new Promise((() => {}));
        r.Component;
        function ve(e, t) {
            void 0 === t && (t = []);
            let i = [];
            return r.Children.forEach(e, ((e, a) => {
                if (!r.isValidElement(e)) return;
                let s = [ ...t, a ];
                if (e.type === r.Fragment) return void i.push.apply(i, ve(e.props.children, s));
                e.type !== de && o(!1), e.props.index && e.props.children && o(!1);
                let l = {
                    id: e.props.id || s.join("-"),
                    caseSensitive: e.props.caseSensitive,
                    element: e.props.element,
                    Component: e.props.Component,
                    index: e.props.index,
                    path: e.props.path,
                    loader: e.props.loader,
                    action: e.props.action,
                    errorElement: e.props.errorElement,
                    ErrorBoundary: e.props.ErrorBoundary,
                    hasErrorBoundary: null != e.props.ErrorBoundary || null != e.props.errorElement,
                    shouldRevalidate: e.props.shouldRevalidate,
                    handle: e.props.handle,
                    lazy: e.props.lazy
                };
                e.props.children && (l.children = ve(e.props.children, s)), i.push(l);
            })), i;
        }
        function be() {
            return be = Object.assign ? Object.assign.bind() : function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a]);
                }
                return e;
            }, be.apply(this, arguments);
        }
        function qe(e, t) {
            if (null == e) return {};
            var i, a, s = {}, l = Object.keys(e);
            for (a = 0; a < l.length; a++) i = l[a], t.indexOf(i) >= 0 || (s[i] = e[i]);
            return s;
        }
        const fe = [ "onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset" ], we = [ "aria-current", "caseSensitive", "className", "end", "style", "to", "children" ];
        function _e(e) {
            let {basename: t, children: i, window: a} = e, s = r.useRef();
            var l;
            null == s.current && (s.current = (void 0 === (l = {
                window: a,
                v5Compat: !0
            }) && (l = {}), v((function(e, t) {
                let {pathname: i = "/", search: a = "", hash: s = ""} = g(e.location.hash.substr(1));
                return p("", {
                    pathname: i,
                    search: a,
                    hash: s
                }, t.state && t.state.usr || null, t.state && t.state.key || "default");
            }), (function(e, t) {
                let i = e.document.querySelector("base"), a = "";
                if (i && i.getAttribute("href")) {
                    let t = e.location.href, i = t.indexOf("#");
                    a = -1 === i ? t : t.slice(0, i);
                }
                return a + "#" + ("string" == typeof t ? t : h(t));
            }), (function(e, t) {
                m("/" === e.pathname.charAt(0), "relative pathnames are not supported in hash history.push(" + JSON.stringify(t) + ")");
            }), l)));
            let n = s.current, [u, c] = r.useState({
                action: n.action,
                location: n.location
            });
            return r.useLayoutEffect((() => n.listen(c)), [ n ]), r.createElement(pe, {
                basename: t,
                children: i,
                location: u.location,
                navigationType: u.action,
                navigator: n
            });
        }
        const ye = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement, je = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, xe = r.forwardRef((function(e, t) {
            let i, {onClick: a, relative: s, reloadDocument: l, replace: n, state: u, target: c, to: m, preventScrollReset: d} = e, p = qe(e, fe), {basename: g} = r.useContext(Q), v = !1;
            if ("string" == typeof m && je.test(m) && (i = m, ye)) try {
                let e = new URL(window.location.href), t = m.startsWith("//") ? new URL(e.protocol + m) : new URL(m), i = M(t.pathname, g);
                t.origin === e.origin && null != i ? m = i + t.search + t.hash : v = !0;
            } catch (e) {}
            let b = function(e, t) {
                let {relative: i} = void 0 === t ? {} : t;
                $() || o(!1);
                let {basename: a, navigator: s} = r.useContext(Q), {hash: l, pathname: n, search: u} = ee(e, {
                    relative: i
                }), c = n;
                return "/" !== a && (c = "/" === n ? a : U([ a, n ])), s.createHref({
                    pathname: c,
                    search: u,
                    hash: l
                });
            }(m, {
                relative: s
            }), q = function(e, t) {
                let {target: i, replace: a, state: s, preventScrollReset: l, relative: n} = void 0 === t ? {} : t, u = X(), c = Z(), o = ee(e, {
                    relative: n
                });
                return r.useCallback((t => {
                    if (function(e, t) {
                        return !(0 !== e.button || t && "_self" !== t || function(e) {
                            return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
                        }(e));
                    }(t, i)) {
                        t.preventDefault();
                        let i = void 0 !== a ? a : h(c) === h(o);
                        u(e, {
                            replace: i,
                            state: s,
                            preventScrollReset: l,
                            relative: n
                        });
                    }
                }), [ c, u, o, a, s, i, e, l, n ]);
            }(m, {
                replace: n,
                state: u,
                target: c,
                preventScrollReset: d,
                relative: s
            });
            return r.createElement("a", be({}, p, {
                href: i || b,
                onClick: v || l ? a : function(e) {
                    a && a(e), e.defaultPrevented || q(e);
                },
                ref: t,
                target: c
            }));
        }));
        const Pe = r.forwardRef((function(e, t) {
            let {"aria-current": i = "page", caseSensitive: a = !1, className: s = "", end: l = !1, style: n, to: u, children: c} = e, o = qe(e, we), m = ee(u, {
                relative: o.relative
            }), d = Z(), p = r.useContext(W), {navigator: h} = r.useContext(Q), g = h.encodeLocation ? h.encodeLocation(m).pathname : m.pathname, v = d.pathname, b = p && p.navigation && p.navigation.location ? p.navigation.location.pathname : null;
            a || (v = v.toLowerCase(), b = b ? b.toLowerCase() : null, g = g.toLowerCase());
            let q, f = v === g || !l && v.startsWith(g) && "/" === v.charAt(g.length), w = null != b && (b === g || !l && b.startsWith(g) && "/" === b.charAt(g.length)), _ = f ? i : void 0;
            q = "function" == typeof s ? s({
                isActive: f,
                isPending: w
            }) : [ s, f ? "active" : null, w ? "pending" : null ].filter(Boolean).join(" ");
            let y = "function" == typeof n ? n({
                isActive: f,
                isPending: w
            }) : n;
            return r.createElement(xe, be({}, o, {
                "aria-current": _,
                className: q,
                ref: t,
                style: y,
                to: u
            }), "function" == typeof c ? c({
                isActive: f,
                isPending: w
            }) : c);
        }));
        var Ne, Ee;
        (function(e) {
            e.UseScrollRestoration = "useScrollRestoration", e.UseSubmitImpl = "useSubmitImpl", 
            e.UseFetcher = "useFetcher";
        })(Ne || (Ne = {})), function(e) {
            e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
        }(Ee || (Ee = {}));
        var Se = i(3935), ke = function() {
            return ke = Object.assign || function(e) {
                for (var t, i = 1, a = arguments.length; i < a; i++) for (var s in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
                return e;
            }, ke.apply(this, arguments);
        };
        var Ce = "", Ae = null, Me = null, Ie = null;
        function Te() {
            Ce = "", null !== Ae && Ae.disconnect(), null !== Me && (window.clearTimeout(Me), 
            Me = null);
        }
        function Le(e) {
            return [ "BUTTON", "INPUT", "SELECT", "TEXTAREA" ].includes(e.tagName) && !e.hasAttribute("disabled") || [ "A", "AREA" ].includes(e.tagName) && e.hasAttribute("href");
        }
        function Ue() {
            var e = null;
            if ("#" === Ce) e = document.body; else {
                var t = Ce.replace("#", "");
                null === (e = document.getElementById(t)) && "#top" === Ce && (e = document.body);
            }
            if (null !== e) {
                Ie(e);
                var i = e.getAttribute("tabindex");
                return null !== i || Le(e) || e.setAttribute("tabindex", -1), e.focus({
                    preventScroll: !0
                }), null !== i || Le(e) || (e.blur(), e.removeAttribute("tabindex")), Te(), !0;
            }
            return !1;
        }
        function Ve(e) {
            return r.forwardRef((function(t, i) {
                var a = "";
                "string" == typeof t.to && t.to.includes("#") ? a = "#" + t.to.split("#").slice(1).join("#") : "object" == typeof t.to && "string" == typeof t.to.hash && (a = t.to.hash);
                var s = {};
                e === Pe && (s.isActive = function(e, t) {
                    return e && e.isExact && t.hash === a;
                });
                var l = function(e, t) {
                    var i = {};
                    for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (i[a] = e[a]);
                    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                        var s = 0;
                        for (a = Object.getOwnPropertySymbols(e); s < a.length; s++) t.indexOf(a[s]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[s]) && (i[a[s]] = e[a[s]]);
                    }
                    return i;
                }(t, [ "scroll", "smooth", "timeout", "elementId" ]);
                return r.createElement(e, ke({}, s, l, {
                    onClick: function(e) {
                        var i;
                        Te(), Ce = t.elementId ? "#" + t.elementId : a, t.onClick && t.onClick(e), "" === Ce || e.defaultPrevented || 0 !== e.button || t.target && "_self" !== t.target || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || (Ie = t.scroll || function(e) {
                            return t.smooth ? e.scrollIntoView({
                                behavior: "smooth"
                            }) : e.scrollIntoView();
                        }, i = t.timeout, window.setTimeout((function() {
                            !1 === Ue() && (null === Ae && (Ae = new MutationObserver(Ue)), Ae.observe(document, {
                                attributes: !0,
                                childList: !0,
                                subtree: !0
                            }), Me = window.setTimeout((function() {
                                Te();
                            }), i || 1e4));
                        }), 0));
                    },
                    ref: i
                }), t.children);
            }));
        }
        var Re = Ve(xe);
        Ve(Pe);
        function Fe() {
            return (0, n.jsxs)("svg", {
                viewBox: "0 0 469 64",
                width: "469",
                height: "64",
                children: [ (0, n.jsx)("title", {
                    children: "The Daily Broadcast"
                }), (0, n.jsx)("path", {
                    d: "m16.7 56h-10.3v-41.7h-6.1v-9.9h22.5v9.9h-6.1zm19.6 0h-10.8v-51.5h10.8v12q0.8-2.5 2.6-3.7 1.8-1.2 4.1-1.2 4.6 0 6.7 2.9 2 2.9 2 7.7v33.8h-10.6v-33.1q0-1.5-0.6-2.4-0.6-0.9-1.9-0.9-1 0-1.7 1-0.6 0.9-0.6 2.2zm31.8 0.5q-4.6 0-7.4-1.8-2.8-1.8-4-5.1-1.2-3.3-1.2-7.9v-17.7q0-6.1 3.5-9.3 3.5-3.1 9.7-3.1 12.6 0 12.6 12.4v3.2q0 5.8-0.1 7.8h-15.2v8.5q0 1.2 0.1 2.3 0.2 1.1 0.7 1.8 0.5 0.8 1.6 0.8 1.7 0 2.1-1.4 0.4-1.5 0.4-3.8v-4.2h10.4v2.5q0 4.9-1.2 8.3-1.2 3.3-4.1 5-2.9 1.7-7.9 1.7zm-2.2-32.7v6h5v-6q0-2.3-0.6-3.3-0.6-1.1-1.8-1.1-1.2 0-1.9 1-0.7 1-0.7 3.4zm47.3 32.2h-13.8v-51.6h14.1q5.6 0 8.4 3.1 2.8 3.1 2.8 9.1v24.1q0 7.3-2.5 11.3-2.6 4-9 4zm-3.5-42.6v33.5h1.8q2.9 0 2.9-2.8v-26.6q0-2.6-0.7-3.3-0.7-0.8-2.8-0.8zm27 43.1q-3.6 0-5.6-1.7-1.9-1.7-2.6-4.7-0.7-3-0.7-6.7 0-4 0.8-6.6 0.8-2.6 2.7-4.2 1.9-1.6 5.3-2.8l6.5-2.2v-4.5q0-3.6-2.3-3.6-2.1 0-2.1 2.9v2.7h-10.2q0-0.3 0-0.6 0-0.4 0-0.9 0-6.5 3-9.3 3.1-2.7 9.9-2.7 3.5 0 6.3 1.2 2.7 1.3 4.3 3.7 1.7 2.4 1.7 6v33.5h-10.4v-5.2q-0.8 2.7-2.6 4.2-1.7 1.5-4 1.5zm4.2-8.2q1.2 0 1.7-1.1 0.5-1.1 0.5-2.3v-12.3q-2.2 0.9-3.4 2.3-1.2 1.3-1.2 3.9v5.6q0 3.9 2.4 3.9zm27.3-39h-10.5v-8.7h10.5zm0 46.7h-10.5v-44h10.5zm14.8 0h-10.7v-51.6h10.7zm15.2 7.4h-11.8v-6.7h5q1.1 0 1.1-0.8 0-0.4-0.1-0.8l-6.8-43h10l2.9 32.3 3.5-32.3h10.1l-8.1 46.2q-0.5 2.5-1.7 3.8-1.3 1.3-4.1 1.3zm44.9-7.4h-14v-51.5h14q5.6 0 8.1 2.7 2.6 2.8 2.6 9.1v2.2q0 3.7-1.3 5.9-1.3 2.3-3.9 3 3.4 0.8 4.6 4.1 1.2 3.2 1.2 7.9 0 5-0.9 8.7-1 3.8-3.4 5.9-2.5 2-7 2zm-3.9-43.5v11.4h2.1q1.4 0 1.8-1.1 0.4-1.1 0.4-2.7v-5.2q0-2.4-2.2-2.4zm1.1 34.5q4 0 4-3.8v-6.5q0-2.2-0.7-3.4-0.6-1.3-2.5-1.3h-1.9v14.9q0.7 0.1 1.1 0.1zm28.1 9h-10.7v-43.9h10.7v4.9q0.7-2.6 2.7-4 1.9-1.4 4.8-1.4v8.7q-1.3 0-3.1 0.3-1.7 0.3-3.1 0.8-1.3 0.5-1.3 1zm22.9 0.5q-13.1 0-13.1-13.6v-17.6q0-6.3 3.4-9.9 3.5-3.8 9.7-3.8 6.2 0 9.6 3.8 3.5 3.6 3.5 9.9v17.6q0 13.6-13.1 13.6zm0-8.1q1.3 0 1.9-0.9 0.5-1 0.5-2.4v-21.5q0-3.9-2.4-3.9-2.5 0-2.5 3.9v21.5q0 1.4 0.6 2.4 0.6 0.9 1.9 0.9zm25 8.1q-3.7 0-5.6-1.7-1.9-1.7-2.6-4.6-0.7-3-0.7-6.8 0-4 0.8-6.5 0.8-2.6 2.7-4.2 1.9-1.7 5.3-2.8l6.5-2.2v-4.6q0-3.5-2.3-3.5-2.1 0-2.1 2.9v2.6h-10.2q-0.1-0.2-0.1-0.6 0-0.4 0-0.8 0-6.6 3.1-9.3 3.1-2.8 9.8-2.8 3.5 0 6.3 1.3 2.8 1.2 4.4 3.7 1.7 2.4 1.7 6v33.4h-10.5v-5.2q-0.7 2.8-2.5 4.3-1.7 1.4-4 1.4zm4.1-8.1q1.3 0 1.8-1.1 0.5-1.1 0.5-2.4v-12.2q-2.2 0.9-3.4 2.2-1.2 1.3-1.2 3.9v5.7q0 3.9 2.3 3.9zm25.5 8.1q-3 0-4.8-1.1-1.8-1.1-2.7-3.1-0.8-1.9-1.1-4.6-0.3-2.6-0.3-5.6v-19.1q0-5.1 1.8-8.2 1.8-3.2 6.1-3.2 3.2 0 4.9 1.4 1.7 1.4 2.7 3.8v-12.3h10.6v51.5h-10.6v-4.6q-0.9 2.4-2.4 3.7-1.4 1.4-4.2 1.4zm4.1-8.2q1.5 0 1.9-1.2 0.6-1.2 0.6-4.3v-18.5q0-1.5-0.5-3-0.4-1.6-2-1.6-1.7 0-2.1 1.5-0.5 1.4-0.5 3.1v18.5q0 5.5 2.6 5.5zm30.4 8.2q-7.4 0-10.5-3.8-3.1-3.7-3.1-11.1v-13.5q0-5.5 1.2-9.2 1.2-3.6 4.1-5.5 2.9-1.8 8.1-1.8 3.7 0 6.6 1.3 2.9 1.3 4.5 3.8 1.7 2.5 1.7 6.1v6.7h-10.7v-6.1q0-1.6-0.4-2.6-0.5-1.1-1.9-1.1-2.6 0-2.6 3.7v21.3q0 1.4 0.6 2.5 0.6 1.1 1.9 1.1 1.4 0 1.9-1.1 0.6-1.1 0.6-2.6v-7.3h10.6v7.6q0 3.7-1.6 6.3-1.7 2.6-4.5 3.9-2.8 1.4-6.5 1.4zm24.3 0q-3.7 0-5.6-1.7-1.9-1.7-2.6-4.6-0.8-3-0.8-6.8 0-4 0.8-6.5 0.8-2.6 2.7-4.2 2-1.7 5.3-2.8l6.5-2.2v-4.6q0-3.5-2.3-3.5-2.1 0-2.1 2.9v2.6h-10.2q0-0.2 0-0.6 0-0.4 0-0.8 0-6.6 3.1-9.3 3.1-2.8 9.8-2.8 3.5 0 6.3 1.3 2.8 1.2 4.4 3.7 1.6 2.4 1.6 6v33.4h-10.4v-5.2q-0.8 2.8-2.5 4.3-1.8 1.4-4 1.4zm4.1-8.1q1.3 0 1.7-1.1 0.5-1.1 0.5-2.4v-12.2q-2.2 0.9-3.4 2.2-1.2 1.3-1.2 3.9v5.7q0 3.9 2.4 3.9zm28.9 8.1q-13 0-13-13.2v-3.5h10.5v5.2q0 1.5 0.6 2.3 0.6 0.9 1.9 0.9 2.3 0 2.3-3.4 0-2.9-1.2-4.3-1.2-1.4-2.9-2.8l-5.6-4.3q-2.7-2-4.1-4.3-1.3-2.3-1.3-6.4 0-3.7 1.8-6.2 1.8-2.5 4.7-3.7 3-1.2 6.5-1.2 12.8 0 12.8 12.8v0.8h-10.9v-1.7q0-1.3-0.5-2.5-0.4-1.3-1.7-1.3-2.2 0-2.2 2.4 0 2.4 1.8 3.7l6.5 4.8q3.1 2.2 5.1 5.2 2.1 3 2.1 8 0 6.2-3.5 9.5-3.5 3.2-9.7 3.2zm25.5 0q-4.3 0-5.8-1.8-1.4-1.8-1.4-5.5v-27.4h-3v-8h3v-9.3h10.1v9.3h3v8h-3v24.9q0 1.1 0.4 1.6 0.4 0.4 1.3 0.4 0.8 0 1.3-0.1v7.1q-0.3 0.1-2.2 0.5-1.8 0.3-3.7 0.3z"
                }) ]
            });
        }
        var Oe = i(9319), De = i.n(Oe);
        function Be() {
            return (0, n.jsx)("header", {
                className: De()["page-header"],
                children: (0, n.jsx)(xe, {
                    to: "/",
                    className: De()["page-header-title"],
                    children: (0, n.jsx)(Fe, {})
                })
            });
        }
        var ze = i(4184), He = i.n(ze);
        const We = {
            label: "Log In",
            href: "#",
            target: "internal"
        }, Qe = {
            label: "More",
            href: "#",
            target: "internal"
        }, Ge = {
            facebook: {
                label: "Facebook",
                href: "#",
                target: "external"
            },
            instagram: {
                label: "Instagram",
                href: "#",
                target: "external"
            },
            twitter: {
                label: "Twitter",
                href: "#",
                target: "external"
            }
        }, Je = {
            terms: {
                label: "Terms of Use",
                href: "#",
                target: "external"
            },
            privacy: {
                label: "Privacy Policy",
                href: "#",
                target: "external"
            },
            sell: {
                label: "Do Not Sell Or Share My Personal Information",
                href: "#",
                target: "external"
            },
            choices: {
                label: "Ad Choices",
                href: "#",
                target: "external"
            }
        }, Ke = {
            skip: {
                label: "Skip to content"
            }
        }, $e = {
            en: {
                content: {
                    home: {
                        name: "Front Page",
                        url: "/",
                        priority: 0,
                        notification: {
                            name: "cookies",
                            title: "This website uses cookies 🍪",
                            description: "We use cookies to improve your experience on our site and to show you the most relevant content possible. To find out more, please read our privacy policy and our cookie policy.",
                            actions: [ {
                                name: "Cancel",
                                priority: "secondary",
                                type: "reject"
                            }, {
                                name: "Accept",
                                priority: "primary",
                                type: "accept"
                            } ]
                        },
                        sections: [ {
                            id: "content-frontpage-breaking-news",
                            name: "Breaking News",
                            articles: [ {
                                class: "columns-3-narrow",
                                header: "Uncensored",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Nisl nunc mi ipsum faucibus vitae aliquet.",
                                type: "text",
                                content: "Velit dignissim sodales ut eu. Sed tempus urna et pharetra. Porttitor rhoncus dolor purus non. Elementum curabitur vitae nunc sed velit dignissim sodales.\n\nPretium fusce id velit ut tortor pretium viverra suspendisse potenti. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Nunc mi ipsum faucibus vitae aliquet."
                            }, {
                                class: "columns-3-wide",
                                header: "More top stories",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone.",
                                    tag: {
                                        type: "breaking",
                                        label: "breaking"
                                    }
                                },
                                title: "Justo eget magna fermentum iaculis eu non diam phasellus vestibulum.",
                                type: "text",
                                content: "Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Arcu bibendum at varius vel pharetra vel turpis nunc. Eget dolor morbi non arcu risus quis varius. Ac odio tempor orci dapibus ultrices in.\n\nAmet tellus cras adipiscing enim eu turpis. Tortor pretium viverra suspendisse potenti nullam. Condimentum vitae sapien pellentesque habitant morbi. Ultrices in iaculis nunc sed augue lacus viverra vitae."
                            }, {
                                class: "columns-3-narrow",
                                header: "Crime & justice",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Eu sem integer vitae justo eget magna fermentum iaculis.",
                                type: "text",
                                content: "Volutpat commodo sed egestas egestas. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Felis eget velit aliquet sagittis id consectetur purus. Lorem ipsum dolor sit amet. Ut diam quam nulla porttitor. Id volutpat lacus laoreet non.\n\n Odio morbi quis commodo odio aenean sed adipiscing diam donec. Quis eleifend quam adipiscing vitae proin sagittis nisl. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus."
                            } ]
                        }, {
                            id: "content-frontpage-latest-news",
                            name: "Latest News",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Happening Now",
                                type: "articles-list",
                                content: [ {
                                    title: "Lorem ipsum dolor sit amet.",
                                    content: "Molestie nunc non blandit massa enim nec. Ornare suspendisse sed nisi lacus sed viverra tellus in. Id consectetur purus ut faucibus. At auctor urna nunc id cursus metus. Eget aliquet nibh praesent tristique magna. Morbi tristique senectus et netus et malesuada fames."
                                }, {
                                    title: "Consectetur adipiscing elit.",
                                    content: "Sit amet consectetur adipiscing elit ut aliquam purus sit. Consequat nisl vel pretium lectus quam. Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim. Nec sagittis aliquam malesuada bibendum arcu."
                                }, {
                                    title: "Sed do eiusmod tempor incididunt.",
                                    content: "Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Pulvinar elementum integer enim neque volutpat ac. Lorem donec massa sapien faucibus."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Noteworthy",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Augue neque gravida in fermentum et sollicitudin ac orci.",
                                type: "list",
                                content: [ {
                                    content: "Odio morbi quis commodo odio aenean sed adipiscing diam donec."
                                }, {
                                    content: "Consequat semper viverra nam libero justo laoreet sit."
                                }, {
                                    content: "Risus ultricies tristique nulla aliquet enim tortor at auctor."
                                }, {
                                    content: "Diam vulputate ut pharetra sit amet aliquam id diam maecenas."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Around the Globe",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Nunc felis tellus, ultrices eget massa ac, lobortis laoreet lorem.",
                                type: "list",
                                content: [ {
                                    content: "Nibh mauris cursus mattis molestie. Varius vel pharetra vel turpis nunc eget lorem dolor."
                                }, {
                                    content: "Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie."
                                }, {
                                    content: "Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat."
                                }, {
                                    content: "Fermentum dui faucibus in ornare. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit."
                                } ]
                            } ]
                        }, {
                            id: "content-frontpage-latest-media",
                            name: "Latest Media",
                            articles: [ {
                                class: "columns-1",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                } ]
                            } ]
                        }, {
                            id: "content-frontpage-highlights",
                            name: "Highlights",
                            articles: [ {
                                class: "columns-wrap",
                                header: "Domestic Highlights",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "At urna condimentum mattis pellentesque id nibh tortor id. Urna cursus eget nunc scelerisque viverra mauris in. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Enim lobortis scelerisque fermentum dui faucibus in. Vitae semper quis lectus nulla at volutpat. In nisl nisi scelerisque eu ultrices vitae auctor."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Lorem donec massa sapien faucibus et molestie ac feugiat. Quis varius quam quisque id diam vel. Ut tristique et egestas quis ipsum suspendisse. Fermentum posuere urna nec tincidunt praesent semper feugiat."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Global Highlights",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Augue eget arcu dictum varius duis at consectetur. Ornare arcu dui vivamus arcu felis bibendum ut. Magna eget est lorem ipsum dolor sit amet. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Leo urna molestie at elementum eu facilisis sed. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Nisi scelerisque eu ultrices vitae auctor. Quis risus sed vulputate odio. Pellentesque sit amet porttitor eget dolor morbi non. Nullam eget felis eget nunc lobortis mattis aliquam."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Local Highlights",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Mattis ullamcorper velit sed ullamcorper. Orci ac auctor augue mauris augue neque. Condimentum mattis pellentesque id nibh tortor."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Fermentum odio eu feugiat pretium. Urna nec tincidunt praesent semper feugiat nibh sed. Adipiscing elit ut aliquam purus sit."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Vitae tempus quam pellentesque nec nam aliquam sem et. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Congue nisi vitae suscipit tellus mauris a diam maecenas. Quis varius quam quisque id diam."
                                } ]
                            } ]
                        }, {
                            id: "content-frontpage-top-stories",
                            name: "Top Stories",
                            articles: [ {
                                class: "columns-1",
                                type: "grid",
                                display: "grid-wrap",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Ut venenatis tellus in metus vulputate eu scelerisque. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Mattis nunc sed blandit libero volutpat sed cras ornare arcu. Scelerisque eu ultrices vitae auctor eu augue. Libero justo laoreet sit amet cursus sit amet.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Non consectetur a erat nam. Blandit massa enim nec dui nunc mattis enim ut. Tempor orci eu lobortis elementum nibh tellus molestie nunc. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Eget est lorem ipsum dolor sit amet. Vivamus at augue eget arcu dictum varius duis at consectetur. Scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis. Vitae sapien pellentesque habitant morbi tristique senectus et.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Est velit egestas dui id ornare arcu odio ut sem. A cras semper auctor neque. Ipsum suspendisse ultrices gravida dictum fusce ut.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Tellus integer feugiat scelerisque varius morbi enim. Diam donec adipiscing tristique risus nec feugiat in fermentum. Volutpat odio facilisis mauris sit amet massa vitae. Tempor orci dapibus ultrices in iaculis nunc sed. Aenean vel elit scelerisque mauris pellentesque pulvinar.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-frontpage-international",
                            name: "International",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Europe",
                                type: "articles-list",
                                content: [ {
                                    title: "Commodo elit at imperdiet dui accumsan sit amet. Habitasse platea dictumst vestibulum rhoncus.",
                                    content: "Orci ac auctor augue mauris augue neque gravida. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Sagittis aliquam malesuada bibendum arcu vitae. Pellentesque habitant morbi tristique senectus et netus. Etiam erat velit scelerisque in dictum non consectetur a."
                                }, {
                                    title: "Suspendisse convallis efficitur felis ac mattis. Cras faucibus ultrices condimentum.",
                                    content: "Facilisis leo vel fringilla est. Turpis tincidunt id aliquet risus feugiat in ante metus. Viverra ipsum nunc aliquet bibendum enim facilisis. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Tristique senectus et netus et malesuada fames ac turpis egestas."
                                }, {
                                    title: "Ornare suspendisse sed nisi lacus sed viverra tellus in.",
                                    content: "Dui vivamus arcu felis bibendum. Purus ut faucibus pulvinar elementum integer enim neque volutpat ac. Auctor eu augue ut lectus arcu bibendum. Diam volutpat commodo sed egestas egestas fringilla phasellus."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "South America",
                                type: "articles-list",
                                content: [ {
                                    title: "Augue eget arcu dictum varius duis.",
                                    content: "Commodo ullamcorper a lacus vestibulum sed arcu non. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Id interdum velit laoreet id donec ultrices tincidunt arcu non."
                                }, {
                                    title: "Fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque.",
                                    content: "Turpis egestas maecenas pharetra convallis posuere morbi leo. Odio pellentesque diam volutpat commodo. Ornare massa eget egestas purus viverra accumsan in nisl nisi. Tellus integer feugiat scelerisque varius morbi enim nunc. Erat velit scelerisque in dictum non consectetur."
                                }, {
                                    title: "Mi bibendum neque egestas congue quisque.",
                                    content: "Sapien eget mi proin sed libero. Adipiscing elit duis tristique sollicitudin nibh sit. Faucibus scelerisque eleifend donec pretium. Ac tortor dignissim convallis aenean et tortor at risus."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Asia",
                                type: "articles-list",
                                content: [ {
                                    title: "Sodales ut etiam sit amet nisl purus in. Enim sed faucibus turpis in eu mi bibendum neque.",
                                    content: "Tortor id aliquet lectus proin. Pulvinar elementum integer enim neque volutpat ac tincidunt. Auctor eu augue ut lectus arcu bibendum at varius. Congue mauris rhoncus aenean vel elit scelerisque mauris."
                                }, {
                                    title: "haretra convallis posuere morbi leo urna.",
                                    content: "Egestas diam in arcu cursus euismod quis. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Molestie at elementum eu facilisis sed odio morbi quis. Lectus arcu bibendum at varius. Eros in cursus turpis massa tincidunt dui."
                                }, {
                                    title: "At varius vel pharetra vel turpis nunc eget lorem dolor. ",
                                    content: "Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Lacus sed viverra tellus in. Sed nisi lacus sed viverra tellus in. Venenatis cras sed felis eget velit aliquet sagittis id consectetur."
                                } ]
                            } ]
                        }, {
                            id: "content-frontpage-featured",
                            name: "Featured",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Washington",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Et netus et malesuada fames ac.",
                                type: "list",
                                display: "bullets",
                                content: [ {
                                    content: "Vulputate dignissim suspendisse in est ante.",
                                    url: "#"
                                }, {
                                    content: "Blandit turpis cursus in hac habitasse platea dictumst.",
                                    url: "#"
                                }, {
                                    content: "Sed nisi lacus sed viverra tellus in hac.",
                                    url: "#"
                                }, {
                                    content: "Euismod in pellentesque massa placerat duis ultricies lacus sed.",
                                    url: "#"
                                }, {
                                    content: "Quam lacus suspendisse faucibus interdum posuere.",
                                    url: "#"
                                }, {
                                    content: "Sit amet mattis vulputate enim nulla aliquet porttitor lacus.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "New York",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula.",
                                type: "list",
                                display: "bullets",
                                content: [ {
                                    content: "Id semper risus in hendrerit gravida rutrum quisque non.",
                                    url: "#"
                                }, {
                                    content: "Sit amet est placerat in egestas erat imperdiet sed euismod.",
                                    url: "#"
                                }, {
                                    content: "Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc.",
                                    url: "#"
                                }, {
                                    content: "get gravida cum sociis natoque. Bibendum ut tristique et egestas.",
                                    url: "#"
                                }, {
                                    content: "Mauris cursus mattis molestie a iaculis at erat.",
                                    url: "#"
                                }, {
                                    content: "Sit amet massa vitae tortor condimentum lacinia.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Los Angeles",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Parturient montes nascetur ridiculus mus mauris.",
                                type: "list",
                                display: "bullets",
                                content: [ {
                                    content: "Mattis enim ut tellus elementum sagittis.",
                                    url: "#"
                                }, {
                                    content: "Sit amet venenatis urna cursus eget nunc scelerisque viverra mauris.",
                                    url: "#"
                                }, {
                                    content: "Mi bibendum neque egestas congue quisque egestas.",
                                    url: "#"
                                }, {
                                    content: "Nunc scelerisque viverra mauris in aliquam.",
                                    url: "#"
                                }, {
                                    content: "Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam.",
                                    url: "#"
                                }, {
                                    content: "Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-frontpage-underscored",
                            name: "Underscored",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Rhoncus urna neque viverra justo nec. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Enim nunc faucibus a pellentesque sit amet. Est ullamcorper eget nulla facilisi.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Enim lobortis scelerisque fermentum dui faucibus in ornare quam. Iaculis urna id volutpat lacus laoreet non curabitur gravida. Non quam lacus suspendisse faucibus. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Bibendum est ultricies integer quis auctor elit.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Faucibus scelerisque eleifend donec pretium vulputate. Lacus luctus accumsan tortor posuere. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Viverra aliquet eget sit amet tellus cras adipiscing. Congue quisque egestas diam in arcu cursus.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Cum sociis natoque penatibus et magnis dis parturient montes. Ut eu sem integer vitae justo eget magna fermentum iaculis. Amet venenatis urna cursus eget nunc scelerisque viverra. Quisque id diam vel quam elementum. Nulla facilisi cras fermentum odio eu feugiat pretium nibh.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-frontpage-happening-now",
                            name: "Happening Now",
                            articles: [ {
                                class: "columns-wrap",
                                header: "Political",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Cras semper auctor neque vitae tempus quam pellentesque. Consequat ac felis donec et odio pellentesque. Eu consequat ac felis donec et odio pellentesque diam volutpat. Suscipit tellus mauris a diam maecenas sed enim ut sem."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Sed faucibus turpis in eu mi bibendum neque. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. In iaculis nunc sed augue lacus viverra. Pellentesque nec nam aliquam sem et. Tellus mauris a diam maecenas sed."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Mattis vulputate enim nulla aliquet. Ac tortor dignissim convallis aenean. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Consequat ac felis donec et odio pellentesque diam. Lorem ipsum dolor sit amet consectetur adipiscing."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Health",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Vitae tortor condimentum lacinia quis. Nisl nisi scelerisque eu ultrices vitae. Id velit ut tortor pretium viverra suspendisse potenti nullam. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Ullamcorper malesuada proin libero nunc consequat. Imperdiet sed euismod nisi porta. Arcu cursus vitae congue mauris rhoncus aenean vel. Enim nunc faucibus a pellentesque. Gravida in fermentum et sollicitudin ac orci phasellus."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Morbi tristique senectus et netus et malesuada fames. Sit amet cursus sit amet dictum sit. Sagittis vitae et leo duis ut diam quam. Non consectetur a erat nam at lectus. Massa massa ultricies mi quis hendrerit dolor magna eget est."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Business",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Integer enim neque volutpat ac. Feugiat sed lectus vestibulum mattis. Ullamcorper malesuada proin libero nunc consequat interdum varius sit amet. Mattis molestie a iaculis at erat pellentesque. Adipiscing elit duis tristique sollicitudin."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Dignissim sodales ut eu sem integer. Mauris cursus mattis molestie a iaculis at erat. Tempus quam pellentesque nec nam aliquam sem et tortor. Id diam vel quam elementum pulvinar etiam non quam."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Massa vitae tortor condimentum lacinia quis vel eros. Platea dictumst vestibulum rhoncus est pellentesque. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae. Sed risus ultricies tristique nulla aliquet. Magna sit amet purus gravida quis blandit turpis cursus in."
                                } ]
                            } ]
                        }, {
                            id: "content-frontpage-hot-topics",
                            name: "Hot Topics",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Amet nisl suscipit adipiscing bibendum. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Non odio euismod lacinia at. Risus viverra adipiscing at in tellus integer feugiat scelerisque.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Viverra suspendisse potenti nullam ac tortor. Tellus id interdum velit laoreet id donec. Dui nunc mattis enim ut tellus. Nec ullamcorper sit amet risus nullam eget felis eget. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Commodo ullamcorper a lacus vestibulum sed arcu non odio euismod. Etiam non quam lacus suspendisse. Hac habitasse platea dictumst vestibulum rhoncus est.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Egestas congue quisque egestas diam in arcu cursus euismod quis. Tincidunt id aliquet risus feugiat. Viverra nibh cras pulvinar mattis nunc sed.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-frontpage-paid-content",
                            name: "Paid Content",
                            articles: [ {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Nunc aliquet bibendum enim facilisis gravida neque. Nec feugiat in fermentum posuere urna. Molestie at elementum eu facilisis sed odio morbi. Scelerisque purus semper eget duis at tellus."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Eget dolor morbi non arcu risus quis. Non curabitur gravida arcu ac tortor dignissim."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Quam lacus suspendisse faucibus interdum. In pellentesque massa placerat duis ultricies lacus sed. Convallis a cras semper auctor neque vitae tempus quam. Ut pharetra sit amet aliquam id diam."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Eu feugiat pretium nibh ipsum consequat."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Non tellus orci ac auctor augue mauris augue neque gravida. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Quam nulla porttitor massa id neque aliquam vestibulum morbi. Diam quis enim lobortis scelerisque."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Haretra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Senectus et netus et malesuada fames."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "It amet porttitor eget dolor morbi non. Sed lectus vestibulum mattis ullamcorper. Laoreet id donec ultrices tincidunt arcu non. Quam adipiscing vitae proin sagittis."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Mollis aliquam ut porttitor leo a diam. Nunc aliquet bibendum enim facilisis gravida neque convallis."
                                } ]
                            } ]
                        } ]
                    },
                    us: {
                        name: "US",
                        url: "/us",
                        priority: 1,
                        message: {
                            title: "Watch breaking news!",
                            description: "Something important happened and you should watch it!"
                        },
                        sections: [ {
                            id: "content-us-world-news",
                            name: "World News",
                            articles: [ {
                                class: "columns-3-wide",
                                header: "Happening Today",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone.",
                                    tag: {
                                        type: "breaking",
                                        label: "breaking"
                                    }
                                },
                                title: "Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend.",
                                type: "text",
                                content: "Iaculis urna id volutpat lacus. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Dictum varius duis at consectetur lorem donec. At tellus at urna condimentum mattis pellentesque id. Consectetur lorem donec massa sapien faucibus et molestie ac. Risus at ultrices mi tempus."
                            }, {
                                class: "columns-3-narrow",
                                header: "Trending",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Ut eu sem integer vitae justo eget magna.",
                                type: "text",
                                content: "Id neque aliquam vestibulum morbi blandit cursus risus at ultrices. Arcu dui vivamus arcu felis bibendum ut tristique et. Justo donec enim diam vulputate ut.\n\nPellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Ipsum suspendisse ultrices gravida dictum fusce ut placerat. Convallis tellus id interdum velit laoreet id."
                            }, {
                                class: "columns-3-narrow",
                                header: "Weather",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Id consectetur purus ut faucibus pulvinar elementum integer enim.",
                                type: "list",
                                content: [ {
                                    content: "Pellentesque habitant morbi tristique senectus et. Vel eros donec ac odio tempor orci dapibus ultrices in."
                                }, {
                                    content: "Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla."
                                }, {
                                    content: "Et netus et malesuada fames ac turpis egestas. Maecenas ultricies mi eget mauris pharetra et ultrices."
                                } ]
                            } ]
                        }, {
                            id: "content-us-around-the-nation",
                            name: "Around the Nation",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Latest",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Nullam eget felis eget nunc lobortis mattis aliquam.",
                                type: "list",
                                content: [ {
                                    content: "Nibh ipsum consequat nisl vel. Senectus et netus et malesuada fames."
                                }, {
                                    content: "Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi."
                                }, {
                                    content: "Blandit volutpat maecenas volutpat blandit aliquam etiam erat."
                                }, {
                                    content: "Non curabitur gravida arcu ac. Est sit amet facilisis magna etiam tempor orci eu lobortis."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Business",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Vestibulum rhoncus est pellentesque elit. Enim lobortis scelerisque fermentum dui faucibus.",
                                type: "list",
                                content: [ {
                                    content: "Sapien pellentesque habitant morbi tristique senectus et."
                                }, {
                                    content: "Aliquet eget sit amet tellus cras adipiscing."
                                }, {
                                    content: "Tellus mauris a diam maecenas sed enim ut sem viverra."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Politics",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Hendrerit dolor magna eget est. Nec dui nunc mattis enim ut tellus elementum sagittis.",
                                type: "list",
                                content: [ {
                                    content: "Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis."
                                }, {
                                    content: "Ac tincidunt vitae semper quis lectus nulla at volutpat diam."
                                }, {
                                    content: "In mollis nunc sed id semper risus in hendrerit. Turpis massa sed elementum tempus egestas sed sed risus. Imperdiet proin fermentum leo vel orci."
                                }, {
                                    content: "Nisl purus in mollis nunc sed id semper. Pretium lectus quam id leo in vitae."
                                } ]
                            } ]
                        }, {
                            id: "content-us-roundup",
                            name: "Roundup",
                            articles: [ {
                                class: "columns-wrap",
                                header: "Washington",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Nisl nisi scelerisque eu ultrices vitae. Consectetur adipiscing elit duis tristique sollicitudin. Ornare suspendisse sed nisi lacus. Justo eget magna fermentum iaculis."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Tellus integer feugiat scelerisque varius morbi enim. Ut tristique et egestas quis."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "East Coast",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Pharetra et ultrices neque ornare aenean euismod elementum nisi. Ipsum dolor sit amet consectetur adipiscing elit ut."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Quam vulputate dignissim suspendisse in est. Vestibulum mattis ullamcorper velit sed."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Habitant morbi tristique senectus et netus et. Ullamcorper sit amet risus nullam eget felis."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "West Coast",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Bibendum enim facilisis gravida neque convallis a cras. Semper feugiat nibh sed pulvinar proin gravida hendrerit."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Vel facilisis volutpat est velit. Odio ut sem nulla pharetra diam sit amet nisl."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Risus nec feugiat in fermentum posuere urna nec. Massa tincidunt nunc pulvinar sapien."
                                } ]
                            } ]
                        }, {
                            id: "content-us-crime+justice",
                            name: "Crime & Justice",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Supreme Court",
                                type: "articles-list",
                                content: [ {
                                    title: "Vel risus commodo viverra maecenas.",
                                    content: "Vitae tempus quam pellentesque nec nam aliquam sem. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Leo integer malesuada nunc vel. Ultricies integer quis auctor elit sed vulputate. Sit amet justo donec enim diam vulputate. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar."
                                }, {
                                    title: "Sit amet mattis vulputate enim.",
                                    content: "Urna porttitor rhoncus dolor purus non. Tristique senectus et netus et malesuada fames ac turpis egestas. Suscipit tellus mauris a diam maecenas. Risus ultricies tristique nulla aliquet enim. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper."
                                }, {
                                    title: "Mauris in aliquam sem fringilla ut morbi tincidunt.",
                                    content: "A erat nam at lectus. Orci sagittis eu volutpat odio facilisis mauris sit. Faucibus nisl tincidunt eget nullam non. Nisl condimentum id venenatis a. Suscipit tellus mauris a diam maecenas sed enim. Orci nulla pellentesque dignissim enim sit amet venenatis. Est ultricies integer quis auctor."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Local Law",
                                type: "articles-list",
                                content: [ {
                                    title: "Sit amet justo donec enim diam vulputate ut.",
                                    content: "Tincidunt dui ut ornare lectus sit amet est. Risus sed vulputate odio ut enim blandit volutpat maecenas volutpat. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Euismod in pellentesque massa placerat duis."
                                }, {
                                    title: "Aliquam ultrices sagittis orci a scelerisque purus semper eget duis.",
                                    content: "Lobortis feugiat vivamus at augue eget arcu. Id ornare arcu odio ut sem nulla pharetra diam. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Congue quisque egestas diam in arcu cursus euismod quis viverra."
                                }, {
                                    title: "In metus vulputate eu scelerisque felis imperdiet proin.",
                                    content: "Elementum pulvinar etiam non quam. Id nibh tortor id aliquet lectus proin nibh. Elementum facilisis leo vel fringilla est ullamcorper eget. Dictum sit amet justo donec enim diam vulputate."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Opinion",
                                type: "articles-list",
                                content: [ {
                                    title: "Magna ac placerat vestibulum lectus.",
                                    content: "enenatis urna cursus eget nunc scelerisque viverra mauris. Convallis posuere morbi leo urna molestie at elementum. Eu lobortis elementum nibh tellus. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra."
                                }, {
                                    title: "Nisl rhoncus mattis rhoncus urna neque viverra justo.",
                                    content: "Tristique sollicitudin nibh sit amet. Aliquam purus sit amet luctus venenatis. Vitae nunc sed velit dignissim sodales ut. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Sit amet risus nullam eget."
                                }, {
                                    title: "Sed felis eget velit aliquet sagittis id consectetur purus ut.",
                                    content: "Egestas erat imperdiet sed euismod nisi porta. Vel orci porta non pulvinar neque laoreet. Urna condimentum mattis pellentesque id nibh. Arcu non sodales neque sodales ut etiam sit amet. Elementum curabitur vitae nunc sed velit dignissim."
                                } ]
                            } ]
                        }, {
                            id: "content-us-around-the-us",
                            name: "Around the US",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Latest",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Ut tortor pretium viverra suspendisse potenti nullam ac tortor.",
                                type: "list",
                                content: [ {
                                    content: "Erat pellentesque adipiscing commodo elit at. Ornare lectus sit amet est placerat in."
                                }, {
                                    content: "Dui ut ornare lectus sit amet est placerat in egestas. Commodo sed egestas egestas fringilla phasellus."
                                }, {
                                    content: "Mi quis hendrerit dolor magna eget est lorem ipsum. Urna molestie at elementum eu facilisis sed odio morbi."
                                }, {
                                    content: "Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Business",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Nam at lectus urna duis convallis convallis tellus id. Sem nulla pharetra diam sit amet nisl.",
                                type: "list",
                                content: [ {
                                    content: "Nunc faucibus a pellentesque sit amet. Id velit ut tortor pretium viverra suspendisse potenti nullam ac."
                                }, {
                                    content: "Eget mi proin sed libero enim sed. A scelerisque purus semper eget duis at tellus."
                                }, {
                                    content: "Praesent tristique magna sit amet purus. Eros in cursus turpis massa."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Politics",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Tristique nulla aliquet enim tortor at auctor urna nunc.",
                                type: "list",
                                content: [ {
                                    content: "Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Amet mattis vulputate enim nulla."
                                }, {
                                    content: "Pellentesque massa placerat duis ultricies. Tortor at auctor urna nunc id cursus."
                                }, {
                                    content: "Venenatis urna cursus eget nunc scelerisque viverra mauris."
                                }, {
                                    content: "Dolor morbi non arcu risus quis varius quam quisque id."
                                } ]
                            } ]
                        }, {
                            id: "content-us-latest-media",
                            name: "Latest Media",
                            articles: [ {
                                class: "columns-1",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                } ]
                            } ]
                        }, {
                            id: "content-us-business",
                            name: "Business",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Local",
                                type: "articles-list",
                                content: [ {
                                    title: "Sed viverra tellus in hac habitasse platea dictumst vestibulum.",
                                    content: "Maecenas volutpat blandit aliquam etiam. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Est ullamcorper eget nulla facilisi etiam dignissim diam quis. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Varius vel pharetra vel turpis nunc eget. Enim ut tellus elementum sagittis vitae et leo duis."
                                }, {
                                    title: "Porttitor leo a diam sollicitudin tempor id eu nisl.",
                                    content: "Ut diam quam nulla porttitor massa id neque. Nulla facilisi etiam dignissim diam quis enim lobortis. Quam nulla porttitor massa id. Neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Justo nec ultrices dui sapien eget mi. Volutpat diam ut venenatis tellus in. Mi in nulla posuere sollicitudin aliquam ultrices."
                                }, {
                                    title: "Leo vel orci porta non pulvinar neque laoreet.",
                                    content: "Placerat duis ultricies lacus sed. Pellentesque adipiscing commodo elit at imperdiet dui. Accumsan lacus vel facilisis volutpat. Condimentum lacinia quis vel eros donec ac. Pellentesque habitant morbi tristique senectus. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Rhoncus urna neque viverra justo nec ultrices dui sapien. Amet venenatis urna cursus eget."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Global",
                                type: "articles-list",
                                content: [ {
                                    title: "Platea dictumst quisque sagittis purus sit amet volutpat consequat mauris.",
                                    content: "Eu lobortis elementum nibh tellus molestie nunc. Vel turpis nunc eget lorem dolor sed viverra. Massa sapien faucibus et molestie ac feugiat sed. Sed egestas egestas fringilla phasellus faucibus. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan"
                                }, {
                                    title: "Ultrices gravida dictum fusce ut placerat orci nulla pellentesque.",
                                    content: "Velit ut tortor pretium viverra suspendisse potenti nullam ac tortor. Feugiat nibh sed pulvinar proin gravida. Feugiat in fermentum posuere urna nec tincidunt praesent. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. A scelerisque purus semper eget."
                                }, {
                                    title: "Est ullamcorper eget nulla facilisi etiam.",
                                    content: "Augue mauris augue neque gravida in fermentum et. Ornare arcu odio ut sem nulla pharetra diam. Tristique et egestas quis ipsum suspendisse ultrices gravida. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Non blandit massa enim nec dui nunc mattis."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Quarterly",
                                type: "articles-list",
                                content: [ {
                                    title: "Non curabitur gravida arcu ac tortor dignissim.",
                                    content: "Dui nunc mattis enim ut. Non consectetur a erat nam. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. Congue quisque egestas diam in arcu cursus euismod quis viverra. Consequat semper viverra nam libero justo laoreet sit amet."
                                }, {
                                    title: "Velit egestas dui id ornare arcu odio ut.",
                                    content: "At ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Aenean et tortor at risus viverra. Lectus magna fringilla urna porttitor rhoncus dolor. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Euismod in pellentesque massa placerat duis ultricies lacus sed turpis."
                                }, {
                                    title: "Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel.",
                                    content: "Nunc eget lorem dolor sed. Amet aliquam id diam maecenas ultricies mi. Sodales ut etiam sit amet nisl purus. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Fusce ut placerat orci nulla pellentesque dignissim enim sit."
                                } ]
                            } ]
                        }, {
                            id: "content-us-underscored",
                            name: "Underscored",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Netus et malesuada fames ac turpis egestas. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Morbi tempus iaculis urna id volutpat lacus laoreet non curabitur. Sed enim ut sem viverra. Tellus integer feugiat scelerisque varius morbi enim.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Aenean vel elit scelerisque mauris. Et ligula ullamcorper malesuada proin libero nunc. Mi sit amet mauris commodo quis imperdiet. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Erat velit scelerisque in dictum non consectetur a erat nam. Orci porta non pulvinar neque.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Eget gravida cum sociis natoque penatibus et. Malesuada pellentesque elit eget gravida cum. Curabitur vitae nunc sed velit dignissim sodales ut. Curabitur vitae nunc sed velit dignissim. Vel pretium lectus quam id leo in. Aliquet lectus proin nibh nisl condimentum id venenatis a.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Tristique senectus et netus et malesuada fames ac turpis. Semper risus in hendrerit gravida rutrum. Urna cursus eget nunc scelerisque viverra. Amet mauris commodo quis imperdiet massa. Erat nam at lectus urna duis convallis convallis tellus id.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-us-state-by-state",
                            name: "State by state",
                            articles: [ {
                                class: "columns-wrap",
                                header: "California",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Et tortor at risus viverra adipiscing at. Leo urna molestie at elementum eu facilisis sed. Adipiscing tristique risus nec feugiat in fermentum posuere urna."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Luctus venenatis lectus magna fringilla. Condimentum mattis pellentesque id nibh tortor id. Rhoncus aenean vel elit scelerisque mauris pellentesque."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Feugiat scelerisque varius morbi enim nunc. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Orci a scelerisque purus semper eget duis at tellus at."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "New York",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Vitae sapien pellentesque habitant morbi tristique. Quisque id diam vel quam elementum pulvinar etiam non. Hendrerit gravida rutrum quisque non tellus orci."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Rhoncus dolor purus non enim praesent. Massa enim nec dui nunc mattis. Odio eu feugiat pretium nibh ipsum consequat. Bibendum enim facilisis gravida neque convallis a cras."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Cursus euismod quis viverra nibh. Facilisis mauris sit amet massa. Eget mauris pharetra et ultrices. Vitae turpis massa sed elementum tempus egestas sed. Semper viverra nam libero justo."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Washington",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Iaculis nunc sed augue lacus viverra. Sed libero enim sed faucibus turpis in. Massa tincidunt dui ut ornare. Adipiscing bibendum est ultricies integer quis auctor elit."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Aliquet nec ullamcorper sit amet risus nullam eget felis eget. Tortor dignissim convallis aenean et tortor at risus. Dolor sed viverra ipsum nunc."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "In cursus turpis massa tincidunt dui ut ornare. Lacus vestibulum sed arcu non odio euismod lacinia at. Mi ipsum faucibus vitae aliquet nec. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend."
                                } ]
                            } ]
                        }, {
                            id: "content-us-hot-topics",
                            name: "Hot Topics",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Magna ac placerat vestibulum lectus mauris ultrices eros. Risus nullam eget felis eget nunc. Orci porta non pulvinar neque. Aliquam purus sit amet luctus venenatis lectus magna fringilla urna. In arcu cursus euismod quis viverra nibh.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Id venenatis a condimentum vitae sapien. Dui vivamus arcu felis bibendum ut tristique. Laoreet sit amet cursus sit amet dictum sit amet justo. Id semper risus in hendrerit gravida rutrum quisque non. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Nulla porttitor massa id neque aliquam. Amet massa vitae tortor condimentum lacinia quis vel. Semper quis lectus nulla at volutpat diam ut venenatis. In nulla posuere sollicitudin aliquam ultrices.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Egestas congue quisque egestas diam in arcu cursus. Vitae tempus quam pellentesque nec nam aliquam. Proin nibh nisl condimentum id. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Egestas integer eget aliquet nibh praesent tristique.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-us-paid-content",
                            name: "Paid Content",
                            articles: [ {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Sed cras ornare arcu dui vivamus arcu. Blandit aliquam etiam erat velit scelerisque in. Nisl rhoncus mattis rhoncus urna neque viverra."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Nunc sed id semper risus in hendrerit gravida rutrum. Ac felis donec et odio pellentesque diam volutpat commodo sed."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Semper quis lectus nulla at volutpat diam ut venenatis tellus. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Et malesuada fames ac turpis."
                                } ]
                            } ]
                        } ]
                    },
                    world: {
                        name: "World",
                        url: "/world",
                        priority: 1,
                        sections: [ {
                            id: "content-world-global-trends",
                            name: "Global trends",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Africa",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Sed id semper risus in hendrerit gravida. Sagittis orci a scelerisque purus semper eget duis at tellus.",
                                type: "text",
                                content: "Quam viverra orci sagittis eu volutpat odio facilisis mauris sit. Magna fringilla urna porttitor rhoncus dolor purus non enim praesent. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Dictum varius duis at consectetur. Ut porttitor leo a diam sollicitudin tempor id eu nisl."
                            }, {
                                class: "columns-3-balanced",
                                header: "China",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Convallis aenean et tortor at risus. Pellentesque elit eget gravida cum sociis natoque penatibus.",
                                type: "text",
                                content: "Auctor urna nunc id cursus metus aliquam. Amet commodo nulla facilisi nullam. Blandit massa enim nec dui nunc mattis enim ut. Et netus et malesuada fames ac turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada. Habitant morbi tristique senectus et netus et malesuada fames ace."
                            }, {
                                class: "columns-3-balanced",
                                header: "Russia",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Pharetra magna ac placerat vestibulum lectus mauris ultrices eros.",
                                type: "list",
                                content: [ {
                                    content: "Luctus venenatis lectus magna fringilla urna porttitor rhoncus."
                                }, {
                                    content: "Placerat orci nulla pellentesque dignissim enim sit amet venenatis."
                                }, {
                                    content: "Pellentesque nec nam aliquam sem et."
                                }, {
                                    content: "In hendrerit gravida rutrum quisque non tellus."
                                } ]
                            } ]
                        }, {
                            id: "content-world-around-the-world",
                            name: "Around the world",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Europe",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Porttitor massa id neque aliquam vestibulum. Semper auctor neque vitae tempus quam.",
                                type: "text",
                                content: "Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel. Nisi scelerisque eu ultrices vitae auctor eu. Risus pretium quam vulputate dignissim suspendisse. Pulvinar neque laoreet suspendisse interdum. Mauris cursus mattis molestie a iaculis at erat."
                            }, {
                                class: "columns-3-balanced",
                                header: "Middle East",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Et molestie ac feugiat sed lectus vestibulum mattis.",
                                type: "text",
                                content: "Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris. Quam vulputate dignissim suspendisse in est ante in nibh mauris."
                            }, {
                                class: "columns-3-balanced",
                                header: "Asia",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Metus dictum at tempor commodo.",
                                type: "list",
                                content: [ {
                                    content: "Id faucibus nisl tincidunt eget nullam non nisi."
                                }, {
                                    content: "Lectus quam id leo in vitae turpis massa."
                                }, {
                                    content: "Urna nec tincidunt praesent semper feugiat nibh sed. Sed turpis tincidunt id aliquet risus."
                                }, {
                                    content: "Eu ultrices vitae auctor eu augue ut lectus."
                                } ]
                            } ]
                        }, {
                            id: "content-world-latest-media",
                            name: "Latest Media",
                            articles: [ {
                                class: "columns-1",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                } ]
                            } ]
                        }, {
                            id: "content-world-today",
                            name: "Today",
                            articles: [ {
                                class: "columns-3-wide",
                                header: "Unrest",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone.",
                                    tag: {
                                        type: "breaking",
                                        label: "breaking"
                                    }
                                },
                                title: "Viverra aliquet eget sit amet. In fermentum posuere urna nec.",
                                type: "list",
                                content: [ {
                                    content: "Massa enim nec dui nunc mattis. Ornare lectus sit amet est placerat in."
                                }, {
                                    content: "Morbi tristique senectus et netus et malesuada fames ac turpis."
                                }, {
                                    content: "Fed vulputate mi sit amet mauris commodo quis imperdiet massa."
                                }, {
                                    content: "In egestas erat imperdiet sed euismod nisi porta lorem mollis. Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu."
                                } ]
                            }, {
                                class: "columns-3-narrow",
                                header: "Happening now",
                                url: "#",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Semper auctor neque vitae tempus quam pellentesque nec nam aliquam."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Viverra maecenas accumsan lacus vel facilisis volutpat."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Orci sagittis eu volutpat odio facilisis mauris sit."
                                } ]
                            }, {
                                class: "columns-3-narrow",
                                header: "Noteworthy",
                                url: "#",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Nunc aliquet bibendum enim facilisis gravida neque convallis a."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Ut diam quam nulla porttitor massa id neque aliquam vestibulum."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Magna fermentum iaculis eu non diam phasellus vestibulum lorem."
                                } ]
                            } ]
                        }, {
                            id: "content-world-featured",
                            name: "Featured",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "European Union",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Luctus venenatis lectus magna fringilla urna.",
                                type: "list",
                                content: [ {
                                    content: "Nulla facilisi cras fermentum odio eu. Porttitor lacus luctus accumsan tortor posuere ac ut."
                                }, {
                                    content: "Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Leo vel orci porta non. Sem nulla pharetra diam sit amet nisl."
                                }, {
                                    content: "Justo donec enim diam vulputate ut pharetra sit amet aliquam. Eu consequat ac felis donec et."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Britain",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Orci a scelerisque purus semper eget duis.",
                                type: "text",
                                content: "Gravida rutrum quisque non tellus orci ac auctor augue mauris. Enim ut sem viverra aliquet eget. Sit amet volutpat consequat mauris nunc congue nisi vitae.\n\nPraesent tristique magna sit amet purus gravida quis blandit turpis. Commodo odio aenean sed adipiscing diam donec adipiscing tristique risus. Quam quisque id diam vel quam elementum."
                            }, {
                                class: "columns-3-balanced",
                                header: "Latin America",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Congue nisi vitae suscipit tellus.",
                                type: "list",
                                display: "bullets",
                                content: [ {
                                    content: "Ut venenatis tellus in metus vulputate.",
                                    url: "#"
                                }, {
                                    content: "Vitae aliquet nec ullamcorper sit amet risus nullam.",
                                    url: "#"
                                }, {
                                    content: "Ellus in hac habitasse platea dictumst.",
                                    url: "#"
                                }, {
                                    content: "In nisl nisi scelerisque eu ultrices vitae.",
                                    url: "#"
                                }, {
                                    content: "Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim.",
                                    url: "#"
                                }, {
                                    content: "It volutpat diam ut venenatis tellus.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-world-international",
                            name: "International",
                            articles: [ {
                                class: "columns-wrap",
                                header: "United Nations",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Morbi quis commodo odio aenean sed adipiscing diam. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Justo nec ultrices dui sapien."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Nibh nisl condimentum id venenatis a condimentum. Id diam maecenas ultricies mi eget mauris pharetra et ultrices. Faucibus turpis in eu mi bibendum neque egestas. Et malesuada fames ac turpis egestas sed tempus urna et."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Ut etiam sit amet nisl purus in mollis nunc sed. Pellentesque adipiscing commodo elit at imperdiet dui. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Enim facilisis gravida neque convallis."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "European Union",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Donec massa sapien faucibus et molestie. Fermentum iaculis eu non diam. Donec pretium vulputate sapien nec sagittis. Placerat duis ultricies lacus sed. Pretium lectus quam id leo in vitae turpis massa."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Luctus accumsan tortor posuere ac ut. Convallis posuere morbi leo urna molestie at elementum. Nisi est sit amet facilisis magna etiam tempor orci eu."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Purus in massa tempor nec feugiat nisl pretium fusce. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Vestibulum sed arcu non odio euismod lacinia at quis."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Global Crisis",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "ristique senectus et netus et malesuada. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Varius quam quisque id diam vel quam elementum pulvinar. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Cras ornare arcu dui vivamus arcu felis bibendum ut. Volutpat blandit aliquam etiam erat velit scelerisque in dictum. Pharetra magna ac placerat vestibulum lectus."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Leo integer malesuada nunc vel. Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Ultrices eros in cursus turpis massa tincidunt dui ut. Eleifend mi in nulla posuere sollicitudin."
                                } ]
                            } ]
                        }, {
                            id: "content-world-global-impact",
                            name: "Global Impact",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Weather",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Euismod elementum nisi quis eleifend.",
                                type: "list",
                                content: [ {
                                    content: "Enim tortor at auctor urna nunc id cursus metus. Nisi est sit amet facilisis magna etiam."
                                }, {
                                    content: "Neque volutpat ac tincidunt vitae. Metus aliquam eleifend mi in."
                                }, {
                                    content: "Aliquam malesuada bibendum arcu vitae elementum curabitur vitae."
                                }, {
                                    content: "Turpis cursus in hac habitasse platea dictumst."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Business",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Nunc mi ipsum faucibus vitae aliquet nec ullamcorper.",
                                type: "list",
                                content: [ {
                                    content: "Eget nulla facilisi etiam dignissim diam quis enim."
                                }, {
                                    content: "Risus viverra adipiscing at in tellus integer feugiat scelerisque."
                                }, {
                                    content: "Cursus turpis massa tincidunt dui."
                                }, {
                                    content: "Nascetur ridiculus mus mauris vitae ultricies leo integer."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Politics",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Vulputate sapien nec sagittis aliquam malesuada.",
                                type: "list",
                                content: [ {
                                    content: "Nisi scelerisque eu ultrices vitae auctor."
                                }, {
                                    content: "Urna porttitor rhoncus dolor purus non enim praesent elementum."
                                }, {
                                    content: "Ac turpis egestas integer eget aliquet."
                                }, {
                                    content: "Nisl tincidunt eget nullam non nisi est."
                                } ]
                            } ]
                        }, {
                            id: "content-world-underscored",
                            name: "Underscored",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Risus sed vulputate odio ut enim blandit volutpat. Tempus egestas sed sed risus pretium quam vulputate. Ultrices mi tempus imperdiet nulla malesuada. Pellentesque diam volutpat commodo sed egestas. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Nunc mi ipsum faucibus vitae aliquet nec. Felis eget nunc lobortis mattis aliquam faucibus. Amet est placerat in egestas. Vitae proin sagittis nisl rhoncus mattis rhoncus. Mauris in aliquam sem fringilla ut. Pellentesque habitant morbi tristique senectus et netus et.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Egestas diam in arcu cursus euismod quis viverra nibh cras. Scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Risus in hendrerit gravida rutrum.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Integer malesuada nunc vel risus commodo viverra maecenas accumsan. Nec feugiat nisl pretium fusce id. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. At tempor commodo ullamcorper a lacus vestibulum sed arcu. Suspendisse faucibus interdum posuere lorem ipsum dolor.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-world-global-issues",
                            name: "Global Issues",
                            articles: [ {
                                class: "columns-wrap",
                                header: "Rising Crime",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Phasellus faucibus scelerisque eleifend donec pretium. Tellus molestie nunc non blandit. Sed sed risus pretium quam vulputate dignissim suspendisse."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "In vitae turpis massa sed. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Egestas pretium aenean pharetra magna ac placerat vestibulum."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Morbi tempus iaculis urna id volutpat lacus laoreet non. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Nibh tortor id aliquet lectus proin nibh nisl."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Health concerns",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Id diam maecenas ultricies mi eget mauris pharetra. Aliquam sem fringilla ut morbi tincidunt augue interdum. Accumsan sit amet nulla facilisi morbi tempus iaculis."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Dolor sit amet consectetur adipiscing elit pellentesque habitant. Eget dolor morbi non arcu risus quis varius quam quisque."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Commodo sed egestas egestas fringilla phasellus faucibus. Lectus urna duis convallis convallis. Sit amet tellus cras adipiscing enim eu turpis egestas."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Economy",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Ante in nibh mauris cursus mattis molestie. Vestibulum sed arcu non odio euismod lacinia at quis. Consequat semper viverra nam libero justo laoreet."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Nunc non blandit massa enim nec dui nunc. Lobortis feugiat vivamus at augue eget arcu. Tempor commodo ullamcorper a lacus. Malesuada bibendum arcu vitae elementum curabitur vitae."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "In nulla posuere sollicitudin aliquam ultrices sagittis orci a. Sem fringilla ut morbi tincidunt augue interdum. Arcu felis bibendum ut tristique et egestas. Praesent elementum facilisis leo vel fringilla est ullamcorper."
                                } ]
                            } ]
                        }, {
                            id: "content-world-hot-topics",
                            name: "Hot Topics",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Aliquam nulla facilisi cras fermentum odio. In est ante in nibh. Vulputate ut pharetra sit amet aliquam. Vitae congue eu consequat ac felis. Semper auctor neque vitae tempus quam pellentesque nec nam aliquam.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Vitae sapien pellentesque habitant morbi tristique senectus. Faucibus interdum posuere lorem ipsum dolor sit. Urna id volutpat lacus laoreet non curabitur. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Donec ultrices tincidunt arcu non sodales neque sodales ut. Consequat mauris nunc congue nisi vitae suscipit tellus mauris. Dictum sit amet justo donec enim diam vulputate. Ultrices vitae auctor eu augue ut lectus arcu bibendum at.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Adipiscing at in tellus integer feugiat scelerisque varius. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-world-paid-content",
                            name: "Paid Content",
                            articles: [ {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Et sollicitudin ac orci phasellus. Massa placerat duis ultricies lacus sed turpis tincidunt id."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Neque volutpat ac tincidunt vitae semper. Nunc pulvinar sapien et ligula. Quam pellentesque nec nam aliquam sem et tortor consequat."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Velit euismod in pellentesque massa placerat duis ultricies. Nulla aliquet enim tortor at auctor. Vitae et leo duis ut diam quam nulla porttitor massa."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Eros in cursus turpis massa tincidunt dui ut ornare lectus. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl."
                                } ]
                            } ]
                        } ]
                    },
                    politics: {
                        name: "Politics",
                        url: "/politics",
                        priority: 1,
                        sections: [ {
                            id: "content-politics-what-really-matters",
                            name: "What Really Matters",
                            articles: [ {
                                class: "columns-1",
                                type: "grid",
                                display: "grid-wrap",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Libero justo laoreet sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Eget aliquet nibh praesent tristique magna. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Arcu cursus euismod quis viverra nibh. Cras ornare arcu dui vivamus arcu. At lectus urna duis convallis convallis tellus id.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Urna et pharetra pharetra massa massa ultricies mi quis hendrerit. Risus sed vulputate odio ut enim blandit volutpat maecenas volutpat. Quis ipsum suspendisse ultrices gravida dictum fusce ut.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Velit aliquet sagittis id consectetur purus ut faucibus. Tellus mauris a diam maecenas sed. Urna neque viverra justo nec. Odio eu feugiat pretium nibh ipsum.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Amet nulla facilisi morbi tempus iaculis urna id. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Id leo in vitae turpis massa.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-politics-today",
                            name: "Today",
                            articles: [ {
                                class: "columns-3-wide",
                                header: "Campaign News",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone.",
                                    tag: {
                                        type: "breaking",
                                        label: "breaking"
                                    }
                                },
                                title: "Adipiscing at in tellus integer feugiat scelerisque varius morbi enim.",
                                type: "list",
                                content: [ {
                                    content: "Sem fringilla ut morbi tincidunt augue interdum velit euismod."
                                }, {
                                    content: "Quisque sagittis purus sit amet. Ornare lectus sit amet est."
                                }, {
                                    content: "Placerat orci nulla pellentesque dignissim enim sit amet."
                                }, {
                                    content: "In fermentum et sollicitudin ac orci phasellus egestas tellus."
                                } ]
                            }, {
                                class: "columns-3-narrow",
                                header: "Elections",
                                url: "#",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Nunc aliquet bibendum enim facilisis gravida neque. Nec feugiat in fermentum posuere urna. Molestie at elementum eu facilisis sed odio morbi. Scelerisque purus semper eget duis at tellus."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Eget dolor morbi non arcu risus quis. Non curabitur gravida arcu ac tortor dignissim."
                                } ]
                            }, {
                                class: "columns-3-narrow",
                                header: "Local Government",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Nunc vel risus commodo viverra maecenas accumsan lacus.",
                                type: "list",
                                content: [ {
                                    content: "Molestie at elementum eu facilisis sed odio morbi."
                                }, {
                                    content: "Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis."
                                }, {
                                    content: "Bibendum neque egestas congue quisque egestas diam in arcu."
                                }, {
                                    content: "Tellus molestie nunc non blandit massa enim nec."
                                } ]
                            } ]
                        }, {
                            id: "content-politics-latest-headlines",
                            name: "Latest Headlines",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Analysis",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et.",
                                type: "list",
                                content: [ {
                                    content: "Arcu vitae elementum curabitur vitae nunc sed velit."
                                }, {
                                    content: "Ornare suspendisse sed nisi lacus sed viverra tellus in."
                                }, {
                                    content: "Vel fringilla est ullamcorper eget nulla."
                                }, {
                                    content: "Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Facts First",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "At varius vel pharetra vel turpis nunc eget lorem dolor.",
                                type: "list",
                                content: [ {
                                    content: "Consectetur purus ut faucibus pulvinar elementum integer enim."
                                }, {
                                    content: "Purus semper eget duis at. Tincidunt ornare massa eget egestas purus viverra accumsan."
                                }, {
                                    content: "Amet massa vitae tortor condimentum lacinia quis vel."
                                }, {
                                    content: "Tristique senectus et netus et malesuada."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "More Politics News",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Vitae auctor eu augue ut lectus arcu bibendum at varius.",
                                type: "text",
                                content: "Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Id aliquet lectus proin nibh. Porta lorem mollis aliquam ut porttitor leo a. Congue eu consequat ac felis donec et odio pellentesque.\n\nMi ipsum faucibus vitae aliquet nec ullamcorper. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper."
                            } ]
                        }, {
                            id: "content-politics-latest-media",
                            name: "Latest Media",
                            articles: [ {
                                class: "columns-1",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                } ]
                            } ]
                        }, {
                            id: "content-politics-election",
                            name: "Election",
                            articles: [ {
                                class: "columns-wrap",
                                header: "Democrats",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Est ullamcorper eget nulla facilisi etiam dignissim. Est pellentesque elit ullamcorper dignissim cras. Velit euismod in pellentesque massa placerat duis ultricies."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Vitae suscipit tellus mauris a diam maecenas sed enim. Aenean sed adipiscing diam donec. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Mattis enim ut tellus elementum sagittis vitae et. Massa sapien faucibus et molestie."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Republicans",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Platea dictumst quisque sagittis purus sit amet volutpat. Ante in nibh mauris cursus mattis molestie a iaculis."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Quis hendrerit dolor magna eget est. Pellentesque pulvinar pellentesque habitant morbi tristique. Adipiscing commodo elit at imperdiet dui."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Donec pretium vulputate sapien nec sagittis aliquam. Cras adipiscing enim eu turpis egestas pretium aenean."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Liberals",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Cursus sit amet dictum sit amet justo donec enim. Tempor id eu nisl nunc. Amet cursus sit amet dictum sit amet justo donec."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Enim diam vulputate ut pharetra sit amet aliquam. Tristique senectus et netus et malesuada."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Eu turpis egestas pretium aenean. Auctor elit sed vulputate mi sit amet. In nibh mauris cursus mattis molestie."
                                } ]
                            } ]
                        }, {
                            id: "content-politics-more-political-news",
                            name: "More political News",
                            articles: [ {
                                class: "columns-3-wide",
                                header: "More News",
                                url: "#",
                                type: "list",
                                content: [ {
                                    content: "Eros donec ac odio tempor. Tortor pretium viverra suspendisse potenti nullam."
                                }, {
                                    content: "Ut venenatis tellus in metus vulputate eu scelerisque."
                                }, {
                                    content: "Id diam maecenas ultricies mi eget. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit."
                                }, {
                                    content: "Consectetur lorem donec massa sapien. Sed cras ornare arcu dui vivamus arcu felis."
                                }, {
                                    content: "Fames ac turpis egestas maecenas pharetra convallis posuere morbi."
                                }, {
                                    content: "Consequat nisl vel pretium lectus quam id."
                                }, {
                                    content: "Tincidunt ornare massa eget egestas purus viverra accumsan in nisl."
                                }, {
                                    content: "Sed euismod nisi porta lorem mollis aliquam ut."
                                }, {
                                    content: "Suspendisse sed nisi lacus sed viverra tellus in hac."
                                }, {
                                    content: "Aliquet risus feugiat in ante metus dictum at tempor."
                                }, {
                                    content: "Velit aliquet sagittis id consectetur purus ut faucibus."
                                }, {
                                    content: "Libero volutpat sed cras ornare. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet."
                                }, {
                                    content: "Nibh nisl condimentum id venenatis a condimentum vitae. Fames ac turpis egestas maecenas pharetra."
                                }, {
                                    content: "Massa sapien faucibus et molestie. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna."
                                }, {
                                    content: "Est pellentesque elit ullamcorper dignissim cras. Mi proin sed libero enim sed."
                                } ]
                            }, {
                                class: "columns-3-narrow",
                                url: "#",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Nunc aliquet bibendum enim facilisis gravida neque. Nec feugiat in fermentum posuere urna. Molestie at elementum eu facilisis sed odio morbi. Scelerisque purus semper eget duis at tellus."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Eget dolor morbi non arcu risus quis. Non curabitur gravida arcu ac tortor dignissim."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Eget dolor morbi non arcu risus quis. Non curabitur gravida arcu ac tortor dignissim."
                                } ]
                            }, {
                                class: "columns-3-narrow",
                                url: "#",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Adipiscing tristique risus nec feugiat in fermentum posuere vulputate eu scelerisque."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Potenti nullam ac tortor vitae purus. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum."
                                } ]
                            } ]
                        }, {
                            id: "content-politics-underscored",
                            name: "Underscored",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Urna neque viverra justo nec ultrices dui sapien. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Pretium nibh ipsum consequat nisl vel.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Nunc id cursus metus aliquam eleifend. Sit amet est placerat in egestas erat. Vitae tortor condimentum lacinia quis vel eros donec ac. Maecenas pharetra convallis posuere morbi leo urna molestie at. Lectus proin nibh nisl condimentum id venenatis. Ut enim blandit volutpat maecenas volutpat blandit.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Vestibulum sed arcu non odio euismod lacinia. Ipsum dolor sit amet consectetur. Nisi scelerisque eu ultrices vitae. Eu consequat ac felis donec. Viverra orci sagittis eu volutpat odio facilisis mauris sit amet. Purus semper eget duis at tellus at urna. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Elementum eu facilisis sed odio morbi. Scelerisque viverra mauris in aliquam sem fringilla ut. Enim ut sem viverra aliquet. Massa sed elementum tempus egestas. Nam at lectus urna duis convallis convallis tellus. Sem integer vitae justo eget magna. In mollis nunc sed id.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-politics-trending",
                            name: "Trending",
                            articles: [ {
                                class: "columns-wrap",
                                header: "New Legislations",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Consequat ac felis donec et. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Nisi lacus sed viverra tellus in hac. Aliquam malesuada bibendum arcu vitae elementum curabitur."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Neque gravida in fermentum et sollicitudin ac orci. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Fermentum leo vel orci porta non pulvinar neque laoreet."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Egestas diam in arcu cursus. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Augue ut lectus arcu bibendum at varius vel pharetra."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Latest Polls",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Aliquam eleifend mi in nulla posuere sollicitudin. Tempor nec feugiat nisl pretium fusce. Fermentum iaculis eu non diam phasellus vestibulum lorem. Scelerisque eleifend donec pretium vulputate sapien nec. Sit amet aliquam id diam maecenas ultricies mi."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Morbi leo urna molestie at elementum eu. Phasellus vestibulum lorem sed risus. Aliquet bibendum enim facilisis gravida neque. Aliquam sem et tortor consequat id porta. Interdum varius sit amet mattis vulputate enim nulla aliquet. Enim nulla aliquet porttitor lacus luctus accumsan tortor."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Molestie nunc non blandit massa. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Odio morbi quis commodo odio aenean sed adipiscing diam donec. Felis eget velit aliquet sagittis id consectetur purus ut. Odio ut enim blandit volutpat maecenas."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Who's gaining votes",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Risus viverra adipiscing at in tellus integer feugiat scelerisque. Porttitor eget dolor morbi non arcu risus quis varius quam. Consectetur adipiscing elit ut aliquam purus sit. Pulvinar mattis nunc sed blandit."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Non curabitur gravida arcu ac tortor dignissim. Purus in mollis nunc sed id semper risus in hendrerit. Vestibulum morbi blandit cursus risus. Pellentesque nec nam aliquam sem et tortor. Ac tortor dignissim convallis aenean et."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Ullamcorper a lacus vestibulum sed arcu non. Pharetra sit amet aliquam id diam. Viverra vitae congue eu consequat ac felis donec. Amet massa vitae tortor condimentum lacinia quis vel eros."
                                } ]
                            } ]
                        }, {
                            id: "content-politics-around-the-world",
                            name: "Around the World",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Britain",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Sed blandit libero volutpat sed cras ornare arcu dui. Id ornare arcu odio ut sem.",
                                type: "list",
                                content: [ {
                                    content: "Dolor sed viverra ipsum nunc aliquet bibendum enim. Hendrerit dolor magna eget est lorem ipsum dolor."
                                }, {
                                    content: "At elementum eu facilisis sed odio morbi quis commodo odio. In massa tempor nec feugiat nisl."
                                }, {
                                    content: "Est sit amet facilisis magna etiam tempor orci eu. Vulputate dignissim suspendisse in est ante in."
                                }, {
                                    content: "Tempor nec feugiat nisl pretium. Id velit ut tortor pretium viverra suspendisse potenti nullam."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Italy",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Vitae congue mauris rhoncus aenean vel elit.",
                                type: "list",
                                content: [ {
                                    content: "Aliquam sem fringilla ut morbi tincidunt augue interdum. Enim eu turpis egestas pretium aenean pharetra magna ac."
                                }, {
                                    content: "Amet porttitor eget dolor morbi non arcu risus quis varius. Ultricies tristique nulla aliquet enim tortor at auctor."
                                }, {
                                    content: "Nisi lacus sed viverra tellus in hac habitasse platea. Interdum velit euismod in pellentesque."
                                }, {
                                    content: "Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Eu non diam phasellus vestibulum lorem sed risus."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Poland",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Sed id semper risus in hendrerit gravida rutrum quisque.",
                                type: "list",
                                content: [ {
                                    content: "Viverra justo nec ultrices dui sapien eget. A scelerisque purus semper eget duis at tellus at."
                                }, {
                                    content: "Non diam phasellus vestibulum lorem sed risus ultricies tristique. Ornare arcu dui vivamus arcu felis bibendum ut tristique et."
                                }, {
                                    content: "Quisque non tellus orci ac. At augue eget arcu dictum varius."
                                }, {
                                    content: "Aenean sed adipiscing diam donec adipiscing tristique. Sagittis eu volutpat odio facilisis mauris."
                                } ]
                            } ]
                        }, {
                            id: "content-politics-hot-topics",
                            name: "Hot Topics",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Suspendisse sed nisi lacus sed viverra tellus in hac habitasse. Tincidunt id aliquet risus feugiat in. Eget aliquet nibh praesent tristique magna sit amet. Enim lobortis scelerisque fermentum dui faucibus. Molestie ac feugiat sed lectus. Facilisis sed odio morbi quis commodo.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Vitae ultricies leo integer malesuada nunc. Convallis aenean et tortor at risus viverra adipiscing at. Vitae sapien pellentesque habitant morbi tristique senectus. Pellentesque nec nam aliquam sem et tortor consequat id. Fames ac turpis egestas integer.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in. Euismod quis viverra nibh cras. Non sodales neque sodales ut etiam sit. Curabitur vitae nunc sed velit dignissim sodales ut eu. Id leo in vitae turpis massa sed elementum tempus egestas.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Morbi tristique senectus et netus et malesuada fames. Placerat duis ultricies lacus sed turpis tincidunt id aliquet. Habitant morbi tristique senectus et netus et. Laoreet sit amet cursus sit amet dictum sit. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-politics-paid-content",
                            name: "Paid Content",
                            articles: [ {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Duis at consectetur lorem donec massa."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Eget mi proin sed libero enim sed. Proin libero nunc consequat interdum varius."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Porta nibh venenatis cras sed felisDolor sit amet consectetur adipiscing elit ut aliquam purus sit."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Nisl vel pretium lectus quam id leo in vitae. Ultrices neque ornare aenean euismod elementum nisi quis eleifend quam. Eget nullam non nisi est sit. Aliquet enim tortor at auctor urna."
                                } ]
                            } ]
                        } ]
                    },
                    business: {
                        name: "Business",
                        url: "/business",
                        priority: 1,
                        sections: [ {
                            id: "content-business-latest-trends",
                            name: "Latest trends",
                            articles: [ {
                                class: "columns-3-wide",
                                header: "Investing",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone.",
                                    tag: {
                                        type: "breaking",
                                        label: "breaking"
                                    }
                                },
                                title: "Enim lobortis scelerisque fermentum dui faucibus in ornare. Ante metus dictum at tempor.",
                                type: "text",
                                content: "Consequat mauris nunc congue nisi vitae. Felis imperdiet proin fermentum leo vel orci porta. Facilisis gravida neque convallis a cras semper. Risus quis varius quam quisque id diam vel quam. Egestas quis ipsum suspendisse ultrices gravida. Nisl nisi scelerisque eu ultrices vitae auctor.\n\nViverra vitae congue eu consequat ac felis. Vestibulum rhoncus est pellentesque elit ullamcorper. Donec massa sapien faucibus et. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Quis ipsum suspendisse ultrices gravida. Vel facilisis volutpat est velit egestas dui id ornare arcu. Commodo ullamcorper a lacus vestibulum."
                            }, {
                                class: "columns-3-narrow",
                                header: "Media",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Gravida in fermentum et sollicitudin ac. Varius duis at consectetur lorem donec massa sapien faucibus.",
                                type: "text",
                                content: "Nisi quis eleifend quam adipiscing vitae proin. Nunc sed velit dignissim sodales ut. Turpis nunc eget lorem dolor sed. Enim nulla aliquet porttitor lacus. Consequat ac felis donec et. Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Arcu vitae elementum curabitur vitae nunc sed velit dignissim."
                            }, {
                                class: "columns-3-narrow",
                                header: "Insights",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Venenatis urna cursus eget nunc. Adipiscing elit duis tristique sollicitudin.",
                                type: "text",
                                content: "Donec adipiscing tristique risus nec. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Vitae et leo duis ut diam quam. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem.\n\nAc odio tempor orci dapibus ultrices in iaculis nunc. A diam maecenas sed enim ut sem. At quis risus sed vulputate."
                            } ]
                        }, {
                            id: "content-business-market-watch",
                            name: "Market Watch",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Trending",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Dictumst quisque sagittis purus sit amet.",
                                type: "text",
                                content: "Dolor magna eget est lorem. Nibh sit amet commodo nulla facilisi nullam. Etiam non quam lacus suspendisse faucibus interdum. Posuere sollicitudin aliquam ultrices sagittis orci. Massa enim nec dui nunc mattis enim ut tellus. Congue mauris rhoncus aenean vel. Egestas integer eget aliquet nibh praesent tristique."
                            }, {
                                class: "columns-3-balanced",
                                header: "Tech",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Posuere sollicitudin aliquam ultrices sagittis orci a.",
                                type: "text",
                                content: "Praesent elementum facilisis leo vel fringilla est ullamcorper. Scelerisque viverra mauris in aliquam sem fringilla. Donec ac odio tempor orci. Eu augue ut lectus arcu. Diam sollicitudin tempor id eu nisl nunc mi ipsum."
                            }, {
                                class: "columns-3-balanced",
                                header: "Success",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Scelerisque fermentum dui faucibus in.",
                                type: "text",
                                content: "landit volutpat maecenas volutpat blandit. Pulvinar pellentesque habitant morbi tristique senectus et. Facilisis magna etiam tempor orci. Sit amet commodo nulla facilisi nullam vehicula. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed. Mus mauris vitae ultricies leo."
                            } ]
                        }, {
                            id: "content-business-economy-today",
                            name: "Economy Today",
                            articles: [ {
                                class: "columns-wrap",
                                header: "Global Impact",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Bibendum arcu vitae elementum curabitur vitae nunc sed. Ipsum faucibus vitae aliquet nec ullamcorper sit. Blandit libero volutpat sed cras ornare arcu dui. Maecenas sed enim ut sem viverra aliquet."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Arcu risus quis varius quam quisque id diam vel quam. Sed risus pretium quam vulputate dignissim suspendisse in. Amet aliquam id diam maecenas ultricies mi. Egestas dui id ornare arcu odio."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "At risus viverra adipiscing at in tellus. Morbi tempus iaculis urna id volutpat lacus laoreet non. Eu volutpat odio facilisis mauris sit amet. Leo urna molestie at elementum eu facilisis sed."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Outlook",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Ut etiam sit amet nisl purus in mollis nunc sed. Eget mauris pharetra et ultrices neque ornare aenean. Magna sit amet purus gravida quis blandit turpis."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Viverra aliquet eget sit amet tellus cras. Consequat id porta nibh venenatis. Ac felis donec et odio pellentesque diam volutpat commodo sed."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Montes nascetur ridiculus mus mauris vitae ultricies leo integer. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Financial Freedom",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Bibendum arcu vitae elementum curabitur vitae nunc sed. Facilisis mauris sit amet massa vitae tortor condimentum lacinia."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. At in tellus integer feugiat scelerisque varius morbi enim. Nisi vitae suscipit tellus mauris a."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus. In pellentesque massa placerat duis ultricies lacus sed."
                                } ]
                            } ]
                        }, {
                            id: "content-business-must-read",
                            name: "Must Read",
                            articles: [ {
                                class: "columns-1",
                                type: "grid",
                                display: "grid-wrap",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Scelerisque viverra mauris in aliquam sem fringilla ut morbi. Senectus et netus et malesuada fames ac turpis egestas. Et tortor at risus viverra. Iaculis nunc sed augue lacus viverra vitae congue. Nulla aliquet porttitor lacus luctus accumsan.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Vitae justo eget magna fermentum. Vel eros donec ac odio tempor orci dapibus. Volutpat est velit egestas dui id ornare arcu odio. Est sit amet facilisis magna. Bibendum est ultricies integer quis auctor elit. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Nisl tincidunt eget nullam non nisi est sit. At consectetur lorem donec massa sapien faucibus et molestie ac. Semper risus in hendrerit gravida rutrum. Eget aliquet nibh praesent tristique magna sit. Mi quis hendrerit dolor magna eget.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Pulvinar proin gravida hendrerit lectus a. At volutpat diam ut venenatis tellus in metus vulputate eu. Maecenas accumsan lacus vel facilisis volutpat. Enim eu turpis egestas pretium aenean pharetra magna. Orci eu lobortis elementum nibh tellus molestie nunc.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-business-educational",
                            name: "Educational",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Business 101",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Dictumst quisque sagittis purus sit amet.",
                                type: "text",
                                content: "incidunt dui ut ornare lectus sit. Quis varius quam quisque id diam. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Cursus sit amet dictum sit. Lacinia quis vel eros donec ac odio. Accumsan tortor posuere ac ut consequat semper. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Integer malesuada nunc vel risus commodo viverra. Arcu risus quis varius quam quisque id diam vel quam.\n\nEnim neque volutpat ac tincidunt vitae semper quis lectus nulla. Eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Sed tempus urna et pharetra pharetra massa."
                            }, {
                                class: "columns-3-balanced",
                                header: "Startup",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Posuere sollicitudin aliquam ultrices sagittis orci a.",
                                type: "text",
                                content: "Potenti nullam ac tortor vitae purus faucibus. Vulputate mi sit amet mauris. Elit pellentesque habitant morbi tristique senectus. In pellentesque massa placerat duis ultricies. Cras fermentum odio eu feugiat pretium nibh ipsum. Ornare quam viverra orci sagittis eu. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Non diam phasellus vestibulum lorem sed risus. Metus vulputate eu scelerisque felis imperdiet.\n\nMagna ac placerat vestibulum lectus mauris. Lobortis feugiat vivamus at augue eget. Facilisis volutpat est velit egestas dui id ornare arcu odio."
                            }, {
                                class: "columns-3-balanced",
                                header: "Make profit",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Scelerisque fermentum dui faucibus in.",
                                type: "text",
                                content: "Ornare aenean euismod elementum nisi quis. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Nisl nunc mi ipsum faucibus vitae aliquet nec. Eget egestas purus viverra accumsan in nisl nisi scelerisque. Urna duis convallis convallis tellus id interdum velit laoreet. Ultrices sagittis orci a scelerisque purus. Feugiat vivamus at augue eget. Ultricies tristique nulla aliquet enim. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque.\n\nElementum eu facilisis sed odio morbi. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Tortor at risus viverra adipiscing at in tellus."
                            } ]
                        }, {
                            id: "content-business-underscored",
                            name: "Underscored",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Scelerisque viverra mauris in aliquam sem fringilla ut morbi. Senectus et netus et malesuada fames ac turpis egestas. Et tortor at risus viverra. Iaculis nunc sed augue lacus viverra vitae congue. Nulla aliquet porttitor lacus luctus accumsan.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Vitae justo eget magna fermentum. Vel eros donec ac odio tempor orci dapibus. Volutpat est velit egestas dui id ornare arcu odio. Est sit amet facilisis magna. Bibendum est ultricies integer quis auctor elit. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Scelerisque viverra mauris in aliquam sem fringilla ut morbi. Senectus et netus et malesuada fames ac turpis egestas. Et tortor at risus viverra. Iaculis nunc sed augue lacus viverra vitae congue. Nulla aliquet porttitor lacus luctus accumsan.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Vitae justo eget magna fermentum. Vel eros donec ac odio tempor orci dapibus. Volutpat est velit egestas dui id ornare arcu odio. Est sit amet facilisis magna. Bibendum est ultricies integer quis auctor elit. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-business-investing-101",
                            name: "Investing 101",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Manage your assets",
                                type: "articles-list",
                                content: [ {
                                    title: "Ic turpis egestas maecenas pharetra convallis. Dui accumsan sit amet nulla facilisi morbi tempus.",
                                    content: "A scelerisque purus semper eget duis at. Condimentum lacinia quis vel eros donec ac odio. Pretium fusce id velit ut tortor pretium viverra suspendisse. Blandit aliquam etiam erat velit scelerisque in. Est placerat in egestas erat imperdiet sed euismod nisi. Suspendisse potenti nullam ac tortor vitae purus faucibus."
                                }, {
                                    title: "Risus commodo viverra maecenas accumsan lacus vel.",
                                    content: "Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Iaculis eu non diam phasellus. Odio aenean sed adipiscing diam donec. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum."
                                }, {
                                    title: "Vitae ultricies leo integer malesuada nunc vel risus commodo.",
                                    content: "Donec et odio pellentesque diam volutpat. Sed libero enim sed faucibus turpis in eu. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Tristique risus nec feugiat in fermentum. Turpis egestas maecenas pharetra convallis posuere morbi leo urna."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "What to watch",
                                type: "articles-list",
                                content: [ {
                                    title: "Elementum integer enim neque volutpat.",
                                    content: "Dignissim diam quis enim lobortis scelerisque. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Mi bibendum neque egestas congue quisque. Arcu dui vivamus arcu felis bibendum ut tristique. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis."
                                }, {
                                    title: "Vitae turpis massa sed elementum tempus egestas sed.",
                                    content: "Eu lobortis elementum nibh tellus molestie. Egestas congue quisque egestas diam in arcu cursus euismod quis. Purus non enim praesent elementum facilisis. Suscipit tellus mauris a diam maecenas sed enim ut sem. Sed elementum tempus egestas sed sed risus pretium quam."
                                }, {
                                    title: "Consequat ac felis donec et odio pellentesque diam.",
                                    content: "Pharetra diam sit amet nisl suscipit adipiscing bibendum. Mi eget mauris pharetra et ultrices neque ornare. Habitant morbi tristique senectus et netus et. Quis eleifend quam adipiscing vitae. Fames ac turpis egestas maecenas pharetra convallis posuere morbi."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Did you know?",
                                type: "articles-list",
                                content: [ {
                                    title: "Lacus sed viverra tellus in. Eget mi proin sed libero enim sed.",
                                    content: "A diam maecenas sed enim. Platea dictumst vestibulum rhoncus est pellentesque elit. Metus dictum at tempor commodo ullamcorper. Est ullamcorper eget nulla facilisi etiam dignissim diam. Felis eget velit aliquet sagittis id consectetur purus."
                                }, {
                                    title: "Est lorem ipsum dolor sit amet. Duis ultricies lacus sed turpis tincidunt.",
                                    content: "Mattis pellentesque id nibh tortor id aliquet lectus. Odio aenean sed adipiscing diam donec adipiscing. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Dictum varius duis at consectetur lorem donec massa sapien faucibus."
                                }, {
                                    title: "Duis ut diam quam nulla porttitor massa id.",
                                    content: "Id aliquet lectus proin nibh nisl condimentum id venenatis. Ultrices in iaculis nunc sed augue lacus viverra vitae congue. Lectus urna duis convallis convallis tellus id interdum velit. Duis convallis convallis tellus id interdum. Et malesuada fames ac turpis egestas sed."
                                } ]
                            } ]
                        }, {
                            id: "content-business-stock-market",
                            name: "Stock market",
                            articles: [ {
                                class: "columns-wrap",
                                header: "Dow Jones",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Nisi scelerisque eu ultrices vitae auctor eu. Amet massa vitae tortor condimentum lacinia quis vel. In arcu cursus euismod quis."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Tempus urna et pharetra pharetra massa massa ultricies mi. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Sit amet luctus venenatis lectus magna fringilla urna."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. Massa tempor nec feugiat nisl pretium fusce id. Elit ut aliquam purus sit amet luctus."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "S&P 500",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Risus quis varius quam quisque id diam vel quam. Risus at ultrices mi tempus imperdiet nulla malesuada. Aliquet enim tortor at auctor urna. Sapien et ligula ullamcorper malesuada proin libero. Nunc sed augue lacus viverra vitae congue."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Quisque id diam vel quam elementum pulvinar etiam non. Lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis. Ac ut consequat semper viverra nam libero justo."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem. Enim facilisis gravida neque convallis. Quis blandit turpis cursus in hac habitasse platea."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Day Trading",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Sed enim ut sem viverra aliquet eget. Porttitor lacus luctus accumsan tortor. Sit amet justo donec enim diam."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Nibh sit amet commodo nulla facilisi nullam vehicula. Lectus mauris ultrices eros in cursus turpis massa. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Consectetur lorem donec massa sapien faucibus. Aliquet porttitor lacus luctus accumsan tortor. Pharetra pharetra massa massa ultricies mi. Aliquam id diam maecenas ultricies mi eget mauris pharetra. Rhoncus urna neque viverra justo nec ultrices dui sapien eget."
                                } ]
                            } ]
                        }, {
                            id: "content-business-impact",
                            name: "Impact",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Oil crisis",
                                type: "articles-list",
                                content: [ {
                                    title: "Eleifend donec pretium vulputate sapien nec sagittis.",
                                    content: "Adipiscing bibendum est ultricies integer quis. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Suspendisse in est ante in. Semper auctor neque vitae tempus quam pellentesque. Et tortor at risus viverra adipiscing at in tellus integer."
                                }, {
                                    title: "Ornare aenean euismod elementum nisi quis eleifend quam.",
                                    content: "Pretium aenean pharetra magna ac. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Neque vitae tempus quam pellentesque nec nam aliquam sem. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Ipsum nunc aliquet bibendum enim facilisis gravida neque."
                                }, {
                                    title: "Ultrices sagittis orci a scelerisque purus semper. Porttitor massa id neque aliquam vestibulum morbi blandit.",
                                    content: "Augue eget arcu dictum varius. Aliquet nibh praesent tristique magna sit amet purus gravida. Mattis enim ut tellus elementum. A diam sollicitudin tempor id eu nisl nunc mi. Justo nec ultrices dui sapien eget mi proin. Euismod lacinia at quis risus sed vulputate odio."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Tech Markets",
                                type: "articles-list",
                                content: [ {
                                    title: "Dictum sit amet justo donec. Justo donec enim diam vulputate ut pharetra sit.",
                                    content: "Bibendum enim facilisis gravida neque. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Auctor neque vitae tempus quam pellentesque nec. Justo donec enim diam vulputate ut pharetra sit amet. Aliquam sem fringilla ut morbi tincidunt augue interdum velit."
                                }, {
                                    title: "Massa massa ultricies mi quis hendrerit dolor magna eget.",
                                    content: "Ornare massa eget egestas purus viverra accumsan in nisl nisi. A arcu cursus vitae congue mauris rhoncus. Gravida arcu ac tortor dignissim convallis aenean et tortor. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Volutpat diam ut venenatis tellus in metus."
                                }, {
                                    title: "Duis at consectetur lorem donec massa sapien faucibus.",
                                    content: "acilisis gravida neque convallis a cras semper auctor neque. Non nisi est sit amet facilisis magna etiam tempor. Posuere morbi leo urna molestie at elementum eu. Tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Declining Markets",
                                type: "articles-list",
                                content: [ {
                                    title: "Odio aenean sed adipiscing diam donec adipiscing tristique risus nec.",
                                    content: "Pharetra vel turpis nunc eget. Non arcu risus quis varius quam quisque id. Augue ut lectus arcu bibendum at varius vel pharetra vel. Rhoncus dolor purus non enim praesent elementum."
                                }, {
                                    title: "Quis enim lobortis scelerisque fermentum. Nisl rhoncus mattis rhoncus urna. Felis eget velit aliquet sagittis id consectetur purus ut.",
                                    content: "Enim nec dui nunc mattis enim ut. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Sed vulputate mi sit amet mauris commodo. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. In hac habitasse platea dictumst vestibulum rhoncus est."
                                }, {
                                    title: "landit cursus risus at ultrices mi tempus imperdiet nulla malesuada.",
                                    content: "Vitae justo eget magna fermentum iaculis eu non diam phasellus. Et netus et malesuada fames ac turpis. In eu mi bibendum neque egestas congue. Justo eget magna fermentum iaculis eu non diam. Feugiat nibh sed pulvinar proin gravida hendrerit lectus a."
                                } ]
                            } ]
                        }, {
                            id: "content-business-hot-topics",
                            name: "Hot Topics",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "In massa tempor nec feugiat nisl. Mattis vulputate enim nulla aliquet porttitor lacus luctus. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Nec sagittis aliquam malesuada bibendum.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Euismod quis viverra nibh cras pulvinar mattis nunc. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Malesuada bibendum arcu vitae elementum curabitur vitae. Fusce id velit ut tortor.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Scelerisque felis imperdiet proin fermentum leo vel orci. Tortor vitae purus faucibus ornare suspendisse sed nisi. Molestie at elementum eu facilisis sed odio. Pellentesque sit amet porttitor eget. Vitae auctor eu augue ut lectus arcu bibendum at varius.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Potenti nullam ac tortor vitae purus faucibus ornare. Nunc mattis enim ut tellus elementum sagittis vitae et leo. Pellentesque pulvinar pellentesque habitant morbi tristique senectus.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-business-paid-content",
                            name: "Paid Content",
                            articles: [ {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Morbi enim nunc faucibus a pellentesque sit amet porttitor eget."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Cursus vitae congue mauris rhoncus aenean vel elit. Ultrices neque ornare aenean euismod elementum nisi. Aliquet risus feugiat in ante metus dictum at tempor commodo."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Sit amet aliquam id diam maecenas ultricies. Magna sit amet purus gravida quis blandit. Risus nullam eget felis eget nunc. Ac felis donec et odio pellentesque diam volutpat commodo sed."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Purus faucibus ornare suspendisse sed nisi lacus. Malesuada nunc vel risus commodo. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Aliquam malesuada bibendum arcu vitae elementum curabitur. A pellentesque sit amet porttitor eget dolor morbi non."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Tortor at auctor urna nunc id cursus metus aliquam. Facilisis magna etiam tempor orci. Eu nisl nunc mi ipsum faucibus vitae aliquet."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Cursus mattis molestie a iaculis at. Nullam eget felis eget nunc. Tortor id aliquet lectus proin nibh nisl condimentum id."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "arius morbi enim nunc faucibus a pellentesque sit amet porttitor. Blandit libero volutpat sed cras. Sed viverra ipsum nunc aliquet bibendum."
                                } ]
                            } ]
                        } ]
                    },
                    opinion: {
                        name: "Opinion",
                        url: "/opinion",
                        priority: 2,
                        sections: [ {
                            id: "content-opinion-a-deeper-look",
                            name: "A deeper look",
                            articles: [ {
                                class: "columns-3-wide",
                                header: "Latest Facts",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    tag: {
                                        type: "breaking",
                                        label: "breaking"
                                    }
                                },
                                title: "Senectus et netus et malesuada fames ac turpis egestas. Odio facilisis mauris sit amet massa. Ornare quam viverra orci sagittis eu volutpat odio.",
                                type: "text",
                                content: "Lorem ipsum dolor sit amet consectetur. Ridiculus mus mauris vitae ultricies leo. Volutpat ac tincidunt vitae semper quis. In est ante in nibh. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Scelerisque eu ultrices vitae auctor eu augue."
                            }, {
                                class: "columns-3-narrow",
                                header: "Top of our mind",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Nisl pretium fusce id velit ut tortor pretium. Arcu cursus vitae congue mauris rhoncus aenean.",
                                type: "text",
                                content: "Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin. Pharetra vel turpis nunc eget lorem. Morbi tincidunt augue interdum velit euismod in pellentesque massa placerat."
                            }, {
                                class: "columns-3-narrow",
                                header: "Editor Report",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Dignissim enim sit amet venenatis urna cursus.",
                                type: "text",
                                content: "Aenean pharetra magna ac placerat vestibulum lectus mauris. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum.\n\nVitae congue mauris rhoncus aenean vel elit scelerisque. Faucibus turpis in eu mi bibendum neque egestas congue quisque."
                            } ]
                        }, {
                            id: "content-opinion-top-issues",
                            name: "Top Issues",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Thoughts",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Morbi tincidunt ornare massa eget.",
                                type: "list",
                                content: [ {
                                    content: "Tortor consequat id porta nibh venenatis cras sed."
                                }, {
                                    content: "Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur."
                                }, {
                                    content: "Adipiscing diam donec adipiscing tristique risus nec feugiat in."
                                }, {
                                    content: "Ultrices neque ornare aenean euismod elementum nisi quis."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Social commentary",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Sagittis aliquam malesuada bibendum arcu vitae.",
                                type: "list",
                                content: [ {
                                    content: "Nisi porta lorem mollis aliquam ut porttitor leo a diam."
                                }, {
                                    content: "Purus ut faucibus pulvinar elementum integer enim neque volutpat ac."
                                }, {
                                    content: "Suspendisse in est ante in nibh mauris cursus."
                                }, {
                                    content: "Aliquam vestibulum morbi blandit cursus. Leo integer malesuada nunc vel risus commodo viverra maecenas."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Special Projects",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Nulla aliquet enim tortor at auctor urna nunc id.",
                                type: "text",
                                content: "Platea dictumst quisque sagittis purus sit amet volutpat. Vulputate ut pharetra sit amet aliquam id. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Est ante in nibh mauris. Libero volutpat sed cras ornare arcu dui vivamus."
                            } ]
                        }, {
                            id: "content-opinon-trending",
                            name: "Trending",
                            articles: [ {
                                class: "columns-wrap",
                                header: "Around the world",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Egestas congue quisque egestas diam in arcu. Sollicitudin tempor id eu nisl nunc mi."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "A condimentum vitae sapien pellentesque habitant morbi tristique senectus. Neque laoreet suspendisse interdum consectetur."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Dui vivamus arcu felis bibendum. Sit amet purus gravida quis blandit turpis cursus in."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Support",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Malesuada fames ac turpis egestas integer eget. Ante metus dictum at tempor commodo ullamcorper. Ipsum dolor sit amet consectetur."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Dictumst quisque sagittis purus sit amet. Cras fermentum odio eu feugiat pretium. Pretium aenean pharetra magna ac placerat vestibulum lectus."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Et odio pellentesque diam volutpat commodo sed egestas egestas. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Know More",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Nullam eget felis eget nunc. Fames ac turpis egestas integer eget aliquet nibh praesent tristique."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Massa ultricies mi quis hendrerit dolor magna eget est."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Ut tellus elementum sagittis vitae et leo duis ut. Purus ut faucibus pulvinar elementum integer enim."
                                } ]
                            } ]
                        }, {
                            id: "content-opinion-think-about-it",
                            name: "Think about it",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Mental Health",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "olutpat ac tincidunt vitae semper quis lectus nulla at. Non quam lacus suspendisse faucibus interdum posuere lorem..",
                                type: "list",
                                display: "bullets",
                                content: [ {
                                    content: "Et tortor consequat id porta nibh venenatis cras sed felis. Neque aliquam vestibulum morbi blandit cursus risus at ultrices mi.",
                                    url: "#"
                                }, {
                                    content: "Commodo quis imperdiet massa tincidunt nunc. Diam maecenas sed enim ut sem viverra aliquet eget sit.",
                                    url: "#"
                                }, {
                                    content: "Aliquam malesuada bibendum arcu vitae elementum curabitur. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat.",
                                    url: "#"
                                }, {
                                    content: "Quis enim lobortis scelerisque fermentum. Nibh venenatis cras sed felis eget velit aliquet.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Better life",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Placerat vestibulum lectus mauris ultrices. Eros in cursus turpis massa.",
                                type: "list",
                                display: "bullets",
                                content: [ {
                                    content: "In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. At lectus urna duis convallis convallis tellus id interdum.",
                                    url: "#"
                                }, {
                                    content: "Ultrices eros in cursus turpis massa tincidunt dui. Mi tempus imperdiet nulla malesuada pellentesque.",
                                    url: "#"
                                }, {
                                    content: "Ipsum faucibus vitae aliquet nec ullamcorper sit. Eleifend donec pretium vulputate sapien nec sagittis aliquam.",
                                    url: "#"
                                }, {
                                    content: "In hac habitasse platea dictumst. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "The right choice",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Faucibus et molestie ac feugiat. Enim sit amet venenatis urna cursus eget nunc scelerisque viverra.",
                                type: "list",
                                display: "bullets",
                                content: [ {
                                    content: "Urna porttitor rhoncus dolor purus. Eget sit amet tellus cras adipiscing enim.",
                                    url: "#"
                                }, {
                                    content: "Leo urna molestie at elementum eu facilisis sed. Metus dictum at tempor commodo ullamcorper a.",
                                    url: "#"
                                }, {
                                    content: "Non odio euismod lacinia at quis risus sed vulputate.",
                                    url: "#"
                                }, {
                                    content: "Justo donec enim diam vulputate ut. Euismod elementum nisi quis eleifend.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-opinion-latest-media",
                            name: "Latest Media",
                            articles: [ {
                                class: "columns-1",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                } ]
                            } ]
                        }, {
                            id: "content-opinion-in-case-you-missed-it",
                            name: "In case you missed it",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Critical thoughts",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Facilisi morbi tempus iaculis urna id. Nibh cras pulvinar mattis nunc sed.",
                                type: "list",
                                content: [ {
                                    content: "Eget felis eget nunc lobortis mattis aliquam faucibus purus in."
                                }, {
                                    content: "Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus."
                                }, {
                                    content: "Eu volutpat odio facilisis mauris sit amet massa."
                                }, {
                                    content: "Vitae tortor condimentum lacinia quis vel eros donec ac."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Critical Thinking",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Euismod nisi porta lorem mollis aliquam ut porttitor leo a.",
                                type: "list",
                                content: [ {
                                    content: "Enim facilisis gravida neque convallis a."
                                }, {
                                    content: "Ridiculus mus mauris vitae ultricies leo integer malesuada."
                                }, {
                                    content: "Elementum nisi quis eleifend quam. Sed elementum tempus egestas sed sed."
                                }, {
                                    content: "Ut tellus elementum sagittis vitae et leo duis ut diam. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Critical Actions",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Amet dictum sit amet justo donec enim diam.",
                                type: "list",
                                content: [ {
                                    content: "Metus dictum at tempor commodo ullamcorper a lacus vestibulum."
                                }, {
                                    content: "In nisl nisi scelerisque eu ultrices. In fermentum et sollicitudin ac orci phasellus egestas."
                                }, {
                                    content: "Ut aliquam purus sit amet luctus venenatis lectus magna fringilla."
                                }, {
                                    content: "Morbi enim nunc faucibus a pellentesque. Mi ipsum faucibus vitae aliquet nec ullamcorper."
                                } ]
                            } ]
                        }, {
                            id: "content-opinion-environmental-issues",
                            name: "Environmental Issues",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Global Warming",
                                type: "articles-list",
                                content: [ {
                                    title: "Dis parturient montes nascetur ridiculus mus mauris vitae.",
                                    content: "Justo donec enim diam vulputate ut pharetra sit amet aliquam. Curabitur vitae nunc sed velit dignissim sodales. Varius vel pharetra vel turpis nunc eget lorem. Sed viverra ipsum nunc aliquet bibendum. Ultrices in iaculis nunc sed augue."
                                }, {
                                    title: "Vitae turpis massa sed elementum tempus egestas sed sed risus.",
                                    content: "Nascetur ridiculus mus mauris vitae ultricies leo integer. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Gravida arcu ac tortor dignissim convallis aenean. Urna duis convallis convallis tellus id interdum."
                                }, {
                                    title: "Rutrum tellus pellentesque eu tincidunt tortor. Volutpat sed cras ornare arcu.",
                                    content: "estibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Urna porttitor rhoncus dolor purus. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Ultrices in iaculis nunc sed augue lacus. Nunc pulvinar sapien et ligula ullamcorper."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Recycling",
                                type: "articles-list",
                                content: [ {
                                    title: "Tellus id interdum velit laoreet id donec ultrices tincidunt arcu.",
                                    content: "Eget est lorem ipsum dolor sit amet. Faucibus scelerisque eleifend donec pretium vulputate sapien. Quam adipiscing vitae proin sagittis. Quisque id diam vel quam elementum pulvinar etiam non. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean."
                                }, {
                                    title: "Scelerisque viverra mauris in aliquam sem fringilla ut.",
                                    content: "Amet mauris commodo quis imperdiet. Eu consequat ac felis donec et odio pellentesque. Hendrerit gravida rutrum quisque non tellus orci ac. Amet cursus sit amet dictum."
                                }, {
                                    title: "Vulputate eu scelerisque felis imperdiet. Non quam lacus suspendisse faucibus interdum posuere.",
                                    content: "Luctus venenatis lectus magna fringilla urna porttitor. Hac habitasse platea dictumst vestibulum rhoncus. Orci a scelerisque purus semper eget duis at tellus. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "New researches",
                                type: "articles-list",
                                content: [ {
                                    title: "Non quam lacus suspendisse faucibus.",
                                    content: "Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Odio euismod lacinia at quis. Molestie a iaculis at erat. Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Donec ac odio tempor orci dapibus."
                                }, {
                                    title: "Sit amet consectetur adipiscing elit. Lorem sed risus ultricies tristique nulla aliquet.",
                                    content: "Neque aliquam vestibulum morbi blandit cursus risus at. Habitant morbi tristique senectus et netus et. Quis blandit turpis cursus in. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Vel risus commodo viverra maecenas. Tortor dignissim convallis aenean et tortor at."
                                }, {
                                    title: "Ullamcorper sit amet risus nullam eget.",
                                    content: "urpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Mollis aliquam ut porttitor leo a diam. Posuere morbi leo urna molestie. Suscipit tellus mauris a diam maecenas sed. Ultrices dui sapien eget mi proin sed libero enim sed."
                                } ]
                            } ]
                        }, {
                            id: "content-opinion-underscored",
                            name: "Underscored",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Faucibus interdum posuere lorem ipsum. Aliquam nulla facilisi cras fermentum odio. Odio facilisis mauris sit amet massa vitae. Et tortor at risus viverra adipiscing. Luctus accumsan tortor posuere ac ut consequat semper viverra nam.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Montes nascetur ridiculus mus mauris vitae. Amet porttitor eget dolor morbi non arcu risus quis varius. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. A lacus vestibulum sed arcu non odio euismod lacinia.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Volutpat consequat mauris nunc congue. Arcu dui vivamus arcu felis bibendum ut tristique. Fringilla ut morbi tincidunt augue. Libero enim sed faucibus turpis in eu mi bibendum. Posuere ac ut consequat semper viverra.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Nec nam aliquam sem et. Maecenas ultricies mi eget mauris pharetra. Nibh nisl condimentum id venenatis a condimentum vitae sapien. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-opinon-what-matters-most",
                            name: "What matters most",
                            articles: [ {
                                class: "columns-wrap",
                                header: "Discussion",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Nibh sed pulvinar proin gravida hendrerit lectus. Habitasse platea dictumst quisque sagittis purus sit amet. Mi sit amet mauris commodo quis."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Arcu non odio euismod lacinia. Ac turpis egestas sed tempus urna."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Lectus sit amet est placerat in. Auctor augue mauris augue neque gravida in fermentum. Duis convallis convallis tellus id interdum."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Is it worth it?",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Venenatis tellus in metus vulputate eu scelerisque felis. Orci phasellus egestas tellus rutrum tellus pellentesque eu. Id leo in vitae turpis massa sed elementum."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Feugiat vivamus at augue eget arcu dictum varius duis at. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Eget sit amet tellus cras adipiscing enim eu. Dictum at tempor commodo ullamcorper a lacus. Lectus proin nibh nisl condimentum id venenatis a condimentum vitae."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Just do it",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Mattis rhoncus urna neque viverra. Hendrerit gravida rutrum quisque non tellus orci ac. Ut venenatis tellus in metus."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Enim ut tellus elementum sagittis vitae et leo duis. Dictumst quisque sagittis purus sit amet volutpat consequat."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "urus ut faucibus pulvinar elementum integer enim neque. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque."
                                } ]
                            } ]
                        }, {
                            id: "content-opinion-hot-topics",
                            name: "Hot Topics",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Feugiat in ante metus dictum at tempor. Faucibus scelerisque eleifend donec pretium. Turpis egestas integer eget aliquet nibh praesent. In metus vulputate eu scelerisque felis imperdiet. Diam maecenas sed enim ut sem. Quis imperdiet massa tincidunt nunc pulvinar sapien et.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Massa eget egestas purus viverra accumsan in nisl nisi. Sodales ut eu sem integer. Ac tortor dignissim convallis aenean et tortor. Erat velit scelerisque in dictum non consectetur. Id venenatis a condimentum vitae sapien pellentesque habitant.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Nisl rhoncus mattis rhoncus urna. Ligula ullamcorper malesuada proin libero nunc consequat interdum. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Pellentesque nec nam aliquam sem et tortor consequat. Consequat interdum varius sit amet mattis. Diam sit amet nisl suscipit adipiscing bibendum est ultricies.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper. Nulla aliquet enim tortor at auctor urna. In arcu cursus euismod quis viverra nibh cras pulvinar mattis.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-opinion-paid-content",
                            name: "Paid Content",
                            articles: [ {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Nulla facilisi nullam vehicula ipsum. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. Diam phasellus vestibulum lorem sed risus ultricies."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Dictum fusce ut placerat orci nulla. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Sed cras ornare arcu dui vivamus. Eget nunc lobortis mattis aliquam faucibus purus in. Nulla facilisi nullam vehicula ipsum a. Sed faucibus turpis in eu mi bibendum."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Mauris nunc congue nisi vitae suscipit tellus. Auctor augue mauris augue neque gravida in. Phasellus vestibulum lorem sed risus ultricies."
                                } ]
                            } ]
                        } ]
                    },
                    health: {
                        name: "Health",
                        url: "/health",
                        priority: 2,
                        sections: [ {
                            id: "content-health-trending",
                            name: "Trending",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Mindfulness",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Consectetur lorem donec massa sapien faucibus et.",
                                type: "list",
                                content: [ {
                                    content: "Eu turpis egestas pretium aenean pharetra. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant."
                                }, {
                                    content: "Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim."
                                }, {
                                    content: "Eu non diam phasellus vestibulum lorem. Fermentum dui faucibus in ornare quam viverra orci sagittis."
                                }, {
                                    content: "Et malesuada fames ac turpis. Ornare massa eget egestas purus viverra accumsan."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Latest research",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Sed velit dignissim sodales ut eu sem integer vitae.",
                                type: "list",
                                content: [ {
                                    content: "Metus vulputate eu scelerisque felis."
                                }, {
                                    content: "Aliquam sem et tortor consequat id. Feugiat nibh sed pulvinar proin."
                                }, {
                                    content: "Quisque non tellus orci ac auctor augue."
                                }, {
                                    content: "Sed risus pretium quam vulputate dignissim. Vitae tortor condimentum lacinia quis vel eros."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Healthy Senior",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Scelerisque in dictum non consectetur a.",
                                type: "list",
                                content: [ {
                                    content: "Odio euismod lacinia at quis risus sed vulputate odio. Ullamcorper eget nulla facilisi etiam."
                                }, {
                                    content: "Ipsum consequat nisl vel pretium. Nisi vitae suscipit tellus mauris a diam."
                                }, {
                                    content: "Laoreet id donec ultrices tincidunt arcu non sodales neque sodales."
                                }, {
                                    content: "At volutpat diam ut venenatis tellus in metus vulputate eu."
                                } ]
                            } ]
                        }, {
                            id: "content-health-latest-facts",
                            name: "Latest Facts",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "More Life, But Better",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Sed tempus urna et pharetra pharetra massa massa ultricies mi.",
                                type: "list",
                                content: [ {
                                    content: "Pharetra vel turpis nunc eget. Eu feugiat pretium nibh ipsum consequat."
                                }, {
                                    content: "Velit dignissim sodales ut eu sem. Viverra accumsan in nisl nisi scelerisque eu ultrices."
                                }, {
                                    content: "Arcu dictum varius duis at consectetur lorem donec massa sapien."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "In case you missed it",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Egestas pretium aenean pharetra magna ac.",
                                type: "text",
                                content: "Lectus proin nibh nisl condimentum id venenatis a condimentum vitae. Tincidunt praesent semper feugiat nibh sed pulvinar proin.\n\nQuis ipsum suspendisse ultrices gravida dictum fusce. Id donec ultrices tincidunt arcu non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames."
                            }, {
                                class: "columns-3-balanced",
                                header: "Space and science",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Vitae ultricies leo integer malesuada nunc vel risus.",
                                type: "list",
                                display: "bullets",
                                content: [ {
                                    content: "Semper eget duis at tellus at urna condimentum.",
                                    url: "#"
                                }, {
                                    content: "Aliquet lectus proin nibh nisl condimentum id. Velit scelerisque in dictum non.",
                                    url: "#"
                                }, {
                                    content: "Nulla posuere sollicitudin aliquam ultrices sagittis orci.",
                                    url: "#"
                                }, {
                                    content: "Condimentum vitae sapien pellentesque habitant. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-health-medical-breakthroughs",
                            name: "Medical Breakthroughs",
                            articles: [ {
                                class: "columns-3-wide",
                                header: "Surgical Inventions",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone.",
                                    tag: {
                                        type: "breaking",
                                        label: "breaking"
                                    }
                                },
                                title: "Nisi est sit amet facilisis magna etiam tempor. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla.",
                                type: "text",
                                content: "Ut eu sem integer vitae justo eget. Ut aliquam purus sit amet luctus. Sit amet mauris commodo quis imperdiet massa tincidunt. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Turpis nunc eget lorem dolor sed. Ultrices in iaculis nunc sed augue lacus. Quam elementum pulvinar etiam non. Urna cursus eget nunc scelerisque. Nisl purus in mollis nunc sed."
                            }, {
                                class: "columns-3-narrow",
                                header: "Medicare",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Cras semper auctor neque vitae. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc.",
                                type: "text",
                                content: "Lacus sed viverra tellus in hac habitasse. Sapien faucibus et molestie ac feugiat sed lectus. Pretium aenean pharetra magna ac. Volutpat odio facilisis mauris sit amet massa vitae tortor condimentum. Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id.\n\nParturient montes nascetur ridiculus mus mauris. Ultrices eros in cursus turpis. Bibendum at varius vel pharetra vel turpis. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor."
                            }, {
                                class: "columns-3-narrow",
                                header: "Medication",
                                url: "#",
                                image: {
                                    src: "placeholder_light.jpg",
                                    alt: "Placeholder",
                                    width: "1280",
                                    height: "720"
                                },
                                meta: {
                                    captions: "Photo taken by someone."
                                },
                                title: "Ipsum dolor sit amet consectetur adipiscing elit. Velit scelerisque in dictum non consectetur a erat nam.",
                                type: "text",
                                content: "Mattis molestie a iaculis at erat pellentesque adipiscing. Sed augue lacus viverra vitae congue. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Lacus laoreet non curabitur gravida arcu. Nisl nisi scelerisque eu ultrices vitae auctor.\n\nInteger vitae justo eget magna fermentum iaculis eu non. Sollicitudin ac orci phasellus egestas. Ligula ullamcorper malesuada proin libero nunc consequat interdum."
                            } ]
                        }, {
                            id: "content-health-latest-videos",
                            name: "Latest Videos",
                            articles: [ {
                                class: "columns-1",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "watch",
                                            label: "watch"
                                        }
                                    }
                                } ]
                            } ]
                        }, {
                            id: "content-health-educational",
                            name: "Educational",
                            articles: [ {
                                class: "columns-1",
                                type: "grid",
                                display: "grid-wrap",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Orci phasellus egestas tellus rutrum tellus pellentesque eu. Pulvinar neque laoreet suspendisse interdum consectetur. Viverra maecenas accumsan lacus vel facilisis volutpat. Nibh ipsum consequat nisl vel pretium lectus quam id. Leo integer malesuada nunc vel risus commodo viverra.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Proin libero nunc consequat interdum varius sit amet. Convallis posuere morbi leo urna molestie at. Consectetur lorem donec massa sapien faucibus et molestie ac feugiat. Egestas diam in arcu cursus euismod quis viverra nibh.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Elit sed vulputate mi sit. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Magna eget est lorem ipsum dolor sit amet consectetur. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Nam libero justo laoreet sit.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Nam aliquam sem et tortor consequat. Non sodales neque sodales ut etiam sit amet nisl purus. Viverra mauris in aliquam sem. Leo vel fringilla est ullamcorper. Tellus at urna condimentum mattis pellentesque id nibh tortor. Lacus laoreet non curabitur gravida. Ut morbi tincidunt augue interdum velit euismod in pellentesque.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Egestas integer eget aliquet nibh praesent tristique magna sit. Id consectetur purus ut faucibus. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Lectus proin nibh nisl condimentum id. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-health-fitness",
                            name: "Fitness",
                            articles: [ {
                                class: "columns-wrap",
                                header: "Burn your calories",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Dictumst quisque sagittis purus sit amet volutpat consequat. At imperdiet dui accumsan sit amet nulla facilisi. Felis bibendum ut tristique et egestas. Mus mauris vitae ultricies leo integer malesuada. Adipiscing at in tellus integer feugiat."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Morbi non arcu risus quis varius quam quisque id. Enim nulla aliquet porttitor lacus luctus. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Consequat semper viverra nam libero justo laoreet sit."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Gravida quis blandit turpis cursus in hac habitasse platea. Maecenas ultricies mi eget mauris pharetra et ultrices. Massa sed elementum tempus egestas sed."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Gym favorites",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Nulla facilisi nullam vehicula ipsum a arcu cursus. Et ultrices neque ornare aenean euismod elementum nisi quis. Velit euismod in pellentesque massa. In fermentum posuere urna nec tincidunt praesent semper."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Sit amet consectetur adipiscing elit duis tristique sollicitudin. Ante metus dictum at tempor commodo ullamcorper. Tincidunt eget nullam non nisi est sit. Platea dictumst quisque sagittis purus sit amet volutpat consequat."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Sed vulputate odio ut enim blandit volutpat maecenas. Risus viverra adipiscing at in. Fusce id velit ut tortor pretium viverra. Sem nulla pharetra diam sit amet nisl. Posuere urna nec tincidunt praesent semper feugiat nibh."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Pilates",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Massa massa ultricies mi quis hendrerit dolor magna. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Vestibulum lorem sed risus ultricies tristique. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Massa enim nec dui nunc mattis enim ut tellus elementum. Eros in cursus turpis massa tincidunt dui. Sit amet consectetur adipiscing elit ut aliquam purus sit amet. Eget nullam non nisi est sit amet facilisis magna."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "enenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. In eu mi bibendum neque egestas congue quisque egestas. Bibendum est ultricies integer quis auctor elit. Ipsum nunc aliquet bibendum enim facilisis. Magna fringilla urna porttitor rhoncus dolor purus non enim praesent."
                                } ]
                            } ]
                        }, {
                            id: "content-health-guides",
                            name: "Guides",
                            articles: [ {
                                class: "columns-3-balanced",
                                header: "Health after 50",
                                type: "articles-list",
                                content: [ {
                                    title: "Ac ut consequat semper viverra nam libero justo.",
                                    content: "A lacus vestibulum sed arcu non odio euismod lacinia at. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Enim nec dui nunc mattis enim ut tellus. Congue eu consequat ac felis donec et odio. Vitae sapien pellentesque habitant morbi tristique senectus."
                                }, {
                                    title: "Sit amet porttitor eget dolor morbi non arcu risus quis.",
                                    content: "Gravida in fermentum et sollicitudin. Diam sollicitudin tempor id eu nisl. Proin libero nunc consequat interdum varius sit amet. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Lacinia quis vel eros donec ac."
                                }, {
                                    title: "Faucibus nisl tincidunt eget nullam non nisi.",
                                    content: "Diam ut venenatis tellus in metus. Luctus accumsan tortor posuere ac. Eget aliquet nibh praesent tristique magna. Diam donec adipiscing tristique risus nec feugiat in fermentum posuere. Dolor morbi non arcu risus quis varius quam quisque."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Healthy Heart",
                                type: "articles-list",
                                content: [ {
                                    title: "Gravida cum sociis natoque penatibus et magnis dis parturient montes.",
                                    content: "Nulla porttitor massa id neque aliquam vestibulum morbi. Nullam non nisi est sit amet facilisis. Vitae turpis massa sed elementum tempus. Varius duis at consectetur lorem. Consequat semper viverra nam libero justo laoreet sit."
                                }, {
                                    title: "Non nisi est sit amet facilisis magna etiam tempor orci.",
                                    content: "At augue eget arcu dictum varius duis at. Arcu felis bibendum ut tristique et egestas. Elementum tempus egestas sed sed risus pretium quam vulputate. Cursus euismod quis viverra nibh cras pulvinar. Praesent tristique magna sit amet purus gravida quis."
                                }, {
                                    title: "Sit amet justo donec enim diam vulputate ut pharetra.",
                                    content: "Nulla at volutpat diam ut venenatis tellus. Pulvinar mattis nunc sed blandit libero volutpat. Sit amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant."
                                } ]
                            }, {
                                class: "columns-3-balanced",
                                header: "Healthy Digestive",
                                type: "articles-list",
                                content: [ {
                                    title: "Metus aliquam eleifend mi in nulla posuere sollicitudin.",
                                    content: "Sodales ut etiam sit amet nisl purus in. Lorem ipsum dolor sit amet consectetur. Tincidunt ornare massa eget egestas purus viverra accumsan in. Orci eu lobortis elementum nibh tellus molestie nunc non. Ut faucibus pulvinar elementum integer enim neque."
                                }, {
                                    title: "Placerat duis ultricies lacus sed. Donec enim diam vulputate ut.",
                                    content: "Condimentum id venenatis a condimentum vitae sapien. Eu ultrices vitae auctor eu augue ut lectus. Fermentum iaculis eu non diam phasellus. Urna nunc id cursus metus aliquam eleifend mi. Venenatis cras sed felis eget velit aliquet sagittis."
                                }, {
                                    title: "Rhoncus dolor purus non enim praesent elementum facilisis.",
                                    content: "Nunc consequat interdum varius sit. Non diam phasellus vestibulum lorem sed risus ultricies. Feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Eget egestas purus viverra accumsan in nisl nisi scelerisque."
                                } ]
                            } ]
                        }, {
                            id: "content-health-underscored",
                            name: "Underscored",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Lectus arcu bibendum at varius. Sed id semper risus in hendrerit gravida rutrum. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida. Euismod nisi porta lorem mollis. At varius vel pharetra vel turpis.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Lacus sed turpis tincidunt id. Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut. Dapibus ultrices in iaculis nunc sed.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Tempus iaculis urna id volutpat lacus laoreet non. Elementum nisi quis eleifend quam adipiscing vitae proin. Vel pretium lectus quam id leo. Eget sit amet tellus cras adipiscing enim eu turpis.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Adipiscing vitae proin sagittis nisl rhoncus. Euismod in pellentesque massa placerat duis. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Quam nulla porttitor massa id neque.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-health-what-to-eat",
                            name: "What to eat",
                            articles: [ {
                                class: "columns-wrap",
                                header: "Low carbs",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Nec feugiat in fermentum posuere urna. Odio ut sem nulla pharetra. Est ultricies integer quis auctor elit sed. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Egestas sed tempus urna et. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Sapien pellentesque habitant morbi tristique senectus et netus et malesuada. Dictum non consectetur a erat. Duis ut diam quam nulla porttitor."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Vegetarian",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Sed viverra tellus in hac habitasse platea dictumst vestibulum. Nisi est sit amet facilisis magna etiam."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Convallis a cras semper auctor neque vitae tempus. Cursus risus at ultrices mi tempus imperdiet nulla."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Ut faucibus pulvinar elementum integer enim neque volutpat. Netus et malesuada fames ac turpis egestas sed tempus urna."
                                } ]
                            }, {
                                class: "columns-wrap",
                                header: "Breakfast",
                                type: "excerpt",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Eget mauris pharetra et ultrices. In ante metus dictum at tempor commodo ullamcorper a. Ut sem nulla pharetra diam sit."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Lacus sed turpis tincidunt id aliquet risus. Nulla facilisi etiam dignissim diam quis enim. Non curabitur gravida arcu ac tortor dignissim convallis aenean."
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    text: "Aliquam etiam erat velit scelerisque in dictum non. Pretium fusce id velit ut tortor pretium viverra."
                                } ]
                            } ]
                        }, {
                            id: "content-health-hot-topics",
                            name: "Hot Topics",
                            articles: [ {
                                class: "columns-2-balanced",
                                header: "This First",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Augue ut lectus arcu bibendum at varius. Cursus turpis massa tincidunt dui. Feugiat scelerisque varius morbi enim. Vel orci porta non pulvinar. Est velit egestas dui id ornare arcu odio. Amet porttitor eget dolor morbi non arcu risus quis. Turpis in eu mi bibendum neque egestas.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "new",
                                            label: "new"
                                        }
                                    },
                                    text: "Et pharetra pharetra massa massa. Commodo odio aenean sed adipiscing diam donec adipiscing. In mollis nunc sed id semper risus in hendrerit. A diam sollicitudin tempor id eu nisl nunc. Sit amet consectetur adipiscing elit duis tristique.",
                                    url: "#"
                                } ]
                            }, {
                                class: "columns-2-balanced",
                                header: "This Second",
                                type: "grid",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Ac tincidunt vitae semper quis lectus nulla. Porttitor massa id neque aliquam. Sed faucibus turpis in eu mi bibendum neque egestas congue. Tincidunt id aliquet risus feugiat in ante metus. Hendrerit gravida rutrum quisque non tellus orci ac auctor augue. Augue eget arcu dictum varius duis at.",
                                    url: "#"
                                }, {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    meta: {
                                        tag: {
                                            type: "breaking",
                                            label: "breaking"
                                        }
                                    },
                                    text: "Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Ipsum dolor sit amet consectetur. Non diam phasellus vestibulum lorem sed risus. Porttitor lacus luctus accumsan tortor. Morbi enim nunc faucibus a pellentesque sit amet porttitor. Vel turpis nunc eget lorem. Ligula ullamcorper malesuada proin libero.",
                                    url: "#"
                                } ]
                            } ]
                        }, {
                            id: "content-health-paid-content",
                            name: "Paid Content",
                            articles: [ {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Eu sem integer vitae justo eget magna fermentum iaculis. Aenean pharetra magna ac placerat vestibulum lectus. Amet commodo nulla facilisi nullam."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Nullam vehicula ipsum a arcu cursus vitae congue. Enim ut tellus elementum sagittis vitae et leo duis. Nulla malesuada pellentesque elit eget."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Est velit egestas dui id ornare arcu odio. Urna nunc id cursus metus. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit."
                                } ]
                            }, {
                                class: "columns-4-balanced",
                                type: "preview",
                                content: [ {
                                    image: {
                                        src: "placeholder_light.jpg",
                                        alt: "Placeholder",
                                        width: "1280",
                                        height: "720"
                                    },
                                    title: "Erat imperdiet sed euismod nisi porta. Nullam ac tortor vitae purus faucibus ornare. Feugiat nisl pretium fusce id. Massa enim nec dui nunc mattis enim ut tellus elementum."
                                } ]
                            } ]
                        } ]
                    }
                },
                settings: {
                    header: "Settings",
                    items: {
                        motion: {
                            label: "Reduced Motion"
                        }
                    }
                },
                footer: {
                    copyright: {
                        label: "all rights reserved!"
                    }
                },
                buttons: a,
                links: s
            }
        }, Ze = (0, r.createContext)(null), Ye = e => {
            let {children: t} = e;
            const i = new URLSearchParams(window.location.search);
            var a;
            const s = null !== (a = i.get("dir")) && void 0 !== a ? a : "ltr", l = i.get("lang"), r = l && l in $e ? l : "en";
            document.documentElement.setAttribute("dir", s), document.documentElement.setAttribute("lang", r);
            const u = {
                lang: r,
                dir: s,
                ...$e[r]
            };
            return (0, n.jsx)(Ze.Provider, {
                value: u,
                children: t
            });
        }, Xe = () => {
            const e = (0, r.useContext)(Ze);
            if (!e) throw new Error("A DataProvider must be rendered before using useDataContext");
            return e;
        };
        var et = i(4660), tt = i.n(et);
        function it(e) {
            let {children: t, animatedIconClass: i} = e;
            const [a, s] = (0, r.useState)(!1), {buttons: l} = Xe();
            return (0, n.jsxs)("div", {
                className: tt().dropdown,
                children: [ (0, n.jsx)("input", {
                    type: "checkbox",
                    id: "navbar-dropdown-toggle",
                    className: tt()["dropdown-toggle"],
                    onChange: function(e) {
                        s(e.target.checked);
                    },
                    checked: a
                }), (0, n.jsxs)("label", {
                    htmlFor: "navbar-dropdown-toggle",
                    className: tt()["dropdown-label"],
                    children: [ (0, n.jsx)("span", {
                        className: tt()["dropdown-label-text"],
                        children: l.more.label
                    }), (0, n.jsx)("div", {
                        className: He()("animated-icon", "arrow-icon", "arrow", i),
                        children: (0, n.jsxs)("span", {
                            className: "animated-icon-inner",
                            title: "Arrow Icon",
                            children: [ (0, n.jsx)("span", {}), (0, n.jsx)("span", {}) ]
                        })
                    }) ]
                }), (0, n.jsx)("ul", {
                    className: tt()["dropdown-content"],
                    onClick: function() {
                        s(!1);
                    },
                    children: t
                }) ]
            });
        }
        var at = i(7648), st = i.n(at);
        function lt(e) {
            let {id: t, label: i, url: a, callback: s, itemClass: l} = e;
            return (0, n.jsx)("li", {
                className: He()(st()["navbar-item"], l),
                onClick: s,
                children: (0, n.jsx)(Pe, {
                    to: a,
                    id: t,
                    className: e => {
                        let {isActive: t} = e;
                        return He()({
                            [st().active]: t
                        });
                    },
                    children: i
                })
            });
        }
        function nt(e) {
            let {callback: t, id: i} = e;
            const {content: a} = Xe(), s = [], l = [];
            return Object.keys(a).forEach((e => {
                1 === a[e].priority ? s.push(e) : 2 === a[e].priority && l.push(e);
            })), (0, n.jsxs)("ul", {
                className: st()["navbar-list"],
                children: [ s.map((e => (0, n.jsx)(lt, {
                    id: "".concat(i, "-").concat(e, "-link"),
                    label: a[e].name,
                    url: a[e].url,
                    callback: t
                }, e))), l.length > 0 ? (0, n.jsx)("li", {
                    className: st()["navbar-item"],
                    children: (0, n.jsx)(it, {
                        animatedIconClass: st()["navbar-label-icon"],
                        children: l.map((e => (0, n.jsx)(lt, {
                            id: "".concat(i, "-").concat(e, "-link"),
                            label: a[e].name,
                            url: a[e].url,
                            callback: t,
                            itemClass: st()["navbar-dropdown-item"]
                        }, e)))
                    })
                }) : null ]
            });
        }
        function rt() {
            return (0, n.jsxs)("svg", {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                children: [ (0, n.jsx)("title", {
                    children: "Logo Icon"
                }), (0, n.jsx)("path", {
                    d: "M2 24h2.948c1-.923 2.004-2 3.55-2 1.547 0 2.55 1.077 3.55 2h2.948l-6.498-6-6.498 6zm20-8.042c0 3.269-5.858 3.387-9.787 1.79-6.835-2.779-9.629-9.79-7.817-15.17.84-2.496 1.852-3.84 6.333-.922 1.101.716 2.27 1.649 3.437 2.722l-1.72 1.152c-7.717-7.009-6.992-2.036-.983 4.55 5.858 6.417 11.668 8.615 5.767.717l1.199-1.745c1.223 1.634 3.571 4.873 3.571 6.906zm-1.026-12.437c-.004.829-.68 1.497-1.508 1.492-.225-.001-.436-.056-.628-.146l-3.829 5.646c-.784-.555-1.994-1.768-2.548-2.554l5.682-3.77c-.104-.207-.169-.437-.168-.684.005-.829.68-1.497 1.507-1.492.828.005 1.497.68 1.492 1.508z"
                }) ]
            });
        }
        function ut() {
            return (0, n.jsxs)("svg", {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                children: [ (0, n.jsx)("title", {
                    children: "Facebook Icon"
                }), (0, n.jsx)("path", {
                    d: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                }) ]
            });
        }
        function ct() {
            return (0, n.jsxs)("svg", {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                children: [ (0, n.jsx)("title", {
                    children: "Instagram Icon"
                }), (0, n.jsx)("path", {
                    d: "M11.984 16.815c2.596 0 4.706-2.111 4.706-4.707 0-1.409-.623-2.674-1.606-3.538-.346-.303-.735-.556-1.158-.748-.593-.27-1.249-.421-1.941-.421s-1.349.151-1.941.421c-.424.194-.814.447-1.158.749-.985.864-1.608 2.129-1.608 3.538 0 2.595 2.112 4.706 4.706 4.706zm.016-8.184c1.921 0 3.479 1.557 3.479 3.478 0 1.921-1.558 3.479-3.479 3.479s-3.479-1.557-3.479-3.479c0-1.921 1.558-3.478 3.479-3.478zm5.223.369h6.777v10.278c0 2.608-2.114 4.722-4.722 4.722h-14.493c-2.608 0-4.785-2.114-4.785-4.722v-10.278h6.747c-.544.913-.872 1.969-.872 3.109 0 3.374 2.735 6.109 6.109 6.109s6.109-2.735 6.109-6.109c.001-1.14-.327-2.196-.87-3.109zm2.055-9h-12.278v5h-1v-5h-1v5h-1v-4.923c-.346.057-.682.143-1 .27v4.653h-1v-4.102c-1.202.857-2 2.246-2 3.824v3.278h7.473c1.167-1.282 2.798-2 4.511-2 1.722 0 3.351.725 4.511 2h7.505v-3.278c0-2.608-2.114-4.722-4.722-4.722zm2.722 5.265c0 .406-.333.735-.745.735h-2.511c-.411 0-.744-.329-.744-.735v-2.53c0-.406.333-.735.744-.735h2.511c.412 0 .745.329.745.735v2.53z"
                }) ]
            });
        }
        function ot() {
            return (0, n.jsxs)("svg", {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                children: [ (0, n.jsx)("title", {
                    children: "Twitter Icon"
                }), (0, n.jsx)("path", {
                    d: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                }) ]
            });
        }
        var mt = i(3228), dt = i.n(mt);
        function pt(e) {
            let {id: t} = e;
            const {links: i} = Xe();
            return (0, n.jsx)("div", {
                className: dt()["icons-group"],
                children: (0, n.jsxs)("ul", {
                    className: dt()["icons-group-list"],
                    children: [ (0, n.jsx)("li", {
                        className: dt()["icons-group-item"],
                        children: (0, n.jsx)("a", {
                            href: i.social.facebook.href,
                            id: "".concat(t, "-facebook"),
                            children: (0, n.jsx)("div", {
                                className: dt()["group-icon"],
                                children: (0, n.jsx)(ut, {})
                            })
                        })
                    }), (0, n.jsx)("li", {
                        className: dt()["icons-group-item"],
                        children: (0, n.jsx)("a", {
                            href: i.social.instagram.href,
                            id: "".concat(t, "-instagram"),
                            children: (0, n.jsx)("div", {
                                className: dt()["group-icon"],
                                children: (0, n.jsx)(ct, {})
                            })
                        })
                    }), (0, n.jsx)("li", {
                        className: dt()["icons-group-item"],
                        children: (0, n.jsx)("a", {
                            href: i.social.twitter.href,
                            id: "".concat(t, "-twitter"),
                            children: (0, n.jsx)("div", {
                                className: dt()["group-icon"],
                                children: (0, n.jsx)(ot, {})
                            })
                        })
                    }) ]
                })
            });
        }
        var ht = i(4195), gt = i.n(ht);
        function vt(e) {
            let {callback: t} = e;
            const i = Z(), [a, s] = (0, r.useState)(!1);
            function l() {
                let e = .01 * window.innerHeight;
                document.documentElement.style.setProperty("--vh", "".concat(e, "px"));
            }
            return (0, r.useEffect)((() => (l(), window.addEventListener("resize", l), () => {
                window.removeEventListener("resize", l);
            })), []), (0, n.jsxs)("div", {
                className: st().navbar,
                children: [ (0, n.jsx)("input", {
                    type: "checkbox",
                    id: st()["navbar-toggle"],
                    onChange: function(e) {
                        s(e.target.checked);
                    },
                    checked: a
                }), (0, n.jsxs)("label", {
                    htmlFor: st()["navbar-toggle"],
                    className: st()["navbar-label"],
                    children: [ (0, n.jsx)("span", {
                        className: "visually-hidden",
                        children: "Navbar Toggle"
                    }), (0, n.jsx)("div", {
                        className: He()(st()["navbar-label-icon"], "animated-icon", "hamburger-icon"),
                        title: "Hamburger Icon",
                        children: (0, n.jsxs)("span", {
                            className: "animated-icon-inner",
                            children: [ (0, n.jsx)("span", {}), (0, n.jsx)("span", {}), (0, n.jsx)("span", {}) ]
                        })
                    }) ]
                }), (0, n.jsx)("button", {
                    className: gt()["page-navigation-logo"],
                    id: "home-link",
                    onClick: t,
                    children: (0, n.jsx)(rt, {})
                }), (0, n.jsx)("div", {
                    className: st()["navbar-active-path"],
                    children: i.pathname.split("/")[1]
                }), (0, n.jsxs)("div", {
                    className: st()["navbar-content"],
                    children: [ (0, n.jsx)(nt, {
                        id: "navbar-navlist",
                        callback: function() {
                            s(!1);
                        }
                    }), (0, n.jsx)("div", {
                        className: st()["navbar-icons"],
                        children: (0, n.jsx)(pt, {
                            id: "navbar-social-icons"
                        })
                    }) ]
                }) ]
            });
        }
        var bt = i(2707), qt = i.n(bt);
        function ft() {
            const e = X(), {buttons: t} = Xe();
            return (0, n.jsx)(n.Fragment, {
                children: (0, n.jsx)("nav", {
                    className: gt()["page-navigation"],
                    "aria-label": "main menu",
                    children: (0, n.jsxs)("div", {
                        className: gt()["page-navigation-row"],
                        children: [ (0, n.jsx)("div", {
                            className: gt()["page-navigation-column-left"],
                            children: (0, n.jsx)(vt, {
                                callback: function() {
                                    e("/");
                                }
                            })
                        }), (0, n.jsx)("div", {
                            className: gt()["page-navigation-column-right"],
                            children: (0, n.jsx)("button", {
                                id: "login-button",
                                className: He()(qt().button, qt()["secondary-button"], gt()["nav-button"]),
                                onClick: function() {
                                    console.log("logIn()");
                                },
                                children: t.login.label
                            })
                        }) ]
                    })
                })
            });
        }
        var wt = i(6427), _t = i.n(wt);
        function yt(e) {
            let {children: t} = e;
            return (0, n.jsx)("main", {
                className: _t()["page-main"],
                id: "content",
                children: t
            });
        }
        var jt = i(4355), xt = i.n(jt);
        function Pt(e) {
            let {label: t, onChange: i, checked: a} = e;
            const [s, l] = (0, r.useState)(!1);
            return (0, r.useEffect)((() => {
                l(a);
            }), [ a ]), (0, n.jsxs)("div", {
                className: xt()["toggle-outer"],
                children: [ (0, n.jsx)("div", {
                    className: xt()["toggle-description"],
                    children: t
                }), (0, n.jsx)("div", {
                    className: xt()["toggle-container"],
                    children: (0, n.jsxs)("label", {
                        className: xt().label,
                        htmlFor: "reduced-motion-toggle",
                        children: [ (0, n.jsx)("input", {
                            type: "checkbox",
                            id: "reduced-motion-toggle",
                            checked: s,
                            onChange: function(e) {
                                l(e.target.checked), i(e);
                            }
                        }), (0, n.jsx)("span", {
                            className: xt().switch
                        }), (0, n.jsxs)("div", {
                            className: "visually-hidden",
                            children: [ "selected: ", s ? "true" : "false" ]
                        }) ]
                    })
                }) ]
            });
        }
        var Nt = i(3475), Et = i.n(Nt);
        function St(e) {
            let {onClose: t} = e;
            const [i, a] = (0, r.useState)(!1), {settings: s} = Xe();
            return (0, r.useEffect)((() => {
                a(document.body.classList.contains("reduced-motion"));
            }), []), (0, n.jsxs)("div", {
                id: "settings",
                className: He()(Et().dialog, Et().open),
                children: [ (0, n.jsx)("button", {
                    id: "close-dialog-link",
                    className: Et()["dialog-close-button"],
                    onClick: t,
                    title: "Close Button",
                    children: (0, n.jsx)("div", {
                        className: He()(Et()["dialog-close-button-icon"], "animated-icon", "close-icon", "hover"),
                        title: "Close Icon",
                        children: (0, n.jsxs)("span", {
                            className: "animated-icon-inner",
                            children: [ (0, n.jsx)("span", {}), (0, n.jsx)("span", {}) ]
                        })
                    })
                }), (0, n.jsx)("header", {
                    className: Et()["dialog-header"],
                    children: (0, n.jsx)("h2", {
                        children: s.header
                    })
                }), (0, n.jsx)("section", {
                    className: Et()["dialog-body"],
                    children: (0, n.jsx)("div", {
                        className: Et()["dialog-item"],
                        children: (0, n.jsx)(Pt, {
                            label: s.items.motion.label,
                            onChange: function(e) {
                                a(e.target.checked), e.target.checked ? document.body.classList.add("reduced-motion") : document.body.classList.remove("reduced-motion");
                            },
                            checked: i
                        })
                    })
                }) ]
            });
        }
        function kt() {
            return (0, n.jsxs)("svg", {
                height: "24",
                width: "24",
                viewBox: "0 0 1200 1200",
                style: {
                    transform: "scale(1.5)"
                },
                children: [ (0, n.jsx)("title", {
                    children: "Reduced Motion Icon"
                }), (0, n.jsxs)("g", {
                    children: [ (0, n.jsx)("path", {
                        d: "m411.94 424.61h-332.92c-10.512 0-19.02-8.5078-19.02-19.008s8.5078-19.02 19.02-19.02h332.91c10.5 0 19.02 8.5078 19.02 19.02 0.003906 10.512-8.5156 19.008-19.016 19.008z"
                    }), (0, n.jsx)("path", {
                        d: "m411.94 596.26h-227.58c-10.5 0-19.02-8.5078-19.02-19.02 0-10.5 8.5078-19.02 19.02-19.02h227.58c10.5 0 19.02 8.5078 19.02 19.02-0.007813 10.508-8.5156 19.02-19.016 19.02z"
                    }), (0, n.jsx)("path", {
                        d: "m411.94 767.89h-122.25c-10.5 0-19.02-8.5078-19.02-19.02 0-10.512 8.5078-19.02 19.02-19.02h122.24c10.5 0 19.02 8.5078 19.02 19.02 0.003906 10.512-8.5156 19.02-19.016 19.02z"
                    }), (0, n.jsx)("path", {
                        d: "m824.59 915.41c-173.9 0-315.41-141.49-315.41-315.41s141.49-315.41 315.41-315.41 315.41 141.49 315.41 315.41-141.49 315.41-315.41 315.41zm0-577.58c-144.55 0-262.16 117.61-262.16 262.18s117.61 262.18 262.16 262.18 262.16-117.61 262.16-262.18-117.6-262.18-262.16-262.18z"
                    }) ]
                }) ]
            });
        }
        function Ct(e) {
            let {onClick: t, id: i} = e;
            return (0, n.jsx)("div", {
                className: dt()["icons-group"],
                children: (0, n.jsx)("ul", {
                    className: dt()["icons-group-list"],
                    children: (0, n.jsx)("li", {
                        className: dt()["icons-group-item"],
                        children: (0, n.jsx)("button", {
                            onClick: t,
                            id: "".concat(i, "-reduce-motion"),
                            children: (0, n.jsx)("div", {
                                className: dt()["group-icon"],
                                children: (0, n.jsx)(kt, {})
                            })
                        })
                    })
                })
            });
        }
        var At = i(6915), Mt = i.n(At);
        function It() {
            const {content: e} = Xe(), t = Object.keys(e).reduce(((e, t) => (e.push(t), e)), []);
            return (0, n.jsx)("div", {
                className: Mt().sitemap,
                children: (0, n.jsx)("ul", {
                    className: Mt()["sitemap-list"],
                    children: t.map((t => (0, n.jsxs)("li", {
                        className: Mt()["sitemap-item"],
                        children: [ (0, n.jsx)(Pe, {
                            to: e[t].url,
                            className: e => {
                                let {isActive: t} = e;
                                return He()({
                                    [Mt().active]: t
                                });
                            },
                            children: (0, n.jsx)("h4", {
                                className: Mt()["sitemap-header"],
                                children: e[t].name
                            })
                        }), (0, n.jsx)("ul", {
                            className: Mt()["sitemap-sublist"],
                            children: e[t].sections.map((i => (0, n.jsx)("li", {
                                className: Mt()["sitemap-subitem"],
                                children: (0, n.jsx)(Re, {
                                    to: "".concat(e[t].url, "#").concat(i.id),
                                    children: i.name
                                })
                            }, "sitemap-section".concat(i.id))))
                        }) ]
                    }, "sitemap-page-".concat(e[t].name))))
                })
            });
        }
        var Tt = i(3099), Lt = i.n(Tt);
        function Ut() {
            const [e, t] = (0, r.useState)(!1), {footer: i, links: a} = Xe();
            return (0, n.jsxs)(n.Fragment, {
                children: [ (0, n.jsxs)("footer", {
                    className: Lt()["page-footer"],
                    children: [ (0, n.jsx)("div", {
                        className: Lt()["footer-row"],
                        children: (0, n.jsx)("div", {
                            className: Lt()["footer-column-center"],
                            children: (0, n.jsx)(It, {})
                        })
                    }), (0, n.jsx)("div", {
                        className: Lt()["footer-row"],
                        children: (0, n.jsx)("div", {
                            className: Lt()["footer-column-center"],
                            children: (0, n.jsx)("div", {
                                className: Lt()["footer-links"],
                                children: (0, n.jsx)("ul", {
                                    className: Lt()["footer-links-list"],
                                    children: Object.keys(a.legal).map((e => {
                                        const t = a.legal[e];
                                        return (0, n.jsx)("li", {
                                            className: Lt()["footer-links-item"],
                                            children: (0, n.jsx)("a", {
                                                href: t.href,
                                                id: "footer-link-".concat(e),
                                                className: Lt()["footer-link"],
                                                children: t.label
                                            })
                                        }, "footer-links-item-".concat(e));
                                    }))
                                })
                            })
                        })
                    }), (0, n.jsxs)("div", {
                        className: Lt()["footer-row"],
                        children: [ (0, n.jsx)("div", {
                            className: Lt()["footer-column-left"],
                            children: (0, n.jsx)(pt, {
                                id: "footer-social-icons"
                            })
                        }), (0, n.jsxs)("div", {
                            className: Lt()["footer-column-center"],
                            children: [ "© ", (new Date).getFullYear(), " ", i.copyright.label ]
                        }), (0, n.jsx)("div", {
                            className: Lt()["footer-column-right"],
                            children: (0, n.jsx)(Ct, {
                                onClick: function() {
                                    t(!0);
                                },
                                id: "footer-settings-icons"
                            })
                        }) ]
                    }) ]
                }), e ? (0, Se.createPortal)((0, n.jsx)(St, {
                    onClose: function() {
                        t(!1);
                    }
                }), document.getElementById("settings-container")) : null ]
            });
        }
        var Vt = i(8466), Rt = i.n(Vt);
        function Ft(e) {
            let {message: t, onClose: i} = e;
            if (!t) return null;
            const {title: a, description: s} = t;
            return (0, n.jsxs)("div", {
                className: He()(Rt().message, Rt().open),
                children: [ (0, n.jsx)("button", {
                    id: "close-message-link",
                    className: Rt()["message-close-button"],
                    onClick: i,
                    title: "Close Button",
                    children: (0, n.jsx)("div", {
                        className: He()(Rt()["message-close-button-icon"], "animated-icon", "close-icon", "hover"),
                        title: "Close Icon",
                        children: (0, n.jsxs)("span", {
                            className: "animated-icon-inner",
                            children: [ (0, n.jsx)("span", {}), (0, n.jsx)("span", {}) ]
                        })
                    })
                }), a ? (0, n.jsx)("header", {
                    className: Rt()["message-header"],
                    children: (0, n.jsx)("h2", {
                        children: a
                    })
                }) : null, (0, n.jsx)("section", {
                    className: Rt()["message-body"],
                    children: (0, n.jsx)("div", {
                        className: Rt()["message-description"],
                        children: s
                    })
                }) ]
            });
        }
        function Ot(e) {
            let {children: t, id: i} = e;
            const [a, s] = (0, r.useState)(!1), {content: l, links: u} = Xe();
            (0, r.useEffect)((() => {
                s(l[i].message);
            }), [ i ]);
            const c = (0, r.useRef)(null), {pathname: o} = Z();
            return (0, r.useEffect)((() => {
                var e;
                null == c || null === (e = c.current) || void 0 === e || e.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant"
                });
            }), [ o ]), (0, n.jsxs)(n.Fragment, {
                children: [ (0, n.jsx)(Re, {
                    to: "".concat(o, "#content"),
                    className: "skip-link",
                    children: u.a11y.skip.label
                }), (0, n.jsxs)("div", {
                    className: _t().page,
                    ref: c,
                    children: [ (0, n.jsx)(Be, {}), (0, n.jsx)(ft, {}), a ? (0, n.jsx)(Ft, {
                        message: l[i].message,
                        onClose: function() {
                            s(!1);
                        }
                    }) : null, (0, n.jsx)(yt, {
                        children: t
                    }), (0, n.jsx)(Ut, {}) ]
                }) ]
            });
        }
        function Dt(e) {
            let {text: t, headerClass: i, link: a} = e;
            return t ? (0, n.jsx)("header", {
                className: i,
                children: a ? (0, n.jsx)("a", {
                    href: a,
                    children: (0, n.jsx)("h2", {
                        children: t
                    })
                }) : (0, n.jsx)("h2", {
                    children: t
                })
            }) : null;
        }
        var Bt = i(5675), zt = i.n(Bt);
        function Ht(e) {
            let {text: t, textClass: i, type: a = "p"} = e;
            if (!t) return null;
            const s = a;
            return (0, n.jsx)(s, {
                className: i,
                children: t
            });
        }
        function Wt() {
            return (0, n.jsxs)("svg", {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                children: [ (0, n.jsx)("title", {
                    children: "Lightning Icon"
                }), (0, n.jsx)("path", {
                    d: "M8 24l3-9h-9l14-15-3 9h9l-14 15z"
                }) ]
            });
        }
        function Qt() {
            return (0, n.jsxs)("svg", {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                children: [ (0, n.jsx)("title", {
                    children: "Play Icon"
                }), (0, n.jsx)("path", {
                    d: "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"
                }) ]
            });
        }
        function Gt() {
            return (0, n.jsxs)("svg", {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fillRule: "evenodd",
                clipRule: "evenodd",
                children: [ (0, n.jsx)("title", {
                    children: "Fire Icon"
                }), (0, n.jsx)("path", {
                    d: "M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"
                }) ]
            });
        }
        var Jt = i(9929), Kt = i.n(Jt);
        function $t(e) {
            let {tag: t} = e;
            return t ? (0, n.jsxs)("div", {
                className: He()(Kt()["article-image-tag"], Kt()[t.type]),
                children: [ "breaking" === t.type ? (0, n.jsx)(Wt, {}) : null, "watch" === t.type ? (0, 
                n.jsx)(Qt, {}) : null, "new" === t.type ? (0, n.jsx)(Gt, {}) : null, (0, n.jsx)(Ht, {
                    text: t.label
                }) ]
            }) : null;
        }
        function Zt(e) {
            let {image: t, imageClass: i, meta: a} = e;
            return t ? (0, n.jsxs)(n.Fragment, {
                children: [ (0, n.jsxs)("div", {
                    className: i,
                    children: [ (0, n.jsx)(zt(), {
                        className: Kt()["article-image"],
                        src: t.src,
                        width: t.width,
                        height: t.height,
                        alt: t.alt
                    }), (0, n.jsx)($t, {
                        tag: null == a ? void 0 : a.tag
                    }) ]
                }), (0, n.jsx)(Ht, {
                    textClass: Kt()["article-image-captions"],
                    text: null == a ? void 0 : a.captions
                }) ]
            }) : null;
        }
        var Yt = {
            randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto)
        };
        let Xt;
        const ei = new Uint8Array(16);
        function ti() {
            if (!Xt && (Xt = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), 
            !Xt)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return Xt(ei);
        }
        const ii = [];
        for (let e = 0; e < 256; ++e) ii.push((e + 256).toString(16).slice(1));
        function ai(e, t = 0) {
            return (ii[e[t + 0]] + ii[e[t + 1]] + ii[e[t + 2]] + ii[e[t + 3]] + "-" + ii[e[t + 4]] + ii[e[t + 5]] + "-" + ii[e[t + 6]] + ii[e[t + 7]] + "-" + ii[e[t + 8]] + ii[e[t + 9]] + "-" + ii[e[t + 10]] + ii[e[t + 11]] + ii[e[t + 12]] + ii[e[t + 13]] + ii[e[t + 14]] + ii[e[t + 15]]).toLowerCase();
        }
        var si = function(e, t, i) {
            if (Yt.randomUUID && !t && !e) return Yt.randomUUID();
            const a = (e = e || {}).random || (e.rng || ti)();
            if (a[6] = 15 & a[6] | 64, a[8] = 63 & a[8] | 128, t) {
                i = i || 0;
                for (let e = 0; e < 16; ++e) t[i + e] = a[e];
                return t;
            }
            return ai(a);
        };
        function li(e) {
            let {type: t, content: i, display: a} = e;
            return "text" === t ? (0, n.jsx)("div", {
                className: Kt()["article-content"],
                children: (0, n.jsx)(Ht, {
                    text: i
                })
            }) : "list" === t ? (0, n.jsx)("div", {
                className: Kt()["article-content"],
                children: (0, n.jsx)("ul", {
                    className: He()(Kt()["article-list"], Kt().vertical, {
                        [Kt()[a]]: a
                    }),
                    children: i.map((e => (0, n.jsx)("li", {
                        className: Kt()["article-list-item"],
                        children: e.url && !e.title ? (0, n.jsx)("a", {
                            href: e.url,
                            children: (0, n.jsx)(Ht, {
                                text: e.content
                            })
                        }) : (0, n.jsx)(Ht, {
                            text: e.content
                        })
                    }, si())))
                })
            }) : "articles-list" === t ? (0, n.jsx)("div", {
                className: Kt()["article-list-content"],
                children: (0, n.jsx)("ul", {
                    className: He()(Kt()["article-list"], Kt().vertical),
                    children: i.map((e => (0, n.jsxs)("li", {
                        className: Kt()["article-list-item"],
                        children: [ (0, n.jsx)(Ht, {
                            textClass: He()(Kt()["article-title"], "truncate-multiline", "truncate-multiline-3"),
                            text: e.title,
                            type: "h3"
                        }), e.url && !e.title ? (0, n.jsx)("a", {
                            href: e.url,
                            children: (0, n.jsx)(Ht, {
                                text: e.content
                            })
                        }) : (0, n.jsx)(Ht, {
                            text: e.content
                        }) ]
                    }, si())))
                })
            }) : "excerpt" === t ? (0, n.jsx)("ul", {
                className: He()(Kt()["article-list"], Kt().horizontal),
                children: i.map((e => (0, n.jsxs)("li", {
                    className: Kt()["article-list-item"],
                    children: [ (0, n.jsx)(Zt, {
                        imageClass: Kt()["article-hero"],
                        image: e.image
                    }), (0, n.jsx)("div", {
                        className: Kt()["article-content"],
                        children: (0, n.jsx)(Ht, {
                            textClass: "truncate-multiline truncate-multiline-3",
                            text: e.text,
                            type: "div"
                        })
                    }) ]
                }, si())))
            }) : "grid" === t ? (0, n.jsx)("div", {
                className: He()(_t()["grid-container"], {
                    [_t()[a]]: a
                }),
                children: i.map((e => (0, n.jsxs)("div", {
                    className: _t()["grid-item"],
                    children: [ (0, n.jsx)(Zt, {
                        imageClass: Kt()["article-image-container"],
                        image: e.image,
                        meta: e.meta
                    }), e.url ? (0, n.jsx)("a", {
                        href: e.url,
                        children: (0, n.jsx)(Ht, {
                            textClass: He()(Kt()["article-content"], "truncate-multiline", "truncate-multiline-3"),
                            text: e.text,
                            type: "h3"
                        })
                    }) : (0, n.jsx)(Ht, {
                        textClass: He()(Kt()["article-content"], "truncate-multiline", "truncate-multiline-3"),
                        text: e.text,
                        type: "h3"
                    }) ]
                }, si())))
            }) : "preview" === t ? (0, n.jsx)("ul", {
                className: He()(Kt()["article-list"], Kt().vertical),
                children: i.map((e => (0, n.jsxs)("li", {
                    className: Kt()["article-list-item"],
                    children: [ (0, n.jsx)(Zt, {
                        imageClass: Kt()["article-image-container"],
                        image: e.image
                    }), (0, n.jsx)(Ht, {
                        textClass: He()(Kt()["article-title"], "truncate-multiline", "truncate-multiline-3"),
                        text: e.title,
                        type: "h3"
                    }) ]
                }, si())))
            }) : null;
        }
        function ni(e) {
            let {article: t} = e;
            return (0, n.jsxs)("article", {
                className: He()(_t().column, _t()[t.class], Kt().article),
                children: [ (0, n.jsx)(Dt, {
                    headerClass: Kt()["article-header"],
                    text: t.header,
                    link: t.url
                }), (0, n.jsxs)("section", {
                    className: Kt()["article-body"],
                    children: [ (0, n.jsx)(Zt, {
                        imageClass: Kt()["article-image-container"],
                        image: t.image,
                        meta: t.meta
                    }), (0, n.jsx)(Ht, {
                        textClass: He()(Kt()["article-title"], "truncate-singleline"),
                        text: t.title,
                        type: "h3"
                    }), (0, n.jsx)(li, {
                        type: t.type,
                        content: t.content,
                        display: t.display
                    }) ]
                }) ]
            });
        }
        function ri(e) {
            let {section: t} = e;
            return (0, n.jsxs)(n.Fragment, {
                children: [ t.name ? (0, n.jsx)("div", {
                    id: t.id,
                    className: _t()["row-header"],
                    children: (0, n.jsx)("h2", {
                        children: t.name
                    })
                }) : null, (0, n.jsx)("section", {
                    className: _t().row,
                    children: t.articles.map(((e, i) => (0, n.jsx)(ni, {
                        article: e
                    }, "".concat(t.id, "-").concat(i))))
                }) ]
            });
        }
        var ui = i(2824), ci = i.n(ui);
        function oi(e) {
            let {onClose: t, notification: i, onAccept: a, onReject: s} = e;
            const {title: l, description: r, actions: u} = i;
            return (0, n.jsxs)("div", {
                className: He()(ci().toast, ci().open),
                children: [ (0, n.jsx)("button", {
                    id: "close-toast-link",
                    className: ci()["toast-close-button"],
                    onClick: t,
                    title: "Close Button",
                    children: (0, n.jsx)("div", {
                        className: He()(ci()["toast-close-button-icon"], "animated-icon", "close-icon", "hover"),
                        title: "Close Icon",
                        children: (0, n.jsxs)("span", {
                            className: "animated-icon-inner",
                            children: [ (0, n.jsx)("span", {}), (0, n.jsx)("span", {}) ]
                        })
                    })
                }), l ? (0, n.jsx)("header", {
                    className: ci()["toast-header"],
                    children: (0, n.jsx)("h2", {
                        children: l
                    })
                }) : null, (0, n.jsxs)("section", {
                    className: ci()["toast-body"],
                    children: [ (0, n.jsx)("div", {
                        className: ci()["toast-description"],
                        children: r
                    }), (0, n.jsx)("div", {
                        className: ci()["toast-actions"],
                        children: u.map((e => {
                            const t = "toast-".concat(e.type, "-button");
                            return (0, n.jsx)("button", {
                                id: t,
                                className: He()(qt().button, qt()["".concat(e.priority, "-button")], ci()["toast-actions-button"]),
                                onClick: "accept" === e.type ? a : s,
                                children: e.name
                            }, t);
                        }))
                    }) ]
                }) ]
            });
        }
        function mi(e) {
            let {id: t} = e;
            const [i, a] = (0, r.useState)(!1), {content: s} = Xe();
            function l() {
                a(!1);
            }
            function u() {
                l();
            }
            return (0, r.useEffect)((() => {
                a(s[t].notification);
            }), [ t ]), (0, n.jsxs)(n.Fragment, {
                children: [ (0, n.jsx)(Ot, {
                    id: t,
                    children: s[t].sections.map((e => (0, n.jsx)(ri, {
                        section: e
                    }, e.id)))
                }), i && s[t].notification ? (0, Se.createPortal)((0, n.jsx)(oi, {
                    notification: s[t].notification,
                    onAccept: function() {
                        l();
                    },
                    onReject: u,
                    onClose: u
                }), document.getElementById("notifications-container")) : null ]
            });
        }
        var di = i(9008), pi = i.n(di);
        function hi() {
            return (0, n.jsxs)(n.Fragment, {
                children: [ (0, n.jsxs)(pi(), {
                    children: [ (0, n.jsx)("title", {
                        children: "The Daily Broadcast"
                    }), (0, n.jsx)("meta", {
                        name: "description",
                        content: "A news site developed with Next.js."
                    }, "description") ]
                }), (0, n.jsx)(Ye, {
                    children: (0, n.jsx)(_e, {
                        children: (0, n.jsxs)(he, {
                            children: [ (0, n.jsx)(de, {
                                path: "/business",
                                element: (0, n.jsx)(mi, {
                                    id: "business"
                                })
                            }), (0, n.jsx)(de, {
                                path: "/health",
                                element: (0, n.jsx)(mi, {
                                    id: "health"
                                })
                            }), (0, n.jsx)(de, {
                                path: "/opinion",
                                element: (0, n.jsx)(mi, {
                                    id: "opinion"
                                })
                            }), (0, n.jsx)(de, {
                                path: "/politics",
                                element: (0, n.jsx)(mi, {
                                    id: "politics"
                                })
                            }), (0, n.jsx)(de, {
                                path: "/us",
                                element: (0, n.jsx)(mi, {
                                    id: "us"
                                })
                            }), (0, n.jsx)(de, {
                                path: "/world",
                                element: (0, n.jsx)(mi, {
                                    id: "world"
                                })
                            }), (0, n.jsx)(de, {
                                path: "/home",
                                element: (0, n.jsx)(mi, {
                                    id: "home"
                                })
                            }), (0, n.jsx)(de, {
                                path: "/",
                                element: (0, n.jsx)(mi, {
                                    id: "home"
                                })
                            }) ]
                        })
                    })
                }) ]
            });
        }
    },
    9929: function(e) {
        e.exports = {
            "article-header": "article_article-header__iKGnZ",
            "article-body": "article_article-body__Jsm6v",
            "article-image-container": "article_article-image-container__FdNDH",
            "article-image": "article_article-image__t66AJ",
            "article-image-captions": "article_article-image-captions__g8u4e",
            "article-image-tag": "article_article-image-tag__B01MI",
            breaking: "article_breaking__q_GjI",
            watch: "article_watch__aUnwA",
            "article-title": "article_article-title__p3woj",
            "article-content": "article_article-content__EZF35",
            "article-list": "article_article-list__hULan",
            "article-list-item": "article_article-list-item__41r5_",
            horizontal: "article_horizontal__5ysgW",
            vertical: "article_vertical__ebDTr",
            bullets: "article_bullets__ia7Ow",
            "article-hero": "article_article-hero__viyNf",
            "article-list-content": "article_article-list-content__y8h5x"
        };
    },
    2707: function(e) {
        e.exports = {
            button: "button_button__LR7aO",
            "primary-button": "button_primary-button__81_3Q",
            dark: "button_dark__F9LCO",
            "secondary-button": "button_secondary-button___bpW4"
        };
    },
    3475: function(e) {
        e.exports = {
            dialog: "dialog_dialog__fYDHi",
            open: "dialog_open__C9A0T",
            "dialog-close-button": "dialog_dialog-close-button__EyKLf",
            "dialog-close-button-icon": "dialog_dialog-close-button-icon__iumSp",
            "dialog-header": "dialog_dialog-header__pcA8t",
            "dialog-body": "dialog_dialog-body____OzK",
            "dialog-item": "dialog_dialog-item__rQJrO"
        };
    },
    4660: function(e) {
        e.exports = {
            dropdown: "dropdown_dropdown__2BhAG",
            "dropdown-toggle": "dropdown_dropdown-toggle__MN_ey",
            "dropdown-label": "dropdown_dropdown-label__lE2Y2",
            "dropdown-label-text": "dropdown_dropdown-label-text__qZRgJ",
            "dropdown-content": "dropdown_dropdown-content__1BNem",
            "dropdown-button": "dropdown_dropdown-button__g9sRY"
        };
    },
    3099: function(e) {
        e.exports = {
            "page-footer": "footer_page-footer__Ot2ge",
            "footer-row": "footer_footer-row__xD2XM",
            "footer-column-left": "footer_footer-column-left__W3Es1",
            "footer-column-center": "footer_footer-column-center__Cejb9",
            "footer-column-right": "footer_footer-column-right__jTMx1",
            "footer-links": "footer_footer-links__XcJdY",
            "footer-links-list": "footer_footer-links-list__ZmwLK",
            "footer-links-item": "footer_footer-links-item__Wj_SM"
        };
    },
    9319: function(e) {
        e.exports = {
            "page-header": "header_page-header___GdXE",
            "page-header-title": "header_page-header-title__bBtgt"
        };
    },
    3228: function(e) {
        e.exports = {
            "icons-group": "icons-group_icons-group__ZNmhd",
            "icons-group-list": "icons-group_icons-group-list__r51Bf",
            "icons-group-item": "icons-group_icons-group-item__KVpdR",
            "group-icon": "icons-group_group-icon__D0nob"
        };
    },
    6427: function(e) {
        e.exports = {
            preview: "layout_preview__L8buK",
            "no-scroll": "layout_no-scroll__z3d4x",
            page: "layout_page__DC5B8",
            "page-main": "layout_page-main__zq2tI",
            row: "layout_row__gBbhL",
            column: "layout_column__W_qzw",
            "columns-1": "layout_columns-1__XwbPR",
            "columns-2-balanced": "layout_columns-2-balanced__Rdby0",
            "columns-3-balanced": "layout_columns-3-balanced__BkZOl",
            "columns-4-balanced": "layout_columns-4-balanced__0M7DX",
            "columns-3-wide": "layout_columns-3-wide__2Seyo",
            "columns-3-narrow": "layout_columns-3-narrow__Hujsc",
            "columns-wrap": "layout_columns-wrap__YTqU9",
            "grid-container": "layout_grid-container__yKzCb",
            "grid-wrap": "layout_grid-wrap__7Pofb",
            "grid-item": "layout_grid-item__hqgVp",
            "row-header": "layout_row-header__Lcn32"
        };
    },
    8466: function(e) {
        e.exports = {
            message: "message_message__3Q86F",
            open: "message_open__fZ1UY",
            "message-close-button": "message_message-close-button__FLqi6",
            "message-close-button-icon": "message_message-close-button-icon__Twf_m",
            "message-header": "message_message-header__0zUut",
            "message-body": "message_message-body__zPkrh",
            "message-description": "message_message-description__KQ0Or"
        };
    },
    4195: function(e) {
        e.exports = {
            "page-navigation": "nav_page-navigation__qu_BM",
            "page-navigation-row": "nav_page-navigation-row___cGbR",
            "page-navigation-column-left": "nav_page-navigation-column-left__bZnpV",
            "page-navigation-column-right": "nav_page-navigation-column-right__9g4T0",
            "page-navigation-logo": "nav_page-navigation-logo__UoWrh",
            "page-navigation-button": "nav_page-navigation-button__dcrB_",
            "nav-button": "nav_nav-button__u_TLH"
        };
    },
    7648: function(e) {
        e.exports = {
            navbar: "navbar_navbar__M__A1",
            "navbar-toggle": "navbar_navbar-toggle__MiV_Q",
            "navbar-label": "navbar_navbar-label___mMJo",
            "navbar-label-icon": "navbar_navbar-label-icon__gnQyc",
            "navbar-content": "navbar_navbar-content___fA8o",
            "navbar-list": "navbar_navbar-list__t9n5B",
            "navbar-item": "navbar_navbar-item__HgZek",
            "navbar-dropdown-item": "navbar_navbar-dropdown-item__FVlJx",
            active: "navbar_active__TDdVB",
            "navbar-active-path": "navbar_navbar-active-path__iRRyg",
            "navbar-icons": "navbar_navbar-icons__98a76"
        };
    },
    6915: function(e) {
        e.exports = {
            sitemap: "sitemap_sitemap__n6kyt",
            active: "sitemap_active__fLjZF",
            "sitemap-list": "sitemap_sitemap-list__Nse5m",
            "sitemap-item": "sitemap_sitemap-item__KM1kr",
            "sitemap-header": "sitemap_sitemap-header__f2pIf",
            "sitemap-sublist": "sitemap_sitemap-sublist__yGxW_",
            "sitemap-subitem": "sitemap_sitemap-subitem__KlmMR"
        };
    },
    2824: function(e) {
        e.exports = {
            toast: "toast_toast__WdmN8",
            open: "toast_open__FDXn_",
            "toast-close-button": "toast_toast-close-button__8R3TC",
            "toast-close-button-icon": "toast_toast-close-button-icon__RD_CT",
            "toast-header": "toast_toast-header__LKsSc",
            "toast-body": "toast_toast-body__6ICWV",
            "toast-description": "toast_toast-description__eqVc1",
            "toast-actions": "toast_toast-actions__H3Zb6",
            "toast-actions-button": "toast_toast-actions-button__btQw4"
        };
    },
    4355: function(e) {
        e.exports = {
            "toggle-outer": "toggle_toggle-outer__lVXBe",
            "toggle-description": "toggle_toggle-description__zpkRO",
            "toggle-container": "toggle_toggle-container__NtEG5",
            label: "toggle_label__pD5UG",
            switch: "toggle_switch__ZL69U"
        };
    },
    9008: function(e, t, i) {
        e.exports = i(2636);
    },
    5675: function(e, t, i) {
        e.exports = i(3740);
    }
}, function(e) {
    e.O(0, [ 888 ], (function() {
        return t = 5557, e(e.s = t);
        var t;
    }));
    var t = e.O();
    _N_E = t;
} ]);