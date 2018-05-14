// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Form, Title, Entry, SubmitButton } from './components';

type State = {
    firstName: string,
    lastName: string,
    email: string,
    emailConfirm: string,
    password: string,
    passwordConfirm: string,
}

export default class LoginForm extends React.Component<{}, State> {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
    }

    onSubmit = (event: SyntheticEvent<*>) => {
        event.preventDefault();

        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
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
                window.location.replace('/login/confirm');
            }
        }).catch(console.error);
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Title>Register</Title>
                <Entry
                    id="firstName"
                    label="First Name:"
                    required
                    value={this.state.firstName}
                    onChange={event => this.setState({
                        firstName: event.target.value,
                    })}
                />
                <Entry
                    id="lastName"
                    label="Last Name:"
                    required
                    value={this.state.lastName}
                    onChange={event => this.setState({
                        lastName: event.target.value,
                    })}
                />
                <Entry
                    id="registerEmail"
                    label="Email:"
                    type="email"
                    required
                    value={this.state.email}
                    onChange={event => this.setState({
                        email: event.target.value,
                    })}
                />
                <Entry
                    id="registerEmailConfirm"
                    label="Confirm Email:"
                    type="email"
                    required
                    autoComplete="off"
                    validation={(_, done) => {
                        if (this.state.email !== this.state.emailConfirm) {
                            return done('Emails do not match');
                        }
                        return done('');
                    }}
                    value={this.state.emailConfirm}
                    onChange={event => this.setState({
                        emailConfirm: event.target.value,
                    })}
                />
                <Entry
                    id="registerPassword"
                    label="Password:"
                    type="password"
                    required
                    value={this.state.password}
                    onChange={event => this.setState({
                        password: event.target.value,
                    })}
                />
                <Entry
                    id="registerPasswordConfirm"
                    label="Confirm Password:"
                    type="password"
                    required
                    autoComplete="off"
                    validation={(_, done) => {
                        if (this.state.password !== this.state.passwordConfirm) {
                            return done('Passwords do not match');
                        }
                        return done('');
                    }}
                    value={this.state.passwordConfirm}
                    onChange={event => this.setState({
                        passwordConfirm: event.target.value,
                    })}
                />
                <SubmitButton type="submit" value="Register" />
                <Link to="/login">
                        Already have an account? Click here!
                </Link>
            </Form>
        );
    }
}
