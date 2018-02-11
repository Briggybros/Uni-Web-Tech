// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import { setValidated, setUser } from './reducer';


type Props = {
    children : Node,
    setValidated : Function,
    setUser : Function,
}

class Authenticator extends React.Component<Props> {
    componentWillMount() {
        fetch('/api/auth/validate').then((response) => {
            if (response.status === 200) {
                this.props.setValidated(true);
                response.json().then((json) => {
                    this.props.setUser(json.user);
                });
            } else {
                this.props.setValidated(false);
            }
        });
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

export default connect(null, {
    setValidated,
    setUser,
})(Authenticator);
