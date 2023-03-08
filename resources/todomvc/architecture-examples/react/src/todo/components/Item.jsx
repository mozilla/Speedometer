import { useState, useCallback } from "react";

import { Input } from "./Input";

export function Item({ todo, onToggle, onDelete, onUpdate }) {
    const [isWritable, setIsWritable] = useState(false);
    const { title, completed, id } = todo;

    const handleChange = useCallback(() => {
        onToggle(id);
    });

    const handleDoubleClick = useCallback(() => {
        setIsWritable(true);
    });

    const handleClick = useCallback(() => {
        onDelete(id);
    });

    const handleBlur = useCallback(() => {
        setIsWritable(false);
    });

    const handleUpdate = useCallback((text) => {
        if (text.length === 0) {
            onDelete(id);
        } else {
            onUpdate(id, text);
        }

        setIsWritable(false);
    });

    return (
        <li data-testid="todo-item">
            <div className="view">
                {isWritable ? (
                    <Input onSubmit={handleUpdate} label="Edit Todo Input" defaultValue={title} onBlur={handleBlur} />
                ) : (
                    <>
                        <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={completed} onChange={handleChange} />
                        <label data-testid="todo-item-label" onDoubleClick={handleDoubleClick}>
                            {title}
                        </label>
                        <button className="destroy" data-testid="todo-item-button" onClick={handleClick} />
                    </>
                )}
            </div>
        </li>
    );
}
