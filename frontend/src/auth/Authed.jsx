// @flow
import * as React from 'react';
import { connect } from 'react-redux';

type Props = {
    validated : boolean,
    user : Object,
    children : React.Element<*>,
}

const Authed = ({ validated, user, children } : Props) => React.cloneElement(children, {
    user: validated ? user : null,
});

export default connect(state => ({
    validated: state.auth.validated,
    user: state.auth.user,
}))(Authed);
