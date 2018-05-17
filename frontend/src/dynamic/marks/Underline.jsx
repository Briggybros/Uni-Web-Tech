// @flow
import * as React from 'react';

export const UNDERLINE_MARK = 'UNDERLINE_MARK';
export function Underline(props : Object) {
    return <u>{props.children}</u>;
}
