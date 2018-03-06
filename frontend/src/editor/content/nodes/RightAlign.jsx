// @flow
import * as React from 'react';
import styled from 'styled-components';

const RightAligned = styled.div`
    text-align: right;
`;

export const RIGHT_ALIGN_NODE = 'RIGHT_ALIGN_NODE';
export function RightAlign(props : Object) {
    return <RightAligned {...props.attributes}>{props.children}</RightAligned>;
}
