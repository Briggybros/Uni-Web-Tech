// @flow
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';

import reducer from './reducer';

const store = createStore(reducer, {});

const mount : HTMLElement | null = document.getElementById('app');

if (mount) {
    render(
        <ReduxProvider
            store={store}
        >
            <Router>
                <div />
            </Router>
        </ReduxProvider>,
        mount,
    );
} else {
    throw new Error('Could not find React mount point');
}

