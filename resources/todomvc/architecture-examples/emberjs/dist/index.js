
/*<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Ember.js TodoMVC example</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
<meta name="todomvc/config/environment" content="%7B%22modulePrefix%22%3A%22todomvc%22%2C%22environment%22%3A%22production%22%2C%22baseURL%22%3Anull%2C%22locationType%22%3A%22hash%22%2C%22EmberENV%22%3A%7B%22FEATURES%22%3A%7B%7D%2C%22EXTEND_PROTOTYPES%22%3A%7B%22Date%22%3Afalse%7D%7D%2C%22APP%22%3A%7B%22name%22%3A%22todomvc%22%2C%22version%22%3A%220.0.0+bc37752f%22%7D%2C%22exportApplicationGlobal%22%3Afalse%7D" />
    <link rel="stylesheet" href="assets/vendor-a45c44bc56b4692cca4a96b6916c0fde.css" integrity="sha256-wri71NgRSS8Ri2MYmuencXvYL+yQDweqc4LX9yrCstw= sha512-Quz1uKZ8tcCIvB9safdsFiWlRSunJyK+8elapH+Mx4qLx2+1CzYOAbjpaQDpmlMttL+Nra1P361yZrIyRhPDDA==" >
    
  </head>
  <body>
  */

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
load('shell-polyfill-hack.js')
use_development_environment = false;
if (use_development_environment) {
   load('assets/vendor.js')
} else {
   //load('assets/vendor-820919567eb7bd4d9fac358a90a5aac4.js')
   load('assets/vendor-f6e6f2e6629b21c0f89208bb38fbf438.js')
}

let meta = document.createElement("meta")
meta.setAttribute("name", "todomvc/config/environment")
if (use_development_environment) {
// development
meta.setAttribute("content", "%7B%22modulePrefix%22%3A%22todomvc%22%2C%22environment%22%3A%22development%22%2C%22baseURL%22%3Anull%2C%22locationType%22%3A%22hash%22%2C%22EmberENV%22%3A%7B%22FEATURES%22%3A%7B%7D%2C%22EXTEND_PROTOTYPES%22%3A%7B%22Date%22%3Afalse%7D%7D%2C%22APP%22%3A%7B%22name%22%3A%22todomvc%22%2C%22version%22%3A%220.0.0+24b094d1%22%7D%2C%22exportApplicationGlobal%22%3Atrue%7D")
} else {// production
//meta.setAttribute("content", "%7B%22modulePrefix%22%3A%22todomvc%22%2C%22environment%22%3A%22production%22%2C%22baseURL%22%3Anull%2C%22locationType%22%3A%22hash%22%2C%22EmberENV%22%3A%7B%22FEATURES%22%3A%7B%7D%2C%22EXTEND_PROTOTYPES%22%3A%7B%22Date%22%3Afalse%7D%7D%2C%22APP%22%3A%7B%22name%22%3A%22todomvc%22%2C%22version%22%3A%220.0.0+bc37752f%22%7D%2C%22exportApplicationGlobal%22%3Afalse%7D")
meta.setAttribute("content", "%7B%22modulePrefix%22%3A%22todomvc%22%2C%22environment%22%3A%22production%22%2C%22baseURL%22%3Anull%2C%22locationType%22%3A%22hash%22%2C%22EmberENV%22%3A%7B%22FEATURES%22%3A%7B%7D%2C%22EXTEND_PROTOTYPES%22%3A%7B%22Date%22%3Afalse%7D%7D%2C%22APP%22%3A%7B%22name%22%3A%22todomvc%22%2C%22version%22%3A%220.0.0+24b094d1%22%7D%2C%22exportApplicationGlobal%22%3Afalse%7D")
}
document.head.appendChild(meta)
if (use_development_environment) {
load('assets/todomvc.js')
} else {
//load('assets/todomvc-5d3e8eb3d5b3740a33185edcb11eeb57.js')
load('assets/todomvc-71af486dd179ab5504a3abf9a9b69823.js')
}
        while (timeoutHandlers.length > 0) {
                let handler = timeoutHandlers.shift();
                handler();
        }

        drainJobQueue()
        console.log("done init")

        //timeout(2, () => { backtrace(); return false })
        let newTodo = document.getElementsByClassName("new-todo")[0];
        console.log(newTodo)
        var ENTER_KEY = 13;
        var numberOfItemsToAdd = 200;
        let total = 0;
        let start = performance.now();
        for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.value = 'Something to do ' + i;
                newTodo.dispatchEvent({ type: 'input' })
                newTodo.dispatchEvent({ type: 'keydown', keyCode: ENTER_KEY})
        }

        while (timeoutHandlers.length > 0) {
                let handler = timeoutHandlers.shift();
                handler();
        }
        drainJobQueue()
        let end = performance.now();
        console.log("took ", end - start)
        total = end - start;
                start = performance.now();
        {
                let checkboxes = document.getElementsByClassName("toggle");
                console.log(checkboxes.length)
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                        checkboxes[i].dispatchEvent({ type: 'click' });
                }

        }
        end = performance.now();
        console.log("clicking took: " + (end - start) + "ms");
        total += end - start;

        start = performance.now();
        {
                let deleteButtons = document.getElementsByClassName("destroy");
                let start = performance.now();
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                        deleteButtons[i].dispatchEvent({ type: 'click' });
                }

        }
        end = performance.now();
        console.log("delete took: " + (end - start) + "ms");
        total += end - start;
        console.log(`total: ${total}`)
/*integrity="sha256-BZHBbf1U21+kgPYmoIK7gLkqHu88v5cwEVFfwUPXojs= sha512-2YWrAbR45p8fk3/y4Qhbok/KUfLE/v6yMSUqIWncTmWqfJbyJj0+AiTkJL03k0oPUMZbFYyQx9SuL6XoXp4sgg==" ></script>
    <script src="assets/todomvc-5d3e8eb3d5b3740a33185edcb11eeb57.js" integrity="sha256-TlR3MSC0+pEW7ypWHo2KbKJ8aGi7ebK3AAyXVdGlGJk= sha512-VrNV9WfIGB3sR8fm1qhLQwIISD4AQbarc5PqrKAddfNg+eNY/NynTA3N/eW0SHWQtOmNxSMOtP+aZlKfLi3r2A==" ></script>
    
  </body>
</html>*/
