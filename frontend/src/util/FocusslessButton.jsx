import * as React from 'react';

export default ({
    children,
    onClick,
    active,
    ...props
} : {
    children : any,
    active: boolean,
    onClick : Function,
}) => (
    <div
        onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(e);
        }}
        onKeyPress={(e) => {
            if (e.key === 'space') {
                e.preventDefault();
                e.stopPropagation();
                onClick(e);
            }
        }}
        role="button"
        tabIndex={0}
    >
        <button {...props}>
            {children}
        </button>
    </div>
);
