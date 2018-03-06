// @flow
import * as React from 'react';

import { unique, remove } from '../../../util/lists';

import { Bold, BOLD_MARK } from './Bold';
import { H1, H1_MARK } from './H1';
import { H2, H2_MARK } from './H2';
import { H3, H3_MARK } from './H3';
import { H4, H4_MARK } from './H4';
import { H5, H5_MARK } from './H5';
import { H6, H6_MARK } from './H6';
import { Italic, ITALIC_MARK } from './Italic';
import { Normal, NORMAL_MARK } from './Normal';
import { Strikethrough, STRIKETHROUGH_MARK } from './Strikethrough';
import { Underline, UNDERLINE_MARK } from './Underline';

const exclusives = [
    [
        NORMAL_MARK,
        H1_MARK,
        H2_MARK,
        H3_MARK,
        H4_MARK,
        H5_MARK,
        H6_MARK,
    ],
    [
        BOLD_MARK,
    ],
    [
        ITALIC_MARK,
    ],
    [
        STRIKETHROUGH_MARK,
    ],
    [
        UNDERLINE_MARK,
    ],
];

export function exclusiveMarks(mark : string) {
    const lists = exclusives.filter(list => list.includes(mark));
    const concat = lists.reduce((collect, list) => collect.concat(list), []);
    const uniq = unique(concat);
    const final = remove(uniq, mark);
    return final;
}

export function markHotkey(options : { type : string, key : string }) {
    const { type, key } = options;
    return {
        onKeyDown(event : Object, change : Object) {
            if (event.ctrlKey && event.key === key) {
                event.preventDefault();
                change.toggleMark(type);
                return true;
            }
            return null;
        },
    };
}

export function renderMark(props : Object) : React.Element<any> | null {
    switch (props.mark.type) {
    case NORMAL_MARK:
        return <Normal {...props} />;
    case H1_MARK:
        return <H1 {...props} />;
    case H2_MARK:
        return <H2 {...props} />;
    case H3_MARK:
        return <H3 {...props} />;
    case H4_MARK:
        return <H4 {...props} />;
    case H5_MARK:
        return <H5 {...props} />;
    case H6_MARK:
        return <H6 {...props} />;
    case BOLD_MARK:
        return <Bold {...props} />;
    case ITALIC_MARK:
        return <Italic {...props} />;
    case STRIKETHROUGH_MARK:
        return <Strikethrough {...props} />;
    case UNDERLINE_MARK:
        return <Underline {...props} />;
    default:
        return null;
    }
}

export const marks = {
    BOLD_MARK,
    H1_MARK,
    H2_MARK,
    H3_MARK,
    H4_MARK,
    H5_MARK,
    H6_MARK,
    ITALIC_MARK,
    STRIKETHROUGH_MARK,
    NORMAL_MARK,
    UNDERLINE_MARK,
};
