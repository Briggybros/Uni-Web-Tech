// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

import type { UserType, PageType } from '../../types';

const Navigation = styled.nav`
    display: flex;
    z-index:1;
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
    isOpen: boolean,
    headerHeight: string,
    user: UserType,
    pages: PageType[],
}

const Nav = ({
    isOpen,
    headerHeight,
    user,
    pages,
    ...rest
}: Props) => (
    <Navigation
        isOpen={isOpen}
        headerHeight={headerHeight}
        {...rest}
    >
        <Menu>
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            {pages.map(page => (
                <Link
                    key={page.id}
                    to={`/${page.url}`}
                >
                    {page.title}
                </Link>
            ))}
            {user && user.roles && user.roles.length > 0 && <Link to="/staff">Staff</Link>}
            {user ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
        </Menu>
    </Navigation>
);

export default connect((state) => {
    // $FlowFixMe Object.values() returns mixed[] when it should return PageType[] https://github.com/facebook/flow/issues/2221
    const pages: PageType[] = Object.values(state.pages);
    return {
        pages: pages.filter(page => page.inNav && page.published),
        user: state.user,
    };
})(Nav);
