// @flow
import * as React from 'react';

export const NUMBERED_LIST_NODE = 'NUMBERED_LIST_NODE';
export const NumberedList = ({ children, attributes } : Object) => (
    <ol {...attributes}>{children}</ol>
);
