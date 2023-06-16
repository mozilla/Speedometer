/*! For license information please see _app-4bcb45db4abf7a94.js.LICENSE.txt */
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([ [ 888 ], {
    1118: function(n, e, t) {
        (window.__NEXT_P = window.__NEXT_P || []).push([ "/_app", function() {
            return t(8375);
        } ]);
    },
    8375: function(n, e, t) {
        "use strict";
        t.r(e);
        var r = t(5893), o = (t(6026), t(858), t(6669), t(3454), t(9917), t(7294)), i = t(4298), u = t.n(i);
        e.default = function(n) {
            let {Component: e, pageProps: t} = n;
            const [i, c] = (0, o.useState)(!1);
            return (0, o.useEffect)((() => c(!0)), []), i ? (0, r.jsxs)(r.Fragment, {
                children: [ (0, r.jsx)(u(), {
                    id: "raf-mock",
                    children: "// This hack allows to capture the work normally happening in a rAF. We\n// may be able to remove it if the runner improves.\nwindow.requestAnimationFrame = (cb) => window.setTimeout(cb, 0);\nwindow.cancelAnimationFrame = window.clearTimeout;"
                }), (0, r.jsx)(e, {
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
    4298: function(n, e, t) {
        n.exports = t(5442);
    },
    5251: function(n, e, t) {
        "use strict";
        var r = t(7294), o = Symbol.for("react.element"), i = Symbol.for("react.fragment"), u = Object.prototype.hasOwnProperty, c = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = {
            key: !0,
            ref: !0,
            __self: !0,
            __source: !0
        };
        function f(n, e, t) {
            var r, i = {}, f = null, s = null;
            for (r in void 0 !== t && (f = "" + t), void 0 !== e.key && (f = "" + e.key), void 0 !== e.ref && (s = e.ref), 
            e) u.call(e, r) && !a.hasOwnProperty(r) && (i[r] = e[r]);
            if (n && n.defaultProps) for (r in e = n.defaultProps) void 0 === i[r] && (i[r] = e[r]);
            return {
                $$typeof: o,
                type: n,
                key: f,
                ref: s,
                props: i,
                _owner: c.current
            };
        }
        e.Fragment = i, e.jsx = f, e.jsxs = f;
    },
    5893: function(n, e, t) {
        "use strict";
        n.exports = t(5251);
    }
}, function(n) {
    var e = function(e) {
        return n(n.s = e);
    }, t = (e(1118), e(6885));
    _N_E = t;
} ]);