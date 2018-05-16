// @flow
import * as React from 'react';
import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

import type { ArticleType } from '../../types';

const Title = styled.h2`
`;

const Link = styled(UnstyledLink)`
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: black;
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
        <Info>
            {article.author.firstName} {article.author.lastName}
        </Info>
        <Info>
            {new Date(parseInt(article.timestamp, 10)).toDateString()}
        </Info>
    </Link>
);
