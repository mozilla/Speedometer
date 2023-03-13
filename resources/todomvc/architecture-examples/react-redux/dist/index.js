/*<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>React Redux TodoMVC example</title>
    <link href="./static/css/main.21111742.css" rel="stylesheet">
</head>

<body>
    <div class="todoapp" id="root"></div>*/
    load('shell-polyfill-hack.js')

    var div = document.createElement("div")
div.className = "todoapp"
div.id = "root"
document.body.appendChild(div)
    load('static/js/main.18b409e1.js')


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
        //drainJobQueue()
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
        //drainJobQueue()

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
        //drainJobQueue()
    }
    removeItems()
    end = performance.now();
    console.log("delete took: " + (end - start) + "ms");
    total += end - start;
    console.log(`total: ${total}`)
    /*
    <script type="text/javascript" src="./static/js/main.18b409e1.js"></script>
</body>

</html>*/