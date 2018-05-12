// @flow
import * as React from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ConfirmForm from './ConfirmForm';

const Page = styled.div`
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default () => (
    <Page>
        <Switch>
            <Route path="/login/register">
                <RegisterForm />
            </Route>
            <Route path="/login/confirm">
                <ConfirmForm />
            </Route>
            <Route exact path="/login">
                {/* Could add FB/Twitter types of login here */}
                <LoginForm />
            </Route>
        </Switch>
    </Page>
);
