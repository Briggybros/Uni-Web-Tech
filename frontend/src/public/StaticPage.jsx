// @flow
import * as React from 'react';
import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

import { JSXFromJSONString } from '../dynamic/serializer';

import type { PageType } from '../types';

const Link = styled(UnstyledLink)`
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: black;
    background: white;
    margin: 0.5rem 0 0 0;
    padding: 0 10%;
    padding-bottom: 1rem;
`;

const Title = styled.h1`
`;

const Body = styled(({ summary, ...rest }) => <div {...rest} />)`
    margin-bottom: 2rem;
    > *:not(:first-child) {
        display: ${props => (props.summary ? 'none' : 'block')};
    }
`;

type Props = {
    page: PageType,
    summary?: boolean,
}

const StaticPage = ({ page, summary }: Props) => (
    <Link
        to={`/${page.url}`}
    >
        <Title>
            {page.title}
        </Title>
        <Body
            summary={summary}
        >
            {JSXFromJSONString(page.content)}
        </Body>
    </Link>
);

StaticPage.defaultProps = {
    summary: false,
};

export default StaticPage;
