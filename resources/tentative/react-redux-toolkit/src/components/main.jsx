import { useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { Virtuoso } from "react-virtuoso";
import Item from "./item";
import Footer from "./footer";

import { toggleAll, selectTodos, selectVisibleTodos, selectCompletedTodos } from "../slices/todos";

export default function Main(props) {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const visibleTodos = useSelector(selectVisibleTodos);
    const completedCount = useSelector((state) => selectCompletedTodos(state).length);
    const virtuoso = useRef(null);
    const scrollToItemValue = useSelector((state) => state.viewOptions.scrollToItemValue);
    useLayoutEffect(() => {
        virtuoso.current?.scrollToIndex({ index: scrollToItemValue });
    }, [scrollToItemValue]);

    if (todos.length === 0)
        return null;

    return (
        <main className="main" data-testid="main">
            <div className="toggle-all-container">
                <input className="toggle-all" type="checkbox" data-testid="toggle-all" checked={completedCount === todos.length} onChange={() => dispatch(toggleAll())} />
                <label className="toggle-all-label" htmlFor="toggle-all">
                    Toggle All Input
                </label>
            </div>
            <ul className={classnames("todo-list", "show-priority")} data-testid="todo-list">
                <Virtuoso ref={virtuoso} useWindowScroll data={visibleTodos} itemContent={(index, todo) => <Item key={todo.id} todo={todo} index={index} />} />
            </ul>
            <Footer />
        </main>
    );
}

Main.propTypes = {};
