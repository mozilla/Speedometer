import { startTracking, stopTracking, trackRealm, whenIdle } from "./task-tracker.mjs";

class StepScheduler {
    constructor(syncCallback, asyncCallback, params) {
        this._syncCallback = syncCallback;
        this._asyncCallback = asyncCallback;
        this._params = params;
    }

    start() {
        return new Promise((resolve) => {
            if (this._params.waitBeforeSync)
                setTimeout(() => this._scheduleCallbacks(resolve), this._params.waitBeforeSync);
            else
                this._scheduleCallbacks(resolve);
        });
    }
}

class RAFStepScheduler extends StepScheduler {
    _scheduleCallbacks(resolve) {
        requestAnimationFrame(() => this._syncCallback());
        requestAnimationFrame(() => {
            setTimeout(() => {
                this._asyncCallback();
                setTimeout(resolve, 0);
            }, 0);
        });
    }
}

class AsyncRAFStepScheduler extends StepScheduler {
    static mc = new MessageChannel();
    _scheduleCallbacks(resolve) {
        let gotTimer = false;
        let gotMessage = false;
        let gotPromise = false;

        const tryTriggerAsyncCallback = () => {
            if (!gotTimer || !gotMessage || !gotPromise)
                return;

            this._asyncCallback();
            setTimeout(resolve, 0);
        };

        requestAnimationFrame(async () => {
            await this._syncCallback();
            gotPromise = true;
            tryTriggerAsyncCallback();
        });

        requestAnimationFrame(() => {
            setTimeout(async () => {
                await Promise.resolve();
                gotTimer = true;
                tryTriggerAsyncCallback();
            });

            AsyncRAFStepScheduler.mc.port1.addEventListener(
                "message",
                async function () {
                    await Promise.resolve();
                    gotMessage = true;
                    tryTriggerAsyncCallback();
                },
                { once: true }
            );
            AsyncRAFStepScheduler.mc.port1.start();
            AsyncRAFStepScheduler.mc.port2.postMessage("speedometer");
        });
    }
}

// Not in upstream Speedometer (task-tracker.mjs): like AsyncRAFStepScheduler,
// but the async window also lasts until no task that the step queued, or
// that those tasks queued, is left. Rendering updates between those tasks
// are measured too.
class TaskTrackingStepScheduler extends StepScheduler {
    constructor(syncCallback, asyncCallback, params) {
        super(syncCallback, asyncCallback, params);
        trackRealm(window);
    }

    _scheduleCallbacks(resolve) {
        let gotTimer = false;
        let gotPromise = false;

        const tryTriggerAsyncCallback = async () => {
            if (!gotTimer || !gotPromise)
                return;
            await whenIdle();
            stopTracking();
            this._asyncCallback();
            setTimeout(resolve, 0);
        };

        requestAnimationFrame(async () => {
            startTracking();
            await this._syncCallback();
            gotPromise = true;
            tryTriggerAsyncCallback();
        });

        requestAnimationFrame(() => {
            setTimeout(() => {
                gotTimer = true;
                tryTriggerAsyncCallback();
            }, 0);
        });
    }
}

export const STEP_SCHEDULER_LOOKUP = {
    __proto__: null,
    raf: RAFStepScheduler,
    async: AsyncRAFStepScheduler,
    tasks: TaskTrackingStepScheduler,
};
