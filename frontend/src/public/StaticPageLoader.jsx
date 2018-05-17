// @flow
import * as React from 'react';

import { JSXFromJSONString } from '../dynamic/serializer';

type Props = {
    match: {
        params: {
            id: string
        }
    },
}

type State = {
    content: string,
    error: string,
}

export default class PageLoader extends React.Component<Props, State> {
    state = {
        content: '',
        error: '',
    }

    componentWillMount() {
        fetch(`/api/page/${this.props.match.params.id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Library Error');
            }).then((body) => {
                if (body.response.isError) {
                    this.setState({
                        error: `${body.response.code}: ${body.response.message}`,
                    });
                } else {
                    this.setState({
                        content: body.content,
                    });
                }
            }).catch(console.error);
    }

    render() {
        if (this.state.error) {
            return (
                <span>{this.state.error}</span>
            );
        } else if (this.state.content) {
            return JSXFromJSONString(this.state.content);
        }
        return (
            <span>Loading...</span>
        );
    }
}
