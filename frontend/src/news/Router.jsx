import * as React from 'react';
import { Switch, Route } from 'react-router';
import News from './News';
import Editor from '../editor/Editor';

export default () => (
    <Switch>
        <Route exact path="/" component={News} />
        {/* <Route path="/news/:id" component={Post} /> */}
        <Route path="/news/:id/edit" component={Editor} />
        <Route path="/news/new" component={Editor} />
    </Switch>
);

