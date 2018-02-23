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

const Mobile = styled.div`
    display: flex;
    @media (min-width: 768px) {
        display: none;
    }
    position: fixed;
    width: 80%;
    top: ${navHeight};
    right:0;
    height:100vh;
    background-color: ${props => props.theme.primary};
    transform: ${props => !props.isOpen ? 'translateX(100%)' : 'none'};
    transition: transform 0.2s ease-in;
`;

const Desktop = styled.div`
    display:none;
    @media (min-width: 768px) {
        display: flex;
    }
`;

const MobileMenu = styled.ul`
    width: 100%;
    display:flex;
    flex-direction: column;
    padding:0;
    margin:0;
`;

const MobileButton = styled.div`
    display: flex;
    @media (min-width: 768px) {
        display: none;
    }
    align-self:flex-end;
    align-items: stretch;
    height: ${navHeight};
    font-size: 1.5em;
    padding-right:1em;
    color: white;
`;

const Icon = styled.i`
    height:${navHeight};
`

class Header extends React.Component<{}, {menuOpen: bool}> {
    state = {
        menuOpen: false,
    };

    buttonClicked = () => {
        this.setState(prevState => ({
            menuOpen: !prevState.menuOpen,
        }));
    };

    render() {
        return (
            <Navigation>
                <MenuContainer>
                    <Logo src="/logo.svg"/>
                    <Desktop>
                        <Menu>
                            <MenuItem><Link href="#">Home</Link></MenuItem>
                            <MenuItem><Link href="#">About</Link></MenuItem>
                        </Menu>
                    </Desktop>
                    <MobileButton onClick={this.buttonClicked}><Icon className="fa fa-bars" /></MobileButton>
                    <Mobile isOpen={this.state.menuOpen}>
                        <MobileMenu>
                            <MenuItem><Link href="#">Home</Link></MenuItem>
                            <MenuItem><Link href="#">About</Link></MenuItem>
                        </MobileMenu>
                    </Mobile>
                </MenuContainer>
            </Navigation>
        );
    }
};

export default Header;