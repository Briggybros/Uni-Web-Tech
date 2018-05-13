// @flow
import * as React from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';

const Page = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Header = styled.header`
    width: 100vw;
    background-color: ${props => props.theme.colours.primary};
    height: 10vh;
`;

export default class Staff extends React.Component<{}> {
    componentWillMount() {
        fetch('/api/auth/validate')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Bad credentials');
            })
            .then((user) => {
                if (!(user && user.roles && user.roles.length > 0)) {
                    throw new Error('Bad credentials');
                }
            }).catch(() => window.location.replace('/'));
    }

    render() {
        return (
            <Page>
                <Header />
                <Switch>
                    <Route />
                </Switch>
            </Page>
        );
    }
}
