/*! For license information please see _app-1a8b1d49867ec4f0.js.LICENSE.txt */
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([ [ 888 ], {
    1118: function(e, n, t) {
        (window.__NEXT_P = window.__NEXT_P || []).push([ "/_app", function() {
            return t(8375);
        } ]);
    },
    8375: function(e, n, t) {
        "use strict";
        t.r(n);
        var r = t(5893), o = (t(6026), t(858), t(6669), t(3454), t(9917), t(7294)), i = t(4298), u = t.n(i);
        n.default = function(e) {
            let {Component: n, pageProps: t} = e;
            const [i, a] = (0, o.useState)(!1);
            return (0, o.useEffect)((() => a(!0)), []), i ? (0, r.jsxs)(r.Fragment, {
                children: [ (0, r.jsx)(u(), {
                    id: "raf-mock",
                    children: "// This hack allows to capture the work normally happening in a rAF. We\n// may be able to remove it if the runner improves.\nwindow.requestAnimationFrame = (cb) => window.setTimeout(cb, 0);\nwindow.cancelAnimationFrame = window.clearTimeout;\n// Disable requestIdleCallback until WebKit / Safari supports it.\nwindow.requestIdleCallback = undefined;\nwindow.cancelIdleCallback = undefined;"
                }), (0, r.jsx)(n, {
                    ...t
                }) ]
            }) : null;
        };
    },
    6669: function() {},
    858: function() {},
    3454: function() {},
    9917: function() {},
    6026: function() {},
    4298: function(e, n, t) {
        e.exports = t(5442);
    },
    5251: function(e, n, t) {
        "use strict";
        var r = t(7294), o = Symbol.for("react.element"), i = Symbol.for("react.fragment"), u = Object.prototype.hasOwnProperty, a = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, c = {
            key: !0,
            ref: !0,
            __self: !0,
            __source: !0
        };
        function s(e, n, t) {
            var r, i = {}, s = null, f = null;
            for (r in void 0 !== t && (s = "" + t), void 0 !== n.key && (s = "" + n.key), void 0 !== n.ref && (f = n.ref), 
            n) u.call(n, r) && !c.hasOwnProperty(r) && (i[r] = n[r]);
            if (e && e.defaultProps) for (r in n = e.defaultProps) void 0 === i[r] && (i[r] = n[r]);
            return {
                $$typeof: o,
                type: e,
                key: s,
                ref: f,
                props: i,
                _owner: a.current
            };
        }
        n.Fragment = i, n.jsx = s, n.jsxs = s;
    },
    5893: function(e, n, t) {
        "use strict";
        e.exports = t(5251);
    }
}, function(e) {
    var n = function(n) {
        return e(e.s = n);
    }, t = (n(1118), n(6885));
    _N_E = t;
} ]);