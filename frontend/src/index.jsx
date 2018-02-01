// @flow
import React from 'react';
import { render } from 'react-dom';

const mount : HTMLElement | null = document.getElementById('app');

if (mount) {
    render(
        <div />,
        mount,
    );
} else {
    throw new Error('Could not find React mount point');
}

