// @flow
import * as React from 'react';
import styled from 'styled-components';

const CenterAligned = styled.div`
    text-align: center;
`;

export const CENTER_ALIGN_NODE = 'CENTER_ALIGN_NODE';
export function CenterAlign(props : Object) {
    return <CenterAligned {...props.attributes}>{props.children}</CenterAligned>;
}
