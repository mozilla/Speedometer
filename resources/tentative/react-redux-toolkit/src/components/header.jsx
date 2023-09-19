import { useCallback } from "react";
import { useDispatch } from "react-redux";
import TextInput from "./text-input";
import { addTodo } from "../slices/todos";

export default function Header() {
    const dispatch = useDispatch();
    const handleSave = useCallback(
        (text) => {
            if (text.length !== 0)
                dispatch(addTodo(text));
        },
        [dispatch]
    );

    return (
        <header className="header" data-testid="header">
            <h1>todos</h1>
            <TextInput newTodo onSave={handleSave} placeholder="What needs to be done?" />
        </header>
    );
}

Header.propTypes = {};
