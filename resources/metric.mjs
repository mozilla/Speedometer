import * as Statistics from "./statistics.mjs";

export const MILLISECONDS_PER_MINUTE = 60 * 1000;

export function exportObjectToMetricObject(json) {
    console.log("Processing export");
    // This object doesn't have the getters and `parent` relationship. We need to loop through and make sure everything is
    // connected so the UI will work
    const metrics = {};
    const metricNames = Object.keys(json);

    for (const metricName of metricNames) {
        const { unit, mean, geomean, delta, percentDelta, sum, min, max, values, children } = json[metricName];
        const metric = new Metric(metricName, unit);
        metric.mean = mean;
        metric.geomean = geomean;
        metric.delta = delta;
        metric.percentDelta = percentDelta;
        metric.sum = sum;
        metric.min = min;
        metric.max = max;
        metric.values = values;

        if (children) {
            for (const child of children) {
                const childMetric = exportObjectToMetricObject(child);
                metric.addChild(childMetric);
            }
        }
        if (metric.parent === undefined)
            metrics[metricName] = metric;

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
