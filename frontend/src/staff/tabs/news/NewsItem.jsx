// @flow
import * as React from 'react';
import styled from 'styled-components';

import type { ArticleType } from '../../../types';

import { Item } from '../../components/VerticalList';

const Title = styled.h2`
    margin: 0;
    margin-bottom: 0.5rem;
`;

const Author = styled.span`
`;

type Props = {
    item: ArticleType,
    to: string,
}

export default ({ item, to }: Props) => (
    <Item
        to={to}
    >
        <Title>{item.title}</Title>
        <Author>{item.author.firstName} {item.author.lastName}</Author>
    </Item>
);
