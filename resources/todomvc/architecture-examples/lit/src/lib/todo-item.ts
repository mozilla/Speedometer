import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import { state } from "lit/decorators/state.js";
import { classMap } from "lit/directives/class-map.js";

import { todoStyles } from "./todo.css.js";
import { type Todo } from "./todos.js";
import { DeleteTodoEvent, EditTodoEvent } from "./events.js";
import { query } from "lit/decorators/query.js";

@customElement("todo-item")
export class TodoItem extends LitElement {
	static override styles = [
		todoStyles,
		css`
			:host {
				display: block;
			}
			li {
				position: relative;
				font-size: 24px;
				border-bottom: 1px solid #ededed;
			}

			li:last-child {
				border-bottom: none;
			}

			.editing {
				border-bottom: none;
				padding: 0;
			}

			.editing .edit {
				display: block;
				width: 506px;
				padding: 12px 16px;
				margin: 0 0 0 43px;
			}

			.editing .view {
				display: none;
			}

			.toggle {
				text-align: center;
				width: 40px;
				/* auto, since non-WebKit browsers doesn't support input styling */
				height: auto;
				position: absolute;
				top: 0;
				bottom: 0;
				margin: auto 0;
				border: none; /* Mobile Safari */
				-webkit-appearance: none;
				appearance: none;
			}

			.toggle {
				opacity: 0;
			}

			.toggle + label {
				/*
		Firefox requires '#' to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the '#' - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
				background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
				background-repeat: no-repeat;
				background-position: center left;
			}

			.toggle:checked + label {
				background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
			}

			label {
				word-break: break-all;
				padding: 15px 15px 15px 60px;
				display: block;
				line-height: 1.2;
				transition: color 0.4s;
			}

			.completed label {
				color: #d9d9d9;
				text-decoration: line-through;
			}

			.destroy {
				display: none;
				position: absolute;
				top: 0;
				right: 10px;
				bottom: 0;
				width: 40px;
				height: 40px;
				margin: auto 0;
				font-size: 30px;
				color: #cc9a9a;
				margin-bottom: 11px;
				transition: color 0.2s ease-out;
			}

			.destroy:hover {
				color: #af5b5e;
			}

			.destroy:after {
				content: "×";
			}

			li:hover .destroy {
				display: block;
			}

			.edit {
				display: none;
			}

			.editing:last-child {
				margin-bottom: -1px;
			}
		`,
	];

	@property({ attribute: false })
	todo?: Todo;

	@state()
	isEditing: boolean = false;

	override render() {
		const itemClassList = {
			todo: true,
			completed: this.todo?.completed ?? false,
			editing: this.isEditing,
		};
		return html`
			<li class="${classMap(itemClassList)}">
				<div class="view">
					<input
						class="toggle"
						type="checkbox"
						.checked=${this.todo?.completed ?? false}
						@change=${this.#toggleTodo}
					/>
					<label @dblclick=${this.#beginEdit}> ${this.todo?.text} </label>
					<button @click=${this.#deleteTodo} class="destroy"></button>
				</div>
				<input
					class="edit"
					type="text"
					@change=${this.#finishEdit}
					@keyup=${this.#captureEscape}
					@blur=${this.#abortEdit}
					.value=${this.todo?.text ?? ""}
				/>
			</li>
		`;
	}

	@query('.toggle') private doneCheckmark!: HTMLInputElement;
	@query('.destroy') private destroyButton!: HTMLButtonElement;

	clickDone() {
		this.doneCheckmark.click();
	}

	clickDestroy() {
		this.destroyButton.click();
	}

	#toggleTodo() {
		this.dispatchEvent(
			new EditTodoEvent({ ...this.todo!, completed: !this.todo!.completed })
		);
	}

	#deleteTodo() {
		this.dispatchEvent(new DeleteTodoEvent(this.todo!.id));
	}

	#beginEdit() {
		this.isEditing = true;
	}

	#finishEdit(e: Event) {
		const el = e.target as HTMLInputElement;
		const text = el.value;
		this.dispatchEvent(new EditTodoEvent({ ...this.todo!, text }));
		this.isEditing = false;
	}

	#captureEscape(e: KeyboardEvent) {
		if (e.key === "escape") {
			this.#abortEdit(e);
		}
	}

	#abortEdit(e: Event) {
		(e.target as HTMLInputElement).value = this.todo?.text ?? "";
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"todo-item": TodoItem;
	}
}