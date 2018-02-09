// @flow
import * as React from 'react';
import styled from 'styled-components';

const Navigation = styled.nav`
    width: 100%;
    height: 56px; /* TODO: alter for screen size*/
    /*theme dependent*/
    background-color: ${props => props.theme.primary};
`;

Navigation.defaultProps = {
    theme:{
        primary: '#e9304a'
    }
};

const Container = styled.div`
    display: flex;
    max-width:90%;
`;

//Should probs have called the file navigation.jsx 
// :(  <- me using styled Components
// $FlowFixMe
render(
    <Navigation>
        <MenuContainer>
            <Logo></Logo>
            <Menu>
                <MenuItem><Link></Link></MenuItem>
            </Menu>
        </MenuContainer>
    </Navigation>
);