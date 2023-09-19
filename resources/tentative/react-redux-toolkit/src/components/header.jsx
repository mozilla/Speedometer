import { useCallback } from "react";
import PropTypes from "prop-types";
import TextInput from "./text-input";

export default function Header({ addTodo }) {
    const handleSave = useCallback(
        (text) => {
            if (text.length !== 0)
                addTodo(text);
        },
        [addTodo]
    );

    return (
        <header className="header" data-testid="header">
            <h1>todos</h1>
            <TextInput newTodo onSave={handleSave} placeholder="What needs to be done?" />
        </header>
    );
}

Header.propTypes = {
    addTodo: PropTypes.func.isRequired,
};
