// @flow
import * as React from 'react';
import styled from 'styled-components';

import type { PageType } from '../../../types';

import { Item } from '../../components/VerticalList';

const Title = styled.h2`
    margin: 0;
    margin-bottom: 0.5rem;
`;

const URL = styled.span`
`;

type Props = {
    item: PageType,
}

export default ({ item }: Props) => (
    <Item
        to={`/staff/pages/${item.id}`}
    >
        <Title>{item.title}</Title>
        <URL>{item.url}</URL>
    </Item>
);
