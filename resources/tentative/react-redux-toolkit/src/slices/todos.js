import { createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

function uuid() {
    let uuid = "";
    for (let i = 0; i < 32; i++) {
        const random = (Math.random() * 16) | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20)
            uuid += "-";

        let currentNumber = random;
        if (i === 12)
            currentNumber = 4;
        else if (i === 16)
            currentNumber = 8 | (random & 3);
        uuid += currentNumber.toString(16);
    }
    return uuid;
}

const todosAdapter = createEntityAdapter();
const todosSelectors = todosAdapter.getSelectors();

export const todosSlice = createSlice({
    name: "todos",
    initialState: todosAdapter.getInitialState(),
    reducers: {
        addTodo: (state, { payload }) => {
            const id = uuid();
            todosAdapter.setOne(state, { id, text: payload, completed: false });
        },
        deleteTodo: todosAdapter.removeOne,
        editTodo: todosAdapter.updateOne,
        toggleTodo: (state, { payload }) => {
            const todo = todosSelectors.selectById(state, payload);
            todosAdapter.updateOne(state, { id: payload, changes: { completed: !todo.completed } });
        },
        toggleAll: (state) => {
            const todos = todosSelectors.selectAll(state);
            const areAllMarked = todos.every((todo) => todo.completed);
            if (areAllMarked) {
                todosAdapter.updateMany(
                    state,
                    todosSelectors.selectIds(state).map((id) => ({ id, changes: { completed: false } }))
                );
            } else {
                todosAdapter.updateMany(
                    state,
                    todos.filter((todo) => !todo.completed).map((todo) => ({ id: todo.id, changes: { completed: true } }))
                );
            }
        },
        clearCompleted: (state) => {
            const todos = todosSelectors.selectAll(state);
            todosAdapter.removeMany(
                state,
                todos.filter((todo) => todo.completed).map((todo) => todo.id)
            );
        },
    },
});

export const { addTodo, deleteTodo, editTodo, toggleTodo, toggleAll, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;

export const selectTodos = (state) => todosSelectors.selectAll(state.todos);
