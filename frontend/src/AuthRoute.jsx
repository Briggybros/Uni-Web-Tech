import * as React from 'react';
import { Route } from 'react-router';

type Props = {
    children : Node,
}

type State = {
    authenticated : boolean,
}

export default class AuthRoute extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
        };
    }

    getChildContext() { // Replace for redux state
        return {
            auth: this.state.authenticated,
        };
    }

    componentWillMount() {
        fetch('/api/auth/validate').then((response) => {
            if (response.status === 200) {
                this.setState({
                    authenticated: true,
                });
            } else {
                this.setState({
                    authenticated: false,
                });
            }
        });
    }

    render() {
        const { children, ...props } = this.props;
        return (
            <Route
                {...props}
            >
                {children}
            </Route>
        );
    }
}
