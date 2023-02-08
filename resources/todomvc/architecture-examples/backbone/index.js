
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
        var itemTemplate = document.createElement("script");
        itemTemplate.id = "item-template";
        itemTemplate.innerHTML = `<script type="text/template" id="item-template">
            <div class="view">
                <input class="toggle" type="checkbox" <%= completed ? 'checked' : '' %>>
                <label><%- title %></label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="<%- title %>">
        </script>`
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
        /*
        <script>
            window.Backbone.sync  = () => {};
        </script>
    </body>
</html>*/
