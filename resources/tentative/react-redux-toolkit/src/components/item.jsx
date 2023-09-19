import { useState, memo } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import TextInput from "./text-input";

function Item({ todo, toggleTodo, deleteTodo, index, editTodo }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (text) => {
        if (text.length === 0)
            deleteTodo(todo.id);
        else
            editTodo({ id: todo.id, text });

        setIsEditing(false);
    };

    let element;
    if (isEditing) {
        element = <TextInput text={todo.text} editing={isEditing} onSave={handleSave} />;
    } else {
        element = (
            <div className="view">
                <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                <label onDoubleClick={() => setIsEditing(true)} data-testid="todo-item-label">
                    {todo.text}
                </label>
                <button className="destroy" data-testid="todo-item-button" onClick={() => deleteTodo(todo.id)} />
            </div>
        );
    }

    return (
        <li
            className={classnames({
                completed: todo.completed,
                editing: isEditing,
            })}
            data-testid="todo-item"
            data-priority={4 - (index % 5)}
        >
            {element}
        </li>
    );
}

export default memo(Item);

Item.propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};
