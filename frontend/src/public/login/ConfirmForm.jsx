// @flow
import * as React from 'react';

import { Form, Title, Entry, SubmitButton } from './components';

type State = {
    code: string,
}

export default class ConfirmForm extends React.Component<{}, State> {
    constructor(props: Object) {
        super(props);

        const code = new URL(window.location.href).searchParams.get('code');

        this.state = {
            code: code || '',
        };
    }

    onSubmit = (event: SyntheticEvent<*>) => {
        event.preventDefault();

        fetch('/api/auth/confirm', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: this.state.code,
            }),
        }).then((response) => {
            console.log(response.status);
        });
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Title>Confirm</Title>
                <Entry
                    id="code"
                    label="Code:"
                    required
                    value={this.state.code}
                    onChange={event => this.setState({
                        code: event.target.value,
                    })}
                />
                <SubmitButton
                    type="submit"
                    value="Confirm"
                />
            </Form>
        );
    }
}
