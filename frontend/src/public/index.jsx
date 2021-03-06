// @flow
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from './components/Header';
import Footer from './components/Footer';

import NewsFeed from './news/Feed';
import Timeline from './events/Timeline';

import Login from './login/Login';

import DynamicPageLoader from './DynamicPageLoader';

import { updateUser } from '../reducers/userReducer';

const Page = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Logout = connect(null, {
    updateUserDispatch: updateUser,
})(({ updateUserDispatch, push }) => {
    updateUserDispatch(null);
    const cookies = document.cookie.split(';');

    cookies.forEach((cookie) => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
    push('/');
    return null;
});

export default ({ history }: { history: { push: Function } }) => (
    <Page>
        <Header />
        <Switch>
            <Route
                exact
                path="/"
                component={NewsFeed}
            />
            <Route
                path="/events"
                component={Timeline}
            />
            <Route
                path="/login"
                component={Login}
            />
            <Route
                path="/logout"
            >
                <Logout push={history.push} />
            </Route>
            <Route
                path="/:id"
                component={DynamicPageLoader}
            />
        </Switch>
        <Footer />
    </Page>
);
