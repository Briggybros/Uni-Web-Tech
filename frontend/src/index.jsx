// @flow
import React from 'react';
import { render } from 'react-dom';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import styled from 'styled-components';

import ThemeProvider from './providers/ThemeProvider';
import { theme, injectGlobalStyles } from './style-utils';

import Header from './components/Header';
import Footer from './components/Footer';
import reducer from './reducer';

const store = createStore(reducer, {});

injectGlobalStyles();

const mount : HTMLElement | null = document.getElementById('app');

const Page = styled.div`
    min-height: 100vh;
    position: relative;
`;

if (mount) {
    render(
        <ReduxProvider
            store={store}
        >
            <ThemeProvider
                theme={theme}
            >
                <Router>
                    <Page>
                        <Header />
                        <Switch>
                            <Route>
                                <span>Content</span>
                            </Route>
                        </Switch>
                        <Footer />
                    </Page>
                </Router>
            </ThemeProvider>
        </ReduxProvider>,
        mount,
    );
} else {
    throw new Error('Could not find React mount point');
}

