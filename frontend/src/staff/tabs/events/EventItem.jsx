// @flow
import * as React from 'react';
import styled from 'styled-components';

import type { EventType } from '../../../types';

import { Item } from '../../components/VerticalList';

const Title = styled.h2`
    margin: 0;
    margin-bottom: 0.5rem;
`;

const Author = styled.span`
`;

type Props = {
    item: EventType,
}

export default ({ item }: Props) => (
    <Item
        to={`/staff/events/${item.id}`}
    >
        <Title>{item.title}</Title>
        <Author>{item}</Author>
    </Item>
);
