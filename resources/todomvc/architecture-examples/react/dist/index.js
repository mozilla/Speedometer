/*<!DOCTYPE html>
<html lang="en" data-framework="react" data-version="17.0.2" data-features="">
    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="A TodoMVC workload app for Speedometer!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>TodoMVC: React</title>
    */


load('shell-polyfill-hack.js')
let section = document.createElement("section")
section.className = "todoapp"
section.id = "root"
document.body.appendChild(section)
load('app.bundle.js')
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
