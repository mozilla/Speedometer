/* cached-iterable@0.3.0 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('cached-iterable', ['exports'], factory) :
    (factory((global.CachedIterable = {})));
}(this, (function (exports) { 'use strict';

    /*
     * Base CachedIterable class.
     */
    class CachedIterable extends Array {
        /**
         * Create a `CachedIterable` instance from an iterable or, if another
         * instance of `CachedIterable` is passed, return it without any
         * modifications.
         *
         * @param {Iterable} iterable
         * @returns {CachedIterable}
         */
        static from(iterable) {
            if (iterable instanceof this) {
                return iterable;
            }

            return new this(iterable);
        }
    }

    /*
     * CachedSyncIterable caches the elements yielded by an iterable.
     *
     * It can be used to iterate over an iterable many times without depleting the
     * iterable.
     */
    class CachedSyncIterable extends CachedIterable {
        /**
         * Create an `CachedSyncIterable` instance.
         *
         * @param {Iterable} iterable
         * @returns {CachedSyncIterable}
         */
        constructor(iterable) {
            super();

            if (Symbol.iterator in Object(iterable)) {
                this.iterator = iterable[Symbol.iterator]();
            } else {
                throw new TypeError("Argument must implement the iteration protocol.");
            }
        }

        [Symbol.iterator]() {
            const cached = this;
            let cur = 0;

            return {
                next() {
                    if (cached.length <= cur) {
                        cached.push(cached.iterator.next());
                    }
                    return cached[cur++];
                }
            };
        }

        /**
         * This method allows user to consume the next element from the iterator
         * into the cache.
         *
         * @param {number} count - number of elements to consume
         */
        touchNext(count = 1) {
            let idx = 0;
            while (idx++ < count) {
                const last = this[this.length - 1];
                if (last && last.done) {
                    break;
                }
                this.push(this.iterator.next());
            }
            // Return the last cached {value, done} object to allow the calling
            // code to decide if it needs to call touchNext again.
            return this[this.length - 1];
        }
    }

    /*
     * CachedAsyncIterable caches the elements yielded by an async iterable.
     *
     * It can be used to iterate over an iterable many times without depleting the
     * iterable.
     */
    class CachedAsyncIterable extends CachedIterable {
        /**
         * Create an `CachedAsyncIterable` instance.
         *
         * @param {Iterable} iterable
         * @returns {CachedAsyncIterable}
         */
        constructor(iterable) {
            super();

            if (Symbol.asyncIterator in Object(iterable)) {
                this.iterator = iterable[Symbol.asyncIterator]();
            } else if (Symbol.iterator in Object(iterable)) {
                this.iterator = iterable[Symbol.iterator]();
            } else {
                throw new TypeError("Argument must implement the iteration protocol.");
            }
        }

        /**
         * Asynchronous iterator caching the yielded elements.
         *
         * Elements yielded by the original iterable will be cached and available
         * synchronously. Returns an async generator object implementing the
         * iterator protocol over the elements of the original (async or sync)
         * iterable.
         */
        [Symbol.asyncIterator]() {
            const cached = this;
            let cur = 0;

            return {
                async next() {
                    if (cached.length <= cur) {
                        cached.push(cached.iterator.next());
                    }
                    return cached[cur++];
                }
            };
        }

        /**
         * This method allows user to consume the next element from the iterator
         * into the cache.
         *
         * @param {number} count - number of elements to consume
         */
        async touchNext(count = 1) {
            let idx = 0;
            while (idx++ < count) {
                const last = this[this.length - 1];
                if (last && (await last).done) {
                    break;
                }
                this.push(this.iterator.next());
            }
            // Return the last cached {value, done} object to allow the calling
            // code to decide if it needs to call touchNext again.
            return this[this.length - 1];
        }
    }

    exports.CachedSyncIterable = CachedSyncIterable;
    exports.CachedAsyncIterable = CachedAsyncIterable;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
