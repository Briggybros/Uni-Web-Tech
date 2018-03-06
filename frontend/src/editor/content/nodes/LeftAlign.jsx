// @flow
import * as React from 'react';
import styled from 'styled-components';

const LeftAligned = styled.div`
    text-align: left;
`;

export const LEFT_ALIGN_NODE = 'LEFT_ALIGN_NODE';
export function LeftAlign(props : Object) {
    return <LeftAligned {...props.attributes}>{props.children}</LeftAligned>;
}
