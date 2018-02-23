// @flow
import styled, { injectGlobal } from 'styled-components';

export const theme = {
    colours: {
        primary: '#e9304a',
        primaryDark: '#b12538',
        white: '#fff',
        black: '#242020',
    },
    fontFamilies: {
        title: 'Bebas Nueue',
        content: 'Raleway, sans-serif',
    },
};

export function injectGlobalStyles() {
    injectGlobal`
        @font-face {
            font-family: 'Bebas Neue';
            src: url('/bebasneue_bold-webfont.woff2') format('woff2'),
                url('/bebasneue_bold-webfont.woff') format('woff');
            font-weight: normal;
            font-style: bold;
        }
        
        @font-face {
            font-family: 'Bebas Neue';
            src: url('/bebasneue_light-webfont.woff2') format('woff2'),
                url('/bebasneue_light-webfont.woff') format('woff');
            font-weight: lighter;
            font-style: normal;
        }

        @import url('fonts.googleapis.com/css?family=Raleway');
        @import url('https://necolas.github.io/normalize.css/8.0.0/normalize.css');

        body {
            margin: 0;
            font-family: 'Raleway', sans-serif;
        }

        h1, h2, h3, h4 h5, h6 {
            font-family: 'Bebas Neue', sans-serif;
            font-weight: bold;
        }
    `;
}

export const Container = styled.div`
    width:100%;
    margin: 0 auto;
    @media (min-width: 768px) {
        width:80%;
    }
`;
