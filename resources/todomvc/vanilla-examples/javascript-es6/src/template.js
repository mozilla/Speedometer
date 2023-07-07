/* eslint no-unused-vars: 0 */
"use strict";

const htmlEscapes = {
    "&": "&amp",
    "<": "&lt",
    ">": "&gt",
    '"': "&quot",
    "'": "&#x27",
    "`": "&#x60",
};

const reUnescapedHtml = /[&<>"'`]/g;
const reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

const escape = (str) => str && reHasUnescapedHtml.test(str) ? str.replace(reUnescapedHtml, escapeHtmlChar) : str;
const escapeHtmlChar = (chr) => htmlEscapes[chr];

const stringReplaceRegex = /{{id}}|{{title}}|{{completed}}|{{checked}}|{{list-index}}|{{view-index}}/gi;

function template({ id, title, completed, checked, listindex, viewindex }) {
    return `
        <li data-id="${id}" class="targeted li-${listindex} ${completed}">
            <div class="targeted view-${viewindex}">
                <input class="toggle" type="checkbox" ${checked}>
                <label>${title}</label>
                <button class="destroy"></button>
            </div>
        </li>
  `;
}

class Template {
    /**
     * Creates an <li> HTML string and returns it for placement in your app.
     *
     * NOTE: In real life you should be using a templating engine such as Mustache
     * or Handlebars, however, this is a vanilla JS example.
     *
     * @param {object} data The object containing keys you want to find in the
     *                      template to replace.
     * @returns {string} HTML String of an <li> element
     *
     * @example
     * view.show({
     *  id: 1,
     *  title: "Hello World",
     *  completed: 0,
     * })
     */
    show(data) {
        let view = "";

        for (let i = 0; i < data.length; i++) {
            const completed = data[i].completed ? "completed" : "";
            const checked = data[i].completed ? "checked" : "";

            const valuesToReplace = {
                id: data[i].id,
                title: escape(data[i].title),
                completed: completed,
                checked: checked,
                listindex: i,
                viewindex: i,
            };

            const result = template(valuesToReplace);

            view += result;
        }

        return view;
    }

    /**
     * Displays a counter of how many to dos are left to complete
     *
     * @param {number} activeTodos The number of active todos.
     * @returns {string} String containing the count
     */
    itemCounter(activeTodos) {
        let plural = activeTodos === 1 ? "" : "s";
        return `<strong>${activeTodos}</strong> item${plural} left`;
    }

    /**
     * Updates the text within the "Clear completed" button
     *
     * @param  {[type]} completedTodos The number of completed todos.
     * @returns {string} String containing the count
     */
    clearCompletedButton(completedTodos) {
        return completedTodos > 0 ? "Clear completed" : "";
    }
}
