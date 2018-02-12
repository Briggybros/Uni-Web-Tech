// @flow
import React from 'react';
import { render } from 'react-dom';
import Header from './Header';
 
const mount : HTMLElement | null = document.getElementById('app');

if (mount) {
    render(
        <Header />,
        mount,
    );
} else {
    throw new Error('Could not find React mount point');
}

