// @flow
import * as React from 'react';
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
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                code: this.state.code,
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
