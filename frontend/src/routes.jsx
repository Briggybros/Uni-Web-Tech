// @flow
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import Admin from './admin/index';
import Public from './public/index';

export default () => (
    <Router>
        <Switch>
            <Route
                path="/admin"
                component={Admin}
            />
            <Route
                path="/"
                component={Public}
            />
        </Switch>
    </Router>
);
