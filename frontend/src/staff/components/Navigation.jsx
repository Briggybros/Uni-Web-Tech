// @flow
import * as React from 'react';
import { NavLink as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';
import styledProperty from 'styled-property';

const Navigation = styled.nav`
    display: flex;
    flex-direction: row;
    padding: 0 10%;
    background: ${props => props.theme.grey};
`;

const Link = styled(UnstyledLink)`
    text-decoration: none;
    color: ${props => props.theme.colors.black};
    background: ${props => props.theme.colors.grey};
`;

const ActiveLink = styledProperty(Link, 'activeClassName')`
    background: ${props => props.theme.colors.lightgrey};
`;

export default () => (
    <Navigation>
        <ActiveLink exact to="/staff">News</ActiveLink>
        <ActiveLink to="/staff/events">Events</ActiveLink>
        <ActiveLink to="/staff/pages">Pages</ActiveLink>
    </Navigation>
);
