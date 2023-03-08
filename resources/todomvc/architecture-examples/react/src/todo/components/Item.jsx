import React from "react";
import PropTypes from "prop-types";

export const Item = ({ todo, onToggle, onDelete, onUpdate }) => {
    const { title, completed, id } = todo;

    const handleChange = (e) => {
        onToggle(id);
    };

    const handleDoubleClick = () => {
        console.log("double-click");
    };

    const handleClick = () => {
        onDelete(id);
    };

    return (
        <li data-testid="todo-item">
            <div className="view">
                <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={completed} onChange={handleChange} />
                <label data-testid="todo-item-label" onDoubleClick={handleDoubleClick}>
                    {title}
                </label>
                <button className="destroy" data-testid="todo-item-button" onClick={handleClick} />
            </div>
        </li>
    );
};

Item.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }),
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};
