// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import styled from 'styled-components';

import Header from './components/Header';
import Navigation from './components/Navigation';

import News from './tabs/news/News';
import Events from './tabs/events/Events';
import Pages from './tabs/pages/Pages';
import Users from './tabs/users/Users';

const Page = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export default class Staff extends React.Component<{}> {
    componentWillMount() {
        fetch('/api/auth/validate', {
            headers: {
                Accept: 'application/json',
            },
            credentials: 'same-origin',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Library Error');
            })
            .then((body) => {
                if (
                    body.response.isError ||
                    !(body.user && body.user.roles && body.user.roles.length > 0)
                ) {
                    window.location.replace('/');
                }
            })
            .catch((error) => {
                console.error(error);
                return window.location.replace('/login');
            });
    }

    render() {
        return (
            <Page>
                <Header />
                <Navigation />
                <Switch>
                    <Route path="/staff/news" component={News} />
                    <Route path="/staff/events" component={Events} />
                    <Route path="/staff/pages" component={Pages} />
                    <Route path="/staff/users" component={Users} />
                    <Route exact path="/staff">
                        <Redirect
                            to="/staff/news"
                        />
                    </Route>
                </Switch>
            </Page>
        );
    }
}
