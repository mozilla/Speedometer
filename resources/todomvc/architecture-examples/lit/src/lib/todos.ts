export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export type TodoEdit = Partial<Todo> & { id: number };

const todoFilters = ["all", "active", "completed"] as const;
export type TodoFilter = (typeof todoFilters)[number];
function isTodoFilter(value: string | undefined): value is TodoFilter {
    return todoFilters.includes(value as TodoFilter);
}

/**
 * A mutable, observable container for a todo list.
 *
 * @fires a `change` event when the todo list changes.
 */
export class Todos extends EventTarget {
    #nextId = 1;
    #todos: Array<Todo> = [];
    #filter: TodoFilter = this.#filterFromUrl();

    get all(): ReadonlyArray<Todo> {
        return this.#todos;
    }

    get active(): ReadonlyArray<Todo> {
        return this.#todos.filter((todo) => !todo.completed);
    }

    get completed(): ReadonlyArray<Todo> {
        return this.#todos.filter((todo) => todo.completed);
    }

    get allCompleted(): boolean {
        return this.#todos.every((todo) => todo.completed);
    }

    connect() {
        window.addEventListener("hashchange", this.#onHashChange);
    }

    disconnect() {
        window.removeEventListener("hashchange", this.#onHashChange);
    }

    filtered() {
        switch (this.#filter) {
            case "active":
                return this.active;
            case "completed":
                return this.completed;
            case "all":
            case undefined:
            // fall through
        }
        return this.all;
    }

    #notifyChange() {
        window.localStorage.setItem("todos", JSON.stringify({ todos: this.#todos, nextId: this.#nextId }));
        this.dispatchEvent(new Event("change"));
    }

    add(text: string) {
        this.#todos.push({
            text,
            completed: false,
            id: this.#nextId++,
        });
        this.#notifyChange();
    }

    delete(id: number) {
        const index = this.#todos.findIndex((todo) => todo.id === id);
        // Note: if the todo is not found, index is -1, and the >>> will flip the
        // sign which makes the splice do nothing. Otherwise, index is the item
        // we want to remove.
        this.#todos.splice(index >>> 0, 1);
        this.#notifyChange();
    }

    update(edit: TodoEdit) {
        const todo = this.#todos.find((todo) => todo.id === edit.id);

        if (todo === undefined)
            return;

        Object.assign(todo, edit);
    }

    toggle(id: number) {
        const todo = this.#todos.find((todo) => todo.id === id);
        if (todo === undefined)
            return;

        todo.completed = !todo.completed;
        this.#notifyChange();
    }

    toggleAll() {
        // First pass to see if all the TODOs are completed. If all the
        // todos are completed, we'll set them all to active
        const allComplete = this.#todos.every((todo) => todo.completed);

        // Replace the list to trigger updates
        this.#todos = this.#todos.map((todo) => ({
            ...todo,
            completed: !allComplete,
        }));
        this.#notifyChange();
    }

    clearCompleted() {
        this.#todos = this.active as Todo[];
        this.#notifyChange();
    }

    get filter(): TodoFilter {
        return this.#filter;
    }

    set filter(filter: TodoFilter) {
        this.#filter = filter;
        this.#notifyChange();
    }

    #onHashChange = () => {
        this.filter = this.#filterFromUrl();
    };

    #filterFromUrl() {
        let filter = /#\/(.*)/.exec(window.location.hash)?.[1];
        if (isTodoFilter(filter))
            return filter;

        return "all";
    }
}
