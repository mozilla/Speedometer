import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { useLocation } from "react-router-dom";
import Item from "./item";
import Footer from "./footer";

import { toggleAll, selectTodos } from "../slices/todos";
import { getCompletedTodos, getVisibleTodos } from "../selectors/filters";

export default function Main(props) {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const location = useLocation();

    if (todos.length === 0)
        return null;

    const visibleTodos = getVisibleTodos(todos, location.pathname);
    const completedCount = getCompletedTodos(todos).length;

    return (
        <main className="main" data-testid="main">
            <div className="toggle-all-container">
                <input className="toggle-all" type="checkbox" data-testid="toggle-all" checked={completedCount === todos.length} onChange={() => dispatch(toggleAll())} />
                <label className="toggle-all-label" htmlFor="toggle-all">
                    Toggle All Input
                </label>
            </div>
            <ul className={classnames("todo-list", "show-priority")} data-testid="todo-list">
                {visibleTodos.map((todo, index) => (
                    <Item key={todo.id} todo={todo} index={index} />
                ))}
            </ul>
            <Footer />
        </main>
    );
}

Main.propTypes = {};
