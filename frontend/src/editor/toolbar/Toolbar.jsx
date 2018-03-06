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

import { MarkButton, NodeButton } from './Buttons';
import Dropdown from './Dropdown';

import { marks } from '../content/marks/index';
import { nodes } from '../content/nodes/index';

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
            <MarkButton
                mark={marks.BOLD_MARK}
                editor={editor}
                onClick={onClick}
            >
                <MdFormatBold />
            </MarkButton>
            <MarkButton
                mark={marks.ITALIC_MARK}
                editor={editor}
                onClick={onClick}
            >
                <MdFormatItalic />
            </MarkButton>
            <MarkButton
                mark={marks.UNDERLINE_MARK}
                editor={editor}
                onClick={onClick}
            >
                <MdFormatUnderlined />
            </MarkButton>
            <MarkButton
                mark={marks.STRIKETHROUGH_MARK}
                editor={editor}
                onClick={onClick}
            >
                <MdFormatStrikethrough />
            </MarkButton>
            <NodeButton
                node={nodes.LEFT_ALIGN_NODE}
                editor={editor}
                onClick={onClick}
            >
                <MdFormatAlignLeft />
            </NodeButton>
            <NodeButton
                node={nodes.CENTER_ALIGN_NODE}
                editor={editor}
                onClick={onClick}
            >
                <MdFormatAlignCenter />
            </NodeButton>
            <NodeButton
                node={nodes.RIGHT_ALIGN_NODE}
                editor={editor}
                onClick={onClick}
            >
                <MdFormatAlignRight />
            </NodeButton>
            <NodeButton
                node={nodes.IMAGE_NODE}
                editor={editor}
                onClick={(id) => {
                    const url = prompt('Image URL:');
                    onClick(id, url);
                }}
            >
                <MdInsertPhoto />
            </NodeButton>
            <NodeButton
                node={nodes.LEFT_ALIGN_NODE}
                editor={editor}
                onClick={onClick}
            >
                <MdFormatListBulleted />
            </NodeButton>
            <NodeButton
                node={nodes.LEFT_ALIGN_NODE}
                editor={editor}
                onClick={onClick}
            >
                <MdFormatListNumbered />
            </NodeButton>
            <Dropdown>
                <MarkButton
                    mark={marks.NORMAL_MARK}
                    editor={editor}
                    onClick={onClick}
                    dropdown
                >
                    Normal Text
                </MarkButton>
                <MarkButton
                    mark={marks.H1_MARK}
                    editor={editor}
                    onClick={onClick}
                    dropdown
                >
                    Title
                </MarkButton>
                <MarkButton
                    mark={marks.H2_MARK}
                    editor={editor}
                    onClick={onClick}
                    dropdown
                >
                    Subtitle
                </MarkButton>
                <MarkButton
                    mark={marks.H3_MARK}
                    editor={editor}
                    onClick={onClick}
                    dropdown
                >
                    Section
                </MarkButton>
                <MarkButton
                    mark={marks.H4_MARK}
                    editor={editor}
                    onClick={onClick}
                    dropdown
                >
                    SubSection
                </MarkButton>
                <MarkButton
                    mark={marks.H5_MARK}
                    editor={editor}
                    onClick={onClick}
                    dropdown
                >
                    SubSubSection
                </MarkButton>
                <MarkButton
                    mark={marks.H6_MARK}
                    editor={editor}
                    onClick={onClick}
                    dropdown
                >
                    SubSubSubSection
                </MarkButton>
            </Dropdown>
        </Row>
    </Container>
);
