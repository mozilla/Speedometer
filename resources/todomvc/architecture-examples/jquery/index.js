/*<!doctype html>
<html lang="en" data-framework="jquery">
    <head>
        <meta charset="utf-8">
        <title>jQuery • TodoMVC</title>
        <link rel="stylesheet" href="node_modules/todomvc-common/base.css">
        <link rel="stylesheet" href="node_modules/todomvc-app-css/index.css">
        <link rel="stylesheet" href="src/app.css">
    </head>
    <body>
        <section id="todoapp" class="todoapp">
            <header id="header" class="header">
                <h1>todos</h1>
                <input id="new-todo" class="new-todo" placeholder="What needs to be done?" autofocus>
            </header>
            <section id="main" class="main">
                <input id="toggle-all" class="toggle-all" type="checkbox">
                <label for="toggle-all">Mark all as complete</label>
                <ul id="todo-list" class="todo-list"></ul>
            </section>
            <footer id="footer" class="footer"></footer>
        </section>
        <footer id="info" class="info">
            <p>Double-click to edit a todo</p>
            <p>Created by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
        <script id="todo-template" type="text/x-handlebars-template">
            {{#this}}
            <li {{#if completed}}class="completed"{{/if}} data-id="{{id}}">
                <div class="view">
                    <input class="toggle" type="checkbox" {{#if completed}}checked{{/if}}>
                    <label>{{title}}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="{{title}}">
            </li>
        {{/this}}
        </script>
        <script id="footer-template" type="text/x-handlebars-template">
            <span id="todo-count" class="todo-count"><strong>{{activeTodoCount}}</strong> {{activeTodoWord}} left</span>
            <ul id="filters" class="filters">
                <li>
                    <a {{#eq filter 'all'}}class="selected"{{/eq}} href="#/all">All</a>
                </li>
                <li>
                    <a {{#eq filter 'active'}}class="selected"{{/eq}}href="#/active">Active</a>
                </li>
                <li>
                    <a {{#eq filter 'completed'}}class="selected"{{/eq}}href="#/completed">Completed</a>
                </li>
            </ul>
            {{#if completedTodos}}<button id="clear-completed">Clear completed</button>{{/if}}
        </script>
        <!-- <script src="node_modules/todomvc-common/base.js"></script> -->
        <script src="node_modules/jquery/dist/jquery.min.js"></script>
        <script src="node_modules/handlebars/dist/handlebars.min.js"></script>
        <script src="node_modules/director/build/director.min.js"></script>
        <script src="src/app.js"></script>
    </body>
</html>*/


        load("shell-polyfill-hack.js")

        var sectionTodoApp = document.createElement("section")
        sectionTodoApp.class = "todoapp";
        document.body.appendChild(sectionTodoApp);
        
        var header = document.createElement("header")
        header.class = "header";
        sectionTodoApp.appendChild(header)
        
        var input = document.createElement("input")
        input.class = "new-todo"
        input.id = "new-todo"
        header.appendChild(input)

        var main = document.createElement("section")
        main.class = "main";
        sectionTodoApp.appendChild(main)
        
        var input = document.createElement("input")
        input.class = "toggle-all"
        input.id = "toggle-all"
        main.appendChild(input)

        var ul = document.createElement("ul")
        ul.class = "todo-list"
        ul.id = "todo-list"
        main.appendChild(ul)
        
        var todoTemplate = document.createElement("script");
        todoTemplate.id = "todo-template";
        todoTemplate.innerHTML = `
        {{#this}}
            <li {{#if completed}}class="completed"{{/if}} data-id="{{id}}">
                <div class="view">
                    <input class="toggle" type="checkbox" {{#if completed}}checked{{/if}}>
                    <label>{{title}}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="{{title}}">
            </li>
        {{/this}}
        `
        document.body.appendChild(todoTemplate);
        var footerTemplate = document.createElement("script");
        footerTemplate.id = "footer-template"
        footerTemplate.innerHTML =
            `<span id="todo-count" class="todo-count"><strong>{{activeTodoCount}}</strong> {{activeTodoWord}} left</span>
            <ul id="filters" class="filters">
                <li>
                    <a {{#eq filter 'all'}}class="selected"{{/eq}} href="#/all">All</a>
                </li>
                <li>
                    <a {{#eq filter 'active'}}class="selected"{{/eq}}href="#/active">Active</a>
                </li>
                <li>
                    <a {{#eq filter 'completed'}}class="selected"{{/eq}}href="#/completed">Completed</a>
                </li>
            </ul>
            {{#if completedTodos}}<button id="clear-completed">Clear completed</button>{{/if}}
            `
        document.body.appendChild(footerTemplate)


        var start = performance.now();
        load("dist/jquery.min.js")
        load("dist/handlebars.min.js")
        load("dist/director.min.js")
        load("dist/app.js")

        while (timeoutHandlers.length > 0) {
                let handler = timeoutHandlers.shift();
                handler();
        }
        var end = performance.now()
        
        console.log("done init " + (end - start) + "ms")
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
                var e = new Event('keyup')
                e.keyCode = ENTER_KEY;
                e.which = ENTER_KEY;
                e.key = "Enter"
                newTodo.dispatchEvent(e);
        }
        
        while (timeoutHandlers.length > 0) {
                let handler = timeoutHandlers.shift();
                handler();
        }
        let end = performance.now();
        console.log(`RESULTS-Adding${numberOfItemsToAdd}Items ${end - start}`);
        total += end - start;
        }
        addingItems()
        start = performance.now();
        function completingItems() {
                let checkboxes = document.getElementsByClassName("toggle");
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                        checkboxes[i].dispatchEvent({ type: 'click' });
                }

        }
        completingItems()
        end = performance.now();
        console.log(`RESULTS-CompletingAllItems ${end - start}`);
        total += end - start;

        start = performance.now();
        function deletingItems() {
                let deleteButtons = document.getElementsByClassName("destroy");
                let start = performance.now();
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                        deleteButtons[i].dispatchEvent({ type: 'click' });
                }

        }
        deletingItems()
        end = performance.now();
        console.log(`RESULTS-DeletingAllItems ${end - start}`);
        total += end - start;
        console.log(`RESULTS-Total ${total}`);
}
benchmark()
/*
        <script>
        </script>
        </body>
        </html>*/
