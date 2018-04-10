// @flow
import * as React from 'react';

export const STRIKETHROUGH_MARK = 'STRIKETHROUGH_MARK';
export function Strikethrough(props : Object) {
    return <del>{props.children}</del>;
}
