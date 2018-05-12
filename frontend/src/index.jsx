// @flow
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';

import ThemeProvider from './providers/ThemeProvider';
import { theme, injectGlobalStyles } from './style-utils';

import Routes from './routes';

import reducer from './reducer';

const store = createStore(
    reducer,
    {},
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

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
                <Routes />
            </ThemeProvider>
        </ReduxProvider>,
        mount,
    );
} else {
    throw new Error('Could not find React mount point');
}
