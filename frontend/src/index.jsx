// @flow
import React from 'react';
import { render } from 'react-dom';
import Header from './Header';
import { ThemeProvider } from 'styled-components';
 
const mount : HTMLElement | null = document.getElementById('app');

const theme = {
    primary: '#e9304a',
    primaryDark: '#b12538'
};

if (mount) {
    render(
        <ThemeProvider theme={theme}>
            <Header />
        </ThemeProvider>
        ,
        mount,
    );
} else {
    throw new Error('Could not find React mount point');
}

