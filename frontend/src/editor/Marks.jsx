// @flow
import * as React from 'react';

export const HEADER_1_MARK = 'HEADER_1_MARK';
export const HEADER_2_MARK = 'HEADER_2_MARK';
export const HEADER_3_MARK = 'HEADER_3_MARK';
export const HEADER_4_MARK = 'HEADER_4_MARK';
export const HEADER_5_MARK = 'HEADER_5_MARK';
export const HEADER_6_MARK = 'HEADER_6_MARK';
export const BOLD_MARK = 'BOLD_MARK';
export const ITALIC_MARK = 'ITALIC_MARK';
export const STRIKETHROUGH_MARK = 'STRIKETHROUGH_MARK';
export const UNDERLINE_MARK = 'UNDERLINE_MARK';

type Props = {
    children : any,
    mark: any,
}

function H1Mark(props : Props) {
    return <h1>{props.children}</h1>;
}

function H2Mark(props : Props) {
    return <h2>{props.children}</h2>;
}

function H3Mark(props : Props) {
    return <h3>{props.children}</h3>;
}

function H4Mark(props : Props) {
    return <h4>{props.children}</h4>;
}

function H5Mark(props : Props) {
    return <h5>{props.children}</h5>;
}

function H6Mark(props : Props) {
    return <h6>{props.children}</h6>;
}

function BoldMark(props : Props) {
    return <strong>{props.children}</strong>;
}

function ItalicMark(props : Props) {
    return <em>{props.children}</em>;
}

function StrikeMark(props : Props) {
    return <del>{props.children}</del>;
}

function UnderlineMark(props : Props) {
    return <u>{props.children}</u>;
}

export function renderMark(props : Props) : React.Element<*> | null {
    switch (props.mark.type) {
    case HEADER_1_MARK:
        return <H1Mark {...props} />;
    case HEADER_2_MARK:
        return <H2Mark {...props} />;
    case HEADER_3_MARK:
        return <H3Mark {...props} />;
    case HEADER_4_MARK:
        return <H4Mark {...props} />;
    case HEADER_5_MARK:
        return <H5Mark {...props} />;
    case HEADER_6_MARK:
        return <H6Mark {...props} />;
    case BOLD_MARK:
        return <BoldMark {...props} />;
    case ITALIC_MARK:
        return <ItalicMark {...props} />;
    case STRIKETHROUGH_MARK:
        return <StrikeMark {...props} />;
    case UNDERLINE_MARK:
        return <UnderlineMark {...props} />;
    default:
        return null;
    }
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
