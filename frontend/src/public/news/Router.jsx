import * as React from 'react';
import { Switch, Route } from 'react-router';
import Feed from './Feed';

export default () => (
    <Switch>
        <Route exact path="/" component={Feed} />
    </Switch>
);

