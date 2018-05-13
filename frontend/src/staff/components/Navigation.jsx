// @flow
import * as React from 'react';
import { NavLink as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';
import styledProperty from 'styled-property';

const Navigation = styled.nav`
`;

const Link = styled(UnstyledLink)`
`;

const ActiveLink = styledProperty(Link, 'activeClassName')`
`;

export default () => (
    <Navigation>
        <ActiveLink to="/staff">News</ActiveLink>
        <ActiveLink to="/staff/events">Events</ActiveLink>
        <ActiveLink to="/staff/pages">Pages</ActiveLink>
    </Navigation>
);
