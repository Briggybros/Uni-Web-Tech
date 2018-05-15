// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';

import type { ArticleType } from '../../../types';
import { updateArticles } from '../../../reducers/newsReducer';

import Article from './Article';
import MenuItem from '../MenuItem';
import NewItem from '../NewItem';
import VerticalList from '../../components/VerticalList';

const Page = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 2;
`;

type Props = {
    articles: ArticleType[],
    updateArticles: Function,
}

class News extends React.Component<Props> {
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
            });
    }

    render() {
        return (
            <Page>
                <VerticalList>
                    <NewItem
                        to="/staff/news/new"
                    />
                    {this.props.articles.map(article => (
                        <MenuItem
                            key={article.id}
                            to={`/staff/news/${article.id}`}
                            heading={article.title}
                            subheading={`${article.author.firstName} ${article.author.lastName}`}
                        />
                    ))}
                </VerticalList>
                <Switch>
                    <Route path="/staff/news/new">
                        <Article key="new" isNew />
                    </Route>
                    <Route path="/staff/news/:id" component={Article} />
                </Switch>
            </Page>
        );
    }
}

export default connect(state => ({
    articles: Object.values(state.news),
}), {
    updateArticles,
})(News);
