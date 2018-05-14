// @flow
import * as React from 'react';
import styled from 'styled-components';

import { Item } from '../components/VerticalList';

const Heading = styled.h2`
    margin: 0;
    margin-bottom: 0.5rem;
`;

const Subheading = styled.span`
`;

type Props = {
    heading: string,
    subheading: string,
    to: string,
}

export default ({ heading, subheading, to }: Props) => (
    <Item
        to={to}
    >
        <Heading>{heading}</Heading>
        <Subheading>{subheading}</Subheading>
    </Item>
);
