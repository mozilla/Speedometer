load('shell-polyfill-hack.js')

if ("drainMicrotasks" in globalThis) {
    print("jsc")
    // webkit
    globalThis["drainJobQueue"] = drainMicrotasks
} else if ("version" in globalThis) {
    // v8
    print("v8")
    // run with --allow-natives-syntax
    globalThis["drainJobQueue"] = eval("() => { %PerformMicrotaskCheckpoint(); }")
}
var section = document.createElement("section")
section.id = "root"
section.className = "todoapp"
document.body.appendChild(section)
load('app.bundle.js')
drainJobQueue()

function benchmark() {
    let newTodo = document.getElementsByClassName("new-todo")[0];
    var ENTER_KEY = 13;
    var numberOfItemsToAdd = 100;
    let total = 0;
    let start = performance.now();
    function addingItems() {
        for (let i = 0; i < numberOfItemsToAdd; i++) {
            newTodo.value = 'Something to do ' + i;
            newTodo.dispatchEvent(new Event('input'))
            var e = new Event('keydown')
            e.keyCode = ENTER_KEY;
            e.key = "enter"
            newTodo.dispatchEvent(e)
        }
        drainJobQueue()
    }
    addingItems()
    let end = performance.now();
    console.log("took: " + (end - start) + "ms");
    function toggleItems() {
        let checkboxes = Array.prototype.slice.call(document.getElementsByClassName("toggle"));
        console.log(checkboxes.length)
        for (let i = 0; i < numberOfItemsToAdd; i++) {
            checkboxes[i].dispatchEvent(new Event('change'));
        }
        drainJobQueue()

    }
    toggleItems()
    end = performance.now();
    console.log("clicking took: " + (end - start) + "ms");
    total += end - start;

    start = performance.now();
    function removeItems() {
        let deleteButtons = Array.prototype.slice.call(document.getElementsByClassName("destroy"));
        let start = performance.now();
        for (let i = 0; i < numberOfItemsToAdd; i++) {
            deleteButtons[i].dispatchEvent(new Event('click'));
        }
        drainJobQueue()
    }
    removeItems()
    end = performance.now();
    console.log("delete took: " + (end - start) + "ms");
    total += end - start;
    console.log(`total: ${total}`)
}
benchmark()
