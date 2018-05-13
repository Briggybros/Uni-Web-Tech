// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import { Form, Title, Entry, SubmitButton } from './components';

import { updateUser } from './reducer';

type Props = {
    updateUser: Function,
}

type State = {
    code: string,
}

class ConfirmForm extends React.Component<Props, State> {
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
            if (response.ok) {
                return response.json();
            }
            throw new Error('Bad confirmation code');
        }).then((user) => {
            this.props.updateUser(user);
            window.location.replace('/');
        }).catch(alert);
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

export default connect(null, {
    updateUser,
})(ConfirmForm);
