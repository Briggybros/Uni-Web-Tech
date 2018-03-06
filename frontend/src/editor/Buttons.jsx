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

import { marks } from './content/marks/index';
import { nodes } from './content/nodes/index';

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
    onClick : (button : string, data? : any) => any,
    editor : Object
}) => (
    <Container
        {...props}
    >
        <Row>
            <Button
                active={editor.activeMarks.some(mark => mark.type === marks.BOLD_MARK)}
                onClick={() => onClick(marks.BOLD_MARK)}
            >
                <MdFormatBold />
            </Button>
            <Button
                active={editor.activeMarks.some(mark => mark.type === marks.ITALIC_MARK)}
                onClick={() => onClick(marks.ITALIC_MARK)}
            >
                <MdFormatItalic />
            </Button>
            <Button
                active={editor.activeMarks.some(mark => mark.type === marks.UNDERLINE_MARK)}
                onClick={() => onClick(marks.UNDERLINE_MARK)}
            >
                <MdFormatUnderlined />
            </Button>
            <Button
                active={editor.activeMarks.some(mark => mark.type === marks.STRIKETHROUGH_MARK)}
                onClick={() => onClick(marks.STRIKETHROUGH_MARK)}
            >
                <MdFormatStrikethrough />
            </Button>
            <Button
                active={editor.blocks.some(node => node.type === nodes.LEFT_ALIGN_NODE)}
                onClick={() => onClick(nodes.LEFT_ALIGN_NODE)}
            >
                <MdFormatAlignLeft />
            </Button>
            <Button
                active={editor.blocks.some(node => node.type === nodes.CENTER_ALIGN_NODE)}
                onClick={() => onClick(nodes.CENTER_ALIGN_NODE)}
            >
                <MdFormatAlignCenter />
            </Button>
            <Button
                active={editor.blocks.some(node => node.type === nodes.RIGHT_ALIGN_NODE)}
                onClick={() => onClick(nodes.RIGHT_ALIGN_NODE)}
            >
                <MdFormatAlignRight />
            </Button>
            <Button
                onClick={() => {
                    const url = prompt('Image URL:');
                    onClick(nodes.IMAGE_NODE, url);
                }}
            >
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
                    onClick={() => onClick(marks.NORMAL_MARK)}
                >Normal Text
                </DropdownButton>
                <DropdownButton
                    onClick={() => onClick(marks.H1_MARK)}
                >Heading 1
                </DropdownButton>
                <DropdownButton
                    onClick={() => onClick(marks.H2_MARK)}
                >Heading 2
                </DropdownButton>
                <DropdownButton
                    onClick={() => onClick(marks.H3_MARK)}
                >Heading 3
                </DropdownButton>
                <DropdownButton
                    onClick={() => onClick(marks.H4_MARK)}
                >Heading 4
                </DropdownButton>
                <DropdownButton
                    onClick={() => onClick(marks.H5_MARK)}
                >Heading 5
                </DropdownButton>
                <DropdownButton
                    onClick={() => onClick(marks.H6_MARK)}
                >Heading 6
                </DropdownButton>
            </Dropdown>
        </Row>
    </Container>
);
