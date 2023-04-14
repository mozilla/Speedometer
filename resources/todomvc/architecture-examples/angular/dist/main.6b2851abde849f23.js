"use strict";

(self.webpackChunkangular = self.webpackChunkangular || []).push([ [ 179 ], {
    826: () => {
        function isFunction(value) {
            return "function" == typeof value;
        }
        function createErrorClass(createImpl) {
            const ctorFunc = createImpl(instance => {
                Error.call(instance), instance.stack = (new Error).stack;
            });
            return ctorFunc.prototype = Object.create(Error.prototype), ctorFunc.prototype.constructor = ctorFunc, 
            ctorFunc;
        }
        const UnsubscriptionError = createErrorClass(_super => function(errors) {
            _super(this), this.message = errors ? `${errors.length} errors occurred during unsubscription:\n${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join("\n  ")}` : "", 
            this.name = "UnsubscriptionError", this.errors = errors;
        });
        function arrRemove(arr, item) {
            if (arr) {
                const index = arr.indexOf(item);
                0 <= index && arr.splice(index, 1);
            }
        }
        class Subscription {
            constructor(initialTeardown) {
                this.initialTeardown = initialTeardown, this.closed = !1, this._parentage = null, 
                this._finalizers = null;
            }
            unsubscribe() {
                let errors;
                if (!this.closed) {
                    this.closed = !0;
                    const {_parentage} = this;
                    if (_parentage) if (this._parentage = null, Array.isArray(_parentage)) for (const parent of _parentage) parent.remove(this); else _parentage.remove(this);
                    const {initialTeardown: initialFinalizer} = this;
                    if (isFunction(initialFinalizer)) try {
                        initialFinalizer();
                    } catch (e) {
                        errors = e instanceof UnsubscriptionError ? e.errors : [ e ];
                    }
                    const {_finalizers} = this;
                    if (_finalizers) {
                        this._finalizers = null;
                        for (const finalizer of _finalizers) try {
                            execFinalizer(finalizer);
                        } catch (err) {
                            errors = errors ?? [], err instanceof UnsubscriptionError ? errors = [ ...errors, ...err.errors ] : errors.push(err);
                        }
                    }
                    if (errors) throw new UnsubscriptionError(errors);
                }
            }
            add(teardown) {
                var _a;
                if (teardown && teardown !== this) if (this.closed) execFinalizer(teardown); else {
                    if (teardown instanceof Subscription) {
                        if (teardown.closed || teardown._hasParent(this)) return;
                        teardown._addParent(this);
                    }
                    (this._finalizers = null !== (_a = this._finalizers) && void 0 !== _a ? _a : []).push(teardown);
                }
            }
            _hasParent(parent) {
                const {_parentage} = this;
                return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
            }
            _addParent(parent) {
                const {_parentage} = this;
                this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [ _parentage, parent ] : parent;
            }
            _removeParent(parent) {
                const {_parentage} = this;
                _parentage === parent ? this._parentage = null : Array.isArray(_parentage) && arrRemove(_parentage, parent);
            }
            remove(teardown) {
                const {_finalizers} = this;
                _finalizers && arrRemove(_finalizers, teardown), teardown instanceof Subscription && teardown._removeParent(this);
            }
        }
        Subscription.EMPTY = (() => {
            const empty2 = new Subscription;
            return empty2.closed = !0, empty2;
        })();
        const EMPTY_SUBSCRIPTION = Subscription.EMPTY;
        function isSubscription(value) {
            return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
        }
        function execFinalizer(finalizer) {
            isFunction(finalizer) ? finalizer() : finalizer.unsubscribe();
        }
        const config = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1
        }, timeoutProvider = {
            setTimeout(handler, timeout, ...args) {
                const {delegate} = timeoutProvider;
                return delegate?.setTimeout ? delegate.setTimeout(handler, timeout, ...args) : setTimeout(handler, timeout, ...args);
            },
            clearTimeout(handle) {
                const {delegate} = timeoutProvider;
                return (delegate?.clearTimeout || clearTimeout)(handle);
            },
            delegate: void 0
        };
        function reportUnhandledError(err) {
            timeoutProvider.setTimeout(() => {
                const {onUnhandledError} = config;
                if (!onUnhandledError) throw err;
                onUnhandledError(err);
            });
        }
        function noop() {}
        const COMPLETE_NOTIFICATION = createNotification("C", void 0, void 0);
        function createNotification(kind, value, error) {
            return {
                kind,
                value,
                error
            };
        }
        let context = null;
        function errorContext(cb) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                const isRoot = !context;
                if (isRoot && (context = {
                    errorThrown: !1,
                    error: null
                }), cb(), isRoot) {
                    const {errorThrown, error} = context;
                    if (context = null, errorThrown) throw error;
                }
            } else cb();
        }
        class Subscriber extends Subscription {
            constructor(destination) {
                super(), this.isStopped = !1, destination ? (this.destination = destination, isSubscription(destination) && destination.add(this)) : this.destination = EMPTY_OBSERVER;
            }
            static create(next, error, complete) {
                return new SafeSubscriber(next, error, complete);
            }
            next(value) {
                this.isStopped ? handleStoppedNotification(function nextNotification(value) {
                    return createNotification("N", value, void 0);
                }(value), this) : this._next(value);
            }
            error(err) {
                this.isStopped ? handleStoppedNotification(function errorNotification(error) {
                    return createNotification("E", void 0, error);
                }(err), this) : (this.isStopped = !0, this._error(err));
            }
            complete() {
                this.isStopped ? handleStoppedNotification(COMPLETE_NOTIFICATION, this) : (this.isStopped = !0, 
                this._complete());
            }
            unsubscribe() {
                this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null);
            }
            _next(value) {
                this.destination.next(value);
            }
            _error(err) {
                try {
                    this.destination.error(err);
                } finally {
                    this.unsubscribe();
                }
            }
            _complete() {
                try {
                    this.destination.complete();
                } finally {
                    this.unsubscribe();
                }
            }
        }
        const _bind = Function.prototype.bind;
        function bind(fn, thisArg) {
            return _bind.call(fn, thisArg);
        }
        class ConsumerObserver {
            constructor(partialObserver) {
                this.partialObserver = partialObserver;
            }
            next(value) {
                const {partialObserver} = this;
                if (partialObserver.next) try {
                    partialObserver.next(value);
                } catch (error) {
                    handleUnhandledError(error);
                }
            }
            error(err) {
                const {partialObserver} = this;
                if (partialObserver.error) try {
                    partialObserver.error(err);
                } catch (error) {
                    handleUnhandledError(error);
                } else handleUnhandledError(err);
            }
            complete() {
                const {partialObserver} = this;
                if (partialObserver.complete) try {
                    partialObserver.complete();
                } catch (error) {
                    handleUnhandledError(error);
                }
            }
        }
        class SafeSubscriber extends Subscriber {
            constructor(observerOrNext, error, complete) {
                let partialObserver;
                if (super(), isFunction(observerOrNext) || !observerOrNext) partialObserver = {
                    next: observerOrNext ?? void 0,
                    error: error ?? void 0,
                    complete: complete ?? void 0
                }; else {
                    let context2;
                    this && config.useDeprecatedNextContext ? (context2 = Object.create(observerOrNext), 
                    context2.unsubscribe = () => this.unsubscribe(), partialObserver = {
                        next: observerOrNext.next && bind(observerOrNext.next, context2),
                        error: observerOrNext.error && bind(observerOrNext.error, context2),
                        complete: observerOrNext.complete && bind(observerOrNext.complete, context2)
                    }) : partialObserver = observerOrNext;
                }
                this.destination = new ConsumerObserver(partialObserver);
            }
        }
        function handleUnhandledError(error) {
            config.useDeprecatedSynchronousErrorHandling ? function captureError(err) {
                config.useDeprecatedSynchronousErrorHandling && context && (context.errorThrown = !0, 
                context.error = err);
            }(error) : reportUnhandledError(error);
        }
        function handleStoppedNotification(notification, subscriber) {
            const {onStoppedNotification} = config;
            onStoppedNotification && timeoutProvider.setTimeout(() => onStoppedNotification(notification, subscriber));
        }
        const EMPTY_OBSERVER = {
            closed: !0,
            next: noop,
            error: function defaultErrorHandler(err) {
                throw err;
            },
            complete: noop
        }, observable = "function" == typeof Symbol && Symbol.observable || "@@observable";
        function identity(x) {
            return x;
        }
        let Observable_Observable = (() => {
            class Observable2 {
                constructor(subscribe) {
                    subscribe && (this._subscribe = subscribe);
                }
                lift(operator) {
                    const observable2 = new Observable2;
                    return observable2.source = this, observable2.operator = operator, observable2;
                }
                subscribe(observerOrNext, error, complete) {
                    const subscriber = function isSubscriber(value) {
                        return value && value instanceof Subscriber || function isObserver(value) {
                            return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
                        }(value) && isSubscription(value);
                    }(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
                    return errorContext(() => {
                        const {operator, source} = this;
                        subscriber.add(operator ? operator.call(subscriber, source) : source ? this._subscribe(subscriber) : this._trySubscribe(subscriber));
                    }), subscriber;
                }
                _trySubscribe(sink) {
                    try {
                        return this._subscribe(sink);
                    } catch (err) {
                        sink.error(err);
                    }
                }
                forEach(next, promiseCtor) {
                    return new (promiseCtor = getPromiseCtor(promiseCtor))((resolve, reject) => {
                        const subscriber = new SafeSubscriber({
                            next: value => {
                                try {
                                    next(value);
                                } catch (err) {
                                    reject(err), subscriber.unsubscribe();
                                }
                            },
                            error: reject,
                            complete: resolve
                        });
                        this.subscribe(subscriber);
                    });
                }
                _subscribe(subscriber) {
                    var _a;
                    return null === (_a = this.source) || void 0 === _a ? void 0 : _a.subscribe(subscriber);
                }
                [observable]() {
                    return this;
                }
                pipe(...operations) {
                    return function pipeFromArray(fns) {
                        return 0 === fns.length ? identity : 1 === fns.length ? fns[0] : function(input) {
                            return fns.reduce((prev, fn) => fn(prev), input);
                        };
                    }(operations)(this);
                }
                toPromise(promiseCtor) {
                    return new (promiseCtor = getPromiseCtor(promiseCtor))((resolve, reject) => {
                        let value;
                        this.subscribe(x => value = x, err => reject(err), () => resolve(value));
                    });
                }
            }
            return Observable2.create = subscribe => new Observable2(subscribe), Observable2;
        })();
        function getPromiseCtor(promiseCtor) {
            var _a;
            return null !== (_a = promiseCtor ?? config.Promise) && void 0 !== _a ? _a : Promise;
        }
        const ObjectUnsubscribedError = createErrorClass(_super => function() {
            _super(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
        });
        let Subject = (() => {
            class Subject2 extends Observable_Observable {
                constructor() {
                    super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, 
                    this.hasError = !1, this.thrownError = null;
                }
                lift(operator) {
                    const subject = new AnonymousSubject(this, this);
                    return subject.operator = operator, subject;
                }
                _throwIfClosed() {
                    if (this.closed) throw new ObjectUnsubscribedError;
                }
                next(value) {
                    errorContext(() => {
                        if (this._throwIfClosed(), !this.isStopped) {
                            this.currentObservers || (this.currentObservers = Array.from(this.observers));
                            for (const observer of this.currentObservers) observer.next(value);
                        }
                    });
                }
                error(err) {
                    errorContext(() => {
                        if (this._throwIfClosed(), !this.isStopped) {
                            this.hasError = this.isStopped = !0, this.thrownError = err;
                            const {observers} = this;
                            for (;observers.length; ) observers.shift().error(err);
                        }
                    });
                }
                complete() {
                    errorContext(() => {
                        if (this._throwIfClosed(), !this.isStopped) {
                            this.isStopped = !0;
                            const {observers} = this;
                            for (;observers.length; ) observers.shift().complete();
                        }
                    });
                }
                unsubscribe() {
                    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
                }
                get observed() {
                    var _a;
                    return (null === (_a = this.observers) || void 0 === _a ? void 0 : _a.length) > 0;
                }
                _trySubscribe(subscriber) {
                    return this._throwIfClosed(), super._trySubscribe(subscriber);
                }
                _subscribe(subscriber) {
                    return this._throwIfClosed(), this._checkFinalizedStatuses(subscriber), this._innerSubscribe(subscriber);
                }
                _innerSubscribe(subscriber) {
                    const {hasError, isStopped, observers} = this;
                    return hasError || isStopped ? EMPTY_SUBSCRIPTION : (this.currentObservers = null, 
                    observers.push(subscriber), new Subscription(() => {
                        this.currentObservers = null, arrRemove(observers, subscriber);
                    }));
                }
                _checkFinalizedStatuses(subscriber) {
                    const {hasError, thrownError, isStopped} = this;
                    hasError ? subscriber.error(thrownError) : isStopped && subscriber.complete();
                }
                asObservable() {
                    const observable2 = new Observable_Observable;
                    return observable2.source = this, observable2;
                }
            }
            return Subject2.create = (destination, source) => new AnonymousSubject(destination, source), 
            Subject2;
        })();
        class AnonymousSubject extends Subject {
            constructor(destination, source) {
                super(), this.destination = destination, this.source = source;
            }
            next(value) {
                var _a, _b;
                null === (_b = null === (_a = this.destination) || void 0 === _a ? void 0 : _a.next) || void 0 === _b || _b.call(_a, value);
            }
            error(err) {
                var _a, _b;
                null === (_b = null === (_a = this.destination) || void 0 === _a ? void 0 : _a.error) || void 0 === _b || _b.call(_a, err);
            }
            complete() {
                var _a, _b;
                null === (_b = null === (_a = this.destination) || void 0 === _a ? void 0 : _a.complete) || void 0 === _b || _b.call(_a);
            }
            _subscribe(subscriber) {
                var _a, _b;
                return null !== (_b = null === (_a = this.source) || void 0 === _a ? void 0 : _a.subscribe(subscriber)) && void 0 !== _b ? _b : EMPTY_SUBSCRIPTION;
            }
        }
        function operate(init) {
            return source => {
                if (function hasLift(source) {
                    return isFunction(source?.lift);
                }(source)) return source.lift(function(liftedSource) {
                    try {
                        return init(liftedSource, this);
                    } catch (err) {
                        this.error(err);
                    }
                });
                throw new TypeError("Unable to lift unknown Observable type");
            };
        }
        function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
            return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
        }
        class OperatorSubscriber extends Subscriber {
            constructor(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
                super(destination), this.onFinalize = onFinalize, this.shouldUnsubscribe = shouldUnsubscribe, 
                this._next = onNext ? function(value) {
                    try {
                        onNext(value);
                    } catch (err) {
                        destination.error(err);
                    }
                } : super._next, this._error = onError ? function(err) {
                    try {
                        onError(err);
                    } catch (err2) {
                        destination.error(err2);
                    } finally {
                        this.unsubscribe();
                    }
                } : super._error, this._complete = onComplete ? function() {
                    try {
                        onComplete();
                    } catch (err) {
                        destination.error(err);
                    } finally {
                        this.unsubscribe();
                    }
                } : super._complete;
            }
            unsubscribe() {
                var _a;
                if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                    const {closed} = this;
                    super.unsubscribe(), !closed && (null === (_a = this.onFinalize) || void 0 === _a || _a.call(this));
                }
            }
        }
        function map(project, thisArg) {
            return operate((source, subscriber) => {
                let index = 0;
                source.subscribe(createOperatorSubscriber(subscriber, value => {
                    subscriber.next(project.call(thisArg, value, index++));
                }));
            });
        }
        function __await(v) {
            return this instanceof __await ? (this.v = v, this) : new __await(v);
        }
        function __asyncGenerator(thisArg, _arguments, generator) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var i, g = generator.apply(thisArg, _arguments || []), q = [];
            return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
                return this;
            }, i;
            function verb(n) {
                g[n] && (i[n] = function(v) {
                    return new Promise(function(a, b) {
                        q.push([ n, v, a, b ]) > 1 || resume(n, v);
                    });
                });
            }
            function resume(n, v) {
                try {
                    !function step(r) {
                        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
                    }(g[n](v));
                } catch (e) {
                    settle(q[0][3], e);
                }
            }
            function fulfill(value) {
                resume("next", value);
            }
            function reject(value) {
                resume("throw", value);
            }
            function settle(f, v) {
                f(v), q.shift(), q.length && resume(q[0][0], q[0][1]);
            }
        }
        function __asyncValues(o) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var i, m = o[Symbol.asyncIterator];
            return m ? m.call(o) : (o = function __values(o) {
                var s = "function" == typeof Symbol && Symbol.iterator, m = s && o[s], i = 0;
                if (m) return m.call(o);
                if (o && "number" == typeof o.length) return {
                    next: function() {
                        return o && i >= o.length && (o = void 0), {
                            value: o && o[i++],
                            done: !o
                        };
                    }
                };
                throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
            }(o), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
                return this;
            }, i);
            function verb(n) {
                i[n] = o[n] && function(v) {
                    return new Promise(function(resolve, reject) {
                        !function settle(resolve, reject, d, v) {
                            Promise.resolve(v).then(function(v2) {
                                resolve({
                                    value: v2,
                                    done: d
                                });
                            }, reject);
                        }(resolve, reject, (v = o[n](v)).done, v.value);
                    });
                };
            }
        }
        const isArrayLike = x => x && "number" == typeof x.length && "function" != typeof x;
        function isPromise(value) {
            return isFunction(value?.then);
        }
        function isInteropObservable(input) {
            return isFunction(input[observable]);
        }
        function isAsyncIterable(obj) {
            return Symbol.asyncIterator && isFunction(obj?.[Symbol.asyncIterator]);
        }
        function createInvalidObservableTypeError(input) {
            return new TypeError(`You provided ${null !== input && "object" == typeof input ? "an invalid object" : `'${input}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`);
        }
        const iterator_iterator = function getSymbolIterator() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
        }();
        function isIterable(input) {
            return isFunction(input?.[iterator_iterator]);
        }
        function readableStreamLikeToAsyncGenerator(readableStream) {
            return __asyncGenerator(this, arguments, function*() {
                const reader = readableStream.getReader();
                try {
                    for (;;) {
                        const {value, done} = yield __await(reader.read());
                        if (done) return yield __await(void 0);
                        yield yield __await(value);
                    }
                } finally {
                    reader.releaseLock();
                }
            });
        }
        function isReadableStreamLike(obj) {
            return isFunction(obj?.getReader);
        }
        function innerFrom(input) {
            if (input instanceof Observable_Observable) return input;
            if (null != input) {
                if (isInteropObservable(input)) return function fromInteropObservable(obj) {
                    return new Observable_Observable(subscriber => {
                        const obs = obj[observable]();
                        if (isFunction(obs.subscribe)) return obs.subscribe(subscriber);
                        throw new TypeError("Provided object does not correctly implement Symbol.observable");
                    });
                }(input);
                if (isArrayLike(input)) return function fromArrayLike(array) {
                    return new Observable_Observable(subscriber => {
                        for (let i = 0; i < array.length && !subscriber.closed; i++) subscriber.next(array[i]);
                        subscriber.complete();
                    });
                }(input);
                if (isPromise(input)) return function fromPromise(promise2) {
                    return new Observable_Observable(subscriber => {
                        promise2.then(value => {
                            subscriber.closed || (subscriber.next(value), subscriber.complete());
                        }, err => subscriber.error(err)).then(null, reportUnhandledError);
                    });
                }(input);
                if (isAsyncIterable(input)) return fromAsyncIterable(input);
                if (isIterable(input)) return function fromIterable(iterable) {
                    return new Observable_Observable(subscriber => {
                        for (const value of iterable) if (subscriber.next(value), subscriber.closed) return;
                        subscriber.complete();
                    });
                }(input);
                if (isReadableStreamLike(input)) return function fromReadableStreamLike(readableStream) {
                    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
                }(input);
            }
            throw createInvalidObservableTypeError(input);
        }
        function fromAsyncIterable(asyncIterable) {
            return new Observable_Observable(subscriber => {
                (function process(asyncIterable, subscriber) {
                    var asyncIterable_1, asyncIterable_1_1, e_1, _a;
                    return function __awaiter(thisArg, _arguments, P, generator) {
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
                                    step(generator.throw(value));
                                } catch (e) {
                                    reject(e);
                                }
                            }
                            function step(result) {
                                result.done ? resolve(result.value) : function adopt(value) {
                                    return value instanceof P ? value : new P(function(resolve) {
                                        resolve(value);
                                    });
                                }(result.value).then(fulfilled, rejected);
                            }
                            step((generator = generator.apply(thisArg, _arguments || [])).next());
                        });
                    }(this, void 0, void 0, function*() {
                        try {
                            for (asyncIterable_1 = __asyncValues(asyncIterable); !(asyncIterable_1_1 = yield asyncIterable_1.next()).done; ) if (subscriber.next(asyncIterable_1_1.value), 
                            subscriber.closed) return;
                        } catch (e_1_1) {
                            e_1 = {
                                error: e_1_1
                            };
                        } finally {
                            try {
                                asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return) && (yield _a.call(asyncIterable_1));
                            } finally {
                                if (e_1) throw e_1.error;
                            }
                        }
                        subscriber.complete();
                    });
                })(asyncIterable, subscriber).catch(err => subscriber.error(err));
            });
        }
        function executeSchedule(parentSubscription, scheduler, work, delay = 0, repeat = !1) {
            const scheduleSubscription = scheduler.schedule(function() {
                work(), repeat ? parentSubscription.add(this.schedule(null, delay)) : this.unsubscribe();
            }, delay);
            if (parentSubscription.add(scheduleSubscription), !repeat) return scheduleSubscription;
        }
        function mergeMap(project, resultSelector, concurrent = 1 / 0) {
            return isFunction(resultSelector) ? mergeMap((a, i) => map((b, ii) => resultSelector(a, b, i, ii))(innerFrom(project(a, i))), concurrent) : ("number" == typeof resultSelector && (concurrent = resultSelector), 
            operate((source, subscriber) => function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
                const buffer = [];
                let active = 0, index = 0, isComplete = !1;
                const checkComplete = () => {
                    isComplete && !buffer.length && !active && subscriber.complete();
                }, outerNext = value => active < concurrent ? doInnerSub(value) : buffer.push(value), doInnerSub = value => {
                    expand && subscriber.next(value), active++;
                    let innerComplete = !1;
                    innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, innerValue => {
                        onBeforeNext?.(innerValue), expand ? outerNext(innerValue) : subscriber.next(innerValue);
                    }, () => {
                        innerComplete = !0;
                    }, void 0, () => {
                        if (innerComplete) try {
                            for (active--; buffer.length && active < concurrent; ) {
                                const bufferedValue = buffer.shift();
                                innerSubScheduler ? executeSchedule(subscriber, innerSubScheduler, () => doInnerSub(bufferedValue)) : doInnerSub(bufferedValue);
                            }
                            checkComplete();
                        } catch (err) {
                            subscriber.error(err);
                        }
                    }));
                };
                return source.subscribe(createOperatorSubscriber(subscriber, outerNext, () => {
                    isComplete = !0, checkComplete();
                })), () => {
                    additionalFinalizer?.();
                };
            }(source, subscriber, project, concurrent)));
        }
        const EMPTY = new Observable_Observable(subscriber => subscriber.complete());
        function last(arr) {
            return arr[arr.length - 1];
        }
        function popScheduler(args) {
            return function isScheduler(value) {
                return value && isFunction(value.schedule);
            }(last(args)) ? args.pop() : void 0;
        }
        function observeOn(scheduler, delay = 0) {
            return operate((source, subscriber) => {
                source.subscribe(createOperatorSubscriber(subscriber, value => executeSchedule(subscriber, scheduler, () => subscriber.next(value), delay), () => executeSchedule(subscriber, scheduler, () => subscriber.complete(), delay), err => executeSchedule(subscriber, scheduler, () => subscriber.error(err), delay)));
            });
        }
        function subscribeOn(scheduler, delay = 0) {
            return operate((source, subscriber) => {
                subscriber.add(scheduler.schedule(() => source.subscribe(subscriber), delay));
            });
        }
        function scheduleAsyncIterable(input, scheduler) {
            if (!input) throw new Error("Iterable cannot be null");
            return new Observable_Observable(subscriber => {
                executeSchedule(subscriber, scheduler, () => {
                    const iterator = input[Symbol.asyncIterator]();
                    executeSchedule(subscriber, scheduler, () => {
                        iterator.next().then(result => {
                            result.done ? subscriber.complete() : subscriber.next(result.value);
                        });
                    }, 0, !0);
                });
            });
        }
        function from(input, scheduler) {
            return scheduler ? function scheduled(input, scheduler) {
                if (null != input) {
                    if (isInteropObservable(input)) return function scheduleObservable(input, scheduler) {
                        return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
                    }(input, scheduler);
                    if (isArrayLike(input)) return function scheduleArray(input, scheduler) {
                        return new Observable_Observable(subscriber => {
                            let i = 0;
                            return scheduler.schedule(function() {
                                i === input.length ? subscriber.complete() : (subscriber.next(input[i++]), subscriber.closed || this.schedule());
                            });
                        });
                    }(input, scheduler);
                    if (isPromise(input)) return function schedulePromise(input, scheduler) {
                        return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
                    }(input, scheduler);
                    if (isAsyncIterable(input)) return scheduleAsyncIterable(input, scheduler);
                    if (isIterable(input)) return function scheduleIterable(input, scheduler) {
                        return new Observable_Observable(subscriber => {
                            let iterator;
                            return executeSchedule(subscriber, scheduler, () => {
                                iterator = input[iterator_iterator](), executeSchedule(subscriber, scheduler, () => {
                                    let value, done;
                                    try {
                                        ({value, done} = iterator.next());
                                    } catch (err) {
                                        return void subscriber.error(err);
                                    }
                                    done ? subscriber.complete() : subscriber.next(value);
                                }, 0, !0);
                            }), () => isFunction(iterator?.return) && iterator.return();
                        });
                    }(input, scheduler);
                    if (isReadableStreamLike(input)) return function scheduleReadableStreamLike(input, scheduler) {
                        return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
                    }(input, scheduler);
                }
                throw createInvalidObservableTypeError(input);
            }(input, scheduler) : innerFrom(input);
        }
        function handleReset(reset, on, ...args) {
            if (!0 === on) return void reset();
            if (!1 === on) return;
            const onSubscriber = new SafeSubscriber({
                next: () => {
                    onSubscriber.unsubscribe(), reset();
                }
            });
            return on(...args).subscribe(onSubscriber);
        }
        function getClosureSafeProperty(objWithPropertyToExtract) {
            for (let key in objWithPropertyToExtract) if (objWithPropertyToExtract[key] === getClosureSafeProperty) return key;
            throw Error("Could not find renamed property on target object.");
        }
        function fillProperties(target, source) {
            for (const key in source) source.hasOwnProperty(key) && !target.hasOwnProperty(key) && (target[key] = source[key]);
        }
        function stringify(token) {
            if ("string" == typeof token) return token;
            if (Array.isArray(token)) return "[" + token.map(stringify).join(", ") + "]";
            if (null == token) return "" + token;
            if (token.overriddenName) return `${token.overriddenName}`;
            if (token.name) return `${token.name}`;
            const res = token.toString();
            if (null == res) return "" + res;
            const newLineIndex = res.indexOf("\n");
            return -1 === newLineIndex ? res : res.substring(0, newLineIndex);
        }
        function concatStringsWithSpace(before, after) {
            return null == before || "" === before ? null === after ? "" : after : null == after || "" === after ? before : before + " " + after;
        }
        const __forward_ref__ = getClosureSafeProperty({
            __forward_ref__: getClosureSafeProperty
        });
        function forwardRef(forwardRefFn) {
            return forwardRefFn.__forward_ref__ = forwardRef, forwardRefFn.toString = function() {
                return stringify(this());
            }, forwardRefFn;
        }
        function resolveForwardRef(type) {
            return isForwardRef(type) ? type() : type;
        }
        function isForwardRef(fn) {
            return "function" == typeof fn && fn.hasOwnProperty(__forward_ref__) && fn.__forward_ref__ === forwardRef;
        }
        class RuntimeError extends Error {
            constructor(code, message) {
                super(function formatRuntimeError(code, message) {
                    return `NG0${Math.abs(code)}${message ? ": " + message.trim() : ""}`;
                }(code, message)), this.code = code;
            }
        }
        function renderStringify(value) {
            return "string" == typeof value ? value : null == value ? "" : String(value);
        }
        function throwProviderNotFoundError(token, injectorName) {
            throw new RuntimeError(-201, !1);
        }
        function assertDefined(actual, msg) {
            null == actual && function throwError(msg, actual, expected, comparison) {
                throw new Error(`ASSERTION ERROR: ${msg}` + (null == comparison ? "" : ` [Expected=> ${expected} ${comparison} ${actual} <=Actual]`));
            }(msg, actual, null, "!=");
        }
        function core_defineInjectable(opts) {
            return {
                token: opts.token,
                providedIn: opts.providedIn || null,
                factory: opts.factory,
                value: void 0
            };
        }
        function ɵɵdefineInjector(options) {
            return {
                providers: options.providers || [],
                imports: options.imports || []
            };
        }
        function getInjectableDef(type) {
            return getOwnDefinition(type, NG_PROV_DEF) || getOwnDefinition(type, NG_INJECTABLE_DEF);
        }
        function getOwnDefinition(type, field) {
            return type.hasOwnProperty(field) ? type[field] : null;
        }
        function getInjectorDef(type) {
            return type && (type.hasOwnProperty(NG_INJ_DEF) || type.hasOwnProperty(NG_INJECTOR_DEF)) ? type[NG_INJ_DEF] : null;
        }
        const NG_PROV_DEF = getClosureSafeProperty({
            ɵprov: getClosureSafeProperty
        }), NG_INJ_DEF = getClosureSafeProperty({
            ɵinj: getClosureSafeProperty
        }), NG_INJECTABLE_DEF = getClosureSafeProperty({
            ngInjectableDef: getClosureSafeProperty
        }), NG_INJECTOR_DEF = getClosureSafeProperty({
            ngInjectorDef: getClosureSafeProperty
        });
        var InjectFlags = (() => ((InjectFlags = InjectFlags || {})[InjectFlags.Default = 0] = "Default", 
        InjectFlags[InjectFlags.Host = 1] = "Host", InjectFlags[InjectFlags.Self = 2] = "Self", 
        InjectFlags[InjectFlags.SkipSelf = 4] = "SkipSelf", InjectFlags[InjectFlags.Optional = 8] = "Optional", 
        InjectFlags))();
        let _injectImplementation;
        function setInjectImplementation(impl) {
            const previous = _injectImplementation;
            return _injectImplementation = impl, previous;
        }
        function injectRootLimpMode(token, notFoundValue, flags) {
            const injectableDef = getInjectableDef(token);
            return injectableDef && "root" == injectableDef.providedIn ? void 0 === injectableDef.value ? injectableDef.value = injectableDef.factory() : injectableDef.value : flags & InjectFlags.Optional ? null : void 0 !== notFoundValue ? notFoundValue : void throwProviderNotFoundError(stringify(token));
        }
        function noSideEffects(fn) {
            return {
                toString: fn
            }.toString();
        }
        var ChangeDetectionStrategy = (() => ((ChangeDetectionStrategy = ChangeDetectionStrategy || {})[ChangeDetectionStrategy.OnPush = 0] = "OnPush", 
        ChangeDetectionStrategy[ChangeDetectionStrategy.Default = 1] = "Default", ChangeDetectionStrategy))(), ViewEncapsulation$1 = (() => {
            return (ViewEncapsulation2 = ViewEncapsulation$1 || (ViewEncapsulation$1 = {}))[ViewEncapsulation2.Emulated = 0] = "Emulated", 
            ViewEncapsulation2[ViewEncapsulation2.None = 2] = "None", ViewEncapsulation2[ViewEncapsulation2.ShadowDom = 3] = "ShadowDom", 
            ViewEncapsulation$1;
            var ViewEncapsulation2;
        })();
        const _global = (() => typeof globalThis < "u" && globalThis || typeof global < "u" && global || typeof window < "u" && window || typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self)(), EMPTY_OBJ = {}, EMPTY_ARRAY = [], NG_COMP_DEF = getClosureSafeProperty({
            ɵcmp: getClosureSafeProperty
        }), NG_DIR_DEF = getClosureSafeProperty({
            ɵdir: getClosureSafeProperty
        }), NG_PIPE_DEF = getClosureSafeProperty({
            ɵpipe: getClosureSafeProperty
        }), NG_MOD_DEF = getClosureSafeProperty({
            ɵmod: getClosureSafeProperty
        }), NG_FACTORY_DEF = getClosureSafeProperty({
            ɵfac: getClosureSafeProperty
        }), NG_ELEMENT_ID = getClosureSafeProperty({
            __NG_ELEMENT_ID__: getClosureSafeProperty
        });
        let componentDefCount = 0;
        function ɵɵdefineComponent(componentDefinition) {
            return noSideEffects(() => {
                const standalone = !0 === componentDefinition.standalone, declaredInputs = {}, def = {
                    type: componentDefinition.type,
                    providersResolver: null,
                    decls: componentDefinition.decls,
                    vars: componentDefinition.vars,
                    factory: null,
                    template: componentDefinition.template || null,
                    consts: componentDefinition.consts || null,
                    ngContentSelectors: componentDefinition.ngContentSelectors,
                    hostBindings: componentDefinition.hostBindings || null,
                    hostVars: componentDefinition.hostVars || 0,
                    hostAttrs: componentDefinition.hostAttrs || null,
                    contentQueries: componentDefinition.contentQueries || null,
                    declaredInputs,
                    inputs: null,
                    outputs: null,
                    exportAs: componentDefinition.exportAs || null,
                    onPush: componentDefinition.changeDetection === ChangeDetectionStrategy.OnPush,
                    directiveDefs: null,
                    pipeDefs: null,
                    standalone,
                    dependencies: standalone && componentDefinition.dependencies || null,
                    getStandaloneInjector: null,
                    selectors: componentDefinition.selectors || EMPTY_ARRAY,
                    viewQuery: componentDefinition.viewQuery || null,
                    features: componentDefinition.features || null,
                    data: componentDefinition.data || {},
                    encapsulation: componentDefinition.encapsulation || ViewEncapsulation$1.Emulated,
                    id: "c" + componentDefCount++,
                    styles: componentDefinition.styles || EMPTY_ARRAY,
                    _: null,
                    setInput: null,
                    schemas: componentDefinition.schemas || null,
                    tView: null
                }, dependencies = componentDefinition.dependencies, feature = componentDefinition.features;
                return def.inputs = invertObject(componentDefinition.inputs, declaredInputs), def.outputs = invertObject(componentDefinition.outputs), 
                feature && feature.forEach(fn => fn(def)), def.directiveDefs = dependencies ? () => ("function" == typeof dependencies ? dependencies() : dependencies).map(extractDirectiveDef).filter(nonNull) : null, 
                def.pipeDefs = dependencies ? () => ("function" == typeof dependencies ? dependencies() : dependencies).map(getPipeDef$1).filter(nonNull) : null, 
                def;
            });
        }
        function extractDirectiveDef(type) {
            return getComponentDef(type) || getDirectiveDef(type);
        }
        function nonNull(value) {
            return null !== value;
        }
        function ɵɵdefineNgModule(def) {
            return noSideEffects(() => ({
                type: def.type,
                bootstrap: def.bootstrap || EMPTY_ARRAY,
                declarations: def.declarations || EMPTY_ARRAY,
                imports: def.imports || EMPTY_ARRAY,
                exports: def.exports || EMPTY_ARRAY,
                transitiveCompileScopes: null,
                schemas: def.schemas || null,
                id: def.id || null
            }));
        }
        function invertObject(obj, secondary) {
            if (null == obj) return EMPTY_OBJ;
            const newLookup = {};
            for (const minifiedKey in obj) if (obj.hasOwnProperty(minifiedKey)) {
                let publicName = obj[minifiedKey], declaredName = publicName;
                Array.isArray(publicName) && (declaredName = publicName[1], publicName = publicName[0]), 
                newLookup[publicName] = minifiedKey, secondary && (secondary[publicName] = declaredName);
            }
            return newLookup;
        }
        const ɵɵdefineDirective = ɵɵdefineComponent;
        function getComponentDef(type) {
            return type[NG_COMP_DEF] || null;
        }
        function getDirectiveDef(type) {
            return type[NG_DIR_DEF] || null;
        }
        function getPipeDef$1(type) {
            return type[NG_PIPE_DEF] || null;
        }
        function isLView(value) {
            return Array.isArray(value) && "object" == typeof value[1];
        }
        function isLContainer(value) {
            return Array.isArray(value) && !0 === value[1];
        }
        function isContentQueryHost(tNode) {
            return 0 != (8 & tNode.flags);
        }
        function isComponentHost(tNode) {
            return 2 == (2 & tNode.flags);
        }
        function isDirectiveHost(tNode) {
            return 1 == (1 & tNode.flags);
        }
        function isComponentDef(def) {
            return null !== def.template;
        }
        function getFactoryDef(type, throwNotFound) {
            return type.hasOwnProperty(NG_FACTORY_DEF) ? type[NG_FACTORY_DEF] : null;
        }
        class SimpleChange {
            constructor(previousValue, currentValue, firstChange) {
                this.previousValue = previousValue, this.currentValue = currentValue, this.firstChange = firstChange;
            }
            isFirstChange() {
                return this.firstChange;
            }
        }
        function ɵɵNgOnChangesFeature() {
            return NgOnChangesFeatureImpl;
        }
        function NgOnChangesFeatureImpl(definition) {
            return definition.type.prototype.ngOnChanges && (definition.setInput = ngOnChangesSetInput), 
            rememberChangeHistoryAndInvokeOnChangesHook;
        }
        function rememberChangeHistoryAndInvokeOnChangesHook() {
            const simpleChangesStore = getSimpleChangesStore(this), current = simpleChangesStore?.current;
            if (current) {
                const previous = simpleChangesStore.previous;
                if (previous === EMPTY_OBJ) simpleChangesStore.previous = current; else for (let key in current) previous[key] = current[key];
                simpleChangesStore.current = null, this.ngOnChanges(current);
            }
        }
        function ngOnChangesSetInput(instance, value, publicName, privateName) {
            const simpleChangesStore = getSimpleChangesStore(instance) || function setSimpleChangesStore(instance, store2) {
                return instance.__ngSimpleChanges__ = store2;
            }(instance, {
                previous: EMPTY_OBJ,
                current: null
            }), current = simpleChangesStore.current || (simpleChangesStore.current = {}), previous = simpleChangesStore.previous, declaredName = this.declaredInputs[publicName], previousChange = previous[declaredName];
            current[declaredName] = new SimpleChange(previousChange && previousChange.currentValue, value, previous === EMPTY_OBJ), 
            instance[privateName] = value;
        }
        function getSimpleChangesStore(instance) {
            return instance.__ngSimpleChanges__ || null;
        }
        ɵɵNgOnChangesFeature.ngInherit = !0;
        function unwrapRNode(value) {
            for (;Array.isArray(value); ) value = value[0];
            return value;
        }
        function getNativeByIndex(index, lView) {
            return unwrapRNode(lView[index]);
        }
        function getNativeByTNode(tNode, lView) {
            return unwrapRNode(lView[tNode.index]);
        }
        function getTNode(tView, index) {
            return tView.data[index];
        }
        function getComponentLViewByIndex(nodeIndex, hostView) {
            const slotValue = hostView[nodeIndex];
            return isLView(slotValue) ? slotValue : slotValue[0];
        }
        function viewAttachedToChangeDetector(view) {
            return 64 == (64 & view[2]);
        }
        function getConstant(consts, index) {
            return null == index ? null : consts[index];
        }
        function resetPreOrderHookFlags(lView) {
            lView[18] = 0;
        }
        function updateTransplantedViewCount(lContainer, amount) {
            lContainer[5] += amount;
            let viewOrContainer = lContainer, parent = lContainer[3];
            for (;null !== parent && (1 === amount && 1 === viewOrContainer[5] || -1 === amount && 0 === viewOrContainer[5]); ) parent[5] += amount, 
            viewOrContainer = parent, parent = parent[3];
        }
        const instructionState = {
            lFrame: createLFrame(null),
            bindingsEnabled: !0
        };
        function getBindingsEnabled() {
            return instructionState.bindingsEnabled;
        }
        function getLView() {
            return instructionState.lFrame.lView;
        }
        function getTView() {
            return instructionState.lFrame.tView;
        }
        function ɵɵrestoreView(viewToRestore) {
            return instructionState.lFrame.contextLView = viewToRestore, viewToRestore[8];
        }
        function ɵɵresetView(value) {
            return instructionState.lFrame.contextLView = null, value;
        }
        function getCurrentTNode() {
            let currentTNode = getCurrentTNodePlaceholderOk();
            for (;null !== currentTNode && 64 === currentTNode.type; ) currentTNode = currentTNode.parent;
            return currentTNode;
        }
        function getCurrentTNodePlaceholderOk() {
            return instructionState.lFrame.currentTNode;
        }
        function setCurrentTNode(tNode, isParent) {
            const lFrame = instructionState.lFrame;
            lFrame.currentTNode = tNode, lFrame.isParent = isParent;
        }
        function isCurrentTNodeParent() {
            return instructionState.lFrame.isParent;
        }
        function nextBindingIndex() {
            return instructionState.lFrame.bindingIndex++;
        }
        function setBindingRootForHostBindings(bindingRootIndex, currentDirectiveIndex) {
            const lFrame = instructionState.lFrame;
            lFrame.bindingIndex = lFrame.bindingRootIndex = bindingRootIndex, setCurrentDirectiveIndex(currentDirectiveIndex);
        }
        function setCurrentDirectiveIndex(currentDirectiveIndex) {
            instructionState.lFrame.currentDirectiveIndex = currentDirectiveIndex;
        }
        function setCurrentQueryIndex(value) {
            instructionState.lFrame.currentQueryIndex = value;
        }
        function getDeclarationTNode(lView) {
            const tView = lView[1];
            return 2 === tView.type ? tView.declTNode : 1 === tView.type ? lView[6] : null;
        }
        function enterDI(lView, tNode, flags) {
            if (flags & InjectFlags.SkipSelf) {
                let parentTNode = tNode, parentLView = lView;
                for (;!(parentTNode = parentTNode.parent, null !== parentTNode || flags & InjectFlags.Host || (parentTNode = getDeclarationTNode(parentLView), 
                null === parentTNode || (parentLView = parentLView[15], 10 & parentTNode.type))); ) ;
                if (null === parentTNode) return !1;
                tNode = parentTNode, lView = parentLView;
            }
            const lFrame = instructionState.lFrame = allocLFrame();
            return lFrame.currentTNode = tNode, lFrame.lView = lView, !0;
        }
        function enterView(newView) {
            const newLFrame = allocLFrame(), tView = newView[1];
            instructionState.lFrame = newLFrame, newLFrame.currentTNode = tView.firstChild, 
            newLFrame.lView = newView, newLFrame.tView = tView, newLFrame.contextLView = newView, 
            newLFrame.bindingIndex = tView.bindingStartIndex, newLFrame.inI18n = !1;
        }
        function allocLFrame() {
            const currentLFrame = instructionState.lFrame, childLFrame = null === currentLFrame ? null : currentLFrame.child;
            return null === childLFrame ? createLFrame(currentLFrame) : childLFrame;
        }
        function createLFrame(parent) {
            const lFrame = {
                currentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: -1,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent,
                child: null,
                inI18n: !1
            };
            return null !== parent && (parent.child = lFrame), lFrame;
        }
        function leaveViewLight() {
            const oldLFrame = instructionState.lFrame;
            return instructionState.lFrame = oldLFrame.parent, oldLFrame.currentTNode = null, 
            oldLFrame.lView = null, oldLFrame;
        }
        const leaveDI = leaveViewLight;
        function leaveView() {
            const oldLFrame = leaveViewLight();
            oldLFrame.isParent = !0, oldLFrame.tView = null, oldLFrame.selectedIndex = -1, oldLFrame.contextLView = null, 
            oldLFrame.elementDepthCount = 0, oldLFrame.currentDirectiveIndex = -1, oldLFrame.currentNamespace = null, 
            oldLFrame.bindingRootIndex = -1, oldLFrame.bindingIndex = -1, oldLFrame.currentQueryIndex = 0;
        }
        function getSelectedIndex() {
            return instructionState.lFrame.selectedIndex;
        }
        function setSelectedIndex(index) {
            instructionState.lFrame.selectedIndex = index;
        }
        function registerPostOrderHooks(tView, tNode) {
            for (let i = tNode.directiveStart, end = tNode.directiveEnd; i < end; i++) {
                const lifecycleHooks = tView.data[i].type.prototype, {ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit, ngAfterViewChecked, ngOnDestroy} = lifecycleHooks;
                ngAfterContentInit && (tView.contentHooks || (tView.contentHooks = [])).push(-i, ngAfterContentInit), 
                ngAfterContentChecked && ((tView.contentHooks || (tView.contentHooks = [])).push(i, ngAfterContentChecked), 
                (tView.contentCheckHooks || (tView.contentCheckHooks = [])).push(i, ngAfterContentChecked)), 
                ngAfterViewInit && (tView.viewHooks || (tView.viewHooks = [])).push(-i, ngAfterViewInit), 
                ngAfterViewChecked && ((tView.viewHooks || (tView.viewHooks = [])).push(i, ngAfterViewChecked), 
                (tView.viewCheckHooks || (tView.viewCheckHooks = [])).push(i, ngAfterViewChecked)), 
                null != ngOnDestroy && (tView.destroyHooks || (tView.destroyHooks = [])).push(i, ngOnDestroy);
            }
        }
        function executeCheckHooks(lView, hooks, nodeIndex) {
            callHooks(lView, hooks, 3, nodeIndex);
        }
        function executeInitAndCheckHooks(lView, hooks, initPhase, nodeIndex) {
            (3 & lView[2]) === initPhase && callHooks(lView, hooks, initPhase, nodeIndex);
        }
        function incrementInitPhaseFlags(lView, initPhase) {
            let flags = lView[2];
            (3 & flags) === initPhase && (flags &= 2047, flags += 1, lView[2] = flags);
        }
        function callHooks(currentView, arr, initPhase, currentNodeIndex) {
            const nodeIndexLimit = currentNodeIndex ?? -1, max = arr.length - 1;
            let lastNodeIndexFound = 0;
            for (let i = void 0 !== currentNodeIndex ? 65535 & currentView[18] : 0; i < max; i++) if ("number" == typeof arr[i + 1]) {
                if (lastNodeIndexFound = arr[i], null != currentNodeIndex && lastNodeIndexFound >= currentNodeIndex) break;
            } else arr[i] < 0 && (currentView[18] += 65536), (lastNodeIndexFound < nodeIndexLimit || -1 == nodeIndexLimit) && (callHook(currentView, initPhase, arr, i), 
            currentView[18] = (4294901760 & currentView[18]) + i + 2), i++;
        }
        function callHook(currentView, initPhase, arr, i) {
            const isInitHook = arr[i] < 0, hook = arr[i + 1], directive = currentView[isInitHook ? -arr[i] : arr[i]];
            if (isInitHook) {
                if (currentView[2] >> 11 < currentView[18] >> 16 && (3 & currentView[2]) === initPhase) {
                    currentView[2] += 2048;
                    try {
                        hook.call(directive);
                    } finally {}
                }
            } else try {
                hook.call(directive);
            } finally {}
        }
        class NodeInjectorFactory {
            constructor(factory, isViewProvider, injectImplementation) {
                this.factory = factory, this.resolving = !1, this.canSeeViewProviders = isViewProvider, 
                this.injectImpl = injectImplementation;
            }
        }
        function setUpAttributes(renderer, native, attrs) {
            let i = 0;
            for (;i < attrs.length; ) {
                const value = attrs[i];
                if ("number" == typeof value) {
                    if (0 !== value) break;
                    i++;
                    const namespaceURI = attrs[i++], attrName = attrs[i++], attrVal = attrs[i++];
                    renderer.setAttribute(native, attrName, attrVal, namespaceURI);
                } else {
                    const attrName = value, attrVal = attrs[++i];
                    64 === attrName.charCodeAt(0) ? renderer.setProperty(native, attrName, attrVal) : renderer.setAttribute(native, attrName, attrVal), 
                    i++;
                }
            }
            return i;
        }
        function mergeHostAttrs(dst, src) {
            if (null !== src && 0 !== src.length) if (null === dst || 0 === dst.length) dst = src.slice(); else {
                let srcMarker = -1;
                for (let i = 0; i < src.length; i++) {
                    const item = src[i];
                    "number" == typeof item ? srcMarker = item : 0 === srcMarker || mergeHostAttribute(dst, srcMarker, item, null, -1 === srcMarker || 2 === srcMarker ? src[++i] : null);
                }
            }
            return dst;
        }
        function mergeHostAttribute(dst, marker, key1, key2, value) {
            let i = 0, markerInsertPosition = dst.length;
            if (-1 === marker) markerInsertPosition = -1; else for (;i < dst.length; ) {
                const dstValue = dst[i++];
                if ("number" == typeof dstValue) {
                    if (dstValue === marker) {
                        markerInsertPosition = -1;
                        break;
                    }
                    if (dstValue > marker) {
                        markerInsertPosition = i - 1;
                        break;
                    }
                }
            }
            for (;i < dst.length; ) {
                const item = dst[i];
                if ("number" == typeof item) break;
                if (item === key1) {
                    if (null === key2) return void (null !== value && (dst[i + 1] = value));
                    if (key2 === dst[i + 1]) return void (dst[i + 2] = value);
                }
                i++, null !== key2 && i++, null !== value && i++;
            }
            -1 !== markerInsertPosition && (dst.splice(markerInsertPosition, 0, marker), i = markerInsertPosition + 1), 
            dst.splice(i++, 0, key1), null !== key2 && dst.splice(i++, 0, key2), null !== value && dst.splice(i++, 0, value);
        }
        function hasParentInjector(parentLocation) {
            return -1 !== parentLocation;
        }
        function getParentInjectorIndex(parentLocation) {
            return 32767 & parentLocation;
        }
        function getParentInjectorView(location2, startView) {
            let viewOffset = function getParentInjectorViewOffset(parentLocation) {
                return parentLocation >> 16;
            }(location2), parentView = startView;
            for (;viewOffset > 0; ) parentView = parentView[15], viewOffset--;
            return parentView;
        }
        let includeViewProviders = !0;
        function setIncludeViewProviders(v) {
            const oldValue = includeViewProviders;
            return includeViewProviders = v, oldValue;
        }
        let nextNgElementId = 0;
        const NOT_FOUND = {};
        function getOrCreateNodeInjectorForNode(tNode, lView) {
            const existingInjectorIndex = getInjectorIndex(tNode, lView);
            if (-1 !== existingInjectorIndex) return existingInjectorIndex;
            const tView = lView[1];
            tView.firstCreatePass && (tNode.injectorIndex = lView.length, insertBloom(tView.data, tNode), 
            insertBloom(lView, null), insertBloom(tView.blueprint, null));
            const parentLoc = getParentInjectorLocation(tNode, lView), injectorIndex = tNode.injectorIndex;
            if (hasParentInjector(parentLoc)) {
                const parentIndex = getParentInjectorIndex(parentLoc), parentLView = getParentInjectorView(parentLoc, lView), parentData = parentLView[1].data;
                for (let i = 0; i < 8; i++) lView[injectorIndex + i] = parentLView[parentIndex + i] | parentData[parentIndex + i];
            }
            return lView[injectorIndex + 8] = parentLoc, injectorIndex;
        }
        function insertBloom(arr, footer) {
            arr.push(0, 0, 0, 0, 0, 0, 0, 0, footer);
        }
        function getInjectorIndex(tNode, lView) {
            return -1 === tNode.injectorIndex || tNode.parent && tNode.parent.injectorIndex === tNode.injectorIndex || null === lView[tNode.injectorIndex + 8] ? -1 : tNode.injectorIndex;
        }
        function getParentInjectorLocation(tNode, lView) {
            if (tNode.parent && -1 !== tNode.parent.injectorIndex) return tNode.parent.injectorIndex;
            let declarationViewOffset = 0, parentTNode = null, lViewCursor = lView;
            for (;null !== lViewCursor; ) {
                if (parentTNode = getTNodeFromLView(lViewCursor), null === parentTNode) return -1;
                if (declarationViewOffset++, lViewCursor = lViewCursor[15], -1 !== parentTNode.injectorIndex) return parentTNode.injectorIndex | declarationViewOffset << 16;
            }
            return -1;
        }
        function diPublicInInjector(injectorIndex, tView, token) {
            !function bloomAdd(injectorIndex, tView, type) {
                let id;
                "string" == typeof type ? id = type.charCodeAt(0) || 0 : type.hasOwnProperty(NG_ELEMENT_ID) && (id = type[NG_ELEMENT_ID]), 
                null == id && (id = type[NG_ELEMENT_ID] = nextNgElementId++);
                const bloomHash = 255 & id;
                tView.data[injectorIndex + (bloomHash >> 5)] |= 1 << bloomHash;
            }(injectorIndex, tView, token);
        }
        function notFoundValueOrThrow(notFoundValue, token, flags) {
            if (flags & InjectFlags.Optional || void 0 !== notFoundValue) return notFoundValue;
            throwProviderNotFoundError();
        }
        function lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue) {
            if (flags & InjectFlags.Optional && void 0 === notFoundValue && (notFoundValue = null), 
            0 == (flags & (InjectFlags.Self | InjectFlags.Host))) {
                const moduleInjector = lView[9], previousInjectImplementation = setInjectImplementation(void 0);
                try {
                    return moduleInjector ? moduleInjector.get(token, notFoundValue, flags & InjectFlags.Optional) : injectRootLimpMode(token, notFoundValue, flags & InjectFlags.Optional);
                } finally {
                    setInjectImplementation(previousInjectImplementation);
                }
            }
            return notFoundValueOrThrow(notFoundValue, 0, flags);
        }
        function getOrCreateInjectable(tNode, lView, token, flags = InjectFlags.Default, notFoundValue) {
            if (null !== tNode) {
                if (1024 & lView[2]) {
                    const embeddedInjectorValue = function lookupTokenUsingEmbeddedInjector(tNode, lView, token, flags, notFoundValue) {
                        let currentTNode = tNode, currentLView = lView;
                        for (;null !== currentTNode && null !== currentLView && 1024 & currentLView[2] && !(256 & currentLView[2]); ) {
                            const nodeInjectorValue = lookupTokenUsingNodeInjector(currentTNode, currentLView, token, flags | InjectFlags.Self, NOT_FOUND);
                            if (nodeInjectorValue !== NOT_FOUND) return nodeInjectorValue;
                            let parentTNode = currentTNode.parent;
                            if (!parentTNode) {
                                const embeddedViewInjector = currentLView[21];
                                if (embeddedViewInjector) {
                                    const embeddedViewInjectorValue = embeddedViewInjector.get(token, NOT_FOUND, flags);
                                    if (embeddedViewInjectorValue !== NOT_FOUND) return embeddedViewInjectorValue;
                                }
                                parentTNode = getTNodeFromLView(currentLView), currentLView = currentLView[15];
                            }
                            currentTNode = parentTNode;
                        }
                        return notFoundValue;
                    }(tNode, lView, token, flags, NOT_FOUND);
                    if (embeddedInjectorValue !== NOT_FOUND) return embeddedInjectorValue;
                }
                const value = lookupTokenUsingNodeInjector(tNode, lView, token, flags, NOT_FOUND);
                if (value !== NOT_FOUND) return value;
            }
            return lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue);
        }
        function lookupTokenUsingNodeInjector(tNode, lView, token, flags, notFoundValue) {
            const bloomHash = function bloomHashBitOrFactory(token) {
                if ("string" == typeof token) return token.charCodeAt(0) || 0;
                const tokenId = token.hasOwnProperty(NG_ELEMENT_ID) ? token[NG_ELEMENT_ID] : void 0;
                return "number" == typeof tokenId ? tokenId >= 0 ? 255 & tokenId : createNodeInjector : tokenId;
            }(token);
            if ("function" == typeof bloomHash) {
                if (!enterDI(lView, tNode, flags)) return flags & InjectFlags.Host ? notFoundValueOrThrow(notFoundValue, 0, flags) : lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue);
                try {
                    const value = bloomHash(flags);
                    if (null != value || flags & InjectFlags.Optional) return value;
                    throwProviderNotFoundError();
                } finally {
                    leaveDI();
                }
            } else if ("number" == typeof bloomHash) {
                let previousTView = null, injectorIndex = getInjectorIndex(tNode, lView), parentLocation = -1, hostTElementNode = flags & InjectFlags.Host ? lView[16][6] : null;
                for ((-1 === injectorIndex || flags & InjectFlags.SkipSelf) && (parentLocation = -1 === injectorIndex ? getParentInjectorLocation(tNode, lView) : lView[injectorIndex + 8], 
                -1 !== parentLocation && shouldSearchParent(flags, !1) ? (previousTView = lView[1], 
                injectorIndex = getParentInjectorIndex(parentLocation), lView = getParentInjectorView(parentLocation, lView)) : injectorIndex = -1); -1 !== injectorIndex; ) {
                    const tView = lView[1];
                    if (bloomHasToken(bloomHash, injectorIndex, tView.data)) {
                        const instance = searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode);
                        if (instance !== NOT_FOUND) return instance;
                    }
                    parentLocation = lView[injectorIndex + 8], -1 !== parentLocation && shouldSearchParent(flags, lView[1].data[injectorIndex + 8] === hostTElementNode) && bloomHasToken(bloomHash, injectorIndex, lView) ? (previousTView = tView, 
                    injectorIndex = getParentInjectorIndex(parentLocation), lView = getParentInjectorView(parentLocation, lView)) : injectorIndex = -1;
                }
            }
            return notFoundValue;
        }
        function searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode) {
            const currentTView = lView[1], tNode = currentTView.data[injectorIndex + 8], injectableIdx = function locateDirectiveOrProvider(tNode, tView, token, canAccessViewProviders, isHostSpecialCase) {
                const nodeProviderIndexes = tNode.providerIndexes, tInjectables = tView.data, injectablesStart = 1048575 & nodeProviderIndexes, directivesStart = tNode.directiveStart, cptViewProvidersCount = nodeProviderIndexes >> 20, endIndex = isHostSpecialCase ? injectablesStart + cptViewProvidersCount : tNode.directiveEnd;
                for (let i = canAccessViewProviders ? injectablesStart : injectablesStart + cptViewProvidersCount; i < endIndex; i++) {
                    const providerTokenOrDef = tInjectables[i];
                    if (i < directivesStart && token === providerTokenOrDef || i >= directivesStart && providerTokenOrDef.type === token) return i;
                }
                if (isHostSpecialCase) {
                    const dirDef = tInjectables[directivesStart];
                    if (dirDef && isComponentDef(dirDef) && dirDef.type === token) return directivesStart;
                }
                return null;
            }(tNode, currentTView, token, null == previousTView ? isComponentHost(tNode) && includeViewProviders : previousTView != currentTView && 0 != (3 & tNode.type), flags & InjectFlags.Host && hostTElementNode === tNode);
            return null !== injectableIdx ? getNodeInjectable(lView, currentTView, injectableIdx, tNode) : NOT_FOUND;
        }
        function getNodeInjectable(lView, tView, index, tNode) {
            let value = lView[index];
            const tData = tView.data;
            if (function isFactory(obj) {
                return obj instanceof NodeInjectorFactory;
            }(value)) {
                const factory = value;
                factory.resolving && function throwCyclicDependencyError(token, path) {
                    const depPath = path ? `. Dependency path: ${path.join(" > ")} > ${token}` : "";
                    throw new RuntimeError(-200, `Circular dependency in DI detected for ${token}${depPath}`);
                }(function stringifyForError(value) {
                    return "function" == typeof value ? value.name || value.toString() : "object" == typeof value && null != value && "function" == typeof value.type ? value.type.name || value.type.toString() : renderStringify(value);
                }(tData[index]));
                const previousIncludeViewProviders = setIncludeViewProviders(factory.canSeeViewProviders);
                factory.resolving = !0;
                const previousInjectImplementation = factory.injectImpl ? setInjectImplementation(factory.injectImpl) : null;
                enterDI(lView, tNode, InjectFlags.Default);
                try {
                    value = lView[index] = factory.factory(void 0, tData, lView, tNode), tView.firstCreatePass && index >= tNode.directiveStart && function registerPreOrderHooks(directiveIndex, directiveDef, tView) {
                        const {ngOnChanges, ngOnInit, ngDoCheck} = directiveDef.type.prototype;
                        if (ngOnChanges) {
                            const wrappedOnChanges = NgOnChangesFeatureImpl(directiveDef);
                            (tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, wrappedOnChanges), 
                            (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(directiveIndex, wrappedOnChanges);
                        }
                        ngOnInit && (tView.preOrderHooks || (tView.preOrderHooks = [])).push(0 - directiveIndex, ngOnInit), 
                        ngDoCheck && ((tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, ngDoCheck), 
                        (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(directiveIndex, ngDoCheck));
                    }(index, tData[index], tView);
                } finally {
                    null !== previousInjectImplementation && setInjectImplementation(previousInjectImplementation), 
                    setIncludeViewProviders(previousIncludeViewProviders), factory.resolving = !1, leaveDI();
                }
            }
            return value;
        }
        function bloomHasToken(bloomHash, injectorIndex, injectorView) {
            return !!(injectorView[injectorIndex + (bloomHash >> 5)] & 1 << bloomHash);
        }
        function shouldSearchParent(flags, isFirstHostTNode) {
            return !(flags & InjectFlags.Self || flags & InjectFlags.Host && isFirstHostTNode);
        }
        class NodeInjector {
            constructor(_tNode, _lView) {
                this._tNode = _tNode, this._lView = _lView;
            }
            get(token, notFoundValue, flags) {
                return getOrCreateInjectable(this._tNode, this._lView, token, flags, notFoundValue);
            }
        }
        function createNodeInjector() {
            return new NodeInjector(getCurrentTNode(), getLView());
        }
        function getFactoryOf(type) {
            return isForwardRef(type) ? () => {
                const factory = getFactoryOf(resolveForwardRef(type));
                return factory && factory();
            } : getFactoryDef(type);
        }
        function getTNodeFromLView(lView) {
            const tView = lView[1], tViewType = tView.type;
            return 2 === tViewType ? tView.declTNode : 1 === tViewType ? lView[6] : null;
        }
        function makeParamDecorator(name, props, parentClass) {
            return noSideEffects(() => {
                const metaCtor = function makeMetadataCtor(props) {
                    return function(...args) {
                        if (props) {
                            const values = props(...args);
                            for (const propName in values) this[propName] = values[propName];
                        }
                    };
                }(props);
                function ParamDecoratorFactory(...args) {
                    if (this instanceof ParamDecoratorFactory) return metaCtor.apply(this, args), this;
                    const annotationInstance = new ParamDecoratorFactory(...args);
                    return ParamDecorator.annotation = annotationInstance, ParamDecorator;
                    function ParamDecorator(cls, unusedKey, index) {
                        const parameters = cls.hasOwnProperty("__parameters__") ? cls.__parameters__ : Object.defineProperty(cls, "__parameters__", {
                            value: []
                        }).__parameters__;
                        for (;parameters.length <= index; ) parameters.push(null);
                        return (parameters[index] = parameters[index] || []).push(annotationInstance), cls;
                    }
                }
                return parentClass && (ParamDecoratorFactory.prototype = Object.create(parentClass.prototype)), 
                ParamDecoratorFactory.prototype.ngMetadataName = name, ParamDecoratorFactory.annotationCls = ParamDecoratorFactory, 
                ParamDecoratorFactory;
            });
        }
        class InjectionToken {
            constructor(_desc, options) {
                this._desc = _desc, this.ngMetadataName = "InjectionToken", this.ɵprov = void 0, 
                "number" == typeof options ? this.__NG_ELEMENT_ID__ = options : void 0 !== options && (this.ɵprov = core_defineInjectable({
                    token: this,
                    providedIn: options.providedIn || "root",
                    factory: options.factory
                }));
            }
            get multi() {
                return this;
            }
            toString() {
                return `InjectionToken ${this._desc}`;
            }
        }
        function deepForEach(input, fn) {
            input.forEach(value => Array.isArray(value) ? deepForEach(value, fn) : fn(value));
        }
        function addToArray(arr, index, value) {
            index >= arr.length ? arr.push(value) : arr.splice(index, 0, value);
        }
        function removeFromArray(arr, index) {
            return index >= arr.length - 1 ? arr.pop() : arr.splice(index, 1)[0];
        }
        function keyValueArraySet(keyValueArray, key, value) {
            let index = keyValueArrayIndexOf(keyValueArray, key);
            return index >= 0 ? keyValueArray[1 | index] = value : (index = ~index, function arrayInsert2(array, index, value1, value2) {
                let end = array.length;
                if (end == index) array.push(value1, value2); else if (1 === end) array.push(value2, array[0]), 
                array[0] = value1; else {
                    for (end--, array.push(array[end - 1], array[end]); end > index; ) array[end] = array[end - 2], 
                    end--;
                    array[index] = value1, array[index + 1] = value2;
                }
            }(keyValueArray, index, key, value)), index;
        }
        function keyValueArrayGet(keyValueArray, key) {
            const index = keyValueArrayIndexOf(keyValueArray, key);
            if (index >= 0) return keyValueArray[1 | index];
        }
        function keyValueArrayIndexOf(keyValueArray, key) {
            return function _arrayIndexOfSorted(array, value, shift) {
                let start = 0, end = array.length >> shift;
                for (;end !== start; ) {
                    const middle = start + (end - start >> 1), current = array[middle << shift];
                    if (value === current) return middle << shift;
                    current > value ? end = middle : start = middle + 1;
                }
                return ~(end << shift);
            }(keyValueArray, key, 1);
        }
        const THROW_IF_NOT_FOUND = {}, NEW_LINE = /\n/gm;
        let _currentInjector;
        function setCurrentInjector(injector) {
            const former = _currentInjector;
            return _currentInjector = injector, former;
        }
        function injectInjectorOnly(token, flags = InjectFlags.Default) {
            if (void 0 === _currentInjector) throw new RuntimeError(-203, !1);
            return null === _currentInjector ? injectRootLimpMode(token, void 0, flags) : _currentInjector.get(token, flags & InjectFlags.Optional ? null : void 0, flags);
        }
        function core_inject(token, flags = InjectFlags.Default) {
            return (function getInjectImplementation() {
                return _injectImplementation;
            }() || injectInjectorOnly)(resolveForwardRef(token), flags);
        }
        function injectArgs(types) {
            const args = [];
            for (let i = 0; i < types.length; i++) {
                const arg = resolveForwardRef(types[i]);
                if (Array.isArray(arg)) {
                    if (0 === arg.length) throw new RuntimeError(900, !1);
                    let type, flags = InjectFlags.Default;
                    for (let j = 0; j < arg.length; j++) {
                        const meta = arg[j], flag = meta.__NG_DI_FLAG__;
                        "number" == typeof flag ? -1 === flag ? type = meta.token : flags |= flag : type = meta;
                    }
                    args.push(core_inject(type, flags));
                } else args.push(core_inject(arg));
            }
            return args;
        }
        function attachInjectFlag(decorator, flag) {
            return decorator.__NG_DI_FLAG__ = flag, decorator.prototype.__NG_DI_FLAG__ = flag, 
            decorator;
        }
        const core_Optional = attachInjectFlag(makeParamDecorator("Optional"), 8), SkipSelf = attachInjectFlag(makeParamDecorator("SkipSelf"), 4);
        var RendererStyleFlags2 = (() => ((RendererStyleFlags2 = RendererStyleFlags2 || {})[RendererStyleFlags2.Important = 1] = "Important", 
        RendererStyleFlags2[RendererStyleFlags2.DashCase = 2] = "DashCase", RendererStyleFlags2))();
        const TRACKED_LVIEWS = new Map;
        let uniqueIdCounter = 0;
        function attachPatchData(target, data) {
            isLView(data) ? (target.__ngContext__ = data[20], function registerLView(lView) {
                TRACKED_LVIEWS.set(lView[20], lView);
            }(data)) : target.__ngContext__ = data;
        }
        function icuContainerIterate(tIcuContainerNode, lView) {
            return undefined(tIcuContainerNode, lView);
        }
        function getLViewParent(lView) {
            const parent = lView[3];
            return isLContainer(parent) ? parent[3] : parent;
        }
        function getFirstLContainer(lView) {
            return getNearestLContainer(lView[13]);
        }
        function getNextLContainer(container) {
            return getNearestLContainer(container[4]);
        }
        function getNearestLContainer(viewOrContainer) {
            for (;null !== viewOrContainer && !isLContainer(viewOrContainer); ) viewOrContainer = viewOrContainer[4];
            return viewOrContainer;
        }
        function applyToElementOrContainer(action, renderer, parent, lNodeToHandle, beforeNode) {
            if (null != lNodeToHandle) {
                let lContainer, isComponent = !1;
                isLContainer(lNodeToHandle) ? lContainer = lNodeToHandle : isLView(lNodeToHandle) && (isComponent = !0, 
                lNodeToHandle = lNodeToHandle[0]);
                const rNode = unwrapRNode(lNodeToHandle);
                0 === action && null !== parent ? null == beforeNode ? nativeAppendChild(renderer, parent, rNode) : nativeInsertBefore(renderer, parent, rNode, beforeNode || null, !0) : 1 === action && null !== parent ? nativeInsertBefore(renderer, parent, rNode, beforeNode || null, !0) : 2 === action ? function nativeRemoveNode(renderer, rNode, isHostElement) {
                    const nativeParent = nativeParentNode(renderer, rNode);
                    nativeParent && function nativeRemoveChild(renderer, parent, child, isHostElement) {
                        renderer.removeChild(parent, child, isHostElement);
                    }(renderer, nativeParent, rNode, isHostElement);
                }(renderer, rNode, isComponent) : 3 === action && renderer.destroyNode(rNode), null != lContainer && function applyContainer(renderer, action, lContainer, parentRElement, beforeNode) {
                    const anchor = lContainer[7];
                    anchor !== unwrapRNode(lContainer) && applyToElementOrContainer(action, renderer, parentRElement, anchor, beforeNode);
                    for (let i = 10; i < lContainer.length; i++) {
                        const lView = lContainer[i];
                        applyView(lView[1], lView, renderer, action, parentRElement, anchor);
                    }
                }(renderer, action, lContainer, parent, beforeNode);
            }
        }
        function createElementNode(renderer, name, namespace) {
            return renderer.createElement(name, namespace);
        }
        function detachMovedView(declarationContainer, lView) {
            const movedViews = declarationContainer[9], declarationViewIndex = movedViews.indexOf(lView), insertionLContainer = lView[3];
            512 & lView[2] && (lView[2] &= -513, updateTransplantedViewCount(insertionLContainer, -1)), 
            movedViews.splice(declarationViewIndex, 1);
        }
        function detachView(lContainer, removeIndex) {
            if (lContainer.length <= 10) return;
            const indexInContainer = 10 + removeIndex, viewToDetach = lContainer[indexInContainer];
            if (viewToDetach) {
                const declarationLContainer = viewToDetach[17];
                null !== declarationLContainer && declarationLContainer !== lContainer && detachMovedView(declarationLContainer, viewToDetach), 
                removeIndex > 0 && (lContainer[indexInContainer - 1][4] = viewToDetach[4]);
                const removedLView = removeFromArray(lContainer, 10 + removeIndex);
                !function removeViewFromContainer(tView, lView) {
                    applyView(tView, lView, lView[11], 2, null, null), lView[0] = null, lView[6] = null;
                }(viewToDetach[1], viewToDetach);
                const lQueries = removedLView[19];
                null !== lQueries && lQueries.detachView(removedLView[1]), viewToDetach[3] = null, 
                viewToDetach[4] = null, viewToDetach[2] &= -65;
            }
            return viewToDetach;
        }
        function destroyLView(tView, lView) {
            if (!(128 & lView[2])) {
                const renderer = lView[11];
                renderer.destroyNode && applyView(tView, lView, renderer, 3, null, null), function destroyViewTree(rootView) {
                    let lViewOrLContainer = rootView[13];
                    if (!lViewOrLContainer) return cleanUpView(rootView[1], rootView);
                    for (;lViewOrLContainer; ) {
                        let next = null;
                        if (isLView(lViewOrLContainer)) next = lViewOrLContainer[13]; else {
                            const firstView = lViewOrLContainer[10];
                            firstView && (next = firstView);
                        }
                        if (!next) {
                            for (;lViewOrLContainer && !lViewOrLContainer[4] && lViewOrLContainer !== rootView; ) isLView(lViewOrLContainer) && cleanUpView(lViewOrLContainer[1], lViewOrLContainer), 
                            lViewOrLContainer = lViewOrLContainer[3];
                            null === lViewOrLContainer && (lViewOrLContainer = rootView), isLView(lViewOrLContainer) && cleanUpView(lViewOrLContainer[1], lViewOrLContainer), 
                            next = lViewOrLContainer && lViewOrLContainer[4];
                        }
                        lViewOrLContainer = next;
                    }
                }(lView);
            }
        }
        function cleanUpView(tView, lView) {
            if (!(128 & lView[2])) {
                lView[2] &= -65, lView[2] |= 128, function executeOnDestroys(tView, lView) {
                    let destroyHooks;
                    if (null != tView && null != (destroyHooks = tView.destroyHooks)) for (let i = 0; i < destroyHooks.length; i += 2) {
                        const context2 = lView[destroyHooks[i]];
                        if (!(context2 instanceof NodeInjectorFactory)) {
                            const toCall = destroyHooks[i + 1];
                            if (Array.isArray(toCall)) for (let j = 0; j < toCall.length; j += 2) {
                                const callContext = context2[toCall[j]], hook = toCall[j + 1];
                                try {
                                    hook.call(callContext);
                                } finally {}
                            } else try {
                                toCall.call(context2);
                            } finally {}
                        }
                    }
                }(tView, lView), function processCleanups(tView, lView) {
                    const tCleanup = tView.cleanup, lCleanup = lView[7];
                    let lastLCleanupIndex = -1;
                    if (null !== tCleanup) for (let i = 0; i < tCleanup.length - 1; i += 2) if ("string" == typeof tCleanup[i]) {
                        const idxOrTargetGetter = tCleanup[i + 1], target = "function" == typeof idxOrTargetGetter ? idxOrTargetGetter(lView) : unwrapRNode(lView[idxOrTargetGetter]), listener = lCleanup[lastLCleanupIndex = tCleanup[i + 2]], useCaptureOrSubIdx = tCleanup[i + 3];
                        "boolean" == typeof useCaptureOrSubIdx ? target.removeEventListener(tCleanup[i], listener, useCaptureOrSubIdx) : useCaptureOrSubIdx >= 0 ? lCleanup[lastLCleanupIndex = useCaptureOrSubIdx]() : lCleanup[lastLCleanupIndex = -useCaptureOrSubIdx].unsubscribe(), 
                        i += 2;
                    } else {
                        const context2 = lCleanup[lastLCleanupIndex = tCleanup[i + 1]];
                        tCleanup[i].call(context2);
                    }
                    if (null !== lCleanup) {
                        for (let i = lastLCleanupIndex + 1; i < lCleanup.length; i++) (0, lCleanup[i])();
                        lView[7] = null;
                    }
                }(tView, lView), 1 === lView[1].type && lView[11].destroy();
                const declarationContainer = lView[17];
                if (null !== declarationContainer && isLContainer(lView[3])) {
                    declarationContainer !== lView[3] && detachMovedView(declarationContainer, lView);
                    const lQueries = lView[19];
                    null !== lQueries && lQueries.detachView(tView);
                }
                !function unregisterLView(lView) {
                    TRACKED_LVIEWS.delete(lView[20]);
                }(lView);
            }
        }
        function getParentRElement(tView, tNode, lView) {
            return function getClosestRElement(tView, tNode, lView) {
                let parentTNode = tNode;
                for (;null !== parentTNode && 40 & parentTNode.type; ) parentTNode = (tNode = parentTNode).parent;
                if (null === parentTNode) return lView[0];
                if (2 & parentTNode.flags) {
                    const encapsulation = tView.data[parentTNode.directiveStart].encapsulation;
                    if (encapsulation === ViewEncapsulation$1.None || encapsulation === ViewEncapsulation$1.Emulated) return null;
                }
                return getNativeByTNode(parentTNode, lView);
            }(tView, tNode.parent, lView);
        }
        function nativeInsertBefore(renderer, parent, child, beforeNode, isMove) {
            renderer.insertBefore(parent, child, beforeNode, isMove);
        }
        function nativeAppendChild(renderer, parent, child) {
            renderer.appendChild(parent, child);
        }
        function nativeAppendOrInsertBefore(renderer, parent, child, beforeNode, isMove) {
            null !== beforeNode ? nativeInsertBefore(renderer, parent, child, beforeNode, isMove) : nativeAppendChild(renderer, parent, child);
        }
        function nativeParentNode(renderer, node) {
            return renderer.parentNode(node);
        }
        let core_DOCUMENT, _getInsertInFrontOfRNodeWithI18n = function getInsertInFrontOfRNodeWithNoI18n(parentTNode, currentTNode, lView) {
            return 40 & parentTNode.type ? getNativeByTNode(parentTNode, lView) : null;
        };
        function appendChild(tView, lView, childRNode, childTNode) {
            const parentRNode = getParentRElement(tView, childTNode, lView), renderer = lView[11], anchorNode = function getInsertInFrontOfRNode(parentTNode, currentTNode, lView) {
                return _getInsertInFrontOfRNodeWithI18n(parentTNode, currentTNode, lView);
            }(childTNode.parent || lView[6], childTNode, lView);
            if (null != parentRNode) if (Array.isArray(childRNode)) for (let i = 0; i < childRNode.length; i++) nativeAppendOrInsertBefore(renderer, parentRNode, childRNode[i], anchorNode, !1); else nativeAppendOrInsertBefore(renderer, parentRNode, childRNode, anchorNode, !1);
        }
        function getFirstNativeNode(lView, tNode) {
            if (null !== tNode) {
                const tNodeType = tNode.type;
                if (3 & tNodeType) return getNativeByTNode(tNode, lView);
                if (4 & tNodeType) return getBeforeNodeForView(-1, lView[tNode.index]);
                if (8 & tNodeType) {
                    const elIcuContainerChild = tNode.child;
                    if (null !== elIcuContainerChild) return getFirstNativeNode(lView, elIcuContainerChild);
                    {
                        const rNodeOrLContainer = lView[tNode.index];
                        return isLContainer(rNodeOrLContainer) ? getBeforeNodeForView(-1, rNodeOrLContainer) : unwrapRNode(rNodeOrLContainer);
                    }
                }
                if (32 & tNodeType) return icuContainerIterate(tNode, lView)() || unwrapRNode(lView[tNode.index]);
                {
                    const projectionNodes = getProjectionNodes(lView, tNode);
                    return null !== projectionNodes ? Array.isArray(projectionNodes) ? projectionNodes[0] : getFirstNativeNode(getLViewParent(lView[16]), projectionNodes) : getFirstNativeNode(lView, tNode.next);
                }
            }
            return null;
        }
        function getProjectionNodes(lView, tNode) {
            return null !== tNode ? lView[16][6].projection[tNode.projection] : null;
        }
        function getBeforeNodeForView(viewIndexInContainer, lContainer) {
            const nextViewIndex = 10 + viewIndexInContainer + 1;
            if (nextViewIndex < lContainer.length) {
                const lView = lContainer[nextViewIndex], firstTNodeOfView = lView[1].firstChild;
                if (null !== firstTNodeOfView) return getFirstNativeNode(lView, firstTNodeOfView);
            }
            return lContainer[7];
        }
        function applyNodes(renderer, action, tNode, lView, parentRElement, beforeNode, isProjection) {
            for (;null != tNode; ) {
                const rawSlotValue = lView[tNode.index], tNodeType = tNode.type;
                if (isProjection && 0 === action && (rawSlotValue && attachPatchData(unwrapRNode(rawSlotValue), lView), 
                tNode.flags |= 4), 64 != (64 & tNode.flags)) if (8 & tNodeType) applyNodes(renderer, action, tNode.child, lView, parentRElement, beforeNode, !1), 
                applyToElementOrContainer(action, renderer, parentRElement, rawSlotValue, beforeNode); else if (32 & tNodeType) {
                    const nextRNode = icuContainerIterate(tNode, lView);
                    let rNode;
                    for (;rNode = nextRNode(); ) applyToElementOrContainer(action, renderer, parentRElement, rNode, beforeNode);
                    applyToElementOrContainer(action, renderer, parentRElement, rawSlotValue, beforeNode);
                } else 16 & tNodeType ? applyProjectionRecursive(renderer, action, lView, tNode, parentRElement, beforeNode) : applyToElementOrContainer(action, renderer, parentRElement, rawSlotValue, beforeNode);
                tNode = isProjection ? tNode.projectionNext : tNode.next;
            }
        }
        function applyView(tView, lView, renderer, action, parentRElement, beforeNode) {
            applyNodes(renderer, action, tView.firstChild, lView, parentRElement, beforeNode, !1);
        }
        function applyProjectionRecursive(renderer, action, lView, tProjectionNode, parentRElement, beforeNode) {
            const componentLView = lView[16], nodeToProjectOrRNodes = componentLView[6].projection[tProjectionNode.projection];
            if (Array.isArray(nodeToProjectOrRNodes)) for (let i = 0; i < nodeToProjectOrRNodes.length; i++) applyToElementOrContainer(action, renderer, parentRElement, nodeToProjectOrRNodes[i], beforeNode); else applyNodes(renderer, action, nodeToProjectOrRNodes, componentLView[3], parentRElement, beforeNode, !0);
        }
        function writeDirectStyle(renderer, element, newValue) {
            renderer.setAttribute(element, "style", newValue);
        }
        function writeDirectClass(renderer, element, newValue) {
            "" === newValue ? renderer.removeAttribute(element, "class") : renderer.setAttribute(element, "class", newValue);
        }
        const ENVIRONMENT_INITIALIZER = new InjectionToken("ENVIRONMENT_INITIALIZER"), INJECTOR = new InjectionToken("INJECTOR", -1), INJECTOR_DEF_TYPES = new InjectionToken("INJECTOR_DEF_TYPES");
        class NullInjector {
            get(token, notFoundValue = THROW_IF_NOT_FOUND) {
                if (notFoundValue === THROW_IF_NOT_FOUND) {
                    const error = new Error(`NullInjectorError: No provider for ${stringify(token)}!`);
                    throw error.name = "NullInjectorError", error;
                }
                return notFoundValue;
            }
        }
        function importProvidersFrom(...sources) {
            return {
                ɵproviders: internalImportProvidersFrom(0, sources)
            };
        }
        function internalImportProvidersFrom(checkForStandaloneCmp, ...sources) {
            const providersOut = [], dedup = new Set;
            let injectorTypesWithProviders;
            return deepForEach(sources, source => {
                const internalSource = source;
                walkProviderTree(internalSource, providersOut, [], dedup) && (injectorTypesWithProviders || (injectorTypesWithProviders = []), 
                injectorTypesWithProviders.push(internalSource));
            }), void 0 !== injectorTypesWithProviders && processInjectorTypesWithProviders(injectorTypesWithProviders, providersOut), 
            providersOut;
        }
        function processInjectorTypesWithProviders(typesWithProviders, providersOut) {
            for (let i = 0; i < typesWithProviders.length; i++) {
                const {providers} = typesWithProviders[i];
                deepForEach(providers, provider => {
                    providersOut.push(provider);
                });
            }
        }
        function walkProviderTree(container, providersOut, parents, dedup) {
            if (!(container = resolveForwardRef(container))) return !1;
            let defType = null, injDef = getInjectorDef(container);
            const cmpDef = !injDef && getComponentDef(container);
            if (injDef || cmpDef) {
                if (cmpDef && !cmpDef.standalone) return !1;
                defType = container;
            } else {
                const ngModule = container.ngModule;
                if (injDef = getInjectorDef(ngModule), !injDef) return !1;
                defType = ngModule;
            }
            const isDuplicate = dedup.has(defType);
            if (cmpDef) {
                if (isDuplicate) return !1;
                if (dedup.add(defType), cmpDef.dependencies) {
                    const deps = "function" == typeof cmpDef.dependencies ? cmpDef.dependencies() : cmpDef.dependencies;
                    for (const dep of deps) walkProviderTree(dep, providersOut, parents, dedup);
                }
            } else {
                if (!injDef) return !1;
                {
                    if (null != injDef.imports && !isDuplicate) {
                        let importTypesWithProviders;
                        dedup.add(defType);
                        try {
                            deepForEach(injDef.imports, imported => {
                                walkProviderTree(imported, providersOut, parents, dedup) && (importTypesWithProviders || (importTypesWithProviders = []), 
                                importTypesWithProviders.push(imported));
                            });
                        } finally {}
                        void 0 !== importTypesWithProviders && processInjectorTypesWithProviders(importTypesWithProviders, providersOut);
                    }
                    if (!isDuplicate) {
                        const factory = getFactoryDef(defType) || (() => new defType);
                        providersOut.push({
                            provide: defType,
                            useFactory: factory,
                            deps: EMPTY_ARRAY
                        }, {
                            provide: INJECTOR_DEF_TYPES,
                            useValue: defType,
                            multi: !0
                        }, {
                            provide: ENVIRONMENT_INITIALIZER,
                            useValue: () => core_inject(defType),
                            multi: !0
                        });
                    }
                    const defProviders = injDef.providers;
                    null == defProviders || isDuplicate || deepForEach(defProviders, provider => {
                        providersOut.push(provider);
                    });
                }
            }
            return defType !== container && void 0 !== container.providers;
        }
        const USE_VALUE$1 = getClosureSafeProperty({
            provide: String,
            useValue: getClosureSafeProperty
        });
        function isValueProvider(value) {
            return null !== value && "object" == typeof value && USE_VALUE$1 in value;
        }
        function isTypeProvider(value) {
            return "function" == typeof value;
        }
        const INJECTOR_SCOPE = new InjectionToken("Set Injector scope."), NOT_YET = {}, CIRCULAR = {};
        let NULL_INJECTOR$1;
        function getNullInjector() {
            return void 0 === NULL_INJECTOR$1 && (NULL_INJECTOR$1 = new NullInjector), NULL_INJECTOR$1;
        }
        class EnvironmentInjector {}
        class R3Injector extends EnvironmentInjector {
            constructor(providers, parent, source, scopes) {
                super(), this.parent = parent, this.source = source, this.scopes = scopes, this.records = new Map, 
                this._ngOnDestroyHooks = new Set, this._onDestroyHooks = [], this._destroyed = !1, 
                forEachSingleProvider(providers, provider => this.processProvider(provider)), this.records.set(INJECTOR, makeRecord(void 0, this)), 
                scopes.has("environment") && this.records.set(EnvironmentInjector, makeRecord(void 0, this));
                const record = this.records.get(INJECTOR_SCOPE);
                null != record && "string" == typeof record.value && this.scopes.add(record.value), 
                this.injectorDefTypes = new Set(this.get(INJECTOR_DEF_TYPES.multi, EMPTY_ARRAY, InjectFlags.Self));
            }
            get destroyed() {
                return this._destroyed;
            }
            destroy() {
                this.assertNotDestroyed(), this._destroyed = !0;
                try {
                    for (const service of this._ngOnDestroyHooks) service.ngOnDestroy();
                    for (const hook of this._onDestroyHooks) hook();
                } finally {
                    this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), 
                    this._onDestroyHooks.length = 0;
                }
            }
            onDestroy(callback) {
                this._onDestroyHooks.push(callback);
            }
            runInContext(fn) {
                this.assertNotDestroyed();
                const previousInjector = setCurrentInjector(this), previousInjectImplementation = setInjectImplementation(void 0);
                try {
                    return fn();
                } finally {
                    setCurrentInjector(previousInjector), setInjectImplementation(previousInjectImplementation);
                }
            }
            get(token, notFoundValue = THROW_IF_NOT_FOUND, flags = InjectFlags.Default) {
                this.assertNotDestroyed();
                const previousInjector = setCurrentInjector(this), previousInjectImplementation = setInjectImplementation(void 0);
                try {
                    if (!(flags & InjectFlags.SkipSelf)) {
                        let record = this.records.get(token);
                        if (void 0 === record) {
                            const def = function couldBeInjectableType(value) {
                                return "function" == typeof value || "object" == typeof value && value instanceof InjectionToken;
                            }(token) && getInjectableDef(token);
                            record = def && this.injectableDefInScope(def) ? makeRecord(injectableDefOrInjectorDefFactory(token), NOT_YET) : null, 
                            this.records.set(token, record);
                        }
                        if (null != record) return this.hydrate(token, record);
                    }
                    return (flags & InjectFlags.Self ? getNullInjector() : this.parent).get(token, notFoundValue = flags & InjectFlags.Optional && notFoundValue === THROW_IF_NOT_FOUND ? null : notFoundValue);
                } catch (e) {
                    if ("NullInjectorError" === e.name) {
                        if ((e.ngTempTokenPath = e.ngTempTokenPath || []).unshift(stringify(token)), previousInjector) throw e;
                        return function catchInjectorError(e, token, injectorErrorName, source) {
                            const tokenPath = e.ngTempTokenPath;
                            throw token.__source && tokenPath.unshift(token.__source), e.message = function formatError(text, obj, injectorErrorName, source = null) {
                                text = text && "\n" === text.charAt(0) && "ɵ" == text.charAt(1) ? text.slice(2) : text;
                                let context2 = stringify(obj);
                                if (Array.isArray(obj)) context2 = obj.map(stringify).join(" -> "); else if ("object" == typeof obj) {
                                    let parts = [];
                                    for (let key in obj) if (obj.hasOwnProperty(key)) {
                                        let value = obj[key];
                                        parts.push(key + ":" + ("string" == typeof value ? JSON.stringify(value) : stringify(value)));
                                    }
                                    context2 = `{${parts.join(", ")}}`;
                                }
                                return `${injectorErrorName}${source ? "(" + source + ")" : ""}[${context2}]: ${text.replace(NEW_LINE, "\n  ")}`;
                            }("\n" + e.message, tokenPath, injectorErrorName, source), e.ngTokenPath = tokenPath, 
                            e.ngTempTokenPath = null, e;
                        }(e, token, "R3InjectorError", this.source);
                    }
                    throw e;
                } finally {
                    setInjectImplementation(previousInjectImplementation), setCurrentInjector(previousInjector);
                }
            }
            resolveInjectorInitializers() {
                const previousInjector = setCurrentInjector(this), previousInjectImplementation = setInjectImplementation(void 0);
                try {
                    const initializers = this.get(ENVIRONMENT_INITIALIZER.multi, EMPTY_ARRAY, InjectFlags.Self);
                    for (const initializer of initializers) initializer();
                } finally {
                    setCurrentInjector(previousInjector), setInjectImplementation(previousInjectImplementation);
                }
            }
            toString() {
                const tokens = [], records = this.records;
                for (const token of records.keys()) tokens.push(stringify(token));
                return `R3Injector[${tokens.join(", ")}]`;
            }
            assertNotDestroyed() {
                if (this._destroyed) throw new RuntimeError(205, !1);
            }
            processProvider(provider) {
                let token = isTypeProvider(provider = resolveForwardRef(provider)) ? provider : resolveForwardRef(provider && provider.provide);
                const record = function providerToRecord(provider) {
                    return isValueProvider(provider) ? makeRecord(void 0, provider.useValue) : makeRecord(providerToFactory(provider), NOT_YET);
                }(provider);
                if (isTypeProvider(provider) || !0 !== provider.multi) this.records.get(token); else {
                    let multiRecord = this.records.get(token);
                    multiRecord || (multiRecord = makeRecord(void 0, NOT_YET, !0), multiRecord.factory = () => injectArgs(multiRecord.multi), 
                    this.records.set(token, multiRecord)), token = provider, multiRecord.multi.push(provider);
                }
                this.records.set(token, record);
            }
            hydrate(token, record) {
                return record.value === NOT_YET && (record.value = CIRCULAR, record.value = record.factory()), 
                "object" == typeof record.value && record.value && function hasOnDestroy(value) {
                    return null !== value && "object" == typeof value && "function" == typeof value.ngOnDestroy;
                }(record.value) && this._ngOnDestroyHooks.add(record.value), record.value;
            }
            injectableDefInScope(def) {
                if (!def.providedIn) return !1;
                const providedIn = resolveForwardRef(def.providedIn);
                return "string" == typeof providedIn ? "any" === providedIn || this.scopes.has(providedIn) : this.injectorDefTypes.has(providedIn);
            }
        }
        function injectableDefOrInjectorDefFactory(token) {
            const injectableDef = getInjectableDef(token), factory = null !== injectableDef ? injectableDef.factory : getFactoryDef(token);
            if (null !== factory) return factory;
            if (token instanceof InjectionToken) throw new RuntimeError(204, !1);
            if (token instanceof Function) return function getUndecoratedInjectableFactory(token) {
                const paramLength = token.length;
                if (paramLength > 0) throw function newArray(size, value) {
                    const list = [];
                    for (let i = 0; i < size; i++) list.push(value);
                    return list;
                }(paramLength, "?"), new RuntimeError(204, !1);
                const inheritedInjectableDef = function getInheritedInjectableDef(type) {
                    const def = type && (type[NG_PROV_DEF] || type[NG_INJECTABLE_DEF]);
                    if (def) {
                        const typeName = function getTypeName(type) {
                            if (type.hasOwnProperty("name")) return type.name;
                            const match = ("" + type).match(/^function\s*([^\s(]+)/);
                            return null === match ? "" : match[1];
                        }(type);
                        return console.warn(`DEPRECATED: DI is instantiating a token "${typeName}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${typeName}" class.`), 
                        def;
                    }
                    return null;
                }(token);
                return null !== inheritedInjectableDef ? () => inheritedInjectableDef.factory(token) : () => new token;
            }(token);
            throw new RuntimeError(204, !1);
        }
        function providerToFactory(provider, ngModuleType, providers) {
            let factory;
            if (isTypeProvider(provider)) {
                const unwrappedProvider = resolveForwardRef(provider);
                return getFactoryDef(unwrappedProvider) || injectableDefOrInjectorDefFactory(unwrappedProvider);
            }
            if (isValueProvider(provider)) factory = () => resolveForwardRef(provider.useValue); else if (function isFactoryProvider(value) {
                return !(!value || !value.useFactory);
            }(provider)) factory = () => provider.useFactory(...injectArgs(provider.deps || [])); else if (function isExistingProvider(value) {
                return !(!value || !value.useExisting);
            }(provider)) factory = () => core_inject(resolveForwardRef(provider.useExisting)); else {
                const classRef = resolveForwardRef(provider && (provider.useClass || provider.provide));
                if (!function hasDeps(value) {
                    return !!value.deps;
                }(provider)) return getFactoryDef(classRef) || injectableDefOrInjectorDefFactory(classRef);
                factory = () => new classRef(...injectArgs(provider.deps));
            }
            return factory;
        }
        function makeRecord(factory, value, multi = !1) {
            return {
                factory,
                value,
                multi: multi ? [] : void 0
            };
        }
        function isImportedNgModuleProviders(provider) {
            return !!provider.ɵproviders;
        }
        function forEachSingleProvider(providers, fn) {
            for (const provider of providers) Array.isArray(provider) ? forEachSingleProvider(provider, fn) : isImportedNgModuleProviders(provider) ? forEachSingleProvider(provider.ɵproviders, fn) : fn(provider);
        }
        class ComponentFactory$1 {}
        class _NullComponentFactoryResolver {
            resolveComponentFactory(component) {
                throw function noComponentFactoryError(component) {
                    const error = Error(`No component factory found for ${stringify(component)}. Did you add it to @NgModule.entryComponents?`);
                    return error.ngComponent = component, error;
                }(component);
            }
        }
        let ComponentFactoryResolver$1 = (() => {
            class ComponentFactoryResolver$12 {}
            return ComponentFactoryResolver$12.NULL = new _NullComponentFactoryResolver, ComponentFactoryResolver$12;
        })();
        function injectElementRef() {
            return createElementRef(getCurrentTNode(), getLView());
        }
        function createElementRef(tNode, lView) {
            return new core_ElementRef(getNativeByTNode(tNode, lView));
        }
        let core_ElementRef = (() => {
            class ElementRef2 {
                constructor(nativeElement) {
                    this.nativeElement = nativeElement;
                }
            }
            return ElementRef2.__NG_ELEMENT_ID__ = injectElementRef, ElementRef2;
        })();
        class RendererFactory2 {}
        let core_Renderer2 = (() => {
            class Renderer22 {}
            return Renderer22.__NG_ELEMENT_ID__ = () => function injectRenderer2() {
                const lView = getLView(), nodeAtIndex = getComponentLViewByIndex(getCurrentTNode().index, lView);
                return (isLView(nodeAtIndex) ? nodeAtIndex : lView)[11];
            }(), Renderer22;
        })(), Sanitizer = (() => {
            class Sanitizer2 {}
            return Sanitizer2.ɵprov = core_defineInjectable({
                token: Sanitizer2,
                providedIn: "root",
                factory: () => null
            }), Sanitizer2;
        })();
        class Version {
            constructor(full) {
                this.full = full, this.major = full.split(".")[0], this.minor = full.split(".")[1], 
                this.patch = full.split(".").slice(2).join(".");
            }
        }
        const VERSION = new Version("14.3.0"), NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {};
        function getOriginalError(error) {
            return error.ngOriginalError;
        }
        class ErrorHandler {
            constructor() {
                this._console = console;
            }
            handleError(error) {
                const originalError = this._findOriginalError(error);
                this._console.error("ERROR", error), originalError && this._console.error("ORIGINAL ERROR", originalError);
            }
            _findOriginalError(error) {
                let e = error && getOriginalError(error);
                for (;e && getOriginalError(e); ) e = getOriginalError(e);
                return e || null;
            }
        }
        function classIndexOf(className, classToSearch, startingIndex) {
            let end = className.length;
            for (;;) {
                const foundIndex = className.indexOf(classToSearch, startingIndex);
                if (-1 === foundIndex) return foundIndex;
                if (0 === foundIndex || className.charCodeAt(foundIndex - 1) <= 32) {
                    const length = classToSearch.length;
                    if (foundIndex + length === end || className.charCodeAt(foundIndex + length) <= 32) return foundIndex;
                }
                startingIndex = foundIndex + 1;
            }
        }
        function isCssClassMatching(attrs, cssClassToMatch, isProjectionMode) {
            let i = 0;
            for (;i < attrs.length; ) {
                let item = attrs[i++];
                if (isProjectionMode && "class" === item) {
                    if (item = attrs[i], -1 !== classIndexOf(item.toLowerCase(), cssClassToMatch, 0)) return !0;
                } else if (1 === item) {
                    for (;i < attrs.length && "string" == typeof (item = attrs[i++]); ) if (item.toLowerCase() === cssClassToMatch) return !0;
                    return !1;
                }
            }
            return !1;
        }
        function isInlineTemplate(tNode) {
            return 4 === tNode.type && "ng-template" !== tNode.value;
        }
        function hasTagAndTypeMatch(tNode, currentSelector, isProjectionMode) {
            return currentSelector === (4 !== tNode.type || isProjectionMode ? tNode.value : "ng-template");
        }
        function isNodeMatchingSelector(tNode, selector, isProjectionMode) {
            let mode = 4;
            const nodeAttrs = tNode.attrs || [], nameOnlyMarkerIdx = function getNameOnlyMarkerIndex(nodeAttrs) {
                for (let i = 0; i < nodeAttrs.length; i++) if (3 === (marker = nodeAttrs[i]) || 4 === marker || 6 === marker) return i;
                var marker;
                return nodeAttrs.length;
            }(nodeAttrs);
            let skipToNextSelector = !1;
            for (let i = 0; i < selector.length; i++) {
                const current = selector[i];
                if ("number" != typeof current) {
                    if (!skipToNextSelector) if (4 & mode) {
                        if (mode = 2 | 1 & mode, "" !== current && !hasTagAndTypeMatch(tNode, current, isProjectionMode) || "" === current && 1 === selector.length) {
                            if (isPositive(mode)) return !1;
                            skipToNextSelector = !0;
                        }
                    } else {
                        const selectorAttrValue = 8 & mode ? current : selector[++i];
                        if (8 & mode && null !== tNode.attrs) {
                            if (!isCssClassMatching(tNode.attrs, selectorAttrValue, isProjectionMode)) {
                                if (isPositive(mode)) return !1;
                                skipToNextSelector = !0;
                            }
                            continue;
                        }
                        const attrIndexInNode = findAttrIndexInNode(8 & mode ? "class" : current, nodeAttrs, isInlineTemplate(tNode), isProjectionMode);
                        if (-1 === attrIndexInNode) {
                            if (isPositive(mode)) return !1;
                            skipToNextSelector = !0;
                            continue;
                        }
                        if ("" !== selectorAttrValue) {
                            let nodeAttrValue;
                            nodeAttrValue = attrIndexInNode > nameOnlyMarkerIdx ? "" : nodeAttrs[attrIndexInNode + 1].toLowerCase();
                            const compareAgainstClassName = 8 & mode ? nodeAttrValue : null;
                            if (compareAgainstClassName && -1 !== classIndexOf(compareAgainstClassName, selectorAttrValue, 0) || 2 & mode && selectorAttrValue !== nodeAttrValue) {
                                if (isPositive(mode)) return !1;
                                skipToNextSelector = !0;
                            }
                        }
                    }
                } else {
                    if (!skipToNextSelector && !isPositive(mode) && !isPositive(current)) return !1;
                    if (skipToNextSelector && isPositive(current)) continue;
                    skipToNextSelector = !1, mode = current | 1 & mode;
                }
            }
            return isPositive(mode) || skipToNextSelector;
        }
        function isPositive(mode) {
            return 0 == (1 & mode);
        }
        function findAttrIndexInNode(name, attrs, isInlineTemplate2, isProjectionMode) {
            if (null === attrs) return -1;
            let i = 0;
            if (isProjectionMode || !isInlineTemplate2) {
                let bindingsMode = !1;
                for (;i < attrs.length; ) {
                    const maybeAttrName = attrs[i];
                    if (maybeAttrName === name) return i;
                    if (3 === maybeAttrName || 6 === maybeAttrName) bindingsMode = !0; else {
                        if (1 === maybeAttrName || 2 === maybeAttrName) {
                            let value = attrs[++i];
                            for (;"string" == typeof value; ) value = attrs[++i];
                            continue;
                        }
                        if (4 === maybeAttrName) break;
                        if (0 === maybeAttrName) {
                            i += 4;
                            continue;
                        }
                    }
                    i += bindingsMode ? 1 : 2;
                }
                return -1;
            }
            return function matchTemplateAttribute(attrs, name) {
                let i = attrs.indexOf(4);
                if (i > -1) for (i++; i < attrs.length; ) {
                    const attr = attrs[i];
                    if ("number" == typeof attr) return -1;
                    if (attr === name) return i;
                    i++;
                }
                return -1;
            }(attrs, name);
        }
        function isNodeMatchingSelectorList(tNode, selector, isProjectionMode = !1) {
            for (let i = 0; i < selector.length; i++) if (isNodeMatchingSelector(tNode, selector[i], isProjectionMode)) return !0;
            return !1;
        }
        function maybeWrapInNotSelector(isNegativeMode, chunk) {
            return isNegativeMode ? ":not(" + chunk.trim() + ")" : chunk;
        }
        function stringifyCSSSelector(selector) {
            let result = selector[0], i = 1, mode = 2, currentChunk = "", isNegativeMode = !1;
            for (;i < selector.length; ) {
                let valueOrMarker = selector[i];
                if ("string" == typeof valueOrMarker) if (2 & mode) {
                    const attrValue = selector[++i];
                    currentChunk += "[" + valueOrMarker + (attrValue.length > 0 ? '="' + attrValue + '"' : "") + "]";
                } else 8 & mode ? currentChunk += "." + valueOrMarker : 4 & mode && (currentChunk += " " + valueOrMarker); else "" !== currentChunk && !isPositive(valueOrMarker) && (result += maybeWrapInNotSelector(isNegativeMode, currentChunk), 
                currentChunk = ""), mode = valueOrMarker, isNegativeMode = isNegativeMode || !isPositive(mode);
                i++;
            }
            return "" !== currentChunk && (result += maybeWrapInNotSelector(isNegativeMode, currentChunk)), 
            result;
        }
        const NO_CHANGE = {};
        function ɵɵadvance(delta) {
            selectIndexInternal(getTView(), getLView(), getSelectedIndex() + delta, !1);
        }
        function selectIndexInternal(tView, lView, index, checkNoChangesMode) {
            if (!checkNoChangesMode) if (3 == (3 & lView[2])) {
                const preOrderCheckHooks = tView.preOrderCheckHooks;
                null !== preOrderCheckHooks && executeCheckHooks(lView, preOrderCheckHooks, index);
            } else {
                const preOrderHooks = tView.preOrderHooks;
                null !== preOrderHooks && executeInitAndCheckHooks(lView, preOrderHooks, 0, index);
            }
            setSelectedIndex(index);
        }
        function createInjector(defType, parent = null, additionalProviders = null, name) {
            const injector = createInjectorWithoutInjectorInstances(defType, parent, additionalProviders, name);
            return injector.resolveInjectorInitializers(), injector;
        }
        function createInjectorWithoutInjectorInstances(defType, parent = null, additionalProviders = null, name, scopes = new Set) {
            const providers = [ additionalProviders || EMPTY_ARRAY, importProvidersFrom(defType) ];
            return name = name || ("object" == typeof defType ? void 0 : stringify(defType)), 
            new R3Injector(providers, parent || getNullInjector(), name || null, scopes);
        }
        let core_Injector = (() => {
            class Injector2 {
                static create(options, parent) {
                    if (Array.isArray(options)) return createInjector({
                        name: ""
                    }, parent, options, "");
                    {
                        const name = options.name ?? "";
                        return createInjector({
                            name
                        }, options.parent, options.providers, name);
                    }
                }
            }
            return Injector2.THROW_IF_NOT_FOUND = THROW_IF_NOT_FOUND, Injector2.NULL = new NullInjector, 
            Injector2.ɵprov = core_defineInjectable({
                token: Injector2,
                providedIn: "any",
                factory: () => core_inject(INJECTOR)
            }), Injector2.__NG_ELEMENT_ID__ = -1, Injector2;
        })();
        function ɵɵdirectiveInject(token, flags = InjectFlags.Default) {
            const lView = getLView();
            return null === lView ? core_inject(token, flags) : getOrCreateInjectable(getCurrentTNode(), lView, resolveForwardRef(token), flags);
        }
        function toTStylingRange(prev, next) {
            return prev << 17 | next << 2;
        }
        function getTStylingRangePrev(tStylingRange) {
            return tStylingRange >> 17 & 32767;
        }
        function setTStylingRangePrevDuplicate(tStylingRange) {
            return 2 | tStylingRange;
        }
        function getTStylingRangeNext(tStylingRange) {
            return (131068 & tStylingRange) >> 2;
        }
        function setTStylingRangeNext(tStylingRange, next) {
            return -131069 & tStylingRange | next << 2;
        }
        function setTStylingRangeNextDuplicate(tStylingRange) {
            return 1 | tStylingRange;
        }
        function refreshContentQueries(tView, lView) {
            const contentQueries = tView.contentQueries;
            if (null !== contentQueries) for (let i = 0; i < contentQueries.length; i += 2) {
                const queryStartIdx = contentQueries[i], directiveDefIdx = contentQueries[i + 1];
                if (-1 !== directiveDefIdx) {
                    const directiveDef = tView.data[directiveDefIdx];
                    setCurrentQueryIndex(queryStartIdx), directiveDef.contentQueries(2, lView[directiveDefIdx], directiveDefIdx);
                }
            }
        }
        function createLView(parentLView, tView, context2, flags, host, tHostNode, rendererFactory, renderer, sanitizer, injector, embeddedViewInjector) {
            const lView = tView.blueprint.slice();
            return lView[0] = host, lView[2] = 76 | flags, (null !== embeddedViewInjector || parentLView && 1024 & parentLView[2]) && (lView[2] |= 1024), 
            resetPreOrderHookFlags(lView), lView[3] = lView[15] = parentLView, lView[8] = context2, 
            lView[10] = rendererFactory || parentLView && parentLView[10], lView[11] = renderer || parentLView && parentLView[11], 
            lView[12] = sanitizer || parentLView && parentLView[12] || null, lView[9] = injector || parentLView && parentLView[9] || null, 
            lView[6] = tHostNode, lView[20] = function getUniqueLViewId() {
                return uniqueIdCounter++;
            }(), lView[21] = embeddedViewInjector, lView[16] = 2 == tView.type ? parentLView[16] : lView, 
            lView;
        }
        function getOrCreateTNode(tView, index, type, name, attrs) {
            let tNode = tView.data[index];
            if (null === tNode) tNode = function createTNodeAtIndex(tView, index, type, name, attrs) {
                const currentTNode = getCurrentTNodePlaceholderOk(), isParent = isCurrentTNodeParent(), tNode = tView.data[index] = function createTNode(tView, tParent, type, index, value, attrs) {
                    return {
                        type,
                        index,
                        insertBeforeIndex: null,
                        injectorIndex: tParent ? tParent.injectorIndex : -1,
                        directiveStart: -1,
                        directiveEnd: -1,
                        directiveStylingLast: -1,
                        propertyBindings: null,
                        flags: 0,
                        providerIndexes: 0,
                        value,
                        attrs,
                        mergedAttrs: null,
                        localNames: null,
                        initialInputs: void 0,
                        inputs: null,
                        outputs: null,
                        tViews: null,
                        next: null,
                        projectionNext: null,
                        child: null,
                        parent: tParent,
                        projection: null,
                        styles: null,
                        stylesWithoutHost: null,
                        residualStyles: void 0,
                        classes: null,
                        classesWithoutHost: null,
                        residualClasses: void 0,
                        classBindings: 0,
                        styleBindings: 0
                    };
                }(0, isParent ? currentTNode : currentTNode && currentTNode.parent, type, index, name, attrs);
                return null === tView.firstChild && (tView.firstChild = tNode), null !== currentTNode && (isParent ? null == currentTNode.child && null !== tNode.parent && (currentTNode.child = tNode) : null === currentTNode.next && (currentTNode.next = tNode)), 
                tNode;
            }(tView, index, type, name, attrs), function isInI18nBlock() {
                return instructionState.lFrame.inI18n;
            }() && (tNode.flags |= 64); else if (64 & tNode.type) {
                tNode.type = type, tNode.value = name, tNode.attrs = attrs;
                const parent = function getCurrentParentTNode() {
                    const lFrame = instructionState.lFrame, currentTNode = lFrame.currentTNode;
                    return lFrame.isParent ? currentTNode : currentTNode.parent;
                }();
                tNode.injectorIndex = null === parent ? -1 : parent.injectorIndex;
            }
            return setCurrentTNode(tNode, !0), tNode;
        }
        function allocExpando(tView, lView, numSlotsToAlloc, initialValue) {
            if (0 === numSlotsToAlloc) return -1;
            const allocIdx = lView.length;
            for (let i = 0; i < numSlotsToAlloc; i++) lView.push(initialValue), tView.blueprint.push(initialValue), 
            tView.data.push(null);
            return allocIdx;
        }
        function renderView(tView, lView, context2) {
            enterView(lView);
            try {
                const viewQuery = tView.viewQuery;
                null !== viewQuery && executeViewQueryFn(1, viewQuery, context2);
                const templateFn = tView.template;
                null !== templateFn && executeTemplate(tView, lView, templateFn, 1, context2), tView.firstCreatePass && (tView.firstCreatePass = !1), 
                tView.staticContentQueries && refreshContentQueries(tView, lView), tView.staticViewQueries && executeViewQueryFn(2, tView.viewQuery, context2);
                const components = tView.components;
                null !== components && function renderChildComponents(hostLView, components) {
                    for (let i = 0; i < components.length; i++) renderComponent(hostLView, components[i]);
                }(lView, components);
            } catch (error) {
                throw tView.firstCreatePass && (tView.incompleteFirstPass = !0, tView.firstCreatePass = !1), 
                error;
            } finally {
                lView[2] &= -5, leaveView();
            }
        }
        function refreshView(tView, lView, templateFn, context2) {
            const flags = lView[2];
            if (128 != (128 & flags)) {
                enterView(lView);
                try {
                    resetPreOrderHookFlags(lView), function setBindingIndex(value) {
                        return instructionState.lFrame.bindingIndex = value;
                    }(tView.bindingStartIndex), null !== templateFn && executeTemplate(tView, lView, templateFn, 2, context2);
                    const hooksInitPhaseCompleted = 3 == (3 & flags);
                    if (hooksInitPhaseCompleted) {
                        const preOrderCheckHooks = tView.preOrderCheckHooks;
                        null !== preOrderCheckHooks && executeCheckHooks(lView, preOrderCheckHooks, null);
                    } else {
                        const preOrderHooks = tView.preOrderHooks;
                        null !== preOrderHooks && executeInitAndCheckHooks(lView, preOrderHooks, 0, null), 
                        incrementInitPhaseFlags(lView, 0);
                    }
                    if (function markTransplantedViewsForRefresh(lView) {
                        for (let lContainer = getFirstLContainer(lView); null !== lContainer; lContainer = getNextLContainer(lContainer)) {
                            if (!lContainer[2]) continue;
                            const movedViews = lContainer[9];
                            for (let i = 0; i < movedViews.length; i++) {
                                const movedLView = movedViews[i], insertionLContainer = movedLView[3];
                                0 == (512 & movedLView[2]) && updateTransplantedViewCount(insertionLContainer, 1), 
                                movedLView[2] |= 512;
                            }
                        }
                    }(lView), function refreshEmbeddedViews(lView) {
                        for (let lContainer = getFirstLContainer(lView); null !== lContainer; lContainer = getNextLContainer(lContainer)) for (let i = 10; i < lContainer.length; i++) {
                            const embeddedLView = lContainer[i], embeddedTView = embeddedLView[1];
                            viewAttachedToChangeDetector(embeddedLView) && refreshView(embeddedTView, embeddedLView, embeddedTView.template, embeddedLView[8]);
                        }
                    }(lView), null !== tView.contentQueries && refreshContentQueries(tView, lView), 
                    hooksInitPhaseCompleted) {
                        const contentCheckHooks = tView.contentCheckHooks;
                        null !== contentCheckHooks && executeCheckHooks(lView, contentCheckHooks);
                    } else {
                        const contentHooks = tView.contentHooks;
                        null !== contentHooks && executeInitAndCheckHooks(lView, contentHooks, 1), incrementInitPhaseFlags(lView, 1);
                    }
                    !function processHostBindingOpCodes(tView, lView) {
                        const hostBindingOpCodes = tView.hostBindingOpCodes;
                        if (null !== hostBindingOpCodes) try {
                            for (let i = 0; i < hostBindingOpCodes.length; i++) {
                                const opCode = hostBindingOpCodes[i];
                                if (opCode < 0) setSelectedIndex(~opCode); else {
                                    const directiveIdx = opCode, bindingRootIndx = hostBindingOpCodes[++i], hostBindingFn = hostBindingOpCodes[++i];
                                    setBindingRootForHostBindings(bindingRootIndx, directiveIdx), hostBindingFn(2, lView[directiveIdx]);
                                }
                            }
                        } finally {
                            setSelectedIndex(-1);
                        }
                    }(tView, lView);
                    const components = tView.components;
                    null !== components && function refreshChildComponents(hostLView, components) {
                        for (let i = 0; i < components.length; i++) refreshComponent(hostLView, components[i]);
                    }(lView, components);
                    const viewQuery = tView.viewQuery;
                    if (null !== viewQuery && executeViewQueryFn(2, viewQuery, context2), hooksInitPhaseCompleted) {
                        const viewCheckHooks = tView.viewCheckHooks;
                        null !== viewCheckHooks && executeCheckHooks(lView, viewCheckHooks);
                    } else {
                        const viewHooks = tView.viewHooks;
                        null !== viewHooks && executeInitAndCheckHooks(lView, viewHooks, 2), incrementInitPhaseFlags(lView, 2);
                    }
                    !0 === tView.firstUpdatePass && (tView.firstUpdatePass = !1), lView[2] &= -41, 512 & lView[2] && (lView[2] &= -513, 
                    updateTransplantedViewCount(lView[3], -1));
                } finally {
                    leaveView();
                }
            }
        }
        function executeTemplate(tView, lView, templateFn, rf, context2) {
            const prevSelectedIndex = getSelectedIndex(), isUpdatePhase = 2 & rf;
            try {
                setSelectedIndex(-1), isUpdatePhase && lView.length > 22 && selectIndexInternal(tView, lView, 22, !1), 
                templateFn(rf, context2);
            } finally {
                setSelectedIndex(prevSelectedIndex);
            }
        }
        function createDirectivesInstances(tView, lView, tNode) {
            !getBindingsEnabled() || (function instantiateAllDirectives(tView, lView, tNode, native) {
                const start = tNode.directiveStart, end = tNode.directiveEnd;
                tView.firstCreatePass || getOrCreateNodeInjectorForNode(tNode, lView), attachPatchData(native, lView);
                const initialInputs = tNode.initialInputs;
                for (let i = start; i < end; i++) {
                    const def = tView.data[i], isComponent = isComponentDef(def);
                    isComponent && addComponentLogic(lView, tNode, def);
                    const directive = getNodeInjectable(lView, tView, i, tNode);
                    attachPatchData(directive, lView), null !== initialInputs && setInputsFromAttrs(0, i - start, directive, def, 0, initialInputs), 
                    isComponent && (getComponentLViewByIndex(tNode.index, lView)[8] = directive);
                }
            }(tView, lView, tNode, getNativeByTNode(tNode, lView)), 128 == (128 & tNode.flags) && function invokeDirectivesHostBindings(tView, lView, tNode) {
                const start = tNode.directiveStart, end = tNode.directiveEnd, elementIndex = tNode.index, currentDirectiveIndex = function getCurrentDirectiveIndex() {
                    return instructionState.lFrame.currentDirectiveIndex;
                }();
                try {
                    setSelectedIndex(elementIndex);
                    for (let dirIndex = start; dirIndex < end; dirIndex++) {
                        const def = tView.data[dirIndex], directive = lView[dirIndex];
                        setCurrentDirectiveIndex(dirIndex), (null !== def.hostBindings || 0 !== def.hostVars || null !== def.hostAttrs) && invokeHostBindingsInCreationMode(def, directive);
                    }
                } finally {
                    setSelectedIndex(-1), setCurrentDirectiveIndex(currentDirectiveIndex);
                }
            }(tView, lView, tNode));
        }
        function saveResolvedLocalsInData(viewData, tNode, localRefExtractor = getNativeByTNode) {
            const localNames = tNode.localNames;
            if (null !== localNames) {
                let localIndex = tNode.index + 1;
                for (let i = 0; i < localNames.length; i += 2) {
                    const index = localNames[i + 1], value = -1 === index ? localRefExtractor(tNode, viewData) : viewData[index];
                    viewData[localIndex++] = value;
                }
            }
        }
        function getOrCreateComponentTView(def) {
            const tView = def.tView;
            return null === tView || tView.incompleteFirstPass ? def.tView = createTView(1, null, def.template, def.decls, def.vars, def.directiveDefs, def.pipeDefs, def.viewQuery, def.schemas, def.consts) : tView;
        }
        function createTView(type, declTNode, templateFn, decls, vars, directives, pipes, viewQuery, schemas, constsOrFactory) {
            const bindingStartIndex = 22 + decls, initialViewLength = bindingStartIndex + vars, blueprint = function createViewBlueprint(bindingStartIndex, initialViewLength) {
                const blueprint = [];
                for (let i = 0; i < initialViewLength; i++) blueprint.push(i < bindingStartIndex ? null : NO_CHANGE);
                return blueprint;
            }(bindingStartIndex, initialViewLength), consts = "function" == typeof constsOrFactory ? constsOrFactory() : constsOrFactory;
            return blueprint[1] = {
                type,
                blueprint,
                template: templateFn,
                queries: null,
                viewQuery,
                declTNode,
                data: blueprint.slice().fill(null, bindingStartIndex),
                bindingStartIndex,
                expandoStartIndex: initialViewLength,
                hostBindingOpCodes: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof directives ? directives() : directives,
                pipeRegistry: "function" == typeof pipes ? pipes() : pipes,
                firstChild: null,
                schemas,
                consts,
                incompleteFirstPass: !1
            };
        }
        function generatePropertyAliases(inputAliasMap, directiveDefIdx, propStore) {
            for (let publicName in inputAliasMap) if (inputAliasMap.hasOwnProperty(publicName)) {
                const internalName = inputAliasMap[publicName];
                (propStore = null === propStore ? {} : propStore).hasOwnProperty(publicName) ? propStore[publicName].push(directiveDefIdx, internalName) : propStore[publicName] = [ directiveDefIdx, internalName ];
            }
            return propStore;
        }
        function initializeInputAndOutputAliases(tView, tNode) {
            const end = tNode.directiveEnd, tViewData = tView.data, tNodeAttrs = tNode.attrs, inputsFromAttrs = [];
            let inputsStore = null, outputsStore = null;
            for (let i = tNode.directiveStart; i < end; i++) {
                const directiveDef = tViewData[i], directiveInputs = directiveDef.inputs, initialInputs = null === tNodeAttrs || isInlineTemplate(tNode) ? null : generateInitialInputs(directiveInputs, tNodeAttrs);
                inputsFromAttrs.push(initialInputs), inputsStore = generatePropertyAliases(directiveInputs, i, inputsStore), 
                outputsStore = generatePropertyAliases(directiveDef.outputs, i, outputsStore);
            }
            null !== inputsStore && (inputsStore.hasOwnProperty("class") && (tNode.flags |= 16), 
            inputsStore.hasOwnProperty("style") && (tNode.flags |= 32)), tNode.initialInputs = inputsFromAttrs, 
            tNode.inputs = inputsStore, tNode.outputs = outputsStore;
        }
        function markDirtyIfOnPush(lView, viewIndex) {
            const childComponentLView = getComponentLViewByIndex(viewIndex, lView);
            16 & childComponentLView[2] || (childComponentLView[2] |= 32);
        }
        function resolveDirectives(tView, lView, tNode, localRefs) {
            let hasDirectives = !1;
            if (getBindingsEnabled()) {
                const directiveDefs = function findDirectiveDefMatches(tView, viewData, tNode) {
                    const registry = tView.directiveRegistry;
                    let matches = null;
                    if (registry) for (let i = 0; i < registry.length; i++) {
                        const def = registry[i];
                        isNodeMatchingSelectorList(tNode, def.selectors, !1) && (matches || (matches = []), 
                        diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, viewData), tView, def.type), 
                        isComponentDef(def) ? (markAsComponentHost(tView, tNode), matches.unshift(def)) : matches.push(def));
                    }
                    return matches;
                }(tView, lView, tNode), exportsMap = null === localRefs ? null : {
                    "": -1
                };
                if (null !== directiveDefs) {
                    hasDirectives = !0, initTNodeFlags(tNode, tView.data.length, directiveDefs.length);
                    for (let i = 0; i < directiveDefs.length; i++) {
                        const def = directiveDefs[i];
                        def.providersResolver && def.providersResolver(def);
                    }
                    let preOrderHooksFound = !1, preOrderCheckHooksFound = !1, directiveIdx = allocExpando(tView, lView, directiveDefs.length, null);
                    for (let i = 0; i < directiveDefs.length; i++) {
                        const def = directiveDefs[i];
                        tNode.mergedAttrs = mergeHostAttrs(tNode.mergedAttrs, def.hostAttrs), configureViewWithDirective(tView, tNode, lView, directiveIdx, def), 
                        saveNameToExportMap(directiveIdx, def, exportsMap), null !== def.contentQueries && (tNode.flags |= 8), 
                        (null !== def.hostBindings || null !== def.hostAttrs || 0 !== def.hostVars) && (tNode.flags |= 128);
                        const lifeCycleHooks = def.type.prototype;
                        !preOrderHooksFound && (lifeCycleHooks.ngOnChanges || lifeCycleHooks.ngOnInit || lifeCycleHooks.ngDoCheck) && ((tView.preOrderHooks || (tView.preOrderHooks = [])).push(tNode.index), 
                        preOrderHooksFound = !0), !preOrderCheckHooksFound && (lifeCycleHooks.ngOnChanges || lifeCycleHooks.ngDoCheck) && ((tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(tNode.index), 
                        preOrderCheckHooksFound = !0), directiveIdx++;
                    }
                    initializeInputAndOutputAliases(tView, tNode);
                }
                exportsMap && function cacheMatchingLocalNames(tNode, localRefs, exportsMap) {
                    if (localRefs) {
                        const localNames = tNode.localNames = [];
                        for (let i = 0; i < localRefs.length; i += 2) {
                            const index = exportsMap[localRefs[i + 1]];
                            if (null == index) throw new RuntimeError(-301, !1);
                            localNames.push(localRefs[i], index);
                        }
                    }
                }(tNode, localRefs, exportsMap);
            }
            return tNode.mergedAttrs = mergeHostAttrs(tNode.mergedAttrs, tNode.attrs), hasDirectives;
        }
        function registerHostBindingOpCodes(tView, tNode, lView, directiveIdx, directiveVarsIdx, def) {
            const hostBindings = def.hostBindings;
            if (hostBindings) {
                let hostBindingOpCodes = tView.hostBindingOpCodes;
                null === hostBindingOpCodes && (hostBindingOpCodes = tView.hostBindingOpCodes = []);
                const elementIndx = ~tNode.index;
                (function lastSelectedElementIdx(hostBindingOpCodes) {
                    let i = hostBindingOpCodes.length;
                    for (;i > 0; ) {
                        const value = hostBindingOpCodes[--i];
                        if ("number" == typeof value && value < 0) return value;
                    }
                    return 0;
                })(hostBindingOpCodes) != elementIndx && hostBindingOpCodes.push(elementIndx), hostBindingOpCodes.push(directiveIdx, directiveVarsIdx, hostBindings);
            }
        }
        function invokeHostBindingsInCreationMode(def, directive) {
            null !== def.hostBindings && def.hostBindings(1, directive);
        }
        function markAsComponentHost(tView, hostTNode) {
            hostTNode.flags |= 2, (tView.components || (tView.components = [])).push(hostTNode.index);
        }
        function saveNameToExportMap(directiveIdx, def, exportsMap) {
            if (exportsMap) {
                if (def.exportAs) for (let i = 0; i < def.exportAs.length; i++) exportsMap[def.exportAs[i]] = directiveIdx;
                isComponentDef(def) && (exportsMap[""] = directiveIdx);
            }
        }
        function initTNodeFlags(tNode, index, numberOfDirectives) {
            tNode.flags |= 1, tNode.directiveStart = index, tNode.directiveEnd = index + numberOfDirectives, 
            tNode.providerIndexes = index;
        }
        function configureViewWithDirective(tView, tNode, lView, directiveIndex, def) {
            tView.data[directiveIndex] = def;
            const directiveFactory = def.factory || (def.factory = getFactoryDef(def.type)), nodeInjectorFactory = new NodeInjectorFactory(directiveFactory, isComponentDef(def), ɵɵdirectiveInject);
            tView.blueprint[directiveIndex] = nodeInjectorFactory, lView[directiveIndex] = nodeInjectorFactory, 
            registerHostBindingOpCodes(tView, tNode, 0, directiveIndex, allocExpando(tView, lView, def.hostVars, NO_CHANGE), def);
        }
        function addComponentLogic(lView, hostTNode, def) {
            const native = getNativeByTNode(hostTNode, lView), tView = getOrCreateComponentTView(def), rendererFactory = lView[10], componentView = addToViewTree(lView, createLView(lView, tView, null, def.onPush ? 32 : 16, native, hostTNode, rendererFactory, rendererFactory.createRenderer(native, def), null, null, null));
            lView[hostTNode.index] = componentView;
        }
        function setInputsFromAttrs(lView, directiveIndex, instance, def, tNode, initialInputData) {
            const initialInputs = initialInputData[directiveIndex];
            if (null !== initialInputs) {
                const setInput = def.setInput;
                for (let i = 0; i < initialInputs.length; ) {
                    const publicName = initialInputs[i++], privateName = initialInputs[i++], value = initialInputs[i++];
                    null !== setInput ? def.setInput(instance, value, publicName, privateName) : instance[privateName] = value;
                }
            }
        }
        function generateInitialInputs(inputs, attrs) {
            let inputsToStore = null, i = 0;
            for (;i < attrs.length; ) {
                const attrName = attrs[i];
                if (0 !== attrName) if (5 !== attrName) {
                    if ("number" == typeof attrName) break;
                    inputs.hasOwnProperty(attrName) && (null === inputsToStore && (inputsToStore = []), 
                    inputsToStore.push(attrName, inputs[attrName], attrs[i + 1])), i += 2;
                } else i += 2; else i += 4;
            }
            return inputsToStore;
        }
        function createLContainer(hostNative, currentView, native, tNode) {
            return new Array(hostNative, !0, !1, currentView, null, 0, tNode, native, null, null);
        }
        function refreshComponent(hostLView, componentHostIdx) {
            const componentView = getComponentLViewByIndex(componentHostIdx, hostLView);
            if (viewAttachedToChangeDetector(componentView)) {
                const tView = componentView[1];
                48 & componentView[2] ? refreshView(tView, componentView, tView.template, componentView[8]) : componentView[5] > 0 && refreshContainsDirtyView(componentView);
            }
        }
        function refreshContainsDirtyView(lView) {
            for (let lContainer = getFirstLContainer(lView); null !== lContainer; lContainer = getNextLContainer(lContainer)) for (let i = 10; i < lContainer.length; i++) {
                const embeddedLView = lContainer[i];
                if (viewAttachedToChangeDetector(embeddedLView)) if (512 & embeddedLView[2]) {
                    const embeddedTView = embeddedLView[1];
                    refreshView(embeddedTView, embeddedLView, embeddedTView.template, embeddedLView[8]);
                } else embeddedLView[5] > 0 && refreshContainsDirtyView(embeddedLView);
            }
            const components = lView[1].components;
            if (null !== components) for (let i = 0; i < components.length; i++) {
                const componentView = getComponentLViewByIndex(components[i], lView);
                viewAttachedToChangeDetector(componentView) && componentView[5] > 0 && refreshContainsDirtyView(componentView);
            }
        }
        function renderComponent(hostLView, componentHostIdx) {
            const componentView = getComponentLViewByIndex(componentHostIdx, hostLView), componentTView = componentView[1];
            (function syncViewWithBlueprint(tView, lView) {
                for (let i = lView.length; i < tView.blueprint.length; i++) lView.push(tView.blueprint[i]);
            })(componentTView, componentView), renderView(componentTView, componentView, componentView[8]);
        }
        function addToViewTree(lView, lViewOrLContainer) {
            return lView[13] ? lView[14][4] = lViewOrLContainer : lView[13] = lViewOrLContainer, 
            lView[14] = lViewOrLContainer, lViewOrLContainer;
        }
        function markViewDirty(lView) {
            for (;lView; ) {
                lView[2] |= 32;
                const parent = getLViewParent(lView);
                if (0 != (256 & lView[2]) && !parent) return lView;
                lView = parent;
            }
            return null;
        }
        function detectChangesInternal(tView, lView, context2, notifyErrorHandler = !0) {
            const rendererFactory = lView[10];
            rendererFactory.begin && rendererFactory.begin();
            try {
                refreshView(tView, lView, tView.template, context2);
            } catch (error) {
                throw notifyErrorHandler && handleError(lView, error), error;
            } finally {
                rendererFactory.end && rendererFactory.end();
            }
        }
        function executeViewQueryFn(flags, viewQueryFn, component) {
            setCurrentQueryIndex(0), viewQueryFn(flags, component);
        }
        function getOrCreateLViewCleanup(view) {
            return view[7] || (view[7] = []);
        }
        function getOrCreateTViewCleanup(tView) {
            return tView.cleanup || (tView.cleanup = []);
        }
        function handleError(lView, error) {
            const injector = lView[9], errorHandler2 = injector ? injector.get(ErrorHandler, null) : null;
            errorHandler2 && errorHandler2.handleError(error);
        }
        function setInputsForProperty(tView, lView, inputs, publicName, value) {
            for (let i = 0; i < inputs.length; ) {
                const index = inputs[i++], privateName = inputs[i++], instance = lView[index], def = tView.data[index];
                null !== def.setInput ? def.setInput(instance, value, publicName, privateName) : instance[privateName] = value;
            }
        }
        function computeStaticStyling(tNode, attrs, writeToHost) {
            let styles = writeToHost ? tNode.styles : null, classes = writeToHost ? tNode.classes : null, mode = 0;
            if (null !== attrs) for (let i = 0; i < attrs.length; i++) {
                const value = attrs[i];
                "number" == typeof value ? mode = value : 1 == mode ? classes = concatStringsWithSpace(classes, value) : 2 == mode && (styles = concatStringsWithSpace(styles, value + ": " + attrs[++i] + ";"));
            }
            writeToHost ? tNode.styles = styles : tNode.stylesWithoutHost = styles, writeToHost ? tNode.classes = classes : tNode.classesWithoutHost = classes;
        }
        function collectNativeNodes(tView, lView, tNode, result, isProjection = !1) {
            for (;null !== tNode; ) {
                const lNode = lView[tNode.index];
                if (null !== lNode && result.push(unwrapRNode(lNode)), isLContainer(lNode)) for (let i = 10; i < lNode.length; i++) {
                    const lViewInAContainer = lNode[i], lViewFirstChildTNode = lViewInAContainer[1].firstChild;
                    null !== lViewFirstChildTNode && collectNativeNodes(lViewInAContainer[1], lViewInAContainer, lViewFirstChildTNode, result);
                }
                const tNodeType = tNode.type;
                if (8 & tNodeType) collectNativeNodes(tView, lView, tNode.child, result); else if (32 & tNodeType) {
                    const nextRNode = icuContainerIterate(tNode, lView);
                    let rNode;
                    for (;rNode = nextRNode(); ) result.push(rNode);
                } else if (16 & tNodeType) {
                    const nodesInSlot = getProjectionNodes(lView, tNode);
                    if (Array.isArray(nodesInSlot)) result.push(...nodesInSlot); else {
                        const parentView = getLViewParent(lView[16]);
                        collectNativeNodes(parentView[1], parentView, nodesInSlot, result, !0);
                    }
                }
                tNode = isProjection ? tNode.projectionNext : tNode.next;
            }
            return result;
        }
        class ViewRef$1 {
            constructor(_lView, _cdRefInjectingView) {
                this._lView = _lView, this._cdRefInjectingView = _cdRefInjectingView, this._appRef = null, 
                this._attachedToViewContainer = !1;
            }
            get rootNodes() {
                const lView = this._lView, tView = lView[1];
                return collectNativeNodes(tView, lView, tView.firstChild, []);
            }
            get context() {
                return this._lView[8];
            }
            set context(value) {
                this._lView[8] = value;
            }
            get destroyed() {
                return 128 == (128 & this._lView[2]);
            }
            destroy() {
                if (this._appRef) this._appRef.detachView(this); else if (this._attachedToViewContainer) {
                    const parent = this._lView[3];
                    if (isLContainer(parent)) {
                        const viewRefs = parent[8], index = viewRefs ? viewRefs.indexOf(this) : -1;
                        index > -1 && (detachView(parent, index), removeFromArray(viewRefs, index));
                    }
                    this._attachedToViewContainer = !1;
                }
                destroyLView(this._lView[1], this._lView);
            }
            onDestroy(callback) {
                !function storeCleanupWithContext(tView, lView, context2, cleanupFn) {
                    const lCleanup = getOrCreateLViewCleanup(lView);
                    null === context2 ? lCleanup.push(cleanupFn) : (lCleanup.push(context2), tView.firstCreatePass && getOrCreateTViewCleanup(tView).push(cleanupFn, lCleanup.length - 1));
                }(this._lView[1], this._lView, null, callback);
            }
            markForCheck() {
                markViewDirty(this._cdRefInjectingView || this._lView);
            }
            detach() {
                this._lView[2] &= -65;
            }
            reattach() {
                this._lView[2] |= 64;
            }
            detectChanges() {
                detectChangesInternal(this._lView[1], this._lView, this.context);
            }
            checkNoChanges() {}
            attachToViewContainerRef() {
                if (this._appRef) throw new RuntimeError(902, !1);
                this._attachedToViewContainer = !0;
            }
            detachFromAppRef() {
                this._appRef = null, function renderDetachView(tView, lView) {
                    applyView(tView, lView, lView[11], 2, null, null);
                }(this._lView[1], this._lView);
            }
            attachToAppRef(appRef) {
                if (this._attachedToViewContainer) throw new RuntimeError(902, !1);
                this._appRef = appRef;
            }
        }
        class RootViewRef extends ViewRef$1 {
            constructor(_view) {
                super(_view), this._view = _view;
            }
            detectChanges() {
                const lView = this._view;
                detectChangesInternal(lView[1], lView, lView[8], !1);
            }
            checkNoChanges() {}
            get context() {
                return null;
            }
        }
        class ComponentFactoryResolver extends ComponentFactoryResolver$1 {
            constructor(ngModule) {
                super(), this.ngModule = ngModule;
            }
            resolveComponentFactory(component) {
                const componentDef = getComponentDef(component);
                return new ComponentFactory(componentDef, this.ngModule);
            }
        }
        function toRefArray(map2) {
            const array = [];
            for (let nonMinified in map2) map2.hasOwnProperty(nonMinified) && array.push({
                propName: map2[nonMinified],
                templateName: nonMinified
            });
            return array;
        }
        class ChainedInjector {
            constructor(injector, parentInjector) {
                this.injector = injector, this.parentInjector = parentInjector;
            }
            get(token, notFoundValue, flags) {
                const value = this.injector.get(token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR, flags);
                return value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR || notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ? value : this.parentInjector.get(token, notFoundValue, flags);
            }
        }
        class ComponentFactory extends ComponentFactory$1 {
            constructor(componentDef, ngModule) {
                super(), this.componentDef = componentDef, this.ngModule = ngModule, this.componentType = componentDef.type, 
                this.selector = function stringifyCSSSelectorList(selectorList) {
                    return selectorList.map(stringifyCSSSelector).join(",");
                }(componentDef.selectors), this.ngContentSelectors = componentDef.ngContentSelectors ? componentDef.ngContentSelectors : [], 
                this.isBoundToModule = !!ngModule;
            }
            get inputs() {
                return toRefArray(this.componentDef.inputs);
            }
            get outputs() {
                return toRefArray(this.componentDef.outputs);
            }
            create(injector, projectableNodes, rootSelectorOrNode, environmentInjector) {
                let realEnvironmentInjector = (environmentInjector = environmentInjector || this.ngModule) instanceof EnvironmentInjector ? environmentInjector : environmentInjector?.injector;
                realEnvironmentInjector && null !== this.componentDef.getStandaloneInjector && (realEnvironmentInjector = this.componentDef.getStandaloneInjector(realEnvironmentInjector) || realEnvironmentInjector);
                const rootViewInjector = realEnvironmentInjector ? new ChainedInjector(injector, realEnvironmentInjector) : injector, rendererFactory = rootViewInjector.get(RendererFactory2, null);
                if (null === rendererFactory) throw new RuntimeError(407, !1);
                const sanitizer = rootViewInjector.get(Sanitizer, null), hostRenderer = rendererFactory.createRenderer(null, this.componentDef), elementName = this.componentDef.selectors[0][0] || "div", hostRNode = rootSelectorOrNode ? function locateHostElement(renderer, elementOrSelector, encapsulation) {
                    return renderer.selectRootElement(elementOrSelector, encapsulation === ViewEncapsulation$1.ShadowDom);
                }(hostRenderer, rootSelectorOrNode, this.componentDef.encapsulation) : createElementNode(hostRenderer, elementName, function getNamespace(elementName) {
                    const name = elementName.toLowerCase();
                    return "svg" === name ? "svg" : "math" === name ? "math" : null;
                }(elementName)), rootFlags = this.componentDef.onPush ? 288 : 272, rootTView = createTView(0, null, null, 1, 0, null, null, null, null, null), rootLView = createLView(null, rootTView, null, rootFlags, null, null, rendererFactory, hostRenderer, sanitizer, rootViewInjector, null);
                let component, tElementNode;
                enterView(rootLView);
                try {
                    const componentView = function createRootComponentView(rNode, def, rootView, rendererFactory, hostRenderer, sanitizer) {
                        const tView = rootView[1];
                        rootView[22] = rNode;
                        const tNode = getOrCreateTNode(tView, 22, 2, "#host", null), mergedAttrs = tNode.mergedAttrs = def.hostAttrs;
                        null !== mergedAttrs && (computeStaticStyling(tNode, mergedAttrs, !0), null !== rNode && (setUpAttributes(hostRenderer, rNode, mergedAttrs), 
                        null !== tNode.classes && writeDirectClass(hostRenderer, rNode, tNode.classes), 
                        null !== tNode.styles && writeDirectStyle(hostRenderer, rNode, tNode.styles)));
                        const viewRenderer = rendererFactory.createRenderer(rNode, def), componentView = createLView(rootView, getOrCreateComponentTView(def), null, def.onPush ? 32 : 16, rootView[22], tNode, rendererFactory, viewRenderer, sanitizer || null, null, null);
                        return tView.firstCreatePass && (diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, rootView), tView, def.type), 
                        markAsComponentHost(tView, tNode), initTNodeFlags(tNode, rootView.length, 1)), addToViewTree(rootView, componentView), 
                        rootView[22] = componentView;
                    }(hostRNode, this.componentDef, rootLView, rendererFactory, hostRenderer);
                    if (hostRNode) if (rootSelectorOrNode) setUpAttributes(hostRenderer, hostRNode, [ "ng-version", VERSION.full ]); else {
                        const {attrs, classes} = function extractAttrsAndClassesFromSelector(selector) {
                            const attrs = [], classes = [];
                            let i = 1, mode = 2;
                            for (;i < selector.length; ) {
                                let valueOrMarker = selector[i];
                                if ("string" == typeof valueOrMarker) 2 === mode ? "" !== valueOrMarker && attrs.push(valueOrMarker, selector[++i]) : 8 === mode && classes.push(valueOrMarker); else {
                                    if (!isPositive(mode)) break;
                                    mode = valueOrMarker;
                                }
                                i++;
                            }
                            return {
                                attrs,
                                classes
                            };
                        }(this.componentDef.selectors[0]);
                        attrs && setUpAttributes(hostRenderer, hostRNode, attrs), classes && classes.length > 0 && writeDirectClass(hostRenderer, hostRNode, classes.join(" "));
                    }
                    if (tElementNode = getTNode(rootTView, 22), void 0 !== projectableNodes) {
                        const projection = tElementNode.projection = [];
                        for (let i = 0; i < this.ngContentSelectors.length; i++) {
                            const nodesforSlot = projectableNodes[i];
                            projection.push(null != nodesforSlot ? Array.from(nodesforSlot) : null);
                        }
                    }
                    component = function createRootComponent(componentView, componentDef, rootLView, hostFeatures) {
                        const tView = rootLView[1], component = function instantiateRootComponent(tView, lView, def) {
                            const rootTNode = getCurrentTNode();
                            tView.firstCreatePass && (def.providersResolver && def.providersResolver(def), configureViewWithDirective(tView, rootTNode, lView, allocExpando(tView, lView, 1, null), def), 
                            initializeInputAndOutputAliases(tView, rootTNode));
                            const directive = getNodeInjectable(lView, tView, rootTNode.directiveStart, rootTNode);
                            attachPatchData(directive, lView);
                            const native = getNativeByTNode(rootTNode, lView);
                            return native && attachPatchData(native, lView), directive;
                        }(tView, rootLView, componentDef);
                        if (componentView[8] = rootLView[8] = component, null !== hostFeatures) for (const feature of hostFeatures) feature(component, componentDef);
                        if (componentDef.contentQueries) {
                            const tNode = getCurrentTNode();
                            componentDef.contentQueries(1, component, tNode.directiveStart);
                        }
                        const rootTNode = getCurrentTNode();
                        return !tView.firstCreatePass || null === componentDef.hostBindings && null === componentDef.hostAttrs || (setSelectedIndex(rootTNode.index), 
                        registerHostBindingOpCodes(rootLView[1], rootTNode, 0, rootTNode.directiveStart, rootTNode.directiveEnd, componentDef), 
                        invokeHostBindingsInCreationMode(componentDef, component)), component;
                    }(componentView, this.componentDef, rootLView, [ LifecycleHooksFeature ]), renderView(rootTView, rootLView, null);
                } finally {
                    leaveView();
                }
                return new ComponentRef(this.componentType, component, createElementRef(tElementNode, rootLView), rootLView, tElementNode);
            }
        }
        class ComponentRef extends class ComponentRef$1 {} {
            constructor(componentType, instance, location2, _rootLView, _tNode) {
                super(), this.location = location2, this._rootLView = _rootLView, this._tNode = _tNode, 
                this.instance = instance, this.hostView = this.changeDetectorRef = new RootViewRef(_rootLView), 
                this.componentType = componentType;
            }
            setInput(name, value) {
                const inputData = this._tNode.inputs;
                let dataValue;
                if (null !== inputData && (dataValue = inputData[name])) {
                    const lView = this._rootLView;
                    setInputsForProperty(lView[1], lView, dataValue, name, value), markDirtyIfOnPush(lView, this._tNode.index);
                }
            }
            get injector() {
                return new NodeInjector(this._tNode, this._rootLView);
            }
            destroy() {
                this.hostView.destroy();
            }
            onDestroy(callback) {
                this.hostView.onDestroy(callback);
            }
        }
        function LifecycleHooksFeature() {
            const tNode = getCurrentTNode();
            registerPostOrderHooks(getLView()[1], tNode);
        }
        function ɵɵInheritDefinitionFeature(definition) {
            let superType = function getSuperType(type) {
                return Object.getPrototypeOf(type.prototype).constructor;
            }(definition.type), shouldInheritFields = !0;
            const inheritanceChain = [ definition ];
            for (;superType; ) {
                let superDef;
                if (isComponentDef(definition)) superDef = superType.ɵcmp || superType.ɵdir; else {
                    if (superType.ɵcmp) throw new RuntimeError(903, !1);
                    superDef = superType.ɵdir;
                }
                if (superDef) {
                    if (shouldInheritFields) {
                        inheritanceChain.push(superDef);
                        const writeableDef = definition;
                        writeableDef.inputs = maybeUnwrapEmpty(definition.inputs), writeableDef.declaredInputs = maybeUnwrapEmpty(definition.declaredInputs), 
                        writeableDef.outputs = maybeUnwrapEmpty(definition.outputs);
                        const superHostBindings = superDef.hostBindings;
                        superHostBindings && inheritHostBindings(definition, superHostBindings);
                        const superViewQuery = superDef.viewQuery, superContentQueries = superDef.contentQueries;
                        if (superViewQuery && inheritViewQuery(definition, superViewQuery), superContentQueries && inheritContentQueries(definition, superContentQueries), 
                        fillProperties(definition.inputs, superDef.inputs), fillProperties(definition.declaredInputs, superDef.declaredInputs), 
                        fillProperties(definition.outputs, superDef.outputs), isComponentDef(superDef) && superDef.data.animation) {
                            const defData = definition.data;
                            defData.animation = (defData.animation || []).concat(superDef.data.animation);
                        }
                    }
                    const features = superDef.features;
                    if (features) for (let i = 0; i < features.length; i++) {
                        const feature = features[i];
                        feature && feature.ngInherit && feature(definition), feature === ɵɵInheritDefinitionFeature && (shouldInheritFields = !1);
                    }
                }
                superType = Object.getPrototypeOf(superType);
            }
            !function mergeHostAttrsAcrossInheritance(inheritanceChain) {
                let hostVars = 0, hostAttrs = null;
                for (let i = inheritanceChain.length - 1; i >= 0; i--) {
                    const def = inheritanceChain[i];
                    def.hostVars = hostVars += def.hostVars, def.hostAttrs = mergeHostAttrs(def.hostAttrs, hostAttrs = mergeHostAttrs(hostAttrs, def.hostAttrs));
                }
            }(inheritanceChain);
        }
        function maybeUnwrapEmpty(value) {
            return value === EMPTY_OBJ ? {} : value === EMPTY_ARRAY ? [] : value;
        }
        function inheritViewQuery(definition, superViewQuery) {
            const prevViewQuery = definition.viewQuery;
            definition.viewQuery = prevViewQuery ? (rf, ctx) => {
                superViewQuery(rf, ctx), prevViewQuery(rf, ctx);
            } : superViewQuery;
        }
        function inheritContentQueries(definition, superContentQueries) {
            const prevContentQueries = definition.contentQueries;
            definition.contentQueries = prevContentQueries ? (rf, ctx, directiveIndex) => {
                superContentQueries(rf, ctx, directiveIndex), prevContentQueries(rf, ctx, directiveIndex);
            } : superContentQueries;
        }
        function inheritHostBindings(definition, superHostBindings) {
            const prevHostBindings = definition.hostBindings;
            definition.hostBindings = prevHostBindings ? (rf, ctx) => {
                superHostBindings(rf, ctx), prevHostBindings(rf, ctx);
            } : superHostBindings;
        }
        let _symbolIterator = null;
        function core_getSymbolIterator() {
            if (!_symbolIterator) {
                const Symbol2 = _global.Symbol;
                if (Symbol2 && Symbol2.iterator) _symbolIterator = Symbol2.iterator; else {
                    const keys = Object.getOwnPropertyNames(Map.prototype);
                    for (let i = 0; i < keys.length; ++i) {
                        const key = keys[i];
                        "entries" !== key && "size" !== key && Map.prototype[key] === Map.prototype.entries && (_symbolIterator = key);
                    }
                }
            }
            return _symbolIterator;
        }
        function isListLikeIterable(obj) {
            return !!function isJsObject(o) {
                return null !== o && ("function" == typeof o || "object" == typeof o);
            }(obj) && (Array.isArray(obj) || !(obj instanceof Map) && core_getSymbolIterator() in obj);
        }
        function bindingUpdated(lView, bindingIndex, value) {
            return !Object.is(lView[bindingIndex], value) && (lView[bindingIndex] = value, !0);
        }
        function ɵɵtemplate(index, templateFn, decls, vars, tagName, attrsIndex, localRefsIndex, localRefExtractor) {
            const lView = getLView(), tView = getTView(), adjustedIndex = index + 22, tNode = tView.firstCreatePass ? function templateFirstCreatePass(index, tView, lView, templateFn, decls, vars, tagName, attrsIndex, localRefsIndex) {
                const tViewConsts = tView.consts, tNode = getOrCreateTNode(tView, index, 4, tagName || null, getConstant(tViewConsts, attrsIndex));
                resolveDirectives(tView, lView, tNode, getConstant(tViewConsts, localRefsIndex)), 
                registerPostOrderHooks(tView, tNode);
                const embeddedTView = tNode.tViews = createTView(2, tNode, templateFn, decls, vars, tView.directiveRegistry, tView.pipeRegistry, null, tView.schemas, tViewConsts);
                return null !== tView.queries && (tView.queries.template(tView, tNode), embeddedTView.queries = tView.queries.embeddedTView(tNode)), 
                tNode;
            }(adjustedIndex, tView, lView, templateFn, decls, vars, tagName, attrsIndex, localRefsIndex) : tView.data[adjustedIndex];
            setCurrentTNode(tNode, !1);
            const comment = lView[11].createComment("");
            appendChild(tView, lView, comment, tNode), attachPatchData(comment, lView), addToViewTree(lView, lView[adjustedIndex] = createLContainer(comment, lView, comment, tNode)), 
            isDirectiveHost(tNode) && createDirectivesInstances(tView, lView, tNode), null != localRefsIndex && saveResolvedLocalsInData(lView, tNode, localRefExtractor);
        }
        function ɵɵproperty(propName, value, sanitizer) {
            const lView = getLView();
            return bindingUpdated(lView, nextBindingIndex(), value) && function elementPropertyInternal(tView, tNode, lView, propName, value, renderer, sanitizer, nativeOnly) {
                const element = getNativeByTNode(tNode, lView);
                let dataValue, inputData = tNode.inputs;
                !nativeOnly && null != inputData && (dataValue = inputData[propName]) ? (setInputsForProperty(tView, lView, dataValue, propName, value), 
                isComponentHost(tNode) && markDirtyIfOnPush(lView, tNode.index)) : 3 & tNode.type && (propName = function mapPropName(name) {
                    return "class" === name ? "className" : "for" === name ? "htmlFor" : "formaction" === name ? "formAction" : "innerHtml" === name ? "innerHTML" : "readonly" === name ? "readOnly" : "tabindex" === name ? "tabIndex" : name;
                }(propName), value = null != sanitizer ? sanitizer(value, tNode.value || "", propName) : value, 
                renderer.setProperty(element, propName, value));
            }(getTView(), function getSelectedTNode() {
                const lFrame = instructionState.lFrame;
                return getTNode(lFrame.tView, lFrame.selectedIndex);
            }(), lView, propName, value, lView[11], sanitizer, !1), ɵɵproperty;
        }
        function setDirectiveInputsWhichShadowsStyling(tView, tNode, lView, value, isClassBased) {
            const property = isClassBased ? "class" : "style";
            setInputsForProperty(tView, lView, tNode.inputs[property], property, value);
        }
        function ɵɵelementStart(index, name, attrsIndex, localRefsIndex) {
            const lView = getLView(), tView = getTView(), adjustedIndex = 22 + index, renderer = lView[11], native = lView[adjustedIndex] = createElementNode(renderer, name, function getNamespace$1() {
                return instructionState.lFrame.currentNamespace;
            }()), tNode = tView.firstCreatePass ? function elementStartFirstCreatePass(index, tView, lView, native, name, attrsIndex, localRefsIndex) {
                const tViewConsts = tView.consts, tNode = getOrCreateTNode(tView, index, 2, name, getConstant(tViewConsts, attrsIndex));
                return resolveDirectives(tView, lView, tNode, getConstant(tViewConsts, localRefsIndex)), 
                null !== tNode.attrs && computeStaticStyling(tNode, tNode.attrs, !1), null !== tNode.mergedAttrs && computeStaticStyling(tNode, tNode.mergedAttrs, !0), 
                null !== tView.queries && tView.queries.elementStart(tView, tNode), tNode;
            }(adjustedIndex, tView, lView, 0, name, attrsIndex, localRefsIndex) : tView.data[adjustedIndex];
            setCurrentTNode(tNode, !0);
            const mergedAttrs = tNode.mergedAttrs;
            null !== mergedAttrs && setUpAttributes(renderer, native, mergedAttrs);
            const classes = tNode.classes;
            null !== classes && writeDirectClass(renderer, native, classes);
            const styles = tNode.styles;
            return null !== styles && writeDirectStyle(renderer, native, styles), 64 != (64 & tNode.flags) && appendChild(tView, lView, native, tNode), 
            0 === function getElementDepthCount() {
                return instructionState.lFrame.elementDepthCount;
            }() && attachPatchData(native, lView), function increaseElementDepthCount() {
                instructionState.lFrame.elementDepthCount++;
            }(), isDirectiveHost(tNode) && (createDirectivesInstances(tView, lView, tNode), 
            function executeContentQueries(tView, tNode, lView) {
                if (isContentQueryHost(tNode)) {
                    const end = tNode.directiveEnd;
                    for (let directiveIndex = tNode.directiveStart; directiveIndex < end; directiveIndex++) {
                        const def = tView.data[directiveIndex];
                        def.contentQueries && def.contentQueries(1, lView[directiveIndex], directiveIndex);
                    }
                }
            }(tView, tNode, lView)), null !== localRefsIndex && saveResolvedLocalsInData(lView, tNode), 
            ɵɵelementStart;
        }
        function ɵɵelementEnd() {
            let currentTNode = getCurrentTNode();
            isCurrentTNodeParent() ? function setCurrentTNodeAsNotParent() {
                instructionState.lFrame.isParent = !1;
            }() : (currentTNode = currentTNode.parent, setCurrentTNode(currentTNode, !1));
            const tNode = currentTNode;
            !function decreaseElementDepthCount() {
                instructionState.lFrame.elementDepthCount--;
            }();
            const tView = getTView();
            return tView.firstCreatePass && (registerPostOrderHooks(tView, currentTNode), isContentQueryHost(currentTNode) && tView.queries.elementEnd(currentTNode)), 
            null != tNode.classesWithoutHost && function hasClassInput(tNode) {
                return 0 != (16 & tNode.flags);
            }(tNode) && setDirectiveInputsWhichShadowsStyling(tView, tNode, getLView(), tNode.classesWithoutHost, !0), 
            null != tNode.stylesWithoutHost && function hasStyleInput(tNode) {
                return 0 != (32 & tNode.flags);
            }(tNode) && setDirectiveInputsWhichShadowsStyling(tView, tNode, getLView(), tNode.stylesWithoutHost, !1), 
            ɵɵelementEnd;
        }
        function core_isPromise(obj) {
            return !!obj && "function" == typeof obj.then;
        }
        const isObservable = function isSubscribable(obj) {
            return !!obj && "function" == typeof obj.subscribe;
        };
        function ɵɵlistener(eventName, listenerFn, useCapture, eventTargetResolver) {
            const lView = getLView(), tView = getTView(), tNode = getCurrentTNode();
            return function listenerInternal(tView, lView, renderer, tNode, eventName, listenerFn, useCapture, eventTargetResolver) {
                const isTNodeDirectiveHost = isDirectiveHost(tNode), tCleanup = tView.firstCreatePass && getOrCreateTViewCleanup(tView), context2 = lView[8], lCleanup = getOrCreateLViewCleanup(lView);
                let processOutputs = !0;
                if (3 & tNode.type || eventTargetResolver) {
                    const native = getNativeByTNode(tNode, lView), target = eventTargetResolver ? eventTargetResolver(native) : native, lCleanupIndex = lCleanup.length, idxOrTargetGetter = eventTargetResolver ? _lView => eventTargetResolver(unwrapRNode(_lView[tNode.index])) : tNode.index;
                    let existingListener = null;
                    if (!eventTargetResolver && isTNodeDirectiveHost && (existingListener = function findExistingListener(tView, lView, eventName, tNodeIdx) {
                        const tCleanup = tView.cleanup;
                        if (null != tCleanup) for (let i = 0; i < tCleanup.length - 1; i += 2) {
                            const cleanupEventName = tCleanup[i];
                            if (cleanupEventName === eventName && tCleanup[i + 1] === tNodeIdx) {
                                const lCleanup = lView[7], listenerIdxInLCleanup = tCleanup[i + 2];
                                return lCleanup.length > listenerIdxInLCleanup ? lCleanup[listenerIdxInLCleanup] : null;
                            }
                            "string" == typeof cleanupEventName && (i += 2);
                        }
                        return null;
                    }(tView, lView, eventName, tNode.index)), null !== existingListener) (existingListener.__ngLastListenerFn__ || existingListener).__ngNextListenerFn__ = listenerFn, 
                    existingListener.__ngLastListenerFn__ = listenerFn, processOutputs = !1; else {
                        listenerFn = wrapListener(tNode, lView, context2, listenerFn, !1);
                        const cleanupFn = renderer.listen(target, eventName, listenerFn);
                        lCleanup.push(listenerFn, cleanupFn), tCleanup && tCleanup.push(eventName, idxOrTargetGetter, lCleanupIndex, lCleanupIndex + 1);
                    }
                } else listenerFn = wrapListener(tNode, lView, context2, listenerFn, !1);
                const outputs = tNode.outputs;
                let props;
                if (processOutputs && null !== outputs && (props = outputs[eventName])) {
                    const propsLength = props.length;
                    if (propsLength) for (let i = 0; i < propsLength; i += 2) {
                        const subscription = lView[props[i]][props[i + 1]].subscribe(listenerFn), idx = lCleanup.length;
                        lCleanup.push(listenerFn, subscription), tCleanup && tCleanup.push(eventName, tNode.index, idx, -(idx + 1));
                    }
                }
            }(tView, lView, lView[11], tNode, eventName, listenerFn, 0, eventTargetResolver), 
            ɵɵlistener;
        }
        function executeListenerWithErrorHandling(lView, context2, listenerFn, e) {
            try {
                return !1 !== listenerFn(e);
            } catch (error) {
                return handleError(lView, error), !1;
            }
        }
        function wrapListener(tNode, lView, context2, listenerFn, wrapWithPreventDefault) {
            return function wrapListenerIn_markDirtyAndPreventDefault(e) {
                if (e === Function) return listenerFn;
                markViewDirty(2 & tNode.flags ? getComponentLViewByIndex(tNode.index, lView) : lView);
                let result = executeListenerWithErrorHandling(lView, 0, listenerFn, e), nextListenerFn = wrapListenerIn_markDirtyAndPreventDefault.__ngNextListenerFn__;
                for (;nextListenerFn; ) result = executeListenerWithErrorHandling(lView, 0, nextListenerFn, e) && result, 
                nextListenerFn = nextListenerFn.__ngNextListenerFn__;
                return wrapWithPreventDefault && !1 === result && (e.preventDefault(), e.returnValue = !1), 
                result;
            };
        }
        function ɵɵnextContext(level = 1) {
            return function nextContextImpl(level) {
                return (instructionState.lFrame.contextLView = function walkUpViews(nestingLevel, currentView) {
                    for (;nestingLevel > 0; ) currentView = currentView[15], nestingLevel--;
                    return currentView;
                }(level, instructionState.lFrame.contextLView))[8];
            }(level);
        }
        function markDuplicates(tData, tStylingKey, index, isPrevDir, isClassBinding) {
            const tStylingAtIndex = tData[index + 1], isMap = null === tStylingKey;
            let cursor = isPrevDir ? getTStylingRangePrev(tStylingAtIndex) : getTStylingRangeNext(tStylingAtIndex), foundDuplicate = !1;
            for (;0 !== cursor && (!1 === foundDuplicate || isMap); ) {
                const tStyleRangeAtCursor = tData[cursor + 1];
                isStylingMatch(tData[cursor], tStylingKey) && (foundDuplicate = !0, tData[cursor + 1] = isPrevDir ? setTStylingRangeNextDuplicate(tStyleRangeAtCursor) : setTStylingRangePrevDuplicate(tStyleRangeAtCursor)), 
                cursor = isPrevDir ? getTStylingRangePrev(tStyleRangeAtCursor) : getTStylingRangeNext(tStyleRangeAtCursor);
            }
            foundDuplicate && (tData[index + 1] = isPrevDir ? setTStylingRangePrevDuplicate(tStylingAtIndex) : setTStylingRangeNextDuplicate(tStylingAtIndex));
        }
        function isStylingMatch(tStylingKeyCursor, tStylingKey) {
            return null === tStylingKeyCursor || null == tStylingKey || (Array.isArray(tStylingKeyCursor) ? tStylingKeyCursor[1] : tStylingKeyCursor) === tStylingKey || !(!Array.isArray(tStylingKeyCursor) || "string" != typeof tStylingKey) && keyValueArrayIndexOf(tStylingKeyCursor, tStylingKey) >= 0;
        }
        function ɵɵclassProp(className, value) {
            return function checkStylingProperty(prop, value, suffix, isClassBased) {
                const lView = getLView(), tView = getTView(), bindingIndex = function incrementBindingIndex(count) {
                    const lFrame = instructionState.lFrame, index = lFrame.bindingIndex;
                    return lFrame.bindingIndex = lFrame.bindingIndex + count, index;
                }(2);
                tView.firstUpdatePass && function stylingFirstUpdatePass(tView, tStylingKey, bindingIndex, isClassBased) {
                    const tData = tView.data;
                    if (null === tData[bindingIndex + 1]) {
                        const tNode = tData[getSelectedIndex()], isHostBindings = function isInHostBindings(tView, bindingIndex) {
                            return bindingIndex >= tView.expandoStartIndex;
                        }(tView, bindingIndex);
                        (function hasStylingInputShadow(tNode, isClassBased) {
                            return 0 != (tNode.flags & (isClassBased ? 16 : 32));
                        })(tNode, isClassBased) && null === tStylingKey && !isHostBindings && (tStylingKey = !1), 
                        tStylingKey = function wrapInStaticStylingKey(tData, tNode, stylingKey, isClassBased) {
                            const hostDirectiveDef = function getCurrentDirectiveDef(tData) {
                                const currentDirectiveIndex = instructionState.lFrame.currentDirectiveIndex;
                                return -1 === currentDirectiveIndex ? null : tData[currentDirectiveIndex];
                            }(tData);
                            let residual = isClassBased ? tNode.residualClasses : tNode.residualStyles;
                            if (null === hostDirectiveDef) 0 === (isClassBased ? tNode.classBindings : tNode.styleBindings) && (stylingKey = collectStylingFromTAttrs(stylingKey = collectStylingFromDirectives(null, tData, tNode, stylingKey, isClassBased), tNode.attrs, isClassBased), 
                            residual = null); else {
                                const directiveStylingLast = tNode.directiveStylingLast;
                                if (-1 === directiveStylingLast || tData[directiveStylingLast] !== hostDirectiveDef) if (stylingKey = collectStylingFromDirectives(hostDirectiveDef, tData, tNode, stylingKey, isClassBased), 
                                null === residual) {
                                    let templateStylingKey = function getTemplateHeadTStylingKey(tData, tNode, isClassBased) {
                                        const bindings = isClassBased ? tNode.classBindings : tNode.styleBindings;
                                        if (0 !== getTStylingRangeNext(bindings)) return tData[getTStylingRangePrev(bindings)];
                                    }(tData, tNode, isClassBased);
                                    void 0 !== templateStylingKey && Array.isArray(templateStylingKey) && (templateStylingKey = collectStylingFromDirectives(null, tData, tNode, templateStylingKey[1], isClassBased), 
                                    templateStylingKey = collectStylingFromTAttrs(templateStylingKey, tNode.attrs, isClassBased), 
                                    function setTemplateHeadTStylingKey(tData, tNode, isClassBased, tStylingKey) {
                                        tData[getTStylingRangePrev(isClassBased ? tNode.classBindings : tNode.styleBindings)] = tStylingKey;
                                    }(tData, tNode, isClassBased, templateStylingKey));
                                } else residual = function collectResidual(tData, tNode, isClassBased) {
                                    let residual;
                                    const directiveEnd = tNode.directiveEnd;
                                    for (let i = 1 + tNode.directiveStylingLast; i < directiveEnd; i++) residual = collectStylingFromTAttrs(residual, tData[i].hostAttrs, isClassBased);
                                    return collectStylingFromTAttrs(residual, tNode.attrs, isClassBased);
                                }(tData, tNode, isClassBased);
                            }
                            return void 0 !== residual && (isClassBased ? tNode.residualClasses = residual : tNode.residualStyles = residual), 
                            stylingKey;
                        }(tData, tNode, tStylingKey, isClassBased), function insertTStylingBinding(tData, tNode, tStylingKeyWithStatic, index, isHostBinding, isClassBinding) {
                            let tBindings = isClassBinding ? tNode.classBindings : tNode.styleBindings, tmplHead = getTStylingRangePrev(tBindings), tmplTail = getTStylingRangeNext(tBindings);
                            tData[index] = tStylingKeyWithStatic;
                            let tStylingKey, isKeyDuplicateOfStatic = !1;
                            if (Array.isArray(tStylingKeyWithStatic)) {
                                const staticKeyValueArray = tStylingKeyWithStatic;
                                tStylingKey = staticKeyValueArray[1], (null === tStylingKey || keyValueArrayIndexOf(staticKeyValueArray, tStylingKey) > 0) && (isKeyDuplicateOfStatic = !0);
                            } else tStylingKey = tStylingKeyWithStatic;
                            if (isHostBinding) if (0 !== tmplTail) {
                                const previousNode = getTStylingRangePrev(tData[tmplHead + 1]);
                                tData[index + 1] = toTStylingRange(previousNode, tmplHead), 0 !== previousNode && (tData[previousNode + 1] = setTStylingRangeNext(tData[previousNode + 1], index)), 
                                tData[tmplHead + 1] = function setTStylingRangePrev(tStylingRange, previous) {
                                    return 131071 & tStylingRange | previous << 17;
                                }(tData[tmplHead + 1], index);
                            } else tData[index + 1] = toTStylingRange(tmplHead, 0), 0 !== tmplHead && (tData[tmplHead + 1] = setTStylingRangeNext(tData[tmplHead + 1], index)), 
                            tmplHead = index; else tData[index + 1] = toTStylingRange(tmplTail, 0), 0 === tmplHead ? tmplHead = index : tData[tmplTail + 1] = setTStylingRangeNext(tData[tmplTail + 1], index), 
                            tmplTail = index;
                            isKeyDuplicateOfStatic && (tData[index + 1] = setTStylingRangePrevDuplicate(tData[index + 1])), 
                            markDuplicates(tData, tStylingKey, index, !0), markDuplicates(tData, tStylingKey, index, !1), 
                            function markDuplicateOfResidualStyling(tNode, tStylingKey, tData, index, isClassBinding) {
                                const residual = isClassBinding ? tNode.residualClasses : tNode.residualStyles;
                                null != residual && "string" == typeof tStylingKey && keyValueArrayIndexOf(residual, tStylingKey) >= 0 && (tData[index + 1] = setTStylingRangeNextDuplicate(tData[index + 1]));
                            }(tNode, tStylingKey, tData, index, isClassBinding), tBindings = toTStylingRange(tmplHead, tmplTail), 
                            isClassBinding ? tNode.classBindings = tBindings : tNode.styleBindings = tBindings;
                        }(tData, tNode, tStylingKey, bindingIndex, isHostBindings, isClassBased);
                    }
                }(tView, prop, bindingIndex, isClassBased), value !== NO_CHANGE && bindingUpdated(lView, bindingIndex, value) && function updateStyling(tView, tNode, lView, renderer, prop, value, isClassBased, bindingIndex) {
                    if (!(3 & tNode.type)) return;
                    const tData = tView.data, tRange = tData[bindingIndex + 1];
                    isStylingValuePresent(function getTStylingRangeNextDuplicate(tStylingRange) {
                        return 1 == (1 & tStylingRange);
                    }(tRange) ? findStylingValue(tData, tNode, lView, prop, getTStylingRangeNext(tRange), isClassBased) : void 0) || (isStylingValuePresent(value) || function getTStylingRangePrevDuplicate(tStylingRange) {
                        return 2 == (2 & tStylingRange);
                    }(tRange) && (value = findStylingValue(tData, null, lView, prop, bindingIndex, isClassBased)), 
                    function applyStyling(renderer, isClassBased, rNode, prop, value) {
                        if (isClassBased) value ? renderer.addClass(rNode, prop) : renderer.removeClass(rNode, prop); else {
                            let flags = -1 === prop.indexOf("-") ? void 0 : RendererStyleFlags2.DashCase;
                            null == value ? renderer.removeStyle(rNode, prop, flags) : ("string" == typeof value && value.endsWith("!important") && (value = value.slice(0, -10), 
                            flags |= RendererStyleFlags2.Important), renderer.setStyle(rNode, prop, value, flags));
                        }
                    }(renderer, isClassBased, getNativeByIndex(getSelectedIndex(), lView), prop, value));
                }(tView, tView.data[getSelectedIndex()], lView, lView[11], prop, lView[bindingIndex + 1] = function normalizeSuffix(value, suffix) {
                    return null == value || ("string" == typeof suffix ? value += suffix : "object" == typeof value && (value = stringify(function unwrapSafeValue(value) {
                        return value instanceof class SafeValueImpl {
                            constructor(changingThisBreaksApplicationSecurity) {
                                this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
                            }
                            toString() {
                                return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
                            }
                        } ? value.changingThisBreaksApplicationSecurity : value;
                    }(value)))), value;
                }(value, suffix), isClassBased, bindingIndex);
            }(className, value, null, !0), ɵɵclassProp;
        }
        function collectStylingFromDirectives(hostDirectiveDef, tData, tNode, stylingKey, isClassBased) {
            let currentDirective = null;
            const directiveEnd = tNode.directiveEnd;
            let directiveStylingLast = tNode.directiveStylingLast;
            for (-1 === directiveStylingLast ? directiveStylingLast = tNode.directiveStart : directiveStylingLast++; directiveStylingLast < directiveEnd && (currentDirective = tData[directiveStylingLast], 
            stylingKey = collectStylingFromTAttrs(stylingKey, currentDirective.hostAttrs, isClassBased), 
            currentDirective !== hostDirectiveDef); ) directiveStylingLast++;
            return null !== hostDirectiveDef && (tNode.directiveStylingLast = directiveStylingLast), 
            stylingKey;
        }
        function collectStylingFromTAttrs(stylingKey, attrs, isClassBased) {
            const desiredMarker = isClassBased ? 1 : 2;
            let currentMarker = -1;
            if (null !== attrs) for (let i = 0; i < attrs.length; i++) {
                const item = attrs[i];
                "number" == typeof item ? currentMarker = item : currentMarker === desiredMarker && (Array.isArray(stylingKey) || (stylingKey = void 0 === stylingKey ? [] : [ "", stylingKey ]), 
                keyValueArraySet(stylingKey, item, !!isClassBased || attrs[++i]));
            }
            return void 0 === stylingKey ? null : stylingKey;
        }
        function findStylingValue(tData, tNode, lView, prop, index, isClassBased) {
            const isPrevDirection = null === tNode;
            let value;
            for (;index > 0; ) {
                const rawKey = tData[index], containsStatics = Array.isArray(rawKey), key = containsStatics ? rawKey[1] : rawKey, isStylingMap = null === key;
                let valueAtLViewIndex = lView[index + 1];
                valueAtLViewIndex === NO_CHANGE && (valueAtLViewIndex = isStylingMap ? EMPTY_ARRAY : void 0);
                let currentValue = isStylingMap ? keyValueArrayGet(valueAtLViewIndex, prop) : key === prop ? valueAtLViewIndex : void 0;
                if (containsStatics && !isStylingValuePresent(currentValue) && (currentValue = keyValueArrayGet(rawKey, prop)), 
                isStylingValuePresent(currentValue) && (value = currentValue, isPrevDirection)) return value;
                const tRange = tData[index + 1];
                index = isPrevDirection ? getTStylingRangePrev(tRange) : getTStylingRangeNext(tRange);
            }
            if (null !== tNode) {
                let residual = isClassBased ? tNode.residualClasses : tNode.residualStyles;
                null != residual && (value = keyValueArrayGet(residual, prop));
            }
            return value;
        }
        function isStylingValuePresent(value) {
            return void 0 !== value;
        }
        function ɵɵtext(index, value = "") {
            const lView = getLView(), tView = getTView(), adjustedIndex = index + 22, tNode = tView.firstCreatePass ? getOrCreateTNode(tView, adjustedIndex, 1, value, null) : tView.data[adjustedIndex], textNative = lView[adjustedIndex] = function createTextNode(renderer, value) {
                return renderer.createText(value);
            }(lView[11], value);
            appendChild(tView, lView, textNative, tNode), setCurrentTNode(tNode, !1);
        }
        function ɵɵtextInterpolate(v0) {
            return ɵɵtextInterpolate1("", v0, ""), ɵɵtextInterpolate;
        }
        function ɵɵtextInterpolate1(prefix, v0, suffix) {
            const lView = getLView(), interpolated = function interpolation1(lView, prefix, v0, suffix) {
                return bindingUpdated(lView, nextBindingIndex(), v0) ? prefix + renderStringify(v0) + suffix : NO_CHANGE;
            }(lView, prefix, v0, suffix);
            return interpolated !== NO_CHANGE && function textBindingInternal(lView, index, value) {
                const element = getNativeByIndex(index, lView);
                !function updateTextNode(renderer, rNode, value) {
                    renderer.setValue(rNode, value);
                }(lView[11], element, value);
            }(lView, getSelectedIndex(), interpolated), ɵɵtextInterpolate1;
        }
        let LOCALE_ID$1 = "en-US";
        function resolveProvider(provider, tInjectables, lInjectablesBlueprint, isComponent, isViewProvider) {
            if (provider = resolveForwardRef(provider), Array.isArray(provider)) for (let i = 0; i < provider.length; i++) resolveProvider(provider[i], tInjectables, lInjectablesBlueprint, isComponent, isViewProvider); else {
                const tView = getTView(), lView = getLView();
                let token = isTypeProvider(provider) ? provider : resolveForwardRef(provider.provide), providerFactory = providerToFactory(provider);
                const tNode = getCurrentTNode(), beginIndex = 1048575 & tNode.providerIndexes, endIndex = tNode.directiveStart, cptViewProvidersCount = tNode.providerIndexes >> 20;
                if (isTypeProvider(provider) || !provider.multi) {
                    const factory = new NodeInjectorFactory(providerFactory, isViewProvider, ɵɵdirectiveInject), existingFactoryIndex = indexOf(token, tInjectables, isViewProvider ? beginIndex : beginIndex + cptViewProvidersCount, endIndex);
                    -1 === existingFactoryIndex ? (diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, lView), tView, token), 
                    registerDestroyHooksIfSupported(tView, provider, tInjectables.length), tInjectables.push(token), 
                    tNode.directiveStart++, tNode.directiveEnd++, isViewProvider && (tNode.providerIndexes += 1048576), 
                    lInjectablesBlueprint.push(factory), lView.push(factory)) : (lInjectablesBlueprint[existingFactoryIndex] = factory, 
                    lView[existingFactoryIndex] = factory);
                } else {
                    const existingProvidersFactoryIndex = indexOf(token, tInjectables, beginIndex + cptViewProvidersCount, endIndex), existingViewProvidersFactoryIndex = indexOf(token, tInjectables, beginIndex, beginIndex + cptViewProvidersCount), doesProvidersFactoryExist = existingProvidersFactoryIndex >= 0 && lInjectablesBlueprint[existingProvidersFactoryIndex], doesViewProvidersFactoryExist = existingViewProvidersFactoryIndex >= 0 && lInjectablesBlueprint[existingViewProvidersFactoryIndex];
                    if (isViewProvider && !doesViewProvidersFactoryExist || !isViewProvider && !doesProvidersFactoryExist) {
                        diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, lView), tView, token);
                        const factory = function multiFactory(factoryFn, index, isViewProvider, isComponent, f) {
                            const factory = new NodeInjectorFactory(factoryFn, isViewProvider, ɵɵdirectiveInject);
                            return factory.multi = [], factory.index = index, factory.componentProviders = 0, 
                            multiFactoryAdd(factory, f, isComponent && !isViewProvider), factory;
                        }(isViewProvider ? multiViewProvidersFactoryResolver : multiProvidersFactoryResolver, lInjectablesBlueprint.length, isViewProvider, isComponent, providerFactory);
                        !isViewProvider && doesViewProvidersFactoryExist && (lInjectablesBlueprint[existingViewProvidersFactoryIndex].providerFactory = factory), 
                        registerDestroyHooksIfSupported(tView, provider, tInjectables.length, 0), tInjectables.push(token), 
                        tNode.directiveStart++, tNode.directiveEnd++, isViewProvider && (tNode.providerIndexes += 1048576), 
                        lInjectablesBlueprint.push(factory), lView.push(factory);
                    } else registerDestroyHooksIfSupported(tView, provider, existingProvidersFactoryIndex > -1 ? existingProvidersFactoryIndex : existingViewProvidersFactoryIndex, multiFactoryAdd(lInjectablesBlueprint[isViewProvider ? existingViewProvidersFactoryIndex : existingProvidersFactoryIndex], providerFactory, !isViewProvider && isComponent));
                    !isViewProvider && isComponent && doesViewProvidersFactoryExist && lInjectablesBlueprint[existingViewProvidersFactoryIndex].componentProviders++;
                }
            }
        }
        function registerDestroyHooksIfSupported(tView, provider, contextIndex, indexInFactory) {
            const providerIsTypeProvider = isTypeProvider(provider), providerIsClassProvider = function isClassProvider(value) {
                return !!value.useClass;
            }(provider);
            if (providerIsTypeProvider || providerIsClassProvider) {
                const ngOnDestroy = (providerIsClassProvider ? resolveForwardRef(provider.useClass) : provider).prototype.ngOnDestroy;
                if (ngOnDestroy) {
                    const hooks = tView.destroyHooks || (tView.destroyHooks = []);
                    if (!providerIsTypeProvider && provider.multi) {
                        const existingCallbacksIndex = hooks.indexOf(contextIndex);
                        -1 === existingCallbacksIndex ? hooks.push(contextIndex, [ indexInFactory, ngOnDestroy ]) : hooks[existingCallbacksIndex + 1].push(indexInFactory, ngOnDestroy);
                    } else hooks.push(contextIndex, ngOnDestroy);
                }
            }
        }
        function multiFactoryAdd(multiFactory2, factory, isComponentProvider) {
            return isComponentProvider && multiFactory2.componentProviders++, multiFactory2.multi.push(factory) - 1;
        }
        function indexOf(item, arr, begin, end) {
            for (let i = begin; i < end; i++) if (arr[i] === item) return i;
            return -1;
        }
        function multiProvidersFactoryResolver(_, tData, lData, tNode) {
            return multiResolve(this.multi, []);
        }
        function multiViewProvidersFactoryResolver(_, tData, lView, tNode) {
            const factories = this.multi;
            let result;
            if (this.providerFactory) {
                const componentCount = this.providerFactory.componentProviders, multiProviders = getNodeInjectable(lView, lView[1], this.providerFactory.index, tNode);
                result = multiProviders.slice(0, componentCount), multiResolve(factories, result);
                for (let i = componentCount; i < multiProviders.length; i++) result.push(multiProviders[i]);
            } else result = [], multiResolve(factories, result);
            return result;
        }
        function multiResolve(factories, result) {
            for (let i = 0; i < factories.length; i++) result.push((0, factories[i])());
            return result;
        }
        function ɵɵProvidersFeature(providers, viewProviders = []) {
            return definition => {
                definition.providersResolver = (def, processProvidersFn) => function providersResolver(def, providers, viewProviders) {
                    const tView = getTView();
                    if (tView.firstCreatePass) {
                        const isComponent = isComponentDef(def);
                        resolveProvider(viewProviders, tView.data, tView.blueprint, isComponent, !0), resolveProvider(providers, tView.data, tView.blueprint, isComponent, !1);
                    }
                }(def, processProvidersFn ? processProvidersFn(providers) : providers, viewProviders);
            };
        }
        class NgModuleRef$1 {}
        class NgModuleRef extends NgModuleRef$1 {
            constructor(ngModuleType, _parent) {
                super(), this._parent = _parent, this._bootstrapComponents = [], this.destroyCbs = [], 
                this.componentFactoryResolver = new ComponentFactoryResolver(this);
                const ngModuleDef = function getNgModuleDef(type, throwNotFound) {
                    const ngModuleDef = type[NG_MOD_DEF] || null;
                    if (!ngModuleDef && !0 === throwNotFound) throw new Error(`Type ${stringify(type)} does not have 'ɵmod' property.`);
                    return ngModuleDef;
                }(ngModuleType);
                this._bootstrapComponents = function maybeUnwrapFn(value) {
                    return value instanceof Function ? value() : value;
                }(ngModuleDef.bootstrap), this._r3Injector = createInjectorWithoutInjectorInstances(ngModuleType, _parent, [ {
                    provide: NgModuleRef$1,
                    useValue: this
                }, {
                    provide: ComponentFactoryResolver$1,
                    useValue: this.componentFactoryResolver
                } ], stringify(ngModuleType), new Set([ "environment" ])), this._r3Injector.resolveInjectorInitializers(), 
                this.instance = this._r3Injector.get(ngModuleType);
            }
            get injector() {
                return this._r3Injector;
            }
            destroy() {
                const injector = this._r3Injector;
                !injector.destroyed && injector.destroy(), this.destroyCbs.forEach(fn => fn()), 
                this.destroyCbs = null;
            }
            onDestroy(callback) {
                this.destroyCbs.push(callback);
            }
        }
        class NgModuleFactory extends class NgModuleFactory$1 {} {
            constructor(moduleType) {
                super(), this.moduleType = moduleType;
            }
            create(parentInjector) {
                return new NgModuleRef(this.moduleType, parentInjector);
            }
        }
        function _wrapInTimeout(fn) {
            return value => {
                setTimeout(fn, void 0, value);
            };
        }
        const core_EventEmitter = class EventEmitter_ extends Subject {
            constructor(isAsync = !1) {
                super(), this.__isAsync = isAsync;
            }
            emit(value) {
                super.next(value);
            }
            subscribe(observerOrNext, error, complete) {
                let nextFn = observerOrNext, errorFn = error || (() => null), completeFn = complete;
                if (observerOrNext && "object" == typeof observerOrNext) {
                    const observer = observerOrNext;
                    nextFn = observer.next?.bind(observer), errorFn = observer.error?.bind(observer), 
                    completeFn = observer.complete?.bind(observer);
                }
                this.__isAsync && (errorFn = _wrapInTimeout(errorFn), nextFn && (nextFn = _wrapInTimeout(nextFn)), 
                completeFn && (completeFn = _wrapInTimeout(completeFn)));
                const sink = super.subscribe({
                    next: nextFn,
                    error: errorFn,
                    complete: completeFn
                });
                return observerOrNext instanceof Subscription && observerOrNext.add(sink), sink;
            }
        };
        let TemplateRef = (() => {
            class TemplateRef2 {}
            return TemplateRef2.__NG_ELEMENT_ID__ = injectTemplateRef, TemplateRef2;
        })();
        const ViewEngineTemplateRef = TemplateRef, R3TemplateRef = class extends ViewEngineTemplateRef {
            constructor(_declarationLView, _declarationTContainer, elementRef) {
                super(), this._declarationLView = _declarationLView, this._declarationTContainer = _declarationTContainer, 
                this.elementRef = elementRef;
            }
            createEmbeddedView(context2, injector) {
                const embeddedTView = this._declarationTContainer.tViews, embeddedLView = createLView(this._declarationLView, embeddedTView, context2, 16, null, embeddedTView.declTNode, null, null, null, null, injector || null);
                embeddedLView[17] = this._declarationLView[this._declarationTContainer.index];
                const declarationViewLQueries = this._declarationLView[19];
                return null !== declarationViewLQueries && (embeddedLView[19] = declarationViewLQueries.createEmbeddedView(embeddedTView)), 
                renderView(embeddedTView, embeddedLView, context2), new ViewRef$1(embeddedLView);
            }
        };
        function injectTemplateRef() {
            return function createTemplateRef(hostTNode, hostLView) {
                return 4 & hostTNode.type ? new R3TemplateRef(hostLView, hostTNode, createElementRef(hostTNode, hostLView)) : null;
            }(getCurrentTNode(), getLView());
        }
        let ViewContainerRef = (() => {
            class ViewContainerRef2 {}
            return ViewContainerRef2.__NG_ELEMENT_ID__ = injectViewContainerRef, ViewContainerRef2;
        })();
        function injectViewContainerRef() {
            return function createContainerRef(hostTNode, hostLView) {
                let lContainer;
                const slotValue = hostLView[hostTNode.index];
                if (isLContainer(slotValue)) lContainer = slotValue; else {
                    let commentNode;
                    if (8 & hostTNode.type) commentNode = unwrapRNode(slotValue); else {
                        const renderer = hostLView[11];
                        commentNode = renderer.createComment("");
                        const hostNative = getNativeByTNode(hostTNode, hostLView);
                        nativeInsertBefore(renderer, nativeParentNode(renderer, hostNative), commentNode, function nativeNextSibling(renderer, node) {
                            return renderer.nextSibling(node);
                        }(renderer, hostNative), !1);
                    }
                    hostLView[hostTNode.index] = lContainer = createLContainer(slotValue, hostLView, commentNode, hostTNode), 
                    addToViewTree(hostLView, lContainer);
                }
                return new R3ViewContainerRef(lContainer, hostTNode, hostLView);
            }(getCurrentTNode(), getLView());
        }
        const VE_ViewContainerRef = ViewContainerRef, R3ViewContainerRef = class extends VE_ViewContainerRef {
            constructor(_lContainer, _hostTNode, _hostLView) {
                super(), this._lContainer = _lContainer, this._hostTNode = _hostTNode, this._hostLView = _hostLView;
            }
            get element() {
                return createElementRef(this._hostTNode, this._hostLView);
            }
            get injector() {
                return new NodeInjector(this._hostTNode, this._hostLView);
            }
            get parentInjector() {
                const parentLocation = getParentInjectorLocation(this._hostTNode, this._hostLView);
                if (hasParentInjector(parentLocation)) {
                    const parentView = getParentInjectorView(parentLocation, this._hostLView), injectorIndex = getParentInjectorIndex(parentLocation);
                    return new NodeInjector(parentView[1].data[injectorIndex + 8], parentView);
                }
                return new NodeInjector(null, this._hostLView);
            }
            clear() {
                for (;this.length > 0; ) this.remove(this.length - 1);
            }
            get(index) {
                const viewRefs = getViewRefs(this._lContainer);
                return null !== viewRefs && viewRefs[index] || null;
            }
            get length() {
                return this._lContainer.length - 10;
            }
            createEmbeddedView(templateRef, context2, indexOrOptions) {
                let index, injector;
                "number" == typeof indexOrOptions ? index = indexOrOptions : null != indexOrOptions && (index = indexOrOptions.index, 
                injector = indexOrOptions.injector);
                const viewRef = templateRef.createEmbeddedView(context2 || {}, injector);
                return this.insert(viewRef, index), viewRef;
            }
            createComponent(componentFactoryOrType, indexOrOptions, injector, projectableNodes, environmentInjector) {
                const isComponentFactory = componentFactoryOrType && !function isType(v) {
                    return "function" == typeof v;
                }(componentFactoryOrType);
                let index;
                if (isComponentFactory) index = indexOrOptions; else {
                    const options = indexOrOptions || {};
                    index = options.index, injector = options.injector, projectableNodes = options.projectableNodes, 
                    environmentInjector = options.environmentInjector || options.ngModuleRef;
                }
                const componentFactory = isComponentFactory ? componentFactoryOrType : new ComponentFactory(getComponentDef(componentFactoryOrType)), contextInjector = injector || this.parentInjector;
                if (!environmentInjector && null == componentFactory.ngModule) {
                    const result = (isComponentFactory ? contextInjector : this.parentInjector).get(EnvironmentInjector, null);
                    result && (environmentInjector = result);
                }
                const componentRef = componentFactory.create(contextInjector, projectableNodes, void 0, environmentInjector);
                return this.insert(componentRef.hostView, index), componentRef;
            }
            insert(viewRef, index) {
                const lView = viewRef._lView, tView = lView[1];
                if (function viewAttachedToContainer(view) {
                    return isLContainer(view[3]);
                }(lView)) {
                    const prevIdx = this.indexOf(viewRef);
                    if (-1 !== prevIdx) this.detach(prevIdx); else {
                        const prevLContainer = lView[3], prevVCRef = new R3ViewContainerRef(prevLContainer, prevLContainer[6], prevLContainer[3]);
                        prevVCRef.detach(prevVCRef.indexOf(viewRef));
                    }
                }
                const adjustedIdx = this._adjustIndex(index), lContainer = this._lContainer;
                !function insertView(tView, lView, lContainer, index) {
                    const indexInContainer = 10 + index, containerLength = lContainer.length;
                    index > 0 && (lContainer[indexInContainer - 1][4] = lView), index < containerLength - 10 ? (lView[4] = lContainer[indexInContainer], 
                    addToArray(lContainer, 10 + index, lView)) : (lContainer.push(lView), lView[4] = null), 
                    lView[3] = lContainer;
                    const declarationLContainer = lView[17];
                    null !== declarationLContainer && lContainer !== declarationLContainer && function trackMovedView(declarationContainer, lView) {
                        const movedViews = declarationContainer[9];
                        lView[16] !== lView[3][3][16] && (declarationContainer[2] = !0), null === movedViews ? declarationContainer[9] = [ lView ] : movedViews.push(lView);
                    }(declarationLContainer, lView);
                    const lQueries = lView[19];
                    null !== lQueries && lQueries.insertView(tView), lView[2] |= 64;
                }(tView, lView, lContainer, adjustedIdx);
                const beforeNode = getBeforeNodeForView(adjustedIdx, lContainer), renderer = lView[11], parentRNode = nativeParentNode(renderer, lContainer[7]);
                return null !== parentRNode && function addViewToContainer(tView, parentTNode, renderer, lView, parentNativeNode, beforeNode) {
                    lView[0] = parentNativeNode, lView[6] = parentTNode, applyView(tView, lView, renderer, 1, parentNativeNode, beforeNode);
                }(tView, lContainer[6], renderer, lView, parentRNode, beforeNode), viewRef.attachToViewContainerRef(), 
                addToArray(getOrCreateViewRefs(lContainer), adjustedIdx, viewRef), viewRef;
            }
            move(viewRef, newIndex) {
                return this.insert(viewRef, newIndex);
            }
            indexOf(viewRef) {
                const viewRefsArr = getViewRefs(this._lContainer);
                return null !== viewRefsArr ? viewRefsArr.indexOf(viewRef) : -1;
            }
            remove(index) {
                const adjustedIdx = this._adjustIndex(index, -1), detachedView = detachView(this._lContainer, adjustedIdx);
                detachedView && (removeFromArray(getOrCreateViewRefs(this._lContainer), adjustedIdx), 
                destroyLView(detachedView[1], detachedView));
            }
            detach(index) {
                const adjustedIdx = this._adjustIndex(index, -1), view = detachView(this._lContainer, adjustedIdx);
                return view && null != removeFromArray(getOrCreateViewRefs(this._lContainer), adjustedIdx) ? new ViewRef$1(view) : null;
            }
            _adjustIndex(index, shift = 0) {
                return index ?? this.length + shift;
            }
        };
        function getViewRefs(lContainer) {
            return lContainer[8];
        }
        function getOrCreateViewRefs(lContainer) {
            return lContainer[8] || (lContainer[8] = []);
        }
        function core_noop(...args) {}
        const APP_INITIALIZER = new InjectionToken("Application Initializer");
        let ApplicationInitStatus = (() => {
            class ApplicationInitStatus2 {
                constructor(appInits) {
                    this.appInits = appInits, this.resolve = core_noop, this.reject = core_noop, this.initialized = !1, 
                    this.done = !1, this.donePromise = new Promise((res, rej) => {
                        this.resolve = res, this.reject = rej;
                    });
                }
                runInitializers() {
                    if (this.initialized) return;
                    const asyncInitPromises = [], complete = () => {
                        this.done = !0, this.resolve();
                    };
                    if (this.appInits) for (let i = 0; i < this.appInits.length; i++) {
                        const initResult = this.appInits[i]();
                        if (core_isPromise(initResult)) asyncInitPromises.push(initResult); else if (isObservable(initResult)) {
                            const observableAsPromise = new Promise((resolve, reject) => {
                                initResult.subscribe({
                                    complete: resolve,
                                    error: reject
                                });
                            });
                            asyncInitPromises.push(observableAsPromise);
                        }
                    }
                    Promise.all(asyncInitPromises).then(() => {
                        complete();
                    }).catch(e => {
                        this.reject(e);
                    }), 0 === asyncInitPromises.length && complete(), this.initialized = !0;
                }
            }
            return ApplicationInitStatus2.ɵfac = function(t) {
                return new (t || ApplicationInitStatus2)(core_inject(APP_INITIALIZER, 8));
            }, ApplicationInitStatus2.ɵprov = core_defineInjectable({
                token: ApplicationInitStatus2,
                factory: ApplicationInitStatus2.ɵfac,
                providedIn: "root"
            }), ApplicationInitStatus2;
        })();
        const core_APP_ID = new InjectionToken("AppId", {
            providedIn: "root",
            factory: function _appIdRandomProviderFactory() {
                return `${_randomChar()}${_randomChar()}${_randomChar()}`;
            }
        });
        function _randomChar() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()));
        }
        const PLATFORM_INITIALIZER = new InjectionToken("Platform Initializer"), core_PLATFORM_ID = new InjectionToken("Platform ID", {
            providedIn: "platform",
            factory: () => "unknown"
        }), APP_BOOTSTRAP_LISTENER = new InjectionToken("appBootstrapListener"), LOCALE_ID = new InjectionToken("LocaleId", {
            providedIn: "root",
            factory: () => function fesm2020_core_inject(token, flags = InjectFlags.Default) {
                return "number" != typeof flags && (flags = 0 | (flags.optional && 8) | (flags.host && 1) | (flags.self && 2) | (flags.skipSelf && 4)), 
                core_inject(token, flags);
            }(LOCALE_ID, InjectFlags.Optional | InjectFlags.SkipSelf) || function getGlobalLocale() {
                return typeof $localize < "u" && $localize.locale || "en-US";
            }()
        }), promise = (() => Promise.resolve(0))();
        function scheduleMicroTask(fn) {
            typeof Zone > "u" ? promise.then(() => {
                fn && fn.apply(null, null);
            }) : Zone.current.scheduleMicroTask("scheduleMicrotask", fn);
        }
        class core_NgZone {
            constructor({enableLongStackTrace = !1, shouldCoalesceEventChangeDetection = !1, shouldCoalesceRunChangeDetection = !1}) {
                if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, 
                this.onUnstable = new core_EventEmitter(!1), this.onMicrotaskEmpty = new core_EventEmitter(!1), 
                this.onStable = new core_EventEmitter(!1), this.onError = new core_EventEmitter(!1), 
                typeof Zone > "u") throw new RuntimeError(908, !1);
                Zone.assertZonePatched();
                const self2 = this;
                if (self2._nesting = 0, self2._outer = self2._inner = Zone.current, Zone.AsyncStackTaggingZoneSpec) {
                    const AsyncStackTaggingZoneSpec = Zone.AsyncStackTaggingZoneSpec;
                    self2._inner = self2._inner.fork(new AsyncStackTaggingZoneSpec("Angular"));
                }
                Zone.TaskTrackingZoneSpec && (self2._inner = self2._inner.fork(new Zone.TaskTrackingZoneSpec)), 
                enableLongStackTrace && Zone.longStackTraceZoneSpec && (self2._inner = self2._inner.fork(Zone.longStackTraceZoneSpec)), 
                self2.shouldCoalesceEventChangeDetection = !shouldCoalesceRunChangeDetection && shouldCoalesceEventChangeDetection, 
                self2.shouldCoalesceRunChangeDetection = shouldCoalesceRunChangeDetection, self2.lastRequestAnimationFrameId = -1, 
                self2.nativeRequestAnimationFrame = function getNativeRequestAnimationFrame() {
                    let nativeRequestAnimationFrame = _global.requestAnimationFrame, nativeCancelAnimationFrame = _global.cancelAnimationFrame;
                    if (typeof Zone < "u" && nativeRequestAnimationFrame && nativeCancelAnimationFrame) {
                        const unpatchedRequestAnimationFrame = nativeRequestAnimationFrame[Zone.__symbol__("OriginalDelegate")];
                        unpatchedRequestAnimationFrame && (nativeRequestAnimationFrame = unpatchedRequestAnimationFrame);
                        const unpatchedCancelAnimationFrame = nativeCancelAnimationFrame[Zone.__symbol__("OriginalDelegate")];
                        unpatchedCancelAnimationFrame && (nativeCancelAnimationFrame = unpatchedCancelAnimationFrame);
                    }
                    return {
                        nativeRequestAnimationFrame,
                        nativeCancelAnimationFrame
                    };
                }().nativeRequestAnimationFrame, function forkInnerZoneWithAngularBehavior(zone) {
                    const delayChangeDetectionForEventsDelegate = () => {
                        !function delayChangeDetectionForEvents(zone) {
                            zone.isCheckStableRunning || -1 !== zone.lastRequestAnimationFrameId || (zone.lastRequestAnimationFrameId = zone.nativeRequestAnimationFrame.call(_global, () => {
                                zone.fakeTopEventTask || (zone.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                    zone.lastRequestAnimationFrameId = -1, updateMicroTaskStatus(zone), zone.isCheckStableRunning = !0, 
                                    checkStable(zone), zone.isCheckStableRunning = !1;
                                }, void 0, () => {}, () => {})), zone.fakeTopEventTask.invoke();
                            }), updateMicroTaskStatus(zone));
                        }(zone);
                    };
                    zone._inner = zone._inner.fork({
                        name: "angular",
                        properties: {
                            isAngularZone: !0
                        },
                        onInvokeTask: (delegate, current, target, task, applyThis, applyArgs) => {
                            try {
                                return onEnter(zone), delegate.invokeTask(target, task, applyThis, applyArgs);
                            } finally {
                                (zone.shouldCoalesceEventChangeDetection && "eventTask" === task.type || zone.shouldCoalesceRunChangeDetection) && delayChangeDetectionForEventsDelegate(), 
                                onLeave(zone);
                            }
                        },
                        onInvoke: (delegate, current, target, callback, applyThis, applyArgs, source) => {
                            try {
                                return onEnter(zone), delegate.invoke(target, callback, applyThis, applyArgs, source);
                            } finally {
                                zone.shouldCoalesceRunChangeDetection && delayChangeDetectionForEventsDelegate(), 
                                onLeave(zone);
                            }
                        },
                        onHasTask: (delegate, current, target, hasTaskState) => {
                            delegate.hasTask(target, hasTaskState), current === target && ("microTask" == hasTaskState.change ? (zone._hasPendingMicrotasks = hasTaskState.microTask, 
                            updateMicroTaskStatus(zone), checkStable(zone)) : "macroTask" == hasTaskState.change && (zone.hasPendingMacrotasks = hasTaskState.macroTask));
                        },
                        onHandleError: (delegate, current, target, error) => (delegate.handleError(target, error), 
                        zone.runOutsideAngular(() => zone.onError.emit(error)), !1)
                    });
                }(self2);
            }
            static isInAngularZone() {
                return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
            }
            static assertInAngularZone() {
                if (!core_NgZone.isInAngularZone()) throw new RuntimeError(909, !1);
            }
            static assertNotInAngularZone() {
                if (core_NgZone.isInAngularZone()) throw new RuntimeError(909, !1);
            }
            run(fn, applyThis, applyArgs) {
                return this._inner.run(fn, applyThis, applyArgs);
            }
            runTask(fn, applyThis, applyArgs, name) {
                const zone = this._inner, task = zone.scheduleEventTask("NgZoneEvent: " + name, fn, EMPTY_PAYLOAD, core_noop, core_noop);
                try {
                    return zone.runTask(task, applyThis, applyArgs);
                } finally {
                    zone.cancelTask(task);
                }
            }
            runGuarded(fn, applyThis, applyArgs) {
                return this._inner.runGuarded(fn, applyThis, applyArgs);
            }
            runOutsideAngular(fn) {
                return this._outer.run(fn);
            }
        }
        const EMPTY_PAYLOAD = {};
        function checkStable(zone) {
            if (0 == zone._nesting && !zone.hasPendingMicrotasks && !zone.isStable) try {
                zone._nesting++, zone.onMicrotaskEmpty.emit(null);
            } finally {
                if (zone._nesting--, !zone.hasPendingMicrotasks) try {
                    zone.runOutsideAngular(() => zone.onStable.emit(null));
                } finally {
                    zone.isStable = !0;
                }
            }
        }
        function updateMicroTaskStatus(zone) {
            zone.hasPendingMicrotasks = !!(zone._hasPendingMicrotasks || (zone.shouldCoalesceEventChangeDetection || zone.shouldCoalesceRunChangeDetection) && -1 !== zone.lastRequestAnimationFrameId);
        }
        function onEnter(zone) {
            zone._nesting++, zone.isStable && (zone.isStable = !1, zone.onUnstable.emit(null));
        }
        function onLeave(zone) {
            zone._nesting--, checkStable(zone);
        }
        class NoopNgZone {
            constructor() {
                this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, 
                this.onUnstable = new core_EventEmitter, this.onMicrotaskEmpty = new core_EventEmitter, 
                this.onStable = new core_EventEmitter, this.onError = new core_EventEmitter;
            }
            run(fn, applyThis, applyArgs) {
                return fn.apply(applyThis, applyArgs);
            }
            runGuarded(fn, applyThis, applyArgs) {
                return fn.apply(applyThis, applyArgs);
            }
            runOutsideAngular(fn) {
                return fn();
            }
            runTask(fn, applyThis, applyArgs, name) {
                return fn.apply(applyThis, applyArgs);
            }
        }
        const TESTABILITY = new InjectionToken(""), TESTABILITY_GETTER = new InjectionToken("");
        let _testabilityGetter, Testability = (() => {
            class Testability2 {
                constructor(_ngZone, registry, testabilityGetter) {
                    this._ngZone = _ngZone, this.registry = registry, this._pendingCount = 0, this._isZoneStable = !0, 
                    this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, _testabilityGetter || (function setTestabilityGetter(getter) {
                        _testabilityGetter = getter;
                    }(testabilityGetter), testabilityGetter.addToWindow(registry)), this._watchAngularEvents(), 
                    _ngZone.run(() => {
                        this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
                    });
                }
                _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                        next: () => {
                            this._didWork = !0, this._isZoneStable = !1;
                        }
                    }), this._ngZone.runOutsideAngular(() => {
                        this._ngZone.onStable.subscribe({
                            next: () => {
                                core_NgZone.assertNotInAngularZone(), scheduleMicroTask(() => {
                                    this._isZoneStable = !0, this._runCallbacksIfReady();
                                });
                            }
                        });
                    });
                }
                increasePendingRequestCount() {
                    return this._pendingCount += 1, this._didWork = !0, this._pendingCount;
                }
                decreasePendingRequestCount() {
                    if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                    return this._runCallbacksIfReady(), this._pendingCount;
                }
                isStable() {
                    return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
                }
                _runCallbacksIfReady() {
                    if (this.isStable()) scheduleMicroTask(() => {
                        for (;0 !== this._callbacks.length; ) {
                            let cb = this._callbacks.pop();
                            clearTimeout(cb.timeoutId), cb.doneCb(this._didWork);
                        }
                        this._didWork = !1;
                    }); else {
                        let pending = this.getPendingTasks();
                        this._callbacks = this._callbacks.filter(cb => !cb.updateCb || !cb.updateCb(pending) || (clearTimeout(cb.timeoutId), 
                        !1)), this._didWork = !0;
                    }
                }
                getPendingTasks() {
                    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(t => ({
                        source: t.source,
                        creationLocation: t.creationLocation,
                        data: t.data
                    })) : [];
                }
                addCallback(cb, timeout, updateCb) {
                    let timeoutId = -1;
                    timeout && timeout > 0 && (timeoutId = setTimeout(() => {
                        this._callbacks = this._callbacks.filter(cb2 => cb2.timeoutId !== timeoutId), cb(this._didWork, this.getPendingTasks());
                    }, timeout)), this._callbacks.push({
                        doneCb: cb,
                        timeoutId,
                        updateCb
                    });
                }
                whenStable(doneCb, timeout, updateCb) {
                    if (updateCb && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                    this.addCallback(doneCb, timeout, updateCb), this._runCallbacksIfReady();
                }
                getPendingRequestCount() {
                    return this._pendingCount;
                }
                registerApplication(token) {
                    this.registry.registerApplication(token, this);
                }
                unregisterApplication(token) {
                    this.registry.unregisterApplication(token);
                }
                findProviders(using, provider, exactMatch) {
                    return [];
                }
            }
            return Testability2.ɵfac = function(t) {
                return new (t || Testability2)(core_inject(core_NgZone), core_inject(TestabilityRegistry), core_inject(TESTABILITY_GETTER));
            }, Testability2.ɵprov = core_defineInjectable({
                token: Testability2,
                factory: Testability2.ɵfac
            }), Testability2;
        })(), TestabilityRegistry = (() => {
            class TestabilityRegistry2 {
                constructor() {
                    this._applications = new Map;
                }
                registerApplication(token, testability) {
                    this._applications.set(token, testability);
                }
                unregisterApplication(token) {
                    this._applications.delete(token);
                }
                unregisterAllApplications() {
                    this._applications.clear();
                }
                getTestability(elem) {
                    return this._applications.get(elem) || null;
                }
                getAllTestabilities() {
                    return Array.from(this._applications.values());
                }
                getAllRootElements() {
                    return Array.from(this._applications.keys());
                }
                findTestabilityInTree(elem, findInAncestors = !0) {
                    return _testabilityGetter?.findTestabilityInTree(this, elem, findInAncestors) ?? null;
                }
            }
            return TestabilityRegistry2.ɵfac = function(t) {
                return new (t || TestabilityRegistry2);
            }, TestabilityRegistry2.ɵprov = core_defineInjectable({
                token: TestabilityRegistry2,
                factory: TestabilityRegistry2.ɵfac,
                providedIn: "platform"
            }), TestabilityRegistry2;
        })(), _platformInjector = null;
        const ALLOW_MULTIPLE_PLATFORMS = new InjectionToken("AllowMultipleToken"), PLATFORM_DESTROY_LISTENERS = new InjectionToken("PlatformDestroyListeners");
        function createPlatformFactory(parentPlatformFactory, name, providers = []) {
            const desc = `Platform: ${name}`, marker = new InjectionToken(desc);
            return (extraProviders = []) => {
                let platform = getPlatform();
                if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, !1)) {
                    const platformProviders = [ ...providers, ...extraProviders, {
                        provide: marker,
                        useValue: !0
                    } ];
                    parentPlatformFactory ? parentPlatformFactory(platformProviders) : function createPlatform(injector) {
                        if (_platformInjector && !_platformInjector.get(ALLOW_MULTIPLE_PLATFORMS, !1)) throw new RuntimeError(400, !1);
                        _platformInjector = injector;
                        const platform = injector.get(PlatformRef);
                        (function runPlatformInitializers(injector) {
                            const inits = injector.get(PLATFORM_INITIALIZER, null);
                            inits && inits.forEach(init => init());
                        })(injector);
                    }(function createPlatformInjector(providers = [], name) {
                        return core_Injector.create({
                            name,
                            providers: [ {
                                provide: INJECTOR_SCOPE,
                                useValue: "platform"
                            }, {
                                provide: PLATFORM_DESTROY_LISTENERS,
                                useValue: new Set([ () => _platformInjector = null ])
                            }, ...providers ]
                        });
                    }(platformProviders, desc));
                }
                return function assertPlatform(requiredToken) {
                    const platform = getPlatform();
                    if (!platform) throw new RuntimeError(401, !1);
                    return platform;
                }();
            };
        }
        function getPlatform() {
            return _platformInjector?.get(PlatformRef) ?? null;
        }
        let PlatformRef = (() => {
            class PlatformRef2 {
                constructor(_injector) {
                    this._injector = _injector, this._modules = [], this._destroyListeners = [], this._destroyed = !1;
                }
                bootstrapModuleFactory(moduleFactory, options) {
                    const ngZone = function getNgZone(ngZoneToUse, options) {
                        let ngZone;
                        return ngZone = "noop" === ngZoneToUse ? new NoopNgZone : ("zone.js" === ngZoneToUse ? void 0 : ngZoneToUse) || new core_NgZone(options), 
                        ngZone;
                    }(options?.ngZone, function getNgZoneOptions(options) {
                        return {
                            enableLongStackTrace: !1,
                            shouldCoalesceEventChangeDetection: !(!options || !options.ngZoneEventCoalescing) || !1,
                            shouldCoalesceRunChangeDetection: !(!options || !options.ngZoneRunCoalescing) || !1
                        };
                    }(options)), providers = [ {
                        provide: core_NgZone,
                        useValue: ngZone
                    } ];
                    return ngZone.run(() => {
                        const ngZoneInjector = core_Injector.create({
                            providers,
                            parent: this.injector,
                            name: moduleFactory.moduleType.name
                        }), moduleRef = moduleFactory.create(ngZoneInjector), exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
                        if (!exceptionHandler) throw new RuntimeError(402, !1);
                        return ngZone.runOutsideAngular(() => {
                            const subscription = ngZone.onError.subscribe({
                                next: error => {
                                    exceptionHandler.handleError(error);
                                }
                            });
                            moduleRef.onDestroy(() => {
                                remove(this._modules, moduleRef), subscription.unsubscribe();
                            });
                        }), function _callAndReportToErrorHandler(errorHandler2, ngZone, callback) {
                            try {
                                const result = callback();
                                return core_isPromise(result) ? result.catch(e => {
                                    throw ngZone.runOutsideAngular(() => errorHandler2.handleError(e)), e;
                                }) : result;
                            } catch (e) {
                                throw ngZone.runOutsideAngular(() => errorHandler2.handleError(e)), e;
                            }
                        }(exceptionHandler, ngZone, () => {
                            const initStatus = moduleRef.injector.get(ApplicationInitStatus);
                            return initStatus.runInitializers(), initStatus.donePromise.then(() => (function setLocaleId(localeId) {
                                assertDefined(localeId, "Expected localeId to be defined"), "string" == typeof localeId && (LOCALE_ID$1 = localeId.toLowerCase().replace(/_/g, "-"));
                            }(moduleRef.injector.get(LOCALE_ID, "en-US") || "en-US"), this._moduleDoBootstrap(moduleRef), 
                            moduleRef));
                        });
                    });
                }
                bootstrapModule(moduleType, compilerOptions = []) {
                    const options = optionsReducer({}, compilerOptions);
                    return function compileNgModuleFactory(injector, options, moduleType) {
                        const moduleFactory = new NgModuleFactory(moduleType);
                        return Promise.resolve(moduleFactory);
                    }(0, 0, moduleType).then(moduleFactory => this.bootstrapModuleFactory(moduleFactory, options));
                }
                _moduleDoBootstrap(moduleRef) {
                    const appRef = moduleRef.injector.get(core_ApplicationRef);
                    if (moduleRef._bootstrapComponents.length > 0) moduleRef._bootstrapComponents.forEach(f => appRef.bootstrap(f)); else {
                        if (!moduleRef.instance.ngDoBootstrap) throw new RuntimeError(403, !1);
                        moduleRef.instance.ngDoBootstrap(appRef);
                    }
                    this._modules.push(moduleRef);
                }
                onDestroy(callback) {
                    this._destroyListeners.push(callback);
                }
                get injector() {
                    return this._injector;
                }
                destroy() {
                    if (this._destroyed) throw new RuntimeError(404, !1);
                    this._modules.slice().forEach(module => module.destroy()), this._destroyListeners.forEach(listener => listener());
                    const destroyListeners = this._injector.get(PLATFORM_DESTROY_LISTENERS, null);
                    destroyListeners && (destroyListeners.forEach(listener => listener()), destroyListeners.clear()), 
                    this._destroyed = !0;
                }
                get destroyed() {
                    return this._destroyed;
                }
            }
            return PlatformRef2.ɵfac = function(t) {
                return new (t || PlatformRef2)(core_inject(core_Injector));
            }, PlatformRef2.ɵprov = core_defineInjectable({
                token: PlatformRef2,
                factory: PlatformRef2.ɵfac,
                providedIn: "platform"
            }), PlatformRef2;
        })();
        function optionsReducer(dst, objs) {
            return Array.isArray(objs) ? objs.reduce(optionsReducer, dst) : {
                ...dst,
                ...objs
            };
        }
        let core_ApplicationRef = (() => {
            class ApplicationRef2 {
                constructor(_zone, _injector, _exceptionHandler) {
                    this._zone = _zone, this._injector = _injector, this._exceptionHandler = _exceptionHandler, 
                    this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._stable = !0, 
                    this._destroyed = !1, this._destroyListeners = [], this.componentTypes = [], this.components = [], 
                    this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                        next: () => {
                            this._zone.run(() => {
                                this.tick();
                            });
                        }
                    });
                    const isCurrentlyStable = new Observable_Observable(observer => {
                        this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, 
                        this._zone.runOutsideAngular(() => {
                            observer.next(this._stable), observer.complete();
                        });
                    }), isStable = new Observable_Observable(observer => {
                        let stableSub;
                        this._zone.runOutsideAngular(() => {
                            stableSub = this._zone.onStable.subscribe(() => {
                                core_NgZone.assertNotInAngularZone(), scheduleMicroTask(() => {
                                    !this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && (this._stable = !0, 
                                    observer.next(!0));
                                });
                            });
                        });
                        const unstableSub = this._zone.onUnstable.subscribe(() => {
                            core_NgZone.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                                observer.next(!1);
                            }));
                        });
                        return () => {
                            stableSub.unsubscribe(), unstableSub.unsubscribe();
                        };
                    });
                    this.isStable = function merge(...args) {
                        const scheduler = popScheduler(args), concurrent = function popNumber(args, defaultValue) {
                            return "number" == typeof last(args) ? args.pop() : defaultValue;
                        }(args, 1 / 0), sources = args;
                        return sources.length ? 1 === sources.length ? innerFrom(sources[0]) : function mergeAll(concurrent = 1 / 0) {
                            return mergeMap(identity, concurrent);
                        }(concurrent)(from(sources, scheduler)) : EMPTY;
                    }(isCurrentlyStable, isStable.pipe(function share(options = {}) {
                        const {connector = () => new Subject, resetOnError = !0, resetOnComplete = !0, resetOnRefCountZero = !0} = options;
                        return wrapperSource => {
                            let connection, resetConnection, subject, refCount = 0, hasCompleted = !1, hasErrored = !1;
                            const cancelReset = () => {
                                resetConnection?.unsubscribe(), resetConnection = void 0;
                            }, reset = () => {
                                cancelReset(), connection = subject = void 0, hasCompleted = hasErrored = !1;
                            }, resetAndUnsubscribe = () => {
                                const conn = connection;
                                reset(), conn?.unsubscribe();
                            };
                            return operate((source, subscriber) => {
                                refCount++, !hasErrored && !hasCompleted && cancelReset();
                                const dest = subject = subject ?? connector();
                                subscriber.add(() => {
                                    refCount--, 0 === refCount && !hasErrored && !hasCompleted && (resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero));
                                }), dest.subscribe(subscriber), !connection && refCount > 0 && (connection = new SafeSubscriber({
                                    next: value => dest.next(value),
                                    error: err => {
                                        hasErrored = !0, cancelReset(), resetConnection = handleReset(reset, resetOnError, err), 
                                        dest.error(err);
                                    },
                                    complete: () => {
                                        hasCompleted = !0, cancelReset(), resetConnection = handleReset(reset, resetOnComplete), 
                                        dest.complete();
                                    }
                                }), innerFrom(source).subscribe(connection));
                            })(wrapperSource);
                        };
                    }()));
                }
                get destroyed() {
                    return this._destroyed;
                }
                get injector() {
                    return this._injector;
                }
                bootstrap(componentOrFactory, rootSelectorOrNode) {
                    const isComponentFactory = componentOrFactory instanceof ComponentFactory$1;
                    if (!this._injector.get(ApplicationInitStatus).done) throw !isComponentFactory && function isStandalone(type) {
                        const def = getComponentDef(type) || getDirectiveDef(type) || getPipeDef$1(type);
                        return null !== def && def.standalone;
                    }(componentOrFactory), new RuntimeError(405, !1);
                    let componentFactory;
                    componentFactory = isComponentFactory ? componentOrFactory : this._injector.get(ComponentFactoryResolver$1).resolveComponentFactory(componentOrFactory), 
                    this.componentTypes.push(componentFactory.componentType);
                    const ngModule = function isBoundToModule(cf) {
                        return cf.isBoundToModule;
                    }(componentFactory) ? void 0 : this._injector.get(NgModuleRef$1), compRef = componentFactory.create(core_Injector.NULL, [], rootSelectorOrNode || componentFactory.selector, ngModule), nativeElement = compRef.location.nativeElement, testability = compRef.injector.get(TESTABILITY, null);
                    return testability?.registerApplication(nativeElement), compRef.onDestroy(() => {
                        this.detachView(compRef.hostView), remove(this.components, compRef), testability?.unregisterApplication(nativeElement);
                    }), this._loadComponent(compRef), compRef;
                }
                tick() {
                    if (this._runningTick) throw new RuntimeError(101, !1);
                    try {
                        this._runningTick = !0;
                        for (let view of this._views) view.detectChanges();
                    } catch (e) {
                        this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(e));
                    } finally {
                        this._runningTick = !1;
                    }
                }
                attachView(viewRef) {
                    const view = viewRef;
                    this._views.push(view), view.attachToAppRef(this);
                }
                detachView(viewRef) {
                    const view = viewRef;
                    remove(this._views, view), view.detachFromAppRef();
                }
                _loadComponent(componentRef) {
                    this.attachView(componentRef.hostView), this.tick(), this.components.push(componentRef), 
                    this._injector.get(APP_BOOTSTRAP_LISTENER, []).concat(this._bootstrapListeners).forEach(listener => listener(componentRef));
                }
                ngOnDestroy() {
                    if (!this._destroyed) try {
                        this._destroyListeners.forEach(listener => listener()), this._views.slice().forEach(view => view.destroy()), 
                        this._onMicrotaskEmptySubscription.unsubscribe();
                    } finally {
                        this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = [];
                    }
                }
                onDestroy(callback) {
                    return this._destroyListeners.push(callback), () => remove(this._destroyListeners, callback);
                }
                destroy() {
                    if (this._destroyed) throw new RuntimeError(406, !1);
                    const injector = this._injector;
                    injector.destroy && !injector.destroyed && injector.destroy();
                }
                get viewCount() {
                    return this._views.length;
                }
                warnIfDestroyed() {}
            }
            return ApplicationRef2.ɵfac = function(t) {
                return new (t || ApplicationRef2)(core_inject(core_NgZone), core_inject(EnvironmentInjector), core_inject(ErrorHandler));
            }, ApplicationRef2.ɵprov = core_defineInjectable({
                token: ApplicationRef2,
                factory: ApplicationRef2.ɵfac,
                providedIn: "root"
            }), ApplicationRef2;
        })();
        function remove(list, el) {
            const index = list.indexOf(el);
            index > -1 && list.splice(index, 1);
        }
        let ChangeDetectorRef = (() => {
            class ChangeDetectorRef2 {}
            return ChangeDetectorRef2.__NG_ELEMENT_ID__ = injectChangeDetectorRef, ChangeDetectorRef2;
        })();
        function injectChangeDetectorRef(flags) {
            return function createViewRef(tNode, lView, isPipe) {
                if (isComponentHost(tNode) && !isPipe) {
                    const componentView = getComponentLViewByIndex(tNode.index, lView);
                    return new ViewRef$1(componentView, componentView);
                }
                return 47 & tNode.type ? new ViewRef$1(lView[16], lView) : null;
            }(getCurrentTNode(), getLView(), 16 == (16 & flags));
        }
        class DefaultIterableDifferFactory {
            constructor() {}
            supports(obj) {
                return isListLikeIterable(obj);
            }
            create(trackByFn) {
                return new DefaultIterableDiffer(trackByFn);
            }
        }
        const trackByIdentity = (index, item) => item;
        class DefaultIterableDiffer {
            constructor(trackByFn) {
                this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, 
                this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, 
                this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, 
                this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = trackByFn || trackByIdentity;
            }
            forEachItem(fn) {
                let record;
                for (record = this._itHead; null !== record; record = record._next) fn(record);
            }
            forEachOperation(fn) {
                let nextIt = this._itHead, nextRemove = this._removalsHead, addRemoveOffset = 0, moveOffsets = null;
                for (;nextIt || nextRemove; ) {
                    const record = !nextRemove || nextIt && nextIt.currentIndex < getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ? nextIt : nextRemove, adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets), currentIndex = record.currentIndex;
                    if (record === nextRemove) addRemoveOffset--, nextRemove = nextRemove._nextRemoved; else if (nextIt = nextIt._next, 
                    null == record.previousIndex) addRemoveOffset++; else {
                        moveOffsets || (moveOffsets = []);
                        const localMovePreviousIndex = adjPreviousIndex - addRemoveOffset, localCurrentIndex = currentIndex - addRemoveOffset;
                        if (localMovePreviousIndex != localCurrentIndex) {
                            for (let i = 0; i < localMovePreviousIndex; i++) {
                                const offset = i < moveOffsets.length ? moveOffsets[i] : moveOffsets[i] = 0, index = offset + i;
                                localCurrentIndex <= index && index < localMovePreviousIndex && (moveOffsets[i] = offset + 1);
                            }
                            moveOffsets[record.previousIndex] = localCurrentIndex - localMovePreviousIndex;
                        }
                    }
                    adjPreviousIndex !== currentIndex && fn(record, adjPreviousIndex, currentIndex);
                }
            }
            forEachPreviousItem(fn) {
                let record;
                for (record = this._previousItHead; null !== record; record = record._nextPrevious) fn(record);
            }
            forEachAddedItem(fn) {
                let record;
                for (record = this._additionsHead; null !== record; record = record._nextAdded) fn(record);
            }
            forEachMovedItem(fn) {
                let record;
                for (record = this._movesHead; null !== record; record = record._nextMoved) fn(record);
            }
            forEachRemovedItem(fn) {
                let record;
                for (record = this._removalsHead; null !== record; record = record._nextRemoved) fn(record);
            }
            forEachIdentityChange(fn) {
                let record;
                for (record = this._identityChangesHead; null !== record; record = record._nextIdentityChange) fn(record);
            }
            diff(collection) {
                if (null == collection && (collection = []), !isListLikeIterable(collection)) throw new RuntimeError(900, !1);
                return this.check(collection) ? this : null;
            }
            onDestroy() {}
            check(collection) {
                this._reset();
                let index, item, itemTrackBy, record = this._itHead, mayBeDirty = !1;
                if (Array.isArray(collection)) {
                    this.length = collection.length;
                    for (let index2 = 0; index2 < this.length; index2++) item = collection[index2], 
                    itemTrackBy = this._trackByFn(index2, item), null !== record && Object.is(record.trackById, itemTrackBy) ? (mayBeDirty && (record = this._verifyReinsertion(record, item, itemTrackBy, index2)), 
                    Object.is(record.item, item) || this._addIdentityChange(record, item)) : (record = this._mismatch(record, item, itemTrackBy, index2), 
                    mayBeDirty = !0), record = record._next;
                } else index = 0, function iterateListLike(obj, fn) {
                    if (Array.isArray(obj)) for (let i = 0; i < obj.length; i++) fn(obj[i]); else {
                        const iterator = obj[core_getSymbolIterator()]();
                        let item;
                        for (;!(item = iterator.next()).done; ) fn(item.value);
                    }
                }(collection, item2 => {
                    itemTrackBy = this._trackByFn(index, item2), null !== record && Object.is(record.trackById, itemTrackBy) ? (mayBeDirty && (record = this._verifyReinsertion(record, item2, itemTrackBy, index)), 
                    Object.is(record.item, item2) || this._addIdentityChange(record, item2)) : (record = this._mismatch(record, item2, itemTrackBy, index), 
                    mayBeDirty = !0), record = record._next, index++;
                }), this.length = index;
                return this._truncate(record), this.collection = collection, this.isDirty;
            }
            get isDirty() {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead;
            }
            _reset() {
                if (this.isDirty) {
                    let record;
                    for (record = this._previousItHead = this._itHead; null !== record; record = record._next) record._nextPrevious = record._next;
                    for (record = this._additionsHead; null !== record; record = record._nextAdded) record.previousIndex = record.currentIndex;
                    for (this._additionsHead = this._additionsTail = null, record = this._movesHead; null !== record; record = record._nextMoved) record.previousIndex = record.currentIndex;
                    this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, 
                    this._identityChangesHead = this._identityChangesTail = null;
                }
            }
            _mismatch(record, item, itemTrackBy, index) {
                let previousRecord;
                return null === record ? previousRecord = this._itTail : (previousRecord = record._prev, 
                this._remove(record)), null !== (record = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(itemTrackBy, null)) ? (Object.is(record.item, item) || this._addIdentityChange(record, item), 
                this._reinsertAfter(record, previousRecord, index)) : null !== (record = null === this._linkedRecords ? null : this._linkedRecords.get(itemTrackBy, index)) ? (Object.is(record.item, item) || this._addIdentityChange(record, item), 
                this._moveAfter(record, previousRecord, index)) : record = this._addAfter(new IterableChangeRecord_(item, itemTrackBy), previousRecord, index), 
                record;
            }
            _verifyReinsertion(record, item, itemTrackBy, index) {
                let reinsertRecord = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(itemTrackBy, null);
                return null !== reinsertRecord ? record = this._reinsertAfter(reinsertRecord, record._prev, index) : record.currentIndex != index && (record.currentIndex = index, 
                this._addToMoves(record, index)), record;
            }
            _truncate(record) {
                for (;null !== record; ) {
                    const nextRecord = record._next;
                    this._addToRemovals(this._unlink(record)), record = nextRecord;
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), 
                null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), 
                null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
            }
            _reinsertAfter(record, prevRecord, index) {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(record);
                const prev = record._prevRemoved, next = record._nextRemoved;
                return null === prev ? this._removalsHead = next : prev._nextRemoved = next, null === next ? this._removalsTail = prev : next._prevRemoved = prev, 
                this._insertAfter(record, prevRecord, index), this._addToMoves(record, index), record;
            }
            _moveAfter(record, prevRecord, index) {
                return this._unlink(record), this._insertAfter(record, prevRecord, index), this._addToMoves(record, index), 
                record;
            }
            _addAfter(record, prevRecord, index) {
                return this._insertAfter(record, prevRecord, index), this._additionsTail = null === this._additionsTail ? this._additionsHead = record : this._additionsTail._nextAdded = record, 
                record;
            }
            _insertAfter(record, prevRecord, index) {
                const next = null === prevRecord ? this._itHead : prevRecord._next;
                return record._next = next, record._prev = prevRecord, null === next ? this._itTail = record : next._prev = record, 
                null === prevRecord ? this._itHead = record : prevRecord._next = record, null === this._linkedRecords && (this._linkedRecords = new _DuplicateMap), 
                this._linkedRecords.put(record), record.currentIndex = index, record;
            }
            _remove(record) {
                return this._addToRemovals(this._unlink(record));
            }
            _unlink(record) {
                null !== this._linkedRecords && this._linkedRecords.remove(record);
                const prev = record._prev, next = record._next;
                return null === prev ? this._itHead = next : prev._next = next, null === next ? this._itTail = prev : next._prev = prev, 
                record;
            }
            _addToMoves(record, toIndex) {
                return record.previousIndex === toIndex || (this._movesTail = null === this._movesTail ? this._movesHead = record : this._movesTail._nextMoved = record), 
                record;
            }
            _addToRemovals(record) {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new _DuplicateMap), 
                this._unlinkedRecords.put(record), record.currentIndex = null, record._nextRemoved = null, 
                null === this._removalsTail ? (this._removalsTail = this._removalsHead = record, 
                record._prevRemoved = null) : (record._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = record), 
                record;
            }
            _addIdentityChange(record, item) {
                return record.item = item, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = record : this._identityChangesTail._nextIdentityChange = record, 
                record;
            }
        }
        class IterableChangeRecord_ {
            constructor(item, trackById) {
                this.item = item, this.trackById = trackById, this.currentIndex = null, this.previousIndex = null, 
                this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, 
                this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, 
                this._nextMoved = null, this._nextIdentityChange = null;
            }
        }
        class _DuplicateItemRecordList {
            constructor() {
                this._head = null, this._tail = null;
            }
            add(record) {
                null === this._head ? (this._head = this._tail = record, record._nextDup = null, 
                record._prevDup = null) : (this._tail._nextDup = record, record._prevDup = this._tail, 
                record._nextDup = null, this._tail = record);
            }
            get(trackById, atOrAfterIndex) {
                let record;
                for (record = this._head; null !== record; record = record._nextDup) if ((null === atOrAfterIndex || atOrAfterIndex <= record.currentIndex) && Object.is(record.trackById, trackById)) return record;
                return null;
            }
            remove(record) {
                const prev = record._prevDup, next = record._nextDup;
                return null === prev ? this._head = next : prev._nextDup = next, null === next ? this._tail = prev : next._prevDup = prev, 
                null === this._head;
            }
        }
        class _DuplicateMap {
            constructor() {
                this.map = new Map;
            }
            put(record) {
                const key = record.trackById;
                let duplicates = this.map.get(key);
                duplicates || (duplicates = new _DuplicateItemRecordList, this.map.set(key, duplicates)), 
                duplicates.add(record);
            }
            get(trackById, atOrAfterIndex) {
                const recordList = this.map.get(trackById);
                return recordList ? recordList.get(trackById, atOrAfterIndex) : null;
            }
            remove(record) {
                const key = record.trackById;
                return this.map.get(key).remove(record) && this.map.delete(key), record;
            }
            get isEmpty() {
                return 0 === this.map.size;
            }
            clear() {
                this.map.clear();
            }
        }
        function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
            const previousIndex = item.previousIndex;
            if (null === previousIndex) return previousIndex;
            let moveOffset = 0;
            return moveOffsets && previousIndex < moveOffsets.length && (moveOffset = moveOffsets[previousIndex]), 
            previousIndex + addRemoveOffset + moveOffset;
        }
        function defaultIterableDiffersFactory() {
            return new IterableDiffers([ new DefaultIterableDifferFactory ]);
        }
        let IterableDiffers = (() => {
            class IterableDiffers2 {
                constructor(factories) {
                    this.factories = factories;
                }
                static create(factories, parent) {
                    if (null != parent) {
                        const copied = parent.factories.slice();
                        factories = factories.concat(copied);
                    }
                    return new IterableDiffers2(factories);
                }
                static extend(factories) {
                    return {
                        provide: IterableDiffers2,
                        useFactory: parent => IterableDiffers2.create(factories, parent || defaultIterableDiffersFactory()),
                        deps: [ [ IterableDiffers2, new SkipSelf, new core_Optional ] ]
                    };
                }
                find(iterable) {
                    const factory = this.factories.find(f => f.supports(iterable));
                    if (null != factory) return factory;
                    throw new RuntimeError(901, !1);
                }
            }
            return IterableDiffers2.ɵprov = core_defineInjectable({
                token: IterableDiffers2,
                providedIn: "root",
                factory: defaultIterableDiffersFactory
            }), IterableDiffers2;
        })();
        const platformCore = createPlatformFactory(null, "core", []);
        let ApplicationModule = (() => {
            class ApplicationModule2 {
                constructor(appRef) {}
            }
            return ApplicationModule2.ɵfac = function(t) {
                return new (t || ApplicationModule2)(core_inject(core_ApplicationRef));
            }, ApplicationModule2.ɵmod = ɵɵdefineNgModule({
                type: ApplicationModule2
            }), ApplicationModule2.ɵinj = ɵɵdefineInjector({}), ApplicationModule2;
        })();
        let _DOM = null;
        function getDOM() {
            return _DOM;
        }
        const common_DOCUMENT = new InjectionToken("DocumentToken");
        function parseCookieValue(cookieStr, name) {
            name = encodeURIComponent(name);
            for (const cookie of cookieStr.split(";")) {
                const eqIndex = cookie.indexOf("="), [cookieName, cookieValue] = -1 == eqIndex ? [ cookie, "" ] : [ cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1) ];
                if (cookieName.trim() === name) return decodeURIComponent(cookieValue);
            }
            return null;
        }
        class NgForOfContext {
            constructor($implicit, ngForOf, index, count) {
                this.$implicit = $implicit, this.ngForOf = ngForOf, this.index = index, this.count = count;
            }
            get first() {
                return 0 === this.index;
            }
            get last() {
                return this.index === this.count - 1;
            }
            get even() {
                return this.index % 2 == 0;
            }
            get odd() {
                return !this.even;
            }
        }
        let NgForOf = (() => {
            class NgForOf2 {
                constructor(_viewContainer, _template, _differs) {
                    this._viewContainer = _viewContainer, this._template = _template, this._differs = _differs, 
                    this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null;
                }
                set ngForOf(ngForOf) {
                    this._ngForOf = ngForOf, this._ngForOfDirty = !0;
                }
                set ngForTrackBy(fn) {
                    this._trackByFn = fn;
                }
                get ngForTrackBy() {
                    return this._trackByFn;
                }
                set ngForTemplate(value) {
                    value && (this._template = value);
                }
                ngDoCheck() {
                    if (this._ngForOfDirty) {
                        this._ngForOfDirty = !1;
                        const value = this._ngForOf;
                        !this._differ && value && (this._differ = this._differs.find(value).create(this.ngForTrackBy));
                    }
                    if (this._differ) {
                        const changes = this._differ.diff(this._ngForOf);
                        changes && this._applyChanges(changes);
                    }
                }
                _applyChanges(changes) {
                    const viewContainer = this._viewContainer;
                    changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
                        if (null == item.previousIndex) viewContainer.createEmbeddedView(this._template, new NgForOfContext(item.item, this._ngForOf, -1, -1), null === currentIndex ? void 0 : currentIndex); else if (null == currentIndex) viewContainer.remove(null === adjustedPreviousIndex ? void 0 : adjustedPreviousIndex); else if (null !== adjustedPreviousIndex) {
                            const view = viewContainer.get(adjustedPreviousIndex);
                            viewContainer.move(view, currentIndex), applyViewChange(view, item);
                        }
                    });
                    for (let i = 0, ilen = viewContainer.length; i < ilen; i++) {
                        const context2 = viewContainer.get(i).context;
                        context2.index = i, context2.count = ilen, context2.ngForOf = this._ngForOf;
                    }
                    changes.forEachIdentityChange(record => {
                        applyViewChange(viewContainer.get(record.currentIndex), record);
                    });
                }
                static ngTemplateContextGuard(dir, ctx) {
                    return !0;
                }
            }
            return NgForOf2.ɵfac = function(t) {
                return new (t || NgForOf2)(ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(IterableDiffers));
            }, NgForOf2.ɵdir = ɵɵdefineDirective({
                type: NgForOf2,
                selectors: [ [ "", "ngFor", "", "ngForOf", "" ] ],
                inputs: {
                    ngForOf: "ngForOf",
                    ngForTrackBy: "ngForTrackBy",
                    ngForTemplate: "ngForTemplate"
                },
                standalone: !0
            }), NgForOf2;
        })();
        function applyViewChange(view, record) {
            view.context.$implicit = record.item;
        }
        let NgIf = (() => {
            class NgIf2 {
                constructor(_viewContainer, templateRef) {
                    this._viewContainer = _viewContainer, this._context = new NgIfContext, this._thenTemplateRef = null, 
                    this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, 
                    this._thenTemplateRef = templateRef;
                }
                set ngIf(condition) {
                    this._context.$implicit = this._context.ngIf = condition, this._updateView();
                }
                set ngIfThen(templateRef) {
                    assertTemplate("ngIfThen", templateRef), this._thenTemplateRef = templateRef, this._thenViewRef = null, 
                    this._updateView();
                }
                set ngIfElse(templateRef) {
                    assertTemplate("ngIfElse", templateRef), this._elseTemplateRef = templateRef, this._elseViewRef = null, 
                    this._updateView();
                }
                _updateView() {
                    this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, 
                    this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), 
                    this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)));
                }
                static ngTemplateContextGuard(dir, ctx) {
                    return !0;
                }
            }
            return NgIf2.ɵfac = function(t) {
                return new (t || NgIf2)(ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(TemplateRef));
            }, NgIf2.ɵdir = ɵɵdefineDirective({
                type: NgIf2,
                selectors: [ [ "", "ngIf", "" ] ],
                inputs: {
                    ngIf: "ngIf",
                    ngIfThen: "ngIfThen",
                    ngIfElse: "ngIfElse"
                },
                standalone: !0
            }), NgIf2;
        })();
        class NgIfContext {
            constructor() {
                this.$implicit = null, this.ngIf = null;
            }
        }
        function assertTemplate(property, templateRef) {
            if (templateRef && !templateRef.createEmbeddedView) throw new Error(`${property} must be a TemplateRef, but received '${stringify(templateRef)}'.`);
        }
        let CommonModule = (() => {
            class CommonModule2 {}
            return CommonModule2.ɵfac = function(t) {
                return new (t || CommonModule2);
            }, CommonModule2.ɵmod = ɵɵdefineNgModule({
                type: CommonModule2
            }), CommonModule2.ɵinj = ɵɵdefineInjector({}), CommonModule2;
        })();
        class XhrFactory {}
        class BrowserDomAdapter extends class GenericBrowserDomAdapter extends class DomAdapter {} {
            constructor() {
                super(...arguments), this.supportsDOMEvents = !0;
            }
        } {
            static makeCurrent() {
                !function setRootDomAdapter(adapter) {
                    _DOM || (_DOM = adapter);
                }(new BrowserDomAdapter);
            }
            onAndCancel(el, evt, listener) {
                return el.addEventListener(evt, listener, !1), () => {
                    el.removeEventListener(evt, listener, !1);
                };
            }
            dispatchEvent(el, evt) {
                el.dispatchEvent(evt);
            }
            remove(node) {
                node.parentNode && node.parentNode.removeChild(node);
            }
            createElement(tagName, doc) {
                return (doc = doc || this.getDefaultDocument()).createElement(tagName);
            }
            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle");
            }
            getDefaultDocument() {
                return document;
            }
            isElementNode(node) {
                return node.nodeType === Node.ELEMENT_NODE;
            }
            isShadowRoot(node) {
                return node instanceof DocumentFragment;
            }
            getGlobalEventTarget(doc, target) {
                return "window" === target ? window : "document" === target ? doc : "body" === target ? doc.body : null;
            }
            getBaseHref(doc) {
                const href = function getBaseElementHref() {
                    return baseElement = baseElement || document.querySelector("base"), baseElement ? baseElement.getAttribute("href") : null;
                }();
                return null == href ? null : function relativePath(url) {
                    urlParsingNode = urlParsingNode || document.createElement("a"), urlParsingNode.setAttribute("href", url);
                    const pathName = urlParsingNode.pathname;
                    return "/" === pathName.charAt(0) ? pathName : `/${pathName}`;
                }(href);
            }
            resetBaseElement() {
                baseElement = null;
            }
            getUserAgent() {
                return window.navigator.userAgent;
            }
            getCookie(name) {
                return parseCookieValue(document.cookie, name);
            }
        }
        let urlParsingNode, baseElement = null;
        const TRANSITION_ID = new InjectionToken("TRANSITION_ID"), SERVER_TRANSITION_PROVIDERS = [ {
            provide: APP_INITIALIZER,
            useFactory: function appInitializerFactory(transitionId, document2, injector) {
                return () => {
                    injector.get(ApplicationInitStatus).donePromise.then(() => {
                        const dom = getDOM(), styles = document2.querySelectorAll(`style[ng-transition="${transitionId}"]`);
                        for (let i = 0; i < styles.length; i++) dom.remove(styles[i]);
                    });
                };
            },
            deps: [ TRANSITION_ID, common_DOCUMENT, core_Injector ],
            multi: !0
        } ];
        let BrowserXhr = (() => {
            class BrowserXhr2 {
                build() {
                    return new XMLHttpRequest;
                }
            }
            return BrowserXhr2.ɵfac = function(t) {
                return new (t || BrowserXhr2);
            }, BrowserXhr2.ɵprov = core_defineInjectable({
                token: BrowserXhr2,
                factory: BrowserXhr2.ɵfac
            }), BrowserXhr2;
        })();
        const EVENT_MANAGER_PLUGINS = new InjectionToken("EventManagerPlugins");
        let EventManager = (() => {
            class EventManager2 {
                constructor(plugins, _zone) {
                    this._zone = _zone, this._eventNameToPlugin = new Map, plugins.forEach(p => p.manager = this), 
                    this._plugins = plugins.slice().reverse();
                }
                addEventListener(element, eventName, handler) {
                    return this._findPluginFor(eventName).addEventListener(element, eventName, handler);
                }
                addGlobalEventListener(target, eventName, handler) {
                    return this._findPluginFor(eventName).addGlobalEventListener(target, eventName, handler);
                }
                getZone() {
                    return this._zone;
                }
                _findPluginFor(eventName) {
                    const plugin = this._eventNameToPlugin.get(eventName);
                    if (plugin) return plugin;
                    const plugins = this._plugins;
                    for (let i = 0; i < plugins.length; i++) {
                        const plugin2 = plugins[i];
                        if (plugin2.supports(eventName)) return this._eventNameToPlugin.set(eventName, plugin2), 
                        plugin2;
                    }
                    throw new Error(`No event manager plugin found for event ${eventName}`);
                }
            }
            return EventManager2.ɵfac = function(t) {
                return new (t || EventManager2)(core_inject(EVENT_MANAGER_PLUGINS), core_inject(core_NgZone));
            }, EventManager2.ɵprov = core_defineInjectable({
                token: EventManager2,
                factory: EventManager2.ɵfac
            }), EventManager2;
        })();
        class EventManagerPlugin {
            constructor(_doc) {
                this._doc = _doc;
            }
            addGlobalEventListener(element, eventName, handler) {
                const target = getDOM().getGlobalEventTarget(this._doc, element);
                if (!target) throw new Error(`Unsupported event target ${target} for event ${eventName}`);
                return this.addEventListener(target, eventName, handler);
            }
        }
        let SharedStylesHost = (() => {
            class SharedStylesHost2 {
                constructor() {
                    this._stylesSet = new Set;
                }
                addStyles(styles) {
                    const additions = new Set;
                    styles.forEach(style => {
                        this._stylesSet.has(style) || (this._stylesSet.add(style), additions.add(style));
                    }), this.onStylesAdded(additions);
                }
                onStylesAdded(additions) {}
                getAllStyles() {
                    return Array.from(this._stylesSet);
                }
            }
            return SharedStylesHost2.ɵfac = function(t) {
                return new (t || SharedStylesHost2);
            }, SharedStylesHost2.ɵprov = core_defineInjectable({
                token: SharedStylesHost2,
                factory: SharedStylesHost2.ɵfac
            }), SharedStylesHost2;
        })(), DomSharedStylesHost = (() => {
            class DomSharedStylesHost2 extends SharedStylesHost {
                constructor(_doc) {
                    super(), this._doc = _doc, this._hostNodes = new Map, this._hostNodes.set(_doc.head, []);
                }
                _addStylesToHost(styles, host, styleNodes) {
                    styles.forEach(style => {
                        const styleEl = this._doc.createElement("style");
                        styleEl.textContent = style, styleNodes.push(host.appendChild(styleEl));
                    });
                }
                addHost(hostNode) {
                    const styleNodes = [];
                    this._addStylesToHost(this._stylesSet, hostNode, styleNodes), this._hostNodes.set(hostNode, styleNodes);
                }
                removeHost(hostNode) {
                    const styleNodes = this._hostNodes.get(hostNode);
                    styleNodes && styleNodes.forEach(removeStyle), this._hostNodes.delete(hostNode);
                }
                onStylesAdded(additions) {
                    this._hostNodes.forEach((styleNodes, hostNode) => {
                        this._addStylesToHost(additions, hostNode, styleNodes);
                    });
                }
                ngOnDestroy() {
                    this._hostNodes.forEach(styleNodes => styleNodes.forEach(removeStyle));
                }
            }
            return DomSharedStylesHost2.ɵfac = function(t) {
                return new (t || DomSharedStylesHost2)(core_inject(common_DOCUMENT));
            }, DomSharedStylesHost2.ɵprov = core_defineInjectable({
                token: DomSharedStylesHost2,
                factory: DomSharedStylesHost2.ɵfac
            }), DomSharedStylesHost2;
        })();
        function removeStyle(styleNode) {
            getDOM().remove(styleNode);
        }
        const NAMESPACE_URIS = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/",
            math: "http://www.w3.org/1998/MathML/"
        }, COMPONENT_REGEX = /%COMP%/g;
        function flattenStyles(compId, styles, target) {
            for (let i = 0; i < styles.length; i++) {
                let style = styles[i];
                Array.isArray(style) ? flattenStyles(compId, style, target) : (style = style.replace(COMPONENT_REGEX, compId), 
                target.push(style));
            }
            return target;
        }
        function decoratePreventDefault(eventHandler) {
            return event => {
                if ("__ngUnwrap__" === event) return eventHandler;
                !1 === eventHandler(event) && (event.preventDefault(), event.returnValue = !1);
            };
        }
        let DomRendererFactory2 = (() => {
            class DomRendererFactory22 {
                constructor(eventManager, sharedStylesHost, appId) {
                    this.eventManager = eventManager, this.sharedStylesHost = sharedStylesHost, this.appId = appId, 
                    this.rendererByCompId = new Map, this.defaultRenderer = new DefaultDomRenderer2(eventManager);
                }
                createRenderer(element, type) {
                    if (!element || !type) return this.defaultRenderer;
                    switch (type.encapsulation) {
                      case ViewEncapsulation$1.Emulated:
                        {
                            let renderer = this.rendererByCompId.get(type.id);
                            return renderer || (renderer = new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type, this.appId), 
                            this.rendererByCompId.set(type.id, renderer)), renderer.applyToHost(element), renderer;
                        }

                      case 1:
                      case ViewEncapsulation$1.ShadowDom:
                        return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);

                      default:
                        if (!this.rendererByCompId.has(type.id)) {
                            const styles = flattenStyles(type.id, type.styles, []);
                            this.sharedStylesHost.addStyles(styles), this.rendererByCompId.set(type.id, this.defaultRenderer);
                        }
                        return this.defaultRenderer;
                    }
                }
                begin() {}
                end() {}
            }
            return DomRendererFactory22.ɵfac = function(t) {
                return new (t || DomRendererFactory22)(core_inject(EventManager), core_inject(DomSharedStylesHost), core_inject(core_APP_ID));
            }, DomRendererFactory22.ɵprov = core_defineInjectable({
                token: DomRendererFactory22,
                factory: DomRendererFactory22.ɵfac
            }), DomRendererFactory22;
        })();
        class DefaultDomRenderer2 {
            constructor(eventManager) {
                this.eventManager = eventManager, this.data = Object.create(null), this.destroyNode = null;
            }
            destroy() {}
            createElement(name, namespace) {
                return namespace ? document.createElementNS(NAMESPACE_URIS[namespace] || namespace, name) : document.createElement(name);
            }
            createComment(value) {
                return document.createComment(value);
            }
            createText(value) {
                return document.createTextNode(value);
            }
            appendChild(parent, newChild) {
                (platform_browser_isTemplateNode(parent) ? parent.content : parent).appendChild(newChild);
            }
            insertBefore(parent, newChild, refChild) {
                parent && (platform_browser_isTemplateNode(parent) ? parent.content : parent).insertBefore(newChild, refChild);
            }
            removeChild(parent, oldChild) {
                parent && parent.removeChild(oldChild);
            }
            selectRootElement(selectorOrNode, preserveContent) {
                let el = "string" == typeof selectorOrNode ? document.querySelector(selectorOrNode) : selectorOrNode;
                if (!el) throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
                return preserveContent || (el.textContent = ""), el;
            }
            parentNode(node) {
                return node.parentNode;
            }
            nextSibling(node) {
                return node.nextSibling;
            }
            setAttribute(el, name, value, namespace) {
                if (namespace) {
                    name = namespace + ":" + name;
                    const namespaceUri = NAMESPACE_URIS[namespace];
                    namespaceUri ? el.setAttributeNS(namespaceUri, name, value) : el.setAttribute(name, value);
                } else el.setAttribute(name, value);
            }
            removeAttribute(el, name, namespace) {
                if (namespace) {
                    const namespaceUri = NAMESPACE_URIS[namespace];
                    namespaceUri ? el.removeAttributeNS(namespaceUri, name) : el.removeAttribute(`${namespace}:${name}`);
                } else el.removeAttribute(name);
            }
            addClass(el, name) {
                el.classList.add(name);
            }
            removeClass(el, name) {
                el.classList.remove(name);
            }
            setStyle(el, style, value, flags) {
                flags & (RendererStyleFlags2.DashCase | RendererStyleFlags2.Important) ? el.style.setProperty(style, value, flags & RendererStyleFlags2.Important ? "important" : "") : el.style[style] = value;
            }
            removeStyle(el, style, flags) {
                flags & RendererStyleFlags2.DashCase ? el.style.removeProperty(style) : el.style[style] = "";
            }
            setProperty(el, name, value) {
                el[name] = value;
            }
            setValue(node, value) {
                node.nodeValue = value;
            }
            listen(target, event, callback) {
                return "string" == typeof target ? this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback)) : this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
            }
        }
        function platform_browser_isTemplateNode(node) {
            return "TEMPLATE" === node.tagName && void 0 !== node.content;
        }
        class EmulatedEncapsulationDomRenderer2 extends DefaultDomRenderer2 {
            constructor(eventManager, sharedStylesHost, component, appId) {
                super(eventManager), this.component = component;
                const styles = flattenStyles(appId + "-" + component.id, component.styles, []);
                sharedStylesHost.addStyles(styles), this.contentAttr = function shimContentAttribute(componentShortId) {
                    return "_ngcontent-%COMP%".replace(COMPONENT_REGEX, componentShortId);
                }(appId + "-" + component.id), this.hostAttr = function shimHostAttribute(componentShortId) {
                    return "_nghost-%COMP%".replace(COMPONENT_REGEX, componentShortId);
                }(appId + "-" + component.id);
            }
            applyToHost(element) {
                super.setAttribute(element, this.hostAttr, "");
            }
            createElement(parent, name) {
                const el = super.createElement(parent, name);
                return super.setAttribute(el, this.contentAttr, ""), el;
            }
        }
        class ShadowDomRenderer extends DefaultDomRenderer2 {
            constructor(eventManager, sharedStylesHost, hostEl, component) {
                super(eventManager), this.sharedStylesHost = sharedStylesHost, this.hostEl = hostEl, 
                this.shadowRoot = hostEl.attachShadow({
                    mode: "open"
                }), this.sharedStylesHost.addHost(this.shadowRoot);
                const styles = flattenStyles(component.id, component.styles, []);
                for (let i = 0; i < styles.length; i++) {
                    const styleEl = document.createElement("style");
                    styleEl.textContent = styles[i], this.shadowRoot.appendChild(styleEl);
                }
            }
            nodeOrShadowRoot(node) {
                return node === this.hostEl ? this.shadowRoot : node;
            }
            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot);
            }
            appendChild(parent, newChild) {
                return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
            }
            insertBefore(parent, newChild, refChild) {
                return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
            }
            removeChild(parent, oldChild) {
                return super.removeChild(this.nodeOrShadowRoot(parent), oldChild);
            }
            parentNode(node) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
            }
        }
        let DomEventsPlugin = (() => {
            class DomEventsPlugin2 extends EventManagerPlugin {
                constructor(doc) {
                    super(doc);
                }
                supports(eventName) {
                    return !0;
                }
                addEventListener(element, eventName, handler) {
                    return element.addEventListener(eventName, handler, !1), () => this.removeEventListener(element, eventName, handler);
                }
                removeEventListener(target, eventName, callback) {
                    return target.removeEventListener(eventName, callback);
                }
            }
            return DomEventsPlugin2.ɵfac = function(t) {
                return new (t || DomEventsPlugin2)(core_inject(common_DOCUMENT));
            }, DomEventsPlugin2.ɵprov = core_defineInjectable({
                token: DomEventsPlugin2,
                factory: DomEventsPlugin2.ɵfac
            }), DomEventsPlugin2;
        })();
        const MODIFIER_KEYS = [ "alt", "control", "meta", "shift" ], _keyMap = {
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
        }, MODIFIER_KEY_GETTERS = {
            alt: event => event.altKey,
            control: event => event.ctrlKey,
            meta: event => event.metaKey,
            shift: event => event.shiftKey
        };
        let KeyEventsPlugin = (() => {
            class KeyEventsPlugin2 extends EventManagerPlugin {
                constructor(doc) {
                    super(doc);
                }
                supports(eventName) {
                    return null != KeyEventsPlugin2.parseEventName(eventName);
                }
                addEventListener(element, eventName, handler) {
                    const parsedEvent = KeyEventsPlugin2.parseEventName(eventName), outsideHandler = KeyEventsPlugin2.eventCallback(parsedEvent.fullKey, handler, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(() => getDOM().onAndCancel(element, parsedEvent.domEventName, outsideHandler));
                }
                static parseEventName(eventName) {
                    const parts = eventName.toLowerCase().split("."), domEventName = parts.shift();
                    if (0 === parts.length || "keydown" !== domEventName && "keyup" !== domEventName) return null;
                    const key = KeyEventsPlugin2._normalizeKey(parts.pop());
                    let fullKey = "", codeIX = parts.indexOf("code");
                    if (codeIX > -1 && (parts.splice(codeIX, 1), fullKey = "code."), MODIFIER_KEYS.forEach(modifierName => {
                        const index = parts.indexOf(modifierName);
                        index > -1 && (parts.splice(index, 1), fullKey += modifierName + ".");
                    }), fullKey += key, 0 != parts.length || 0 === key.length) return null;
                    const result = {};
                    return result.domEventName = domEventName, result.fullKey = fullKey, result;
                }
                static matchEventFullKeyCode(event, fullKeyCode) {
                    let keycode = _keyMap[event.key] || event.key, key = "";
                    return fullKeyCode.indexOf("code.") > -1 && (keycode = event.code, key = "code."), 
                    !(null == keycode || !keycode) && (keycode = keycode.toLowerCase(), " " === keycode ? keycode = "space" : "." === keycode && (keycode = "dot"), 
                    MODIFIER_KEYS.forEach(modifierName => {
                        modifierName !== keycode && (0, MODIFIER_KEY_GETTERS[modifierName])(event) && (key += modifierName + ".");
                    }), key += keycode, key === fullKeyCode);
                }
                static eventCallback(fullKey, handler, zone) {
                    return event => {
                        KeyEventsPlugin2.matchEventFullKeyCode(event, fullKey) && zone.runGuarded(() => handler(event));
                    };
                }
                static _normalizeKey(keyName) {
                    return "esc" === keyName ? "escape" : keyName;
                }
            }
            return KeyEventsPlugin2.ɵfac = function(t) {
                return new (t || KeyEventsPlugin2)(core_inject(common_DOCUMENT));
            }, KeyEventsPlugin2.ɵprov = core_defineInjectable({
                token: KeyEventsPlugin2,
                factory: KeyEventsPlugin2.ɵfac
            }), KeyEventsPlugin2;
        })();
        const platformBrowser = createPlatformFactory(platformCore, "browser", [ {
            provide: core_PLATFORM_ID,
            useValue: "browser"
        }, {
            provide: PLATFORM_INITIALIZER,
            useValue: function initDomAdapter() {
                BrowserDomAdapter.makeCurrent();
            },
            multi: !0
        }, {
            provide: common_DOCUMENT,
            useFactory: function _document() {
                return function setDocument(document2) {
                    core_DOCUMENT = document2;
                }(document), document;
            },
            deps: []
        } ]), BROWSER_MODULE_PROVIDERS_MARKER = new InjectionToken(""), TESTABILITY_PROVIDERS = [ {
            provide: TESTABILITY_GETTER,
            useClass: class BrowserGetTestability {
                addToWindow(registry) {
                    _global.getAngularTestability = (elem, findInAncestors = !0) => {
                        const testability = registry.findTestabilityInTree(elem, findInAncestors);
                        if (null == testability) throw new Error("Could not find testability for element.");
                        return testability;
                    }, _global.getAllAngularTestabilities = () => registry.getAllTestabilities(), _global.getAllAngularRootElements = () => registry.getAllRootElements(), 
                    _global.frameworkStabilizers || (_global.frameworkStabilizers = []), _global.frameworkStabilizers.push(callback => {
                        const testabilities = _global.getAllAngularTestabilities();
                        let count = testabilities.length, didWork = !1;
                        const decrement = function(didWork_) {
                            didWork = didWork || didWork_, count--, 0 == count && callback(didWork);
                        };
                        testabilities.forEach(function(testability) {
                            testability.whenStable(decrement);
                        });
                    });
                }
                findTestabilityInTree(registry, elem, findInAncestors) {
                    return null == elem ? null : registry.getTestability(elem) ?? (findInAncestors ? getDOM().isShadowRoot(elem) ? this.findTestabilityInTree(registry, elem.host, !0) : this.findTestabilityInTree(registry, elem.parentElement, !0) : null);
                }
            },
            deps: []
        }, {
            provide: TESTABILITY,
            useClass: Testability,
            deps: [ core_NgZone, TestabilityRegistry, TESTABILITY_GETTER ]
        }, {
            provide: Testability,
            useClass: Testability,
            deps: [ core_NgZone, TestabilityRegistry, TESTABILITY_GETTER ]
        } ], BROWSER_MODULE_PROVIDERS = [ {
            provide: INJECTOR_SCOPE,
            useValue: "root"
        }, {
            provide: ErrorHandler,
            useFactory: function errorHandler() {
                return new ErrorHandler;
            },
            deps: []
        }, {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: DomEventsPlugin,
            multi: !0,
            deps: [ common_DOCUMENT, core_NgZone, core_PLATFORM_ID ]
        }, {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: KeyEventsPlugin,
            multi: !0,
            deps: [ common_DOCUMENT ]
        }, {
            provide: DomRendererFactory2,
            useClass: DomRendererFactory2,
            deps: [ EventManager, DomSharedStylesHost, core_APP_ID ]
        }, {
            provide: RendererFactory2,
            useExisting: DomRendererFactory2
        }, {
            provide: SharedStylesHost,
            useExisting: DomSharedStylesHost
        }, {
            provide: DomSharedStylesHost,
            useClass: DomSharedStylesHost,
            deps: [ common_DOCUMENT ]
        }, {
            provide: EventManager,
            useClass: EventManager,
            deps: [ EVENT_MANAGER_PLUGINS, core_NgZone ]
        }, {
            provide: XhrFactory,
            useClass: BrowserXhr,
            deps: []
        }, [] ];
        let BrowserModule = (() => {
            class BrowserModule2 {
                constructor(providersAlreadyPresent) {}
                static withServerTransition(params) {
                    return {
                        ngModule: BrowserModule2,
                        providers: [ {
                            provide: core_APP_ID,
                            useValue: params.appId
                        }, {
                            provide: TRANSITION_ID,
                            useExisting: core_APP_ID
                        }, SERVER_TRANSITION_PROVIDERS ]
                    };
                }
            }
            return BrowserModule2.ɵfac = function(t) {
                return new (t || BrowserModule2)(core_inject(BROWSER_MODULE_PROVIDERS_MARKER, 12));
            }, BrowserModule2.ɵmod = ɵɵdefineNgModule({
                type: BrowserModule2
            }), BrowserModule2.ɵinj = ɵɵdefineInjector({
                providers: [ ...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS ],
                imports: [ CommonModule, ApplicationModule ]
            }), BrowserModule2;
        })();
        typeof window < "u" && window;
        class HttpHandler {}
        class HttpBackend {}
        class HttpHeaders {
            constructor(headers) {
                this.normalizedNames = new Map, this.lazyUpdate = null, headers ? this.lazyInit = "string" == typeof headers ? () => {
                    this.headers = new Map, headers.split("\n").forEach(line => {
                        const index = line.indexOf(":");
                        if (index > 0) {
                            const name = line.slice(0, index), key = name.toLowerCase(), value = line.slice(index + 1).trim();
                            this.maybeSetNormalizedName(name, key), this.headers.has(key) ? this.headers.get(key).push(value) : this.headers.set(key, [ value ]);
                        }
                    });
                } : () => {
                    this.headers = new Map, Object.keys(headers).forEach(name => {
                        let values = headers[name];
                        const key = name.toLowerCase();
                        "string" == typeof values && (values = [ values ]), values.length > 0 && (this.headers.set(key, values), 
                        this.maybeSetNormalizedName(name, key));
                    });
                } : this.headers = new Map;
            }
            has(name) {
                return this.init(), this.headers.has(name.toLowerCase());
            }
            get(name) {
                this.init();
                const values = this.headers.get(name.toLowerCase());
                return values && values.length > 0 ? values[0] : null;
            }
            keys() {
                return this.init(), Array.from(this.normalizedNames.values());
            }
            getAll(name) {
                return this.init(), this.headers.get(name.toLowerCase()) || null;
            }
            append(name, value) {
                return this.clone({
                    name,
                    value,
                    op: "a"
                });
            }
            set(name, value) {
                return this.clone({
                    name,
                    value,
                    op: "s"
                });
            }
            delete(name, value) {
                return this.clone({
                    name,
                    value,
                    op: "d"
                });
            }
            maybeSetNormalizedName(name, lcName) {
                this.normalizedNames.has(lcName) || this.normalizedNames.set(lcName, name);
            }
            init() {
                this.lazyInit && (this.lazyInit instanceof HttpHeaders ? this.copyFrom(this.lazyInit) : this.lazyInit(), 
                this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(update => this.applyUpdate(update)), 
                this.lazyUpdate = null));
            }
            copyFrom(other) {
                other.init(), Array.from(other.headers.keys()).forEach(key => {
                    this.headers.set(key, other.headers.get(key)), this.normalizedNames.set(key, other.normalizedNames.get(key));
                });
            }
            clone(update) {
                const clone = new HttpHeaders;
                return clone.lazyInit = this.lazyInit && this.lazyInit instanceof HttpHeaders ? this.lazyInit : this, 
                clone.lazyUpdate = (this.lazyUpdate || []).concat([ update ]), clone;
            }
            applyUpdate(update) {
                const key = update.name.toLowerCase();
                switch (update.op) {
                  case "a":
                  case "s":
                    let value = update.value;
                    if ("string" == typeof value && (value = [ value ]), 0 === value.length) return;
                    this.maybeSetNormalizedName(update.name, key);
                    const base = ("a" === update.op ? this.headers.get(key) : void 0) || [];
                    base.push(...value), this.headers.set(key, base);
                    break;

                  case "d":
                    const toDelete = update.value;
                    if (toDelete) {
                        let existing = this.headers.get(key);
                        if (!existing) return;
                        existing = existing.filter(value2 => -1 === toDelete.indexOf(value2)), 0 === existing.length ? (this.headers.delete(key), 
                        this.normalizedNames.delete(key)) : this.headers.set(key, existing);
                    } else this.headers.delete(key), this.normalizedNames.delete(key);
                }
            }
            forEach(fn) {
                this.init(), Array.from(this.normalizedNames.keys()).forEach(key => fn(this.normalizedNames.get(key), this.headers.get(key)));
            }
        }
        class HttpUrlEncodingCodec {
            encodeKey(key) {
                return standardEncoding(key);
            }
            encodeValue(value) {
                return standardEncoding(value);
            }
            decodeKey(key) {
                return decodeURIComponent(key);
            }
            decodeValue(value) {
                return decodeURIComponent(value);
            }
        }
        const STANDARD_ENCODING_REGEX = /%(\d[a-f0-9])/gi, STANDARD_ENCODING_REPLACEMENTS = {
            40: "@",
            "3A": ":",
            24: "$",
            "2C": ",",
            "3B": ";",
            "3D": "=",
            "3F": "?",
            "2F": "/"
        };
        function standardEncoding(v) {
            return encodeURIComponent(v).replace(STANDARD_ENCODING_REGEX, (s, t) => STANDARD_ENCODING_REPLACEMENTS[t] ?? s);
        }
        function valueToString(value) {
            return `${value}`;
        }
        class HttpParams {
            constructor(options = {}) {
                if (this.updates = null, this.cloneFrom = null, this.encoder = options.encoder || new HttpUrlEncodingCodec, 
                options.fromString) {
                    if (options.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
                    this.map = function paramParser(rawParams, codec) {
                        const map2 = new Map;
                        return rawParams.length > 0 && rawParams.replace(/^\?/, "").split("&").forEach(param => {
                            const eqIdx = param.indexOf("="), [key, val] = -1 == eqIdx ? [ codec.decodeKey(param), "" ] : [ codec.decodeKey(param.slice(0, eqIdx)), codec.decodeValue(param.slice(eqIdx + 1)) ], list = map2.get(key) || [];
                            list.push(val), map2.set(key, list);
                        }), map2;
                    }(options.fromString, this.encoder);
                } else options.fromObject ? (this.map = new Map, Object.keys(options.fromObject).forEach(key => {
                    const value = options.fromObject[key], values = Array.isArray(value) ? value.map(valueToString) : [ valueToString(value) ];
                    this.map.set(key, values);
                })) : this.map = null;
            }
            has(param) {
                return this.init(), this.map.has(param);
            }
            get(param) {
                this.init();
                const res = this.map.get(param);
                return res ? res[0] : null;
            }
            getAll(param) {
                return this.init(), this.map.get(param) || null;
            }
            keys() {
                return this.init(), Array.from(this.map.keys());
            }
            append(param, value) {
                return this.clone({
                    param,
                    value,
                    op: "a"
                });
            }
            appendAll(params) {
                const updates = [];
                return Object.keys(params).forEach(param => {
                    const value = params[param];
                    Array.isArray(value) ? value.forEach(_value => {
                        updates.push({
                            param,
                            value: _value,
                            op: "a"
                        });
                    }) : updates.push({
                        param,
                        value,
                        op: "a"
                    });
                }), this.clone(updates);
            }
            set(param, value) {
                return this.clone({
                    param,
                    value,
                    op: "s"
                });
            }
            delete(param, value) {
                return this.clone({
                    param,
                    value,
                    op: "d"
                });
            }
            toString() {
                return this.init(), this.keys().map(key => {
                    const eKey = this.encoder.encodeKey(key);
                    return this.map.get(key).map(value => eKey + "=" + this.encoder.encodeValue(value)).join("&");
                }).filter(param => "" !== param).join("&");
            }
            clone(update) {
                const clone = new HttpParams({
                    encoder: this.encoder
                });
                return clone.cloneFrom = this.cloneFrom || this, clone.updates = (this.updates || []).concat(update), 
                clone;
            }
            init() {
                null === this.map && (this.map = new Map), null !== this.cloneFrom && (this.cloneFrom.init(), 
                this.cloneFrom.keys().forEach(key => this.map.set(key, this.cloneFrom.map.get(key))), 
                this.updates.forEach(update => {
                    switch (update.op) {
                      case "a":
                      case "s":
                        const base = ("a" === update.op ? this.map.get(update.param) : void 0) || [];
                        base.push(valueToString(update.value)), this.map.set(update.param, base);
                        break;

                      case "d":
                        if (void 0 === update.value) {
                            this.map.delete(update.param);
                            break;
                        }
                        {
                            let base2 = this.map.get(update.param) || [];
                            const idx = base2.indexOf(valueToString(update.value));
                            -1 !== idx && base2.splice(idx, 1), base2.length > 0 ? this.map.set(update.param, base2) : this.map.delete(update.param);
                        }
                    }
                }), this.cloneFrom = this.updates = null);
            }
        }
        class HttpContext {
            constructor() {
                this.map = new Map;
            }
            set(token, value) {
                return this.map.set(token, value), this;
            }
            get(token) {
                return this.map.has(token) || this.map.set(token, token.defaultValue()), this.map.get(token);
            }
            delete(token) {
                return this.map.delete(token), this;
            }
            has(token) {
                return this.map.has(token);
            }
            keys() {
                return this.map.keys();
            }
        }
        function isArrayBuffer(value) {
            return typeof ArrayBuffer < "u" && value instanceof ArrayBuffer;
        }
        function isBlob(value) {
            return typeof Blob < "u" && value instanceof Blob;
        }
        function isFormData(value) {
            return typeof FormData < "u" && value instanceof FormData;
        }
        class HttpRequest {
            constructor(method, url, third, fourth) {
                let options;
                if (this.url = url, this.body = null, this.reportProgress = !1, this.withCredentials = !1, 
                this.responseType = "json", this.method = method.toUpperCase(), function mightHaveBody(method) {
                    switch (method) {
                      case "DELETE":
                      case "GET":
                      case "HEAD":
                      case "OPTIONS":
                      case "JSONP":
                        return !1;

                      default:
                        return !0;
                    }
                }(this.method) || fourth ? (this.body = void 0 !== third ? third : null, options = fourth) : options = third, 
                options && (this.reportProgress = !!options.reportProgress, this.withCredentials = !!options.withCredentials, 
                options.responseType && (this.responseType = options.responseType), options.headers && (this.headers = options.headers), 
                options.context && (this.context = options.context), options.params && (this.params = options.params)), 
                this.headers || (this.headers = new HttpHeaders), this.context || (this.context = new HttpContext), 
                this.params) {
                    const params = this.params.toString();
                    if (0 === params.length) this.urlWithParams = url; else {
                        const qIdx = url.indexOf("?");
                        this.urlWithParams = url + (-1 === qIdx ? "?" : qIdx < url.length - 1 ? "&" : "") + params;
                    }
                } else this.params = new HttpParams, this.urlWithParams = url;
            }
            serializeBody() {
                return null === this.body ? null : isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) || function isUrlSearchParams(value) {
                    return typeof URLSearchParams < "u" && value instanceof URLSearchParams;
                }(this.body) || "string" == typeof this.body ? this.body : this.body instanceof HttpParams ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString();
            }
            detectContentTypeHeader() {
                return null === this.body || isFormData(this.body) ? null : isBlob(this.body) ? this.body.type || null : isArrayBuffer(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof HttpParams ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || "boolean" == typeof this.body ? "application/json" : null;
            }
            clone(update = {}) {
                const method = update.method || this.method, url = update.url || this.url, responseType = update.responseType || this.responseType, body = void 0 !== update.body ? update.body : this.body, withCredentials = void 0 !== update.withCredentials ? update.withCredentials : this.withCredentials, reportProgress = void 0 !== update.reportProgress ? update.reportProgress : this.reportProgress;
                let headers = update.headers || this.headers, params = update.params || this.params;
                const context2 = update.context ?? this.context;
                return void 0 !== update.setHeaders && (headers = Object.keys(update.setHeaders).reduce((headers2, name) => headers2.set(name, update.setHeaders[name]), headers)), 
                update.setParams && (params = Object.keys(update.setParams).reduce((params2, param) => params2.set(param, update.setParams[param]), params)), 
                new HttpRequest(method, url, body, {
                    params,
                    headers,
                    context: context2,
                    reportProgress,
                    responseType,
                    withCredentials
                });
            }
        }
        var HttpEventType = (() => ((HttpEventType = HttpEventType || {})[HttpEventType.Sent = 0] = "Sent", 
        HttpEventType[HttpEventType.UploadProgress = 1] = "UploadProgress", HttpEventType[HttpEventType.ResponseHeader = 2] = "ResponseHeader", 
        HttpEventType[HttpEventType.DownloadProgress = 3] = "DownloadProgress", HttpEventType[HttpEventType.Response = 4] = "Response", 
        HttpEventType[HttpEventType.User = 5] = "User", HttpEventType))();
        class HttpResponseBase {
            constructor(init, defaultStatus = 200, defaultStatusText = "OK") {
                this.headers = init.headers || new HttpHeaders, this.status = void 0 !== init.status ? init.status : defaultStatus, 
                this.statusText = init.statusText || defaultStatusText, this.url = init.url || null, 
                this.ok = this.status >= 200 && this.status < 300;
            }
        }
        class HttpHeaderResponse extends HttpResponseBase {
            constructor(init = {}) {
                super(init), this.type = HttpEventType.ResponseHeader;
            }
            clone(update = {}) {
                return new HttpHeaderResponse({
                    headers: update.headers || this.headers,
                    status: void 0 !== update.status ? update.status : this.status,
                    statusText: update.statusText || this.statusText,
                    url: update.url || this.url || void 0
                });
            }
        }
        class HttpResponse extends HttpResponseBase {
            constructor(init = {}) {
                super(init), this.type = HttpEventType.Response, this.body = void 0 !== init.body ? init.body : null;
            }
            clone(update = {}) {
                return new HttpResponse({
                    body: void 0 !== update.body ? update.body : this.body,
                    headers: update.headers || this.headers,
                    status: void 0 !== update.status ? update.status : this.status,
                    statusText: update.statusText || this.statusText,
                    url: update.url || this.url || void 0
                });
            }
        }
        class HttpErrorResponse extends HttpResponseBase {
            constructor(init) {
                super(init, 0, "Unknown Error"), this.name = "HttpErrorResponse", this.ok = !1, 
                this.message = this.status >= 200 && this.status < 300 ? `Http failure during parsing for ${init.url || "(unknown url)"}` : `Http failure response for ${init.url || "(unknown url)"}: ${init.status} ${init.statusText}`, 
                this.error = init.error || null;
            }
        }
        function addBody(options, body) {
            return {
                body,
                headers: options.headers,
                context: options.context,
                observe: options.observe,
                params: options.params,
                reportProgress: options.reportProgress,
                responseType: options.responseType,
                withCredentials: options.withCredentials
            };
        }
        let HttpClient = (() => {
            class HttpClient2 {
                constructor(handler) {
                    this.handler = handler;
                }
                request(first, url, options = {}) {
                    let req;
                    if (first instanceof HttpRequest) req = first; else {
                        let headers, params;
                        headers = options.headers instanceof HttpHeaders ? options.headers : new HttpHeaders(options.headers), 
                        options.params && (params = options.params instanceof HttpParams ? options.params : new HttpParams({
                            fromObject: options.params
                        })), req = new HttpRequest(first, url, void 0 !== options.body ? options.body : null, {
                            headers,
                            context: options.context,
                            params,
                            reportProgress: options.reportProgress,
                            responseType: options.responseType || "json",
                            withCredentials: options.withCredentials
                        });
                    }
                    const events$ = function of(...args) {
                        return from(args, popScheduler(args));
                    }(req).pipe(function concatMap(project, resultSelector) {
                        return isFunction(resultSelector) ? mergeMap(project, resultSelector, 1) : mergeMap(project, 1);
                    }(req2 => this.handler.handle(req2)));
                    if (first instanceof HttpRequest || "events" === options.observe) return events$;
                    const res$ = events$.pipe(function filter(predicate, thisArg) {
                        return operate((source, subscriber) => {
                            let index = 0;
                            source.subscribe(createOperatorSubscriber(subscriber, value => predicate.call(thisArg, value, index++) && subscriber.next(value)));
                        });
                    }(event => event instanceof HttpResponse));
                    switch (options.observe || "body") {
                      case "body":
                        switch (req.responseType) {
                          case "arraybuffer":
                            return res$.pipe(map(res => {
                                if (null !== res.body && !(res.body instanceof ArrayBuffer)) throw new Error("Response is not an ArrayBuffer.");
                                return res.body;
                            }));

                          case "blob":
                            return res$.pipe(map(res => {
                                if (null !== res.body && !(res.body instanceof Blob)) throw new Error("Response is not a Blob.");
                                return res.body;
                            }));

                          case "text":
                            return res$.pipe(map(res => {
                                if (null !== res.body && "string" != typeof res.body) throw new Error("Response is not a string.");
                                return res.body;
                            }));

                          default:
                            return res$.pipe(map(res => res.body));
                        }

                      case "response":
                        return res$;

                      default:
                        throw new Error(`Unreachable: unhandled observe type ${options.observe}}`);
                    }
                }
                delete(url, options = {}) {
                    return this.request("DELETE", url, options);
                }
                get(url, options = {}) {
                    return this.request("GET", url, options);
                }
                head(url, options = {}) {
                    return this.request("HEAD", url, options);
                }
                jsonp(url, callbackParam) {
                    return this.request("JSONP", url, {
                        params: (new HttpParams).append(callbackParam, "JSONP_CALLBACK"),
                        observe: "body",
                        responseType: "json"
                    });
                }
                options(url, options = {}) {
                    return this.request("OPTIONS", url, options);
                }
                patch(url, body, options = {}) {
                    return this.request("PATCH", url, addBody(options, body));
                }
                post(url, body, options = {}) {
                    return this.request("POST", url, addBody(options, body));
                }
                put(url, body, options = {}) {
                    return this.request("PUT", url, addBody(options, body));
                }
            }
            return HttpClient2.ɵfac = function(t) {
                return new (t || HttpClient2)(core_inject(HttpHandler));
            }, HttpClient2.ɵprov = core_defineInjectable({
                token: HttpClient2,
                factory: HttpClient2.ɵfac
            }), HttpClient2;
        })();
        class HttpInterceptorHandler {
            constructor(next, interceptor) {
                this.next = next, this.interceptor = interceptor;
            }
            handle(req) {
                return this.interceptor.intercept(req, this.next);
            }
        }
        const HTTP_INTERCEPTORS = new InjectionToken("HTTP_INTERCEPTORS");
        let NoopInterceptor = (() => {
            class NoopInterceptor2 {
                intercept(req, next) {
                    return next.handle(req);
                }
            }
            return NoopInterceptor2.ɵfac = function(t) {
                return new (t || NoopInterceptor2);
            }, NoopInterceptor2.ɵprov = core_defineInjectable({
                token: NoopInterceptor2,
                factory: NoopInterceptor2.ɵfac
            }), NoopInterceptor2;
        })();
        const XSSI_PREFIX = /^\)\]\}',?\n/;
        let HttpXhrBackend = (() => {
            class HttpXhrBackend2 {
                constructor(xhrFactory) {
                    this.xhrFactory = xhrFactory;
                }
                handle(req) {
                    if ("JSONP" === req.method) throw new Error("Attempted to construct Jsonp request without HttpClientJsonpModule installed.");
                    return new Observable_Observable(observer => {
                        const xhr = this.xhrFactory.build();
                        if (xhr.open(req.method, req.urlWithParams), req.withCredentials && (xhr.withCredentials = !0), 
                        req.headers.forEach((name, values) => xhr.setRequestHeader(name, values.join(","))), 
                        req.headers.has("Accept") || xhr.setRequestHeader("Accept", "application/json, text/plain, */*"), 
                        !req.headers.has("Content-Type")) {
                            const detectedType = req.detectContentTypeHeader();
                            null !== detectedType && xhr.setRequestHeader("Content-Type", detectedType);
                        }
                        if (req.responseType) {
                            const responseType = req.responseType.toLowerCase();
                            xhr.responseType = "json" !== responseType ? responseType : "text";
                        }
                        const reqBody = req.serializeBody();
                        let headerResponse = null;
                        const partialFromXhr = () => {
                            if (null !== headerResponse) return headerResponse;
                            const statusText = xhr.statusText || "OK", headers = new HttpHeaders(xhr.getAllResponseHeaders()), url = function getResponseUrl(xhr) {
                                return "responseURL" in xhr && xhr.responseURL ? xhr.responseURL : /^X-Request-URL:/m.test(xhr.getAllResponseHeaders()) ? xhr.getResponseHeader("X-Request-URL") : null;
                            }(xhr) || req.url;
                            return headerResponse = new HttpHeaderResponse({
                                headers,
                                status: xhr.status,
                                statusText,
                                url
                            }), headerResponse;
                        }, onLoad = () => {
                            let {headers, status, statusText, url} = partialFromXhr(), body = null;
                            204 !== status && (body = typeof xhr.response > "u" ? xhr.responseText : xhr.response), 
                            0 === status && (status = body ? 200 : 0);
                            let ok = status >= 200 && status < 300;
                            if ("json" === req.responseType && "string" == typeof body) {
                                const originalBody = body;
                                body = body.replace(XSSI_PREFIX, "");
                                try {
                                    body = "" !== body ? JSON.parse(body) : null;
                                } catch (error) {
                                    body = originalBody, ok && (ok = !1, body = {
                                        error,
                                        text: body
                                    });
                                }
                            }
                            ok ? (observer.next(new HttpResponse({
                                body,
                                headers,
                                status,
                                statusText,
                                url: url || void 0
                            })), observer.complete()) : observer.error(new HttpErrorResponse({
                                error: body,
                                headers,
                                status,
                                statusText,
                                url: url || void 0
                            }));
                        }, onError = error => {
                            const {url} = partialFromXhr(), res = new HttpErrorResponse({
                                error,
                                status: xhr.status || 0,
                                statusText: xhr.statusText || "Unknown Error",
                                url: url || void 0
                            });
                            observer.error(res);
                        };
                        let sentHeaders = !1;
                        const onDownProgress = event => {
                            sentHeaders || (observer.next(partialFromXhr()), sentHeaders = !0);
                            let progressEvent = {
                                type: HttpEventType.DownloadProgress,
                                loaded: event.loaded
                            };
                            event.lengthComputable && (progressEvent.total = event.total), "text" === req.responseType && !!xhr.responseText && (progressEvent.partialText = xhr.responseText), 
                            observer.next(progressEvent);
                        }, onUpProgress = event => {
                            let progress = {
                                type: HttpEventType.UploadProgress,
                                loaded: event.loaded
                            };
                            event.lengthComputable && (progress.total = event.total), observer.next(progress);
                        };
                        return xhr.addEventListener("load", onLoad), xhr.addEventListener("error", onError), 
                        xhr.addEventListener("timeout", onError), xhr.addEventListener("abort", onError), 
                        req.reportProgress && (xhr.addEventListener("progress", onDownProgress), null !== reqBody && xhr.upload && xhr.upload.addEventListener("progress", onUpProgress)), 
                        xhr.send(reqBody), observer.next({
                            type: HttpEventType.Sent
                        }), () => {
                            xhr.removeEventListener("error", onError), xhr.removeEventListener("abort", onError), 
                            xhr.removeEventListener("load", onLoad), xhr.removeEventListener("timeout", onError), 
                            req.reportProgress && (xhr.removeEventListener("progress", onDownProgress), null !== reqBody && xhr.upload && xhr.upload.removeEventListener("progress", onUpProgress)), 
                            xhr.readyState !== xhr.DONE && xhr.abort();
                        };
                    });
                }
            }
            return HttpXhrBackend2.ɵfac = function(t) {
                return new (t || HttpXhrBackend2)(core_inject(XhrFactory));
            }, HttpXhrBackend2.ɵprov = core_defineInjectable({
                token: HttpXhrBackend2,
                factory: HttpXhrBackend2.ɵfac
            }), HttpXhrBackend2;
        })();
        const XSRF_COOKIE_NAME = new InjectionToken("XSRF_COOKIE_NAME"), XSRF_HEADER_NAME = new InjectionToken("XSRF_HEADER_NAME");
        class HttpXsrfTokenExtractor {}
        let HttpXsrfCookieExtractor = (() => {
            class HttpXsrfCookieExtractor2 {
                constructor(doc, platform, cookieName) {
                    this.doc = doc, this.platform = platform, this.cookieName = cookieName, this.lastCookieString = "", 
                    this.lastToken = null, this.parseCount = 0;
                }
                getToken() {
                    if ("server" === this.platform) return null;
                    const cookieString = this.doc.cookie || "";
                    return cookieString !== this.lastCookieString && (this.parseCount++, this.lastToken = parseCookieValue(cookieString, this.cookieName), 
                    this.lastCookieString = cookieString), this.lastToken;
                }
            }
            return HttpXsrfCookieExtractor2.ɵfac = function(t) {
                return new (t || HttpXsrfCookieExtractor2)(core_inject(common_DOCUMENT), core_inject(core_PLATFORM_ID), core_inject(XSRF_COOKIE_NAME));
            }, HttpXsrfCookieExtractor2.ɵprov = core_defineInjectable({
                token: HttpXsrfCookieExtractor2,
                factory: HttpXsrfCookieExtractor2.ɵfac
            }), HttpXsrfCookieExtractor2;
        })(), HttpXsrfInterceptor = (() => {
            class HttpXsrfInterceptor2 {
                constructor(tokenService, headerName) {
                    this.tokenService = tokenService, this.headerName = headerName;
                }
                intercept(req, next) {
                    const lcUrl = req.url.toLowerCase();
                    if ("GET" === req.method || "HEAD" === req.method || lcUrl.startsWith("http://") || lcUrl.startsWith("https://")) return next.handle(req);
                    const token = this.tokenService.getToken();
                    return null !== token && !req.headers.has(this.headerName) && (req = req.clone({
                        headers: req.headers.set(this.headerName, token)
                    })), next.handle(req);
                }
            }
            return HttpXsrfInterceptor2.ɵfac = function(t) {
                return new (t || HttpXsrfInterceptor2)(core_inject(HttpXsrfTokenExtractor), core_inject(XSRF_HEADER_NAME));
            }, HttpXsrfInterceptor2.ɵprov = core_defineInjectable({
                token: HttpXsrfInterceptor2,
                factory: HttpXsrfInterceptor2.ɵfac
            }), HttpXsrfInterceptor2;
        })(), HttpInterceptingHandler = (() => {
            class HttpInterceptingHandler2 {
                constructor(backend, injector) {
                    this.backend = backend, this.injector = injector, this.chain = null;
                }
                handle(req) {
                    if (null === this.chain) {
                        const interceptors = this.injector.get(HTTP_INTERCEPTORS, []);
                        this.chain = interceptors.reduceRight((next, interceptor) => new HttpInterceptorHandler(next, interceptor), this.backend);
                    }
                    return this.chain.handle(req);
                }
            }
            return HttpInterceptingHandler2.ɵfac = function(t) {
                return new (t || HttpInterceptingHandler2)(core_inject(HttpBackend), core_inject(core_Injector));
            }, HttpInterceptingHandler2.ɵprov = core_defineInjectable({
                token: HttpInterceptingHandler2,
                factory: HttpInterceptingHandler2.ɵfac
            }), HttpInterceptingHandler2;
        })(), HttpClientXsrfModule = (() => {
            class HttpClientXsrfModule2 {
                static disable() {
                    return {
                        ngModule: HttpClientXsrfModule2,
                        providers: [ {
                            provide: HttpXsrfInterceptor,
                            useClass: NoopInterceptor
                        } ]
                    };
                }
                static withOptions(options = {}) {
                    return {
                        ngModule: HttpClientXsrfModule2,
                        providers: [ options.cookieName ? {
                            provide: XSRF_COOKIE_NAME,
                            useValue: options.cookieName
                        } : [], options.headerName ? {
                            provide: XSRF_HEADER_NAME,
                            useValue: options.headerName
                        } : [] ]
                    };
                }
            }
            return HttpClientXsrfModule2.ɵfac = function(t) {
                return new (t || HttpClientXsrfModule2);
            }, HttpClientXsrfModule2.ɵmod = ɵɵdefineNgModule({
                type: HttpClientXsrfModule2
            }), HttpClientXsrfModule2.ɵinj = ɵɵdefineInjector({
                providers: [ HttpXsrfInterceptor, {
                    provide: HTTP_INTERCEPTORS,
                    useExisting: HttpXsrfInterceptor,
                    multi: !0
                }, {
                    provide: HttpXsrfTokenExtractor,
                    useClass: HttpXsrfCookieExtractor
                }, {
                    provide: XSRF_COOKIE_NAME,
                    useValue: "XSRF-TOKEN"
                }, {
                    provide: XSRF_HEADER_NAME,
                    useValue: "X-XSRF-TOKEN"
                } ]
            }), HttpClientXsrfModule2;
        })(), HttpClientModule = (() => {
            class HttpClientModule2 {}
            return HttpClientModule2.ɵfac = function(t) {
                return new (t || HttpClientModule2);
            }, HttpClientModule2.ɵmod = ɵɵdefineNgModule({
                type: HttpClientModule2
            }), HttpClientModule2.ɵinj = ɵɵdefineInjector({
                providers: [ HttpClient, {
                    provide: HttpHandler,
                    useClass: HttpInterceptingHandler
                }, HttpXhrBackend, {
                    provide: HttpBackend,
                    useExisting: HttpXhrBackend
                } ],
                imports: [ HttpClientXsrfModule.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN"
                }) ]
            }), HttpClientModule2;
        })();
        const {isArray} = Array, {getPrototypeOf, prototype: objectProto, keys: getKeys} = Object;
        const {isArray: mapOneOrManyArgs_isArray} = Array;
        function createObject(keys, values) {
            return keys.reduce((result, key, i) => (result[key] = values[i], result), {});
        }
        function forkJoin(...args) {
            const resultSelector = function popResultSelector(args) {
                return isFunction(last(args)) ? args.pop() : void 0;
            }(args), {args: sources, keys} = function argsArgArrayOrObject(args) {
                if (1 === args.length) {
                    const first = args[0];
                    if (isArray(first)) return {
                        args: first,
                        keys: null
                    };
                    if (function isPOJO(obj) {
                        return obj && "object" == typeof obj && getPrototypeOf(obj) === objectProto;
                    }(first)) {
                        const keys = getKeys(first);
                        return {
                            args: keys.map(key => first[key]),
                            keys
                        };
                    }
                }
                return {
                    args,
                    keys: null
                };
            }(args), result = new Observable_Observable(subscriber => {
                const {length} = sources;
                if (!length) return void subscriber.complete();
                const values = new Array(length);
                let remainingCompletions = length, remainingEmissions = length;
                for (let sourceIndex = 0; sourceIndex < length; sourceIndex++) {
                    let hasValue = !1;
                    innerFrom(sources[sourceIndex]).subscribe(createOperatorSubscriber(subscriber, value => {
                        hasValue || (hasValue = !0, remainingEmissions--), values[sourceIndex] = value;
                    }, () => remainingCompletions--, void 0, () => {
                        (!remainingCompletions || !hasValue) && (remainingEmissions || subscriber.next(keys ? createObject(keys, values) : values), 
                        subscriber.complete());
                    }));
                }
            });
            return resultSelector ? result.pipe(function mapOneOrManyArgs(fn) {
                return map(args => function callOrApply(fn, args) {
                    return mapOneOrManyArgs_isArray(args) ? fn(...args) : fn(args);
                }(fn, args));
            }(resultSelector)) : result;
        }
        let BaseControlValueAccessor = (() => {
            class BaseControlValueAccessor2 {
                constructor(_renderer, _elementRef) {
                    this._renderer = _renderer, this._elementRef = _elementRef, this.onChange = _ => {}, 
                    this.onTouched = () => {};
                }
                setProperty(key, value) {
                    this._renderer.setProperty(this._elementRef.nativeElement, key, value);
                }
                registerOnTouched(fn) {
                    this.onTouched = fn;
                }
                registerOnChange(fn) {
                    this.onChange = fn;
                }
                setDisabledState(isDisabled) {
                    this.setProperty("disabled", isDisabled);
                }
            }
            return BaseControlValueAccessor2.ɵfac = function(t) {
                return new (t || BaseControlValueAccessor2)(ɵɵdirectiveInject(core_Renderer2), ɵɵdirectiveInject(core_ElementRef));
            }, BaseControlValueAccessor2.ɵdir = ɵɵdefineDirective({
                type: BaseControlValueAccessor2
            }), BaseControlValueAccessor2;
        })(), BuiltInControlValueAccessor = (() => {
            class BuiltInControlValueAccessor2 extends BaseControlValueAccessor {}
            return BuiltInControlValueAccessor2.ɵfac = function() {
                let ɵBuiltInControlValueAccessor_BaseFactory;
                return function(t) {
                    return (ɵBuiltInControlValueAccessor_BaseFactory || (ɵBuiltInControlValueAccessor_BaseFactory = function ɵɵgetInheritedFactory(type) {
                        return noSideEffects(() => {
                            const ownConstructor = type.prototype.constructor, ownFactory = ownConstructor[NG_FACTORY_DEF] || getFactoryOf(ownConstructor), objectPrototype = Object.prototype;
                            let parent = Object.getPrototypeOf(type.prototype).constructor;
                            for (;parent && parent !== objectPrototype; ) {
                                const factory = parent[NG_FACTORY_DEF] || getFactoryOf(parent);
                                if (factory && factory !== ownFactory) return factory;
                                parent = Object.getPrototypeOf(parent);
                            }
                            return t => new t;
                        });
                    }(BuiltInControlValueAccessor2)))(t || BuiltInControlValueAccessor2);
                };
            }(), BuiltInControlValueAccessor2.ɵdir = ɵɵdefineDirective({
                type: BuiltInControlValueAccessor2,
                features: [ ɵɵInheritDefinitionFeature ]
            }), BuiltInControlValueAccessor2;
        })();
        const NG_VALUE_ACCESSOR = new InjectionToken("NgValueAccessor"), DEFAULT_VALUE_ACCESSOR = {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DefaultValueAccessor),
            multi: !0
        }, COMPOSITION_BUFFER_MODE = new InjectionToken("CompositionEventMode");
        let DefaultValueAccessor = (() => {
            class DefaultValueAccessor2 extends BaseControlValueAccessor {
                constructor(renderer, elementRef, _compositionMode) {
                    super(renderer, elementRef), this._compositionMode = _compositionMode, this._composing = !1, 
                    null == this._compositionMode && (this._compositionMode = !function _isAndroid() {
                        const userAgent = getDOM() ? getDOM().getUserAgent() : "";
                        return /android (\d+)/.test(userAgent.toLowerCase());
                    }());
                }
                writeValue(value) {
                    this.setProperty("value", value ?? "");
                }
                _handleInput(value) {
                    (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(value);
                }
                _compositionStart() {
                    this._composing = !0;
                }
                _compositionEnd(value) {
                    this._composing = !1, this._compositionMode && this.onChange(value);
                }
            }
            return DefaultValueAccessor2.ɵfac = function(t) {
                return new (t || DefaultValueAccessor2)(ɵɵdirectiveInject(core_Renderer2), ɵɵdirectiveInject(core_ElementRef), ɵɵdirectiveInject(COMPOSITION_BUFFER_MODE, 8));
            }, DefaultValueAccessor2.ɵdir = ɵɵdefineDirective({
                type: DefaultValueAccessor2,
                selectors: [ [ "input", "formControlName", "", 3, "type", "checkbox" ], [ "textarea", "formControlName", "" ], [ "input", "formControl", "", 3, "type", "checkbox" ], [ "textarea", "formControl", "" ], [ "input", "ngModel", "", 3, "type", "checkbox" ], [ "textarea", "ngModel", "" ], [ "", "ngDefaultControl", "" ] ],
                hostBindings: function(rf, ctx) {
                    1 & rf && ɵɵlistener("input", function($event) {
                        return ctx._handleInput($event.target.value);
                    })("blur", function() {
                        return ctx.onTouched();
                    })("compositionstart", function() {
                        return ctx._compositionStart();
                    })("compositionend", function($event) {
                        return ctx._compositionEnd($event.target.value);
                    });
                },
                features: [ ɵɵProvidersFeature([ DEFAULT_VALUE_ACCESSOR ]), ɵɵInheritDefinitionFeature ]
            }), DefaultValueAccessor2;
        })();
        const NG_VALIDATORS = new InjectionToken("NgValidators"), NG_ASYNC_VALIDATORS = new InjectionToken("NgAsyncValidators");
        function isPresent(o) {
            return null != o;
        }
        function toObservable(value) {
            return core_isPromise(value) ? from(value) : value;
        }
        function mergeErrors(arrayOfErrors) {
            let res = {};
            return arrayOfErrors.forEach(errors => {
                res = null != errors ? {
                    ...res,
                    ...errors
                } : res;
            }), 0 === Object.keys(res).length ? null : res;
        }
        function executeValidators(control, validators) {
            return validators.map(validator => validator(control));
        }
        function normalizeValidators(validators) {
            return validators.map(validator => function isValidatorFn(validator) {
                return !validator.validate;
            }(validator) ? validator : c => validator.validate(c));
        }
        function composeValidators(validators) {
            return null != validators ? function compose(validators) {
                if (!validators) return null;
                const presentValidators = validators.filter(isPresent);
                return 0 == presentValidators.length ? null : function(control) {
                    return mergeErrors(executeValidators(control, presentValidators));
                };
            }(normalizeValidators(validators)) : null;
        }
        function composeAsyncValidators(validators) {
            return null != validators ? function composeAsync(validators) {
                if (!validators) return null;
                const presentValidators = validators.filter(isPresent);
                return 0 == presentValidators.length ? null : function(control) {
                    return forkJoin(executeValidators(control, presentValidators).map(toObservable)).pipe(map(mergeErrors));
                };
            }(normalizeValidators(validators)) : null;
        }
        function mergeValidators(controlValidators, dirValidator) {
            return null === controlValidators ? [ dirValidator ] : Array.isArray(controlValidators) ? [ ...controlValidators, dirValidator ] : [ controlValidators, dirValidator ];
        }
        function makeValidatorsArray(validators) {
            return validators ? Array.isArray(validators) ? validators : [ validators ] : [];
        }
        function hasValidator(validators, validator) {
            return Array.isArray(validators) ? validators.includes(validator) : validators === validator;
        }
        function addValidators(validators, currentValidators) {
            const current = makeValidatorsArray(currentValidators);
            return makeValidatorsArray(validators).forEach(v => {
                hasValidator(current, v) || current.push(v);
            }), current;
        }
        function removeValidators(validators, currentValidators) {
            return makeValidatorsArray(currentValidators).filter(v => !hasValidator(validators, v));
        }
        class AbstractControlDirective {
            constructor() {
                this._rawValidators = [], this._rawAsyncValidators = [], this._onDestroyCallbacks = [];
            }
            get value() {
                return this.control ? this.control.value : null;
            }
            get valid() {
                return this.control ? this.control.valid : null;
            }
            get invalid() {
                return this.control ? this.control.invalid : null;
            }
            get pending() {
                return this.control ? this.control.pending : null;
            }
            get disabled() {
                return this.control ? this.control.disabled : null;
            }
            get enabled() {
                return this.control ? this.control.enabled : null;
            }
            get errors() {
                return this.control ? this.control.errors : null;
            }
            get pristine() {
                return this.control ? this.control.pristine : null;
            }
            get dirty() {
                return this.control ? this.control.dirty : null;
            }
            get touched() {
                return this.control ? this.control.touched : null;
            }
            get status() {
                return this.control ? this.control.status : null;
            }
            get untouched() {
                return this.control ? this.control.untouched : null;
            }
            get statusChanges() {
                return this.control ? this.control.statusChanges : null;
            }
            get valueChanges() {
                return this.control ? this.control.valueChanges : null;
            }
            get path() {
                return null;
            }
            _setValidators(validators) {
                this._rawValidators = validators || [], this._composedValidatorFn = composeValidators(this._rawValidators);
            }
            _setAsyncValidators(validators) {
                this._rawAsyncValidators = validators || [], this._composedAsyncValidatorFn = composeAsyncValidators(this._rawAsyncValidators);
            }
            get validator() {
                return this._composedValidatorFn || null;
            }
            get asyncValidator() {
                return this._composedAsyncValidatorFn || null;
            }
            _registerOnDestroy(fn) {
                this._onDestroyCallbacks.push(fn);
            }
            _invokeOnDestroyCallbacks() {
                this._onDestroyCallbacks.forEach(fn => fn()), this._onDestroyCallbacks = [];
            }
            reset(value) {
                this.control && this.control.reset(value);
            }
            hasError(errorCode, path) {
                return !!this.control && this.control.hasError(errorCode, path);
            }
            getError(errorCode, path) {
                return this.control ? this.control.getError(errorCode, path) : null;
            }
        }
        class ControlContainer extends AbstractControlDirective {
            get formDirective() {
                return null;
            }
            get path() {
                return null;
            }
        }
        class NgControl extends AbstractControlDirective {
            constructor() {
                super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null;
            }
        }
        let NgControlStatus = (() => {
            class NgControlStatus2 extends class AbstractControlStatus {
                constructor(cd) {
                    this._cd = cd;
                }
                get isTouched() {
                    return !!this._cd?.control?.touched;
                }
                get isUntouched() {
                    return !!this._cd?.control?.untouched;
                }
                get isPristine() {
                    return !!this._cd?.control?.pristine;
                }
                get isDirty() {
                    return !!this._cd?.control?.dirty;
                }
                get isValid() {
                    return !!this._cd?.control?.valid;
                }
                get isInvalid() {
                    return !!this._cd?.control?.invalid;
                }
                get isPending() {
                    return !!this._cd?.control?.pending;
                }
                get isSubmitted() {
                    return !!this._cd?.submitted;
                }
            } {
                constructor(cd) {
                    super(cd);
                }
            }
            return NgControlStatus2.ɵfac = function(t) {
                return new (t || NgControlStatus2)(ɵɵdirectiveInject(NgControl, 2));
            }, NgControlStatus2.ɵdir = ɵɵdefineDirective({
                type: NgControlStatus2,
                selectors: [ [ "", "formControlName", "" ], [ "", "ngModel", "" ], [ "", "formControl", "" ] ],
                hostVars: 14,
                hostBindings: function(rf, ctx) {
                    2 & rf && ɵɵclassProp("ng-untouched", ctx.isUntouched)("ng-touched", ctx.isTouched)("ng-pristine", ctx.isPristine)("ng-dirty", ctx.isDirty)("ng-valid", ctx.isValid)("ng-invalid", ctx.isInvalid)("ng-pending", ctx.isPending);
                },
                features: [ ɵɵInheritDefinitionFeature ]
            }), NgControlStatus2;
        })();
        function coerceToValidator(validator) {
            return Array.isArray(validator) ? composeValidators(validator) : validator || null;
        }
        function coerceToAsyncValidator(asyncValidator) {
            return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator || null;
        }
        function isOptionsObj(validatorOrOpts) {
            return null != validatorOrOpts && !Array.isArray(validatorOrOpts) && "object" == typeof validatorOrOpts;
        }
        function setUpControl(control, dir) {
            (function setUpValidators(control, dir) {
                const validators = function getControlValidators(control) {
                    return control._rawValidators;
                }(control);
                null !== dir.validator ? control.setValidators(mergeValidators(validators, dir.validator)) : "function" == typeof validators && control.setValidators([ validators ]);
                const asyncValidators = function getControlAsyncValidators(control) {
                    return control._rawAsyncValidators;
                }(control);
                null !== dir.asyncValidator ? control.setAsyncValidators(mergeValidators(asyncValidators, dir.asyncValidator)) : "function" == typeof asyncValidators && control.setAsyncValidators([ asyncValidators ]);
                const onValidatorChange = () => control.updateValueAndValidity();
                registerOnValidatorChange(dir._rawValidators, onValidatorChange), registerOnValidatorChange(dir._rawAsyncValidators, onValidatorChange);
            })(control, dir), dir.valueAccessor.writeValue(control.value), control.disabled && dir.valueAccessor.setDisabledState?.(!0), 
            function setUpViewChangePipeline(control, dir) {
                dir.valueAccessor.registerOnChange(newValue => {
                    control._pendingValue = newValue, control._pendingChange = !0, control._pendingDirty = !0, 
                    "change" === control.updateOn && updateControl(control, dir);
                });
            }(control, dir), function setUpModelChangePipeline(control, dir) {
                const onChange = (newValue, emitModelEvent) => {
                    dir.valueAccessor.writeValue(newValue), emitModelEvent && dir.viewToModelUpdate(newValue);
                };
                control.registerOnChange(onChange), dir._registerOnDestroy(() => {
                    control._unregisterOnChange(onChange);
                });
            }(control, dir), function setUpBlurPipeline(control, dir) {
                dir.valueAccessor.registerOnTouched(() => {
                    control._pendingTouched = !0, "blur" === control.updateOn && control._pendingChange && updateControl(control, dir), 
                    "submit" !== control.updateOn && control.markAsTouched();
                });
            }(control, dir), function setUpDisabledChangeHandler(control, dir) {
                if (dir.valueAccessor.setDisabledState) {
                    const onDisabledChange = isDisabled => {
                        dir.valueAccessor.setDisabledState(isDisabled);
                    };
                    control.registerOnDisabledChange(onDisabledChange), dir._registerOnDestroy(() => {
                        control._unregisterOnDisabledChange(onDisabledChange);
                    });
                }
            }(control, dir);
        }
        function registerOnValidatorChange(validators, onChange) {
            validators.forEach(validator => {
                validator.registerOnValidatorChange && validator.registerOnValidatorChange(onChange);
            });
        }
        function updateControl(control, dir) {
            control._pendingDirty && control.markAsDirty(), control.setValue(control._pendingValue, {
                emitModelToViewChange: !1
            }), dir.viewToModelUpdate(control._pendingValue), control._pendingChange = !1;
        }
        function removeListItem(list, el) {
            const index = list.indexOf(el);
            index > -1 && list.splice(index, 1);
        }
        function isFormControlState(formState) {
            return "object" == typeof formState && null !== formState && 2 === Object.keys(formState).length && "value" in formState && "disabled" in formState;
        }
        const formControlBinding$1 = {
            provide: NgControl,
            useExisting: forwardRef(() => NgModel)
        }, resolvedPromise = (() => Promise.resolve())();
        let NgModel = (() => {
            class NgModel2 extends NgControl {
                constructor(parent, validators, asyncValidators, valueAccessors, _changeDetectorRef) {
                    super(), this._changeDetectorRef = _changeDetectorRef, this.control = new class extends class AbstractControl {
                        constructor(validators, asyncValidators) {
                            this._pendingDirty = !1, this._hasOwnPendingAsyncValidator = !1, this._pendingTouched = !1, 
                            this._onCollectionChange = () => {}, this._parent = null, this.pristine = !0, this.touched = !1, 
                            this._onDisabledChange = [], this._rawValidators = validators, this._rawAsyncValidators = asyncValidators, 
                            this._composedValidatorFn = coerceToValidator(this._rawValidators), this._composedAsyncValidatorFn = coerceToAsyncValidator(this._rawAsyncValidators);
                        }
                        get validator() {
                            return this._composedValidatorFn;
                        }
                        set validator(validatorFn) {
                            this._rawValidators = this._composedValidatorFn = validatorFn;
                        }
                        get asyncValidator() {
                            return this._composedAsyncValidatorFn;
                        }
                        set asyncValidator(asyncValidatorFn) {
                            this._rawAsyncValidators = this._composedAsyncValidatorFn = asyncValidatorFn;
                        }
                        get parent() {
                            return this._parent;
                        }
                        get valid() {
                            return "VALID" === this.status;
                        }
                        get invalid() {
                            return "INVALID" === this.status;
                        }
                        get pending() {
                            return "PENDING" == this.status;
                        }
                        get disabled() {
                            return "DISABLED" === this.status;
                        }
                        get enabled() {
                            return "DISABLED" !== this.status;
                        }
                        get dirty() {
                            return !this.pristine;
                        }
                        get untouched() {
                            return !this.touched;
                        }
                        get updateOn() {
                            return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change";
                        }
                        setValidators(validators) {
                            this._rawValidators = validators, this._composedValidatorFn = coerceToValidator(validators);
                        }
                        setAsyncValidators(validators) {
                            this._rawAsyncValidators = validators, this._composedAsyncValidatorFn = coerceToAsyncValidator(validators);
                        }
                        addValidators(validators) {
                            this.setValidators(addValidators(validators, this._rawValidators));
                        }
                        addAsyncValidators(validators) {
                            this.setAsyncValidators(addValidators(validators, this._rawAsyncValidators));
                        }
                        removeValidators(validators) {
                            this.setValidators(removeValidators(validators, this._rawValidators));
                        }
                        removeAsyncValidators(validators) {
                            this.setAsyncValidators(removeValidators(validators, this._rawAsyncValidators));
                        }
                        hasValidator(validator) {
                            return hasValidator(this._rawValidators, validator);
                        }
                        hasAsyncValidator(validator) {
                            return hasValidator(this._rawAsyncValidators, validator);
                        }
                        clearValidators() {
                            this.validator = null;
                        }
                        clearAsyncValidators() {
                            this.asyncValidator = null;
                        }
                        markAsTouched(opts = {}) {
                            this.touched = !0, this._parent && !opts.onlySelf && this._parent.markAsTouched(opts);
                        }
                        markAllAsTouched() {
                            this.markAsTouched({
                                onlySelf: !0
                            }), this._forEachChild(control => control.markAllAsTouched());
                        }
                        markAsUntouched(opts = {}) {
                            this.touched = !1, this._pendingTouched = !1, this._forEachChild(control => {
                                control.markAsUntouched({
                                    onlySelf: !0
                                });
                            }), this._parent && !opts.onlySelf && this._parent._updateTouched(opts);
                        }
                        markAsDirty(opts = {}) {
                            this.pristine = !1, this._parent && !opts.onlySelf && this._parent.markAsDirty(opts);
                        }
                        markAsPristine(opts = {}) {
                            this.pristine = !0, this._pendingDirty = !1, this._forEachChild(control => {
                                control.markAsPristine({
                                    onlySelf: !0
                                });
                            }), this._parent && !opts.onlySelf && this._parent._updatePristine(opts);
                        }
                        markAsPending(opts = {}) {
                            this.status = "PENDING", !1 !== opts.emitEvent && this.statusChanges.emit(this.status), 
                            this._parent && !opts.onlySelf && this._parent.markAsPending(opts);
                        }
                        disable(opts = {}) {
                            const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
                            this.status = "DISABLED", this.errors = null, this._forEachChild(control => {
                                control.disable({
                                    ...opts,
                                    onlySelf: !0
                                });
                            }), this._updateValue(), !1 !== opts.emitEvent && (this.valueChanges.emit(this.value), 
                            this.statusChanges.emit(this.status)), this._updateAncestors({
                                ...opts,
                                skipPristineCheck
                            }), this._onDisabledChange.forEach(changeFn => changeFn(!0));
                        }
                        enable(opts = {}) {
                            const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
                            this.status = "VALID", this._forEachChild(control => {
                                control.enable({
                                    ...opts,
                                    onlySelf: !0
                                });
                            }), this.updateValueAndValidity({
                                onlySelf: !0,
                                emitEvent: opts.emitEvent
                            }), this._updateAncestors({
                                ...opts,
                                skipPristineCheck
                            }), this._onDisabledChange.forEach(changeFn => changeFn(!1));
                        }
                        _updateAncestors(opts) {
                            this._parent && !opts.onlySelf && (this._parent.updateValueAndValidity(opts), opts.skipPristineCheck || this._parent._updatePristine(), 
                            this._parent._updateTouched());
                        }
                        setParent(parent) {
                            this._parent = parent;
                        }
                        getRawValue() {
                            return this.value;
                        }
                        updateValueAndValidity(opts = {}) {
                            this._setInitialStatus(), this._updateValue(), this.enabled && (this._cancelExistingSubscription(), 
                            this.errors = this._runValidator(), this.status = this._calculateStatus(), ("VALID" === this.status || "PENDING" === this.status) && this._runAsyncValidator(opts.emitEvent)), 
                            !1 !== opts.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), 
                            this._parent && !opts.onlySelf && this._parent.updateValueAndValidity(opts);
                        }
                        _updateTreeValidity(opts = {
                            emitEvent: !0
                        }) {
                            this._forEachChild(ctrl => ctrl._updateTreeValidity(opts)), this.updateValueAndValidity({
                                onlySelf: !0,
                                emitEvent: opts.emitEvent
                            });
                        }
                        _setInitialStatus() {
                            this.status = this._allControlsDisabled() ? "DISABLED" : "VALID";
                        }
                        _runValidator() {
                            return this.validator ? this.validator(this) : null;
                        }
                        _runAsyncValidator(emitEvent) {
                            if (this.asyncValidator) {
                                this.status = "PENDING", this._hasOwnPendingAsyncValidator = !0;
                                const obs = toObservable(this.asyncValidator(this));
                                this._asyncValidationSubscription = obs.subscribe(errors => {
                                    this._hasOwnPendingAsyncValidator = !1, this.setErrors(errors, {
                                        emitEvent
                                    });
                                });
                            }
                        }
                        _cancelExistingSubscription() {
                            this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), 
                            this._hasOwnPendingAsyncValidator = !1);
                        }
                        setErrors(errors, opts = {}) {
                            this.errors = errors, this._updateControlsErrors(!1 !== opts.emitEvent);
                        }
                        get(path) {
                            let currPath = path;
                            return null == currPath || (Array.isArray(currPath) || (currPath = currPath.split(".")), 
                            0 === currPath.length) ? null : currPath.reduce((control, name) => control && control._find(name), this);
                        }
                        getError(errorCode, path) {
                            const control = path ? this.get(path) : this;
                            return control && control.errors ? control.errors[errorCode] : null;
                        }
                        hasError(errorCode, path) {
                            return !!this.getError(errorCode, path);
                        }
                        get root() {
                            let x = this;
                            for (;x._parent; ) x = x._parent;
                            return x;
                        }
                        _updateControlsErrors(emitEvent) {
                            this.status = this._calculateStatus(), emitEvent && this.statusChanges.emit(this.status), 
                            this._parent && this._parent._updateControlsErrors(emitEvent);
                        }
                        _initObservables() {
                            this.valueChanges = new core_EventEmitter, this.statusChanges = new core_EventEmitter;
                        }
                        _calculateStatus() {
                            return this._allControlsDisabled() ? "DISABLED" : this.errors ? "INVALID" : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus("PENDING") ? "PENDING" : this._anyControlsHaveStatus("INVALID") ? "INVALID" : "VALID";
                        }
                        _anyControlsHaveStatus(status) {
                            return this._anyControls(control => control.status === status);
                        }
                        _anyControlsDirty() {
                            return this._anyControls(control => control.dirty);
                        }
                        _anyControlsTouched() {
                            return this._anyControls(control => control.touched);
                        }
                        _updatePristine(opts = {}) {
                            this.pristine = !this._anyControlsDirty(), this._parent && !opts.onlySelf && this._parent._updatePristine(opts);
                        }
                        _updateTouched(opts = {}) {
                            this.touched = this._anyControlsTouched(), this._parent && !opts.onlySelf && this._parent._updateTouched(opts);
                        }
                        _registerOnCollectionChange(fn) {
                            this._onCollectionChange = fn;
                        }
                        _setUpdateStrategy(opts) {
                            isOptionsObj(opts) && null != opts.updateOn && (this._updateOn = opts.updateOn);
                        }
                        _parentMarkedDirty(onlySelf) {
                            return !onlySelf && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty();
                        }
                        _find(name) {
                            return null;
                        }
                    } {
                        constructor(formState = null, validatorOrOpts, asyncValidator) {
                            super(function pickValidators(validatorOrOpts) {
                                return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.validators : validatorOrOpts) || null;
                            }(validatorOrOpts), function pickAsyncValidators(asyncValidator, validatorOrOpts) {
                                return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.asyncValidators : asyncValidator) || null;
                            }(asyncValidator, validatorOrOpts)), this.defaultValue = null, this._onChange = [], 
                            this._pendingChange = !1, this._applyFormState(formState), this._setUpdateStrategy(validatorOrOpts), 
                            this._initObservables(), this.updateValueAndValidity({
                                onlySelf: !0,
                                emitEvent: !!this.asyncValidator
                            }), isOptionsObj(validatorOrOpts) && (validatorOrOpts.nonNullable || validatorOrOpts.initialValueIsDefault) && (this.defaultValue = isFormControlState(formState) ? formState.value : formState);
                        }
                        setValue(value, options = {}) {
                            this.value = this._pendingValue = value, this._onChange.length && !1 !== options.emitModelToViewChange && this._onChange.forEach(changeFn => changeFn(this.value, !1 !== options.emitViewToModelChange)), 
                            this.updateValueAndValidity(options);
                        }
                        patchValue(value, options = {}) {
                            this.setValue(value, options);
                        }
                        reset(formState = this.defaultValue, options = {}) {
                            this._applyFormState(formState), this.markAsPristine(options), this.markAsUntouched(options), 
                            this.setValue(this.value, options), this._pendingChange = !1;
                        }
                        _updateValue() {}
                        _anyControls(condition) {
                            return !1;
                        }
                        _allControlsDisabled() {
                            return this.disabled;
                        }
                        registerOnChange(fn) {
                            this._onChange.push(fn);
                        }
                        _unregisterOnChange(fn) {
                            removeListItem(this._onChange, fn);
                        }
                        registerOnDisabledChange(fn) {
                            this._onDisabledChange.push(fn);
                        }
                        _unregisterOnDisabledChange(fn) {
                            removeListItem(this._onDisabledChange, fn);
                        }
                        _forEachChild(cb) {}
                        _syncPendingControls() {
                            return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(), 
                            this._pendingTouched && this.markAsTouched(), !this._pendingChange) || (this.setValue(this._pendingValue, {
                                onlySelf: !0,
                                emitModelToViewChange: !1
                            }), 0));
                        }
                        _applyFormState(formState) {
                            isFormControlState(formState) ? (this.value = this._pendingValue = formState.value, 
                            formState.disabled ? this.disable({
                                onlySelf: !0,
                                emitEvent: !1
                            }) : this.enable({
                                onlySelf: !0,
                                emitEvent: !1
                            })) : this.value = this._pendingValue = formState;
                        }
                    }, this._registered = !1, this.update = new core_EventEmitter, this._parent = parent, 
                    this._setValidators(validators), this._setAsyncValidators(asyncValidators), this.valueAccessor = function selectValueAccessor(dir, valueAccessors) {
                        if (!valueAccessors) return null;
                        let defaultAccessor, builtinAccessor, customAccessor;
                        return Array.isArray(valueAccessors), valueAccessors.forEach(v => {
                            v.constructor === DefaultValueAccessor ? defaultAccessor = v : function isBuiltInAccessor(valueAccessor) {
                                return Object.getPrototypeOf(valueAccessor.constructor) === BuiltInControlValueAccessor;
                            }(v) ? builtinAccessor = v : customAccessor = v;
                        }), customAccessor || builtinAccessor || defaultAccessor || null;
                    }(0, valueAccessors);
                }
                ngOnChanges(changes) {
                    if (this._checkForErrors(), !this._registered || "name" in changes) {
                        if (this._registered && (this._checkName(), this.formDirective)) {
                            const oldName = changes.name.previousValue;
                            this.formDirective.removeControl({
                                name: oldName,
                                path: this._getPath(oldName)
                            });
                        }
                        this._setUpControl();
                    }
                    "isDisabled" in changes && this._updateDisabled(changes), function isPropertyUpdated(changes, viewModel) {
                        if (!changes.hasOwnProperty("model")) return !1;
                        const change = changes.model;
                        return !!change.isFirstChange() || !Object.is(viewModel, change.currentValue);
                    }(changes, this.viewModel) && (this._updateValue(this.model), this.viewModel = this.model);
                }
                ngOnDestroy() {
                    this.formDirective && this.formDirective.removeControl(this);
                }
                get path() {
                    return this._getPath(this.name);
                }
                get formDirective() {
                    return this._parent ? this._parent.formDirective : null;
                }
                viewToModelUpdate(newValue) {
                    this.viewModel = newValue, this.update.emit(newValue);
                }
                _setUpControl() {
                    this._setUpdateStrategy(), this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this), 
                    this._registered = !0;
                }
                _setUpdateStrategy() {
                    this.options && null != this.options.updateOn && (this.control._updateOn = this.options.updateOn);
                }
                _isStandalone() {
                    return !this._parent || !(!this.options || !this.options.standalone);
                }
                _setUpStandalone() {
                    setUpControl(this.control, this), this.control.updateValueAndValidity({
                        emitEvent: !1
                    });
                }
                _checkForErrors() {
                    this._isStandalone() || this._checkParentType(), this._checkName();
                }
                _checkParentType() {}
                _checkName() {
                    this.options && this.options.name && (this.name = this.options.name), this._isStandalone();
                }
                _updateValue(value) {
                    resolvedPromise.then(() => {
                        this.control.setValue(value, {
                            emitViewToModelChange: !1
                        }), this._changeDetectorRef?.markForCheck();
                    });
                }
                _updateDisabled(changes) {
                    const disabledValue = changes.isDisabled.currentValue, isDisabled = 0 !== disabledValue && function coerceToBoolean(value) {
                        return "boolean" == typeof value ? value : null != value && "false" !== value;
                    }(disabledValue);
                    resolvedPromise.then(() => {
                        isDisabled && !this.control.disabled ? this.control.disable() : !isDisabled && this.control.disabled && this.control.enable(), 
                        this._changeDetectorRef?.markForCheck();
                    });
                }
                _getPath(controlName) {
                    return this._parent ? function controlPath(name, parent) {
                        return [ ...parent.path, name ];
                    }(controlName, this._parent) : [ controlName ];
                }
            }
            return NgModel2.ɵfac = function(t) {
                return new (t || NgModel2)(ɵɵdirectiveInject(ControlContainer, 9), ɵɵdirectiveInject(NG_VALIDATORS, 10), ɵɵdirectiveInject(NG_ASYNC_VALIDATORS, 10), ɵɵdirectiveInject(NG_VALUE_ACCESSOR, 10), ɵɵdirectiveInject(ChangeDetectorRef, 8));
            }, NgModel2.ɵdir = ɵɵdefineDirective({
                type: NgModel2,
                selectors: [ [ "", "ngModel", "", 3, "formControlName", "", 3, "formControl", "" ] ],
                inputs: {
                    name: "name",
                    isDisabled: [ "disabled", "isDisabled" ],
                    model: [ "ngModel", "model" ],
                    options: [ "ngModelOptions", "options" ]
                },
                outputs: {
                    update: "ngModelChange"
                },
                exportAs: [ "ngModel" ],
                features: [ ɵɵProvidersFeature([ formControlBinding$1 ]), ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature ]
            }), NgModel2;
        })(), RadioControlRegistryModule = (() => {
            class RadioControlRegistryModule2 {}
            return RadioControlRegistryModule2.ɵfac = function(t) {
                return new (t || RadioControlRegistryModule2);
            }, RadioControlRegistryModule2.ɵmod = ɵɵdefineNgModule({
                type: RadioControlRegistryModule2
            }), RadioControlRegistryModule2.ɵinj = ɵɵdefineInjector({}), RadioControlRegistryModule2;
        })(), ɵInternalFormsSharedModule = (() => {
            class ɵInternalFormsSharedModule2 {}
            return ɵInternalFormsSharedModule2.ɵfac = function(t) {
                return new (t || ɵInternalFormsSharedModule2);
            }, ɵInternalFormsSharedModule2.ɵmod = ɵɵdefineNgModule({
                type: ɵInternalFormsSharedModule2
            }), ɵInternalFormsSharedModule2.ɵinj = ɵɵdefineInjector({
                imports: [ RadioControlRegistryModule ]
            }), ɵInternalFormsSharedModule2;
        })(), FormsModule = (() => {
            class FormsModule2 {}
            return FormsModule2.ɵfac = function(t) {
                return new (t || FormsModule2);
            }, FormsModule2.ɵmod = ɵɵdefineNgModule({
                type: FormsModule2
            }), FormsModule2.ɵinj = ɵɵdefineInjector({
                imports: [ ɵInternalFormsSharedModule ]
            }), FormsModule2;
        })();
        class Todo {
            constructor(values = {}) {
                this.id = 0, this.title = "", this.complete = !1, Object.assign(this, values);
            }
        }
        let TodoDataService = (() => {
            class TodoDataService2 {
                constructor() {
                    this.lastId = 0, this.todos = [];
                }
                addTodo(todo) {
                    return todo.id || (todo.id = ++this.lastId), this.todos.push(todo), this;
                }
                deleteTodoById(id) {
                    return this.todos = this.todos.filter(todo => todo.id !== id), this;
                }
                updateTodoById(id, values = {}) {
                    let todo = this.getTodoById(id);
                    if (todo) return Object.assign(todo, values), todo;
                }
                getAllTodos() {
                    return this.todos;
                }
                getTodoById(id) {
                    return this.todos.filter(todo => todo.id === id).pop();
                }
                toggleTodoComplete(todo) {
                    return this.updateTodoById(todo.id, {
                        complete: !todo.complete
                    });
                }
            }
            return TodoDataService2.ɵfac = function(t) {
                return new (t || TodoDataService2);
            }, TodoDataService2.ɵprov = core_defineInjectable({
                token: TodoDataService2,
                factory: TodoDataService2.ɵfac
            }), TodoDataService2;
        })();
        function AppComponent_section_5_li_2_Template(rf, ctx) {
            if (1 & rf) {
                const _r5 = function ɵɵgetCurrentView() {
                    return getLView();
                }();
                ɵɵelementStart(0, "li")(1, "div", 8)(2, "input", 9), ɵɵlistener("click", function() {
                    const todo_r3 = ɵɵrestoreView(_r5).$implicit;
                    return ɵɵresetView(ɵɵnextContext(2).toggleTodoComplete(todo_r3));
                }), ɵɵelementEnd(), ɵɵelementStart(3, "label"), ɵɵtext(4), ɵɵelementEnd(), ɵɵelementStart(5, "button", 10), 
                ɵɵlistener("click", function() {
                    const todo_r3 = ɵɵrestoreView(_r5).$implicit;
                    return ɵɵresetView(ɵɵnextContext(2).removeTodo(todo_r3));
                }), ɵɵelementEnd()()();
            }
            if (2 & rf) {
                const todo_r3 = ctx.$implicit;
                ɵɵclassProp("completed", todo_r3.complete), ɵɵadvance(2), ɵɵproperty("checked", todo_r3.complete), 
                ɵɵadvance(2), ɵɵtextInterpolate(todo_r3.title);
            }
        }
        function AppComponent_section_5_Template(rf, ctx) {
            if (1 & rf && (ɵɵelementStart(0, "section", 5)(1, "ul", 6), ɵɵtemplate(2, AppComponent_section_5_li_2_Template, 6, 4, "li", 7), 
            ɵɵelementEnd()()), 2 & rf) {
                const ctx_r0 = ɵɵnextContext();
                ɵɵadvance(2), ɵɵproperty("ngForOf", ctx_r0.todos);
            }
        }
        function AppComponent_footer_6_Template(rf, ctx) {
            if (1 & rf && (ɵɵelementStart(0, "footer", 11)(1, "span", 12)(2, "strong"), ɵɵtext(3), 
            ɵɵelementEnd(), ɵɵtext(4), ɵɵelementEnd()()), 2 & rf) {
                const ctx_r1 = ɵɵnextContext();
                ɵɵadvance(3), ɵɵtextInterpolate(ctx_r1.todos.length), ɵɵadvance(1), ɵɵtextInterpolate1(" ", 1 == ctx_r1.todos.length ? "item" : "items", " left");
            }
        }
        let AppComponent = (() => {
            class AppComponent2 {
                constructor(todoDataService) {
                    this.todoDataService = todoDataService, this.newTodo = new Todo;
                }
                addTodo() {
                    this.todoDataService.addTodo(this.newTodo), this.newTodo = new Todo;
                }
                toggleTodoComplete(todo) {
                    this.todoDataService.toggleTodoComplete(todo);
                }
                removeTodo(todo) {
                    this.todoDataService.deleteTodoById(todo.id);
                }
                get todos() {
                    return this.todoDataService.getAllTodos();
                }
            }
            return AppComponent2.ɵfac = function(t) {
                return new (t || AppComponent2)(ɵɵdirectiveInject(TodoDataService));
            }, AppComponent2.ɵcmp = ɵɵdefineComponent({
                type: AppComponent2,
                selectors: [ [ "app-root" ] ],
                features: [ ɵɵProvidersFeature([ TodoDataService ]) ],
                decls: 7,
                vars: 3,
                consts: [ [ 1, "todoapp" ], [ 1, "header" ], [ "placeholder", "What needs to be done?", "autofocus", "", 1, "new-todo", 3, "ngModel", "ngModelChange", "keyup.enter" ], [ "class", "main", 4, "ngIf" ], [ "class", "footer", 4, "ngIf" ], [ 1, "main" ], [ 1, "todo-list" ], [ 3, "completed", 4, "ngFor", "ngForOf" ], [ 1, "view" ], [ "type", "checkbox", 1, "toggle", 3, "checked", "click" ], [ 1, "destroy", 3, "click" ], [ 1, "footer" ], [ 1, "todo-count" ] ],
                template: function(rf, ctx) {
                    1 & rf && (ɵɵelementStart(0, "section", 0)(1, "header", 1)(2, "h1"), ɵɵtext(3, "Todos"), 
                    ɵɵelementEnd(), ɵɵelementStart(4, "input", 2), ɵɵlistener("ngModelChange", function($event) {
                        return ctx.newTodo.title = $event;
                    })("keyup.enter", function() {
                        return ctx.addTodo();
                    }), ɵɵelementEnd()(), ɵɵtemplate(5, AppComponent_section_5_Template, 3, 1, "section", 3), 
                    ɵɵtemplate(6, AppComponent_footer_6_Template, 5, 2, "footer", 4), ɵɵelementEnd()), 
                    2 & rf && (ɵɵadvance(4), ɵɵproperty("ngModel", ctx.newTodo.title), ɵɵadvance(1), 
                    ɵɵproperty("ngIf", ctx.todos.length > 0), ɵɵadvance(1), ɵɵproperty("ngIf", ctx.todos.length > 0));
                },
                dependencies: [ NgForOf, NgIf, DefaultValueAccessor, NgControlStatus, NgModel ],
                encapsulation: 2
            }), AppComponent2;
        })(), AppModule = (() => {
            class AppModule2 {}
            return AppModule2.ɵfac = function(t) {
                return new (t || AppModule2);
            }, AppModule2.ɵmod = ɵɵdefineNgModule({
                type: AppModule2,
                bootstrap: [ AppComponent ]
            }), AppModule2.ɵinj = ɵɵdefineInjector({
                imports: [ BrowserModule, FormsModule, HttpClientModule ]
            }), AppModule2;
        })();
        platformBrowser().bootstrapModule(AppModule).catch(err => console.error(err));
    }
}, __webpack_require__ => {
    __webpack_require__(__webpack_require__.s = 826);
} ]);