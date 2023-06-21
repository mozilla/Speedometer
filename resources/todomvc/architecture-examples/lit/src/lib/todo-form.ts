import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import { query } from "lit/decorators/query.js";

import { todoStyles } from "./todo.css.js";
import { Todos } from "./todos.js";
import { AddTodoEvent } from "./events.js";
import { updateOnEvent } from "./utils.js";

@customElement("todo-form")
export class TodoForm extends LitElement {
    static override styles = [
        todoStyles,
        css`
            :host {
                display: block;
            }
            input::-webkit-input-placeholder {
                font-style: italic;
                font-weight: 300;
                color: #e6e6e6;
            }

            input::-moz-placeholder {
                font-style: italic;
                font-weight: 300;
                color: #e6e6e6;
            }

            input::input-placeholder {
                font-style: italic;
                font-weight: 300;
                color: #e6e6e6;
            }
        `,
    ];

    @updateOnEvent("change")
    @property({ attribute: false })
        todoList?: Todos;

    override render() {
        return html`<input @change=${this.#onChange} @keydown=${this.#onKeydown} class="new-todo" autofocus autocomplete="off" placeholder="what needs to be done?" />`;
    }

    @query("input", true) newTodoInput!: HTMLInputElement;

    #onChange() {
        const { value } = this.newTodoInput;
        if (value.length > 0)
            this.dispatchEvent(new AddTodoEvent(value));

        this.newTodoInput.value = "";
    }

    #onKeydown(e: KeyboardEvent) {
        if (e.key === "Enter")
            this.#onChange();

    }
}

declare global {
    interface HTMLElementTagNameMap {
        "todo-form": TodoForm;
    }
}
