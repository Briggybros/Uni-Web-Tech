// @flow
import * as React from 'react';
import { Route, Switch } from 'react-router';

export default () => (
    <div>
        <Switch>
            <Route path="/login/register">
                <span>Register</span>
            </Route>
            <Route exact path="/login">
                <span>Login</span>
            </Route>
        </Switch>
    </div>
);
