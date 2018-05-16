// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import type { ArticleType } from '../../../types';
import { updateArticles } from '../../../reducers/newsReducer';

import ListPage from '../ListPage';

import Article from './Article';
import NewsItem from './NewsItem';

type Props = {
    articles: ArticleType[],
    updateArticles: Function,
    history: {
        push: Function,
    }
}

class News extends React.Component<Props> {
    componentDidMount() {
        fetch('/api/news/?drafts=true')
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
            });
    }

    newArticle = () => {
        fetch('/api/news/save/new', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Library Error');
        }).then((body) => {
            if (body.response.isError) {
                alert(`${body.response.code}: ${body.response.message}`);
                return null;
            }
            this.props.updateArticles([body.article]);
            this.props.history.push(`/staff/news/${body.article.id}`);
            return body.article;
        }).catch(console.error);
    }

    render() {
        return (
            <ListPage
                onNew={this.newArticle}
                path="/staff/news"
                items={this.props.articles}
                itemRenderer={NewsItem}
                view={Article}
            />
        );
    }
}

export default connect(state => ({
    articles: Object.values(state.news),
}), {
    updateArticles,
})(News);
