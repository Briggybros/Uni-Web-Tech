// @flow
import * as React from 'react';
import { Value, Change } from 'slate';

import { CenterAlign, CENTER_ALIGN_NODE } from './CenterAlign';
import { Image, IMAGE_NODE } from './Image';
import { LeftAlign, LEFT_ALIGN_NODE } from './LeftAlign';
import { RightAlign, RIGHT_ALIGN_NODE } from './RightAlign';
import { BulletList, BULLET_LIST_NODE } from './BulletList';
import { NumberedList, NUMBERED_LIST_NODE } from './NumberedList';
import { ListItem, LIST_ITEM_NODE } from './ListItem';

export function isNode(id : String) : boolean {
    return id === CENTER_ALIGN_NODE
        || id === IMAGE_NODE
        || id === LEFT_ALIGN_NODE
        || id === RIGHT_ALIGN_NODE
        || id === BULLET_LIST_NODE
        || id === NUMBERED_LIST_NODE
        || id === LIST_ITEM_NODE;
}

export function toggleNode(type : string, value : Value, data? : any) : Change {
    const change = value.change();
    if (type === IMAGE_NODE && data) {
        return change.insertInline({
            type,
            isVoid: true,
            data: { src: data },
        });
    } else if (type === BULLET_LIST_NODE || type === NUMBERED_LIST_NODE) {
        const isList = value.blocks.some(node => node.type === LIST_ITEM_NODE);
        const isType = value.blocks.some(block => !!value.document.getClosest(
            block.key,
            parent => parent.type === type,
        ));

        if (isList && isType) {
            return change
                .setBlocks(LEFT_ALIGN_NODE)
                .unwrapBlock(BULLET_LIST_NODE)
                .unwrapBlock(NUMBERED_LIST_NODE);
        } else if (isList) {
            return change
                .unwrapBlock(type === BULLET_LIST_NODE ? NUMBERED_LIST_NODE : BULLET_LIST_NODE)
                .wrapBlock(type);
        }
        return change.setBlocks('list-item').wrapBlock(type);
    }
    const isList = this.hasBlock(LIST_ITEM_NODE);
    const isActive = this.hasBlock(type);
    if (isList) {
        return change
            .setBlocks(isActive ? LEFT_ALIGN_NODE : type)
            .unwrapBlock(BULLET_LIST_NODE)
            .unwrapBlock(NUMBERED_LIST_NODE);
    }
    return change.setBlocks(isActive ? LEFT_ALIGN_NODE : type);
}

export function nodeHotkey(options : { type : string, key : string }) {
    const { type, key } = options;

    return {
        onKeyDown(event : Object, change : Object) {
            if (event.ctrlKey && event.key === key) {
                event.preventDefault();
                toggleNode(type, change);
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
    case BULLET_LIST_NODE:
        return <BulletList {...props} />;
    case NUMBERED_LIST_NODE:
        return <NumberedList {...props} />;
    case LIST_ITEM_NODE:
        return <ListItem {...props} />;
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
    BULLET_LIST_NODE,
    NUMBERED_LIST_NODE,
    LIST_ITEM_NODE,
};
