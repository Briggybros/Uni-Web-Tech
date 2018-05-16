// @flow
import * as React from 'react';
import styled from 'styled-components';
import MdAdd from 'react-icons/lib/md/add';

const Button = styled.button`
    background: #444;
    border: none;
    border-bottom: 1px solid #222;
    color: white;
    padding: 1rem 0;
    flex-shrink: 0;
`;

const AddIcon = styled(MdAdd)`
    align-self: center;
    height: 2rem;
    width: 2rem;
`;

export default (props: Object) => (
    <Button
        {...props}
    >
        <AddIcon />
    </Button>
);
