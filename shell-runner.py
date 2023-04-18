#!/usr/bin/env python3

import argparse
import os
import re
import subprocess
import sys
import shutil
import statistics
from collections import defaultdict

suite_dirs = {
    "Preact": "resources/todomvc/architecture-examples/preact/index.js",
    "Backbone": "resources/todomvc/architecture-examples/backbone/index.js",
    "React": "resources/todomvc/architecture-examples/react/index.js",
    "React-redux": "resources/todomvc/architecture-examples/react-redux/index.js",
    "Svelte": "resources/todomvc/architecture-examples/svelte/index.js",
    "Angular": "resources/todomvc/architecture-examples/angular/index.js",
    "JavaScript-ES6": "resources/todomvc/vanilla-examples/javascript-es6/index.js",
}


def log_verbose(verbose, msg):
    if verbose:
        print(msg)


def run_suite(suite, iteration_count, js_shell, js_shell_args, verbose):
    index_js_path = suite_dirs[suite]
    suite_dir = os.path.dirname(index_js_path)
    suite_file = os.path.basename(index_js_path)

    initial_dir = os.getcwd()
    os.chdir(suite_dir)

    results = []
    for i in range(iteration_count):
        log_verbose(verbose, f"Running suite '{suite}' '{index_js_path}' ({i + 1}/{iteration_count})...")
        cmd = [js_shell] + js_shell_args + [suite_file]
        output = subprocess.check_output(cmd).decode("utf-8")
        for line in output.splitlines():
            log_verbose(verbose, f"  {suite}> {line}")
            match = re.match(r"RESULTS-(.*)\ (.*)", line)
            if match:
                step, time = match.groups()
                key = f"{suite}/{step}"
                results.append((i + 1, key, time))

    os.chdir(initial_dir)
    return results


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--suite", action="append", choices=suite_dirs.keys())
    parser.add_argument("-i", "--iteration-count", type=int, default=1)
    parser.add_argument("--summary", action="store_true")
    parser.add_argument("--js-shell", default=os.environ.get("JS_SHELL", "js"))
    parser.add_argument("--js-shell-args", default="")
    parser.add_argument("-v", "--verbose", action="store_true")
    parser.add_argument("output_file", nargs="?", default="/dev/stdout")
    args = parser.parse_args()

    if not args.suite:
        args.suite = list(suite_dirs.keys())

    if not shutil.which(args.js_shell):
        sys.stderr.write(f"Error: JavaScript shell '{args.js_shell}' not found. "
                         "Make sure the path is correct or the JS_SHELL environment variable is set.\n")
        sys.exit(1)

    results = []
    for suite in args.suite:
        results.extend(run_suite(suite, args.iteration_count, args.js_shell, args.js_shell_args.split(" ") if args.js_shell_args else [], args.verbose))

    # Aggregate results
    aggregated_results = defaultdict(lambda: defaultdict(list))
    for iteration, step, time in results:
        aggregated_results[step][iteration] = float(time)

    # Write output to file
    with open(args.output_file, "w") as f:
        if args.summary:
            f.write("Step,mean,stddev\n")
            for step in aggregated_results:
                results = list(aggregated_results[step].values())
                f.write(f"{step},{statistics.mean(results)},{statistics.stdev(results)}\n")
        else:
            f.write("Step," + ",".join(f"#{i}" for i in range(1, args.iteration_count + 1)) + "\n")
            for step in aggregated_results:
                f.write(step + "," + ",".join(str(aggregated_results[step][i]) for i in range(1, args.iteration_count + 1)) + "\n")


if __name__ == "__main__":
    main()
