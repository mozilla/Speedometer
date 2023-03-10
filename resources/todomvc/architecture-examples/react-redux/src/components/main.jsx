import { Component } from "react";
import PropTypes from "prop-types";
import Item from "./item";
import Footer from "./footer";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../constants/todo-filters";

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: (todo) => !todo.completed,
    [SHOW_COMPLETED]: (todo) => todo.completed,
};

export default class Main extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
    };

    state = { filter: SHOW_ALL };

    handleClearCompleted = () => {
        this.props.actions.clearCompleted();
    };

    handleShow = (filter) => {
        this.setState({ filter });
    };

    renderToggleAll(completedCount) {
        const { todos, actions } = this.props;

        if (todos.length === 0) {
            return null;
        }

        return (
            <div className="toggle-all-container">
                <input className="toggle-all" type="checkbox" data-testid="toggle-all" checked={completedCount === todos.length} onChange={actions.toggleAll} />
                <label className="toggle-all-label" htmlFor="toggle-all">
                    Toggle All Input
                </label>
            </div>
        );
    }

    renderFooter(completedCount) {
        const { todos } = this.props;
        const { filter } = this.state;
        const activeCount = todos.length - completedCount;

        if (todos.length) {
            return <Footer completedCount={completedCount} activeCount={activeCount} filter={filter} onClearCompleted={this.handleClearCompleted.bind(this)} onShow={this.handleShow.bind(this)} />;
        }
    }

    render() {
        const { todos, actions } = this.props;
        const { filter } = this.state;

        const filteredTodos = todos.filter(TODO_FILTERS[filter]);
        const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

        return (
            <section className="main" data-testid="main">
                {this.renderToggleAll(completedCount)}
                <ul className="todo-list" data-testid="todo-list">
                    {filteredTodos.map((todo) => (
                        <Item key={todo.id} todo={todo} {...actions} />
                    ))}
                </ul>
                {this.renderFooter(completedCount)}
            </section>
        );
    }
}