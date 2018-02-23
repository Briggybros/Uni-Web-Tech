// @flow
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';

import ThemeProvider from './providers/ThemeProvider';
import { theme, injectGlobalStyles } from './style-utils';

import Header from './Header';
import reducer from './reducer';

const store = createStore(reducer, {});

injectGlobalStyles();

const mount : HTMLElement | null = document.getElementById('app');

if (mount) {
    render(
        <ReduxProvider
            store={store}
        >
            <ThemeProvider
                theme={theme}
            >
                <Router>
                    <Header />
                </Router>
            </ThemeProvider>
        </ReduxProvider>,
        mount,
    );
} else {
    throw new Error('Could not find React mount point');
}

