// @flow
import * as React from 'react';
import { NavLink as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';
import styledProperty from '@briggybros/styled-property';

const List = styled.ul`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    width: 20vw;
    list-style-type: none;
    overflow-x: hidden;
    overflow-y: scroll;
    background: #222;
`;

const Link = styled(UnstyledLink)`
    background: #444;
    text-decoration: none;
    color: inherit;
    border-bottom: 1px solid #222;
`;

const NavLink = styledProperty(Link, 'activeClassName')`
    background: #666;
`;

const ListItem = styled.li`
    display: flex;
    flex-direction: column;
    padding: 1rem 0.5rem;
    color: #fff;
`;

type ItemProps = {
    to: string,
    children: React.Node
}

export const Item = ({ to, children }: ItemProps) => (
    <NavLink
        to={to}
    >
        <ListItem>
            {children}
        </ListItem>
    </NavLink>
);

type ListProps = {
    children: React.Node,
}

export default ({ children }: ListProps) => (
    <List>
        {children}
    </List>
);
