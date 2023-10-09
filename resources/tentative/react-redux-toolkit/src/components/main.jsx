import { forwardRef, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import Item from "./item";
import Footer from "./footer";

import { toggleAll, selectTodos, selectVisibleTodos, selectCompletedTodos } from "../slices/todos";

const ListElement = forwardRef(function ListElement(props, ref) {
    return <ul {...props} ref={ref} className="todo-list show-priority" />;
});

// It's a bit weird that we need both ItemElement and itemContent below, but
// this is how the lib works: ItemElement is the container, while itemContent is
// the content inside this container.
function ItemElement(props) {
    const index = props["data-item-index"];
    const dataPriority = 4 - (index % 5);
    return <li {...props} data-priority={dataPriority} />;
}

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
            <Virtuoso ref={virtuoso} useWindowScroll components={{ List: ListElement, Item: ItemElement }} data={visibleTodos} itemContent={(index, todo) => <Item key={todo.id} todo={todo} index={index} />} />
            <Footer />
        </main>
    );
}

Main.propTypes = {};
