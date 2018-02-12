// @flow
import * as React from 'react';
import styled from 'styled-components';
import { media } from './style-utils'

const Navigation = styled.nav`
    width: 100%;
    background-color: ${props => props.theme.primary};
    height: 56px;
    ${media.handheld`
        height: 10vh;
    `}
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
const Header = () => {
    return (
        <Navigation>
            {/* <MenuContainer>
                <Logo></Logo>
                <Menu>
                    <MenuItem><Link></Link></MenuItem>
                </Menu>
            </MenuContainer> */}
        </Navigation>
    );
};

export default Header;