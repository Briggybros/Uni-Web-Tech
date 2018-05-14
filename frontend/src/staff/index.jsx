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
                    <Route />
                </Switch>
            </Page>
        );
    }
}
