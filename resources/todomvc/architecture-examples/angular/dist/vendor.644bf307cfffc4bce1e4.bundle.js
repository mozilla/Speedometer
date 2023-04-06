webpackJsonp([ 3, 4 ], {
    "+3eL": function(module, exports, __webpack_require__) {
        "use strict";
        var errorObject_1 = __webpack_require__("WhVc");
        var tryCatchTarget;
        function tryCatcher() {
            try {
                return tryCatchTarget.apply(this, arguments);
            } catch (e) {
                errorObject_1.errorObject.e = e;
                return errorObject_1.errorObject;
            }
        }
        function tryCatch(fn) {
            tryCatchTarget = fn;
            return tryCatcher;
        }
        exports.tryCatch = tryCatch;
    },
    "+ayw": function(module, exports, __webpack_require__) {
        "use strict";
        var share_1 = __webpack_require__("sTFn");
        function share() {
            return share_1.share()(this);
        }
        exports.share = share;
    },
    "00YY": function(module, exports, __webpack_require__) {
        "use strict";
        function identity(x) {
            return x;
        }
        exports.identity = identity;
    },
    "1KT0": function(module, exports, __webpack_require__) {
        "use strict";
        var Observable_1 = __webpack_require__("rCTf");
        var ArrayObservable_1 = __webpack_require__("Yh8Q");
        var isScheduler_1 = __webpack_require__("fWbP");
        var mergeAll_1 = __webpack_require__("rKQy");
        function merge() {
            var observables = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                observables[_i - 0] = arguments[_i];
            }
            var concurrent = Number.POSITIVE_INFINITY;
            var scheduler = null;
            var last = observables[observables.length - 1];
            if (isScheduler_1.isScheduler(last)) {
                scheduler = observables.pop();
                if (observables.length > 1 && typeof observables[observables.length - 1] === "number") {
                    concurrent = observables.pop();
                }
            } else if (typeof last === "number") {
                concurrent = observables.pop();
            }
            if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1.Observable) {
                return observables[0];
            }
            return mergeAll_1.mergeAll(concurrent)(new ArrayObservable_1.ArrayObservable(observables, scheduler));
        }
        exports.merge = merge;
    },
    "1r8+": function(module, exports, __webpack_require__) {
        "use strict";
        exports.isArrayLike = function(x) {
            return x && typeof x.length === "number";
        };
    },
    "2Je8": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("TToO");
        var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("3j3K");
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return NgLocaleLocalization;
        });
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return NgLocalization;
        });
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return parseCookieValue;
        });
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return CommonModule;
        });
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return NgForOf;
        });
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return NgIf;
        });
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return DOCUMENT;
        });
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return PLATFORM_BROWSER_ID;
        });
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return PlatformLocation;
        });
        /**
 * @license Angular v4.4.7
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var PlatformLocation = function() {
            function PlatformLocation() {}
            PlatformLocation.prototype.getBaseHrefFromDOM = function() {};
            PlatformLocation.prototype.onPopState = function(fn) {};
            PlatformLocation.prototype.onHashChange = function(fn) {};
            PlatformLocation.prototype.pathname = function() {};
            PlatformLocation.prototype.search = function() {};
            PlatformLocation.prototype.hash = function() {};
            PlatformLocation.prototype.replaceState = function(state, title, url) {};
            PlatformLocation.prototype.pushState = function(state, title, url) {};
            PlatformLocation.prototype.forward = function() {};
            PlatformLocation.prototype.back = function() {};
            return PlatformLocation;
        }();
        var LOCATION_INITIALIZED = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["I"]("Location Initialized");
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var LocationStrategy = function() {
            function LocationStrategy() {}
            LocationStrategy.prototype.path = function(includeHash) {};
            LocationStrategy.prototype.prepareExternalUrl = function(internal) {};
            LocationStrategy.prototype.pushState = function(state, title, url, queryParams) {};
            LocationStrategy.prototype.replaceState = function(state, title, url, queryParams) {};
            LocationStrategy.prototype.forward = function() {};
            LocationStrategy.prototype.back = function() {};
            LocationStrategy.prototype.onPopState = function(fn) {};
            LocationStrategy.prototype.getBaseHref = function() {};
            return LocationStrategy;
        }();
        var APP_BASE_HREF = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["I"]("appBaseHref");
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var Location = function() {
            function Location(platformStrategy) {
                var _this = this;
                this._subject = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["V"]();
                this._platformStrategy = platformStrategy;
                var browserBaseHref = this._platformStrategy.getBaseHref();
                this._baseHref = Location.stripTrailingSlash(_stripIndexHtml(browserBaseHref));
                this._platformStrategy.onPopState(function(ev) {
                    _this._subject.emit({
                        url: _this.path(true),
                        pop: true,
                        type: ev.type
                    });
                });
            }
            Location.prototype.path = function(includeHash) {
                if (includeHash === void 0) {
                    includeHash = false;
                }
                return this.normalize(this._platformStrategy.path(includeHash));
            };
            Location.prototype.isCurrentPathEqualTo = function(path, query) {
                if (query === void 0) {
                    query = "";
                }
                return this.path() == this.normalize(path + Location.normalizeQueryParams(query));
            };
            Location.prototype.normalize = function(url) {
                return Location.stripTrailingSlash(_stripBaseHref(this._baseHref, _stripIndexHtml(url)));
            };
            Location.prototype.prepareExternalUrl = function(url) {
                if (url && url[0] !== "/") {
                    url = "/" + url;
                }
                return this._platformStrategy.prepareExternalUrl(url);
            };
            Location.prototype.go = function(path, query) {
                if (query === void 0) {
                    query = "";
                }
                this._platformStrategy.pushState(null, "", path, query);
            };
            Location.prototype.replaceState = function(path, query) {
                if (query === void 0) {
                    query = "";
                }
                this._platformStrategy.replaceState(null, "", path, query);
            };
            Location.prototype.forward = function() {
                this._platformStrategy.forward();
            };
            Location.prototype.back = function() {
                this._platformStrategy.back();
            };
            Location.prototype.subscribe = function(onNext, onThrow, onReturn) {
                return this._subject.subscribe({
                    next: onNext,
                    error: onThrow,
                    complete: onReturn
                });
            };
            Location.normalizeQueryParams = function(params) {
                return params && params[0] !== "?" ? "?" + params : params;
            };
            Location.joinWithSlash = function(start, end) {
                if (start.length == 0) {
                    return end;
                }
                if (end.length == 0) {
                    return start;
                }
                var slashes = 0;
                if (start.endsWith("/")) {
                    slashes++;
                }
                if (end.startsWith("/")) {
                    slashes++;
                }
                if (slashes == 2) {
                    return start + end.substring(1);
                }
                if (slashes == 1) {
                    return start + end;
                }
                return start + "/" + end;
            };
            Location.stripTrailingSlash = function(url) {
                var match = url.match(/#|\?|$/);
                var pathEndIdx = match && match.index || url.length;
                var droppedSlashIdx = pathEndIdx - (url[pathEndIdx - 1] === "/" ? 1 : 0);
                return url.slice(0, droppedSlashIdx) + url.slice(pathEndIdx);
            };
            return Location;
        }();
        Location.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        Location.ctorParameters = function() {
            return [ {
                type: LocationStrategy
            } ];
        };
        function _stripBaseHref(baseHref, url) {
            return baseHref && url.startsWith(baseHref) ? url.substring(baseHref.length) : url;
        }
        function _stripIndexHtml(url) {
            return url.replace(/\/index.html$/, "");
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var HashLocationStrategy = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](HashLocationStrategy, _super);
            function HashLocationStrategy(_platformLocation, _baseHref) {
                var _this = _super.call(this) || this;
                _this._platformLocation = _platformLocation;
                _this._baseHref = "";
                if (_baseHref != null) {
                    _this._baseHref = _baseHref;
                }
                return _this;
            }
            HashLocationStrategy.prototype.onPopState = function(fn) {
                this._platformLocation.onPopState(fn);
                this._platformLocation.onHashChange(fn);
            };
            HashLocationStrategy.prototype.getBaseHref = function() {
                return this._baseHref;
            };
            HashLocationStrategy.prototype.path = function(includeHash) {
                if (includeHash === void 0) {
                    includeHash = false;
                }
                var path = this._platformLocation.hash;
                if (path == null) path = "#";
                return path.length > 0 ? path.substring(1) : path;
            };
            HashLocationStrategy.prototype.prepareExternalUrl = function(internal) {
                var url = Location.joinWithSlash(this._baseHref, internal);
                return url.length > 0 ? "#" + url : url;
            };
            HashLocationStrategy.prototype.pushState = function(state, title, path, queryParams) {
                var url = this.prepareExternalUrl(path + Location.normalizeQueryParams(queryParams));
                if (url.length == 0) {
                    url = this._platformLocation.pathname;
                }
                this._platformLocation.pushState(state, title, url);
            };
            HashLocationStrategy.prototype.replaceState = function(state, title, path, queryParams) {
                var url = this.prepareExternalUrl(path + Location.normalizeQueryParams(queryParams));
                if (url.length == 0) {
                    url = this._platformLocation.pathname;
                }
                this._platformLocation.replaceState(state, title, url);
            };
            HashLocationStrategy.prototype.forward = function() {
                this._platformLocation.forward();
            };
            HashLocationStrategy.prototype.back = function() {
                this._platformLocation.back();
            };
            return HashLocationStrategy;
        }(LocationStrategy);
        HashLocationStrategy.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        HashLocationStrategy.ctorParameters = function() {
            return [ {
                type: PlatformLocation
            }, {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ APP_BASE_HREF ]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var PathLocationStrategy = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](PathLocationStrategy, _super);
            function PathLocationStrategy(_platformLocation, href) {
                var _this = _super.call(this) || this;
                _this._platformLocation = _platformLocation;
                if (href == null) {
                    href = _this._platformLocation.getBaseHrefFromDOM();
                }
                if (href == null) {
                    throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
                }
                _this._baseHref = href;
                return _this;
            }
            PathLocationStrategy.prototype.onPopState = function(fn) {
                this._platformLocation.onPopState(fn);
                this._platformLocation.onHashChange(fn);
            };
            PathLocationStrategy.prototype.getBaseHref = function() {
                return this._baseHref;
            };
            PathLocationStrategy.prototype.prepareExternalUrl = function(internal) {
                return Location.joinWithSlash(this._baseHref, internal);
            };
            PathLocationStrategy.prototype.path = function(includeHash) {
                if (includeHash === void 0) {
                    includeHash = false;
                }
                var pathname = this._platformLocation.pathname + Location.normalizeQueryParams(this._platformLocation.search);
                var hash = this._platformLocation.hash;
                return hash && includeHash ? "" + pathname + hash : pathname;
            };
            PathLocationStrategy.prototype.pushState = function(state, title, url, queryParams) {
                var externalUrl = this.prepareExternalUrl(url + Location.normalizeQueryParams(queryParams));
                this._platformLocation.pushState(state, title, externalUrl);
            };
            PathLocationStrategy.prototype.replaceState = function(state, title, url, queryParams) {
                var externalUrl = this.prepareExternalUrl(url + Location.normalizeQueryParams(queryParams));
                this._platformLocation.replaceState(state, title, externalUrl);
            };
            PathLocationStrategy.prototype.forward = function() {
                this._platformLocation.forward();
            };
            PathLocationStrategy.prototype.back = function() {
                this._platformLocation.back();
            };
            return PathLocationStrategy;
        }(LocationStrategy);
        PathLocationStrategy.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        PathLocationStrategy.ctorParameters = function() {
            return [ {
                type: PlatformLocation
            }, {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ APP_BASE_HREF ]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var NgLocalization = function() {
            function NgLocalization() {}
            NgLocalization.prototype.getPluralCategory = function(value) {};
            return NgLocalization;
        }();
        function getPluralCategory(value, cases, ngLocalization) {
            var key = "=" + value;
            if (cases.indexOf(key) > -1) {
                return key;
            }
            key = ngLocalization.getPluralCategory(value);
            if (cases.indexOf(key) > -1) {
                return key;
            }
            if (cases.indexOf("other") > -1) {
                return "other";
            }
            throw new Error('No plural message found for value "' + value + '"');
        }
        var NgLocaleLocalization = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](NgLocaleLocalization, _super);
            function NgLocaleLocalization(locale) {
                var _this = _super.call(this) || this;
                _this.locale = locale;
                return _this;
            }
            NgLocaleLocalization.prototype.getPluralCategory = function(value) {
                var plural = getPluralCase(this.locale, value);
                switch (plural) {
                  case Plural.Zero:
                    return "zero";

                  case Plural.One:
                    return "one";

                  case Plural.Two:
                    return "two";

                  case Plural.Few:
                    return "few";

                  case Plural.Many:
                    return "many";

                  default:
                    return "other";
                }
            };
            return NgLocaleLocalization;
        }(NgLocalization);
        NgLocaleLocalization.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        NgLocaleLocalization.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ __WEBPACK_IMPORTED_MODULE_1__angular_core__["h"] ]
                } ]
            } ];
        };
        var Plural = {};
        Plural.Zero = 0;
        Plural.One = 1;
        Plural.Two = 2;
        Plural.Few = 3;
        Plural.Many = 4;
        Plural.Other = 5;
        Plural[Plural.Zero] = "Zero";
        Plural[Plural.One] = "One";
        Plural[Plural.Two] = "Two";
        Plural[Plural.Few] = "Few";
        Plural[Plural.Many] = "Many";
        Plural[Plural.Other] = "Other";
        function getPluralCase(locale, nLike) {
            if (typeof nLike === "string") {
                nLike = parseInt(nLike, 10);
            }
            var n = nLike;
            var nDecimal = n.toString().replace(/^[^.]*\.?/, "");
            var i = Math.floor(Math.abs(n));
            var v = nDecimal.length;
            var f = parseInt(nDecimal, 10);
            var t = parseInt(n.toString().replace(/^[^.]*\.?|0+$/g, ""), 10) || 0;
            var lang = locale.split("-")[0].toLowerCase();
            switch (lang) {
              case "af":
              case "asa":
              case "az":
              case "bem":
              case "bez":
              case "bg":
              case "brx":
              case "ce":
              case "cgg":
              case "chr":
              case "ckb":
              case "ee":
              case "el":
              case "eo":
              case "es":
              case "eu":
              case "fo":
              case "fur":
              case "gsw":
              case "ha":
              case "haw":
              case "hu":
              case "jgo":
              case "jmc":
              case "ka":
              case "kk":
              case "kkj":
              case "kl":
              case "ks":
              case "ksb":
              case "ky":
              case "lb":
              case "lg":
              case "mas":
              case "mgo":
              case "ml":
              case "mn":
              case "nb":
              case "nd":
              case "ne":
              case "nn":
              case "nnh":
              case "nyn":
              case "om":
              case "or":
              case "os":
              case "ps":
              case "rm":
              case "rof":
              case "rwk":
              case "saq":
              case "seh":
              case "sn":
              case "so":
              case "sq":
              case "ta":
              case "te":
              case "teo":
              case "tk":
              case "tr":
              case "ug":
              case "uz":
              case "vo":
              case "vun":
              case "wae":
              case "xog":
                if (n === 1) return Plural.One;
                return Plural.Other;

              case "ak":
              case "ln":
              case "mg":
              case "pa":
              case "ti":
                if (n === Math.floor(n) && n >= 0 && n <= 1) return Plural.One;
                return Plural.Other;

              case "am":
              case "as":
              case "bn":
              case "fa":
              case "gu":
              case "hi":
              case "kn":
              case "mr":
              case "zu":
                if (i === 0 || n === 1) return Plural.One;
                return Plural.Other;

              case "ar":
                if (n === 0) return Plural.Zero;
                if (n === 1) return Plural.One;
                if (n === 2) return Plural.Two;
                if (n % 100 === Math.floor(n % 100) && n % 100 >= 3 && n % 100 <= 10) return Plural.Few;
                if (n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 99) return Plural.Many;
                return Plural.Other;

              case "ast":
              case "ca":
              case "de":
              case "en":
              case "et":
              case "fi":
              case "fy":
              case "gl":
              case "it":
              case "nl":
              case "sv":
              case "sw":
              case "ur":
              case "yi":
                if (i === 1 && v === 0) return Plural.One;
                return Plural.Other;

              case "be":
                if (n % 10 === 1 && !(n % 100 === 11)) return Plural.One;
                if (n % 10 === Math.floor(n % 10) && n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14)) return Plural.Few;
                if (n % 10 === 0 || n % 10 === Math.floor(n % 10) && n % 10 >= 5 && n % 10 <= 9 || n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 14) return Plural.Many;
                return Plural.Other;

              case "br":
                if (n % 10 === 1 && !(n % 100 === 11 || n % 100 === 71 || n % 100 === 91)) return Plural.One;
                if (n % 10 === 2 && !(n % 100 === 12 || n % 100 === 72 || n % 100 === 92)) return Plural.Two;
                if (n % 10 === Math.floor(n % 10) && (n % 10 >= 3 && n % 10 <= 4 || n % 10 === 9) && !(n % 100 >= 10 && n % 100 <= 19 || n % 100 >= 70 && n % 100 <= 79 || n % 100 >= 90 && n % 100 <= 99)) return Plural.Few;
                if (!(n === 0) && n % 1e6 === 0) return Plural.Many;
                return Plural.Other;

              case "bs":
              case "hr":
              case "sr":
                if (v === 0 && i % 10 === 1 && !(i % 100 === 11) || f % 10 === 1 && !(f % 100 === 11)) return Plural.One;
                if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 && !(i % 100 >= 12 && i % 100 <= 14) || f % 10 === Math.floor(f % 10) && f % 10 >= 2 && f % 10 <= 4 && !(f % 100 >= 12 && f % 100 <= 14)) return Plural.Few;
                return Plural.Other;

              case "cs":
              case "sk":
                if (i === 1 && v === 0) return Plural.One;
                if (i === Math.floor(i) && i >= 2 && i <= 4 && v === 0) return Plural.Few;
                if (!(v === 0)) return Plural.Many;
                return Plural.Other;

              case "cy":
                if (n === 0) return Plural.Zero;
                if (n === 1) return Plural.One;
                if (n === 2) return Plural.Two;
                if (n === 3) return Plural.Few;
                if (n === 6) return Plural.Many;
                return Plural.Other;

              case "da":
                if (n === 1 || !(t === 0) && (i === 0 || i === 1)) return Plural.One;
                return Plural.Other;

              case "dsb":
              case "hsb":
                if (v === 0 && i % 100 === 1 || f % 100 === 1) return Plural.One;
                if (v === 0 && i % 100 === 2 || f % 100 === 2) return Plural.Two;
                if (v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 3 && i % 100 <= 4 || f % 100 === Math.floor(f % 100) && f % 100 >= 3 && f % 100 <= 4) return Plural.Few;
                return Plural.Other;

              case "ff":
              case "fr":
              case "hy":
              case "kab":
                if (i === 0 || i === 1) return Plural.One;
                return Plural.Other;

              case "fil":
                if (v === 0 && (i === 1 || i === 2 || i === 3) || v === 0 && !(i % 10 === 4 || i % 10 === 6 || i % 10 === 9) || !(v === 0) && !(f % 10 === 4 || f % 10 === 6 || f % 10 === 9)) return Plural.One;
                return Plural.Other;

              case "ga":
                if (n === 1) return Plural.One;
                if (n === 2) return Plural.Two;
                if (n === Math.floor(n) && n >= 3 && n <= 6) return Plural.Few;
                if (n === Math.floor(n) && n >= 7 && n <= 10) return Plural.Many;
                return Plural.Other;

              case "gd":
                if (n === 1 || n === 11) return Plural.One;
                if (n === 2 || n === 12) return Plural.Two;
                if (n === Math.floor(n) && (n >= 3 && n <= 10 || n >= 13 && n <= 19)) return Plural.Few;
                return Plural.Other;

              case "gv":
                if (v === 0 && i % 10 === 1) return Plural.One;
                if (v === 0 && i % 10 === 2) return Plural.Two;
                if (v === 0 && (i % 100 === 0 || i % 100 === 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80)) return Plural.Few;
                if (!(v === 0)) return Plural.Many;
                return Plural.Other;

              case "he":
                if (i === 1 && v === 0) return Plural.One;
                if (i === 2 && v === 0) return Plural.Two;
                if (v === 0 && !(n >= 0 && n <= 10) && n % 10 === 0) return Plural.Many;
                return Plural.Other;

              case "is":
                if (t === 0 && i % 10 === 1 && !(i % 100 === 11) || !(t === 0)) return Plural.One;
                return Plural.Other;

              case "ksh":
                if (n === 0) return Plural.Zero;
                if (n === 1) return Plural.One;
                return Plural.Other;

              case "kw":
              case "naq":
              case "se":
              case "smn":
                if (n === 1) return Plural.One;
                if (n === 2) return Plural.Two;
                return Plural.Other;

              case "lag":
                if (n === 0) return Plural.Zero;
                if ((i === 0 || i === 1) && !(n === 0)) return Plural.One;
                return Plural.Other;

              case "lt":
                if (n % 10 === 1 && !(n % 100 >= 11 && n % 100 <= 19)) return Plural.One;
                if (n % 10 === Math.floor(n % 10) && n % 10 >= 2 && n % 10 <= 9 && !(n % 100 >= 11 && n % 100 <= 19)) return Plural.Few;
                if (!(f === 0)) return Plural.Many;
                return Plural.Other;

              case "lv":
              case "prg":
                if (n % 10 === 0 || n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 19 || v === 2 && f % 100 === Math.floor(f % 100) && f % 100 >= 11 && f % 100 <= 19) return Plural.Zero;
                if (n % 10 === 1 && !(n % 100 === 11) || v === 2 && f % 10 === 1 && !(f % 100 === 11) || !(v === 2) && f % 10 === 1) return Plural.One;
                return Plural.Other;

              case "mk":
                if (v === 0 && i % 10 === 1 || f % 10 === 1) return Plural.One;
                return Plural.Other;

              case "mt":
                if (n === 1) return Plural.One;
                if (n === 0 || n % 100 === Math.floor(n % 100) && n % 100 >= 2 && n % 100 <= 10) return Plural.Few;
                if (n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 19) return Plural.Many;
                return Plural.Other;

              case "pl":
                if (i === 1 && v === 0) return Plural.One;
                if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 && !(i % 100 >= 12 && i % 100 <= 14)) return Plural.Few;
                if (v === 0 && !(i === 1) && i % 10 === Math.floor(i % 10) && i % 10 >= 0 && i % 10 <= 1 || v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 || v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 12 && i % 100 <= 14) return Plural.Many;
                return Plural.Other;

              case "pt":
                if (n === Math.floor(n) && n >= 0 && n <= 2 && !(n === 2)) return Plural.One;
                return Plural.Other;

              case "ro":
                if (i === 1 && v === 0) return Plural.One;
                if (!(v === 0) || n === 0 || !(n === 1) && n % 100 === Math.floor(n % 100) && n % 100 >= 1 && n % 100 <= 19) return Plural.Few;
                return Plural.Other;

              case "ru":
              case "uk":
                if (v === 0 && i % 10 === 1 && !(i % 100 === 11)) return Plural.One;
                if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 && !(i % 100 >= 12 && i % 100 <= 14)) return Plural.Few;
                if (v === 0 && i % 10 === 0 || v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 || v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 11 && i % 100 <= 14) return Plural.Many;
                return Plural.Other;

              case "shi":
                if (i === 0 || n === 1) return Plural.One;
                if (n === Math.floor(n) && n >= 2 && n <= 10) return Plural.Few;
                return Plural.Other;

              case "si":
                if (n === 0 || n === 1 || i === 0 && f === 1) return Plural.One;
                return Plural.Other;

              case "sl":
                if (v === 0 && i % 100 === 1) return Plural.One;
                if (v === 0 && i % 100 === 2) return Plural.Two;
                if (v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 3 && i % 100 <= 4 || !(v === 0)) return Plural.Few;
                return Plural.Other;

              case "tzm":
                if (n === Math.floor(n) && n >= 0 && n <= 1 || n === Math.floor(n) && n >= 11 && n <= 99) return Plural.One;
                return Plural.Other;

              default:
                return Plural.Other;
            }
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * @param {?} cookieStr
 * @param {?} name
 * @return {?}
 */
        function parseCookieValue(cookieStr, name) {
            name = encodeURIComponent(name);
            for (var _i = 0, _a = cookieStr.split(";"); _i < _a.length; _i++) {
                var cookie = _a[_i];
                var eqIndex = cookie.indexOf("=");
                var _b = eqIndex == -1 ? [ cookie, "" ] : [ cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1) ], cookieName = _b[0], cookieValue = _b[1];
                if (cookieName.trim() === name) {
                    return decodeURIComponent(cookieValue);
                }
            }
            return null;
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var NgClass = function() {
            function NgClass(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer) {
                this._iterableDiffers = _iterableDiffers;
                this._keyValueDiffers = _keyValueDiffers;
                this._ngEl = _ngEl;
                this._renderer = _renderer;
                this._initialClasses = [];
            }
            Object.defineProperty(NgClass.prototype, "klass", {
                set: function(v) {
                    this._applyInitialClasses(true);
                    this._initialClasses = typeof v === "string" ? v.split(/\s+/) : [];
                    this._applyInitialClasses(false);
                    this._applyClasses(this._rawClass, false);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgClass.prototype, "ngClass", {
                set: function(v) {
                    this._cleanupClasses(this._rawClass);
                    this._iterableDiffer = null;
                    this._keyValueDiffer = null;
                    this._rawClass = typeof v === "string" ? v.split(/\s+/) : v;
                    if (this._rawClass) {
                        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["W"])(this._rawClass)) {
                            this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create();
                        } else {
                            this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            NgClass.prototype.ngDoCheck = function() {
                if (this._iterableDiffer) {
                    var iterableChanges = this._iterableDiffer.diff(this._rawClass);
                    if (iterableChanges) {
                        this._applyIterableChanges(iterableChanges);
                    }
                } else if (this._keyValueDiffer) {
                    var keyValueChanges = this._keyValueDiffer.diff(this._rawClass);
                    if (keyValueChanges) {
                        this._applyKeyValueChanges(keyValueChanges);
                    }
                }
            };
            NgClass.prototype._cleanupClasses = function(rawClassVal) {
                this._applyClasses(rawClassVal, true);
                this._applyInitialClasses(false);
            };
            NgClass.prototype._applyKeyValueChanges = function(changes) {
                var _this = this;
                changes.forEachAddedItem(function(record) {
                    return _this._toggleClass(record.key, record.currentValue);
                });
                changes.forEachChangedItem(function(record) {
                    return _this._toggleClass(record.key, record.currentValue);
                });
                changes.forEachRemovedItem(function(record) {
                    if (record.previousValue) {
                        _this._toggleClass(record.key, false);
                    }
                });
            };
            NgClass.prototype._applyIterableChanges = function(changes) {
                var _this = this;
                changes.forEachAddedItem(function(record) {
                    if (typeof record.item === "string") {
                        _this._toggleClass(record.item, true);
                    } else {
                        throw new Error("NgClass can only toggle CSS classes expressed as strings, got " + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["X"])(record.item));
                    }
                });
                changes.forEachRemovedItem(function(record) {
                    return _this._toggleClass(record.item, false);
                });
            };
            NgClass.prototype._applyInitialClasses = function(isCleanup) {
                var _this = this;
                this._initialClasses.forEach(function(klass) {
                    return _this._toggleClass(klass, !isCleanup);
                });
            };
            NgClass.prototype._applyClasses = function(rawClassVal, isCleanup) {
                var _this = this;
                if (rawClassVal) {
                    if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
                        rawClassVal.forEach(function(klass) {
                            return _this._toggleClass(klass, !isCleanup);
                        });
                    } else {
                        Object.keys(rawClassVal).forEach(function(klass) {
                            if (rawClassVal[klass] != null) _this._toggleClass(klass, !isCleanup);
                        });
                    }
                }
            };
            NgClass.prototype._toggleClass = function(klass, enabled) {
                var _this = this;
                klass = klass.trim();
                if (klass) {
                    klass.split(/\s+/g).forEach(function(klass) {
                        _this._renderer.setElementClass(_this._ngEl.nativeElement, klass, !!enabled);
                    });
                }
            };
            return NgClass;
        }();
        NgClass.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[ngClass]"
            } ]
        } ];
        NgClass.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["m"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["o"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Z"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_0"]
            } ];
        };
        NgClass.propDecorators = {
            klass: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "class" ]
            } ],
            ngClass: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var NgComponentOutlet = function() {
            function NgComponentOutlet(_viewContainerRef) {
                this._viewContainerRef = _viewContainerRef;
                this._componentRef = null;
                this._moduleRef = null;
            }
            NgComponentOutlet.prototype.ngOnChanges = function(changes) {
                this._viewContainerRef.clear();
                this._componentRef = null;
                if (this.ngComponentOutlet) {
                    var elInjector = this.ngComponentOutletInjector || this._viewContainerRef.parentInjector;
                    if (changes["ngComponentOutletNgModuleFactory"]) {
                        if (this._moduleRef) this._moduleRef.destroy();
                        if (this.ngComponentOutletNgModuleFactory) {
                            var parentModule = elInjector.get(__WEBPACK_IMPORTED_MODULE_1__angular_core__["g"]);
                            this._moduleRef = this.ngComponentOutletNgModuleFactory.create(parentModule.injector);
                        } else {
                            this._moduleRef = null;
                        }
                    }
                    var componentFactoryResolver = this._moduleRef ? this._moduleRef.componentFactoryResolver : elInjector.get(__WEBPACK_IMPORTED_MODULE_1__angular_core__["e"]);
                    var componentFactory = componentFactoryResolver.resolveComponentFactory(this.ngComponentOutlet);
                    this._componentRef = this._viewContainerRef.createComponent(componentFactory, this._viewContainerRef.length, elInjector, this.ngComponentOutletContent);
                }
            };
            NgComponentOutlet.prototype.ngOnDestroy = function() {
                if (this._moduleRef) this._moduleRef.destroy();
            };
            return NgComponentOutlet;
        }();
        NgComponentOutlet.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[ngComponentOutlet]"
            } ]
        } ];
        NgComponentOutlet.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_2"]
            } ];
        };
        NgComponentOutlet.propDecorators = {
            ngComponentOutlet: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ],
            ngComponentOutletInjector: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ],
            ngComponentOutletContent: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ],
            ngComponentOutletNgModuleFactory: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var NgForOfContext = function() {
            function NgForOfContext($implicit, ngForOf, index, count) {
                this.$implicit = $implicit;
                this.ngForOf = ngForOf;
                this.index = index;
                this.count = count;
            }
            Object.defineProperty(NgForOfContext.prototype, "first", {
                get: function() {
                    return this.index === 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgForOfContext.prototype, "last", {
                get: function() {
                    return this.index === this.count - 1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgForOfContext.prototype, "even", {
                get: function() {
                    return this.index % 2 === 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgForOfContext.prototype, "odd", {
                get: function() {
                    return !this.even;
                },
                enumerable: true,
                configurable: true
            });
            return NgForOfContext;
        }();
        var NgForOf = function() {
            function NgForOf(_viewContainer, _template, _differs) {
                this._viewContainer = _viewContainer;
                this._template = _template;
                this._differs = _differs;
                this._differ = null;
            }
            Object.defineProperty(NgForOf.prototype, "ngForTrackBy", {
                get: function() {
                    return this._trackByFn;
                },
                set: function(fn) {
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["O"])() && fn != null && typeof fn !== "function") {
                        if (console && console.warn) {
                            console.warn("trackBy must be a function, but received " + JSON.stringify(fn) + ". " + "See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information.");
                        }
                    }
                    this._trackByFn = fn;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgForOf.prototype, "ngForTemplate", {
                set: function(value) {
                    if (value) {
                        this._template = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            NgForOf.prototype.ngOnChanges = function(changes) {
                if ("ngForOf" in changes) {
                    var value = changes["ngForOf"].currentValue;
                    if (!this._differ && value) {
                        try {
                            this._differ = this._differs.find(value).create(this.ngForTrackBy);
                        } catch (e) {
                            throw new Error("Cannot find a differ supporting object '" + value + "' of type '" + getTypeNameForDebugging(value) + "'. NgFor only supports binding to Iterables such as Arrays.");
                        }
                    }
                }
            };
            NgForOf.prototype.ngDoCheck = function() {
                if (this._differ) {
                    var changes = this._differ.diff(this.ngForOf);
                    if (changes) this._applyChanges(changes);
                }
            };
            NgForOf.prototype._applyChanges = function(changes) {
                var _this = this;
                var insertTuples = [];
                changes.forEachOperation(function(item, adjustedPreviousIndex, currentIndex) {
                    if (item.previousIndex == null) {
                        var view = _this._viewContainer.createEmbeddedView(_this._template, new NgForOfContext(null, _this.ngForOf, -1, -1), currentIndex);
                        var tuple = new RecordViewTuple(item, view);
                        insertTuples.push(tuple);
                    } else if (currentIndex == null) {
                        _this._viewContainer.remove(adjustedPreviousIndex);
                    } else {
                        var view = _this._viewContainer.get(adjustedPreviousIndex);
                        _this._viewContainer.move(view, currentIndex);
                        var tuple = new RecordViewTuple(item, view);
                        insertTuples.push(tuple);
                    }
                });
                for (var i = 0; i < insertTuples.length; i++) {
                    this._perViewChange(insertTuples[i].view, insertTuples[i].record);
                }
                for (var i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
                    var viewRef = this._viewContainer.get(i);
                    viewRef.context.index = i;
                    viewRef.context.count = ilen;
                }
                changes.forEachIdentityChange(function(record) {
                    var viewRef = _this._viewContainer.get(record.currentIndex);
                    viewRef.context.$implicit = record.item;
                });
            };
            NgForOf.prototype._perViewChange = function(view, record) {
                view.context.$implicit = record.item;
            };
            return NgForOf;
        }();
        NgForOf.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[ngFor][ngForOf]"
            } ]
        } ];
        NgForOf.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_2"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_3"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["m"]
            } ];
        };
        NgForOf.propDecorators = {
            ngForOf: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ],
            ngForTrackBy: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ],
            ngForTemplate: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        var RecordViewTuple = function() {
            function RecordViewTuple(record, view) {
                this.record = record;
                this.view = view;
            }
            return RecordViewTuple;
        }();
        var NgFor = NgForOf;
        function getTypeNameForDebugging(type) {
            return type["name"] || typeof type;
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var NgIf = function() {
            function NgIf(_viewContainer, templateRef) {
                this._viewContainer = _viewContainer;
                this._context = new NgIfContext();
                this._thenTemplateRef = null;
                this._elseTemplateRef = null;
                this._thenViewRef = null;
                this._elseViewRef = null;
                this._thenTemplateRef = templateRef;
            }
            Object.defineProperty(NgIf.prototype, "ngIf", {
                set: function(condition) {
                    this._context.$implicit = this._context.ngIf = condition;
                    this._updateView();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgIf.prototype, "ngIfThen", {
                set: function(templateRef) {
                    this._thenTemplateRef = templateRef;
                    this._thenViewRef = null;
                    this._updateView();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgIf.prototype, "ngIfElse", {
                set: function(templateRef) {
                    this._elseTemplateRef = templateRef;
                    this._elseViewRef = null;
                    this._updateView();
                },
                enumerable: true,
                configurable: true
            });
            NgIf.prototype._updateView = function() {
                if (this._context.$implicit) {
                    if (!this._thenViewRef) {
                        this._viewContainer.clear();
                        this._elseViewRef = null;
                        if (this._thenTemplateRef) {
                            this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
                        }
                    }
                } else {
                    if (!this._elseViewRef) {
                        this._viewContainer.clear();
                        this._thenViewRef = null;
                        if (this._elseTemplateRef) {
                            this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
                        }
                    }
                }
            };
            return NgIf;
        }();
        NgIf.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[ngIf]"
            } ]
        } ];
        NgIf.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_2"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_3"]
            } ];
        };
        NgIf.propDecorators = {
            ngIf: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ],
            ngIfThen: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ],
            ngIfElse: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        var NgIfContext = function() {
            function NgIfContext() {
                this.$implicit = null;
                this.ngIf = null;
            }
            return NgIfContext;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var SwitchView = function() {
            function SwitchView(_viewContainerRef, _templateRef) {
                this._viewContainerRef = _viewContainerRef;
                this._templateRef = _templateRef;
                this._created = false;
            }
            SwitchView.prototype.create = function() {
                this._created = true;
                this._viewContainerRef.createEmbeddedView(this._templateRef);
            };
            SwitchView.prototype.destroy = function() {
                this._created = false;
                this._viewContainerRef.clear();
            };
            SwitchView.prototype.enforceState = function(created) {
                if (created && !this._created) {
                    this.create();
                } else if (!created && this._created) {
                    this.destroy();
                }
            };
            return SwitchView;
        }();
        var NgSwitch = function() {
            function NgSwitch() {
                this._defaultUsed = false;
                this._caseCount = 0;
                this._lastCaseCheckIndex = 0;
                this._lastCasesMatched = false;
            }
            Object.defineProperty(NgSwitch.prototype, "ngSwitch", {
                set: function(newValue) {
                    this._ngSwitch = newValue;
                    if (this._caseCount === 0) {
                        this._updateDefaultCases(true);
                    }
                },
                enumerable: true,
                configurable: true
            });
            NgSwitch.prototype._addCase = function() {
                return this._caseCount++;
            };
            NgSwitch.prototype._addDefault = function(view) {
                if (!this._defaultViews) {
                    this._defaultViews = [];
                }
                this._defaultViews.push(view);
            };
            NgSwitch.prototype._matchCase = function(value) {
                var matched = value == this._ngSwitch;
                this._lastCasesMatched = this._lastCasesMatched || matched;
                this._lastCaseCheckIndex++;
                if (this._lastCaseCheckIndex === this._caseCount) {
                    this._updateDefaultCases(!this._lastCasesMatched);
                    this._lastCaseCheckIndex = 0;
                    this._lastCasesMatched = false;
                }
                return matched;
            };
            NgSwitch.prototype._updateDefaultCases = function(useDefault) {
                if (this._defaultViews && useDefault !== this._defaultUsed) {
                    this._defaultUsed = useDefault;
                    for (var i = 0; i < this._defaultViews.length; i++) {
                        var defaultView = this._defaultViews[i];
                        defaultView.enforceState(useDefault);
                    }
                }
            };
            return NgSwitch;
        }();
        NgSwitch.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[ngSwitch]"
            } ]
        } ];
        NgSwitch.ctorParameters = function() {
            return [];
        };
        NgSwitch.propDecorators = {
            ngSwitch: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        var NgSwitchCase = function() {
            function NgSwitchCase(viewContainer, templateRef, ngSwitch) {
                this.ngSwitch = ngSwitch;
                ngSwitch._addCase();
                this._view = new SwitchView(viewContainer, templateRef);
            }
            NgSwitchCase.prototype.ngDoCheck = function() {
                this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
            };
            return NgSwitchCase;
        }();
        NgSwitchCase.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[ngSwitchCase]"
            } ]
        } ];
        NgSwitchCase.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_2"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_3"]
            }, {
                type: NgSwitch,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_4"]
                } ]
            } ];
        };
        NgSwitchCase.propDecorators = {
            ngSwitchCase: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        var NgSwitchDefault = function() {
            function NgSwitchDefault(viewContainer, templateRef, ngSwitch) {
                ngSwitch._addDefault(new SwitchView(viewContainer, templateRef));
            }
            return NgSwitchDefault;
        }();
        NgSwitchDefault.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[ngSwitchDefault]"
            } ]
        } ];
        NgSwitchDefault.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_2"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_3"]
            }, {
                type: NgSwitch,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_4"]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var NgPlural = function() {
            function NgPlural(_localization) {
                this._localization = _localization;
                this._caseViews = {};
            }
            Object.defineProperty(NgPlural.prototype, "ngPlural", {
                set: function(value) {
                    this._switchValue = value;
                    this._updateView();
                },
                enumerable: true,
                configurable: true
            });
            NgPlural.prototype.addCase = function(value, switchView) {
                this._caseViews[value] = switchView;
            };
            NgPlural.prototype._updateView = function() {
                this._clearViews();
                var cases = Object.keys(this._caseViews);
                var key = getPluralCategory(this._switchValue, cases, this._localization);
                this._activateView(this._caseViews[key]);
            };
            NgPlural.prototype._clearViews = function() {
                if (this._activeView) this._activeView.destroy();
            };
            NgPlural.prototype._activateView = function(view) {
                if (view) {
                    this._activeView = view;
                    this._activeView.create();
                }
            };
            return NgPlural;
        }();
        NgPlural.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[ngPlural]"
            } ]
        } ];
        NgPlural.ctorParameters = function() {
            return [ {
                type: NgLocalization
            } ];
        };
        NgPlural.propDecorators = {
            ngPlural: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        var NgPluralCase = function() {
            function NgPluralCase(value, template, viewContainer, ngPlural) {
                this.value = value;
                var isANumber = !isNaN(Number(value));
                ngPlural.addCase(isANumber ? "=" + value : value, new SwitchView(viewContainer, template));
            }
            return NgPluralCase;
        }();
        NgPluralCase.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[ngPluralCase]"
            } ]
        } ];
        NgPluralCase.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_5"],
                    args: [ "ngPluralCase" ]
                } ]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_3"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_2"]
            }, {
                type: NgPlural,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_4"]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var NgStyle = function() {
            function NgStyle(_differs, _ngEl, _renderer) {
                this._differs = _differs;
                this._ngEl = _ngEl;
                this._renderer = _renderer;
            }
            Object.defineProperty(NgStyle.prototype, "ngStyle", {
                set: function(v) {
                    this._ngStyle = v;
                    if (!this._differ && v) {
                        this._differ = this._differs.find(v).create();
                    }
                },
                enumerable: true,
                configurable: true
            });
            NgStyle.prototype.ngDoCheck = function() {
                if (this._differ) {
                    var changes = this._differ.diff(this._ngStyle);
                    if (changes) {
                        this._applyChanges(changes);
                    }
                }
            };
            NgStyle.prototype._applyChanges = function(changes) {
                var _this = this;
                changes.forEachRemovedItem(function(record) {
                    return _this._setStyle(record.key, null);
                });
                changes.forEachAddedItem(function(record) {
                    return _this._setStyle(record.key, record.currentValue);
                });
                changes.forEachChangedItem(function(record) {
                    return _this._setStyle(record.key, record.currentValue);
                });
            };
            NgStyle.prototype._setStyle = function(nameAndUnit, value) {
                var _a = nameAndUnit.split("."), name = _a[0], unit = _a[1];
                value = value != null && unit ? "" + value + unit : value;
                this._renderer.setElementStyle(this._ngEl.nativeElement, name, value);
            };
            return NgStyle;
        }();
        NgStyle.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[ngStyle]"
            } ]
        } ];
        NgStyle.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["o"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Z"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_0"]
            } ];
        };
        NgStyle.propDecorators = {
            ngStyle: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var NgTemplateOutlet = function() {
            function NgTemplateOutlet(_viewContainerRef) {
                this._viewContainerRef = _viewContainerRef;
            }
            Object.defineProperty(NgTemplateOutlet.prototype, "ngOutletContext", {
                set: function(context) {
                    this.ngTemplateOutletContext = context;
                },
                enumerable: true,
                configurable: true
            });
            NgTemplateOutlet.prototype.ngOnChanges = function(changes) {
                if (this._viewRef) {
                    this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._viewRef));
                }
                if (this.ngTemplateOutlet) {
                    this._viewRef = this._viewContainerRef.createEmbeddedView(this.ngTemplateOutlet, this.ngTemplateOutletContext);
                }
            };
            return NgTemplateOutlet;
        }();
        NgTemplateOutlet.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[ngTemplateOutlet]"
            } ]
        } ];
        NgTemplateOutlet.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_2"]
            } ];
        };
        NgTemplateOutlet.propDecorators = {
            ngTemplateOutletContext: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ],
            ngTemplateOutlet: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ],
            ngOutletContext: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var COMMON_DIRECTIVES = [ NgClass, NgComponentOutlet, NgForOf, NgIf, NgTemplateOutlet, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgPlural, NgPluralCase ];
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        function invalidPipeArgumentError(type, value) {
            return Error("InvalidPipeArgument: '" + value + "' for pipe '" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["X"])(type) + "'");
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var ObservableStrategy = function() {
            function ObservableStrategy() {}
            ObservableStrategy.prototype.createSubscription = function(async, updateLatestValue) {
                return async.subscribe({
                    next: updateLatestValue,
                    error: function(e) {
                        throw e;
                    }
                });
            };
            ObservableStrategy.prototype.dispose = function(subscription) {
                subscription.unsubscribe();
            };
            ObservableStrategy.prototype.onDestroy = function(subscription) {
                subscription.unsubscribe();
            };
            return ObservableStrategy;
        }();
        var PromiseStrategy = function() {
            function PromiseStrategy() {}
            PromiseStrategy.prototype.createSubscription = function(async, updateLatestValue) {
                return async.then(updateLatestValue, function(e) {
                    throw e;
                });
            };
            PromiseStrategy.prototype.dispose = function(subscription) {};
            PromiseStrategy.prototype.onDestroy = function(subscription) {};
            return PromiseStrategy;
        }();
        var _promiseStrategy = new PromiseStrategy();
        var _observableStrategy = new ObservableStrategy();
        var AsyncPipe = function() {
            function AsyncPipe(_ref) {
                this._ref = _ref;
                this._latestValue = null;
                this._latestReturnedValue = null;
                this._subscription = null;
                this._obj = null;
                this._strategy = null;
            }
            AsyncPipe.prototype.ngOnDestroy = function() {
                if (this._subscription) {
                    this._dispose();
                }
            };
            AsyncPipe.prototype.transform = function(obj) {
                if (!this._obj) {
                    if (obj) {
                        this._subscribe(obj);
                    }
                    this._latestReturnedValue = this._latestValue;
                    return this._latestValue;
                }
                if (obj !== this._obj) {
                    this._dispose();
                    return this.transform(obj);
                }
                if (this._latestValue === this._latestReturnedValue) {
                    return this._latestReturnedValue;
                }
                this._latestReturnedValue = this._latestValue;
                return __WEBPACK_IMPORTED_MODULE_1__angular_core__["_6"].wrap(this._latestValue);
            };
            AsyncPipe.prototype._subscribe = function(obj) {
                var _this = this;
                this._obj = obj;
                this._strategy = this._selectStrategy(obj);
                this._subscription = this._strategy.createSubscription(obj, function(value) {
                    return _this._updateLatestValue(obj, value);
                });
            };
            AsyncPipe.prototype._selectStrategy = function(obj) {
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_7"])(obj)) {
                    return _promiseStrategy;
                }
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8"])(obj)) {
                    return _observableStrategy;
                }
                throw invalidPipeArgumentError(AsyncPipe, obj);
            };
            AsyncPipe.prototype._dispose = function() {
                this._strategy.dispose(this._subscription);
                this._latestValue = null;
                this._latestReturnedValue = null;
                this._subscription = null;
                this._obj = null;
            };
            AsyncPipe.prototype._updateLatestValue = function(async, value) {
                if (async === this._obj) {
                    this._latestValue = value;
                    this._ref.markForCheck();
                }
            };
            return AsyncPipe;
        }();
        AsyncPipe.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_9"],
            args: [ {
                name: "async",
                pure: false
            } ]
        } ];
        AsyncPipe.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_10"]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var LowerCasePipe = function() {
            function LowerCasePipe() {}
            LowerCasePipe.prototype.transform = function(value) {
                if (!value) return value;
                if (typeof value !== "string") {
                    throw invalidPipeArgumentError(LowerCasePipe, value);
                }
                return value.toLowerCase();
            };
            return LowerCasePipe;
        }();
        LowerCasePipe.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_9"],
            args: [ {
                name: "lowercase"
            } ]
        } ];
        LowerCasePipe.ctorParameters = function() {
            return [];
        };
        function titleCaseWord(word) {
            if (!word) return word;
            return word[0].toUpperCase() + word.substr(1).toLowerCase();
        }
        var TitleCasePipe = function() {
            function TitleCasePipe() {}
            TitleCasePipe.prototype.transform = function(value) {
                if (!value) return value;
                if (typeof value !== "string") {
                    throw invalidPipeArgumentError(TitleCasePipe, value);
                }
                return value.split(/\b/g).map(function(word) {
                    return titleCaseWord(word);
                }).join("");
            };
            return TitleCasePipe;
        }();
        TitleCasePipe.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_9"],
            args: [ {
                name: "titlecase"
            } ]
        } ];
        TitleCasePipe.ctorParameters = function() {
            return [];
        };
        var UpperCasePipe = function() {
            function UpperCasePipe() {}
            UpperCasePipe.prototype.transform = function(value) {
                if (!value) return value;
                if (typeof value !== "string") {
                    throw invalidPipeArgumentError(UpperCasePipe, value);
                }
                return value.toUpperCase();
            };
            return UpperCasePipe;
        }();
        UpperCasePipe.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_9"],
            args: [ {
                name: "uppercase"
            } ]
        } ];
        UpperCasePipe.ctorParameters = function() {
            return [];
        };
        var NumberFormatStyle = {};
        NumberFormatStyle.Decimal = 0;
        NumberFormatStyle.Percent = 1;
        NumberFormatStyle.Currency = 2;
        NumberFormatStyle[NumberFormatStyle.Decimal] = "Decimal";
        NumberFormatStyle[NumberFormatStyle.Percent] = "Percent";
        NumberFormatStyle[NumberFormatStyle.Currency] = "Currency";
        var NumberFormatter = function() {
            function NumberFormatter() {}
            NumberFormatter.format = function(num, locale, style, opts) {
                if (opts === void 0) {
                    opts = {};
                }
                var minimumIntegerDigits = opts.minimumIntegerDigits, minimumFractionDigits = opts.minimumFractionDigits, maximumFractionDigits = opts.maximumFractionDigits, currency = opts.currency, _a = opts.currencyAsSymbol, currencyAsSymbol = _a === void 0 ? false : _a;
                var options = {
                    minimumIntegerDigits: minimumIntegerDigits,
                    minimumFractionDigits: minimumFractionDigits,
                    maximumFractionDigits: maximumFractionDigits,
                    style: NumberFormatStyle[style].toLowerCase()
                };
                if (style == NumberFormatStyle.Currency) {
                    options.currency = typeof currency == "string" ? currency : undefined;
                    options.currencyDisplay = currencyAsSymbol ? "symbol" : "code";
                }
                return new Intl.NumberFormat(locale, options).format(num);
            };
            return NumberFormatter;
        }();
        var DATE_FORMATS_SPLIT = /((?:[^yMLdHhmsazZEwGjJ']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|J+|j+|m+|s+|a|z|Z|G+|w+))(.*)/;
        var PATTERN_ALIASES = {
            yMMMdjms: datePartGetterFactory(combine([ digitCondition("year", 1), nameCondition("month", 3), digitCondition("day", 1), digitCondition("hour", 1), digitCondition("minute", 1), digitCondition("second", 1) ])),
            yMdjm: datePartGetterFactory(combine([ digitCondition("year", 1), digitCondition("month", 1), digitCondition("day", 1), digitCondition("hour", 1), digitCondition("minute", 1) ])),
            yMMMMEEEEd: datePartGetterFactory(combine([ digitCondition("year", 1), nameCondition("month", 4), nameCondition("weekday", 4), digitCondition("day", 1) ])),
            yMMMMd: datePartGetterFactory(combine([ digitCondition("year", 1), nameCondition("month", 4), digitCondition("day", 1) ])),
            yMMMd: datePartGetterFactory(combine([ digitCondition("year", 1), nameCondition("month", 3), digitCondition("day", 1) ])),
            yMd: datePartGetterFactory(combine([ digitCondition("year", 1), digitCondition("month", 1), digitCondition("day", 1) ])),
            jms: datePartGetterFactory(combine([ digitCondition("hour", 1), digitCondition("second", 1), digitCondition("minute", 1) ])),
            jm: datePartGetterFactory(combine([ digitCondition("hour", 1), digitCondition("minute", 1) ]))
        };
        var DATE_FORMATS = {
            yyyy: datePartGetterFactory(digitCondition("year", 4)),
            yy: datePartGetterFactory(digitCondition("year", 2)),
            y: datePartGetterFactory(digitCondition("year", 1)),
            MMMM: datePartGetterFactory(nameCondition("month", 4)),
            MMM: datePartGetterFactory(nameCondition("month", 3)),
            MM: datePartGetterFactory(digitCondition("month", 2)),
            M: datePartGetterFactory(digitCondition("month", 1)),
            LLLL: datePartGetterFactory(nameCondition("month", 4)),
            L: datePartGetterFactory(nameCondition("month", 1)),
            dd: datePartGetterFactory(digitCondition("day", 2)),
            d: datePartGetterFactory(digitCondition("day", 1)),
            HH: digitModifier(hourExtractor(datePartGetterFactory(hour12Modify(digitCondition("hour", 2), false)))),
            H: hourExtractor(datePartGetterFactory(hour12Modify(digitCondition("hour", 1), false))),
            hh: digitModifier(hourExtractor(datePartGetterFactory(hour12Modify(digitCondition("hour", 2), true)))),
            h: hourExtractor(datePartGetterFactory(hour12Modify(digitCondition("hour", 1), true))),
            jj: datePartGetterFactory(digitCondition("hour", 2)),
            j: datePartGetterFactory(digitCondition("hour", 1)),
            mm: digitModifier(datePartGetterFactory(digitCondition("minute", 2))),
            m: datePartGetterFactory(digitCondition("minute", 1)),
            ss: digitModifier(datePartGetterFactory(digitCondition("second", 2))),
            s: datePartGetterFactory(digitCondition("second", 1)),
            sss: datePartGetterFactory(digitCondition("second", 3)),
            EEEE: datePartGetterFactory(nameCondition("weekday", 4)),
            EEE: datePartGetterFactory(nameCondition("weekday", 3)),
            EE: datePartGetterFactory(nameCondition("weekday", 2)),
            E: datePartGetterFactory(nameCondition("weekday", 1)),
            a: hourClockExtractor(datePartGetterFactory(hour12Modify(digitCondition("hour", 1), true))),
            Z: timeZoneGetter("short"),
            z: timeZoneGetter("long"),
            ww: datePartGetterFactory({}),
            w: datePartGetterFactory({}),
            G: datePartGetterFactory(nameCondition("era", 1)),
            GG: datePartGetterFactory(nameCondition("era", 2)),
            GGG: datePartGetterFactory(nameCondition("era", 3)),
            GGGG: datePartGetterFactory(nameCondition("era", 4))
        };
        function digitModifier(inner) {
            return function(date, locale) {
                var result = inner(date, locale);
                return result.length == 1 ? "0" + result : result;
            };
        }
        function hourClockExtractor(inner) {
            return function(date, locale) {
                return inner(date, locale).split(" ")[1];
            };
        }
        function hourExtractor(inner) {
            return function(date, locale) {
                return inner(date, locale).split(" ")[0];
            };
        }
        function intlDateFormat(date, locale, options) {
            return new Intl.DateTimeFormat(locale, options).format(date).replace(/[\u200e\u200f]/g, "");
        }
        function timeZoneGetter(timezone) {
            var options = {
                hour: "2-digit",
                hour12: false,
                timeZoneName: timezone
            };
            return function(date, locale) {
                var result = intlDateFormat(date, locale, options);
                return result ? result.substring(3) : "";
            };
        }
        function hour12Modify(options, value) {
            options.hour12 = value;
            return options;
        }
        function digitCondition(prop, len) {
            var result = {};
            result[prop] = len === 2 ? "2-digit" : "numeric";
            return result;
        }
        function nameCondition(prop, len) {
            var result = {};
            if (len < 4) {
                result[prop] = len > 1 ? "short" : "narrow";
            } else {
                result[prop] = "long";
            }
            return result;
        }
        function combine(options) {
            return options.reduce(function(merged, opt) {
                return Object.assign({}, merged, opt);
            }, {});
        }
        function datePartGetterFactory(ret) {
            return function(date, locale) {
                return intlDateFormat(date, locale, ret);
            };
        }
        var DATE_FORMATTER_CACHE = new Map();
        function dateFormatter(format, date, locale) {
            var fn = PATTERN_ALIASES[format];
            if (fn) return fn(date, locale);
            var cacheKey = format;
            var parts = DATE_FORMATTER_CACHE.get(cacheKey);
            if (!parts) {
                parts = [];
                var match = void 0;
                DATE_FORMATS_SPLIT.exec(format);
                var _format = format;
                while (_format) {
                    match = DATE_FORMATS_SPLIT.exec(_format);
                    if (match) {
                        parts = parts.concat(match.slice(1));
                        _format = parts.pop();
                    } else {
                        parts.push(_format);
                        _format = null;
                    }
                }
                DATE_FORMATTER_CACHE.set(cacheKey, parts);
            }
            return parts.reduce(function(text, part) {
                var fn = DATE_FORMATS[part];
                return text + (fn ? fn(date, locale) : partToTime(part));
            }, "");
        }
        function partToTime(part) {
            return part === "''" ? "'" : part.replace(/(^'|'$)/g, "").replace(/''/g, "'");
        }
        var DateFormatter = function() {
            function DateFormatter() {}
            DateFormatter.format = function(date, locale, pattern) {
                return dateFormatter(pattern, date, locale);
            };
            return DateFormatter;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var _NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
        function formatNumber(pipe, locale, value, style, digits, currency, currencyAsSymbol) {
            if (currency === void 0) {
                currency = null;
            }
            if (currencyAsSymbol === void 0) {
                currencyAsSymbol = false;
            }
            if (value == null) return null;
            value = typeof value === "string" && isNumeric(value) ? +value : value;
            if (typeof value !== "number") {
                throw invalidPipeArgumentError(pipe, value);
            }
            var minInt = undefined;
            var minFraction = undefined;
            var maxFraction = undefined;
            if (style !== NumberFormatStyle.Currency) {
                minInt = 1;
                minFraction = 0;
                maxFraction = 3;
            }
            if (digits) {
                var parts = digits.match(_NUMBER_FORMAT_REGEXP);
                if (parts === null) {
                    throw new Error(digits + " is not a valid digit info for number pipes");
                }
                if (parts[1] != null) {
                    minInt = parseIntAutoRadix(parts[1]);
                }
                if (parts[3] != null) {
                    minFraction = parseIntAutoRadix(parts[3]);
                }
                if (parts[5] != null) {
                    maxFraction = parseIntAutoRadix(parts[5]);
                }
            }
            return NumberFormatter.format(value, locale, style, {
                minimumIntegerDigits: minInt,
                minimumFractionDigits: minFraction,
                maximumFractionDigits: maxFraction,
                currency: currency,
                currencyAsSymbol: currencyAsSymbol
            });
        }
        var DecimalPipe = function() {
            function DecimalPipe(_locale) {
                this._locale = _locale;
            }
            DecimalPipe.prototype.transform = function(value, digits) {
                return formatNumber(DecimalPipe, this._locale, value, NumberFormatStyle.Decimal, digits);
            };
            return DecimalPipe;
        }();
        DecimalPipe.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_9"],
            args: [ {
                name: "number"
            } ]
        } ];
        DecimalPipe.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ __WEBPACK_IMPORTED_MODULE_1__angular_core__["h"] ]
                } ]
            } ];
        };
        var PercentPipe = function() {
            function PercentPipe(_locale) {
                this._locale = _locale;
            }
            PercentPipe.prototype.transform = function(value, digits) {
                return formatNumber(PercentPipe, this._locale, value, NumberFormatStyle.Percent, digits);
            };
            return PercentPipe;
        }();
        PercentPipe.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_9"],
            args: [ {
                name: "percent"
            } ]
        } ];
        PercentPipe.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ __WEBPACK_IMPORTED_MODULE_1__angular_core__["h"] ]
                } ]
            } ];
        };
        var CurrencyPipe = function() {
            function CurrencyPipe(_locale) {
                this._locale = _locale;
            }
            CurrencyPipe.prototype.transform = function(value, currencyCode, symbolDisplay, digits) {
                if (currencyCode === void 0) {
                    currencyCode = "USD";
                }
                if (symbolDisplay === void 0) {
                    symbolDisplay = false;
                }
                return formatNumber(CurrencyPipe, this._locale, value, NumberFormatStyle.Currency, digits, currencyCode, symbolDisplay);
            };
            return CurrencyPipe;
        }();
        CurrencyPipe.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_9"],
            args: [ {
                name: "currency"
            } ]
        } ];
        CurrencyPipe.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ __WEBPACK_IMPORTED_MODULE_1__angular_core__["h"] ]
                } ]
            } ];
        };
        function parseIntAutoRadix(text) {
            var result = parseInt(text);
            if (isNaN(result)) {
                throw new Error("Invalid integer literal when parsing " + text);
            }
            return result;
        }
        function isNumeric(value) {
            return !isNaN(value - parseFloat(value));
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var ISO8601_DATE_REGEX = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        var DatePipe = function() {
            function DatePipe(_locale) {
                this._locale = _locale;
            }
            DatePipe.prototype.transform = function(value, pattern) {
                if (pattern === void 0) {
                    pattern = "mediumDate";
                }
                var date;
                if (isBlank(value) || value !== value) return null;
                if (typeof value === "string") {
                    value = value.trim();
                }
                if (isDate(value)) {
                    date = value;
                } else if (isNumeric(value)) {
                    date = new Date(parseFloat(value));
                } else if (typeof value === "string" && /^(\d{4}-\d{1,2}-\d{1,2})$/.test(value)) {
                    var _a = value.split("-").map(function(val) {
                        return parseInt(val, 10);
                    }), y = _a[0], m = _a[1], d = _a[2];
                    date = new Date(y, m - 1, d);
                } else {
                    date = new Date(value);
                }
                if (!isDate(date)) {
                    var match = void 0;
                    if (typeof value === "string" && (match = value.match(ISO8601_DATE_REGEX))) {
                        date = isoStringToDate(match);
                    } else {
                        throw invalidPipeArgumentError(DatePipe, value);
                    }
                }
                return DateFormatter.format(date, this._locale, DatePipe._ALIASES[pattern] || pattern);
            };
            return DatePipe;
        }();
        DatePipe._ALIASES = {
            medium: "yMMMdjms",
            short: "yMdjm",
            fullDate: "yMMMMEEEEd",
            longDate: "yMMMMd",
            mediumDate: "yMMMd",
            shortDate: "yMd",
            mediumTime: "jms",
            shortTime: "jm"
        };
        DatePipe.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_9"],
            args: [ {
                name: "date",
                pure: true
            } ]
        } ];
        DatePipe.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ __WEBPACK_IMPORTED_MODULE_1__angular_core__["h"] ]
                } ]
            } ];
        };
        function isBlank(obj) {
            return obj == null || obj === "";
        }
        function isDate(obj) {
            return obj instanceof Date && !isNaN(obj.valueOf());
        }
        function isoStringToDate(match) {
            var date = new Date(0);
            var tzHour = 0;
            var tzMin = 0;
            var dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear;
            var timeSetter = match[8] ? date.setUTCHours : date.setHours;
            if (match[9]) {
                tzHour = toInt(match[9] + match[10]);
                tzMin = toInt(match[9] + match[11]);
            }
            dateSetter.call(date, toInt(match[1]), toInt(match[2]) - 1, toInt(match[3]));
            var h = toInt(match[4] || "0") - tzHour;
            var m = toInt(match[5] || "0") - tzMin;
            var s = toInt(match[6] || "0");
            var ms = Math.round(parseFloat("0." + (match[7] || 0)) * 1e3);
            timeSetter.call(date, h, m, s, ms);
            return date;
        }
        function toInt(str) {
            return parseInt(str, 10);
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var _INTERPOLATION_REGEXP = /#/g;
        var I18nPluralPipe = function() {
            function I18nPluralPipe(_localization) {
                this._localization = _localization;
            }
            I18nPluralPipe.prototype.transform = function(value, pluralMap) {
                if (value == null) return "";
                if (typeof pluralMap !== "object" || pluralMap === null) {
                    throw invalidPipeArgumentError(I18nPluralPipe, pluralMap);
                }
                var key = getPluralCategory(value, Object.keys(pluralMap), this._localization);
                return pluralMap[key].replace(_INTERPOLATION_REGEXP, value.toString());
            };
            return I18nPluralPipe;
        }();
        I18nPluralPipe.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_9"],
            args: [ {
                name: "i18nPlural",
                pure: true
            } ]
        } ];
        I18nPluralPipe.ctorParameters = function() {
            return [ {
                type: NgLocalization
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var I18nSelectPipe = function() {
            function I18nSelectPipe() {}
            I18nSelectPipe.prototype.transform = function(value, mapping) {
                if (value == null) return "";
                if (typeof mapping !== "object" || typeof value !== "string") {
                    throw invalidPipeArgumentError(I18nSelectPipe, mapping);
                }
                if (mapping.hasOwnProperty(value)) {
                    return mapping[value];
                }
                if (mapping.hasOwnProperty("other")) {
                    return mapping["other"];
                }
                return "";
            };
            return I18nSelectPipe;
        }();
        I18nSelectPipe.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_9"],
            args: [ {
                name: "i18nSelect",
                pure: true
            } ]
        } ];
        I18nSelectPipe.ctorParameters = function() {
            return [];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var JsonPipe = function() {
            function JsonPipe() {}
            JsonPipe.prototype.transform = function(value) {
                return JSON.stringify(value, null, 2);
            };
            return JsonPipe;
        }();
        JsonPipe.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_9"],
            args: [ {
                name: "json",
                pure: false
            } ]
        } ];
        JsonPipe.ctorParameters = function() {
            return [];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var SlicePipe = function() {
            function SlicePipe() {}
            SlicePipe.prototype.transform = function(value, start, end) {
                if (value == null) return value;
                if (!this.supports(value)) {
                    throw invalidPipeArgumentError(SlicePipe, value);
                }
                return value.slice(start, end);
            };
            SlicePipe.prototype.supports = function(obj) {
                return typeof obj === "string" || Array.isArray(obj);
            };
            return SlicePipe;
        }();
        SlicePipe.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_9"],
            args: [ {
                name: "slice",
                pure: false
            } ]
        } ];
        SlicePipe.ctorParameters = function() {
            return [];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var COMMON_PIPES = [ AsyncPipe, UpperCasePipe, LowerCasePipe, JsonPipe, SlicePipe, DecimalPipe, PercentPipe, TitleCasePipe, CurrencyPipe, DatePipe, I18nPluralPipe, I18nSelectPipe ];
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var CommonModule = function() {
            function CommonModule() {}
            return CommonModule;
        }();
        CommonModule.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["E"],
            args: [ {
                declarations: [ COMMON_DIRECTIVES, COMMON_PIPES ],
                exports: [ COMMON_DIRECTIVES, COMMON_PIPES ],
                providers: [ {
                    provide: NgLocalization,
                    useClass: NgLocaleLocalization
                } ]
            } ]
        } ];
        CommonModule.ctorParameters = function() {
            return [];
        };
        var DeprecatedI18NPipesModule = function() {
            function DeprecatedI18NPipesModule() {}
            return DeprecatedI18NPipesModule;
        }();
        DeprecatedI18NPipesModule.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["E"],
            args: [ {
                declarations: [],
                exports: []
            } ]
        } ];
        DeprecatedI18NPipesModule.ctorParameters = function() {
            return [];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var DOCUMENT = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["I"]("DocumentToken");
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var PLATFORM_BROWSER_ID = "browser";
        var PLATFORM_SERVER_ID = "server";
        var PLATFORM_WORKER_APP_ID = "browserWorkerApp";
        var PLATFORM_WORKER_UI_ID = "browserWorkerUi";
        function isPlatformBrowser(platformId) {
            return platformId === PLATFORM_BROWSER_ID;
        }
        function isPlatformServer(platformId) {
            return platformId === PLATFORM_SERVER_ID;
        }
        function isPlatformWorkerApp(platformId) {
            return platformId === PLATFORM_WORKER_APP_ID;
        }
        function isPlatformWorkerUi(platformId) {
            return platformId === PLATFORM_WORKER_UI_ID;
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var VERSION = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["F"]("4.4.7");
    },
    "3j3K": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        (function(global) {
            var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("TToO");
            var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("rCTf");
            var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
            var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_merge__ = __webpack_require__("1KT0");
            var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_merge__);
            var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_share__ = __webpack_require__("+ayw");
            var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_share__);
            var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("EEr4");
            var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
            __webpack_require__.d(__webpack_exports__, "B", function() {
                return ApplicationRef;
            });
            __webpack_require__.d(__webpack_exports__, "a", function() {
                return enableProdMode;
            });
            __webpack_require__.d(__webpack_exports__, "O", function() {
                return isDevMode;
            });
            __webpack_require__.d(__webpack_exports__, "S", function() {
                return createPlatformFactory;
            });
            __webpack_require__.d(__webpack_exports__, "w", function() {
                return NgProbeToken;
            });
            __webpack_require__.d(__webpack_exports__, "k", function() {
                return APP_ID;
            });
            __webpack_require__.d(__webpack_exports__, "R", function() {
                return PLATFORM_INITIALIZER;
            });
            __webpack_require__.d(__webpack_exports__, "Q", function() {
                return PLATFORM_ID;
            });
            __webpack_require__.d(__webpack_exports__, "v", function() {
                return APP_INITIALIZER;
            });
            __webpack_require__.d(__webpack_exports__, "x", function() {
                return ApplicationInitStatus;
            });
            __webpack_require__.d(__webpack_exports__, "K", function() {
                return getDebugNode;
            });
            __webpack_require__.d(__webpack_exports__, "t", function() {
                return Testability;
            });
            __webpack_require__.d(__webpack_exports__, "J", function() {
                return setTestabilityGetter;
            });
            __webpack_require__.d(__webpack_exports__, "h", function() {
                return LOCALE_ID;
            });
            __webpack_require__.d(__webpack_exports__, "C", function() {
                return ApplicationModule;
            });
            __webpack_require__.d(__webpack_exports__, "V", function() {
                return EventEmitter;
            });
            __webpack_require__.d(__webpack_exports__, "u", function() {
                return ErrorHandler;
            });
            __webpack_require__.d(__webpack_exports__, "q", function() {
                return Sanitizer;
            });
            __webpack_require__.d(__webpack_exports__, "P", function() {
                return SecurityContext;
            });
            __webpack_require__.d(__webpack_exports__, "_5", function() {
                return Attribute;
            });
            __webpack_require__.d(__webpack_exports__, "Y", function() {
                return Directive;
            });
            __webpack_require__.d(__webpack_exports__, "_1", function() {
                return Input;
            });
            __webpack_require__.d(__webpack_exports__, "_15", function() {
                return Output;
            });
            __webpack_require__.d(__webpack_exports__, "_9", function() {
                return Pipe;
            });
            __webpack_require__.d(__webpack_exports__, "E", function() {
                return NgModule;
            });
            __webpack_require__.d(__webpack_exports__, "M", function() {
                return ViewEncapsulation;
            });
            __webpack_require__.d(__webpack_exports__, "F", function() {
                return Version;
            });
            __webpack_require__.d(__webpack_exports__, "_11", function() {
                return forwardRef;
            });
            __webpack_require__.d(__webpack_exports__, "A", function() {
                return Injector;
            });
            __webpack_require__.d(__webpack_exports__, "I", function() {
                return InjectionToken;
            });
            __webpack_require__.d(__webpack_exports__, "H", function() {
                return Inject;
            });
            __webpack_require__.d(__webpack_exports__, "L", function() {
                return Optional;
            });
            __webpack_require__.d(__webpack_exports__, "D", function() {
                return Injectable;
            });
            __webpack_require__.d(__webpack_exports__, "_14", function() {
                return Self;
            });
            __webpack_require__.d(__webpack_exports__, "U", function() {
                return SkipSelf;
            });
            __webpack_require__.d(__webpack_exports__, "_4", function() {
                return Host;
            });
            __webpack_require__.d(__webpack_exports__, "r", function() {
                return NgZone;
            });
            __webpack_require__.d(__webpack_exports__, "_0", function() {
                return Renderer;
            });
            __webpack_require__.d(__webpack_exports__, "_12", function() {
                return Renderer2;
            });
            __webpack_require__.d(__webpack_exports__, "s", function() {
                return RendererFactory2;
            });
            __webpack_require__.d(__webpack_exports__, "N", function() {
                return RendererStyleFlags2;
            });
            __webpack_require__.d(__webpack_exports__, "j", function() {
                return Compiler;
            });
            __webpack_require__.d(__webpack_exports__, "e", function() {
                return ComponentFactoryResolver;
            });
            __webpack_require__.d(__webpack_exports__, "Z", function() {
                return ElementRef;
            });
            __webpack_require__.d(__webpack_exports__, "g", function() {
                return NgModuleRef;
            });
            __webpack_require__.d(__webpack_exports__, "_3", function() {
                return TemplateRef;
            });
            __webpack_require__.d(__webpack_exports__, "_2", function() {
                return ViewContainerRef;
            });
            __webpack_require__.d(__webpack_exports__, "_10", function() {
                return ChangeDetectorRef;
            });
            __webpack_require__.d(__webpack_exports__, "m", function() {
                return IterableDiffers;
            });
            __webpack_require__.d(__webpack_exports__, "o", function() {
                return KeyValueDiffers;
            });
            __webpack_require__.d(__webpack_exports__, "_6", function() {
                return WrappedValue;
            });
            __webpack_require__.d(__webpack_exports__, "T", function() {
                return platformCore;
            });
            __webpack_require__.d(__webpack_exports__, "W", function() {
                return isListLikeIterable;
            });
            __webpack_require__.d(__webpack_exports__, "z", function() {
                return Console;
            });
            __webpack_require__.d(__webpack_exports__, "f", function() {
                return CodegenComponentFactoryResolver;
            });
            __webpack_require__.d(__webpack_exports__, "G", function() {
                return _global;
            });
            __webpack_require__.d(__webpack_exports__, "_13", function() {
                return looseIdentical;
            });
            __webpack_require__.d(__webpack_exports__, "X", function() {
                return stringify;
            });
            __webpack_require__.d(__webpack_exports__, "_8", function() {
                return isObservable;
            });
            __webpack_require__.d(__webpack_exports__, "_7", function() {
                return isPromise;
            });
            __webpack_require__.d(__webpack_exports__, "_20", function() {
                return anchorDef;
            });
            __webpack_require__.d(__webpack_exports__, "_24", function() {
                return createComponentFactory;
            });
            __webpack_require__.d(__webpack_exports__, "b", function() {
                return createNgModuleFactory;
            });
            __webpack_require__.d(__webpack_exports__, "_16", function() {
                return createRendererType2;
            });
            __webpack_require__.d(__webpack_exports__, "_21", function() {
                return directiveDef;
            });
            __webpack_require__.d(__webpack_exports__, "_18", function() {
                return elementDef;
            });
            __webpack_require__.d(__webpack_exports__, "c", function() {
                return moduleDef;
            });
            __webpack_require__.d(__webpack_exports__, "d", function() {
                return moduleProvideDef;
            });
            __webpack_require__.d(__webpack_exports__, "_22", function() {
                return nodeValue;
            });
            __webpack_require__.d(__webpack_exports__, "_23", function() {
                return providerDef;
            });
            __webpack_require__.d(__webpack_exports__, "_19", function() {
                return textDef;
            });
            __webpack_require__.d(__webpack_exports__, "_17", function() {
                return viewDef;
            });
            __webpack_require__.d(__webpack_exports__, "n", function() {
                return _iterableDiffersFactory;
            });
            __webpack_require__.d(__webpack_exports__, "p", function() {
                return _keyValueDiffersFactory;
            });
            __webpack_require__.d(__webpack_exports__, "i", function() {
                return _localeFactory;
            });
            __webpack_require__.d(__webpack_exports__, "y", function() {
                return ApplicationRef_;
            });
            __webpack_require__.d(__webpack_exports__, "l", function() {
                return _appIdRandomProviderFactory;
            });
            /**
 * @license Angular v4.4.7
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
            var OpaqueToken = function() {
                function OpaqueToken(_desc) {
                    this._desc = _desc;
                }
                OpaqueToken.prototype.toString = function() {
                    return "Token " + this._desc;
                };
                return OpaqueToken;
            }();
            var InjectionToken = function(_super) {
                __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](InjectionToken, _super);
                function InjectionToken(desc) {
                    return _super.call(this, desc) || this;
                }
                InjectionToken.prototype.toString = function() {
                    return "InjectionToken " + this._desc;
                };
                return InjectionToken;
            }(OpaqueToken);
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var __window = typeof window !== "undefined" && window;
            var __self = typeof self !== "undefined" && typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && self;
            var __global = typeof global !== "undefined" && global;
            var _global = __window || __global || __self;
            var _symbolIterator = null;
            function getSymbolIterator() {
                if (!_symbolIterator) {
                    var Symbol = _global["Symbol"];
                    if (Symbol && Symbol.iterator) {
                        _symbolIterator = Symbol.iterator;
                    } else {
                        var keys = Object.getOwnPropertyNames(Map.prototype);
                        for (var i = 0; i < keys.length; ++i) {
                            var key = keys[i];
                            if (key !== "entries" && key !== "size" && Map.prototype[key] === Map.prototype["entries"]) {
                                _symbolIterator = key;
                            }
                        }
                    }
                }
                return _symbolIterator;
            }
            function scheduleMicroTask(fn) {
                Zone.current.scheduleMicroTask("scheduleMicrotask", fn);
            }
            function looseIdentical(a, b) {
                return a === b || typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b);
            }
            function stringify(token) {
                if (typeof token === "string") {
                    return token;
                }
                if (token == null) {
                    return "" + token;
                }
                if (token.overriddenName) {
                    return "" + token.overriddenName;
                }
                if (token.name) {
                    return "" + token.name;
                }
                var res = token.toString();
                if (res == null) {
                    return "" + res;
                }
                var newLineIndex = res.indexOf("\n");
                return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var _nextClassId = 0;
            var Reflect = _global["Reflect"];
            function extractAnnotation(annotation) {
                if (typeof annotation === "function" && annotation.hasOwnProperty("annotation")) {
                    annotation = annotation.annotation;
                }
                return annotation;
            }
            function applyParams(fnOrArray, key) {
                if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function || fnOrArray === Number || fnOrArray === Array) {
                    throw new Error("Can not use native " + stringify(fnOrArray) + " as constructor");
                }
                if (typeof fnOrArray === "function") {
                    return fnOrArray;
                }
                if (Array.isArray(fnOrArray)) {
                    var annotations = fnOrArray;
                    var annoLength = annotations.length - 1;
                    var fn = fnOrArray[annoLength];
                    if (typeof fn !== "function") {
                        throw new Error("Last position of Class method array must be Function in key " + key + " was '" + stringify(fn) + "'");
                    }
                    if (annoLength != fn.length) {
                        throw new Error("Number of annotations (" + annoLength + ") does not match number of arguments (" + fn.length + ") in the function: " + stringify(fn));
                    }
                    var paramsAnnotations = [];
                    for (var i = 0, ii = annotations.length - 1; i < ii; i++) {
                        var paramAnnotations = [];
                        paramsAnnotations.push(paramAnnotations);
                        var annotation = annotations[i];
                        if (Array.isArray(annotation)) {
                            for (var j = 0; j < annotation.length; j++) {
                                paramAnnotations.push(extractAnnotation(annotation[j]));
                            }
                        } else if (typeof annotation === "function") {
                            paramAnnotations.push(extractAnnotation(annotation));
                        } else {
                            paramAnnotations.push(annotation);
                        }
                    }
                    Reflect.defineMetadata("parameters", paramsAnnotations, fn);
                    return fn;
                }
                throw new Error("Only Function or Array is supported in Class definition for key '" + key + "' is '" + stringify(fnOrArray) + "'");
            }
            function Class(clsDef) {
                var constructor = applyParams(clsDef.hasOwnProperty("constructor") ? clsDef.constructor : undefined, "constructor");
                var proto = constructor.prototype;
                if (clsDef.hasOwnProperty("extends")) {
                    if (typeof clsDef.extends === "function") {
                        constructor.prototype = proto = Object.create(clsDef.extends.prototype);
                    } else {
                        throw new Error("Class definition 'extends' property must be a constructor function was: " + stringify(clsDef.extends));
                    }
                }
                for (var key in clsDef) {
                    if (key !== "extends" && key !== "prototype" && clsDef.hasOwnProperty(key)) {
                        proto[key] = applyParams(clsDef[key], key);
                    }
                }
                if (this && this.annotations instanceof Array) {
                    Reflect.defineMetadata("annotations", this.annotations, constructor);
                }
                var constructorName = constructor["name"];
                if (!constructorName || constructorName === "constructor") {
                    constructor["overriddenName"] = "class" + _nextClassId++;
                }
                return constructor;
            }
            function makeDecorator(name, props, parentClass, chainFn) {
                var metaCtor = makeMetadataCtor(props);
                function DecoratorFactory(objOrType) {
                    if (!(Reflect && Reflect.getOwnMetadata)) {
                        throw "reflect-metadata shim is required when using class decorators";
                    }
                    if (this instanceof DecoratorFactory) {
                        metaCtor.call(this, objOrType);
                        return this;
                    }
                    var annotationInstance = new DecoratorFactory(objOrType);
                    var chainAnnotation = typeof this === "function" && Array.isArray(this.annotations) ? this.annotations : [];
                    chainAnnotation.push(annotationInstance);
                    var TypeDecorator = function TypeDecorator(cls) {
                        var annotations = Reflect.getOwnMetadata("annotations", cls) || [];
                        annotations.push(annotationInstance);
                        Reflect.defineMetadata("annotations", annotations, cls);
                        return cls;
                    };
                    TypeDecorator.annotations = chainAnnotation;
                    TypeDecorator.Class = Class;
                    if (chainFn) chainFn(TypeDecorator);
                    return TypeDecorator;
                }
                if (parentClass) {
                    DecoratorFactory.prototype = Object.create(parentClass.prototype);
                }
                DecoratorFactory.prototype.toString = function() {
                    return "@" + name;
                };
                DecoratorFactory.annotationCls = DecoratorFactory;
                return DecoratorFactory;
            }
            function makeMetadataCtor(props) {
                return function ctor() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (props) {
                        var values = props.apply(void 0, args);
                        for (var propName in values) {
                            this[propName] = values[propName];
                        }
                    }
                };
            }
            function makeParamDecorator(name, props, parentClass) {
                var metaCtor = makeMetadataCtor(props);
                function ParamDecoratorFactory() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (this instanceof ParamDecoratorFactory) {
                        metaCtor.apply(this, args);
                        return this;
                    }
                    var annotationInstance = new (ParamDecoratorFactory.bind.apply(ParamDecoratorFactory, [ void 0 ].concat(args)))();
                    ParamDecorator.annotation = annotationInstance;
                    return ParamDecorator;
                    function ParamDecorator(cls, unusedKey, index) {
                        var parameters = Reflect.getOwnMetadata("parameters", cls) || [];
                        while (parameters.length <= index) {
                            parameters.push(null);
                        }
                        parameters[index] = parameters[index] || [];
                        parameters[index].push(annotationInstance);
                        Reflect.defineMetadata("parameters", parameters, cls);
                        return cls;
                    }
                }
                if (parentClass) {
                    ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
                }
                ParamDecoratorFactory.prototype.toString = function() {
                    return "@" + name;
                };
                ParamDecoratorFactory.annotationCls = ParamDecoratorFactory;
                return ParamDecoratorFactory;
            }
            function makePropDecorator(name, props, parentClass) {
                var metaCtor = makeMetadataCtor(props);
                function PropDecoratorFactory() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (this instanceof PropDecoratorFactory) {
                        metaCtor.apply(this, args);
                        return this;
                    }
                    var decoratorInstance = new (PropDecoratorFactory.bind.apply(PropDecoratorFactory, [ void 0 ].concat(args)))();
                    return function PropDecorator(target, name) {
                        var meta = Reflect.getOwnMetadata("propMetadata", target.constructor) || {};
                        meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
                        meta[name].unshift(decoratorInstance);
                        Reflect.defineMetadata("propMetadata", meta, target.constructor);
                    };
                }
                if (parentClass) {
                    PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
                }
                PropDecoratorFactory.prototype.toString = function() {
                    return "@" + name;
                };
                PropDecoratorFactory.annotationCls = PropDecoratorFactory;
                return PropDecoratorFactory;
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var ANALYZE_FOR_ENTRY_COMPONENTS = new InjectionToken("AnalyzeForEntryComponents");
            var Attribute = makeParamDecorator("Attribute", function(attributeName) {
                return {
                    attributeName: attributeName
                };
            });
            var Query = function() {
                function Query() {}
                return Query;
            }();
            var ContentChildren = makePropDecorator("ContentChildren", function(selector, data) {
                if (data === void 0) {
                    data = {};
                }
                return Object.assign({
                    selector: selector,
                    first: false,
                    isViewQuery: false,
                    descendants: false
                }, data);
            }, Query);
            var ContentChild = makePropDecorator("ContentChild", function(selector, data) {
                if (data === void 0) {
                    data = {};
                }
                return Object.assign({
                    selector: selector,
                    first: true,
                    isViewQuery: false,
                    descendants: true
                }, data);
            }, Query);
            var ViewChildren = makePropDecorator("ViewChildren", function(selector, data) {
                if (data === void 0) {
                    data = {};
                }
                return Object.assign({
                    selector: selector,
                    first: false,
                    isViewQuery: true,
                    descendants: true
                }, data);
            }, Query);
            var ViewChild = makePropDecorator("ViewChild", function(selector, data) {
                return Object.assign({
                    selector: selector,
                    first: true,
                    isViewQuery: true,
                    descendants: true
                }, data);
            }, Query);
            var ChangeDetectionStrategy = {};
            ChangeDetectionStrategy.OnPush = 0;
            ChangeDetectionStrategy.Default = 1;
            ChangeDetectionStrategy[ChangeDetectionStrategy.OnPush] = "OnPush";
            ChangeDetectionStrategy[ChangeDetectionStrategy.Default] = "Default";
            var ChangeDetectorStatus = {};
            ChangeDetectorStatus.CheckOnce = 0;
            ChangeDetectorStatus.Checked = 1;
            ChangeDetectorStatus.CheckAlways = 2;
            ChangeDetectorStatus.Detached = 3;
            ChangeDetectorStatus.Errored = 4;
            ChangeDetectorStatus.Destroyed = 5;
            ChangeDetectorStatus[ChangeDetectorStatus.CheckOnce] = "CheckOnce";
            ChangeDetectorStatus[ChangeDetectorStatus.Checked] = "Checked";
            ChangeDetectorStatus[ChangeDetectorStatus.CheckAlways] = "CheckAlways";
            ChangeDetectorStatus[ChangeDetectorStatus.Detached] = "Detached";
            ChangeDetectorStatus[ChangeDetectorStatus.Errored] = "Errored";
            ChangeDetectorStatus[ChangeDetectorStatus.Destroyed] = "Destroyed";
            function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
                return changeDetectionStrategy == null || changeDetectionStrategy === ChangeDetectionStrategy.Default;
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var Directive = makeDecorator("Directive", function(dir) {
                if (dir === void 0) {
                    dir = {};
                }
                return dir;
            });
            var Component = makeDecorator("Component", function(c) {
                if (c === void 0) {
                    c = {};
                }
                return Object.assign({
                    changeDetection: ChangeDetectionStrategy.Default
                }, c);
            }, Directive);
            var Pipe = makeDecorator("Pipe", function(p) {
                return Object.assign({
                    pure: true
                }, p);
            });
            var Input = makePropDecorator("Input", function(bindingPropertyName) {
                return {
                    bindingPropertyName: bindingPropertyName
                };
            });
            var Output = makePropDecorator("Output", function(bindingPropertyName) {
                return {
                    bindingPropertyName: bindingPropertyName
                };
            });
            var HostBinding = makePropDecorator("HostBinding", function(hostPropertyName) {
                return {
                    hostPropertyName: hostPropertyName
                };
            });
            var HostListener = makePropDecorator("HostListener", function(eventName, args) {
                return {
                    eventName: eventName,
                    args: args
                };
            });
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var CUSTOM_ELEMENTS_SCHEMA = {
                name: "custom-elements"
            };
            var NO_ERRORS_SCHEMA = {
                name: "no-errors-schema"
            };
            var NgModule = makeDecorator("NgModule", function(ngModule) {
                return ngModule;
            });
            var ViewEncapsulation = {};
            ViewEncapsulation.Emulated = 0;
            ViewEncapsulation.Native = 1;
            ViewEncapsulation.None = 2;
            ViewEncapsulation[ViewEncapsulation.Emulated] = "Emulated";
            ViewEncapsulation[ViewEncapsulation.Native] = "Native";
            ViewEncapsulation[ViewEncapsulation.None] = "None";
            var ViewMetadata = function() {
                function ViewMetadata(opts) {
                    if (opts === void 0) {
                        opts = {};
                    }
                    this.templateUrl = opts.templateUrl;
                    this.template = opts.template;
                    this.styleUrls = opts.styleUrls;
                    this.styles = opts.styles;
                    this.encapsulation = opts.encapsulation;
                    this.animations = opts.animations;
                    this.interpolation = opts.interpolation;
                }
                return ViewMetadata;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var Version = function() {
                function Version(full) {
                    this.full = full;
                }
                Object.defineProperty(Version.prototype, "major", {
                    get: function() {
                        return this.full.split(".")[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Version.prototype, "minor", {
                    get: function() {
                        return this.full.split(".")[1];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Version.prototype, "patch", {
                    get: function() {
                        return this.full.split(".").slice(2).join(".");
                    },
                    enumerable: true,
                    configurable: true
                });
                return Version;
            }();
            var VERSION = new Version("4.4.7");
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var Inject = makeParamDecorator("Inject", function(token) {
                return {
                    token: token
                };
            });
            var Optional = makeParamDecorator("Optional");
            var Injectable = makeDecorator("Injectable");
            var Self = makeParamDecorator("Self");
            var SkipSelf = makeParamDecorator("SkipSelf");
            var Host = makeParamDecorator("Host");
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function forwardRef(forwardRefFn) {
                forwardRefFn.__forward_ref__ = forwardRef;
                forwardRefFn.toString = function() {
                    return stringify(this());
                };
                return forwardRefFn;
            }
            function resolveForwardRef(type) {
                if (typeof type === "function" && type.hasOwnProperty("__forward_ref__") && type.__forward_ref__ === forwardRef) {
                    return type();
                } else {
                    return type;
                }
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var _THROW_IF_NOT_FOUND = new Object();
            var THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
            var _NullInjector = function() {
                function _NullInjector() {}
                _NullInjector.prototype.get = function(token, notFoundValue) {
                    if (notFoundValue === void 0) {
                        notFoundValue = _THROW_IF_NOT_FOUND;
                    }
                    if (notFoundValue === _THROW_IF_NOT_FOUND) {
                        throw new Error("No provider for " + stringify(token) + "!");
                    }
                    return notFoundValue;
                };
                return _NullInjector;
            }();
            var Injector = function() {
                function Injector() {}
                Injector.prototype.get = function(token, notFoundValue) {};
                Injector.prototype.get = function(token, notFoundValue) {};
                return Injector;
            }();
            Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
            Injector.NULL = new _NullInjector();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var ERROR_COMPONENT_TYPE = "ngComponentType";
            var ERROR_DEBUG_CONTEXT = "ngDebugContext";
            var ERROR_ORIGINAL_ERROR = "ngOriginalError";
            var ERROR_LOGGER = "ngErrorLogger";
            function getDebugContext(error) {
                return error[ERROR_DEBUG_CONTEXT];
            }
            function getOriginalError(error) {
                return error[ERROR_ORIGINAL_ERROR];
            }
            function getErrorLogger(error) {
                return error[ERROR_LOGGER] || defaultErrorLogger;
            }
            function defaultErrorLogger(console) {
                var values = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    values[_i - 1] = arguments[_i];
                }
                console.error.apply(console, values);
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var ErrorHandler = function() {
                function ErrorHandler(deprecatedParameter) {
                    this._console = console;
                }
                ErrorHandler.prototype.handleError = function(error) {
                    var originalError = this._findOriginalError(error);
                    var context = this._findContext(error);
                    var errorLogger = getErrorLogger(error);
                    errorLogger(this._console, "ERROR", error);
                    if (originalError) {
                        errorLogger(this._console, "ORIGINAL ERROR", originalError);
                    }
                    if (context) {
                        errorLogger(this._console, "ERROR CONTEXT", context);
                    }
                };
                ErrorHandler.prototype._findContext = function(error) {
                    if (error) {
                        return getDebugContext(error) ? getDebugContext(error) : this._findContext(getOriginalError(error));
                    }
                    return null;
                };
                ErrorHandler.prototype._findOriginalError = function(error) {
                    var e = getOriginalError(error);
                    while (e && getOriginalError(e)) {
                        e = getOriginalError(e);
                    }
                    return e;
                };
                return ErrorHandler;
            }();
            function wrappedError(message, originalError) {
                var msg = message + " caused by: " + (originalError instanceof Error ? originalError.message : originalError);
                var error = Error(msg);
                error[ERROR_ORIGINAL_ERROR] = originalError;
                return error;
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function findFirstClosedCycle(keys) {
                var res = [];
                for (var i = 0; i < keys.length; ++i) {
                    if (res.indexOf(keys[i]) > -1) {
                        res.push(keys[i]);
                        return res;
                    }
                    res.push(keys[i]);
                }
                return res;
            }
            function constructResolvingPath(keys) {
                if (keys.length > 1) {
                    var reversed = findFirstClosedCycle(keys.slice().reverse());
                    var tokenStrs = reversed.map(function(k) {
                        return stringify(k.token);
                    });
                    return " (" + tokenStrs.join(" -> ") + ")";
                }
                return "";
            }
            function injectionError(injector, key, constructResolvingMessage, originalError) {
                var keys = [ key ];
                var errMsg = constructResolvingMessage(keys);
                var error = originalError ? wrappedError(errMsg, originalError) : Error(errMsg);
                error.addKey = addKey;
                error.keys = keys;
                error.injectors = [ injector ];
                error.constructResolvingMessage = constructResolvingMessage;
                error[ERROR_ORIGINAL_ERROR] = originalError;
                return error;
            }
            function addKey(injector, key) {
                this.injectors.push(injector);
                this.keys.push(key);
                this.message = this.constructResolvingMessage(this.keys);
            }
            function noProviderError(injector, key) {
                return injectionError(injector, key, function(keys) {
                    var first = stringify(keys[0].token);
                    return "No provider for " + first + "!" + constructResolvingPath(keys);
                });
            }
            function cyclicDependencyError(injector, key) {
                return injectionError(injector, key, function(keys) {
                    return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
                });
            }
            function instantiationError(injector, originalException, originalStack, key) {
                return injectionError(injector, key, function(keys) {
                    var first = stringify(keys[0].token);
                    return originalException.message + ": Error during instantiation of " + first + "!" + constructResolvingPath(keys) + ".";
                }, originalException);
            }
            function invalidProviderError(provider) {
                return Error("Invalid provider - only instances of Provider and Type are allowed, got: " + provider);
            }
            function noAnnotationError(typeOrFunc, params) {
                var signature = [];
                for (var i = 0, ii = params.length; i < ii; i++) {
                    var parameter = params[i];
                    if (!parameter || parameter.length == 0) {
                        signature.push("?");
                    } else {
                        signature.push(parameter.map(stringify).join(" "));
                    }
                }
                return Error("Cannot resolve all parameters for '" + stringify(typeOrFunc) + "'(" + signature.join(", ") + "). " + "Make sure that all the parameters are decorated with Inject or have valid type annotations and that '" + stringify(typeOrFunc) + "' is decorated with Injectable.");
            }
            function outOfBoundsError(index) {
                return Error("Index " + index + " is out-of-bounds.");
            }
            function mixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
                return Error("Cannot mix multi providers and regular providers, got: " + provider1 + " " + provider2);
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var ReflectiveKey = function() {
                function ReflectiveKey(token, id) {
                    this.token = token;
                    this.id = id;
                    if (!token) {
                        throw new Error("Token must be defined!");
                    }
                }
                Object.defineProperty(ReflectiveKey.prototype, "displayName", {
                    get: function() {
                        return stringify(this.token);
                    },
                    enumerable: true,
                    configurable: true
                });
                ReflectiveKey.get = function(token) {
                    return _globalKeyRegistry.get(resolveForwardRef(token));
                };
                Object.defineProperty(ReflectiveKey, "numberOfKeys", {
                    get: function() {
                        return _globalKeyRegistry.numberOfKeys;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ReflectiveKey;
            }();
            var KeyRegistry = function() {
                function KeyRegistry() {
                    this._allKeys = new Map();
                }
                KeyRegistry.prototype.get = function(token) {
                    if (token instanceof ReflectiveKey) return token;
                    if (this._allKeys.has(token)) {
                        return this._allKeys.get(token);
                    }
                    var newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
                    this._allKeys.set(token, newKey);
                    return newKey;
                };
                Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
                    get: function() {
                        return this._allKeys.size;
                    },
                    enumerable: true,
                    configurable: true
                });
                return KeyRegistry;
            }();
            var _globalKeyRegistry = new KeyRegistry();
            var Type = Function;
            function isType(v) {
                return typeof v === "function";
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var DELEGATE_CTOR = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*arguments\)/;
            var ReflectionCapabilities = function() {
                function ReflectionCapabilities(reflect) {
                    this._reflect = reflect || _global["Reflect"];
                }
                ReflectionCapabilities.prototype.isReflectionEnabled = function() {
                    return true;
                };
                ReflectionCapabilities.prototype.factory = function(t) {
                    return function() {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return new (t.bind.apply(t, [ void 0 ].concat(args)))();
                    };
                };
                ReflectionCapabilities.prototype._zipTypesAndAnnotations = function(paramTypes, paramAnnotations) {
                    var result;
                    if (typeof paramTypes === "undefined") {
                        result = new Array(paramAnnotations.length);
                    } else {
                        result = new Array(paramTypes.length);
                    }
                    for (var i = 0; i < result.length; i++) {
                        if (typeof paramTypes === "undefined") {
                            result[i] = [];
                        } else if (paramTypes[i] != Object) {
                            result[i] = [ paramTypes[i] ];
                        } else {
                            result[i] = [];
                        }
                        if (paramAnnotations && paramAnnotations[i] != null) {
                            result[i] = result[i].concat(paramAnnotations[i]);
                        }
                    }
                    return result;
                };
                ReflectionCapabilities.prototype._ownParameters = function(type, parentCtor) {
                    if (DELEGATE_CTOR.exec(type.toString())) {
                        return null;
                    }
                    if (type.parameters && type.parameters !== parentCtor.parameters) {
                        return type.parameters;
                    }
                    var tsickleCtorParams = type.ctorParameters;
                    if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
                        var ctorParameters = typeof tsickleCtorParams === "function" ? tsickleCtorParams() : tsickleCtorParams;
                        var paramTypes = ctorParameters.map(function(ctorParam) {
                            return ctorParam && ctorParam.type;
                        });
                        var paramAnnotations = ctorParameters.map(function(ctorParam) {
                            return ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators);
                        });
                        return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
                    }
                    if (this._reflect != null && this._reflect.getOwnMetadata != null) {
                        var paramAnnotations = this._reflect.getOwnMetadata("parameters", type);
                        var paramTypes = this._reflect.getOwnMetadata("design:paramtypes", type);
                        if (paramTypes || paramAnnotations) {
                            return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
                        }
                    }
                    return new Array(type.length).fill(undefined);
                };
                ReflectionCapabilities.prototype.parameters = function(type) {
                    if (!isType(type)) {
                        return [];
                    }
                    var parentCtor = getParentCtor(type);
                    var parameters = this._ownParameters(type, parentCtor);
                    if (!parameters && parentCtor !== Object) {
                        parameters = this.parameters(parentCtor);
                    }
                    return parameters || [];
                };
                ReflectionCapabilities.prototype._ownAnnotations = function(typeOrFunc, parentCtor) {
                    if (typeOrFunc.annotations && typeOrFunc.annotations !== parentCtor.annotations) {
                        var annotations = typeOrFunc.annotations;
                        if (typeof annotations === "function" && annotations.annotations) {
                            annotations = annotations.annotations;
                        }
                        return annotations;
                    }
                    if (typeOrFunc.decorators && typeOrFunc.decorators !== parentCtor.decorators) {
                        return convertTsickleDecoratorIntoMetadata(typeOrFunc.decorators);
                    }
                    if (this._reflect && this._reflect.getOwnMetadata) {
                        return this._reflect.getOwnMetadata("annotations", typeOrFunc);
                    }
                    return null;
                };
                ReflectionCapabilities.prototype.annotations = function(typeOrFunc) {
                    if (!isType(typeOrFunc)) {
                        return [];
                    }
                    var parentCtor = getParentCtor(typeOrFunc);
                    var ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
                    var parentAnnotations = parentCtor !== Object ? this.annotations(parentCtor) : [];
                    return parentAnnotations.concat(ownAnnotations);
                };
                ReflectionCapabilities.prototype._ownPropMetadata = function(typeOrFunc, parentCtor) {
                    if (typeOrFunc.propMetadata && typeOrFunc.propMetadata !== parentCtor.propMetadata) {
                        var propMetadata = typeOrFunc.propMetadata;
                        if (typeof propMetadata === "function" && propMetadata.propMetadata) {
                            propMetadata = propMetadata.propMetadata;
                        }
                        return propMetadata;
                    }
                    if (typeOrFunc.propDecorators && typeOrFunc.propDecorators !== parentCtor.propDecorators) {
                        var propDecorators_1 = typeOrFunc.propDecorators;
                        var propMetadata_1 = {};
                        Object.keys(propDecorators_1).forEach(function(prop) {
                            propMetadata_1[prop] = convertTsickleDecoratorIntoMetadata(propDecorators_1[prop]);
                        });
                        return propMetadata_1;
                    }
                    if (this._reflect && this._reflect.getOwnMetadata) {
                        return this._reflect.getOwnMetadata("propMetadata", typeOrFunc);
                    }
                    return null;
                };
                ReflectionCapabilities.prototype.propMetadata = function(typeOrFunc) {
                    if (!isType(typeOrFunc)) {
                        return {};
                    }
                    var parentCtor = getParentCtor(typeOrFunc);
                    var propMetadata = {};
                    if (parentCtor !== Object) {
                        var parentPropMetadata_1 = this.propMetadata(parentCtor);
                        Object.keys(parentPropMetadata_1).forEach(function(propName) {
                            propMetadata[propName] = parentPropMetadata_1[propName];
                        });
                    }
                    var ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
                    if (ownPropMetadata) {
                        Object.keys(ownPropMetadata).forEach(function(propName) {
                            var decorators = [];
                            if (propMetadata.hasOwnProperty(propName)) {
                                decorators.push.apply(decorators, propMetadata[propName]);
                            }
                            decorators.push.apply(decorators, ownPropMetadata[propName]);
                            propMetadata[propName] = decorators;
                        });
                    }
                    return propMetadata;
                };
                ReflectionCapabilities.prototype.hasLifecycleHook = function(type, lcProperty) {
                    return type instanceof Type && lcProperty in type.prototype;
                };
                ReflectionCapabilities.prototype.getter = function(name) {
                    return new Function("o", "return o." + name + ";");
                };
                ReflectionCapabilities.prototype.setter = function(name) {
                    return new Function("o", "v", "return o." + name + " = v;");
                };
                ReflectionCapabilities.prototype.method = function(name) {
                    var functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
                    return new Function("o", "args", functionBody);
                };
                ReflectionCapabilities.prototype.importUri = function(type) {
                    if (typeof type === "object" && type["filePath"]) {
                        return type["filePath"];
                    }
                    return "./" + stringify(type);
                };
                ReflectionCapabilities.prototype.resourceUri = function(type) {
                    return "./" + stringify(type);
                };
                ReflectionCapabilities.prototype.resolveIdentifier = function(name, moduleUrl, members, runtime) {
                    return runtime;
                };
                ReflectionCapabilities.prototype.resolveEnum = function(enumIdentifier, name) {
                    return enumIdentifier[name];
                };
                return ReflectionCapabilities;
            }();
            function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
                if (!decoratorInvocations) {
                    return [];
                }
                return decoratorInvocations.map(function(decoratorInvocation) {
                    var decoratorType = decoratorInvocation.type;
                    var annotationCls = decoratorType.annotationCls;
                    var annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
                    return new (annotationCls.bind.apply(annotationCls, [ void 0 ].concat(annotationArgs)))();
                });
            }
            function getParentCtor(ctor) {
                var parentProto = Object.getPrototypeOf(ctor.prototype);
                var parentCtor = parentProto ? parentProto.constructor : null;
                return parentCtor || Object;
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var Reflector = function() {
                function Reflector(reflectionCapabilities) {
                    this.reflectionCapabilities = reflectionCapabilities;
                }
                Reflector.prototype.updateCapabilities = function(caps) {
                    this.reflectionCapabilities = caps;
                };
                Reflector.prototype.factory = function(type) {
                    return this.reflectionCapabilities.factory(type);
                };
                Reflector.prototype.parameters = function(typeOrFunc) {
                    return this.reflectionCapabilities.parameters(typeOrFunc);
                };
                Reflector.prototype.annotations = function(typeOrFunc) {
                    return this.reflectionCapabilities.annotations(typeOrFunc);
                };
                Reflector.prototype.propMetadata = function(typeOrFunc) {
                    return this.reflectionCapabilities.propMetadata(typeOrFunc);
                };
                Reflector.prototype.hasLifecycleHook = function(type, lcProperty) {
                    return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
                };
                Reflector.prototype.getter = function(name) {
                    return this.reflectionCapabilities.getter(name);
                };
                Reflector.prototype.setter = function(name) {
                    return this.reflectionCapabilities.setter(name);
                };
                Reflector.prototype.method = function(name) {
                    return this.reflectionCapabilities.method(name);
                };
                Reflector.prototype.importUri = function(type) {
                    return this.reflectionCapabilities.importUri(type);
                };
                Reflector.prototype.resourceUri = function(type) {
                    return this.reflectionCapabilities.resourceUri(type);
                };
                Reflector.prototype.resolveIdentifier = function(name, moduleUrl, members, runtime) {
                    return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, members, runtime);
                };
                Reflector.prototype.resolveEnum = function(identifier, name) {
                    return this.reflectionCapabilities.resolveEnum(identifier, name);
                };
                return Reflector;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var reflector = new Reflector(new ReflectionCapabilities());
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var ReflectiveDependency = function() {
                function ReflectiveDependency(key, optional, visibility) {
                    this.key = key;
                    this.optional = optional;
                    this.visibility = visibility;
                }
                ReflectiveDependency.fromKey = function(key) {
                    return new ReflectiveDependency(key, false, null);
                };
                return ReflectiveDependency;
            }();
            var _EMPTY_LIST = [];
            var ResolvedReflectiveProvider_ = function() {
                function ResolvedReflectiveProvider_(key, resolvedFactories, multiProvider) {
                    this.key = key;
                    this.resolvedFactories = resolvedFactories;
                    this.multiProvider = multiProvider;
                }
                Object.defineProperty(ResolvedReflectiveProvider_.prototype, "resolvedFactory", {
                    get: function() {
                        return this.resolvedFactories[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                return ResolvedReflectiveProvider_;
            }();
            var ResolvedReflectiveFactory = function() {
                function ResolvedReflectiveFactory(factory, dependencies) {
                    this.factory = factory;
                    this.dependencies = dependencies;
                }
                return ResolvedReflectiveFactory;
            }();
            function resolveReflectiveFactory(provider) {
                var factoryFn;
                var resolvedDeps;
                if (provider.useClass) {
                    var useClass = resolveForwardRef(provider.useClass);
                    factoryFn = reflector.factory(useClass);
                    resolvedDeps = _dependenciesFor(useClass);
                } else if (provider.useExisting) {
                    factoryFn = function(aliasInstance) {
                        return aliasInstance;
                    };
                    resolvedDeps = [ ReflectiveDependency.fromKey(ReflectiveKey.get(provider.useExisting)) ];
                } else if (provider.useFactory) {
                    factoryFn = provider.useFactory;
                    resolvedDeps = constructDependencies(provider.useFactory, provider.deps);
                } else {
                    factoryFn = function() {
                        return provider.useValue;
                    };
                    resolvedDeps = _EMPTY_LIST;
                }
                return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
            }
            function resolveReflectiveProvider(provider) {
                return new ResolvedReflectiveProvider_(ReflectiveKey.get(provider.provide), [ resolveReflectiveFactory(provider) ], provider.multi || false);
            }
            function resolveReflectiveProviders(providers) {
                var normalized = _normalizeProviders(providers, []);
                var resolved = normalized.map(resolveReflectiveProvider);
                var resolvedProviderMap = mergeResolvedReflectiveProviders(resolved, new Map());
                return Array.from(resolvedProviderMap.values());
            }
            function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
                for (var i = 0; i < providers.length; i++) {
                    var provider = providers[i];
                    var existing = normalizedProvidersMap.get(provider.key.id);
                    if (existing) {
                        if (provider.multiProvider !== existing.multiProvider) {
                            throw mixingMultiProvidersWithRegularProvidersError(existing, provider);
                        }
                        if (provider.multiProvider) {
                            for (var j = 0; j < provider.resolvedFactories.length; j++) {
                                existing.resolvedFactories.push(provider.resolvedFactories[j]);
                            }
                        } else {
                            normalizedProvidersMap.set(provider.key.id, provider);
                        }
                    } else {
                        var resolvedProvider = void 0;
                        if (provider.multiProvider) {
                            resolvedProvider = new ResolvedReflectiveProvider_(provider.key, provider.resolvedFactories.slice(), provider.multiProvider);
                        } else {
                            resolvedProvider = provider;
                        }
                        normalizedProvidersMap.set(provider.key.id, resolvedProvider);
                    }
                }
                return normalizedProvidersMap;
            }
            function _normalizeProviders(providers, res) {
                providers.forEach(function(b) {
                    if (b instanceof Type) {
                        res.push({
                            provide: b,
                            useClass: b
                        });
                    } else if (b && typeof b == "object" && b.provide !== undefined) {
                        res.push(b);
                    } else if (b instanceof Array) {
                        _normalizeProviders(b, res);
                    } else {
                        throw invalidProviderError(b);
                    }
                });
                return res;
            }
            function constructDependencies(typeOrFunc, dependencies) {
                if (!dependencies) {
                    return _dependenciesFor(typeOrFunc);
                } else {
                    var params_1 = dependencies.map(function(t) {
                        return [ t ];
                    });
                    return dependencies.map(function(t) {
                        return _extractToken(typeOrFunc, t, params_1);
                    });
                }
            }
            function _dependenciesFor(typeOrFunc) {
                var params = reflector.parameters(typeOrFunc);
                if (!params) return [];
                if (params.some(function(p) {
                    return p == null;
                })) {
                    throw noAnnotationError(typeOrFunc, params);
                }
                return params.map(function(p) {
                    return _extractToken(typeOrFunc, p, params);
                });
            }
            function _extractToken(typeOrFunc, metadata, params) {
                var token = null;
                var optional = false;
                if (!Array.isArray(metadata)) {
                    if (metadata instanceof Inject) {
                        return _createDependency(metadata.token, optional, null);
                    } else {
                        return _createDependency(metadata, optional, null);
                    }
                }
                var visibility = null;
                for (var i = 0; i < metadata.length; ++i) {
                    var paramMetadata = metadata[i];
                    if (paramMetadata instanceof Type) {
                        token = paramMetadata;
                    } else if (paramMetadata instanceof Inject) {
                        token = paramMetadata.token;
                    } else if (paramMetadata instanceof Optional) {
                        optional = true;
                    } else if (paramMetadata instanceof Self || paramMetadata instanceof SkipSelf) {
                        visibility = paramMetadata;
                    } else if (paramMetadata instanceof InjectionToken) {
                        token = paramMetadata;
                    }
                }
                token = resolveForwardRef(token);
                if (token != null) {
                    return _createDependency(token, optional, visibility);
                } else {
                    throw noAnnotationError(typeOrFunc, params);
                }
            }
            function _createDependency(token, optional, visibility) {
                return new ReflectiveDependency(ReflectiveKey.get(token), optional, visibility);
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var UNDEFINED = new Object();
            var ReflectiveInjector = function() {
                function ReflectiveInjector() {}
                ReflectiveInjector.resolve = function(providers) {
                    return resolveReflectiveProviders(providers);
                };
                ReflectiveInjector.resolveAndCreate = function(providers, parent) {
                    var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
                    return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
                };
                ReflectiveInjector.fromResolvedProviders = function(providers, parent) {
                    return new ReflectiveInjector_(providers, parent);
                };
                ReflectiveInjector.prototype.parent = function() {};
                ReflectiveInjector.prototype.resolveAndCreateChild = function(providers) {};
                ReflectiveInjector.prototype.createChildFromResolved = function(providers) {};
                ReflectiveInjector.prototype.resolveAndInstantiate = function(provider) {};
                ReflectiveInjector.prototype.instantiateResolved = function(provider) {};
                ReflectiveInjector.prototype.get = function(token, notFoundValue) {};
                return ReflectiveInjector;
            }();
            var ReflectiveInjector_ = function() {
                function ReflectiveInjector_(_providers, _parent) {
                    this._constructionCounter = 0;
                    this._providers = _providers;
                    this._parent = _parent || null;
                    var len = _providers.length;
                    this.keyIds = new Array(len);
                    this.objs = new Array(len);
                    for (var i = 0; i < len; i++) {
                        this.keyIds[i] = _providers[i].key.id;
                        this.objs[i] = UNDEFINED;
                    }
                }
                ReflectiveInjector_.prototype.get = function(token, notFoundValue) {
                    if (notFoundValue === void 0) {
                        notFoundValue = THROW_IF_NOT_FOUND;
                    }
                    return this._getByKey(ReflectiveKey.get(token), null, notFoundValue);
                };
                Object.defineProperty(ReflectiveInjector_.prototype, "parent", {
                    get: function() {
                        return this._parent;
                    },
                    enumerable: true,
                    configurable: true
                });
                ReflectiveInjector_.prototype.resolveAndCreateChild = function(providers) {
                    var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
                    return this.createChildFromResolved(ResolvedReflectiveProviders);
                };
                ReflectiveInjector_.prototype.createChildFromResolved = function(providers) {
                    var inj = new ReflectiveInjector_(providers);
                    inj._parent = this;
                    return inj;
                };
                ReflectiveInjector_.prototype.resolveAndInstantiate = function(provider) {
                    return this.instantiateResolved(ReflectiveInjector.resolve([ provider ])[0]);
                };
                ReflectiveInjector_.prototype.instantiateResolved = function(provider) {
                    return this._instantiateProvider(provider);
                };
                ReflectiveInjector_.prototype.getProviderAtIndex = function(index) {
                    if (index < 0 || index >= this._providers.length) {
                        throw outOfBoundsError(index);
                    }
                    return this._providers[index];
                };
                ReflectiveInjector_.prototype._new = function(provider) {
                    if (this._constructionCounter++ > this._getMaxNumberOfObjects()) {
                        throw cyclicDependencyError(this, provider.key);
                    }
                    return this._instantiateProvider(provider);
                };
                ReflectiveInjector_.prototype._getMaxNumberOfObjects = function() {
                    return this.objs.length;
                };
                ReflectiveInjector_.prototype._instantiateProvider = function(provider) {
                    if (provider.multiProvider) {
                        var res = new Array(provider.resolvedFactories.length);
                        for (var i = 0; i < provider.resolvedFactories.length; ++i) {
                            res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
                        }
                        return res;
                    } else {
                        return this._instantiate(provider, provider.resolvedFactories[0]);
                    }
                };
                ReflectiveInjector_.prototype._instantiate = function(provider, ResolvedReflectiveFactory$$1) {
                    var _this = this;
                    var factory = ResolvedReflectiveFactory$$1.factory;
                    var deps;
                    try {
                        deps = ResolvedReflectiveFactory$$1.dependencies.map(function(dep) {
                            return _this._getByReflectiveDependency(dep);
                        });
                    } catch (e) {
                        if (e.addKey) {
                            e.addKey(this, provider.key);
                        }
                        throw e;
                    }
                    var obj;
                    try {
                        obj = factory.apply(void 0, deps);
                    } catch (e) {
                        throw instantiationError(this, e, e.stack, provider.key);
                    }
                    return obj;
                };
                ReflectiveInjector_.prototype._getByReflectiveDependency = function(dep) {
                    return this._getByKey(dep.key, dep.visibility, dep.optional ? null : THROW_IF_NOT_FOUND);
                };
                ReflectiveInjector_.prototype._getByKey = function(key, visibility, notFoundValue) {
                    if (key === INJECTOR_KEY) {
                        return this;
                    }
                    if (visibility instanceof Self) {
                        return this._getByKeySelf(key, notFoundValue);
                    } else {
                        return this._getByKeyDefault(key, notFoundValue, visibility);
                    }
                };
                ReflectiveInjector_.prototype._getObjByKeyId = function(keyId) {
                    for (var i = 0; i < this.keyIds.length; i++) {
                        if (this.keyIds[i] === keyId) {
                            if (this.objs[i] === UNDEFINED) {
                                this.objs[i] = this._new(this._providers[i]);
                            }
                            return this.objs[i];
                        }
                    }
                    return UNDEFINED;
                };
                ReflectiveInjector_.prototype._throwOrNull = function(key, notFoundValue) {
                    if (notFoundValue !== THROW_IF_NOT_FOUND) {
                        return notFoundValue;
                    } else {
                        throw noProviderError(this, key);
                    }
                };
                ReflectiveInjector_.prototype._getByKeySelf = function(key, notFoundValue) {
                    var obj = this._getObjByKeyId(key.id);
                    return obj !== UNDEFINED ? obj : this._throwOrNull(key, notFoundValue);
                };
                ReflectiveInjector_.prototype._getByKeyDefault = function(key, notFoundValue, visibility) {
                    var inj;
                    if (visibility instanceof SkipSelf) {
                        inj = this._parent;
                    } else {
                        inj = this;
                    }
                    while (inj instanceof ReflectiveInjector_) {
                        var inj_ = inj;
                        var obj = inj_._getObjByKeyId(key.id);
                        if (obj !== UNDEFINED) return obj;
                        inj = inj_._parent;
                    }
                    if (inj !== null) {
                        return inj.get(key.token, notFoundValue);
                    } else {
                        return this._throwOrNull(key, notFoundValue);
                    }
                };
                Object.defineProperty(ReflectiveInjector_.prototype, "displayName", {
                    get: function() {
                        var providers = _mapProviders(this, function(b) {
                            return ' "' + b.key.displayName + '" ';
                        }).join(", ");
                        return "ReflectiveInjector(providers: [" + providers + "])";
                    },
                    enumerable: true,
                    configurable: true
                });
                ReflectiveInjector_.prototype.toString = function() {
                    return this.displayName;
                };
                return ReflectiveInjector_;
            }();
            var INJECTOR_KEY = ReflectiveKey.get(Injector);
            function _mapProviders(injector, fn) {
                var res = new Array(injector._providers.length);
                for (var i = 0; i < injector._providers.length; ++i) {
                    res[i] = fn(injector.getProviderAtIndex(i));
                }
                return res;
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function isPromise(obj) {
                return !!obj && typeof obj.then === "function";
            }
            function isObservable(obj) {
                return !!obj && typeof obj.subscribe === "function";
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var APP_INITIALIZER = new InjectionToken("Application Initializer");
            var ApplicationInitStatus = function() {
                function ApplicationInitStatus(appInits) {
                    var _this = this;
                    this.appInits = appInits;
                    this.initialized = false;
                    this._done = false;
                    this._donePromise = new Promise(function(res, rej) {
                        _this.resolve = res;
                        _this.reject = rej;
                    });
                }
                ApplicationInitStatus.prototype.runInitializers = function() {
                    var _this = this;
                    if (this.initialized) {
                        return;
                    }
                    var asyncInitPromises = [];
                    var complete = function() {
                        _this._done = true;
                        _this.resolve();
                    };
                    if (this.appInits) {
                        for (var i = 0; i < this.appInits.length; i++) {
                            var initResult = this.appInits[i]();
                            if (isPromise(initResult)) {
                                asyncInitPromises.push(initResult);
                            }
                        }
                    }
                    Promise.all(asyncInitPromises).then(function() {
                        complete();
                    }).catch(function(e) {
                        _this.reject(e);
                    });
                    if (asyncInitPromises.length === 0) {
                        complete();
                    }
                    this.initialized = true;
                };
                Object.defineProperty(ApplicationInitStatus.prototype, "done", {
                    get: function() {
                        return this._done;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ApplicationInitStatus.prototype, "donePromise", {
                    get: function() {
                        return this._donePromise;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ApplicationInitStatus;
            }();
            ApplicationInitStatus.decorators = [ {
                type: Injectable
            } ];
            ApplicationInitStatus.ctorParameters = function() {
                return [ {
                    type: Array,
                    decorators: [ {
                        type: Inject,
                        args: [ APP_INITIALIZER ]
                    }, {
                        type: Optional
                    } ]
                } ];
            };
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var APP_ID = new InjectionToken("AppId");
            function _appIdRandomProviderFactory() {
                return "" + _randomChar() + _randomChar() + _randomChar();
            }
            var APP_ID_RANDOM_PROVIDER = {
                provide: APP_ID,
                useFactory: _appIdRandomProviderFactory,
                deps: []
            };
            function _randomChar() {
                return String.fromCharCode(97 + Math.floor(Math.random() * 25));
            }
            var PLATFORM_INITIALIZER = new InjectionToken("Platform Initializer");
            var PLATFORM_ID = new InjectionToken("Platform ID");
            var APP_BOOTSTRAP_LISTENER = new InjectionToken("appBootstrapListener");
            var PACKAGE_ROOT_URL = new InjectionToken("Application Packages Root URL");
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var Console = function() {
                function Console() {}
                Console.prototype.log = function(message) {
                    console.log(message);
                };
                Console.prototype.warn = function(message) {
                    console.warn(message);
                };
                return Console;
            }();
            Console.decorators = [ {
                type: Injectable
            } ];
            Console.ctorParameters = function() {
                return [];
            };
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var ModuleWithComponentFactories = function() {
                function ModuleWithComponentFactories(ngModuleFactory, componentFactories) {
                    this.ngModuleFactory = ngModuleFactory;
                    this.componentFactories = componentFactories;
                }
                return ModuleWithComponentFactories;
            }();
            function _throwError() {
                throw new Error("Runtime compiler is not loaded");
            }
            var Compiler = function() {
                function Compiler() {}
                Compiler.prototype.compileModuleSync = function(moduleType) {
                    throw _throwError();
                };
                Compiler.prototype.compileModuleAsync = function(moduleType) {
                    throw _throwError();
                };
                Compiler.prototype.compileModuleAndAllComponentsSync = function(moduleType) {
                    throw _throwError();
                };
                Compiler.prototype.compileModuleAndAllComponentsAsync = function(moduleType) {
                    throw _throwError();
                };
                Compiler.prototype.getNgContentSelectors = function(component) {
                    throw _throwError();
                };
                Compiler.prototype.clearCache = function() {};
                Compiler.prototype.clearCacheFor = function(type) {};
                return Compiler;
            }();
            Compiler.decorators = [ {
                type: Injectable
            } ];
            Compiler.ctorParameters = function() {
                return [];
            };
            var COMPILER_OPTIONS = new InjectionToken("compilerOptions");
            var CompilerFactory = function() {
                function CompilerFactory() {}
                CompilerFactory.prototype.createCompiler = function(options) {};
                return CompilerFactory;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var ComponentRef = function() {
                function ComponentRef() {}
                ComponentRef.prototype.location = function() {};
                ComponentRef.prototype.injector = function() {};
                ComponentRef.prototype.instance = function() {};
                ComponentRef.prototype.hostView = function() {};
                ComponentRef.prototype.changeDetectorRef = function() {};
                ComponentRef.prototype.componentType = function() {};
                ComponentRef.prototype.destroy = function() {};
                ComponentRef.prototype.onDestroy = function(callback) {};
                return ComponentRef;
            }();
            var ComponentFactory = function() {
                function ComponentFactory() {}
                ComponentFactory.prototype.selector = function() {};
                ComponentFactory.prototype.componentType = function() {};
                ComponentFactory.prototype.ngContentSelectors = function() {};
                ComponentFactory.prototype.inputs = function() {};
                ComponentFactory.prototype.outputs = function() {};
                ComponentFactory.prototype.create = function(injector, projectableNodes, rootSelectorOrNode, ngModule) {};
                return ComponentFactory;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function noComponentFactoryError(component) {
                var error = Error("No component factory found for " + stringify(component) + ". Did you add it to @NgModule.entryComponents?");
                error[ERROR_COMPONENT] = component;
                return error;
            }
            var ERROR_COMPONENT = "ngComponent";
            var _NullComponentFactoryResolver = function() {
                function _NullComponentFactoryResolver() {}
                _NullComponentFactoryResolver.prototype.resolveComponentFactory = function(component) {
                    throw noComponentFactoryError(component);
                };
                return _NullComponentFactoryResolver;
            }();
            var ComponentFactoryResolver = function() {
                function ComponentFactoryResolver() {}
                ComponentFactoryResolver.prototype.resolveComponentFactory = function(component) {};
                return ComponentFactoryResolver;
            }();
            ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver();
            var CodegenComponentFactoryResolver = function() {
                function CodegenComponentFactoryResolver(factories, _parent, _ngModule) {
                    this._parent = _parent;
                    this._ngModule = _ngModule;
                    this._factories = new Map();
                    for (var i = 0; i < factories.length; i++) {
                        var factory = factories[i];
                        this._factories.set(factory.componentType, factory);
                    }
                }
                CodegenComponentFactoryResolver.prototype.resolveComponentFactory = function(component) {
                    var factory = this._factories.get(component);
                    if (!factory && this._parent) {
                        factory = this._parent.resolveComponentFactory(component);
                    }
                    if (!factory) {
                        throw noComponentFactoryError(component);
                    }
                    return new ComponentFactoryBoundToModule(factory, this._ngModule);
                };
                return CodegenComponentFactoryResolver;
            }();
            var ComponentFactoryBoundToModule = function(_super) {
                __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](ComponentFactoryBoundToModule, _super);
                function ComponentFactoryBoundToModule(factory, ngModule) {
                    var _this = _super.call(this) || this;
                    _this.factory = factory;
                    _this.ngModule = ngModule;
                    return _this;
                }
                Object.defineProperty(ComponentFactoryBoundToModule.prototype, "selector", {
                    get: function() {
                        return this.factory.selector;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentFactoryBoundToModule.prototype, "componentType", {
                    get: function() {
                        return this.factory.componentType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentFactoryBoundToModule.prototype, "ngContentSelectors", {
                    get: function() {
                        return this.factory.ngContentSelectors;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentFactoryBoundToModule.prototype, "inputs", {
                    get: function() {
                        return this.factory.inputs;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentFactoryBoundToModule.prototype, "outputs", {
                    get: function() {
                        return this.factory.outputs;
                    },
                    enumerable: true,
                    configurable: true
                });
                ComponentFactoryBoundToModule.prototype.create = function(injector, projectableNodes, rootSelectorOrNode, ngModule) {
                    return this.factory.create(injector, projectableNodes, rootSelectorOrNode, ngModule || this.ngModule);
                };
                return ComponentFactoryBoundToModule;
            }(ComponentFactory);
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var NgModuleRef = function() {
                function NgModuleRef() {}
                NgModuleRef.prototype.injector = function() {};
                NgModuleRef.prototype.componentFactoryResolver = function() {};
                NgModuleRef.prototype.instance = function() {};
                NgModuleRef.prototype.destroy = function() {};
                NgModuleRef.prototype.onDestroy = function(callback) {};
                return NgModuleRef;
            }();
            var NgModuleFactory = function() {
                function NgModuleFactory() {}
                NgModuleFactory.prototype.moduleType = function() {};
                NgModuleFactory.prototype.create = function(parentInjector) {};
                return NgModuleFactory;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var trace;
            var events;
            function detectWTF() {
                var wtf = _global["wtf"];
                if (wtf) {
                    trace = wtf["trace"];
                    if (trace) {
                        events = trace["events"];
                        return true;
                    }
                }
                return false;
            }
            function createScope$1(signature, flags) {
                if (flags === void 0) {
                    flags = null;
                }
                return events.createScope(signature, flags);
            }
            function leave(scope, returnValue) {
                trace.leaveScope(scope, returnValue);
                return returnValue;
            }
            function startTimeRange(rangeType, action) {
                return trace.beginTimeRange(rangeType, action);
            }
            function endTimeRange(range) {
                trace.endTimeRange(range);
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var wtfEnabled = detectWTF();
            function noopScope(arg0, arg1) {
                return null;
            }
            var wtfCreateScope = wtfEnabled ? createScope$1 : function(signature, flags) {
                return noopScope;
            };
            var wtfLeave = wtfEnabled ? leave : function(s, r) {
                return r;
            };
            var wtfStartTimeRange = wtfEnabled ? startTimeRange : function(rangeType, action) {
                return null;
            };
            var wtfEndTimeRange = wtfEnabled ? endTimeRange : function(r) {
                return null;
            };
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var EventEmitter = function(_super) {
                __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](EventEmitter, _super);
                function EventEmitter(isAsync) {
                    if (isAsync === void 0) {
                        isAsync = false;
                    }
                    var _this = _super.call(this) || this;
                    _this.__isAsync = isAsync;
                    return _this;
                }
                EventEmitter.prototype.emit = function(value) {
                    _super.prototype.next.call(this, value);
                };
                EventEmitter.prototype.subscribe = function(generatorOrNext, error, complete) {
                    var schedulerFn;
                    var errorFn = function(err) {
                        return null;
                    };
                    var completeFn = function() {
                        return null;
                    };
                    if (generatorOrNext && typeof generatorOrNext === "object") {
                        schedulerFn = this.__isAsync ? function(value) {
                            setTimeout(function() {
                                return generatorOrNext.next(value);
                            });
                        } : function(value) {
                            generatorOrNext.next(value);
                        };
                        if (generatorOrNext.error) {
                            errorFn = this.__isAsync ? function(err) {
                                setTimeout(function() {
                                    return generatorOrNext.error(err);
                                });
                            } : function(err) {
                                generatorOrNext.error(err);
                            };
                        }
                        if (generatorOrNext.complete) {
                            completeFn = this.__isAsync ? function() {
                                setTimeout(function() {
                                    return generatorOrNext.complete();
                                });
                            } : function() {
                                generatorOrNext.complete();
                            };
                        }
                    } else {
                        schedulerFn = this.__isAsync ? function(value) {
                            setTimeout(function() {
                                return generatorOrNext(value);
                            });
                        } : function(value) {
                            generatorOrNext(value);
                        };
                        if (error) {
                            errorFn = this.__isAsync ? function(err) {
                                setTimeout(function() {
                                    return error(err);
                                });
                            } : function(err) {
                                error(err);
                            };
                        }
                        if (complete) {
                            completeFn = this.__isAsync ? function() {
                                setTimeout(function() {
                                    return complete();
                                });
                            } : function() {
                                complete();
                            };
                        }
                    }
                    return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
                };
                return EventEmitter;
            }(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]);
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var NgZone = function() {
                function NgZone(_a) {
                    var _b = _a.enableLongStackTrace, enableLongStackTrace = _b === void 0 ? false : _b;
                    this.hasPendingMicrotasks = false;
                    this.hasPendingMacrotasks = false;
                    this.isStable = true;
                    this.onUnstable = new EventEmitter(false);
                    this.onMicrotaskEmpty = new EventEmitter(false);
                    this.onStable = new EventEmitter(false);
                    this.onError = new EventEmitter(false);
                    if (typeof Zone == "undefined") {
                        throw new Error("Angular requires Zone.js prolyfill.");
                    }
                    Zone.assertZonePatched();
                    var self = this;
                    self._nesting = 0;
                    self._outer = self._inner = Zone.current;
                    if (Zone["wtfZoneSpec"]) {
                        self._inner = self._inner.fork(Zone["wtfZoneSpec"]);
                    }
                    if (enableLongStackTrace && Zone["longStackTraceZoneSpec"]) {
                        self._inner = self._inner.fork(Zone["longStackTraceZoneSpec"]);
                    }
                    forkInnerZoneWithAngularBehavior(self);
                }
                NgZone.isInAngularZone = function() {
                    return Zone.current.get("isAngularZone") === true;
                };
                NgZone.assertInAngularZone = function() {
                    if (!NgZone.isInAngularZone()) {
                        throw new Error("Expected to be in Angular Zone, but it is not!");
                    }
                };
                NgZone.assertNotInAngularZone = function() {
                    if (NgZone.isInAngularZone()) {
                        throw new Error("Expected to not be in Angular Zone, but it is!");
                    }
                };
                NgZone.prototype.run = function(fn) {
                    return this._inner.run(fn);
                };
                NgZone.prototype.runGuarded = function(fn) {
                    return this._inner.runGuarded(fn);
                };
                NgZone.prototype.runOutsideAngular = function(fn) {
                    return this._outer.run(fn);
                };
                return NgZone;
            }();
            function checkStable(zone) {
                if (zone._nesting == 0 && !zone.hasPendingMicrotasks && !zone.isStable) {
                    try {
                        zone._nesting++;
                        zone.onMicrotaskEmpty.emit(null);
                    } finally {
                        zone._nesting--;
                        if (!zone.hasPendingMicrotasks) {
                            try {
                                zone.runOutsideAngular(function() {
                                    return zone.onStable.emit(null);
                                });
                            } finally {
                                zone.isStable = true;
                            }
                        }
                    }
                }
            }
            function forkInnerZoneWithAngularBehavior(zone) {
                zone._inner = zone._inner.fork({
                    name: "angular",
                    properties: {
                        isAngularZone: true
                    },
                    onInvokeTask: function(delegate, current, target, task, applyThis, applyArgs) {
                        try {
                            onEnter(zone);
                            return delegate.invokeTask(target, task, applyThis, applyArgs);
                        } finally {
                            onLeave(zone);
                        }
                    },
                    onInvoke: function(delegate, current, target, callback, applyThis, applyArgs, source) {
                        try {
                            onEnter(zone);
                            return delegate.invoke(target, callback, applyThis, applyArgs, source);
                        } finally {
                            onLeave(zone);
                        }
                    },
                    onHasTask: function(delegate, current, target, hasTaskState) {
                        delegate.hasTask(target, hasTaskState);
                        if (current === target) {
                            if (hasTaskState.change == "microTask") {
                                zone.hasPendingMicrotasks = hasTaskState.microTask;
                                checkStable(zone);
                            } else if (hasTaskState.change == "macroTask") {
                                zone.hasPendingMacrotasks = hasTaskState.macroTask;
                            }
                        }
                    },
                    onHandleError: function(delegate, current, target, error) {
                        delegate.handleError(target, error);
                        zone.runOutsideAngular(function() {
                            return zone.onError.emit(error);
                        });
                        return false;
                    }
                });
            }
            function onEnter(zone) {
                zone._nesting++;
                if (zone.isStable) {
                    zone.isStable = false;
                    zone.onUnstable.emit(null);
                }
            }
            function onLeave(zone) {
                zone._nesting--;
                checkStable(zone);
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var Testability = function() {
                function Testability(_ngZone) {
                    this._ngZone = _ngZone;
                    this._pendingCount = 0;
                    this._isZoneStable = true;
                    this._didWork = false;
                    this._callbacks = [];
                    this._watchAngularEvents();
                }
                Testability.prototype._watchAngularEvents = function() {
                    var _this = this;
                    this._ngZone.onUnstable.subscribe({
                        next: function() {
                            _this._didWork = true;
                            _this._isZoneStable = false;
                        }
                    });
                    this._ngZone.runOutsideAngular(function() {
                        _this._ngZone.onStable.subscribe({
                            next: function() {
                                NgZone.assertNotInAngularZone();
                                scheduleMicroTask(function() {
                                    _this._isZoneStable = true;
                                    _this._runCallbacksIfReady();
                                });
                            }
                        });
                    });
                };
                Testability.prototype.increasePendingRequestCount = function() {
                    this._pendingCount += 1;
                    this._didWork = true;
                    return this._pendingCount;
                };
                Testability.prototype.decreasePendingRequestCount = function() {
                    this._pendingCount -= 1;
                    if (this._pendingCount < 0) {
                        throw new Error("pending async requests below zero");
                    }
                    this._runCallbacksIfReady();
                    return this._pendingCount;
                };
                Testability.prototype.isStable = function() {
                    return this._isZoneStable && this._pendingCount == 0 && !this._ngZone.hasPendingMacrotasks;
                };
                Testability.prototype._runCallbacksIfReady = function() {
                    var _this = this;
                    if (this.isStable()) {
                        scheduleMicroTask(function() {
                            while (_this._callbacks.length !== 0) {
                                _this._callbacks.pop()(_this._didWork);
                            }
                            _this._didWork = false;
                        });
                    } else {
                        this._didWork = true;
                    }
                };
                Testability.prototype.whenStable = function(callback) {
                    this._callbacks.push(callback);
                    this._runCallbacksIfReady();
                };
                Testability.prototype.getPendingRequestCount = function() {
                    return this._pendingCount;
                };
                Testability.prototype.findBindings = function(using, provider, exactMatch) {
                    return [];
                };
                Testability.prototype.findProviders = function(using, provider, exactMatch) {
                    return [];
                };
                return Testability;
            }();
            Testability.decorators = [ {
                type: Injectable
            } ];
            Testability.ctorParameters = function() {
                return [ {
                    type: NgZone
                } ];
            };
            var TestabilityRegistry = function() {
                function TestabilityRegistry() {
                    this._applications = new Map();
                    _testabilityGetter.addToWindow(this);
                }
                TestabilityRegistry.prototype.registerApplication = function(token, testability) {
                    this._applications.set(token, testability);
                };
                TestabilityRegistry.prototype.getTestability = function(elem) {
                    return this._applications.get(elem) || null;
                };
                TestabilityRegistry.prototype.getAllTestabilities = function() {
                    return Array.from(this._applications.values());
                };
                TestabilityRegistry.prototype.getAllRootElements = function() {
                    return Array.from(this._applications.keys());
                };
                TestabilityRegistry.prototype.findTestabilityInTree = function(elem, findInAncestors) {
                    if (findInAncestors === void 0) {
                        findInAncestors = true;
                    }
                    return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
                };
                return TestabilityRegistry;
            }();
            TestabilityRegistry.decorators = [ {
                type: Injectable
            } ];
            TestabilityRegistry.ctorParameters = function() {
                return [];
            };
            var _NoopGetTestability = function() {
                function _NoopGetTestability() {}
                _NoopGetTestability.prototype.addToWindow = function(registry) {};
                _NoopGetTestability.prototype.findTestabilityInTree = function(registry, elem, findInAncestors) {
                    return null;
                };
                return _NoopGetTestability;
            }();
            function setTestabilityGetter(getter) {
                _testabilityGetter = getter;
            }
            var _testabilityGetter = new _NoopGetTestability();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var _devMode = true;
            var _runModeLocked = false;
            var _platform;
            var ALLOW_MULTIPLE_PLATFORMS = new InjectionToken("AllowMultipleToken");
            function enableProdMode() {
                if (_runModeLocked) {
                    throw new Error("Cannot enable prod mode after platform setup.");
                }
                _devMode = false;
            }
            function isDevMode() {
                _runModeLocked = true;
                return _devMode;
            }
            var NgProbeToken = function() {
                function NgProbeToken(name, token) {
                    this.name = name;
                    this.token = token;
                }
                return NgProbeToken;
            }();
            function createPlatform(injector) {
                if (_platform && !_platform.destroyed && !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
                    throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                }
                _platform = injector.get(PlatformRef);
                var inits = injector.get(PLATFORM_INITIALIZER, null);
                if (inits) inits.forEach(function(init) {
                    return init();
                });
                return _platform;
            }
            function createPlatformFactory(parentPlatformFactory, name, providers) {
                if (providers === void 0) {
                    providers = [];
                }
                var marker = new InjectionToken("Platform: " + name);
                return function(extraProviders) {
                    if (extraProviders === void 0) {
                        extraProviders = [];
                    }
                    var platform = getPlatform();
                    if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
                        if (parentPlatformFactory) {
                            parentPlatformFactory(providers.concat(extraProviders).concat({
                                provide: marker,
                                useValue: true
                            }));
                        } else {
                            createPlatform(ReflectiveInjector.resolveAndCreate(providers.concat(extraProviders).concat({
                                provide: marker,
                                useValue: true
                            })));
                        }
                    }
                    return assertPlatform(marker);
                };
            }
            function assertPlatform(requiredToken) {
                var platform = getPlatform();
                if (!platform) {
                    throw new Error("No platform exists!");
                }
                if (!platform.injector.get(requiredToken, null)) {
                    throw new Error("A platform with a different configuration has been created. Please destroy it first.");
                }
                return platform;
            }
            function destroyPlatform() {
                if (_platform && !_platform.destroyed) {
                    _platform.destroy();
                }
            }
            function getPlatform() {
                return _platform && !_platform.destroyed ? _platform : null;
            }
            var PlatformRef = function() {
                function PlatformRef() {}
                PlatformRef.prototype.bootstrapModuleFactory = function(moduleFactory) {};
                PlatformRef.prototype.bootstrapModule = function(moduleType, compilerOptions) {};
                PlatformRef.prototype.onDestroy = function(callback) {};
                PlatformRef.prototype.injector = function() {};
                PlatformRef.prototype.destroy = function() {};
                PlatformRef.prototype.destroyed = function() {};
                return PlatformRef;
            }();
            function _callAndReportToErrorHandler(errorHandler, ngZone, callback) {
                try {
                    var result = callback();
                    if (isPromise(result)) {
                        return result.catch(function(e) {
                            ngZone.runOutsideAngular(function() {
                                return errorHandler.handleError(e);
                            });
                            throw e;
                        });
                    }
                    return result;
                } catch (e) {
                    ngZone.runOutsideAngular(function() {
                        return errorHandler.handleError(e);
                    });
                    throw e;
                }
            }
            var PlatformRef_ = function(_super) {
                __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](PlatformRef_, _super);
                function PlatformRef_(_injector) {
                    var _this = _super.call(this) || this;
                    _this._injector = _injector;
                    _this._modules = [];
                    _this._destroyListeners = [];
                    _this._destroyed = false;
                    return _this;
                }
                PlatformRef_.prototype.onDestroy = function(callback) {
                    this._destroyListeners.push(callback);
                };
                Object.defineProperty(PlatformRef_.prototype, "injector", {
                    get: function() {
                        return this._injector;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PlatformRef_.prototype, "destroyed", {
                    get: function() {
                        return this._destroyed;
                    },
                    enumerable: true,
                    configurable: true
                });
                PlatformRef_.prototype.destroy = function() {
                    if (this._destroyed) {
                        throw new Error("The platform has already been destroyed!");
                    }
                    this._modules.slice().forEach(function(module) {
                        return module.destroy();
                    });
                    this._destroyListeners.forEach(function(listener) {
                        return listener();
                    });
                    this._destroyed = true;
                };
                PlatformRef_.prototype.bootstrapModuleFactory = function(moduleFactory) {
                    return this._bootstrapModuleFactoryWithZone(moduleFactory);
                };
                PlatformRef_.prototype._bootstrapModuleFactoryWithZone = function(moduleFactory, ngZone) {
                    var _this = this;
                    if (!ngZone) ngZone = new NgZone({
                        enableLongStackTrace: isDevMode()
                    });
                    return ngZone.run(function() {
                        var ngZoneInjector = ReflectiveInjector.resolveAndCreate([ {
                            provide: NgZone,
                            useValue: ngZone
                        } ], _this.injector);
                        var moduleRef = moduleFactory.create(ngZoneInjector);
                        var exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
                        if (!exceptionHandler) {
                            throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                        }
                        moduleRef.onDestroy(function() {
                            return remove(_this._modules, moduleRef);
                        });
                        ngZone.runOutsideAngular(function() {
                            return ngZone.onError.subscribe({
                                next: function(error) {
                                    exceptionHandler.handleError(error);
                                }
                            });
                        });
                        return _callAndReportToErrorHandler(exceptionHandler, ngZone, function() {
                            var initStatus = moduleRef.injector.get(ApplicationInitStatus);
                            initStatus.runInitializers();
                            return initStatus.donePromise.then(function() {
                                _this._moduleDoBootstrap(moduleRef);
                                return moduleRef;
                            });
                        });
                    });
                };
                PlatformRef_.prototype.bootstrapModule = function(moduleType, compilerOptions) {
                    if (compilerOptions === void 0) {
                        compilerOptions = [];
                    }
                    return this._bootstrapModuleWithZone(moduleType, compilerOptions);
                };
                PlatformRef_.prototype._bootstrapModuleWithZone = function(moduleType, compilerOptions, ngZone) {
                    var _this = this;
                    if (compilerOptions === void 0) {
                        compilerOptions = [];
                    }
                    var compilerFactory = this.injector.get(CompilerFactory);
                    var compiler = compilerFactory.createCompiler(Array.isArray(compilerOptions) ? compilerOptions : [ compilerOptions ]);
                    return compiler.compileModuleAsync(moduleType).then(function(moduleFactory) {
                        return _this._bootstrapModuleFactoryWithZone(moduleFactory, ngZone);
                    });
                };
                PlatformRef_.prototype._moduleDoBootstrap = function(moduleRef) {
                    var appRef = moduleRef.injector.get(ApplicationRef);
                    if (moduleRef._bootstrapComponents.length > 0) {
                        moduleRef._bootstrapComponents.forEach(function(f) {
                            return appRef.bootstrap(f);
                        });
                    } else if (moduleRef.instance.ngDoBootstrap) {
                        moduleRef.instance.ngDoBootstrap(appRef);
                    } else {
                        throw new Error("The module " + stringify(moduleRef.instance.constructor) + ' was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ' + "Please define one of these.");
                    }
                    this._modules.push(moduleRef);
                };
                return PlatformRef_;
            }(PlatformRef);
            PlatformRef_.decorators = [ {
                type: Injectable
            } ];
            PlatformRef_.ctorParameters = function() {
                return [ {
                    type: Injector
                } ];
            };
            var ApplicationRef = function() {
                function ApplicationRef() {}
                ApplicationRef.prototype.bootstrap = function(componentFactory, rootSelectorOrNode) {};
                ApplicationRef.prototype.tick = function() {};
                ApplicationRef.prototype.componentTypes = function() {};
                ApplicationRef.prototype.components = function() {};
                ApplicationRef.prototype.attachView = function(view) {};
                ApplicationRef.prototype.detachView = function(view) {};
                ApplicationRef.prototype.viewCount = function() {};
                ApplicationRef.prototype.isStable = function() {};
                return ApplicationRef;
            }();
            var ApplicationRef_ = function(_super) {
                __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](ApplicationRef_, _super);
                function ApplicationRef_(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus) {
                    var _this = _super.call(this) || this;
                    _this._zone = _zone;
                    _this._console = _console;
                    _this._injector = _injector;
                    _this._exceptionHandler = _exceptionHandler;
                    _this._componentFactoryResolver = _componentFactoryResolver;
                    _this._initStatus = _initStatus;
                    _this._bootstrapListeners = [];
                    _this._rootComponents = [];
                    _this._rootComponentTypes = [];
                    _this._views = [];
                    _this._runningTick = false;
                    _this._enforceNoNewChanges = false;
                    _this._stable = true;
                    _this._enforceNoNewChanges = isDevMode();
                    _this._zone.onMicrotaskEmpty.subscribe({
                        next: function() {
                            _this._zone.run(function() {
                                _this.tick();
                            });
                        }
                    });
                    var isCurrentlyStable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function(observer) {
                        _this._stable = _this._zone.isStable && !_this._zone.hasPendingMacrotasks && !_this._zone.hasPendingMicrotasks;
                        _this._zone.runOutsideAngular(function() {
                            observer.next(_this._stable);
                            observer.complete();
                        });
                    });
                    var isStable = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function(observer) {
                        var stableSub;
                        _this._zone.runOutsideAngular(function() {
                            stableSub = _this._zone.onStable.subscribe(function() {
                                NgZone.assertNotInAngularZone();
                                scheduleMicroTask(function() {
                                    if (!_this._stable && !_this._zone.hasPendingMacrotasks && !_this._zone.hasPendingMicrotasks) {
                                        _this._stable = true;
                                        observer.next(true);
                                    }
                                });
                            });
                        });
                        var unstableSub = _this._zone.onUnstable.subscribe(function() {
                            NgZone.assertInAngularZone();
                            if (_this._stable) {
                                _this._stable = false;
                                _this._zone.runOutsideAngular(function() {
                                    observer.next(false);
                                });
                            }
                        });
                        return function() {
                            stableSub.unsubscribe();
                            unstableSub.unsubscribe();
                        };
                    });
                    _this._isStable = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_merge__["merge"])(isCurrentlyStable, __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_share__["share"].call(isStable));
                    return _this;
                }
                ApplicationRef_.prototype.attachView = function(viewRef) {
                    var view = viewRef;
                    this._views.push(view);
                    view.attachToAppRef(this);
                };
                ApplicationRef_.prototype.detachView = function(viewRef) {
                    var view = viewRef;
                    remove(this._views, view);
                    view.detachFromAppRef();
                };
                ApplicationRef_.prototype.bootstrap = function(componentOrFactory, rootSelectorOrNode) {
                    var _this = this;
                    if (!this._initStatus.done) {
                        throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                    }
                    var componentFactory;
                    if (componentOrFactory instanceof ComponentFactory) {
                        componentFactory = componentOrFactory;
                    } else {
                        componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
                    }
                    this._rootComponentTypes.push(componentFactory.componentType);
                    var ngModule = componentFactory instanceof ComponentFactoryBoundToModule ? null : this._injector.get(NgModuleRef);
                    var selectorOrNode = rootSelectorOrNode || componentFactory.selector;
                    var compRef = componentFactory.create(Injector.NULL, [], selectorOrNode, ngModule);
                    compRef.onDestroy(function() {
                        _this._unloadComponent(compRef);
                    });
                    var testability = compRef.injector.get(Testability, null);
                    if (testability) {
                        compRef.injector.get(TestabilityRegistry).registerApplication(compRef.location.nativeElement, testability);
                    }
                    this._loadComponent(compRef);
                    if (isDevMode()) {
                        this._console.log("Angular is running in the development mode. Call enableProdMode() to enable the production mode.");
                    }
                    return compRef;
                };
                ApplicationRef_.prototype._loadComponent = function(componentRef) {
                    this.attachView(componentRef.hostView);
                    this.tick();
                    this._rootComponents.push(componentRef);
                    var listeners = this._injector.get(APP_BOOTSTRAP_LISTENER, []).concat(this._bootstrapListeners);
                    listeners.forEach(function(listener) {
                        return listener(componentRef);
                    });
                };
                ApplicationRef_.prototype._unloadComponent = function(componentRef) {
                    this.detachView(componentRef.hostView);
                    remove(this._rootComponents, componentRef);
                };
                ApplicationRef_.prototype.tick = function() {
                    var _this = this;
                    if (this._runningTick) {
                        throw new Error("ApplicationRef.tick is called recursively");
                    }
                    var scope = ApplicationRef_._tickScope();
                    try {
                        this._runningTick = true;
                        this._views.forEach(function(view) {
                            return view.detectChanges();
                        });
                        if (this._enforceNoNewChanges) {
                            this._views.forEach(function(view) {
                                return view.checkNoChanges();
                            });
                        }
                    } catch (e) {
                        this._zone.runOutsideAngular(function() {
                            return _this._exceptionHandler.handleError(e);
                        });
                    } finally {
                        this._runningTick = false;
                        wtfLeave(scope);
                    }
                };
                ApplicationRef_.prototype.ngOnDestroy = function() {
                    this._views.slice().forEach(function(view) {
                        return view.destroy();
                    });
                };
                Object.defineProperty(ApplicationRef_.prototype, "viewCount", {
                    get: function() {
                        return this._views.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ApplicationRef_.prototype, "componentTypes", {
                    get: function() {
                        return this._rootComponentTypes;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ApplicationRef_.prototype, "components", {
                    get: function() {
                        return this._rootComponents;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ApplicationRef_.prototype, "isStable", {
                    get: function() {
                        return this._isStable;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ApplicationRef_;
            }(ApplicationRef);
            ApplicationRef_._tickScope = wtfCreateScope("ApplicationRef#tick()");
            ApplicationRef_.decorators = [ {
                type: Injectable
            } ];
            ApplicationRef_.ctorParameters = function() {
                return [ {
                    type: NgZone
                }, {
                    type: Console
                }, {
                    type: Injector
                }, {
                    type: ErrorHandler
                }, {
                    type: ComponentFactoryResolver
                }, {
                    type: ApplicationInitStatus
                } ];
            };
            function remove(list, el) {
                var index = list.indexOf(el);
                if (index > -1) {
                    list.splice(index, 1);
                }
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var RenderComponentType = function() {
                function RenderComponentType(id, templateUrl, slotCount, encapsulation, styles, animations) {
                    this.id = id;
                    this.templateUrl = templateUrl;
                    this.slotCount = slotCount;
                    this.encapsulation = encapsulation;
                    this.styles = styles;
                    this.animations = animations;
                }
                return RenderComponentType;
            }();
            var RenderDebugInfo = function() {
                function RenderDebugInfo() {}
                RenderDebugInfo.prototype.injector = function() {};
                RenderDebugInfo.prototype.component = function() {};
                RenderDebugInfo.prototype.providerTokens = function() {};
                RenderDebugInfo.prototype.references = function() {};
                RenderDebugInfo.prototype.context = function() {};
                RenderDebugInfo.prototype.source = function() {};
                return RenderDebugInfo;
            }();
            var Renderer = function() {
                function Renderer() {}
                Renderer.prototype.selectRootElement = function(selectorOrNode, debugInfo) {};
                Renderer.prototype.createElement = function(parentElement, name, debugInfo) {};
                Renderer.prototype.createViewRoot = function(hostElement) {};
                Renderer.prototype.createTemplateAnchor = function(parentElement, debugInfo) {};
                Renderer.prototype.createText = function(parentElement, value, debugInfo) {};
                Renderer.prototype.projectNodes = function(parentElement, nodes) {};
                Renderer.prototype.attachViewAfter = function(node, viewRootNodes) {};
                Renderer.prototype.detachView = function(viewRootNodes) {};
                Renderer.prototype.destroyView = function(hostElement, viewAllNodes) {};
                Renderer.prototype.listen = function(renderElement, name, callback) {};
                Renderer.prototype.listenGlobal = function(target, name, callback) {};
                Renderer.prototype.setElementProperty = function(renderElement, propertyName, propertyValue) {};
                Renderer.prototype.setElementAttribute = function(renderElement, attributeName, attributeValue) {};
                Renderer.prototype.setBindingDebugInfo = function(renderElement, propertyName, propertyValue) {};
                Renderer.prototype.setElementClass = function(renderElement, className, isAdd) {};
                Renderer.prototype.setElementStyle = function(renderElement, styleName, styleValue) {};
                Renderer.prototype.invokeElementMethod = function(renderElement, methodName, args) {};
                Renderer.prototype.setText = function(renderNode, text) {};
                Renderer.prototype.animate = function(element, startingStyles, keyframes, duration, delay, easing, previousPlayers) {};
                return Renderer;
            }();
            var Renderer2Interceptor = new InjectionToken("Renderer2Interceptor");
            var RootRenderer = function() {
                function RootRenderer() {}
                RootRenderer.prototype.renderComponent = function(componentType) {};
                return RootRenderer;
            }();
            var RendererFactory2 = function() {
                function RendererFactory2() {}
                RendererFactory2.prototype.createRenderer = function(hostElement, type) {};
                RendererFactory2.prototype.begin = function() {};
                RendererFactory2.prototype.end = function() {};
                RendererFactory2.prototype.whenRenderingDone = function() {};
                return RendererFactory2;
            }();
            var RendererStyleFlags2 = {};
            RendererStyleFlags2.Important = 1;
            RendererStyleFlags2.DashCase = 2;
            RendererStyleFlags2[RendererStyleFlags2.Important] = "Important";
            RendererStyleFlags2[RendererStyleFlags2.DashCase] = "DashCase";
            var Renderer2 = function() {
                function Renderer2() {}
                Renderer2.prototype.data = function() {};
                Renderer2.prototype.destroy = function() {};
                Renderer2.prototype.createElement = function(name, namespace) {};
                Renderer2.prototype.createComment = function(value) {};
                Renderer2.prototype.createText = function(value) {};
                Renderer2.prototype.appendChild = function(parent, newChild) {};
                Renderer2.prototype.insertBefore = function(parent, newChild, refChild) {};
                Renderer2.prototype.removeChild = function(parent, oldChild) {};
                Renderer2.prototype.selectRootElement = function(selectorOrNode) {};
                Renderer2.prototype.parentNode = function(node) {};
                Renderer2.prototype.nextSibling = function(node) {};
                Renderer2.prototype.setAttribute = function(el, name, value, namespace) {};
                Renderer2.prototype.removeAttribute = function(el, name, namespace) {};
                Renderer2.prototype.addClass = function(el, name) {};
                Renderer2.prototype.removeClass = function(el, name) {};
                Renderer2.prototype.setStyle = function(el, style, value, flags) {};
                Renderer2.prototype.removeStyle = function(el, style, flags) {};
                Renderer2.prototype.setProperty = function(el, name, value) {};
                Renderer2.prototype.setValue = function(node, value) {};
                Renderer2.prototype.listen = function(target, eventName, callback) {};
                return Renderer2;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var ElementRef = function() {
                function ElementRef(nativeElement) {
                    this.nativeElement = nativeElement;
                }
                return ElementRef;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var NgModuleFactoryLoader = function() {
                function NgModuleFactoryLoader() {}
                NgModuleFactoryLoader.prototype.load = function(path) {};
                return NgModuleFactoryLoader;
            }();
            var moduleFactories = new Map();
            function registerModuleFactory(id, factory) {
                var existing = moduleFactories.get(id);
                if (existing) {
                    throw new Error("Duplicate module registered for " + id + " - " + existing.moduleType.name + " vs " + factory.moduleType.name);
                }
                moduleFactories.set(id, factory);
            }
            function getModuleFactory(id) {
                var factory = moduleFactories.get(id);
                if (!factory) throw new Error("No module with ID " + id + " loaded");
                return factory;
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var QueryList = function() {
                function QueryList() {
                    this._dirty = true;
                    this._results = [];
                    this._emitter = new EventEmitter();
                }
                Object.defineProperty(QueryList.prototype, "changes", {
                    get: function() {
                        return this._emitter;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QueryList.prototype, "length", {
                    get: function() {
                        return this._results.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QueryList.prototype, "first", {
                    get: function() {
                        return this._results[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QueryList.prototype, "last", {
                    get: function() {
                        return this._results[this.length - 1];
                    },
                    enumerable: true,
                    configurable: true
                });
                QueryList.prototype.map = function(fn) {
                    return this._results.map(fn);
                };
                QueryList.prototype.filter = function(fn) {
                    return this._results.filter(fn);
                };
                QueryList.prototype.find = function(fn) {
                    return this._results.find(fn);
                };
                QueryList.prototype.reduce = function(fn, init) {
                    return this._results.reduce(fn, init);
                };
                QueryList.prototype.forEach = function(fn) {
                    this._results.forEach(fn);
                };
                QueryList.prototype.some = function(fn) {
                    return this._results.some(fn);
                };
                QueryList.prototype.toArray = function() {
                    return this._results.slice();
                };
                QueryList.prototype[getSymbolIterator()] = function() {
                    return this._results[getSymbolIterator()]();
                };
                QueryList.prototype.toString = function() {
                    return this._results.toString();
                };
                QueryList.prototype.reset = function(res) {
                    this._results = flatten(res);
                    this._dirty = false;
                };
                QueryList.prototype.notifyOnChanges = function() {
                    this._emitter.emit(this);
                };
                QueryList.prototype.setDirty = function() {
                    this._dirty = true;
                };
                Object.defineProperty(QueryList.prototype, "dirty", {
                    get: function() {
                        return this._dirty;
                    },
                    enumerable: true,
                    configurable: true
                });
                QueryList.prototype.destroy = function() {
                    this._emitter.complete();
                    this._emitter.unsubscribe();
                };
                return QueryList;
            }();
            function flatten(list) {
                return list.reduce(function(flat, item) {
                    var flatItem = Array.isArray(item) ? flatten(item) : item;
                    return flat.concat(flatItem);
                }, []);
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var _SEPARATOR = "#";
            var FACTORY_CLASS_SUFFIX = "NgFactory";
            var SystemJsNgModuleLoaderConfig = function() {
                function SystemJsNgModuleLoaderConfig() {}
                return SystemJsNgModuleLoaderConfig;
            }();
            var DEFAULT_CONFIG = {
                factoryPathPrefix: "",
                factoryPathSuffix: ".ngfactory"
            };
            var SystemJsNgModuleLoader = function() {
                function SystemJsNgModuleLoader(_compiler, config) {
                    this._compiler = _compiler;
                    this._config = config || DEFAULT_CONFIG;
                }
                SystemJsNgModuleLoader.prototype.load = function(path) {
                    var offlineMode = this._compiler instanceof Compiler;
                    return offlineMode ? this.loadFactory(path) : this.loadAndCompile(path);
                };
                SystemJsNgModuleLoader.prototype.loadAndCompile = function(path) {
                    var _this = this;
                    var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
                    if (exportName === undefined) {
                        exportName = "default";
                    }
                    return __webpack_require__("/fcW")(module).then(function(module) {
                        return module[exportName];
                    }).then(function(type) {
                        return checkNotEmpty(type, module, exportName);
                    }).then(function(type) {
                        return _this._compiler.compileModuleAsync(type);
                    });
                };
                SystemJsNgModuleLoader.prototype.loadFactory = function(path) {
                    var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
                    var factoryClassSuffix = FACTORY_CLASS_SUFFIX;
                    if (exportName === undefined) {
                        exportName = "default";
                        factoryClassSuffix = "";
                    }
                    return __webpack_require__("/fcW")(this._config.factoryPathPrefix + module + this._config.factoryPathSuffix).then(function(module) {
                        return module[exportName + factoryClassSuffix];
                    }).then(function(factory) {
                        return checkNotEmpty(factory, module, exportName);
                    });
                };
                return SystemJsNgModuleLoader;
            }();
            SystemJsNgModuleLoader.decorators = [ {
                type: Injectable
            } ];
            SystemJsNgModuleLoader.ctorParameters = function() {
                return [ {
                    type: Compiler
                }, {
                    type: SystemJsNgModuleLoaderConfig,
                    decorators: [ {
                        type: Optional
                    } ]
                } ];
            };
            function checkNotEmpty(value, modulePath, exportName) {
                if (!value) {
                    throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
                }
                return value;
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var TemplateRef = function() {
                function TemplateRef() {}
                TemplateRef.prototype.elementRef = function() {};
                TemplateRef.prototype.createEmbeddedView = function(context) {};
                return TemplateRef;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var ViewContainerRef = function() {
                function ViewContainerRef() {}
                ViewContainerRef.prototype.element = function() {};
                ViewContainerRef.prototype.injector = function() {};
                ViewContainerRef.prototype.parentInjector = function() {};
                ViewContainerRef.prototype.clear = function() {};
                ViewContainerRef.prototype.get = function(index) {};
                ViewContainerRef.prototype.length = function() {};
                ViewContainerRef.prototype.createEmbeddedView = function(templateRef, context, index) {};
                ViewContainerRef.prototype.createComponent = function(componentFactory, index, injector, projectableNodes, ngModule) {};
                ViewContainerRef.prototype.insert = function(viewRef, index) {};
                ViewContainerRef.prototype.move = function(viewRef, currentIndex) {};
                ViewContainerRef.prototype.indexOf = function(viewRef) {};
                ViewContainerRef.prototype.remove = function(index) {};
                ViewContainerRef.prototype.detach = function(index) {};
                return ViewContainerRef;
            }();
            var ChangeDetectorRef = function() {
                function ChangeDetectorRef() {}
                ChangeDetectorRef.prototype.markForCheck = function() {};
                ChangeDetectorRef.prototype.detach = function() {};
                ChangeDetectorRef.prototype.detectChanges = function() {};
                ChangeDetectorRef.prototype.checkNoChanges = function() {};
                ChangeDetectorRef.prototype.reattach = function() {};
                return ChangeDetectorRef;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var ViewRef = function(_super) {
                __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](ViewRef, _super);
                function ViewRef() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ViewRef.prototype.destroy = function() {};
                ViewRef.prototype.destroyed = function() {};
                ViewRef.prototype.onDestroy = function(callback) {};
                return ViewRef;
            }(ChangeDetectorRef);
            var EmbeddedViewRef = function(_super) {
                __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](EmbeddedViewRef, _super);
                function EmbeddedViewRef() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                EmbeddedViewRef.prototype.context = function() {};
                EmbeddedViewRef.prototype.rootNodes = function() {};
                return EmbeddedViewRef;
            }(ViewRef);
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var EventListener = function() {
                function EventListener(name, callback) {
                    this.name = name;
                    this.callback = callback;
                }
                return EventListener;
            }();
            var DebugNode = function() {
                function DebugNode(nativeNode, parent, _debugContext) {
                    this._debugContext = _debugContext;
                    this.nativeNode = nativeNode;
                    if (parent && parent instanceof DebugElement) {
                        parent.addChild(this);
                    } else {
                        this.parent = null;
                    }
                    this.listeners = [];
                }
                Object.defineProperty(DebugNode.prototype, "injector", {
                    get: function() {
                        return this._debugContext.injector;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugNode.prototype, "componentInstance", {
                    get: function() {
                        return this._debugContext.component;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugNode.prototype, "context", {
                    get: function() {
                        return this._debugContext.context;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugNode.prototype, "references", {
                    get: function() {
                        return this._debugContext.references;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugNode.prototype, "providerTokens", {
                    get: function() {
                        return this._debugContext.providerTokens;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugNode.prototype, "source", {
                    get: function() {
                        return "Deprecated since v4";
                    },
                    enumerable: true,
                    configurable: true
                });
                return DebugNode;
            }();
            var DebugElement = function(_super) {
                __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](DebugElement, _super);
                function DebugElement(nativeNode, parent, _debugContext) {
                    var _this = _super.call(this, nativeNode, parent, _debugContext) || this;
                    _this.properties = {};
                    _this.attributes = {};
                    _this.classes = {};
                    _this.styles = {};
                    _this.childNodes = [];
                    _this.nativeElement = nativeNode;
                    return _this;
                }
                DebugElement.prototype.addChild = function(child) {
                    if (child) {
                        this.childNodes.push(child);
                        child.parent = this;
                    }
                };
                DebugElement.prototype.removeChild = function(child) {
                    var childIndex = this.childNodes.indexOf(child);
                    if (childIndex !== -1) {
                        child.parent = null;
                        this.childNodes.splice(childIndex, 1);
                    }
                };
                DebugElement.prototype.insertChildrenAfter = function(child, newChildren) {
                    var _this = this;
                    var siblingIndex = this.childNodes.indexOf(child);
                    if (siblingIndex !== -1) {
                        (_a = this.childNodes).splice.apply(_a, [ siblingIndex + 1, 0 ].concat(newChildren));
                        newChildren.forEach(function(c) {
                            if (c.parent) {
                                c.parent.removeChild(c);
                            }
                            c.parent = _this;
                        });
                    }
                    var _a;
                };
                DebugElement.prototype.insertBefore = function(refChild, newChild) {
                    var refIndex = this.childNodes.indexOf(refChild);
                    if (refIndex === -1) {
                        this.addChild(newChild);
                    } else {
                        if (newChild.parent) {
                            newChild.parent.removeChild(newChild);
                        }
                        newChild.parent = this;
                        this.childNodes.splice(refIndex, 0, newChild);
                    }
                };
                DebugElement.prototype.query = function(predicate) {
                    var results = this.queryAll(predicate);
                    return results[0] || null;
                };
                DebugElement.prototype.queryAll = function(predicate) {
                    var matches = [];
                    _queryElementChildren(this, predicate, matches);
                    return matches;
                };
                DebugElement.prototype.queryAllNodes = function(predicate) {
                    var matches = [];
                    _queryNodeChildren(this, predicate, matches);
                    return matches;
                };
                Object.defineProperty(DebugElement.prototype, "children", {
                    get: function() {
                        return this.childNodes.filter(function(node) {
                            return node instanceof DebugElement;
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                DebugElement.prototype.triggerEventHandler = function(eventName, eventObj) {
                    this.listeners.forEach(function(listener) {
                        if (listener.name == eventName) {
                            listener.callback(eventObj);
                        }
                    });
                };
                return DebugElement;
            }(DebugNode);
            function asNativeElements(debugEls) {
                return debugEls.map(function(el) {
                    return el.nativeElement;
                });
            }
            function _queryElementChildren(element, predicate, matches) {
                element.childNodes.forEach(function(node) {
                    if (node instanceof DebugElement) {
                        if (predicate(node)) {
                            matches.push(node);
                        }
                        _queryElementChildren(node, predicate, matches);
                    }
                });
            }
            function _queryNodeChildren(parentNode, predicate, matches) {
                if (parentNode instanceof DebugElement) {
                    parentNode.childNodes.forEach(function(node) {
                        if (predicate(node)) {
                            matches.push(node);
                        }
                        if (node instanceof DebugElement) {
                            _queryNodeChildren(node, predicate, matches);
                        }
                    });
                }
            }
            var _nativeNodeToDebugNode = new Map();
            function getDebugNode(nativeNode) {
                return _nativeNodeToDebugNode.get(nativeNode) || null;
            }
            function indexDebugNode(node) {
                _nativeNodeToDebugNode.set(node.nativeNode, node);
            }
            function removeDebugNodeFromIndex(node) {
                _nativeNodeToDebugNode.delete(node.nativeNode);
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function devModeEqual(a, b) {
                var isListLikeIterableA = isListLikeIterable(a);
                var isListLikeIterableB = isListLikeIterable(b);
                if (isListLikeIterableA && isListLikeIterableB) {
                    return areIterablesEqual(a, b, devModeEqual);
                } else {
                    var isAObject = a && (typeof a === "object" || typeof a === "function");
                    var isBObject = b && (typeof b === "object" || typeof b === "function");
                    if (!isListLikeIterableA && isAObject && !isListLikeIterableB && isBObject) {
                        return true;
                    } else {
                        return looseIdentical(a, b);
                    }
                }
            }
            var WrappedValue = function() {
                function WrappedValue(wrapped) {
                    this.wrapped = wrapped;
                }
                WrappedValue.wrap = function(value) {
                    return new WrappedValue(value);
                };
                return WrappedValue;
            }();
            var ValueUnwrapper = function() {
                function ValueUnwrapper() {
                    this.hasWrappedValue = false;
                }
                ValueUnwrapper.prototype.unwrap = function(value) {
                    if (value instanceof WrappedValue) {
                        this.hasWrappedValue = true;
                        return value.wrapped;
                    }
                    return value;
                };
                ValueUnwrapper.prototype.reset = function() {
                    this.hasWrappedValue = false;
                };
                return ValueUnwrapper;
            }();
            var SimpleChange = function() {
                function SimpleChange(previousValue, currentValue, firstChange) {
                    this.previousValue = previousValue;
                    this.currentValue = currentValue;
                    this.firstChange = firstChange;
                }
                SimpleChange.prototype.isFirstChange = function() {
                    return this.firstChange;
                };
                return SimpleChange;
            }();
            function isListLikeIterable(obj) {
                if (!isJsObject(obj)) return false;
                return Array.isArray(obj) || !(obj instanceof Map) && getSymbolIterator() in obj;
            }
            function areIterablesEqual(a, b, comparator) {
                var iterator1 = a[getSymbolIterator()]();
                var iterator2 = b[getSymbolIterator()]();
                while (true) {
                    var item1 = iterator1.next();
                    var item2 = iterator2.next();
                    if (item1.done && item2.done) return true;
                    if (item1.done || item2.done) return false;
                    if (!comparator(item1.value, item2.value)) return false;
                }
            }
            function iterateListLike(obj, fn) {
                if (Array.isArray(obj)) {
                    for (var i = 0; i < obj.length; i++) {
                        fn(obj[i]);
                    }
                } else {
                    var iterator = obj[getSymbolIterator()]();
                    var item = void 0;
                    while (!(item = iterator.next()).done) {
                        fn(item.value);
                    }
                }
            }
            function isJsObject(o) {
                return o !== null && (typeof o === "function" || typeof o === "object");
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var DefaultIterableDifferFactory = function() {
                function DefaultIterableDifferFactory() {}
                DefaultIterableDifferFactory.prototype.supports = function(obj) {
                    return isListLikeIterable(obj);
                };
                DefaultIterableDifferFactory.prototype.create = function(cdRefOrTrackBy, trackByFn) {
                    return new DefaultIterableDiffer(trackByFn || cdRefOrTrackBy);
                };
                return DefaultIterableDifferFactory;
            }();
            var trackByIdentity = function(index, item) {
                return item;
            };
            var DefaultIterableDiffer = function() {
                function DefaultIterableDiffer(trackByFn) {
                    this._length = 0;
                    this._collection = null;
                    this._linkedRecords = null;
                    this._unlinkedRecords = null;
                    this._previousItHead = null;
                    this._itHead = null;
                    this._itTail = null;
                    this._additionsHead = null;
                    this._additionsTail = null;
                    this._movesHead = null;
                    this._movesTail = null;
                    this._removalsHead = null;
                    this._removalsTail = null;
                    this._identityChangesHead = null;
                    this._identityChangesTail = null;
                    this._trackByFn = trackByFn || trackByIdentity;
                }
                Object.defineProperty(DefaultIterableDiffer.prototype, "collection", {
                    get: function() {
                        return this._collection;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DefaultIterableDiffer.prototype, "length", {
                    get: function() {
                        return this._length;
                    },
                    enumerable: true,
                    configurable: true
                });
                DefaultIterableDiffer.prototype.forEachItem = function(fn) {
                    var record;
                    for (record = this._itHead; record !== null; record = record._next) {
                        fn(record);
                    }
                };
                DefaultIterableDiffer.prototype.forEachOperation = function(fn) {
                    var nextIt = this._itHead;
                    var nextRemove = this._removalsHead;
                    var addRemoveOffset = 0;
                    var moveOffsets = null;
                    while (nextIt || nextRemove) {
                        var record = !nextRemove || nextIt && nextIt.currentIndex < getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ? nextIt : nextRemove;
                        var adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets);
                        var currentIndex = record.currentIndex;
                        if (record === nextRemove) {
                            addRemoveOffset--;
                            nextRemove = nextRemove._nextRemoved;
                        } else {
                            nextIt = nextIt._next;
                            if (record.previousIndex == null) {
                                addRemoveOffset++;
                            } else {
                                if (!moveOffsets) moveOffsets = [];
                                var localMovePreviousIndex = adjPreviousIndex - addRemoveOffset;
                                var localCurrentIndex = currentIndex - addRemoveOffset;
                                if (localMovePreviousIndex != localCurrentIndex) {
                                    for (var i = 0; i < localMovePreviousIndex; i++) {
                                        var offset = i < moveOffsets.length ? moveOffsets[i] : moveOffsets[i] = 0;
                                        var index = offset + i;
                                        if (localCurrentIndex <= index && index < localMovePreviousIndex) {
                                            moveOffsets[i] = offset + 1;
                                        }
                                    }
                                    var previousIndex = record.previousIndex;
                                    moveOffsets[previousIndex] = localCurrentIndex - localMovePreviousIndex;
                                }
                            }
                        }
                        if (adjPreviousIndex !== currentIndex) {
                            fn(record, adjPreviousIndex, currentIndex);
                        }
                    }
                };
                DefaultIterableDiffer.prototype.forEachPreviousItem = function(fn) {
                    var record;
                    for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
                        fn(record);
                    }
                };
                DefaultIterableDiffer.prototype.forEachAddedItem = function(fn) {
                    var record;
                    for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                        fn(record);
                    }
                };
                DefaultIterableDiffer.prototype.forEachMovedItem = function(fn) {
                    var record;
                    for (record = this._movesHead; record !== null; record = record._nextMoved) {
                        fn(record);
                    }
                };
                DefaultIterableDiffer.prototype.forEachRemovedItem = function(fn) {
                    var record;
                    for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
                        fn(record);
                    }
                };
                DefaultIterableDiffer.prototype.forEachIdentityChange = function(fn) {
                    var record;
                    for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
                        fn(record);
                    }
                };
                DefaultIterableDiffer.prototype.diff = function(collection) {
                    if (collection == null) collection = [];
                    if (!isListLikeIterable(collection)) {
                        throw new Error("Error trying to diff '" + stringify(collection) + "'. Only arrays and iterables are allowed");
                    }
                    if (this.check(collection)) {
                        return this;
                    } else {
                        return null;
                    }
                };
                DefaultIterableDiffer.prototype.onDestroy = function() {};
                DefaultIterableDiffer.prototype.check = function(collection) {
                    var _this = this;
                    this._reset();
                    var record = this._itHead;
                    var mayBeDirty = false;
                    var index;
                    var item;
                    var itemTrackBy;
                    if (Array.isArray(collection)) {
                        this._length = collection.length;
                        for (var index_1 = 0; index_1 < this._length; index_1++) {
                            item = collection[index_1];
                            itemTrackBy = this._trackByFn(index_1, item);
                            if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
                                record = this._mismatch(record, item, itemTrackBy, index_1);
                                mayBeDirty = true;
                            } else {
                                if (mayBeDirty) {
                                    record = this._verifyReinsertion(record, item, itemTrackBy, index_1);
                                }
                                if (!looseIdentical(record.item, item)) this._addIdentityChange(record, item);
                            }
                            record = record._next;
                        }
                    } else {
                        index = 0;
                        iterateListLike(collection, function(item) {
                            itemTrackBy = _this._trackByFn(index, item);
                            if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
                                record = _this._mismatch(record, item, itemTrackBy, index);
                                mayBeDirty = true;
                            } else {
                                if (mayBeDirty) {
                                    record = _this._verifyReinsertion(record, item, itemTrackBy, index);
                                }
                                if (!looseIdentical(record.item, item)) _this._addIdentityChange(record, item);
                            }
                            record = record._next;
                            index++;
                        });
                        this._length = index;
                    }
                    this._truncate(record);
                    this._collection = collection;
                    return this.isDirty;
                };
                Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
                    get: function() {
                        return this._additionsHead !== null || this._movesHead !== null || this._removalsHead !== null || this._identityChangesHead !== null;
                    },
                    enumerable: true,
                    configurable: true
                });
                DefaultIterableDiffer.prototype._reset = function() {
                    if (this.isDirty) {
                        var record = void 0;
                        var nextRecord = void 0;
                        for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
                            record._nextPrevious = record._next;
                        }
                        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                            record.previousIndex = record.currentIndex;
                        }
                        this._additionsHead = this._additionsTail = null;
                        for (record = this._movesHead; record !== null; record = nextRecord) {
                            record.previousIndex = record.currentIndex;
                            nextRecord = record._nextMoved;
                        }
                        this._movesHead = this._movesTail = null;
                        this._removalsHead = this._removalsTail = null;
                        this._identityChangesHead = this._identityChangesTail = null;
                    }
                };
                DefaultIterableDiffer.prototype._mismatch = function(record, item, itemTrackBy, index) {
                    var previousRecord;
                    if (record === null) {
                        previousRecord = this._itTail;
                    } else {
                        previousRecord = record._prev;
                        this._remove(record);
                    }
                    record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
                    if (record !== null) {
                        if (!looseIdentical(record.item, item)) this._addIdentityChange(record, item);
                        this._moveAfter(record, previousRecord, index);
                    } else {
                        record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
                        if (record !== null) {
                            if (!looseIdentical(record.item, item)) this._addIdentityChange(record, item);
                            this._reinsertAfter(record, previousRecord, index);
                        } else {
                            record = this._addAfter(new IterableChangeRecord_(item, itemTrackBy), previousRecord, index);
                        }
                    }
                    return record;
                };
                DefaultIterableDiffer.prototype._verifyReinsertion = function(record, item, itemTrackBy, index) {
                    var reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
                    if (reinsertRecord !== null) {
                        record = this._reinsertAfter(reinsertRecord, record._prev, index);
                    } else if (record.currentIndex != index) {
                        record.currentIndex = index;
                        this._addToMoves(record, index);
                    }
                    return record;
                };
                DefaultIterableDiffer.prototype._truncate = function(record) {
                    while (record !== null) {
                        var nextRecord = record._next;
                        this._addToRemovals(this._unlink(record));
                        record = nextRecord;
                    }
                    if (this._unlinkedRecords !== null) {
                        this._unlinkedRecords.clear();
                    }
                    if (this._additionsTail !== null) {
                        this._additionsTail._nextAdded = null;
                    }
                    if (this._movesTail !== null) {
                        this._movesTail._nextMoved = null;
                    }
                    if (this._itTail !== null) {
                        this._itTail._next = null;
                    }
                    if (this._removalsTail !== null) {
                        this._removalsTail._nextRemoved = null;
                    }
                    if (this._identityChangesTail !== null) {
                        this._identityChangesTail._nextIdentityChange = null;
                    }
                };
                DefaultIterableDiffer.prototype._reinsertAfter = function(record, prevRecord, index) {
                    if (this._unlinkedRecords !== null) {
                        this._unlinkedRecords.remove(record);
                    }
                    var prev = record._prevRemoved;
                    var next = record._nextRemoved;
                    if (prev === null) {
                        this._removalsHead = next;
                    } else {
                        prev._nextRemoved = next;
                    }
                    if (next === null) {
                        this._removalsTail = prev;
                    } else {
                        next._prevRemoved = prev;
                    }
                    this._insertAfter(record, prevRecord, index);
                    this._addToMoves(record, index);
                    return record;
                };
                DefaultIterableDiffer.prototype._moveAfter = function(record, prevRecord, index) {
                    this._unlink(record);
                    this._insertAfter(record, prevRecord, index);
                    this._addToMoves(record, index);
                    return record;
                };
                DefaultIterableDiffer.prototype._addAfter = function(record, prevRecord, index) {
                    this._insertAfter(record, prevRecord, index);
                    if (this._additionsTail === null) {
                        this._additionsTail = this._additionsHead = record;
                    } else {
                        this._additionsTail = this._additionsTail._nextAdded = record;
                    }
                    return record;
                };
                DefaultIterableDiffer.prototype._insertAfter = function(record, prevRecord, index) {
                    var next = prevRecord === null ? this._itHead : prevRecord._next;
                    record._next = next;
                    record._prev = prevRecord;
                    if (next === null) {
                        this._itTail = record;
                    } else {
                        next._prev = record;
                    }
                    if (prevRecord === null) {
                        this._itHead = record;
                    } else {
                        prevRecord._next = record;
                    }
                    if (this._linkedRecords === null) {
                        this._linkedRecords = new _DuplicateMap();
                    }
                    this._linkedRecords.put(record);
                    record.currentIndex = index;
                    return record;
                };
                DefaultIterableDiffer.prototype._remove = function(record) {
                    return this._addToRemovals(this._unlink(record));
                };
                DefaultIterableDiffer.prototype._unlink = function(record) {
                    if (this._linkedRecords !== null) {
                        this._linkedRecords.remove(record);
                    }
                    var prev = record._prev;
                    var next = record._next;
                    if (prev === null) {
                        this._itHead = next;
                    } else {
                        prev._next = next;
                    }
                    if (next === null) {
                        this._itTail = prev;
                    } else {
                        next._prev = prev;
                    }
                    return record;
                };
                DefaultIterableDiffer.prototype._addToMoves = function(record, toIndex) {
                    if (record.previousIndex === toIndex) {
                        return record;
                    }
                    if (this._movesTail === null) {
                        this._movesTail = this._movesHead = record;
                    } else {
                        this._movesTail = this._movesTail._nextMoved = record;
                    }
                    return record;
                };
                DefaultIterableDiffer.prototype._addToRemovals = function(record) {
                    if (this._unlinkedRecords === null) {
                        this._unlinkedRecords = new _DuplicateMap();
                    }
                    this._unlinkedRecords.put(record);
                    record.currentIndex = null;
                    record._nextRemoved = null;
                    if (this._removalsTail === null) {
                        this._removalsTail = this._removalsHead = record;
                        record._prevRemoved = null;
                    } else {
                        record._prevRemoved = this._removalsTail;
                        this._removalsTail = this._removalsTail._nextRemoved = record;
                    }
                    return record;
                };
                DefaultIterableDiffer.prototype._addIdentityChange = function(record, item) {
                    record.item = item;
                    if (this._identityChangesTail === null) {
                        this._identityChangesTail = this._identityChangesHead = record;
                    } else {
                        this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
                    }
                    return record;
                };
                DefaultIterableDiffer.prototype.toString = function() {
                    var list = [];
                    this.forEachItem(function(record) {
                        return list.push(record);
                    });
                    var previous = [];
                    this.forEachPreviousItem(function(record) {
                        return previous.push(record);
                    });
                    var additions = [];
                    this.forEachAddedItem(function(record) {
                        return additions.push(record);
                    });
                    var moves = [];
                    this.forEachMovedItem(function(record) {
                        return moves.push(record);
                    });
                    var removals = [];
                    this.forEachRemovedItem(function(record) {
                        return removals.push(record);
                    });
                    var identityChanges = [];
                    this.forEachIdentityChange(function(record) {
                        return identityChanges.push(record);
                    });
                    return "collection: " + list.join(", ") + "\n" + "previous: " + previous.join(", ") + "\n" + "additions: " + additions.join(", ") + "\n" + "moves: " + moves.join(", ") + "\n" + "removals: " + removals.join(", ") + "\n" + "identityChanges: " + identityChanges.join(", ") + "\n";
                };
                return DefaultIterableDiffer;
            }();
            var IterableChangeRecord_ = function() {
                function IterableChangeRecord_(item, trackById) {
                    this.item = item;
                    this.trackById = trackById;
                    this.currentIndex = null;
                    this.previousIndex = null;
                    this._nextPrevious = null;
                    this._prev = null;
                    this._next = null;
                    this._prevDup = null;
                    this._nextDup = null;
                    this._prevRemoved = null;
                    this._nextRemoved = null;
                    this._nextAdded = null;
                    this._nextMoved = null;
                    this._nextIdentityChange = null;
                }
                IterableChangeRecord_.prototype.toString = function() {
                    return this.previousIndex === this.currentIndex ? stringify(this.item) : stringify(this.item) + "[" + stringify(this.previousIndex) + "->" + stringify(this.currentIndex) + "]";
                };
                return IterableChangeRecord_;
            }();
            var _DuplicateItemRecordList = function() {
                function _DuplicateItemRecordList() {
                    this._head = null;
                    this._tail = null;
                }
                _DuplicateItemRecordList.prototype.add = function(record) {
                    if (this._head === null) {
                        this._head = this._tail = record;
                        record._nextDup = null;
                        record._prevDup = null;
                    } else {
                        this._tail._nextDup = record;
                        record._prevDup = this._tail;
                        record._nextDup = null;
                        this._tail = record;
                    }
                };
                _DuplicateItemRecordList.prototype.get = function(trackById, atOrAfterIndex) {
                    var record;
                    for (record = this._head; record !== null; record = record._nextDup) {
                        if ((atOrAfterIndex === null || atOrAfterIndex <= record.currentIndex) && looseIdentical(record.trackById, trackById)) {
                            return record;
                        }
                    }
                    return null;
                };
                _DuplicateItemRecordList.prototype.remove = function(record) {
                    var prev = record._prevDup;
                    var next = record._nextDup;
                    if (prev === null) {
                        this._head = next;
                    } else {
                        prev._nextDup = next;
                    }
                    if (next === null) {
                        this._tail = prev;
                    } else {
                        next._prevDup = prev;
                    }
                    return this._head === null;
                };
                return _DuplicateItemRecordList;
            }();
            var _DuplicateMap = function() {
                function _DuplicateMap() {
                    this.map = new Map();
                }
                _DuplicateMap.prototype.put = function(record) {
                    var key = record.trackById;
                    var duplicates = this.map.get(key);
                    if (!duplicates) {
                        duplicates = new _DuplicateItemRecordList();
                        this.map.set(key, duplicates);
                    }
                    duplicates.add(record);
                };
                _DuplicateMap.prototype.get = function(trackById, atOrAfterIndex) {
                    var key = trackById;
                    var recordList = this.map.get(key);
                    return recordList ? recordList.get(trackById, atOrAfterIndex) : null;
                };
                _DuplicateMap.prototype.remove = function(record) {
                    var key = record.trackById;
                    var recordList = this.map.get(key);
                    if (recordList.remove(record)) {
                        this.map.delete(key);
                    }
                    return record;
                };
                Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
                    get: function() {
                        return this.map.size === 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                _DuplicateMap.prototype.clear = function() {
                    this.map.clear();
                };
                _DuplicateMap.prototype.toString = function() {
                    return "_DuplicateMap(" + stringify(this.map) + ")";
                };
                return _DuplicateMap;
            }();
            function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
                var previousIndex = item.previousIndex;
                if (previousIndex === null) return previousIndex;
                var moveOffset = 0;
                if (moveOffsets && previousIndex < moveOffsets.length) {
                    moveOffset = moveOffsets[previousIndex];
                }
                return previousIndex + addRemoveOffset + moveOffset;
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var DefaultKeyValueDifferFactory = function() {
                function DefaultKeyValueDifferFactory() {}
                DefaultKeyValueDifferFactory.prototype.supports = function(obj) {
                    return obj instanceof Map || isJsObject(obj);
                };
                DefaultKeyValueDifferFactory.prototype.create = function(cd) {
                    return new DefaultKeyValueDiffer();
                };
                return DefaultKeyValueDifferFactory;
            }();
            var DefaultKeyValueDiffer = function() {
                function DefaultKeyValueDiffer() {
                    this._records = new Map();
                    this._mapHead = null;
                    this._appendAfter = null;
                    this._previousMapHead = null;
                    this._changesHead = null;
                    this._changesTail = null;
                    this._additionsHead = null;
                    this._additionsTail = null;
                    this._removalsHead = null;
                    this._removalsTail = null;
                }
                Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
                    get: function() {
                        return this._additionsHead !== null || this._changesHead !== null || this._removalsHead !== null;
                    },
                    enumerable: true,
                    configurable: true
                });
                DefaultKeyValueDiffer.prototype.forEachItem = function(fn) {
                    var record;
                    for (record = this._mapHead; record !== null; record = record._next) {
                        fn(record);
                    }
                };
                DefaultKeyValueDiffer.prototype.forEachPreviousItem = function(fn) {
                    var record;
                    for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
                        fn(record);
                    }
                };
                DefaultKeyValueDiffer.prototype.forEachChangedItem = function(fn) {
                    var record;
                    for (record = this._changesHead; record !== null; record = record._nextChanged) {
                        fn(record);
                    }
                };
                DefaultKeyValueDiffer.prototype.forEachAddedItem = function(fn) {
                    var record;
                    for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                        fn(record);
                    }
                };
                DefaultKeyValueDiffer.prototype.forEachRemovedItem = function(fn) {
                    var record;
                    for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
                        fn(record);
                    }
                };
                DefaultKeyValueDiffer.prototype.diff = function(map) {
                    if (!map) {
                        map = new Map();
                    } else if (!(map instanceof Map || isJsObject(map))) {
                        throw new Error("Error trying to diff '" + stringify(map) + "'. Only maps and objects are allowed");
                    }
                    return this.check(map) ? this : null;
                };
                DefaultKeyValueDiffer.prototype.onDestroy = function() {};
                DefaultKeyValueDiffer.prototype.check = function(map) {
                    var _this = this;
                    this._reset();
                    var insertBefore = this._mapHead;
                    this._appendAfter = null;
                    this._forEach(map, function(value, key) {
                        if (insertBefore && insertBefore.key === key) {
                            _this._maybeAddToChanges(insertBefore, value);
                            _this._appendAfter = insertBefore;
                            insertBefore = insertBefore._next;
                        } else {
                            var record = _this._getOrCreateRecordForKey(key, value);
                            insertBefore = _this._insertBeforeOrAppend(insertBefore, record);
                        }
                    });
                    if (insertBefore) {
                        if (insertBefore._prev) {
                            insertBefore._prev._next = null;
                        }
                        this._removalsHead = insertBefore;
                        for (var record = insertBefore; record !== null; record = record._nextRemoved) {
                            if (record === this._mapHead) {
                                this._mapHead = null;
                            }
                            this._records.delete(record.key);
                            record._nextRemoved = record._next;
                            record.previousValue = record.currentValue;
                            record.currentValue = null;
                            record._prev = null;
                            record._next = null;
                        }
                    }
                    if (this._changesTail) this._changesTail._nextChanged = null;
                    if (this._additionsTail) this._additionsTail._nextAdded = null;
                    return this.isDirty;
                };
                DefaultKeyValueDiffer.prototype._insertBeforeOrAppend = function(before, record) {
                    if (before) {
                        var prev = before._prev;
                        record._next = before;
                        record._prev = prev;
                        before._prev = record;
                        if (prev) {
                            prev._next = record;
                        }
                        if (before === this._mapHead) {
                            this._mapHead = record;
                        }
                        this._appendAfter = before;
                        return before;
                    }
                    if (this._appendAfter) {
                        this._appendAfter._next = record;
                        record._prev = this._appendAfter;
                    } else {
                        this._mapHead = record;
                    }
                    this._appendAfter = record;
                    return null;
                };
                DefaultKeyValueDiffer.prototype._getOrCreateRecordForKey = function(key, value) {
                    if (this._records.has(key)) {
                        var record_1 = this._records.get(key);
                        this._maybeAddToChanges(record_1, value);
                        var prev = record_1._prev;
                        var next = record_1._next;
                        if (prev) {
                            prev._next = next;
                        }
                        if (next) {
                            next._prev = prev;
                        }
                        record_1._next = null;
                        record_1._prev = null;
                        return record_1;
                    }
                    var record = new KeyValueChangeRecord_(key);
                    this._records.set(key, record);
                    record.currentValue = value;
                    this._addToAdditions(record);
                    return record;
                };
                DefaultKeyValueDiffer.prototype._reset = function() {
                    if (this.isDirty) {
                        var record = void 0;
                        this._previousMapHead = this._mapHead;
                        for (record = this._previousMapHead; record !== null; record = record._next) {
                            record._nextPrevious = record._next;
                        }
                        for (record = this._changesHead; record !== null; record = record._nextChanged) {
                            record.previousValue = record.currentValue;
                        }
                        for (record = this._additionsHead; record != null; record = record._nextAdded) {
                            record.previousValue = record.currentValue;
                        }
                        this._changesHead = this._changesTail = null;
                        this._additionsHead = this._additionsTail = null;
                        this._removalsHead = null;
                    }
                };
                DefaultKeyValueDiffer.prototype._maybeAddToChanges = function(record, newValue) {
                    if (!looseIdentical(newValue, record.currentValue)) {
                        record.previousValue = record.currentValue;
                        record.currentValue = newValue;
                        this._addToChanges(record);
                    }
                };
                DefaultKeyValueDiffer.prototype._addToAdditions = function(record) {
                    if (this._additionsHead === null) {
                        this._additionsHead = this._additionsTail = record;
                    } else {
                        this._additionsTail._nextAdded = record;
                        this._additionsTail = record;
                    }
                };
                DefaultKeyValueDiffer.prototype._addToChanges = function(record) {
                    if (this._changesHead === null) {
                        this._changesHead = this._changesTail = record;
                    } else {
                        this._changesTail._nextChanged = record;
                        this._changesTail = record;
                    }
                };
                DefaultKeyValueDiffer.prototype._forEach = function(obj, fn) {
                    if (obj instanceof Map) {
                        obj.forEach(fn);
                    } else {
                        Object.keys(obj).forEach(function(k) {
                            return fn(obj[k], k);
                        });
                    }
                };
                return DefaultKeyValueDiffer;
            }();
            var KeyValueChangeRecord_ = function() {
                function KeyValueChangeRecord_(key) {
                    this.key = key;
                    this.previousValue = null;
                    this.currentValue = null;
                    this._nextPrevious = null;
                    this._next = null;
                    this._prev = null;
                    this._nextAdded = null;
                    this._nextRemoved = null;
                    this._nextChanged = null;
                }
                return KeyValueChangeRecord_;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var IterableDiffers = function() {
                function IterableDiffers(factories) {
                    this.factories = factories;
                }
                IterableDiffers.create = function(factories, parent) {
                    if (parent != null) {
                        var copied = parent.factories.slice();
                        factories = factories.concat(copied);
                        return new IterableDiffers(factories);
                    } else {
                        return new IterableDiffers(factories);
                    }
                };
                IterableDiffers.extend = function(factories) {
                    return {
                        provide: IterableDiffers,
                        useFactory: function(parent) {
                            if (!parent) {
                                throw new Error("Cannot extend IterableDiffers without a parent injector");
                            }
                            return IterableDiffers.create(factories, parent);
                        },
                        deps: [ [ IterableDiffers, new SkipSelf(), new Optional() ] ]
                    };
                };
                IterableDiffers.prototype.find = function(iterable) {
                    var factory = this.factories.find(function(f) {
                        return f.supports(iterable);
                    });
                    if (factory != null) {
                        return factory;
                    } else {
                        throw new Error("Cannot find a differ supporting object '" + iterable + "' of type '" + getTypeNameForDebugging(iterable) + "'");
                    }
                };
                return IterableDiffers;
            }();
            function getTypeNameForDebugging(type) {
                return type["name"] || typeof type;
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var KeyValueDiffers = function() {
                function KeyValueDiffers(factories) {
                    this.factories = factories;
                }
                KeyValueDiffers.create = function(factories, parent) {
                    if (parent) {
                        var copied = parent.factories.slice();
                        factories = factories.concat(copied);
                    }
                    return new KeyValueDiffers(factories);
                };
                KeyValueDiffers.extend = function(factories) {
                    return {
                        provide: KeyValueDiffers,
                        useFactory: function(parent) {
                            if (!parent) {
                                throw new Error("Cannot extend KeyValueDiffers without a parent injector");
                            }
                            return KeyValueDiffers.create(factories, parent);
                        },
                        deps: [ [ KeyValueDiffers, new SkipSelf(), new Optional() ] ]
                    };
                };
                KeyValueDiffers.prototype.find = function(kv) {
                    var factory = this.factories.find(function(f) {
                        return f.supports(kv);
                    });
                    if (factory) {
                        return factory;
                    }
                    throw new Error("Cannot find a differ supporting object '" + kv + "'");
                };
                return KeyValueDiffers;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var keyValDiff = [ new DefaultKeyValueDifferFactory() ];
            var iterableDiff = [ new DefaultIterableDifferFactory() ];
            var defaultIterableDiffers = new IterableDiffers(iterableDiff);
            var defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff);
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function _reflector() {
                return reflector;
            }
            var _CORE_PLATFORM_PROVIDERS = [ {
                provide: PLATFORM_ID,
                useValue: "unknown"
            }, PlatformRef_, {
                provide: PlatformRef,
                useExisting: PlatformRef_
            }, {
                provide: Reflector,
                useFactory: _reflector,
                deps: []
            }, TestabilityRegistry, Console ];
            var platformCore = createPlatformFactory(null, "core", _CORE_PLATFORM_PROVIDERS);
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var LOCALE_ID = new InjectionToken("LocaleId");
            var TRANSLATIONS = new InjectionToken("Translations");
            var TRANSLATIONS_FORMAT = new InjectionToken("TranslationsFormat");
            var MissingTranslationStrategy = {};
            MissingTranslationStrategy.Error = 0;
            MissingTranslationStrategy.Warning = 1;
            MissingTranslationStrategy.Ignore = 2;
            MissingTranslationStrategy[MissingTranslationStrategy.Error] = "Error";
            MissingTranslationStrategy[MissingTranslationStrategy.Warning] = "Warning";
            MissingTranslationStrategy[MissingTranslationStrategy.Ignore] = "Ignore";
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function _iterableDiffersFactory() {
                return defaultIterableDiffers;
            }
            function _keyValueDiffersFactory() {
                return defaultKeyValueDiffers;
            }
            function _localeFactory(locale) {
                return locale || "en-US";
            }
            var ApplicationModule = function() {
                function ApplicationModule(appRef) {}
                return ApplicationModule;
            }();
            ApplicationModule.decorators = [ {
                type: NgModule,
                args: [ {
                    providers: [ ApplicationRef_, {
                        provide: ApplicationRef,
                        useExisting: ApplicationRef_
                    }, ApplicationInitStatus, Compiler, APP_ID_RANDOM_PROVIDER, {
                        provide: IterableDiffers,
                        useFactory: _iterableDiffersFactory
                    }, {
                        provide: KeyValueDiffers,
                        useFactory: _keyValueDiffersFactory
                    }, {
                        provide: LOCALE_ID,
                        useFactory: _localeFactory,
                        deps: [ [ new Inject(LOCALE_ID), new Optional(), new SkipSelf() ] ]
                    } ]
                } ]
            } ];
            ApplicationModule.ctorParameters = function() {
                return [ {
                    type: ApplicationRef
                } ];
            };
            var SecurityContext = {};
            SecurityContext.NONE = 0;
            SecurityContext.HTML = 1;
            SecurityContext.STYLE = 2;
            SecurityContext.SCRIPT = 3;
            SecurityContext.URL = 4;
            SecurityContext.RESOURCE_URL = 5;
            SecurityContext[SecurityContext.NONE] = "NONE";
            SecurityContext[SecurityContext.HTML] = "HTML";
            SecurityContext[SecurityContext.STYLE] = "STYLE";
            SecurityContext[SecurityContext.SCRIPT] = "SCRIPT";
            SecurityContext[SecurityContext.URL] = "URL";
            SecurityContext[SecurityContext.RESOURCE_URL] = "RESOURCE_URL";
            var Sanitizer = function() {
                function Sanitizer() {}
                Sanitizer.prototype.sanitize = function(context, value) {};
                return Sanitizer;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function asTextData(view, index) {
                return view.nodes[index];
            }
            function asElementData(view, index) {
                return view.nodes[index];
            }
            function asProviderData(view, index) {
                return view.nodes[index];
            }
            function asPureExpressionData(view, index) {
                return view.nodes[index];
            }
            function asQueryList(view, index) {
                return view.nodes[index];
            }
            var DebugContext = function() {
                function DebugContext() {}
                DebugContext.prototype.view = function() {};
                DebugContext.prototype.nodeIndex = function() {};
                DebugContext.prototype.injector = function() {};
                DebugContext.prototype.component = function() {};
                DebugContext.prototype.providerTokens = function() {};
                DebugContext.prototype.references = function() {};
                DebugContext.prototype.context = function() {};
                DebugContext.prototype.componentRenderElement = function() {};
                DebugContext.prototype.renderNode = function() {};
                DebugContext.prototype.logError = function(console) {
                    var values = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        values[_i - 1] = arguments[_i];
                    }
                };
                return DebugContext;
            }();
            var Services = {
                setCurrentNode: undefined,
                createRootView: undefined,
                createEmbeddedView: undefined,
                createComponentView: undefined,
                createNgModuleRef: undefined,
                overrideProvider: undefined,
                clearProviderOverrides: undefined,
                checkAndUpdateView: undefined,
                checkNoChangesView: undefined,
                destroyView: undefined,
                resolveDep: undefined,
                createDebugContext: undefined,
                handleEvent: undefined,
                updateDirectives: undefined,
                updateRenderer: undefined,
                dirtyParentQueries: undefined
            };
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function expressionChangedAfterItHasBeenCheckedError(context, oldValue, currValue, isFirstCheck) {
                var msg = "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '" + oldValue + "'. Current value: '" + currValue + "'.";
                if (isFirstCheck) {
                    msg += " It seems like the view has been created after its parent and its children have been dirty checked." + " Has it been created in a change detection hook ?";
                }
                return viewDebugError(msg, context);
            }
            function viewWrappedDebugError(err, context) {
                if (!(err instanceof Error)) {
                    err = new Error(err.toString());
                }
                _addDebugContext(err, context);
                return err;
            }
            function viewDebugError(msg, context) {
                var err = new Error(msg);
                _addDebugContext(err, context);
                return err;
            }
            function _addDebugContext(err, context) {
                err[ERROR_DEBUG_CONTEXT] = context;
                err[ERROR_LOGGER] = context.logError.bind(context);
            }
            function isViewDebugError(err) {
                return !!getDebugContext(err);
            }
            function viewDestroyedError(action) {
                return new Error("ViewDestroyedError: Attempt to use a destroyed view: " + action);
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var NOOP = function() {};
            var _tokenKeyCache = new Map();
            function tokenKey(token) {
                var key = _tokenKeyCache.get(token);
                if (!key) {
                    key = stringify(token) + "_" + _tokenKeyCache.size;
                    _tokenKeyCache.set(token, key);
                }
                return key;
            }
            function unwrapValue(view, nodeIdx, bindingIdx, value) {
                if (value instanceof WrappedValue) {
                    value = value.wrapped;
                    var globalBindingIdx = view.def.nodes[nodeIdx].bindingIndex + bindingIdx;
                    var oldValue = view.oldValues[globalBindingIdx];
                    if (oldValue instanceof WrappedValue) {
                        oldValue = oldValue.wrapped;
                    }
                    view.oldValues[globalBindingIdx] = new WrappedValue(oldValue);
                }
                return value;
            }
            var UNDEFINED_RENDERER_TYPE_ID = "$$undefined";
            var EMPTY_RENDERER_TYPE_ID = "$$empty";
            function createRendererType2(values) {
                return {
                    id: UNDEFINED_RENDERER_TYPE_ID,
                    styles: values.styles,
                    encapsulation: values.encapsulation,
                    data: values.data
                };
            }
            var _renderCompCount = 0;
            function resolveRendererType2(type) {
                if (type && type.id === UNDEFINED_RENDERER_TYPE_ID) {
                    var isFilled = type.encapsulation != null && type.encapsulation !== ViewEncapsulation.None || type.styles.length || Object.keys(type.data).length;
                    if (isFilled) {
                        type.id = "c" + _renderCompCount++;
                    } else {
                        type.id = EMPTY_RENDERER_TYPE_ID;
                    }
                }
                if (type && type.id === EMPTY_RENDERER_TYPE_ID) {
                    type = null;
                }
                return type || null;
            }
            function checkBinding(view, def, bindingIdx, value) {
                var oldValues = view.oldValues;
                if (view.state & 2 || !looseIdentical(oldValues[def.bindingIndex + bindingIdx], value)) {
                    return true;
                }
                return false;
            }
            function checkAndUpdateBinding(view, def, bindingIdx, value) {
                if (checkBinding(view, def, bindingIdx, value)) {
                    view.oldValues[def.bindingIndex + bindingIdx] = value;
                    return true;
                }
                return false;
            }
            function checkBindingNoChanges(view, def, bindingIdx, value) {
                var oldValue = view.oldValues[def.bindingIndex + bindingIdx];
                if (view.state & 1 || !devModeEqual(oldValue, value)) {
                    throw expressionChangedAfterItHasBeenCheckedError(Services.createDebugContext(view, def.nodeIndex), oldValue, value, (view.state & 1) !== 0);
                }
            }
            function markParentViewsForCheck(view) {
                var currView = view;
                while (currView) {
                    if (currView.def.flags & 2) {
                        currView.state |= 8;
                    }
                    currView = currView.viewContainerParent || currView.parent;
                }
            }
            function markParentViewsForCheckProjectedViews(view, endView) {
                var currView = view;
                while (currView && currView !== endView) {
                    currView.state |= 64;
                    currView = currView.viewContainerParent || currView.parent;
                }
            }
            function dispatchEvent(view, nodeIndex, eventName, event) {
                var nodeDef = view.def.nodes[nodeIndex];
                var startView = nodeDef.flags & 33554432 ? asElementData(view, nodeIndex).componentView : view;
                markParentViewsForCheck(startView);
                return Services.handleEvent(view, nodeIndex, eventName, event);
            }
            function declaredViewContainer(view) {
                if (view.parent) {
                    var parentView = view.parent;
                    return asElementData(parentView, view.parentNodeDef.nodeIndex);
                }
                return null;
            }
            function viewParentEl(view) {
                var parentView = view.parent;
                if (parentView) {
                    return view.parentNodeDef.parent;
                } else {
                    return null;
                }
            }
            function renderNode(view, def) {
                switch (def.flags & 201347067) {
                  case 1:
                    return asElementData(view, def.nodeIndex).renderElement;

                  case 2:
                    return asTextData(view, def.nodeIndex).renderText;
                }
            }
            function elementEventFullName(target, name) {
                return target ? target + ":" + name : name;
            }
            function isComponentView(view) {
                return !!view.parent && !!(view.parentNodeDef.flags & 32768);
            }
            function isEmbeddedView(view) {
                return !!view.parent && !(view.parentNodeDef.flags & 32768);
            }
            function filterQueryId(queryId) {
                return 1 << queryId % 32;
            }
            function splitMatchedQueriesDsl(matchedQueriesDsl) {
                var matchedQueries = {};
                var matchedQueryIds = 0;
                var references = {};
                if (matchedQueriesDsl) {
                    matchedQueriesDsl.forEach(function(_a) {
                        var queryId = _a[0], valueType = _a[1];
                        if (typeof queryId === "number") {
                            matchedQueries[queryId] = valueType;
                            matchedQueryIds |= filterQueryId(queryId);
                        } else {
                            references[queryId] = valueType;
                        }
                    });
                }
                return {
                    matchedQueries: matchedQueries,
                    references: references,
                    matchedQueryIds: matchedQueryIds
                };
            }
            function splitDepsDsl(deps) {
                return deps.map(function(value) {
                    var token;
                    var flags;
                    if (Array.isArray(value)) {
                        flags = value[0], token = value[1];
                    } else {
                        flags = 0;
                        token = value;
                    }
                    return {
                        flags: flags,
                        token: token,
                        tokenKey: tokenKey(token)
                    };
                });
            }
            function getParentRenderElement(view, renderHost, def) {
                var renderParent = def.renderParent;
                if (renderParent) {
                    if ((renderParent.flags & 1) === 0 || (renderParent.flags & 33554432) === 0 || renderParent.element.componentRendererType && renderParent.element.componentRendererType.encapsulation === ViewEncapsulation.Native) {
                        return asElementData(view, def.renderParent.nodeIndex).renderElement;
                    }
                } else {
                    return renderHost;
                }
            }
            var DEFINITION_CACHE = new WeakMap();
            function resolveDefinition(factory) {
                var value = DEFINITION_CACHE.get(factory);
                if (!value) {
                    value = factory(function() {
                        return NOOP;
                    });
                    value.factory = factory;
                    DEFINITION_CACHE.set(factory, value);
                }
                return value;
            }
            function rootRenderNodes(view) {
                var renderNodes = [];
                visitRootRenderNodes(view, 0, undefined, undefined, renderNodes);
                return renderNodes;
            }
            function visitRootRenderNodes(view, action, parentNode, nextSibling, target) {
                if (action === 3) {
                    parentNode = view.renderer.parentNode(renderNode(view, view.def.lastRenderRootNode));
                }
                visitSiblingRenderNodes(view, action, 0, view.def.nodes.length - 1, parentNode, nextSibling, target);
            }
            function visitSiblingRenderNodes(view, action, startIndex, endIndex, parentNode, nextSibling, target) {
                for (var i = startIndex; i <= endIndex; i++) {
                    var nodeDef = view.def.nodes[i];
                    if (nodeDef.flags & (1 | 2 | 8)) {
                        visitRenderNode(view, nodeDef, action, parentNode, nextSibling, target);
                    }
                    i += nodeDef.childCount;
                }
            }
            function visitProjectedRenderNodes(view, ngContentIndex, action, parentNode, nextSibling, target) {
                var compView = view;
                while (compView && !isComponentView(compView)) {
                    compView = compView.parent;
                }
                var hostView = compView.parent;
                var hostElDef = viewParentEl(compView);
                var startIndex = hostElDef.nodeIndex + 1;
                var endIndex = hostElDef.nodeIndex + hostElDef.childCount;
                for (var i = startIndex; i <= endIndex; i++) {
                    var nodeDef = hostView.def.nodes[i];
                    if (nodeDef.ngContentIndex === ngContentIndex) {
                        visitRenderNode(hostView, nodeDef, action, parentNode, nextSibling, target);
                    }
                    i += nodeDef.childCount;
                }
                if (!hostView.parent) {
                    var projectedNodes = view.root.projectableNodes[ngContentIndex];
                    if (projectedNodes) {
                        for (var i = 0; i < projectedNodes.length; i++) {
                            execRenderNodeAction(view, projectedNodes[i], action, parentNode, nextSibling, target);
                        }
                    }
                }
            }
            function visitRenderNode(view, nodeDef, action, parentNode, nextSibling, target) {
                if (nodeDef.flags & 8) {
                    visitProjectedRenderNodes(view, nodeDef.ngContent.index, action, parentNode, nextSibling, target);
                } else {
                    var rn = renderNode(view, nodeDef);
                    if (action === 3 && nodeDef.flags & 33554432 && nodeDef.bindingFlags & 48) {
                        if (nodeDef.bindingFlags & 16) {
                            execRenderNodeAction(view, rn, action, parentNode, nextSibling, target);
                        }
                        if (nodeDef.bindingFlags & 32) {
                            var compView = asElementData(view, nodeDef.nodeIndex).componentView;
                            execRenderNodeAction(compView, rn, action, parentNode, nextSibling, target);
                        }
                    } else {
                        execRenderNodeAction(view, rn, action, parentNode, nextSibling, target);
                    }
                    if (nodeDef.flags & 16777216) {
                        var embeddedViews = asElementData(view, nodeDef.nodeIndex).viewContainer._embeddedViews;
                        for (var k = 0; k < embeddedViews.length; k++) {
                            visitRootRenderNodes(embeddedViews[k], action, parentNode, nextSibling, target);
                        }
                    }
                    if (nodeDef.flags & 1 && !nodeDef.element.name) {
                        visitSiblingRenderNodes(view, action, nodeDef.nodeIndex + 1, nodeDef.nodeIndex + nodeDef.childCount, parentNode, nextSibling, target);
                    }
                }
            }
            function execRenderNodeAction(view, renderNode, action, parentNode, nextSibling, target) {
                var renderer = view.renderer;
                switch (action) {
                  case 1:
                    renderer.appendChild(parentNode, renderNode);
                    break;

                  case 2:
                    renderer.insertBefore(parentNode, renderNode, nextSibling);
                    break;

                  case 3:
                    renderer.removeChild(parentNode, renderNode);
                    break;

                  case 0:
                    target.push(renderNode);
                    break;
                }
            }
            var NS_PREFIX_RE = /^:([^:]+):(.+)$/;
            function splitNamespace(name) {
                if (name[0] === ":") {
                    var match = name.match(NS_PREFIX_RE);
                    return [ match[1], match[2] ];
                }
                return [ "", name ];
            }
            function calcBindingFlags(bindings) {
                var flags = 0;
                for (var i = 0; i < bindings.length; i++) {
                    flags |= bindings[i].flags;
                }
                return flags;
            }
            function interpolate(valueCount, constAndInterp) {
                var result = "";
                for (var i = 0; i < valueCount * 2; i = i + 2) {
                    result = result + constAndInterp[i] + _toStringWithNull(constAndInterp[i + 1]);
                }
                return result + constAndInterp[valueCount * 2];
            }
            function inlineInterpolate(valueCount, c0, a1, c1, a2, c2, a3, c3, a4, c4, a5, c5, a6, c6, a7, c7, a8, c8, a9, c9) {
                switch (valueCount) {
                  case 1:
                    return c0 + _toStringWithNull(a1) + c1;

                  case 2:
                    return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2;

                  case 3:
                    return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3;

                  case 4:
                    return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4;

                  case 5:
                    return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5;

                  case 6:
                    return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6;

                  case 7:
                    return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6 + _toStringWithNull(a7) + c7;

                  case 8:
                    return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8;

                  case 9:
                    return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8 + _toStringWithNull(a9) + c9;

                  default:
                    throw new Error("Does not support more than 9 expressions");
                }
            }
            function _toStringWithNull(v) {
                return v != null ? v.toString() : "";
            }
            var EMPTY_ARRAY = [];
            var EMPTY_MAP = {};
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function anchorDef(flags, matchedQueriesDsl, ngContentIndex, childCount, handleEvent, templateFactory) {
                flags |= 1;
                var _a = splitMatchedQueriesDsl(matchedQueriesDsl), matchedQueries = _a.matchedQueries, references = _a.references, matchedQueryIds = _a.matchedQueryIds;
                var template = templateFactory ? resolveDefinition(templateFactory) : null;
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    flags: flags,
                    checkIndex: -1,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: matchedQueries,
                    matchedQueryIds: matchedQueryIds,
                    references: references,
                    ngContentIndex: ngContentIndex,
                    childCount: childCount,
                    bindings: [],
                    bindingFlags: 0,
                    outputs: [],
                    element: {
                        ns: null,
                        name: null,
                        attrs: null,
                        template: template,
                        componentProvider: null,
                        componentView: null,
                        componentRendererType: null,
                        publicProviders: null,
                        allProviders: null,
                        handleEvent: handleEvent || NOOP
                    },
                    provider: null,
                    text: null,
                    query: null,
                    ngContent: null
                };
            }
            function elementDef(checkIndex, flags, matchedQueriesDsl, ngContentIndex, childCount, namespaceAndName, fixedAttrs, bindings, outputs, handleEvent, componentView, componentRendererType) {
                if (fixedAttrs === void 0) {
                    fixedAttrs = [];
                }
                if (!handleEvent) {
                    handleEvent = NOOP;
                }
                var _a = splitMatchedQueriesDsl(matchedQueriesDsl), matchedQueries = _a.matchedQueries, references = _a.references, matchedQueryIds = _a.matchedQueryIds;
                var ns = null;
                var name = null;
                if (namespaceAndName) {
                    _b = splitNamespace(namespaceAndName), ns = _b[0], name = _b[1];
                }
                bindings = bindings || [];
                var bindingDefs = new Array(bindings.length);
                for (var i = 0; i < bindings.length; i++) {
                    var _c = bindings[i], bindingFlags = _c[0], namespaceAndName_1 = _c[1], suffixOrSecurityContext = _c[2];
                    var _d = splitNamespace(namespaceAndName_1), ns_1 = _d[0], name_1 = _d[1];
                    var securityContext = undefined;
                    var suffix = undefined;
                    switch (bindingFlags & 15) {
                      case 4:
                        suffix = suffixOrSecurityContext;
                        break;

                      case 1:
                      case 8:
                        securityContext = suffixOrSecurityContext;
                        break;
                    }
                    bindingDefs[i] = {
                        flags: bindingFlags,
                        ns: ns_1,
                        name: name_1,
                        nonMinifiedName: name_1,
                        securityContext: securityContext,
                        suffix: suffix
                    };
                }
                outputs = outputs || [];
                var outputDefs = new Array(outputs.length);
                for (var i = 0; i < outputs.length; i++) {
                    var _e = outputs[i], target = _e[0], eventName = _e[1];
                    outputDefs[i] = {
                        type: 0,
                        target: target,
                        eventName: eventName,
                        propName: null
                    };
                }
                fixedAttrs = fixedAttrs || [];
                var attrs = fixedAttrs.map(function(_a) {
                    var namespaceAndName = _a[0], value = _a[1];
                    var _b = splitNamespace(namespaceAndName), ns = _b[0], name = _b[1];
                    return [ ns, name, value ];
                });
                componentRendererType = resolveRendererType2(componentRendererType);
                if (componentView) {
                    flags |= 33554432;
                }
                flags |= 1;
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: checkIndex,
                    flags: flags,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: matchedQueries,
                    matchedQueryIds: matchedQueryIds,
                    references: references,
                    ngContentIndex: ngContentIndex,
                    childCount: childCount,
                    bindings: bindingDefs,
                    bindingFlags: calcBindingFlags(bindingDefs),
                    outputs: outputDefs,
                    element: {
                        ns: ns,
                        name: name,
                        attrs: attrs,
                        template: null,
                        componentProvider: null,
                        componentView: componentView || null,
                        componentRendererType: componentRendererType,
                        publicProviders: null,
                        allProviders: null,
                        handleEvent: handleEvent || NOOP
                    },
                    provider: null,
                    text: null,
                    query: null,
                    ngContent: null
                };
                var _b;
            }
            function createElement(view, renderHost, def) {
                var elDef = def.element;
                var rootSelectorOrNode = view.root.selectorOrNode;
                var renderer = view.renderer;
                var el;
                if (view.parent || !rootSelectorOrNode) {
                    if (elDef.name) {
                        el = renderer.createElement(elDef.name, elDef.ns);
                    } else {
                        el = renderer.createComment("");
                    }
                    var parentEl = getParentRenderElement(view, renderHost, def);
                    if (parentEl) {
                        renderer.appendChild(parentEl, el);
                    }
                } else {
                    el = renderer.selectRootElement(rootSelectorOrNode);
                }
                if (elDef.attrs) {
                    for (var i = 0; i < elDef.attrs.length; i++) {
                        var _a = elDef.attrs[i], ns = _a[0], name = _a[1], value = _a[2];
                        renderer.setAttribute(el, name, value, ns);
                    }
                }
                return el;
            }
            function listenToElementOutputs(view, compView, def, el) {
                for (var i = 0; i < def.outputs.length; i++) {
                    var output = def.outputs[i];
                    var handleEventClosure = renderEventHandlerClosure(view, def.nodeIndex, elementEventFullName(output.target, output.eventName));
                    var listenTarget = output.target;
                    var listenerView = view;
                    if (output.target === "component") {
                        listenTarget = null;
                        listenerView = compView;
                    }
                    var disposable = listenerView.renderer.listen(listenTarget || el, output.eventName, handleEventClosure);
                    view.disposables[def.outputIndex + i] = disposable;
                }
            }
            function renderEventHandlerClosure(view, index, eventName) {
                return function(event) {
                    try {
                        return dispatchEvent(view, index, eventName, event);
                    } catch (e) {
                        view.root.errorHandler.handleError(e);
                    }
                };
            }
            function checkAndUpdateElementInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                var bindLen = def.bindings.length;
                var changed = false;
                if (bindLen > 0 && checkAndUpdateElementValue(view, def, 0, v0)) changed = true;
                if (bindLen > 1 && checkAndUpdateElementValue(view, def, 1, v1)) changed = true;
                if (bindLen > 2 && checkAndUpdateElementValue(view, def, 2, v2)) changed = true;
                if (bindLen > 3 && checkAndUpdateElementValue(view, def, 3, v3)) changed = true;
                if (bindLen > 4 && checkAndUpdateElementValue(view, def, 4, v4)) changed = true;
                if (bindLen > 5 && checkAndUpdateElementValue(view, def, 5, v5)) changed = true;
                if (bindLen > 6 && checkAndUpdateElementValue(view, def, 6, v6)) changed = true;
                if (bindLen > 7 && checkAndUpdateElementValue(view, def, 7, v7)) changed = true;
                if (bindLen > 8 && checkAndUpdateElementValue(view, def, 8, v8)) changed = true;
                if (bindLen > 9 && checkAndUpdateElementValue(view, def, 9, v9)) changed = true;
                return changed;
            }
            function checkAndUpdateElementDynamic(view, def, values) {
                var changed = false;
                for (var i = 0; i < values.length; i++) {
                    if (checkAndUpdateElementValue(view, def, i, values[i])) changed = true;
                }
                return changed;
            }
            function checkAndUpdateElementValue(view, def, bindingIdx, value) {
                if (!checkAndUpdateBinding(view, def, bindingIdx, value)) {
                    return false;
                }
                var binding = def.bindings[bindingIdx];
                var elData = asElementData(view, def.nodeIndex);
                var renderNode$$1 = elData.renderElement;
                var name = binding.name;
                switch (binding.flags & 15) {
                  case 1:
                    setElementAttribute(view, binding, renderNode$$1, binding.ns, name, value);
                    break;

                  case 2:
                    setElementClass(view, renderNode$$1, name, value);
                    break;

                  case 4:
                    setElementStyle(view, binding, renderNode$$1, name, value);
                    break;

                  case 8:
                    var bindView = def.flags & 33554432 && binding.flags & 32 ? elData.componentView : view;
                    setElementProperty(bindView, binding, renderNode$$1, name, value);
                    break;
                }
                return true;
            }
            function setElementAttribute(view, binding, renderNode$$1, ns, name, value) {
                var securityContext = binding.securityContext;
                var renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
                renderValue = renderValue != null ? renderValue.toString() : null;
                var renderer = view.renderer;
                if (value != null) {
                    renderer.setAttribute(renderNode$$1, name, renderValue, ns);
                } else {
                    renderer.removeAttribute(renderNode$$1, name, ns);
                }
            }
            function setElementClass(view, renderNode$$1, name, value) {
                var renderer = view.renderer;
                if (value) {
                    renderer.addClass(renderNode$$1, name);
                } else {
                    renderer.removeClass(renderNode$$1, name);
                }
            }
            function setElementStyle(view, binding, renderNode$$1, name, value) {
                var renderValue = view.root.sanitizer.sanitize(SecurityContext.STYLE, value);
                if (renderValue != null) {
                    renderValue = renderValue.toString();
                    var unit = binding.suffix;
                    if (unit != null) {
                        renderValue = renderValue + unit;
                    }
                } else {
                    renderValue = null;
                }
                var renderer = view.renderer;
                if (renderValue != null) {
                    renderer.setStyle(renderNode$$1, name, renderValue);
                } else {
                    renderer.removeStyle(renderNode$$1, name);
                }
            }
            function setElementProperty(view, binding, renderNode$$1, name, value) {
                var securityContext = binding.securityContext;
                var renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
                view.renderer.setProperty(renderNode$$1, name, renderValue);
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var UNDEFINED_VALUE = new Object();
            var InjectorRefTokenKey$1 = tokenKey(Injector);
            var NgModuleRefTokenKey = tokenKey(NgModuleRef);
            function moduleProvideDef(flags, token, value, deps) {
                var depDefs = splitDepsDsl(deps);
                return {
                    index: -1,
                    deps: depDefs,
                    flags: flags,
                    token: token,
                    value: value
                };
            }
            function moduleDef(providers) {
                var providersByKey = {};
                for (var i = 0; i < providers.length; i++) {
                    var provider = providers[i];
                    provider.index = i;
                    providersByKey[tokenKey(provider.token)] = provider;
                }
                return {
                    factory: null,
                    providersByKey: providersByKey,
                    providers: providers
                };
            }
            function initNgModule(data) {
                var def = data._def;
                var providers = data._providers = new Array(def.providers.length);
                for (var i = 0; i < def.providers.length; i++) {
                    var provDef = def.providers[i];
                    if (!(provDef.flags & 4096)) {
                        providers[i] = _createProviderInstance$1(data, provDef);
                    }
                }
            }
            function resolveNgModuleDep(data, depDef, notFoundValue) {
                if (notFoundValue === void 0) {
                    notFoundValue = Injector.THROW_IF_NOT_FOUND;
                }
                if (depDef.flags & 8) {
                    return depDef.token;
                }
                if (depDef.flags & 2) {
                    notFoundValue = null;
                }
                if (depDef.flags & 1) {
                    return data._parent.get(depDef.token, notFoundValue);
                }
                var tokenKey$$1 = depDef.tokenKey;
                switch (tokenKey$$1) {
                  case InjectorRefTokenKey$1:
                  case NgModuleRefTokenKey:
                    return data;
                }
                var providerDef = data._def.providersByKey[tokenKey$$1];
                if (providerDef) {
                    var providerInstance = data._providers[providerDef.index];
                    if (providerInstance === undefined) {
                        providerInstance = data._providers[providerDef.index] = _createProviderInstance$1(data, providerDef);
                    }
                    return providerInstance === UNDEFINED_VALUE ? undefined : providerInstance;
                }
                return data._parent.get(depDef.token, notFoundValue);
            }
            function _createProviderInstance$1(ngModule, providerDef) {
                var injectable;
                switch (providerDef.flags & 201347067) {
                  case 512:
                    injectable = _createClass(ngModule, providerDef.value, providerDef.deps);
                    break;

                  case 1024:
                    injectable = _callFactory(ngModule, providerDef.value, providerDef.deps);
                    break;

                  case 2048:
                    injectable = resolveNgModuleDep(ngModule, providerDef.deps[0]);
                    break;

                  case 256:
                    injectable = providerDef.value;
                    break;
                }
                return injectable === undefined ? UNDEFINED_VALUE : injectable;
            }
            function _createClass(ngModule, ctor, deps) {
                var len = deps.length;
                switch (len) {
                  case 0:
                    return new ctor();

                  case 1:
                    return new ctor(resolveNgModuleDep(ngModule, deps[0]));

                  case 2:
                    return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));

                  case 3:
                    return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));

                  default:
                    var depValues = new Array(len);
                    for (var i = 0; i < len; i++) {
                        depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
                    }
                    return new (ctor.bind.apply(ctor, [ void 0 ].concat(depValues)))();
                }
            }
            function _callFactory(ngModule, factory, deps) {
                var len = deps.length;
                switch (len) {
                  case 0:
                    return factory();

                  case 1:
                    return factory(resolveNgModuleDep(ngModule, deps[0]));

                  case 2:
                    return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));

                  case 3:
                    return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));

                  default:
                    var depValues = Array(len);
                    for (var i = 0; i < len; i++) {
                        depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
                    }
                    return factory.apply(void 0, depValues);
                }
            }
            function callNgModuleLifecycle(ngModule, lifecycles) {
                var def = ngModule._def;
                for (var i = 0; i < def.providers.length; i++) {
                    var provDef = def.providers[i];
                    if (provDef.flags & 131072) {
                        var instance = ngModule._providers[i];
                        if (instance && instance !== UNDEFINED_VALUE) {
                            instance.ngOnDestroy();
                        }
                    }
                }
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function attachEmbeddedView(parentView, elementData, viewIndex, view) {
                var embeddedViews = elementData.viewContainer._embeddedViews;
                if (viewIndex === null || viewIndex === undefined) {
                    viewIndex = embeddedViews.length;
                }
                view.viewContainerParent = parentView;
                addToArray(embeddedViews, viewIndex, view);
                attachProjectedView(elementData, view);
                Services.dirtyParentQueries(view);
                var prevView = viewIndex > 0 ? embeddedViews[viewIndex - 1] : null;
                renderAttachEmbeddedView(elementData, prevView, view);
            }
            function attachProjectedView(vcElementData, view) {
                var dvcElementData = declaredViewContainer(view);
                if (!dvcElementData || dvcElementData === vcElementData || view.state & 16) {
                    return;
                }
                view.state |= 16;
                var projectedViews = dvcElementData.template._projectedViews;
                if (!projectedViews) {
                    projectedViews = dvcElementData.template._projectedViews = [];
                }
                projectedViews.push(view);
                markNodeAsProjectedTemplate(view.parent.def, view.parentNodeDef);
            }
            function markNodeAsProjectedTemplate(viewDef, nodeDef) {
                if (nodeDef.flags & 4) {
                    return;
                }
                viewDef.nodeFlags |= 4;
                nodeDef.flags |= 4;
                var parentNodeDef = nodeDef.parent;
                while (parentNodeDef) {
                    parentNodeDef.childFlags |= 4;
                    parentNodeDef = parentNodeDef.parent;
                }
            }
            function detachEmbeddedView(elementData, viewIndex) {
                var embeddedViews = elementData.viewContainer._embeddedViews;
                if (viewIndex == null || viewIndex >= embeddedViews.length) {
                    viewIndex = embeddedViews.length - 1;
                }
                if (viewIndex < 0) {
                    return null;
                }
                var view = embeddedViews[viewIndex];
                view.viewContainerParent = null;
                removeFromArray(embeddedViews, viewIndex);
                Services.dirtyParentQueries(view);
                renderDetachView(view);
                return view;
            }
            function detachProjectedView(view) {
                if (!(view.state & 16)) {
                    return;
                }
                var dvcElementData = declaredViewContainer(view);
                if (dvcElementData) {
                    var projectedViews = dvcElementData.template._projectedViews;
                    if (projectedViews) {
                        removeFromArray(projectedViews, projectedViews.indexOf(view));
                        Services.dirtyParentQueries(view);
                    }
                }
            }
            function moveEmbeddedView(elementData, oldViewIndex, newViewIndex) {
                var embeddedViews = elementData.viewContainer._embeddedViews;
                var view = embeddedViews[oldViewIndex];
                removeFromArray(embeddedViews, oldViewIndex);
                if (newViewIndex == null) {
                    newViewIndex = embeddedViews.length;
                }
                addToArray(embeddedViews, newViewIndex, view);
                Services.dirtyParentQueries(view);
                renderDetachView(view);
                var prevView = newViewIndex > 0 ? embeddedViews[newViewIndex - 1] : null;
                renderAttachEmbeddedView(elementData, prevView, view);
                return view;
            }
            function renderAttachEmbeddedView(elementData, prevView, view) {
                var prevRenderNode = prevView ? renderNode(prevView, prevView.def.lastRenderRootNode) : elementData.renderElement;
                var parentNode = view.renderer.parentNode(prevRenderNode);
                var nextSibling = view.renderer.nextSibling(prevRenderNode);
                visitRootRenderNodes(view, 2, parentNode, nextSibling, undefined);
            }
            function renderDetachView(view) {
                visitRootRenderNodes(view, 3, null, null, undefined);
            }
            function addToArray(arr, index, value) {
                if (index >= arr.length) {
                    arr.push(value);
                } else {
                    arr.splice(index, 0, value);
                }
            }
            function removeFromArray(arr, index) {
                if (index >= arr.length - 1) {
                    arr.pop();
                } else {
                    arr.splice(index, 1);
                }
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var EMPTY_CONTEXT = new Object();
            function createComponentFactory(selector, componentType, viewDefFactory, inputs, outputs, ngContentSelectors) {
                return new ComponentFactory_(selector, componentType, viewDefFactory, inputs, outputs, ngContentSelectors);
            }
            function getComponentViewDefinitionFactory(componentFactory) {
                return componentFactory.viewDefFactory;
            }
            var ComponentFactory_ = function(_super) {
                __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](ComponentFactory_, _super);
                function ComponentFactory_(selector, componentType, viewDefFactory, _inputs, _outputs, ngContentSelectors) {
                    var _this = _super.call(this) || this;
                    _this.selector = selector;
                    _this.componentType = componentType;
                    _this._inputs = _inputs;
                    _this._outputs = _outputs;
                    _this.ngContentSelectors = ngContentSelectors;
                    _this.viewDefFactory = viewDefFactory;
                    return _this;
                }
                Object.defineProperty(ComponentFactory_.prototype, "inputs", {
                    get: function() {
                        var inputsArr = [];
                        var inputs = this._inputs;
                        for (var propName in inputs) {
                            var templateName = inputs[propName];
                            inputsArr.push({
                                propName: propName,
                                templateName: templateName
                            });
                        }
                        return inputsArr;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentFactory_.prototype, "outputs", {
                    get: function() {
                        var outputsArr = [];
                        for (var propName in this._outputs) {
                            var templateName = this._outputs[propName];
                            outputsArr.push({
                                propName: propName,
                                templateName: templateName
                            });
                        }
                        return outputsArr;
                    },
                    enumerable: true,
                    configurable: true
                });
                ComponentFactory_.prototype.create = function(injector, projectableNodes, rootSelectorOrNode, ngModule) {
                    if (!ngModule) {
                        throw new Error("ngModule should be provided");
                    }
                    var viewDef = resolveDefinition(this.viewDefFactory);
                    var componentNodeIndex = viewDef.nodes[0].element.componentProvider.nodeIndex;
                    var view = Services.createRootView(injector, projectableNodes || [], rootSelectorOrNode, viewDef, ngModule, EMPTY_CONTEXT);
                    var component = asProviderData(view, componentNodeIndex).instance;
                    if (rootSelectorOrNode) {
                        view.renderer.setAttribute(asElementData(view, 0).renderElement, "ng-version", VERSION.full);
                    }
                    return new ComponentRef_(view, new ViewRef_(view), component);
                };
                return ComponentFactory_;
            }(ComponentFactory);
            var ComponentRef_ = function(_super) {
                __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](ComponentRef_, _super);
                function ComponentRef_(_view, _viewRef, _component) {
                    var _this = _super.call(this) || this;
                    _this._view = _view;
                    _this._viewRef = _viewRef;
                    _this._component = _component;
                    _this._elDef = _this._view.def.nodes[0];
                    return _this;
                }
                Object.defineProperty(ComponentRef_.prototype, "location", {
                    get: function() {
                        return new ElementRef(asElementData(this._view, this._elDef.nodeIndex).renderElement);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentRef_.prototype, "injector", {
                    get: function() {
                        return new Injector_(this._view, this._elDef);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentRef_.prototype, "instance", {
                    get: function() {
                        return this._component;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentRef_.prototype, "hostView", {
                    get: function() {
                        return this._viewRef;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentRef_.prototype, "changeDetectorRef", {
                    get: function() {
                        return this._viewRef;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComponentRef_.prototype, "componentType", {
                    get: function() {
                        return this._component.constructor;
                    },
                    enumerable: true,
                    configurable: true
                });
                ComponentRef_.prototype.destroy = function() {
                    this._viewRef.destroy();
                };
                ComponentRef_.prototype.onDestroy = function(callback) {
                    this._viewRef.onDestroy(callback);
                };
                return ComponentRef_;
            }(ComponentRef);
            function createViewContainerData(view, elDef, elData) {
                return new ViewContainerRef_(view, elDef, elData);
            }
            var ViewContainerRef_ = function() {
                function ViewContainerRef_(_view, _elDef, _data) {
                    this._view = _view;
                    this._elDef = _elDef;
                    this._data = _data;
                    this._embeddedViews = [];
                }
                Object.defineProperty(ViewContainerRef_.prototype, "element", {
                    get: function() {
                        return new ElementRef(this._data.renderElement);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewContainerRef_.prototype, "injector", {
                    get: function() {
                        return new Injector_(this._view, this._elDef);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
                    get: function() {
                        var view = this._view;
                        var elDef = this._elDef.parent;
                        while (!elDef && view) {
                            elDef = viewParentEl(view);
                            view = view.parent;
                        }
                        return view ? new Injector_(view, elDef) : new Injector_(this._view, null);
                    },
                    enumerable: true,
                    configurable: true
                });
                ViewContainerRef_.prototype.clear = function() {
                    var len = this._embeddedViews.length;
                    for (var i = len - 1; i >= 0; i--) {
                        var view = detachEmbeddedView(this._data, i);
                        Services.destroyView(view);
                    }
                };
                ViewContainerRef_.prototype.get = function(index) {
                    var view = this._embeddedViews[index];
                    if (view) {
                        var ref = new ViewRef_(view);
                        ref.attachToViewContainerRef(this);
                        return ref;
                    }
                    return null;
                };
                Object.defineProperty(ViewContainerRef_.prototype, "length", {
                    get: function() {
                        return this._embeddedViews.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                ViewContainerRef_.prototype.createEmbeddedView = function(templateRef, context, index) {
                    var viewRef = templateRef.createEmbeddedView(context || {});
                    this.insert(viewRef, index);
                    return viewRef;
                };
                ViewContainerRef_.prototype.createComponent = function(componentFactory, index, injector, projectableNodes, ngModuleRef) {
                    var contextInjector = injector || this.parentInjector;
                    if (!ngModuleRef && !(componentFactory instanceof ComponentFactoryBoundToModule)) {
                        ngModuleRef = contextInjector.get(NgModuleRef);
                    }
                    var componentRef = componentFactory.create(contextInjector, projectableNodes, undefined, ngModuleRef);
                    this.insert(componentRef.hostView, index);
                    return componentRef;
                };
                ViewContainerRef_.prototype.insert = function(viewRef, index) {
                    if (viewRef.destroyed) {
                        throw new Error("Cannot insert a destroyed View in a ViewContainer!");
                    }
                    var viewRef_ = viewRef;
                    var viewData = viewRef_._view;
                    attachEmbeddedView(this._view, this._data, index, viewData);
                    viewRef_.attachToViewContainerRef(this);
                    return viewRef;
                };
                ViewContainerRef_.prototype.move = function(viewRef, currentIndex) {
                    if (viewRef.destroyed) {
                        throw new Error("Cannot move a destroyed View in a ViewContainer!");
                    }
                    var previousIndex = this._embeddedViews.indexOf(viewRef._view);
                    moveEmbeddedView(this._data, previousIndex, currentIndex);
                    return viewRef;
                };
                ViewContainerRef_.prototype.indexOf = function(viewRef) {
                    return this._embeddedViews.indexOf(viewRef._view);
                };
                ViewContainerRef_.prototype.remove = function(index) {
                    var viewData = detachEmbeddedView(this._data, index);
                    if (viewData) {
                        Services.destroyView(viewData);
                    }
                };
                ViewContainerRef_.prototype.detach = function(index) {
                    var view = detachEmbeddedView(this._data, index);
                    return view ? new ViewRef_(view) : null;
                };
                return ViewContainerRef_;
            }();
            function createChangeDetectorRef(view) {
                return new ViewRef_(view);
            }
            var ViewRef_ = function() {
                function ViewRef_(_view) {
                    this._view = _view;
                    this._viewContainerRef = null;
                    this._appRef = null;
                }
                Object.defineProperty(ViewRef_.prototype, "rootNodes", {
                    get: function() {
                        return rootRenderNodes(this._view);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewRef_.prototype, "context", {
                    get: function() {
                        return this._view.context;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewRef_.prototype, "destroyed", {
                    get: function() {
                        return (this._view.state & 128) !== 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                ViewRef_.prototype.markForCheck = function() {
                    markParentViewsForCheck(this._view);
                };
                ViewRef_.prototype.detach = function() {
                    this._view.state &= ~4;
                };
                ViewRef_.prototype.detectChanges = function() {
                    var fs = this._view.root.rendererFactory;
                    if (fs.begin) {
                        fs.begin();
                    }
                    Services.checkAndUpdateView(this._view);
                    if (fs.end) {
                        fs.end();
                    }
                };
                ViewRef_.prototype.checkNoChanges = function() {
                    Services.checkNoChangesView(this._view);
                };
                ViewRef_.prototype.reattach = function() {
                    this._view.state |= 4;
                };
                ViewRef_.prototype.onDestroy = function(callback) {
                    if (!this._view.disposables) {
                        this._view.disposables = [];
                    }
                    this._view.disposables.push(callback);
                };
                ViewRef_.prototype.destroy = function() {
                    if (this._appRef) {
                        this._appRef.detachView(this);
                    } else if (this._viewContainerRef) {
                        this._viewContainerRef.detach(this._viewContainerRef.indexOf(this));
                    }
                    Services.destroyView(this._view);
                };
                ViewRef_.prototype.detachFromAppRef = function() {
                    this._appRef = null;
                    renderDetachView(this._view);
                    Services.dirtyParentQueries(this._view);
                };
                ViewRef_.prototype.attachToAppRef = function(appRef) {
                    if (this._viewContainerRef) {
                        throw new Error("This view is already attached to a ViewContainer!");
                    }
                    this._appRef = appRef;
                };
                ViewRef_.prototype.attachToViewContainerRef = function(vcRef) {
                    if (this._appRef) {
                        throw new Error("This view is already attached directly to the ApplicationRef!");
                    }
                    this._viewContainerRef = vcRef;
                };
                return ViewRef_;
            }();
            function createTemplateData(view, def) {
                return new TemplateRef_(view, def);
            }
            var TemplateRef_ = function(_super) {
                __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](TemplateRef_, _super);
                function TemplateRef_(_parentView, _def) {
                    var _this = _super.call(this) || this;
                    _this._parentView = _parentView;
                    _this._def = _def;
                    return _this;
                }
                TemplateRef_.prototype.createEmbeddedView = function(context) {
                    return new ViewRef_(Services.createEmbeddedView(this._parentView, this._def, this._def.element.template, context));
                };
                Object.defineProperty(TemplateRef_.prototype, "elementRef", {
                    get: function() {
                        return new ElementRef(asElementData(this._parentView, this._def.nodeIndex).renderElement);
                    },
                    enumerable: true,
                    configurable: true
                });
                return TemplateRef_;
            }(TemplateRef);
            function createInjector(view, elDef) {
                return new Injector_(view, elDef);
            }
            var Injector_ = function() {
                function Injector_(view, elDef) {
                    this.view = view;
                    this.elDef = elDef;
                }
                Injector_.prototype.get = function(token, notFoundValue) {
                    if (notFoundValue === void 0) {
                        notFoundValue = Injector.THROW_IF_NOT_FOUND;
                    }
                    var allowPrivateServices = this.elDef ? (this.elDef.flags & 33554432) !== 0 : false;
                    return Services.resolveDep(this.view, this.elDef, allowPrivateServices, {
                        flags: 0,
                        token: token,
                        tokenKey: tokenKey(token)
                    }, notFoundValue);
                };
                return Injector_;
            }();
            function nodeValue(view, index) {
                var def = view.def.nodes[index];
                if (def.flags & 1) {
                    var elData = asElementData(view, def.nodeIndex);
                    return def.element.template ? elData.template : elData.renderElement;
                } else if (def.flags & 2) {
                    return asTextData(view, def.nodeIndex).renderText;
                } else if (def.flags & (20224 | 16)) {
                    return asProviderData(view, def.nodeIndex).instance;
                }
                throw new Error("Illegal state: read nodeValue for node index " + index);
            }
            function createRendererV1(view) {
                return new RendererAdapter(view.renderer);
            }
            var RendererAdapter = function() {
                function RendererAdapter(delegate) {
                    this.delegate = delegate;
                }
                RendererAdapter.prototype.selectRootElement = function(selectorOrNode) {
                    return this.delegate.selectRootElement(selectorOrNode);
                };
                RendererAdapter.prototype.createElement = function(parent, namespaceAndName) {
                    var _a = splitNamespace(namespaceAndName), ns = _a[0], name = _a[1];
                    var el = this.delegate.createElement(name, ns);
                    if (parent) {
                        this.delegate.appendChild(parent, el);
                    }
                    return el;
                };
                RendererAdapter.prototype.createViewRoot = function(hostElement) {
                    return hostElement;
                };
                RendererAdapter.prototype.createTemplateAnchor = function(parentElement) {
                    var comment = this.delegate.createComment("");
                    if (parentElement) {
                        this.delegate.appendChild(parentElement, comment);
                    }
                    return comment;
                };
                RendererAdapter.prototype.createText = function(parentElement, value) {
                    var node = this.delegate.createText(value);
                    if (parentElement) {
                        this.delegate.appendChild(parentElement, node);
                    }
                    return node;
                };
                RendererAdapter.prototype.projectNodes = function(parentElement, nodes) {
                    for (var i = 0; i < nodes.length; i++) {
                        this.delegate.appendChild(parentElement, nodes[i]);
                    }
                };
                RendererAdapter.prototype.attachViewAfter = function(node, viewRootNodes) {
                    var parentElement = this.delegate.parentNode(node);
                    var nextSibling = this.delegate.nextSibling(node);
                    for (var i = 0; i < viewRootNodes.length; i++) {
                        this.delegate.insertBefore(parentElement, viewRootNodes[i], nextSibling);
                    }
                };
                RendererAdapter.prototype.detachView = function(viewRootNodes) {
                    for (var i = 0; i < viewRootNodes.length; i++) {
                        var node = viewRootNodes[i];
                        var parentElement = this.delegate.parentNode(node);
                        this.delegate.removeChild(parentElement, node);
                    }
                };
                RendererAdapter.prototype.destroyView = function(hostElement, viewAllNodes) {
                    for (var i = 0; i < viewAllNodes.length; i++) {
                        this.delegate.destroyNode(viewAllNodes[i]);
                    }
                };
                RendererAdapter.prototype.listen = function(renderElement, name, callback) {
                    return this.delegate.listen(renderElement, name, callback);
                };
                RendererAdapter.prototype.listenGlobal = function(target, name, callback) {
                    return this.delegate.listen(target, name, callback);
                };
                RendererAdapter.prototype.setElementProperty = function(renderElement, propertyName, propertyValue) {
                    this.delegate.setProperty(renderElement, propertyName, propertyValue);
                };
                RendererAdapter.prototype.setElementAttribute = function(renderElement, namespaceAndName, attributeValue) {
                    var _a = splitNamespace(namespaceAndName), ns = _a[0], name = _a[1];
                    if (attributeValue != null) {
                        this.delegate.setAttribute(renderElement, name, attributeValue, ns);
                    } else {
                        this.delegate.removeAttribute(renderElement, name, ns);
                    }
                };
                RendererAdapter.prototype.setBindingDebugInfo = function(renderElement, propertyName, propertyValue) {};
                RendererAdapter.prototype.setElementClass = function(renderElement, className, isAdd) {
                    if (isAdd) {
                        this.delegate.addClass(renderElement, className);
                    } else {
                        this.delegate.removeClass(renderElement, className);
                    }
                };
                RendererAdapter.prototype.setElementStyle = function(renderElement, styleName, styleValue) {
                    if (styleValue != null) {
                        this.delegate.setStyle(renderElement, styleName, styleValue);
                    } else {
                        this.delegate.removeStyle(renderElement, styleName);
                    }
                };
                RendererAdapter.prototype.invokeElementMethod = function(renderElement, methodName, args) {
                    renderElement[methodName].apply(renderElement, args);
                };
                RendererAdapter.prototype.setText = function(renderNode$$1, text) {
                    this.delegate.setValue(renderNode$$1, text);
                };
                RendererAdapter.prototype.animate = function() {
                    throw new Error("Renderer.animate is no longer supported!");
                };
                return RendererAdapter;
            }();
            function createNgModuleRef(moduleType, parent, bootstrapComponents, def) {
                return new NgModuleRef_(moduleType, parent, bootstrapComponents, def);
            }
            var NgModuleRef_ = function() {
                function NgModuleRef_(_moduleType, _parent, _bootstrapComponents, _def) {
                    this._moduleType = _moduleType;
                    this._parent = _parent;
                    this._bootstrapComponents = _bootstrapComponents;
                    this._def = _def;
                    this._destroyListeners = [];
                    this._destroyed = false;
                    initNgModule(this);
                }
                NgModuleRef_.prototype.get = function(token, notFoundValue) {
                    if (notFoundValue === void 0) {
                        notFoundValue = Injector.THROW_IF_NOT_FOUND;
                    }
                    return resolveNgModuleDep(this, {
                        token: token,
                        tokenKey: tokenKey(token),
                        flags: 0
                    }, notFoundValue);
                };
                Object.defineProperty(NgModuleRef_.prototype, "instance", {
                    get: function() {
                        return this.get(this._moduleType);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgModuleRef_.prototype, "componentFactoryResolver", {
                    get: function() {
                        return this.get(ComponentFactoryResolver);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgModuleRef_.prototype, "injector", {
                    get: function() {
                        return this;
                    },
                    enumerable: true,
                    configurable: true
                });
                NgModuleRef_.prototype.destroy = function() {
                    if (this._destroyed) {
                        throw new Error("The ng module " + stringify(this.instance.constructor) + " has already been destroyed.");
                    }
                    this._destroyed = true;
                    callNgModuleLifecycle(this, 131072);
                    this._destroyListeners.forEach(function(listener) {
                        return listener();
                    });
                };
                NgModuleRef_.prototype.onDestroy = function(callback) {
                    this._destroyListeners.push(callback);
                };
                return NgModuleRef_;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var RendererV1TokenKey = tokenKey(Renderer);
            var Renderer2TokenKey = tokenKey(Renderer2);
            var ElementRefTokenKey = tokenKey(ElementRef);
            var ViewContainerRefTokenKey = tokenKey(ViewContainerRef);
            var TemplateRefTokenKey = tokenKey(TemplateRef);
            var ChangeDetectorRefTokenKey = tokenKey(ChangeDetectorRef);
            var InjectorRefTokenKey = tokenKey(Injector);
            function directiveDef(checkIndex, flags, matchedQueries, childCount, ctor, deps, props, outputs) {
                var bindings = [];
                if (props) {
                    for (var prop in props) {
                        var _a = props[prop], bindingIndex = _a[0], nonMinifiedName = _a[1];
                        bindings[bindingIndex] = {
                            flags: 8,
                            name: prop,
                            nonMinifiedName: nonMinifiedName,
                            ns: null,
                            securityContext: null,
                            suffix: null
                        };
                    }
                }
                var outputDefs = [];
                if (outputs) {
                    for (var propName in outputs) {
                        outputDefs.push({
                            type: 1,
                            propName: propName,
                            target: null,
                            eventName: outputs[propName]
                        });
                    }
                }
                flags |= 16384;
                return _def(checkIndex, flags, matchedQueries, childCount, ctor, ctor, deps, bindings, outputDefs);
            }
            function pipeDef(flags, ctor, deps) {
                flags |= 16;
                return _def(-1, flags, null, 0, ctor, ctor, deps);
            }
            function providerDef(flags, matchedQueries, token, value, deps) {
                return _def(-1, flags, matchedQueries, 0, token, value, deps);
            }
            function _def(checkIndex, flags, matchedQueriesDsl, childCount, token, value, deps, bindings, outputs) {
                var _a = splitMatchedQueriesDsl(matchedQueriesDsl), matchedQueries = _a.matchedQueries, references = _a.references, matchedQueryIds = _a.matchedQueryIds;
                if (!outputs) {
                    outputs = [];
                }
                if (!bindings) {
                    bindings = [];
                }
                var depDefs = splitDepsDsl(deps);
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: checkIndex,
                    flags: flags,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: matchedQueries,
                    matchedQueryIds: matchedQueryIds,
                    references: references,
                    ngContentIndex: -1,
                    childCount: childCount,
                    bindings: bindings,
                    bindingFlags: calcBindingFlags(bindings),
                    outputs: outputs,
                    element: null,
                    provider: {
                        token: token,
                        value: value,
                        deps: depDefs
                    },
                    text: null,
                    query: null,
                    ngContent: null
                };
            }
            function createProviderInstance(view, def) {
                return _createProviderInstance(view, def);
            }
            function createPipeInstance(view, def) {
                var compView = view;
                while (compView.parent && !isComponentView(compView)) {
                    compView = compView.parent;
                }
                var allowPrivateServices = true;
                return createClass(compView.parent, viewParentEl(compView), allowPrivateServices, def.provider.value, def.provider.deps);
            }
            function createDirectiveInstance(view, def) {
                var allowPrivateServices = (def.flags & 32768) > 0;
                var instance = createClass(view, def.parent, allowPrivateServices, def.provider.value, def.provider.deps);
                if (def.outputs.length) {
                    for (var i = 0; i < def.outputs.length; i++) {
                        var output = def.outputs[i];
                        var subscription = instance[output.propName].subscribe(eventHandlerClosure(view, def.parent.nodeIndex, output.eventName));
                        view.disposables[def.outputIndex + i] = subscription.unsubscribe.bind(subscription);
                    }
                }
                return instance;
            }
            function eventHandlerClosure(view, index, eventName) {
                return function(event) {
                    try {
                        return dispatchEvent(view, index, eventName, event);
                    } catch (e) {
                        view.root.errorHandler.handleError(e);
                    }
                };
            }
            function checkAndUpdateDirectiveInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                var providerData = asProviderData(view, def.nodeIndex);
                var directive = providerData.instance;
                var changed = false;
                var changes = undefined;
                var bindLen = def.bindings.length;
                if (bindLen > 0 && checkBinding(view, def, 0, v0)) {
                    changed = true;
                    changes = updateProp(view, providerData, def, 0, v0, changes);
                }
                if (bindLen > 1 && checkBinding(view, def, 1, v1)) {
                    changed = true;
                    changes = updateProp(view, providerData, def, 1, v1, changes);
                }
                if (bindLen > 2 && checkBinding(view, def, 2, v2)) {
                    changed = true;
                    changes = updateProp(view, providerData, def, 2, v2, changes);
                }
                if (bindLen > 3 && checkBinding(view, def, 3, v3)) {
                    changed = true;
                    changes = updateProp(view, providerData, def, 3, v3, changes);
                }
                if (bindLen > 4 && checkBinding(view, def, 4, v4)) {
                    changed = true;
                    changes = updateProp(view, providerData, def, 4, v4, changes);
                }
                if (bindLen > 5 && checkBinding(view, def, 5, v5)) {
                    changed = true;
                    changes = updateProp(view, providerData, def, 5, v5, changes);
                }
                if (bindLen > 6 && checkBinding(view, def, 6, v6)) {
                    changed = true;
                    changes = updateProp(view, providerData, def, 6, v6, changes);
                }
                if (bindLen > 7 && checkBinding(view, def, 7, v7)) {
                    changed = true;
                    changes = updateProp(view, providerData, def, 7, v7, changes);
                }
                if (bindLen > 8 && checkBinding(view, def, 8, v8)) {
                    changed = true;
                    changes = updateProp(view, providerData, def, 8, v8, changes);
                }
                if (bindLen > 9 && checkBinding(view, def, 9, v9)) {
                    changed = true;
                    changes = updateProp(view, providerData, def, 9, v9, changes);
                }
                if (changes) {
                    directive.ngOnChanges(changes);
                }
                if (view.state & 2 && def.flags & 65536) {
                    directive.ngOnInit();
                }
                if (def.flags & 262144) {
                    directive.ngDoCheck();
                }
                return changed;
            }
            function checkAndUpdateDirectiveDynamic(view, def, values) {
                var providerData = asProviderData(view, def.nodeIndex);
                var directive = providerData.instance;
                var changed = false;
                var changes = undefined;
                for (var i = 0; i < values.length; i++) {
                    if (checkBinding(view, def, i, values[i])) {
                        changed = true;
                        changes = updateProp(view, providerData, def, i, values[i], changes);
                    }
                }
                if (changes) {
                    directive.ngOnChanges(changes);
                }
                if (view.state & 2 && def.flags & 65536) {
                    directive.ngOnInit();
                }
                if (def.flags & 262144) {
                    directive.ngDoCheck();
                }
                return changed;
            }
            function _createProviderInstance(view, def) {
                var allowPrivateServices = (def.flags & 8192) > 0;
                var providerDef = def.provider;
                switch (def.flags & 201347067) {
                  case 512:
                    return createClass(view, def.parent, allowPrivateServices, providerDef.value, providerDef.deps);

                  case 1024:
                    return callFactory(view, def.parent, allowPrivateServices, providerDef.value, providerDef.deps);

                  case 2048:
                    return resolveDep(view, def.parent, allowPrivateServices, providerDef.deps[0]);

                  case 256:
                    return providerDef.value;
                }
            }
            function createClass(view, elDef, allowPrivateServices, ctor, deps) {
                var len = deps.length;
                switch (len) {
                  case 0:
                    return new ctor();

                  case 1:
                    return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]));

                  case 2:
                    return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));

                  case 3:
                    return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));

                  default:
                    var depValues = new Array(len);
                    for (var i = 0; i < len; i++) {
                        depValues[i] = resolveDep(view, elDef, allowPrivateServices, deps[i]);
                    }
                    return new (ctor.bind.apply(ctor, [ void 0 ].concat(depValues)))();
                }
            }
            function callFactory(view, elDef, allowPrivateServices, factory, deps) {
                var len = deps.length;
                switch (len) {
                  case 0:
                    return factory();

                  case 1:
                    return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]));

                  case 2:
                    return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));

                  case 3:
                    return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));

                  default:
                    var depValues = Array(len);
                    for (var i = 0; i < len; i++) {
                        depValues[i] = resolveDep(view, elDef, allowPrivateServices, deps[i]);
                    }
                    return factory.apply(void 0, depValues);
                }
            }
            var NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {};
            function resolveDep(view, elDef, allowPrivateServices, depDef, notFoundValue) {
                if (notFoundValue === void 0) {
                    notFoundValue = Injector.THROW_IF_NOT_FOUND;
                }
                if (depDef.flags & 8) {
                    return depDef.token;
                }
                var startView = view;
                if (depDef.flags & 2) {
                    notFoundValue = null;
                }
                var tokenKey$$1 = depDef.tokenKey;
                if (tokenKey$$1 === ChangeDetectorRefTokenKey) {
                    allowPrivateServices = !!(elDef && elDef.element.componentView);
                }
                if (elDef && depDef.flags & 1) {
                    allowPrivateServices = false;
                    elDef = elDef.parent;
                }
                while (view) {
                    if (elDef) {
                        switch (tokenKey$$1) {
                          case RendererV1TokenKey:
                            {
                                var compView = findCompView(view, elDef, allowPrivateServices);
                                return createRendererV1(compView);
                            }

                          case Renderer2TokenKey:
                            {
                                var compView = findCompView(view, elDef, allowPrivateServices);
                                return compView.renderer;
                            }

                          case ElementRefTokenKey:
                            return new ElementRef(asElementData(view, elDef.nodeIndex).renderElement);

                          case ViewContainerRefTokenKey:
                            return asElementData(view, elDef.nodeIndex).viewContainer;

                          case TemplateRefTokenKey:
                            {
                                if (elDef.element.template) {
                                    return asElementData(view, elDef.nodeIndex).template;
                                }
                                break;
                            }

                          case ChangeDetectorRefTokenKey:
                            {
                                var cdView = findCompView(view, elDef, allowPrivateServices);
                                return createChangeDetectorRef(cdView);
                            }

                          case InjectorRefTokenKey:
                            return createInjector(view, elDef);

                          default:
                            var providerDef_1 = (allowPrivateServices ? elDef.element.allProviders : elDef.element.publicProviders)[tokenKey$$1];
                            if (providerDef_1) {
                                var providerData = asProviderData(view, providerDef_1.nodeIndex);
                                if (!providerData) {
                                    providerData = {
                                        instance: _createProviderInstance(view, providerDef_1)
                                    };
                                    view.nodes[providerDef_1.nodeIndex] = providerData;
                                }
                                return providerData.instance;
                            }
                        }
                    }
                    allowPrivateServices = isComponentView(view);
                    elDef = viewParentEl(view);
                    view = view.parent;
                }
                var value = startView.root.injector.get(depDef.token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR);
                if (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR || notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) {
                    return value;
                }
                return startView.root.ngModule.injector.get(depDef.token, notFoundValue);
            }
            function findCompView(view, elDef, allowPrivateServices) {
                var compView;
                if (allowPrivateServices) {
                    compView = asElementData(view, elDef.nodeIndex).componentView;
                } else {
                    compView = view;
                    while (compView.parent && !isComponentView(compView)) {
                        compView = compView.parent;
                    }
                }
                return compView;
            }
            function updateProp(view, providerData, def, bindingIdx, value, changes) {
                if (def.flags & 32768) {
                    var compView = asElementData(view, def.parent.nodeIndex).componentView;
                    if (compView.def.flags & 2) {
                        compView.state |= 8;
                    }
                }
                var binding = def.bindings[bindingIdx];
                var propName = binding.name;
                providerData.instance[propName] = value;
                if (def.flags & 524288) {
                    changes = changes || {};
                    var oldValue = view.oldValues[def.bindingIndex + bindingIdx];
                    if (oldValue instanceof WrappedValue) {
                        oldValue = oldValue.wrapped;
                    }
                    var binding_1 = def.bindings[bindingIdx];
                    changes[binding_1.nonMinifiedName] = new SimpleChange(oldValue, value, (view.state & 2) !== 0);
                }
                view.oldValues[def.bindingIndex + bindingIdx] = value;
                return changes;
            }
            function callLifecycleHooksChildrenFirst(view, lifecycles) {
                if (!(view.def.nodeFlags & lifecycles)) {
                    return;
                }
                var nodes = view.def.nodes;
                for (var i = 0; i < nodes.length; i++) {
                    var nodeDef = nodes[i];
                    var parent = nodeDef.parent;
                    if (!parent && nodeDef.flags & lifecycles) {
                        callProviderLifecycles(view, i, nodeDef.flags & lifecycles);
                    }
                    if ((nodeDef.childFlags & lifecycles) === 0) {
                        i += nodeDef.childCount;
                    }
                    while (parent && parent.flags & 1 && i === parent.nodeIndex + parent.childCount) {
                        if (parent.directChildFlags & lifecycles) {
                            callElementProvidersLifecycles(view, parent, lifecycles);
                        }
                        parent = parent.parent;
                    }
                }
            }
            function callElementProvidersLifecycles(view, elDef, lifecycles) {
                for (var i = elDef.nodeIndex + 1; i <= elDef.nodeIndex + elDef.childCount; i++) {
                    var nodeDef = view.def.nodes[i];
                    if (nodeDef.flags & lifecycles) {
                        callProviderLifecycles(view, i, nodeDef.flags & lifecycles);
                    }
                    i += nodeDef.childCount;
                }
            }
            function callProviderLifecycles(view, index, lifecycles) {
                var providerData = asProviderData(view, index);
                if (!providerData) {
                    return;
                }
                var provider = providerData.instance;
                if (!provider) {
                    return;
                }
                Services.setCurrentNode(view, index);
                if (lifecycles & 1048576) {
                    provider.ngAfterContentInit();
                }
                if (lifecycles & 2097152) {
                    provider.ngAfterContentChecked();
                }
                if (lifecycles & 4194304) {
                    provider.ngAfterViewInit();
                }
                if (lifecycles & 8388608) {
                    provider.ngAfterViewChecked();
                }
                if (lifecycles & 131072) {
                    provider.ngOnDestroy();
                }
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function queryDef(flags, id, bindings) {
                var bindingDefs = [];
                for (var propName in bindings) {
                    var bindingType = bindings[propName];
                    bindingDefs.push({
                        propName: propName,
                        bindingType: bindingType
                    });
                }
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: -1,
                    flags: flags,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    ngContentIndex: -1,
                    matchedQueries: {},
                    matchedQueryIds: 0,
                    references: {},
                    childCount: 0,
                    bindings: [],
                    bindingFlags: 0,
                    outputs: [],
                    element: null,
                    provider: null,
                    text: null,
                    query: {
                        id: id,
                        filterId: filterQueryId(id),
                        bindings: bindingDefs
                    },
                    ngContent: null
                };
            }
            function createQuery() {
                return new QueryList();
            }
            function dirtyParentQueries(view) {
                var queryIds = view.def.nodeMatchedQueries;
                while (view.parent && isEmbeddedView(view)) {
                    var tplDef = view.parentNodeDef;
                    view = view.parent;
                    var end = tplDef.nodeIndex + tplDef.childCount;
                    for (var i = 0; i <= end; i++) {
                        var nodeDef = view.def.nodes[i];
                        if (nodeDef.flags & 67108864 && nodeDef.flags & 536870912 && (nodeDef.query.filterId & queryIds) === nodeDef.query.filterId) {
                            asQueryList(view, i).setDirty();
                        }
                        if (nodeDef.flags & 1 && i + nodeDef.childCount < tplDef.nodeIndex || !(nodeDef.childFlags & 67108864) || !(nodeDef.childFlags & 536870912)) {
                            i += nodeDef.childCount;
                        }
                    }
                }
                if (view.def.nodeFlags & 134217728) {
                    for (var i = 0; i < view.def.nodes.length; i++) {
                        var nodeDef = view.def.nodes[i];
                        if (nodeDef.flags & 134217728 && nodeDef.flags & 536870912) {
                            asQueryList(view, i).setDirty();
                        }
                        i += nodeDef.childCount;
                    }
                }
            }
            function checkAndUpdateQuery(view, nodeDef) {
                var queryList = asQueryList(view, nodeDef.nodeIndex);
                if (!queryList.dirty) {
                    return;
                }
                var directiveInstance;
                var newValues = undefined;
                if (nodeDef.flags & 67108864) {
                    var elementDef_1 = nodeDef.parent.parent;
                    newValues = calcQueryValues(view, elementDef_1.nodeIndex, elementDef_1.nodeIndex + elementDef_1.childCount, nodeDef.query, []);
                    directiveInstance = asProviderData(view, nodeDef.parent.nodeIndex).instance;
                } else if (nodeDef.flags & 134217728) {
                    newValues = calcQueryValues(view, 0, view.def.nodes.length - 1, nodeDef.query, []);
                    directiveInstance = view.component;
                }
                queryList.reset(newValues);
                var bindings = nodeDef.query.bindings;
                var notify = false;
                for (var i = 0; i < bindings.length; i++) {
                    var binding = bindings[i];
                    var boundValue = void 0;
                    switch (binding.bindingType) {
                      case 0:
                        boundValue = queryList.first;
                        break;

                      case 1:
                        boundValue = queryList;
                        notify = true;
                        break;
                    }
                    directiveInstance[binding.propName] = boundValue;
                }
                if (notify) {
                    queryList.notifyOnChanges();
                }
            }
            function calcQueryValues(view, startIndex, endIndex, queryDef, values) {
                for (var i = startIndex; i <= endIndex; i++) {
                    var nodeDef = view.def.nodes[i];
                    var valueType = nodeDef.matchedQueries[queryDef.id];
                    if (valueType != null) {
                        values.push(getQueryValue(view, nodeDef, valueType));
                    }
                    if (nodeDef.flags & 1 && nodeDef.element.template && (nodeDef.element.template.nodeMatchedQueries & queryDef.filterId) === queryDef.filterId) {
                        var elementData = asElementData(view, i);
                        if ((nodeDef.childMatchedQueries & queryDef.filterId) === queryDef.filterId) {
                            calcQueryValues(view, i + 1, i + nodeDef.childCount, queryDef, values);
                            i += nodeDef.childCount;
                        }
                        if (nodeDef.flags & 16777216) {
                            var embeddedViews = elementData.viewContainer._embeddedViews;
                            for (var k = 0; k < embeddedViews.length; k++) {
                                var embeddedView = embeddedViews[k];
                                var dvc = declaredViewContainer(embeddedView);
                                if (dvc && dvc === elementData) {
                                    calcQueryValues(embeddedView, 0, embeddedView.def.nodes.length - 1, queryDef, values);
                                }
                            }
                        }
                        var projectedViews = elementData.template._projectedViews;
                        if (projectedViews) {
                            for (var k = 0; k < projectedViews.length; k++) {
                                var projectedView = projectedViews[k];
                                calcQueryValues(projectedView, 0, projectedView.def.nodes.length - 1, queryDef, values);
                            }
                        }
                    }
                    if ((nodeDef.childMatchedQueries & queryDef.filterId) !== queryDef.filterId) {
                        i += nodeDef.childCount;
                    }
                }
                return values;
            }
            function getQueryValue(view, nodeDef, queryValueType) {
                if (queryValueType != null) {
                    switch (queryValueType) {
                      case 1:
                        return asElementData(view, nodeDef.nodeIndex).renderElement;

                      case 0:
                        return new ElementRef(asElementData(view, nodeDef.nodeIndex).renderElement);

                      case 2:
                        return asElementData(view, nodeDef.nodeIndex).template;

                      case 3:
                        return asElementData(view, nodeDef.nodeIndex).viewContainer;

                      case 4:
                        return asProviderData(view, nodeDef.nodeIndex).instance;
                    }
                }
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function ngContentDef(ngContentIndex, index) {
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: -1,
                    flags: 8,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: {},
                    matchedQueryIds: 0,
                    references: {},
                    ngContentIndex: ngContentIndex,
                    childCount: 0,
                    bindings: [],
                    bindingFlags: 0,
                    outputs: [],
                    element: null,
                    provider: null,
                    text: null,
                    query: null,
                    ngContent: {
                        index: index
                    }
                };
            }
            function appendNgContent(view, renderHost, def) {
                var parentEl = getParentRenderElement(view, renderHost, def);
                if (!parentEl) {
                    return;
                }
                var ngContentIndex = def.ngContent.index;
                visitProjectedRenderNodes(view, ngContentIndex, 1, parentEl, null, undefined);
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function purePipeDef(checkIndex, argCount) {
                return _pureExpressionDef(128, checkIndex, new Array(argCount + 1));
            }
            function pureArrayDef(checkIndex, argCount) {
                return _pureExpressionDef(32, checkIndex, new Array(argCount));
            }
            function pureObjectDef(checkIndex, propToIndex) {
                var keys = Object.keys(propToIndex);
                var nbKeys = keys.length;
                var propertyNames = new Array(nbKeys);
                for (var i = 0; i < nbKeys; i++) {
                    var key = keys[i];
                    var index = propToIndex[key];
                    propertyNames[index] = key;
                }
                return _pureExpressionDef(64, checkIndex, propertyNames);
            }
            function _pureExpressionDef(flags, checkIndex, propertyNames) {
                var bindings = new Array(propertyNames.length);
                for (var i = 0; i < propertyNames.length; i++) {
                    var prop = propertyNames[i];
                    bindings[i] = {
                        flags: 8,
                        name: prop,
                        ns: null,
                        nonMinifiedName: prop,
                        securityContext: null,
                        suffix: null
                    };
                }
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: checkIndex,
                    flags: flags,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: {},
                    matchedQueryIds: 0,
                    references: {},
                    ngContentIndex: -1,
                    childCount: 0,
                    bindings: bindings,
                    bindingFlags: calcBindingFlags(bindings),
                    outputs: [],
                    element: null,
                    provider: null,
                    text: null,
                    query: null,
                    ngContent: null
                };
            }
            function createPureExpression(view, def) {
                return {
                    value: undefined
                };
            }
            function checkAndUpdatePureExpressionInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                var bindings = def.bindings;
                var changed = false;
                var bindLen = bindings.length;
                if (bindLen > 0 && checkAndUpdateBinding(view, def, 0, v0)) changed = true;
                if (bindLen > 1 && checkAndUpdateBinding(view, def, 1, v1)) changed = true;
                if (bindLen > 2 && checkAndUpdateBinding(view, def, 2, v2)) changed = true;
                if (bindLen > 3 && checkAndUpdateBinding(view, def, 3, v3)) changed = true;
                if (bindLen > 4 && checkAndUpdateBinding(view, def, 4, v4)) changed = true;
                if (bindLen > 5 && checkAndUpdateBinding(view, def, 5, v5)) changed = true;
                if (bindLen > 6 && checkAndUpdateBinding(view, def, 6, v6)) changed = true;
                if (bindLen > 7 && checkAndUpdateBinding(view, def, 7, v7)) changed = true;
                if (bindLen > 8 && checkAndUpdateBinding(view, def, 8, v8)) changed = true;
                if (bindLen > 9 && checkAndUpdateBinding(view, def, 9, v9)) changed = true;
                if (changed) {
                    var data = asPureExpressionData(view, def.nodeIndex);
                    var value = void 0;
                    switch (def.flags & 201347067) {
                      case 32:
                        value = new Array(bindings.length);
                        if (bindLen > 0) value[0] = v0;
                        if (bindLen > 1) value[1] = v1;
                        if (bindLen > 2) value[2] = v2;
                        if (bindLen > 3) value[3] = v3;
                        if (bindLen > 4) value[4] = v4;
                        if (bindLen > 5) value[5] = v5;
                        if (bindLen > 6) value[6] = v6;
                        if (bindLen > 7) value[7] = v7;
                        if (bindLen > 8) value[8] = v8;
                        if (bindLen > 9) value[9] = v9;
                        break;

                      case 64:
                        value = {};
                        if (bindLen > 0) value[bindings[0].name] = v0;
                        if (bindLen > 1) value[bindings[1].name] = v1;
                        if (bindLen > 2) value[bindings[2].name] = v2;
                        if (bindLen > 3) value[bindings[3].name] = v3;
                        if (bindLen > 4) value[bindings[4].name] = v4;
                        if (bindLen > 5) value[bindings[5].name] = v5;
                        if (bindLen > 6) value[bindings[6].name] = v6;
                        if (bindLen > 7) value[bindings[7].name] = v7;
                        if (bindLen > 8) value[bindings[8].name] = v8;
                        if (bindLen > 9) value[bindings[9].name] = v9;
                        break;

                      case 128:
                        var pipe = v0;
                        switch (bindLen) {
                          case 1:
                            value = pipe.transform(v0);
                            break;

                          case 2:
                            value = pipe.transform(v1);
                            break;

                          case 3:
                            value = pipe.transform(v1, v2);
                            break;

                          case 4:
                            value = pipe.transform(v1, v2, v3);
                            break;

                          case 5:
                            value = pipe.transform(v1, v2, v3, v4);
                            break;

                          case 6:
                            value = pipe.transform(v1, v2, v3, v4, v5);
                            break;

                          case 7:
                            value = pipe.transform(v1, v2, v3, v4, v5, v6);
                            break;

                          case 8:
                            value = pipe.transform(v1, v2, v3, v4, v5, v6, v7);
                            break;

                          case 9:
                            value = pipe.transform(v1, v2, v3, v4, v5, v6, v7, v8);
                            break;

                          case 10:
                            value = pipe.transform(v1, v2, v3, v4, v5, v6, v7, v8, v9);
                            break;
                        }
                        break;
                    }
                    data.value = value;
                }
                return changed;
            }
            function checkAndUpdatePureExpressionDynamic(view, def, values) {
                var bindings = def.bindings;
                var changed = false;
                for (var i = 0; i < values.length; i++) {
                    if (checkAndUpdateBinding(view, def, i, values[i])) {
                        changed = true;
                    }
                }
                if (changed) {
                    var data = asPureExpressionData(view, def.nodeIndex);
                    var value = void 0;
                    switch (def.flags & 201347067) {
                      case 32:
                        value = values;
                        break;

                      case 64:
                        value = {};
                        for (var i = 0; i < values.length; i++) {
                            value[bindings[i].name] = values[i];
                        }
                        break;

                      case 128:
                        var pipe = values[0];
                        var params = values.slice(1);
                        value = pipe.transform.apply(pipe, params);
                        break;
                    }
                    data.value = value;
                }
                return changed;
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function textDef(checkIndex, ngContentIndex, staticText) {
                var bindings = new Array(staticText.length - 1);
                for (var i = 1; i < staticText.length; i++) {
                    bindings[i - 1] = {
                        flags: 8,
                        name: null,
                        ns: null,
                        nonMinifiedName: null,
                        securityContext: null,
                        suffix: staticText[i]
                    };
                }
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: checkIndex,
                    flags: 2,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: {},
                    matchedQueryIds: 0,
                    references: {},
                    ngContentIndex: ngContentIndex,
                    childCount: 0,
                    bindings: bindings,
                    bindingFlags: 8,
                    outputs: [],
                    element: null,
                    provider: null,
                    text: {
                        prefix: staticText[0]
                    },
                    query: null,
                    ngContent: null
                };
            }
            function createText(view, renderHost, def) {
                var renderNode$$1;
                var renderer = view.renderer;
                renderNode$$1 = renderer.createText(def.text.prefix);
                var parentEl = getParentRenderElement(view, renderHost, def);
                if (parentEl) {
                    renderer.appendChild(parentEl, renderNode$$1);
                }
                return {
                    renderText: renderNode$$1
                };
            }
            function checkAndUpdateTextInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                var changed = false;
                var bindings = def.bindings;
                var bindLen = bindings.length;
                if (bindLen > 0 && checkAndUpdateBinding(view, def, 0, v0)) changed = true;
                if (bindLen > 1 && checkAndUpdateBinding(view, def, 1, v1)) changed = true;
                if (bindLen > 2 && checkAndUpdateBinding(view, def, 2, v2)) changed = true;
                if (bindLen > 3 && checkAndUpdateBinding(view, def, 3, v3)) changed = true;
                if (bindLen > 4 && checkAndUpdateBinding(view, def, 4, v4)) changed = true;
                if (bindLen > 5 && checkAndUpdateBinding(view, def, 5, v5)) changed = true;
                if (bindLen > 6 && checkAndUpdateBinding(view, def, 6, v6)) changed = true;
                if (bindLen > 7 && checkAndUpdateBinding(view, def, 7, v7)) changed = true;
                if (bindLen > 8 && checkAndUpdateBinding(view, def, 8, v8)) changed = true;
                if (bindLen > 9 && checkAndUpdateBinding(view, def, 9, v9)) changed = true;
                if (changed) {
                    var value = def.text.prefix;
                    if (bindLen > 0) value += _addInterpolationPart(v0, bindings[0]);
                    if (bindLen > 1) value += _addInterpolationPart(v1, bindings[1]);
                    if (bindLen > 2) value += _addInterpolationPart(v2, bindings[2]);
                    if (bindLen > 3) value += _addInterpolationPart(v3, bindings[3]);
                    if (bindLen > 4) value += _addInterpolationPart(v4, bindings[4]);
                    if (bindLen > 5) value += _addInterpolationPart(v5, bindings[5]);
                    if (bindLen > 6) value += _addInterpolationPart(v6, bindings[6]);
                    if (bindLen > 7) value += _addInterpolationPart(v7, bindings[7]);
                    if (bindLen > 8) value += _addInterpolationPart(v8, bindings[8]);
                    if (bindLen > 9) value += _addInterpolationPart(v9, bindings[9]);
                    var renderNode$$1 = asTextData(view, def.nodeIndex).renderText;
                    view.renderer.setValue(renderNode$$1, value);
                }
                return changed;
            }
            function checkAndUpdateTextDynamic(view, def, values) {
                var bindings = def.bindings;
                var changed = false;
                for (var i = 0; i < values.length; i++) {
                    if (checkAndUpdateBinding(view, def, i, values[i])) {
                        changed = true;
                    }
                }
                if (changed) {
                    var value = "";
                    for (var i = 0; i < values.length; i++) {
                        value = value + _addInterpolationPart(values[i], bindings[i]);
                    }
                    value = def.text.prefix + value;
                    var renderNode$$1 = asTextData(view, def.nodeIndex).renderText;
                    view.renderer.setValue(renderNode$$1, value);
                }
                return changed;
            }
            function _addInterpolationPart(value, binding) {
                var valueStr = value != null ? value.toString() : "";
                return valueStr + binding.suffix;
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function viewDef(flags, nodes, updateDirectives, updateRenderer) {
                var viewBindingCount = 0;
                var viewDisposableCount = 0;
                var viewNodeFlags = 0;
                var viewRootNodeFlags = 0;
                var viewMatchedQueries = 0;
                var currentParent = null;
                var currentRenderParent = null;
                var currentElementHasPublicProviders = false;
                var currentElementHasPrivateProviders = false;
                var lastRenderRootNode = null;
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    node.nodeIndex = i;
                    node.parent = currentParent;
                    node.bindingIndex = viewBindingCount;
                    node.outputIndex = viewDisposableCount;
                    node.renderParent = currentRenderParent;
                    viewNodeFlags |= node.flags;
                    viewMatchedQueries |= node.matchedQueryIds;
                    if (node.element) {
                        var elDef = node.element;
                        elDef.publicProviders = currentParent ? currentParent.element.publicProviders : Object.create(null);
                        elDef.allProviders = elDef.publicProviders;
                        currentElementHasPublicProviders = false;
                        currentElementHasPrivateProviders = false;
                        if (node.element.template) {
                            viewMatchedQueries |= node.element.template.nodeMatchedQueries;
                        }
                    }
                    validateNode(currentParent, node, nodes.length);
                    viewBindingCount += node.bindings.length;
                    viewDisposableCount += node.outputs.length;
                    if (!currentRenderParent && node.flags & 3) {
                        lastRenderRootNode = node;
                    }
                    if (node.flags & 20224) {
                        if (!currentElementHasPublicProviders) {
                            currentElementHasPublicProviders = true;
                            currentParent.element.publicProviders = Object.create(currentParent.element.publicProviders);
                            currentParent.element.allProviders = currentParent.element.publicProviders;
                        }
                        var isPrivateService = (node.flags & 8192) !== 0;
                        var isComponent = (node.flags & 32768) !== 0;
                        if (!isPrivateService || isComponent) {
                            currentParent.element.publicProviders[tokenKey(node.provider.token)] = node;
                        } else {
                            if (!currentElementHasPrivateProviders) {
                                currentElementHasPrivateProviders = true;
                                currentParent.element.allProviders = Object.create(currentParent.element.publicProviders);
                            }
                            currentParent.element.allProviders[tokenKey(node.provider.token)] = node;
                        }
                        if (isComponent) {
                            currentParent.element.componentProvider = node;
                        }
                    }
                    if (currentParent) {
                        currentParent.childFlags |= node.flags;
                        currentParent.directChildFlags |= node.flags;
                        currentParent.childMatchedQueries |= node.matchedQueryIds;
                        if (node.element && node.element.template) {
                            currentParent.childMatchedQueries |= node.element.template.nodeMatchedQueries;
                        }
                    } else {
                        viewRootNodeFlags |= node.flags;
                    }
                    if (node.childCount > 0) {
                        currentParent = node;
                        if (!isNgContainer(node)) {
                            currentRenderParent = node;
                        }
                    } else {
                        while (currentParent && i === currentParent.nodeIndex + currentParent.childCount) {
                            var newParent = currentParent.parent;
                            if (newParent) {
                                newParent.childFlags |= currentParent.childFlags;
                                newParent.childMatchedQueries |= currentParent.childMatchedQueries;
                            }
                            currentParent = newParent;
                            if (currentParent && isNgContainer(currentParent)) {
                                currentRenderParent = currentParent.renderParent;
                            } else {
                                currentRenderParent = currentParent;
                            }
                        }
                    }
                }
                var handleEvent = function(view, nodeIndex, eventName, event) {
                    return nodes[nodeIndex].element.handleEvent(view, eventName, event);
                };
                return {
                    factory: null,
                    nodeFlags: viewNodeFlags,
                    rootNodeFlags: viewRootNodeFlags,
                    nodeMatchedQueries: viewMatchedQueries,
                    flags: flags,
                    nodes: nodes,
                    updateDirectives: updateDirectives || NOOP,
                    updateRenderer: updateRenderer || NOOP,
                    handleEvent: handleEvent,
                    bindingCount: viewBindingCount,
                    outputCount: viewDisposableCount,
                    lastRenderRootNode: lastRenderRootNode
                };
            }
            function isNgContainer(node) {
                return (node.flags & 1) !== 0 && node.element.name === null;
            }
            function validateNode(parent, node, nodeCount) {
                var template = node.element && node.element.template;
                if (template) {
                    if (!template.lastRenderRootNode) {
                        throw new Error("Illegal State: Embedded templates without nodes are not allowed!");
                    }
                    if (template.lastRenderRootNode && template.lastRenderRootNode.flags & 16777216) {
                        throw new Error("Illegal State: Last root node of a template can't have embedded views, at index " + node.nodeIndex + "!");
                    }
                }
                if (node.flags & 20224) {
                    var parentFlags = parent ? parent.flags : 0;
                    if ((parentFlags & 1) === 0) {
                        throw new Error("Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index " + node.nodeIndex + "!");
                    }
                }
                if (node.query) {
                    if (node.flags & 67108864 && (!parent || (parent.flags & 16384) === 0)) {
                        throw new Error("Illegal State: Content Query nodes need to be children of directives, at index " + node.nodeIndex + "!");
                    }
                    if (node.flags & 134217728 && parent) {
                        throw new Error("Illegal State: View Query nodes have to be top level nodes, at index " + node.nodeIndex + "!");
                    }
                }
                if (node.childCount) {
                    var parentEnd = parent ? parent.nodeIndex + parent.childCount : nodeCount - 1;
                    if (node.nodeIndex <= parentEnd && node.nodeIndex + node.childCount > parentEnd) {
                        throw new Error("Illegal State: childCount of node leads outside of parent, at index " + node.nodeIndex + "!");
                    }
                }
            }
            function createEmbeddedView(parent, anchorDef$$1, viewDef, context) {
                var view = createView(parent.root, parent.renderer, parent, anchorDef$$1, viewDef);
                initView(view, parent.component, context);
                createViewNodes(view);
                return view;
            }
            function createRootView(root, def, context) {
                var view = createView(root, root.renderer, null, null, def);
                initView(view, context, context);
                createViewNodes(view);
                return view;
            }
            function createComponentView(parentView, nodeDef, viewDef, hostElement) {
                var rendererType = nodeDef.element.componentRendererType;
                var compRenderer;
                if (!rendererType) {
                    compRenderer = parentView.root.renderer;
                } else {
                    compRenderer = parentView.root.rendererFactory.createRenderer(hostElement, rendererType);
                }
                return createView(parentView.root, compRenderer, parentView, nodeDef.element.componentProvider, viewDef);
            }
            function createView(root, renderer, parent, parentNodeDef, def) {
                var nodes = new Array(def.nodes.length);
                var disposables = def.outputCount ? new Array(def.outputCount) : null;
                var view = {
                    def: def,
                    parent: parent,
                    viewContainerParent: null,
                    parentNodeDef: parentNodeDef,
                    context: null,
                    component: null,
                    nodes: nodes,
                    state: 13,
                    root: root,
                    renderer: renderer,
                    oldValues: new Array(def.bindingCount),
                    disposables: disposables
                };
                return view;
            }
            function initView(view, component, context) {
                view.component = component;
                view.context = context;
            }
            function createViewNodes(view) {
                var renderHost;
                if (isComponentView(view)) {
                    var hostDef = view.parentNodeDef;
                    renderHost = asElementData(view.parent, hostDef.parent.nodeIndex).renderElement;
                }
                var def = view.def;
                var nodes = view.nodes;
                for (var i = 0; i < def.nodes.length; i++) {
                    var nodeDef = def.nodes[i];
                    Services.setCurrentNode(view, i);
                    var nodeData = void 0;
                    switch (nodeDef.flags & 201347067) {
                      case 1:
                        var el = createElement(view, renderHost, nodeDef);
                        var componentView = undefined;
                        if (nodeDef.flags & 33554432) {
                            var compViewDef = resolveDefinition(nodeDef.element.componentView);
                            componentView = Services.createComponentView(view, nodeDef, compViewDef, el);
                        }
                        listenToElementOutputs(view, componentView, nodeDef, el);
                        nodeData = {
                            renderElement: el,
                            componentView: componentView,
                            viewContainer: null,
                            template: nodeDef.element.template ? createTemplateData(view, nodeDef) : undefined
                        };
                        if (nodeDef.flags & 16777216) {
                            nodeData.viewContainer = createViewContainerData(view, nodeDef, nodeData);
                        }
                        break;

                      case 2:
                        nodeData = createText(view, renderHost, nodeDef);
                        break;

                      case 512:
                      case 1024:
                      case 2048:
                      case 256:
                        {
                            nodeData = nodes[i];
                            if (!nodeData && !(nodeDef.flags & 4096)) {
                                var instance = createProviderInstance(view, nodeDef);
                                nodeData = {
                                    instance: instance
                                };
                            }
                            break;
                        }

                      case 16:
                        {
                            var instance = createPipeInstance(view, nodeDef);
                            nodeData = {
                                instance: instance
                            };
                            break;
                        }

                      case 16384:
                        {
                            nodeData = nodes[i];
                            if (!nodeData) {
                                var instance = createDirectiveInstance(view, nodeDef);
                                nodeData = {
                                    instance: instance
                                };
                            }
                            if (nodeDef.flags & 32768) {
                                var compView = asElementData(view, nodeDef.parent.nodeIndex).componentView;
                                initView(compView, nodeData.instance, nodeData.instance);
                            }
                            break;
                        }

                      case 32:
                      case 64:
                      case 128:
                        nodeData = createPureExpression(view, nodeDef);
                        break;

                      case 67108864:
                      case 134217728:
                        nodeData = createQuery();
                        break;

                      case 8:
                        appendNgContent(view, renderHost, nodeDef);
                        nodeData = undefined;
                        break;
                    }
                    nodes[i] = nodeData;
                }
                execComponentViewsAction(view, ViewAction.CreateViewNodes);
                execQueriesAction(view, 67108864 | 134217728, 268435456, 0);
            }
            function checkNoChangesView(view) {
                markProjectedViewsForCheck(view);
                Services.updateDirectives(view, 1);
                execEmbeddedViewsAction(view, ViewAction.CheckNoChanges);
                Services.updateRenderer(view, 1);
                execComponentViewsAction(view, ViewAction.CheckNoChanges);
                view.state &= ~(64 | 32);
            }
            function checkAndUpdateView(view) {
                if (view.state & 1) {
                    view.state &= ~1;
                    view.state |= 2;
                } else {
                    view.state &= ~2;
                }
                markProjectedViewsForCheck(view);
                Services.updateDirectives(view, 0);
                execEmbeddedViewsAction(view, ViewAction.CheckAndUpdate);
                execQueriesAction(view, 67108864, 536870912, 0);
                callLifecycleHooksChildrenFirst(view, 2097152 | (view.state & 2 ? 1048576 : 0));
                Services.updateRenderer(view, 0);
                execComponentViewsAction(view, ViewAction.CheckAndUpdate);
                execQueriesAction(view, 134217728, 536870912, 0);
                callLifecycleHooksChildrenFirst(view, 8388608 | (view.state & 2 ? 4194304 : 0));
                if (view.def.flags & 2) {
                    view.state &= ~8;
                }
                view.state &= ~(64 | 32);
            }
            function checkAndUpdateNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                if (argStyle === 0) {
                    return checkAndUpdateNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
                } else {
                    return checkAndUpdateNodeDynamic(view, nodeDef, v0);
                }
            }
            function markProjectedViewsForCheck(view) {
                var def = view.def;
                if (!(def.nodeFlags & 4)) {
                    return;
                }
                for (var i = 0; i < def.nodes.length; i++) {
                    var nodeDef = def.nodes[i];
                    if (nodeDef.flags & 4) {
                        var projectedViews = asElementData(view, i).template._projectedViews;
                        if (projectedViews) {
                            for (var i_1 = 0; i_1 < projectedViews.length; i_1++) {
                                var projectedView = projectedViews[i_1];
                                projectedView.state |= 32;
                                markParentViewsForCheckProjectedViews(projectedView, view);
                            }
                        }
                    } else if ((nodeDef.childFlags & 4) === 0) {
                        i += nodeDef.childCount;
                    }
                }
            }
            function checkAndUpdateNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                switch (nodeDef.flags & 201347067) {
                  case 1:
                    return checkAndUpdateElementInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);

                  case 2:
                    return checkAndUpdateTextInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);

                  case 16384:
                    return checkAndUpdateDirectiveInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);

                  case 32:
                  case 64:
                  case 128:
                    return checkAndUpdatePureExpressionInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);

                  default:
                    throw "unreachable";
                }
            }
            function checkAndUpdateNodeDynamic(view, nodeDef, values) {
                switch (nodeDef.flags & 201347067) {
                  case 1:
                    return checkAndUpdateElementDynamic(view, nodeDef, values);

                  case 2:
                    return checkAndUpdateTextDynamic(view, nodeDef, values);

                  case 16384:
                    return checkAndUpdateDirectiveDynamic(view, nodeDef, values);

                  case 32:
                  case 64:
                  case 128:
                    return checkAndUpdatePureExpressionDynamic(view, nodeDef, values);

                  default:
                    throw "unreachable";
                }
            }
            function checkNoChangesNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                if (argStyle === 0) {
                    checkNoChangesNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
                } else {
                    checkNoChangesNodeDynamic(view, nodeDef, v0);
                }
                return false;
            }
            function checkNoChangesNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                var bindLen = nodeDef.bindings.length;
                if (bindLen > 0) checkBindingNoChanges(view, nodeDef, 0, v0);
                if (bindLen > 1) checkBindingNoChanges(view, nodeDef, 1, v1);
                if (bindLen > 2) checkBindingNoChanges(view, nodeDef, 2, v2);
                if (bindLen > 3) checkBindingNoChanges(view, nodeDef, 3, v3);
                if (bindLen > 4) checkBindingNoChanges(view, nodeDef, 4, v4);
                if (bindLen > 5) checkBindingNoChanges(view, nodeDef, 5, v5);
                if (bindLen > 6) checkBindingNoChanges(view, nodeDef, 6, v6);
                if (bindLen > 7) checkBindingNoChanges(view, nodeDef, 7, v7);
                if (bindLen > 8) checkBindingNoChanges(view, nodeDef, 8, v8);
                if (bindLen > 9) checkBindingNoChanges(view, nodeDef, 9, v9);
            }
            function checkNoChangesNodeDynamic(view, nodeDef, values) {
                for (var i = 0; i < values.length; i++) {
                    checkBindingNoChanges(view, nodeDef, i, values[i]);
                }
            }
            function checkNoChangesQuery(view, nodeDef) {
                var queryList = asQueryList(view, nodeDef.nodeIndex);
                if (queryList.dirty) {
                    throw expressionChangedAfterItHasBeenCheckedError(Services.createDebugContext(view, nodeDef.nodeIndex), "Query " + nodeDef.query.id + " not dirty", "Query " + nodeDef.query.id + " dirty", (view.state & 1) !== 0);
                }
            }
            function destroyView(view) {
                if (view.state & 128) {
                    return;
                }
                execEmbeddedViewsAction(view, ViewAction.Destroy);
                execComponentViewsAction(view, ViewAction.Destroy);
                callLifecycleHooksChildrenFirst(view, 131072);
                if (view.disposables) {
                    for (var i = 0; i < view.disposables.length; i++) {
                        view.disposables[i]();
                    }
                }
                detachProjectedView(view);
                if (view.renderer.destroyNode) {
                    destroyViewNodes(view);
                }
                if (isComponentView(view)) {
                    view.renderer.destroy();
                }
                view.state |= 128;
            }
            function destroyViewNodes(view) {
                var len = view.def.nodes.length;
                for (var i = 0; i < len; i++) {
                    var def = view.def.nodes[i];
                    if (def.flags & 1) {
                        view.renderer.destroyNode(asElementData(view, i).renderElement);
                    } else if (def.flags & 2) {
                        view.renderer.destroyNode(asTextData(view, i).renderText);
                    } else if (def.flags & 67108864 || def.flags & 134217728) {
                        asQueryList(view, i).destroy();
                    }
                }
            }
            var ViewAction = {};
            ViewAction.CreateViewNodes = 0;
            ViewAction.CheckNoChanges = 1;
            ViewAction.CheckNoChangesProjectedViews = 2;
            ViewAction.CheckAndUpdate = 3;
            ViewAction.CheckAndUpdateProjectedViews = 4;
            ViewAction.Destroy = 5;
            ViewAction[ViewAction.CreateViewNodes] = "CreateViewNodes";
            ViewAction[ViewAction.CheckNoChanges] = "CheckNoChanges";
            ViewAction[ViewAction.CheckNoChangesProjectedViews] = "CheckNoChangesProjectedViews";
            ViewAction[ViewAction.CheckAndUpdate] = "CheckAndUpdate";
            ViewAction[ViewAction.CheckAndUpdateProjectedViews] = "CheckAndUpdateProjectedViews";
            ViewAction[ViewAction.Destroy] = "Destroy";
            function execComponentViewsAction(view, action) {
                var def = view.def;
                if (!(def.nodeFlags & 33554432)) {
                    return;
                }
                for (var i = 0; i < def.nodes.length; i++) {
                    var nodeDef = def.nodes[i];
                    if (nodeDef.flags & 33554432) {
                        callViewAction(asElementData(view, i).componentView, action);
                    } else if ((nodeDef.childFlags & 33554432) === 0) {
                        i += nodeDef.childCount;
                    }
                }
            }
            function execEmbeddedViewsAction(view, action) {
                var def = view.def;
                if (!(def.nodeFlags & 16777216)) {
                    return;
                }
                for (var i = 0; i < def.nodes.length; i++) {
                    var nodeDef = def.nodes[i];
                    if (nodeDef.flags & 16777216) {
                        var embeddedViews = asElementData(view, i).viewContainer._embeddedViews;
                        for (var k = 0; k < embeddedViews.length; k++) {
                            callViewAction(embeddedViews[k], action);
                        }
                    } else if ((nodeDef.childFlags & 16777216) === 0) {
                        i += nodeDef.childCount;
                    }
                }
            }
            function callViewAction(view, action) {
                var viewState = view.state;
                switch (action) {
                  case ViewAction.CheckNoChanges:
                    if ((viewState & 128) === 0) {
                        if ((viewState & 12) === 12) {
                            checkNoChangesView(view);
                        } else if (viewState & 64) {
                            execProjectedViewsAction(view, ViewAction.CheckNoChangesProjectedViews);
                        }
                    }
                    break;

                  case ViewAction.CheckNoChangesProjectedViews:
                    if ((viewState & 128) === 0) {
                        if (viewState & 32) {
                            checkNoChangesView(view);
                        } else if (viewState & 64) {
                            execProjectedViewsAction(view, action);
                        }
                    }
                    break;

                  case ViewAction.CheckAndUpdate:
                    if ((viewState & 128) === 0) {
                        if ((viewState & 12) === 12) {
                            checkAndUpdateView(view);
                        } else if (viewState & 64) {
                            execProjectedViewsAction(view, ViewAction.CheckAndUpdateProjectedViews);
                        }
                    }
                    break;

                  case ViewAction.CheckAndUpdateProjectedViews:
                    if ((viewState & 128) === 0) {
                        if (viewState & 32) {
                            checkAndUpdateView(view);
                        } else if (viewState & 64) {
                            execProjectedViewsAction(view, action);
                        }
                    }
                    break;

                  case ViewAction.Destroy:
                    destroyView(view);
                    break;

                  case ViewAction.CreateViewNodes:
                    createViewNodes(view);
                    break;
                }
            }
            function execProjectedViewsAction(view, action) {
                execEmbeddedViewsAction(view, action);
                execComponentViewsAction(view, action);
            }
            function execQueriesAction(view, queryFlags, staticDynamicQueryFlag, checkType) {
                if (!(view.def.nodeFlags & queryFlags) || !(view.def.nodeFlags & staticDynamicQueryFlag)) {
                    return;
                }
                var nodeCount = view.def.nodes.length;
                for (var i = 0; i < nodeCount; i++) {
                    var nodeDef = view.def.nodes[i];
                    if (nodeDef.flags & queryFlags && nodeDef.flags & staticDynamicQueryFlag) {
                        Services.setCurrentNode(view, nodeDef.nodeIndex);
                        switch (checkType) {
                          case 0:
                            checkAndUpdateQuery(view, nodeDef);
                            break;

                          case 1:
                            checkNoChangesQuery(view, nodeDef);
                            break;
                        }
                    }
                    if (!(nodeDef.childFlags & queryFlags) || !(nodeDef.childFlags & staticDynamicQueryFlag)) {
                        i += nodeDef.childCount;
                    }
                }
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var initialized = false;
            function initServicesIfNeeded() {
                if (initialized) {
                    return;
                }
                initialized = true;
                var services = isDevMode() ? createDebugServices() : createProdServices();
                Services.setCurrentNode = services.setCurrentNode;
                Services.createRootView = services.createRootView;
                Services.createEmbeddedView = services.createEmbeddedView;
                Services.createComponentView = services.createComponentView;
                Services.createNgModuleRef = services.createNgModuleRef;
                Services.overrideProvider = services.overrideProvider;
                Services.clearProviderOverrides = services.clearProviderOverrides;
                Services.checkAndUpdateView = services.checkAndUpdateView;
                Services.checkNoChangesView = services.checkNoChangesView;
                Services.destroyView = services.destroyView;
                Services.resolveDep = resolveDep;
                Services.createDebugContext = services.createDebugContext;
                Services.handleEvent = services.handleEvent;
                Services.updateDirectives = services.updateDirectives;
                Services.updateRenderer = services.updateRenderer;
                Services.dirtyParentQueries = dirtyParentQueries;
            }
            function createProdServices() {
                return {
                    setCurrentNode: function() {},
                    createRootView: createProdRootView,
                    createEmbeddedView: createEmbeddedView,
                    createComponentView: createComponentView,
                    createNgModuleRef: createNgModuleRef,
                    overrideProvider: NOOP,
                    clearProviderOverrides: NOOP,
                    checkAndUpdateView: checkAndUpdateView,
                    checkNoChangesView: checkNoChangesView,
                    destroyView: destroyView,
                    createDebugContext: function(view, nodeIndex) {
                        return new DebugContext_(view, nodeIndex);
                    },
                    handleEvent: function(view, nodeIndex, eventName, event) {
                        return view.def.handleEvent(view, nodeIndex, eventName, event);
                    },
                    updateDirectives: function(view, checkType) {
                        return view.def.updateDirectives(checkType === 0 ? prodCheckAndUpdateNode : prodCheckNoChangesNode, view);
                    },
                    updateRenderer: function(view, checkType) {
                        return view.def.updateRenderer(checkType === 0 ? prodCheckAndUpdateNode : prodCheckNoChangesNode, view);
                    }
                };
            }
            function createDebugServices() {
                return {
                    setCurrentNode: debugSetCurrentNode,
                    createRootView: debugCreateRootView,
                    createEmbeddedView: debugCreateEmbeddedView,
                    createComponentView: debugCreateComponentView,
                    createNgModuleRef: debugCreateNgModuleRef,
                    overrideProvider: debugOverrideProvider,
                    clearProviderOverrides: debugClearProviderOverrides,
                    checkAndUpdateView: debugCheckAndUpdateView,
                    checkNoChangesView: debugCheckNoChangesView,
                    destroyView: debugDestroyView,
                    createDebugContext: function(view, nodeIndex) {
                        return new DebugContext_(view, nodeIndex);
                    },
                    handleEvent: debugHandleEvent,
                    updateDirectives: debugUpdateDirectives,
                    updateRenderer: debugUpdateRenderer
                };
            }
            function createProdRootView(elInjector, projectableNodes, rootSelectorOrNode, def, ngModule, context) {
                var rendererFactory = ngModule.injector.get(RendererFactory2);
                return createRootView(createRootData(elInjector, ngModule, rendererFactory, projectableNodes, rootSelectorOrNode), def, context);
            }
            function debugCreateRootView(elInjector, projectableNodes, rootSelectorOrNode, def, ngModule, context) {
                var rendererFactory = ngModule.injector.get(RendererFactory2);
                var root = createRootData(elInjector, ngModule, new DebugRendererFactory2(rendererFactory), projectableNodes, rootSelectorOrNode);
                var defWithOverride = applyProviderOverridesToView(def);
                return callWithDebugContext(DebugAction.create, createRootView, null, [ root, defWithOverride, context ]);
            }
            function createRootData(elInjector, ngModule, rendererFactory, projectableNodes, rootSelectorOrNode) {
                var sanitizer = ngModule.injector.get(Sanitizer);
                var errorHandler = ngModule.injector.get(ErrorHandler);
                var renderer = rendererFactory.createRenderer(null, null);
                return {
                    ngModule: ngModule,
                    injector: elInjector,
                    projectableNodes: projectableNodes,
                    selectorOrNode: rootSelectorOrNode,
                    sanitizer: sanitizer,
                    rendererFactory: rendererFactory,
                    renderer: renderer,
                    errorHandler: errorHandler
                };
            }
            function debugCreateEmbeddedView(parentView, anchorDef, viewDef$$1, context) {
                var defWithOverride = applyProviderOverridesToView(viewDef$$1);
                return callWithDebugContext(DebugAction.create, createEmbeddedView, null, [ parentView, anchorDef, defWithOverride, context ]);
            }
            function debugCreateComponentView(parentView, nodeDef, viewDef$$1, hostElement) {
                var defWithOverride = applyProviderOverridesToView(viewDef$$1);
                return callWithDebugContext(DebugAction.create, createComponentView, null, [ parentView, nodeDef, defWithOverride, hostElement ]);
            }
            function debugCreateNgModuleRef(moduleType, parentInjector, bootstrapComponents, def) {
                var defWithOverride = applyProviderOverridesToNgModule(def);
                return createNgModuleRef(moduleType, parentInjector, bootstrapComponents, defWithOverride);
            }
            var providerOverrides = new Map();
            function debugOverrideProvider(override) {
                providerOverrides.set(override.token, override);
            }
            function debugClearProviderOverrides() {
                providerOverrides.clear();
            }
            function applyProviderOverridesToView(def) {
                if (providerOverrides.size === 0) {
                    return def;
                }
                var elementIndicesWithOverwrittenProviders = findElementIndicesWithOverwrittenProviders(def);
                if (elementIndicesWithOverwrittenProviders.length === 0) {
                    return def;
                }
                def = def.factory(function() {
                    return NOOP;
                });
                for (var i = 0; i < elementIndicesWithOverwrittenProviders.length; i++) {
                    applyProviderOverridesToElement(def, elementIndicesWithOverwrittenProviders[i]);
                }
                return def;
                function findElementIndicesWithOverwrittenProviders(def) {
                    var elIndicesWithOverwrittenProviders = [];
                    var lastElementDef = null;
                    for (var i = 0; i < def.nodes.length; i++) {
                        var nodeDef = def.nodes[i];
                        if (nodeDef.flags & 1) {
                            lastElementDef = nodeDef;
                        }
                        if (lastElementDef && nodeDef.flags & 3840 && providerOverrides.has(nodeDef.provider.token)) {
                            elIndicesWithOverwrittenProviders.push(lastElementDef.nodeIndex);
                            lastElementDef = null;
                        }
                    }
                    return elIndicesWithOverwrittenProviders;
                }
                function applyProviderOverridesToElement(viewDef$$1, elIndex) {
                    for (var i = elIndex + 1; i < viewDef$$1.nodes.length; i++) {
                        var nodeDef = viewDef$$1.nodes[i];
                        if (nodeDef.flags & 1) {
                            return;
                        }
                        if (nodeDef.flags & 3840) {
                            var provider = nodeDef.provider;
                            var override = providerOverrides.get(provider.token);
                            if (override) {
                                nodeDef.flags = nodeDef.flags & ~3840 | override.flags;
                                provider.deps = splitDepsDsl(override.deps);
                                provider.value = override.value;
                            }
                        }
                    }
                }
            }
            function applyProviderOverridesToNgModule(def) {
                var _a = calcHasOverrides(def), hasOverrides = _a.hasOverrides, hasDeprecatedOverrides = _a.hasDeprecatedOverrides;
                if (!hasOverrides) {
                    return def;
                }
                def = def.factory(function() {
                    return NOOP;
                });
                applyProviderOverrides(def);
                return def;
                function calcHasOverrides(def) {
                    var hasOverrides = false;
                    var hasDeprecatedOverrides = false;
                    if (providerOverrides.size === 0) {
                        return {
                            hasOverrides: hasOverrides,
                            hasDeprecatedOverrides: hasDeprecatedOverrides
                        };
                    }
                    def.providers.forEach(function(node) {
                        var override = providerOverrides.get(node.token);
                        if (node.flags & 3840 && override) {
                            hasOverrides = true;
                            hasDeprecatedOverrides = hasDeprecatedOverrides || override.deprecatedBehavior;
                        }
                    });
                    return {
                        hasOverrides: hasOverrides,
                        hasDeprecatedOverrides: hasDeprecatedOverrides
                    };
                }
                function applyProviderOverrides(def) {
                    for (var i = 0; i < def.providers.length; i++) {
                        var provider = def.providers[i];
                        if (hasDeprecatedOverrides) {
                            provider.flags |= 4096;
                        }
                        var override = providerOverrides.get(provider.token);
                        if (override) {
                            provider.flags = provider.flags & ~3840 | override.flags;
                            provider.deps = splitDepsDsl(override.deps);
                            provider.value = override.value;
                        }
                    }
                }
            }
            function prodCheckAndUpdateNode(view, checkIndex, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                var nodeDef = view.def.nodes[checkIndex];
                checkAndUpdateNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
                return nodeDef.flags & 224 ? asPureExpressionData(view, checkIndex).value : undefined;
            }
            function prodCheckNoChangesNode(view, checkIndex, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                var nodeDef = view.def.nodes[checkIndex];
                checkNoChangesNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
                return nodeDef.flags & 224 ? asPureExpressionData(view, checkIndex).value : undefined;
            }
            function debugCheckAndUpdateView(view) {
                return callWithDebugContext(DebugAction.detectChanges, checkAndUpdateView, null, [ view ]);
            }
            function debugCheckNoChangesView(view) {
                return callWithDebugContext(DebugAction.checkNoChanges, checkNoChangesView, null, [ view ]);
            }
            function debugDestroyView(view) {
                return callWithDebugContext(DebugAction.destroy, destroyView, null, [ view ]);
            }
            var DebugAction = {};
            DebugAction.create = 0;
            DebugAction.detectChanges = 1;
            DebugAction.checkNoChanges = 2;
            DebugAction.destroy = 3;
            DebugAction.handleEvent = 4;
            DebugAction[DebugAction.create] = "create";
            DebugAction[DebugAction.detectChanges] = "detectChanges";
            DebugAction[DebugAction.checkNoChanges] = "checkNoChanges";
            DebugAction[DebugAction.destroy] = "destroy";
            DebugAction[DebugAction.handleEvent] = "handleEvent";
            var _currentAction;
            var _currentView;
            var _currentNodeIndex;
            function debugSetCurrentNode(view, nodeIndex) {
                _currentView = view;
                _currentNodeIndex = nodeIndex;
            }
            function debugHandleEvent(view, nodeIndex, eventName, event) {
                debugSetCurrentNode(view, nodeIndex);
                return callWithDebugContext(DebugAction.handleEvent, view.def.handleEvent, null, [ view, nodeIndex, eventName, event ]);
            }
            function debugUpdateDirectives(view, checkType) {
                if (view.state & 128) {
                    throw viewDestroyedError(DebugAction[_currentAction]);
                }
                debugSetCurrentNode(view, nextDirectiveWithBinding(view, 0));
                return view.def.updateDirectives(debugCheckDirectivesFn, view);
                function debugCheckDirectivesFn(view, nodeIndex, argStyle) {
                    var values = [];
                    for (var _i = 3; _i < arguments.length; _i++) {
                        values[_i - 3] = arguments[_i];
                    }
                    var nodeDef = view.def.nodes[nodeIndex];
                    if (checkType === 0) {
                        debugCheckAndUpdateNode(view, nodeDef, argStyle, values);
                    } else {
                        debugCheckNoChangesNode(view, nodeDef, argStyle, values);
                    }
                    if (nodeDef.flags & 16384) {
                        debugSetCurrentNode(view, nextDirectiveWithBinding(view, nodeIndex));
                    }
                    return nodeDef.flags & 224 ? asPureExpressionData(view, nodeDef.nodeIndex).value : undefined;
                }
            }
            function debugUpdateRenderer(view, checkType) {
                if (view.state & 128) {
                    throw viewDestroyedError(DebugAction[_currentAction]);
                }
                debugSetCurrentNode(view, nextRenderNodeWithBinding(view, 0));
                return view.def.updateRenderer(debugCheckRenderNodeFn, view);
                function debugCheckRenderNodeFn(view, nodeIndex, argStyle) {
                    var values = [];
                    for (var _i = 3; _i < arguments.length; _i++) {
                        values[_i - 3] = arguments[_i];
                    }
                    var nodeDef = view.def.nodes[nodeIndex];
                    if (checkType === 0) {
                        debugCheckAndUpdateNode(view, nodeDef, argStyle, values);
                    } else {
                        debugCheckNoChangesNode(view, nodeDef, argStyle, values);
                    }
                    if (nodeDef.flags & 3) {
                        debugSetCurrentNode(view, nextRenderNodeWithBinding(view, nodeIndex));
                    }
                    return nodeDef.flags & 224 ? asPureExpressionData(view, nodeDef.nodeIndex).value : undefined;
                }
            }
            function debugCheckAndUpdateNode(view, nodeDef, argStyle, givenValues) {
                var changed = checkAndUpdateNode.apply(void 0, [ view, nodeDef, argStyle ].concat(givenValues));
                if (changed) {
                    var values = argStyle === 1 ? givenValues[0] : givenValues;
                    if (nodeDef.flags & 16384) {
                        var bindingValues = {};
                        for (var i = 0; i < nodeDef.bindings.length; i++) {
                            var binding = nodeDef.bindings[i];
                            var value = values[i];
                            if (binding.flags & 8) {
                                bindingValues[normalizeDebugBindingName(binding.nonMinifiedName)] = normalizeDebugBindingValue(value);
                            }
                        }
                        var elDef = nodeDef.parent;
                        var el = asElementData(view, elDef.nodeIndex).renderElement;
                        if (!elDef.element.name) {
                            view.renderer.setValue(el, "bindings=" + JSON.stringify(bindingValues, null, 2));
                        } else {
                            for (var attr in bindingValues) {
                                var value = bindingValues[attr];
                                if (value != null) {
                                    view.renderer.setAttribute(el, attr, value);
                                } else {
                                    view.renderer.removeAttribute(el, attr);
                                }
                            }
                        }
                    }
                }
            }
            function debugCheckNoChangesNode(view, nodeDef, argStyle, values) {
                checkNoChangesNode.apply(void 0, [ view, nodeDef, argStyle ].concat(values));
            }
            function normalizeDebugBindingName(name) {
                name = camelCaseToDashCase(name.replace(/[$@]/g, "_"));
                return "ng-reflect-" + name;
            }
            var CAMEL_CASE_REGEXP = /([A-Z])/g;
            function camelCaseToDashCase(input) {
                return input.replace(CAMEL_CASE_REGEXP, function() {
                    var m = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        m[_i] = arguments[_i];
                    }
                    return "-" + m[1].toLowerCase();
                });
            }
            function normalizeDebugBindingValue(value) {
                try {
                    return value != null ? value.toString().slice(0, 30) : value;
                } catch (e) {
                    return "[ERROR] Exception while trying to serialize the value";
                }
            }
            function nextDirectiveWithBinding(view, nodeIndex) {
                for (var i = nodeIndex; i < view.def.nodes.length; i++) {
                    var nodeDef = view.def.nodes[i];
                    if (nodeDef.flags & 16384 && nodeDef.bindings && nodeDef.bindings.length) {
                        return i;
                    }
                }
                return null;
            }
            function nextRenderNodeWithBinding(view, nodeIndex) {
                for (var i = nodeIndex; i < view.def.nodes.length; i++) {
                    var nodeDef = view.def.nodes[i];
                    if (nodeDef.flags & 3 && nodeDef.bindings && nodeDef.bindings.length) {
                        return i;
                    }
                }
                return null;
            }
            var DebugContext_ = function() {
                function DebugContext_(view, nodeIndex) {
                    this.view = view;
                    this.nodeIndex = nodeIndex;
                    if (nodeIndex == null) {
                        this.nodeIndex = nodeIndex = 0;
                    }
                    this.nodeDef = view.def.nodes[nodeIndex];
                    var elDef = this.nodeDef;
                    var elView = view;
                    while (elDef && (elDef.flags & 1) === 0) {
                        elDef = elDef.parent;
                    }
                    if (!elDef) {
                        while (!elDef && elView) {
                            elDef = viewParentEl(elView);
                            elView = elView.parent;
                        }
                    }
                    this.elDef = elDef;
                    this.elView = elView;
                }
                Object.defineProperty(DebugContext_.prototype, "elOrCompView", {
                    get: function() {
                        return asElementData(this.elView, this.elDef.nodeIndex).componentView || this.view;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext_.prototype, "injector", {
                    get: function() {
                        return createInjector(this.elView, this.elDef);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext_.prototype, "component", {
                    get: function() {
                        return this.elOrCompView.component;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext_.prototype, "context", {
                    get: function() {
                        return this.elOrCompView.context;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext_.prototype, "providerTokens", {
                    get: function() {
                        var tokens = [];
                        if (this.elDef) {
                            for (var i = this.elDef.nodeIndex + 1; i <= this.elDef.nodeIndex + this.elDef.childCount; i++) {
                                var childDef = this.elView.def.nodes[i];
                                if (childDef.flags & 20224) {
                                    tokens.push(childDef.provider.token);
                                }
                                i += childDef.childCount;
                            }
                        }
                        return tokens;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext_.prototype, "references", {
                    get: function() {
                        var references = {};
                        if (this.elDef) {
                            collectReferences(this.elView, this.elDef, references);
                            for (var i = this.elDef.nodeIndex + 1; i <= this.elDef.nodeIndex + this.elDef.childCount; i++) {
                                var childDef = this.elView.def.nodes[i];
                                if (childDef.flags & 20224) {
                                    collectReferences(this.elView, childDef, references);
                                }
                                i += childDef.childCount;
                            }
                        }
                        return references;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext_.prototype, "componentRenderElement", {
                    get: function() {
                        var elData = findHostElement(this.elOrCompView);
                        return elData ? elData.renderElement : undefined;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DebugContext_.prototype, "renderNode", {
                    get: function() {
                        return this.nodeDef.flags & 2 ? renderNode(this.view, this.nodeDef) : renderNode(this.elView, this.elDef);
                    },
                    enumerable: true,
                    configurable: true
                });
                DebugContext_.prototype.logError = function(console) {
                    var values = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        values[_i - 1] = arguments[_i];
                    }
                    var logViewDef;
                    var logNodeIndex;
                    if (this.nodeDef.flags & 2) {
                        logViewDef = this.view.def;
                        logNodeIndex = this.nodeDef.nodeIndex;
                    } else {
                        logViewDef = this.elView.def;
                        logNodeIndex = this.elDef.nodeIndex;
                    }
                    var renderNodeIndex = getRenderNodeIndex(logViewDef, logNodeIndex);
                    var currRenderNodeIndex = -1;
                    var nodeLogger = function() {
                        currRenderNodeIndex++;
                        if (currRenderNodeIndex === renderNodeIndex) {
                            return (_a = console.error).bind.apply(_a, [ console ].concat(values));
                        } else {
                            return NOOP;
                        }
                        var _a;
                    };
                    logViewDef.factory(nodeLogger);
                    if (currRenderNodeIndex < renderNodeIndex) {
                        console.error("Illegal state: the ViewDefinitionFactory did not call the logger!");
                        console.error.apply(console, values);
                    }
                };
                return DebugContext_;
            }();
            function getRenderNodeIndex(viewDef$$1, nodeIndex) {
                var renderNodeIndex = -1;
                for (var i = 0; i <= nodeIndex; i++) {
                    var nodeDef = viewDef$$1.nodes[i];
                    if (nodeDef.flags & 3) {
                        renderNodeIndex++;
                    }
                }
                return renderNodeIndex;
            }
            function findHostElement(view) {
                while (view && !isComponentView(view)) {
                    view = view.parent;
                }
                if (view.parent) {
                    return asElementData(view.parent, viewParentEl(view).nodeIndex);
                }
                return null;
            }
            function collectReferences(view, nodeDef, references) {
                for (var refName in nodeDef.references) {
                    references[refName] = getQueryValue(view, nodeDef, nodeDef.references[refName]);
                }
            }
            function callWithDebugContext(action, fn, self, args) {
                var oldAction = _currentAction;
                var oldView = _currentView;
                var oldNodeIndex = _currentNodeIndex;
                try {
                    _currentAction = action;
                    var result = fn.apply(self, args);
                    _currentView = oldView;
                    _currentNodeIndex = oldNodeIndex;
                    _currentAction = oldAction;
                    return result;
                } catch (e) {
                    if (isViewDebugError(e) || !_currentView) {
                        throw e;
                    }
                    throw viewWrappedDebugError(e, getCurrentDebugContext());
                }
            }
            function getCurrentDebugContext() {
                return _currentView ? new DebugContext_(_currentView, _currentNodeIndex) : null;
            }
            var DebugRendererFactory2 = function() {
                function DebugRendererFactory2(delegate) {
                    this.delegate = delegate;
                }
                DebugRendererFactory2.prototype.createRenderer = function(element, renderData) {
                    return new DebugRenderer2(this.delegate.createRenderer(element, renderData));
                };
                DebugRendererFactory2.prototype.begin = function() {
                    if (this.delegate.begin) {
                        this.delegate.begin();
                    }
                };
                DebugRendererFactory2.prototype.end = function() {
                    if (this.delegate.end) {
                        this.delegate.end();
                    }
                };
                DebugRendererFactory2.prototype.whenRenderingDone = function() {
                    if (this.delegate.whenRenderingDone) {
                        return this.delegate.whenRenderingDone();
                    }
                    return Promise.resolve(null);
                };
                return DebugRendererFactory2;
            }();
            var DebugRenderer2 = function() {
                function DebugRenderer2(delegate) {
                    this.delegate = delegate;
                }
                Object.defineProperty(DebugRenderer2.prototype, "data", {
                    get: function() {
                        return this.delegate.data;
                    },
                    enumerable: true,
                    configurable: true
                });
                DebugRenderer2.prototype.destroyNode = function(node) {
                    removeDebugNodeFromIndex(getDebugNode(node));
                    if (this.delegate.destroyNode) {
                        this.delegate.destroyNode(node);
                    }
                };
                DebugRenderer2.prototype.destroy = function() {
                    this.delegate.destroy();
                };
                DebugRenderer2.prototype.createElement = function(name, namespace) {
                    var el = this.delegate.createElement(name, namespace);
                    var debugCtx = getCurrentDebugContext();
                    if (debugCtx) {
                        var debugEl = new DebugElement(el, null, debugCtx);
                        debugEl.name = name;
                        indexDebugNode(debugEl);
                    }
                    return el;
                };
                DebugRenderer2.prototype.createComment = function(value) {
                    var comment = this.delegate.createComment(value);
                    var debugCtx = getCurrentDebugContext();
                    if (debugCtx) {
                        indexDebugNode(new DebugNode(comment, null, debugCtx));
                    }
                    return comment;
                };
                DebugRenderer2.prototype.createText = function(value) {
                    var text = this.delegate.createText(value);
                    var debugCtx = getCurrentDebugContext();
                    if (debugCtx) {
                        indexDebugNode(new DebugNode(text, null, debugCtx));
                    }
                    return text;
                };
                DebugRenderer2.prototype.appendChild = function(parent, newChild) {
                    var debugEl = getDebugNode(parent);
                    var debugChildEl = getDebugNode(newChild);
                    if (debugEl && debugChildEl && debugEl instanceof DebugElement) {
                        debugEl.addChild(debugChildEl);
                    }
                    this.delegate.appendChild(parent, newChild);
                };
                DebugRenderer2.prototype.insertBefore = function(parent, newChild, refChild) {
                    var debugEl = getDebugNode(parent);
                    var debugChildEl = getDebugNode(newChild);
                    var debugRefEl = getDebugNode(refChild);
                    if (debugEl && debugChildEl && debugEl instanceof DebugElement) {
                        debugEl.insertBefore(debugRefEl, debugChildEl);
                    }
                    this.delegate.insertBefore(parent, newChild, refChild);
                };
                DebugRenderer2.prototype.removeChild = function(parent, oldChild) {
                    var debugEl = getDebugNode(parent);
                    var debugChildEl = getDebugNode(oldChild);
                    if (debugEl && debugChildEl && debugEl instanceof DebugElement) {
                        debugEl.removeChild(debugChildEl);
                    }
                    this.delegate.removeChild(parent, oldChild);
                };
                DebugRenderer2.prototype.selectRootElement = function(selectorOrNode) {
                    var el = this.delegate.selectRootElement(selectorOrNode);
                    var debugCtx = getCurrentDebugContext();
                    if (debugCtx) {
                        indexDebugNode(new DebugElement(el, null, debugCtx));
                    }
                    return el;
                };
                DebugRenderer2.prototype.setAttribute = function(el, name, value, namespace) {
                    var debugEl = getDebugNode(el);
                    if (debugEl && debugEl instanceof DebugElement) {
                        var fullName = namespace ? namespace + ":" + name : name;
                        debugEl.attributes[fullName] = value;
                    }
                    this.delegate.setAttribute(el, name, value, namespace);
                };
                DebugRenderer2.prototype.removeAttribute = function(el, name, namespace) {
                    var debugEl = getDebugNode(el);
                    if (debugEl && debugEl instanceof DebugElement) {
                        var fullName = namespace ? namespace + ":" + name : name;
                        debugEl.attributes[fullName] = null;
                    }
                    this.delegate.removeAttribute(el, name, namespace);
                };
                DebugRenderer2.prototype.addClass = function(el, name) {
                    var debugEl = getDebugNode(el);
                    if (debugEl && debugEl instanceof DebugElement) {
                        debugEl.classes[name] = true;
                    }
                    this.delegate.addClass(el, name);
                };
                DebugRenderer2.prototype.removeClass = function(el, name) {
                    var debugEl = getDebugNode(el);
                    if (debugEl && debugEl instanceof DebugElement) {
                        debugEl.classes[name] = false;
                    }
                    this.delegate.removeClass(el, name);
                };
                DebugRenderer2.prototype.setStyle = function(el, style, value, flags) {
                    var debugEl = getDebugNode(el);
                    if (debugEl && debugEl instanceof DebugElement) {
                        debugEl.styles[style] = value;
                    }
                    this.delegate.setStyle(el, style, value, flags);
                };
                DebugRenderer2.prototype.removeStyle = function(el, style, flags) {
                    var debugEl = getDebugNode(el);
                    if (debugEl && debugEl instanceof DebugElement) {
                        debugEl.styles[style] = null;
                    }
                    this.delegate.removeStyle(el, style, flags);
                };
                DebugRenderer2.prototype.setProperty = function(el, name, value) {
                    var debugEl = getDebugNode(el);
                    if (debugEl && debugEl instanceof DebugElement) {
                        debugEl.properties[name] = value;
                    }
                    this.delegate.setProperty(el, name, value);
                };
                DebugRenderer2.prototype.listen = function(target, eventName, callback) {
                    if (typeof target !== "string") {
                        var debugEl = getDebugNode(target);
                        if (debugEl) {
                            debugEl.listeners.push(new EventListener(eventName, callback));
                        }
                    }
                    return this.delegate.listen(target, eventName, callback);
                };
                DebugRenderer2.prototype.parentNode = function(node) {
                    return this.delegate.parentNode(node);
                };
                DebugRenderer2.prototype.nextSibling = function(node) {
                    return this.delegate.nextSibling(node);
                };
                DebugRenderer2.prototype.setValue = function(node, value) {
                    return this.delegate.setValue(node, value);
                };
                return DebugRenderer2;
            }();
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function overrideProvider(override) {
                initServicesIfNeeded();
                return Services.overrideProvider(override);
            }
            function clearProviderOverrides() {
                initServicesIfNeeded();
                return Services.clearProviderOverrides();
            }
            function createNgModuleFactory(ngModuleType, bootstrapComponents, defFactory) {
                return new NgModuleFactory_(ngModuleType, bootstrapComponents, defFactory);
            }
            var NgModuleFactory_ = function(_super) {
                __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](NgModuleFactory_, _super);
                function NgModuleFactory_(moduleType, _bootstrapComponents, _ngModuleDefFactory) {
                    var _this = _super.call(this) || this;
                    _this.moduleType = moduleType;
                    _this._bootstrapComponents = _bootstrapComponents;
                    _this._ngModuleDefFactory = _ngModuleDefFactory;
                    return _this;
                }
                NgModuleFactory_.prototype.create = function(parentInjector) {
                    initServicesIfNeeded();
                    var def = resolveDefinition(this._ngModuleDefFactory);
                    return Services.createNgModuleRef(this.moduleType, parentInjector || Injector.NULL, this._bootstrapComponents, def);
                };
                return NgModuleFactory_;
            }(NgModuleFactory);
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            function trigger$1(name, definitions) {
                return {
                    type: 7,
                    name: name,
                    definitions: definitions,
                    options: {}
                };
            }
            function animate$1(timings, styles) {
                if (styles === void 0) {
                    styles = null;
                }
                return {
                    type: 4,
                    styles: styles,
                    timings: timings
                };
            }
            function group$1(steps, options) {
                if (options === void 0) {
                    options = null;
                }
                return {
                    type: 3,
                    steps: steps,
                    options: options
                };
            }
            function sequence$1(steps, options) {
                if (options === void 0) {
                    options = null;
                }
                return {
                    type: 2,
                    steps: steps,
                    options: options
                };
            }
            function style$1(tokens) {
                return {
                    type: 6,
                    styles: tokens,
                    offset: null
                };
            }
            function state$1(name, styles, options) {
                return {
                    type: 0,
                    name: name,
                    styles: styles,
                    options: options
                };
            }
            function keyframes$1(steps) {
                return {
                    type: 5,
                    steps: steps
                };
            }
            function transition$1(stateChangeExpr, steps, options) {
                if (options === void 0) {
                    options = null;
                }
                return {
                    type: 1,
                    expr: stateChangeExpr,
                    animation: steps,
                    options: options
                };
            }
            /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
            var AUTO_STYLE$$1 = "*";
            function trigger$$1(name, definitions) {
                return trigger$1(name, definitions);
            }
            function animate$$1(timings, styles) {
                return animate$1(timings, styles);
            }
            function group$$1(steps) {
                return group$1(steps);
            }
            function sequence$$1(steps) {
                return sequence$1(steps);
            }
            function style$$1(tokens) {
                return style$1(tokens);
            }
            function state$$1(name, styles) {
                return state$1(name, styles);
            }
            function keyframes$$1(steps) {
                return keyframes$1(steps);
            }
            function transition$$1(stateChangeExpr, steps) {
                return transition$1(stateChangeExpr, steps);
            }
        }).call(__webpack_exports__, __webpack_require__("DuR2"));
    },
    "6BaH": function(module, exports, __webpack_require__) {
        "use strict";
        var ConnectableObservable_1 = __webpack_require__("sIYO");
        function multicast(subjectOrSubjectFactory, selector) {
            return function multicastOperatorFunction(source) {
                var subjectFactory;
                if (typeof subjectOrSubjectFactory === "function") {
                    subjectFactory = subjectOrSubjectFactory;
                } else {
                    subjectFactory = function subjectFactory() {
                        return subjectOrSubjectFactory;
                    };
                }
                if (typeof selector === "function") {
                    return source.lift(new MulticastOperator(subjectFactory, selector));
                }
                var connectable = Object.create(source, ConnectableObservable_1.connectableObservableDescriptor);
                connectable.source = source;
                connectable.subjectFactory = subjectFactory;
                return connectable;
            };
        }
        exports.multicast = multicast;
        var MulticastOperator = function() {
            function MulticastOperator(subjectFactory, selector) {
                this.subjectFactory = subjectFactory;
                this.selector = selector;
            }
            MulticastOperator.prototype.call = function(subscriber, source) {
                var selector = this.selector;
                var subject = this.subjectFactory();
                var subscription = selector(subject).subscribe(subscriber);
                subscription.add(source.subscribe(subject));
                return subscription;
            };
            return MulticastOperator;
        }();
        exports.MulticastOperator = MulticastOperator;
    },
    "7rB9": function(module, exports, __webpack_require__) {
        "use strict";
        var ForkJoinObservable_1 = __webpack_require__("t2qv");
        exports.forkJoin = ForkJoinObservable_1.ForkJoinObservable.create;
    },
    "9dR0": function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Subscriber_1 = __webpack_require__("mmVS");
        function refCount() {
            return function refCountOperatorFunction(source) {
                return source.lift(new RefCountOperator(source));
            };
        }
        exports.refCount = refCount;
        var RefCountOperator = function() {
            function RefCountOperator(connectable) {
                this.connectable = connectable;
            }
            RefCountOperator.prototype.call = function(subscriber, source) {
                var connectable = this.connectable;
                connectable._refCount++;
                var refCounter = new RefCountSubscriber(subscriber, connectable);
                var subscription = source.subscribe(refCounter);
                if (!refCounter.closed) {
                    refCounter.connection = connectable.connect();
                }
                return subscription;
            };
            return RefCountOperator;
        }();
        var RefCountSubscriber = function(_super) {
            __extends(RefCountSubscriber, _super);
            function RefCountSubscriber(destination, connectable) {
                _super.call(this, destination);
                this.connectable = connectable;
            }
            RefCountSubscriber.prototype._unsubscribe = function() {
                var connectable = this.connectable;
                if (!connectable) {
                    this.connection = null;
                    return;
                }
                this.connectable = null;
                var refCount = connectable._refCount;
                if (refCount <= 0) {
                    this.connection = null;
                    return;
                }
                connectable._refCount = refCount - 1;
                if (refCount > 1) {
                    this.connection = null;
                    return;
                }
                var connection = this.connection;
                var sharedConnection = connectable._connection;
                this.connection = null;
                if (sharedConnection && (!connection || sharedConnection === connection)) {
                    sharedConnection.unsubscribe();
                }
            };
            return RefCountSubscriber;
        }(Subscriber_1.Subscriber);
    },
    "9eyw": function(module, exports, __webpack_require__) {
        "use strict";
        var noop_1 = __webpack_require__("YOd+");
        function pipe() {
            var fns = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fns[_i - 0] = arguments[_i];
            }
            return pipeFromArray(fns);
        }
        exports.pipe = pipe;
        function pipeFromArray(fns) {
            if (!fns) {
                return noop_1.noop;
            }
            if (fns.length === 1) {
                return fns[0];
            }
            return function piped(input) {
                return fns.reduce(function(prev, fn) {
                    return fn(prev);
                }, input);
            };
        }
        exports.pipeFromArray = pipeFromArray;
    },
    "9omE": function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Subscriber_1 = __webpack_require__("mmVS");
        function map(project, thisArg) {
            return function mapOperation(source) {
                if (typeof project !== "function") {
                    throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                }
                return source.lift(new MapOperator(project, thisArg));
            };
        }
        exports.map = map;
        var MapOperator = function() {
            function MapOperator(project, thisArg) {
                this.project = project;
                this.thisArg = thisArg;
            }
            MapOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
            };
            return MapOperator;
        }();
        exports.MapOperator = MapOperator;
        var MapSubscriber = function(_super) {
            __extends(MapSubscriber, _super);
            function MapSubscriber(destination, project, thisArg) {
                _super.call(this, destination);
                this.project = project;
                this.count = 0;
                this.thisArg = thisArg || this;
            }
            MapSubscriber.prototype._next = function(value) {
                var result;
                try {
                    result = this.project.call(this.thisArg, value, this.count++);
                } catch (err) {
                    this.destination.error(err);
                    return;
                }
                this.destination.next(result);
            };
            return MapSubscriber;
        }(Subscriber_1.Subscriber);
    },
    ANGw: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var subscribeToResult_1 = __webpack_require__("CURp");
        var OuterSubscriber_1 = __webpack_require__("wAkD");
        function mergeMap(project, resultSelector, concurrent) {
            if (concurrent === void 0) {
                concurrent = Number.POSITIVE_INFINITY;
            }
            return function mergeMapOperatorFunction(source) {
                if (typeof resultSelector === "number") {
                    concurrent = resultSelector;
                    resultSelector = null;
                }
                return source.lift(new MergeMapOperator(project, resultSelector, concurrent));
            };
        }
        exports.mergeMap = mergeMap;
        var MergeMapOperator = function() {
            function MergeMapOperator(project, resultSelector, concurrent) {
                if (concurrent === void 0) {
                    concurrent = Number.POSITIVE_INFINITY;
                }
                this.project = project;
                this.resultSelector = resultSelector;
                this.concurrent = concurrent;
            }
            MergeMapOperator.prototype.call = function(observer, source) {
                return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
            };
            return MergeMapOperator;
        }();
        exports.MergeMapOperator = MergeMapOperator;
        var MergeMapSubscriber = function(_super) {
            __extends(MergeMapSubscriber, _super);
            function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
                if (concurrent === void 0) {
                    concurrent = Number.POSITIVE_INFINITY;
                }
                _super.call(this, destination);
                this.project = project;
                this.resultSelector = resultSelector;
                this.concurrent = concurrent;
                this.hasCompleted = false;
                this.buffer = [];
                this.active = 0;
                this.index = 0;
            }
            MergeMapSubscriber.prototype._next = function(value) {
                if (this.active < this.concurrent) {
                    this._tryNext(value);
                } else {
                    this.buffer.push(value);
                }
            };
            MergeMapSubscriber.prototype._tryNext = function(value) {
                var result;
                var index = this.index++;
                try {
                    result = this.project(value, index);
                } catch (err) {
                    this.destination.error(err);
                    return;
                }
                this.active++;
                this._innerSub(result, value, index);
            };
            MergeMapSubscriber.prototype._innerSub = function(ish, value, index) {
                this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
            };
            MergeMapSubscriber.prototype._complete = function() {
                this.hasCompleted = true;
                if (this.active === 0 && this.buffer.length === 0) {
                    this.destination.complete();
                }
            };
            MergeMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                if (this.resultSelector) {
                    this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
                } else {
                    this.destination.next(innerValue);
                }
            };
            MergeMapSubscriber.prototype._notifyResultSelector = function(outerValue, innerValue, outerIndex, innerIndex) {
                var result;
                try {
                    result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
                } catch (err) {
                    this.destination.error(err);
                    return;
                }
                this.destination.next(result);
            };
            MergeMapSubscriber.prototype.notifyComplete = function(innerSub) {
                var buffer = this.buffer;
                this.remove(innerSub);
                this.active--;
                if (buffer.length > 0) {
                    this._next(buffer.shift());
                } else if (this.active === 0 && this.hasCompleted) {
                    this.destination.complete();
                }
            };
            return MergeMapSubscriber;
        }(OuterSubscriber_1.OuterSubscriber);
        exports.MergeMapSubscriber = MergeMapSubscriber;
    },
    B00U: function(module, exports, __webpack_require__) {
        "use strict";
        var isArray_1 = __webpack_require__("Xajo");
        var isObject_1 = __webpack_require__("ICpg");
        var isFunction_1 = __webpack_require__("SKH6");
        var tryCatch_1 = __webpack_require__("+3eL");
        var errorObject_1 = __webpack_require__("WhVc");
        var UnsubscriptionError_1 = __webpack_require__("GIjk");
        var Subscription = function() {
            function Subscription(unsubscribe) {
                this.closed = false;
                this._parent = null;
                this._parents = null;
                this._subscriptions = null;
                if (unsubscribe) {
                    this._unsubscribe = unsubscribe;
                }
            }
            Subscription.prototype.unsubscribe = function() {
                var hasErrors = false;
                var errors;
                if (this.closed) {
                    return;
                }
                var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
                this.closed = true;
                this._parent = null;
                this._parents = null;
                this._subscriptions = null;
                var index = -1;
                var len = _parents ? _parents.length : 0;
                while (_parent) {
                    _parent.remove(this);
                    _parent = ++index < len && _parents[index] || null;
                }
                if (isFunction_1.isFunction(_unsubscribe)) {
                    var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ? flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [ errorObject_1.errorObject.e ]);
                    }
                }
                if (isArray_1.isArray(_subscriptions)) {
                    index = -1;
                    len = _subscriptions.length;
                    while (++index < len) {
                        var sub = _subscriptions[index];
                        if (isObject_1.isObject(sub)) {
                            var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                            if (trial === errorObject_1.errorObject) {
                                hasErrors = true;
                                errors = errors || [];
                                var err = errorObject_1.errorObject.e;
                                if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                                    errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                                } else {
                                    errors.push(err);
                                }
                            }
                        }
                    }
                }
                if (hasErrors) {
                    throw new UnsubscriptionError_1.UnsubscriptionError(errors);
                }
            };
            Subscription.prototype.add = function(teardown) {
                if (!teardown || teardown === Subscription.EMPTY) {
                    return Subscription.EMPTY;
                }
                if (teardown === this) {
                    return this;
                }
                var subscription = teardown;
                switch (typeof teardown) {
                  case "function":
                    subscription = new Subscription(teardown);

                  case "object":
                    if (subscription.closed || typeof subscription.unsubscribe !== "function") {
                        return subscription;
                    } else if (this.closed) {
                        subscription.unsubscribe();
                        return subscription;
                    } else if (typeof subscription._addParent !== "function") {
                        var tmp = subscription;
                        subscription = new Subscription();
                        subscription._subscriptions = [ tmp ];
                    }
                    break;

                  default:
                    throw new Error("unrecognized teardown " + teardown + " added to Subscription.");
                }
                var subscriptions = this._subscriptions || (this._subscriptions = []);
                subscriptions.push(subscription);
                subscription._addParent(this);
                return subscription;
            };
            Subscription.prototype.remove = function(subscription) {
                var subscriptions = this._subscriptions;
                if (subscriptions) {
                    var subscriptionIndex = subscriptions.indexOf(subscription);
                    if (subscriptionIndex !== -1) {
                        subscriptions.splice(subscriptionIndex, 1);
                    }
                }
            };
            Subscription.prototype._addParent = function(parent) {
                var _a = this, _parent = _a._parent, _parents = _a._parents;
                if (!_parent || _parent === parent) {
                    this._parent = parent;
                } else if (!_parents) {
                    this._parents = [ parent ];
                } else if (_parents.indexOf(parent) === -1) {
                    _parents.push(parent);
                }
            };
            Subscription.EMPTY = function(empty) {
                empty.closed = true;
                return empty;
            }(new Subscription());
            return Subscription;
        }();
        exports.Subscription = Subscription;
        function flattenUnsubscriptionErrors(errors) {
            return errors.reduce(function(errs, err) {
                return errs.concat(err instanceof UnsubscriptionError_1.UnsubscriptionError ? err.errors : err);
            }, []);
        }
    },
    CURp: function(module, exports, __webpack_require__) {
        "use strict";
        var root_1 = __webpack_require__("VOfZ");
        var isArrayLike_1 = __webpack_require__("1r8+");
        var isPromise_1 = __webpack_require__("aQl7");
        var isObject_1 = __webpack_require__("ICpg");
        var Observable_1 = __webpack_require__("rCTf");
        var iterator_1 = __webpack_require__("cdmN");
        var InnerSubscriber_1 = __webpack_require__("QqRK");
        var observable_1 = __webpack_require__("mbVC");
        function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
            var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
            if (destination.closed) {
                return null;
            }
            if (result instanceof Observable_1.Observable) {
                if (result._isScalar) {
                    destination.next(result.value);
                    destination.complete();
                    return null;
                } else {
                    destination.syncErrorThrowable = true;
                    return result.subscribe(destination);
                }
            } else if (isArrayLike_1.isArrayLike(result)) {
                for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
                    destination.next(result[i]);
                }
                if (!destination.closed) {
                    destination.complete();
                }
            } else if (isPromise_1.isPromise(result)) {
                result.then(function(value) {
                    if (!destination.closed) {
                        destination.next(value);
                        destination.complete();
                    }
                }, function(err) {
                    return destination.error(err);
                }).then(null, function(err) {
                    root_1.root.setTimeout(function() {
                        throw err;
                    });
                });
                return destination;
            } else if (result && typeof result[iterator_1.iterator] === "function") {
                var iterator = result[iterator_1.iterator]();
                do {
                    var item = iterator.next();
                    if (item.done) {
                        destination.complete();
                        break;
                    }
                    destination.next(item.value);
                    if (destination.closed) {
                        break;
                    }
                } while (true);
            } else if (result && typeof result[observable_1.observable] === "function") {
                var obs = result[observable_1.observable]();
                if (typeof obs.subscribe !== "function") {
                    destination.error(new TypeError("Provided object does not correctly implement Symbol.observable"));
                } else {
                    return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
                }
            } else {
                var value = isObject_1.isObject(result) ? "an invalid object" : "'" + result + "'";
                var msg = "You provided " + value + " where a stream was expected." + " You can provide an Observable, Promise, Array, or Iterable.";
                destination.error(new TypeError(msg));
            }
            return null;
        }
        exports.subscribeToResult = subscribeToResult;
    },
    DuR2: function(module, exports) {
        var g;
        g = function() {
            return this;
        }();
        try {
            g = g || Function("return this")() || (1, eval)("this");
        } catch (e) {
            if (typeof window === "object") g = window;
        }
        module.exports = g;
    },
    EEr4: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Observable_1 = __webpack_require__("rCTf");
        var Subscriber_1 = __webpack_require__("mmVS");
        var Subscription_1 = __webpack_require__("B00U");
        var ObjectUnsubscribedError_1 = __webpack_require__("IZVw");
        var SubjectSubscription_1 = __webpack_require__("ZJf8");
        var rxSubscriber_1 = __webpack_require__("r8ZY");
        var SubjectSubscriber = function(_super) {
            __extends(SubjectSubscriber, _super);
            function SubjectSubscriber(destination) {
                _super.call(this, destination);
                this.destination = destination;
            }
            return SubjectSubscriber;
        }(Subscriber_1.Subscriber);
        exports.SubjectSubscriber = SubjectSubscriber;
        var Subject = function(_super) {
            __extends(Subject, _super);
            function Subject() {
                _super.call(this);
                this.observers = [];
                this.closed = false;
                this.isStopped = false;
                this.hasError = false;
                this.thrownError = null;
            }
            Subject.prototype[rxSubscriber_1.rxSubscriber] = function() {
                return new SubjectSubscriber(this);
            };
            Subject.prototype.lift = function(operator) {
                var subject = new AnonymousSubject(this, this);
                subject.operator = operator;
                return subject;
            };
            Subject.prototype.next = function(value) {
                if (this.closed) {
                    throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                }
                if (!this.isStopped) {
                    var observers = this.observers;
                    var len = observers.length;
                    var copy = observers.slice();
                    for (var i = 0; i < len; i++) {
                        copy[i].next(value);
                    }
                }
            };
            Subject.prototype.error = function(err) {
                if (this.closed) {
                    throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                }
                this.hasError = true;
                this.thrownError = err;
                this.isStopped = true;
                var observers = this.observers;
                var len = observers.length;
                var copy = observers.slice();
                for (var i = 0; i < len; i++) {
                    copy[i].error(err);
                }
                this.observers.length = 0;
            };
            Subject.prototype.complete = function() {
                if (this.closed) {
                    throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                }
                this.isStopped = true;
                var observers = this.observers;
                var len = observers.length;
                var copy = observers.slice();
                for (var i = 0; i < len; i++) {
                    copy[i].complete();
                }
                this.observers.length = 0;
            };
            Subject.prototype.unsubscribe = function() {
                this.isStopped = true;
                this.closed = true;
                this.observers = null;
            };
            Subject.prototype._trySubscribe = function(subscriber) {
                if (this.closed) {
                    throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                } else {
                    return _super.prototype._trySubscribe.call(this, subscriber);
                }
            };
            Subject.prototype._subscribe = function(subscriber) {
                if (this.closed) {
                    throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                } else if (this.hasError) {
                    subscriber.error(this.thrownError);
                    return Subscription_1.Subscription.EMPTY;
                } else if (this.isStopped) {
                    subscriber.complete();
                    return Subscription_1.Subscription.EMPTY;
                } else {
                    this.observers.push(subscriber);
                    return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
                }
            };
            Subject.prototype.asObservable = function() {
                var observable = new Observable_1.Observable();
                observable.source = this;
                return observable;
            };
            Subject.create = function(destination, source) {
                return new AnonymousSubject(destination, source);
            };
            return Subject;
        }(Observable_1.Observable);
        exports.Subject = Subject;
        var AnonymousSubject = function(_super) {
            __extends(AnonymousSubject, _super);
            function AnonymousSubject(destination, source) {
                _super.call(this);
                this.destination = destination;
                this.source = source;
            }
            AnonymousSubject.prototype.next = function(value) {
                var destination = this.destination;
                if (destination && destination.next) {
                    destination.next(value);
                }
            };
            AnonymousSubject.prototype.error = function(err) {
                var destination = this.destination;
                if (destination && destination.error) {
                    this.destination.error(err);
                }
            };
            AnonymousSubject.prototype.complete = function() {
                var destination = this.destination;
                if (destination && destination.complete) {
                    this.destination.complete();
                }
            };
            AnonymousSubject.prototype._subscribe = function(subscriber) {
                var source = this.source;
                if (source) {
                    return this.source.subscribe(subscriber);
                } else {
                    return Subscription_1.Subscription.EMPTY;
                }
            };
            return AnonymousSubject;
        }(Subject);
        exports.AnonymousSubject = AnonymousSubject;
    },
    Fzro: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("TToO");
        var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("3j3K");
        var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("rCTf");
        var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
        var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("Qbdm");
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return BrowserXhr;
        });
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return XHRBackend;
        });
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return BaseRequestOptions;
        });
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return RequestOptions;
        });
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return BaseResponseOptions;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return ResponseOptions;
        });
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return Http;
        });
        __webpack_require__.d(__webpack_exports__, "k", function() {
            return HttpModule;
        });
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return XSRFStrategy;
        });
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return _createDefaultCookieXSRFStrategy;
        });
        __webpack_require__.d(__webpack_exports__, "j", function() {
            return httpFactory;
        });
        /**
 * @license Angular v4.4.7
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var BrowserXhr = function() {
            function BrowserXhr() {}
            BrowserXhr.prototype.build = function() {
                return new XMLHttpRequest();
            };
            return BrowserXhr;
        }();
        BrowserXhr.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        BrowserXhr.ctorParameters = function() {
            return [];
        };
        var RequestMethod = {};
        RequestMethod.Get = 0;
        RequestMethod.Post = 1;
        RequestMethod.Put = 2;
        RequestMethod.Delete = 3;
        RequestMethod.Options = 4;
        RequestMethod.Head = 5;
        RequestMethod.Patch = 6;
        RequestMethod[RequestMethod.Get] = "Get";
        RequestMethod[RequestMethod.Post] = "Post";
        RequestMethod[RequestMethod.Put] = "Put";
        RequestMethod[RequestMethod.Delete] = "Delete";
        RequestMethod[RequestMethod.Options] = "Options";
        RequestMethod[RequestMethod.Head] = "Head";
        RequestMethod[RequestMethod.Patch] = "Patch";
        var ReadyState = {};
        ReadyState.Unsent = 0;
        ReadyState.Open = 1;
        ReadyState.HeadersReceived = 2;
        ReadyState.Loading = 3;
        ReadyState.Done = 4;
        ReadyState.Cancelled = 5;
        ReadyState[ReadyState.Unsent] = "Unsent";
        ReadyState[ReadyState.Open] = "Open";
        ReadyState[ReadyState.HeadersReceived] = "HeadersReceived";
        ReadyState[ReadyState.Loading] = "Loading";
        ReadyState[ReadyState.Done] = "Done";
        ReadyState[ReadyState.Cancelled] = "Cancelled";
        var ResponseType = {};
        ResponseType.Basic = 0;
        ResponseType.Cors = 1;
        ResponseType.Default = 2;
        ResponseType.Error = 3;
        ResponseType.Opaque = 4;
        ResponseType[ResponseType.Basic] = "Basic";
        ResponseType[ResponseType.Cors] = "Cors";
        ResponseType[ResponseType.Default] = "Default";
        ResponseType[ResponseType.Error] = "Error";
        ResponseType[ResponseType.Opaque] = "Opaque";
        var ContentType = {};
        ContentType.NONE = 0;
        ContentType.JSON = 1;
        ContentType.FORM = 2;
        ContentType.FORM_DATA = 3;
        ContentType.TEXT = 4;
        ContentType.BLOB = 5;
        ContentType.ARRAY_BUFFER = 6;
        ContentType[ContentType.NONE] = "NONE";
        ContentType[ContentType.JSON] = "JSON";
        ContentType[ContentType.FORM] = "FORM";
        ContentType[ContentType.FORM_DATA] = "FORM_DATA";
        ContentType[ContentType.TEXT] = "TEXT";
        ContentType[ContentType.BLOB] = "BLOB";
        ContentType[ContentType.ARRAY_BUFFER] = "ARRAY_BUFFER";
        var ResponseContentType = {};
        ResponseContentType.Text = 0;
        ResponseContentType.Json = 1;
        ResponseContentType.ArrayBuffer = 2;
        ResponseContentType.Blob = 3;
        ResponseContentType[ResponseContentType.Text] = "Text";
        ResponseContentType[ResponseContentType.Json] = "Json";
        ResponseContentType[ResponseContentType.ArrayBuffer] = "ArrayBuffer";
        ResponseContentType[ResponseContentType.Blob] = "Blob";
        var Headers = function() {
            function Headers(headers) {
                var _this = this;
                this._headers = new Map();
                this._normalizedNames = new Map();
                if (!headers) {
                    return;
                }
                if (headers instanceof Headers) {
                    headers.forEach(function(values, name) {
                        values.forEach(function(value) {
                            return _this.append(name, value);
                        });
                    });
                    return;
                }
                Object.keys(headers).forEach(function(name) {
                    var values = Array.isArray(headers[name]) ? headers[name] : [ headers[name] ];
                    _this.delete(name);
                    values.forEach(function(value) {
                        return _this.append(name, value);
                    });
                });
            }
            Headers.fromResponseHeaderString = function(headersString) {
                var headers = new Headers();
                headersString.split("\n").forEach(function(line) {
                    var index = line.indexOf(":");
                    if (index > 0) {
                        var name = line.slice(0, index);
                        var value = line.slice(index + 1).trim();
                        headers.set(name, value);
                    }
                });
                return headers;
            };
            Headers.prototype.append = function(name, value) {
                var values = this.getAll(name);
                if (values === null) {
                    this.set(name, value);
                } else {
                    values.push(value);
                }
            };
            Headers.prototype.delete = function(name) {
                var lcName = name.toLowerCase();
                this._normalizedNames.delete(lcName);
                this._headers.delete(lcName);
            };
            Headers.prototype.forEach = function(fn) {
                var _this = this;
                this._headers.forEach(function(values, lcName) {
                    return fn(values, _this._normalizedNames.get(lcName), _this._headers);
                });
            };
            Headers.prototype.get = function(name) {
                var values = this.getAll(name);
                if (values === null) {
                    return null;
                }
                return values.length > 0 ? values[0] : null;
            };
            Headers.prototype.has = function(name) {
                return this._headers.has(name.toLowerCase());
            };
            Headers.prototype.keys = function() {
                return Array.from(this._normalizedNames.values());
            };
            Headers.prototype.set = function(name, value) {
                if (Array.isArray(value)) {
                    if (value.length) {
                        this._headers.set(name.toLowerCase(), [ value.join(",") ]);
                    }
                } else {
                    this._headers.set(name.toLowerCase(), [ value ]);
                }
                this.mayBeSetNormalizedName(name);
            };
            Headers.prototype.values = function() {
                return Array.from(this._headers.values());
            };
            Headers.prototype.toJSON = function() {
                var _this = this;
                var serialized = {};
                this._headers.forEach(function(values, name) {
                    var split = [];
                    values.forEach(function(v) {
                        return split.push.apply(split, v.split(","));
                    });
                    serialized[_this._normalizedNames.get(name)] = split;
                });
                return serialized;
            };
            Headers.prototype.getAll = function(name) {
                return this.has(name) ? this._headers.get(name.toLowerCase()) || null : null;
            };
            Headers.prototype.entries = function() {
                throw new Error('"entries" method is not implemented on Headers class');
            };
            Headers.prototype.mayBeSetNormalizedName = function(name) {
                var lcName = name.toLowerCase();
                if (!this._normalizedNames.has(lcName)) {
                    this._normalizedNames.set(lcName, name);
                }
            };
            return Headers;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var ResponseOptions = function() {
            function ResponseOptions(opts) {
                if (opts === void 0) {
                    opts = {};
                }
                var body = opts.body, status = opts.status, headers = opts.headers, statusText = opts.statusText, type = opts.type, url = opts.url;
                this.body = body != null ? body : null;
                this.status = status != null ? status : null;
                this.headers = headers != null ? headers : null;
                this.statusText = statusText != null ? statusText : null;
                this.type = type != null ? type : null;
                this.url = url != null ? url : null;
            }
            ResponseOptions.prototype.merge = function(options) {
                return new ResponseOptions({
                    body: options && options.body != null ? options.body : this.body,
                    status: options && options.status != null ? options.status : this.status,
                    headers: options && options.headers != null ? options.headers : this.headers,
                    statusText: options && options.statusText != null ? options.statusText : this.statusText,
                    type: options && options.type != null ? options.type : this.type,
                    url: options && options.url != null ? options.url : this.url
                });
            };
            return ResponseOptions;
        }();
        var BaseResponseOptions = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](BaseResponseOptions, _super);
            function BaseResponseOptions() {
                return _super.call(this, {
                    status: 200,
                    statusText: "Ok",
                    type: ResponseType.Default,
                    headers: new Headers()
                }) || this;
            }
            return BaseResponseOptions;
        }(ResponseOptions);
        BaseResponseOptions.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        BaseResponseOptions.ctorParameters = function() {
            return [];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var ConnectionBackend = function() {
            function ConnectionBackend() {}
            ConnectionBackend.prototype.createConnection = function(request) {};
            return ConnectionBackend;
        }();
        var Connection = function() {
            function Connection() {}
            return Connection;
        }();
        var XSRFStrategy = function() {
            function XSRFStrategy() {}
            XSRFStrategy.prototype.configureRequest = function(req) {};
            return XSRFStrategy;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        function normalizeMethodName(method) {
            if (typeof method !== "string") return method;
            switch (method.toUpperCase()) {
              case "GET":
                return RequestMethod.Get;

              case "POST":
                return RequestMethod.Post;

              case "PUT":
                return RequestMethod.Put;

              case "DELETE":
                return RequestMethod.Delete;

              case "OPTIONS":
                return RequestMethod.Options;

              case "HEAD":
                return RequestMethod.Head;

              case "PATCH":
                return RequestMethod.Patch;
            }
            throw new Error('Invalid request method. The method "' + method + '" is not supported.');
        }
        var isSuccess = function(status) {
            return status >= 200 && status < 300;
        };
        function getResponseURL(xhr) {
            if ("responseURL" in xhr) {
                return xhr.responseURL;
            }
            if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
                return xhr.getResponseHeader("X-Request-URL");
            }
            return null;
        }
        function stringToArrayBuffer(input) {
            var view = new Uint16Array(input.length);
            for (var i = 0, strLen = input.length; i < strLen; i++) {
                view[i] = input.charCodeAt(i);
            }
            return view.buffer;
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * @param {?=} rawParams
 * @return {?}
 */
        function paramParser(rawParams) {
            if (rawParams === void 0) {
                rawParams = "";
            }
            var map = new Map();
            if (rawParams.length > 0) {
                var params = rawParams.split("&");
                params.forEach(function(param) {
                    var eqIdx = param.indexOf("=");
                    var _a = eqIdx == -1 ? [ param, "" ] : [ param.slice(0, eqIdx), param.slice(eqIdx + 1) ], key = _a[0], val = _a[1];
                    var list = map.get(key) || [];
                    list.push(val);
                    map.set(key, list);
                });
            }
            return map;
        }
        var QueryEncoder = function() {
            function QueryEncoder() {}
            QueryEncoder.prototype.encodeKey = function(k) {
                return standardEncoding(k);
            };
            QueryEncoder.prototype.encodeValue = function(v) {
                return standardEncoding(v);
            };
            return QueryEncoder;
        }();
        function standardEncoding(v) {
            return encodeURIComponent(v).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/gi, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%2B/gi, "+").replace(/%3D/gi, "=").replace(/%3F/gi, "?").replace(/%2F/gi, "/");
        }
        var URLSearchParams = function() {
            function URLSearchParams(rawParams, queryEncoder) {
                if (rawParams === void 0) {
                    rawParams = "";
                }
                if (queryEncoder === void 0) {
                    queryEncoder = new QueryEncoder();
                }
                this.rawParams = rawParams;
                this.queryEncoder = queryEncoder;
                this.paramsMap = paramParser(rawParams);
            }
            URLSearchParams.prototype.clone = function() {
                var clone = new URLSearchParams("", this.queryEncoder);
                clone.appendAll(this);
                return clone;
            };
            URLSearchParams.prototype.has = function(param) {
                return this.paramsMap.has(param);
            };
            URLSearchParams.prototype.get = function(param) {
                var storedParam = this.paramsMap.get(param);
                return Array.isArray(storedParam) ? storedParam[0] : null;
            };
            URLSearchParams.prototype.getAll = function(param) {
                return this.paramsMap.get(param) || [];
            };
            URLSearchParams.prototype.set = function(param, val) {
                if (val === void 0 || val === null) {
                    this.delete(param);
                    return;
                }
                var list = this.paramsMap.get(param) || [];
                list.length = 0;
                list.push(val);
                this.paramsMap.set(param, list);
            };
            URLSearchParams.prototype.setAll = function(searchParams) {
                var _this = this;
                searchParams.paramsMap.forEach(function(value, param) {
                    var list = _this.paramsMap.get(param) || [];
                    list.length = 0;
                    list.push(value[0]);
                    _this.paramsMap.set(param, list);
                });
            };
            URLSearchParams.prototype.append = function(param, val) {
                if (val === void 0 || val === null) return;
                var list = this.paramsMap.get(param) || [];
                list.push(val);
                this.paramsMap.set(param, list);
            };
            URLSearchParams.prototype.appendAll = function(searchParams) {
                var _this = this;
                searchParams.paramsMap.forEach(function(value, param) {
                    var list = _this.paramsMap.get(param) || [];
                    for (var i = 0; i < value.length; ++i) {
                        list.push(value[i]);
                    }
                    _this.paramsMap.set(param, list);
                });
            };
            URLSearchParams.prototype.replaceAll = function(searchParams) {
                var _this = this;
                searchParams.paramsMap.forEach(function(value, param) {
                    var list = _this.paramsMap.get(param) || [];
                    list.length = 0;
                    for (var i = 0; i < value.length; ++i) {
                        list.push(value[i]);
                    }
                    _this.paramsMap.set(param, list);
                });
            };
            URLSearchParams.prototype.toString = function() {
                var _this = this;
                var paramsList = [];
                this.paramsMap.forEach(function(values, k) {
                    values.forEach(function(v) {
                        return paramsList.push(_this.queryEncoder.encodeKey(k) + "=" + _this.queryEncoder.encodeValue(v));
                    });
                });
                return paramsList.join("&");
            };
            URLSearchParams.prototype.delete = function(param) {
                this.paramsMap.delete(param);
            };
            return URLSearchParams;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var Body = function() {
            function Body() {}
            Body.prototype.json = function() {
                if (typeof this._body === "string") {
                    return JSON.parse(this._body);
                }
                if (this._body instanceof ArrayBuffer) {
                    return JSON.parse(this.text());
                }
                return this._body;
            };
            Body.prototype.text = function(encodingHint) {
                if (encodingHint === void 0) {
                    encodingHint = "legacy";
                }
                if (this._body instanceof URLSearchParams) {
                    return this._body.toString();
                }
                if (this._body instanceof ArrayBuffer) {
                    switch (encodingHint) {
                      case "legacy":
                        return String.fromCharCode.apply(null, new Uint16Array(this._body));

                      case "iso-8859":
                        return String.fromCharCode.apply(null, new Uint8Array(this._body));

                      default:
                        throw new Error("Invalid value for encodingHint: " + encodingHint);
                    }
                }
                if (this._body == null) {
                    return "";
                }
                if (typeof this._body === "object") {
                    return JSON.stringify(this._body, null, 2);
                }
                return this._body.toString();
            };
            Body.prototype.arrayBuffer = function() {
                if (this._body instanceof ArrayBuffer) {
                    return this._body;
                }
                return stringToArrayBuffer(this.text());
            };
            Body.prototype.blob = function() {
                if (this._body instanceof Blob) {
                    return this._body;
                }
                if (this._body instanceof ArrayBuffer) {
                    return new Blob([ this._body ]);
                }
                throw new Error("The request body isn't either a blob or an array buffer");
            };
            return Body;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var Response = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](Response, _super);
            function Response(responseOptions) {
                var _this = _super.call(this) || this;
                _this._body = responseOptions.body;
                _this.status = responseOptions.status;
                _this.ok = _this.status >= 200 && _this.status <= 299;
                _this.statusText = responseOptions.statusText;
                _this.headers = responseOptions.headers;
                _this.type = responseOptions.type;
                _this.url = responseOptions.url;
                return _this;
            }
            Response.prototype.toString = function() {
                return "Response with status: " + this.status + " " + this.statusText + " for URL: " + this.url;
            };
            return Response;
        }(Body);
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var _nextRequestId = 0;
        var JSONP_HOME = "__ng_jsonp__";
        var _jsonpConnections = null;
        function _getJsonpConnections() {
            var w = typeof window == "object" ? window : {};
            if (_jsonpConnections === null) {
                _jsonpConnections = w[JSONP_HOME] = {};
            }
            return _jsonpConnections;
        }
        var BrowserJsonp = function() {
            function BrowserJsonp() {}
            BrowserJsonp.prototype.build = function(url) {
                var node = document.createElement("script");
                node.src = url;
                return node;
            };
            BrowserJsonp.prototype.nextRequestID = function() {
                return "__req" + _nextRequestId++;
            };
            BrowserJsonp.prototype.requestCallback = function(id) {
                return JSONP_HOME + "." + id + ".finished";
            };
            BrowserJsonp.prototype.exposeConnection = function(id, connection) {
                var connections = _getJsonpConnections();
                connections[id] = connection;
            };
            BrowserJsonp.prototype.removeConnection = function(id) {
                var connections = _getJsonpConnections();
                connections[id] = null;
            };
            BrowserJsonp.prototype.send = function(node) {
                document.body.appendChild(node);
            };
            BrowserJsonp.prototype.cleanup = function(node) {
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            };
            return BrowserJsonp;
        }();
        BrowserJsonp.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        BrowserJsonp.ctorParameters = function() {
            return [];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var JSONP_ERR_NO_CALLBACK = "JSONP injected script did not invoke callback.";
        var JSONP_ERR_WRONG_METHOD = "JSONP requests must use GET request method.";
        var JSONPConnection = function() {
            function JSONPConnection() {}
            JSONPConnection.prototype.finished = function(data) {};
            return JSONPConnection;
        }();
        var JSONPConnection_ = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](JSONPConnection_, _super);
            function JSONPConnection_(req, _dom, baseResponseOptions) {
                var _this = _super.call(this) || this;
                _this._dom = _dom;
                _this.baseResponseOptions = baseResponseOptions;
                _this._finished = false;
                if (req.method !== RequestMethod.Get) {
                    throw new TypeError(JSONP_ERR_WRONG_METHOD);
                }
                _this.request = req;
                _this.response = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function(responseObserver) {
                    _this.readyState = ReadyState.Loading;
                    var id = _this._id = _dom.nextRequestID();
                    _dom.exposeConnection(id, _this);
                    var callback = _dom.requestCallback(_this._id);
                    var url = req.url;
                    if (url.indexOf("=JSONP_CALLBACK&") > -1) {
                        url = url.replace("=JSONP_CALLBACK&", "=" + callback + "&");
                    } else if (url.lastIndexOf("=JSONP_CALLBACK") === url.length - "=JSONP_CALLBACK".length) {
                        url = url.substring(0, url.length - "=JSONP_CALLBACK".length) + ("=" + callback);
                    }
                    var script = _this._script = _dom.build(url);
                    var onLoad = function(event) {
                        if (_this.readyState === ReadyState.Cancelled) return;
                        _this.readyState = ReadyState.Done;
                        _dom.cleanup(script);
                        if (!_this._finished) {
                            var responseOptions_1 = new ResponseOptions({
                                body: JSONP_ERR_NO_CALLBACK,
                                type: ResponseType.Error,
                                url: url
                            });
                            if (baseResponseOptions) {
                                responseOptions_1 = baseResponseOptions.merge(responseOptions_1);
                            }
                            responseObserver.error(new Response(responseOptions_1));
                            return;
                        }
                        var responseOptions = new ResponseOptions({
                            body: _this._responseData,
                            url: url
                        });
                        if (_this.baseResponseOptions) {
                            responseOptions = _this.baseResponseOptions.merge(responseOptions);
                        }
                        responseObserver.next(new Response(responseOptions));
                        responseObserver.complete();
                    };
                    var onError = function(error) {
                        if (_this.readyState === ReadyState.Cancelled) return;
                        _this.readyState = ReadyState.Done;
                        _dom.cleanup(script);
                        var responseOptions = new ResponseOptions({
                            body: error.message,
                            type: ResponseType.Error
                        });
                        if (baseResponseOptions) {
                            responseOptions = baseResponseOptions.merge(responseOptions);
                        }
                        responseObserver.error(new Response(responseOptions));
                    };
                    script.addEventListener("load", onLoad);
                    script.addEventListener("error", onError);
                    _dom.send(script);
                    return function() {
                        _this.readyState = ReadyState.Cancelled;
                        script.removeEventListener("load", onLoad);
                        script.removeEventListener("error", onError);
                        _this._dom.cleanup(script);
                    };
                });
                return _this;
            }
            JSONPConnection_.prototype.finished = function(data) {
                this._finished = true;
                this._dom.removeConnection(this._id);
                if (this.readyState === ReadyState.Cancelled) return;
                this._responseData = data;
            };
            return JSONPConnection_;
        }(JSONPConnection);
        var JSONPBackend = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](JSONPBackend, _super);
            function JSONPBackend() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return JSONPBackend;
        }(ConnectionBackend);
        var JSONPBackend_ = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](JSONPBackend_, _super);
            function JSONPBackend_(_browserJSONP, _baseResponseOptions) {
                var _this = _super.call(this) || this;
                _this._browserJSONP = _browserJSONP;
                _this._baseResponseOptions = _baseResponseOptions;
                return _this;
            }
            JSONPBackend_.prototype.createConnection = function(request) {
                return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
            };
            return JSONPBackend_;
        }(JSONPBackend);
        JSONPBackend_.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        JSONPBackend_.ctorParameters = function() {
            return [ {
                type: BrowserJsonp
            }, {
                type: ResponseOptions
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var XSSI_PREFIX = /^\)\]\}',?\n/;
        var XHRConnection = function() {
            function XHRConnection(req, browserXHR, baseResponseOptions) {
                var _this = this;
                this.request = req;
                this.response = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function(responseObserver) {
                    var _xhr = browserXHR.build();
                    _xhr.open(RequestMethod[req.method].toUpperCase(), req.url);
                    if (req.withCredentials != null) {
                        _xhr.withCredentials = req.withCredentials;
                    }
                    var onLoad = function() {
                        var status = _xhr.status === 1223 ? 204 : _xhr.status;
                        var body = null;
                        if (status !== 204) {
                            body = typeof _xhr.response === "undefined" ? _xhr.responseText : _xhr.response;
                            if (typeof body === "string") {
                                body = body.replace(XSSI_PREFIX, "");
                            }
                        }
                        if (status === 0) {
                            status = body ? 200 : 0;
                        }
                        var headers = Headers.fromResponseHeaderString(_xhr.getAllResponseHeaders());
                        var url = getResponseURL(_xhr) || req.url;
                        var statusText = _xhr.statusText || "OK";
                        var responseOptions = new ResponseOptions({
                            body: body,
                            status: status,
                            headers: headers,
                            statusText: statusText,
                            url: url
                        });
                        if (baseResponseOptions != null) {
                            responseOptions = baseResponseOptions.merge(responseOptions);
                        }
                        var response = new Response(responseOptions);
                        response.ok = isSuccess(status);
                        if (response.ok) {
                            responseObserver.next(response);
                            responseObserver.complete();
                            return;
                        }
                        responseObserver.error(response);
                    };
                    var onError = function(err) {
                        var responseOptions = new ResponseOptions({
                            body: err,
                            type: ResponseType.Error,
                            status: _xhr.status,
                            statusText: _xhr.statusText
                        });
                        if (baseResponseOptions != null) {
                            responseOptions = baseResponseOptions.merge(responseOptions);
                        }
                        responseObserver.error(new Response(responseOptions));
                    };
                    _this.setDetectedContentType(req, _xhr);
                    if (req.headers == null) {
                        req.headers = new Headers();
                    }
                    if (!req.headers.has("Accept")) {
                        req.headers.append("Accept", "application/json, text/plain, */*");
                    }
                    req.headers.forEach(function(values, name) {
                        return _xhr.setRequestHeader(name, values.join(","));
                    });
                    if (req.responseType != null && _xhr.responseType != null) {
                        switch (req.responseType) {
                          case ResponseContentType.ArrayBuffer:
                            _xhr.responseType = "arraybuffer";
                            break;

                          case ResponseContentType.Json:
                            _xhr.responseType = "json";
                            break;

                          case ResponseContentType.Text:
                            _xhr.responseType = "text";
                            break;

                          case ResponseContentType.Blob:
                            _xhr.responseType = "blob";
                            break;

                          default:
                            throw new Error("The selected responseType is not supported");
                        }
                    }
                    _xhr.addEventListener("load", onLoad);
                    _xhr.addEventListener("error", onError);
                    _xhr.send(_this.request.getBody());
                    return function() {
                        _xhr.removeEventListener("load", onLoad);
                        _xhr.removeEventListener("error", onError);
                        _xhr.abort();
                    };
                });
            }
            XHRConnection.prototype.setDetectedContentType = function(req, _xhr) {
                if (req.headers != null && req.headers.get("Content-Type") != null) {
                    return;
                }
                switch (req.contentType) {
                  case ContentType.NONE:
                    break;

                  case ContentType.JSON:
                    _xhr.setRequestHeader("content-type", "application/json");
                    break;

                  case ContentType.FORM:
                    _xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                    break;

                  case ContentType.TEXT:
                    _xhr.setRequestHeader("content-type", "text/plain");
                    break;

                  case ContentType.BLOB:
                    var blob = req.blob();
                    if (blob.type) {
                        _xhr.setRequestHeader("content-type", blob.type);
                    }
                    break;
                }
            };
            return XHRConnection;
        }();
        var CookieXSRFStrategy = function() {
            function CookieXSRFStrategy(_cookieName, _headerName) {
                if (_cookieName === void 0) {
                    _cookieName = "XSRF-TOKEN";
                }
                if (_headerName === void 0) {
                    _headerName = "X-XSRF-TOKEN";
                }
                this._cookieName = _cookieName;
                this._headerName = _headerName;
            }
            CookieXSRFStrategy.prototype.configureRequest = function(req) {
                var xsrfToken = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["t"])().getCookie(this._cookieName);
                if (xsrfToken) {
                    req.headers.set(this._headerName, xsrfToken);
                }
            };
            return CookieXSRFStrategy;
        }();
        var XHRBackend = function() {
            function XHRBackend(_browserXHR, _baseResponseOptions, _xsrfStrategy) {
                this._browserXHR = _browserXHR;
                this._baseResponseOptions = _baseResponseOptions;
                this._xsrfStrategy = _xsrfStrategy;
            }
            XHRBackend.prototype.createConnection = function(request) {
                this._xsrfStrategy.configureRequest(request);
                return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
            };
            return XHRBackend;
        }();
        XHRBackend.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        XHRBackend.ctorParameters = function() {
            return [ {
                type: BrowserXhr
            }, {
                type: ResponseOptions
            }, {
                type: XSRFStrategy
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var RequestOptions = function() {
            function RequestOptions(opts) {
                if (opts === void 0) {
                    opts = {};
                }
                var method = opts.method, headers = opts.headers, body = opts.body, url = opts.url, search = opts.search, params = opts.params, withCredentials = opts.withCredentials, responseType = opts.responseType;
                this.method = method != null ? normalizeMethodName(method) : null;
                this.headers = headers != null ? headers : null;
                this.body = body != null ? body : null;
                this.url = url != null ? url : null;
                this.params = this._mergeSearchParams(params || search);
                this.withCredentials = withCredentials != null ? withCredentials : null;
                this.responseType = responseType != null ? responseType : null;
            }
            Object.defineProperty(RequestOptions.prototype, "search", {
                get: function() {
                    return this.params;
                },
                set: function(params) {
                    this.params = params;
                },
                enumerable: true,
                configurable: true
            });
            RequestOptions.prototype.merge = function(options) {
                return new RequestOptions({
                    method: options && options.method != null ? options.method : this.method,
                    headers: options && options.headers != null ? options.headers : new Headers(this.headers),
                    body: options && options.body != null ? options.body : this.body,
                    url: options && options.url != null ? options.url : this.url,
                    params: options && this._mergeSearchParams(options.params || options.search),
                    withCredentials: options && options.withCredentials != null ? options.withCredentials : this.withCredentials,
                    responseType: options && options.responseType != null ? options.responseType : this.responseType
                });
            };
            RequestOptions.prototype._mergeSearchParams = function(params) {
                if (!params) return this.params;
                if (params instanceof URLSearchParams) {
                    return params.clone();
                }
                if (typeof params === "string") {
                    return new URLSearchParams(params);
                }
                return this._parseParams(params);
            };
            RequestOptions.prototype._parseParams = function(objParams) {
                var _this = this;
                if (objParams === void 0) {
                    objParams = {};
                }
                var params = new URLSearchParams();
                Object.keys(objParams).forEach(function(key) {
                    var value = objParams[key];
                    if (Array.isArray(value)) {
                        value.forEach(function(item) {
                            return _this._appendParam(key, item, params);
                        });
                    } else {
                        _this._appendParam(key, value, params);
                    }
                });
                return params;
            };
            RequestOptions.prototype._appendParam = function(key, value, params) {
                if (typeof value !== "string") {
                    value = JSON.stringify(value);
                }
                params.append(key, value);
            };
            return RequestOptions;
        }();
        var BaseRequestOptions = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](BaseRequestOptions, _super);
            function BaseRequestOptions() {
                return _super.call(this, {
                    method: RequestMethod.Get,
                    headers: new Headers()
                }) || this;
            }
            return BaseRequestOptions;
        }(RequestOptions);
        BaseRequestOptions.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        BaseRequestOptions.ctorParameters = function() {
            return [];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var Request = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](Request, _super);
            function Request(requestOptions) {
                var _this = _super.call(this) || this;
                var url = requestOptions.url;
                _this.url = requestOptions.url;
                var paramsArg = requestOptions.params || requestOptions.search;
                if (paramsArg) {
                    var params = void 0;
                    if (typeof paramsArg === "object" && !(paramsArg instanceof URLSearchParams)) {
                        params = urlEncodeParams(paramsArg).toString();
                    } else {
                        params = paramsArg.toString();
                    }
                    if (params.length > 0) {
                        var prefix = "?";
                        if (_this.url.indexOf("?") != -1) {
                            prefix = _this.url[_this.url.length - 1] == "&" ? "" : "&";
                        }
                        _this.url = url + prefix + params;
                    }
                }
                _this._body = requestOptions.body;
                _this.method = normalizeMethodName(requestOptions.method);
                _this.headers = new Headers(requestOptions.headers);
                _this.contentType = _this.detectContentType();
                _this.withCredentials = requestOptions.withCredentials;
                _this.responseType = requestOptions.responseType;
                return _this;
            }
            Request.prototype.detectContentType = function() {
                switch (this.headers.get("content-type")) {
                  case "application/json":
                    return ContentType.JSON;

                  case "application/x-www-form-urlencoded":
                    return ContentType.FORM;

                  case "multipart/form-data":
                    return ContentType.FORM_DATA;

                  case "text/plain":
                  case "text/html":
                    return ContentType.TEXT;

                  case "application/octet-stream":
                    return this._body instanceof ArrayBuffer$1 ? ContentType.ARRAY_BUFFER : ContentType.BLOB;

                  default:
                    return this.detectContentTypeFromBody();
                }
            };
            Request.prototype.detectContentTypeFromBody = function() {
                if (this._body == null) {
                    return ContentType.NONE;
                } else if (this._body instanceof URLSearchParams) {
                    return ContentType.FORM;
                } else if (this._body instanceof FormData) {
                    return ContentType.FORM_DATA;
                } else if (this._body instanceof Blob$1) {
                    return ContentType.BLOB;
                } else if (this._body instanceof ArrayBuffer$1) {
                    return ContentType.ARRAY_BUFFER;
                } else if (this._body && typeof this._body === "object") {
                    return ContentType.JSON;
                } else {
                    return ContentType.TEXT;
                }
            };
            Request.prototype.getBody = function() {
                switch (this.contentType) {
                  case ContentType.JSON:
                    return this.text();

                  case ContentType.FORM:
                    return this.text();

                  case ContentType.FORM_DATA:
                    return this._body;

                  case ContentType.TEXT:
                    return this.text();

                  case ContentType.BLOB:
                    return this.blob();

                  case ContentType.ARRAY_BUFFER:
                    return this.arrayBuffer();

                  default:
                    return null;
                }
            };
            return Request;
        }(Body);
        function urlEncodeParams(params) {
            var searchParams = new URLSearchParams();
            Object.keys(params).forEach(function(key) {
                var value = params[key];
                if (value && Array.isArray(value)) {
                    value.forEach(function(element) {
                        return searchParams.append(key, element.toString());
                    });
                } else {
                    searchParams.append(key, value.toString());
                }
            });
            return searchParams;
        }
        var noop = function() {};
        var w = typeof window == "object" ? window : noop;
        var FormData = w["FormData"] || noop;
        var Blob$1 = w["Blob"] || noop;
        var ArrayBuffer$1 = w["ArrayBuffer"] || noop;
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        function httpRequest(backend, request) {
            return backend.createConnection(request).response;
        }
        function mergeOptions(defaultOpts, providedOpts, method, url) {
            var newOptions = defaultOpts;
            if (providedOpts) {
                return newOptions.merge(new RequestOptions({
                    method: providedOpts.method || method,
                    url: providedOpts.url || url,
                    search: providedOpts.search,
                    params: providedOpts.params,
                    headers: providedOpts.headers,
                    body: providedOpts.body,
                    withCredentials: providedOpts.withCredentials,
                    responseType: providedOpts.responseType
                }));
            }
            return newOptions.merge(new RequestOptions({
                method: method,
                url: url
            }));
        }
        var Http = function() {
            function Http(_backend, _defaultOptions) {
                this._backend = _backend;
                this._defaultOptions = _defaultOptions;
            }
            Http.prototype.request = function(url, options) {
                var responseObservable;
                if (typeof url === "string") {
                    responseObservable = httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
                } else if (url instanceof Request) {
                    responseObservable = httpRequest(this._backend, url);
                } else {
                    throw new Error("First argument must be a url string or Request instance.");
                }
                return responseObservable;
            };
            Http.prototype.get = function(url, options) {
                return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
            };
            Http.prototype.post = function(url, body, options) {
                return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({
                    body: body
                })), options, RequestMethod.Post, url)));
            };
            Http.prototype.put = function(url, body, options) {
                return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({
                    body: body
                })), options, RequestMethod.Put, url)));
            };
            Http.prototype.delete = function(url, options) {
                return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Delete, url)));
            };
            Http.prototype.patch = function(url, body, options) {
                return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({
                    body: body
                })), options, RequestMethod.Patch, url)));
            };
            Http.prototype.head = function(url, options) {
                return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Head, url)));
            };
            Http.prototype.options = function(url, options) {
                return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Options, url)));
            };
            return Http;
        }();
        Http.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        Http.ctorParameters = function() {
            return [ {
                type: ConnectionBackend
            }, {
                type: RequestOptions
            } ];
        };
        var Jsonp = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](Jsonp, _super);
            function Jsonp(backend, defaultOptions) {
                return _super.call(this, backend, defaultOptions) || this;
            }
            Jsonp.prototype.request = function(url, options) {
                var responseObservable;
                if (typeof url === "string") {
                    url = new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url));
                }
                if (url instanceof Request) {
                    if (url.method !== RequestMethod.Get) {
                        throw new Error("JSONP requests must use GET request method.");
                    }
                    responseObservable = httpRequest(this._backend, url);
                } else {
                    throw new Error("First argument must be a url string or Request instance.");
                }
                return responseObservable;
            };
            return Jsonp;
        }(Http);
        Jsonp.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        Jsonp.ctorParameters = function() {
            return [ {
                type: ConnectionBackend
            }, {
                type: RequestOptions
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        function _createDefaultCookieXSRFStrategy() {
            return new CookieXSRFStrategy();
        }
        function httpFactory(xhrBackend, requestOptions) {
            return new Http(xhrBackend, requestOptions);
        }
        function jsonpFactory(jsonpBackend, requestOptions) {
            return new Jsonp(jsonpBackend, requestOptions);
        }
        var HttpModule = function() {
            function HttpModule() {}
            return HttpModule;
        }();
        HttpModule.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["E"],
            args: [ {
                providers: [ {
                    provide: Http,
                    useFactory: httpFactory,
                    deps: [ XHRBackend, RequestOptions ]
                }, BrowserXhr, {
                    provide: RequestOptions,
                    useClass: BaseRequestOptions
                }, {
                    provide: ResponseOptions,
                    useClass: BaseResponseOptions
                }, XHRBackend, {
                    provide: XSRFStrategy,
                    useFactory: _createDefaultCookieXSRFStrategy
                } ]
            } ]
        } ];
        HttpModule.ctorParameters = function() {
            return [];
        };
        var JsonpModule = function() {
            function JsonpModule() {}
            return JsonpModule;
        }();
        JsonpModule.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["E"],
            args: [ {
                providers: [ {
                    provide: Jsonp,
                    useFactory: jsonpFactory,
                    deps: [ JSONPBackend, RequestOptions ]
                }, BrowserJsonp, {
                    provide: RequestOptions,
                    useClass: BaseRequestOptions
                }, {
                    provide: ResponseOptions,
                    useClass: BaseResponseOptions
                }, {
                    provide: JSONPBackend,
                    useClass: JSONPBackend_
                } ]
            } ]
        } ];
        JsonpModule.ctorParameters = function() {
            return [];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var VERSION = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["F"]("4.4.7");
    },
    GIjk: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var UnsubscriptionError = function(_super) {
            __extends(UnsubscriptionError, _super);
            function UnsubscriptionError(errors) {
                _super.call(this);
                this.errors = errors;
                var err = Error.call(this, errors ? errors.length + " errors occurred during unsubscription:\n  " + errors.map(function(err, i) {
                    return i + 1 + ") " + err.toString();
                }).join("\n  ") : "");
                this.name = err.name = "UnsubscriptionError";
                this.stack = err.stack;
                this.message = err.message;
            }
            return UnsubscriptionError;
        }(Error);
        exports.UnsubscriptionError = UnsubscriptionError;
    },
    ICpg: function(module, exports, __webpack_require__) {
        "use strict";
        function isObject(x) {
            return x != null && typeof x === "object";
        }
        exports.isObject = isObject;
    },
    IZVw: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var ObjectUnsubscribedError = function(_super) {
            __extends(ObjectUnsubscribedError, _super);
            function ObjectUnsubscribedError() {
                var err = _super.call(this, "object unsubscribed");
                this.name = err.name = "ObjectUnsubscribedError";
                this.stack = err.stack;
                this.message = err.message;
            }
            return ObjectUnsubscribedError;
        }(Error);
        exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
    },
    NVOs: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("TToO");
        var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("3j3K");
        var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_forkJoin__ = __webpack_require__("7rB9");
        var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_forkJoin__);
        var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_fromPromise__ = __webpack_require__("ioK+");
        var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_fromPromise__);
        var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__ = __webpack_require__("xAJs");
        var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__);
        var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__("Qbdm");
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return NG_VALUE_ACCESSOR;
        });
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return COMPOSITION_BUFFER_MODE;
        });
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return DefaultValueAccessor;
        });
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return NgControl;
        });
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return NgControlStatus;
        });
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return NgModel;
        });
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return FormsModule;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return InternalFormsSharedModule;
        });
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return RadioControlRegistry;
        });
        /**
 * @license Angular v4.4.7
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var AbstractControlDirective = function() {
            function AbstractControlDirective() {}
            AbstractControlDirective.prototype.control = function() {};
            Object.defineProperty(AbstractControlDirective.prototype, "value", {
                get: function() {
                    return this.control ? this.control.value : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlDirective.prototype, "valid", {
                get: function() {
                    return this.control ? this.control.valid : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlDirective.prototype, "invalid", {
                get: function() {
                    return this.control ? this.control.invalid : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlDirective.prototype, "pending", {
                get: function() {
                    return this.control ? this.control.pending : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlDirective.prototype, "disabled", {
                get: function() {
                    return this.control ? this.control.disabled : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlDirective.prototype, "enabled", {
                get: function() {
                    return this.control ? this.control.enabled : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlDirective.prototype, "errors", {
                get: function() {
                    return this.control ? this.control.errors : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlDirective.prototype, "pristine", {
                get: function() {
                    return this.control ? this.control.pristine : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlDirective.prototype, "dirty", {
                get: function() {
                    return this.control ? this.control.dirty : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlDirective.prototype, "touched", {
                get: function() {
                    return this.control ? this.control.touched : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlDirective.prototype, "untouched", {
                get: function() {
                    return this.control ? this.control.untouched : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlDirective.prototype, "statusChanges", {
                get: function() {
                    return this.control ? this.control.statusChanges : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlDirective.prototype, "valueChanges", {
                get: function() {
                    return this.control ? this.control.valueChanges : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlDirective.prototype, "path", {
                get: function() {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            AbstractControlDirective.prototype.reset = function(value) {
                if (value === void 0) {
                    value = undefined;
                }
                if (this.control) this.control.reset(value);
            };
            AbstractControlDirective.prototype.hasError = function(errorCode, path) {
                return this.control ? this.control.hasError(errorCode, path) : false;
            };
            AbstractControlDirective.prototype.getError = function(errorCode, path) {
                return this.control ? this.control.getError(errorCode, path) : null;
            };
            return AbstractControlDirective;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var ControlContainer = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](ControlContainer, _super);
            function ControlContainer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(ControlContainer.prototype, "formDirective", {
                get: function() {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ControlContainer.prototype, "path", {
                get: function() {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            return ControlContainer;
        }(AbstractControlDirective);
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        function isEmptyInputValue(value) {
            return value == null || value.length === 0;
        }
        var NG_VALIDATORS = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["I"]("NgValidators");
        var NG_ASYNC_VALIDATORS = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["I"]("NgAsyncValidators");
        var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
        var Validators = function() {
            function Validators() {}
            Validators.min = function(min) {
                return function(control) {
                    if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
                        return null;
                    }
                    var value = parseFloat(control.value);
                    return !isNaN(value) && value < min ? {
                        min: {
                            min: min,
                            actual: control.value
                        }
                    } : null;
                };
            };
            Validators.max = function(max) {
                return function(control) {
                    if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
                        return null;
                    }
                    var value = parseFloat(control.value);
                    return !isNaN(value) && value > max ? {
                        max: {
                            max: max,
                            actual: control.value
                        }
                    } : null;
                };
            };
            Validators.required = function(control) {
                return isEmptyInputValue(control.value) ? {
                    required: true
                } : null;
            };
            Validators.requiredTrue = function(control) {
                return control.value === true ? null : {
                    required: true
                };
            };
            Validators.email = function(control) {
                return EMAIL_REGEXP.test(control.value) ? null : {
                    email: true
                };
            };
            Validators.minLength = function(minLength) {
                return function(control) {
                    if (isEmptyInputValue(control.value)) {
                        return null;
                    }
                    var length = control.value ? control.value.length : 0;
                    return length < minLength ? {
                        minlength: {
                            requiredLength: minLength,
                            actualLength: length
                        }
                    } : null;
                };
            };
            Validators.maxLength = function(maxLength) {
                return function(control) {
                    var length = control.value ? control.value.length : 0;
                    return length > maxLength ? {
                        maxlength: {
                            requiredLength: maxLength,
                            actualLength: length
                        }
                    } : null;
                };
            };
            Validators.pattern = function(pattern) {
                if (!pattern) return Validators.nullValidator;
                var regex;
                var regexStr;
                if (typeof pattern === "string") {
                    regexStr = "^" + pattern + "$";
                    regex = new RegExp(regexStr);
                } else {
                    regexStr = pattern.toString();
                    regex = pattern;
                }
                return function(control) {
                    if (isEmptyInputValue(control.value)) {
                        return null;
                    }
                    var value = control.value;
                    return regex.test(value) ? null : {
                        pattern: {
                            requiredPattern: regexStr,
                            actualValue: value
                        }
                    };
                };
            };
            Validators.nullValidator = function(c) {
                return null;
            };
            Validators.compose = function(validators) {
                if (!validators) return null;
                var presentValidators = validators.filter(isPresent);
                if (presentValidators.length == 0) return null;
                return function(control) {
                    return _mergeErrors(_executeValidators(control, presentValidators));
                };
            };
            Validators.composeAsync = function(validators) {
                if (!validators) return null;
                var presentValidators = validators.filter(isPresent);
                if (presentValidators.length == 0) return null;
                return function(control) {
                    var observables = _executeAsyncValidators(control, presentValidators).map(toObservable);
                    return __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_map__["map"].call(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_forkJoin__["forkJoin"])(observables), _mergeErrors);
                };
            };
            return Validators;
        }();
        function isPresent(o) {
            return o != null;
        }
        function toObservable(r) {
            var obs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_7"])(r) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_fromPromise__["fromPromise"])(r) : r;
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8"])(obs)) {
                throw new Error("Expected validator to return Promise or Observable.");
            }
            return obs;
        }
        function _executeValidators(control, validators) {
            return validators.map(function(v) {
                return v(control);
            });
        }
        function _executeAsyncValidators(control, validators) {
            return validators.map(function(v) {
                return v(control);
            });
        }
        function _mergeErrors(arrayOfErrors) {
            var res = arrayOfErrors.reduce(function(res, errors) {
                return errors != null ? Object.assign({}, res, errors) : res;
            }, {});
            return Object.keys(res).length === 0 ? null : res;
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var NG_VALUE_ACCESSOR = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["I"]("NgValueAccessor");
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var CHECKBOX_VALUE_ACCESSOR = {
            provide: NG_VALUE_ACCESSOR,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return CheckboxControlValueAccessor;
            }),
            multi: true
        };
        var CheckboxControlValueAccessor = function() {
            function CheckboxControlValueAccessor(_renderer, _elementRef) {
                this._renderer = _renderer;
                this._elementRef = _elementRef;
                this.onChange = function(_) {};
                this.onTouched = function() {};
            }
            CheckboxControlValueAccessor.prototype.writeValue = function(value) {
                this._renderer.setProperty(this._elementRef.nativeElement, "checked", value);
            };
            CheckboxControlValueAccessor.prototype.registerOnChange = function(fn) {
                this.onChange = fn;
            };
            CheckboxControlValueAccessor.prototype.registerOnTouched = function(fn) {
                this.onTouched = fn;
            };
            CheckboxControlValueAccessor.prototype.setDisabledState = function(isDisabled) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
            };
            return CheckboxControlValueAccessor;
        }();
        CheckboxControlValueAccessor.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]",
                host: {
                    "(change)": "onChange($event.target.checked)",
                    "(blur)": "onTouched()"
                },
                providers: [ CHECKBOX_VALUE_ACCESSOR ]
            } ]
        } ];
        CheckboxControlValueAccessor.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_12"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Z"]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var DEFAULT_VALUE_ACCESSOR = {
            provide: NG_VALUE_ACCESSOR,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return DefaultValueAccessor;
            }),
            multi: true
        };
        function _isAndroid() {
            var userAgent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["t"])() ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["t"])().getUserAgent() : "";
            return /android (\d+)/.test(userAgent.toLowerCase());
        }
        var COMPOSITION_BUFFER_MODE = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["I"]("CompositionEventMode");
        var DefaultValueAccessor = function() {
            function DefaultValueAccessor(_renderer, _elementRef, _compositionMode) {
                this._renderer = _renderer;
                this._elementRef = _elementRef;
                this._compositionMode = _compositionMode;
                this.onChange = function(_) {};
                this.onTouched = function() {};
                this._composing = false;
                if (this._compositionMode == null) {
                    this._compositionMode = !_isAndroid();
                }
            }
            DefaultValueAccessor.prototype.writeValue = function(value) {
                var normalizedValue = value == null ? "" : value;
                this._renderer.setProperty(this._elementRef.nativeElement, "value", normalizedValue);
            };
            DefaultValueAccessor.prototype.registerOnChange = function(fn) {
                this.onChange = fn;
            };
            DefaultValueAccessor.prototype.registerOnTouched = function(fn) {
                this.onTouched = fn;
            };
            DefaultValueAccessor.prototype.setDisabledState = function(isDisabled) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
            };
            DefaultValueAccessor.prototype._handleInput = function(value) {
                if (!this._compositionMode || this._compositionMode && !this._composing) {
                    this.onChange(value);
                }
            };
            DefaultValueAccessor.prototype._compositionStart = function() {
                this._composing = true;
            };
            DefaultValueAccessor.prototype._compositionEnd = function(value) {
                this._composing = false;
                this._compositionMode && this.onChange(value);
            };
            return DefaultValueAccessor;
        }();
        DefaultValueAccessor.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]",
                host: {
                    "(input)": "_handleInput($event.target.value)",
                    "(blur)": "onTouched()",
                    "(compositionstart)": "_compositionStart()",
                    "(compositionend)": "_compositionEnd($event.target.value)"
                },
                providers: [ DEFAULT_VALUE_ACCESSOR ]
            } ]
        } ];
        DefaultValueAccessor.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_12"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Z"]
            }, {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ COMPOSITION_BUFFER_MODE ]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        function normalizeValidator(validator) {
            if (validator.validate) {
                return function(c) {
                    return validator.validate(c);
                };
            } else {
                return validator;
            }
        }
        function normalizeAsyncValidator(validator) {
            if (validator.validate) {
                return function(c) {
                    return validator.validate(c);
                };
            } else {
                return validator;
            }
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var NUMBER_VALUE_ACCESSOR = {
            provide: NG_VALUE_ACCESSOR,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return NumberValueAccessor;
            }),
            multi: true
        };
        var NumberValueAccessor = function() {
            function NumberValueAccessor(_renderer, _elementRef) {
                this._renderer = _renderer;
                this._elementRef = _elementRef;
                this.onChange = function(_) {};
                this.onTouched = function() {};
            }
            NumberValueAccessor.prototype.writeValue = function(value) {
                var normalizedValue = value == null ? "" : value;
                this._renderer.setProperty(this._elementRef.nativeElement, "value", normalizedValue);
            };
            NumberValueAccessor.prototype.registerOnChange = function(fn) {
                this.onChange = function(value) {
                    fn(value == "" ? null : parseFloat(value));
                };
            };
            NumberValueAccessor.prototype.registerOnTouched = function(fn) {
                this.onTouched = fn;
            };
            NumberValueAccessor.prototype.setDisabledState = function(isDisabled) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
            };
            return NumberValueAccessor;
        }();
        NumberValueAccessor.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]",
                host: {
                    "(change)": "onChange($event.target.value)",
                    "(input)": "onChange($event.target.value)",
                    "(blur)": "onTouched()"
                },
                providers: [ NUMBER_VALUE_ACCESSOR ]
            } ]
        } ];
        NumberValueAccessor.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_12"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Z"]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        function unimplemented() {
            throw new Error("unimplemented");
        }
        var NgControl = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](NgControl, _super);
            function NgControl() {
                var _this = _super.apply(this, arguments) || this;
                _this._parent = null;
                _this.name = null;
                _this.valueAccessor = null;
                _this._rawValidators = [];
                _this._rawAsyncValidators = [];
                return _this;
            }
            Object.defineProperty(NgControl.prototype, "validator", {
                get: function() {
                    return unimplemented();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgControl.prototype, "asyncValidator", {
                get: function() {
                    return unimplemented();
                },
                enumerable: true,
                configurable: true
            });
            NgControl.prototype.viewToModelUpdate = function(newValue) {};
            return NgControl;
        }(AbstractControlDirective);
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var RADIO_VALUE_ACCESSOR = {
            provide: NG_VALUE_ACCESSOR,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return RadioControlValueAccessor;
            }),
            multi: true
        };
        var RadioControlRegistry = function() {
            function RadioControlRegistry() {
                this._accessors = [];
            }
            RadioControlRegistry.prototype.add = function(control, accessor) {
                this._accessors.push([ control, accessor ]);
            };
            RadioControlRegistry.prototype.remove = function(accessor) {
                for (var i = this._accessors.length - 1; i >= 0; --i) {
                    if (this._accessors[i][1] === accessor) {
                        this._accessors.splice(i, 1);
                        return;
                    }
                }
            };
            RadioControlRegistry.prototype.select = function(accessor) {
                var _this = this;
                this._accessors.forEach(function(c) {
                    if (_this._isSameGroup(c, accessor) && c[1] !== accessor) {
                        c[1].fireUncheck(accessor.value);
                    }
                });
            };
            RadioControlRegistry.prototype._isSameGroup = function(controlPair, accessor) {
                if (!controlPair[0].control) return false;
                return controlPair[0]._parent === accessor._control._parent && controlPair[1].name === accessor.name;
            };
            return RadioControlRegistry;
        }();
        RadioControlRegistry.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        RadioControlRegistry.ctorParameters = function() {
            return [];
        };
        var RadioControlValueAccessor = function() {
            function RadioControlValueAccessor(_renderer, _elementRef, _registry, _injector) {
                this._renderer = _renderer;
                this._elementRef = _elementRef;
                this._registry = _registry;
                this._injector = _injector;
                this.onChange = function() {};
                this.onTouched = function() {};
            }
            RadioControlValueAccessor.prototype.ngOnInit = function() {
                this._control = this._injector.get(NgControl);
                this._checkName();
                this._registry.add(this._control, this);
            };
            RadioControlValueAccessor.prototype.ngOnDestroy = function() {
                this._registry.remove(this);
            };
            RadioControlValueAccessor.prototype.writeValue = function(value) {
                this._state = value === this.value;
                this._renderer.setProperty(this._elementRef.nativeElement, "checked", this._state);
            };
            RadioControlValueAccessor.prototype.registerOnChange = function(fn) {
                var _this = this;
                this._fn = fn;
                this.onChange = function() {
                    fn(_this.value);
                    _this._registry.select(_this);
                };
            };
            RadioControlValueAccessor.prototype.fireUncheck = function(value) {
                this.writeValue(value);
            };
            RadioControlValueAccessor.prototype.registerOnTouched = function(fn) {
                this.onTouched = fn;
            };
            RadioControlValueAccessor.prototype.setDisabledState = function(isDisabled) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
            };
            RadioControlValueAccessor.prototype._checkName = function() {
                if (this.name && this.formControlName && this.name !== this.formControlName) {
                    this._throwNameError();
                }
                if (!this.name && this.formControlName) this.name = this.formControlName;
            };
            RadioControlValueAccessor.prototype._throwNameError = function() {
                throw new Error('\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    ');
            };
            return RadioControlValueAccessor;
        }();
        RadioControlValueAccessor.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]",
                host: {
                    "(change)": "onChange()",
                    "(blur)": "onTouched()"
                },
                providers: [ RADIO_VALUE_ACCESSOR ]
            } ]
        } ];
        RadioControlValueAccessor.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_12"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Z"]
            }, {
                type: RadioControlRegistry
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["A"]
            } ];
        };
        RadioControlValueAccessor.propDecorators = {
            name: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ],
            formControlName: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ],
            value: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var RANGE_VALUE_ACCESSOR = {
            provide: NG_VALUE_ACCESSOR,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return RangeValueAccessor;
            }),
            multi: true
        };
        var RangeValueAccessor = function() {
            function RangeValueAccessor(_renderer, _elementRef) {
                this._renderer = _renderer;
                this._elementRef = _elementRef;
                this.onChange = function(_) {};
                this.onTouched = function() {};
            }
            RangeValueAccessor.prototype.writeValue = function(value) {
                this._renderer.setProperty(this._elementRef.nativeElement, "value", parseFloat(value));
            };
            RangeValueAccessor.prototype.registerOnChange = function(fn) {
                this.onChange = function(value) {
                    fn(value == "" ? null : parseFloat(value));
                };
            };
            RangeValueAccessor.prototype.registerOnTouched = function(fn) {
                this.onTouched = fn;
            };
            RangeValueAccessor.prototype.setDisabledState = function(isDisabled) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
            };
            return RangeValueAccessor;
        }();
        RangeValueAccessor.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]",
                host: {
                    "(change)": "onChange($event.target.value)",
                    "(input)": "onChange($event.target.value)",
                    "(blur)": "onTouched()"
                },
                providers: [ RANGE_VALUE_ACCESSOR ]
            } ]
        } ];
        RangeValueAccessor.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_12"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Z"]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var SELECT_VALUE_ACCESSOR = {
            provide: NG_VALUE_ACCESSOR,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return SelectControlValueAccessor;
            }),
            multi: true
        };
        function _buildValueString(id, value) {
            if (id == null) return "" + value;
            if (value && typeof value === "object") value = "Object";
            return (id + ": " + value).slice(0, 50);
        }
        function _extractId(valueString) {
            return valueString.split(":")[0];
        }
        var SelectControlValueAccessor = function() {
            function SelectControlValueAccessor(_renderer, _elementRef) {
                this._renderer = _renderer;
                this._elementRef = _elementRef;
                this._optionMap = new Map();
                this._idCounter = 0;
                this.onChange = function(_) {};
                this.onTouched = function() {};
                this._compareWith = __WEBPACK_IMPORTED_MODULE_1__angular_core__["_13"];
            }
            Object.defineProperty(SelectControlValueAccessor.prototype, "compareWith", {
                set: function(fn) {
                    if (typeof fn !== "function") {
                        throw new Error("compareWith must be a function, but received " + JSON.stringify(fn));
                    }
                    this._compareWith = fn;
                },
                enumerable: true,
                configurable: true
            });
            SelectControlValueAccessor.prototype.writeValue = function(value) {
                this.value = value;
                var id = this._getOptionId(value);
                if (id == null) {
                    this._renderer.setProperty(this._elementRef.nativeElement, "selectedIndex", -1);
                }
                var valueString = _buildValueString(id, value);
                this._renderer.setProperty(this._elementRef.nativeElement, "value", valueString);
            };
            SelectControlValueAccessor.prototype.registerOnChange = function(fn) {
                var _this = this;
                this.onChange = function(valueString) {
                    _this.value = _this._getOptionValue(valueString);
                    fn(_this.value);
                };
            };
            SelectControlValueAccessor.prototype.registerOnTouched = function(fn) {
                this.onTouched = fn;
            };
            SelectControlValueAccessor.prototype.setDisabledState = function(isDisabled) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
            };
            SelectControlValueAccessor.prototype._registerOption = function() {
                return (this._idCounter++).toString();
            };
            SelectControlValueAccessor.prototype._getOptionId = function(value) {
                for (var _i = 0, _a = Array.from(this._optionMap.keys()); _i < _a.length; _i++) {
                    var id = _a[_i];
                    if (this._compareWith(this._optionMap.get(id), value)) return id;
                }
                return null;
            };
            SelectControlValueAccessor.prototype._getOptionValue = function(valueString) {
                var id = _extractId(valueString);
                return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
            };
            return SelectControlValueAccessor;
        }();
        SelectControlValueAccessor.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]",
                host: {
                    "(change)": "onChange($event.target.value)",
                    "(blur)": "onTouched()"
                },
                providers: [ SELECT_VALUE_ACCESSOR ]
            } ]
        } ];
        SelectControlValueAccessor.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_12"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Z"]
            } ];
        };
        SelectControlValueAccessor.propDecorators = {
            compareWith: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        var NgSelectOption = function() {
            function NgSelectOption(_element, _renderer, _select) {
                this._element = _element;
                this._renderer = _renderer;
                this._select = _select;
                if (this._select) this.id = this._select._registerOption();
            }
            Object.defineProperty(NgSelectOption.prototype, "ngValue", {
                set: function(value) {
                    if (this._select == null) return;
                    this._select._optionMap.set(this.id, value);
                    this._setElementValue(_buildValueString(this.id, value));
                    this._select.writeValue(this._select.value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgSelectOption.prototype, "value", {
                set: function(value) {
                    this._setElementValue(value);
                    if (this._select) this._select.writeValue(this._select.value);
                },
                enumerable: true,
                configurable: true
            });
            NgSelectOption.prototype._setElementValue = function(value) {
                this._renderer.setProperty(this._element.nativeElement, "value", value);
            };
            NgSelectOption.prototype.ngOnDestroy = function() {
                if (this._select) {
                    this._select._optionMap.delete(this.id);
                    this._select.writeValue(this._select.value);
                }
            };
            return NgSelectOption;
        }();
        NgSelectOption.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "option"
            } ]
        } ];
        NgSelectOption.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Z"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_12"]
            }, {
                type: SelectControlValueAccessor,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_4"]
                } ]
            } ];
        };
        NgSelectOption.propDecorators = {
            ngValue: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "ngValue" ]
            } ],
            value: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "value" ]
            } ]
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var SELECT_MULTIPLE_VALUE_ACCESSOR = {
            provide: NG_VALUE_ACCESSOR,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return SelectMultipleControlValueAccessor;
            }),
            multi: true
        };
        function _buildValueString$1(id, value) {
            if (id == null) return "" + value;
            if (typeof value === "string") value = "'" + value + "'";
            if (value && typeof value === "object") value = "Object";
            return (id + ": " + value).slice(0, 50);
        }
        function _extractId$1(valueString) {
            return valueString.split(":")[0];
        }
        var SelectMultipleControlValueAccessor = function() {
            function SelectMultipleControlValueAccessor(_renderer, _elementRef) {
                this._renderer = _renderer;
                this._elementRef = _elementRef;
                this._optionMap = new Map();
                this._idCounter = 0;
                this.onChange = function(_) {};
                this.onTouched = function() {};
                this._compareWith = __WEBPACK_IMPORTED_MODULE_1__angular_core__["_13"];
            }
            Object.defineProperty(SelectMultipleControlValueAccessor.prototype, "compareWith", {
                set: function(fn) {
                    if (typeof fn !== "function") {
                        throw new Error("compareWith must be a function, but received " + JSON.stringify(fn));
                    }
                    this._compareWith = fn;
                },
                enumerable: true,
                configurable: true
            });
            SelectMultipleControlValueAccessor.prototype.writeValue = function(value) {
                var _this = this;
                this.value = value;
                var optionSelectedStateSetter;
                if (Array.isArray(value)) {
                    var ids_1 = value.map(function(v) {
                        return _this._getOptionId(v);
                    });
                    optionSelectedStateSetter = function(opt, o) {
                        opt._setSelected(ids_1.indexOf(o.toString()) > -1);
                    };
                } else {
                    optionSelectedStateSetter = function(opt, o) {
                        opt._setSelected(false);
                    };
                }
                this._optionMap.forEach(optionSelectedStateSetter);
            };
            SelectMultipleControlValueAccessor.prototype.registerOnChange = function(fn) {
                var _this = this;
                this.onChange = function(_) {
                    var selected = [];
                    if (_.hasOwnProperty("selectedOptions")) {
                        var options = _.selectedOptions;
                        for (var i = 0; i < options.length; i++) {
                            var opt = options.item(i);
                            var val = _this._getOptionValue(opt.value);
                            selected.push(val);
                        }
                    } else {
                        var options = _.options;
                        for (var i = 0; i < options.length; i++) {
                            var opt = options.item(i);
                            if (opt.selected) {
                                var val = _this._getOptionValue(opt.value);
                                selected.push(val);
                            }
                        }
                    }
                    _this.value = selected;
                    fn(selected);
                };
            };
            SelectMultipleControlValueAccessor.prototype.registerOnTouched = function(fn) {
                this.onTouched = fn;
            };
            SelectMultipleControlValueAccessor.prototype.setDisabledState = function(isDisabled) {
                this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
            };
            SelectMultipleControlValueAccessor.prototype._registerOption = function(value) {
                var id = (this._idCounter++).toString();
                this._optionMap.set(id, value);
                return id;
            };
            SelectMultipleControlValueAccessor.prototype._getOptionId = function(value) {
                for (var _i = 0, _a = Array.from(this._optionMap.keys()); _i < _a.length; _i++) {
                    var id = _a[_i];
                    if (this._compareWith(this._optionMap.get(id)._value, value)) return id;
                }
                return null;
            };
            SelectMultipleControlValueAccessor.prototype._getOptionValue = function(valueString) {
                var id = _extractId$1(valueString);
                return this._optionMap.has(id) ? this._optionMap.get(id)._value : valueString;
            };
            return SelectMultipleControlValueAccessor;
        }();
        SelectMultipleControlValueAccessor.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]",
                host: {
                    "(change)": "onChange($event.target)",
                    "(blur)": "onTouched()"
                },
                providers: [ SELECT_MULTIPLE_VALUE_ACCESSOR ]
            } ]
        } ];
        SelectMultipleControlValueAccessor.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_12"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Z"]
            } ];
        };
        SelectMultipleControlValueAccessor.propDecorators = {
            compareWith: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        var NgSelectMultipleOption = function() {
            function NgSelectMultipleOption(_element, _renderer, _select) {
                this._element = _element;
                this._renderer = _renderer;
                this._select = _select;
                if (this._select) {
                    this.id = this._select._registerOption(this);
                }
            }
            Object.defineProperty(NgSelectMultipleOption.prototype, "ngValue", {
                set: function(value) {
                    if (this._select == null) return;
                    this._value = value;
                    this._setElementValue(_buildValueString$1(this.id, value));
                    this._select.writeValue(this._select.value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgSelectMultipleOption.prototype, "value", {
                set: function(value) {
                    if (this._select) {
                        this._value = value;
                        this._setElementValue(_buildValueString$1(this.id, value));
                        this._select.writeValue(this._select.value);
                    } else {
                        this._setElementValue(value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            NgSelectMultipleOption.prototype._setElementValue = function(value) {
                this._renderer.setProperty(this._element.nativeElement, "value", value);
            };
            NgSelectMultipleOption.prototype._setSelected = function(selected) {
                this._renderer.setProperty(this._element.nativeElement, "selected", selected);
            };
            NgSelectMultipleOption.prototype.ngOnDestroy = function() {
                if (this._select) {
                    this._select._optionMap.delete(this.id);
                    this._select.writeValue(this._select.value);
                }
            };
            return NgSelectMultipleOption;
        }();
        NgSelectMultipleOption.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "option"
            } ]
        } ];
        NgSelectMultipleOption.ctorParameters = function() {
            return [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Z"]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_12"]
            }, {
                type: SelectMultipleControlValueAccessor,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_4"]
                } ]
            } ];
        };
        NgSelectMultipleOption.propDecorators = {
            ngValue: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "ngValue" ]
            } ],
            value: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "value" ]
            } ]
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        function controlPath(name, parent) {
            return parent.path.concat([ name ]);
        }
        function setUpControl(control, dir) {
            if (!control) _throwError(dir, "Cannot find control with");
            if (!dir.valueAccessor) _throwError(dir, "No value accessor for form control with");
            control.validator = Validators.compose([ control.validator, dir.validator ]);
            control.asyncValidator = Validators.composeAsync([ control.asyncValidator, dir.asyncValidator ]);
            dir.valueAccessor.writeValue(control.value);
            dir.valueAccessor.registerOnChange(function(newValue) {
                dir.viewToModelUpdate(newValue);
                control.markAsDirty();
                control.setValue(newValue, {
                    emitModelToViewChange: false
                });
            });
            dir.valueAccessor.registerOnTouched(function() {
                return control.markAsTouched();
            });
            control.registerOnChange(function(newValue, emitModelEvent) {
                dir.valueAccessor.writeValue(newValue);
                if (emitModelEvent) dir.viewToModelUpdate(newValue);
            });
            if (dir.valueAccessor.setDisabledState) {
                control.registerOnDisabledChange(function(isDisabled) {
                    dir.valueAccessor.setDisabledState(isDisabled);
                });
            }
            dir._rawValidators.forEach(function(validator) {
                if (validator.registerOnValidatorChange) validator.registerOnValidatorChange(function() {
                    return control.updateValueAndValidity();
                });
            });
            dir._rawAsyncValidators.forEach(function(validator) {
                if (validator.registerOnValidatorChange) validator.registerOnValidatorChange(function() {
                    return control.updateValueAndValidity();
                });
            });
        }
        function cleanUpControl(control, dir) {
            dir.valueAccessor.registerOnChange(function() {
                return _noControlError(dir);
            });
            dir.valueAccessor.registerOnTouched(function() {
                return _noControlError(dir);
            });
            dir._rawValidators.forEach(function(validator) {
                if (validator.registerOnValidatorChange) {
                    validator.registerOnValidatorChange(null);
                }
            });
            dir._rawAsyncValidators.forEach(function(validator) {
                if (validator.registerOnValidatorChange) {
                    validator.registerOnValidatorChange(null);
                }
            });
            if (control) control._clearChangeFns();
        }
        function setUpFormContainer(control, dir) {
            if (control == null) _throwError(dir, "Cannot find control with");
            control.validator = Validators.compose([ control.validator, dir.validator ]);
            control.asyncValidator = Validators.composeAsync([ control.asyncValidator, dir.asyncValidator ]);
        }
        function _noControlError(dir) {
            return _throwError(dir, "There is no FormControl instance attached to form control element with");
        }
        function _throwError(dir, message) {
            var messageEnd;
            if (dir.path.length > 1) {
                messageEnd = "path: '" + dir.path.join(" -> ") + "'";
            } else if (dir.path[0]) {
                messageEnd = "name: '" + dir.path + "'";
            } else {
                messageEnd = "unspecified name attribute";
            }
            throw new Error(message + " " + messageEnd);
        }
        function composeValidators(validators) {
            return validators != null ? Validators.compose(validators.map(normalizeValidator)) : null;
        }
        function composeAsyncValidators(validators) {
            return validators != null ? Validators.composeAsync(validators.map(normalizeAsyncValidator)) : null;
        }
        function isPropertyUpdated(changes, viewModel) {
            if (!changes.hasOwnProperty("model")) return false;
            var change = changes["model"];
            if (change.isFirstChange()) return true;
            return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_13"])(viewModel, change.currentValue);
        }
        var BUILTIN_ACCESSORS = [ CheckboxControlValueAccessor, RangeValueAccessor, NumberValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor ];
        function isBuiltInAccessor(valueAccessor) {
            return BUILTIN_ACCESSORS.some(function(a) {
                return valueAccessor.constructor === a;
            });
        }
        function selectValueAccessor(dir, valueAccessors) {
            if (!valueAccessors) return null;
            var defaultAccessor = undefined;
            var builtinAccessor = undefined;
            var customAccessor = undefined;
            valueAccessors.forEach(function(v) {
                if (v.constructor === DefaultValueAccessor) {
                    defaultAccessor = v;
                } else if (isBuiltInAccessor(v)) {
                    if (builtinAccessor) _throwError(dir, "More than one built-in value accessor matches form control with");
                    builtinAccessor = v;
                } else {
                    if (customAccessor) _throwError(dir, "More than one custom value accessor matches form control with");
                    customAccessor = v;
                }
            });
            if (customAccessor) return customAccessor;
            if (builtinAccessor) return builtinAccessor;
            if (defaultAccessor) return defaultAccessor;
            _throwError(dir, "No valid value accessor for form control with");
            return null;
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var AbstractFormGroupDirective = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](AbstractFormGroupDirective, _super);
            function AbstractFormGroupDirective() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AbstractFormGroupDirective.prototype.ngOnInit = function() {
                this._checkParentType();
                this.formDirective.addFormGroup(this);
            };
            AbstractFormGroupDirective.prototype.ngOnDestroy = function() {
                if (this.formDirective) {
                    this.formDirective.removeFormGroup(this);
                }
            };
            Object.defineProperty(AbstractFormGroupDirective.prototype, "control", {
                get: function() {
                    return this.formDirective.getFormGroup(this);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractFormGroupDirective.prototype, "path", {
                get: function() {
                    return controlPath(this.name, this._parent);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractFormGroupDirective.prototype, "formDirective", {
                get: function() {
                    return this._parent ? this._parent.formDirective : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractFormGroupDirective.prototype, "validator", {
                get: function() {
                    return composeValidators(this._validators);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractFormGroupDirective.prototype, "asyncValidator", {
                get: function() {
                    return composeAsyncValidators(this._asyncValidators);
                },
                enumerable: true,
                configurable: true
            });
            AbstractFormGroupDirective.prototype._checkParentType = function() {};
            return AbstractFormGroupDirective;
        }(ControlContainer);
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var AbstractControlStatus = function() {
            function AbstractControlStatus(cd) {
                this._cd = cd;
            }
            Object.defineProperty(AbstractControlStatus.prototype, "ngClassUntouched", {
                get: function() {
                    return this._cd.control ? this._cd.control.untouched : false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlStatus.prototype, "ngClassTouched", {
                get: function() {
                    return this._cd.control ? this._cd.control.touched : false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlStatus.prototype, "ngClassPristine", {
                get: function() {
                    return this._cd.control ? this._cd.control.pristine : false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlStatus.prototype, "ngClassDirty", {
                get: function() {
                    return this._cd.control ? this._cd.control.dirty : false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlStatus.prototype, "ngClassValid", {
                get: function() {
                    return this._cd.control ? this._cd.control.valid : false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlStatus.prototype, "ngClassInvalid", {
                get: function() {
                    return this._cd.control ? this._cd.control.invalid : false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControlStatus.prototype, "ngClassPending", {
                get: function() {
                    return this._cd.control ? this._cd.control.pending : false;
                },
                enumerable: true,
                configurable: true
            });
            return AbstractControlStatus;
        }();
        var ngControlStatusHost = {
            "[class.ng-untouched]": "ngClassUntouched",
            "[class.ng-touched]": "ngClassTouched",
            "[class.ng-pristine]": "ngClassPristine",
            "[class.ng-dirty]": "ngClassDirty",
            "[class.ng-valid]": "ngClassValid",
            "[class.ng-invalid]": "ngClassInvalid",
            "[class.ng-pending]": "ngClassPending"
        };
        var NgControlStatus = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](NgControlStatus, _super);
            function NgControlStatus(cd) {
                return _super.call(this, cd) || this;
            }
            return NgControlStatus;
        }(AbstractControlStatus);
        NgControlStatus.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[formControlName],[ngModel],[formControl]",
                host: ngControlStatusHost
            } ]
        } ];
        NgControlStatus.ctorParameters = function() {
            return [ {
                type: NgControl,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                } ]
            } ];
        };
        var NgControlStatusGroup = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](NgControlStatusGroup, _super);
            function NgControlStatusGroup(cd) {
                return _super.call(this, cd) || this;
            }
            return NgControlStatusGroup;
        }(AbstractControlStatus);
        NgControlStatusGroup.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]",
                host: ngControlStatusHost
            } ]
        } ];
        NgControlStatusGroup.ctorParameters = function() {
            return [ {
                type: ControlContainer,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var VALID = "VALID";
        var INVALID = "INVALID";
        var PENDING = "PENDING";
        var DISABLED = "DISABLED";
        function _find(control, path, delimiter) {
            if (path == null) return null;
            if (!(path instanceof Array)) {
                path = path.split(delimiter);
            }
            if (path instanceof Array && path.length === 0) return null;
            return path.reduce(function(v, name) {
                if (v instanceof FormGroup) {
                    return v.controls[name] || null;
                }
                if (v instanceof FormArray) {
                    return v.at(name) || null;
                }
                return null;
            }, control);
        }
        function coerceToValidator(validator) {
            return Array.isArray(validator) ? composeValidators(validator) : validator || null;
        }
        function coerceToAsyncValidator(asyncValidator) {
            return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator || null;
        }
        var AbstractControl = function() {
            function AbstractControl(validator, asyncValidator) {
                this.validator = validator;
                this.asyncValidator = asyncValidator;
                this._onCollectionChange = function() {};
                this._pristine = true;
                this._touched = false;
                this._onDisabledChange = [];
            }
            Object.defineProperty(AbstractControl.prototype, "value", {
                get: function() {
                    return this._value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "parent", {
                get: function() {
                    return this._parent;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "status", {
                get: function() {
                    return this._status;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "valid", {
                get: function() {
                    return this._status === VALID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "invalid", {
                get: function() {
                    return this._status === INVALID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "pending", {
                get: function() {
                    return this._status == PENDING;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "disabled", {
                get: function() {
                    return this._status === DISABLED;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "enabled", {
                get: function() {
                    return this._status !== DISABLED;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "errors", {
                get: function() {
                    return this._errors;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "pristine", {
                get: function() {
                    return this._pristine;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "dirty", {
                get: function() {
                    return !this.pristine;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "touched", {
                get: function() {
                    return this._touched;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "untouched", {
                get: function() {
                    return !this._touched;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "valueChanges", {
                get: function() {
                    return this._valueChanges;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AbstractControl.prototype, "statusChanges", {
                get: function() {
                    return this._statusChanges;
                },
                enumerable: true,
                configurable: true
            });
            AbstractControl.prototype.setValidators = function(newValidator) {
                this.validator = coerceToValidator(newValidator);
            };
            AbstractControl.prototype.setAsyncValidators = function(newValidator) {
                this.asyncValidator = coerceToAsyncValidator(newValidator);
            };
            AbstractControl.prototype.clearValidators = function() {
                this.validator = null;
            };
            AbstractControl.prototype.clearAsyncValidators = function() {
                this.asyncValidator = null;
            };
            AbstractControl.prototype.markAsTouched = function(opts) {
                if (opts === void 0) {
                    opts = {};
                }
                this._touched = true;
                if (this._parent && !opts.onlySelf) {
                    this._parent.markAsTouched(opts);
                }
            };
            AbstractControl.prototype.markAsUntouched = function(opts) {
                if (opts === void 0) {
                    opts = {};
                }
                this._touched = false;
                this._forEachChild(function(control) {
                    control.markAsUntouched({
                        onlySelf: true
                    });
                });
                if (this._parent && !opts.onlySelf) {
                    this._parent._updateTouched(opts);
                }
            };
            AbstractControl.prototype.markAsDirty = function(opts) {
                if (opts === void 0) {
                    opts = {};
                }
                this._pristine = false;
                if (this._parent && !opts.onlySelf) {
                    this._parent.markAsDirty(opts);
                }
            };
            AbstractControl.prototype.markAsPristine = function(opts) {
                if (opts === void 0) {
                    opts = {};
                }
                this._pristine = true;
                this._forEachChild(function(control) {
                    control.markAsPristine({
                        onlySelf: true
                    });
                });
                if (this._parent && !opts.onlySelf) {
                    this._parent._updatePristine(opts);
                }
            };
            AbstractControl.prototype.markAsPending = function(opts) {
                if (opts === void 0) {
                    opts = {};
                }
                this._status = PENDING;
                if (this._parent && !opts.onlySelf) {
                    this._parent.markAsPending(opts);
                }
            };
            AbstractControl.prototype.disable = function(opts) {
                if (opts === void 0) {
                    opts = {};
                }
                this._status = DISABLED;
                this._errors = null;
                this._forEachChild(function(control) {
                    control.disable({
                        onlySelf: true
                    });
                });
                this._updateValue();
                if (opts.emitEvent !== false) {
                    this._valueChanges.emit(this._value);
                    this._statusChanges.emit(this._status);
                }
                this._updateAncestors(!!opts.onlySelf);
                this._onDisabledChange.forEach(function(changeFn) {
                    return changeFn(true);
                });
            };
            AbstractControl.prototype.enable = function(opts) {
                if (opts === void 0) {
                    opts = {};
                }
                this._status = VALID;
                this._forEachChild(function(control) {
                    control.enable({
                        onlySelf: true
                    });
                });
                this.updateValueAndValidity({
                    onlySelf: true,
                    emitEvent: opts.emitEvent
                });
                this._updateAncestors(!!opts.onlySelf);
                this._onDisabledChange.forEach(function(changeFn) {
                    return changeFn(false);
                });
            };
            AbstractControl.prototype._updateAncestors = function(onlySelf) {
                if (this._parent && !onlySelf) {
                    this._parent.updateValueAndValidity();
                    this._parent._updatePristine();
                    this._parent._updateTouched();
                }
            };
            AbstractControl.prototype.setParent = function(parent) {
                this._parent = parent;
            };
            AbstractControl.prototype.setValue = function(value, options) {};
            AbstractControl.prototype.patchValue = function(value, options) {};
            AbstractControl.prototype.reset = function(value, options) {};
            AbstractControl.prototype.updateValueAndValidity = function(opts) {
                if (opts === void 0) {
                    opts = {};
                }
                this._setInitialStatus();
                this._updateValue();
                if (this.enabled) {
                    this._cancelExistingSubscription();
                    this._errors = this._runValidator();
                    this._status = this._calculateStatus();
                    if (this._status === VALID || this._status === PENDING) {
                        this._runAsyncValidator(opts.emitEvent);
                    }
                }
                if (opts.emitEvent !== false) {
                    this._valueChanges.emit(this._value);
                    this._statusChanges.emit(this._status);
                }
                if (this._parent && !opts.onlySelf) {
                    this._parent.updateValueAndValidity(opts);
                }
            };
            AbstractControl.prototype._updateTreeValidity = function(opts) {
                if (opts === void 0) {
                    opts = {
                        emitEvent: true
                    };
                }
                this._forEachChild(function(ctrl) {
                    return ctrl._updateTreeValidity(opts);
                });
                this.updateValueAndValidity({
                    onlySelf: true,
                    emitEvent: opts.emitEvent
                });
            };
            AbstractControl.prototype._setInitialStatus = function() {
                this._status = this._allControlsDisabled() ? DISABLED : VALID;
            };
            AbstractControl.prototype._runValidator = function() {
                return this.validator ? this.validator(this) : null;
            };
            AbstractControl.prototype._runAsyncValidator = function(emitEvent) {
                var _this = this;
                if (this.asyncValidator) {
                    this._status = PENDING;
                    var obs = toObservable(this.asyncValidator(this));
                    this._asyncValidationSubscription = obs.subscribe(function(errors) {
                        return _this.setErrors(errors, {
                            emitEvent: emitEvent
                        });
                    });
                }
            };
            AbstractControl.prototype._cancelExistingSubscription = function() {
                if (this._asyncValidationSubscription) {
                    this._asyncValidationSubscription.unsubscribe();
                }
            };
            AbstractControl.prototype.setErrors = function(errors, opts) {
                if (opts === void 0) {
                    opts = {};
                }
                this._errors = errors;
                this._updateControlsErrors(opts.emitEvent !== false);
            };
            AbstractControl.prototype.get = function(path) {
                return _find(this, path, ".");
            };
            AbstractControl.prototype.getError = function(errorCode, path) {
                var control = path ? this.get(path) : this;
                return control && control._errors ? control._errors[errorCode] : null;
            };
            AbstractControl.prototype.hasError = function(errorCode, path) {
                return !!this.getError(errorCode, path);
            };
            Object.defineProperty(AbstractControl.prototype, "root", {
                get: function() {
                    var x = this;
                    while (x._parent) {
                        x = x._parent;
                    }
                    return x;
                },
                enumerable: true,
                configurable: true
            });
            AbstractControl.prototype._updateControlsErrors = function(emitEvent) {
                this._status = this._calculateStatus();
                if (emitEvent) {
                    this._statusChanges.emit(this._status);
                }
                if (this._parent) {
                    this._parent._updateControlsErrors(emitEvent);
                }
            };
            AbstractControl.prototype._initObservables = function() {
                this._valueChanges = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["V"]();
                this._statusChanges = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["V"]();
            };
            AbstractControl.prototype._calculateStatus = function() {
                if (this._allControlsDisabled()) return DISABLED;
                if (this._errors) return INVALID;
                if (this._anyControlsHaveStatus(PENDING)) return PENDING;
                if (this._anyControlsHaveStatus(INVALID)) return INVALID;
                return VALID;
            };
            AbstractControl.prototype._updateValue = function() {};
            AbstractControl.prototype._forEachChild = function(cb) {};
            AbstractControl.prototype._anyControls = function(condition) {};
            AbstractControl.prototype._allControlsDisabled = function() {};
            AbstractControl.prototype._anyControlsHaveStatus = function(status) {
                return this._anyControls(function(control) {
                    return control.status === status;
                });
            };
            AbstractControl.prototype._anyControlsDirty = function() {
                return this._anyControls(function(control) {
                    return control.dirty;
                });
            };
            AbstractControl.prototype._anyControlsTouched = function() {
                return this._anyControls(function(control) {
                    return control.touched;
                });
            };
            AbstractControl.prototype._updatePristine = function(opts) {
                if (opts === void 0) {
                    opts = {};
                }
                this._pristine = !this._anyControlsDirty();
                if (this._parent && !opts.onlySelf) {
                    this._parent._updatePristine(opts);
                }
            };
            AbstractControl.prototype._updateTouched = function(opts) {
                if (opts === void 0) {
                    opts = {};
                }
                this._touched = this._anyControlsTouched();
                if (this._parent && !opts.onlySelf) {
                    this._parent._updateTouched(opts);
                }
            };
            AbstractControl.prototype._isBoxedValue = function(formState) {
                return typeof formState === "object" && formState !== null && Object.keys(formState).length === 2 && "value" in formState && "disabled" in formState;
            };
            AbstractControl.prototype._registerOnCollectionChange = function(fn) {
                this._onCollectionChange = fn;
            };
            return AbstractControl;
        }();
        var FormControl = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](FormControl, _super);
            function FormControl(formState, validator, asyncValidator) {
                if (formState === void 0) {
                    formState = null;
                }
                var _this = _super.call(this, coerceToValidator(validator), coerceToAsyncValidator(asyncValidator)) || this;
                _this._onChange = [];
                _this._applyFormState(formState);
                _this.updateValueAndValidity({
                    onlySelf: true,
                    emitEvent: false
                });
                _this._initObservables();
                return _this;
            }
            FormControl.prototype.setValue = function(value, options) {
                var _this = this;
                if (options === void 0) {
                    options = {};
                }
                this._value = value;
                if (this._onChange.length && options.emitModelToViewChange !== false) {
                    this._onChange.forEach(function(changeFn) {
                        return changeFn(_this._value, options.emitViewToModelChange !== false);
                    });
                }
                this.updateValueAndValidity(options);
            };
            FormControl.prototype.patchValue = function(value, options) {
                if (options === void 0) {
                    options = {};
                }
                this.setValue(value, options);
            };
            FormControl.prototype.reset = function(formState, options) {
                if (formState === void 0) {
                    formState = null;
                }
                if (options === void 0) {
                    options = {};
                }
                this._applyFormState(formState);
                this.markAsPristine(options);
                this.markAsUntouched(options);
                this.setValue(this._value, options);
            };
            FormControl.prototype._updateValue = function() {};
            FormControl.prototype._anyControls = function(condition) {
                return false;
            };
            FormControl.prototype._allControlsDisabled = function() {
                return this.disabled;
            };
            FormControl.prototype.registerOnChange = function(fn) {
                this._onChange.push(fn);
            };
            FormControl.prototype._clearChangeFns = function() {
                this._onChange = [];
                this._onDisabledChange = [];
                this._onCollectionChange = function() {};
            };
            FormControl.prototype.registerOnDisabledChange = function(fn) {
                this._onDisabledChange.push(fn);
            };
            FormControl.prototype._forEachChild = function(cb) {};
            FormControl.prototype._applyFormState = function(formState) {
                if (this._isBoxedValue(formState)) {
                    this._value = formState.value;
                    formState.disabled ? this.disable({
                        onlySelf: true,
                        emitEvent: false
                    }) : this.enable({
                        onlySelf: true,
                        emitEvent: false
                    });
                } else {
                    this._value = formState;
                }
            };
            return FormControl;
        }(AbstractControl);
        var FormGroup = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](FormGroup, _super);
            function FormGroup(controls, validator, asyncValidator) {
                var _this = _super.call(this, validator || null, asyncValidator || null) || this;
                _this.controls = controls;
                _this._initObservables();
                _this._setUpControls();
                _this.updateValueAndValidity({
                    onlySelf: true,
                    emitEvent: false
                });
                return _this;
            }
            FormGroup.prototype.registerControl = function(name, control) {
                if (this.controls[name]) return this.controls[name];
                this.controls[name] = control;
                control.setParent(this);
                control._registerOnCollectionChange(this._onCollectionChange);
                return control;
            };
            FormGroup.prototype.addControl = function(name, control) {
                this.registerControl(name, control);
                this.updateValueAndValidity();
                this._onCollectionChange();
            };
            FormGroup.prototype.removeControl = function(name) {
                if (this.controls[name]) this.controls[name]._registerOnCollectionChange(function() {});
                delete this.controls[name];
                this.updateValueAndValidity();
                this._onCollectionChange();
            };
            FormGroup.prototype.setControl = function(name, control) {
                if (this.controls[name]) this.controls[name]._registerOnCollectionChange(function() {});
                delete this.controls[name];
                if (control) this.registerControl(name, control);
                this.updateValueAndValidity();
                this._onCollectionChange();
            };
            FormGroup.prototype.contains = function(controlName) {
                return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
            };
            FormGroup.prototype.setValue = function(value, options) {
                var _this = this;
                if (options === void 0) {
                    options = {};
                }
                this._checkAllValuesPresent(value);
                Object.keys(value).forEach(function(name) {
                    _this._throwIfControlMissing(name);
                    _this.controls[name].setValue(value[name], {
                        onlySelf: true,
                        emitEvent: options.emitEvent
                    });
                });
                this.updateValueAndValidity(options);
            };
            FormGroup.prototype.patchValue = function(value, options) {
                var _this = this;
                if (options === void 0) {
                    options = {};
                }
                Object.keys(value).forEach(function(name) {
                    if (_this.controls[name]) {
                        _this.controls[name].patchValue(value[name], {
                            onlySelf: true,
                            emitEvent: options.emitEvent
                        });
                    }
                });
                this.updateValueAndValidity(options);
            };
            FormGroup.prototype.reset = function(value, options) {
                if (value === void 0) {
                    value = {};
                }
                if (options === void 0) {
                    options = {};
                }
                this._forEachChild(function(control, name) {
                    control.reset(value[name], {
                        onlySelf: true,
                        emitEvent: options.emitEvent
                    });
                });
                this.updateValueAndValidity(options);
                this._updatePristine(options);
                this._updateTouched(options);
            };
            FormGroup.prototype.getRawValue = function() {
                return this._reduceChildren({}, function(acc, control, name) {
                    acc[name] = control instanceof FormControl ? control.value : control.getRawValue();
                    return acc;
                });
            };
            FormGroup.prototype._throwIfControlMissing = function(name) {
                if (!Object.keys(this.controls).length) {
                    throw new Error("\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
                }
                if (!this.controls[name]) {
                    throw new Error("Cannot find form control with name: " + name + ".");
                }
            };
            FormGroup.prototype._forEachChild = function(cb) {
                var _this = this;
                Object.keys(this.controls).forEach(function(k) {
                    return cb(_this.controls[k], k);
                });
            };
            FormGroup.prototype._setUpControls = function() {
                var _this = this;
                this._forEachChild(function(control) {
                    control.setParent(_this);
                    control._registerOnCollectionChange(_this._onCollectionChange);
                });
            };
            FormGroup.prototype._updateValue = function() {
                this._value = this._reduceValue();
            };
            FormGroup.prototype._anyControls = function(condition) {
                var _this = this;
                var res = false;
                this._forEachChild(function(control, name) {
                    res = res || _this.contains(name) && condition(control);
                });
                return res;
            };
            FormGroup.prototype._reduceValue = function() {
                var _this = this;
                return this._reduceChildren({}, function(acc, control, name) {
                    if (control.enabled || _this.disabled) {
                        acc[name] = control.value;
                    }
                    return acc;
                });
            };
            FormGroup.prototype._reduceChildren = function(initValue, fn) {
                var res = initValue;
                this._forEachChild(function(control, name) {
                    res = fn(res, control, name);
                });
                return res;
            };
            FormGroup.prototype._allControlsDisabled = function() {
                for (var _i = 0, _a = Object.keys(this.controls); _i < _a.length; _i++) {
                    var controlName = _a[_i];
                    if (this.controls[controlName].enabled) {
                        return false;
                    }
                }
                return Object.keys(this.controls).length > 0 || this.disabled;
            };
            FormGroup.prototype._checkAllValuesPresent = function(value) {
                this._forEachChild(function(control, name) {
                    if (value[name] === undefined) {
                        throw new Error("Must supply a value for form control with name: '" + name + "'.");
                    }
                });
            };
            return FormGroup;
        }(AbstractControl);
        var FormArray = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](FormArray, _super);
            function FormArray(controls, validator, asyncValidator) {
                var _this = _super.call(this, validator || null, asyncValidator || null) || this;
                _this.controls = controls;
                _this._initObservables();
                _this._setUpControls();
                _this.updateValueAndValidity({
                    onlySelf: true,
                    emitEvent: false
                });
                return _this;
            }
            FormArray.prototype.at = function(index) {
                return this.controls[index];
            };
            FormArray.prototype.push = function(control) {
                this.controls.push(control);
                this._registerControl(control);
                this.updateValueAndValidity();
                this._onCollectionChange();
            };
            FormArray.prototype.insert = function(index, control) {
                this.controls.splice(index, 0, control);
                this._registerControl(control);
                this.updateValueAndValidity();
                this._onCollectionChange();
            };
            FormArray.prototype.removeAt = function(index) {
                if (this.controls[index]) this.controls[index]._registerOnCollectionChange(function() {});
                this.controls.splice(index, 1);
                this.updateValueAndValidity();
                this._onCollectionChange();
            };
            FormArray.prototype.setControl = function(index, control) {
                if (this.controls[index]) this.controls[index]._registerOnCollectionChange(function() {});
                this.controls.splice(index, 1);
                if (control) {
                    this.controls.splice(index, 0, control);
                    this._registerControl(control);
                }
                this.updateValueAndValidity();
                this._onCollectionChange();
            };
            Object.defineProperty(FormArray.prototype, "length", {
                get: function() {
                    return this.controls.length;
                },
                enumerable: true,
                configurable: true
            });
            FormArray.prototype.setValue = function(value, options) {
                var _this = this;
                if (options === void 0) {
                    options = {};
                }
                this._checkAllValuesPresent(value);
                value.forEach(function(newValue, index) {
                    _this._throwIfControlMissing(index);
                    _this.at(index).setValue(newValue, {
                        onlySelf: true,
                        emitEvent: options.emitEvent
                    });
                });
                this.updateValueAndValidity(options);
            };
            FormArray.prototype.patchValue = function(value, options) {
                var _this = this;
                if (options === void 0) {
                    options = {};
                }
                value.forEach(function(newValue, index) {
                    if (_this.at(index)) {
                        _this.at(index).patchValue(newValue, {
                            onlySelf: true,
                            emitEvent: options.emitEvent
                        });
                    }
                });
                this.updateValueAndValidity(options);
            };
            FormArray.prototype.reset = function(value, options) {
                if (value === void 0) {
                    value = [];
                }
                if (options === void 0) {
                    options = {};
                }
                this._forEachChild(function(control, index) {
                    control.reset(value[index], {
                        onlySelf: true,
                        emitEvent: options.emitEvent
                    });
                });
                this.updateValueAndValidity(options);
                this._updatePristine(options);
                this._updateTouched(options);
            };
            FormArray.prototype.getRawValue = function() {
                return this.controls.map(function(control) {
                    return control instanceof FormControl ? control.value : control.getRawValue();
                });
            };
            FormArray.prototype._throwIfControlMissing = function(index) {
                if (!this.controls.length) {
                    throw new Error("\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
                }
                if (!this.at(index)) {
                    throw new Error("Cannot find form control at index " + index);
                }
            };
            FormArray.prototype._forEachChild = function(cb) {
                this.controls.forEach(function(control, index) {
                    cb(control, index);
                });
            };
            FormArray.prototype._updateValue = function() {
                var _this = this;
                this._value = this.controls.filter(function(control) {
                    return control.enabled || _this.disabled;
                }).map(function(control) {
                    return control.value;
                });
            };
            FormArray.prototype._anyControls = function(condition) {
                return this.controls.some(function(control) {
                    return control.enabled && condition(control);
                });
            };
            FormArray.prototype._setUpControls = function() {
                var _this = this;
                this._forEachChild(function(control) {
                    return _this._registerControl(control);
                });
            };
            FormArray.prototype._checkAllValuesPresent = function(value) {
                this._forEachChild(function(control, i) {
                    if (value[i] === undefined) {
                        throw new Error("Must supply a value for form control at index: " + i + ".");
                    }
                });
            };
            FormArray.prototype._allControlsDisabled = function() {
                for (var _i = 0, _a = this.controls; _i < _a.length; _i++) {
                    var control = _a[_i];
                    if (control.enabled) return false;
                }
                return this.controls.length > 0 || this.disabled;
            };
            FormArray.prototype._registerControl = function(control) {
                control.setParent(this);
                control._registerOnCollectionChange(this._onCollectionChange);
            };
            return FormArray;
        }(AbstractControl);
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var formDirectiveProvider = {
            provide: ControlContainer,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return NgForm;
            })
        };
        var resolvedPromise = Promise.resolve(null);
        var NgForm = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](NgForm, _super);
            function NgForm(validators, asyncValidators) {
                var _this = _super.call(this) || this;
                _this._submitted = false;
                _this.ngSubmit = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["V"]();
                _this.form = new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
                return _this;
            }
            Object.defineProperty(NgForm.prototype, "submitted", {
                get: function() {
                    return this._submitted;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgForm.prototype, "formDirective", {
                get: function() {
                    return this;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgForm.prototype, "control", {
                get: function() {
                    return this.form;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgForm.prototype, "path", {
                get: function() {
                    return [];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgForm.prototype, "controls", {
                get: function() {
                    return this.form.controls;
                },
                enumerable: true,
                configurable: true
            });
            NgForm.prototype.addControl = function(dir) {
                var _this = this;
                resolvedPromise.then(function() {
                    var container = _this._findContainer(dir.path);
                    dir._control = container.registerControl(dir.name, dir.control);
                    setUpControl(dir.control, dir);
                    dir.control.updateValueAndValidity({
                        emitEvent: false
                    });
                });
            };
            NgForm.prototype.getControl = function(dir) {
                return this.form.get(dir.path);
            };
            NgForm.prototype.removeControl = function(dir) {
                var _this = this;
                resolvedPromise.then(function() {
                    var container = _this._findContainer(dir.path);
                    if (container) {
                        container.removeControl(dir.name);
                    }
                });
            };
            NgForm.prototype.addFormGroup = function(dir) {
                var _this = this;
                resolvedPromise.then(function() {
                    var container = _this._findContainer(dir.path);
                    var group = new FormGroup({});
                    setUpFormContainer(group, dir);
                    container.registerControl(dir.name, group);
                    group.updateValueAndValidity({
                        emitEvent: false
                    });
                });
            };
            NgForm.prototype.removeFormGroup = function(dir) {
                var _this = this;
                resolvedPromise.then(function() {
                    var container = _this._findContainer(dir.path);
                    if (container) {
                        container.removeControl(dir.name);
                    }
                });
            };
            NgForm.prototype.getFormGroup = function(dir) {
                return this.form.get(dir.path);
            };
            NgForm.prototype.updateModel = function(dir, value) {
                var _this = this;
                resolvedPromise.then(function() {
                    var ctrl = _this.form.get(dir.path);
                    ctrl.setValue(value);
                });
            };
            NgForm.prototype.setValue = function(value) {
                this.control.setValue(value);
            };
            NgForm.prototype.onSubmit = function($event) {
                this._submitted = true;
                this.ngSubmit.emit($event);
                return false;
            };
            NgForm.prototype.onReset = function() {
                this.resetForm();
            };
            NgForm.prototype.resetForm = function(value) {
                if (value === void 0) {
                    value = undefined;
                }
                this.form.reset(value);
                this._submitted = false;
            };
            NgForm.prototype._findContainer = function(path) {
                path.pop();
                return path.length ? this.form.get(path) : this.form;
            };
            return NgForm;
        }(ControlContainer);
        NgForm.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]",
                providers: [ formDirectiveProvider ],
                host: {
                    "(submit)": "onSubmit($event)",
                    "(reset)": "onReset()"
                },
                outputs: [ "ngSubmit" ],
                exportAs: "ngForm"
            } ]
        } ];
        NgForm.ctorParameters = function() {
            return [ {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_VALIDATORS ]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_ASYNC_VALIDATORS ]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var FormErrorExamples = {
            formControlName: '\n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });',
            formGroupName: '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });',
            formArrayName: '\n    <div [formGroup]="myGroup">\n      <div formArrayName="cities">\n        <div *ngFor="let city of cityArray.controls; index as i">\n          <input [formControlName]="i">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl(\'SF\')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });',
            ngModelGroup: '\n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>',
            ngModelWithFormGroup: '\n    <div [formGroup]="myGroup">\n       <input formControlName="firstName">\n       <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">\n    </div>\n  '
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var TemplateDrivenErrors = function() {
            function TemplateDrivenErrors() {}
            TemplateDrivenErrors.modelParentException = function() {
                throw new Error('\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup\'s partner directive "formControlName" instead.  Example:\n\n      ' + FormErrorExamples.formControlName + "\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      " + FormErrorExamples.ngModelWithFormGroup);
            };
            TemplateDrivenErrors.formGroupNameException = function() {
                throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      " + FormErrorExamples.formGroupName + "\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      " + FormErrorExamples.ngModelGroup);
            };
            TemplateDrivenErrors.missingNameException = function() {
                throw new Error('If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as \'standalone\' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]="person.firstName" name="first">\n      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">');
            };
            TemplateDrivenErrors.modelGroupParentException = function() {
                throw new Error("\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      " + FormErrorExamples.formGroupName + "\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      " + FormErrorExamples.ngModelGroup);
            };
            return TemplateDrivenErrors;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var modelGroupProvider = {
            provide: ControlContainer,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return NgModelGroup;
            })
        };
        var NgModelGroup = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](NgModelGroup, _super);
            function NgModelGroup(parent, validators, asyncValidators) {
                var _this = _super.call(this) || this;
                _this._parent = parent;
                _this._validators = validators;
                _this._asyncValidators = asyncValidators;
                return _this;
            }
            NgModelGroup.prototype._checkParentType = function() {
                if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
                    TemplateDrivenErrors.modelGroupParentException();
                }
            };
            return NgModelGroup;
        }(AbstractFormGroupDirective);
        NgModelGroup.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[ngModelGroup]",
                providers: [ modelGroupProvider ],
                exportAs: "ngModelGroup"
            } ]
        } ];
        NgModelGroup.ctorParameters = function() {
            return [ {
                type: ControlContainer,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_4"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["U"]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_VALIDATORS ]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_ASYNC_VALIDATORS ]
                } ]
            } ];
        };
        NgModelGroup.propDecorators = {
            name: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "ngModelGroup" ]
            } ]
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var formControlBinding = {
            provide: NgControl,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return NgModel;
            })
        };
        var resolvedPromise$1 = Promise.resolve(null);
        var NgModel = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](NgModel, _super);
            function NgModel(parent, validators, asyncValidators, valueAccessors) {
                var _this = _super.call(this) || this;
                _this._control = new FormControl();
                _this._registered = false;
                _this.update = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["V"]();
                _this._parent = parent;
                _this._rawValidators = validators || [];
                _this._rawAsyncValidators = asyncValidators || [];
                _this.valueAccessor = selectValueAccessor(_this, valueAccessors);
                return _this;
            }
            NgModel.prototype.ngOnChanges = function(changes) {
                this._checkForErrors();
                if (!this._registered) this._setUpControl();
                if ("isDisabled" in changes) {
                    this._updateDisabled(changes);
                }
                if (isPropertyUpdated(changes, this.viewModel)) {
                    this._updateValue(this.model);
                    this.viewModel = this.model;
                }
            };
            NgModel.prototype.ngOnDestroy = function() {
                this.formDirective && this.formDirective.removeControl(this);
            };
            Object.defineProperty(NgModel.prototype, "control", {
                get: function() {
                    return this._control;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgModel.prototype, "path", {
                get: function() {
                    return this._parent ? controlPath(this.name, this._parent) : [ this.name ];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgModel.prototype, "formDirective", {
                get: function() {
                    return this._parent ? this._parent.formDirective : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgModel.prototype, "validator", {
                get: function() {
                    return composeValidators(this._rawValidators);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NgModel.prototype, "asyncValidator", {
                get: function() {
                    return composeAsyncValidators(this._rawAsyncValidators);
                },
                enumerable: true,
                configurable: true
            });
            NgModel.prototype.viewToModelUpdate = function(newValue) {
                this.viewModel = newValue;
                this.update.emit(newValue);
            };
            NgModel.prototype._setUpControl = function() {
                this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this);
                this._registered = true;
            };
            NgModel.prototype._isStandalone = function() {
                return !this._parent || !!(this.options && this.options.standalone);
            };
            NgModel.prototype._setUpStandalone = function() {
                setUpControl(this._control, this);
                this._control.updateValueAndValidity({
                    emitEvent: false
                });
            };
            NgModel.prototype._checkForErrors = function() {
                if (!this._isStandalone()) {
                    this._checkParentType();
                }
                this._checkName();
            };
            NgModel.prototype._checkParentType = function() {
                if (!(this._parent instanceof NgModelGroup) && this._parent instanceof AbstractFormGroupDirective) {
                    TemplateDrivenErrors.formGroupNameException();
                } else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
                    TemplateDrivenErrors.modelParentException();
                }
            };
            NgModel.prototype._checkName = function() {
                if (this.options && this.options.name) this.name = this.options.name;
                if (!this._isStandalone() && !this.name) {
                    TemplateDrivenErrors.missingNameException();
                }
            };
            NgModel.prototype._updateValue = function(value) {
                var _this = this;
                resolvedPromise$1.then(function() {
                    _this.control.setValue(value, {
                        emitViewToModelChange: false
                    });
                });
            };
            NgModel.prototype._updateDisabled = function(changes) {
                var _this = this;
                var disabledValue = changes["isDisabled"].currentValue;
                var isDisabled = disabledValue === "" || disabledValue && disabledValue !== "false";
                resolvedPromise$1.then(function() {
                    if (isDisabled && !_this.control.disabled) {
                        _this.control.disable();
                    } else if (!isDisabled && _this.control.disabled) {
                        _this.control.enable();
                    }
                });
            };
            return NgModel;
        }(NgControl);
        NgModel.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[ngModel]:not([formControlName]):not([formControl])",
                providers: [ formControlBinding ],
                exportAs: "ngModel"
            } ]
        } ];
        NgModel.ctorParameters = function() {
            return [ {
                type: ControlContainer,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_4"]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_VALIDATORS ]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_ASYNC_VALIDATORS ]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_VALUE_ACCESSOR ]
                } ]
            } ];
        };
        NgModel.propDecorators = {
            name: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ],
            isDisabled: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "disabled" ]
            } ],
            model: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "ngModel" ]
            } ],
            options: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "ngModelOptions" ]
            } ],
            update: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_15"],
                args: [ "ngModelChange" ]
            } ]
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var ReactiveErrors = function() {
            function ReactiveErrors() {}
            ReactiveErrors.controlParentException = function() {
                throw new Error("formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + FormErrorExamples.formControlName);
            };
            ReactiveErrors.ngModelGroupException = function() {
                throw new Error('formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a "form" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        ' + FormErrorExamples.formGroupName + "\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        " + FormErrorExamples.ngModelGroup);
            };
            ReactiveErrors.missingFormException = function() {
                throw new Error("formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       " + FormErrorExamples.formControlName);
            };
            ReactiveErrors.groupParentException = function() {
                throw new Error("formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + FormErrorExamples.formGroupName);
            };
            ReactiveErrors.arrayParentException = function() {
                throw new Error("formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        " + FormErrorExamples.formArrayName);
            };
            ReactiveErrors.disabledAttrWarning = function() {
                console.warn("\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    ");
            };
            return ReactiveErrors;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var formControlBinding$1 = {
            provide: NgControl,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return FormControlDirective;
            })
        };
        var FormControlDirective = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](FormControlDirective, _super);
            function FormControlDirective(validators, asyncValidators, valueAccessors) {
                var _this = _super.call(this) || this;
                _this.update = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["V"]();
                _this._rawValidators = validators || [];
                _this._rawAsyncValidators = asyncValidators || [];
                _this.valueAccessor = selectValueAccessor(_this, valueAccessors);
                return _this;
            }
            Object.defineProperty(FormControlDirective.prototype, "isDisabled", {
                set: function(isDisabled) {
                    ReactiveErrors.disabledAttrWarning();
                },
                enumerable: true,
                configurable: true
            });
            FormControlDirective.prototype.ngOnChanges = function(changes) {
                if (this._isControlChanged(changes)) {
                    setUpControl(this.form, this);
                    if (this.control.disabled && this.valueAccessor.setDisabledState) {
                        this.valueAccessor.setDisabledState(true);
                    }
                    this.form.updateValueAndValidity({
                        emitEvent: false
                    });
                }
                if (isPropertyUpdated(changes, this.viewModel)) {
                    this.form.setValue(this.model);
                    this.viewModel = this.model;
                }
            };
            Object.defineProperty(FormControlDirective.prototype, "path", {
                get: function() {
                    return [];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormControlDirective.prototype, "validator", {
                get: function() {
                    return composeValidators(this._rawValidators);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormControlDirective.prototype, "asyncValidator", {
                get: function() {
                    return composeAsyncValidators(this._rawAsyncValidators);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormControlDirective.prototype, "control", {
                get: function() {
                    return this.form;
                },
                enumerable: true,
                configurable: true
            });
            FormControlDirective.prototype.viewToModelUpdate = function(newValue) {
                this.viewModel = newValue;
                this.update.emit(newValue);
            };
            FormControlDirective.prototype._isControlChanged = function(changes) {
                return changes.hasOwnProperty("form");
            };
            return FormControlDirective;
        }(NgControl);
        FormControlDirective.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[formControl]",
                providers: [ formControlBinding$1 ],
                exportAs: "ngForm"
            } ]
        } ];
        FormControlDirective.ctorParameters = function() {
            return [ {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_VALIDATORS ]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_ASYNC_VALIDATORS ]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_VALUE_ACCESSOR ]
                } ]
            } ];
        };
        FormControlDirective.propDecorators = {
            form: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "formControl" ]
            } ],
            model: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "ngModel" ]
            } ],
            update: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_15"],
                args: [ "ngModelChange" ]
            } ],
            isDisabled: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "disabled" ]
            } ]
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var formDirectiveProvider$1 = {
            provide: ControlContainer,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return FormGroupDirective;
            })
        };
        var FormGroupDirective = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](FormGroupDirective, _super);
            function FormGroupDirective(_validators, _asyncValidators) {
                var _this = _super.call(this) || this;
                _this._validators = _validators;
                _this._asyncValidators = _asyncValidators;
                _this._submitted = false;
                _this.directives = [];
                _this.form = null;
                _this.ngSubmit = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["V"]();
                return _this;
            }
            FormGroupDirective.prototype.ngOnChanges = function(changes) {
                this._checkFormPresent();
                if (changes.hasOwnProperty("form")) {
                    this._updateValidators();
                    this._updateDomValue();
                    this._updateRegistrations();
                }
            };
            Object.defineProperty(FormGroupDirective.prototype, "submitted", {
                get: function() {
                    return this._submitted;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormGroupDirective.prototype, "formDirective", {
                get: function() {
                    return this;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormGroupDirective.prototype, "control", {
                get: function() {
                    return this.form;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormGroupDirective.prototype, "path", {
                get: function() {
                    return [];
                },
                enumerable: true,
                configurable: true
            });
            FormGroupDirective.prototype.addControl = function(dir) {
                var ctrl = this.form.get(dir.path);
                setUpControl(ctrl, dir);
                ctrl.updateValueAndValidity({
                    emitEvent: false
                });
                this.directives.push(dir);
                return ctrl;
            };
            FormGroupDirective.prototype.getControl = function(dir) {
                return this.form.get(dir.path);
            };
            FormGroupDirective.prototype.removeControl = function(dir) {
                remove(this.directives, dir);
            };
            FormGroupDirective.prototype.addFormGroup = function(dir) {
                var ctrl = this.form.get(dir.path);
                setUpFormContainer(ctrl, dir);
                ctrl.updateValueAndValidity({
                    emitEvent: false
                });
            };
            FormGroupDirective.prototype.removeFormGroup = function(dir) {};
            FormGroupDirective.prototype.getFormGroup = function(dir) {
                return this.form.get(dir.path);
            };
            FormGroupDirective.prototype.addFormArray = function(dir) {
                var ctrl = this.form.get(dir.path);
                setUpFormContainer(ctrl, dir);
                ctrl.updateValueAndValidity({
                    emitEvent: false
                });
            };
            FormGroupDirective.prototype.removeFormArray = function(dir) {};
            FormGroupDirective.prototype.getFormArray = function(dir) {
                return this.form.get(dir.path);
            };
            FormGroupDirective.prototype.updateModel = function(dir, value) {
                var ctrl = this.form.get(dir.path);
                ctrl.setValue(value);
            };
            FormGroupDirective.prototype.onSubmit = function($event) {
                this._submitted = true;
                this.ngSubmit.emit($event);
                return false;
            };
            FormGroupDirective.prototype.onReset = function() {
                this.resetForm();
            };
            FormGroupDirective.prototype.resetForm = function(value) {
                if (value === void 0) {
                    value = undefined;
                }
                this.form.reset(value);
                this._submitted = false;
            };
            FormGroupDirective.prototype._updateDomValue = function() {
                var _this = this;
                this.directives.forEach(function(dir) {
                    var newCtrl = _this.form.get(dir.path);
                    if (dir._control !== newCtrl) {
                        cleanUpControl(dir._control, dir);
                        if (newCtrl) setUpControl(newCtrl, dir);
                        dir._control = newCtrl;
                    }
                });
                this.form._updateTreeValidity({
                    emitEvent: false
                });
            };
            FormGroupDirective.prototype._updateRegistrations = function() {
                var _this = this;
                this.form._registerOnCollectionChange(function() {
                    return _this._updateDomValue();
                });
                if (this._oldForm) this._oldForm._registerOnCollectionChange(function() {});
                this._oldForm = this.form;
            };
            FormGroupDirective.prototype._updateValidators = function() {
                var sync = composeValidators(this._validators);
                this.form.validator = Validators.compose([ this.form.validator, sync ]);
                var async = composeAsyncValidators(this._asyncValidators);
                this.form.asyncValidator = Validators.composeAsync([ this.form.asyncValidator, async ]);
            };
            FormGroupDirective.prototype._checkFormPresent = function() {
                if (!this.form) {
                    ReactiveErrors.missingFormException();
                }
            };
            return FormGroupDirective;
        }(ControlContainer);
        FormGroupDirective.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[formGroup]",
                providers: [ formDirectiveProvider$1 ],
                host: {
                    "(submit)": "onSubmit($event)",
                    "(reset)": "onReset()"
                },
                exportAs: "ngForm"
            } ]
        } ];
        FormGroupDirective.ctorParameters = function() {
            return [ {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_VALIDATORS ]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_ASYNC_VALIDATORS ]
                } ]
            } ];
        };
        FormGroupDirective.propDecorators = {
            form: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "formGroup" ]
            } ],
            ngSubmit: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_15"]
            } ]
        };
        function remove(list, el) {
            var index = list.indexOf(el);
            if (index > -1) {
                list.splice(index, 1);
            }
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var formGroupNameProvider = {
            provide: ControlContainer,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return FormGroupName;
            })
        };
        var FormGroupName = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](FormGroupName, _super);
            function FormGroupName(parent, validators, asyncValidators) {
                var _this = _super.call(this) || this;
                _this._parent = parent;
                _this._validators = validators;
                _this._asyncValidators = asyncValidators;
                return _this;
            }
            FormGroupName.prototype._checkParentType = function() {
                if (_hasInvalidParent(this._parent)) {
                    ReactiveErrors.groupParentException();
                }
            };
            return FormGroupName;
        }(AbstractFormGroupDirective);
        FormGroupName.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[formGroupName]",
                providers: [ formGroupNameProvider ]
            } ]
        } ];
        FormGroupName.ctorParameters = function() {
            return [ {
                type: ControlContainer,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_4"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["U"]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_VALIDATORS ]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_ASYNC_VALIDATORS ]
                } ]
            } ];
        };
        FormGroupName.propDecorators = {
            name: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "formGroupName" ]
            } ]
        };
        var formArrayNameProvider = {
            provide: ControlContainer,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return FormArrayName;
            })
        };
        var FormArrayName = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](FormArrayName, _super);
            function FormArrayName(parent, validators, asyncValidators) {
                var _this = _super.call(this) || this;
                _this._parent = parent;
                _this._validators = validators;
                _this._asyncValidators = asyncValidators;
                return _this;
            }
            FormArrayName.prototype.ngOnInit = function() {
                this._checkParentType();
                this.formDirective.addFormArray(this);
            };
            FormArrayName.prototype.ngOnDestroy = function() {
                if (this.formDirective) {
                    this.formDirective.removeFormArray(this);
                }
            };
            Object.defineProperty(FormArrayName.prototype, "control", {
                get: function() {
                    return this.formDirective.getFormArray(this);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormArrayName.prototype, "formDirective", {
                get: function() {
                    return this._parent ? this._parent.formDirective : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormArrayName.prototype, "path", {
                get: function() {
                    return controlPath(this.name, this._parent);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormArrayName.prototype, "validator", {
                get: function() {
                    return composeValidators(this._validators);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormArrayName.prototype, "asyncValidator", {
                get: function() {
                    return composeAsyncValidators(this._asyncValidators);
                },
                enumerable: true,
                configurable: true
            });
            FormArrayName.prototype._checkParentType = function() {
                if (_hasInvalidParent(this._parent)) {
                    ReactiveErrors.arrayParentException();
                }
            };
            return FormArrayName;
        }(ControlContainer);
        FormArrayName.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[formArrayName]",
                providers: [ formArrayNameProvider ]
            } ]
        } ];
        FormArrayName.ctorParameters = function() {
            return [ {
                type: ControlContainer,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_4"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["U"]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_VALIDATORS ]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_ASYNC_VALIDATORS ]
                } ]
            } ];
        };
        FormArrayName.propDecorators = {
            name: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "formArrayName" ]
            } ]
        };
        function _hasInvalidParent(parent) {
            return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) && !(parent instanceof FormArrayName);
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var controlNameBinding = {
            provide: NgControl,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return FormControlName;
            })
        };
        var FormControlName = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](FormControlName, _super);
            function FormControlName(parent, validators, asyncValidators, valueAccessors) {
                var _this = _super.call(this) || this;
                _this._added = false;
                _this.update = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["V"]();
                _this._parent = parent;
                _this._rawValidators = validators || [];
                _this._rawAsyncValidators = asyncValidators || [];
                _this.valueAccessor = selectValueAccessor(_this, valueAccessors);
                return _this;
            }
            Object.defineProperty(FormControlName.prototype, "isDisabled", {
                set: function(isDisabled) {
                    ReactiveErrors.disabledAttrWarning();
                },
                enumerable: true,
                configurable: true
            });
            FormControlName.prototype.ngOnChanges = function(changes) {
                if (!this._added) this._setUpControl();
                if (isPropertyUpdated(changes, this.viewModel)) {
                    this.viewModel = this.model;
                    this.formDirective.updateModel(this, this.model);
                }
            };
            FormControlName.prototype.ngOnDestroy = function() {
                if (this.formDirective) {
                    this.formDirective.removeControl(this);
                }
            };
            FormControlName.prototype.viewToModelUpdate = function(newValue) {
                this.viewModel = newValue;
                this.update.emit(newValue);
            };
            Object.defineProperty(FormControlName.prototype, "path", {
                get: function() {
                    return controlPath(this.name, this._parent);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormControlName.prototype, "formDirective", {
                get: function() {
                    return this._parent ? this._parent.formDirective : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormControlName.prototype, "validator", {
                get: function() {
                    return composeValidators(this._rawValidators);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormControlName.prototype, "asyncValidator", {
                get: function() {
                    return composeAsyncValidators(this._rawAsyncValidators);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FormControlName.prototype, "control", {
                get: function() {
                    return this._control;
                },
                enumerable: true,
                configurable: true
            });
            FormControlName.prototype._checkParentType = function() {
                if (!(this._parent instanceof FormGroupName) && this._parent instanceof AbstractFormGroupDirective) {
                    ReactiveErrors.ngModelGroupException();
                } else if (!(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) && !(this._parent instanceof FormArrayName)) {
                    ReactiveErrors.controlParentException();
                }
            };
            FormControlName.prototype._setUpControl = function() {
                this._checkParentType();
                this._control = this.formDirective.addControl(this);
                if (this.control.disabled && this.valueAccessor.setDisabledState) {
                    this.valueAccessor.setDisabledState(true);
                }
                this._added = true;
            };
            return FormControlName;
        }(NgControl);
        FormControlName.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[formControlName]",
                providers: [ controlNameBinding ]
            } ]
        } ];
        FormControlName.ctorParameters = function() {
            return [ {
                type: ControlContainer,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_4"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["U"]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_VALIDATORS ]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_ASYNC_VALIDATORS ]
                } ]
            }, {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_14"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H"],
                    args: [ NG_VALUE_ACCESSOR ]
                } ]
            } ];
        };
        FormControlName.propDecorators = {
            name: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "formControlName" ]
            } ],
            model: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "ngModel" ]
            } ],
            update: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_15"],
                args: [ "ngModelChange" ]
            } ],
            isDisabled: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"],
                args: [ "disabled" ]
            } ]
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var REQUIRED_VALIDATOR = {
            provide: NG_VALIDATORS,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return RequiredValidator;
            }),
            multi: true
        };
        var CHECKBOX_REQUIRED_VALIDATOR = {
            provide: NG_VALIDATORS,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return CheckboxRequiredValidator;
            }),
            multi: true
        };
        var RequiredValidator = function() {
            function RequiredValidator() {}
            Object.defineProperty(RequiredValidator.prototype, "required", {
                get: function() {
                    return this._required;
                },
                set: function(value) {
                    this._required = value != null && value !== false && "" + value !== "false";
                    if (this._onChange) this._onChange();
                },
                enumerable: true,
                configurable: true
            });
            RequiredValidator.prototype.validate = function(c) {
                return this.required ? Validators.required(c) : null;
            };
            RequiredValidator.prototype.registerOnValidatorChange = function(fn) {
                this._onChange = fn;
            };
            return RequiredValidator;
        }();
        RequiredValidator.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]",
                providers: [ REQUIRED_VALIDATOR ],
                host: {
                    "[attr.required]": 'required ? "" : null'
                }
            } ]
        } ];
        RequiredValidator.ctorParameters = function() {
            return [];
        };
        RequiredValidator.propDecorators = {
            required: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        var CheckboxRequiredValidator = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](CheckboxRequiredValidator, _super);
            function CheckboxRequiredValidator() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CheckboxRequiredValidator.prototype.validate = function(c) {
                return this.required ? Validators.requiredTrue(c) : null;
            };
            return CheckboxRequiredValidator;
        }(RequiredValidator);
        CheckboxRequiredValidator.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "input[type=checkbox][required][formControlName],input[type=checkbox][required][formControl],input[type=checkbox][required][ngModel]",
                providers: [ CHECKBOX_REQUIRED_VALIDATOR ],
                host: {
                    "[attr.required]": 'required ? "" : null'
                }
            } ]
        } ];
        CheckboxRequiredValidator.ctorParameters = function() {
            return [];
        };
        var EMAIL_VALIDATOR = {
            provide: NG_VALIDATORS,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return EmailValidator;
            }),
            multi: true
        };
        var EmailValidator = function() {
            function EmailValidator() {}
            Object.defineProperty(EmailValidator.prototype, "email", {
                set: function(value) {
                    this._enabled = value === "" || value === true || value === "true";
                    if (this._onChange) this._onChange();
                },
                enumerable: true,
                configurable: true
            });
            EmailValidator.prototype.validate = function(c) {
                return this._enabled ? Validators.email(c) : null;
            };
            EmailValidator.prototype.registerOnValidatorChange = function(fn) {
                this._onChange = fn;
            };
            return EmailValidator;
        }();
        EmailValidator.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[email][formControlName],[email][formControl],[email][ngModel]",
                providers: [ EMAIL_VALIDATOR ]
            } ]
        } ];
        EmailValidator.ctorParameters = function() {
            return [];
        };
        EmailValidator.propDecorators = {
            email: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        var MIN_LENGTH_VALIDATOR = {
            provide: NG_VALIDATORS,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return MinLengthValidator;
            }),
            multi: true
        };
        var MinLengthValidator = function() {
            function MinLengthValidator() {}
            MinLengthValidator.prototype.ngOnChanges = function(changes) {
                if ("minlength" in changes) {
                    this._createValidator();
                    if (this._onChange) this._onChange();
                }
            };
            MinLengthValidator.prototype.validate = function(c) {
                return this.minlength == null ? null : this._validator(c);
            };
            MinLengthValidator.prototype.registerOnValidatorChange = function(fn) {
                this._onChange = fn;
            };
            MinLengthValidator.prototype._createValidator = function() {
                this._validator = Validators.minLength(parseInt(this.minlength, 10));
            };
            return MinLengthValidator;
        }();
        MinLengthValidator.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[minlength][formControlName],[minlength][formControl],[minlength][ngModel]",
                providers: [ MIN_LENGTH_VALIDATOR ],
                host: {
                    "[attr.minlength]": "minlength ? minlength : null"
                }
            } ]
        } ];
        MinLengthValidator.ctorParameters = function() {
            return [];
        };
        MinLengthValidator.propDecorators = {
            minlength: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        var MAX_LENGTH_VALIDATOR = {
            provide: NG_VALIDATORS,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return MaxLengthValidator;
            }),
            multi: true
        };
        var MaxLengthValidator = function() {
            function MaxLengthValidator() {}
            MaxLengthValidator.prototype.ngOnChanges = function(changes) {
                if ("maxlength" in changes) {
                    this._createValidator();
                    if (this._onChange) this._onChange();
                }
            };
            MaxLengthValidator.prototype.validate = function(c) {
                return this.maxlength != null ? this._validator(c) : null;
            };
            MaxLengthValidator.prototype.registerOnValidatorChange = function(fn) {
                this._onChange = fn;
            };
            MaxLengthValidator.prototype._createValidator = function() {
                this._validator = Validators.maxLength(parseInt(this.maxlength, 10));
            };
            return MaxLengthValidator;
        }();
        MaxLengthValidator.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]",
                providers: [ MAX_LENGTH_VALIDATOR ],
                host: {
                    "[attr.maxlength]": "maxlength ? maxlength : null"
                }
            } ]
        } ];
        MaxLengthValidator.ctorParameters = function() {
            return [];
        };
        MaxLengthValidator.propDecorators = {
            maxlength: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        var PATTERN_VALIDATOR = {
            provide: NG_VALIDATORS,
            useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11"])(function() {
                return PatternValidator;
            }),
            multi: true
        };
        var PatternValidator = function() {
            function PatternValidator() {}
            PatternValidator.prototype.ngOnChanges = function(changes) {
                if ("pattern" in changes) {
                    this._createValidator();
                    if (this._onChange) this._onChange();
                }
            };
            PatternValidator.prototype.validate = function(c) {
                return this._validator(c);
            };
            PatternValidator.prototype.registerOnValidatorChange = function(fn) {
                this._onChange = fn;
            };
            PatternValidator.prototype._createValidator = function() {
                this._validator = Validators.pattern(this.pattern);
            };
            return PatternValidator;
        }();
        PatternValidator.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]",
                providers: [ PATTERN_VALIDATOR ],
                host: {
                    "[attr.pattern]": "pattern ? pattern : null"
                }
            } ]
        } ];
        PatternValidator.ctorParameters = function() {
            return [];
        };
        PatternValidator.propDecorators = {
            pattern: [ {
                type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_1"]
            } ]
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var FormBuilder = function() {
            function FormBuilder() {}
            FormBuilder.prototype.group = function(controlsConfig, extra) {
                if (extra === void 0) {
                    extra = null;
                }
                var controls = this._reduceControls(controlsConfig);
                var validator = extra != null ? extra["validator"] : null;
                var asyncValidator = extra != null ? extra["asyncValidator"] : null;
                return new FormGroup(controls, validator, asyncValidator);
            };
            FormBuilder.prototype.control = function(formState, validator, asyncValidator) {
                return new FormControl(formState, validator, asyncValidator);
            };
            FormBuilder.prototype.array = function(controlsConfig, validator, asyncValidator) {
                var _this = this;
                var controls = controlsConfig.map(function(c) {
                    return _this._createControl(c);
                });
                return new FormArray(controls, validator, asyncValidator);
            };
            FormBuilder.prototype._reduceControls = function(controlsConfig) {
                var _this = this;
                var controls = {};
                Object.keys(controlsConfig).forEach(function(controlName) {
                    controls[controlName] = _this._createControl(controlsConfig[controlName]);
                });
                return controls;
            };
            FormBuilder.prototype._createControl = function(controlConfig) {
                if (controlConfig instanceof FormControl || controlConfig instanceof FormGroup || controlConfig instanceof FormArray) {
                    return controlConfig;
                } else if (Array.isArray(controlConfig)) {
                    var value = controlConfig[0];
                    var validator = controlConfig.length > 1 ? controlConfig[1] : null;
                    var asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
                    return this.control(value, validator, asyncValidator);
                } else {
                    return this.control(controlConfig);
                }
            };
            return FormBuilder;
        }();
        FormBuilder.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D"]
        } ];
        FormBuilder.ctorParameters = function() {
            return [];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var VERSION = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["F"]("4.4.7");
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var NgNoValidate = function() {
            function NgNoValidate() {}
            return NgNoValidate;
        }();
        NgNoValidate.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Y"],
            args: [ {
                selector: "form:not([ngNoForm]):not([ngNativeValidate])",
                host: {
                    novalidate: ""
                }
            } ]
        } ];
        NgNoValidate.ctorParameters = function() {
            return [];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var SHARED_FORM_DIRECTIVES = [ NgNoValidate, NgSelectOption, NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator ];
        var TEMPLATE_DRIVEN_DIRECTIVES = [ NgModel, NgModelGroup, NgForm ];
        var REACTIVE_DRIVEN_DIRECTIVES = [ FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName ];
        var InternalFormsSharedModule = function() {
            function InternalFormsSharedModule() {}
            return InternalFormsSharedModule;
        }();
        InternalFormsSharedModule.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["E"],
            args: [ {
                declarations: SHARED_FORM_DIRECTIVES,
                exports: SHARED_FORM_DIRECTIVES
            } ]
        } ];
        InternalFormsSharedModule.ctorParameters = function() {
            return [];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var FormsModule = function() {
            function FormsModule() {}
            return FormsModule;
        }();
        FormsModule.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["E"],
            args: [ {
                declarations: TEMPLATE_DRIVEN_DIRECTIVES,
                providers: [ RadioControlRegistry ],
                exports: [ InternalFormsSharedModule, TEMPLATE_DRIVEN_DIRECTIVES ]
            } ]
        } ];
        FormsModule.ctorParameters = function() {
            return [];
        };
        var ReactiveFormsModule = function() {
            function ReactiveFormsModule() {}
            return ReactiveFormsModule;
        }();
        ReactiveFormsModule.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["E"],
            args: [ {
                declarations: [ REACTIVE_DRIVEN_DIRECTIVES ],
                providers: [ FormBuilder, RadioControlRegistry ],
                exports: [ InternalFormsSharedModule, REACTIVE_DRIVEN_DIRECTIVES ]
            } ]
        } ];
        ReactiveFormsModule.ctorParameters = function() {
            return [];
        };
    },
    Qbdm: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("TToO");
        var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("2Je8");
        var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("3j3K");
        __webpack_require__.d(__webpack_exports__, "s", function() {
            return BrowserModule;
        });
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return platformBrowser;
        });
        __webpack_require__.d(__webpack_exports__, "n", function() {
            return Meta;
        });
        __webpack_require__.d(__webpack_exports__, "o", function() {
            return Title;
        });
        __webpack_require__.d(__webpack_exports__, "r", function() {
            return NgProbeToken$1;
        });
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return EVENT_MANAGER_PLUGINS;
        });
        __webpack_require__.d(__webpack_exports__, "j", function() {
            return EventManager;
        });
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return HAMMER_GESTURE_CONFIG;
        });
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return HammerGestureConfig;
        });
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return DomSanitizer;
        });
        __webpack_require__.d(__webpack_exports__, "t", function() {
            return getDOM;
        });
        __webpack_require__.d(__webpack_exports__, "l", function() {
            return DomRendererFactory2;
        });
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return DomEventsPlugin;
        });
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return HammerGesturesPlugin;
        });
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return KeyEventsPlugin;
        });
        __webpack_require__.d(__webpack_exports__, "k", function() {
            return DomSharedStylesHost;
        });
        __webpack_require__.d(__webpack_exports__, "m", function() {
            return SharedStylesHost;
        });
        __webpack_require__.d(__webpack_exports__, "p", function() {
            return errorHandler;
        });
        __webpack_require__.d(__webpack_exports__, "q", function() {
            return _createNgProbe;
        });
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return DomSanitizerImpl;
        });
        /**
 * @license Angular v4.4.7
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var _DOM = null;
        function getDOM() {
            return _DOM;
        }
        function setRootDomAdapter(adapter) {
            if (!_DOM) {
                _DOM = adapter;
            }
        }
        var DomAdapter = function() {
            function DomAdapter() {
                this.resourceLoaderType = null;
            }
            DomAdapter.prototype.hasProperty = function(element, name) {};
            DomAdapter.prototype.setProperty = function(el, name, value) {};
            DomAdapter.prototype.getProperty = function(el, name) {};
            DomAdapter.prototype.invoke = function(el, methodName, args) {};
            DomAdapter.prototype.logError = function(error) {};
            DomAdapter.prototype.log = function(error) {};
            DomAdapter.prototype.logGroup = function(error) {};
            DomAdapter.prototype.logGroupEnd = function() {};
            Object.defineProperty(DomAdapter.prototype, "attrToPropMap", {
                get: function() {
                    return this._attrToPropMap;
                },
                set: function(value) {
                    this._attrToPropMap = value;
                },
                enumerable: true,
                configurable: true
            });
            DomAdapter.prototype.contains = function(nodeA, nodeB) {};
            DomAdapter.prototype.parse = function(templateHtml) {};
            DomAdapter.prototype.querySelector = function(el, selector) {};
            DomAdapter.prototype.querySelectorAll = function(el, selector) {};
            DomAdapter.prototype.on = function(el, evt, listener) {};
            DomAdapter.prototype.onAndCancel = function(el, evt, listener) {};
            DomAdapter.prototype.dispatchEvent = function(el, evt) {};
            DomAdapter.prototype.createMouseEvent = function(eventType) {};
            DomAdapter.prototype.createEvent = function(eventType) {};
            DomAdapter.prototype.preventDefault = function(evt) {};
            DomAdapter.prototype.isPrevented = function(evt) {};
            DomAdapter.prototype.getInnerHTML = function(el) {};
            DomAdapter.prototype.getTemplateContent = function(el) {};
            DomAdapter.prototype.getOuterHTML = function(el) {};
            DomAdapter.prototype.nodeName = function(node) {};
            DomAdapter.prototype.nodeValue = function(node) {};
            DomAdapter.prototype.type = function(node) {};
            DomAdapter.prototype.content = function(node) {};
            DomAdapter.prototype.firstChild = function(el) {};
            DomAdapter.prototype.nextSibling = function(el) {};
            DomAdapter.prototype.parentElement = function(el) {};
            DomAdapter.prototype.childNodes = function(el) {};
            DomAdapter.prototype.childNodesAsList = function(el) {};
            DomAdapter.prototype.clearNodes = function(el) {};
            DomAdapter.prototype.appendChild = function(el, node) {};
            DomAdapter.prototype.removeChild = function(el, node) {};
            DomAdapter.prototype.replaceChild = function(el, newNode, oldNode) {};
            DomAdapter.prototype.remove = function(el) {};
            DomAdapter.prototype.insertBefore = function(parent, ref, node) {};
            DomAdapter.prototype.insertAllBefore = function(parent, ref, nodes) {};
            DomAdapter.prototype.insertAfter = function(parent, el, node) {};
            DomAdapter.prototype.setInnerHTML = function(el, value) {};
            DomAdapter.prototype.getText = function(el) {};
            DomAdapter.prototype.setText = function(el, value) {};
            DomAdapter.prototype.getValue = function(el) {};
            DomAdapter.prototype.setValue = function(el, value) {};
            DomAdapter.prototype.getChecked = function(el) {};
            DomAdapter.prototype.setChecked = function(el, value) {};
            DomAdapter.prototype.createComment = function(text) {};
            DomAdapter.prototype.createTemplate = function(html) {};
            DomAdapter.prototype.createElement = function(tagName, doc) {};
            DomAdapter.prototype.createElementNS = function(ns, tagName, doc) {};
            DomAdapter.prototype.createTextNode = function(text, doc) {};
            DomAdapter.prototype.createScriptTag = function(attrName, attrValue, doc) {};
            DomAdapter.prototype.createStyleElement = function(css, doc) {};
            DomAdapter.prototype.createShadowRoot = function(el) {};
            DomAdapter.prototype.getShadowRoot = function(el) {};
            DomAdapter.prototype.getHost = function(el) {};
            DomAdapter.prototype.getDistributedNodes = function(el) {};
            DomAdapter.prototype.clone = function(node) {};
            DomAdapter.prototype.getElementsByClassName = function(element, name) {};
            DomAdapter.prototype.getElementsByTagName = function(element, name) {};
            DomAdapter.prototype.classList = function(element) {};
            DomAdapter.prototype.addClass = function(element, className) {};
            DomAdapter.prototype.removeClass = function(element, className) {};
            DomAdapter.prototype.hasClass = function(element, className) {};
            DomAdapter.prototype.setStyle = function(element, styleName, styleValue) {};
            DomAdapter.prototype.removeStyle = function(element, styleName) {};
            DomAdapter.prototype.getStyle = function(element, styleName) {};
            DomAdapter.prototype.hasStyle = function(element, styleName, styleValue) {};
            DomAdapter.prototype.tagName = function(element) {};
            DomAdapter.prototype.attributeMap = function(element) {};
            DomAdapter.prototype.hasAttribute = function(element, attribute) {};
            DomAdapter.prototype.hasAttributeNS = function(element, ns, attribute) {};
            DomAdapter.prototype.getAttribute = function(element, attribute) {};
            DomAdapter.prototype.getAttributeNS = function(element, ns, attribute) {};
            DomAdapter.prototype.setAttribute = function(element, name, value) {};
            DomAdapter.prototype.setAttributeNS = function(element, ns, name, value) {};
            DomAdapter.prototype.removeAttribute = function(element, attribute) {};
            DomAdapter.prototype.removeAttributeNS = function(element, ns, attribute) {};
            DomAdapter.prototype.templateAwareRoot = function(el) {};
            DomAdapter.prototype.createHtmlDocument = function() {};
            DomAdapter.prototype.getBoundingClientRect = function(el) {};
            DomAdapter.prototype.getTitle = function(doc) {};
            DomAdapter.prototype.setTitle = function(doc, newTitle) {};
            DomAdapter.prototype.elementMatches = function(n, selector) {};
            DomAdapter.prototype.isTemplateElement = function(el) {};
            DomAdapter.prototype.isTextNode = function(node) {};
            DomAdapter.prototype.isCommentNode = function(node) {};
            DomAdapter.prototype.isElementNode = function(node) {};
            DomAdapter.prototype.hasShadowRoot = function(node) {};
            DomAdapter.prototype.isShadowRoot = function(node) {};
            DomAdapter.prototype.importIntoDoc = function(node) {};
            DomAdapter.prototype.adoptNode = function(node) {};
            DomAdapter.prototype.getHref = function(element) {};
            DomAdapter.prototype.getEventKey = function(event) {};
            DomAdapter.prototype.resolveAndSetHref = function(element, baseUrl, href) {};
            DomAdapter.prototype.supportsDOMEvents = function() {};
            DomAdapter.prototype.supportsNativeShadowDOM = function() {};
            DomAdapter.prototype.getGlobalEventTarget = function(doc, target) {};
            DomAdapter.prototype.getHistory = function() {};
            DomAdapter.prototype.getLocation = function() {};
            DomAdapter.prototype.getBaseHref = function(doc) {};
            DomAdapter.prototype.resetBaseElement = function() {};
            DomAdapter.prototype.getUserAgent = function() {};
            DomAdapter.prototype.setData = function(element, name, value) {};
            DomAdapter.prototype.getComputedStyle = function(element) {};
            DomAdapter.prototype.getData = function(element, name) {};
            DomAdapter.prototype.supportsWebAnimation = function() {};
            DomAdapter.prototype.performanceNow = function() {};
            DomAdapter.prototype.getAnimationPrefix = function() {};
            DomAdapter.prototype.getTransitionEnd = function() {};
            DomAdapter.prototype.supportsAnimation = function() {};
            DomAdapter.prototype.supportsCookies = function() {};
            DomAdapter.prototype.getCookie = function(name) {};
            DomAdapter.prototype.setCookie = function(name, value) {};
            return DomAdapter;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var GenericBrowserDomAdapter = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](GenericBrowserDomAdapter, _super);
            function GenericBrowserDomAdapter() {
                var _this = _super.call(this) || this;
                _this._animationPrefix = null;
                _this._transitionEnd = null;
                try {
                    var element_1 = _this.createElement("div", document);
                    if (_this.getStyle(element_1, "animationName") != null) {
                        _this._animationPrefix = "";
                    } else {
                        var domPrefixes = [ "Webkit", "Moz", "O", "ms" ];
                        for (var i = 0; i < domPrefixes.length; i++) {
                            if (_this.getStyle(element_1, domPrefixes[i] + "AnimationName") != null) {
                                _this._animationPrefix = "-" + domPrefixes[i].toLowerCase() + "-";
                                break;
                            }
                        }
                    }
                    var transEndEventNames_1 = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    };
                    Object.keys(transEndEventNames_1).forEach(function(key) {
                        if (_this.getStyle(element_1, key) != null) {
                            _this._transitionEnd = transEndEventNames_1[key];
                        }
                    });
                } catch (e) {
                    _this._animationPrefix = null;
                    _this._transitionEnd = null;
                }
                return _this;
            }
            GenericBrowserDomAdapter.prototype.getDistributedNodes = function(el) {
                return el.getDistributedNodes();
            };
            GenericBrowserDomAdapter.prototype.resolveAndSetHref = function(el, baseUrl, href) {
                el.href = href == null ? baseUrl : baseUrl + "/../" + href;
            };
            GenericBrowserDomAdapter.prototype.supportsDOMEvents = function() {
                return true;
            };
            GenericBrowserDomAdapter.prototype.supportsNativeShadowDOM = function() {
                return typeof document.body.createShadowRoot === "function";
            };
            GenericBrowserDomAdapter.prototype.getAnimationPrefix = function() {
                return this._animationPrefix ? this._animationPrefix : "";
            };
            GenericBrowserDomAdapter.prototype.getTransitionEnd = function() {
                return this._transitionEnd ? this._transitionEnd : "";
            };
            GenericBrowserDomAdapter.prototype.supportsAnimation = function() {
                return this._animationPrefix != null && this._transitionEnd != null;
            };
            return GenericBrowserDomAdapter;
        }(DomAdapter);
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var _attrToPropMap = {
            class: "className",
            innerHtml: "innerHTML",
            readonly: "readOnly",
            tabindex: "tabIndex"
        };
        var DOM_KEY_LOCATION_NUMPAD = 3;
        var _keyMap = {
            "\b": "Backspace",
            "\t": "Tab",
            "": "Delete",
            "": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        };
        var _chromeNumKeyPadMap = {
            A: "1",
            B: "2",
            C: "3",
            D: "4",
            E: "5",
            F: "6",
            G: "7",
            H: "8",
            I: "9",
            J: "*",
            K: "+",
            M: "-",
            N: ".",
            O: "/",
            "`": "0",
            "": "NumLock"
        };
        var nodeContains;
        if (__WEBPACK_IMPORTED_MODULE_2__angular_core__["G"]["Node"]) {
            nodeContains = __WEBPACK_IMPORTED_MODULE_2__angular_core__["G"]["Node"].prototype.contains || function(node) {
                return !!(this.compareDocumentPosition(node) & 16);
            };
        }
        var BrowserDomAdapter = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](BrowserDomAdapter, _super);
            function BrowserDomAdapter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BrowserDomAdapter.prototype.parse = function(templateHtml) {
                throw new Error("parse not implemented");
            };
            BrowserDomAdapter.makeCurrent = function() {
                setRootDomAdapter(new BrowserDomAdapter());
            };
            BrowserDomAdapter.prototype.hasProperty = function(element, name) {
                return name in element;
            };
            BrowserDomAdapter.prototype.setProperty = function(el, name, value) {
                el[name] = value;
            };
            BrowserDomAdapter.prototype.getProperty = function(el, name) {
                return el[name];
            };
            BrowserDomAdapter.prototype.invoke = function(el, methodName, args) {
                el[methodName].apply(el, args);
            };
            BrowserDomAdapter.prototype.logError = function(error) {
                if (window.console) {
                    if (console.error) {
                        console.error(error);
                    } else {
                        console.log(error);
                    }
                }
            };
            BrowserDomAdapter.prototype.log = function(error) {
                if (window.console) {
                    window.console.log && window.console.log(error);
                }
            };
            BrowserDomAdapter.prototype.logGroup = function(error) {
                if (window.console) {
                    window.console.group && window.console.group(error);
                }
            };
            BrowserDomAdapter.prototype.logGroupEnd = function() {
                if (window.console) {
                    window.console.groupEnd && window.console.groupEnd();
                }
            };
            Object.defineProperty(BrowserDomAdapter.prototype, "attrToPropMap", {
                get: function() {
                    return _attrToPropMap;
                },
                enumerable: true,
                configurable: true
            });
            BrowserDomAdapter.prototype.contains = function(nodeA, nodeB) {
                return nodeContains.call(nodeA, nodeB);
            };
            BrowserDomAdapter.prototype.querySelector = function(el, selector) {
                return el.querySelector(selector);
            };
            BrowserDomAdapter.prototype.querySelectorAll = function(el, selector) {
                return el.querySelectorAll(selector);
            };
            BrowserDomAdapter.prototype.on = function(el, evt, listener) {
                el.addEventListener(evt, listener, false);
            };
            BrowserDomAdapter.prototype.onAndCancel = function(el, evt, listener) {
                el.addEventListener(evt, listener, false);
                return function() {
                    el.removeEventListener(evt, listener, false);
                };
            };
            BrowserDomAdapter.prototype.dispatchEvent = function(el, evt) {
                el.dispatchEvent(evt);
            };
            BrowserDomAdapter.prototype.createMouseEvent = function(eventType) {
                var evt = document.createEvent("MouseEvent");
                evt.initEvent(eventType, true, true);
                return evt;
            };
            BrowserDomAdapter.prototype.createEvent = function(eventType) {
                var evt = document.createEvent("Event");
                evt.initEvent(eventType, true, true);
                return evt;
            };
            BrowserDomAdapter.prototype.preventDefault = function(evt) {
                evt.preventDefault();
                evt.returnValue = false;
            };
            BrowserDomAdapter.prototype.isPrevented = function(evt) {
                return evt.defaultPrevented || evt.returnValue != null && !evt.returnValue;
            };
            BrowserDomAdapter.prototype.getInnerHTML = function(el) {
                return el.innerHTML;
            };
            BrowserDomAdapter.prototype.getTemplateContent = function(el) {
                return "content" in el && el instanceof HTMLTemplateElement ? el.content : null;
            };
            BrowserDomAdapter.prototype.getOuterHTML = function(el) {
                return el.outerHTML;
            };
            BrowserDomAdapter.prototype.nodeName = function(node) {
                return node.nodeName;
            };
            BrowserDomAdapter.prototype.nodeValue = function(node) {
                return node.nodeValue;
            };
            BrowserDomAdapter.prototype.type = function(node) {
                return node.type;
            };
            BrowserDomAdapter.prototype.content = function(node) {
                if (this.hasProperty(node, "content")) {
                    return node.content;
                } else {
                    return node;
                }
            };
            BrowserDomAdapter.prototype.firstChild = function(el) {
                return el.firstChild;
            };
            BrowserDomAdapter.prototype.nextSibling = function(el) {
                return el.nextSibling;
            };
            BrowserDomAdapter.prototype.parentElement = function(el) {
                return el.parentNode;
            };
            BrowserDomAdapter.prototype.childNodes = function(el) {
                return el.childNodes;
            };
            BrowserDomAdapter.prototype.childNodesAsList = function(el) {
                var childNodes = el.childNodes;
                var res = new Array(childNodes.length);
                for (var i = 0; i < childNodes.length; i++) {
                    res[i] = childNodes[i];
                }
                return res;
            };
            BrowserDomAdapter.prototype.clearNodes = function(el) {
                while (el.firstChild) {
                    el.removeChild(el.firstChild);
                }
            };
            BrowserDomAdapter.prototype.appendChild = function(el, node) {
                el.appendChild(node);
            };
            BrowserDomAdapter.prototype.removeChild = function(el, node) {
                el.removeChild(node);
            };
            BrowserDomAdapter.prototype.replaceChild = function(el, newChild, oldChild) {
                el.replaceChild(newChild, oldChild);
            };
            BrowserDomAdapter.prototype.remove = function(node) {
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
                return node;
            };
            BrowserDomAdapter.prototype.insertBefore = function(parent, ref, node) {
                parent.insertBefore(node, ref);
            };
            BrowserDomAdapter.prototype.insertAllBefore = function(parent, ref, nodes) {
                nodes.forEach(function(n) {
                    return parent.insertBefore(n, ref);
                });
            };
            BrowserDomAdapter.prototype.insertAfter = function(parent, ref, node) {
                parent.insertBefore(node, ref.nextSibling);
            };
            BrowserDomAdapter.prototype.setInnerHTML = function(el, value) {
                el.innerHTML = value;
            };
            BrowserDomAdapter.prototype.getText = function(el) {
                return el.textContent;
            };
            BrowserDomAdapter.prototype.setText = function(el, value) {
                el.textContent = value;
            };
            BrowserDomAdapter.prototype.getValue = function(el) {
                return el.value;
            };
            BrowserDomAdapter.prototype.setValue = function(el, value) {
                el.value = value;
            };
            BrowserDomAdapter.prototype.getChecked = function(el) {
                return el.checked;
            };
            BrowserDomAdapter.prototype.setChecked = function(el, value) {
                el.checked = value;
            };
            BrowserDomAdapter.prototype.createComment = function(text) {
                return document.createComment(text);
            };
            BrowserDomAdapter.prototype.createTemplate = function(html) {
                var t = document.createElement("template");
                t.innerHTML = html;
                return t;
            };
            BrowserDomAdapter.prototype.createElement = function(tagName, doc) {
                if (doc === void 0) {
                    doc = document;
                }
                return doc.createElement(tagName);
            };
            BrowserDomAdapter.prototype.createElementNS = function(ns, tagName, doc) {
                if (doc === void 0) {
                    doc = document;
                }
                return doc.createElementNS(ns, tagName);
            };
            BrowserDomAdapter.prototype.createTextNode = function(text, doc) {
                if (doc === void 0) {
                    doc = document;
                }
                return doc.createTextNode(text);
            };
            BrowserDomAdapter.prototype.createScriptTag = function(attrName, attrValue, doc) {
                if (doc === void 0) {
                    doc = document;
                }
                var el = doc.createElement("SCRIPT");
                el.setAttribute(attrName, attrValue);
                return el;
            };
            BrowserDomAdapter.prototype.createStyleElement = function(css, doc) {
                if (doc === void 0) {
                    doc = document;
                }
                var style = doc.createElement("style");
                this.appendChild(style, this.createTextNode(css));
                return style;
            };
            BrowserDomAdapter.prototype.createShadowRoot = function(el) {
                return el.createShadowRoot();
            };
            BrowserDomAdapter.prototype.getShadowRoot = function(el) {
                return el.shadowRoot;
            };
            BrowserDomAdapter.prototype.getHost = function(el) {
                return el.host;
            };
            BrowserDomAdapter.prototype.clone = function(node) {
                return node.cloneNode(true);
            };
            BrowserDomAdapter.prototype.getElementsByClassName = function(element, name) {
                return element.getElementsByClassName(name);
            };
            BrowserDomAdapter.prototype.getElementsByTagName = function(element, name) {
                return element.getElementsByTagName(name);
            };
            BrowserDomAdapter.prototype.classList = function(element) {
                return Array.prototype.slice.call(element.classList, 0);
            };
            BrowserDomAdapter.prototype.addClass = function(element, className) {
                element.classList.add(className);
            };
            BrowserDomAdapter.prototype.removeClass = function(element, className) {
                element.classList.remove(className);
            };
            BrowserDomAdapter.prototype.hasClass = function(element, className) {
                return element.classList.contains(className);
            };
            BrowserDomAdapter.prototype.setStyle = function(element, styleName, styleValue) {
                element.style[styleName] = styleValue;
            };
            BrowserDomAdapter.prototype.removeStyle = function(element, stylename) {
                element.style[stylename] = "";
            };
            BrowserDomAdapter.prototype.getStyle = function(element, stylename) {
                return element.style[stylename];
            };
            BrowserDomAdapter.prototype.hasStyle = function(element, styleName, styleValue) {
                var value = this.getStyle(element, styleName) || "";
                return styleValue ? value == styleValue : value.length > 0;
            };
            BrowserDomAdapter.prototype.tagName = function(element) {
                return element.tagName;
            };
            BrowserDomAdapter.prototype.attributeMap = function(element) {
                var res = new Map();
                var elAttrs = element.attributes;
                for (var i = 0; i < elAttrs.length; i++) {
                    var attrib = elAttrs[i];
                    res.set(attrib.name, attrib.value);
                }
                return res;
            };
            BrowserDomAdapter.prototype.hasAttribute = function(element, attribute) {
                return element.hasAttribute(attribute);
            };
            BrowserDomAdapter.prototype.hasAttributeNS = function(element, ns, attribute) {
                return element.hasAttributeNS(ns, attribute);
            };
            BrowserDomAdapter.prototype.getAttribute = function(element, attribute) {
                return element.getAttribute(attribute);
            };
            BrowserDomAdapter.prototype.getAttributeNS = function(element, ns, name) {
                return element.getAttributeNS(ns, name);
            };
            BrowserDomAdapter.prototype.setAttribute = function(element, name, value) {
                element.setAttribute(name, value);
            };
            BrowserDomAdapter.prototype.setAttributeNS = function(element, ns, name, value) {
                element.setAttributeNS(ns, name, value);
            };
            BrowserDomAdapter.prototype.removeAttribute = function(element, attribute) {
                element.removeAttribute(attribute);
            };
            BrowserDomAdapter.prototype.removeAttributeNS = function(element, ns, name) {
                element.removeAttributeNS(ns, name);
            };
            BrowserDomAdapter.prototype.templateAwareRoot = function(el) {
                return this.isTemplateElement(el) ? this.content(el) : el;
            };
            BrowserDomAdapter.prototype.createHtmlDocument = function() {
                return document.implementation.createHTMLDocument("fakeTitle");
            };
            BrowserDomAdapter.prototype.getBoundingClientRect = function(el) {
                try {
                    return el.getBoundingClientRect();
                } catch (e) {
                    return {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    };
                }
            };
            BrowserDomAdapter.prototype.getTitle = function(doc) {
                return document.title;
            };
            BrowserDomAdapter.prototype.setTitle = function(doc, newTitle) {
                document.title = newTitle || "";
            };
            BrowserDomAdapter.prototype.elementMatches = function(n, selector) {
                if (n instanceof HTMLElement) {
                    return n.matches && n.matches(selector) || n.msMatchesSelector && n.msMatchesSelector(selector) || n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
                }
                return false;
            };
            BrowserDomAdapter.prototype.isTemplateElement = function(el) {
                return el instanceof HTMLElement && el.nodeName == "TEMPLATE";
            };
            BrowserDomAdapter.prototype.isTextNode = function(node) {
                return node.nodeType === Node.TEXT_NODE;
            };
            BrowserDomAdapter.prototype.isCommentNode = function(node) {
                return node.nodeType === Node.COMMENT_NODE;
            };
            BrowserDomAdapter.prototype.isElementNode = function(node) {
                return node.nodeType === Node.ELEMENT_NODE;
            };
            BrowserDomAdapter.prototype.hasShadowRoot = function(node) {
                return node.shadowRoot != null && node instanceof HTMLElement;
            };
            BrowserDomAdapter.prototype.isShadowRoot = function(node) {
                return node instanceof DocumentFragment;
            };
            BrowserDomAdapter.prototype.importIntoDoc = function(node) {
                return document.importNode(this.templateAwareRoot(node), true);
            };
            BrowserDomAdapter.prototype.adoptNode = function(node) {
                return document.adoptNode(node);
            };
            BrowserDomAdapter.prototype.getHref = function(el) {
                return el.href;
            };
            BrowserDomAdapter.prototype.getEventKey = function(event) {
                var key = event.key;
                if (key == null) {
                    key = event.keyIdentifier;
                    if (key == null) {
                        return "Unidentified";
                    }
                    if (key.startsWith("U+")) {
                        key = String.fromCharCode(parseInt(key.substring(2), 16));
                        if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                            key = _chromeNumKeyPadMap[key];
                        }
                    }
                }
                return _keyMap[key] || key;
            };
            BrowserDomAdapter.prototype.getGlobalEventTarget = function(doc, target) {
                if (target === "window") {
                    return window;
                }
                if (target === "document") {
                    return document;
                }
                if (target === "body") {
                    return document.body;
                }
                return null;
            };
            BrowserDomAdapter.prototype.getHistory = function() {
                return window.history;
            };
            BrowserDomAdapter.prototype.getLocation = function() {
                return window.location;
            };
            BrowserDomAdapter.prototype.getBaseHref = function(doc) {
                var href = getBaseElementHref();
                return href == null ? null : relativePath(href);
            };
            BrowserDomAdapter.prototype.resetBaseElement = function() {
                baseElement = null;
            };
            BrowserDomAdapter.prototype.getUserAgent = function() {
                return window.navigator.userAgent;
            };
            BrowserDomAdapter.prototype.setData = function(element, name, value) {
                this.setAttribute(element, "data-" + name, value);
            };
            BrowserDomAdapter.prototype.getData = function(element, name) {
                return this.getAttribute(element, "data-" + name);
            };
            BrowserDomAdapter.prototype.getComputedStyle = function(element) {
                return getComputedStyle(element);
            };
            BrowserDomAdapter.prototype.supportsWebAnimation = function() {
                return typeof Element.prototype["animate"] === "function";
            };
            BrowserDomAdapter.prototype.performanceNow = function() {
                return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
            };
            BrowserDomAdapter.prototype.supportsCookies = function() {
                return true;
            };
            BrowserDomAdapter.prototype.getCookie = function(name) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_common__["e"])(document.cookie, name);
            };
            BrowserDomAdapter.prototype.setCookie = function(name, value) {
                document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            };
            return BrowserDomAdapter;
        }(GenericBrowserDomAdapter);
        var baseElement = null;
        function getBaseElementHref() {
            if (!baseElement) {
                baseElement = document.querySelector("base");
                if (!baseElement) {
                    return null;
                }
            }
            return baseElement.getAttribute("href");
        }
        var urlParsingNode;
        function relativePath(url) {
            if (!urlParsingNode) {
                urlParsingNode = document.createElement("a");
            }
            urlParsingNode.setAttribute("href", url);
            return urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname;
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var DOCUMENT$1 = __WEBPACK_IMPORTED_MODULE_1__angular_common__["c"];
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * @return {?}
 */
        function supportsState() {
            return !!window.history.pushState;
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var BrowserPlatformLocation = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](BrowserPlatformLocation, _super);
            function BrowserPlatformLocation(_doc) {
                var _this = _super.call(this) || this;
                _this._doc = _doc;
                _this._init();
                return _this;
            }
            BrowserPlatformLocation.prototype._init = function() {
                this._location = getDOM().getLocation();
                this._history = getDOM().getHistory();
            };
            Object.defineProperty(BrowserPlatformLocation.prototype, "location", {
                get: function() {
                    return this._location;
                },
                enumerable: true,
                configurable: true
            });
            BrowserPlatformLocation.prototype.getBaseHrefFromDOM = function() {
                return getDOM().getBaseHref(this._doc);
            };
            BrowserPlatformLocation.prototype.onPopState = function(fn) {
                getDOM().getGlobalEventTarget(this._doc, "window").addEventListener("popstate", fn, false);
            };
            BrowserPlatformLocation.prototype.onHashChange = function(fn) {
                getDOM().getGlobalEventTarget(this._doc, "window").addEventListener("hashchange", fn, false);
            };
            Object.defineProperty(BrowserPlatformLocation.prototype, "pathname", {
                get: function() {
                    return this._location.pathname;
                },
                set: function(newPath) {
                    this._location.pathname = newPath;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BrowserPlatformLocation.prototype, "search", {
                get: function() {
                    return this._location.search;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BrowserPlatformLocation.prototype, "hash", {
                get: function() {
                    return this._location.hash;
                },
                enumerable: true,
                configurable: true
            });
            BrowserPlatformLocation.prototype.pushState = function(state, title, url) {
                if (supportsState()) {
                    this._history.pushState(state, title, url);
                } else {
                    this._location.hash = url;
                }
            };
            BrowserPlatformLocation.prototype.replaceState = function(state, title, url) {
                if (supportsState()) {
                    this._history.replaceState(state, title, url);
                } else {
                    this._location.hash = url;
                }
            };
            BrowserPlatformLocation.prototype.forward = function() {
                this._history.forward();
            };
            BrowserPlatformLocation.prototype.back = function() {
                this._history.back();
            };
            return BrowserPlatformLocation;
        }(__WEBPACK_IMPORTED_MODULE_1__angular_common__["f"]);
        BrowserPlatformLocation.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["D"]
        } ];
        BrowserPlatformLocation.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["H"],
                    args: [ DOCUMENT$1 ]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var Meta = function() {
            function Meta(_doc) {
                this._doc = _doc;
                this._dom = getDOM();
            }
            Meta.prototype.addTag = function(tag, forceCreation) {
                if (forceCreation === void 0) {
                    forceCreation = false;
                }
                if (!tag) return null;
                return this._getOrCreateElement(tag, forceCreation);
            };
            Meta.prototype.addTags = function(tags, forceCreation) {
                var _this = this;
                if (forceCreation === void 0) {
                    forceCreation = false;
                }
                if (!tags) return [];
                return tags.reduce(function(result, tag) {
                    if (tag) {
                        result.push(_this._getOrCreateElement(tag, forceCreation));
                    }
                    return result;
                }, []);
            };
            Meta.prototype.getTag = function(attrSelector) {
                if (!attrSelector) return null;
                return this._dom.querySelector(this._doc, "meta[" + attrSelector + "]");
            };
            Meta.prototype.getTags = function(attrSelector) {
                if (!attrSelector) return [];
                var list = this._dom.querySelectorAll(this._doc, "meta[" + attrSelector + "]");
                return list ? [].slice.call(list) : [];
            };
            Meta.prototype.updateTag = function(tag, selector) {
                if (!tag) return null;
                selector = selector || this._parseSelector(tag);
                var meta = this.getTag(selector);
                if (meta) {
                    return this._setMetaElementAttributes(tag, meta);
                }
                return this._getOrCreateElement(tag, true);
            };
            Meta.prototype.removeTag = function(attrSelector) {
                this.removeTagElement(this.getTag(attrSelector));
            };
            Meta.prototype.removeTagElement = function(meta) {
                if (meta) {
                    this._dom.remove(meta);
                }
            };
            Meta.prototype._getOrCreateElement = function(meta, forceCreation) {
                if (forceCreation === void 0) {
                    forceCreation = false;
                }
                if (!forceCreation) {
                    var selector = this._parseSelector(meta);
                    var elem = this.getTag(selector);
                    if (elem && this._containsAttributes(meta, elem)) return elem;
                }
                var element = this._dom.createElement("meta");
                this._setMetaElementAttributes(meta, element);
                var head = this._dom.getElementsByTagName(this._doc, "head")[0];
                this._dom.appendChild(head, element);
                return element;
            };
            Meta.prototype._setMetaElementAttributes = function(tag, el) {
                var _this = this;
                Object.keys(tag).forEach(function(prop) {
                    return _this._dom.setAttribute(el, prop, tag[prop]);
                });
                return el;
            };
            Meta.prototype._parseSelector = function(tag) {
                var attr = tag.name ? "name" : "property";
                return attr + '="' + tag[attr] + '"';
            };
            Meta.prototype._containsAttributes = function(tag, elem) {
                var _this = this;
                return Object.keys(tag).every(function(key) {
                    return _this._dom.getAttribute(elem, key) === tag[key];
                });
            };
            return Meta;
        }();
        Meta.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["D"]
        } ];
        Meta.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["H"],
                    args: [ DOCUMENT$1 ]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var TRANSITION_ID = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["I"]("TRANSITION_ID");
        function appInitializerFactory(transitionId, document, injector) {
            return function() {
                injector.get(__WEBPACK_IMPORTED_MODULE_2__angular_core__["x"]).donePromise.then(function() {
                    var dom = getDOM();
                    var styles = Array.prototype.slice.apply(dom.querySelectorAll(document, "style[ng-transition]"));
                    styles.filter(function(el) {
                        return dom.getAttribute(el, "ng-transition") === transitionId;
                    }).forEach(function(el) {
                        return dom.remove(el);
                    });
                });
            };
        }
        var SERVER_TRANSITION_PROVIDERS = [ {
            provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v"],
            useFactory: appInitializerFactory,
            deps: [ TRANSITION_ID, DOCUMENT$1, __WEBPACK_IMPORTED_MODULE_2__angular_core__["A"] ],
            multi: true
        } ];
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var BrowserGetTestability = function() {
            function BrowserGetTestability() {}
            BrowserGetTestability.init = function() {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["J"])(new BrowserGetTestability());
            };
            BrowserGetTestability.prototype.addToWindow = function(registry) {
                __WEBPACK_IMPORTED_MODULE_2__angular_core__["G"]["getAngularTestability"] = function(elem, findInAncestors) {
                    if (findInAncestors === void 0) {
                        findInAncestors = true;
                    }
                    var testability = registry.findTestabilityInTree(elem, findInAncestors);
                    if (testability == null) {
                        throw new Error("Could not find testability for element.");
                    }
                    return testability;
                };
                __WEBPACK_IMPORTED_MODULE_2__angular_core__["G"]["getAllAngularTestabilities"] = function() {
                    return registry.getAllTestabilities();
                };
                __WEBPACK_IMPORTED_MODULE_2__angular_core__["G"]["getAllAngularRootElements"] = function() {
                    return registry.getAllRootElements();
                };
                var whenAllStable = function(callback) {
                    var testabilities = __WEBPACK_IMPORTED_MODULE_2__angular_core__["G"]["getAllAngularTestabilities"]();
                    var count = testabilities.length;
                    var didWork = false;
                    var decrement = function(didWork_) {
                        didWork = didWork || didWork_;
                        count--;
                        if (count == 0) {
                            callback(didWork);
                        }
                    };
                    testabilities.forEach(function(testability) {
                        testability.whenStable(decrement);
                    });
                };
                if (!__WEBPACK_IMPORTED_MODULE_2__angular_core__["G"]["frameworkStabilizers"]) {
                    __WEBPACK_IMPORTED_MODULE_2__angular_core__["G"]["frameworkStabilizers"] = [];
                }
                __WEBPACK_IMPORTED_MODULE_2__angular_core__["G"]["frameworkStabilizers"].push(whenAllStable);
            };
            BrowserGetTestability.prototype.findTestabilityInTree = function(registry, elem, findInAncestors) {
                if (elem == null) {
                    return null;
                }
                var t = registry.getTestability(elem);
                if (t != null) {
                    return t;
                } else if (!findInAncestors) {
                    return null;
                }
                if (getDOM().isShadowRoot(elem)) {
                    return this.findTestabilityInTree(registry, getDOM().getHost(elem), true);
                }
                return this.findTestabilityInTree(registry, getDOM().parentElement(elem), true);
            };
            return BrowserGetTestability;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var Title = function() {
            function Title(_doc) {
                this._doc = _doc;
            }
            Title.prototype.getTitle = function() {
                return getDOM().getTitle(this._doc);
            };
            Title.prototype.setTitle = function(newTitle) {
                getDOM().setTitle(this._doc, newTitle);
            };
            return Title;
        }();
        Title.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["D"]
        } ];
        Title.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["H"],
                    args: [ DOCUMENT$1 ]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        function exportNgVar(name, value) {
            if (!ng) {
                __WEBPACK_IMPORTED_MODULE_2__angular_core__["G"]["ng"] = ng = __WEBPACK_IMPORTED_MODULE_2__angular_core__["G"]["ng"] || {};
            }
            ng[name] = value;
        }
        var ng;
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var CORE_TOKENS = {
            ApplicationRef: __WEBPACK_IMPORTED_MODULE_2__angular_core__["B"],
            NgZone: __WEBPACK_IMPORTED_MODULE_2__angular_core__["r"]
        };
        var INSPECT_GLOBAL_NAME = "probe";
        var CORE_TOKENS_GLOBAL_NAME = "coreTokens";
        function inspectNativeElement(element) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["K"])(element);
        }
        var NgProbeToken$1 = function() {
            function NgProbeToken$1(name, token) {
                this.name = name;
                this.token = token;
            }
            return NgProbeToken$1;
        }();
        function _createNgProbe(extraTokens, coreTokens) {
            var tokens = (extraTokens || []).concat(coreTokens || []);
            exportNgVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
            exportNgVar(CORE_TOKENS_GLOBAL_NAME, Object.assign({}, CORE_TOKENS, _ngProbeTokensToMap(tokens || [])));
            return function() {
                return inspectNativeElement;
            };
        }
        function _ngProbeTokensToMap(tokens) {
            return tokens.reduce(function(prev, t) {
                return prev[t.name] = t.token, prev;
            }, {});
        }
        var ELEMENT_PROBE_PROVIDERS = [ {
            provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v"],
            useFactory: _createNgProbe,
            deps: [ [ NgProbeToken$1, new __WEBPACK_IMPORTED_MODULE_2__angular_core__["L"]() ], [ __WEBPACK_IMPORTED_MODULE_2__angular_core__["w"], new __WEBPACK_IMPORTED_MODULE_2__angular_core__["L"]() ] ],
            multi: true
        } ];
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var EVENT_MANAGER_PLUGINS = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["I"]("EventManagerPlugins");
        var EventManager = function() {
            function EventManager(plugins, _zone) {
                var _this = this;
                this._zone = _zone;
                this._eventNameToPlugin = new Map();
                plugins.forEach(function(p) {
                    return p.manager = _this;
                });
                this._plugins = plugins.slice().reverse();
            }
            EventManager.prototype.addEventListener = function(element, eventName, handler) {
                var plugin = this._findPluginFor(eventName);
                return plugin.addEventListener(element, eventName, handler);
            };
            EventManager.prototype.addGlobalEventListener = function(target, eventName, handler) {
                var plugin = this._findPluginFor(eventName);
                return plugin.addGlobalEventListener(target, eventName, handler);
            };
            EventManager.prototype.getZone = function() {
                return this._zone;
            };
            EventManager.prototype._findPluginFor = function(eventName) {
                var plugin = this._eventNameToPlugin.get(eventName);
                if (plugin) {
                    return plugin;
                }
                var plugins = this._plugins;
                for (var i = 0; i < plugins.length; i++) {
                    var plugin_1 = plugins[i];
                    if (plugin_1.supports(eventName)) {
                        this._eventNameToPlugin.set(eventName, plugin_1);
                        return plugin_1;
                    }
                }
                throw new Error("No event manager plugin found for event " + eventName);
            };
            return EventManager;
        }();
        EventManager.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["D"]
        } ];
        EventManager.ctorParameters = function() {
            return [ {
                type: Array,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["H"],
                    args: [ EVENT_MANAGER_PLUGINS ]
                } ]
            }, {
                type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["r"]
            } ];
        };
        var EventManagerPlugin = function() {
            function EventManagerPlugin(_doc) {
                this._doc = _doc;
            }
            EventManagerPlugin.prototype.supports = function(eventName) {};
            EventManagerPlugin.prototype.addEventListener = function(element, eventName, handler) {};
            EventManagerPlugin.prototype.addGlobalEventListener = function(element, eventName, handler) {
                var target = getDOM().getGlobalEventTarget(this._doc, element);
                if (!target) {
                    throw new Error("Unsupported event target " + target + " for event " + eventName);
                }
                return this.addEventListener(target, eventName, handler);
            };
            return EventManagerPlugin;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var SharedStylesHost = function() {
            function SharedStylesHost() {
                this._stylesSet = new Set();
            }
            SharedStylesHost.prototype.addStyles = function(styles) {
                var _this = this;
                var additions = new Set();
                styles.forEach(function(style) {
                    if (!_this._stylesSet.has(style)) {
                        _this._stylesSet.add(style);
                        additions.add(style);
                    }
                });
                this.onStylesAdded(additions);
            };
            SharedStylesHost.prototype.onStylesAdded = function(additions) {};
            SharedStylesHost.prototype.getAllStyles = function() {
                return Array.from(this._stylesSet);
            };
            return SharedStylesHost;
        }();
        SharedStylesHost.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["D"]
        } ];
        SharedStylesHost.ctorParameters = function() {
            return [];
        };
        var DomSharedStylesHost = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](DomSharedStylesHost, _super);
            function DomSharedStylesHost(_doc) {
                var _this = _super.call(this) || this;
                _this._doc = _doc;
                _this._hostNodes = new Set();
                _this._styleNodes = new Set();
                _this._hostNodes.add(_doc.head);
                return _this;
            }
            DomSharedStylesHost.prototype._addStylesToHost = function(styles, host) {
                var _this = this;
                styles.forEach(function(style) {
                    var styleEl = _this._doc.createElement("style");
                    styleEl.textContent = style;
                    _this._styleNodes.add(host.appendChild(styleEl));
                });
            };
            DomSharedStylesHost.prototype.addHost = function(hostNode) {
                this._addStylesToHost(this._stylesSet, hostNode);
                this._hostNodes.add(hostNode);
            };
            DomSharedStylesHost.prototype.removeHost = function(hostNode) {
                this._hostNodes.delete(hostNode);
            };
            DomSharedStylesHost.prototype.onStylesAdded = function(additions) {
                var _this = this;
                this._hostNodes.forEach(function(hostNode) {
                    return _this._addStylesToHost(additions, hostNode);
                });
            };
            DomSharedStylesHost.prototype.ngOnDestroy = function() {
                this._styleNodes.forEach(function(styleNode) {
                    return getDOM().remove(styleNode);
                });
            };
            return DomSharedStylesHost;
        }(SharedStylesHost);
        DomSharedStylesHost.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["D"]
        } ];
        DomSharedStylesHost.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["H"],
                    args: [ DOCUMENT$1 ]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var NAMESPACE_URIS = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        };
        var COMPONENT_REGEX = /%COMP%/g;
        var COMPONENT_VARIABLE = "%COMP%";
        var HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
        var CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
        function shimContentAttribute(componentShortId) {
            return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
        }
        function shimHostAttribute(componentShortId) {
            return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
        }
        function flattenStyles(compId, styles, target) {
            for (var i = 0; i < styles.length; i++) {
                var style = styles[i];
                if (Array.isArray(style)) {
                    flattenStyles(compId, style, target);
                } else {
                    style = style.replace(COMPONENT_REGEX, compId);
                    target.push(style);
                }
            }
            return target;
        }
        function decoratePreventDefault(eventHandler) {
            return function(event) {
                var allowDefaultBehavior = eventHandler(event);
                if (allowDefaultBehavior === false) {
                    event.preventDefault();
                    event.returnValue = false;
                }
            };
        }
        var DomRendererFactory2 = function() {
            function DomRendererFactory2(eventManager, sharedStylesHost) {
                this.eventManager = eventManager;
                this.sharedStylesHost = sharedStylesHost;
                this.rendererByCompId = new Map();
                this.defaultRenderer = new DefaultDomRenderer2(eventManager);
            }
            DomRendererFactory2.prototype.createRenderer = function(element, type) {
                if (!element || !type) {
                    return this.defaultRenderer;
                }
                switch (type.encapsulation) {
                  case __WEBPACK_IMPORTED_MODULE_2__angular_core__["M"].Emulated:
                    {
                        var renderer = this.rendererByCompId.get(type.id);
                        if (!renderer) {
                            renderer = new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type);
                            this.rendererByCompId.set(type.id, renderer);
                        }
                        renderer.applyToHost(element);
                        return renderer;
                    }

                  case __WEBPACK_IMPORTED_MODULE_2__angular_core__["M"].Native:
                    return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);

                  default:
                    {
                        if (!this.rendererByCompId.has(type.id)) {
                            var styles = flattenStyles(type.id, type.styles, []);
                            this.sharedStylesHost.addStyles(styles);
                            this.rendererByCompId.set(type.id, this.defaultRenderer);
                        }
                        return this.defaultRenderer;
                    }
                }
            };
            DomRendererFactory2.prototype.begin = function() {};
            DomRendererFactory2.prototype.end = function() {};
            return DomRendererFactory2;
        }();
        DomRendererFactory2.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["D"]
        } ];
        DomRendererFactory2.ctorParameters = function() {
            return [ {
                type: EventManager
            }, {
                type: DomSharedStylesHost
            } ];
        };
        var DefaultDomRenderer2 = function() {
            function DefaultDomRenderer2(eventManager) {
                this.eventManager = eventManager;
                this.data = Object.create(null);
            }
            DefaultDomRenderer2.prototype.destroy = function() {};
            DefaultDomRenderer2.prototype.createElement = function(name, namespace) {
                if (namespace) {
                    return document.createElementNS(NAMESPACE_URIS[namespace], name);
                }
                return document.createElement(name);
            };
            DefaultDomRenderer2.prototype.createComment = function(value) {
                return document.createComment(value);
            };
            DefaultDomRenderer2.prototype.createText = function(value) {
                return document.createTextNode(value);
            };
            DefaultDomRenderer2.prototype.appendChild = function(parent, newChild) {
                parent.appendChild(newChild);
            };
            DefaultDomRenderer2.prototype.insertBefore = function(parent, newChild, refChild) {
                if (parent) {
                    parent.insertBefore(newChild, refChild);
                }
            };
            DefaultDomRenderer2.prototype.removeChild = function(parent, oldChild) {
                if (parent) {
                    parent.removeChild(oldChild);
                }
            };
            DefaultDomRenderer2.prototype.selectRootElement = function(selectorOrNode) {
                var el = typeof selectorOrNode === "string" ? document.querySelector(selectorOrNode) : selectorOrNode;
                if (!el) {
                    throw new Error('The selector "' + selectorOrNode + '" did not match any elements');
                }
                el.textContent = "";
                return el;
            };
            DefaultDomRenderer2.prototype.parentNode = function(node) {
                return node.parentNode;
            };
            DefaultDomRenderer2.prototype.nextSibling = function(node) {
                return node.nextSibling;
            };
            DefaultDomRenderer2.prototype.setAttribute = function(el, name, value, namespace) {
                if (namespace) {
                    name = namespace + ":" + name;
                    var namespaceUri = NAMESPACE_URIS[namespace];
                    if (namespaceUri) {
                        el.setAttributeNS(namespaceUri, name, value);
                    } else {
                        el.setAttribute(name, value);
                    }
                } else {
                    el.setAttribute(name, value);
                }
            };
            DefaultDomRenderer2.prototype.removeAttribute = function(el, name, namespace) {
                if (namespace) {
                    var namespaceUri = NAMESPACE_URIS[namespace];
                    if (namespaceUri) {
                        el.removeAttributeNS(namespaceUri, name);
                    } else {
                        el.removeAttribute(namespace + ":" + name);
                    }
                } else {
                    el.removeAttribute(name);
                }
            };
            DefaultDomRenderer2.prototype.addClass = function(el, name) {
                el.classList.add(name);
            };
            DefaultDomRenderer2.prototype.removeClass = function(el, name) {
                el.classList.remove(name);
            };
            DefaultDomRenderer2.prototype.setStyle = function(el, style, value, flags) {
                if (flags & __WEBPACK_IMPORTED_MODULE_2__angular_core__["N"].DashCase) {
                    el.style.setProperty(style, value, !!(flags & __WEBPACK_IMPORTED_MODULE_2__angular_core__["N"].Important) ? "important" : "");
                } else {
                    el.style[style] = value;
                }
            };
            DefaultDomRenderer2.prototype.removeStyle = function(el, style, flags) {
                if (flags & __WEBPACK_IMPORTED_MODULE_2__angular_core__["N"].DashCase) {
                    el.style.removeProperty(style);
                } else {
                    el.style[style] = "";
                }
            };
            DefaultDomRenderer2.prototype.setProperty = function(el, name, value) {
                checkNoSyntheticProp(name, "property");
                el[name] = value;
            };
            DefaultDomRenderer2.prototype.setValue = function(node, value) {
                node.nodeValue = value;
            };
            DefaultDomRenderer2.prototype.listen = function(target, event, callback) {
                checkNoSyntheticProp(event, "listener");
                if (typeof target === "string") {
                    return this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback));
                }
                return this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
            };
            return DefaultDomRenderer2;
        }();
        var AT_CHARCODE = "@".charCodeAt(0);
        function checkNoSyntheticProp(name, nameKind) {
            if (name.charCodeAt(0) === AT_CHARCODE) {
                throw new Error("Found the synthetic " + nameKind + " " + name + '. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.');
            }
        }
        var EmulatedEncapsulationDomRenderer2 = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](EmulatedEncapsulationDomRenderer2, _super);
            function EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, component) {
                var _this = _super.call(this, eventManager) || this;
                _this.component = component;
                var styles = flattenStyles(component.id, component.styles, []);
                sharedStylesHost.addStyles(styles);
                _this.contentAttr = shimContentAttribute(component.id);
                _this.hostAttr = shimHostAttribute(component.id);
                return _this;
            }
            EmulatedEncapsulationDomRenderer2.prototype.applyToHost = function(element) {
                _super.prototype.setAttribute.call(this, element, this.hostAttr, "");
            };
            EmulatedEncapsulationDomRenderer2.prototype.createElement = function(parent, name) {
                var el = _super.prototype.createElement.call(this, parent, name);
                _super.prototype.setAttribute.call(this, el, this.contentAttr, "");
                return el;
            };
            return EmulatedEncapsulationDomRenderer2;
        }(DefaultDomRenderer2);
        var ShadowDomRenderer = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](ShadowDomRenderer, _super);
            function ShadowDomRenderer(eventManager, sharedStylesHost, hostEl, component) {
                var _this = _super.call(this, eventManager) || this;
                _this.sharedStylesHost = sharedStylesHost;
                _this.hostEl = hostEl;
                _this.component = component;
                _this.shadowRoot = hostEl.createShadowRoot();
                _this.sharedStylesHost.addHost(_this.shadowRoot);
                var styles = flattenStyles(component.id, component.styles, []);
                for (var i = 0; i < styles.length; i++) {
                    var styleEl = document.createElement("style");
                    styleEl.textContent = styles[i];
                    _this.shadowRoot.appendChild(styleEl);
                }
                return _this;
            }
            ShadowDomRenderer.prototype.nodeOrShadowRoot = function(node) {
                return node === this.hostEl ? this.shadowRoot : node;
            };
            ShadowDomRenderer.prototype.destroy = function() {
                this.sharedStylesHost.removeHost(this.shadowRoot);
            };
            ShadowDomRenderer.prototype.appendChild = function(parent, newChild) {
                return _super.prototype.appendChild.call(this, this.nodeOrShadowRoot(parent), newChild);
            };
            ShadowDomRenderer.prototype.insertBefore = function(parent, newChild, refChild) {
                return _super.prototype.insertBefore.call(this, this.nodeOrShadowRoot(parent), newChild, refChild);
            };
            ShadowDomRenderer.prototype.removeChild = function(parent, oldChild) {
                return _super.prototype.removeChild.call(this, this.nodeOrShadowRoot(parent), oldChild);
            };
            ShadowDomRenderer.prototype.parentNode = function(node) {
                return this.nodeOrShadowRoot(_super.prototype.parentNode.call(this, this.nodeOrShadowRoot(node)));
            };
            return ShadowDomRenderer;
        }(DefaultDomRenderer2);
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var DomEventsPlugin = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](DomEventsPlugin, _super);
            function DomEventsPlugin(doc) {
                return _super.call(this, doc) || this;
            }
            DomEventsPlugin.prototype.supports = function(eventName) {
                return true;
            };
            DomEventsPlugin.prototype.addEventListener = function(element, eventName, handler) {
                element.addEventListener(eventName, handler, false);
                return function() {
                    return element.removeEventListener(eventName, handler, false);
                };
            };
            return DomEventsPlugin;
        }(EventManagerPlugin);
        DomEventsPlugin.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["D"]
        } ];
        DomEventsPlugin.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["H"],
                    args: [ DOCUMENT$1 ]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var EVENT_NAMES = {
            pan: true,
            panstart: true,
            panmove: true,
            panend: true,
            pancancel: true,
            panleft: true,
            panright: true,
            panup: true,
            pandown: true,
            pinch: true,
            pinchstart: true,
            pinchmove: true,
            pinchend: true,
            pinchcancel: true,
            pinchin: true,
            pinchout: true,
            press: true,
            pressup: true,
            rotate: true,
            rotatestart: true,
            rotatemove: true,
            rotateend: true,
            rotatecancel: true,
            swipe: true,
            swipeleft: true,
            swiperight: true,
            swipeup: true,
            swipedown: true,
            tap: true
        };
        var HAMMER_GESTURE_CONFIG = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["I"]("HammerGestureConfig");
        var HammerGestureConfig = function() {
            function HammerGestureConfig() {
                this.events = [];
                this.overrides = {};
            }
            HammerGestureConfig.prototype.buildHammer = function(element) {
                var mc = new Hammer(element);
                mc.get("pinch").set({
                    enable: true
                });
                mc.get("rotate").set({
                    enable: true
                });
                for (var eventName in this.overrides) {
                    mc.get(eventName).set(this.overrides[eventName]);
                }
                return mc;
            };
            return HammerGestureConfig;
        }();
        HammerGestureConfig.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["D"]
        } ];
        HammerGestureConfig.ctorParameters = function() {
            return [];
        };
        var HammerGesturesPlugin = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](HammerGesturesPlugin, _super);
            function HammerGesturesPlugin(doc, _config) {
                var _this = _super.call(this, doc) || this;
                _this._config = _config;
                return _this;
            }
            HammerGesturesPlugin.prototype.supports = function(eventName) {
                if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
                    return false;
                }
                if (!window.Hammer) {
                    throw new Error("Hammer.js is not loaded, can not bind " + eventName + " event");
                }
                return true;
            };
            HammerGesturesPlugin.prototype.addEventListener = function(element, eventName, handler) {
                var _this = this;
                var zone = this.manager.getZone();
                eventName = eventName.toLowerCase();
                return zone.runOutsideAngular(function() {
                    var mc = _this._config.buildHammer(element);
                    var callback = function(eventObj) {
                        zone.runGuarded(function() {
                            handler(eventObj);
                        });
                    };
                    mc.on(eventName, callback);
                    return function() {
                        return mc.off(eventName, callback);
                    };
                });
            };
            HammerGesturesPlugin.prototype.isCustomEvent = function(eventName) {
                return this._config.events.indexOf(eventName) > -1;
            };
            return HammerGesturesPlugin;
        }(EventManagerPlugin);
        HammerGesturesPlugin.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["D"]
        } ];
        HammerGesturesPlugin.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["H"],
                    args: [ DOCUMENT$1 ]
                } ]
            }, {
                type: HammerGestureConfig,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["H"],
                    args: [ HAMMER_GESTURE_CONFIG ]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var MODIFIER_KEYS = [ "alt", "control", "meta", "shift" ];
        var MODIFIER_KEY_GETTERS = {
            alt: function(event) {
                return event.altKey;
            },
            control: function(event) {
                return event.ctrlKey;
            },
            meta: function(event) {
                return event.metaKey;
            },
            shift: function(event) {
                return event.shiftKey;
            }
        };
        var KeyEventsPlugin = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](KeyEventsPlugin, _super);
            function KeyEventsPlugin(doc) {
                return _super.call(this, doc) || this;
            }
            KeyEventsPlugin.prototype.supports = function(eventName) {
                return KeyEventsPlugin.parseEventName(eventName) != null;
            };
            KeyEventsPlugin.prototype.addEventListener = function(element, eventName, handler) {
                var parsedEvent = KeyEventsPlugin.parseEventName(eventName);
                var outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent["fullKey"], handler, this.manager.getZone());
                return this.manager.getZone().runOutsideAngular(function() {
                    return getDOM().onAndCancel(element, parsedEvent["domEventName"], outsideHandler);
                });
            };
            KeyEventsPlugin.parseEventName = function(eventName) {
                var parts = eventName.toLowerCase().split(".");
                var domEventName = parts.shift();
                if (parts.length === 0 || !(domEventName === "keydown" || domEventName === "keyup")) {
                    return null;
                }
                var key = KeyEventsPlugin._normalizeKey(parts.pop());
                var fullKey = "";
                MODIFIER_KEYS.forEach(function(modifierName) {
                    var index = parts.indexOf(modifierName);
                    if (index > -1) {
                        parts.splice(index, 1);
                        fullKey += modifierName + ".";
                    }
                });
                fullKey += key;
                if (parts.length != 0 || key.length === 0) {
                    return null;
                }
                var result = {};
                result["domEventName"] = domEventName;
                result["fullKey"] = fullKey;
                return result;
            };
            KeyEventsPlugin.getEventFullKey = function(event) {
                var fullKey = "";
                var key = getDOM().getEventKey(event);
                key = key.toLowerCase();
                if (key === " ") {
                    key = "space";
                } else if (key === ".") {
                    key = "dot";
                }
                MODIFIER_KEYS.forEach(function(modifierName) {
                    if (modifierName != key) {
                        var modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
                        if (modifierGetter(event)) {
                            fullKey += modifierName + ".";
                        }
                    }
                });
                fullKey += key;
                return fullKey;
            };
            KeyEventsPlugin.eventCallback = function(fullKey, handler, zone) {
                return function(event) {
                    if (KeyEventsPlugin.getEventFullKey(event) === fullKey) {
                        zone.runGuarded(function() {
                            return handler(event);
                        });
                    }
                };
            };
            KeyEventsPlugin._normalizeKey = function(keyName) {
                switch (keyName) {
                  case "esc":
                    return "escape";

                  default:
                    return keyName;
                }
            };
            return KeyEventsPlugin;
        }(EventManagerPlugin);
        KeyEventsPlugin.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["D"]
        } ];
        KeyEventsPlugin.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["H"],
                    args: [ DOCUMENT$1 ]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var InertBodyHelper = function() {
            function InertBodyHelper(defaultDoc, DOM) {
                this.defaultDoc = defaultDoc;
                this.DOM = DOM;
                var inertDocument = this.DOM.createHtmlDocument();
                this.inertBodyElement = inertDocument.body;
                if (this.inertBodyElement == null) {
                    var inertHtml = this.DOM.createElement("html", inertDocument);
                    this.inertBodyElement = this.DOM.createElement("body", inertDocument);
                    this.DOM.appendChild(inertHtml, this.inertBodyElement);
                    this.DOM.appendChild(inertDocument, inertHtml);
                }
                this.DOM.setInnerHTML(this.inertBodyElement, '<svg><g onload="this.parentNode.remove()"></g></svg>');
                if (this.inertBodyElement.querySelector && !this.inertBodyElement.querySelector("svg")) {
                    this.getInertBodyElement = this.getInertBodyElement_XHR;
                    return;
                }
                this.DOM.setInnerHTML(this.inertBodyElement, '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">');
                if (this.inertBodyElement.querySelector && this.inertBodyElement.querySelector("svg img")) {
                    if (isDOMParserAvailable()) {
                        this.getInertBodyElement = this.getInertBodyElement_DOMParser;
                        return;
                    }
                }
                this.getInertBodyElement = this.getInertBodyElement_InertDocument;
            }
            InertBodyHelper.prototype.getInertBodyElement_XHR = function(html) {
                html = "<body><remove></remove>" + html + "</body>";
                try {
                    html = encodeURI(html);
                } catch (e) {
                    return null;
                }
                var xhr = new XMLHttpRequest();
                xhr.responseType = "document";
                xhr.open("GET", "data:text/html;charset=utf-8," + html, false);
                xhr.send(null);
                var body = xhr.response.body;
                body.removeChild(body.firstChild);
                return body;
            };
            InertBodyHelper.prototype.getInertBodyElement_DOMParser = function(html) {
                html = "<body><remove></remove>" + html + "</body>";
                try {
                    var body = new window.DOMParser().parseFromString(html, "text/html").body;
                    body.removeChild(body.firstChild);
                    return body;
                } catch (e) {
                    return null;
                }
            };
            InertBodyHelper.prototype.getInertBodyElement_InertDocument = function(html) {
                var templateEl = this.DOM.createElement("template");
                if ("content" in templateEl) {
                    this.DOM.setInnerHTML(templateEl, html);
                    return templateEl;
                }
                this.DOM.setInnerHTML(this.inertBodyElement, html);
                if (this.defaultDoc.documentMode) {
                    this.stripCustomNsAttrs(this.inertBodyElement);
                }
                return this.inertBodyElement;
            };
            InertBodyHelper.prototype.stripCustomNsAttrs = function(el) {
                var _this = this;
                this.DOM.attributeMap(el).forEach(function(_, attrName) {
                    if (attrName === "xmlns:ns1" || attrName.indexOf("ns1:") === 0) {
                        _this.DOM.removeAttribute(el, attrName);
                    }
                });
                for (var _i = 0, _a = this.DOM.childNodesAsList(el); _i < _a.length; _i++) {
                    var n = _a[_i];
                    if (this.DOM.isElementNode(n)) this.stripCustomNsAttrs(n);
                }
            };
            return InertBodyHelper;
        }();
        function isDOMParserAvailable() {
            try {
                return !!window.DOMParser;
            } catch (e) {
                return false;
            }
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi;
        var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
        function sanitizeUrl(url) {
            url = String(url);
            if (url.match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN)) return url;
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["O"])()) {
                getDOM().log("WARNING: sanitizing unsafe URL value " + url + " (see http://g.co/ng/security#xss)");
            }
            return "unsafe:" + url;
        }
        function sanitizeSrcset(srcset) {
            srcset = String(srcset);
            return srcset.split(",").map(function(srcset) {
                return sanitizeUrl(srcset.trim());
            }).join(", ");
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        function tagSet(tags) {
            var res = {};
            for (var _i = 0, _a = tags.split(","); _i < _a.length; _i++) {
                var t = _a[_i];
                res[t] = true;
            }
            return res;
        }
        function merge() {
            var sets = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                sets[_i] = arguments[_i];
            }
            var res = {};
            for (var _a = 0, sets_1 = sets; _a < sets_1.length; _a++) {
                var s = sets_1[_a];
                for (var v in s) {
                    if (s.hasOwnProperty(v)) res[v] = true;
                }
            }
            return res;
        }
        var VOID_ELEMENTS = tagSet("area,br,col,hr,img,wbr");
        var OPTIONAL_END_TAG_BLOCK_ELEMENTS = tagSet("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr");
        var OPTIONAL_END_TAG_INLINE_ELEMENTS = tagSet("rp,rt");
        var OPTIONAL_END_TAG_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, OPTIONAL_END_TAG_BLOCK_ELEMENTS);
        var BLOCK_ELEMENTS = merge(OPTIONAL_END_TAG_BLOCK_ELEMENTS, tagSet("address,article," + "aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5," + "h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"));
        var INLINE_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, tagSet("a,abbr,acronym,audio,b," + "bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s," + "samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"));
        var VALID_ELEMENTS = merge(VOID_ELEMENTS, BLOCK_ELEMENTS, INLINE_ELEMENTS, OPTIONAL_END_TAG_ELEMENTS);
        var URI_ATTRS = tagSet("background,cite,href,itemtype,longdesc,poster,src,xlink:href");
        var SRCSET_ATTRS = tagSet("srcset");
        var HTML_ATTRS = tagSet("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan," + "compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace," + "ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules," + "scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap," + "valign,value,vspace,width");
        var VALID_ATTRS = merge(URI_ATTRS, SRCSET_ATTRS, HTML_ATTRS);
        var SanitizingHtmlSerializer = function() {
            function SanitizingHtmlSerializer() {
                this.sanitizedSomething = false;
                this.buf = [];
                this.DOM = getDOM();
            }
            SanitizingHtmlSerializer.prototype.sanitizeChildren = function(el) {
                var current = this.DOM.firstChild(el);
                while (current) {
                    if (this.DOM.isElementNode(current)) {
                        this.startElement(current);
                    } else if (this.DOM.isTextNode(current)) {
                        this.chars(this.DOM.nodeValue(current));
                    } else {
                        this.sanitizedSomething = true;
                    }
                    if (this.DOM.firstChild(current)) {
                        current = this.DOM.firstChild(current);
                        continue;
                    }
                    while (current) {
                        if (this.DOM.isElementNode(current)) {
                            this.endElement(current);
                        }
                        var next = this.checkClobberedElement(current, this.DOM.nextSibling(current));
                        if (next) {
                            current = next;
                            break;
                        }
                        current = this.checkClobberedElement(current, this.DOM.parentElement(current));
                    }
                }
                return this.buf.join("");
            };
            SanitizingHtmlSerializer.prototype.startElement = function(element) {
                var _this = this;
                var tagName = this.DOM.nodeName(element).toLowerCase();
                if (!VALID_ELEMENTS.hasOwnProperty(tagName)) {
                    this.sanitizedSomething = true;
                    return;
                }
                this.buf.push("<");
                this.buf.push(tagName);
                this.DOM.attributeMap(element).forEach(function(value, attrName) {
                    var lower = attrName.toLowerCase();
                    if (!VALID_ATTRS.hasOwnProperty(lower)) {
                        _this.sanitizedSomething = true;
                        return;
                    }
                    if (URI_ATTRS[lower]) value = sanitizeUrl(value);
                    if (SRCSET_ATTRS[lower]) value = sanitizeSrcset(value);
                    _this.buf.push(" ");
                    _this.buf.push(attrName);
                    _this.buf.push('="');
                    _this.buf.push(encodeEntities(value));
                    _this.buf.push('"');
                });
                this.buf.push(">");
            };
            SanitizingHtmlSerializer.prototype.endElement = function(current) {
                var tagName = this.DOM.nodeName(current).toLowerCase();
                if (VALID_ELEMENTS.hasOwnProperty(tagName) && !VOID_ELEMENTS.hasOwnProperty(tagName)) {
                    this.buf.push("</");
                    this.buf.push(tagName);
                    this.buf.push(">");
                }
            };
            SanitizingHtmlSerializer.prototype.chars = function(chars) {
                this.buf.push(encodeEntities(chars));
            };
            SanitizingHtmlSerializer.prototype.checkClobberedElement = function(node, nextNode) {
                if (nextNode && this.DOM.contains(node, nextNode)) {
                    throw new Error("Failed to sanitize html because the element is clobbered: " + this.DOM.getOuterHTML(node));
                }
                return nextNode;
            };
            return SanitizingHtmlSerializer;
        }();
        var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
        var NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;
        function encodeEntities(value) {
            return value.replace(/&/g, "&amp;").replace(SURROGATE_PAIR_REGEXP, function(match) {
                var hi = match.charCodeAt(0);
                var low = match.charCodeAt(1);
                return "&#" + ((hi - 55296) * 1024 + (low - 56320) + 65536) + ";";
            }).replace(NON_ALPHANUMERIC_REGEXP, function(match) {
                return "&#" + match.charCodeAt(0) + ";";
            }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        var inertBodyHelper;
        function sanitizeHtml(defaultDoc, unsafeHtmlInput) {
            var DOM = getDOM();
            var inertBodyElement = null;
            try {
                inertBodyHelper = inertBodyHelper || new InertBodyHelper(defaultDoc, DOM);
                var unsafeHtml = unsafeHtmlInput ? String(unsafeHtmlInput) : "";
                inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml);
                var mXSSAttempts = 5;
                var parsedHtml = unsafeHtml;
                do {
                    if (mXSSAttempts === 0) {
                        throw new Error("Failed to sanitize html because the input is unstable");
                    }
                    mXSSAttempts--;
                    unsafeHtml = parsedHtml;
                    parsedHtml = DOM.getInnerHTML(inertBodyElement);
                    inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml);
                } while (unsafeHtml !== parsedHtml);
                var sanitizer = new SanitizingHtmlSerializer();
                var safeHtml = sanitizer.sanitizeChildren(DOM.getTemplateContent(inertBodyElement) || inertBodyElement);
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["O"])() && sanitizer.sanitizedSomething) {
                    DOM.log("WARNING: sanitizing HTML stripped some content (see http://g.co/ng/security#xss).");
                }
                return safeHtml;
            } finally {
                if (inertBodyElement) {
                    var parent = DOM.getTemplateContent(inertBodyElement) || inertBodyElement;
                    for (var _i = 0, _a = DOM.childNodesAsList(parent); _i < _a.length; _i++) {
                        var child = _a[_i];
                        DOM.removeChild(parent, child);
                    }
                }
            }
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var VALUES = "[-,.\"'%_!# a-zA-Z0-9]+";
        var TRANSFORMATION_FNS = "(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?";
        var COLOR_FNS = "(?:rgb|hsl)a?";
        var GRADIENTS = "(?:repeating-)?(?:linear|radial)-gradient";
        var CSS3_FNS = "(?:calc|attr)";
        var FN_ARGS = "\\([-0-9.%, #a-zA-Z]+\\)";
        var SAFE_STYLE_VALUE = new RegExp("^(" + VALUES + "|" + ("(?:" + TRANSFORMATION_FNS + "|" + COLOR_FNS + "|" + GRADIENTS + "|" + CSS3_FNS + ")") + (FN_ARGS + ")$"), "g");
        var URL_RE = /^url\(([^)]+)\)$/;
        function hasBalancedQuotes(value) {
            var outsideSingle = true;
            var outsideDouble = true;
            for (var i = 0; i < value.length; i++) {
                var c = value.charAt(i);
                if (c === "'" && outsideDouble) {
                    outsideSingle = !outsideSingle;
                } else if (c === '"' && outsideSingle) {
                    outsideDouble = !outsideDouble;
                }
            }
            return outsideSingle && outsideDouble;
        }
        function sanitizeStyle(value) {
            value = String(value).trim();
            if (!value) return "";
            var urlMatch = value.match(URL_RE);
            if (urlMatch && sanitizeUrl(urlMatch[1]) === urlMatch[1] || value.match(SAFE_STYLE_VALUE) && hasBalancedQuotes(value)) {
                return value;
            }
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["O"])()) {
                getDOM().log("WARNING: sanitizing unsafe style value " + value + " (see http://g.co/ng/security#xss).");
            }
            return "unsafe";
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var DomSanitizer = function() {
            function DomSanitizer() {}
            DomSanitizer.prototype.sanitize = function(context, value) {};
            DomSanitizer.prototype.bypassSecurityTrustHtml = function(value) {};
            DomSanitizer.prototype.bypassSecurityTrustStyle = function(value) {};
            DomSanitizer.prototype.bypassSecurityTrustScript = function(value) {};
            DomSanitizer.prototype.bypassSecurityTrustUrl = function(value) {};
            DomSanitizer.prototype.bypassSecurityTrustResourceUrl = function(value) {};
            return DomSanitizer;
        }();
        var DomSanitizerImpl = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](DomSanitizerImpl, _super);
            function DomSanitizerImpl(_doc) {
                var _this = _super.call(this) || this;
                _this._doc = _doc;
                return _this;
            }
            DomSanitizerImpl.prototype.sanitize = function(ctx, value) {
                if (value == null) return null;
                switch (ctx) {
                  case __WEBPACK_IMPORTED_MODULE_2__angular_core__["P"].NONE:
                    return value;

                  case __WEBPACK_IMPORTED_MODULE_2__angular_core__["P"].HTML:
                    if (value instanceof SafeHtmlImpl) return value.changingThisBreaksApplicationSecurity;
                    this.checkNotSafeValue(value, "HTML");
                    return sanitizeHtml(this._doc, String(value));

                  case __WEBPACK_IMPORTED_MODULE_2__angular_core__["P"].STYLE:
                    if (value instanceof SafeStyleImpl) return value.changingThisBreaksApplicationSecurity;
                    this.checkNotSafeValue(value, "Style");
                    return sanitizeStyle(value);

                  case __WEBPACK_IMPORTED_MODULE_2__angular_core__["P"].SCRIPT:
                    if (value instanceof SafeScriptImpl) return value.changingThisBreaksApplicationSecurity;
                    this.checkNotSafeValue(value, "Script");
                    throw new Error("unsafe value used in a script context");

                  case __WEBPACK_IMPORTED_MODULE_2__angular_core__["P"].URL:
                    if (value instanceof SafeResourceUrlImpl || value instanceof SafeUrlImpl) {
                        return value.changingThisBreaksApplicationSecurity;
                    }
                    this.checkNotSafeValue(value, "URL");
                    return sanitizeUrl(String(value));

                  case __WEBPACK_IMPORTED_MODULE_2__angular_core__["P"].RESOURCE_URL:
                    if (value instanceof SafeResourceUrlImpl) {
                        return value.changingThisBreaksApplicationSecurity;
                    }
                    this.checkNotSafeValue(value, "ResourceURL");
                    throw new Error("unsafe value used in a resource URL context (see http://g.co/ng/security#xss)");

                  default:
                    throw new Error("Unexpected SecurityContext " + ctx + " (see http://g.co/ng/security#xss)");
                }
            };
            DomSanitizerImpl.prototype.checkNotSafeValue = function(value, expectedType) {
                if (value instanceof SafeValueImpl) {
                    throw new Error("Required a safe " + expectedType + ", got a " + value.getTypeName() + " " + "(see http://g.co/ng/security#xss)");
                }
            };
            DomSanitizerImpl.prototype.bypassSecurityTrustHtml = function(value) {
                return new SafeHtmlImpl(value);
            };
            DomSanitizerImpl.prototype.bypassSecurityTrustStyle = function(value) {
                return new SafeStyleImpl(value);
            };
            DomSanitizerImpl.prototype.bypassSecurityTrustScript = function(value) {
                return new SafeScriptImpl(value);
            };
            DomSanitizerImpl.prototype.bypassSecurityTrustUrl = function(value) {
                return new SafeUrlImpl(value);
            };
            DomSanitizerImpl.prototype.bypassSecurityTrustResourceUrl = function(value) {
                return new SafeResourceUrlImpl(value);
            };
            return DomSanitizerImpl;
        }(DomSanitizer);
        DomSanitizerImpl.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["D"]
        } ];
        DomSanitizerImpl.ctorParameters = function() {
            return [ {
                type: undefined,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["H"],
                    args: [ DOCUMENT$1 ]
                } ]
            } ];
        };
        var SafeValueImpl = function() {
            function SafeValueImpl(changingThisBreaksApplicationSecurity) {
                this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
            }
            SafeValueImpl.prototype.getTypeName = function() {};
            SafeValueImpl.prototype.toString = function() {
                return "SafeValue must use [property]=binding: " + this.changingThisBreaksApplicationSecurity + " (see http://g.co/ng/security#xss)";
            };
            return SafeValueImpl;
        }();
        var SafeHtmlImpl = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](SafeHtmlImpl, _super);
            function SafeHtmlImpl() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SafeHtmlImpl.prototype.getTypeName = function() {
                return "HTML";
            };
            return SafeHtmlImpl;
        }(SafeValueImpl);
        var SafeStyleImpl = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](SafeStyleImpl, _super);
            function SafeStyleImpl() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SafeStyleImpl.prototype.getTypeName = function() {
                return "Style";
            };
            return SafeStyleImpl;
        }(SafeValueImpl);
        var SafeScriptImpl = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](SafeScriptImpl, _super);
            function SafeScriptImpl() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SafeScriptImpl.prototype.getTypeName = function() {
                return "Script";
            };
            return SafeScriptImpl;
        }(SafeValueImpl);
        var SafeUrlImpl = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](SafeUrlImpl, _super);
            function SafeUrlImpl() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SafeUrlImpl.prototype.getTypeName = function() {
                return "URL";
            };
            return SafeUrlImpl;
        }(SafeValueImpl);
        var SafeResourceUrlImpl = function(_super) {
            __WEBPACK_IMPORTED_MODULE_0_tslib__["a"](SafeResourceUrlImpl, _super);
            function SafeResourceUrlImpl() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SafeResourceUrlImpl.prototype.getTypeName = function() {
                return "ResourceURL";
            };
            return SafeResourceUrlImpl;
        }(SafeValueImpl);
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var INTERNAL_BROWSER_PLATFORM_PROVIDERS = [ {
            provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["Q"],
            useValue: __WEBPACK_IMPORTED_MODULE_1__angular_common__["g"]
        }, {
            provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["R"],
            useValue: initDomAdapter,
            multi: true
        }, {
            provide: __WEBPACK_IMPORTED_MODULE_1__angular_common__["f"],
            useClass: BrowserPlatformLocation
        }, {
            provide: DOCUMENT$1,
            useFactory: _document,
            deps: []
        } ];
        var BROWSER_SANITIZATION_PROVIDERS = [ {
            provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["q"],
            useExisting: DomSanitizer
        }, {
            provide: DomSanitizer,
            useClass: DomSanitizerImpl
        } ];
        var platformBrowser = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["S"])(__WEBPACK_IMPORTED_MODULE_2__angular_core__["T"], "browser", INTERNAL_BROWSER_PLATFORM_PROVIDERS);
        function initDomAdapter() {
            BrowserDomAdapter.makeCurrent();
            BrowserGetTestability.init();
        }
        function errorHandler() {
            return new __WEBPACK_IMPORTED_MODULE_2__angular_core__["u"]();
        }
        function _document() {
            return document;
        }
        var BrowserModule = function() {
            function BrowserModule(parentModule) {
                if (parentModule) {
                    throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.");
                }
            }
            BrowserModule.withServerTransition = function(params) {
                return {
                    ngModule: BrowserModule,
                    providers: [ {
                        provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["k"],
                        useValue: params.appId
                    }, {
                        provide: TRANSITION_ID,
                        useExisting: __WEBPACK_IMPORTED_MODULE_2__angular_core__["k"]
                    }, SERVER_TRANSITION_PROVIDERS ]
                };
            };
            return BrowserModule;
        }();
        BrowserModule.decorators = [ {
            type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["E"],
            args: [ {
                providers: [ BROWSER_SANITIZATION_PROVIDERS, {
                    provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u"],
                    useFactory: errorHandler,
                    deps: []
                }, {
                    provide: EVENT_MANAGER_PLUGINS,
                    useClass: DomEventsPlugin,
                    multi: true
                }, {
                    provide: EVENT_MANAGER_PLUGINS,
                    useClass: KeyEventsPlugin,
                    multi: true
                }, {
                    provide: EVENT_MANAGER_PLUGINS,
                    useClass: HammerGesturesPlugin,
                    multi: true
                }, {
                    provide: HAMMER_GESTURE_CONFIG,
                    useClass: HammerGestureConfig
                }, DomRendererFactory2, {
                    provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["s"],
                    useExisting: DomRendererFactory2
                }, {
                    provide: SharedStylesHost,
                    useExisting: DomSharedStylesHost
                }, DomSharedStylesHost, __WEBPACK_IMPORTED_MODULE_2__angular_core__["t"], EventManager, ELEMENT_PROBE_PROVIDERS, Meta, Title ],
                exports: [ __WEBPACK_IMPORTED_MODULE_1__angular_common__["d"], __WEBPACK_IMPORTED_MODULE_2__angular_core__["C"] ]
            } ]
        } ];
        BrowserModule.ctorParameters = function() {
            return [ {
                type: BrowserModule,
                decorators: [ {
                    type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["L"]
                }, {
                    type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["U"]
                } ]
            } ];
        };
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var win = typeof window !== "undefined" && window || {};
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var ChangeDetectionPerfRecord = function() {
            function ChangeDetectionPerfRecord(msPerTick, numTicks) {
                this.msPerTick = msPerTick;
                this.numTicks = numTicks;
            }
            return ChangeDetectionPerfRecord;
        }();
        var AngularProfiler = function() {
            function AngularProfiler(ref) {
                this.appRef = ref.injector.get(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B"]);
            }
            AngularProfiler.prototype.timeChangeDetection = function(config) {
                var record = config && config["record"];
                var profileName = "Change Detection";
                var isProfilerAvailable = win.console.profile != null;
                if (record && isProfilerAvailable) {
                    win.console.profile(profileName);
                }
                var start = getDOM().performanceNow();
                var numTicks = 0;
                while (numTicks < 5 || getDOM().performanceNow() - start < 500) {
                    this.appRef.tick();
                    numTicks++;
                }
                var end = getDOM().performanceNow();
                if (record && isProfilerAvailable) {
                    win.console.profileEnd(profileName);
                }
                var msPerTick = (end - start) / numTicks;
                win.console.log("ran " + numTicks + " change detection cycles");
                win.console.log(msPerTick.toFixed(2) + " ms per check");
                return new ChangeDetectionPerfRecord(msPerTick, numTicks);
            };
            return AngularProfiler;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var PROFILER_GLOBAL_NAME = "profiler";
        function enableDebugTools(ref) {
            exportNgVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
            return ref;
        }
        function disableDebugTools() {
            exportNgVar(PROFILER_GLOBAL_NAME, null);
        }
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var By = function() {
            function By() {}
            By.all = function() {
                return function(debugElement) {
                    return true;
                };
            };
            By.css = function(selector) {
                return function(debugElement) {
                    return debugElement.nativeElement != null ? getDOM().elementMatches(debugElement.nativeElement, selector) : false;
                };
            };
            By.directive = function(type) {
                return function(debugElement) {
                    return debugElement.providerTokens.indexOf(type) !== -1;
                };
            };
            return By;
        }();
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
        var VERSION = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["F"]("4.4.7");
    },
    QqRK: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Subscriber_1 = __webpack_require__("mmVS");
        var InnerSubscriber = function(_super) {
            __extends(InnerSubscriber, _super);
            function InnerSubscriber(parent, outerValue, outerIndex) {
                _super.call(this);
                this.parent = parent;
                this.outerValue = outerValue;
                this.outerIndex = outerIndex;
                this.index = 0;
            }
            InnerSubscriber.prototype._next = function(value) {
                this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
            };
            InnerSubscriber.prototype._error = function(error) {
                this.parent.notifyError(error, this);
                this.unsubscribe();
            };
            InnerSubscriber.prototype._complete = function() {
                this.parent.notifyComplete(this);
                this.unsubscribe();
            };
            return InnerSubscriber;
        }(Subscriber_1.Subscriber);
        exports.InnerSubscriber = InnerSubscriber;
    },
    RRVv: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Observable_1 = __webpack_require__("rCTf");
        var ScalarObservable = function(_super) {
            __extends(ScalarObservable, _super);
            function ScalarObservable(value, scheduler) {
                _super.call(this);
                this.value = value;
                this.scheduler = scheduler;
                this._isScalar = true;
                if (scheduler) {
                    this._isScalar = false;
                }
            }
            ScalarObservable.create = function(value, scheduler) {
                return new ScalarObservable(value, scheduler);
            };
            ScalarObservable.dispatch = function(state) {
                var done = state.done, value = state.value, subscriber = state.subscriber;
                if (done) {
                    subscriber.complete();
                    return;
                }
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
                state.done = true;
                this.schedule(state);
            };
            ScalarObservable.prototype._subscribe = function(subscriber) {
                var value = this.value;
                var scheduler = this.scheduler;
                if (scheduler) {
                    return scheduler.schedule(ScalarObservable.dispatch, 0, {
                        done: false,
                        value: value,
                        subscriber: subscriber
                    });
                } else {
                    subscriber.next(value);
                    if (!subscriber.closed) {
                        subscriber.complete();
                    }
                }
            };
            return ScalarObservable;
        }(Observable_1.Observable);
        exports.ScalarObservable = ScalarObservable;
    },
    SKH6: function(module, exports, __webpack_require__) {
        "use strict";
        function isFunction(x) {
            return typeof x === "function";
        }
        exports.isFunction = isFunction;
    },
    TToO: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_exports__["a"] = __extends;
        /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
        var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        function __extends(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        }
        var __assign = function() {
            __assign = Object.assign || function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        function __rest(s, e) {
            var t = {};
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
            if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
            }
            return t;
        }
        function __decorate(decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        }
        function __param(paramIndex, decorator) {
            return function(target, key) {
                decorator(target, key, paramIndex);
            };
        }
        function __metadata(metadataKey, metadataValue) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
        }
        function __awaiter(thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P ? value : new P(function(resolve) {
                    resolve(value);
                });
            }
            return new (P || (P = Promise))(function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        }
        function __generator(thisArg, body) {
            var _ = {
                label: 0,
                sent: function() {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            }, f, y, t, g;
            return g = {
                next: verb(0),
                throw: verb(1),
                return: verb(2)
            }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
                return this;
            }), g;
            function verb(n) {
                return function(v) {
                    return step([ n, v ]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (_) try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                    0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                    if (y = 0, t) op = [ op[0] & 2, t.value ];
                    switch (op[0]) {
                      case 0:
                      case 1:
                        t = op;
                        break;

                      case 4:
                        _.label++;
                        return {
                            value: op[1],
                            done: false
                        };

                      case 5:
                        _.label++;
                        y = op[1];
                        op = [ 0 ];
                        continue;

                      case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;

                      default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [ 6, e ];
                    y = 0;
                } finally {
                    f = t = 0;
                }
                if (op[0] & 5) throw op[1];
                return {
                    value: op[0] ? op[1] : void 0,
                    done: true
                };
            }
        }
        function __createBinding(o, m, k, k2) {
            if (k2 === undefined) k2 = k;
            o[k2] = m[k];
        }
        function __exportStar(m, exports) {
            for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
        }
        function __values(o) {
            var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
            if (m) return m.call(o);
            if (o && typeof o.length === "number") return {
                next: function() {
                    if (o && i >= o.length) o = void 0;
                    return {
                        value: o && o[i++],
                        done: !o
                    };
                }
            };
            throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }
        function __read(o, n) {
            var m = typeof Symbol === "function" && o[Symbol.iterator];
            if (!m) return o;
            var i = m.call(o), r, ar = [], e;
            try {
                while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
            } catch (error) {
                e = {
                    error: error
                };
            } finally {
                try {
                    if (r && !r.done && (m = i["return"])) m.call(i);
                } finally {
                    if (e) throw e.error;
                }
            }
            return ar;
        }
        function __spread() {
            for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
            return ar;
        }
        function __spreadArrays() {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
            for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
            k++) r[k] = a[j];
            return r;
        }
        function __await(v) {
            return this instanceof __await ? (this.v = v, this) : new __await(v);
        }
        function __asyncGenerator(thisArg, _arguments, generator) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var g = generator.apply(thisArg, _arguments || []), i, q = [];
            return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
                return this;
            }, i;
            function verb(n) {
                if (g[n]) i[n] = function(v) {
                    return new Promise(function(a, b) {
                        q.push([ n, v, a, b ]) > 1 || resume(n, v);
                    });
                };
            }
            function resume(n, v) {
                try {
                    step(g[n](v));
                } catch (e) {
                    settle(q[0][3], e);
                }
            }
            function step(r) {
                r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
            }
            function fulfill(value) {
                resume("next", value);
            }
            function reject(value) {
                resume("throw", value);
            }
            function settle(f, v) {
                if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
            }
        }
        function __asyncDelegator(o) {
            var i, p;
            return i = {}, verb("next"), verb("throw", function(e) {
                throw e;
            }), verb("return"), i[Symbol.iterator] = function() {
                return this;
            }, i;
            function verb(n, f) {
                i[n] = o[n] ? function(v) {
                    return (p = !p) ? {
                        value: __await(o[n](v)),
                        done: n === "return"
                    } : f ? f(v) : v;
                } : f;
            }
        }
        function __asyncValues(o) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var m = o[Symbol.asyncIterator], i;
            return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), 
            i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
                return this;
            }, i);
            function verb(n) {
                i[n] = o[n] && function(v) {
                    return new Promise(function(resolve, reject) {
                        v = o[n](v), settle(resolve, reject, v.done, v.value);
                    });
                };
            }
            function settle(resolve, reject, d, v) {
                Promise.resolve(v).then(function(v) {
                    resolve({
                        value: v,
                        done: d
                    });
                }, reject);
            }
        }
        function __makeTemplateObject(cooked, raw) {
            if (Object.defineProperty) {
                Object.defineProperty(cooked, "raw", {
                    value: raw
                });
            } else {
                cooked.raw = raw;
            }
            return cooked;
        }
        function __importStar(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
            result.default = mod;
            return result;
        }
        function __importDefault(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            };
        }
        function __classPrivateFieldGet(receiver, privateMap) {
            if (!privateMap.has(receiver)) {
                throw new TypeError("attempted to get private field on non-instance");
            }
            return privateMap.get(receiver);
        }
        function __classPrivateFieldSet(receiver, privateMap, value) {
            if (!privateMap.has(receiver)) {
                throw new TypeError("attempted to set private field on non-instance");
            }
            privateMap.set(receiver, value);
            return value;
        }
    },
    VOfZ: function(module, exports, __webpack_require__) {
        "use strict";
        (function(global) {
            var __window = typeof window !== "undefined" && window;
            var __self = typeof self !== "undefined" && typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && self;
            var __global = typeof global !== "undefined" && global;
            var _root = __window || __global || __self;
            exports.root = _root;
            (function() {
                if (!_root) {
                    throw new Error("RxJS could not find any global context (window, self, global)");
                }
            })();
        }).call(exports, __webpack_require__("DuR2"));
    },
    WhVc: function(module, exports, __webpack_require__) {
        "use strict";
        exports.errorObject = {
            e: {}
        };
    },
    Xajo: function(module, exports, __webpack_require__) {
        "use strict";
        exports.isArray = Array.isArray || function(x) {
            return x && typeof x.length === "number";
        };
    },
    "YOd+": function(module, exports, __webpack_require__) {
        "use strict";
        function noop() {}
        exports.noop = noop;
    },
    Yh8Q: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Observable_1 = __webpack_require__("rCTf");
        var ScalarObservable_1 = __webpack_require__("RRVv");
        var EmptyObservable_1 = __webpack_require__("jBEF");
        var isScheduler_1 = __webpack_require__("fWbP");
        var ArrayObservable = function(_super) {
            __extends(ArrayObservable, _super);
            function ArrayObservable(array, scheduler) {
                _super.call(this);
                this.array = array;
                this.scheduler = scheduler;
                if (!scheduler && array.length === 1) {
                    this._isScalar = true;
                    this.value = array[0];
                }
            }
            ArrayObservable.create = function(array, scheduler) {
                return new ArrayObservable(array, scheduler);
            };
            ArrayObservable.of = function() {
                var array = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    array[_i - 0] = arguments[_i];
                }
                var scheduler = array[array.length - 1];
                if (isScheduler_1.isScheduler(scheduler)) {
                    array.pop();
                } else {
                    scheduler = null;
                }
                var len = array.length;
                if (len > 1) {
                    return new ArrayObservable(array, scheduler);
                } else if (len === 1) {
                    return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
                } else {
                    return new EmptyObservable_1.EmptyObservable(scheduler);
                }
            };
            ArrayObservable.dispatch = function(state) {
                var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
                if (index >= count) {
                    subscriber.complete();
                    return;
                }
                subscriber.next(array[index]);
                if (subscriber.closed) {
                    return;
                }
                state.index = index + 1;
                this.schedule(state);
            };
            ArrayObservable.prototype._subscribe = function(subscriber) {
                var index = 0;
                var array = this.array;
                var count = array.length;
                var scheduler = this.scheduler;
                if (scheduler) {
                    return scheduler.schedule(ArrayObservable.dispatch, 0, {
                        array: array,
                        index: index,
                        count: count,
                        subscriber: subscriber
                    });
                } else {
                    for (var i = 0; i < count && !subscriber.closed; i++) {
                        subscriber.next(array[i]);
                    }
                    subscriber.complete();
                }
            };
            return ArrayObservable;
        }(Observable_1.Observable);
        exports.ArrayObservable = ArrayObservable;
    },
    ZJf8: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Subscription_1 = __webpack_require__("B00U");
        var SubjectSubscription = function(_super) {
            __extends(SubjectSubscription, _super);
            function SubjectSubscription(subject, subscriber) {
                _super.call(this);
                this.subject = subject;
                this.subscriber = subscriber;
                this.closed = false;
            }
            SubjectSubscription.prototype.unsubscribe = function() {
                if (this.closed) {
                    return;
                }
                this.closed = true;
                var subject = this.subject;
                var observers = subject.observers;
                this.subject = null;
                if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
                    return;
                }
                var subscriberIndex = observers.indexOf(this.subscriber);
                if (subscriberIndex !== -1) {
                    observers.splice(subscriberIndex, 1);
                }
            };
            return SubjectSubscription;
        }(Subscription_1.Subscription);
        exports.SubjectSubscription = SubjectSubscription;
    },
    aQl7: function(module, exports, __webpack_require__) {
        "use strict";
        function isPromise(value) {
            return value && typeof value.subscribe !== "function" && typeof value.then === "function";
        }
        exports.isPromise = isPromise;
    },
    cdmN: function(module, exports, __webpack_require__) {
        "use strict";
        var root_1 = __webpack_require__("VOfZ");
        function symbolIteratorPonyfill(root) {
            var Symbol = root.Symbol;
            if (typeof Symbol === "function") {
                if (!Symbol.iterator) {
                    Symbol.iterator = Symbol("iterator polyfill");
                }
                return Symbol.iterator;
            } else {
                var Set_1 = root.Set;
                if (Set_1 && typeof new Set_1()["@@iterator"] === "function") {
                    return "@@iterator";
                }
                var Map_1 = root.Map;
                if (Map_1) {
                    var keys = Object.getOwnPropertyNames(Map_1.prototype);
                    for (var i = 0; i < keys.length; ++i) {
                        var key = keys[i];
                        if (key !== "entries" && key !== "size" && Map_1.prototype[key] === Map_1.prototype["entries"]) {
                            return key;
                        }
                    }
                }
                return "@@iterator";
            }
        }
        exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
        exports.iterator = symbolIteratorPonyfill(root_1.root);
        exports.$$iterator = exports.iterator;
    },
    fWbP: function(module, exports, __webpack_require__) {
        "use strict";
        function isScheduler(value) {
            return value && typeof value.schedule === "function";
        }
        exports.isScheduler = isScheduler;
    },
    hYBY: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var root_1 = __webpack_require__("VOfZ");
        var Observable_1 = __webpack_require__("rCTf");
        var PromiseObservable = function(_super) {
            __extends(PromiseObservable, _super);
            function PromiseObservable(promise, scheduler) {
                _super.call(this);
                this.promise = promise;
                this.scheduler = scheduler;
            }
            PromiseObservable.create = function(promise, scheduler) {
                return new PromiseObservable(promise, scheduler);
            };
            PromiseObservable.prototype._subscribe = function(subscriber) {
                var _this = this;
                var promise = this.promise;
                var scheduler = this.scheduler;
                if (scheduler == null) {
                    if (this._isScalar) {
                        if (!subscriber.closed) {
                            subscriber.next(this.value);
                            subscriber.complete();
                        }
                    } else {
                        promise.then(function(value) {
                            _this.value = value;
                            _this._isScalar = true;
                            if (!subscriber.closed) {
                                subscriber.next(value);
                                subscriber.complete();
                            }
                        }, function(err) {
                            if (!subscriber.closed) {
                                subscriber.error(err);
                            }
                        }).then(null, function(err) {
                            root_1.root.setTimeout(function() {
                                throw err;
                            });
                        });
                    }
                } else {
                    if (this._isScalar) {
                        if (!subscriber.closed) {
                            return scheduler.schedule(dispatchNext, 0, {
                                value: this.value,
                                subscriber: subscriber
                            });
                        }
                    } else {
                        promise.then(function(value) {
                            _this.value = value;
                            _this._isScalar = true;
                            if (!subscriber.closed) {
                                subscriber.add(scheduler.schedule(dispatchNext, 0, {
                                    value: value,
                                    subscriber: subscriber
                                }));
                            }
                        }, function(err) {
                            if (!subscriber.closed) {
                                subscriber.add(scheduler.schedule(dispatchError, 0, {
                                    err: err,
                                    subscriber: subscriber
                                }));
                            }
                        }).then(null, function(err) {
                            root_1.root.setTimeout(function() {
                                throw err;
                            });
                        });
                    }
                }
            };
            return PromiseObservable;
        }(Observable_1.Observable);
        exports.PromiseObservable = PromiseObservable;
        function dispatchNext(arg) {
            var value = arg.value, subscriber = arg.subscriber;
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }
        function dispatchError(arg) {
            var err = arg.err, subscriber = arg.subscriber;
            if (!subscriber.closed) {
                subscriber.error(err);
            }
        }
    },
    "ioK+": function(module, exports, __webpack_require__) {
        "use strict";
        var PromiseObservable_1 = __webpack_require__("hYBY");
        exports.fromPromise = PromiseObservable_1.PromiseObservable.create;
    },
    jBEF: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Observable_1 = __webpack_require__("rCTf");
        var EmptyObservable = function(_super) {
            __extends(EmptyObservable, _super);
            function EmptyObservable(scheduler) {
                _super.call(this);
                this.scheduler = scheduler;
            }
            EmptyObservable.create = function(scheduler) {
                return new EmptyObservable(scheduler);
            };
            EmptyObservable.dispatch = function(arg) {
                var subscriber = arg.subscriber;
                subscriber.complete();
            };
            EmptyObservable.prototype._subscribe = function(subscriber) {
                var scheduler = this.scheduler;
                if (scheduler) {
                    return scheduler.schedule(EmptyObservable.dispatch, 0, {
                        subscriber: subscriber
                    });
                } else {
                    subscriber.complete();
                }
            };
            return EmptyObservable;
        }(Observable_1.Observable);
        exports.EmptyObservable = EmptyObservable;
    },
    lHsB: function(module, exports, __webpack_require__) {
        "use strict";
        var Subscriber_1 = __webpack_require__("mmVS");
        var rxSubscriber_1 = __webpack_require__("r8ZY");
        var Observer_1 = __webpack_require__("yrou");
        function toSubscriber(nextOrObserver, error, complete) {
            if (nextOrObserver) {
                if (nextOrObserver instanceof Subscriber_1.Subscriber) {
                    return nextOrObserver;
                }
                if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
                    return nextOrObserver[rxSubscriber_1.rxSubscriber]();
                }
            }
            if (!nextOrObserver && !error && !complete) {
                return new Subscriber_1.Subscriber(Observer_1.empty);
            }
            return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
        }
        exports.toSubscriber = toSubscriber;
    },
    mbVC: function(module, exports, __webpack_require__) {
        "use strict";
        var root_1 = __webpack_require__("VOfZ");
        function getSymbolObservable(context) {
            var $$observable;
            var Symbol = context.Symbol;
            if (typeof Symbol === "function") {
                if (Symbol.observable) {
                    $$observable = Symbol.observable;
                } else {
                    $$observable = Symbol("observable");
                    Symbol.observable = $$observable;
                }
            } else {
                $$observable = "@@observable";
            }
            return $$observable;
        }
        exports.getSymbolObservable = getSymbolObservable;
        exports.observable = getSymbolObservable(root_1.root);
        exports.$$observable = exports.observable;
    },
    mmVS: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var isFunction_1 = __webpack_require__("SKH6");
        var Subscription_1 = __webpack_require__("B00U");
        var Observer_1 = __webpack_require__("yrou");
        var rxSubscriber_1 = __webpack_require__("r8ZY");
        var Subscriber = function(_super) {
            __extends(Subscriber, _super);
            function Subscriber(destinationOrNext, error, complete) {
                _super.call(this);
                this.syncErrorValue = null;
                this.syncErrorThrown = false;
                this.syncErrorThrowable = false;
                this.isStopped = false;
                switch (arguments.length) {
                  case 0:
                    this.destination = Observer_1.empty;
                    break;

                  case 1:
                    if (!destinationOrNext) {
                        this.destination = Observer_1.empty;
                        break;
                    }
                    if (typeof destinationOrNext === "object") {
                        if (isTrustedSubscriber(destinationOrNext)) {
                            var trustedSubscriber = destinationOrNext[rxSubscriber_1.rxSubscriber]();
                            this.syncErrorThrowable = trustedSubscriber.syncErrorThrowable;
                            this.destination = trustedSubscriber;
                            trustedSubscriber.add(this);
                        } else {
                            this.syncErrorThrowable = true;
                            this.destination = new SafeSubscriber(this, destinationOrNext);
                        }
                        break;
                    }

                  default:
                    this.syncErrorThrowable = true;
                    this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                    break;
                }
            }
            Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function() {
                return this;
            };
            Subscriber.create = function(next, error, complete) {
                var subscriber = new Subscriber(next, error, complete);
                subscriber.syncErrorThrowable = false;
                return subscriber;
            };
            Subscriber.prototype.next = function(value) {
                if (!this.isStopped) {
                    this._next(value);
                }
            };
            Subscriber.prototype.error = function(err) {
                if (!this.isStopped) {
                    this.isStopped = true;
                    this._error(err);
                }
            };
            Subscriber.prototype.complete = function() {
                if (!this.isStopped) {
                    this.isStopped = true;
                    this._complete();
                }
            };
            Subscriber.prototype.unsubscribe = function() {
                if (this.closed) {
                    return;
                }
                this.isStopped = true;
                _super.prototype.unsubscribe.call(this);
            };
            Subscriber.prototype._next = function(value) {
                this.destination.next(value);
            };
            Subscriber.prototype._error = function(err) {
                this.destination.error(err);
                this.unsubscribe();
            };
            Subscriber.prototype._complete = function() {
                this.destination.complete();
                this.unsubscribe();
            };
            Subscriber.prototype._unsubscribeAndRecycle = function() {
                var _a = this, _parent = _a._parent, _parents = _a._parents;
                this._parent = null;
                this._parents = null;
                this.unsubscribe();
                this.closed = false;
                this.isStopped = false;
                this._parent = _parent;
                this._parents = _parents;
                return this;
            };
            return Subscriber;
        }(Subscription_1.Subscription);
        exports.Subscriber = Subscriber;
        var SafeSubscriber = function(_super) {
            __extends(SafeSubscriber, _super);
            function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
                _super.call(this);
                this._parentSubscriber = _parentSubscriber;
                var next;
                var context = this;
                if (isFunction_1.isFunction(observerOrNext)) {
                    next = observerOrNext;
                } else if (observerOrNext) {
                    next = observerOrNext.next;
                    error = observerOrNext.error;
                    complete = observerOrNext.complete;
                    if (observerOrNext !== Observer_1.empty) {
                        context = Object.create(observerOrNext);
                        if (isFunction_1.isFunction(context.unsubscribe)) {
                            this.add(context.unsubscribe.bind(context));
                        }
                        context.unsubscribe = this.unsubscribe.bind(this);
                    }
                }
                this._context = context;
                this._next = next;
                this._error = error;
                this._complete = complete;
            }
            SafeSubscriber.prototype.next = function(value) {
                if (!this.isStopped && this._next) {
                    var _parentSubscriber = this._parentSubscriber;
                    if (!_parentSubscriber.syncErrorThrowable) {
                        this.__tryOrUnsub(this._next, value);
                    } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                        this.unsubscribe();
                    }
                }
            };
            SafeSubscriber.prototype.error = function(err) {
                if (!this.isStopped) {
                    var _parentSubscriber = this._parentSubscriber;
                    if (this._error) {
                        if (!_parentSubscriber.syncErrorThrowable) {
                            this.__tryOrUnsub(this._error, err);
                            this.unsubscribe();
                        } else {
                            this.__tryOrSetError(_parentSubscriber, this._error, err);
                            this.unsubscribe();
                        }
                    } else if (!_parentSubscriber.syncErrorThrowable) {
                        this.unsubscribe();
                        throw err;
                    } else {
                        _parentSubscriber.syncErrorValue = err;
                        _parentSubscriber.syncErrorThrown = true;
                        this.unsubscribe();
                    }
                }
            };
            SafeSubscriber.prototype.complete = function() {
                var _this = this;
                if (!this.isStopped) {
                    var _parentSubscriber = this._parentSubscriber;
                    if (this._complete) {
                        var wrappedComplete = function() {
                            return _this._complete.call(_this._context);
                        };
                        if (!_parentSubscriber.syncErrorThrowable) {
                            this.__tryOrUnsub(wrappedComplete);
                            this.unsubscribe();
                        } else {
                            this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                            this.unsubscribe();
                        }
                    } else {
                        this.unsubscribe();
                    }
                }
            };
            SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
                try {
                    fn.call(this._context, value);
                } catch (err) {
                    this.unsubscribe();
                    throw err;
                }
            };
            SafeSubscriber.prototype.__tryOrSetError = function(parent, fn, value) {
                try {
                    fn.call(this._context, value);
                } catch (err) {
                    parent.syncErrorValue = err;
                    parent.syncErrorThrown = true;
                    return true;
                }
                return false;
            };
            SafeSubscriber.prototype._unsubscribe = function() {
                var _parentSubscriber = this._parentSubscriber;
                this._context = null;
                this._parentSubscriber = null;
                _parentSubscriber.unsubscribe();
            };
            return SafeSubscriber;
        }(Subscriber);
        function isTrustedSubscriber(obj) {
            return obj instanceof Subscriber || "syncErrorThrowable" in obj && obj[rxSubscriber_1.rxSubscriber];
        }
    },
    r8ZY: function(module, exports, __webpack_require__) {
        "use strict";
        var root_1 = __webpack_require__("VOfZ");
        var Symbol = root_1.root.Symbol;
        exports.rxSubscriber = typeof Symbol === "function" && typeof Symbol.for === "function" ? Symbol.for("rxSubscriber") : "@@rxSubscriber";
        exports.$$rxSubscriber = exports.rxSubscriber;
    },
    rCTf: function(module, exports, __webpack_require__) {
        "use strict";
        var root_1 = __webpack_require__("VOfZ");
        var toSubscriber_1 = __webpack_require__("lHsB");
        var observable_1 = __webpack_require__("mbVC");
        var pipe_1 = __webpack_require__("9eyw");
        var Observable = function() {
            function Observable(subscribe) {
                this._isScalar = false;
                if (subscribe) {
                    this._subscribe = subscribe;
                }
            }
            Observable.prototype.lift = function(operator) {
                var observable = new Observable();
                observable.source = this;
                observable.operator = operator;
                return observable;
            };
            Observable.prototype.subscribe = function(observerOrNext, error, complete) {
                var operator = this.operator;
                var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
                if (operator) {
                    operator.call(sink, this.source);
                } else {
                    sink.add(this.source || !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
                }
                if (sink.syncErrorThrowable) {
                    sink.syncErrorThrowable = false;
                    if (sink.syncErrorThrown) {
                        throw sink.syncErrorValue;
                    }
                }
                return sink;
            };
            Observable.prototype._trySubscribe = function(sink) {
                try {
                    return this._subscribe(sink);
                } catch (err) {
                    sink.syncErrorThrown = true;
                    sink.syncErrorValue = err;
                    sink.error(err);
                }
            };
            Observable.prototype.forEach = function(next, PromiseCtor) {
                var _this = this;
                if (!PromiseCtor) {
                    if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                        PromiseCtor = root_1.root.Rx.config.Promise;
                    } else if (root_1.root.Promise) {
                        PromiseCtor = root_1.root.Promise;
                    }
                }
                if (!PromiseCtor) {
                    throw new Error("no Promise impl found");
                }
                return new PromiseCtor(function(resolve, reject) {
                    var subscription;
                    subscription = _this.subscribe(function(value) {
                        if (subscription) {
                            try {
                                next(value);
                            } catch (err) {
                                reject(err);
                                subscription.unsubscribe();
                            }
                        } else {
                            next(value);
                        }
                    }, reject, resolve);
                });
            };
            Observable.prototype._subscribe = function(subscriber) {
                return this.source.subscribe(subscriber);
            };
            Observable.prototype[observable_1.observable] = function() {
                return this;
            };
            Observable.prototype.pipe = function() {
                var operations = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    operations[_i - 0] = arguments[_i];
                }
                if (operations.length === 0) {
                    return this;
                }
                return pipe_1.pipeFromArray(operations)(this);
            };
            Observable.prototype.toPromise = function(PromiseCtor) {
                var _this = this;
                if (!PromiseCtor) {
                    if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                        PromiseCtor = root_1.root.Rx.config.Promise;
                    } else if (root_1.root.Promise) {
                        PromiseCtor = root_1.root.Promise;
                    }
                }
                if (!PromiseCtor) {
                    throw new Error("no Promise impl found");
                }
                return new PromiseCtor(function(resolve, reject) {
                    var value;
                    _this.subscribe(function(x) {
                        return value = x;
                    }, function(err) {
                        return reject(err);
                    }, function() {
                        return resolve(value);
                    });
                });
            };
            Observable.create = function(subscribe) {
                return new Observable(subscribe);
            };
            return Observable;
        }();
        exports.Observable = Observable;
    },
    rKQy: function(module, exports, __webpack_require__) {
        "use strict";
        var mergeMap_1 = __webpack_require__("ANGw");
        var identity_1 = __webpack_require__("00YY");
        function mergeAll(concurrent) {
            if (concurrent === void 0) {
                concurrent = Number.POSITIVE_INFINITY;
            }
            return mergeMap_1.mergeMap(identity_1.identity, null, concurrent);
        }
        exports.mergeAll = mergeAll;
    },
    sIYO: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Subject_1 = __webpack_require__("EEr4");
        var Observable_1 = __webpack_require__("rCTf");
        var Subscriber_1 = __webpack_require__("mmVS");
        var Subscription_1 = __webpack_require__("B00U");
        var refCount_1 = __webpack_require__("9dR0");
        var ConnectableObservable = function(_super) {
            __extends(ConnectableObservable, _super);
            function ConnectableObservable(source, subjectFactory) {
                _super.call(this);
                this.source = source;
                this.subjectFactory = subjectFactory;
                this._refCount = 0;
                this._isComplete = false;
            }
            ConnectableObservable.prototype._subscribe = function(subscriber) {
                return this.getSubject().subscribe(subscriber);
            };
            ConnectableObservable.prototype.getSubject = function() {
                var subject = this._subject;
                if (!subject || subject.isStopped) {
                    this._subject = this.subjectFactory();
                }
                return this._subject;
            };
            ConnectableObservable.prototype.connect = function() {
                var connection = this._connection;
                if (!connection) {
                    this._isComplete = false;
                    connection = this._connection = new Subscription_1.Subscription();
                    connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));
                    if (connection.closed) {
                        this._connection = null;
                        connection = Subscription_1.Subscription.EMPTY;
                    } else {
                        this._connection = connection;
                    }
                }
                return connection;
            };
            ConnectableObservable.prototype.refCount = function() {
                return refCount_1.refCount()(this);
            };
            return ConnectableObservable;
        }(Observable_1.Observable);
        exports.ConnectableObservable = ConnectableObservable;
        var connectableProto = ConnectableObservable.prototype;
        exports.connectableObservableDescriptor = {
            operator: {
                value: null
            },
            _refCount: {
                value: 0,
                writable: true
            },
            _subject: {
                value: null,
                writable: true
            },
            _connection: {
                value: null,
                writable: true
            },
            _subscribe: {
                value: connectableProto._subscribe
            },
            _isComplete: {
                value: connectableProto._isComplete,
                writable: true
            },
            getSubject: {
                value: connectableProto.getSubject
            },
            connect: {
                value: connectableProto.connect
            },
            refCount: {
                value: connectableProto.refCount
            }
        };
        var ConnectableSubscriber = function(_super) {
            __extends(ConnectableSubscriber, _super);
            function ConnectableSubscriber(destination, connectable) {
                _super.call(this, destination);
                this.connectable = connectable;
            }
            ConnectableSubscriber.prototype._error = function(err) {
                this._unsubscribe();
                _super.prototype._error.call(this, err);
            };
            ConnectableSubscriber.prototype._complete = function() {
                this.connectable._isComplete = true;
                this._unsubscribe();
                _super.prototype._complete.call(this);
            };
            ConnectableSubscriber.prototype._unsubscribe = function() {
                var connectable = this.connectable;
                if (connectable) {
                    this.connectable = null;
                    var connection = connectable._connection;
                    connectable._refCount = 0;
                    connectable._subject = null;
                    connectable._connection = null;
                    if (connection) {
                        connection.unsubscribe();
                    }
                }
            };
            return ConnectableSubscriber;
        }(Subject_1.SubjectSubscriber);
        var RefCountOperator = function() {
            function RefCountOperator(connectable) {
                this.connectable = connectable;
            }
            RefCountOperator.prototype.call = function(subscriber, source) {
                var connectable = this.connectable;
                connectable._refCount++;
                var refCounter = new RefCountSubscriber(subscriber, connectable);
                var subscription = source.subscribe(refCounter);
                if (!refCounter.closed) {
                    refCounter.connection = connectable.connect();
                }
                return subscription;
            };
            return RefCountOperator;
        }();
        var RefCountSubscriber = function(_super) {
            __extends(RefCountSubscriber, _super);
            function RefCountSubscriber(destination, connectable) {
                _super.call(this, destination);
                this.connectable = connectable;
            }
            RefCountSubscriber.prototype._unsubscribe = function() {
                var connectable = this.connectable;
                if (!connectable) {
                    this.connection = null;
                    return;
                }
                this.connectable = null;
                var refCount = connectable._refCount;
                if (refCount <= 0) {
                    this.connection = null;
                    return;
                }
                connectable._refCount = refCount - 1;
                if (refCount > 1) {
                    this.connection = null;
                    return;
                }
                var connection = this.connection;
                var sharedConnection = connectable._connection;
                this.connection = null;
                if (sharedConnection && (!connection || sharedConnection === connection)) {
                    sharedConnection.unsubscribe();
                }
            };
            return RefCountSubscriber;
        }(Subscriber_1.Subscriber);
    },
    sTFn: function(module, exports, __webpack_require__) {
        "use strict";
        var multicast_1 = __webpack_require__("6BaH");
        var refCount_1 = __webpack_require__("9dR0");
        var Subject_1 = __webpack_require__("EEr4");
        function shareSubjectFactory() {
            return new Subject_1.Subject();
        }
        function share() {
            return function(source) {
                return refCount_1.refCount()(multicast_1.multicast(shareSubjectFactory)(source));
            };
        }
        exports.share = share;
    },
    t2qv: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Observable_1 = __webpack_require__("rCTf");
        var EmptyObservable_1 = __webpack_require__("jBEF");
        var isArray_1 = __webpack_require__("Xajo");
        var subscribeToResult_1 = __webpack_require__("CURp");
        var OuterSubscriber_1 = __webpack_require__("wAkD");
        var ForkJoinObservable = function(_super) {
            __extends(ForkJoinObservable, _super);
            function ForkJoinObservable(sources, resultSelector) {
                _super.call(this);
                this.sources = sources;
                this.resultSelector = resultSelector;
            }
            ForkJoinObservable.create = function() {
                var sources = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    sources[_i - 0] = arguments[_i];
                }
                if (sources === null || arguments.length === 0) {
                    return new EmptyObservable_1.EmptyObservable();
                }
                var resultSelector = null;
                if (typeof sources[sources.length - 1] === "function") {
                    resultSelector = sources.pop();
                }
                if (sources.length === 1 && isArray_1.isArray(sources[0])) {
                    sources = sources[0];
                }
                if (sources.length === 0) {
                    return new EmptyObservable_1.EmptyObservable();
                }
                return new ForkJoinObservable(sources, resultSelector);
            };
            ForkJoinObservable.prototype._subscribe = function(subscriber) {
                return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
            };
            return ForkJoinObservable;
        }(Observable_1.Observable);
        exports.ForkJoinObservable = ForkJoinObservable;
        var ForkJoinSubscriber = function(_super) {
            __extends(ForkJoinSubscriber, _super);
            function ForkJoinSubscriber(destination, sources, resultSelector) {
                _super.call(this, destination);
                this.sources = sources;
                this.resultSelector = resultSelector;
                this.completed = 0;
                this.haveValues = 0;
                var len = sources.length;
                this.total = len;
                this.values = new Array(len);
                for (var i = 0; i < len; i++) {
                    var source = sources[i];
                    var innerSubscription = subscribeToResult_1.subscribeToResult(this, source, null, i);
                    if (innerSubscription) {
                        innerSubscription.outerIndex = i;
                        this.add(innerSubscription);
                    }
                }
            }
            ForkJoinSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                this.values[outerIndex] = innerValue;
                if (!innerSub._hasValue) {
                    innerSub._hasValue = true;
                    this.haveValues++;
                }
            };
            ForkJoinSubscriber.prototype.notifyComplete = function(innerSub) {
                var destination = this.destination;
                var _a = this, haveValues = _a.haveValues, resultSelector = _a.resultSelector, values = _a.values;
                var len = values.length;
                if (!innerSub._hasValue) {
                    destination.complete();
                    return;
                }
                this.completed++;
                if (this.completed !== len) {
                    return;
                }
                if (haveValues === len) {
                    var value = resultSelector ? resultSelector.apply(this, values) : values;
                    destination.next(value);
                }
                destination.complete();
            };
            return ForkJoinSubscriber;
        }(OuterSubscriber_1.OuterSubscriber);
    },
    wAkD: function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Subscriber_1 = __webpack_require__("mmVS");
        var OuterSubscriber = function(_super) {
            __extends(OuterSubscriber, _super);
            function OuterSubscriber() {
                _super.apply(this, arguments);
            }
            OuterSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                this.destination.next(innerValue);
            };
            OuterSubscriber.prototype.notifyError = function(error, innerSub) {
                this.destination.error(error);
            };
            OuterSubscriber.prototype.notifyComplete = function(innerSub) {
                this.destination.complete();
            };
            return OuterSubscriber;
        }(Subscriber_1.Subscriber);
        exports.OuterSubscriber = OuterSubscriber;
    },
    xAJs: function(module, exports, __webpack_require__) {
        "use strict";
        var map_1 = __webpack_require__("9omE");
        function map(project, thisArg) {
            return map_1.map(project, thisArg)(this);
        }
        exports.map = map;
    },
    yrou: function(module, exports, __webpack_require__) {
        "use strict";
        exports.empty = {
            closed: true,
            next: function(value) {},
            error: function(err) {
                throw err;
            },
            complete: function() {}
        };
    }
});