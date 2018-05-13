// @flow
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import Staff from './staff/index';
import Public from './public/index';

export default () => (
    <Router>
        <Switch>
            <Route
                path="/staff"
                component={Staff}
            />
            <Route
                path="/"
                component={Public}
            />
        </Switch>
    </Router>
);
