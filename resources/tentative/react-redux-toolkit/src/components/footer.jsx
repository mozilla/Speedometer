import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { clearCompleted, selectTodos, selectCompletedTodos } from "../slices/todos";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../constants/todo-filters";

export default function Footer() {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const completedCount = useSelector((state) => selectCompletedTodos(state).length);
    const activeCount = todos.length - completedCount;

    return (
        <footer className="footer" data-testid="footer">
            <span className="todo-count">{`${activeCount} ${activeCount === 1 ? "item" : "items"} left!`}</span>
            <ul className="filters" data-testid="footer-navigation">
                <li>
                    <NavLink activeClassName="selected" to={SHOW_ALL} exact>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="selected" to={SHOW_ACTIVE}>
                        Active
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="selected" to={SHOW_COMPLETED}>
                        Completed
                    </NavLink>
                </li>
            </ul>
            {completedCount > 0 ? (
                <button className="clear-completed" onClick={() => dispatch(clearCompleted())}>
                    Clear completed
                </button>
            ) : null}
        </footer>
    );
}

Footer.propTypes = {};
