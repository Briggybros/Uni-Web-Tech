// @flow
import * as React from 'react';
import styled from 'styled-components';

export const LEFT_ALIGN_NODE = 'LEFT_ALIGN_NODE';
export const CENTER_ALIGN_NODE = 'CENTER_ALIGN_NODE';
export const RIGHT_ALIGN_NODE = 'RIGHT_ALIGN_NODE';

export type Node =
    | 'LEFT_ALIGN_NODE'
    | 'CENTER_ALIGN_NODE'
    | 'RIGHT_ALIGN_NODE'

type Props = {
    attributes : any,
    children : any,
    node : any,
}

const LeftAlign = styled.div`
    text-align: left;
`;
function LeftNode(props : Props) {
    return <LeftAlign {...props.attributes}>{props.children}</LeftAlign>;
}

const CenterAlign = styled.div`
    text-align: center;
`;
function CenterNode(props : Props) {
    return <CenterAlign {...props.attributes}>{props.children}</CenterAlign>;
}

const RightAlign = styled.div`
    text-align: right;
`;
function RightNode(props : Props) {
    return <RightAlign {...props.attributes}>{props.children}</RightAlign>;
}

export function renderNode(props : Props) {
    switch (props.node.type) {
    case LEFT_ALIGN_NODE:
        return <LeftNode {...props} />;
    case CENTER_ALIGN_NODE:
        return <CenterNode {...props} />;
    case RIGHT_ALIGN_NODE:
        return <RightNode {...props} />;
    default:
        return <LeftAlign {...props} />;
    }
}

export function nodeHotkey(options : { type : string, key : string }) {
    const { type, key } = options;

    return {
        onKeyDown(event : Object, change : Object) {
            if (event.ctrlKey && event.key === key) {
                event.preventDefault();
                change.setBlocks(type);
                return true;
            }
            return null;
        },
    };
}
