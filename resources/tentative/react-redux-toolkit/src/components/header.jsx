import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./text-input";
import { addTodo, selectVisibleTodos, generateStateWithLotsOfItems } from "../slices/todos";
import { setScrollToItemValue } from "../slices/view-options";

export default function Header() {
    const dispatch = useDispatch();
    const handleSave = useCallback(
        (text) => {
            if (text.length !== 0)
                dispatch(addTodo(text));
        },
        [dispatch]
    );

    const visibleTodosCount = useSelector((state) => selectVisibleTodos(state).length);
    const scrollToItemValue = useSelector((state) => state.viewOptions.scrollToItemValue);

    return (
        <header className="header" data-testid="header">
            <h1>todos</h1>
            <div className="action-buttons">
                <button type="button" onClick={() => dispatch(generateStateWithLotsOfItems())}>
                    Generate state with lots of items
                </button>
                {visibleTodosCount > 0 ? (
                    <label>
                        Scroll to item:{" "}
                        <input type="range" min="0" max={visibleTodosCount} step={Math.max(1, Math.floor(visibleTodosCount / 10))} value={scrollToItemValue} onChange={(e) => dispatch(setScrollToItemValue(e.currentTarget.valueAsNumber))} />{" "}
                        {scrollToItemValue}
                    </label>
                ) : null}
            </div>
            <TextInput newTodo onSave={handleSave} placeholder="What needs to be done?" />
        </header>
    );
}

Header.propTypes = {};
