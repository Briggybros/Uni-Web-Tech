// @flow
import React from 'react';
import { render } from 'react-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';

const ralewayURL = '\'https://fonts.googleapis.com/css?family=Raleway\'';

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

    @import url(${ralewayURL});

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

const mount : HTMLElement | null = document.getElementById('app');

if (mount) {
    render(
        <ThemeProvider
            theme={theme}
        >
            <div />
        </ThemeProvider>,
        mount,
    );
} else {
    throw new Error('Could not find React mount point');
}

