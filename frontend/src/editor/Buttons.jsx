// @flow
import * as React from 'react';
import styled from 'styled-components';

import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatUnderlined,
    MdFormatStrikethrough,
    MdFormatAlignJustify,
    MdFormatAlignLeft,
    MdFormatAlignRight,
    MdFormatAlignCenter,
    MdInsertPhoto,
    MdFormatListBulleted,
    MdFormatListNumbered,
} from 'react-icons/lib/md';

import Dropdown from './Dropdown';

import {
    // HEADER_1_MARK,
    // HEADER_2_MARK,
    // HEADER_3_MARK,
    // HEADER_4_MARK,
    // HEADER_5_MARK,
    // HEADER_6_MARK,
    BOLD_MARK,
    ITALIC_MARK,
    UNDERLINE_MARK,
    STRIKETHROUGH_MARK,
} from './Marks';

// import {
//     CODE_NODE,
// } from './Nodes';

const Container = styled.div`
    display: flex;
    background: ${props => props.theme.white};
    flex-direction: column;
    flex-shrink: 0;
    width: 100%;
    border: 1px solid lightgrey;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: none;
`;

const Row = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.5rem 0.5rem;
`;

const FocusslessButton = ({
    children,
    onClick,
    ...props
} : {
    children : any,
    onClick : Function
}) => (
    <div
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(e);
        }}
        onKeyPress={(e) => {
            if (e.key === 'space') {
                e.preventDefault();
                e.stopPropagation();
                onClick(e);
            }
        }}
        role="button"
        tabIndex={0}
    >
        <button {...props}>
            {children}
        </button>
    </div>
);

const Button = styled(FocusslessButton)`
    margin-right: 0.5rem;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.colors.primary}
    }

    & > svg {
        width: 100%;
        height: auto;
    }
`;

export default ({ onClick, ...props } : { onClick : (button : string) => any}) => (
    <Container
        {...props}
    >
        <Row>
            <Button
                onClick={() => onClick(BOLD_MARK)}
            >
                <MdFormatBold />
            </Button>
            <Button
                onClick={() => onClick(ITALIC_MARK)}
            >
                <MdFormatItalic />
            </Button>
            <Button
                onClick={() => onClick(UNDERLINE_MARK)}
            >
                <MdFormatUnderlined />
            </Button>
            <Button
                onClick={() => onClick(STRIKETHROUGH_MARK)}
            >
                <MdFormatStrikethrough />
            </Button>
            <Button>
                <MdFormatAlignLeft />
            </Button>
            <Button>
                <MdFormatAlignCenter />
            </Button>
            <Button>
                <MdFormatAlignRight />
            </Button>
            <Button>
                <MdFormatAlignJustify />
            </Button>
            <Button>
                <MdInsertPhoto />
            </Button>
            <Button>
                <MdFormatListBulleted />
            </Button>
            <Button>
                <MdFormatListNumbered />
            </Button>
            <Dropdown>
                <span>Heading 1</span>
                <span>Heading 2</span>
                <span>Heading 3</span>
                <span>Heading 4</span>
                <span>Heading 5</span>
                <span>Heading 6</span>
            </Dropdown>
        </Row>
    </Container>
);
