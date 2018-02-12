// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Container } from './style-utils';
// import { Link } from 'react-router-dom';

const navHeight = '10vh';

const Navigation = styled.nav`
    width: 100%;
    background-color: ${props => props.theme.primary};
    height: ${navHeight};
    display:flex;
    align-items:stretch;
`;

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

const Logo = styled.img`
    align-self:flex-start;
    height:100%;
    width:${navHeight};
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

const Header = () => {
    return (
        <Navigation>
            <MenuContainer>
                <Logo src="/logo.svg"/>
                <Menu>
                    <MenuItem><Link href="#">Home</Link></MenuItem>
                    <MenuItem><Link href="#">About</Link></MenuItem>
                </Menu>
            </MenuContainer>
        </Navigation>
    );
};

export default Header;