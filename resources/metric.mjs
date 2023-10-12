import * as Statistics from "./statistics.mjs";

export const MILLISECONDS_PER_MINUTE = 60 * 1000;

export function hydrateExportedMetrics(json) {
    // The exported object doesn't have the getters and `parent` relationships. We need to hydrate it to
    // act as if the run was just completed.
    const metrics = {};

    function hydrateIndividualMetric(json) {
        const { name, unit, children } = json;
        const metric = new Metric(name, unit);

        const keys = Object.keys(json);
        for (const key of keys) {
            if (key === "name" || key === "unit" || key === "children")
                continue;
            metric[key] = json[key];
        }

        if (children) {
            for (const child of children) {
                const childMetric = hydrateIndividualMetric(child);
                metric.addChild(childMetric);
            }
        }

        return metric;
    }

    // The exported object includes steps as top-level keys, but they've lost the parent
    // associations which causes them to be treated as tests. They are also children of other
    // top-level metrics, so they don't need to exist at the top level at all.
    // We'll check if they are a child of anything else and skip them if so.
    let childSet = new Set();
    function collectChildren(json) {
        for (const child of json.children || []) {
            childSet.add(child.name);
            collectChildren(child);
        }
    }
    Object.values(json).forEach(collectChildren);

    for (const topLevelMetric of Object.values(json)) {
        if (!childSet.has(topLevelMetric.name)) {
            let metric = hydrateIndividualMetric(topLevelMetric);
            metrics[metric.name] = metric;
        }
    }

    return metrics;
}

export class Metric {
    static separator = "/";

    constructor(name, unit = "ms") {
        if (typeof name !== "string")
            throw new Error(`Invalid metric.name=${name}, expected string.`);
        this.name = name;
        this.unit = unit;

        this.mean = 0.0;
        this.geomean = 0.0;
        this.delta = 0.0;
        this.percentDelta = 0.0;

        this.sum = 0.0;
        this.min = 0.0;
        this.max = 0.0;

        this.values = [];
        this.children = [];

        // Mark properties which refer to other Metric objects as
        // non-enumerable to avoid issue with JSON.stringify due to circular
        // references.
        Object.defineProperties(this, {
            parent: {
                writable: true,
                value: undefined,
            },
        });
    }

    get shortName() {
        return this.parent ? this.name.replace(`${this.parent.name}-`, "") : this.name;
    }

    get valueString() {
        const mean = this.mean.toFixed(2);
        if (!this.percentDelta || !this.delta)
            return `${mean} ${this.unit}`;
        return `${mean} ± ${this.deltaString} ${this.unit}`;
    }

    get deltaString() {
        if (!this.percentDelta || !this.delta)
            return "";
        return `${this.delta.toFixed(2)} (${this.percentDelta.toFixed(1)}%)`;
    }

    get length() {
        return this.values.length;
    }

    addChild(metric) {
        if (metric.parent)
            throw new Error("Cannot re-add sub metric");
        metric.parent = this;
        this.children.push(metric);
    }

    add(value) {
        if (typeof value !== "number")
            throw new Error(`Adding invalid value=${value} to metric=${this.name}`);
        this.values.push(value);
    }

    computeAggregatedMetrics() {
        // Avoid the loss of significance for the sum.
        const sortedValues = this.values.concat().sort((a, b) => a - b);
        this.sum = Statistics.sum(sortedValues);
        this.min = sortedValues[0];
        this.max = sortedValues[sortedValues.length - 1];
        this.mean = this.sum / this.values.length;
        const product = Statistics.product(sortedValues);
        this.geomean = Math.pow(product, 1 / this.values.length);
        if (this.values.length > 1) {
            const squareSum = Statistics.squareSum(sortedValues);
            this.delta = Statistics.confidenceIntervalDelta(0.95, this.values.length, this.sum, squareSum);
            this.percentDelta = isNaN(this.delta) ? undefined : (this.delta * 100) / this.mean;
        }
    }
}
