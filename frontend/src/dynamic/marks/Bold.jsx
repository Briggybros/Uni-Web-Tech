// @flow
import * as React from 'react';

export const BOLD_MARK = 'BOLD_MARK';
export function Bold(props : Object) {
    return <strong>{props.children}</strong>;
}
