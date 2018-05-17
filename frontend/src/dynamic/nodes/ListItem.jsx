// @flow
import * as React from 'react';

export const LIST_ITEM_NODE = 'LIST_ITEM_NODE';
export const ListItem = ({ children, attributes } : Object) => (
    <li {...attributes}>{children}</li>
);
