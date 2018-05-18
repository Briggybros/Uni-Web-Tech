// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import type { ArticleType } from '../../types';

import Article from './Article';
import { updateArticles } from '../../reducers/newsReducer';

const Page = styled.div`
    display: flex;
    flex-direction: column;
`;

type Props = {
    articles: ArticleType[],
    updateArticles: (ArticleType[]) => void,
}

class Feed extends React.Component<Props> {
    componentDidMount() {
        fetch('/api/news')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Library Error');
            })
            .then((body) => {
                if (body.response.isError) {
                    alert(`${body.response.code}: ${body.response.message}`);
                } else {
                    this.props.updateArticles(body.articles);
                }
            })
            .catch(console.error);
    }

    render() {
        return (
            <Page>
                {this.props.articles.filter(article => article.published).map(article => (
                    <Article
                        summary
                        key={article.id}
                        article={article}
                    />
                ))}
            </Page>
        );
    }
}

function mapStateToProps(state: Object): Object {
    return {
        articles: Object.values(state.news),
    };
}

export default connect(mapStateToProps, {
    updateArticles,
})(Feed);
