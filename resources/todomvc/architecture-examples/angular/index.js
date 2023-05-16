/*<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Angular 4 TodoMVC example</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="assets/css/todomvc-common.css">
  <link rel="stylesheet" href="assets/css/todomvc-app.css">
<link href="styles.d41d8cd98f00b204e980.bundle.css" rel="stylesheet"/></head>
<body>
  <app-root>Loading...</app-root>
  <!-- Credits: Addy Osmani -->
*/

if ("drainMicrotasks" in globalThis) {
   print("jsc")
   // webkit
   var drainJobQueue = drainMicrotasks
} else if ("version" in globalThis) {
   // v8
   print("v8")
   // run with --allow-natives-syntax
   var drainJobQueue = eval("() => { %PerformMicrotaskCheckpoint(); }")
}
performance.measure = function() {}
load('shell-polyfill-hack.js')
document.body.appendChild(document.createElement("app-root"));

load("dist/runtime.e42baa953544dd4f.js")// type="module"></script>
load("dist/polyfills.e666e00fbdd942b1.js")// type="module"></script>
load("dist/main.a554e93481d86451.js")// type="module"></script>

drainJobQueue()        

let inShell = false;
function benchmark() {
    let newTodo = document.getElementsByClassName("new-todo")[0];
    var ENTER_KEY = 13;
    var numberOfItemsToAdd = 100;
    let total = 0;
    let start = performance.now();
    function addingItems() {
        for (let i = 0; i < numberOfItemsToAdd; i++) {
            newTodo.value = 'Something to do ' + i;
            newTodo.dispatchEvent({ type: 'input' })
            newTodo.dispatchEvent({ type: 'keyup', keyCode: ENTER_KEY, key: 'Enter'})
        }
        drainJobQueue()


        while (timeoutHandlers.length > 0) {
        let handler = timeoutHandlers.shift();
        handler();
        }
    }
    addingItems()
    let end = performance.now();
    console.log(`RESULTS-Adding${numberOfItemsToAdd}Items ${end - start}`);
    function toggleItems() {
        let checkboxes = document.getElementsByClassName("toggle");
        for (let i = 0; i < numberOfItemsToAdd; i++) {
            checkboxes[i].dispatchEvent({ type: 'click' });
        }
    }
    toggleItems()
    end = performance.now();
    console.log(`RESULTS-CompletingAllItems ${end - start}`);
    total += end - start;

    start = performance.now();
    function removeItems() {
        let deleteButtons = document.getElementsByClassName("destroy");
        let start = performance.now();
        for (let i = 0; i < numberOfItemsToAdd; i++) {
            deleteButtons[i].dispatchEvent({ type: 'click' });
        }

    }
    removeItems()
    end = performance.now();
    console.log(`RESULTS-DeletingAllItems ${end - start}`);
    total += end - start;
    console.log(`RESULTS-Total ${total}`);
}
benchmark()