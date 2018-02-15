import * as React from 'react';

type ToggleableProps = {
    toggled : boolean,
    children : Node,
}

type ToggleableState = {
    toggled : boolean,
}

export class Toggleable extends React.Component<ToggleableProps, ToggleableState> {
    constructor(props) {
        super(props);
        this.state = {
            toggled: props.toggled,
        };
    }

    render() {
        return React.cloneElement(this.props.children, {
            onClick: () => {
                this.setState(prevState => ({
                    toggled: !prevState.toggled,
                }));
            },
            toggled: this.state.toggled,
        });
    }
}

export const placeholder = '';
