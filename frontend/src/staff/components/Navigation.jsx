// @flow
import * as React from 'react';
import { NavLink as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';
import styledProperty from 'styled-property';

const Navigation = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    background: ${props => props.theme.colours.grey};
    height: 1.5rem;
    flex-shrink: 0;
`;

const Link = styled(UnstyledLink)`
    text-decoration: none;
    color: ${props => props.theme.colors.black};
    background: ${props => props.theme.colors.grey};
    padding: 0 0.5rem;
    height: 100%;
`;

const NavLink = styledProperty(Link, 'activeClassName')`
    background: ${props => props.theme.colors.lightgrey};
`;

const TextWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export default () => (
    <Navigation>
        <NavLink to="/staff/news"><TextWrapper>News</TextWrapper></NavLink>
        <NavLink to="/staff/events"><TextWrapper>Events</TextWrapper></NavLink>
        <NavLink to="/staff/pages"><TextWrapper>Pages</TextWrapper></NavLink>
        <NavLink to="/staff/users"><TextWrapper>Users</TextWrapper></NavLink>
    </Navigation>
);
