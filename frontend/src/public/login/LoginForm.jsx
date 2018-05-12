// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Form, Title, Entry, SubmitButton } from './components';

type State = {
    email: string,
    password: string,
}

export default class LoginForm extends React.Component<{}, State> {
    state = {
        email: '',
        password: '',
    }

    onSubmit = (event: SyntheticEvent<*>) => {
        event.preventDefault();

        fetch('/api/auth/login', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        }).then((response) => {
            console.log(response.status);
        });
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
