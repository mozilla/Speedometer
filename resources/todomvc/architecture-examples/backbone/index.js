
        load("shell-polyfill-hack.js")
/*<!doctype html>
<html lang="en" data-framework="backbonejs">
    <head>
        <meta charset="utf-8">
        <title>Backbone.js TodoMVC example</title>
        <link rel="stylesheet" href="node_modules/todomvc-common/base.css">
        <link rel="stylesheet" href="node_modules/todomvc-app-css/index.css">
    </head>
    <body>
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input class="new-todo" placeholder="What needs to be done?" autofocus>
            </header>
            <section class="main">
                <input class="toggle-all" id="toggle-all" type="checkbox">
                <label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list"></ul>
            </section>
            <footer class="footer"></footer>
        </section>
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <p>Written by <a href="https://github.com/addyosmani">Addy Osmani</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>*/

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

        var ul = document.createElement("ul")
        ul.class = "todo-list"
        main.appendChild(ul)
        
        var itemTemplate = document.createElement("script");
        itemTemplate.id = "item-template";
        itemTemplate.innerHTML = `
            <div class="view">
                <input class="toggle" type="checkbox" <%= completed ? 'checked' : '' %>></input>
                <label><%- title %></label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="<%- title %>"></input>`
        document.body.appendChild(itemTemplate);
        var statsTemplate = document.createElement("script");
        statsTemplate.id = "stats-template"
        statsTemplate.innerHTML =
            `<span class="todo-count"><strong><%= remaining %></strong> <%= remaining === 1 ? 'item' : 'items' %> left</span>
            <ul class="filters">
                <li>
                    <a class="selected" href="#/">All</a>
                </li>
                <li>
                    <a href="#/active">Active</a>
                </li>
                <li>
                    <a href="#/completed">Completed</a>
                </li>
            </ul>
            <% if (completed) { %>
            <button class="clear-completed">Clear completed</button>
            <% } %>`
        document.body.appendChild(statsTemplate)


        load("node_modules/jquery/dist/jquery.js")
        load("node_modules/underscore/underscore.js")
        load("node_modules/backbone/backbone.js")
        load("js/backbone.sync.js")
        load("js/models/todo.js")
        load("js/collections/todos.js")
        load("js/views/todo-view.js")
        load("js/views/app-view.js")
        load("js/routers/router.js")
        load("js/app.js")

        window.Backbone.sync  = () => {};
        while (timeoutHandlers.length > 0) {
                let handler = timeoutHandlers.shift();
                handler();
        }
        
        console.log("done init")
        let newTodo = document.getElementsByClassName("new-todo")[0];
        var ENTER_KEY = 13;
        var numberOfItemsToAdd = 200;
        let start = performance.now();
        for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.value = 'Something to do ' + i;
                newTodo.dispatchEvent({ type: 'input' })
                newTodo.dispatchEvent({ type: 'keypress', keyCode: ENTER_KEY})
        }
        
        while (timeoutHandlers.length > 0) {
                let handler = timeoutHandlers.shift();
                handler();
        }
        let end = performance.now();
        console.log("took: " + (end - start) + "ms");

        /*
        <script>
        </script>
        </body>
        </html>*/
