import type { Todo } from "./todos.js";

/**
 * An event that represents a request to add a new todo.
 */
export class AddTodoEvent extends Event {
	static readonly eventName = "todo-add" as const;

	readonly text: string;

	constructor(text: string) {
		super(AddTodoEvent.eventName, { bubbles: true, composed: true });
		this.text = text;
	}
}

/**
 * An event that represents a request to delete a todo.
 */
export class DeleteTodoEvent extends Event {
	static readonly eventName = "todo-delete" as const;

	readonly id: number;

	constructor(id: number) {
		super(DeleteTodoEvent.eventName, { bubbles: true, composed: true });
		this.id = id;
	}
}

/**
 * An event that represents a request to toggle the completion state of a todo.
 */
export class EditTodoEvent extends Event {
	static readonly eventName = "todo-edit" as const;

	readonly todo: Todo;

	constructor(todo: Todo) {
		super(EditTodoEvent.eventName, { bubbles: true, composed: true });
		this.todo = todo;
	}
}

/**
 * An event that represents a request to toggle the completion state of a todo.
 */
export class ToggleAllTodoEvent extends Event {
	static readonly eventName = "todo-toggle-all" as const;

	constructor() {
		super(ToggleAllTodoEvent.eventName, { bubbles: true, composed: true });
	}
}

/**
 * An event that represents a request to clear all completed todos.
 */
export class ClearCompletedEvent extends Event {
	static readonly eventName = "clear-completed" as const;

	constructor() {
		super(ClearCompletedEvent.eventName, { bubbles: true, composed: true });
	}
}

declare global {
	interface HTMLElementEventMap {
		"todo-add": AddTodoEvent;
		"todo-delete": DeleteTodoEvent;
		"todo-edit": EditTodoEvent;
		"todo-toggle-all": ToggleAllTodoEvent;
	}
}
