// @flow
import * as React from 'react';
import styled from 'styled-components';

import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatUnderlined,
    MdFormatStrikethrough,
    MdFormatAlignLeft,
    MdFormatAlignRight,
    MdFormatAlignCenter,
    MdInsertPhoto,
    MdFormatListBulleted,
    MdFormatListNumbered,
} from 'react-icons/lib/md';

import Dropdown from './Dropdown';

import { Mark,
    NORMAL_MARK,
    HEADER_1_MARK,
    HEADER_2_MARK,
    HEADER_3_MARK,
    HEADER_4_MARK,
    HEADER_5_MARK,
    HEADER_6_MARK,
    BOLD_MARK,
    ITALIC_MARK,
    UNDERLINE_MARK,
    STRIKETHROUGH_MARK,
} from './Marks';

import { Node,
    LEFT_ALIGN_NODE,
    CENTER_ALIGN_NODE,
    RIGHT_ALIGN_NODE,
} from './Nodes';

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
    active,
    ...props
} : {
    children : any,
    active: boolean,
    onClick : Function
}) => (
    <div
        onMouseDown={(e) => {
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
    color: ${props => (props.active ? props.theme.colors.primary : 'black')};
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

const DropdownButton = styled.button`
    border: none;
    outline: none;
    background: none;
    margin: none;
    padding: none;
`;

export default ({
    onClick,
    editor,
    ...props
} : {
    onClick : (button : Mark | Node) => any,
    editor : Object
}) => (
    <Container
        {...props}
    >
        <Row>
            <Button
                active={editor.activeMarks.some(mark => mark.type === BOLD_MARK)}
                onClick={() => onClick(BOLD_MARK)}
            >
                <MdFormatBold />
            </Button>
            <Button
                active={editor.activeMarks.some(mark => mark.type === ITALIC_MARK)}
                onClick={() => onClick(ITALIC_MARK)}
            >
                <MdFormatItalic />
            </Button>
            <Button
                active={editor.activeMarks.some(mark => mark.type === UNDERLINE_MARK)}
                onClick={() => onClick(UNDERLINE_MARK)}
            >
                <MdFormatUnderlined />
            </Button>
            <Button
                active={editor.activeMarks.some(mark => mark.type === STRIKETHROUGH_MARK)}
                onClick={() => onClick(STRIKETHROUGH_MARK)}
            >
                <MdFormatStrikethrough />
            </Button>
            <Button
                active={editor.blocks.some(node => node.type === LEFT_ALIGN_NODE)}
                onClick={() => onClick(LEFT_ALIGN_NODE)}
            >
                <MdFormatAlignLeft />
            </Button>
            <Button
                active={editor.blocks.some(node => node.type === CENTER_ALIGN_NODE)}
                onClick={() => onClick(CENTER_ALIGN_NODE)}
            >
                <MdFormatAlignCenter />
            </Button>
            <Button
                active={editor.blocks.some(node => node.type === RIGHT_ALIGN_NODE)}
                onClick={() => onClick(RIGHT_ALIGN_NODE)}
            >
                <MdFormatAlignRight />
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
                <DropdownButton
                    onClick={() => onClick(NORMAL_MARK)}
                >Normal Text
                </DropdownButton>
                <DropdownButton
                    onClick={() => onClick(HEADER_1_MARK)}
                >Heading 1
                </DropdownButton>
                <DropdownButton
                    onClick={() => onClick(HEADER_2_MARK)}
                >Heading 2
                </DropdownButton>
                <DropdownButton
                    onClick={() => onClick(HEADER_3_MARK)}
                >Heading 3
                </DropdownButton>
                <DropdownButton
                    onClick={() => onClick(HEADER_4_MARK)}
                >Heading 4
                </DropdownButton>
                <DropdownButton
                    onClick={() => onClick(HEADER_5_MARK)}
                >Heading 5
                </DropdownButton>
                <DropdownButton
                    onClick={() => onClick(HEADER_6_MARK)}
                >Heading 6
                </DropdownButton>
            </Dropdown>
        </Row>
    </Container>
);
