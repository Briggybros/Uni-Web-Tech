// @flow
import * as React from 'react';
import styled from 'styled-components';
import MdAdd from 'react-icons/lib/md/add';

import { Item } from '../components/VerticalList';

const AddIcon = styled(MdAdd)`
    align-self: center;
    height: 2rem;
    width: 2rem;
`;

type Props = {
    to: string,
}

export default ({ to }: Props) => (
    <Item
        to={to}
    >
        <AddIcon />
    </Item>
);
