import { useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

export default function TextInput({ onSave, text: initialText, placeholder, editing, newTodo }) {
    const [text, setText] = useState(initialText || "");

    const handleSubmit = (e) => {
        if (e.key === "Enter") {
            onSave(text);
            if (newTodo)
                setText("");
        }
    };

    const handleChange = (e) => {
        setText(e.currentTarget.value);
    };

    const handleBlur = (e) => {
        // If this input is used in the Header, call onSave to create a new todo.
        if (!newTodo)
            onSave(text);
    };

    return (
        <input
            className={classnames({
                edit: editing,
                "new-todo": newTodo,
            })}
            type="text"
            data-testid="text-input"
            placeholder={placeholder}
            autoFocus
            value={text}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleSubmit}
        />
    );
}

TextInput.propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool, // input is used in Item to edit the todo.
    newTodo: PropTypes.bool, // input is used in Header to create a todo.
};
