// @flow
import * as React from 'react';
import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
    background-color: ${props => props.theme.colours.primary};
    height: 5.5rem;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    padding: 0 10%;
    box-sizing: border-box;
`;

const Logo = styled.img`
    align-self: flex-start;
    height: 100%;
    width: auto;
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
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:hover {
        background-color: ${props => props.theme.colours.primaryDark};
    }
`;

const Title = styled.h1`
    align-self: center;
    margin: 0;
    color: ${props => props.theme.colours.white};
`;

export default () => (
    <Header>
        <Logo src="/logo.svg" />
        <Title>Staff Portal</Title>
        <Link to="/">Back to site</Link>
    </Header>
);
