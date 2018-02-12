// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Container } from './style-utils';
// import { Link } from 'react-router-dom';

const Navigation = styled.nav`
    width: 100%;
    background-color: ${props => props.theme.primary};
    min-height: 10vh;
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
    height:100%;
`;

const Menu = styled.ul`
    list-style: none;
    margin: 0;
    display: flex;
    flex-flow: row wrap;
    height:100%;
`

const Logo = styled.div`
    display: block;
    align-self:flex-start;
`;

const MenuItem = styled.li`
    height:100%;
`;

const Link = styled.a`
  text-decoration: none;
  display: block;
  color: white;
  height:100%;
  padding: 0 1em;

  &:hover {
      background-color: ${props => props.theme.primaryDark};
  }
`;

Link.defaultProps = {
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