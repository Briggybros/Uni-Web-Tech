// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import type { ArticleType, EventType, PageType } from '../types';

import Article from './news/Article';
import Event from './events/Event';
import StaticPage from './StaticPage';

const Container = styled.div`
    flex-grow: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingImage = styled.img`
    width: 10%;
    height: 10%;
`;

type Props = {
    pages: {
        [url: string]: PageType,
    },
    match: {
        params: {
            id: string
        }
    },
}

type State = {
    item?: ArticleType | EventType | PageType,
    error: string,
}

class DynamicPageLoader extends React.Component<Props, State> {
    state = {
        error: '',
    }

    componentWillMount() {
        if (this.props.pages[this.props.match.params.id]) {
            this.setState({
                item: this.props.pages[this.props.match.params.id],
            });
        } else {
            fetch(`/api/dynamic/${this.props.match.params.id}`)
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
    }

    render() {
        if (this.state.error !== '') {
            return (
                <Container>
                    <h1>{this.state.error}</h1>
                </Container>
            );
        } else if (this.state.item) {
            switch (this.state.item.type) {
            case 'NEWS':
                return <Article article={this.state.item} />;
            case 'EVENT':
                return <Event event={this.state.item} />;
            case 'PAGE':
                return <StaticPage page={this.state.item} />;
            default: return null;
            }
        }
        return (
            <Container>
                <LoadingImage src="/logo_load.svg" alt="Loading..." />
            </Container>
        );
    }
}

export default connect((state: {pages: $Exact<{[id: string]: PageType}>}) => {
    // $FlowFixMe Object.values() returns mixed[] when it should return PageType[] https://github.com/facebook/flow/issues/2221
    const pages: PageType[] = Object.values(state.pages);
    return {
        pages: pages.reduce((acc, page) => ({
            ...acc,
            [page.url]: page,
        }), {}),
    };
})(DynamicPageLoader);
