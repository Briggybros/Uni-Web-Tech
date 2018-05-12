// @flow
import * as React from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';

import Header from './components/Header';
import Footer from './components/Footer';

import NewsFeed from './news/Feed';
import Login from './login/Login';

import StaticPageLoader from './StaticPageLoader';

const Page = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export default () => (
    <Page>
        <Header />
        <Switch>
            <Route
                exact
                path="/"
                component={NewsFeed}
            />
            <Route
                path="/login"
                component={Login}
            />
            <Route
                path="/:id"
                component={StaticPageLoader}
            />
        </Switch>
        <Footer />
    </Page>
);
