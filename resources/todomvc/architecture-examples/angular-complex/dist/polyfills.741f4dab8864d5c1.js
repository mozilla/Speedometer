"use strict";

(self.webpackChunkangular = self.webpackChunkangular || []).push([ [ 429 ], {
    435: (__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {
        var zone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(583), zone_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(zone_js__WEBPACK_IMPORTED_MODULE_0__);
    },
    583: () => {
        (function(global2) {
            const performance = global2.performance;
            function mark(name) {
                performance && performance.mark && performance.mark(name);
            }
            function performanceMeasure(name, label) {
                performance && performance.measure && performance.measure(name, label);
            }
            mark("Zone");
            const symbolPrefix = global2.__Zone_symbol_prefix || "__zone_symbol__";
            function __symbol__(name) {
                return symbolPrefix + name;
            }
            const checkDuplicate = global2[__symbol__("forceDuplicateZoneCheck")] === !0;
            if (global2.Zone) {
                if (checkDuplicate || typeof global2.Zone.__symbol__ != "function") throw new Error("Zone already loaded.");
                return global2.Zone;
            }
            let Zone2 = (() => {
                class Zone3 {
                    constructor(parent, zoneSpec) {
                        this._parent = parent, this._name = zoneSpec ? zoneSpec.name || "unnamed" : "<root>", 
                        this._properties = zoneSpec && zoneSpec.properties || {}, this._zoneDelegate = new _ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
                    }
                    static assertZonePatched() {
                        if (global2.Promise !== patches.ZoneAwarePromise) throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)");
                    }
                    static get root() {
                        let zone = Zone3.current;
                        for (;zone.parent; ) zone = zone.parent;
                        return zone;
                    }
                    static get current() {
                        return _currentZoneFrame.zone;
                    }
                    static get currentTask() {
                        return _currentTask;
                    }
                    static __load_patch(name, fn, ignoreDuplicate = !1) {
                        if (patches.hasOwnProperty(name)) {
                            if (!ignoreDuplicate && checkDuplicate) throw Error("Already loaded patch: " + name);
                        } else if (!global2["__Zone_disable_" + name]) {
                            const perfName = "Zone:" + name;
                            mark(perfName), patches[name] = fn(global2, Zone3, _api), performanceMeasure(perfName, perfName);
                        }
                    }
                    get parent() {
                        return this._parent;
                    }
                    get name() {
                        return this._name;
                    }
                    get(key) {
                        const zone = this.getZoneWith(key);
                        if (zone) return zone._properties[key];
                    }
                    getZoneWith(key) {
                        let current = this;
                        for (;current; ) {
                            if (current._properties.hasOwnProperty(key)) return current;
                            current = current._parent;
                        }
                        return null;
                    }
                    fork(zoneSpec) {
                        if (!zoneSpec) throw new Error("ZoneSpec required!");
                        return this._zoneDelegate.fork(this, zoneSpec);
                    }
                    wrap(callback, source) {
                        if (typeof callback != "function") throw new Error("Expecting function got: " + callback);
                        const _callback = this._zoneDelegate.intercept(this, callback, source), zone = this;
                        return function() {
                            return zone.runGuarded(_callback, this, arguments, source);
                        };
                    }
                    run(callback, applyThis, applyArgs, source) {
                        _currentZoneFrame = {
                            parent: _currentZoneFrame,
                            zone: this
                        };
                        try {
                            return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                        } finally {
                            _currentZoneFrame = _currentZoneFrame.parent;
                        }
                    }
                    runGuarded(callback, applyThis = null, applyArgs, source) {
                        _currentZoneFrame = {
                            parent: _currentZoneFrame,
                            zone: this
                        };
                        try {
                            try {
                                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                            } catch (error) {
                                if (this._zoneDelegate.handleError(this, error)) throw error;
                            }
                        } finally {
                            _currentZoneFrame = _currentZoneFrame.parent;
                        }
                    }
                    runTask(task, applyThis, applyArgs) {
                        if (task.zone != this) throw new Error("A task can only be run in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
                        if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) return;
                        const reEntryGuard = task.state != running;
                        reEntryGuard && task._transitionTo(running, scheduled), task.runCount++;
                        const previousTask = _currentTask;
                        _currentTask = task, _currentZoneFrame = {
                            parent: _currentZoneFrame,
                            zone: this
                        };
                        try {
                            task.type == macroTask && task.data && !task.data.isPeriodic && (task.cancelFn = void 0);
                            try {
                                return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                            } catch (error) {
                                if (this._zoneDelegate.handleError(this, error)) throw error;
                            }
                        } finally {
                            task.state !== notScheduled && task.state !== unknown && (task.type == eventTask || task.data && task.data.isPeriodic ? reEntryGuard && task._transitionTo(scheduled, running) : (task.runCount = 0, 
                            this._updateTaskCount(task, -1), reEntryGuard && task._transitionTo(notScheduled, running, notScheduled))), 
                            _currentZoneFrame = _currentZoneFrame.parent, _currentTask = previousTask;
                        }
                    }
                    scheduleTask(task) {
                        if (task.zone && task.zone !== this) {
                            let newZone = this;
                            for (;newZone; ) {
                                if (newZone === task.zone) throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${task.zone.name}`);
                                newZone = newZone.parent;
                            }
                        }
                        task._transitionTo(scheduling, notScheduled);
                        const zoneDelegates = [];
                        task._zoneDelegates = zoneDelegates, task._zone = this;
                        try {
                            task = this._zoneDelegate.scheduleTask(this, task);
                        } catch (err) {
                            throw task._transitionTo(unknown, scheduling, notScheduled), this._zoneDelegate.handleError(this, err), 
                            err;
                        }
                        return task._zoneDelegates === zoneDelegates && this._updateTaskCount(task, 1), 
                        task.state == scheduling && task._transitionTo(scheduled, scheduling), task;
                    }
                    scheduleMicroTask(source, callback, data, customSchedule) {
                        return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, void 0));
                    }
                    scheduleMacroTask(source, callback, data, customSchedule, customCancel) {
                        return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
                    }
                    scheduleEventTask(source, callback, data, customSchedule, customCancel) {
                        return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
                    }
                    cancelTask(task) {
                        if (task.zone != this) throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
                        task._transitionTo(canceling, scheduled, running);
                        try {
                            this._zoneDelegate.cancelTask(this, task);
                        } catch (err) {
                            throw task._transitionTo(unknown, canceling), this._zoneDelegate.handleError(this, err), 
                            err;
                        }
                        return this._updateTaskCount(task, -1), task._transitionTo(notScheduled, canceling), 
                        task.runCount = 0, task;
                    }
                    _updateTaskCount(task, count) {
                        const zoneDelegates = task._zoneDelegates;
                        count == -1 && (task._zoneDelegates = null);
                        for (let i = 0; i < zoneDelegates.length; i++) zoneDelegates[i]._updateTaskCount(task.type, count);
                    }
                }
                return Zone3.__symbol__ = __symbol__, Zone3;
            })();
            const DELEGATE_ZS = {
                name: "",
                onHasTask: (delegate, _, target, hasTaskState) => delegate.hasTask(target, hasTaskState),
                onScheduleTask: (delegate, _, target, task) => delegate.scheduleTask(target, task),
                onInvokeTask: (delegate, _, target, task, applyThis, applyArgs) => delegate.invokeTask(target, task, applyThis, applyArgs),
                onCancelTask: (delegate, _, target, task) => delegate.cancelTask(target, task)
            };
            class _ZoneDelegate {
                constructor(zone, parentDelegate, zoneSpec) {
                    this._taskCounts = {
                        microTask: 0,
                        macroTask: 0,
                        eventTask: 0
                    }, this.zone = zone, this._parentDelegate = parentDelegate, this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS), 
                    this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt), 
                    this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate._forkCurrZone), 
                    this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS), 
                    this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt), 
                    this._interceptCurrZone = zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate._interceptCurrZone), 
                    this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS), 
                    this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt), 
                    this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate._invokeCurrZone), 
                    this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS), 
                    this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt), 
                    this._handleErrorCurrZone = zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate._handleErrorCurrZone), 
                    this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS), 
                    this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt), 
                    this._scheduleTaskCurrZone = zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate._scheduleTaskCurrZone), 
                    this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS), 
                    this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt), 
                    this._invokeTaskCurrZone = zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate._invokeTaskCurrZone), 
                    this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS), 
                    this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt), 
                    this._cancelTaskCurrZone = zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate._cancelTaskCurrZone), 
                    this._hasTaskZS = null, this._hasTaskDlgt = null, this._hasTaskDlgtOwner = null, 
                    this._hasTaskCurrZone = null;
                    const zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask, parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
                    (zoneSpecHasTask || parentHasTask) && (this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS, 
                    this._hasTaskDlgt = parentDelegate, this._hasTaskDlgtOwner = this, this._hasTaskCurrZone = zone, 
                    zoneSpec.onScheduleTask || (this._scheduleTaskZS = DELEGATE_ZS, this._scheduleTaskDlgt = parentDelegate, 
                    this._scheduleTaskCurrZone = this.zone), zoneSpec.onInvokeTask || (this._invokeTaskZS = DELEGATE_ZS, 
                    this._invokeTaskDlgt = parentDelegate, this._invokeTaskCurrZone = this.zone), zoneSpec.onCancelTask || (this._cancelTaskZS = DELEGATE_ZS, 
                    this._cancelTaskDlgt = parentDelegate, this._cancelTaskCurrZone = this.zone));
                }
                fork(targetZone, zoneSpec) {
                    return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) : new Zone2(targetZone, zoneSpec);
                }
                intercept(targetZone, callback, source) {
                    return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) : callback;
                }
                invoke(targetZone, callback, applyThis, applyArgs, source) {
                    return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) : callback.apply(applyThis, applyArgs);
                }
                handleError(targetZone, error) {
                    return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) : !0;
                }
                scheduleTask(targetZone, task) {
                    let returnTask = task;
                    if (this._scheduleTaskZS) this._hasTaskZS && returnTask._zoneDelegates.push(this._hasTaskDlgtOwner), 
                    returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task), 
                    returnTask || (returnTask = task); else if (task.scheduleFn) task.scheduleFn(task); else if (task.type == microTask) scheduleMicroTask(task); else throw new Error("Task is missing scheduleFn.");
                    return returnTask;
                }
                invokeTask(targetZone, task, applyThis, applyArgs) {
                    return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) : task.callback.apply(applyThis, applyArgs);
                }
                cancelTask(targetZone, task) {
                    let value;
                    if (this._cancelTaskZS) value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task); else {
                        if (!task.cancelFn) throw Error("Task is not cancelable");
                        value = task.cancelFn(task);
                    }
                    return value;
                }
                hasTask(targetZone, isEmpty) {
                    try {
                        this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
                    } catch (err) {
                        this.handleError(targetZone, err);
                    }
                }
                _updateTaskCount(type, count) {
                    const counts = this._taskCounts, prev = counts[type], next = counts[type] = prev + count;
                    if (next < 0) throw new Error("More tasks executed then were scheduled.");
                    if (prev == 0 || next == 0) {
                        const isEmpty = {
                            microTask: counts.microTask > 0,
                            macroTask: counts.macroTask > 0,
                            eventTask: counts.eventTask > 0,
                            change: type
                        };
                        this.hasTask(this.zone, isEmpty);
                    }
                }
            }
            class ZoneTask {
                constructor(type, source, callback, options, scheduleFn, cancelFn) {
                    if (this._zone = null, this.runCount = 0, this._zoneDelegates = null, this._state = "notScheduled", 
                    this.type = type, this.source = source, this.data = options, this.scheduleFn = scheduleFn, 
                    this.cancelFn = cancelFn, !callback) throw new Error("callback is not defined");
                    this.callback = callback;
                    const self2 = this;
                    type === eventTask && options && options.useG ? this.invoke = ZoneTask.invokeTask : this.invoke = function() {
                        return ZoneTask.invokeTask.call(global2, self2, this, arguments);
                    };
                }
                static invokeTask(task, target, args) {
                    task || (task = this), _numberOfNestedTaskFrames++;
                    try {
                        return task.runCount++, task.zone.runTask(task, target, args);
                    } finally {
                        _numberOfNestedTaskFrames == 1 && drainMicroTaskQueue(), _numberOfNestedTaskFrames--;
                    }
                }
                get zone() {
                    return this._zone;
                }
                get state() {
                    return this._state;
                }
                cancelScheduleRequest() {
                    this._transitionTo(notScheduled, scheduling);
                }
                _transitionTo(toState, fromState1, fromState2) {
                    if (this._state === fromState1 || this._state === fromState2) this._state = toState, 
                    toState == notScheduled && (this._zoneDelegates = null); else throw new Error(`${this.type} '${this.source}': can not transition to '${toState}', expecting state '${fromState1}'${fromState2 ? " or '" + fromState2 + "'" : ""}, was '${this._state}'.`);
                }
                toString() {
                    return this.data && typeof this.data.handleId < "u" ? this.data.handleId.toString() : Object.prototype.toString.call(this);
                }
                toJSON() {
                    return {
                        type: this.type,
                        state: this.state,
                        source: this.source,
                        zone: this.zone.name,
                        runCount: this.runCount
                    };
                }
            }
            const symbolSetTimeout = __symbol__("setTimeout"), symbolPromise = __symbol__("Promise"), symbolThen = __symbol__("then");
            let _microTaskQueue = [], _isDrainingMicrotaskQueue = !1, nativeMicroTaskQueuePromise;
            function nativeScheduleMicroTask(func) {
                if (nativeMicroTaskQueuePromise || global2[symbolPromise] && (nativeMicroTaskQueuePromise = global2[symbolPromise].resolve(0)), 
                nativeMicroTaskQueuePromise) {
                    let nativeThen = nativeMicroTaskQueuePromise[symbolThen];
                    nativeThen || (nativeThen = nativeMicroTaskQueuePromise.then), nativeThen.call(nativeMicroTaskQueuePromise, func);
                } else global2[symbolSetTimeout](func, 0);
            }
            function scheduleMicroTask(task) {
                _numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0 && nativeScheduleMicroTask(drainMicroTaskQueue), 
                task && _microTaskQueue.push(task);
            }
            function drainMicroTaskQueue() {
                if (!_isDrainingMicrotaskQueue) {
                    for (_isDrainingMicrotaskQueue = !0; _microTaskQueue.length; ) {
                        const queue = _microTaskQueue;
                        _microTaskQueue = [];
                        for (let i = 0; i < queue.length; i++) {
                            const task = queue[i];
                            try {
                                task.zone.runTask(task, null, null);
                            } catch (error) {
                                _api.onUnhandledError(error);
                            }
                        }
                    }
                    _api.microtaskDrainDone(), _isDrainingMicrotaskQueue = !1;
                }
            }
            const NO_ZONE = {
                name: "NO ZONE"
            }, notScheduled = "notScheduled", scheduling = "scheduling", scheduled = "scheduled", running = "running", canceling = "canceling", unknown = "unknown", microTask = "microTask", macroTask = "macroTask", eventTask = "eventTask", patches = {}, _api = {
                symbol: __symbol__,
                currentZoneFrame: () => _currentZoneFrame,
                onUnhandledError: noop,
                microtaskDrainDone: noop,
                scheduleMicroTask,
                showUncaughtError: () => !Zone2[__symbol__("ignoreConsoleErrorUncaughtError")],
                patchEventTarget: () => [],
                patchOnProperties: noop,
                patchMethod: () => noop,
                bindArguments: () => [],
                patchThen: () => noop,
                patchMacroTask: () => noop,
                patchEventPrototype: () => noop,
                isIEOrEdge: () => !1,
                getGlobalObjects: () => {},
                ObjectDefineProperty: () => noop,
                ObjectGetOwnPropertyDescriptor: () => {},
                ObjectCreate: () => {},
                ArraySlice: () => [],
                patchClass: () => noop,
                wrapWithCurrentZone: () => noop,
                filterProperties: () => [],
                attachOriginToPatched: () => noop,
                _redefineProperty: () => noop,
                patchCallbacks: () => noop,
                nativeScheduleMicroTask
            };
            let _currentZoneFrame = {
                parent: null,
                zone: new Zone2(null, null)
            }, _currentTask = null, _numberOfNestedTaskFrames = 0;
            function noop() {}
            return performanceMeasure("Zone", "Zone"), global2.Zone = Zone2;
        })(typeof window < "u" && window || typeof self < "u" && self || global);
        const ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, ObjectDefineProperty = Object.defineProperty, ObjectGetPrototypeOf = Object.getPrototypeOf, ObjectCreate = Object.create, ArraySlice = Array.prototype.slice, ADD_EVENT_LISTENER_STR = "addEventListener", REMOVE_EVENT_LISTENER_STR = "removeEventListener", ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR), ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR), TRUE_STR = "true", FALSE_STR = "false", ZONE_SYMBOL_PREFIX = Zone.__symbol__("");
        function wrapWithCurrentZone(callback, source) {
            return Zone.current.wrap(callback, source);
        }
        function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
            return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
        }
        const zoneSymbol = Zone.__symbol__, isWindowExists = typeof window < "u", internalWindow = isWindowExists ? window : void 0, _global = isWindowExists && internalWindow || typeof self == "object" && self || global, REMOVE_ATTRIBUTE = "removeAttribute";
        function bindArguments(args, source) {
            for (let i = args.length - 1; i >= 0; i--) typeof args[i] == "function" && (args[i] = wrapWithCurrentZone(args[i], source + "_" + i));
            return args;
        }
        function patchPrototype(prototype, fnNames) {
            const source = prototype.constructor.name;
            for (let i = 0; i < fnNames.length; i++) {
                const name = fnNames[i], delegate = prototype[name];
                if (delegate) {
                    const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name);
                    if (!isPropertyWritable(prototypeDesc)) continue;
                    prototype[name] = (delegate2 => {
                        const patched = function() {
                            return delegate2.apply(this, bindArguments(arguments, source + "." + name));
                        };
                        return attachOriginToPatched(patched, delegate2), patched;
                    })(delegate);
                }
            }
        }
        function isPropertyWritable(propertyDesc) {
            return propertyDesc ? propertyDesc.writable === !1 ? !1 : !(typeof propertyDesc.get == "function" && typeof propertyDesc.set > "u") : !0;
        }
        const isWebWorker = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope, isNode = !("nw" in _global) && typeof _global.process < "u" && {}.toString.call(_global.process) === "[object process]", isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow.HTMLElement), isMix = typeof _global.process < "u" && {}.toString.call(_global.process) === "[object process]" && !isWebWorker && !!(isWindowExists && internalWindow.HTMLElement), zoneSymbolEventNames$1 = {}, wrapFn = function(event) {
            if (event = event || _global.event, !event) return;
            let eventNameSymbol = zoneSymbolEventNames$1[event.type];
            eventNameSymbol || (eventNameSymbol = zoneSymbolEventNames$1[event.type] = zoneSymbol("ON_PROPERTY" + event.type));
            const target = this || event.target || _global, listener = target[eventNameSymbol];
            let result;
            if (isBrowser && target === internalWindow && event.type === "error") {
                const errorEvent = event;
                result = listener && listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error), 
                result === !0 && event.preventDefault();
            } else result = listener && listener.apply(this, arguments), result != null && !result && event.preventDefault();
            return result;
        };
        function patchProperty(obj, prop, prototype) {
            let desc = ObjectGetOwnPropertyDescriptor(obj, prop);
            if (!desc && prototype && ObjectGetOwnPropertyDescriptor(prototype, prop) && (desc = {
                enumerable: !0,
                configurable: !0
            }), !desc || !desc.configurable) return;
            const onPropPatchedSymbol = zoneSymbol("on" + prop + "patched");
            if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) return;
            delete desc.writable, delete desc.value;
            const originalDescGet = desc.get, originalDescSet = desc.set, eventName = prop.slice(2);
            let eventNameSymbol = zoneSymbolEventNames$1[eventName];
            eventNameSymbol || (eventNameSymbol = zoneSymbolEventNames$1[eventName] = zoneSymbol("ON_PROPERTY" + eventName)), 
            desc.set = function(newValue) {
                let target = this;
                if (!target && obj === _global && (target = _global), !target) return;
                typeof target[eventNameSymbol] == "function" && target.removeEventListener(eventName, wrapFn), 
                originalDescSet && originalDescSet.call(target, null), target[eventNameSymbol] = newValue, 
                typeof newValue == "function" && target.addEventListener(eventName, wrapFn, !1);
            }, desc.get = function() {
                let target = this;
                if (!target && obj === _global && (target = _global), !target) return null;
                const listener = target[eventNameSymbol];
                if (listener) return listener;
                if (originalDescGet) {
                    let value = originalDescGet.call(this);
                    if (value) return desc.set.call(this, value), typeof target[REMOVE_ATTRIBUTE] == "function" && target.removeAttribute(prop), 
                    value;
                }
                return null;
            }, ObjectDefineProperty(obj, prop, desc), obj[onPropPatchedSymbol] = !0;
        }
        function patchOnProperties(obj, properties, prototype) {
            if (properties) for (let i = 0; i < properties.length; i++) patchProperty(obj, "on" + properties[i], prototype); else {
                const onProperties = [];
                for (const prop in obj) prop.slice(0, 2) == "on" && onProperties.push(prop);
                for (let j = 0; j < onProperties.length; j++) patchProperty(obj, onProperties[j], prototype);
            }
        }
        const originalInstanceKey = zoneSymbol("originalInstance");
        function patchClass(className) {
            const OriginalClass = _global[className];
            if (!OriginalClass) return;
            _global[zoneSymbol(className)] = OriginalClass, _global[className] = function() {
                const a = bindArguments(arguments, className);
                switch (a.length) {
                  case 0:
                    this[originalInstanceKey] = new OriginalClass;
                    break;

                  case 1:
                    this[originalInstanceKey] = new OriginalClass(a[0]);
                    break;

                  case 2:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                    break;

                  case 3:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                    break;

                  case 4:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                    break;

                  default:
                    throw new Error("Arg list too long.");
                }
            }, attachOriginToPatched(_global[className], OriginalClass);
            const instance = new OriginalClass(function() {});
            let prop;
            for (prop in instance) className === "XMLHttpRequest" && prop === "responseBlob" || function(prop2) {
                typeof instance[prop2] == "function" ? _global[className].prototype[prop2] = function() {
                    return this[originalInstanceKey][prop2].apply(this[originalInstanceKey], arguments);
                } : ObjectDefineProperty(_global[className].prototype, prop2, {
                    set: function(fn) {
                        typeof fn == "function" ? (this[originalInstanceKey][prop2] = wrapWithCurrentZone(fn, className + "." + prop2), 
                        attachOriginToPatched(this[originalInstanceKey][prop2], fn)) : this[originalInstanceKey][prop2] = fn;
                    },
                    get: function() {
                        return this[originalInstanceKey][prop2];
                    }
                });
            }(prop);
            for (prop in OriginalClass) prop !== "prototype" && OriginalClass.hasOwnProperty(prop) && (_global[className][prop] = OriginalClass[prop]);
        }
        function patchMethod(target, name, patchFn) {
            let proto = target;
            for (;proto && !proto.hasOwnProperty(name); ) proto = ObjectGetPrototypeOf(proto);
            !proto && target[name] && (proto = target);
            const delegateName = zoneSymbol(name);
            let delegate = null;
            if (proto && (!(delegate = proto[delegateName]) || !proto.hasOwnProperty(delegateName))) {
                delegate = proto[delegateName] = proto[name];
                const desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
                if (isPropertyWritable(desc)) {
                    const patchDelegate = patchFn(delegate, delegateName, name);
                    proto[name] = function() {
                        return patchDelegate(this, arguments);
                    }, attachOriginToPatched(proto[name], delegate);
                }
            }
            return delegate;
        }
        function patchMacroTask(obj, funcName, metaCreator) {
            let setNative = null;
            function scheduleTask(task) {
                const data = task.data;
                return data.args[data.cbIdx] = function() {
                    task.invoke.apply(this, arguments);
                }, setNative.apply(data.target, data.args), task;
            }
            setNative = patchMethod(obj, funcName, delegate => function(self2, args) {
                const meta = metaCreator(self2, args);
                return meta.cbIdx >= 0 && typeof args[meta.cbIdx] == "function" ? scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask) : delegate.apply(self2, args);
            });
        }
        function attachOriginToPatched(patched, original) {
            patched[zoneSymbol("OriginalDelegate")] = original;
        }
        let isDetectedIEOrEdge = !1, ieOrEdge = !1;
        function isIE() {
            try {
                const ua = internalWindow.navigator.userAgent;
                if (ua.indexOf("MSIE ") !== -1 || ua.indexOf("Trident/") !== -1) return !0;
            } catch {}
            return !1;
        }
        function isIEOrEdge() {
            if (isDetectedIEOrEdge) return ieOrEdge;
            isDetectedIEOrEdge = !0;
            try {
                const ua = internalWindow.navigator.userAgent;
                (ua.indexOf("MSIE ") !== -1 || ua.indexOf("Trident/") !== -1 || ua.indexOf("Edge/") !== -1) && (ieOrEdge = !0);
            } catch {}
            return ieOrEdge;
        }
        Zone.__load_patch("ZoneAwarePromise", (global2, Zone2, api) => {
            const ObjectGetOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor, ObjectDefineProperty2 = Object.defineProperty;
            function readableObjectToString(obj) {
                if (obj && obj.toString === Object.prototype.toString) {
                    const className = obj.constructor && obj.constructor.name;
                    return (className || "") + ": " + JSON.stringify(obj);
                }
                return obj ? obj.toString() : Object.prototype.toString.call(obj);
            }
            const __symbol__ = api.symbol, _uncaughtPromiseErrors = [], isDisableWrappingUncaughtPromiseRejection = global2[__symbol__("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] === !0, symbolPromise = __symbol__("Promise"), symbolThen = __symbol__("then"), creationTrace = "__creationTrace__";
            api.onUnhandledError = e => {
                if (api.showUncaughtError()) {
                    const rejection = e && e.rejection;
                    rejection ? console.error("Unhandled Promise rejection:", rejection instanceof Error ? rejection.message : rejection, "; Zone:", e.zone.name, "; Task:", e.task && e.task.source, "; Value:", rejection, rejection instanceof Error ? rejection.stack : void 0) : console.error(e);
                }
            }, api.microtaskDrainDone = () => {
                for (;_uncaughtPromiseErrors.length; ) {
                    const uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                    try {
                        uncaughtPromiseError.zone.runGuarded(() => {
                            throw uncaughtPromiseError.throwOriginal ? uncaughtPromiseError.rejection : uncaughtPromiseError;
                        });
                    } catch (error) {
                        handleUnhandledRejection(error);
                    }
                }
            };
            const UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__("unhandledPromiseRejectionHandler");
            function handleUnhandledRejection(e) {
                api.onUnhandledError(e);
                try {
                    const handler = Zone2[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
                    typeof handler == "function" && handler.call(this, e);
                } catch {}
            }
            function isThenable(value) {
                return value && value.then;
            }
            function forwardResolution(value) {
                return value;
            }
            function forwardRejection(rejection) {
                return ZoneAwarePromise.reject(rejection);
            }
            const symbolState = __symbol__("state"), symbolValue = __symbol__("value"), symbolFinally = __symbol__("finally"), symbolParentPromiseValue = __symbol__("parentPromiseValue"), symbolParentPromiseState = __symbol__("parentPromiseState"), source = "Promise.then", UNRESOLVED = null, RESOLVED = !0, REJECTED = !1, REJECTED_NO_CATCH = 0;
            function makeResolver(promise, state) {
                return v => {
                    try {
                        resolvePromise(promise, state, v);
                    } catch (err) {
                        resolvePromise(promise, !1, err);
                    }
                };
            }
            const once = function() {
                let wasCalled = !1;
                return function(wrappedFunction) {
                    return function() {
                        wasCalled || (wasCalled = !0, wrappedFunction.apply(null, arguments));
                    };
                };
            }, TYPE_ERROR = "Promise resolved with itself", CURRENT_TASK_TRACE_SYMBOL = __symbol__("currentTaskTrace");
            function resolvePromise(promise, state, value) {
                const onceWrapper = once();
                if (promise === value) throw new TypeError(TYPE_ERROR);
                if (promise[symbolState] === UNRESOLVED) {
                    let then = null;
                    try {
                        (typeof value == "object" || typeof value == "function") && (then = value && value.then);
                    } catch (err) {
                        return onceWrapper(() => {
                            resolvePromise(promise, !1, err);
                        })(), promise;
                    }
                    if (state !== REJECTED && value instanceof ZoneAwarePromise && value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) && value[symbolState] !== UNRESOLVED) clearRejectedNoCatch(value), 
                    resolvePromise(promise, value[symbolState], value[symbolValue]); else if (state !== REJECTED && typeof then == "function") try {
                        then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, !1)));
                    } catch (err) {
                        onceWrapper(() => {
                            resolvePromise(promise, !1, err);
                        })();
                    } else {
                        promise[symbolState] = state;
                        const queue = promise[symbolValue];
                        if (promise[symbolValue] = value, promise[symbolFinally] === symbolFinally && state === RESOLVED && (promise[symbolState] = promise[symbolParentPromiseState], 
                        promise[symbolValue] = promise[symbolParentPromiseValue]), state === REJECTED && value instanceof Error) {
                            const trace = Zone2.currentTask && Zone2.currentTask.data && Zone2.currentTask.data[creationTrace];
                            trace && ObjectDefineProperty2(value, CURRENT_TASK_TRACE_SYMBOL, {
                                configurable: !0,
                                enumerable: !1,
                                writable: !0,
                                value: trace
                            });
                        }
                        for (let i = 0; i < queue.length; ) scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                        if (queue.length == 0 && state == REJECTED) {
                            promise[symbolState] = REJECTED_NO_CATCH;
                            let uncaughtPromiseError = value;
                            try {
                                throw new Error("Uncaught (in promise): " + readableObjectToString(value) + (value && value.stack ? `\n` + value.stack : ""));
                            } catch (err) {
                                uncaughtPromiseError = err;
                            }
                            isDisableWrappingUncaughtPromiseRejection && (uncaughtPromiseError.throwOriginal = !0), 
                            uncaughtPromiseError.rejection = value, uncaughtPromiseError.promise = promise, 
                            uncaughtPromiseError.zone = Zone2.current, uncaughtPromiseError.task = Zone2.currentTask, 
                            _uncaughtPromiseErrors.push(uncaughtPromiseError), api.scheduleMicroTask();
                        }
                    }
                }
                return promise;
            }
            const REJECTION_HANDLED_HANDLER = __symbol__("rejectionHandledHandler");
            function clearRejectedNoCatch(promise) {
                if (promise[symbolState] === REJECTED_NO_CATCH) {
                    try {
                        const handler = Zone2[REJECTION_HANDLED_HANDLER];
                        handler && typeof handler == "function" && handler.call(this, {
                            rejection: promise[symbolValue],
                            promise
                        });
                    } catch {}
                    promise[symbolState] = REJECTED;
                    for (let i = 0; i < _uncaughtPromiseErrors.length; i++) promise === _uncaughtPromiseErrors[i].promise && _uncaughtPromiseErrors.splice(i, 1);
                }
            }
            function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
                clearRejectedNoCatch(promise);
                const promiseState = promise[symbolState], delegate = promiseState ? typeof onFulfilled == "function" ? onFulfilled : forwardResolution : typeof onRejected == "function" ? onRejected : forwardRejection;
                zone.scheduleMicroTask(source, () => {
                    try {
                        const parentPromiseValue = promise[symbolValue], isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];
                        isFinallyPromise && (chainPromise[symbolParentPromiseValue] = parentPromiseValue, 
                        chainPromise[symbolParentPromiseState] = promiseState);
                        const value = zone.run(delegate, void 0, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ? [] : [ parentPromiseValue ]);
                        resolvePromise(chainPromise, !0, value);
                    } catch (error) {
                        resolvePromise(chainPromise, !1, error);
                    }
                }, chainPromise);
            }
            const ZONE_AWARE_PROMISE_TO_STRING = "function ZoneAwarePromise() { [native code] }", noop = function() {}, AggregateError = global2.AggregateError;
            class ZoneAwarePromise {
                static toString() {
                    return ZONE_AWARE_PROMISE_TO_STRING;
                }
                static resolve(value) {
                    return resolvePromise(new this(null), RESOLVED, value);
                }
                static reject(error) {
                    return resolvePromise(new this(null), REJECTED, error);
                }
                static any(values) {
                    if (!values || typeof values[Symbol.iterator] != "function") return Promise.reject(new AggregateError([], "All promises were rejected"));
                    const promises = [];
                    let count = 0;
                    try {
                        for (let v of values) count++, promises.push(ZoneAwarePromise.resolve(v));
                    } catch {
                        return Promise.reject(new AggregateError([], "All promises were rejected"));
                    }
                    if (count === 0) return Promise.reject(new AggregateError([], "All promises were rejected"));
                    let finished = !1;
                    const errors = [];
                    return new ZoneAwarePromise((resolve, reject) => {
                        for (let i = 0; i < promises.length; i++) promises[i].then(v => {
                            finished || (finished = !0, resolve(v));
                        }, err => {
                            errors.push(err), count--, count === 0 && (finished = !0, reject(new AggregateError(errors, "All promises were rejected")));
                        });
                    });
                }
                static race(values) {
                    let resolve, reject, promise = new this((res, rej) => {
                        resolve = res, reject = rej;
                    });
                    function onResolve(value) {
                        resolve(value);
                    }
                    function onReject(error) {
                        reject(error);
                    }
                    for (let value of values) isThenable(value) || (value = this.resolve(value)), value.then(onResolve, onReject);
                    return promise;
                }
                static all(values) {
                    return ZoneAwarePromise.allWithCallback(values);
                }
                static allSettled(values) {
                    return (this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise).allWithCallback(values, {
                        thenCallback: value => ({
                            status: "fulfilled",
                            value
                        }),
                        errorCallback: err => ({
                            status: "rejected",
                            reason: err
                        })
                    });
                }
                static allWithCallback(values, callback) {
                    let resolve, reject, promise = new this((res, rej) => {
                        resolve = res, reject = rej;
                    }), unresolvedCount = 2, valueIndex = 0;
                    const resolvedValues = [];
                    for (let value of values) {
                        isThenable(value) || (value = this.resolve(value));
                        const curValueIndex = valueIndex;
                        try {
                            value.then(value2 => {
                                resolvedValues[curValueIndex] = callback ? callback.thenCallback(value2) : value2, 
                                unresolvedCount--, unresolvedCount === 0 && resolve(resolvedValues);
                            }, err => {
                                callback ? (resolvedValues[curValueIndex] = callback.errorCallback(err), unresolvedCount--, 
                                unresolvedCount === 0 && resolve(resolvedValues)) : reject(err);
                            });
                        } catch (thenErr) {
                            reject(thenErr);
                        }
                        unresolvedCount++, valueIndex++;
                    }
                    return unresolvedCount -= 2, unresolvedCount === 0 && resolve(resolvedValues), promise;
                }
                constructor(executor) {
                    const promise = this;
                    if (!(promise instanceof ZoneAwarePromise)) throw new Error("Must be an instanceof Promise.");
                    promise[symbolState] = UNRESOLVED, promise[symbolValue] = [];
                    try {
                        const onceWrapper = once();
                        executor && executor(onceWrapper(makeResolver(promise, RESOLVED)), onceWrapper(makeResolver(promise, REJECTED)));
                    } catch (error) {
                        resolvePromise(promise, !1, error);
                    }
                }
                get [Symbol.toStringTag]() {
                    return "Promise";
                }
                get [Symbol.species]() {
                    return ZoneAwarePromise;
                }
                then(onFulfilled, onRejected) {
                    var _a;
                    let C = (_a = this.constructor) === null || _a === void 0 ? void 0 : _a[Symbol.species];
                    (!C || typeof C != "function") && (C = this.constructor || ZoneAwarePromise);
                    const chainPromise = new C(noop), zone = Zone2.current;
                    return this[symbolState] == UNRESOLVED ? this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected) : scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected), 
                    chainPromise;
                }
                catch(onRejected) {
                    return this.then(null, onRejected);
                }
                finally(onFinally) {
                    var _a;
                    let C = (_a = this.constructor) === null || _a === void 0 ? void 0 : _a[Symbol.species];
                    (!C || typeof C != "function") && (C = ZoneAwarePromise);
                    const chainPromise = new C(noop);
                    chainPromise[symbolFinally] = symbolFinally;
                    const zone = Zone2.current;
                    return this[symbolState] == UNRESOLVED ? this[symbolValue].push(zone, chainPromise, onFinally, onFinally) : scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally), 
                    chainPromise;
                }
            }
            ZoneAwarePromise.resolve = ZoneAwarePromise.resolve, ZoneAwarePromise.reject = ZoneAwarePromise.reject, 
            ZoneAwarePromise.race = ZoneAwarePromise.race, ZoneAwarePromise.all = ZoneAwarePromise.all;
            const NativePromise = global2[symbolPromise] = global2.Promise;
            global2.Promise = ZoneAwarePromise;
            const symbolThenPatched = __symbol__("thenPatched");
            function patchThen(Ctor) {
                const proto = Ctor.prototype, prop = ObjectGetOwnPropertyDescriptor2(proto, "then");
                if (prop && (prop.writable === !1 || !prop.configurable)) return;
                const originalThen = proto.then;
                proto[symbolThen] = originalThen, Ctor.prototype.then = function(onResolve, onReject) {
                    return new ZoneAwarePromise((resolve, reject) => {
                        originalThen.call(this, resolve, reject);
                    }).then(onResolve, onReject);
                }, Ctor[symbolThenPatched] = !0;
            }
            api.patchThen = patchThen;
            function zoneify(fn) {
                return function(self2, args) {
                    let resultPromise = fn.apply(self2, args);
                    if (resultPromise instanceof ZoneAwarePromise) return resultPromise;
                    let ctor = resultPromise.constructor;
                    return ctor[symbolThenPatched] || patchThen(ctor), resultPromise;
                };
            }
            return NativePromise && (patchThen(NativePromise), patchMethod(global2, "fetch", delegate => zoneify(delegate))), 
            Promise[Zone2.__symbol__("uncaughtPromiseErrors")] = _uncaughtPromiseErrors, ZoneAwarePromise;
        });
        Zone.__load_patch("toString", global2 => {
            const originalFunctionToString = Function.prototype.toString, ORIGINAL_DELEGATE_SYMBOL = zoneSymbol("OriginalDelegate"), PROMISE_SYMBOL = zoneSymbol("Promise"), ERROR_SYMBOL = zoneSymbol("Error"), newFunctionToString = function() {
                if (typeof this == "function") {
                    const originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
                    if (originalDelegate) return typeof originalDelegate == "function" ? originalFunctionToString.call(originalDelegate) : Object.prototype.toString.call(originalDelegate);
                    if (this === Promise) {
                        const nativePromise = global2[PROMISE_SYMBOL];
                        if (nativePromise) return originalFunctionToString.call(nativePromise);
                    }
                    if (this === Error) {
                        const nativeError = global2[ERROR_SYMBOL];
                        if (nativeError) return originalFunctionToString.call(nativeError);
                    }
                }
                return originalFunctionToString.call(this);
            };
            newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString, Function.prototype.toString = newFunctionToString;
            const originalObjectToString = Object.prototype.toString, PROMISE_OBJECT_TO_STRING = "[object Promise]";
            Object.prototype.toString = function() {
                return typeof Promise == "function" && this instanceof Promise ? PROMISE_OBJECT_TO_STRING : originalObjectToString.call(this);
            };
        });
        let passiveSupported = !1;
        if (typeof window < "u") try {
            const options = Object.defineProperty({}, "passive", {
                get: function() {
                    passiveSupported = !0;
                }
            });
            window.addEventListener("test", options, options), window.removeEventListener("test", options, options);
        } catch {
            passiveSupported = !1;
        }
        const OPTIMIZED_ZONE_EVENT_TASK_DATA = {
            useG: !0
        }, zoneSymbolEventNames = {}, globalSources = {}, EVENT_NAME_SYMBOL_REGX = new RegExp("^" + ZONE_SYMBOL_PREFIX + "(\\w+)(true|false)$"), IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol("propagationStopped");
        function prepareEventNames(eventName, eventNameToString) {
            const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR, trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR, symbol = ZONE_SYMBOL_PREFIX + falseEventName, symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
            zoneSymbolEventNames[eventName] = {}, zoneSymbolEventNames[eventName][FALSE_STR] = symbol, 
            zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
        }
        function patchEventTarget(_global2, api, apis, patchOptions) {
            const ADD_EVENT_LISTENER = patchOptions && patchOptions.add || ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER = patchOptions && patchOptions.rm || REMOVE_EVENT_LISTENER_STR, LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.listeners || "eventListeners", REMOVE_ALL_LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.rmAll || "removeAllListeners", zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER), ADD_EVENT_LISTENER_SOURCE = "." + ADD_EVENT_LISTENER + ":", PREPEND_EVENT_LISTENER = "prependListener", PREPEND_EVENT_LISTENER_SOURCE = "." + PREPEND_EVENT_LISTENER + ":", invokeTask = function(task, target, event) {
                if (task.isRemoved) return;
                const delegate = task.callback;
                typeof delegate == "object" && delegate.handleEvent && (task.callback = event2 => delegate.handleEvent(event2), 
                task.originalDelegate = delegate);
                let error;
                try {
                    task.invoke(task, target, [ event ]);
                } catch (err) {
                    error = err;
                }
                const options = task.options;
                if (options && typeof options == "object" && options.once) {
                    const delegate2 = task.originalDelegate ? task.originalDelegate : task.callback;
                    target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate2, options);
                }
                return error;
            };
            function globalCallback(context, event, isCapture) {
                if (event = event || _global2.event, !event) return;
                const target = context || event.target || _global2, tasks = target[zoneSymbolEventNames[event.type][isCapture ? TRUE_STR : FALSE_STR]];
                if (tasks) {
                    const errors = [];
                    if (tasks.length === 1) {
                        const err = invokeTask(tasks[0], target, event);
                        err && errors.push(err);
                    } else {
                        const copyTasks = tasks.slice();
                        for (let i = 0; i < copyTasks.length && !(event && event[IMMEDIATE_PROPAGATION_SYMBOL] === !0); i++) {
                            const err = invokeTask(copyTasks[i], target, event);
                            err && errors.push(err);
                        }
                    }
                    if (errors.length === 1) throw errors[0];
                    for (let i = 0; i < errors.length; i++) {
                        const err = errors[i];
                        api.nativeScheduleMicroTask(() => {
                            throw err;
                        });
                    }
                }
            }
            const globalZoneAwareCallback = function(event) {
                return globalCallback(this, event, !1);
            }, globalZoneAwareCaptureCallback = function(event) {
                return globalCallback(this, event, !0);
            };
            function patchEventTargetMethods(obj, patchOptions2) {
                if (!obj) return !1;
                let useGlobalCallback = !0;
                patchOptions2 && patchOptions2.useG !== void 0 && (useGlobalCallback = patchOptions2.useG);
                const validateHandler = patchOptions2 && patchOptions2.vh;
                let checkDuplicate = !0;
                patchOptions2 && patchOptions2.chkDup !== void 0 && (checkDuplicate = patchOptions2.chkDup);
                let returnTarget = !1;
                patchOptions2 && patchOptions2.rt !== void 0 && (returnTarget = patchOptions2.rt);
                let proto = obj;
                for (;proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER); ) proto = ObjectGetPrototypeOf(proto);
                if (!proto && obj[ADD_EVENT_LISTENER] && (proto = obj), !proto || proto[zoneSymbolAddEventListener]) return !1;
                const eventNameToString = patchOptions2 && patchOptions2.eventNameToString, taskData = {}, nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER], nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] = proto[REMOVE_EVENT_LISTENER], nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] = proto[LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] = proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
                let nativePrependEventListener;
                patchOptions2 && patchOptions2.prepend && (nativePrependEventListener = proto[zoneSymbol(patchOptions2.prepend)] = proto[patchOptions2.prepend]);
                function buildEventListenerOptions(options, passive) {
                    return !passiveSupported && typeof options == "object" && options ? !!options.capture : !passiveSupported || !passive ? options : typeof options == "boolean" ? {
                        capture: options,
                        passive: !0
                    } : options ? typeof options == "object" && options.passive !== !1 ? Object.assign(Object.assign({}, options), {
                        passive: !0
                    }) : options : {
                        passive: !0
                    };
                }
                const customScheduleGlobal = function(task) {
                    if (!taskData.isExisting) return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
                }, customCancelGlobal = function(task) {
                    if (!task.isRemoved) {
                        const symbolEventNames = zoneSymbolEventNames[task.eventName];
                        let symbolEventName;
                        symbolEventNames && (symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR]);
                        const existingTasks = symbolEventName && task.target[symbolEventName];
                        if (existingTasks) {
                            for (let i = 0; i < existingTasks.length; i++) if (existingTasks[i] === task) {
                                existingTasks.splice(i, 1), task.isRemoved = !0, existingTasks.length === 0 && (task.allRemoved = !0, 
                                task.target[symbolEventName] = null);
                                break;
                            }
                        }
                    }
                    if (!!task.allRemoved) return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
                }, customScheduleNonGlobal = function(task) {
                    return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
                }, customSchedulePrepend = function(task) {
                    return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
                }, customCancelNonGlobal = function(task) {
                    return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
                }, customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal, customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal, compareTaskCallbackVsDelegate = function(task, delegate) {
                    const typeOfDelegate = typeof delegate;
                    return typeOfDelegate === "function" && task.callback === delegate || typeOfDelegate === "object" && task.originalDelegate === delegate;
                }, compare = patchOptions2 && patchOptions2.diff ? patchOptions2.diff : compareTaskCallbackVsDelegate, unpatchedEvents = Zone[zoneSymbol("UNPATCHED_EVENTS")], passiveEvents = _global2[zoneSymbol("PASSIVE_EVENTS")], makeAddListener = function(nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget2 = !1, prepend = !1) {
                    return function() {
                        const target = this || _global2;
                        let eventName = arguments[0];
                        patchOptions2 && patchOptions2.transferEventName && (eventName = patchOptions2.transferEventName(eventName));
                        let delegate = arguments[1];
                        if (!delegate) return nativeListener.apply(this, arguments);
                        if (isNode && eventName === "uncaughtException") return nativeListener.apply(this, arguments);
                        let isHandleEvent = !1;
                        if (typeof delegate != "function") {
                            if (!delegate.handleEvent) return nativeListener.apply(this, arguments);
                            isHandleEvent = !0;
                        }
                        if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) return;
                        const passive = passiveSupported && !!passiveEvents && passiveEvents.indexOf(eventName) !== -1, options = buildEventListenerOptions(arguments[2], passive);
                        if (unpatchedEvents) {
                            for (let i = 0; i < unpatchedEvents.length; i++) if (eventName === unpatchedEvents[i]) return passive ? nativeListener.call(target, eventName, delegate, options) : nativeListener.apply(this, arguments);
                        }
                        const capture = options ? typeof options == "boolean" ? !0 : options.capture : !1, once = options && typeof options == "object" ? options.once : !1, zone = Zone.current;
                        let symbolEventNames = zoneSymbolEventNames[eventName];
                        symbolEventNames || (prepareEventNames(eventName, eventNameToString), symbolEventNames = zoneSymbolEventNames[eventName]);
                        const symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                        let existingTasks = target[symbolEventName], isExisting = !1;
                        if (existingTasks) {
                            if (isExisting = !0, checkDuplicate) {
                                for (let i = 0; i < existingTasks.length; i++) if (compare(existingTasks[i], delegate)) return;
                            }
                        } else existingTasks = target[symbolEventName] = [];
                        let source;
                        const constructorName = target.constructor.name, targetSource = globalSources[constructorName];
                        targetSource && (source = targetSource[eventName]), source || (source = constructorName + addSource + (eventNameToString ? eventNameToString(eventName) : eventName)), 
                        taskData.options = options, once && (taskData.options.once = !1), taskData.target = target, 
                        taskData.capture = capture, taskData.eventName = eventName, taskData.isExisting = isExisting;
                        const data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : void 0;
                        data && (data.taskData = taskData);
                        const task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                        if (taskData.target = null, data && (data.taskData = null), once && (options.once = !0), 
                        !passiveSupported && typeof task.options == "boolean" || (task.options = options), 
                        task.target = target, task.capture = capture, task.eventName = eventName, isHandleEvent && (task.originalDelegate = delegate), 
                        prepend ? existingTasks.unshift(task) : existingTasks.push(task), returnTarget2) return target;
                    };
                };
                return proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget), 
                nativePrependEventListener && (proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, !0)), 
                proto[REMOVE_EVENT_LISTENER] = function() {
                    const target = this || _global2;
                    let eventName = arguments[0];
                    patchOptions2 && patchOptions2.transferEventName && (eventName = patchOptions2.transferEventName(eventName));
                    const options = arguments[2], capture = options ? typeof options == "boolean" ? !0 : options.capture : !1, delegate = arguments[1];
                    if (!delegate) return nativeRemoveEventListener.apply(this, arguments);
                    if (validateHandler && !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) return;
                    const symbolEventNames = zoneSymbolEventNames[eventName];
                    let symbolEventName;
                    symbolEventNames && (symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR]);
                    const existingTasks = symbolEventName && target[symbolEventName];
                    if (existingTasks) for (let i = 0; i < existingTasks.length; i++) {
                        const existingTask = existingTasks[i];
                        if (compare(existingTask, delegate)) {
                            if (existingTasks.splice(i, 1), existingTask.isRemoved = !0, existingTasks.length === 0 && (existingTask.allRemoved = !0, 
                            target[symbolEventName] = null, typeof eventName == "string")) {
                                const onPropertySymbol = ZONE_SYMBOL_PREFIX + "ON_PROPERTY" + eventName;
                                target[onPropertySymbol] = null;
                            }
                            return existingTask.zone.cancelTask(existingTask), returnTarget ? target : void 0;
                        }
                    }
                    return nativeRemoveEventListener.apply(this, arguments);
                }, proto[LISTENERS_EVENT_LISTENER] = function() {
                    const target = this || _global2;
                    let eventName = arguments[0];
                    patchOptions2 && patchOptions2.transferEventName && (eventName = patchOptions2.transferEventName(eventName));
                    const listeners = [], tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
                    for (let i = 0; i < tasks.length; i++) {
                        const task = tasks[i];
                        let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                        listeners.push(delegate);
                    }
                    return listeners;
                }, proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function() {
                    const target = this || _global2;
                    let eventName = arguments[0];
                    if (eventName) {
                        patchOptions2 && patchOptions2.transferEventName && (eventName = patchOptions2.transferEventName(eventName));
                        const symbolEventNames = zoneSymbolEventNames[eventName];
                        if (symbolEventNames) {
                            const symbolEventName = symbolEventNames[FALSE_STR], symbolCaptureEventName = symbolEventNames[TRUE_STR], tasks = target[symbolEventName], captureTasks = target[symbolCaptureEventName];
                            if (tasks) {
                                const removeTasks = tasks.slice();
                                for (let i = 0; i < removeTasks.length; i++) {
                                    const task = removeTasks[i];
                                    let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                                    this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                                }
                            }
                            if (captureTasks) {
                                const removeTasks = captureTasks.slice();
                                for (let i = 0; i < removeTasks.length; i++) {
                                    const task = removeTasks[i];
                                    let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                                    this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                                }
                            }
                        }
                    } else {
                        const keys = Object.keys(target);
                        for (let i = 0; i < keys.length; i++) {
                            const prop = keys[i], match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                            let evtName = match && match[1];
                            evtName && evtName !== "removeListener" && this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                        }
                        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, "removeListener");
                    }
                    if (returnTarget) return this;
                }, attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener), attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener), 
                nativeRemoveAllListeners && attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners), 
                nativeListeners && attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners), 
                !0;
            }
            let results = [];
            for (let i = 0; i < apis.length; i++) results[i] = patchEventTargetMethods(apis[i], patchOptions);
            return results;
        }
        function findEventTasks(target, eventName) {
            if (!eventName) {
                const foundTasks = [];
                for (let prop in target) {
                    const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                    let evtName = match && match[1];
                    if (evtName && (!eventName || evtName === eventName)) {
                        const tasks = target[prop];
                        if (tasks) for (let i = 0; i < tasks.length; i++) foundTasks.push(tasks[i]);
                    }
                }
                return foundTasks;
            }
            let symbolEventName = zoneSymbolEventNames[eventName];
            symbolEventName || (prepareEventNames(eventName), symbolEventName = zoneSymbolEventNames[eventName]);
            const captureFalseTasks = target[symbolEventName[FALSE_STR]], captureTrueTasks = target[symbolEventName[TRUE_STR]];
            return captureFalseTasks ? captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) : captureFalseTasks.slice() : captureTrueTasks ? captureTrueTasks.slice() : [];
        }
        function patchEventPrototype(global2, api) {
            const Event = global2.Event;
            Event && Event.prototype && api.patchMethod(Event.prototype, "stopImmediatePropagation", delegate => function(self2, args) {
                self2[IMMEDIATE_PROPAGATION_SYMBOL] = !0, delegate && delegate.apply(self2, args);
            });
        }
        function patchCallbacks(api, target, targetName, method, callbacks) {
            const symbol = Zone.__symbol__(method);
            if (target[symbol]) return;
            const nativeDelegate = target[symbol] = target[method];
            target[method] = function(name, opts, options) {
                return opts && opts.prototype && callbacks.forEach(function(callback) {
                    const source = `${targetName}.${method}::` + callback, prototype = opts.prototype;
                    try {
                        if (prototype.hasOwnProperty(callback)) {
                            const descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
                            descriptor && descriptor.value ? (descriptor.value = api.wrapWithCurrentZone(descriptor.value, source), 
                            api._redefineProperty(opts.prototype, callback, descriptor)) : prototype[callback] && (prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source));
                        } else prototype[callback] && (prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source));
                    } catch {}
                }), nativeDelegate.call(target, name, opts, options);
            }, api.attachOriginToPatched(target[method], nativeDelegate);
        }
        function filterProperties(target, onProperties, ignoreProperties) {
            if (!ignoreProperties || ignoreProperties.length === 0) return onProperties;
            const tip = ignoreProperties.filter(ip => ip.target === target);
            if (!tip || tip.length === 0) return onProperties;
            const targetIgnoreProperties = tip[0].ignoreProperties;
            return onProperties.filter(op => targetIgnoreProperties.indexOf(op) === -1);
        }
        function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
            if (!target) return;
            const filteredProperties = filterProperties(target, onProperties, ignoreProperties);
            patchOnProperties(target, filteredProperties, prototype);
        }
        function getOnEventNames(target) {
            return Object.getOwnPropertyNames(target).filter(name => name.startsWith("on") && name.length > 2).map(name => name.substring(2));
        }
        function propertyDescriptorPatch(api, _global2) {
            if (isNode && !isMix || Zone[api.symbol("patchEvents")]) return;
            const ignoreProperties = _global2.__Zone_ignore_on_properties;
            let patchTargets = [];
            if (isBrowser) {
                const internalWindow2 = window;
                patchTargets = patchTargets.concat([ "Document", "SVGElement", "Element", "HTMLElement", "HTMLBodyElement", "HTMLMediaElement", "HTMLFrameSetElement", "HTMLFrameElement", "HTMLIFrameElement", "HTMLMarqueeElement", "Worker" ]);
                const ignoreErrorProperties = isIE() ? [ {
                    target: internalWindow2,
                    ignoreProperties: [ "error" ]
                } ] : [];
                patchFilteredProperties(internalWindow2, getOnEventNames(internalWindow2), ignoreProperties && ignoreProperties.concat(ignoreErrorProperties), ObjectGetPrototypeOf(internalWindow2));
            }
            patchTargets = patchTargets.concat([ "XMLHttpRequest", "XMLHttpRequestEventTarget", "IDBIndex", "IDBRequest", "IDBOpenDBRequest", "IDBDatabase", "IDBTransaction", "IDBCursor", "WebSocket" ]);
            for (let i = 0; i < patchTargets.length; i++) {
                const target = _global2[patchTargets[i]];
                target && target.prototype && patchFilteredProperties(target.prototype, getOnEventNames(target.prototype), ignoreProperties);
            }
        }
        Zone.__load_patch("util", (global2, Zone2, api) => {
            const eventNames = getOnEventNames(global2);
            api.patchOnProperties = patchOnProperties, api.patchMethod = patchMethod, api.bindArguments = bindArguments, 
            api.patchMacroTask = patchMacroTask;
            const SYMBOL_BLACK_LISTED_EVENTS = Zone2.__symbol__("BLACK_LISTED_EVENTS"), SYMBOL_UNPATCHED_EVENTS = Zone2.__symbol__("UNPATCHED_EVENTS");
            global2[SYMBOL_UNPATCHED_EVENTS] && (global2[SYMBOL_BLACK_LISTED_EVENTS] = global2[SYMBOL_UNPATCHED_EVENTS]), 
            global2[SYMBOL_BLACK_LISTED_EVENTS] && (Zone2[SYMBOL_BLACK_LISTED_EVENTS] = Zone2[SYMBOL_UNPATCHED_EVENTS] = global2[SYMBOL_BLACK_LISTED_EVENTS]), 
            api.patchEventPrototype = patchEventPrototype, api.patchEventTarget = patchEventTarget, 
            api.isIEOrEdge = isIEOrEdge, api.ObjectDefineProperty = ObjectDefineProperty, api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor, 
            api.ObjectCreate = ObjectCreate, api.ArraySlice = ArraySlice, api.patchClass = patchClass, 
            api.wrapWithCurrentZone = wrapWithCurrentZone, api.filterProperties = filterProperties, 
            api.attachOriginToPatched = attachOriginToPatched, api._redefineProperty = Object.defineProperty, 
            api.patchCallbacks = patchCallbacks, api.getGlobalObjects = () => ({
                globalSources,
                zoneSymbolEventNames,
                eventNames,
                isBrowser,
                isMix,
                isNode,
                TRUE_STR,
                FALSE_STR,
                ZONE_SYMBOL_PREFIX,
                ADD_EVENT_LISTENER_STR,
                REMOVE_EVENT_LISTENER_STR
            });
        });
        const taskSymbol = zoneSymbol("zoneTask");
        function patchTimer(window2, setName, cancelName, nameSuffix) {
            let setNative = null, clearNative = null;
            setName += nameSuffix, cancelName += nameSuffix;
            const tasksByHandleId = {};
            function scheduleTask(task) {
                const data = task.data;
                return data.args[0] = function() {
                    return task.invoke.apply(this, arguments);
                }, data.handleId = setNative.apply(window2, data.args), task;
            }
            function clearTask(task) {
                return clearNative.call(window2, task.data.handleId);
            }
            setNative = patchMethod(window2, setName, delegate => function(self2, args) {
                if (typeof args[0] == "function") {
                    const options = {
                        isPeriodic: nameSuffix === "Interval",
                        delay: nameSuffix === "Timeout" || nameSuffix === "Interval" ? args[1] || 0 : void 0,
                        args
                    }, callback = args[0];
                    args[0] = function() {
                        try {
                            return callback.apply(this, arguments);
                        } finally {
                            options.isPeriodic || (typeof options.handleId == "number" ? delete tasksByHandleId[options.handleId] : options.handleId && (options.handleId[taskSymbol] = null));
                        }
                    };
                    const task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
                    if (!task) return task;
                    const handle = task.data.handleId;
                    return typeof handle == "number" ? tasksByHandleId[handle] = task : handle && (handle[taskSymbol] = task), 
                    handle && handle.ref && handle.unref && typeof handle.ref == "function" && typeof handle.unref == "function" && (task.ref = handle.ref.bind(handle), 
                    task.unref = handle.unref.bind(handle)), typeof handle == "number" || handle ? handle : task;
                } else return delegate.apply(window2, args);
            }), clearNative = patchMethod(window2, cancelName, delegate => function(self2, args) {
                const id = args[0];
                let task;
                typeof id == "number" ? task = tasksByHandleId[id] : (task = id && id[taskSymbol], 
                task || (task = id)), task && typeof task.type == "string" ? task.state !== "notScheduled" && (task.cancelFn && task.data.isPeriodic || task.runCount === 0) && (typeof id == "number" ? delete tasksByHandleId[id] : id && (id[taskSymbol] = null), 
                task.zone.cancelTask(task)) : delegate.apply(window2, args);
            });
        }
        function patchCustomElements(_global2, api) {
            const {isBrowser: isBrowser2, isMix: isMix2} = api.getGlobalObjects();
            if (!isBrowser2 && !isMix2 || !_global2.customElements || !("customElements" in _global2)) return;
            const callbacks = [ "connectedCallback", "disconnectedCallback", "adoptedCallback", "attributeChangedCallback" ];
            api.patchCallbacks(api, _global2.customElements, "customElements", "define", callbacks);
        }
        function eventTargetPatch(_global2, api) {
            if (Zone[api.symbol("patchEventTarget")]) return;
            const {eventNames, zoneSymbolEventNames: zoneSymbolEventNames2, TRUE_STR: TRUE_STR2, FALSE_STR: FALSE_STR2, ZONE_SYMBOL_PREFIX: ZONE_SYMBOL_PREFIX2} = api.getGlobalObjects();
            for (let i = 0; i < eventNames.length; i++) {
                const eventName = eventNames[i], falseEventName = eventName + FALSE_STR2, trueEventName = eventName + TRUE_STR2, symbol = ZONE_SYMBOL_PREFIX2 + falseEventName, symbolCapture = ZONE_SYMBOL_PREFIX2 + trueEventName;
                zoneSymbolEventNames2[eventName] = {}, zoneSymbolEventNames2[eventName][FALSE_STR2] = symbol, 
                zoneSymbolEventNames2[eventName][TRUE_STR2] = symbolCapture;
            }
            const EVENT_TARGET = _global2.EventTarget;
            if (!(!EVENT_TARGET || !EVENT_TARGET.prototype)) return api.patchEventTarget(_global2, api, [ EVENT_TARGET && EVENT_TARGET.prototype ]), 
            !0;
        }
        function patchEvent(global2, api) {
            api.patchEventPrototype(global2, api);
        }
        Zone.__load_patch("legacy", global2 => {
            const legacyPatch = global2[Zone.__symbol__("legacyPatch")];
            legacyPatch && legacyPatch();
        }), Zone.__load_patch("queueMicrotask", (global2, Zone2, api) => {
            api.patchMethod(global2, "queueMicrotask", delegate => function(self2, args) {
                Zone2.current.scheduleMicroTask("queueMicrotask", args[0]);
            });
        }), Zone.__load_patch("timers", global2 => {
            const set = "set", clear = "clear";
            patchTimer(global2, set, clear, "Timeout"), patchTimer(global2, set, clear, "Interval"), 
            patchTimer(global2, set, clear, "Immediate");
        }), Zone.__load_patch("requestAnimationFrame", global2 => {
            patchTimer(global2, "request", "cancel", "AnimationFrame"), patchTimer(global2, "mozRequest", "mozCancel", "AnimationFrame"), 
            patchTimer(global2, "webkitRequest", "webkitCancel", "AnimationFrame");
        }), Zone.__load_patch("blocking", (global2, Zone2) => {
            const blockingMethods = [ "alert", "prompt", "confirm" ];
            for (let i = 0; i < blockingMethods.length; i++) {
                const name = blockingMethods[i];
                patchMethod(global2, name, (delegate, symbol, name2) => function(s, args) {
                    return Zone2.current.run(delegate, global2, args, name2);
                });
            }
        }), Zone.__load_patch("EventTarget", (global2, Zone2, api) => {
            patchEvent(global2, api), eventTargetPatch(global2, api);
            const XMLHttpRequestEventTarget = global2.XMLHttpRequestEventTarget;
            XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype && api.patchEventTarget(global2, api, [ XMLHttpRequestEventTarget.prototype ]);
        }), Zone.__load_patch("MutationObserver", (global2, Zone2, api) => {
            patchClass("MutationObserver"), patchClass("WebKitMutationObserver");
        }), Zone.__load_patch("IntersectionObserver", (global2, Zone2, api) => {
            patchClass("IntersectionObserver");
        }), Zone.__load_patch("FileReader", (global2, Zone2, api) => {
            patchClass("FileReader");
        }), Zone.__load_patch("on_property", (global2, Zone2, api) => {
            propertyDescriptorPatch(api, global2);
        }), Zone.__load_patch("customElements", (global2, Zone2, api) => {
            patchCustomElements(global2, api);
        }), Zone.__load_patch("XHR", (global2, Zone2) => {
            patchXHR(global2);
            const XHR_TASK = zoneSymbol("xhrTask"), XHR_SYNC = zoneSymbol("xhrSync"), XHR_LISTENER = zoneSymbol("xhrListener"), XHR_SCHEDULED = zoneSymbol("xhrScheduled"), XHR_URL = zoneSymbol("xhrURL"), XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol("xhrErrorBeforeScheduled");
            function patchXHR(window2) {
                const XMLHttpRequest = window2.XMLHttpRequest;
                if (!XMLHttpRequest) return;
                const XMLHttpRequestPrototype = XMLHttpRequest.prototype;
                function findPendingTask(target) {
                    return target[XHR_TASK];
                }
                let oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER], oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
                if (!oriAddListener) {
                    const XMLHttpRequestEventTarget = window2.XMLHttpRequestEventTarget;
                    if (XMLHttpRequestEventTarget) {
                        const XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
                        oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER], 
                        oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
                    }
                }
                const READY_STATE_CHANGE = "readystatechange", SCHEDULED = "scheduled";
                function scheduleTask(task) {
                    const data = task.data, target = data.target;
                    target[XHR_SCHEDULED] = !1, target[XHR_ERROR_BEFORE_SCHEDULED] = !1;
                    const listener = target[XHR_LISTENER];
                    oriAddListener || (oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER], oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER]), 
                    listener && oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
                    const newListener = target[XHR_LISTENER] = () => {
                        if (target.readyState === target.DONE) if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
                            const loadTasks = target[Zone2.__symbol__("loadfalse")];
                            if (target.status !== 0 && loadTasks && loadTasks.length > 0) {
                                const oriInvoke = task.invoke;
                                task.invoke = function() {
                                    const loadTasks2 = target[Zone2.__symbol__("loadfalse")];
                                    for (let i = 0; i < loadTasks2.length; i++) loadTasks2[i] === task && loadTasks2.splice(i, 1);
                                    !data.aborted && task.state === SCHEDULED && oriInvoke.call(task);
                                }, loadTasks.push(task);
                            } else task.invoke();
                        } else !data.aborted && target[XHR_SCHEDULED] === !1 && (target[XHR_ERROR_BEFORE_SCHEDULED] = !0);
                    };
                    return oriAddListener.call(target, READY_STATE_CHANGE, newListener), target[XHR_TASK] || (target[XHR_TASK] = task), 
                    sendNative.apply(target, data.args), target[XHR_SCHEDULED] = !0, task;
                }
                function placeholderCallback() {}
                function clearTask(task) {
                    const data = task.data;
                    return data.aborted = !0, abortNative.apply(data.target, data.args);
                }
                const openNative = patchMethod(XMLHttpRequestPrototype, "open", () => function(self2, args) {
                    return self2[XHR_SYNC] = args[2] == !1, self2[XHR_URL] = args[1], openNative.apply(self2, args);
                }), XMLHTTPREQUEST_SOURCE = "XMLHttpRequest.send", fetchTaskAborting = zoneSymbol("fetchTaskAborting"), fetchTaskScheduling = zoneSymbol("fetchTaskScheduling"), sendNative = patchMethod(XMLHttpRequestPrototype, "send", () => function(self2, args) {
                    if (Zone2.current[fetchTaskScheduling] === !0 || self2[XHR_SYNC]) return sendNative.apply(self2, args);
                    {
                        const options = {
                            target: self2,
                            url: self2[XHR_URL],
                            isPeriodic: !1,
                            args,
                            aborted: !1
                        }, task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
                        self2 && self2[XHR_ERROR_BEFORE_SCHEDULED] === !0 && !options.aborted && task.state === SCHEDULED && task.invoke();
                    }
                }), abortNative = patchMethod(XMLHttpRequestPrototype, "abort", () => function(self2, args) {
                    const task = findPendingTask(self2);
                    if (task && typeof task.type == "string") {
                        if (task.cancelFn == null || task.data && task.data.aborted) return;
                        task.zone.cancelTask(task);
                    } else if (Zone2.current[fetchTaskAborting] === !0) return abortNative.apply(self2, args);
                });
            }
        }), Zone.__load_patch("geolocation", global2 => {
            global2.navigator && global2.navigator.geolocation && patchPrototype(global2.navigator.geolocation, [ "getCurrentPosition", "watchPosition" ]);
        }), Zone.__load_patch("PromiseRejectionEvent", (global2, Zone2) => {
            function findPromiseRejectionHandler(evtName) {
                return function(e) {
                    findEventTasks(global2, evtName).forEach(eventTask => {
                        const PromiseRejectionEvent = global2.PromiseRejectionEvent;
                        if (PromiseRejectionEvent) {
                            const evt = new PromiseRejectionEvent(evtName, {
                                promise: e.promise,
                                reason: e.rejection
                            });
                            eventTask.invoke(evt);
                        }
                    });
                };
            }
            global2.PromiseRejectionEvent && (Zone2[zoneSymbol("unhandledPromiseRejectionHandler")] = findPromiseRejectionHandler("unhandledrejection"), 
            Zone2[zoneSymbol("rejectionHandledHandler")] = findPromiseRejectionHandler("rejectionhandled"));
        });
    }
}, __webpack_require__ => {
    var __webpack_exec__ = moduleId => __webpack_require__(__webpack_require__.s = moduleId), __webpack_exports__ = __webpack_exec__(435);
} ]);