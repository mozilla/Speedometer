/*<!DOCTYPE html>
<html lang="en" data-framework="react" data-version="17.0.2" data-features="">
    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="A TodoMVC workload app for Speedometer!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>TodoMVC: React</title>
    */
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

load('shell-polyfill-hack.js')
let section = document.createElement("section")
section.className = "todoapp"
section.id = "root"
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
            newTodo.dispatchEvent(e)
        }
        drainJobQueue()
    }
    addingItems()
    let end = performance.now();
    total = end - start;
    console.log("took: " + (end - start) + "ms");
    start = performance.now()
    function toggleItems() {
        let checkboxes = document.getElementsByClassName("toggle");
        console.log(checkboxes.length)
        for (let i = 0; i < numberOfItemsToAdd; i++) {
            checkboxes[i].dispatchEvent(new Event('click'));
        }
        drainJobQueue()

    }
    toggleItems()
    end = performance.now();
    console.log("clicking took: " + (end - start) + "ms");
    total += end - start;

    start = performance.now();
    function removeItems() {
        let deleteButtons = document.getElementsByClassName("destroy");
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

/*
    <script defer src="app.bundle.js"></script></head>
    <body>
        <section class="todoapp" id="root"></section>
        <footer class="info">
            <p>Click on input field to write your todo.</p>
            <p>At least two characters are needed to be a valid entry.</p>
            <p>Press 'enter' to add the todo.</p>
            <p>Double-click to edit a todo</p>
        </footer>
    </body>
</html>*/
