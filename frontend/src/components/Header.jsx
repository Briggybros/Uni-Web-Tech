// @flow
import * as React from 'react';
import styled from 'styled-components';
import MenuIcon from 'react-icons/lib/md/menu';

import Navigation from './Navigation';
import { Container } from '../style-utils';

const headerHeight = '10vh';

const Header = styled.header`
    width: 100vw;
    background-color: ${props => props.theme.colours.primary};
    height: ${headerHeight};
`;

const MenuContainer = Container.extend`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
`;

const Logo = styled.img`
    align-self: flex-start;
    height: 100%;
    width: ${headerHeight};
`;

const MobileMenuButton = styled.button`
    ${props => (!props.theme.media.mobile ? 'display: none;' : '')}
    font-size: 1.5em;
    padding-right: 1em;
    color: white;
    background: none;
    border: none;
`;

const MenuBars = styled(MenuIcon)`
    height: 100%;
`;

type State = {
    isNavOpen: boolean,
}

export default class HeaderBar extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            isNavOpen: false,
        };
    }

    render() {
        return (
            <Header>
                <MenuContainer>
                    <Logo src="/logo.svg" />
                    <MobileMenuButton
                        onClick={() => this.setState(prevState => (
                            { isNavOpen: !prevState.isNavOpen }))}
                    >
                        <MenuBars />
                    </MobileMenuButton>
                    <Navigation
                        isOpen={this.state.isNavOpen}
                        headerHeight={headerHeight}
                    />
                </MenuContainer>
            </Header>
        );
    }
}
