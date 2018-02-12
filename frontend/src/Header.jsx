// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Container } from './style-utils';
// import { Link } from 'react-router-dom';

const Navigation = styled.nav`
    width: 100%;
    background-color: ${props => props.theme.primary};
    min-height: 10vh;
    display:flex;
    align-items:stretch;
`;

Navigation.defaultProps = {
    theme:{
        primary: '#e9304a',
        primaryDark: '#b12538'
    }
};

const MenuContainer = Container.extend`
    display:flex;
    justify-content: space-between;
    align-items:stretch;
`;

const Menu = styled.ul`
    list-style: none;
    margin: 0;
    display: flex;
    flex-flow: row wrap;
    align-items:stretch;
`

const Logo = styled.div`
    display: flex;
    align-self:center;
`;

const MenuItem = styled.li`
    display:flex;
    &:hover {
      background-color: ${props => props.theme.primaryDark};
    }
`;

const Link = styled.a`
  text-decoration: none;
  display: flex;
  align-self:center;
  color: white;
  padding: 0 1em;
`;

MenuItem.defaultProps = {
    theme:{
        primary: '#e9304a',
        primaryDark: '#b12538'
    }
};

const Header = () => {
    return (
        <Navigation>
            <MenuContainer>
                <Logo>RAG</Logo>
                <Menu>
                    <MenuItem><Link href="#">Home</Link></MenuItem>
                    <MenuItem><Link href="#">About</Link></MenuItem>
                </Menu>
            </MenuContainer>
        </Navigation>
    );
};

export default Header;