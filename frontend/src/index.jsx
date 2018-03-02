// @flow
import React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { injectGlobal, ThemeProvider } from 'styled-components';

import News from './news/Router';
import Editor from './editor/Editor';

import Authenticator from './auth/Authenticator';

import reducer from './reducer';

const store = createStore(reducer, {});

injectGlobal`
    @font-face {
        font-family: 'bebas neue bold';
        src: url('/bebasneue_bold-webfont.woff2') format('woff2'),
             url('/bebasneue_bold-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'bebas neue light';
        src: url('/bebasneue_light-webfont.woff2') format('woff2'),
             url('/bebasneue_light-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    @import url('fonts.googleapis.com/css?family=Raleway');

    body {
        margin: 0;
        font-family: 'Raleway', sans-serif;
    }

    h1, h2, h3, h4 h5, h6 {
        font-family: 'bebas neue bold', sans-serif;
    }
`;

const theme = {
    colors: {
        primary: '#ea504b',
        white: '#fff',
        black: '#242020',
    },
};

const AuthRoute = ({ children, ...props } : {children : Route.propTypes.children}) => (
    <Route
        {...props}
    >
        <Authenticator>
            {children}
        </Authenticator>
    </Route>
);

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
                    <Switch>
                        <AuthRoute exact path="/">
                            <News />
                        </AuthRoute>
                        <AuthRoute path="/editor">
                            <Editor />
                        </AuthRoute>
                    </Switch>
                </Router>
            </ThemeProvider>
        </ReduxProvider>,
        mount,
    );
} else {
    throw new Error('Could not find React mount point');
}

