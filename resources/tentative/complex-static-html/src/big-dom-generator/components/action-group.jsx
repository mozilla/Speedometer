export const ActionButton = ({ Icon, label, quiet, ...rest }) => {
    const text = label ? <span className="ui spectrum-ActionButton-label">{label}</span> : null;
    return (
        <button className={`ui spectrum-ActionButton spectrum-ActionButton--sizeM ${quiet ? "spectrum-ActionButton--quiet" : ""} spectrum-ActionGroup-item`} {...rest}>
            {Icon && <Icon className="ui spectrum-Icon spectrum-Icon--sizeM spectrum-ActionButton-icon" focusable="false" aria-hidden="true" />}
            {text}
        </button>
    );
};

export const ActionGroup = ({ children }) => {
    return <div className="ui spectrum-ActionGroup spectrum-ActionGroup--compact spectrum-ActionGroup--sizeM">{children}</div>;
};

export const ActionGroupVertical = ({ children }) => {
    return <div className="ui spectrum-ActionGroup spectrum-ActionGroup--vertical spectrum-ActionGroup--sizeS">{children}</div>;
};
