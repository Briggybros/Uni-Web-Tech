// @flow
import * as React from 'react';

import type { ArticleType, EventType } from '../types';

import Article from './news/Article';
import Event from './events/Event';

type Props = {
    match: {
        params: {
            id: string
        }
    },
}

type State = {
    item?: ArticleType | EventType,
    error: string,
}

export default class DynamicPageLoader extends React.Component<Props, State> {
    state = {
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
                        item: body.item,
                    });
                }
            }).catch(console.error);
    }

    render() {
        if (this.state.error) {
            return (
                <span>{this.state.error}</span>
            );
        } else if (this.state.item) {
            switch (this.state.item.type) {
            case 'NEWS':
                return <Article article={this.state.item} />;
            case 'EVENT':
                return <Event event={this.state.item} />;
            default: return null;
            }
        }
        return (
            <span>Loading...</span>
        );
    }
}
