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
    content: Object | null,
    error: string,
}

export default class PageLoader extends React.Component<Props, State> {
    state = {
        content: null,
        error: '',
    }

    componentWillMount() {
        fetch(`/api/page/${this.props.match.params.id}`).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            throw new Error('404');
        }).then((data) => {
            if (data.error) {
                this.setState({
                    error: data.error,
                });
            } else {
                this.setState({
                    content: data,
                });
            }
        }).catch((err: Error) => {
            this.setState({
                error: err.message,
            });
        });
    }

    render() {
        if (this.state.error) {
            return (
                <span>{this.state.error}</span>
            );
        } else if (this.state.content) {
            return JSXFromJSONString(this.state.content.content);
        }
        return (
            <span>Loading...</span>
        );
    }
}
