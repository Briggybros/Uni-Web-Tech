// @flow
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import ThemeProvider from './providers/ThemeProvider';
import { theme, injectGlobalStyles } from './style-utils';

import Routes from './routes';

import reducer from './reducer';

const persistedReducer = persistReducer({
    key: 'root',
    storage,
}, reducer);

const store = createStore(
    persistedReducer,
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
            <PersistGate persistor={persistStore(store)}>
                <ThemeProvider
                    theme={theme}
                >
                    <Routes />
                </ThemeProvider>
            </PersistGate>
        </ReduxProvider>,
        mount,
    );
} else {
    throw new Error('Could not find React mount point');
}
