// @flow
import * as React from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';

import Header from './components/Header';
import Navigation from './components/Navigation';

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
                return window.location.replace('/login');
            })
            .then((user) => {
                if (!(user && user.roles && user.roles.length > 0)) {
                    window.location.replace('/');
                }
            });
    }

    render() {
        return (
            <Page>
                <Header />
                <Navigation />
                <Switch>
                    <Route />
                </Switch>
            </Page>
        );
    }
}
