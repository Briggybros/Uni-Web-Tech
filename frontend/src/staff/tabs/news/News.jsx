// @flow
import * as React from 'react';
import { Route } from 'react-router';
import styled from 'styled-components';

import Article from './Article';
import MenuItem from '../MenuItem';
import NewItem from '../NewItem';
import VerticalList from '../../components/VerticalList';

const Page = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 2;
`;

type ArticleType = {
    id: string,
    title: string,
    author: {
        firstName: string,
        lastName: string,
    }
}

const fakeArticles: ArticleType[] = [
    {
        id: '1',
        title: 'Article 1',
        author: {
            firstName: 'Gregory',
            lastName: 'Sims',
        },
    },
    {
        id: '2',
        title: 'Article 2',
        author: {
            firstName: 'Gregory',
            lastName: 'Sims',
        },
    },
    {
        id: '3',
        title: 'Article 3',
        author: {
            firstName: 'Gregory',
            lastName: 'Sims',
        },
    },
    {
        id: '4',
        title: 'Article 4',
        author: {
            firstName: 'Gregory',
            lastName: 'Sims',
        },
    },
    {
        id: '5',
        title: 'Article 5',
        author: {
            firstName: 'Gregory',
            lastName: 'Sims',
        },
    },
    // {
    //     id: '6',
    //     title: 'Article 6',
    //     author: {
    //         firstName: 'Gregory',
    //         lastName: 'Sims',
    //     },
    // },
    // {
    //     id: '7',
    //     title: 'Article 7',
    //     author: {
    //         firstName: 'Gregory',
    //         lastName: 'Sims',
    //     },
    // },
    // {
    //     id: '8',
    //     title: 'Article 8',
    //     author: {
    //         firstName: 'Gregory',
    //         lastName: 'Sims',
    //     },
    // },
    // {
    //     id: '9',
    //     title: 'Article 9',
    //     author: {
    //         firstName: 'Gregory',
    //         lastName: 'Sims',
    //     },
    // },
    // {
    //     id: '10',
    //     title: 'Article 10',
    //     author: {
    //         firstName: 'Gregory',
    //         lastName: 'Sims',
    //     },
    // },
];


export default () => (
    <Page>
        <VerticalList>
            <NewItem
                to="/staff/news"
            />
            {fakeArticles.map(article => (
                <MenuItem
                    key={article.id}
                    to={`/staff/news/${article.id}`}
                    heading={article.title}
                    subheading={`${article.author.firstName} ${article.author.lastName}`}
                />
            ))}
        </VerticalList>
        <Route path="/staff/news/:id" component={Article} />
    </Page>
);
