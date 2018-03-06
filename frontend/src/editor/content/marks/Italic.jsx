// @flow
import * as React from 'react';

export const ITALIC_MARK = 'ITALIC_MARK';
export function Italic(props : Object) {
    return <em>{props.children}</em>;
}
