// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import type { ArticleType } from '../../types';

// import PostSummary from './PostSummary';
import { updateArticles } from '../../reducers/newsReducer';

type Props = {
    articles: ArticleType[],
    updateArticles: (ArticleType[]) => void,
}

class Feed extends React.Component<Props> {
    componentDidMount() {
        fetch('/api/news/')
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
            <div>
                {this.props.articles.map(article => <span>{article.title}</span>)}
            </div>
        );
    }
}

function mapStateToProps(state: Object): Object {
    return {
        articles: state.news,
    };
}

function mapDispatchToProps(): Object {
    return {
        updateArticles,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
