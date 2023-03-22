/*<!DOCTYPE html>
<html>

<head>
    <meta charset=utf-8>
    <title>vue-cli-todomvc</title>
    <link href=./static/css/app.5b47040a23ec3fcb78037de398c53557.css rel=stylesheet>
</head>

<body>
    <div id=app></div>*/
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
    load('dist/js/chunk-vendors.0c85b804.js')
    let div = document.createElement("div")
    div.id = "app"
    document.body.appendChild(div)
    load('dist/js/app.846f3068.js')
    drainJobQueue()
        let newTodo = document.getElementsByClassName("new-todo")[0];
    var numberOfItemsToAdd = 100;
    var ENTER_KEY = 13;
    var numberOfItemsToAdd = 100;
    let total = 0;
    let start = performance.now();
        function addingItems() {
        for (let i = 0; i < numberOfItemsToAdd; i++) {
            newTodo.value = 'Something to do ' + i;
            newTodo.dispatchEvent(new Event('input'))
            var e = new Event('keyup')
            e.keyCode = ENTER_KEY;
            e.key = "Enter"
            newTodo.dispatchEvent(e)
        }
        drainJobQueue()
    }
    addingItems()
    let end = performance.now();
    console.log("took: " + (end - start) + "ms");
    /*
</body>

</html>*/
