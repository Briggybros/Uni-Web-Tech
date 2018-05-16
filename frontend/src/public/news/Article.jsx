// @flow
import * as React from 'react';
import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

import { JSXFromJSONString } from '../../dynamic/serializer';

import type { ArticleType } from '../../types';

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

const Title = styled.h2`
`;

const Body = styled.div`
    margin-bottom: 2rem;
`;

const Info = styled.span`
    align-self: flex-end;
`;

type Props = {
    article: ArticleType
}

export default ({ article }: Props) => (
    <Link
        to={`/${article.id}`}
    >
        <Title>
            {article.title}
        </Title>
        <Body>
            {JSXFromJSONString(article.content)}
        </Body>
        <Info>
            {article.author.firstName} {article.author.lastName}
        </Info>
        <Info>
            {new Date(parseInt(article.timestamp, 10)).toDateString()}
        </Info>
    </Link>
);
