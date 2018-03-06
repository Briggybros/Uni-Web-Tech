// @flow
import * as React from 'react';

import { CenterAlign, CENTER_ALIGN_NODE } from './CenterAlign';
import { Image, IMAGE_NODE } from './Image';
import { LeftAlign, LEFT_ALIGN_NODE } from './LeftAlign';
import { RightAlign, RIGHT_ALIGN_NODE } from './RightAlign';

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


export function renderNode(props : Object) {
    switch (props.node.type) {
    case LEFT_ALIGN_NODE:
        return <LeftAlign {...props} />;
    case CENTER_ALIGN_NODE:
        return <CenterAlign {...props} />;
    case RIGHT_ALIGN_NODE:
        return <RightAlign {...props} />;
    case IMAGE_NODE:
        return <Image {...props} />;
    default:
        return <LeftAlign {...props} />;
    }
}

export const nodes = {
    CENTER_ALIGN_NODE,
    IMAGE_NODE,
    LEFT_ALIGN_NODE,
    RIGHT_ALIGN_NODE,
};
