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
load('shell-polyfill-hack.js')
document.body.appendChild(document.createElement("app-root"))
/*load('inline.3b7f8ce2e6bc2f77dd83.bundle.js')
load("polyfills.3a2aed82a0c9b24e6585.bundle.js")
load("vendor.9a296bbc1909830a9106.bundle.js")
load("main.f1c5d33a6950c335064d.bundle.js")
*/
load('inline.bundle.js')
load("polyfills.bundle.js")
load("vendor.bundle.js")
load("main.bundle.js")

drainJobQueue()        
let newTodo = document.getElementsByClassName("new-todo")[0];


print("dod", newTodo)

var ENTER_KEY = 13;
        var numberOfItemsToAdd = 200;
        let total = 0;
        let start = performance.now();
        for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.value = 'Something to do ' + i;
                newTodo.dispatchEvent({ type: 'input' })
                newTodo.dispatchEvent({ type: 'keyup', keyCode: ENTER_KEY})
        }
        drainJobQueue()

                while (timeoutHandlers.length > 0) {
                let handler = timeoutHandlers.shift();
                handler();
        }
        let end = performance.now();
        console.log("took: " + (end - start) + "ms");
