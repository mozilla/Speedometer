import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearCompleted, selectTodos } from "../slices/todos";

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../constants/todo-filters";
import { getCompletedTodos } from "../selectors/filters";

export default function Footer() {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const location = useLocation();

    const completedCount = getCompletedTodos(todos).length;
    const activeCount = todos.length - completedCount;
    const filter = location.pathname;

    return (
        <footer className="footer" data-testid="footer">
            <span className="todo-count">{`${activeCount} ${activeCount === 1 ? "item" : "items"} left!`}</span>
            <ul className="filters" data-testid="footer-navigation">
                <li>
                    <a className={classnames({ selected: filter === SHOW_ALL })} href={`#${SHOW_ALL}`}>
                        All
                    </a>
                </li>
                <li>
                    <a className={classnames({ selected: filter === SHOW_ACTIVE })} href={`#${SHOW_ACTIVE}`}>
                        Active
                    </a>
                </li>
                <li>
                    <a className={classnames({ selected: filter === SHOW_COMPLETED })} href={`#${SHOW_COMPLETED}`}>
                        Completed
                    </a>
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
