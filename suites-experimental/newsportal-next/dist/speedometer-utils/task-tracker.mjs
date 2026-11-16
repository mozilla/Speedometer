// Counts the tasks that workload code queues while a step's measured window
// is open, so that the window can end once none is left: messages on
// MessagePorts, zero-delay timers, scheduler.postTask() without a delay and
// scheduler.yield(). Tasks those tasks queue are counted too, so a chain of
// tasks is measured to its end. Frames, delayed timers, idle callbacks and
// observers aren't tasks of the chain and aren't counted.
//
// trackRealm(win) installs the counting in one realm. It has to run before
// the realm's code creates its MessageChannels: a port's messages are
// counted only if the tracker saw its channel being created.
//
// Not part of upstream Speedometer: a prototype for the "tasks" step
// scheduler (step-scheduler.mjs).

const nativeMessageChannel = globalThis.MessageChannel;
const nativePostMessage = MessagePort.prototype.postMessage;

let open = false;
const pending = new Map();
const idleResolvers = [];
let settlePosted = false;

// Each counted port's message queue, as flags in post order: whether the
// message was posted while the window was open.
const queues = new WeakMap();
const peers = new WeakMap();
const tracked = new WeakSet();

const settleChannel = new nativeMessageChannel();
settleChannel.port1.onmessage = () => {
    settlePosted = false;
    if (outstanding() === 0) {
        for (const resolve of idleResolvers.splice(0))
            resolve();
    }
};

// The counted tasks of realms that still exist. A removed frame's tasks
// never run, so its counts are dropped.
function outstanding() {
    let total = 0;
    for (const [win, count] of pending) {
        if (win.closed)
            pending.delete(win);
        else
            total += count;
    }
    return total;
}

// Idle is confirmed by a message that arrives while nothing is counted, so
// it doesn't depend on how a browser orders tasks of different sources.
function settle() {
    if (settlePosted || !idleResolvers.length || outstanding() !== 0)
        return;
    settlePosted = true;
    nativePostMessage.call(settleChannel.port2, null);
}

function add(win) {
    pending.set(win, (pending.get(win) ?? 0) + 1);
}

function done(win) {
    const count = pending.get(win);
    if (count === undefined)
        return;
    if (count <= 1)
        pending.delete(win);
    else
        pending.set(win, count - 1);
    settle();
}

export function startTracking() {
    open = true;
}

export function stopTracking() {
    open = false;
}

// Resolves once no counted task is left.
export function whenIdle() {
    return new Promise((resolve) => {
        idleResolvers.push(resolve);
        settle();
    });
}

export function trackRealm(win) {
    if (tracked.has(win))
        return;
    tracked.add(win);

    const RealmMessageChannel = win.MessageChannel;
    const realmPostMessage = win.MessagePort.prototype.postMessage;
    const realmAddEventListener = win.EventTarget.prototype.addEventListener;
    const watch = (port) => {
        queues.set(port, []);
        // A listener doesn't start the port: the app's onmessage or start() does.
        realmAddEventListener.call(port, "message", () => {
            if (queues.get(port).shift())
                done(win);
        });
    };
    win.MessageChannel = function MessageChannel() {
        const channel = new RealmMessageChannel();
        peers.set(channel.port1, channel.port2);
        peers.set(channel.port2, channel.port1);
        watch(channel.port1);
        watch(channel.port2);
        return channel;
    };
    win.MessageChannel.prototype = RealmMessageChannel.prototype;
    win.MessagePort.prototype.postMessage = function postMessage(...args) {
        const result = realmPostMessage.apply(this, args);
        const peer = peers.get(this);
        if (peer) {
            queues.get(peer).push(open);
            if (open)
                add(win);
        }
        return result;
    };

    const realmSetTimeout = win.setTimeout;
    const realmClearTimeout = win.clearTimeout;
    const timers = new Set();
    win.setTimeout = function setTimeout(handler, delay, ...args) {
        if (!open || typeof handler !== "function" || Number(delay) > 0)
            return realmSetTimeout.call(win, handler, delay, ...args);
        add(win);
        const id = realmSetTimeout.call(
            win,
            function () {
                timers.delete(id);
                try {
                    return handler.apply(this, arguments);
                } finally {
                    done(win);
                }
            },
            delay,
            ...args
        );
        timers.add(id);
        return id;
    };
    win.clearTimeout = function clearTimeout(id) {
        if (timers.delete(id))
            done(win);
        return realmClearTimeout.call(win, id);
    };

    const proto = win.Scheduler?.prototype;
    if (proto?.postTask) {
        const realmPostTask = proto.postTask;
        proto.postTask = function postTask(callback, options) {
            const promise = realmPostTask.call(this, callback, options);
            if (open && !(options?.delay > 0)) {
                add(win);
                promise.then(() => done(win), () => done(win));
            }
            return promise;
        };
    }
    if (proto?.yield) {
        const realmYield = proto.yield;
        proto.yield = function () {
            const promise = realmYield.call(this);
            if (open) {
                add(win);
                promise.then(() => done(win), () => done(win));
            }
            return promise;
        };
    }
}
