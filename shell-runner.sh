#!/usr/bin/env bash

suite_dirs=(
  "Preact:resources/todomvc/architecture-examples/preact/index.js"
  "Backbone:resources/todomvc/architecture-examples/backbone/index.js"
  "React:resources/todomvc/architecture-examples/react/index.js"
  "React-redux:resources/todomvc/architecture-examples/react-redux/index.js"
)
suite_dirs_keys=("${suite_dirs[@]%%:*}")
verbose=false
suites=()
iteration_count=1
output_file="/dev/stdout"

function log_verbose {
  if [[ $verbose == true ]]; then
    echo "$1"
  fi
}

function usage {
  echo "Usage: $0 [--suite suite-name]... [--iteration-count count] [--js-shell path-to-js-shell] [--js-shell-args js-shell-arguments] [-v|--verbose] [output-file]"
  echo "  --suite suite-name: The suite(s) to run. Can be passed multiple times to run multiple suites. Defaults to all."
  echo "  --iteration-count count: Number of times to run each test. Defaults to 1."
  echo "  --js-shell path-to-js-shell: Path to the JavaScript shell executable. Defaults to the JS_SHELL environment variable, or 'js' if not set."
  echo "  --js-shell-args js-shell-arguments: Additional arguments to pass to the JavaScript shell."
  echo "  -v, --verbose: Enable verbose output."
  echo "  --help: Print this help message."
  echo "  output-file: Specify the name of the output file. Defaults to stdout."
  exit 1
}

if [[ $# -eq 0 ]]; then
  usage
fi

while [[ $# -gt 0 ]]; do
  case "$1" in
    --suite)
      if ! [[ " ${suite_dirs_keys[*]} " =~ " $2 " ]]; then
        echo "Error: Invalid suite name '$2'. Valid options are: ${suite_dirs_keys[*]}" >&2
        exit 1
      fi
      suites+=("$2")
      shift 2
      ;;
    --iteration-count)
      if [[ $2 -gt 0 ]]; then
        iteration_count=$2
      else
        echo "Error: Iteration count must be a positive integer." >&2
        exit 1
      fi
      shift 2
      ;;
    --js-shell)
      js_shell="$2"
      shift 2
      ;;
    --js-shell-args)
      js_shell_args="$2"
      shift 2
      ;;
    -v|--verbose)
      verbose=true
      shift
      ;;
    --help)
      usage
      ;;
    *)
      output_file="$1"
      shift
      ;;
  esac
done

# If none were provided, run all suites
if [[ ${#suites[@]} -eq 0 ]]; then
  suites=("${suite_dirs_keys[@]}")
fi

# Sanity check that we'll be able to run scripts
if ! command -v "$js_shell" &> /dev/null; then
  echo "Error: JavaScript shell '$js_shell' not found. Make sure the path is correct or the JS_SHELL environment variable is set." >&2
  exit 1
fi

# We'll store results in a plain array combined with the : character
# Then later will split to aggregate for a report. This would be easier
# with an associative array but it seems not always available on bash on MacOS
results=()
function get_scores() {
  local search_step=$1
  local scores=()
  for result in "${results[@]}"; do
    IFS=":" read -r iteration step score <<< "$result"
    if [[ "$step" == "$search_step" ]]; then
      scores+=("$score")
    fi
  done
  echo "${scores[@]}"
}

function run_suite {
  local suite=$1
  # This is capturing the second half of i.e.
  # "Preact:resources/todomvc/architecture-examples/preact/index.js"
  local index_js_path=$(printf "%s\n" "${suite_dirs[@]}" | grep "$suite:" | cut -d: -f2)
  local suite_dir=$(dirname "$index_js_path")
  local suite_file=$(basename "$index_js_path")
  local initial_dir=$(pwd)

  if ! cd "$suite_dir"; then
    echo "Error: Unable to change to directory '$suite_dir'. Check if the directory exists." >&2
    exit 1
  fi

  for i in $(seq $iteration_count); do
    log_verbose "Running suite '$suite' '$index_js_path' (${i}/${iteration_count})..."

    while read -r line; do
      log_verbose "  $suite> $line"
      if [[ $line =~ RESULTS-(.*)\ (.*) ]]; then
        local step=${BASH_REMATCH[1]}
        local time=${BASH_REMATCH[2]}
        local key="${suite}-${step}"
        results+=("${i}:${key}:${time}")
      fi
    done < <($js_shell $js_shell_args "$suite_file")
  done

  cd "$initial_dir" || exit 1
}

for suite in "${suites[@]}"; do
  run_suite $suite
done

# The results array now looks like this
# 1:SuiteA-StepC:Time1
# 1:SuiteA-StepD:Time2
# 2:SuiteA-StepC:Time3
# 2:SuiteA-StepD:Time4
# 1:SuiteB-StepC:Time5
# 1:SuiteB-StepD:Time6
# 2:SuiteB-StepC:Time7
# 2:SuiteB-StepD:Time8

# And we want that to be outputted as the following CSV
# Step,#1,#2
# SuiteA-StepC,Time1,Time3
# SuiteA-StepD,Time2,Time4
# SuiteB-StepC,Time5,Time7
# SuiteB-StepD,Time6,Time8
column_headers=$(printf '#%d,' $(seq 1 $iteration_count) | sed 's/,$//')
unique_steps=$(printf "%s\n" "${results[@]}" | awk -F: '{if (!seen[$2]++) print $2}' )
echo "Step,$column_headers" > $output_file
for step in $unique_steps; do
  echo "$step,$(get_scores "$step" | tr ' ' ',')" >> $output_file
done
