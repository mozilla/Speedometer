import { TestRunner } from "./test-runner.mjs";
import { WarmupSuite } from "./benchmark-runner.mjs";

export class SuiteRunner {
    #frame;
    #page;
    #params;
    #suite;
    #client;
    #suiteResults;

    constructor(frame, page, params, suite, client, measuredValues) {
        // FIXME: Create SuiteRunner-local measuredValues.
        this.#suiteResults = measuredValues.tests[suite.name];
        if (!this.#suiteResults) {
            this.#suiteResults = { tests: {}, total: 0 };
            measuredValues.tests[suite.name] = this.#suiteResults;
        }
        this.#frame = frame;
        this.#page = page;
        this.#client = client;
        this.#suite = suite;
        this.#params = params;
    }

    get frame() {
        return this.#frame;
    }

    get page() {
        return this.#page;
    }

    get params() {
        return this.#params;
    }

    get suite() {
        return this.#suite;
    }

    get client() {
        return this.#client;
    }

    get suiteResults() {
        return this.#suiteResults;
    }

    async run() {
        await this._prepareSuite();
        await this._runSuite();
    }

    async _prepareSuite() {
        const suiteName = this.#suite.name;
        const suitePrepareStartLabel = `suite-${suiteName}-prepare-start`;
        const suitePrepareEndLabel = `suite-${suiteName}-prepare-end`;

        performance.mark(suitePrepareStartLabel);
        await this._loadFrame();
        await this.#suite.prepare(this.#page);
        performance.mark(suitePrepareEndLabel);

        performance.measure(`suite-${suiteName}-prepare`, suitePrepareStartLabel, suitePrepareEndLabel);
    }

    async _runSuite() {
        const suiteName = this.#suite.name;
        const suiteStartLabel = `suite-${suiteName}-start`;
        const suiteEndLabel = `suite-${suiteName}-end`;

        performance.mark(suiteStartLabel);
        for (const test of this.#suite.tests) {
            if (this.#client?.willRunTest)
                await this.#client.willRunTest(this.#suite, test);

            const testRunner = new TestRunner(this.#frame, this.#page, this.#params, this.#suite, test, this._recordTestResults);
            await testRunner.runTest();
        }
        performance.mark(suiteEndLabel);

        performance.measure(`suite-${suiteName}`, suiteStartLabel, suiteEndLabel);
        this._validateSuiteTotal();
    }

    _validateSuiteTotal() {
        // When the test is fast and the precision is low (for example with Firefox'
        // privacy.resistFingerprinting preference), it's possible that the measured
        // total duration for an entire is 0.
        const suiteTotal = this.#suiteResults.total;
        if (suiteTotal === 0)
            throw new Error(`Got invalid 0-time total for suite ${this.#suite.name}: ${suiteTotal}`);
    }

    async _loadFrame() {
        return new Promise((resolve, reject) => {
            const frame = this.#frame;
            frame.onload = () => resolve();
            frame.onerror = () => reject();
            frame.src = `${this.#suite.url}?${this.#params.toSearchParams(true)}`;
        });
    }

    _recordTestResults = async (test, syncTime, asyncTime) => {
        // Skip reporting updates for the warmup suite.
        if (this.#suite === WarmupSuite)
            return;

        const total = syncTime + asyncTime;
        this.#suiteResults.tests[test.name] = { tests: { Sync: syncTime, Async: asyncTime }, total: total };
        this.#suiteResults.total += total;

        await this._updateClient(test);
    };

    async _updateClient(test, suite = this.#suite) {
        if (this.#client?.didRunTest)
            await this.#client.didRunTest(suite, test);
    }
}

export class RemoteSuiteRunner extends SuiteRunner {
    #appId;

    get appId() {
        return this.#appId;
    }

    set appId(id) {
        this.#appId = id;
    }

    async run() {
        this.postMessageCallbacks = new Map();
        const handler = this._handlePostMessage.bind(this);
        window.addEventListener("message", handler);

        // FIXME: use this._suite in all SuiteRunner methods directly.
        await this._prepareSuite();
        await this._runSuite();

        window.removeEventListener("message", handler);
    }

    async _prepareSuite() {
        const suiteName = this.suite.name;
        const suitePrepareStartLabel = `suite-${suiteName}-prepare-start`;
        const suitePrepareEndLabel = `suite-${suiteName}-prepare-end`;

        performance.mark(suitePrepareStartLabel);

        // Wait for the app-ready message from the workload.
        const promise = this._subscribeOnce("app-ready");
        await this._loadFrame(this.suite);
        const response = await promise;
        await this.suite.prepare(this.page);
        // Capture appId to pass along with messages.
        this.appId = response?.appId;

        performance.mark(suitePrepareEndLabel);

        performance.measure(`suite-${suiteName}-prepare`, suitePrepareStartLabel, suitePrepareEndLabel);
    }

    async _runSuite() {
        // Update progress bar with each completed step.
        this._startSubscription("step-complete", async (e) => this._updateClient(e.data.test, e.data.name));
        // Ask workload to run its own tests.
        this.frame.contentWindow.postMessage({ id: this.appId, key: "benchmark-connector", type: "benchmark-suite", name: this.suite.config?.name || "default" }, "*");
        // Capture metrics from the completed tests.
        const response = await this._subscribeOnce("suite-complete");
        this._stopSubscription("step-complete");

        this.suiteResults.tests = response.result.tests;
        this.suiteResults.total += response.result.total;

        this._validateSuiteTotal();
    }

    _handlePostMessage(e) {
        if (this.postMessageCallbacks.has(e.data.type))
            this.postMessageCallbacks.get(e.data.type)(e);
    }

    _startSubscription(type, callback) {
        if (this.postMessageCallbacks.has(type))
            throw new Error("Callback exists already");

        this.postMessageCallbacks.set(type, callback);
    }

    _stopSubscription(type) {
        if (!this.postMessageCallbacks.has(type))
            throw new Error("Callback does not exist");

        this.postMessageCallbacks.delete(type);
    }

    _subscribeOnce(type) {
        return new Promise((resolve) => {
            this._startSubscription(type, (e) => {
                this._stopSubscription(type);
                resolve(e.data);
            });
        });
    }
}

export const SUITE_RUNNER_LOOKUP = {
    __proto__: null,
    default: SuiteRunner,
    remote: RemoteSuiteRunner,
};
