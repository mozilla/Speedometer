import { useState, memo } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import TextInput from "./text-input";
import { toggleTodo, deleteTodo, editTodo } from "../slices/todos";

function Item({ todo, index }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (text) => {
        if (text.length === 0)
            dispatch(deleteTodo(todo.id));
        else
            dispatch(editTodo({ id: todo.id, text }));

        setIsEditing(false);
    };

    let element;
    if (isEditing) {
        element = <TextInput text={todo.text} editing={isEditing} onSave={handleSave} />;
    } else {
        element = (
            <div className="view">
                <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={todo.completed} onChange={() => dispatch(toggleTodo(todo.id))} />
                <label onDoubleClick={() => setIsEditing(true)} data-testid="todo-item-label">
                    {todo.text}
                </label>
                <button className="destroy" data-testid="todo-item-button" onClick={() => dispatch(deleteTodo(todo.id))} />
            </div>
        );
    }

    return element;
}

export default memo(Item);

Item.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};
