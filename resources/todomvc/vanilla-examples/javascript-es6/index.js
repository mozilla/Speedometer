/*<!DOCTYPE html>
<html lang="en" data-framework="javascript" data-version="es6" data-features="">
    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="A TodoMVC workload app for Speedometer!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>TodoMVC: JavaScript Es6</title>
        <link rel="stylesheet" href="node_modules/todomvc-common/base.css" />
        <link rel="stylesheet" href="node_modules/todomvc-app-css/index.css" />
    </head>
    <body>
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input class="new-todo" placeholder="What needs to be done?" autofocus />
            </header>
            <section class="main">
                <input class="toggle-all" type="checkbox" />
                <label class="toggle-all-label" for="toggle-all">Mark all as complete</label>
                <ul class="todo-list"></ul>
            </section>
            <footer class="footer">
                <span class="todo-count"></span>
                <ul class="filters">
                    <li>
                        <a href="#/" class="selected">All</a>
                    </li>
                    <li>
                        <a href="#/active">Active</a>
                    </li>
                    <li>
                        <a href="#/completed">Completed</a>
                    </li>
                </ul>
                <button class="clear-completed">Clear completed</button>
            </footer>
        </section>
        <footer class="info">
            <p>Click on input field to write your todo.</p>
            <p>At least two characters are needed to be a valid entry.</p>
            <p>Press 'enter' to add the todo.</p>
            <p>Double-click to edit a todo</p>
        </footer>*/
        load("shell-polyfill-hack.js")

        var sectionTodoApp = document.createElement("section")
        sectionTodoApp.class = "todoapp";
        document.body.appendChild(sectionTodoApp);
        
        var header = document.createElement("header")
        header.class = "header";
        sectionTodoApp.appendChild(header)
        
        var input = document.createElement("input")
        input.class = "new-todo"
        header.appendChild(input)

        var main = document.createElement("section")
        main.class = "main";
        sectionTodoApp.appendChild(main)
        
        var input = document.createElement("input")
        input.class = "toggle-all"
        main.appendChild(input)

	var label = document.createElement("label")
        label.class = "toggle-all-label"
        main.appendChild(label)

        var ul = document.createElement("ul")
        ul.class = "todo-list"
        main.appendChild(ul)
        
        var footer = document.createElement("footer")
        footer.class = "footer";
        sectionTodoApp.appendChild(footer)
                
        var count = document.createElement("span")
	count.class = "todo-count";
	footer.appendChild(count)

	var clearCompleted = document.createElement("button")
        clearCompleted.class = "clear-completed";
	sectionTodoApp.appendChild(clearCompleted)
 
        load("src/helpers.js")
        load("src/store.js")
        load("src/model.js")
        load("src/template.js")
        load("src/view.js")
        load("src/controller.js")
        load("src/app.js")
        window.dispatchEvent(new Event('load'))
	function benchmark() {
    let newTodo = document.getElementsByClassName("new-todo")[0];
    var ENTER_KEY = 13;
    var numberOfItemsToAdd = 100;
    let total = 0;
    let start = performance.now();
    function addingItems() {
        for (let i = 0; i < numberOfItemsToAdd; i++) {
            newTodo.value = 'Something to do ' + i;
            newTodo.dispatchEvent(new Event('change'))
            var e = new Event('keypress')
            e.keyCode = ENTER_KEY;
            e.key = "Enter"
            newTodo.dispatchEvent(e)
        }
        drainJobQueue()
    }
    addingItems()
    let end = performance.now();
    console.log(`RESULTS-Adding${numberOfItemsToAdd}Items ${end - start}`);
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
    console.log(`RESULTS-CompletingAllItems ${end - start}`);
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
    console.log(`RESULTS-DeletingAllItems ${end - start}`);
    total += end - start;
    console.log(`RESULTS-Total ${total}`);
}
benchmark()
	/*
    </body>
</html>*/
