function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction(
  (str) => str.charAt(0).toUpperCase() + str.slice(1)
);
const toHandlerKey = cacheStringFunction(
  (str) => str ? `on${capitalize(str)}` : ``
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
let _globalThis$2;
const getGlobalThis = () => {
  return _globalThis$2 || (_globalThis$2 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    trackEffects(dep);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray$1(dep) ? dep : [...dep];
  for (const effect2 of effects) {
    if (effect2.computed) {
      triggerEffect(effect2);
    }
  }
  for (const effect2 of effects) {
    if (!effect2.computed) {
      triggerEffect(effect2);
    }
  }
}
function triggerEffect(effect2, debuggerEventExtraInfo) {
  if (effect2 !== activeEffect || effect2.allowRecurse) {
    if (effect2.scheduler) {
      effect2.scheduler();
    } else {
      effect2.run();
    }
  }
}
function getDepFromReactive(object, key) {
  var _a;
  return (_a = targetMap.get(object)) == null ? void 0 : _a.get(key);
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend(
  {},
  mutableHandlers,
  {
    get: shallowGet,
    set: shallowSet
  }
);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(
      method,
      false,
      false
    );
    readonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      false
    );
    shallowInstrumentations2[method] = createIterableMethod(
      method,
      false,
      true
    );
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep);
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
class GetterRefImpl {
  constructor(_getter) {
    this._getter = _getter;
    this.__v_isRef = true;
    this.__v_isReadonly = true;
  }
  get value() {
    return this._getter();
  }
}
function toRef(source, key, defaultValue) {
  if (isRef(source)) {
    return source;
  } else if (isFunction(source)) {
    return new GetterRefImpl(source);
  } else if (isObject$1(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  const val = source[key];
  return isRef(val) ? val : new ObjectRefImpl(
    source,
    key,
    defaultValue
  );
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function warn(msg, ...args) {
  return;
}
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen2, i = isFlushing ? flushIndex + 1 : 0) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen2) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen2) {
  isFlushPending = false;
  isFlushing = true;
  queue.sort(comparator);
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(
        render.call(
          proxyToUse,
          proxyToUse,
          renderCache,
          props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return attrs;
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          props,
          null
          /* we know it doesn't need it */
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
function filterSingleRoot(children) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
const SuspenseImpl = {
  name: "Suspense",
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals) {
    if (n1 == null) {
      mountSuspense(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized,
        rendererInternals
      );
    } else {
      patchSuspense(
        n1,
        n2,
        container,
        anchor,
        parentComponent,
        isSVG,
        slotScopeIds,
        optimized,
        rendererInternals
      );
    }
  },
  hydrate: hydrateSuspense,
  create: createSuspenseBoundary,
  normalize: normalizeSuspenseChildren
};
const Suspense = SuspenseImpl;
function triggerEvent(vnode, name) {
  const eventListener = vnode.props && vnode.props[name];
  if (isFunction(eventListener)) {
    eventListener();
  }
}
function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals) {
  const {
    p: patch,
    o: { createElement }
  } = rendererInternals;
  const hiddenContainer = createElement("div");
  const suspense = vnode.suspense = createSuspenseBoundary(
    vnode,
    parentSuspense,
    parentComponent,
    container,
    hiddenContainer,
    anchor,
    isSVG,
    slotScopeIds,
    optimized,
    rendererInternals
  );
  patch(
    null,
    suspense.pendingBranch = vnode.ssContent,
    hiddenContainer,
    null,
    parentComponent,
    suspense,
    isSVG,
    slotScopeIds
  );
  if (suspense.deps > 0) {
    triggerEvent(vnode, "onPending");
    triggerEvent(vnode, "onFallback");
    patch(
      null,
      vnode.ssFallback,
      container,
      anchor,
      parentComponent,
      null,
      // fallback tree will not have suspense context
      isSVG,
      slotScopeIds
    );
    setActiveBranch(suspense, vnode.ssFallback);
  } else {
    suspense.resolve(false, true);
  }
}
function patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, slotScopeIds, optimized, { p: patch, um: unmount, o: { createElement } }) {
  const suspense = n2.suspense = n1.suspense;
  suspense.vnode = n2;
  n2.el = n1.el;
  const newBranch = n2.ssContent;
  const newFallback = n2.ssFallback;
  const { activeBranch, pendingBranch, isInFallback, isHydrating } = suspense;
  if (pendingBranch) {
    suspense.pendingBranch = newBranch;
    if (isSameVNodeType(newBranch, pendingBranch)) {
      patch(
        pendingBranch,
        newBranch,
        suspense.hiddenContainer,
        null,
        parentComponent,
        suspense,
        isSVG,
        slotScopeIds,
        optimized
      );
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else if (isInFallback) {
        patch(
          activeBranch,
          newFallback,
          container,
          anchor,
          parentComponent,
          null,
          // fallback tree will not have suspense context
          isSVG,
          slotScopeIds,
          optimized
        );
        setActiveBranch(suspense, newFallback);
      }
    } else {
      suspense.pendingId++;
      if (isHydrating) {
        suspense.isHydrating = false;
        suspense.activeBranch = pendingBranch;
      } else {
        unmount(pendingBranch, parentComponent, suspense);
      }
      suspense.deps = 0;
      suspense.effects.length = 0;
      suspense.hiddenContainer = createElement("div");
      if (isInFallback) {
        patch(
          null,
          newBranch,
          suspense.hiddenContainer,
          null,
          parentComponent,
          suspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        if (suspense.deps <= 0) {
          suspense.resolve();
        } else {
          patch(
            activeBranch,
            newFallback,
            container,
            anchor,
            parentComponent,
            null,
            // fallback tree will not have suspense context
            isSVG,
            slotScopeIds,
            optimized
          );
          setActiveBranch(suspense, newFallback);
        }
      } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
        patch(
          activeBranch,
          newBranch,
          container,
          anchor,
          parentComponent,
          suspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        suspense.resolve(true);
      } else {
        patch(
          null,
          newBranch,
          suspense.hiddenContainer,
          null,
          parentComponent,
          suspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        if (suspense.deps <= 0) {
          suspense.resolve();
        }
      }
    }
  } else {
    if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
      patch(
        activeBranch,
        newBranch,
        container,
        anchor,
        parentComponent,
        suspense,
        isSVG,
        slotScopeIds,
        optimized
      );
      setActiveBranch(suspense, newBranch);
    } else {
      triggerEvent(n2, "onPending");
      suspense.pendingBranch = newBranch;
      suspense.pendingId++;
      patch(
        null,
        newBranch,
        suspense.hiddenContainer,
        null,
        parentComponent,
        suspense,
        isSVG,
        slotScopeIds,
        optimized
      );
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else {
        const { timeout, pendingId } = suspense;
        if (timeout > 0) {
          setTimeout(() => {
            if (suspense.pendingId === pendingId) {
              suspense.fallback(newFallback);
            }
          }, timeout);
        } else if (timeout === 0) {
          suspense.fallback(newFallback);
        }
      }
    }
  }
}
function createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, isSVG, slotScopeIds, optimized, rendererInternals, isHydrating = false) {
  const {
    p: patch,
    m: move,
    um: unmount,
    n: next,
    o: { parentNode, remove: remove2 }
  } = rendererInternals;
  let parentSuspenseId;
  const isSuspensible = isVNodeSuspensible(vnode);
  if (isSuspensible) {
    if (parentSuspense == null ? void 0 : parentSuspense.pendingBranch) {
      parentSuspenseId = parentSuspense.pendingId;
      parentSuspense.deps++;
    }
  }
  const timeout = vnode.props ? toNumber(vnode.props.timeout) : void 0;
  const suspense = {
    vnode,
    parent: parentSuspense,
    parentComponent,
    isSVG,
    container,
    hiddenContainer,
    anchor,
    deps: 0,
    pendingId: 0,
    timeout: typeof timeout === "number" ? timeout : -1,
    activeBranch: null,
    pendingBranch: null,
    isInFallback: true,
    isHydrating,
    isUnmounted: false,
    effects: [],
    resolve(resume = false, sync = false) {
      const {
        vnode: vnode2,
        activeBranch,
        pendingBranch,
        pendingId,
        effects,
        parentComponent: parentComponent2,
        container: container2
      } = suspense;
      if (suspense.isHydrating) {
        suspense.isHydrating = false;
      } else if (!resume) {
        const delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === "out-in";
        if (delayEnter) {
          activeBranch.transition.afterLeave = () => {
            if (pendingId === suspense.pendingId) {
              move(pendingBranch, container2, anchor2, 0);
            }
          };
        }
        let { anchor: anchor2 } = suspense;
        if (activeBranch) {
          anchor2 = next(activeBranch);
          unmount(activeBranch, parentComponent2, suspense, true);
        }
        if (!delayEnter) {
          move(pendingBranch, container2, anchor2, 0);
        }
      }
      setActiveBranch(suspense, pendingBranch);
      suspense.pendingBranch = null;
      suspense.isInFallback = false;
      let parent = suspense.parent;
      let hasUnresolvedAncestor = false;
      while (parent) {
        if (parent.pendingBranch) {
          parent.effects.push(...effects);
          hasUnresolvedAncestor = true;
          break;
        }
        parent = parent.parent;
      }
      if (!hasUnresolvedAncestor) {
        queuePostFlushCb(effects);
      }
      suspense.effects = [];
      if (isSuspensible) {
        if (parentSuspense && parentSuspense.pendingBranch && parentSuspenseId === parentSuspense.pendingId) {
          parentSuspense.deps--;
          if (parentSuspense.deps === 0 && !sync) {
            parentSuspense.resolve();
          }
        }
      }
      triggerEvent(vnode2, "onResolve");
    },
    fallback(fallbackVNode) {
      if (!suspense.pendingBranch) {
        return;
      }
      const { vnode: vnode2, activeBranch, parentComponent: parentComponent2, container: container2, isSVG: isSVG2 } = suspense;
      triggerEvent(vnode2, "onFallback");
      const anchor2 = next(activeBranch);
      const mountFallback = () => {
        if (!suspense.isInFallback) {
          return;
        }
        patch(
          null,
          fallbackVNode,
          container2,
          anchor2,
          parentComponent2,
          null,
          // fallback tree will not have suspense context
          isSVG2,
          slotScopeIds,
          optimized
        );
        setActiveBranch(suspense, fallbackVNode);
      };
      const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === "out-in";
      if (delayEnter) {
        activeBranch.transition.afterLeave = mountFallback;
      }
      suspense.isInFallback = true;
      unmount(
        activeBranch,
        parentComponent2,
        null,
        // no suspense so unmount hooks fire now
        true
        // shouldRemove
      );
      if (!delayEnter) {
        mountFallback();
      }
    },
    move(container2, anchor2, type) {
      suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type);
      suspense.container = container2;
    },
    next() {
      return suspense.activeBranch && next(suspense.activeBranch);
    },
    registerDep(instance, setupRenderEffect) {
      const isInPendingSuspense = !!suspense.pendingBranch;
      if (isInPendingSuspense) {
        suspense.deps++;
      }
      const hydratedEl = instance.vnode.el;
      instance.asyncDep.catch((err) => {
        handleError(err, instance, 0);
      }).then((asyncSetupResult) => {
        if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) {
          return;
        }
        instance.asyncResolved = true;
        const { vnode: vnode2 } = instance;
        handleSetupResult(instance, asyncSetupResult, false);
        if (hydratedEl) {
          vnode2.el = hydratedEl;
        }
        const placeholder = !hydratedEl && instance.subTree.el;
        setupRenderEffect(
          instance,
          vnode2,
          // component may have been moved before resolve.
          // if this is not a hydration, instance.subTree will be the comment
          // placeholder.
          parentNode(hydratedEl || instance.subTree.el),
          // anchor will not be used if this is hydration, so only need to
          // consider the comment placeholder case.
          hydratedEl ? null : next(instance.subTree),
          suspense,
          isSVG,
          optimized
        );
        if (placeholder) {
          remove2(placeholder);
        }
        updateHOCHostEl(instance, vnode2.el);
        if (isInPendingSuspense && --suspense.deps === 0) {
          suspense.resolve();
        }
      });
    },
    unmount(parentSuspense2, doRemove) {
      suspense.isUnmounted = true;
      if (suspense.activeBranch) {
        unmount(
          suspense.activeBranch,
          parentComponent,
          parentSuspense2,
          doRemove
        );
      }
      if (suspense.pendingBranch) {
        unmount(
          suspense.pendingBranch,
          parentComponent,
          parentSuspense2,
          doRemove
        );
      }
    }
  };
  return suspense;
}
function hydrateSuspense(node, vnode, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals, hydrateNode) {
  const suspense = vnode.suspense = createSuspenseBoundary(
    vnode,
    parentSuspense,
    parentComponent,
    node.parentNode,
    document.createElement("div"),
    null,
    isSVG,
    slotScopeIds,
    optimized,
    rendererInternals,
    true
    /* hydrating */
  );
  const result = hydrateNode(
    node,
    suspense.pendingBranch = vnode.ssContent,
    parentComponent,
    suspense,
    slotScopeIds,
    optimized
  );
  if (suspense.deps === 0) {
    suspense.resolve(false, true);
  }
  return result;
}
function normalizeSuspenseChildren(vnode) {
  const { shapeFlag, children } = vnode;
  const isSlotChildren = shapeFlag & 32;
  vnode.ssContent = normalizeSuspenseSlot(
    isSlotChildren ? children.default : children
  );
  vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment);
}
function normalizeSuspenseSlot(s) {
  let block;
  if (isFunction(s)) {
    const trackBlock = isBlockTreeEnabled && s._c;
    if (trackBlock) {
      s._d = false;
      openBlock();
    }
    s = s();
    if (trackBlock) {
      s._d = true;
      block = currentBlock;
      closeBlock();
    }
  }
  if (isArray$1(s)) {
    const singleChild = filterSingleRoot(s);
    s = singleChild;
  }
  s = normalizeVNode(s);
  if (block && !s.dynamicChildren) {
    s.dynamicChildren = block.filter((c) => c !== s);
  }
  return s;
}
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function setActiveBranch(suspense, branch) {
  suspense.activeBranch = branch;
  const { vnode, parentComponent } = suspense;
  const el = vnode.el = branch.el;
  if (parentComponent && parentComponent.subTree === vnode) {
    parentComponent.vnode.el = el;
    updateHOCHostEl(parentComponent, el);
  }
}
function isVNodeSuspensible(vnode) {
  var _a;
  return ((_a = vnode.props) == null ? void 0 : _a.suspensible) != null && vnode.props.suspensible !== false;
}
function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
const INITIAL_WATCHER_VALUE = {};
function watch$1(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  var _a;
  const instance = getCurrentScope() === ((_a = currentInstance) == null ? void 0 : _a.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some(
        (v, i) => hasChanged(v, oldValue[i])
      ) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    );
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen2) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen2 = seen2 || /* @__PURE__ */ new Set();
  if (seen2.has(value)) {
    return value;
  }
  seen2.add(value);
  if (isRef(value)) {
    traverse(value.value, seen2);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen2);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen2);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen2);
    }
  }
  return value;
}
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        for (const c of children) {
          if (c.type !== Comment) {
            child = c;
            break;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state,
        instance
      );
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state,
          instance
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$1(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = { loader: source };
  }
  const {
    loader,
    loadingComponent,
    errorComponent,
    delay = 200,
    timeout,
    // undefined = never times out
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise((resolve2, reject) => {
          const userRetry = () => resolve2(retry());
          const userFail = () => reject(err);
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then((comp) => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      resolvedComp = comp;
      return comp;
    }));
  };
  return /* @__PURE__ */ defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      const instance = currentInstance;
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }
      const onError = (err) => {
        pendingRequest = null;
        handleError(
          err,
          instance,
          13,
          !errorComponent
          /* do not throw in dev if user provided error component */
        );
      };
      if (suspensible && instance.suspense || isInSSRComponentSetup) {
        return load().then((comp) => {
          return () => createInnerComp(comp, instance);
        }).catch((err) => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }
      const loaded = ref(false);
      const error = ref();
      const delayed = ref(!!delay);
      if (delay) {
        setTimeout(() => {
          delayed.value = false;
        }, delay);
      }
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            const err = new Error(
              `Async component timed out after ${timeout}ms.`
            );
            onError(err);
            error.value = err;
          }
        }, timeout);
      }
      load().then(() => {
        loaded.value = true;
        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
          queueJob(instance.parent.update);
        }
      }).catch((err) => {
        onError(err);
        error.value = err;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}
function createInnerComp(comp, parent) {
  const { ref: ref2, props, children, ce } = parent.vnode;
  const vnode = createVNode(comp, props, children);
  vnode.ref = ref2;
  vnode.ce = ce;
  delete parent.vnode.ce;
  return vnode;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
const KeepAliveImpl = {
  name: `KeepAlive`,
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const sharedContext = instance.ctx;
    if (!sharedContext.renderer) {
      return () => {
        const children = slots.default && slots.default();
        return children && children.length === 1 ? children[0] : children;
      };
    }
    const cache = /* @__PURE__ */ new Map();
    const keys = /* @__PURE__ */ new Set();
    let current = null;
    const parentSuspense = instance.suspense;
    const {
      renderer: {
        p: patch,
        m: move,
        um: _unmount,
        o: { createElement }
      }
    } = sharedContext;
    const storageContainer = createElement("div");
    sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
      const instance2 = vnode.component;
      move(vnode, container, anchor, 0, parentSuspense);
      patch(
        instance2.vnode,
        vnode,
        container,
        anchor,
        instance2,
        parentSuspense,
        isSVG,
        vnode.slotScopeIds,
        optimized
      );
      queuePostRenderEffect(() => {
        instance2.isDeactivated = false;
        if (instance2.a) {
          invokeArrayFns(instance2.a);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
      }, parentSuspense);
    };
    sharedContext.deactivate = (vnode) => {
      const instance2 = vnode.component;
      move(vnode, storageContainer, null, 1, parentSuspense);
      queuePostRenderEffect(() => {
        if (instance2.da) {
          invokeArrayFns(instance2.da);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
        instance2.isDeactivated = true;
      }, parentSuspense);
    };
    function unmount(vnode) {
      resetShapeFlag(vnode);
      _unmount(vnode, instance, parentSuspense, true);
    }
    function pruneCache(filter) {
      cache.forEach((vnode, key) => {
        const name = getComponentName(vnode.type);
        if (name && (!filter || !filter(name))) {
          pruneCacheEntry(key);
        }
      });
    }
    function pruneCacheEntry(key) {
      const cached = cache.get(key);
      if (!current || !isSameVNodeType(cached, current)) {
        unmount(cached);
      } else if (current) {
        resetShapeFlag(current);
      }
      cache.delete(key);
      keys.delete(key);
    }
    watch$1(
      () => [props.include, props.exclude],
      ([include, exclude]) => {
        include && pruneCache((name) => matches(include, name));
        exclude && pruneCache((name) => !matches(exclude, name));
      },
      // prune post-render after `current` has been updated
      { flush: "post", deep: true }
    );
    let pendingCacheKey = null;
    const cacheSubtree = () => {
      if (pendingCacheKey != null) {
        cache.set(pendingCacheKey, getInnerChild(instance.subTree));
      }
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);
    onBeforeUnmount(() => {
      cache.forEach((cached) => {
        const { subTree, suspense } = instance;
        const vnode = getInnerChild(subTree);
        if (cached.type === vnode.type && cached.key === vnode.key) {
          resetShapeFlag(vnode);
          const da = vnode.component.da;
          da && queuePostRenderEffect(da, suspense);
          return;
        }
        unmount(cached);
      });
    });
    return () => {
      pendingCacheKey = null;
      if (!slots.default) {
        return null;
      }
      const children = slots.default();
      const rawVNode = children[0];
      if (children.length > 1) {
        current = null;
        return children;
      } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
        current = null;
        return rawVNode;
      }
      let vnode = getInnerChild(rawVNode);
      const comp = vnode.type;
      const name = getComponentName(
        isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp
      );
      const { include, exclude, max } = props;
      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        current = vnode;
        return rawVNode;
      }
      const key = vnode.key == null ? comp : vnode.key;
      const cachedVNode = cache.get(key);
      if (vnode.el) {
        vnode = cloneVNode(vnode);
        if (rawVNode.shapeFlag & 128) {
          rawVNode.ssContent = vnode;
        }
      }
      pendingCacheKey = key;
      if (cachedVNode) {
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;
        if (vnode.transition) {
          setTransitionHooks(vnode, vnode.transition);
        }
        vnode.shapeFlag |= 512;
        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key);
        if (max && keys.size > parseInt(max, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      }
      vnode.shapeFlag |= 256;
      current = vnode;
      return isSuspense(rawVNode.type) ? rawVNode : vnode;
    };
  }
};
const KeepAlive = KeepAliveImpl;
function matches(pattern, name) {
  if (isArray$1(pattern)) {
    return pattern.some((p2) => matches(p2, name));
  } else if (isString(pattern)) {
    return pattern.split(",").includes(name);
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  return false;
}
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function resetShapeFlag(vnode) {
  vnode.shapeFlag &= ~256;
  vnode.shapeFlag &= ~512;
}
function getInnerChild(vnode) {
  return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
  if (isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  if (isArray$1(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached && cached[i])
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    if (name !== "default")
      props.name = name;
    return createVNode("slot", props, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(
    Fragment,
    {
      key: props.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      validSlotContent && validSlotContent.key || `_${name}`
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function normalizePropsOrEmits(props) {
  return isArray$1(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$1(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch$1(getter, handler);
    }
  } else if (isFunction(raw)) {
    watch$1(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch$1(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions$1(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions$1(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2))
          ;
        else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else
          ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(
            rootComponent,
            rootProps
          );
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = null;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else
      ;
  }
}
function hasInjectionContext() {
  return !!(currentInstance || currentRenderingInstance || currentApp);
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false)
      ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(
        children,
        instance.slots = {}
      );
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else
          ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
let hasMismatch = false;
const isSVGContainer = (container) => /svg/.test(container.namespaceURI) && container.tagName !== "foreignObject";
const isComment = (node) => node.nodeType === 8;
function createHydrationFunctions(rendererInternals) {
  const {
    mt: mountComponent,
    p: patch,
    o: {
      patchProp: patchProp2,
      createText,
      nextSibling,
      parentNode,
      remove: remove2,
      insert,
      createComment
    }
  } = rendererInternals;
  const hydrate = (vnode, container) => {
    if (!container.hasChildNodes()) {
      patch(null, vnode, container);
      flushPostFlushCbs();
      container._vnode = vnode;
      return;
    }
    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
    if (hasMismatch && true) {
      console.error(`Hydration completed but contains mismatches.`);
    }
  };
  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    const isFragmentStart = isComment(node) && node.data === "[";
    const onMismatch = () => handleMismatch(
      node,
      vnode,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      isFragmentStart
    );
    const { type, ref: ref2, shapeFlag, patchFlag } = vnode;
    let domType = node.nodeType;
    vnode.el = node;
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    let nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3) {
          if (vnode.children === "") {
            insert(vnode.el = createText(""), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment:
        if (domType !== 8 || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case Static:
        if (isFragmentStart) {
          node = nextSibling(node);
          domType = node.nodeType;
        }
        if (domType === 1 || domType === 3) {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i = 0; i < vnode.staticCount; i++) {
            if (needToAdoptContent)
              vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
            if (i === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return isFragmentStart ? nextSibling(nextNode) : nextNode;
        } else {
          onMismatch();
        }
        break;
      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            slotScopeIds,
            optimized
          );
        }
        break;
      default:
        if (shapeFlag & 1) {
          if (domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized
            );
          }
        } else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          mountComponent(
            vnode,
            container,
            null,
            parentComponent,
            parentSuspense,
            isSVGContainer(container),
            optimized
          );
          nextNode = isFragmentStart ? locateClosingAsyncAnchor(node) : nextSibling(node);
          if (nextNode && isComment(nextNode) && nextNode.data === "teleport end") {
            nextNode = nextSibling(nextNode);
          }
          if (isAsyncWrapper(vnode)) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized,
              rendererInternals,
              hydrateChildren
            );
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            isSVGContainer(parentNode(node)),
            slotScopeIds,
            optimized,
            rendererInternals,
            hydrateNode
          );
        } else
          ;
    }
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type, props, patchFlag, shapeFlag, dirs } = vnode;
    const forcePatchValue = type === "input" && dirs || type === "option";
    if (forcePatchValue || patchFlag !== -1) {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        if (forcePatchValue || !optimized || patchFlag & (16 | 32)) {
          for (const key in props) {
            if (forcePatchValue && key.endsWith("value") || isOn(key) && !isReservedProp(key)) {
              patchProp2(
                el,
                key,
                null,
                props[key],
                false,
                void 0,
                parentComponent
              );
            }
          }
        } else if (props.onClick) {
          patchProp2(
            el,
            "onClick",
            null,
            props.onClick,
            false,
            void 0,
            parentComponent
          );
        }
      }
      let vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
      if (shapeFlag & 16 && // skip if element has innerHTML / textContent
      !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(
          el.firstChild,
          vnode,
          el,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        while (next) {
          hasMismatch = true;
          const cur = next;
          next = next.nextSibling;
          remove2(cur);
        }
      } else if (shapeFlag & 8) {
        if (el.textContent !== vnode.children) {
          hasMismatch = true;
          el.textContent = vnode.children;
        }
      }
    }
    return el.nextSibling;
  };
  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l = children.length;
    for (let i = 0; i < l; i++) {
      const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
      if (node) {
        node = hydrateNode(
          node,
          vnode,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      } else if (vnode.type === Text && !vnode.children) {
        continue;
      } else {
        hasMismatch = true;
        patch(
          null,
          vnode,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVGContainer(container),
          slotScopeIds
        );
      }
    }
    return node;
  };
  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    const container = parentNode(node);
    const next = hydrateChildren(
      nextSibling(node),
      vnode,
      container,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      optimized
    );
    if (next && isComment(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      hasMismatch = true;
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };
  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    hasMismatch = true;
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAsyncAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove2(next2);
        } else {
          break;
        }
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove2(node);
    patch(
      null,
      vnode,
      container,
      next,
      parentComponent,
      parentSuspense,
      isSVGContainer(container),
      slotScopeIds
    );
    return next;
  };
  const locateClosingAsyncAnchor = (node) => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment(node)) {
        if (node.data === "[")
          match++;
        if (node.data === "]") {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  return [hydrate, hydrateNode];
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      isSVG,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      isSVG,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        isSVG && type !== "foreignObject",
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(
            el,
            key,
            null,
            props[key],
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          isSVG
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                isSVG,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        isSVG
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              isSVG,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(
            el,
            key,
            prev,
            next,
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        n2.children,
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          isSVG,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    );
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            isSVG
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => effect.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref2,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if (isString(targetSelector)) {
    if (!select) {
      return null;
    } else {
      const target = select(targetSelector);
      return target;
    }
  } else {
    return targetSelector;
  }
};
const TeleportImpl = {
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: { insert, querySelector, createText, createComment }
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (n1 == null) {
      const placeholder = n2.el = createText("");
      const mainAnchor = n2.anchor = createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target = n2.target = resolveTarget(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText("");
      if (target) {
        insert(targetAnchor, target);
        isSVG = isSVG || isTargetSVG(target);
      }
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(
            children,
            container2,
            anchor2,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      isSVG = isSVG || isTargetSVG(target);
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          currentContainer,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          currentContainer,
          currentAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          false
        );
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(
            n2,
            container,
            mainAnchor,
            internals,
            1
          );
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(
            n2.props,
            querySelector
          );
          if (nextTarget) {
            moveTeleport(
              n2,
              nextTarget,
              null,
              internals,
              0
            );
          }
        } else if (wasDisabled) {
          moveTeleport(
            n2,
            target,
            targetAnchor,
            internals,
            1
          );
        }
      }
    }
    updateCssVars(n2);
  },
  remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
    if (target) {
      hostRemove(targetAnchor);
    }
    if (doRemove || !isTeleportDisabled(props)) {
      hostRemove(anchor);
      if (shapeFlag & 16) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          unmount(
            child,
            parentComponent,
            parentSuspense,
            true,
            !!child.dynamicChildren
          );
        }
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(
          children[i],
          container,
          parentAnchor,
          2
        );
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
  o: { nextSibling, parentNode, querySelector }
}, hydrateChildren) {
  const target = vnode.target = resolveTarget(
    vnode.props,
    querySelector
  );
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(
          nextSibling(node),
          vnode,
          parentNode(node),
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        while (targetAnchor) {
          targetAnchor = nextSibling(targetAnchor);
          if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        hydrateChildren(
          targetNode,
          vnode,
          target,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      }
    }
    updateCssVars(vnode);
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(vnode) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node = vnode.children[0].el;
    while (node !== vnode.targetAnchor) {
      if (node.nodeType === 1)
        node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
      /* isBlock */
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  if (typeof ref2 === "number") {
    ref2 = "" + ref2;
  }
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function createTextVNode(text2 = " ", flag = 0) {
  return createVNode(Text, null, text2, flag);
}
function createCommentVNode(text2 = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text2)) : createVNode(Comment, null, text2);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let globalCurrentInstanceSetters;
let settersKey = "__VUE_INSTANCE_SETTERS__";
{
  if (!(globalCurrentInstanceSetters = getGlobalThis()[settersKey])) {
    globalCurrentInstanceSetters = getGlobalThis()[settersKey] = [];
  }
  globalCurrentInstanceSetters.push((i) => currentInstance = i);
  internalSetCurrentInstance = (instance) => {
    if (globalCurrentInstanceSetters.length > 1) {
      globalCurrentInstanceSetters.forEach((s) => s(instance));
    } else {
      globalCurrentInstanceSetters[0](instance);
    }
  };
}
const setCurrentInstance = (instance) => {
  internalSetCurrentInstance(instance);
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [instance.props, setupContext]
    );
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      }
    }
  ));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      get attrs() {
        return getAttrsProxy(instance);
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject$1(propsOrChildren) && !isArray$1(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
const version = "3.3.4";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text2) => doc.createTextNode(text2),
  createComment: (text2) => doc.createComment(text2),
  setText: (node, text2) => {
    node.nodeValue = text2;
  },
  setElementText: (el, text2) => {
    el.textContent = text2;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content2, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content2}</svg>` : content2;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    el._value = value;
    const oldValue = tag === "OPTION" ? el.getAttribute("value") : el.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(
      el,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Transition.props = /* @__PURE__ */ extend(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
const callHook = (hook, args = []) => {
  if (isArray$1(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject$1(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles2 = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles2[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
let enabledHydration = false;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
}
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
const createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) {
      return mount(container, true, container instanceof SVGElement);
    }
  };
  return app;
};
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__") {
    return;
  }
  if (key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    return;
  }
  return value;
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _lval = value.toLowerCase().trim();
  if (_lval === "true") {
    return true;
  }
  if (_lval === "false") {
    return false;
  }
  if (_lval === "null") {
    return null;
  }
  if (_lval === "nan") {
    return Number.NaN;
  }
  if (_lval === "infinity") {
    return Number.POSITIVE_INFINITY;
  }
  if (_lval === "undefined") {
    return void 0;
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}
const HASH_RE$1 = /#/g;
const AMPERSAND_RE$1 = /&/g;
const EQUAL_RE$1 = /=/g;
const PLUS_RE$1 = /\+/g;
const ENC_CARET_RE$1 = /%5e/gi;
const ENC_BACKTICK_RE$1 = /%60/gi;
const ENC_PIPE_RE$1 = /%7c/gi;
const ENC_SPACE_RE$1 = /%20/gi;
function encode(text2) {
  return encodeURI("" + text2).replace(ENC_PIPE_RE$1, "|");
}
function encodeQueryValue$1(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE$1, "%2B").replace(ENC_SPACE_RE$1, "+").replace(HASH_RE$1, "%23").replace(AMPERSAND_RE$1, "%26").replace(ENC_BACKTICK_RE$1, "`").replace(ENC_CARET_RE$1, "^");
}
function encodeQueryKey$1(text2) {
  return encodeQueryValue$1(text2).replace(EQUAL_RE$1, "%3D");
}
function decode$1(text2 = "") {
  try {
    return decodeURIComponent("" + text2);
  } catch {
    return "" + text2;
  }
}
function decodeQueryValue(text2) {
  return decode$1(text2.replace(PLUS_RE$1, " "));
}
function parseQuery$1(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decode$1(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (typeof object[key] !== "undefined") {
      if (Array.isArray(object[key])) {
        object[key].push(value);
      } else {
        object[key] = [object[key], value];
      }
    } else {
      object[key] = value;
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey$1(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey$1(key)}=${encodeQueryValue$1(_value)}`).join("&");
  }
  return `${encodeQueryKey$1(key)}=${encodeQueryValue$1(value)}`;
}
function stringifyQuery$1(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).join("&");
}
const PROTOCOL_STRICT_REGEX = /^\w{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^\w{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
const TRAILING_SLASH_RE$1 = /\/$|\/\?/;
function hasTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE$1.test(input);
}
function withoutTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return (s0.slice(0, -1) || "/") + (s.length > 0 ? `?${s.join("?")}` : "");
}
function withTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "");
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withoutLeadingSlash(input = "") {
  return (hasLeadingSlash(input) ? input.slice(1) : input) || "/";
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL$1(input);
  const mergedQuery = { ...parseQuery$1(parsed.search), ...query };
  parsed.search = stringifyQuery$1(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const index of input.filter((url2) => isNonEmptyURL(url2))) {
    url = url ? withTrailingSlash(url) + withoutLeadingSlash(index) : index;
  }
  return url;
}
function parseURL$1(input = "", defaultProto) {
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL$1(defaultProto + input) : parsePath(input);
  }
  const [protocol = "", auth, hostAndPath = ""] = (input.replace(/\\/g, "/").match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/) || []).splice(1);
  const [host = "", path = ""] = (hostAndPath.match(/([^#/?]*)(.*)?/) || []).splice(1);
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol,
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const fullpath = parsed.pathname + (parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "") + parsed.hash;
  if (!parsed.protocol) {
    return fullpath;
  }
  return parsed.protocol + "//" + (parsed.auth ? parsed.auth + "@" : "") + parsed.host + fullpath;
}
class FetchError extends Error {
  constructor() {
    super(...arguments);
    this.name = "FetchError";
  }
}
function createFetchError(request, error, response) {
  let message2 = "";
  if (error) {
    message2 = error.message;
  }
  if (request && response) {
    message2 = `${message2} (${response.status} ${response.statusText} (${request.toString()}))`;
  } else if (request) {
    message2 = `${message2} (${request.toString()})`;
  }
  const fetchError = new FetchError(message2);
  Object.defineProperty(fetchError, "request", {
    get() {
      return request;
    }
  });
  Object.defineProperty(fetchError, "response", {
    get() {
      return response;
    }
  });
  Object.defineProperty(fetchError, "data", {
    get() {
      return response && response._data;
    }
  });
  Object.defineProperty(fetchError, "status", {
    get() {
      return response && response.status;
    }
  });
  Object.defineProperty(fetchError, "statusText", {
    get() {
      return response && response.statusText;
    }
  });
  Object.defineProperty(fetchError, "statusCode", {
    get() {
      return response && response.status;
    }
  });
  Object.defineProperty(fetchError, "statusMessage", {
    get() {
      return response && response.statusText;
    }
  });
  return fetchError;
}
const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
function createFetch(globalOptions) {
  const { fetch: fetch2, Headers: Headers2 } = globalOptions;
  function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && retryStatusCodes.has(responseCode)) {
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(
      context.request,
      context.error,
      context.response
    );
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: { ...globalOptions.defaults, ..._options },
      response: void 0,
      error: void 0
    };
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
      if (context.options.body && isPayloadMethod(context.options.method) && isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers2(context.options.headers);
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      }
    }
    context.response = await fetch2(
      context.request,
      context.options
    ).catch(async (error) => {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return onError(context);
    });
    const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
    if (responseType === "json") {
      const data = await context.response.text();
      const parseFunction = context.options.parseResponse || destr;
      context.response._data = parseFunction(data);
    } else if (responseType === "stream") {
      context.response._data = context.response.body;
    } else {
      context.response._data = await context.response[responseType]();
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return onError(context);
    }
    return context.response;
  };
  const $fetch2 = function $fetch22(request, options) {
    return $fetchRaw(request, options).then((r) => r._data);
  };
  $fetch2.raw = $fetchRaw;
  $fetch2.native = fetch2;
  $fetch2.create = (defaultOptions = {}) => createFetch({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch2;
}
const _globalThis$1 = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
}();
const fetch$1 = _globalThis$1.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!")));
const Headers = _globalThis$1.Headers;
const ofetch = createFetch({ fetch: fetch$1, Headers });
const $fetch = ofetch;
const useRuntimeConfig$1 = () => {
  var _a;
  return ((_a = window == null ? void 0 : window.__NUXT__) == null ? void 0 : _a.config) || {};
};
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const buildAssetsDir = () => appConfig.buildAssetsDir;
const buildAssetsURL = (...path) => joinURL(publicAssetsURL(), buildAssetsDir(), ...path);
const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
};
{
  globalThis.__buildAssetsURL = buildAssetsURL;
  globalThis.__publicAssetsURL = publicAssetsURL;
}
function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}
class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message2 = dep.message;
      if (!message2) {
        message2 = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message2)) {
        console.warn(message2);
        this._deprecatedMessages.add(message2);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}
function createContext(opts = {}) {
  let currentInstance2;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance2 && currentInstance2 !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance2 === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance2;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance2 = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance2 = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance2 = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance2 = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance2 = instance;
      const onRestore = () => {
        currentInstance2 = instance;
      };
      const onLeave = () => currentInstance2 === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance2 = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.5.2";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...window.__NUXT__ ?? {}
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => callWithNuxt(nuxtApp, fn),
    isHydrating: true,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    window.addEventListener("nuxt.preloadError", (event) => {
      nuxtApp.callHook("app:chunkError", { error: event.payload });
    });
    const unreg = nuxtApp.hook("app:error", (...args) => {
      console.error("[nuxt] error caught during app initialization", ...args);
    });
    nuxtApp.hook("app:mounted", unreg);
  }
  const runtimeConfig = reactive(nuxtApp.payload.config);
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 !== "function") {
    return;
  }
  const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a;
  const parallels = [];
  const errors = [];
  for (const plugin2 of plugins2) {
    const promise = applyPlugin(nuxtApp, plugin2);
    if ((_a = plugin2.meta) == null ? void 0 : _a.parallel) {
      parallels.push(promise.catch((e) => errors.push(e)));
    } else {
      await promise;
    }
  }
  await Promise.all(parallels);
  if (errors.length) {
    throw errors[0];
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = [];
  for (const plugin2 of _plugins2) {
    if (typeof plugin2 !== "function") {
      continue;
    }
    let _plugin = plugin2;
    if (plugin2.length > 1) {
      _plugin = (nuxtApp) => plugin2(nuxtApp, nuxtApp.provide);
    }
    plugins2.push(_plugin);
  }
  plugins2.sort((a, b) => {
    var _a, _b;
    return (((_a = a.meta) == null ? void 0 : _a.order) || orderMap.default) - (((_b = b.meta) == null ? void 0 : _b.order) || orderMap.default);
  });
  return plugins2;
}
const orderMap = {
  pre: -20,
  default: 0,
  post: 20
};
function defineNuxtPlugin(plugin2, meta) {
  var _a;
  if (typeof plugin2 === "function") {
    return /* @__PURE__ */ defineNuxtPlugin({ setup: plugin2 }, meta);
  }
  const wrapper = (nuxtApp) => {
    if (plugin2.hooks) {
      nuxtApp.hooks.addHooks(plugin2.hooks);
    }
    if (plugin2.setup) {
      return plugin2.setup(nuxtApp);
    }
  };
  wrapper.meta = {
    name: (meta == null ? void 0 : meta.name) || plugin2.name || ((_a = plugin2.setup) == null ? void 0 : _a.name),
    parallel: plugin2.parallel,
    order: (meta == null ? void 0 : meta.order) || plugin2.order || orderMap[plugin2.enforce || "default"] || orderMap.default
  };
  wrapper[NuxtPluginIndicator] = true;
  return wrapper;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    nuxtAppCtx.set(nuxt);
    return nuxt.vueApp.runWithContext(fn);
  }
}
function useNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const variables = "";
const global$1 = "";
const a11y$1 = "";
const icons = "";
const text = "";
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return dep.startsWith(".") ? new URL(dep, importerUrl).href : dep;
};
const seen = {};
const ___vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep, importerUrl);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i = links.length - 1; i >= 0; i--) {
        const link2 = links[i];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
const __vitePreload = (...args) => ___vitePreload(...args).catch((err) => {
  const e = new Event("nuxt.preloadError");
  e.payload = err;
  window.dispatchEvent(e);
  throw err;
});
const UNDEFINED = -1;
const HOLE = -2;
const NAN = -3;
const POSITIVE_INFINITY = -4;
const NEGATIVE_INFINITY = -5;
const NEGATIVE_ZERO = -6;
function parse(serialized, revivers2) {
  return unflatten(JSON.parse(serialized), revivers2);
}
function unflatten(parsed, revivers2) {
  if (typeof parsed === "number")
    return hydrate(parsed, true);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid input");
  }
  const values = (
    /** @type {any[]} */
    parsed
  );
  const hydrated = Array(values.length);
  function hydrate(index, standalone = false) {
    if (index === UNDEFINED)
      return void 0;
    if (index === NAN)
      return NaN;
    if (index === POSITIVE_INFINITY)
      return Infinity;
    if (index === NEGATIVE_INFINITY)
      return -Infinity;
    if (index === NEGATIVE_ZERO)
      return -0;
    if (standalone)
      throw new Error(`Invalid input`);
    if (index in hydrated)
      return hydrated[index];
    const value = values[index];
    if (!value || typeof value !== "object") {
      hydrated[index] = value;
    } else if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const type = value[0];
        const reviver = revivers2 == null ? void 0 : revivers2[type];
        if (reviver) {
          return hydrated[index] = reviver(hydrate(value[1]));
        }
        switch (type) {
          case "Date":
            hydrated[index] = new Date(value[1]);
            break;
          case "Set":
            const set2 = /* @__PURE__ */ new Set();
            hydrated[index] = set2;
            for (let i = 1; i < value.length; i += 1) {
              set2.add(hydrate(value[i]));
            }
            break;
          case "Map":
            const map = /* @__PURE__ */ new Map();
            hydrated[index] = map;
            for (let i = 1; i < value.length; i += 2) {
              map.set(hydrate(value[i]), hydrate(value[i + 1]));
            }
            break;
          case "RegExp":
            hydrated[index] = new RegExp(value[1], value[2]);
            break;
          case "Object":
            hydrated[index] = Object(value[1]);
            break;
          case "BigInt":
            hydrated[index] = BigInt(value[1]);
            break;
          case "null":
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index] = obj;
            for (let i = 1; i < value.length; i += 2) {
              obj[value[i]] = hydrate(value[i + 1]);
            }
            break;
          default:
            throw new Error(`Unknown type ${type}`);
        }
      } else {
        const array = new Array(value.length);
        hydrated[index] = array;
        for (let i = 0; i < value.length; i += 1) {
          const n = value[i];
          if (n === HOLE)
            continue;
          array[i] = hydrate(n);
        }
      }
    } else {
      const object = {};
      hydrated[index] = object;
      for (const key in value) {
        const n = value[key];
        object[key] = hydrate(n);
      }
    }
    return hydrated[index];
  }
  return hydrate(0);
}
function asArray(value) {
  return Array.isArray(value) ? value : [value];
}
const TagsWithInnerContent = ["title", "script", "style", "noscript"];
const HasElementTags = [
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
const ValidHeadTags = [
  "title",
  "titleTemplate",
  "templateParams",
  "base",
  "htmlAttrs",
  "bodyAttrs",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
const UniqueTags = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"];
const TagConfigKeys = ["tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent"];
function defineHeadPlugin(plugin2) {
  return plugin2;
}
function hashCode(s) {
  let h2 = 9;
  for (let i = 0; i < s.length; )
    h2 = Math.imul(h2 ^ s.charCodeAt(i++), 9 ** 9);
  return ((h2 ^ h2 >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function hashTag(tag) {
  return hashCode(`${tag.tag}:${tag.textContent || tag.innerHTML || ""}:${Object.entries(tag.props).map(([key, value]) => `${key}:${String(value)}`).join(",")}`);
}
function computeHashes(hashes) {
  let h2 = 9;
  for (const s of hashes) {
    for (let i = 0; i < s.length; )
      h2 = Math.imul(h2 ^ s.charCodeAt(i++), 9 ** 9);
  }
  return ((h2 ^ h2 >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function tagDedupeKey(tag, fn) {
  const { props, tag: tagName } = tag;
  if (UniqueTags.includes(tagName))
    return tagName;
  if (tagName === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  const name = ["id"];
  if (tagName === "meta")
    name.push(...["name", "property", "http-equiv"]);
  for (const n of name) {
    if (typeof props[n] !== "undefined") {
      const val = String(props[n]);
      if (fn && !fn(val))
        return false;
      return `${tagName}:${n}:${val}`;
    }
  }
  return false;
}
function resolveTitleTemplate(template, title) {
  if (template == null)
    return title || null;
  if (typeof template === "function")
    return template(title);
  return template;
}
function setAttrs(ctx, newEntry = false, markSideEffect) {
  const { tag, $el } = ctx;
  if (!$el)
    return;
  Object.entries(tag.props).forEach(([k, value]) => {
    value = String(value);
    const attrSdeKey = `attr:${k}`;
    if (k === "class") {
      if (!value)
        return;
      for (const c of value.split(" ")) {
        const classSdeKey = `${attrSdeKey}:${c}`;
        if (markSideEffect)
          markSideEffect(ctx, classSdeKey, () => $el.classList.remove(c));
        if (!$el.classList.contains(c))
          $el.classList.add(c);
      }
      return;
    }
    if (markSideEffect && !k.startsWith("data-h-"))
      markSideEffect(ctx, attrSdeKey, () => $el.removeAttribute(k));
    if (newEntry || $el.getAttribute(k) !== value)
      $el.setAttribute(k, value);
  });
  if (TagsWithInnerContent.includes(tag.tag)) {
    if (tag.textContent && tag.textContent !== $el.textContent)
      $el.textContent = tag.textContent;
    else if (tag.innerHTML && tag.innerHTML !== $el.innerHTML)
      $el.innerHTML = tag.innerHTML;
  }
}
let prevHash = false;
async function renderDOMHead(head, options = {}) {
  var _a, _b;
  const beforeRenderCtx = { shouldRender: true };
  await head.hooks.callHook("dom:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender)
    return;
  const dom = options.document || head.resolvedOptions.document || window.document;
  const tagContexts = (await head.resolveTags()).map(setupTagRenderCtx);
  if (head.resolvedOptions.experimentalHashHydration) {
    prevHash = prevHash || head._hash || false;
    if (prevHash) {
      const hash = computeHashes(tagContexts.map((ctx) => ctx.tag._h));
      if (prevHash === hash)
        return;
      prevHash = hash;
    }
  }
  const staleSideEffects = head._popSideEffectQueue();
  head.headEntries().map((entry2) => entry2._sde).forEach((sde) => {
    Object.entries(sde).forEach(([key, fn]) => {
      staleSideEffects[key] = fn;
    });
  });
  const markSideEffect = (ctx, key, fn) => {
    key = `${ctx.renderId}:${key}`;
    if (ctx.entry)
      ctx.entry._sde[key] = fn;
    delete staleSideEffects[key];
  };
  function setupTagRenderCtx(tag) {
    const entry2 = head.headEntries().find((e) => e._i === tag._e);
    const renderCtx = {
      renderId: tag._d || hashTag(tag),
      $el: null,
      shouldRender: true,
      tag,
      entry: entry2,
      markSideEffect: (key, fn) => markSideEffect(renderCtx, key, fn)
    };
    return renderCtx;
  }
  const renders = [];
  const pendingRenders = {
    body: [],
    head: []
  };
  const markEl = (ctx) => {
    head._elMap[ctx.renderId] = ctx.$el;
    renders.push(ctx);
    markSideEffect(ctx, "el", () => {
      var _a2;
      (_a2 = ctx.$el) == null ? void 0 : _a2.remove();
      delete head._elMap[ctx.renderId];
    });
  };
  for (const ctx of tagContexts) {
    await head.hooks.callHook("dom:beforeRenderTag", ctx);
    if (!ctx.shouldRender)
      continue;
    const { tag } = ctx;
    if (tag.tag === "title") {
      dom.title = tag.textContent || "";
      renders.push(ctx);
      continue;
    }
    if (tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs") {
      ctx.$el = dom[tag.tag === "htmlAttrs" ? "documentElement" : "body"];
      setAttrs(ctx, false, markSideEffect);
      renders.push(ctx);
      continue;
    }
    ctx.$el = head._elMap[ctx.renderId];
    if (!ctx.$el && tag.key)
      ctx.$el = dom.querySelector(`${((_a = tag.tagPosition) == null ? void 0 : _a.startsWith("body")) ? "body" : "head"} > ${tag.tag}[data-h-${tag._h}]`);
    if (ctx.$el) {
      if (ctx.tag._d)
        setAttrs(ctx);
      markEl(ctx);
      continue;
    }
    pendingRenders[((_b = tag.tagPosition) == null ? void 0 : _b.startsWith("body")) ? "body" : "head"].push(ctx);
  }
  const fragments = {
    bodyClose: void 0,
    bodyOpen: void 0,
    head: void 0
  };
  Object.entries(pendingRenders).forEach(([pos, queue2]) => {
    var _a2;
    if (!queue2.length)
      return;
    const children = (_a2 = dom == null ? void 0 : dom[pos]) == null ? void 0 : _a2.children;
    if (!children)
      return;
    for (const $el of [...children].reverse()) {
      const elTag = $el.tagName.toLowerCase();
      if (!HasElementTags.includes(elTag))
        continue;
      const props = $el.getAttributeNames().reduce((props2, name) => ({ ...props2, [name]: $el.getAttribute(name) }), {});
      const tmpTag = { tag: elTag, props };
      if ($el.innerHTML)
        tmpTag.innerHTML = $el.innerHTML;
      const tmpRenderId = hashTag(tmpTag);
      let matchIdx = queue2.findIndex((ctx) => (ctx == null ? void 0 : ctx.renderId) === tmpRenderId);
      if (matchIdx === -1) {
        const tmpDedupeKey = tagDedupeKey(tmpTag);
        matchIdx = queue2.findIndex((ctx) => (ctx == null ? void 0 : ctx.tag._d) && ctx.tag._d === tmpDedupeKey);
      }
      if (matchIdx !== -1) {
        const ctx = queue2[matchIdx];
        ctx.$el = $el;
        setAttrs(ctx);
        markEl(ctx);
        delete queue2[matchIdx];
      }
    }
    queue2.forEach((ctx) => {
      const pos2 = ctx.tag.tagPosition || "head";
      fragments[pos2] = fragments[pos2] || dom.createDocumentFragment();
      if (!ctx.$el) {
        ctx.$el = dom.createElement(ctx.tag.tag);
        setAttrs(ctx, true);
      }
      fragments[pos2].appendChild(ctx.$el);
      markEl(ctx);
    });
  });
  if (fragments.head)
    dom.head.appendChild(fragments.head);
  if (fragments.bodyOpen)
    dom.body.insertBefore(fragments.bodyOpen, dom.body.firstChild);
  if (fragments.bodyClose)
    dom.body.appendChild(fragments.bodyClose);
  for (const ctx of renders)
    await head.hooks.callHook("dom:renderTag", ctx);
  Object.values(staleSideEffects).forEach((fn) => fn());
}
let domUpdatePromise = null;
async function debouncedRenderDOMHead(head, options = {}) {
  function doDomUpdate() {
    domUpdatePromise = null;
    return renderDOMHead(head, options);
  }
  const delayFn = options.delayFn || ((fn) => setTimeout(fn, 10));
  return domUpdatePromise = domUpdatePromise || new Promise((resolve2) => delayFn(() => resolve2(doDomUpdate())));
}
function PatchDomOnEntryUpdatesPlugin(options) {
  return defineHeadPlugin({
    hooks: {
      "entries:updated": function(head) {
        if (typeof (options == null ? void 0 : options.document) === "undefined" && typeof window === "undefined")
          return;
        let delayFn = options == null ? void 0 : options.delayFn;
        if (!delayFn && typeof requestAnimationFrame !== "undefined")
          delayFn = requestAnimationFrame;
        debouncedRenderDOMHead(head, { document: (options == null ? void 0 : options.document) || window.document, delayFn });
      }
    }
  });
}
function maybeGetSSRHash(document2) {
  var _a;
  return ((_a = document2 == null ? void 0 : document2.head.querySelector('meta[name="unhead:ssr"]')) == null ? void 0 : _a.getAttribute("content")) || false;
}
const TAG_WEIGHTS = {
  // aliases
  critical: 2,
  high: 9,
  low: 12,
  // tags
  base: -1,
  title: 1,
  meta: 10
};
function tagWeight(tag) {
  if (typeof tag.tagPriority === "number")
    return tag.tagPriority;
  if (tag.tag === "meta") {
    if (tag.props.charset)
      return -2;
    if (tag.props["http-equiv"] === "content-security-policy")
      return 0;
  }
  const key = tag.tagPriority || tag.tag;
  if (key in TAG_WEIGHTS) {
    return TAG_WEIGHTS[key];
  }
  return 10;
}
const SortModifiers = [{ prefix: "before:", offset: -1 }, { prefix: "after:", offset: 1 }];
function SortTagsPlugin() {
  return defineHeadPlugin({
    hooks: {
      "tags:resolve": (ctx) => {
        const tagPositionForKey = (key) => {
          var _a;
          return (_a = ctx.tags.find((tag) => tag._d === key)) == null ? void 0 : _a._p;
        };
        for (const { prefix, offset } of SortModifiers) {
          for (const tag of ctx.tags.filter((tag2) => typeof tag2.tagPriority === "string" && tag2.tagPriority.startsWith(prefix))) {
            const position = tagPositionForKey(
              tag.tagPriority.replace(prefix, "")
            );
            if (typeof position !== "undefined")
              tag._p = position + offset;
          }
        }
        ctx.tags.sort((a, b) => a._p - b._p).sort((a, b) => tagWeight(a) - tagWeight(b));
      }
    }
  });
}
function TitleTemplatePlugin() {
  return defineHeadPlugin({
    hooks: {
      "tags:resolve": (ctx) => {
        const { tags } = ctx;
        let titleTemplateIdx = tags.findIndex((i) => i.tag === "titleTemplate");
        const titleIdx = tags.findIndex((i) => i.tag === "title");
        if (titleIdx !== -1 && titleTemplateIdx !== -1) {
          const newTitle = resolveTitleTemplate(
            tags[titleTemplateIdx].textContent,
            tags[titleIdx].textContent
          );
          if (newTitle !== null) {
            tags[titleIdx].textContent = newTitle || tags[titleIdx].textContent;
          } else {
            delete tags[titleIdx];
          }
        } else if (titleTemplateIdx !== -1) {
          const newTitle = resolveTitleTemplate(
            tags[titleTemplateIdx].textContent
          );
          if (newTitle !== null) {
            tags[titleTemplateIdx].textContent = newTitle;
            tags[titleTemplateIdx].tag = "title";
            titleTemplateIdx = -1;
          }
        }
        if (titleTemplateIdx !== -1) {
          delete tags[titleTemplateIdx];
        }
        ctx.tags = tags.filter(Boolean);
      }
    }
  });
}
function DeprecatedTagAttrPlugin() {
  return defineHeadPlugin({
    hooks: {
      "tag:normalise": function({ tag }) {
        if (typeof tag.props.body !== "undefined") {
          tag.tagPosition = "bodyClose";
          delete tag.props.body;
        }
      }
    }
  });
}
const DupeableTags = ["link", "style", "script", "noscript"];
function ProvideTagHashPlugin() {
  return defineHeadPlugin({
    hooks: {
      "tag:normalise": ({ tag, resolvedOptions }) => {
        if (resolvedOptions.experimentalHashHydration === true) {
          tag._h = hashTag(tag);
        }
        if (tag.key && DupeableTags.includes(tag.tag)) {
          tag._h = hashCode(tag.key);
          tag.props[`data-h-${tag._h}`] = "";
        }
      }
    }
  });
}
const ValidEventTags = ["script", "link", "bodyAttrs"];
function EventHandlersPlugin() {
  const stripEventHandlers = (mode, tag) => {
    const props = {};
    const eventHandlers = {};
    Object.entries(tag.props).forEach(([key, value]) => {
      if (key.startsWith("on") && typeof value === "function")
        eventHandlers[key] = value;
      else
        props[key] = value;
    });
    let delayedSrc;
    if (mode === "dom" && tag.tag === "script" && typeof props.src === "string" && typeof eventHandlers.onload !== "undefined") {
      delayedSrc = props.src;
      delete props.src;
    }
    return { props, eventHandlers, delayedSrc };
  };
  return defineHeadPlugin({
    hooks: {
      "ssr:render": function(ctx) {
        ctx.tags = ctx.tags.map((tag) => {
          if (!ValidEventTags.includes(tag.tag))
            return tag;
          if (!Object.entries(tag.props).find(([key, value]) => key.startsWith("on") && typeof value === "function"))
            return tag;
          tag.props = stripEventHandlers("ssr", tag).props;
          return tag;
        });
      },
      "dom:beforeRenderTag": function(ctx) {
        if (!ValidEventTags.includes(ctx.tag.tag))
          return;
        if (!Object.entries(ctx.tag.props).find(([key, value]) => key.startsWith("on") && typeof value === "function"))
          return;
        const { props, eventHandlers, delayedSrc } = stripEventHandlers("dom", ctx.tag);
        if (!Object.keys(eventHandlers).length)
          return;
        ctx.tag.props = props;
        ctx.tag._eventHandlers = eventHandlers;
        ctx.tag._delayedSrc = delayedSrc;
      },
      "dom:renderTag": function(ctx) {
        const $el = ctx.$el;
        if (!ctx.tag._eventHandlers || !$el)
          return;
        const $eventListenerTarget = ctx.tag.tag === "bodyAttrs" && typeof window !== "undefined" ? window : $el;
        Object.entries(ctx.tag._eventHandlers).forEach(([k, value]) => {
          const sdeKey = `${ctx.tag._d || ctx.tag._p}:${k}`;
          const eventName = k.slice(2).toLowerCase();
          const eventDedupeKey = `data-h-${eventName}`;
          ctx.markSideEffect(sdeKey, () => {
          });
          if ($el.hasAttribute(eventDedupeKey))
            return;
          const handler = value;
          $el.setAttribute(eventDedupeKey, "");
          $eventListenerTarget.addEventListener(eventName, handler);
          if (ctx.entry) {
            ctx.entry._sde[sdeKey] = () => {
              $eventListenerTarget.removeEventListener(eventName, handler);
              $el.removeAttribute(eventDedupeKey);
            };
          }
        });
        if (ctx.tag._delayedSrc) {
          $el.setAttribute("src", ctx.tag._delayedSrc);
        }
      }
    }
  });
}
const UsesMergeStrategy = ["templateParams", "htmlAttrs", "bodyAttrs"];
function DedupesTagsPlugin() {
  return defineHeadPlugin({
    hooks: {
      "tag:normalise": function({ tag }) {
        ["hid", "vmid", "key"].forEach((key) => {
          if (tag.props[key]) {
            tag.key = tag.props[key];
            delete tag.props[key];
          }
        });
        const generatedKey = tagDedupeKey(tag);
        const dedupe = generatedKey || (tag.key ? `${tag.tag}:${tag.key}` : false);
        if (dedupe)
          tag._d = dedupe;
      },
      "tags:resolve": function(ctx) {
        const deduping = {};
        ctx.tags.forEach((tag) => {
          const dedupeKey = (tag.key ? `${tag.tag}:${tag.key}` : tag._d) || tag._p;
          const dupedTag = deduping[dedupeKey];
          if (dupedTag) {
            let strategy = tag == null ? void 0 : tag.tagDuplicateStrategy;
            if (!strategy && UsesMergeStrategy.includes(tag.tag))
              strategy = "merge";
            if (strategy === "merge") {
              const oldProps = dupedTag.props;
              ["class", "style"].forEach((key) => {
                if (tag.props[key] && oldProps[key]) {
                  if (key === "style" && !oldProps[key].endsWith(";"))
                    oldProps[key] += ";";
                  tag.props[key] = `${oldProps[key]} ${tag.props[key]}`;
                }
              });
              deduping[dedupeKey].props = {
                ...oldProps,
                ...tag.props
              };
              return;
            } else if (tag._e === dupedTag._e) {
              dupedTag._duped = dupedTag._duped || [];
              tag._d = `${dupedTag._d}:${dupedTag._duped.length + 1}`;
              dupedTag._duped.push(tag);
              return;
            }
          }
          const propCount = Object.keys(tag.props).length + (tag.innerHTML ? 1 : 0) + (tag.textContent ? 1 : 0);
          if (HasElementTags.includes(tag.tag) && propCount === 0) {
            delete deduping[dedupeKey];
            return;
          }
          deduping[dedupeKey] = tag;
        });
        const newTags = [];
        Object.values(deduping).forEach((tag) => {
          const dupes = tag._duped;
          delete tag._duped;
          newTags.push(tag);
          if (dupes)
            newTags.push(...dupes);
        });
        ctx.tags = newTags;
      }
    }
  });
}
function processTemplateParams(s, config) {
  function sub(token) {
    if (["s", "pageTitle"].includes(token))
      return config.pageTitle;
    let val;
    if (token.includes(".")) {
      val = token.split(".").reduce((acc, key) => acc ? acc[key] || void 0 : void 0, config);
    } else {
      val = config[token];
    }
    return typeof val !== "undefined" ? val || "" : false;
  }
  let decoded = s;
  try {
    decoded = decodeURI(s);
  } catch {
  }
  const tokens = (decoded.match(/%(\w+\.+\w+)|%(\w+)/g) || []).sort().reverse();
  tokens.forEach((token) => {
    const re = sub(token.slice(1));
    if (typeof re === "string") {
      s = s.replace(new RegExp(`\\${token}(\\W|$)`, "g"), `${re}$1`).trim();
    }
  });
  if (config.separator) {
    if (s.endsWith(config.separator))
      s = s.slice(0, -config.separator.length).trim();
    if (s.startsWith(config.separator))
      s = s.slice(config.separator.length).trim();
    s = s.replace(new RegExp(`\\${config.separator}\\s*\\${config.separator}`, "g"), config.separator);
  }
  return s;
}
function TemplateParamsPlugin() {
  return defineHeadPlugin({
    hooks: {
      "tags:resolve": (ctx) => {
        var _a;
        const { tags } = ctx;
        const title = (_a = tags.find((tag) => tag.tag === "title")) == null ? void 0 : _a.textContent;
        const idx = tags.findIndex((tag) => tag.tag === "templateParams");
        const params = idx !== -1 ? tags[idx].props : {};
        params.pageTitle = params.pageTitle || title || "";
        for (const tag of tags) {
          if (["titleTemplate", "title"].includes(tag.tag) && typeof tag.textContent === "string") {
            tag.textContent = processTemplateParams(tag.textContent, params);
          } else if (tag.tag === "meta" && typeof tag.props.content === "string") {
            tag.props.content = processTemplateParams(tag.props.content, params);
          } else if (tag.tag === "link" && typeof tag.props.href === "string") {
            tag.props.href = processTemplateParams(tag.props.href, params);
          } else if (tag.tag === "script" && ["application/json", "application/ld+json"].includes(tag.props.type) && typeof tag.innerHTML === "string") {
            try {
              tag.innerHTML = JSON.stringify(JSON.parse(tag.innerHTML), (key, val) => {
                if (typeof val === "string")
                  return processTemplateParams(val, params);
                return val;
              });
            } catch {
            }
          }
        }
        ctx.tags = tags.filter((tag) => tag.tag !== "templateParams");
      }
    }
  });
}
const IsBrowser$1 = typeof window !== "undefined";
let activeHead;
function setActiveHead(head) {
  return activeHead = head;
}
function getActiveHead() {
  return activeHead;
}
async function normaliseTag(tagName, input) {
  const tag = { tag: tagName, props: {} };
  if (tagName === "templateParams") {
    tag.props = input;
    return tag;
  }
  if (["title", "titleTemplate"].includes(tagName)) {
    tag.textContent = input instanceof Promise ? await input : input;
    return tag;
  }
  if (typeof input === "string") {
    if (!["script", "noscript", "style"].includes(tagName))
      return false;
    if (tagName === "script" && (/^(https?:)?\/\//.test(input) || input.startsWith("/")))
      tag.props.src = input;
    else
      tag.innerHTML = input;
    return tag;
  }
  tag.props = await normaliseProps(tagName, { ...input });
  if (tag.props.children) {
    tag.props.innerHTML = tag.props.children;
  }
  delete tag.props.children;
  Object.keys(tag.props).filter((k) => TagConfigKeys.includes(k)).forEach((k) => {
    if (!["innerHTML", "textContent"].includes(k) || TagsWithInnerContent.includes(tag.tag)) {
      tag[k] = tag.props[k];
    }
    delete tag.props[k];
  });
  ["innerHTML", "textContent"].forEach((k) => {
    if (tag.tag === "script" && typeof tag[k] === "string" && ["application/ld+json", "application/json"].includes(tag.props.type)) {
      try {
        tag[k] = JSON.parse(tag[k]);
      } catch (e) {
        tag[k] = "";
      }
    }
    if (typeof tag[k] === "object")
      tag[k] = JSON.stringify(tag[k]);
  });
  if (tag.props.class)
    tag.props.class = normaliseClassProp(tag.props.class);
  if (tag.props.content && Array.isArray(tag.props.content))
    return tag.props.content.map((v) => ({ ...tag, props: { ...tag.props, content: v } }));
  return tag;
}
function normaliseClassProp(v) {
  if (typeof v === "object" && !Array.isArray(v)) {
    v = Object.keys(v).filter((k) => v[k]);
  }
  return (Array.isArray(v) ? v.join(" ") : v).split(" ").filter((c) => c.trim()).filter(Boolean).join(" ");
}
async function normaliseProps(tagName, props) {
  for (const k of Object.keys(props)) {
    const isDataKey = k.startsWith("data-");
    if (props[k] instanceof Promise) {
      props[k] = await props[k];
    }
    if (String(props[k]) === "true") {
      props[k] = isDataKey ? "true" : "";
    } else if (String(props[k]) === "false") {
      if (isDataKey) {
        props[k] = "false";
      } else {
        delete props[k];
      }
    }
  }
  return props;
}
const TagEntityBits = 10;
async function normaliseEntryTags(e) {
  const tagPromises = [];
  Object.entries(e.resolvedInput).filter(([k, v]) => typeof v !== "undefined" && ValidHeadTags.includes(k)).forEach(([k, value]) => {
    const v = asArray(value);
    tagPromises.push(...v.map((props) => normaliseTag(k, props)).flat());
  });
  return (await Promise.all(tagPromises)).flat().filter(Boolean).map((t, i) => {
    t._e = e._i;
    t._p = (e._i << TagEntityBits) + i;
    return t;
  });
}
function CorePlugins() {
  return [
    // dedupe needs to come first
    DedupesTagsPlugin(),
    SortTagsPlugin(),
    TemplateParamsPlugin(),
    TitleTemplatePlugin(),
    ProvideTagHashPlugin(),
    EventHandlersPlugin(),
    DeprecatedTagAttrPlugin()
  ];
}
function DOMPlugins(options = {}) {
  return [
    PatchDomOnEntryUpdatesPlugin({ document: options == null ? void 0 : options.document, delayFn: options == null ? void 0 : options.domDelayFn })
  ];
}
function createHead$1(options = {}) {
  const head = createHeadCore({
    ...options,
    plugins: [...DOMPlugins(options), ...(options == null ? void 0 : options.plugins) || []]
  });
  if (options.experimentalHashHydration && head.resolvedOptions.document)
    head._hash = maybeGetSSRHash(head.resolvedOptions.document);
  setActiveHead(head);
  return head;
}
function createHeadCore(options = {}) {
  let entries = [];
  let _sde = {};
  let _eid = 0;
  const hooks = createHooks();
  if (options == null ? void 0 : options.hooks)
    hooks.addHooks(options.hooks);
  options.plugins = [
    ...CorePlugins(),
    ...(options == null ? void 0 : options.plugins) || []
  ];
  options.plugins.forEach((p2) => p2.hooks && hooks.addHooks(p2.hooks));
  options.document = options.document || (IsBrowser$1 ? document : void 0);
  const updated = () => hooks.callHook("entries:updated", head);
  const head = {
    resolvedOptions: options,
    headEntries() {
      return entries;
    },
    get hooks() {
      return hooks;
    },
    use(plugin2) {
      if (plugin2.hooks)
        hooks.addHooks(plugin2.hooks);
    },
    push(input, options2) {
      const activeEntry = {
        _i: _eid++,
        input,
        _sde: {}
      };
      if (options2 == null ? void 0 : options2.mode)
        activeEntry._m = options2 == null ? void 0 : options2.mode;
      if (options2 == null ? void 0 : options2.transform) {
        activeEntry._t = options2 == null ? void 0 : options2.transform;
      }
      entries.push(activeEntry);
      updated();
      return {
        dispose() {
          entries = entries.filter((e) => {
            if (e._i !== activeEntry._i)
              return true;
            _sde = { ..._sde, ...e._sde || {} };
            e._sde = {};
            updated();
            return false;
          });
        },
        // a patch is the same as creating a new entry, just a nice DX
        patch(input2) {
          entries = entries.map((e) => {
            if (e._i === activeEntry._i) {
              activeEntry.input = e.input = input2;
              updated();
            }
            return e;
          });
        }
      };
    },
    async resolveTags() {
      const resolveCtx = { tags: [], entries: [...entries] };
      await hooks.callHook("entries:resolve", resolveCtx);
      for (const entry2 of resolveCtx.entries) {
        const transformer = entry2._t || ((i) => i);
        entry2.resolvedInput = transformer(entry2.resolvedInput || entry2.input);
        if (entry2.resolvedInput) {
          for (const tag of await normaliseEntryTags(entry2)) {
            const tagCtx = { tag, entry: entry2, resolvedOptions: head.resolvedOptions };
            await hooks.callHook("tag:normalise", tagCtx);
            resolveCtx.tags.push(tagCtx.tag);
          }
        }
      }
      await hooks.callHook("tags:resolve", resolveCtx);
      return resolveCtx.tags;
    },
    _popSideEffectQueue() {
      const sde = { ..._sde };
      _sde = {};
      return sde;
    },
    _elMap: {}
  };
  head.hooks.callHook("init", head);
  return head;
}
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
const Vue3 = version.startsWith("3");
const IsBrowser = typeof window !== "undefined";
const headSymbol = "usehead";
function injectHead() {
  return getCurrentInstance() && inject(headSymbol) || getActiveHead();
}
function vueInstall(head) {
  const plugin2 = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin2.install;
}
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    // arbitrary delay the dom update for batch updates
    domDelayFn: (fn) => setTimeout(() => nextTick(() => fn()), 10),
    plugins: [
      VueReactiveUseHeadPlugin(),
      ...(options == null ? void 0 : options.plugins) || []
    ]
  });
  head.install = vueInstall(head);
  return head;
}
function VueReactiveUseHeadPlugin() {
  return defineHeadPlugin({
    hooks: {
      "entries:resolve": function(ctx) {
        for (const entry2 of ctx.entries)
          entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
      }
    }
  });
}
function clientUseHead(input, options = {}) {
  const head = injectHead();
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch$1(resolvedInput, (e) => {
    entry2.patch(e);
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry2.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry2;
}
function serverUseHead(input, options = {}) {
  const head = injectHead();
  return head.push(input, options);
}
function useHead(input, options = {}) {
  var _a;
  const head = injectHead();
  if (head) {
    const isBrowser2 = IsBrowser || !!((_a = head.resolvedOptions) == null ? void 0 : _a.document);
    if (options.mode === "server" && isBrowser2 || options.mode === "client" && !isBrowser2)
      return;
    return isBrowser2 ? clientUseHead(input, options) : serverUseHead(input, options);
  }
}
const appHead = { "meta": [{ "charset": "utf-8" }, { "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "hid": "description", "name": "description", "content": "A news site developed with Nuxt." }], "link": [], "style": [], "script": [], "noscript": [], "title": "The Daily Broadcast", "htmlAttrs": { "lang": "en" } };
const appPageTransition = false;
const appKeepalive = false;
const appRootId = "__nuxt";
const renderJsonPayloads = true;
function loadPayload(url, opts = {}) {
  const payloadURL = _getPayloadURL(url, opts);
  const nuxtApp = useNuxtApp();
  const cache = nuxtApp._payloadCache = nuxtApp._payloadCache || {};
  if (cache[payloadURL]) {
    return cache[payloadURL];
  }
  cache[payloadURL] = _importPayload(payloadURL).then((payload) => {
    if (!payload) {
      delete cache[payloadURL];
      return null;
    }
    return payload;
  });
  return cache[payloadURL];
}
const extension = "json";
function _getPayloadURL(url, opts = {}) {
  const u = new URL(url, "http://localhost");
  if (u.search) {
    throw new Error("Payload URL cannot contain search params: " + url);
  }
  if (u.host !== "localhost" || hasProtocol(u.pathname, { acceptRelative: true })) {
    throw new Error("Payload URL must not include hostname: " + url);
  }
  const hash = opts.hash || (opts.fresh ? Date.now() : "");
  return joinURL(useRuntimeConfig().app.baseURL, u.pathname, hash ? `_payload.${hash}.${extension}` : `_payload.${extension}`);
}
async function _importPayload(payloadURL) {
  try {
    return renderJsonPayloads ? parsePayload(await fetch(payloadURL).then((res) => res.text())) : await __vitePreload(() => import(
      /* webpackIgnore: true */
      /* @vite-ignore */
      payloadURL
    ), true ? [] : void 0, import.meta.url).then((r) => r.default || r);
  } catch (err) {
    console.warn("[nuxt] Cannot load payload ", payloadURL, err);
  }
  return null;
}
function isPrerendered() {
  const nuxtApp = useNuxtApp();
  return !!nuxtApp.payload.prerenderedAt;
}
let payloadCache = null;
async function getNuxtClientPayload() {
  if (payloadCache) {
    return payloadCache;
  }
  const el = document.getElementById("__NUXT_DATA__");
  if (!el) {
    return {};
  }
  const inlineData = parsePayload(el.textContent || "");
  const externalData = el.dataset.src ? await _importPayload(el.dataset.src) : void 0;
  payloadCache = {
    ...inlineData,
    ...externalData,
    ...window.__NUXT__
  };
  return payloadCache;
}
function parsePayload(payload) {
  return parse(payload, useNuxtApp()._payloadRevivers);
}
function definePayloadReviver(name, revive) {
  {
    useNuxtApp()._payloadRevivers[name] = revive;
  }
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p2, c) => _defu(p2, c, "", merger), {})
  );
}
const defu = createDefu();
class H3Error extends Error {
  constructor() {
    super(...arguments);
    this.statusCode = 500;
    this.fatal = false;
    this.unhandled = false;
    this.statusMessage = void 0;
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
H3Error.__h3_error__ = true;
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(
    input.message ?? input.statusMessage,
    // @ts-ignore
    input.cause ? { cause: input.cause } : void 0
  );
  if ("stack" in input) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function isError(input) {
  var _a;
  return ((_a = input == null ? void 0 : input.constructor) == null ? void 0 : _a.__h3_error__) === true;
}
const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
typeof setImmediate !== "undefined" ? setImmediate : (fn) => fn();
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL$1(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const inMiddleware = isProcessingMiddleware();
  if (!isExternal && inMiddleware) {
    return to;
  }
  const router = useRouter();
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    const error = useError();
    if (true) {
      nuxtApp.hooks.callHook("app:error", err);
    }
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const clearError = async (options = {}) => {
  const nuxtApp = useNuxtApp();
  const error = useError();
  nuxtApp.callHook("app:error:cleared", options);
  if (options.redirect) {
    await useRouter().replace(options.redirect);
  }
  error.value = null;
};
const isNuxtError = (err) => !!(err && typeof err === "object" && "__nuxt_error" in err);
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const revivers = {
  NuxtError: (data) => createError(data),
  EmptyShallowRef: (data) => shallowRef(data === "_" ? void 0 : JSON.parse(data)),
  EmptyRef: (data) => ref(data === "_" ? void 0 : JSON.parse(data)),
  ShallowRef: (data) => shallowRef(data),
  ShallowReactive: (data) => shallowReactive(data),
  Ref: (data) => ref(data),
  Reactive: (data) => reactive(data)
};
const revive_payload_client_4sVQNw7RlN = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:client",
  order: -30,
  async setup(nuxtApp) {
    let __temp, __restore;
    for (const reviver in revivers) {
      definePayloadReviver(reviver, revivers[reviver]);
    }
    Object.assign(nuxtApp.payload, ([__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(getNuxtClientPayload)), __temp = await __temp, __restore(), __temp));
    window.__NUXT__ = nuxtApp.payload;
  }
}, 1);
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  setup(nuxtApp) {
    const createHead$12 = createHead;
    const head = createHead$12();
    head.push(appHead);
    nuxtApp.vueApp.use(head);
    {
      let pauseDOMUpdates = true;
      const unpauseDom = () => {
        pauseDOMUpdates = false;
        head.hooks.callHook("entries:updated", head);
      };
      head.hooks.hook("dom:beforeRender", (context) => {
        context.shouldRender = !pauseDOMUpdates;
      });
      nuxtApp.hooks.hook("page:start", () => {
        pauseDOMUpdates = true;
      });
      nuxtApp.hooks.hook("page:finish", unpauseDom);
      nuxtApp.hooks.hook("app:suspense:resolve", unpauseDom);
    }
  }
});
/*!
  * vue-router v4.2.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module";
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const isArray = Array.isArray;
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
    return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false;
  for (const key in a) {
    if (!isSameRouteLocationParamsValue(a[key], b[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : a === b;
}
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") {
    toSegments.push("");
  }
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position > 1)
        position--;
    } else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base) {
  if (!base) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base[0] !== "/" && base[0] !== "#")
    base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation$1(base, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base);
  return path + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation$1(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1)
        listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener, {
    passive: true
  });
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation$1(base, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      // the length is off by one, we need to decrease it
      position: history2.length - 1,
      replaced: true,
      // don't add a scroll as the user may have an anchor, and we want
      // scrollBehavior to be triggered without a saved position
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace2) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      {
        console.error(err);
      }
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    const state = assign({}, history2.state, buildState(
      historyState.value.back,
      // keep back and forward entries but override current position
      to,
      historyState.value.forward,
      true
    ), data, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      historyState.value,
      history2.state,
      {
        forward: to,
        scroll: computeScrollPosition()
      }
    );
    changeLocation(currentState.current, currentState, true);
    const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    // it's overridden right after
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function createWebHashHistory(base) {
  base = location.host ? base || location.pathname + location.search : "";
  if (!base.includes("#"))
    base += "#";
  return createWebHistory(base);
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = Symbol("");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function createRouterError(type, params) {
  {
    return assign(new Error(), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [
      90
      /* PathScore.Root */
    ];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = // avoid an optional / if there are more segments e.g. /:p?-static
          // or /:p?-:p2
          optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict)
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse2(path) {
    const match = path.match(re);
    const params = {};
    if (!match)
      return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (isArray(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text2 = isArray(param) ? param.join("/") : param;
          if (!text2) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text2;
        }
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys,
    parse: parse2,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff)
      return diff;
    i++;
  }
  if (a.length < b.length) {
    return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
  } else if (a.length > b.length) {
    return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp)
      return comp;
    i++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(`Invalid path "${path}"`);
  }
  function crash(message2) {
    throw new Error(`ERR (${state})/"${buffer}": ${message2}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = assign(parser, {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(assign({}, mainNormalizedRecord, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          // we might be the child of an alias
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) {
          addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
        }
      }
      originalRecord = originalRecord || matcher;
      if (matcher.record.components && Object.keys(matcher.record.components).length || matcher.record.name || matcher.record.redirect) {
        insertMatcher(matcher);
      }
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i = 0;
    while (i < matchers.length && comparePathParserScore(matcher, matchers[i]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (matcher.record.path !== matchers[i].record.path || !isRecordChildOf(matcher, matchers[i])))
      i++;
    matchers.splice(i, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      name = matcher.record.name;
      params = assign(
        // paramsFromLocation is a new object
        paramsFromLocation(
          currentLocation.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          matcher.keys.filter((k) => !k.optional).map((k) => k.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        location2.params && paramsFromLocation(location2.params, matcher.keys.map((k) => k.name))
      );
      path = matcher.stringify(params);
    } else if ("path" in location2) {
      path = location2.path;
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  return { addRoute, resolve: resolve2, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys) {
  const newParams = {};
  for (const key of keys) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "boolean" ? props : props[name];
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options;
}
function isRecordChildOf(record, parent) {
  return parent.children.some((child) => child === record || isRecordChildOf(record, child));
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text2) {
  return encodeURI("" + text2).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text2) {
  return commonEncode(text2).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text2) {
  return commonEncode(text2).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text2) {
  return encodeQueryValue(text2).replace(EQUAL_RE, "%3D");
}
function encodePath(text2) {
  return commonEncode(text2).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text2) {
  return text2 == null ? "" : encodePath(text2).replace(SLASH_RE, "%2F");
}
function decode(text2) {
  try {
    return decodeURIComponent("" + text2);
  } catch (err) {
  }
  return "" + text2;
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("");
const viewDepthKey = Symbol("");
const routerKey = Symbol("");
const routeLocationKey = Symbol("");
const routerViewLocationKey = Symbol("");
function useCallbacks() {
  let handlers = [];
  function add2(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1)
        handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add: add2,
    list: () => handlers,
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name) {
  const enterCallbackArray = record && // name is defined if record is because of the function overload
  (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && // since enterCallbackArray is truthy, both record and name also are
        record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve2();
      }
    };
    const guardReturn = guard.call(record && record.instances[name], to, from, next);
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from) {
  const guards = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name)();
        }));
      }
    }
  }
  return guards;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => router.resolve(unref(props.to)));
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1)
      return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return (
      // we are dealing with nested routes
      length > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      getOriginalPath(routeMatched) === parentRecordPath && // avoid comparing the child with its parent
      currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index
    );
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      return router[unref(props.replace) ? "replace" : "push"](
        unref(props.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop);
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    return;
  if (e.defaultPrevented)
    return;
  if (e.button !== void 0 && e.button !== 0)
    return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e.preventDefault)
    e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch$1(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && // if there is no instance but to and from are the same this might be
      // the first visit
      (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, { Component: component, route }) || component
      );
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$12 = options.parseQuery || parseQuery;
  const stringifyQuery$12 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = (
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode)
  );
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$12, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$12, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(targetParams)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$12, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign({
      fullPath,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        stringifyQuery$12 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      )
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$12, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : (
          // force empty params
          { path: newTargetLocation }
        );
        newTargetLocation.params = {};
      }
      return assign({
        query: to.query,
        hash: to.hash,
        // avoid transferring params if the redirect has a path
        params: "path" in newTargetLocation ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign(locationAsObject(shouldRedirect), {
          state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
          force,
          replace: replace2
        }),
        // keep original redirectedFrom if it exists
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$12, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(
        from,
        from,
        // this is a push, the only way for it to be triggered from a
        // history.listen is with a redirect, which makes it become a push
        true,
        // This cannot be the first navigation because the initial location
        // cannot be manually navigated to
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? (
      // navigation redirects still mark the router as ready
      isNavigationFailure(
        error,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? error : markAsReady(error)
    ) : (
      // reject any unknown error
      triggerError(error, toLocation, from)
    )).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(
          failure2,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          return pushWithRedirect(
            // keep options
            assign({
              // preserve an existing replacement but allow the redirect to override it
              replace: replace2
            }, locationAsObject(failure2.to), {
              state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
              force
            }),
            // preserve the original redirectedFrom if any
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app = installedApps.values().next().value;
    return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of to.matched) {
        if (record.beforeEnter && !from.matched.includes(record)) {
          if (isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(
      err,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    for (const guard of afterGuards.list()) {
      runWithContext(() => guard(to, from, failure));
    }
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening)
        return;
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(
          error,
          4 | 8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        )) {
          return error;
        }
        if (isNavigationFailure(
          error,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          pushWithRedirect(
            error.to,
            toLocation
            // avoid an uncaught rejection, let push call triggerError
          ).then((failure) => {
            if (isNavigationFailure(
              failure,
              4 | 16
              /* ErrorTypes.NAVIGATION_DUPLICATED */
            ) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop);
          return Promise.reject();
        }
        if (info.delta) {
          routerHistory.go(-info.delta, false);
        }
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          // after navigation, all matched components are resolved
          toLocation,
          from,
          false
        );
        if (failure) {
          if (info.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
          // entry while a different route is displayed
          !isNavigationFailure(
            failure,
            8
            /* ErrorTypes.NAVIGATION_CANCELLED */
          )) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(
            failure,
            4 | 16
            /* ErrorTypes.NAVIGATION_DUPLICATED */
          )) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorHandlers.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to, from));
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve3, reject) => {
      readyHandlers.add([resolve3, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve3, reject]) => err ? reject(err) : resolve3());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app) {
      const router2 = this;
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router2;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute.value[key]);
      }
      app.provide(routerKey, router2);
      app.provide(routeLocationKey, reactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router;
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
const _routes = [];
const _sfc_main$y = {
  props: {
    headerClass: String,
    text: String,
    link: String
  }
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$l = ["href"];
const _hoisted_2$h = { key: 1 };
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.text ? (openBlock(), createElementBlock("header", {
    key: 0,
    class: normalizeClass($props.headerClass)
  }, [
    $props.link ? (openBlock(), createElementBlock("a", {
      key: 0,
      href: $props.link
    }, [
      createBaseVNode("h2", null, toDisplayString($props.text), 1)
    ], 8, _hoisted_1$l)) : (openBlock(), createElementBlock("h2", _hoisted_2$h, toDisplayString($props.text), 1))
  ], 2)) : createCommentVNode("", true);
}
const __nuxt_component_0$e = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$v]]);
const _sfc_main$x = {};
const _hoisted_1$k = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2$g = /* @__PURE__ */ createBaseVNode("title", null, "Lightning Icon", -1);
const _hoisted_3$d = /* @__PURE__ */ createBaseVNode("path", { d: "M8 24l3-9h-9l14-15-3 9h9l-14 15z" }, null, -1);
const _hoisted_4$9 = [
  _hoisted_2$g,
  _hoisted_3$d
];
function _sfc_render$u(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$k, _hoisted_4$9);
}
const __nuxt_component_0$d = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$u]]);
const _sfc_main$w = {};
const _hoisted_1$j = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2$f = /* @__PURE__ */ createBaseVNode("title", null, "Play Icon", -1);
const _hoisted_3$c = /* @__PURE__ */ createBaseVNode("path", { d: "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" }, null, -1);
const _hoisted_4$8 = [
  _hoisted_2$f,
  _hoisted_3$c
];
function _sfc_render$t(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$j, _hoisted_4$8);
}
const __nuxt_component_1$7 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$t]]);
const _sfc_main$v = {};
const _hoisted_1$i = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fillRule: "evenodd",
  clipRule: "evenodd"
};
const _hoisted_2$e = /* @__PURE__ */ createBaseVNode("title", null, "Fire Icon", -1);
const _hoisted_3$b = /* @__PURE__ */ createBaseVNode("path", { d: "M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z" }, null, -1);
const _hoisted_4$7 = [
  _hoisted_2$e,
  _hoisted_3$b
];
function _sfc_render$s(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$i, _hoisted_4$7);
}
const __nuxt_component_2$4 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$s]]);
const _sfc_main$u = {
  props: {
    text: String,
    textClass: [String, Array],
    type: String
  }
};
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.text ? (openBlock(), createBlock(resolveDynamicComponent($props.type || "p"), {
    key: 0,
    class: normalizeClass($props.textClass)
  }, {
    default: withCtx(() => [
      createTextVNode(toDisplayString($props.text), 1)
    ]),
    _: 1
  }, 8, ["class"])) : createCommentVNode("", true);
}
const __nuxt_component_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$r]]);
const breaking = "_breaking_1346e_109";
const watch = "_watch_1346e_113";
const horizontal = "_horizontal_1346e_165";
const vertical = "_vertical_1346e_169";
const bullets = "_bullets_1346e_179";
const articleStyles = {
  "article-header": "_article-header_1346e_1",
  "article-body": "_article-body_1346e_46",
  "article-image-container": "_article-image-container_1346e_66",
  "article-image": "_article-image_1346e_66",
  "article-image-captions": "_article-image-captions_1346e_90",
  "article-image-tag": "_article-image-tag_1346e_95",
  breaking,
  watch,
  "article-title": "_article-title_1346e_129",
  "article-content": "_article-content_1346e_138",
  "article-list": "_article-list_1346e_152",
  "article-list-item": "_article-list-item_1346e_160",
  horizontal,
  vertical,
  bullets,
  "article-hero": "_article-hero_1346e_194",
  "article-list-content": "_article-list-content_1346e_212"
};
const _sfc_main$t = {
  props: {
    tag: Object
  },
  data() {
    return {
      styles: articleStyles
    };
  }
};
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_LightningIcon = __nuxt_component_0$d;
  const _component_PlayIcon = __nuxt_component_1$7;
  const _component_FireIcon = __nuxt_component_2$4;
  const _component_ArticleText = __nuxt_component_2$3;
  return $props.tag ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: normalizeClass([$data.styles["article-image-tag"], $data.styles[$props.tag.type]])
  }, [
    $props.tag.type === "breaking" ? (openBlock(), createBlock(_component_LightningIcon, { key: 0 })) : createCommentVNode("", true),
    $props.tag.type === "watch" ? (openBlock(), createBlock(_component_PlayIcon, { key: 1 })) : createCommentVNode("", true),
    $props.tag.type === "new" ? (openBlock(), createBlock(_component_FireIcon, { key: 2 })) : createCommentVNode("", true),
    createVNode(_component_ArticleText, {
      text: $props.tag.label
    }, null, 8, ["text"])
  ], 2)) : createCommentVNode("", true);
}
const __nuxt_component_0$c = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$q]]);
const _sfc_main$s = {
  props: {
    image: Object,
    imageClass: String,
    meta: Object
  },
  data() {
    return {
      styles: articleStyles
    };
  }
};
const _hoisted_1$h = ["src", "width", "height", "alt"];
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b;
  const _component_ArticleTag = __nuxt_component_0$c;
  const _component_ArticleText = __nuxt_component_2$3;
  return openBlock(), createElementBlock(Fragment, null, [
    $props.image ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass($props.imageClass)
    }, [
      createBaseVNode("img", {
        class: normalizeClass($data.styles["article-image"]),
        src: $props.image.src,
        width: $props.image.width,
        height: $props.image.height,
        alt: $props.image.alt
      }, null, 10, _hoisted_1$h),
      createVNode(_component_ArticleTag, {
        tag: (_a = $props.meta) == null ? void 0 : _a.tag
      }, null, 8, ["tag"])
    ], 2)) : createCommentVNode("", true),
    createVNode(_component_ArticleText, {
      "text-class": $data.styles["article-image-captions"],
      text: (_b = $props.meta) == null ? void 0 : _b.captions
    }, null, 8, ["text-class", "text"])
  ], 64);
}
const __nuxt_component_1$6 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$p]]);
const preview = "_preview_17sc4_2";
const page = "_page_17sc4_12";
const row = "_row_17sc4_46";
const column = "_column_17sc4_52";
const styles$8 = {
  preview,
  "no-scroll": "_no-scroll_17sc4_8",
  page,
  "page-main": "_page-main_17sc4_28",
  row,
  column,
  "columns-1": "_columns-1_17sc4_59",
  "columns-2-balanced": "_columns-2-balanced_17sc4_63",
  "columns-3-balanced": "_columns-3-balanced_17sc4_67",
  "columns-4-balanced": "_columns-4-balanced_17sc4_71",
  "columns-3-wide": "_columns-3-wide_17sc4_75",
  "columns-3-narrow": "_columns-3-narrow_17sc4_79",
  "columns-wrap": "_columns-wrap_17sc4_83",
  "grid-container": "_grid-container_17sc4_88",
  "grid-wrap": "_grid-wrap_17sc4_95",
  "grid-item": "_grid-item_17sc4_99",
  "row-header": "_row-header_17sc4_104"
};
const _sfc_main$r = {
  props: {
    type: String,
    content: [String, Array],
    display: String
  },
  data() {
    return {
      styles: articleStyles,
      layoutStyles: styles$8
    };
  }
};
const _hoisted_1$g = ["href"];
const _hoisted_2$d = ["href"];
const _hoisted_3$a = ["href"];
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ArticleText = __nuxt_component_2$3;
  const _component_ArticleImage = __nuxt_component_1$6;
  return openBlock(), createElementBlock(Fragment, null, [
    $props.type === "text" ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass($data.styles["article-content"])
    }, [
      createVNode(_component_ArticleText, { text: $props.content }, null, 8, ["text"])
    ], 2)) : createCommentVNode("", true),
    $props.type === "list" ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass($data.styles["article-content"])
    }, [
      createBaseVNode("ul", {
        class: normalizeClass([$data.styles["article-list"], $data.styles.vertical, { [$data.styles[$props.display]]: $props.display }])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.content, (item) => {
          return openBlock(), createElementBlock("li", {
            key: item.id,
            class: normalizeClass($data.styles["article-list-item"])
          }, [
            item.url && !item.title ? (openBlock(), createElementBlock("a", {
              key: 0,
              href: item.url
            }, [
              createVNode(_component_ArticleText, {
                text: item.content
              }, null, 8, ["text"])
            ], 8, _hoisted_1$g)) : (openBlock(), createBlock(_component_ArticleText, {
              key: 1,
              text: item.content
            }, null, 8, ["text"]))
          ], 2);
        }), 128))
      ], 2)
    ], 2)) : createCommentVNode("", true),
    $props.type === "articles-list" ? (openBlock(), createElementBlock("div", {
      key: 2,
      class: normalizeClass($data.styles["article-list-content"])
    }, [
      createBaseVNode("ul", {
        class: normalizeClass([$data.styles["article-list"], $data.styles.vertical])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.content, (item) => {
          return openBlock(), createElementBlock("li", {
            key: item.id,
            class: normalizeClass($data.styles["article-list-item"])
          }, [
            createVNode(_component_ArticleText, {
              "text-class": [$data.styles["article-title"], "truncate-multiline", "truncate-multiline-3"],
              text: item.title,
              type: "h3"
            }, null, 8, ["text-class", "text"]),
            item.url && !item.title ? (openBlock(), createElementBlock("a", {
              key: 0,
              href: item.url
            }, [
              createVNode(_component_ArticleText, {
                text: item.content
              }, null, 8, ["text"])
            ], 8, _hoisted_2$d)) : (openBlock(), createBlock(_component_ArticleText, {
              key: 1,
              text: item.content
            }, null, 8, ["text"]))
          ], 2);
        }), 128))
      ], 2)
    ], 2)) : createCommentVNode("", true),
    $props.type === "excerpt" ? (openBlock(), createElementBlock("ul", {
      key: 3,
      class: normalizeClass([$data.styles["article-list"], $data.styles.horizontal])
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.content, (item) => {
        return openBlock(), createElementBlock("li", {
          key: item.id,
          class: normalizeClass($data.styles["article-list-item"])
        }, [
          createVNode(_component_ArticleImage, {
            "image-class": $data.styles["article-hero"],
            image: item.image
          }, null, 8, ["image-class", "image"]),
          createBaseVNode("div", {
            class: normalizeClass($data.styles["article-content"])
          }, [
            createVNode(_component_ArticleText, {
              "text-class": ["truncate-multiline", "truncate-multiline-3"],
              text: item.text,
              type: "div"
            }, null, 8, ["text"])
          ], 2)
        ], 2);
      }), 128))
    ], 2)) : createCommentVNode("", true),
    $props.type === "grid" ? (openBlock(), createElementBlock("div", {
      key: 4,
      class: normalizeClass([$data.layoutStyles["grid-container"], { [$data.layoutStyles[$props.display]]: $props.display }])
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.content, (item) => {
        return openBlock(), createElementBlock("div", {
          key: item.id,
          class: normalizeClass($data.layoutStyles["grid-item"])
        }, [
          createVNode(_component_ArticleImage, {
            "image-class": $data.styles["article-image-container"],
            image: item.image,
            meta: item.meta
          }, null, 8, ["image-class", "image", "meta"]),
          item.url ? (openBlock(), createElementBlock("a", {
            key: 0,
            href: item.url
          }, [
            createVNode(_component_ArticleText, {
              "text-class": [$data.styles["article-content"], "truncate-multiline", "truncate-multiline-3"],
              text: item.text,
              type: "h3"
            }, null, 8, ["text-class", "text"])
          ], 8, _hoisted_3$a)) : (openBlock(), createBlock(_component_ArticleText, {
            key: 1,
            "text-class": [$data.styles["article-content"], "truncate-multiline", "truncate-multiline-3"],
            text: item.text,
            type: "h3"
          }, null, 8, ["text-class", "text"]))
        ], 2);
      }), 128))
    ], 2)) : createCommentVNode("", true),
    $props.type === "preview" ? (openBlock(), createElementBlock("ul", {
      key: 5,
      class: normalizeClass([$data.styles["article-list"], $data.styles.vertical])
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.content, (item) => {
        return openBlock(), createElementBlock("li", {
          key: item.id,
          class: normalizeClass($data.styles["article-list-item"])
        }, [
          createVNode(_component_ArticleImage, {
            "image-class": $data.styles["article-image-container"],
            image: item.image
          }, null, 8, ["image-class", "image"]),
          createVNode(_component_ArticleText, {
            "text-class": [$data.styles["article-title"], "truncate-multiline", "truncate-multiline-3"],
            text: item.title,
            type: "h3"
          }, null, 8, ["text-class", "text"])
        ], 2);
      }), 128))
    ], 2)) : createCommentVNode("", true)
  ], 64);
}
const __nuxt_component_3$2 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$o]]);
const _sfc_main$q = {
  props: {
    article: Object
  },
  data() {
    return {
      layoutStyles: styles$8,
      articleStyles
    };
  }
};
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ArticleHeader = __nuxt_component_0$e;
  const _component_ArticleImage = __nuxt_component_1$6;
  const _component_ArticleText = __nuxt_component_2$3;
  const _component_ArticleContent = __nuxt_component_3$2;
  return openBlock(), createElementBlock("article", {
    class: normalizeClass([$data.layoutStyles.column, $data.layoutStyles[$props.article.class], $data.articleStyles.article])
  }, [
    createVNode(_component_ArticleHeader, {
      "header-class": $data.articleStyles["article-header"],
      text: $props.article.header,
      link: $props.article.url
    }, null, 8, ["header-class", "text", "link"]),
    createBaseVNode("section", {
      class: normalizeClass($data.articleStyles["article-body"])
    }, [
      createVNode(_component_ArticleImage, {
        "image-class": $data.articleStyles["article-image-container"],
        image: $props.article.image,
        meta: $props.article.meta
      }, null, 8, ["image-class", "image", "meta"]),
      createVNode(_component_ArticleText, {
        "text-class": [$data.articleStyles["article-title"], "truncate-singleline"],
        text: $props.article.title,
        type: "h3"
      }, null, 8, ["text-class", "text"]),
      createVNode(_component_ArticleContent, {
        type: $props.article.type,
        content: $props.article.content,
        display: $props.article.display
      }, null, 8, ["type", "content", "display"])
    ], 2)
  ], 2);
}
const __nuxt_component_0$b = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$n]]);
const _sfc_main$p = {
  props: {
    section: Object
  },
  data() {
    return {
      styles: styles$8
    };
  }
};
const _hoisted_1$f = ["id"];
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_Article = __nuxt_component_0$b;
  return openBlock(), createElementBlock(Fragment, null, [
    ((_a = $props.section) == null ? void 0 : _a.name) ? (openBlock(), createElementBlock("div", {
      key: 0,
      id: $props.section.id,
      class: normalizeClass($data.styles["row-header"])
    }, [
      createBaseVNode("h2", null, toDisplayString($props.section.name), 1)
    ], 10, _hoisted_1$f)) : createCommentVNode("", true),
    createBaseVNode("section", {
      class: normalizeClass($data.styles.row)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.section.articles, (articles, index) => {
        return openBlock(), createBlock(_component_Article, {
          key: `${$props.section.id}-${index}`,
          article: articles
        }, null, 8, ["article"]);
      }), 128))
    ], 2)
  ], 64);
}
const __nuxt_component_0$a = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$m]]);
const toast = "_toast_bwm7t_1";
const open$2 = "_open_bwm7t_16";
const toastStyles = {
  toast,
  open: open$2,
  "toast-close-button": "_toast-close-button_bwm7t_23",
  "toast-close-button-icon": "_toast-close-button-icon_bwm7t_34",
  "toast-header": "_toast-header_bwm7t_41",
  "toast-body": "_toast-body_bwm7t_52",
  "toast-description": "_toast-description_bwm7t_59",
  "toast-actions": "_toast-actions_bwm7t_78",
  "toast-actions-button": "_toast-actions-button_bwm7t_83"
};
const button = "_button_2dnt4_1";
const dark = "_dark_2dnt4_24";
const buttonStyles = {
  button,
  "primary-button": "_primary-button_2dnt4_18",
  dark,
  "secondary-button": "_secondary-button_2dnt4_42"
};
const _sfc_main$o = {
  props: {
    onClose: Function,
    onAccept: Function,
    onReject: Function,
    notification: Object
  },
  data() {
    return {
      toastStyles,
      buttonStyles,
      callbacks: {
        "accept": this.onAccept,
        "reject": this.onReject
      }
    };
  }
};
const _hoisted_1$e = /* @__PURE__ */ createBaseVNode("span", { class: "animated-icon-inner" }, [
  /* @__PURE__ */ createBaseVNode("span"),
  /* @__PURE__ */ createBaseVNode("span")
], -1);
const _hoisted_2$c = [
  _hoisted_1$e
];
const _hoisted_3$9 = ["id", "onClick"];
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([$data.toastStyles.toast, $data.toastStyles.open])
  }, [
    createBaseVNode("button", {
      id: "close-toast-link",
      class: normalizeClass($data.toastStyles["toast-close-button"]),
      title: "Close Button",
      onClick: _cache[0] || (_cache[0] = (...args) => $props.onClose && $props.onClose(...args))
    }, [
      createBaseVNode("div", {
        class: normalizeClass([$data.toastStyles["toast-close-button-icon"], "animated-icon", "close-icon", "hover"]),
        title: "Close Icon"
      }, _hoisted_2$c, 2)
    ], 2),
    $props.notification.title ? (openBlock(), createElementBlock("header", {
      key: 0,
      class: normalizeClass($data.toastStyles["toast-header"])
    }, [
      createBaseVNode("h2", null, toDisplayString($props.notification.title), 1)
    ], 2)) : createCommentVNode("", true),
    createBaseVNode("section", {
      class: normalizeClass($data.toastStyles["toast-body"])
    }, [
      createBaseVNode("div", {
        class: normalizeClass($data.toastStyles["toast-description"])
      }, toDisplayString($props.notification.description), 3),
      createBaseVNode("div", {
        class: normalizeClass($data.toastStyles["toast-actions"])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.notification.actions, (action) => {
          return openBlock(), createElementBlock("button", {
            id: `toast-${action.type}-button`,
            key: `toast-${action.type}-button`,
            class: normalizeClass([$data.buttonStyles.button, $data.buttonStyles[`${action.priority}-button`], $data.toastStyles["toast-actions-button"]]),
            onClick: $data.callbacks[action.type]
          }, toDisplayString(action.name), 11, _hoisted_3$9);
        }), 128))
      ], 2)
    ], 2)
  ], 2);
}
const __nuxt_component_1$5 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$l]]);
const requestIdleCallback = globalThis.requestIdleCallback || ((cb) => {
  const start = Date.now();
  const idleDeadline = {
    didTimeout: false,
    timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
  };
  return setTimeout(() => {
    cb(idleDeadline);
  }, 1);
});
const cancelIdleCallback = globalThis.cancelIdleCallback || ((id) => {
  clearTimeout(id);
});
const onNuxtReady = (callback) => {
  const nuxtApp = useNuxtApp();
  if (nuxtApp.isHydrating) {
    nuxtApp.hooks.hookOnce("app:suspense:resolve", () => {
      requestIdleCallback(callback);
    });
  } else {
    requestIdleCallback(callback);
  }
};
async function preloadRouteComponents(to, router = useRouter()) {
  const { path, matched } = router.resolve(to);
  if (!matched.length) {
    return;
  }
  if (!router._routePreloaded) {
    router._routePreloaded = /* @__PURE__ */ new Set();
  }
  if (router._routePreloaded.has(path)) {
    return;
  }
  const promises = router._preloadPromises = router._preloadPromises || [];
  if (promises.length > 4) {
    return Promise.all(promises).then(() => preloadRouteComponents(to, router));
  }
  router._routePreloaded.add(path);
  const components = matched.map((component) => {
    var _a;
    return (_a = component.components) == null ? void 0 : _a.default;
  }).filter((component) => typeof component === "function");
  for (const component of components) {
    const promise = Promise.resolve(component()).catch(() => {
    }).finally(() => promises.splice(promises.indexOf(promise)));
    promises.push(promise);
  }
  await Promise.all(promises);
}
function reloadNuxtApp(options = {}) {
  const path = options.path || window.location.pathname;
  let handledPath = {};
  try {
    handledPath = JSON.parse(sessionStorage.getItem("nuxt:reload") || "{}");
  } catch {
  }
  if (options.force || (handledPath == null ? void 0 : handledPath.path) !== path || (handledPath == null ? void 0 : handledPath.expires) < Date.now()) {
    try {
      sessionStorage.setItem("nuxt:reload", JSON.stringify({ path, expires: Date.now() + (options.ttl ?? 1e4) }));
    } catch {
    }
    if (options.persistState) {
      try {
        sessionStorage.setItem("nuxt:reload:state", JSON.stringify({ state: useNuxtApp().payload.state }));
      } catch {
      }
    }
    if (window.location.pathname !== path) {
      window.location.href = path;
    } else {
      window.location.reload();
    }
  }
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  const resolveTrailingSlashBehavior = (to, resolve2) => {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    const normalizeTrailingSlash = options.trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
    if (typeof to === "string") {
      return normalizeTrailingSlash(to, true);
    }
    const path = "path" in to ? to.path : resolve2(to).path;
    return {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: normalizeTrailingSlash(path, true)
    };
  };
  return /* @__PURE__ */ defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, { acceptRelative: true });
      });
      const prefetched = ref(false);
      const el = ref(null);
      const elRef = (ref2) => {
        var _a;
        el.value = props.custom ? (_a = ref2 == null ? void 0 : ref2.$el) == null ? void 0 : _a.nextElementSibling : ref2 == null ? void 0 : ref2.$el;
      };
      {
        const shouldPrefetch = props.prefetch !== false && props.noPrefetch !== true && props.target !== "_blank" && !isSlowConnection();
        if (shouldPrefetch) {
          const nuxtApp = useNuxtApp();
          let idleId;
          let unobserve = null;
          onMounted(() => {
            const observer = useObserver();
            onNuxtReady(() => {
              idleId = requestIdleCallback(() => {
                var _a;
                if ((_a = el == null ? void 0 : el.value) == null ? void 0 : _a.tagName) {
                  unobserve = observer.observe(el.value, async () => {
                    unobserve == null ? void 0 : unobserve();
                    unobserve = null;
                    const path = typeof to.value === "string" ? to.value : router.resolve(to.value).fullPath;
                    await Promise.all([
                      nuxtApp.hooks.callHook("link:prefetch", path).catch(() => {
                      }),
                      !isExternal.value && preloadRouteComponents(to.value, router).catch(() => {
                      })
                    ]);
                    prefetched.value = true;
                  });
                }
              });
            });
          });
          onBeforeUnmount(() => {
            if (idleId) {
              cancelIdleCallback(idleId);
            }
            unobserve == null ? void 0 : unobserve();
            unobserve = null;
          });
        }
      }
      return () => {
        var _a, _b;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL$1(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery$1(url.search);
                },
                hash: url.hash,
                // stub properties for compat with vue-router
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_0$9 = /* @__PURE__ */ defineNuxtLink({ componentName: "NuxtLink" });
function useObserver() {
  const nuxtApp = useNuxtApp();
  if (nuxtApp._observer) {
    return nuxtApp._observer;
  }
  let observer = null;
  const callbacks = /* @__PURE__ */ new Map();
  const observe = (element, callback) => {
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        for (const entry2 of entries) {
          const callback2 = callbacks.get(entry2.target);
          const isVisible = entry2.isIntersecting || entry2.intersectionRatio > 0;
          if (isVisible && callback2) {
            callback2();
          }
        }
      });
    }
    callbacks.set(element, callback);
    observer.observe(element);
    return () => {
      callbacks.delete(element);
      observer.unobserve(element);
      if (callbacks.size === 0) {
        observer.disconnect();
        observer = null;
      }
    };
  };
  const _observer = nuxtApp._observer = {
    observe
  };
  return _observer;
}
function isSlowConnection() {
  const cn = navigator.connection;
  if (cn && (cn.saveData || /2g/.test(cn.effectiveType))) {
    return true;
  }
  return false;
}
const _sfc_main$n = {
  setup() {
    const { content: content2 } = inject("data");
    const route = useRoute();
    return { route, content: content2 };
  },
  data() {
    return {
      showPortal: false
    };
  },
  mounted() {
    this.showPortal = this.content[this.$route.name].notification;
  },
  methods: {
    openPortal() {
      this.showPortal = true;
    },
    closePortal() {
      this.showPortal = false;
    }
  }
};
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Section = __nuxt_component_0$a;
  const _component_Toast = __nuxt_component_1$5;
  return openBlock(), createElementBlock(Fragment, null, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.content[$setup.route.name].sections, (section) => {
      return openBlock(), createBlock(_component_Section, {
        key: section.id,
        section
      }, null, 8, ["section"]);
    }), 128)),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      $setup.content[$setup.route.name].notification ? withDirectives((openBlock(), createBlock(_component_Toast, {
        key: 0,
        "on-close": $options.closePortal,
        "on-accept": $options.closePortal,
        "on-reject": $options.closePortal,
        notification: $setup.content[$setup.route.name].notification
      }, null, 8, ["on-close", "on-accept", "on-reject", "notification"])), [
        [vShow, $data.showPortal]
      ]) : createCommentVNode("", true)
    ]))
  ], 64);
}
const PageVue = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$k]]);
const routerOptions0 = {
  routes: (_routes2) => [
    {
      name: "home",
      path: "/",
      component: PageVue
    },
    {
      name: "us",
      path: "/us",
      component: PageVue
    },
    {
      name: "world",
      path: "/world",
      component: PageVue
    },
    {
      name: "politics",
      path: "/politics",
      component: PageVue
    },
    {
      name: "business",
      path: "/business",
      component: PageVue
    },
    {
      name: "opinion",
      path: "/opinion",
      component: PageVue
    },
    {
      name: "health",
      path: "/health",
      component: PageVue
    },
    {
      name: "",
      path: "/index.html",
      component: PageVue
    }
  ]
};
const routerOptions1 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve2) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve2(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {
  hashMode: true
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions1,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    statusCode: 404,
    statusMessage: `Page Not Found: ${to.fullPath}`
  });
  const unsub = router.beforeResolve((final) => {
    unsub();
    if (final === to) {
      const unsub2 = router.afterEach(async () => {
        unsub2();
        await nuxtApp.runWithContext(() => showError(error));
        window.history.pushState({}, "", to.fullPath);
      });
      return false;
    }
  });
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {};
function createCurrentLocation(base, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    const slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/") {
      pathFromHash = "/" + pathFromHash;
    }
    return withoutBase(pathFromHash, "");
  }
  const path = withoutBase(pathname, base);
  return path + search + hash;
}
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b;
    let __temp, __restore;
    let routerBase = useRuntimeConfig().app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history2 = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? (routerOptions.hashMode ? createWebHashHistory(routerBase) : createWebHistory(routerBase));
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const initialURL = createCurrentLocation(routerBase, window.location);
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        var _a2;
        if (from === START_LOCATION_NORMALIZED) {
          startPosition = savedPosition;
          return;
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
        return (_a2 = routerOptions.scrollBehavior) == null ? void 0 : _a2.call(routerOptions, to, START_LOCATION_NORMALIZED, startPosition || savedPosition);
      },
      history: history2,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      route[key] = computed(() => _route.value[key]);
    }
    nuxtApp._route = reactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    const error = useError();
    try {
      if (false)
        ;
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const initialLayout = useState("_layout");
    router.beforeEach(async (to, from) => {
      var _a2;
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout.value;
      }
      nuxtApp._processingMiddleware = true;
      {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          if (Array.isArray(componentMiddleware)) {
            for (const entry2 of componentMiddleware) {
              middlewareEntries.add(entry2);
            }
          } else {
            middlewareEntries.add(componentMiddleware);
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a2 = namedMiddleware[entry2]) == null ? void 0 : _a2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          if (!nuxtApp.payload.serverRendered && nuxtApp.isHydrating) {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(() => {
      delete nuxtApp._processingMiddleware;
    });
    router.afterEach(async (to, _from, failure) => {
      delete nuxtApp._processingMiddleware;
      if (!nuxtApp.isHydrating && error.value) {
        await nuxtApp.runWithContext(clearError);
      }
      if (to.matched.length === 0 && true) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        await router.replace({
          ...router.resolve(initialURL),
          name: void 0,
          // #4920, #4982
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
}, 1);
const layouts = {};
const prefetch_client_5tzzN0oIVL = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:prefetch",
  setup(nuxtApp) {
    const router = useRouter();
    nuxtApp.hooks.hook("app:mounted", () => {
      router.beforeEach(async (to) => {
        var _a;
        const layout = (_a = to == null ? void 0 : to.meta) == null ? void 0 : _a.layout;
        if (layout && typeof layouts[layout] === "function") {
          await layouts[layout]();
        }
      });
    });
    nuxtApp.hooks.hook("link:prefetch", (url) => {
      var _a, _b, _c, _d;
      if (hasProtocol(url)) {
        return;
      }
      const route = router.resolve(url);
      if (!route) {
        return;
      }
      const layout = (_a = route == null ? void 0 : route.meta) == null ? void 0 : _a.layout;
      let middleware = Array.isArray((_b = route == null ? void 0 : route.meta) == null ? void 0 : _b.middleware) ? (_c = route == null ? void 0 : route.meta) == null ? void 0 : _c.middleware : [(_d = route == null ? void 0 : route.meta) == null ? void 0 : _d.middleware];
      middleware = middleware.filter((m) => typeof m === "string");
      for (const name of middleware) {
        if (typeof namedMiddleware[name] === "function") {
          namedMiddleware[name]();
        }
      }
      if (layout && typeof layouts[layout] === "function") {
        layouts[layout]();
      }
    });
  }
});
const chunk_reload_client_UciE0i6zes = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:chunk-reload",
  setup(nuxtApp) {
    const router = useRouter();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const chunkErrors = /* @__PURE__ */ new Set();
    router.beforeEach(() => {
      chunkErrors.clear();
    });
    nuxtApp.hook("app:chunkError", ({ error }) => {
      chunkErrors.add(error);
    });
    router.onError((error, to) => {
      if (chunkErrors.has(error)) {
        const isHash = "href" in to && to.href.startsWith("#");
        const path = isHash ? config.app.baseURL + to.href : joinURL(config.app.baseURL, to.fullPath);
        reloadNuxtApp({ path, persistState: true });
      }
    });
  }
});
const payload_client_yVLowv6hDl = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:payload",
  setup(nuxtApp) {
    if (!isPrerendered()) {
      return;
    }
    nuxtApp.hooks.hook("link:prefetch", async (url) => {
      if (!parseURL$1(url).protocol) {
        await loadPayload(url);
      }
    });
    useRouter().beforeResolve(async (to, from) => {
      if (to.path === from.path) {
        return;
      }
      const payload = await loadPayload(to.path);
      if (!payload) {
        return;
      }
      Object.assign(nuxtApp.static.data, payload.data);
    });
  }
});
const base_url_client_1DAtK8Xmpg = /* @__PURE__ */ defineNuxtPlugin({
  order: -40,
  setup(nuxtApp) {
    nuxtApp.$config.app.baseURL = window.location.pathname.replace(/\/dist\/(.*)/, "/dist/");
    nuxtApp.$config.app.cdnURL = "/";
  }
});
const _plugins = [
  revive_payload_client_4sVQNw7RlN,
  components_plugin_KR1HBZs4kY,
  unhead_KgADcZ0jPj,
  plugin,
  prefetch_client_5tzzN0oIVL,
  chunk_reload_client_UciE0i6zes,
  payload_client_yVLowv6hDl,
  base_url_client_1DAtK8Xmpg
];
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => props ? h(KeepAlive, props === true ? {} : props, children) : children };
};
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
const __nuxt_component_0$8 = /* @__PURE__ */ defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(RouteProvider, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const RouteProvider = /* @__PURE__ */ defineComponent({
  name: "RouteProvider",
  // TODO: Type props
  // eslint-disable-next-line vue/require-prop-types
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const _sfc_main$m = {};
const _hoisted_1$d = {
  viewBox: "0 0 469 64",
  width: "469",
  height: "64"
};
const _hoisted_2$b = /* @__PURE__ */ createBaseVNode("title", null, "The Daily Broadcast", -1);
const _hoisted_3$8 = /* @__PURE__ */ createBaseVNode("path", { d: "m16.7 56h-10.3v-41.7h-6.1v-9.9h22.5v9.9h-6.1zm19.6 0h-10.8v-51.5h10.8v12q0.8-2.5 2.6-3.7 1.8-1.2 4.1-1.2 4.6 0 6.7 2.9 2 2.9 2 7.7v33.8h-10.6v-33.1q0-1.5-0.6-2.4-0.6-0.9-1.9-0.9-1 0-1.7 1-0.6 0.9-0.6 2.2zm31.8 0.5q-4.6 0-7.4-1.8-2.8-1.8-4-5.1-1.2-3.3-1.2-7.9v-17.7q0-6.1 3.5-9.3 3.5-3.1 9.7-3.1 12.6 0 12.6 12.4v3.2q0 5.8-0.1 7.8h-15.2v8.5q0 1.2 0.1 2.3 0.2 1.1 0.7 1.8 0.5 0.8 1.6 0.8 1.7 0 2.1-1.4 0.4-1.5 0.4-3.8v-4.2h10.4v2.5q0 4.9-1.2 8.3-1.2 3.3-4.1 5-2.9 1.7-7.9 1.7zm-2.2-32.7v6h5v-6q0-2.3-0.6-3.3-0.6-1.1-1.8-1.1-1.2 0-1.9 1-0.7 1-0.7 3.4zm47.3 32.2h-13.8v-51.6h14.1q5.6 0 8.4 3.1 2.8 3.1 2.8 9.1v24.1q0 7.3-2.5 11.3-2.6 4-9 4zm-3.5-42.6v33.5h1.8q2.9 0 2.9-2.8v-26.6q0-2.6-0.7-3.3-0.7-0.8-2.8-0.8zm27 43.1q-3.6 0-5.6-1.7-1.9-1.7-2.6-4.7-0.7-3-0.7-6.7 0-4 0.8-6.6 0.8-2.6 2.7-4.2 1.9-1.6 5.3-2.8l6.5-2.2v-4.5q0-3.6-2.3-3.6-2.1 0-2.1 2.9v2.7h-10.2q0-0.3 0-0.6 0-0.4 0-0.9 0-6.5 3-9.3 3.1-2.7 9.9-2.7 3.5 0 6.3 1.2 2.7 1.3 4.3 3.7 1.7 2.4 1.7 6v33.5h-10.4v-5.2q-0.8 2.7-2.6 4.2-1.7 1.5-4 1.5zm4.2-8.2q1.2 0 1.7-1.1 0.5-1.1 0.5-2.3v-12.3q-2.2 0.9-3.4 2.3-1.2 1.3-1.2 3.9v5.6q0 3.9 2.4 3.9zm27.3-39h-10.5v-8.7h10.5zm0 46.7h-10.5v-44h10.5zm14.8 0h-10.7v-51.6h10.7zm15.2 7.4h-11.8v-6.7h5q1.1 0 1.1-0.8 0-0.4-0.1-0.8l-6.8-43h10l2.9 32.3 3.5-32.3h10.1l-8.1 46.2q-0.5 2.5-1.7 3.8-1.3 1.3-4.1 1.3zm44.9-7.4h-14v-51.5h14q5.6 0 8.1 2.7 2.6 2.8 2.6 9.1v2.2q0 3.7-1.3 5.9-1.3 2.3-3.9 3 3.4 0.8 4.6 4.1 1.2 3.2 1.2 7.9 0 5-0.9 8.7-1 3.8-3.4 5.9-2.5 2-7 2zm-3.9-43.5v11.4h2.1q1.4 0 1.8-1.1 0.4-1.1 0.4-2.7v-5.2q0-2.4-2.2-2.4zm1.1 34.5q4 0 4-3.8v-6.5q0-2.2-0.7-3.4-0.6-1.3-2.5-1.3h-1.9v14.9q0.7 0.1 1.1 0.1zm28.1 9h-10.7v-43.9h10.7v4.9q0.7-2.6 2.7-4 1.9-1.4 4.8-1.4v8.7q-1.3 0-3.1 0.3-1.7 0.3-3.1 0.8-1.3 0.5-1.3 1zm22.9 0.5q-13.1 0-13.1-13.6v-17.6q0-6.3 3.4-9.9 3.5-3.8 9.7-3.8 6.2 0 9.6 3.8 3.5 3.6 3.5 9.9v17.6q0 13.6-13.1 13.6zm0-8.1q1.3 0 1.9-0.9 0.5-1 0.5-2.4v-21.5q0-3.9-2.4-3.9-2.5 0-2.5 3.9v21.5q0 1.4 0.6 2.4 0.6 0.9 1.9 0.9zm25 8.1q-3.7 0-5.6-1.7-1.9-1.7-2.6-4.6-0.7-3-0.7-6.8 0-4 0.8-6.5 0.8-2.6 2.7-4.2 1.9-1.7 5.3-2.8l6.5-2.2v-4.6q0-3.5-2.3-3.5-2.1 0-2.1 2.9v2.6h-10.2q-0.1-0.2-0.1-0.6 0-0.4 0-0.8 0-6.6 3.1-9.3 3.1-2.8 9.8-2.8 3.5 0 6.3 1.3 2.8 1.2 4.4 3.7 1.7 2.4 1.7 6v33.4h-10.5v-5.2q-0.7 2.8-2.5 4.3-1.7 1.4-4 1.4zm4.1-8.1q1.3 0 1.8-1.1 0.5-1.1 0.5-2.4v-12.2q-2.2 0.9-3.4 2.2-1.2 1.3-1.2 3.9v5.7q0 3.9 2.3 3.9zm25.5 8.1q-3 0-4.8-1.1-1.8-1.1-2.7-3.1-0.8-1.9-1.1-4.6-0.3-2.6-0.3-5.6v-19.1q0-5.1 1.8-8.2 1.8-3.2 6.1-3.2 3.2 0 4.9 1.4 1.7 1.4 2.7 3.8v-12.3h10.6v51.5h-10.6v-4.6q-0.9 2.4-2.4 3.7-1.4 1.4-4.2 1.4zm4.1-8.2q1.5 0 1.9-1.2 0.6-1.2 0.6-4.3v-18.5q0-1.5-0.5-3-0.4-1.6-2-1.6-1.7 0-2.1 1.5-0.5 1.4-0.5 3.1v18.5q0 5.5 2.6 5.5zm30.4 8.2q-7.4 0-10.5-3.8-3.1-3.7-3.1-11.1v-13.5q0-5.5 1.2-9.2 1.2-3.6 4.1-5.5 2.9-1.8 8.1-1.8 3.7 0 6.6 1.3 2.9 1.3 4.5 3.8 1.7 2.5 1.7 6.1v6.7h-10.7v-6.1q0-1.6-0.4-2.6-0.5-1.1-1.9-1.1-2.6 0-2.6 3.7v21.3q0 1.4 0.6 2.5 0.6 1.1 1.9 1.1 1.4 0 1.9-1.1 0.6-1.1 0.6-2.6v-7.3h10.6v7.6q0 3.7-1.6 6.3-1.7 2.6-4.5 3.9-2.8 1.4-6.5 1.4zm24.3 0q-3.7 0-5.6-1.7-1.9-1.7-2.6-4.6-0.8-3-0.8-6.8 0-4 0.8-6.5 0.8-2.6 2.7-4.2 2-1.7 5.3-2.8l6.5-2.2v-4.6q0-3.5-2.3-3.5-2.1 0-2.1 2.9v2.6h-10.2q0-0.2 0-0.6 0-0.4 0-0.8 0-6.6 3.1-9.3 3.1-2.8 9.8-2.8 3.5 0 6.3 1.3 2.8 1.2 4.4 3.7 1.6 2.4 1.6 6v33.4h-10.4v-5.2q-0.8 2.8-2.5 4.3-1.8 1.4-4 1.4zm4.1-8.1q1.3 0 1.7-1.1 0.5-1.1 0.5-2.4v-12.2q-2.2 0.9-3.4 2.2-1.2 1.3-1.2 3.9v5.7q0 3.9 2.4 3.9zm28.9 8.1q-13 0-13-13.2v-3.5h10.5v5.2q0 1.5 0.6 2.3 0.6 0.9 1.9 0.9 2.3 0 2.3-3.4 0-2.9-1.2-4.3-1.2-1.4-2.9-2.8l-5.6-4.3q-2.7-2-4.1-4.3-1.3-2.3-1.3-6.4 0-3.7 1.8-6.2 1.8-2.5 4.7-3.7 3-1.2 6.5-1.2 12.8 0 12.8 12.8v0.8h-10.9v-1.7q0-1.3-0.5-2.5-0.4-1.3-1.7-1.3-2.2 0-2.2 2.4 0 2.4 1.8 3.7l6.5 4.8q3.1 2.2 5.1 5.2 2.1 3 2.1 8 0 6.2-3.5 9.5-3.5 3.2-9.7 3.2zm25.5 0q-4.3 0-5.8-1.8-1.4-1.8-1.4-5.5v-27.4h-3v-8h3v-9.3h10.1v9.3h3v8h-3v24.9q0 1.1 0.4 1.6 0.4 0.4 1.3 0.4 0.8 0 1.3-0.1v7.1q-0.3 0.1-2.2 0.5-1.8 0.3-3.7 0.3z" }, null, -1);
const _hoisted_4$6 = [
  _hoisted_2$b,
  _hoisted_3$8
];
function _sfc_render$j(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$d, _hoisted_4$6);
}
const __nuxt_component_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$j]]);
const styles$7 = {
  "page-header": "_page-header_1vcjg_1",
  "page-header-title": "_page-header-title_1vcjg_15"
};
const _sfc_main$l = {
  data() {
    return {
      styles: styles$7
    };
  }
};
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TitleIcon = __nuxt_component_0$7;
  const _component_NuxtLink = __nuxt_component_0$9;
  return openBlock(), createElementBlock("header", {
    class: normalizeClass($data.styles["page-header"])
  }, [
    createVNode(_component_NuxtLink, {
      to: "/",
      class: normalizeClass($data.styles["page-header-title"])
    }, {
      default: withCtx(() => [
        createVNode(_component_TitleIcon)
      ]),
      _: 1
    }, 8, ["class"])
  ], 2);
}
const __nuxt_component_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$i]]);
const _sfc_main$k = {};
const _hoisted_1$c = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2$a = /* @__PURE__ */ createBaseVNode("title", null, "Logo Icon", -1);
const _hoisted_3$7 = /* @__PURE__ */ createBaseVNode("path", { d: "M2 24h2.948c1-.923 2.004-2 3.55-2 1.547 0 2.55 1.077 3.55 2h2.948l-6.498-6-6.498 6zm20-8.042c0 3.269-5.858 3.387-9.787 1.79-6.835-2.779-9.629-9.79-7.817-15.17.84-2.496 1.852-3.84 6.333-.922 1.101.716 2.27 1.649 3.437 2.722l-1.72 1.152c-7.717-7.009-6.992-2.036-.983 4.55 5.858 6.417 11.668 8.615 5.767.717l1.199-1.745c1.223 1.634 3.571 4.873 3.571 6.906zm-1.026-12.437c-.004.829-.68 1.497-1.508 1.492-.225-.001-.436-.056-.628-.146l-3.829 5.646c-.784-.555-1.994-1.768-2.548-2.554l5.682-3.77c-.104-.207-.169-.437-.168-.684.005-.829.68-1.497 1.507-1.492.828.005 1.497.68 1.492 1.508z" }, null, -1);
const _hoisted_4$5 = [
  _hoisted_2$a,
  _hoisted_3$7
];
function _sfc_render$h(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$c, _hoisted_4$5);
}
const __nuxt_component_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$h]]);
const navbar = "_navbar_q1d3l_1";
const active$1 = "_active_q1d3l_111";
const navbarStyles = {
  navbar,
  "navbar-toggle": "_navbar-toggle_q1d3l_1",
  "navbar-label": "_navbar-label_q1d3l_19",
  "navbar-label-icon": "_navbar-label-icon_q1d3l_33",
  "navbar-content": "_navbar-content_q1d3l_54",
  "navbar-list": "_navbar-list_q1d3l_60",
  "navbar-item": "_navbar-item_q1d3l_69",
  "navbar-dropdown-item": "_navbar-dropdown-item_q1d3l_81",
  active: active$1,
  "navbar-active-path": "_navbar-active-path_q1d3l_117",
  "navbar-icons": "_navbar-icons_q1d3l_121"
};
const _sfc_main$j = {
  props: {
    label: String,
    url: String,
    callback: Function,
    id: String
  },
  data() {
    return {
      styles: navbarStyles
    };
  }
};
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$9;
  return openBlock(), createBlock(_component_NuxtLink, {
    id: $props.id,
    "active-class": $data.styles["active"],
    to: $props.url,
    onClick: $props.callback
  }, {
    default: withCtx(() => [
      createTextVNode(toDisplayString($props.label), 1)
    ]),
    _: 1
  }, 8, ["id", "active-class", "to", "onClick"]);
}
const __nuxt_component_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$g]]);
const dropdown = "_dropdown_ef795_1";
const styles$6 = {
  dropdown,
  "dropdown-toggle": "_dropdown-toggle_ef795_8",
  "dropdown-label": "_dropdown-label_ef795_21",
  "dropdown-label-text": "_dropdown-label-text_ef795_43",
  "dropdown-content": "_dropdown-content_ef795_57",
  "dropdown-button": "_dropdown-button_ef795_82"
};
const _sfc_main$i = {
  props: {
    animatedIconClass: String
  },
  setup() {
    const { buttons } = inject("data");
    return { buttons };
  },
  data() {
    return {
      styles: styles$6,
      isOpen: false
    };
  },
  methods: {
    closeDropdown() {
      this.isOpen = false;
    },
    handleChange(e) {
      this.isOpen = e.target.checked;
    }
  }
};
const _hoisted_1$b = ["checked"];
const _hoisted_2$9 = /* @__PURE__ */ createBaseVNode("span", {
  class: "animated-icon-inner",
  title: "Arrow Icon"
}, [
  /* @__PURE__ */ createBaseVNode("span"),
  /* @__PURE__ */ createBaseVNode("span")
], -1);
const _hoisted_3$6 = [
  _hoisted_2$9
];
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($data.styles.dropdown)
  }, [
    createBaseVNode("input", {
      id: "navbar-dropdown-toggle",
      type: "checkbox",
      class: normalizeClass($data.styles["dropdown-toggle"]),
      checked: $data.isOpen,
      onChange: _cache[0] || (_cache[0] = (...args) => $options.handleChange && $options.handleChange(...args))
    }, null, 42, _hoisted_1$b),
    createBaseVNode("label", {
      for: "navbar-dropdown-toggle",
      class: normalizeClass($data.styles["dropdown-label"])
    }, [
      createBaseVNode("span", {
        class: normalizeClass($data.styles["dropdown-label-text"])
      }, toDisplayString($setup.buttons.more.label), 3),
      createBaseVNode("div", {
        class: normalizeClass(["animated-icon", "arrow-icon", "arrow", $props.animatedIconClass])
      }, _hoisted_3$6, 2)
    ], 2),
    createBaseVNode("ul", {
      class: normalizeClass($data.styles["dropdown-content"]),
      onClick: _cache[1] || (_cache[1] = (...args) => $options.closeDropdown && $options.closeDropdown(...args))
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2)
  ], 2);
}
const __nuxt_component_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$f]]);
const _sfc_main$h = {
  props: {
    callback: Function,
    id: String
  },
  setup() {
    const { content: content2 } = inject("data");
    const navItems = [];
    const dropdownItems = [];
    Object.keys(content2).forEach((key) => {
      if (content2[key].priority === 1)
        navItems.push(key);
      else if (content2[key].priority === 2)
        dropdownItems.push(key);
    });
    const route = useRoute();
    return { route, content: content2, navItems, dropdownItems };
  },
  data() {
    return {
      styles: navbarStyles
    };
  }
};
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NavlistItem = __nuxt_component_0$5;
  const _component_Dropdown = __nuxt_component_1$3;
  return openBlock(), createElementBlock("ul", {
    class: normalizeClass($data.styles["navbar-list"])
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.navItems, (key) => {
      return openBlock(), createElementBlock("li", {
        key,
        class: normalizeClass($data.styles["navbar-item"])
      }, [
        createVNode(_component_NavlistItem, {
          id: `${$props.id}-${key}-link`,
          label: $setup.content[key].name,
          url: $setup.content[key].url,
          callback: $props.callback
        }, null, 8, ["id", "label", "url", "callback"])
      ], 2);
    }), 128)),
    $setup.dropdownItems.length > 0 ? (openBlock(), createElementBlock("li", {
      key: 0,
      class: normalizeClass($data.styles["navbar-item"])
    }, [
      createVNode(_component_Dropdown, {
        "animated-icon-class": $data.styles["navbar-label-icon"]
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.dropdownItems, (key) => {
            return openBlock(), createElementBlock("li", {
              key,
              class: normalizeClass([$data.styles["navbar-item"], $data.styles["navbar-dropdown-item"]])
            }, [
              createVNode(_component_NavlistItem, {
                id: `${$props.id}-${key}-link`,
                label: $setup.content[key].name,
                url: $setup.content[key].url,
                callback: $props.callback
              }, null, 8, ["id", "label", "url", "callback"])
            ], 2);
          }), 128))
        ]),
        _: 1
      }, 8, ["animated-icon-class"])
    ], 2)) : createCommentVNode("", true)
  ], 2);
}
const __nuxt_component_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$e]]);
const _sfc_main$g = {};
const _hoisted_1$a = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2$8 = /* @__PURE__ */ createBaseVNode("title", null, "Facebook Icon", -1);
const _hoisted_3$5 = /* @__PURE__ */ createBaseVNode("path", { d: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" }, null, -1);
const _hoisted_4$4 = [
  _hoisted_2$8,
  _hoisted_3$5
];
function _sfc_render$d(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$a, _hoisted_4$4);
}
const __nuxt_component_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$d]]);
const _sfc_main$f = {};
const _hoisted_1$9 = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2$7 = /* @__PURE__ */ createBaseVNode("title", null, "Instagram Icon", -1);
const _hoisted_3$4 = /* @__PURE__ */ createBaseVNode("path", { d: "M11.984 16.815c2.596 0 4.706-2.111 4.706-4.707 0-1.409-.623-2.674-1.606-3.538-.346-.303-.735-.556-1.158-.748-.593-.27-1.249-.421-1.941-.421s-1.349.151-1.941.421c-.424.194-.814.447-1.158.749-.985.864-1.608 2.129-1.608 3.538 0 2.595 2.112 4.706 4.706 4.706zm.016-8.184c1.921 0 3.479 1.557 3.479 3.478 0 1.921-1.558 3.479-3.479 3.479s-3.479-1.557-3.479-3.479c0-1.921 1.558-3.478 3.479-3.478zm5.223.369h6.777v10.278c0 2.608-2.114 4.722-4.722 4.722h-14.493c-2.608 0-4.785-2.114-4.785-4.722v-10.278h6.747c-.544.913-.872 1.969-.872 3.109 0 3.374 2.735 6.109 6.109 6.109s6.109-2.735 6.109-6.109c.001-1.14-.327-2.196-.87-3.109zm2.055-9h-12.278v5h-1v-5h-1v5h-1v-4.923c-.346.057-.682.143-1 .27v4.653h-1v-4.102c-1.202.857-2 2.246-2 3.824v3.278h7.473c1.167-1.282 2.798-2 4.511-2 1.722 0 3.351.725 4.511 2h7.505v-3.278c0-2.608-2.114-4.722-4.722-4.722zm2.722 5.265c0 .406-.333.735-.745.735h-2.511c-.411 0-.744-.329-.744-.735v-2.53c0-.406.333-.735.744-.735h2.511c.412 0 .745.329.745.735v2.53z" }, null, -1);
const _hoisted_4$3 = [
  _hoisted_2$7,
  _hoisted_3$4
];
function _sfc_render$c(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$9, _hoisted_4$3);
}
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$c]]);
const _sfc_main$e = {};
const _hoisted_1$8 = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
};
const _hoisted_2$6 = /* @__PURE__ */ createBaseVNode("title", null, "Twitter Icon", -1);
const _hoisted_3$3 = /* @__PURE__ */ createBaseVNode("path", { d: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" }, null, -1);
const _hoisted_4$2 = [
  _hoisted_2$6,
  _hoisted_3$3
];
function _sfc_render$b(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$8, _hoisted_4$2);
}
const __nuxt_component_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$b]]);
const styles$5 = {
  "icons-group": "_icons-group_y92y4_1",
  "icons-group-list": "_icons-group-list_y92y4_5",
  "icons-group-item": "_icons-group-item_y92y4_14",
  "group-icon": "_group-icon_y92y4_29"
};
const _sfc_main$d = {
  props: {
    callback: Function,
    id: String
  },
  setup() {
    const { links } = inject("data");
    return { links };
  },
  data() {
    return {
      styles: styles$5
    };
  }
};
const _hoisted_1$7 = ["id", "href"];
const _hoisted_2$5 = ["id", "href"];
const _hoisted_3$2 = ["id", "href"];
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FacebookIcon = __nuxt_component_0$4;
  const _component_InstagramIcon = __nuxt_component_1$1;
  const _component_TwitterIcon = __nuxt_component_2$2;
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($data.styles["icons-group"])
  }, [
    createBaseVNode("ul", {
      class: normalizeClass($data.styles["icons-group-list"])
    }, [
      createBaseVNode("li", {
        class: normalizeClass($data.styles["icons-group-item"])
      }, [
        createBaseVNode("a", {
          id: `${$props.id}-facebook`,
          href: $setup.links.social.facebook.href
        }, [
          createBaseVNode("div", {
            class: normalizeClass($data.styles["group-icon"])
          }, [
            createVNode(_component_FacebookIcon)
          ], 2)
        ], 8, _hoisted_1$7)
      ], 2),
      createBaseVNode("li", {
        class: normalizeClass($data.styles["icons-group-item"])
      }, [
        createBaseVNode("a", {
          id: `${$props.id}-instagram`,
          href: $setup.links.social.instagram.href
        }, [
          createBaseVNode("div", {
            class: normalizeClass($data.styles["group-icon"])
          }, [
            createVNode(_component_InstagramIcon)
          ], 2)
        ], 8, _hoisted_2$5)
      ], 2),
      createBaseVNode("li", {
        class: normalizeClass($data.styles["icons-group-item"])
      }, [
        createBaseVNode("a", {
          id: `${$props.id}-twitter`,
          href: $setup.links.social.twitter.href
        }, [
          createBaseVNode("div", {
            class: normalizeClass($data.styles["group-icon"])
          }, [
            createVNode(_component_TwitterIcon)
          ], 2)
        ], 8, _hoisted_3$2)
      ], 2)
    ], 2)
  ], 2);
}
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$a]]);
const navStyles = {
  "page-navigation": "_page-navigation_1wkfx_1",
  "page-navigation-row": "_page-navigation-row_1wkfx_14",
  "page-navigation-column-left": "_page-navigation-column-left_1wkfx_28",
  "page-navigation-column-right": "_page-navigation-column-right_1wkfx_29",
  "page-navigation-logo": "_page-navigation-logo_1wkfx_37",
  "page-navigation-button": "_page-navigation-button_1wkfx_56",
  "nav-button": "_nav-button_1wkfx_70"
};
function calculateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
const _sfc_main$c = {
  props: {
    callback: Function
  },
  setup() {
    const { content: content2 } = inject("data");
    const route = useRoute();
    return { route, content: content2 };
  },
  data() {
    return {
      navbarStyles,
      navStyles,
      isOpen: false
    };
  },
  mounted() {
    calculateViewportHeight();
    window.addEventListener("resize", calculateViewportHeight);
  },
  unmounted() {
    window.removeEventListener("resize", calculateViewportHeight);
  },
  methods: {
    handleClick() {
      this.isOpen = false;
    },
    handleChange(e) {
      this.isOpen = e.target.checked;
    }
  }
};
const _hoisted_1$6 = ["id", "checked"];
const _hoisted_2$4 = ["for"];
const _hoisted_3$1 = /* @__PURE__ */ createBaseVNode("span", { className: "visually-hidden" }, "Navbar Toggle", -1);
const _hoisted_4$1 = /* @__PURE__ */ createBaseVNode("span", { className: "animated-icon-inner" }, [
  /* @__PURE__ */ createBaseVNode("span"),
  /* @__PURE__ */ createBaseVNode("span"),
  /* @__PURE__ */ createBaseVNode("span")
], -1);
const _hoisted_5 = [
  _hoisted_4$1
];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_LogoIcon = __nuxt_component_0$6;
  const _component_Navlist = __nuxt_component_1$2;
  const _component_SocialIcons = __nuxt_component_1;
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($data.navbarStyles.navbar)
  }, [
    createBaseVNode("input", {
      id: $data.navbarStyles["navbar-toggle"],
      type: "checkbox",
      checked: $data.isOpen,
      onChange: _cache[0] || (_cache[0] = (...args) => $options.handleChange && $options.handleChange(...args))
    }, null, 40, _hoisted_1$6),
    createBaseVNode("label", {
      for: $data.navbarStyles["navbar-toggle"],
      class: normalizeClass($data.navbarStyles["navbar-label"])
    }, [
      _hoisted_3$1,
      createBaseVNode("div", {
        class: normalizeClass([$data.navbarStyles["navbar-label-icon"], "animated-icon", "hamburger-icon"]),
        title: "Hamburger Icon"
      }, _hoisted_5, 2)
    ], 10, _hoisted_2$4),
    createBaseVNode("button", {
      id: "home-link",
      class: normalizeClass($data.navStyles["page-navigation-logo"]),
      onClick: _cache[1] || (_cache[1] = (...args) => $props.callback && $props.callback(...args))
    }, [
      createVNode(_component_LogoIcon)
    ], 2),
    createBaseVNode("div", {
      class: normalizeClass($data.navbarStyles["navbar-active-path"])
    }, toDisplayString(((_a = $setup.content[$setup.route.path.split("/")[1]]) == null ? void 0 : _a.name) ?? ""), 3),
    createBaseVNode("div", {
      class: normalizeClass($data.navbarStyles["navbar-content"])
    }, [
      createVNode(_component_Navlist, {
        id: "navbar-navlist",
        callback: $options.handleClick
      }, null, 8, ["callback"]),
      createBaseVNode("div", {
        class: normalizeClass($data.navbarStyles["navbar-icons"])
      }, [
        createVNode(_component_SocialIcons, { id: "navbar-social-icons" })
      ], 2)
    ], 2)
  ], 2);
}
const __nuxt_component_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$9]]);
const _sfc_main$b = {
  setup() {
    const { buttons } = inject("data");
    return { buttons };
  },
  data() {
    return {
      navStyles,
      buttonStyles
    };
  },
  methods: {
    logIn() {
      console.log("logIn clicked!");
    },
    openSitemap() {
      navigateTo("/");
    }
  }
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Navbar = __nuxt_component_0$3;
  return openBlock(), createElementBlock("nav", {
    class: normalizeClass($data.navStyles["page-navigation"]),
    "aria-label": "main menu"
  }, [
    createBaseVNode("div", {
      class: normalizeClass($data.navStyles["page-navigation-row"])
    }, [
      createBaseVNode("div", {
        class: normalizeClass($data.navStyles["page-navigation-column-left"])
      }, [
        createVNode(_component_Navbar, { callback: $options.openSitemap }, null, 8, ["callback"])
      ], 2),
      createBaseVNode("div", {
        class: normalizeClass($data.navStyles["page-navigation-column-right"])
      }, [
        createBaseVNode("button", {
          id: "login-button",
          class: normalizeClass([$data.buttonStyles.button, $data.buttonStyles["secondary-button"], $data.navStyles["nav-button"]]),
          onClick: _cache[0] || (_cache[0] = (...args) => $options.logIn && $options.logIn(...args))
        }, toDisplayString($setup.buttons.login.label), 3)
      ], 2)
    ], 2)
  ], 2);
}
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$8]]);
const message = "_message_5ph8q_1";
const open$1 = "_open_5ph8q_13";
const styles$4 = {
  message,
  open: open$1,
  "message-close-button": "_message-close-button_5ph8q_20",
  "message-close-button-icon": "_message-close-button-icon_5ph8q_33",
  "message-header": "_message-header_5ph8q_40",
  "message-body": "_message-body_5ph8q_51",
  "message-description": "_message-description_5ph8q_58"
};
const _sfc_main$a = {
  props: {
    onClose: Function,
    message: Object
  },
  data() {
    return {
      styles: styles$4
    };
  }
};
const _hoisted_1$5 = /* @__PURE__ */ createBaseVNode("span", { class: "animated-icon-inner" }, [
  /* @__PURE__ */ createBaseVNode("span"),
  /* @__PURE__ */ createBaseVNode("span")
], -1);
const _hoisted_2$3 = [
  _hoisted_1$5
];
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([$data.styles.message, $data.styles.open])
  }, [
    createBaseVNode("button", {
      id: "close-message-link",
      class: normalizeClass($data.styles["message-close-button"]),
      title: "Close Button",
      onClick: _cache[0] || (_cache[0] = (...args) => $props.onClose && $props.onClose(...args))
    }, [
      createBaseVNode("div", {
        class: normalizeClass([$data.styles["message-close-button-icon"], "animated-icon", "close-icon", "hover"]),
        title: "Close Icon"
      }, _hoisted_2$3, 2)
    ], 2),
    $props.message.title ? (openBlock(), createElementBlock("header", {
      key: 0,
      class: normalizeClass($data.styles["message-header"])
    }, [
      createBaseVNode("h2", null, toDisplayString($props.message.title), 1)
    ], 2)) : createCommentVNode("", true),
    createBaseVNode("section", {
      class: normalizeClass($data.styles["message-body"])
    }, [
      createBaseVNode("div", {
        class: normalizeClass($data.styles["message-description"])
      }, toDisplayString($props.message.description), 3)
    ], 2)
  ], 2);
}
const __nuxt_component_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$7]]);
const _sfc_main$9 = {
  data() {
    return {
      styles: styles$8
    };
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("main", {
    class: normalizeClass($data.styles["page-main"])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$6]]);
const sitemap = "_sitemap_6x8b1_1";
const active = "_active_6x8b1_21";
const styles$3 = {
  sitemap,
  active,
  "sitemap-list": "_sitemap-list_6x8b1_27",
  "sitemap-item": "_sitemap-item_6x8b1_35",
  "sitemap-header": "_sitemap-header_6x8b1_40",
  "sitemap-sublist": "_sitemap-sublist_6x8b1_46",
  "sitemap-subitem": "_sitemap-subitem_6x8b1_52"
};
const _sfc_main$8 = {
  props: {
    onClick: Function
  },
  setup() {
    const { content: content2 } = inject("data");
    const keys = Object.keys(content2);
    const navItems = keys.reduce(
      (result, key) => {
        result.push(key);
        return result;
      },
      []
    );
    return { content: content2, navItems };
  },
  data() {
    return {
      styles: styles$3
    };
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$9;
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($data.styles.sitemap)
  }, [
    createBaseVNode("ul", {
      class: normalizeClass($data.styles["sitemap-list"])
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.navItems, (key) => {
        return openBlock(), createElementBlock("li", {
          key: `sitemap-page-${$setup.content[key].name}`,
          class: normalizeClass($data.styles["sitemap-item"])
        }, [
          createVNode(_component_NuxtLink, {
            to: $setup.content[key].url,
            "active-class": $data.styles["active"]
          }, {
            default: withCtx(() => [
              createBaseVNode("h4", {
                class: normalizeClass($data.styles["sitemap-header"])
              }, toDisplayString($setup.content[key].name), 3)
            ]),
            _: 2
          }, 1032, ["to", "active-class"]),
          createBaseVNode("ul", {
            class: normalizeClass($data.styles["sitemap-sublist"])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.content[key].sections, (section) => {
              return openBlock(), createElementBlock("li", {
                key: `sitemap-section${section.id}`,
                class: normalizeClass($data.styles["sitemap-subitem"])
              }, [
                createVNode(_component_NuxtLink, {
                  to: `${$setup.content[key].url}#${section.id}`
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(section.name), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])
              ], 2);
            }), 128))
          ], 2)
        ], 2);
      }), 128))
    ], 2)
  ], 2);
}
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$5]]);
const ReducedMotionIcon_vue_vue_type_style_index_0_lang = "";
const _sfc_main$7 = {};
const _hoisted_1$4 = {
  id: "reduced-motion-icon",
  height: "24",
  width: "24",
  viewBox: "0 0 1200 1200"
};
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("title", null, "Reduced Motion Icon", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("g", null, [
  /* @__PURE__ */ createBaseVNode("path", { d: "m411.94 424.61h-332.92c-10.512 0-19.02-8.5078-19.02-19.008s8.5078-19.02 19.02-19.02h332.91c10.5 0 19.02 8.5078 19.02 19.02 0.003906 10.512-8.5156 19.008-19.016 19.008z" }),
  /* @__PURE__ */ createBaseVNode("path", { d: "m411.94 596.26h-227.58c-10.5 0-19.02-8.5078-19.02-19.02 0-10.5 8.5078-19.02 19.02-19.02h227.58c10.5 0 19.02 8.5078 19.02 19.02-0.007813 10.508-8.5156 19.02-19.016 19.02z" }),
  /* @__PURE__ */ createBaseVNode("path", { d: "m411.94 767.89h-122.25c-10.5 0-19.02-8.5078-19.02-19.02 0-10.512 8.5078-19.02 19.02-19.02h122.24c10.5 0 19.02 8.5078 19.02 19.02 0.003906 10.512-8.5156 19.02-19.016 19.02z" }),
  /* @__PURE__ */ createBaseVNode("path", { d: "m824.59 915.41c-173.9 0-315.41-141.49-315.41-315.41s141.49-315.41 315.41-315.41 315.41 141.49 315.41 315.41-141.49 315.41-315.41 315.41zm0-577.58c-144.55 0-262.16 117.61-262.16 262.18s117.61 262.18 262.16 262.18 262.16-117.61 262.16-262.18-117.6-262.18-262.16-262.18z" })
], -1);
const _hoisted_4 = [
  _hoisted_2$2,
  _hoisted_3
];
function _sfc_render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, _hoisted_4);
}
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$4]]);
const _sfc_main$6 = {
  props: {
    callback: Function,
    id: String
  },
  data() {
    return {
      styles: styles$5
    };
  }
};
const _hoisted_1$3 = ["id"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ReducedMotionIcon = __nuxt_component_0$1;
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($data.styles["icons-group"])
  }, [
    createBaseVNode("ul", {
      class: normalizeClass($data.styles["icons-group-list"])
    }, [
      createBaseVNode("li", {
        class: normalizeClass($data.styles["icons-group-item"])
      }, [
        createBaseVNode("button", {
          id: `${$props.id}-reduce-motion`,
          onClick: _cache[0] || (_cache[0] = (...args) => $props.callback && $props.callback(...args))
        }, [
          createBaseVNode("div", {
            class: normalizeClass($data.styles["group-icon"])
          }, [
            createVNode(_component_ReducedMotionIcon)
          ], 2)
        ], 8, _hoisted_1$3)
      ], 2)
    ], 2)
  ], 2);
}
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3]]);
const label = "_label_1hafw_26";
const styles$2 = {
  "toggle-outer": "_toggle-outer_1hafw_1",
  "toggle-description": "_toggle-description_1hafw_13",
  "toggle-container": "_toggle-container_1hafw_17",
  label,
  "switch": "_switch_1hafw_35"
};
const _sfc_main$5 = {
  props: {
    label: String,
    onChange: Function,
    checked: Boolean
  },
  data() {
    return {
      styles: styles$2,
      isSelected: false
    };
  },
  mount() {
    this.isSelected = this.checked;
  },
  methods: {
    handleChange(e) {
      this.isSelected = e.target.checked;
      this.onChange(e);
    }
  }
};
const _hoisted_1$2 = ["checked"];
const _hoisted_2$1 = { class: "visually-hidden" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($data.styles["toggle-outer"])
  }, [
    createBaseVNode("div", {
      class: normalizeClass($data.styles["toggle-description"])
    }, toDisplayString($props.label), 3),
    createBaseVNode("div", {
      class: normalizeClass($data.styles["toggle-container"])
    }, [
      createBaseVNode("label", {
        class: normalizeClass($data.styles.label),
        for: "reduced-motion-toggle"
      }, [
        createBaseVNode("input", {
          id: "reduced-motion-toggle",
          type: "checkbox",
          checked: $data.isSelected,
          onChange: _cache[0] || (_cache[0] = (...args) => $options.handleChange && $options.handleChange(...args))
        }, null, 40, _hoisted_1$2),
        createBaseVNode("span", {
          class: normalizeClass($data.styles.switch)
        }, null, 2),
        createBaseVNode("div", _hoisted_2$1, "selected: " + toDisplayString($data.isSelected ? "true" : "false"), 1)
      ], 2)
    ], 2)
  ], 2);
}
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2]]);
const dialog = "_dialog_xb26h_1";
const open = "_open_xb26h_21";
const styles$1 = {
  dialog,
  open,
  "dialog-close-button": "_dialog-close-button_xb26h_28",
  "dialog-close-button-icon": "_dialog-close-button-icon_xb26h_39",
  "dialog-header": "_dialog-header_xb26h_46",
  "dialog-body": "_dialog-body_xb26h_57",
  "dialog-item": "_dialog-item_xb26h_64"
};
const _sfc_main$4 = {
  props: {
    onClose: Function
  },
  setup() {
    const { settings: settings2 } = inject("data");
    return { settings: settings2 };
  },
  data() {
    return {
      styles: styles$1,
      isChecked: false
    };
  },
  mounted() {
    this.isChecked = document.body.classList.contains("reduced-motion");
  },
  methods: {
    handleChange(e) {
      this.isChecked = e.target.checked;
      if (e.target.checked)
        document.body.classList.add("reduced-motion");
      else
        document.body.classList.remove("reduced-motion");
    }
  }
};
const _hoisted_1$1 = /* @__PURE__ */ createBaseVNode("span", { class: "animated-icon-inner" }, [
  /* @__PURE__ */ createBaseVNode("span"),
  /* @__PURE__ */ createBaseVNode("span")
], -1);
const _hoisted_2 = [
  _hoisted_1$1
];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Toggle = __nuxt_component_0;
  return openBlock(), createElementBlock("div", {
    id: "settings",
    class: normalizeClass([$data.styles.dialog, $data.styles.open])
  }, [
    createBaseVNode("button", {
      id: "close-dialog-link",
      class: normalizeClass($data.styles["dialog-close-button"]),
      title: "Close Button",
      onClick: _cache[0] || (_cache[0] = (...args) => $props.onClose && $props.onClose(...args))
    }, [
      createBaseVNode("div", {
        class: normalizeClass([$data.styles["dialog-close-button-icon"], "animated-icon", "close-icon", "hover"]),
        title: "Close Icon"
      }, _hoisted_2, 2)
    ], 2),
    createBaseVNode("header", {
      class: normalizeClass($data.styles["dialog-header"])
    }, [
      createBaseVNode("h2", null, toDisplayString($setup.settings.header), 1)
    ], 2),
    createBaseVNode("section", {
      class: normalizeClass($data.styles["dialog-body"])
    }, [
      createBaseVNode("div", {
        class: normalizeClass($data.styles["dialog-item"])
      }, [
        createVNode(_component_Toggle, {
          label: $setup.settings.items.motion.label,
          "on-change": $options.handleChange,
          checked: $data.isChecked
        }, null, 8, ["label", "on-change", "checked"])
      ], 2)
    ], 2)
  ], 2);
}
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1]]);
const styles = {
  "page-footer": "_page-footer_1k42v_1",
  "footer-row": "_footer-row_1k42v_15",
  "footer-column-left": "_footer-column-left_1k42v_33",
  "footer-column-center": "_footer-column-center_1k42v_34",
  "footer-column-right": "_footer-column-right_1k42v_35",
  "footer-links": "_footer-links_1k42v_55",
  "footer-links-list": "_footer-links-list_1k42v_55",
  "footer-links-item": "_footer-links-item_1k42v_64"
};
const _sfc_main$3 = {
  setup() {
    const { footer: footer2, links } = inject("data");
    return { footer: footer2, links };
  },
  data() {
    return {
      styles,
      showPortal: false
    };
  },
  methods: {
    openPortal() {
      this.showPortal = true;
    },
    closePortal() {
      this.showPortal = false;
    }
  }
};
const _hoisted_1 = ["id", "href"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Sitemap = __nuxt_component_0$2;
  const _component_SocialIcons = __nuxt_component_1;
  const _component_SettingsIcons = __nuxt_component_2;
  const _component_Dialog = __nuxt_component_3;
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("footer", {
      class: normalizeClass($data.styles["page-footer"])
    }, [
      createBaseVNode("div", {
        class: normalizeClass($data.styles["footer-row"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass($data.styles["footer-column-center"])
        }, [
          createVNode(_component_Sitemap)
        ], 2)
      ], 2),
      createBaseVNode("div", {
        class: normalizeClass($data.styles["footer-row"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass($data.styles["footer-column-center"])
        }, [
          createBaseVNode("div", {
            class: normalizeClass($data.styles["footer-links"])
          }, [
            createBaseVNode("ul", {
              class: normalizeClass($data.styles["footer-links-list"])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($setup.links.legal, (item, key) => {
                return openBlock(), createElementBlock("li", {
                  key: `footer-links-item-${key}`,
                  class: normalizeClass($data.styles["footer-links-item"])
                }, [
                  createBaseVNode("a", {
                    id: `footer-link-${key}`,
                    href: item.href,
                    class: normalizeClass($data.styles["footer-link"])
                  }, toDisplayString(item.label), 11, _hoisted_1)
                ], 2);
              }), 128))
            ], 2)
          ], 2)
        ], 2)
      ], 2),
      createBaseVNode("div", {
        class: normalizeClass($data.styles["footer-row"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass($data.styles["footer-column-left"])
        }, [
          createVNode(_component_SocialIcons, { id: "footer-social-icons" })
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass($data.styles["footer-column-center"])
        }, "© " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " No Rights Reserved", 3),
        createBaseVNode("div", {
          class: normalizeClass($data.styles["footer-column-right"])
        }, [
          createVNode(_component_SettingsIcons, {
            id: "footer-settings-icons",
            callback: $options.openPortal
          }, null, 8, ["callback"])
        ], 2)
      ], 2)
    ], 2),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      withDirectives(createVNode(_component_Dialog, { "on-close": $options.closePortal }, null, 8, ["on-close"]), [
        [vShow, $data.showPortal]
      ])
    ]))
  ], 64);
}
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render]]);
const _sfc_main$2 = {
  __name: "Layout",
  setup(__props) {
    const showMessage = ref(false);
    const route = useRoute();
    const { content: content2, links } = inject("data");
    onMounted(() => {
      showMessage.value = content2[route.name].message;
    });
    const closeMessage = () => {
      showMessage.value = false;
    };
    return (_ctx, _cache) => {
      const _component_NuxtLink = __nuxt_component_0$9;
      const _component_Header = __nuxt_component_1$4;
      const _component_Navigation = __nuxt_component_2$1;
      const _component_Message = __nuxt_component_3$1;
      const _component_Main = __nuxt_component_4;
      const _component_Footer = __nuxt_component_5;
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_NuxtLink, {
          to: `${unref(route).path}#content`,
          class: "skip-link"
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(links).a11y.skip.label), 1)
          ]),
          _: 1
        }, 8, ["to"]),
        createBaseVNode("div", {
          id: "page",
          class: normalizeClass(unref(styles$8).page)
        }, [
          createVNode(_component_Header),
          createVNode(_component_Navigation),
          unref(content2)[unref(route).name].message ? withDirectives((openBlock(), createBlock(_component_Message, {
            key: 0,
            "on-close": closeMessage,
            message: unref(content2)[unref(route).name].message
          }, null, 8, ["message"])), [
            [vShow, showMessage.value]
          ]) : createCommentVNode("", true),
          createVNode(_component_Main, null, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }),
          createVNode(_component_Footer)
        ], 2)
      ], 64);
    };
  }
};
const content = {
  home: {
    name: "Front Page",
    url: "/",
    priority: 0,
    notification: {
      name: "cookies",
      title: "This website uses cookies 🍪",
      description: "We use cookies to improve your experience on our site and to show you the most relevant content possible. To find out more, please read our privacy policy and our cookie policy.",
      actions: [
        {
          name: "Cancel",
          priority: "secondary",
          type: "reject"
        },
        {
          name: "Accept",
          priority: "primary",
          type: "accept"
        }
      ]
    },
    sections: [
      {
        id: "content-frontpage-breaking-news",
        name: "Breaking News",
        articles: [
          {
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
          },
          {
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
          },
          {
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
          }
        ]
      },
      {
        id: "content-frontpage-latest-news",
        name: "Latest News",
        articles: [
          {
            class: "columns-3-balanced",
            header: "Happening Now",
            type: "articles-list",
            content: [
              {
                title: "Lorem ipsum dolor sit amet.",
                content: "Molestie nunc non blandit massa enim nec. Ornare suspendisse sed nisi lacus sed viverra tellus in. Id consectetur purus ut faucibus. At auctor urna nunc id cursus metus. Eget aliquet nibh praesent tristique magna. Morbi tristique senectus et netus et malesuada fames."
              },
              {
                title: "Consectetur adipiscing elit.",
                content: "Sit amet consectetur adipiscing elit ut aliquam purus sit. Consequat nisl vel pretium lectus quam. Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim. Nec sagittis aliquam malesuada bibendum arcu."
              },
              {
                title: "Sed do eiusmod tempor incididunt.",
                content: "Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Pulvinar elementum integer enim neque volutpat ac. Lorem donec massa sapien faucibus."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Odio morbi quis commodo odio aenean sed adipiscing diam donec."
              },
              {
                content: "Consequat semper viverra nam libero justo laoreet sit."
              },
              {
                content: "Risus ultricies tristique nulla aliquet enim tortor at auctor."
              },
              {
                content: "Diam vulputate ut pharetra sit amet aliquam id diam maecenas."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Nibh mauris cursus mattis molestie. Varius vel pharetra vel turpis nunc eget lorem dolor."
              },
              {
                content: "Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie."
              },
              {
                content: "Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat."
              },
              {
                content: "Fermentum dui faucibus in ornare. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit."
              }
            ]
          }
        ]
      },
      {
        id: "content-frontpage-latest-media",
        name: "Latest Media",
        articles: [
          {
            class: "columns-1",
            type: "grid",
            content: [
              {
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
              },
              {
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
              },
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-frontpage-highlights",
        name: "Highlights",
        articles: [
          {
            class: "columns-wrap",
            header: "Domestic Highlights",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "At urna condimentum mattis pellentesque id nibh tortor id. Urna cursus eget nunc scelerisque viverra mauris in. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Enim lobortis scelerisque fermentum dui faucibus in. Vitae semper quis lectus nulla at volutpat. In nisl nisi scelerisque eu ultrices vitae auctor."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Lorem donec massa sapien faucibus et molestie ac feugiat. Quis varius quam quisque id diam vel. Ut tristique et egestas quis ipsum suspendisse. Fermentum posuere urna nec tincidunt praesent semper feugiat."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Global Highlights",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Augue eget arcu dictum varius duis at consectetur. Ornare arcu dui vivamus arcu felis bibendum ut. Magna eget est lorem ipsum dolor sit amet. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Leo urna molestie at elementum eu facilisis sed. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Nisi scelerisque eu ultrices vitae auctor. Quis risus sed vulputate odio. Pellentesque sit amet porttitor eget dolor morbi non. Nullam eget felis eget nunc lobortis mattis aliquam."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Local Highlights",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Mattis ullamcorper velit sed ullamcorper. Orci ac auctor augue mauris augue neque. Condimentum mattis pellentesque id nibh tortor."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Fermentum odio eu feugiat pretium. Urna nec tincidunt praesent semper feugiat nibh sed. Adipiscing elit ut aliquam purus sit."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Vitae tempus quam pellentesque nec nam aliquam sem et. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Congue nisi vitae suscipit tellus mauris a diam maecenas. Quis varius quam quisque id diam."
              }
            ]
          }
        ]
      },
      {
        id: "content-frontpage-top-stories",
        name: "Top Stories",
        articles: [
          {
            class: "columns-1",
            type: "grid",
            display: "grid-wrap",
            content: [
              {
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
              },
              {
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
              },
              {
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
              },
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-frontpage-international",
        name: "International",
        articles: [
          {
            class: "columns-3-balanced",
            header: "Europe",
            type: "articles-list",
            content: [
              {
                title: "Commodo elit at imperdiet dui accumsan sit amet. Habitasse platea dictumst vestibulum rhoncus.",
                content: "Orci ac auctor augue mauris augue neque gravida. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Sagittis aliquam malesuada bibendum arcu vitae. Pellentesque habitant morbi tristique senectus et netus. Etiam erat velit scelerisque in dictum non consectetur a."
              },
              {
                title: "Suspendisse convallis efficitur felis ac mattis. Cras faucibus ultrices condimentum.",
                content: "Facilisis leo vel fringilla est. Turpis tincidunt id aliquet risus feugiat in ante metus. Viverra ipsum nunc aliquet bibendum enim facilisis. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Tristique senectus et netus et malesuada fames ac turpis egestas."
              },
              {
                title: "Ornare suspendisse sed nisi lacus sed viverra tellus in.",
                content: "Dui vivamus arcu felis bibendum. Purus ut faucibus pulvinar elementum integer enim neque volutpat ac. Auctor eu augue ut lectus arcu bibendum. Diam volutpat commodo sed egestas egestas fringilla phasellus."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "South America",
            type: "articles-list",
            content: [
              {
                title: "Augue eget arcu dictum varius duis.",
                content: "Commodo ullamcorper a lacus vestibulum sed arcu non. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Id interdum velit laoreet id donec ultrices tincidunt arcu non."
              },
              {
                title: "Fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque.",
                content: "Turpis egestas maecenas pharetra convallis posuere morbi leo. Odio pellentesque diam volutpat commodo. Ornare massa eget egestas purus viverra accumsan in nisl nisi. Tellus integer feugiat scelerisque varius morbi enim nunc. Erat velit scelerisque in dictum non consectetur."
              },
              {
                title: "Mi bibendum neque egestas congue quisque.",
                content: "Sapien eget mi proin sed libero. Adipiscing elit duis tristique sollicitudin nibh sit. Faucibus scelerisque eleifend donec pretium. Ac tortor dignissim convallis aenean et tortor at risus."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "Asia",
            type: "articles-list",
            content: [
              {
                title: "Sodales ut etiam sit amet nisl purus in. Enim sed faucibus turpis in eu mi bibendum neque.",
                content: "Tortor id aliquet lectus proin. Pulvinar elementum integer enim neque volutpat ac tincidunt. Auctor eu augue ut lectus arcu bibendum at varius. Congue mauris rhoncus aenean vel elit scelerisque mauris."
              },
              {
                title: "haretra convallis posuere morbi leo urna.",
                content: "Egestas diam in arcu cursus euismod quis. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Molestie at elementum eu facilisis sed odio morbi quis. Lectus arcu bibendum at varius. Eros in cursus turpis massa tincidunt dui."
              },
              {
                title: "At varius vel pharetra vel turpis nunc eget lorem dolor. ",
                content: "Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Lacus sed viverra tellus in. Sed nisi lacus sed viverra tellus in. Venenatis cras sed felis eget velit aliquet sagittis id consectetur."
              }
            ]
          }
        ]
      },
      {
        id: "content-frontpage-featured",
        name: "Featured",
        articles: [
          {
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
            content: [
              {
                content: "Vulputate dignissim suspendisse in est ante.",
                url: "#"
              },
              {
                content: "Blandit turpis cursus in hac habitasse platea dictumst.",
                url: "#"
              },
              {
                content: "Sed nisi lacus sed viverra tellus in hac.",
                url: "#"
              },
              {
                content: "Euismod in pellentesque massa placerat duis ultricies lacus sed.",
                url: "#"
              },
              {
                content: "Quam lacus suspendisse faucibus interdum posuere.",
                url: "#"
              },
              {
                content: "Sit amet mattis vulputate enim nulla aliquet porttitor lacus.",
                url: "#"
              }
            ]
          },
          {
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
            content: [
              {
                content: "Id semper risus in hendrerit gravida rutrum quisque non.",
                url: "#"
              },
              {
                content: "Sit amet est placerat in egestas erat imperdiet sed euismod.",
                url: "#"
              },
              {
                content: "Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc.",
                url: "#"
              },
              {
                content: "get gravida cum sociis natoque. Bibendum ut tristique et egestas.",
                url: "#"
              },
              {
                content: "Mauris cursus mattis molestie a iaculis at erat.",
                url: "#"
              },
              {
                content: "Sit amet massa vitae tortor condimentum lacinia.",
                url: "#"
              }
            ]
          },
          {
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
            content: [
              {
                content: "Mattis enim ut tellus elementum sagittis.",
                url: "#"
              },
              {
                content: "Sit amet venenatis urna cursus eget nunc scelerisque viverra mauris.",
                url: "#"
              },
              {
                content: "Mi bibendum neque egestas congue quisque egestas.",
                url: "#"
              },
              {
                content: "Nunc scelerisque viverra mauris in aliquam.",
                url: "#"
              },
              {
                content: "Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam.",
                url: "#"
              },
              {
                content: "Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam.",
                url: "#"
              }
            ]
          }
        ]
      },
      {
        id: "content-frontpage-underscored",
        name: "Underscored",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-frontpage-happening-now",
        name: "Happening Now",
        articles: [
          {
            class: "columns-wrap",
            header: "Political",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Cras semper auctor neque vitae tempus quam pellentesque. Consequat ac felis donec et odio pellentesque. Eu consequat ac felis donec et odio pellentesque diam volutpat. Suscipit tellus mauris a diam maecenas sed enim ut sem."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Sed faucibus turpis in eu mi bibendum neque. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. In iaculis nunc sed augue lacus viverra. Pellentesque nec nam aliquam sem et. Tellus mauris a diam maecenas sed."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Mattis vulputate enim nulla aliquet. Ac tortor dignissim convallis aenean. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Consequat ac felis donec et odio pellentesque diam. Lorem ipsum dolor sit amet consectetur adipiscing."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Health",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Vitae tortor condimentum lacinia quis. Nisl nisi scelerisque eu ultrices vitae. Id velit ut tortor pretium viverra suspendisse potenti nullam. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Ullamcorper malesuada proin libero nunc consequat. Imperdiet sed euismod nisi porta. Arcu cursus vitae congue mauris rhoncus aenean vel. Enim nunc faucibus a pellentesque. Gravida in fermentum et sollicitudin ac orci phasellus."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Morbi tristique senectus et netus et malesuada fames. Sit amet cursus sit amet dictum sit. Sagittis vitae et leo duis ut diam quam. Non consectetur a erat nam at lectus. Massa massa ultricies mi quis hendrerit dolor magna eget est."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Business",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Integer enim neque volutpat ac. Feugiat sed lectus vestibulum mattis. Ullamcorper malesuada proin libero nunc consequat interdum varius sit amet. Mattis molestie a iaculis at erat pellentesque. Adipiscing elit duis tristique sollicitudin."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Dignissim sodales ut eu sem integer. Mauris cursus mattis molestie a iaculis at erat. Tempus quam pellentesque nec nam aliquam sem et tortor. Id diam vel quam elementum pulvinar etiam non quam."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Massa vitae tortor condimentum lacinia quis vel eros. Platea dictumst vestibulum rhoncus est pellentesque. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae. Sed risus ultricies tristique nulla aliquet. Magna sit amet purus gravida quis blandit turpis cursus in."
              }
            ]
          }
        ]
      },
      {
        id: "content-frontpage-hot-topics",
        name: "Hot Topics",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-frontpage-paid-content",
        name: "Paid Content",
        articles: [
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Nunc aliquet bibendum enim facilisis gravida neque. Nec feugiat in fermentum posuere urna. Molestie at elementum eu facilisis sed odio morbi. Scelerisque purus semper eget duis at tellus."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Eget dolor morbi non arcu risus quis. Non curabitur gravida arcu ac tortor dignissim."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Quam lacus suspendisse faucibus interdum. In pellentesque massa placerat duis ultricies lacus sed. Convallis a cras semper auctor neque vitae tempus quam. Ut pharetra sit amet aliquam id diam."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Eu feugiat pretium nibh ipsum consequat."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Non tellus orci ac auctor augue mauris augue neque gravida. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Quam nulla porttitor massa id neque aliquam vestibulum morbi. Diam quis enim lobortis scelerisque."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Haretra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Senectus et netus et malesuada fames."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "It amet porttitor eget dolor morbi non. Sed lectus vestibulum mattis ullamcorper. Laoreet id donec ultrices tincidunt arcu non. Quam adipiscing vitae proin sagittis."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Mollis aliquam ut porttitor leo a diam. Nunc aliquet bibendum enim facilisis gravida neque convallis."
              }
            ]
          }
        ]
      }
    ]
  },
  us: {
    name: "US",
    url: "/us",
    priority: 1,
    message: {
      title: "Watch breaking news!",
      description: "Something important happened and you should watch it!"
    },
    sections: [
      {
        id: "content-us-world-news",
        name: "World News",
        articles: [
          {
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
          },
          {
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
          },
          {
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
            content: [
              {
                content: "Pellentesque habitant morbi tristique senectus et. Vel eros donec ac odio tempor orci dapibus ultrices in."
              },
              {
                content: "Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla."
              },
              {
                content: "Et netus et malesuada fames ac turpis egestas. Maecenas ultricies mi eget mauris pharetra et ultrices."
              }
            ]
          }
        ]
      },
      {
        id: "content-us-around-the-nation",
        name: "Around the Nation",
        articles: [
          {
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
            content: [
              {
                content: "Nibh ipsum consequat nisl vel. Senectus et netus et malesuada fames."
              },
              {
                content: "Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi."
              },
              {
                content: "Blandit volutpat maecenas volutpat blandit aliquam etiam erat."
              },
              {
                content: "Non curabitur gravida arcu ac. Est sit amet facilisis magna etiam tempor orci eu lobortis."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Sapien pellentesque habitant morbi tristique senectus et."
              },
              {
                content: "Aliquet eget sit amet tellus cras adipiscing."
              },
              {
                content: "Tellus mauris a diam maecenas sed enim ut sem viverra."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis."
              },
              {
                content: "Ac tincidunt vitae semper quis lectus nulla at volutpat diam."
              },
              {
                content: "In mollis nunc sed id semper risus in hendrerit. Turpis massa sed elementum tempus egestas sed sed risus. Imperdiet proin fermentum leo vel orci."
              },
              {
                content: "Nisl purus in mollis nunc sed id semper. Pretium lectus quam id leo in vitae."
              }
            ]
          }
        ]
      },
      {
        id: "content-us-roundup",
        name: "Roundup",
        articles: [
          {
            class: "columns-wrap",
            header: "Washington",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Nisl nisi scelerisque eu ultrices vitae. Consectetur adipiscing elit duis tristique sollicitudin. Ornare suspendisse sed nisi lacus. Justo eget magna fermentum iaculis."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Tellus integer feugiat scelerisque varius morbi enim. Ut tristique et egestas quis."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "East Coast",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Pharetra et ultrices neque ornare aenean euismod elementum nisi. Ipsum dolor sit amet consectetur adipiscing elit ut."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Quam vulputate dignissim suspendisse in est. Vestibulum mattis ullamcorper velit sed."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Habitant morbi tristique senectus et netus et. Ullamcorper sit amet risus nullam eget felis."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "West Coast",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Bibendum enim facilisis gravida neque convallis a cras. Semper feugiat nibh sed pulvinar proin gravida hendrerit."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Vel facilisis volutpat est velit. Odio ut sem nulla pharetra diam sit amet nisl."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Risus nec feugiat in fermentum posuere urna nec. Massa tincidunt nunc pulvinar sapien."
              }
            ]
          }
        ]
      },
      {
        id: "content-us-crime+justice",
        name: "Crime & Justice",
        articles: [
          {
            class: "columns-3-balanced",
            header: "Supreme Court",
            type: "articles-list",
            content: [
              {
                title: "Vel risus commodo viverra maecenas.",
                content: "Vitae tempus quam pellentesque nec nam aliquam sem. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Leo integer malesuada nunc vel. Ultricies integer quis auctor elit sed vulputate. Sit amet justo donec enim diam vulputate. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar."
              },
              {
                title: "Sit amet mattis vulputate enim.",
                content: "Urna porttitor rhoncus dolor purus non. Tristique senectus et netus et malesuada fames ac turpis egestas. Suscipit tellus mauris a diam maecenas. Risus ultricies tristique nulla aliquet enim. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper."
              },
              {
                title: "Mauris in aliquam sem fringilla ut morbi tincidunt.",
                content: "A erat nam at lectus. Orci sagittis eu volutpat odio facilisis mauris sit. Faucibus nisl tincidunt eget nullam non. Nisl condimentum id venenatis a. Suscipit tellus mauris a diam maecenas sed enim. Orci nulla pellentesque dignissim enim sit amet venenatis. Est ultricies integer quis auctor."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "Local Law",
            type: "articles-list",
            content: [
              {
                title: "Sit amet justo donec enim diam vulputate ut.",
                content: "Tincidunt dui ut ornare lectus sit amet est. Risus sed vulputate odio ut enim blandit volutpat maecenas volutpat. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Euismod in pellentesque massa placerat duis."
              },
              {
                title: "Aliquam ultrices sagittis orci a scelerisque purus semper eget duis.",
                content: "Lobortis feugiat vivamus at augue eget arcu. Id ornare arcu odio ut sem nulla pharetra diam. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Congue quisque egestas diam in arcu cursus euismod quis viverra."
              },
              {
                title: "In metus vulputate eu scelerisque felis imperdiet proin.",
                content: "Elementum pulvinar etiam non quam. Id nibh tortor id aliquet lectus proin nibh. Elementum facilisis leo vel fringilla est ullamcorper eget. Dictum sit amet justo donec enim diam vulputate."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "Opinion",
            type: "articles-list",
            content: [
              {
                title: "Magna ac placerat vestibulum lectus.",
                content: "enenatis urna cursus eget nunc scelerisque viverra mauris. Convallis posuere morbi leo urna molestie at elementum. Eu lobortis elementum nibh tellus. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra."
              },
              {
                title: "Nisl rhoncus mattis rhoncus urna neque viverra justo.",
                content: "Tristique sollicitudin nibh sit amet. Aliquam purus sit amet luctus venenatis. Vitae nunc sed velit dignissim sodales ut. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Sit amet risus nullam eget."
              },
              {
                title: "Sed felis eget velit aliquet sagittis id consectetur purus ut.",
                content: "Egestas erat imperdiet sed euismod nisi porta. Vel orci porta non pulvinar neque laoreet. Urna condimentum mattis pellentesque id nibh. Arcu non sodales neque sodales ut etiam sit amet. Elementum curabitur vitae nunc sed velit dignissim."
              }
            ]
          }
        ]
      },
      {
        id: "content-us-around-the-us",
        name: "Around the US",
        articles: [
          {
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
            content: [
              {
                content: "Erat pellentesque adipiscing commodo elit at. Ornare lectus sit amet est placerat in."
              },
              {
                content: "Dui ut ornare lectus sit amet est placerat in egestas. Commodo sed egestas egestas fringilla phasellus."
              },
              {
                content: "Mi quis hendrerit dolor magna eget est lorem ipsum. Urna molestie at elementum eu facilisis sed odio morbi."
              },
              {
                content: "Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Nunc faucibus a pellentesque sit amet. Id velit ut tortor pretium viverra suspendisse potenti nullam ac."
              },
              {
                content: "Eget mi proin sed libero enim sed. A scelerisque purus semper eget duis at tellus."
              },
              {
                content: "Praesent tristique magna sit amet purus. Eros in cursus turpis massa."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Amet mattis vulputate enim nulla."
              },
              {
                content: "Pellentesque massa placerat duis ultricies. Tortor at auctor urna nunc id cursus."
              },
              {
                content: "Venenatis urna cursus eget nunc scelerisque viverra mauris."
              },
              {
                content: "Dolor morbi non arcu risus quis varius quam quisque id."
              }
            ]
          }
        ]
      },
      {
        id: "content-us-latest-media",
        name: "Latest Media",
        articles: [
          {
            class: "columns-1",
            type: "grid",
            content: [
              {
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
              },
              {
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
              },
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-us-business",
        name: "Business",
        articles: [
          {
            class: "columns-3-balanced",
            header: "Local",
            type: "articles-list",
            content: [
              {
                title: "Sed viverra tellus in hac habitasse platea dictumst vestibulum.",
                content: "Maecenas volutpat blandit aliquam etiam. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Est ullamcorper eget nulla facilisi etiam dignissim diam quis. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Varius vel pharetra vel turpis nunc eget. Enim ut tellus elementum sagittis vitae et leo duis."
              },
              {
                title: "Porttitor leo a diam sollicitudin tempor id eu nisl.",
                content: "Ut diam quam nulla porttitor massa id neque. Nulla facilisi etiam dignissim diam quis enim lobortis. Quam nulla porttitor massa id. Neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Justo nec ultrices dui sapien eget mi. Volutpat diam ut venenatis tellus in. Mi in nulla posuere sollicitudin aliquam ultrices."
              },
              {
                title: "Leo vel orci porta non pulvinar neque laoreet.",
                content: "Placerat duis ultricies lacus sed. Pellentesque adipiscing commodo elit at imperdiet dui. Accumsan lacus vel facilisis volutpat. Condimentum lacinia quis vel eros donec ac. Pellentesque habitant morbi tristique senectus. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Rhoncus urna neque viverra justo nec ultrices dui sapien. Amet venenatis urna cursus eget."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "Global",
            type: "articles-list",
            content: [
              {
                title: "Platea dictumst quisque sagittis purus sit amet volutpat consequat mauris.",
                content: "Eu lobortis elementum nibh tellus molestie nunc. Vel turpis nunc eget lorem dolor sed viverra. Massa sapien faucibus et molestie ac feugiat sed. Sed egestas egestas fringilla phasellus faucibus. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan"
              },
              {
                title: "Ultrices gravida dictum fusce ut placerat orci nulla pellentesque.",
                content: "Velit ut tortor pretium viverra suspendisse potenti nullam ac tortor. Feugiat nibh sed pulvinar proin gravida. Feugiat in fermentum posuere urna nec tincidunt praesent. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. A scelerisque purus semper eget."
              },
              {
                title: "Est ullamcorper eget nulla facilisi etiam.",
                content: "Augue mauris augue neque gravida in fermentum et. Ornare arcu odio ut sem nulla pharetra diam. Tristique et egestas quis ipsum suspendisse ultrices gravida. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Non blandit massa enim nec dui nunc mattis."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "Quarterly",
            type: "articles-list",
            content: [
              {
                title: "Non curabitur gravida arcu ac tortor dignissim.",
                content: "Dui nunc mattis enim ut. Non consectetur a erat nam. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. Congue quisque egestas diam in arcu cursus euismod quis viverra. Consequat semper viverra nam libero justo laoreet sit amet."
              },
              {
                title: "Velit egestas dui id ornare arcu odio ut.",
                content: "At ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Aenean et tortor at risus viverra. Lectus magna fringilla urna porttitor rhoncus dolor. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Euismod in pellentesque massa placerat duis ultricies lacus sed turpis."
              },
              {
                title: "Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel.",
                content: "Nunc eget lorem dolor sed. Amet aliquam id diam maecenas ultricies mi. Sodales ut etiam sit amet nisl purus. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Fusce ut placerat orci nulla pellentesque dignissim enim sit."
              }
            ]
          }
        ]
      },
      {
        id: "content-us-underscored",
        name: "Underscored",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-us-state-by-state",
        name: "State by state",
        articles: [
          {
            class: "columns-wrap",
            header: "California",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Et tortor at risus viverra adipiscing at. Leo urna molestie at elementum eu facilisis sed. Adipiscing tristique risus nec feugiat in fermentum posuere urna."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Luctus venenatis lectus magna fringilla. Condimentum mattis pellentesque id nibh tortor id. Rhoncus aenean vel elit scelerisque mauris pellentesque."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Feugiat scelerisque varius morbi enim nunc. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Orci a scelerisque purus semper eget duis at tellus at."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "New York",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Vitae sapien pellentesque habitant morbi tristique. Quisque id diam vel quam elementum pulvinar etiam non. Hendrerit gravida rutrum quisque non tellus orci."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Rhoncus dolor purus non enim praesent. Massa enim nec dui nunc mattis. Odio eu feugiat pretium nibh ipsum consequat. Bibendum enim facilisis gravida neque convallis a cras."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Cursus euismod quis viverra nibh. Facilisis mauris sit amet massa. Eget mauris pharetra et ultrices. Vitae turpis massa sed elementum tempus egestas sed. Semper viverra nam libero justo."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Washington",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Iaculis nunc sed augue lacus viverra. Sed libero enim sed faucibus turpis in. Massa tincidunt dui ut ornare. Adipiscing bibendum est ultricies integer quis auctor elit."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Aliquet nec ullamcorper sit amet risus nullam eget felis eget. Tortor dignissim convallis aenean et tortor at risus. Dolor sed viverra ipsum nunc."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "In cursus turpis massa tincidunt dui ut ornare. Lacus vestibulum sed arcu non odio euismod lacinia at. Mi ipsum faucibus vitae aliquet nec. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend."
              }
            ]
          }
        ]
      },
      {
        id: "content-us-hot-topics",
        name: "Hot Topics",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-us-paid-content",
        name: "Paid Content",
        articles: [
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Sed cras ornare arcu dui vivamus arcu. Blandit aliquam etiam erat velit scelerisque in. Nisl rhoncus mattis rhoncus urna neque viverra."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Nunc sed id semper risus in hendrerit gravida rutrum. Ac felis donec et odio pellentesque diam volutpat commodo sed."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Semper quis lectus nulla at volutpat diam ut venenatis tellus. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Et malesuada fames ac turpis."
              }
            ]
          }
        ]
      }
    ]
  },
  world: {
    name: "World",
    url: "/world",
    priority: 1,
    sections: [
      {
        id: "content-world-global-trends",
        name: "Global trends",
        articles: [
          {
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
          },
          {
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
          },
          {
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
            content: [
              {
                content: "Luctus venenatis lectus magna fringilla urna porttitor rhoncus."
              },
              {
                content: "Placerat orci nulla pellentesque dignissim enim sit amet venenatis."
              },
              {
                content: "Pellentesque nec nam aliquam sem et."
              },
              {
                content: "In hendrerit gravida rutrum quisque non tellus."
              }
            ]
          }
        ]
      },
      {
        id: "content-world-around-the-world",
        name: "Around the world",
        articles: [
          {
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
          },
          {
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
          },
          {
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
            content: [
              {
                content: "Id faucibus nisl tincidunt eget nullam non nisi."
              },
              {
                content: "Lectus quam id leo in vitae turpis massa."
              },
              {
                content: "Urna nec tincidunt praesent semper feugiat nibh sed. Sed turpis tincidunt id aliquet risus."
              },
              {
                content: "Eu ultrices vitae auctor eu augue ut lectus."
              }
            ]
          }
        ]
      },
      {
        id: "content-world-latest-media",
        name: "Latest Media",
        articles: [
          {
            class: "columns-1",
            type: "grid",
            content: [
              {
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
              },
              {
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
              },
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-world-today",
        name: "Today",
        articles: [
          {
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
            content: [
              {
                content: "Massa enim nec dui nunc mattis. Ornare lectus sit amet est placerat in."
              },
              {
                content: "Morbi tristique senectus et netus et malesuada fames ac turpis."
              },
              {
                content: "Fed vulputate mi sit amet mauris commodo quis imperdiet massa."
              },
              {
                content: "In egestas erat imperdiet sed euismod nisi porta lorem mollis. Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu."
              }
            ]
          },
          {
            class: "columns-3-narrow",
            header: "Happening now",
            url: "#",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Semper auctor neque vitae tempus quam pellentesque nec nam aliquam."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Viverra maecenas accumsan lacus vel facilisis volutpat."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Orci sagittis eu volutpat odio facilisis mauris sit."
              }
            ]
          },
          {
            class: "columns-3-narrow",
            header: "Noteworthy",
            url: "#",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Nunc aliquet bibendum enim facilisis gravida neque convallis a."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Ut diam quam nulla porttitor massa id neque aliquam vestibulum."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Magna fermentum iaculis eu non diam phasellus vestibulum lorem."
              }
            ]
          }
        ]
      },
      {
        id: "content-world-featured",
        name: "Featured",
        articles: [
          {
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
            content: [
              {
                content: "Nulla facilisi cras fermentum odio eu. Porttitor lacus luctus accumsan tortor posuere ac ut."
              },
              {
                content: "Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Leo vel orci porta non. Sem nulla pharetra diam sit amet nisl."
              },
              {
                content: "Justo donec enim diam vulputate ut pharetra sit amet aliquam. Eu consequat ac felis donec et."
              }
            ]
          },
          {
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
          },
          {
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
            content: [
              {
                content: "Ut venenatis tellus in metus vulputate.",
                url: "#"
              },
              {
                content: "Vitae aliquet nec ullamcorper sit amet risus nullam.",
                url: "#"
              },
              {
                content: "Ellus in hac habitasse platea dictumst.",
                url: "#"
              },
              {
                content: "In nisl nisi scelerisque eu ultrices vitae.",
                url: "#"
              },
              {
                content: "Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim.",
                url: "#"
              },
              {
                content: "It volutpat diam ut venenatis tellus.",
                url: "#"
              }
            ]
          }
        ]
      },
      {
        id: "content-world-international",
        name: "International",
        articles: [
          {
            class: "columns-wrap",
            header: "United Nations",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Morbi quis commodo odio aenean sed adipiscing diam. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Justo nec ultrices dui sapien."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Nibh nisl condimentum id venenatis a condimentum. Id diam maecenas ultricies mi eget mauris pharetra et ultrices. Faucibus turpis in eu mi bibendum neque egestas. Et malesuada fames ac turpis egestas sed tempus urna et."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Ut etiam sit amet nisl purus in mollis nunc sed. Pellentesque adipiscing commodo elit at imperdiet dui. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Enim facilisis gravida neque convallis."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "European Union",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Donec massa sapien faucibus et molestie. Fermentum iaculis eu non diam. Donec pretium vulputate sapien nec sagittis. Placerat duis ultricies lacus sed. Pretium lectus quam id leo in vitae turpis massa."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Luctus accumsan tortor posuere ac ut. Convallis posuere morbi leo urna molestie at elementum. Nisi est sit amet facilisis magna etiam tempor orci eu."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Purus in massa tempor nec feugiat nisl pretium fusce. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Vestibulum sed arcu non odio euismod lacinia at quis."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Global Crisis",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "ristique senectus et netus et malesuada. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Varius quam quisque id diam vel quam elementum pulvinar. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Cras ornare arcu dui vivamus arcu felis bibendum ut. Volutpat blandit aliquam etiam erat velit scelerisque in dictum. Pharetra magna ac placerat vestibulum lectus."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Leo integer malesuada nunc vel. Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Ultrices eros in cursus turpis massa tincidunt dui ut. Eleifend mi in nulla posuere sollicitudin."
              }
            ]
          }
        ]
      },
      {
        id: "content-world-global-impact",
        name: "Global Impact",
        articles: [
          {
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
            content: [
              {
                content: "Enim tortor at auctor urna nunc id cursus metus. Nisi est sit amet facilisis magna etiam."
              },
              {
                content: "Neque volutpat ac tincidunt vitae. Metus aliquam eleifend mi in."
              },
              {
                content: "Aliquam malesuada bibendum arcu vitae elementum curabitur vitae."
              },
              {
                content: "Turpis cursus in hac habitasse platea dictumst."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Eget nulla facilisi etiam dignissim diam quis enim."
              },
              {
                content: "Risus viverra adipiscing at in tellus integer feugiat scelerisque."
              },
              {
                content: "Cursus turpis massa tincidunt dui."
              },
              {
                content: "Nascetur ridiculus mus mauris vitae ultricies leo integer."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Nisi scelerisque eu ultrices vitae auctor."
              },
              {
                content: "Urna porttitor rhoncus dolor purus non enim praesent elementum."
              },
              {
                content: "Ac turpis egestas integer eget aliquet."
              },
              {
                content: "Nisl tincidunt eget nullam non nisi est."
              }
            ]
          }
        ]
      },
      {
        id: "content-world-underscored",
        name: "Underscored",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-world-global-issues",
        name: "Global Issues",
        articles: [
          {
            class: "columns-wrap",
            header: "Rising Crime",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Phasellus faucibus scelerisque eleifend donec pretium. Tellus molestie nunc non blandit. Sed sed risus pretium quam vulputate dignissim suspendisse."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "In vitae turpis massa sed. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Egestas pretium aenean pharetra magna ac placerat vestibulum."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Morbi tempus iaculis urna id volutpat lacus laoreet non. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Nibh tortor id aliquet lectus proin nibh nisl."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Health concerns",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Id diam maecenas ultricies mi eget mauris pharetra. Aliquam sem fringilla ut morbi tincidunt augue interdum. Accumsan sit amet nulla facilisi morbi tempus iaculis."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Dolor sit amet consectetur adipiscing elit pellentesque habitant. Eget dolor morbi non arcu risus quis varius quam quisque."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Commodo sed egestas egestas fringilla phasellus faucibus. Lectus urna duis convallis convallis. Sit amet tellus cras adipiscing enim eu turpis egestas."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Economy",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Ante in nibh mauris cursus mattis molestie. Vestibulum sed arcu non odio euismod lacinia at quis. Consequat semper viverra nam libero justo laoreet."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Nunc non blandit massa enim nec dui nunc. Lobortis feugiat vivamus at augue eget arcu. Tempor commodo ullamcorper a lacus. Malesuada bibendum arcu vitae elementum curabitur vitae."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "In nulla posuere sollicitudin aliquam ultrices sagittis orci a. Sem fringilla ut morbi tincidunt augue interdum. Arcu felis bibendum ut tristique et egestas. Praesent elementum facilisis leo vel fringilla est ullamcorper."
              }
            ]
          }
        ]
      },
      {
        id: "content-world-hot-topics",
        name: "Hot Topics",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-world-paid-content",
        name: "Paid Content",
        articles: [
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Et sollicitudin ac orci phasellus. Massa placerat duis ultricies lacus sed turpis tincidunt id."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Neque volutpat ac tincidunt vitae semper. Nunc pulvinar sapien et ligula. Quam pellentesque nec nam aliquam sem et tortor consequat."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Velit euismod in pellentesque massa placerat duis ultricies. Nulla aliquet enim tortor at auctor. Vitae et leo duis ut diam quam nulla porttitor massa."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Eros in cursus turpis massa tincidunt dui ut ornare lectus. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl."
              }
            ]
          }
        ]
      }
    ]
  },
  politics: {
    name: "Politics",
    url: "/politics",
    priority: 1,
    sections: [
      {
        id: "content-politics-what-really-matters",
        name: "What Really Matters",
        articles: [
          {
            class: "columns-1",
            type: "grid",
            display: "grid-wrap",
            content: [
              {
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
              },
              {
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
              },
              {
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
              },
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-politics-today",
        name: "Today",
        articles: [
          {
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
            content: [
              {
                content: "Sem fringilla ut morbi tincidunt augue interdum velit euismod."
              },
              {
                content: "Quisque sagittis purus sit amet. Ornare lectus sit amet est."
              },
              {
                content: "Placerat orci nulla pellentesque dignissim enim sit amet."
              },
              {
                content: "In fermentum et sollicitudin ac orci phasellus egestas tellus."
              }
            ]
          },
          {
            class: "columns-3-narrow",
            header: "Elections",
            url: "#",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Nunc aliquet bibendum enim facilisis gravida neque. Nec feugiat in fermentum posuere urna. Molestie at elementum eu facilisis sed odio morbi. Scelerisque purus semper eget duis at tellus."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Eget dolor morbi non arcu risus quis. Non curabitur gravida arcu ac tortor dignissim."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Molestie at elementum eu facilisis sed odio morbi."
              },
              {
                content: "Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis."
              },
              {
                content: "Bibendum neque egestas congue quisque egestas diam in arcu."
              },
              {
                content: "Tellus molestie nunc non blandit massa enim nec."
              }
            ]
          }
        ]
      },
      {
        id: "content-politics-latest-headlines",
        name: "Latest Headlines",
        articles: [
          {
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
            content: [
              {
                content: "Arcu vitae elementum curabitur vitae nunc sed velit."
              },
              {
                content: "Ornare suspendisse sed nisi lacus sed viverra tellus in."
              },
              {
                content: "Vel fringilla est ullamcorper eget nulla."
              },
              {
                content: "Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Consectetur purus ut faucibus pulvinar elementum integer enim."
              },
              {
                content: "Purus semper eget duis at. Tincidunt ornare massa eget egestas purus viverra accumsan."
              },
              {
                content: "Amet massa vitae tortor condimentum lacinia quis vel."
              },
              {
                content: "Tristique senectus et netus et malesuada."
              }
            ]
          },
          {
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
          }
        ]
      },
      {
        id: "content-politics-latest-media",
        name: "Latest Media",
        articles: [
          {
            class: "columns-1",
            type: "grid",
            content: [
              {
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
              },
              {
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
              },
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-politics-election",
        name: "Election",
        articles: [
          {
            class: "columns-wrap",
            header: "Democrats",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Est ullamcorper eget nulla facilisi etiam dignissim. Est pellentesque elit ullamcorper dignissim cras. Velit euismod in pellentesque massa placerat duis ultricies."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Vitae suscipit tellus mauris a diam maecenas sed enim. Aenean sed adipiscing diam donec. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Mattis enim ut tellus elementum sagittis vitae et. Massa sapien faucibus et molestie."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Republicans",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Platea dictumst quisque sagittis purus sit amet volutpat. Ante in nibh mauris cursus mattis molestie a iaculis."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Quis hendrerit dolor magna eget est. Pellentesque pulvinar pellentesque habitant morbi tristique. Adipiscing commodo elit at imperdiet dui."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Donec pretium vulputate sapien nec sagittis aliquam. Cras adipiscing enim eu turpis egestas pretium aenean."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Liberals",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Cursus sit amet dictum sit amet justo donec enim. Tempor id eu nisl nunc. Amet cursus sit amet dictum sit amet justo donec."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Enim diam vulputate ut pharetra sit amet aliquam. Tristique senectus et netus et malesuada."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Eu turpis egestas pretium aenean. Auctor elit sed vulputate mi sit amet. In nibh mauris cursus mattis molestie."
              }
            ]
          }
        ]
      },
      {
        id: "content-politics-more-political-news",
        name: "More political News",
        articles: [
          {
            class: "columns-3-wide",
            header: "More News",
            url: "#",
            type: "list",
            content: [
              {
                content: "Eros donec ac odio tempor. Tortor pretium viverra suspendisse potenti nullam."
              },
              {
                content: "Ut venenatis tellus in metus vulputate eu scelerisque."
              },
              {
                content: "Id diam maecenas ultricies mi eget. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit."
              },
              {
                content: "Consectetur lorem donec massa sapien. Sed cras ornare arcu dui vivamus arcu felis."
              },
              {
                content: "Fames ac turpis egestas maecenas pharetra convallis posuere morbi."
              },
              {
                content: "Consequat nisl vel pretium lectus quam id."
              },
              {
                content: "Tincidunt ornare massa eget egestas purus viverra accumsan in nisl."
              },
              {
                content: "Sed euismod nisi porta lorem mollis aliquam ut."
              },
              {
                content: "Suspendisse sed nisi lacus sed viverra tellus in hac."
              },
              {
                content: "Aliquet risus feugiat in ante metus dictum at tempor."
              },
              {
                content: "Velit aliquet sagittis id consectetur purus ut faucibus."
              },
              {
                content: "Libero volutpat sed cras ornare. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet."
              },
              {
                content: "Nibh nisl condimentum id venenatis a condimentum vitae. Fames ac turpis egestas maecenas pharetra."
              },
              {
                content: "Massa sapien faucibus et molestie. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna."
              },
              {
                content: "Est pellentesque elit ullamcorper dignissim cras. Mi proin sed libero enim sed."
              }
            ]
          },
          {
            class: "columns-3-narrow",
            url: "#",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Nunc aliquet bibendum enim facilisis gravida neque. Nec feugiat in fermentum posuere urna. Molestie at elementum eu facilisis sed odio morbi. Scelerisque purus semper eget duis at tellus."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Eget dolor morbi non arcu risus quis. Non curabitur gravida arcu ac tortor dignissim."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Eget dolor morbi non arcu risus quis. Non curabitur gravida arcu ac tortor dignissim."
              }
            ]
          },
          {
            class: "columns-3-narrow",
            url: "#",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Adipiscing tristique risus nec feugiat in fermentum posuere vulputate eu scelerisque."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Potenti nullam ac tortor vitae purus. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum."
              }
            ]
          }
        ]
      },
      {
        id: "content-politics-underscored",
        name: "Underscored",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-politics-trending",
        name: "Trending",
        articles: [
          {
            class: "columns-wrap",
            header: "New Legislations",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Consequat ac felis donec et. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Nisi lacus sed viverra tellus in hac. Aliquam malesuada bibendum arcu vitae elementum curabitur."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Neque gravida in fermentum et sollicitudin ac orci. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Fermentum leo vel orci porta non pulvinar neque laoreet."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Egestas diam in arcu cursus. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Augue ut lectus arcu bibendum at varius vel pharetra."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Latest Polls",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Aliquam eleifend mi in nulla posuere sollicitudin. Tempor nec feugiat nisl pretium fusce. Fermentum iaculis eu non diam phasellus vestibulum lorem. Scelerisque eleifend donec pretium vulputate sapien nec. Sit amet aliquam id diam maecenas ultricies mi."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Morbi leo urna molestie at elementum eu. Phasellus vestibulum lorem sed risus. Aliquet bibendum enim facilisis gravida neque. Aliquam sem et tortor consequat id porta. Interdum varius sit amet mattis vulputate enim nulla aliquet. Enim nulla aliquet porttitor lacus luctus accumsan tortor."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Molestie nunc non blandit massa. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Odio morbi quis commodo odio aenean sed adipiscing diam donec. Felis eget velit aliquet sagittis id consectetur purus ut. Odio ut enim blandit volutpat maecenas."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Who's gaining votes",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Risus viverra adipiscing at in tellus integer feugiat scelerisque. Porttitor eget dolor morbi non arcu risus quis varius quam. Consectetur adipiscing elit ut aliquam purus sit. Pulvinar mattis nunc sed blandit."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Non curabitur gravida arcu ac tortor dignissim. Purus in mollis nunc sed id semper risus in hendrerit. Vestibulum morbi blandit cursus risus. Pellentesque nec nam aliquam sem et tortor. Ac tortor dignissim convallis aenean et."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Ullamcorper a lacus vestibulum sed arcu non. Pharetra sit amet aliquam id diam. Viverra vitae congue eu consequat ac felis donec. Amet massa vitae tortor condimentum lacinia quis vel eros."
              }
            ]
          }
        ]
      },
      {
        id: "content-politics-around-the-world",
        name: "Around the World",
        articles: [
          {
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
            content: [
              {
                content: "Dolor sed viverra ipsum nunc aliquet bibendum enim. Hendrerit dolor magna eget est lorem ipsum dolor."
              },
              {
                content: "At elementum eu facilisis sed odio morbi quis commodo odio. In massa tempor nec feugiat nisl."
              },
              {
                content: "Est sit amet facilisis magna etiam tempor orci eu. Vulputate dignissim suspendisse in est ante in."
              },
              {
                content: "Tempor nec feugiat nisl pretium. Id velit ut tortor pretium viverra suspendisse potenti nullam."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Aliquam sem fringilla ut morbi tincidunt augue interdum. Enim eu turpis egestas pretium aenean pharetra magna ac."
              },
              {
                content: "Amet porttitor eget dolor morbi non arcu risus quis varius. Ultricies tristique nulla aliquet enim tortor at auctor."
              },
              {
                content: "Nisi lacus sed viverra tellus in hac habitasse platea. Interdum velit euismod in pellentesque."
              },
              {
                content: "Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Eu non diam phasellus vestibulum lorem sed risus."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Viverra justo nec ultrices dui sapien eget. A scelerisque purus semper eget duis at tellus at."
              },
              {
                content: "Non diam phasellus vestibulum lorem sed risus ultricies tristique. Ornare arcu dui vivamus arcu felis bibendum ut tristique et."
              },
              {
                content: "Quisque non tellus orci ac. At augue eget arcu dictum varius."
              },
              {
                content: "Aenean sed adipiscing diam donec adipiscing tristique. Sagittis eu volutpat odio facilisis mauris."
              }
            ]
          }
        ]
      },
      {
        id: "content-politics-hot-topics",
        name: "Hot Topics",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-politics-paid-content",
        name: "Paid Content",
        articles: [
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Duis at consectetur lorem donec massa."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Eget mi proin sed libero enim sed. Proin libero nunc consequat interdum varius."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Porta nibh venenatis cras sed felisDolor sit amet consectetur adipiscing elit ut aliquam purus sit."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Nisl vel pretium lectus quam id leo in vitae. Ultrices neque ornare aenean euismod elementum nisi quis eleifend quam. Eget nullam non nisi est sit. Aliquet enim tortor at auctor urna."
              }
            ]
          }
        ]
      }
    ]
  },
  business: {
    name: "Business",
    url: "/business",
    priority: 1,
    sections: [
      {
        id: "content-business-latest-trends",
        name: "Latest trends",
        articles: [
          {
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
          },
          {
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
          },
          {
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
          }
        ]
      },
      {
        id: "content-business-market-watch",
        name: "Market Watch",
        articles: [
          {
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
          },
          {
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
          },
          {
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
          }
        ]
      },
      {
        id: "content-business-economy-today",
        name: "Economy Today",
        articles: [
          {
            class: "columns-wrap",
            header: "Global Impact",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Bibendum arcu vitae elementum curabitur vitae nunc sed. Ipsum faucibus vitae aliquet nec ullamcorper sit. Blandit libero volutpat sed cras ornare arcu dui. Maecenas sed enim ut sem viverra aliquet."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Arcu risus quis varius quam quisque id diam vel quam. Sed risus pretium quam vulputate dignissim suspendisse in. Amet aliquam id diam maecenas ultricies mi. Egestas dui id ornare arcu odio."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "At risus viverra adipiscing at in tellus. Morbi tempus iaculis urna id volutpat lacus laoreet non. Eu volutpat odio facilisis mauris sit amet. Leo urna molestie at elementum eu facilisis sed."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Outlook",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Ut etiam sit amet nisl purus in mollis nunc sed. Eget mauris pharetra et ultrices neque ornare aenean. Magna sit amet purus gravida quis blandit turpis."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Viverra aliquet eget sit amet tellus cras. Consequat id porta nibh venenatis. Ac felis donec et odio pellentesque diam volutpat commodo sed."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Montes nascetur ridiculus mus mauris vitae ultricies leo integer. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Financial Freedom",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Bibendum arcu vitae elementum curabitur vitae nunc sed. Facilisis mauris sit amet massa vitae tortor condimentum lacinia."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. At in tellus integer feugiat scelerisque varius morbi enim. Nisi vitae suscipit tellus mauris a."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus. In pellentesque massa placerat duis ultricies lacus sed."
              }
            ]
          }
        ]
      },
      {
        id: "content-business-must-read",
        name: "Must Read",
        articles: [
          {
            class: "columns-1",
            type: "grid",
            display: "grid-wrap",
            content: [
              {
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
              },
              {
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
              },
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-business-educational",
        name: "Educational",
        articles: [
          {
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
          },
          {
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
          },
          {
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
          }
        ]
      },
      {
        id: "content-business-underscored",
        name: "Underscored",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-business-investing-101",
        name: "Investing 101",
        articles: [
          {
            class: "columns-3-balanced",
            header: "Manage your assets",
            type: "articles-list",
            content: [
              {
                title: "Ic turpis egestas maecenas pharetra convallis. Dui accumsan sit amet nulla facilisi morbi tempus.",
                content: "A scelerisque purus semper eget duis at. Condimentum lacinia quis vel eros donec ac odio. Pretium fusce id velit ut tortor pretium viverra suspendisse. Blandit aliquam etiam erat velit scelerisque in. Est placerat in egestas erat imperdiet sed euismod nisi. Suspendisse potenti nullam ac tortor vitae purus faucibus."
              },
              {
                title: "Risus commodo viverra maecenas accumsan lacus vel.",
                content: "Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Iaculis eu non diam phasellus. Odio aenean sed adipiscing diam donec. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum."
              },
              {
                title: "Vitae ultricies leo integer malesuada nunc vel risus commodo.",
                content: "Donec et odio pellentesque diam volutpat. Sed libero enim sed faucibus turpis in eu. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Tristique risus nec feugiat in fermentum. Turpis egestas maecenas pharetra convallis posuere morbi leo urna."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "What to watch",
            type: "articles-list",
            content: [
              {
                title: "Elementum integer enim neque volutpat.",
                content: "Dignissim diam quis enim lobortis scelerisque. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Mi bibendum neque egestas congue quisque. Arcu dui vivamus arcu felis bibendum ut tristique. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis."
              },
              {
                title: "Vitae turpis massa sed elementum tempus egestas sed.",
                content: "Eu lobortis elementum nibh tellus molestie. Egestas congue quisque egestas diam in arcu cursus euismod quis. Purus non enim praesent elementum facilisis. Suscipit tellus mauris a diam maecenas sed enim ut sem. Sed elementum tempus egestas sed sed risus pretium quam."
              },
              {
                title: "Consequat ac felis donec et odio pellentesque diam.",
                content: "Pharetra diam sit amet nisl suscipit adipiscing bibendum. Mi eget mauris pharetra et ultrices neque ornare. Habitant morbi tristique senectus et netus et. Quis eleifend quam adipiscing vitae. Fames ac turpis egestas maecenas pharetra convallis posuere morbi."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "Did you know?",
            type: "articles-list",
            content: [
              {
                title: "Lacus sed viverra tellus in. Eget mi proin sed libero enim sed.",
                content: "A diam maecenas sed enim. Platea dictumst vestibulum rhoncus est pellentesque elit. Metus dictum at tempor commodo ullamcorper. Est ullamcorper eget nulla facilisi etiam dignissim diam. Felis eget velit aliquet sagittis id consectetur purus."
              },
              {
                title: "Est lorem ipsum dolor sit amet. Duis ultricies lacus sed turpis tincidunt.",
                content: "Mattis pellentesque id nibh tortor id aliquet lectus. Odio aenean sed adipiscing diam donec adipiscing. Mi in nulla posuere sollicitudin aliquam ultrices sagittis. Dictum varius duis at consectetur lorem donec massa sapien faucibus."
              },
              {
                title: "Duis ut diam quam nulla porttitor massa id.",
                content: "Id aliquet lectus proin nibh nisl condimentum id venenatis. Ultrices in iaculis nunc sed augue lacus viverra vitae congue. Lectus urna duis convallis convallis tellus id interdum velit. Duis convallis convallis tellus id interdum. Et malesuada fames ac turpis egestas sed."
              }
            ]
          }
        ]
      },
      {
        id: "content-business-stock-market",
        name: "Stock market",
        articles: [
          {
            class: "columns-wrap",
            header: "Dow Jones",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Nisi scelerisque eu ultrices vitae auctor eu. Amet massa vitae tortor condimentum lacinia quis vel. In arcu cursus euismod quis."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Tempus urna et pharetra pharetra massa massa ultricies mi. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Sit amet luctus venenatis lectus magna fringilla urna."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. Massa tempor nec feugiat nisl pretium fusce id. Elit ut aliquam purus sit amet luctus."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "S&P 500",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Risus quis varius quam quisque id diam vel quam. Risus at ultrices mi tempus imperdiet nulla malesuada. Aliquet enim tortor at auctor urna. Sapien et ligula ullamcorper malesuada proin libero. Nunc sed augue lacus viverra vitae congue."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Quisque id diam vel quam elementum pulvinar etiam non. Lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis. Ac ut consequat semper viverra nam libero justo."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem. Enim facilisis gravida neque convallis. Quis blandit turpis cursus in hac habitasse platea."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Day Trading",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Sed enim ut sem viverra aliquet eget. Porttitor lacus luctus accumsan tortor. Sit amet justo donec enim diam."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Nibh sit amet commodo nulla facilisi nullam vehicula. Lectus mauris ultrices eros in cursus turpis massa. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Consectetur lorem donec massa sapien faucibus. Aliquet porttitor lacus luctus accumsan tortor. Pharetra pharetra massa massa ultricies mi. Aliquam id diam maecenas ultricies mi eget mauris pharetra. Rhoncus urna neque viverra justo nec ultrices dui sapien eget."
              }
            ]
          }
        ]
      },
      {
        id: "content-business-impact",
        name: "Impact",
        articles: [
          {
            class: "columns-3-balanced",
            header: "Oil crisis",
            type: "articles-list",
            content: [
              {
                title: "Eleifend donec pretium vulputate sapien nec sagittis.",
                content: "Adipiscing bibendum est ultricies integer quis. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Suspendisse in est ante in. Semper auctor neque vitae tempus quam pellentesque. Et tortor at risus viverra adipiscing at in tellus integer."
              },
              {
                title: "Ornare aenean euismod elementum nisi quis eleifend quam.",
                content: "Pretium aenean pharetra magna ac. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Neque vitae tempus quam pellentesque nec nam aliquam sem. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Ipsum nunc aliquet bibendum enim facilisis gravida neque."
              },
              {
                title: "Ultrices sagittis orci a scelerisque purus semper. Porttitor massa id neque aliquam vestibulum morbi blandit.",
                content: "Augue eget arcu dictum varius. Aliquet nibh praesent tristique magna sit amet purus gravida. Mattis enim ut tellus elementum. A diam sollicitudin tempor id eu nisl nunc mi. Justo nec ultrices dui sapien eget mi proin. Euismod lacinia at quis risus sed vulputate odio."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "Tech Markets",
            type: "articles-list",
            content: [
              {
                title: "Dictum sit amet justo donec. Justo donec enim diam vulputate ut pharetra sit.",
                content: "Bibendum enim facilisis gravida neque. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Auctor neque vitae tempus quam pellentesque nec. Justo donec enim diam vulputate ut pharetra sit amet. Aliquam sem fringilla ut morbi tincidunt augue interdum velit."
              },
              {
                title: "Massa massa ultricies mi quis hendrerit dolor magna eget.",
                content: "Ornare massa eget egestas purus viverra accumsan in nisl nisi. A arcu cursus vitae congue mauris rhoncus. Gravida arcu ac tortor dignissim convallis aenean et tortor. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Volutpat diam ut venenatis tellus in metus."
              },
              {
                title: "Duis at consectetur lorem donec massa sapien faucibus.",
                content: "acilisis gravida neque convallis a cras semper auctor neque. Non nisi est sit amet facilisis magna etiam tempor. Posuere morbi leo urna molestie at elementum eu. Tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "Declining Markets",
            type: "articles-list",
            content: [
              {
                title: "Odio aenean sed adipiscing diam donec adipiscing tristique risus nec.",
                content: "Pharetra vel turpis nunc eget. Non arcu risus quis varius quam quisque id. Augue ut lectus arcu bibendum at varius vel pharetra vel. Rhoncus dolor purus non enim praesent elementum."
              },
              {
                title: "Quis enim lobortis scelerisque fermentum. Nisl rhoncus mattis rhoncus urna. Felis eget velit aliquet sagittis id consectetur purus ut.",
                content: "Enim nec dui nunc mattis enim ut. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Sed vulputate mi sit amet mauris commodo. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. In hac habitasse platea dictumst vestibulum rhoncus est."
              },
              {
                title: "landit cursus risus at ultrices mi tempus imperdiet nulla malesuada.",
                content: "Vitae justo eget magna fermentum iaculis eu non diam phasellus. Et netus et malesuada fames ac turpis. In eu mi bibendum neque egestas congue. Justo eget magna fermentum iaculis eu non diam. Feugiat nibh sed pulvinar proin gravida hendrerit lectus a."
              }
            ]
          }
        ]
      },
      {
        id: "content-business-hot-topics",
        name: "Hot Topics",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-business-paid-content",
        name: "Paid Content",
        articles: [
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Morbi enim nunc faucibus a pellentesque sit amet porttitor eget."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Cursus vitae congue mauris rhoncus aenean vel elit. Ultrices neque ornare aenean euismod elementum nisi. Aliquet risus feugiat in ante metus dictum at tempor commodo."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Sit amet aliquam id diam maecenas ultricies. Magna sit amet purus gravida quis blandit. Risus nullam eget felis eget nunc. Ac felis donec et odio pellentesque diam volutpat commodo sed."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Purus faucibus ornare suspendisse sed nisi lacus. Malesuada nunc vel risus commodo. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Aliquam malesuada bibendum arcu vitae elementum curabitur. A pellentesque sit amet porttitor eget dolor morbi non."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Tortor at auctor urna nunc id cursus metus aliquam. Facilisis magna etiam tempor orci. Eu nisl nunc mi ipsum faucibus vitae aliquet."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Cursus mattis molestie a iaculis at. Nullam eget felis eget nunc. Tortor id aliquet lectus proin nibh nisl condimentum id."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "arius morbi enim nunc faucibus a pellentesque sit amet porttitor. Blandit libero volutpat sed cras. Sed viverra ipsum nunc aliquet bibendum."
              }
            ]
          }
        ]
      }
    ]
  },
  opinion: {
    name: "Opinion",
    url: "/opinion",
    priority: 2,
    sections: [
      {
        id: "content-opinion-a-deeper-look",
        name: "A deeper look",
        articles: [
          {
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
          },
          {
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
          },
          {
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
          }
        ]
      },
      {
        id: "content-opinion-top-issues",
        name: "Top Issues",
        articles: [
          {
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
            content: [
              {
                content: "Tortor consequat id porta nibh venenatis cras sed."
              },
              {
                content: "Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur."
              },
              {
                content: "Adipiscing diam donec adipiscing tristique risus nec feugiat in."
              },
              {
                content: "Ultrices neque ornare aenean euismod elementum nisi quis."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Nisi porta lorem mollis aliquam ut porttitor leo a diam."
              },
              {
                content: "Purus ut faucibus pulvinar elementum integer enim neque volutpat ac."
              },
              {
                content: "Suspendisse in est ante in nibh mauris cursus."
              },
              {
                content: "Aliquam vestibulum morbi blandit cursus. Leo integer malesuada nunc vel risus commodo viverra maecenas."
              }
            ]
          },
          {
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
          }
        ]
      },
      {
        id: "content-opinon-trending",
        name: "Trending",
        articles: [
          {
            class: "columns-wrap",
            header: "Around the world",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Egestas congue quisque egestas diam in arcu. Sollicitudin tempor id eu nisl nunc mi."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "A condimentum vitae sapien pellentesque habitant morbi tristique senectus. Neque laoreet suspendisse interdum consectetur."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Dui vivamus arcu felis bibendum. Sit amet purus gravida quis blandit turpis cursus in."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Support",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Malesuada fames ac turpis egestas integer eget. Ante metus dictum at tempor commodo ullamcorper. Ipsum dolor sit amet consectetur."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Dictumst quisque sagittis purus sit amet. Cras fermentum odio eu feugiat pretium. Pretium aenean pharetra magna ac placerat vestibulum lectus."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Et odio pellentesque diam volutpat commodo sed egestas egestas. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Know More",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Nullam eget felis eget nunc. Fames ac turpis egestas integer eget aliquet nibh praesent tristique."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Massa ultricies mi quis hendrerit dolor magna eget est."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Ut tellus elementum sagittis vitae et leo duis ut. Purus ut faucibus pulvinar elementum integer enim."
              }
            ]
          }
        ]
      },
      {
        id: "content-opinion-think-about-it",
        name: "Think about it",
        articles: [
          {
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
            content: [
              {
                content: "Et tortor consequat id porta nibh venenatis cras sed felis. Neque aliquam vestibulum morbi blandit cursus risus at ultrices mi.",
                url: "#"
              },
              {
                content: "Commodo quis imperdiet massa tincidunt nunc. Diam maecenas sed enim ut sem viverra aliquet eget sit.",
                url: "#"
              },
              {
                content: "Aliquam malesuada bibendum arcu vitae elementum curabitur. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat.",
                url: "#"
              },
              {
                content: "Quis enim lobortis scelerisque fermentum. Nibh venenatis cras sed felis eget velit aliquet.",
                url: "#"
              }
            ]
          },
          {
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
            content: [
              {
                content: "In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. At lectus urna duis convallis convallis tellus id interdum.",
                url: "#"
              },
              {
                content: "Ultrices eros in cursus turpis massa tincidunt dui. Mi tempus imperdiet nulla malesuada pellentesque.",
                url: "#"
              },
              {
                content: "Ipsum faucibus vitae aliquet nec ullamcorper sit. Eleifend donec pretium vulputate sapien nec sagittis aliquam.",
                url: "#"
              },
              {
                content: "In hac habitasse platea dictumst. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu.",
                url: "#"
              }
            ]
          },
          {
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
            content: [
              {
                content: "Urna porttitor rhoncus dolor purus. Eget sit amet tellus cras adipiscing enim.",
                url: "#"
              },
              {
                content: "Leo urna molestie at elementum eu facilisis sed. Metus dictum at tempor commodo ullamcorper a.",
                url: "#"
              },
              {
                content: "Non odio euismod lacinia at quis risus sed vulputate.",
                url: "#"
              },
              {
                content: "Justo donec enim diam vulputate ut. Euismod elementum nisi quis eleifend.",
                url: "#"
              }
            ]
          }
        ]
      },
      {
        id: "content-opinion-latest-media",
        name: "Latest Media",
        articles: [
          {
            class: "columns-1",
            type: "grid",
            content: [
              {
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
              },
              {
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
              },
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-opinion-in-case-you-missed-it",
        name: "In case you missed it",
        articles: [
          {
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
            content: [
              {
                content: "Eget felis eget nunc lobortis mattis aliquam faucibus purus in."
              },
              {
                content: "Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus."
              },
              {
                content: "Eu volutpat odio facilisis mauris sit amet massa."
              },
              {
                content: "Vitae tortor condimentum lacinia quis vel eros donec ac."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Enim facilisis gravida neque convallis a."
              },
              {
                content: "Ridiculus mus mauris vitae ultricies leo integer malesuada."
              },
              {
                content: "Elementum nisi quis eleifend quam. Sed elementum tempus egestas sed sed."
              },
              {
                content: "Ut tellus elementum sagittis vitae et leo duis ut diam. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Metus dictum at tempor commodo ullamcorper a lacus vestibulum."
              },
              {
                content: "In nisl nisi scelerisque eu ultrices. In fermentum et sollicitudin ac orci phasellus egestas."
              },
              {
                content: "Ut aliquam purus sit amet luctus venenatis lectus magna fringilla."
              },
              {
                content: "Morbi enim nunc faucibus a pellentesque. Mi ipsum faucibus vitae aliquet nec ullamcorper."
              }
            ]
          }
        ]
      },
      {
        id: "content-opinion-environmental-issues",
        name: "Environmental Issues",
        articles: [
          {
            class: "columns-3-balanced",
            header: "Global Warming",
            type: "articles-list",
            content: [
              {
                title: "Dis parturient montes nascetur ridiculus mus mauris vitae.",
                content: "Justo donec enim diam vulputate ut pharetra sit amet aliquam. Curabitur vitae nunc sed velit dignissim sodales. Varius vel pharetra vel turpis nunc eget lorem. Sed viverra ipsum nunc aliquet bibendum. Ultrices in iaculis nunc sed augue."
              },
              {
                title: "Vitae turpis massa sed elementum tempus egestas sed sed risus.",
                content: "Nascetur ridiculus mus mauris vitae ultricies leo integer. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Gravida arcu ac tortor dignissim convallis aenean. Urna duis convallis convallis tellus id interdum."
              },
              {
                title: "Rutrum tellus pellentesque eu tincidunt tortor. Volutpat sed cras ornare arcu.",
                content: "estibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Urna porttitor rhoncus dolor purus. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Ultrices in iaculis nunc sed augue lacus. Nunc pulvinar sapien et ligula ullamcorper."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "Recycling",
            type: "articles-list",
            content: [
              {
                title: "Tellus id interdum velit laoreet id donec ultrices tincidunt arcu.",
                content: "Eget est lorem ipsum dolor sit amet. Faucibus scelerisque eleifend donec pretium vulputate sapien. Quam adipiscing vitae proin sagittis. Quisque id diam vel quam elementum pulvinar etiam non. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean."
              },
              {
                title: "Scelerisque viverra mauris in aliquam sem fringilla ut.",
                content: "Amet mauris commodo quis imperdiet. Eu consequat ac felis donec et odio pellentesque. Hendrerit gravida rutrum quisque non tellus orci ac. Amet cursus sit amet dictum."
              },
              {
                title: "Vulputate eu scelerisque felis imperdiet. Non quam lacus suspendisse faucibus interdum posuere.",
                content: "Luctus venenatis lectus magna fringilla urna porttitor. Hac habitasse platea dictumst vestibulum rhoncus. Orci a scelerisque purus semper eget duis at tellus. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "New researches",
            type: "articles-list",
            content: [
              {
                title: "Non quam lacus suspendisse faucibus.",
                content: "Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Odio euismod lacinia at quis. Molestie a iaculis at erat. Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Donec ac odio tempor orci dapibus."
              },
              {
                title: "Sit amet consectetur adipiscing elit. Lorem sed risus ultricies tristique nulla aliquet.",
                content: "Neque aliquam vestibulum morbi blandit cursus risus at. Habitant morbi tristique senectus et netus et. Quis blandit turpis cursus in. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Vel risus commodo viverra maecenas. Tortor dignissim convallis aenean et tortor at."
              },
              {
                title: "Ullamcorper sit amet risus nullam eget.",
                content: "urpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Mollis aliquam ut porttitor leo a diam. Posuere morbi leo urna molestie. Suscipit tellus mauris a diam maecenas sed. Ultrices dui sapien eget mi proin sed libero enim sed."
              }
            ]
          }
        ]
      },
      {
        id: "content-opinion-underscored",
        name: "Underscored",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-opinon-what-matters-most",
        name: "What matters most",
        articles: [
          {
            class: "columns-wrap",
            header: "Discussion",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Nibh sed pulvinar proin gravida hendrerit lectus. Habitasse platea dictumst quisque sagittis purus sit amet. Mi sit amet mauris commodo quis."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Arcu non odio euismod lacinia. Ac turpis egestas sed tempus urna."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Lectus sit amet est placerat in. Auctor augue mauris augue neque gravida in fermentum. Duis convallis convallis tellus id interdum."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Is it worth it?",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Venenatis tellus in metus vulputate eu scelerisque felis. Orci phasellus egestas tellus rutrum tellus pellentesque eu. Id leo in vitae turpis massa sed elementum."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Feugiat vivamus at augue eget arcu dictum varius duis at. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Eget sit amet tellus cras adipiscing enim eu. Dictum at tempor commodo ullamcorper a lacus. Lectus proin nibh nisl condimentum id venenatis a condimentum vitae."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Just do it",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Mattis rhoncus urna neque viverra. Hendrerit gravida rutrum quisque non tellus orci ac. Ut venenatis tellus in metus."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Enim ut tellus elementum sagittis vitae et leo duis. Dictumst quisque sagittis purus sit amet volutpat consequat."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "urus ut faucibus pulvinar elementum integer enim neque. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque."
              }
            ]
          }
        ]
      },
      {
        id: "content-opinion-hot-topics",
        name: "Hot Topics",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-opinion-paid-content",
        name: "Paid Content",
        articles: [
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Nulla facilisi nullam vehicula ipsum. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. Diam phasellus vestibulum lorem sed risus ultricies."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Dictum fusce ut placerat orci nulla. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Sed cras ornare arcu dui vivamus. Eget nunc lobortis mattis aliquam faucibus purus in. Nulla facilisi nullam vehicula ipsum a. Sed faucibus turpis in eu mi bibendum."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Mauris nunc congue nisi vitae suscipit tellus. Auctor augue mauris augue neque gravida in. Phasellus vestibulum lorem sed risus ultricies."
              }
            ]
          }
        ]
      }
    ]
  },
  health: {
    name: "Health",
    url: "/health",
    priority: 2,
    sections: [
      {
        id: "content-health-trending",
        name: "Trending",
        articles: [
          {
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
            content: [
              {
                content: "Eu turpis egestas pretium aenean pharetra. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant."
              },
              {
                content: "Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim."
              },
              {
                content: "Eu non diam phasellus vestibulum lorem. Fermentum dui faucibus in ornare quam viverra orci sagittis."
              },
              {
                content: "Et malesuada fames ac turpis. Ornare massa eget egestas purus viverra accumsan."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Metus vulputate eu scelerisque felis."
              },
              {
                content: "Aliquam sem et tortor consequat id. Feugiat nibh sed pulvinar proin."
              },
              {
                content: "Quisque non tellus orci ac auctor augue."
              },
              {
                content: "Sed risus pretium quam vulputate dignissim. Vitae tortor condimentum lacinia quis vel eros."
              }
            ]
          },
          {
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
            content: [
              {
                content: "Odio euismod lacinia at quis risus sed vulputate odio. Ullamcorper eget nulla facilisi etiam."
              },
              {
                content: "Ipsum consequat nisl vel pretium. Nisi vitae suscipit tellus mauris a diam."
              },
              {
                content: "Laoreet id donec ultrices tincidunt arcu non sodales neque sodales."
              },
              {
                content: "At volutpat diam ut venenatis tellus in metus vulputate eu."
              }
            ]
          }
        ]
      },
      {
        id: "content-health-latest-facts",
        name: "Latest Facts",
        articles: [
          {
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
            content: [
              {
                content: "Pharetra vel turpis nunc eget. Eu feugiat pretium nibh ipsum consequat."
              },
              {
                content: "Velit dignissim sodales ut eu sem. Viverra accumsan in nisl nisi scelerisque eu ultrices."
              },
              {
                content: "Arcu dictum varius duis at consectetur lorem donec massa sapien."
              }
            ]
          },
          {
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
          },
          {
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
            content: [
              {
                content: "Semper eget duis at tellus at urna condimentum.",
                url: "#"
              },
              {
                content: "Aliquet lectus proin nibh nisl condimentum id. Velit scelerisque in dictum non.",
                url: "#"
              },
              {
                content: "Nulla posuere sollicitudin aliquam ultrices sagittis orci.",
                url: "#"
              },
              {
                content: "Condimentum vitae sapien pellentesque habitant. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet.",
                url: "#"
              }
            ]
          }
        ]
      },
      {
        id: "content-health-medical-breakthroughs",
        name: "Medical Breakthroughs",
        articles: [
          {
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
          },
          {
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
          },
          {
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
          }
        ]
      },
      {
        id: "content-health-latest-videos",
        name: "Latest Videos",
        articles: [
          {
            class: "columns-1",
            type: "grid",
            content: [
              {
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
              },
              {
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
              },
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-health-educational",
        name: "Educational",
        articles: [
          {
            class: "columns-1",
            type: "grid",
            display: "grid-wrap",
            content: [
              {
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
              },
              {
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
              },
              {
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
              },
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-health-fitness",
        name: "Fitness",
        articles: [
          {
            class: "columns-wrap",
            header: "Burn your calories",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Dictumst quisque sagittis purus sit amet volutpat consequat. At imperdiet dui accumsan sit amet nulla facilisi. Felis bibendum ut tristique et egestas. Mus mauris vitae ultricies leo integer malesuada. Adipiscing at in tellus integer feugiat."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Morbi non arcu risus quis varius quam quisque id. Enim nulla aliquet porttitor lacus luctus. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Consequat semper viverra nam libero justo laoreet sit."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Gravida quis blandit turpis cursus in hac habitasse platea. Maecenas ultricies mi eget mauris pharetra et ultrices. Massa sed elementum tempus egestas sed."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Gym favorites",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Nulla facilisi nullam vehicula ipsum a arcu cursus. Et ultrices neque ornare aenean euismod elementum nisi quis. Velit euismod in pellentesque massa. In fermentum posuere urna nec tincidunt praesent semper."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Sit amet consectetur adipiscing elit duis tristique sollicitudin. Ante metus dictum at tempor commodo ullamcorper. Tincidunt eget nullam non nisi est sit. Platea dictumst quisque sagittis purus sit amet volutpat consequat."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Sed vulputate odio ut enim blandit volutpat maecenas. Risus viverra adipiscing at in. Fusce id velit ut tortor pretium viverra. Sem nulla pharetra diam sit amet nisl. Posuere urna nec tincidunt praesent semper feugiat nibh."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Pilates",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Massa massa ultricies mi quis hendrerit dolor magna. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Vestibulum lorem sed risus ultricies tristique. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Massa enim nec dui nunc mattis enim ut tellus elementum. Eros in cursus turpis massa tincidunt dui. Sit amet consectetur adipiscing elit ut aliquam purus sit amet. Eget nullam non nisi est sit amet facilisis magna."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "enenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. In eu mi bibendum neque egestas congue quisque egestas. Bibendum est ultricies integer quis auctor elit. Ipsum nunc aliquet bibendum enim facilisis. Magna fringilla urna porttitor rhoncus dolor purus non enim praesent."
              }
            ]
          }
        ]
      },
      {
        id: "content-health-guides",
        name: "Guides",
        articles: [
          {
            class: "columns-3-balanced",
            header: "Health after 50",
            type: "articles-list",
            content: [
              {
                title: "Ac ut consequat semper viverra nam libero justo.",
                content: "A lacus vestibulum sed arcu non odio euismod lacinia at. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Enim nec dui nunc mattis enim ut tellus. Congue eu consequat ac felis donec et odio. Vitae sapien pellentesque habitant morbi tristique senectus."
              },
              {
                title: "Sit amet porttitor eget dolor morbi non arcu risus quis.",
                content: "Gravida in fermentum et sollicitudin. Diam sollicitudin tempor id eu nisl. Proin libero nunc consequat interdum varius sit amet. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Lacinia quis vel eros donec ac."
              },
              {
                title: "Faucibus nisl tincidunt eget nullam non nisi.",
                content: "Diam ut venenatis tellus in metus. Luctus accumsan tortor posuere ac. Eget aliquet nibh praesent tristique magna. Diam donec adipiscing tristique risus nec feugiat in fermentum posuere. Dolor morbi non arcu risus quis varius quam quisque."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "Healthy Heart",
            type: "articles-list",
            content: [
              {
                title: "Gravida cum sociis natoque penatibus et magnis dis parturient montes.",
                content: "Nulla porttitor massa id neque aliquam vestibulum morbi. Nullam non nisi est sit amet facilisis. Vitae turpis massa sed elementum tempus. Varius duis at consectetur lorem. Consequat semper viverra nam libero justo laoreet sit."
              },
              {
                title: "Non nisi est sit amet facilisis magna etiam tempor orci.",
                content: "At augue eget arcu dictum varius duis at. Arcu felis bibendum ut tristique et egestas. Elementum tempus egestas sed sed risus pretium quam vulputate. Cursus euismod quis viverra nibh cras pulvinar. Praesent tristique magna sit amet purus gravida quis."
              },
              {
                title: "Sit amet justo donec enim diam vulputate ut pharetra.",
                content: "Nulla at volutpat diam ut venenatis tellus. Pulvinar mattis nunc sed blandit libero volutpat. Sit amet justo donec enim diam vulputate. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant."
              }
            ]
          },
          {
            class: "columns-3-balanced",
            header: "Healthy Digestive",
            type: "articles-list",
            content: [
              {
                title: "Metus aliquam eleifend mi in nulla posuere sollicitudin.",
                content: "Sodales ut etiam sit amet nisl purus in. Lorem ipsum dolor sit amet consectetur. Tincidunt ornare massa eget egestas purus viverra accumsan in. Orci eu lobortis elementum nibh tellus molestie nunc non. Ut faucibus pulvinar elementum integer enim neque."
              },
              {
                title: "Placerat duis ultricies lacus sed. Donec enim diam vulputate ut.",
                content: "Condimentum id venenatis a condimentum vitae sapien. Eu ultrices vitae auctor eu augue ut lectus. Fermentum iaculis eu non diam phasellus. Urna nunc id cursus metus aliquam eleifend mi. Venenatis cras sed felis eget velit aliquet sagittis."
              },
              {
                title: "Rhoncus dolor purus non enim praesent elementum facilisis.",
                content: "Nunc consequat interdum varius sit. Non diam phasellus vestibulum lorem sed risus ultricies. Feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Eget egestas purus viverra accumsan in nisl nisi scelerisque."
              }
            ]
          }
        ]
      },
      {
        id: "content-health-underscored",
        name: "Underscored",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-health-what-to-eat",
        name: "What to eat",
        articles: [
          {
            class: "columns-wrap",
            header: "Low carbs",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Nec feugiat in fermentum posuere urna. Odio ut sem nulla pharetra. Est ultricies integer quis auctor elit sed. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Egestas sed tempus urna et. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Sapien pellentesque habitant morbi tristique senectus et netus et malesuada. Dictum non consectetur a erat. Duis ut diam quam nulla porttitor."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Vegetarian",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Sed viverra tellus in hac habitasse platea dictumst vestibulum. Nisi est sit amet facilisis magna etiam."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Convallis a cras semper auctor neque vitae tempus. Cursus risus at ultrices mi tempus imperdiet nulla."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Ut faucibus pulvinar elementum integer enim neque volutpat. Netus et malesuada fames ac turpis egestas sed tempus urna."
              }
            ]
          },
          {
            class: "columns-wrap",
            header: "Breakfast",
            type: "excerpt",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Eget mauris pharetra et ultrices. In ante metus dictum at tempor commodo ullamcorper a. Ut sem nulla pharetra diam sit."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Lacus sed turpis tincidunt id aliquet risus. Nulla facilisi etiam dignissim diam quis enim. Non curabitur gravida arcu ac tortor dignissim convallis aenean."
              },
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                text: "Aliquam etiam erat velit scelerisque in dictum non. Pretium fusce id velit ut tortor pretium viverra."
              }
            ]
          }
        ]
      },
      {
        id: "content-health-hot-topics",
        name: "Hot Topics",
        articles: [
          {
            class: "columns-2-balanced",
            header: "This First",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          },
          {
            class: "columns-2-balanced",
            header: "This Second",
            type: "grid",
            content: [
              {
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
              },
              {
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
              }
            ]
          }
        ]
      },
      {
        id: "content-health-paid-content",
        name: "Paid Content",
        articles: [
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Eu sem integer vitae justo eget magna fermentum iaculis. Aenean pharetra magna ac placerat vestibulum lectus. Amet commodo nulla facilisi nullam."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Nullam vehicula ipsum a arcu cursus vitae congue. Enim ut tellus elementum sagittis vitae et leo duis. Nulla malesuada pellentesque elit eget."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Est velit egestas dui id ornare arcu odio. Urna nunc id cursus metus. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit."
              }
            ]
          },
          {
            class: "columns-4-balanced",
            type: "preview",
            content: [
              {
                image: {
                  src: "placeholder_light.jpg",
                  alt: "Placeholder",
                  width: "1280",
                  height: "720"
                },
                title: "Erat imperdiet sed euismod nisi porta. Nullam ac tortor vitae purus faucibus ornare. Feugiat nisl pretium fusce id. Massa enim nec dui nunc mattis enim ut tellus elementum."
              }
            ]
          }
        ]
      }
    ]
  }
};
const settings = {
  header: "Settings",
  items: {
    motion: {
      label: "Reduced Motion"
    }
  }
};
const footer = {
  copyright: {
    label: "all rights reserved!"
  }
};
const login = {
  label: "Log In",
  href: "#",
  target: "internal"
};
const more = {
  label: "More",
  href: "#",
  target: "internal"
};
const buttonsEn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  login,
  more
}, Symbol.toStringTag, { value: "Module" }));
const social = {
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
};
const legal = {
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
};
const a11y = {
  skip: {
    label: "Skip to content"
  }
};
const linksEn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  a11y,
  legal,
  social
}, Symbol.toStringTag, { value: "Module" }));
const strings = {
  en: {
    content,
    settings,
    footer,
    buttons: buttonsEn,
    links: linksEn
  }
};
function provideLocale() {
  const defaultLanguage = "en";
  const urlParams = new URLSearchParams(window.location.search);
  const dir = urlParams.get("dir") ?? "ltr";
  const langFromUrl = urlParams.get("lang");
  const lang = langFromUrl && langFromUrl in strings ? langFromUrl : defaultLanguage;
  useHead({
    htmlAttrs: { dir, lang }
  });
  const value = {
    lang,
    dir,
    ...strings[lang]
  };
  provide("data", value);
}
function scrollOnNavigation() {
  const route = useRoute();
  {
    watch$1(
      route,
      // eslint-disable-next-line no-unused-vars
      (value) => {
        if (document.getElementById("page")) {
          if (!route.hash) {
            document.getElementById("page").scrollTo(0, 0);
          } else {
            const elementId = route.hash.split("#")[1];
            nextTick(() => {
              document.getElementById(elementId).scrollIntoView();
            });
          }
        }
      },
      { deep: true, immediate: true }
    );
  }
}
{
  history.replaceState = function(state) {
    return null;
  };
  window.requestAnimationFrame = (cb) => window.setTimeout(cb, 0);
  window.cancelAnimationFrame = window.clearTimeout;
  window.requestIdleCallback = void 0;
  window.cancelIdleCallback = void 0;
}
const _sfc_main$1 = {
  __name: "app",
  setup(__props) {
    provideLocale();
    scrollOnNavigation();
    return (_ctx, _cache) => {
      const _component_NuxtPage = __nuxt_component_0$8;
      const _component_Layout = _sfc_main$2;
      return openBlock(), createBlock(_component_Layout, null, {
        default: withCtx(() => [
          createVNode(_component_NuxtPage)
        ]),
        _: 1
      });
    };
  }
};
const _sfc_main = {
  __name: "nuxt-root",
  setup(__props) {
    const ErrorComponent = /* @__PURE__ */ defineAsyncComponent(() => __vitePreload(() => import("./error-component.214e42f1.js"), true ? [] : void 0, import.meta.url).then((r) => r.default || r));
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    const onResolve = nuxtApp.deferHydration();
    const SingleRenderer = false;
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      if (isNuxtError(err) && (err.fatal || err.unhandled)) {
        nuxtApp.runWithContext(() => showError(err));
        return false;
      }
    });
    const { islandContext } = false;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Suspense, { onResolve: unref(onResolve) }, {
        default: withCtx(() => [
          unref(error) ? (openBlock(), createBlock(unref(ErrorComponent), {
            key: 0,
            error: unref(error)
          }, null, 8, ["error"])) : unref(islandContext) ? (openBlock(), createBlock(unref(IslandRenderer), {
            key: 1,
            context: unref(islandContext)
          }, null, 8, ["context"])) : unref(SingleRenderer) ? (openBlock(), createBlock(resolveDynamicComponent(unref(SingleRenderer)), { key: 2 })) : (openBlock(), createBlock(unref(_sfc_main$1), { key: 3 }))
        ]),
        _: 1
      }, 8, ["onResolve"]);
    };
  }
};
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  let vueAppPromise;
  entry = async function initApp() {
    var _a, _b;
    if (vueAppPromise) {
      return vueAppPromise;
    }
    const isSSR = Boolean(
      ((_a = window.__NUXT__) == null ? void 0 : _a.serverRendered) || ((_b = document.getElementById("__NUXT_DATA__")) == null ? void 0 : _b.dataset.ssr) === "true"
    );
    const vueApp = isSSR ? createSSRApp(_sfc_main) : createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp });
    try {
      await applyPlugins(nuxt, plugins);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    try {
      await nuxt.hooks.callHook("app:created", vueApp);
      await nuxt.hooks.callHook("app:beforeMount", vueApp);
      vueApp.mount("#" + appRootId);
      await nuxt.hooks.callHook("app:mounted", vueApp);
      await nextTick();
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
  vueAppPromise = entry().catch((error) => {
    console.error("Error while mounting app:", error);
  });
}
export {
  __vitePreload as _,
  _export_sfc as a,
  useHead as b,
  createBlock as c,
  defineAsyncComponent as d,
  createElementBlock as e,
  createBaseVNode as f,
  guardReactiveProps as g,
  createVNode as h,
  createTextVNode as i,
  __nuxt_component_0$9 as j,
  popScopeId as k,
  normalizeProps as n,
  openBlock as o,
  pushScopeId as p,
  toDisplayString as t,
  unref as u,
  withCtx as w
};
