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

const Body = styled(({ summary, ...rest }) => <div {...rest} />)`
    margin-bottom: 2rem;
    > *:not(:first-child) {
        display: ${props => (props.summary ? 'none' : 'block')};
    }
`;

const Info = styled.span`
    align-self: flex-end;
`;

type Props = {
    article: ArticleType,
    summary?: boolean,
}

const Article = ({ article, summary }: Props) => (
    <Link
        to={`/${article.id}`}
    >
        <Title>
            {article.title}
        </Title>
        <Body
            summary={summary}
        >
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

Article.defaultProps = {
    summary: false,
};

export default Article;
