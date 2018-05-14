// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';

import type { ArticleType } from '../../../types';
import { updatePosts } from '../../../reducers/newsReducer';

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
    articles: ArticleType[]
}

const News = ({ articles }: Props) => (
    <Page>
        <VerticalList>
            <NewItem
                to="/staff/news/new"
            />
            {articles.map(article => (
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
                <Article isNew />
            </Route>
            <Route path="/staff/news/:id">
                <Article />
            </Route>
        </Switch>
    </Page>
);

export default connect(state => ({
    articles: Object.values(state.news),
}), () => ({
    updatePosts,
}))(News);
