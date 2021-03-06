// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Form, Title, Entry, SubmitButton } from './components';

import { updateUser } from '../../reducers/userReducer';

type Props = {
    updateUser: Function,
    history: {
        push: Function,
    }
}

type State = {
    email: string,
    password: string,
}

class LoginForm extends React.Component<Props, State> {
    state = {
        email: '',
        password: '',
    }

    onSubmit = (event: SyntheticEvent<*>) => {
        event.preventDefault();

        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Library Error');
        }).then((body) => {
            if (body.response.isError) {
                alert(`${body.response.code}: ${body.response.message}`);
            } else {
                this.props.updateUser(body.user);
                this.props.history.push('/');
            }
        }).catch(console.error);
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Title>Login</Title>
                <Entry
                    id="loginEmail"
                    label="Email:"
                    type="email"
                    required
                    value={this.state.email}
                    onChange={event => this.setState({
                        email: event.target.value,
                    })}
                />
                <Entry
                    id="loginPassword"
                    label="Password:"
                    type="password"
                    required
                    value={this.state.password}
                    onChange={event => this.setState({
                        password: event.target.value,
                    })}
                />
                <SubmitButton
                    type="submit"
                    value="Login"
                />
                <Link to="/login/register">
                        No account? Click here!
                </Link>
            </Form>
        );
    }
}

export default connect(null, {
    updateUser,
})(LoginForm);
