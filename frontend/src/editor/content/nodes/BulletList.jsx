// @flow
import * as React from 'react';

export const BULLET_LIST_NODE = 'BULLET_LIST_NODE';
export const BulletList = ({ children, attributes } : Object) => (
    <ul {...attributes}>{children}</ul>
);
