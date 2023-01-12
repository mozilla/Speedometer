/*<!doctype html>
<html lang="en" data-framework="react">
    <head>
        <meta charset="utf-8">
        <title>React TodoMVC example</title>
        <link rel="stylesheet" href="node_modules/todomvc-common/base.css">
        <link rel="stylesheet" href="node_modules/todomvc-app-css/index.css">
    </head>
    <body>
        <section class="todoapp"></section>
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
*/
        load("js/shell-polyfill-hack.js")
        print(document.childNodes.length)
        print(document.childNodes[0])
        let section = document.createElement("section");
        section.setAttribute("class", "todoapp")
        document.body.appendChild(section)
        print(document.documentMode === undefined)
        load("node_modules/classnames/index.js")
        load("node_modules/director/build/director.js")
        load("node_modules/react/dist/react-with-addons.min.js")
        load("node_modules/react-dom/dist/react-dom.min.js")
        load("build.min.js")
        let newTodo = document.getElementsByClassName("new-todo")[0];
        var ENTER_KEY = 13;
        var numberOfItemsToAdd = 200;
        let start = performance.now();
        for (let i = 0; i < numberOfItemsToAdd; i++) {
            newTodo.value = 'Something to do ' + i;
            newTodo.dispatchEvent({ type: 'input' })
            newTodo.dispatchEvent({ type: 'keydown', keyCode: ENTER_KEY})
        }
        let end = performance.now();
        console.log("took: " + (end - start) + "ms");
/*        <script>
            window.app.Utils.store = () => {};
        </script>
    </body>
</html>*/
