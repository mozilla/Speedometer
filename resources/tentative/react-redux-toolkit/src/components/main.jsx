import { useRef, useLayoutEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import Item from "./item";
import Footer from "./footer";

import { toggleAll, selectTodos, selectVisibleTodos, selectCompletedTodos } from "../slices/todos";

export default function Main(props) {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const visibleTodos = useSelector(selectVisibleTodos);
    const completedCount = useSelector((state) => selectCompletedTodos(state).length);
    const scrollToItemValue = useSelector((state) => state.viewOptions.scrollToItemValue);

    // Most of the virtual list code comes from https://tanstack.com/virtual/v3/docs/examples/react/dynamic
    const parentRef = useRef(null);
    const parentOffsetRef = useRef(0);
    useLayoutEffect(() => {
        parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
    }, []);

    const getItemKey = useCallback((index) => visibleTodos[index].id, [visibleTodos]);
    const virtualizer = useWindowVirtualizer({
        count: visibleTodos.length,
        estimateSize: () => 88,
        scrollMargin: parentOffsetRef.current,
        getItemKey,
    });

    useLayoutEffect(() => {
        if (visibleTodos.length > 0)
            virtualizer.scrollToIndex(scrollToItemValue);
    }, [visibleTodos.length, virtualizer, scrollToItemValue]);

    if (todos.length === 0)
        return null;

    const items = virtualizer.getVirtualItems();

    return (
        <main className="main" data-testid="main">
            <div className="toggle-all-container">
                <input className="toggle-all" type="checkbox" data-testid="toggle-all" checked={completedCount === todos.length} onChange={() => dispatch(toggleAll())} />
                <label className="toggle-all-label" htmlFor="toggle-all">
                    Toggle All Input
                </label>
            </div>
            <div ref={parentRef} className="scroll-container">
                <div
                    style={{
                        height: virtualizer.getTotalSize(),
                        width: "100%",
                        position: "relative",
                    }}
                >
                    <ul
                        className="todo-list show-priority"
                        style={{
                            background: "white",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            transform: `translateY(${items[0] ? items[0].start - virtualizer.options.scrollMargin : 0}px)`,
                        }}
                    >
                        {items.map((virtualRow) => {
                            const { index } = virtualRow;
                            const todo = visibleTodos[index];
                            const dataPriority = 4 - (index % 5);
                            return (
                                <li key={todo.id} data-priority={dataPriority} ref={virtualizer.measureElement} data-index={index}>
                                    <Item key={todo.id} todo={todo} index={index} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <Footer />
        </main>
    );
}

Main.propTypes = {};
