// @flow
import * as React from 'react';
import styled from 'styled-components';

import { Link as UnstyledLink } from 'react-router-dom';

const Navigation = styled.nav`
    display: flex;
    ${props => (props.theme.media.mobile ? 'position: fixed;' : '')}
    ${props => (props.theme.media.mobile ? 'width: 80%;' : '')}
    ${props => (props.theme.media.mobile ? `top: ${props.headerHeight};` : '')}
    ${props => (props.theme.media.mobile ? 'left: 100%;' : '')}
    ${props => (props.theme.media.mobile ? 'height: 100vh;' : '')}
    ${props => (props.theme.media.mobile ? `background: ${props.theme.colours.primaryDark};` : '')}
    ${props => (props.theme.media.mobile ? `transform: ${props.isOpen ? 'translateX(-100%)' : 'none'};` : '')}
    ${props => (props.theme.media.mobile ? 'transition: transform 0.2s ease-in;' : '')}
`;

const Menu = styled.div`
    margin: 0;
    display: flex;
    flex-direction: ${props => (props.theme.media.mobile ? 'column' : 'row')};
    ${props => (props.theme.media.mobile ? 'width: 100%;' : '')}
    ${props => (props.theme.media.mobile ? 'padding: 0;' : '')}
    height: ${props => (props.theme.media.mobile ? 'fit-content' : '100%')};
`;

const Link = styled(UnstyledLink)`
  text-decoration: none;
  display: flex;
  align-self:center;
  color: white;
  font-family: ${props => props.theme.fontFamilies.title};
  font-weight: lighter;
  font-size: 2em;
  height: 100%;
  padding: ${props => (props.theme.media.mobile ? '0' : '0 1rem')};
  width: ${props => (props.theme.media.mobile ? '100%' : 'initial')};
  display: flex;
  flex-direction: ${props => (props.theme.media.mobile ? 'row' : 'column')};
  justify-content: center;
  &:hover {
        background-color: ${props => (props.theme.media.mobile ? props.theme.colours.primary : props.theme.colours.primaryDark)};
    }
`;


type Props = {
    isOpen : boolean,
    headerHeight : string,
}

export default ({ isOpen, headerHeight } : Props) => (
    <Navigation
        isOpen={isOpen}
        headerHeight={headerHeight}
    >
        <Menu>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </Menu>
    </Navigation>
);
