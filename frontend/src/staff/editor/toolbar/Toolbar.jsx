// @flow
import * as React from 'react';
import styled from 'styled-components';

import MdFormatBold from 'react-icons/lib/md/format-bold';
import MdFormatItalic from 'react-icons/lib/md/format-italic';
import MdFormatUnderlined from 'react-icons/lib/md/format-underlined';
import MdFormatStrikethrough from 'react-icons/lib/md/format-strikethrough';
import MdFormatAlignLeft from 'react-icons/lib/md/format-align-left';
import MdFormatAlignRight from 'react-icons/lib/md/format-align-right';
import MdFormatAlignCenter from 'react-icons/lib/md/format-align-center';
import MdInsertPhoto from 'react-icons/lib/md/insert-photo';
import MdFormatListBulleted from 'react-icons/lib/md/format-list-bulleted';
import MdFormatListNumbered from 'react-icons/lib/md/format-list-numbered';

import { MarkButton, NodeButton } from './Buttons';
import Dropdown from './Dropdown';

import { marks } from '../../../dynamic/marks/index';
import { nodes } from '../../../dynamic/nodes/index';

const Container = styled.div`
    display: flex;
    background: ${props => props.theme.white};
    flex-direction: column;
    flex-shrink: 0;
    width: 100%;
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
`;

const Row = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.5rem 0.5rem;
`;

export default ({
    onClick,
    value,
    ...props
}: {
    onClick: (button: string, data?: any) => any,
    value: Object,
}) => (
    <Container
        {...props}
    >
        <Row>
            <MarkButton
                mark={marks.BOLD_MARK}
                value={value}
                onClick={onClick}
            >
                <MdFormatBold />
            </MarkButton>
            <MarkButton
                mark={marks.ITALIC_MARK}
                value={value}
                onClick={onClick}
            >
                <MdFormatItalic />
            </MarkButton>
            <MarkButton
                mark={marks.UNDERLINE_MARK}
                value={value}
                onClick={onClick}
            >
                <MdFormatUnderlined />
            </MarkButton>
            <MarkButton
                mark={marks.STRIKETHROUGH_MARK}
                value={value}
                onClick={onClick}
            >
                <MdFormatStrikethrough />
            </MarkButton>
            <NodeButton
                node={nodes.LEFT_ALIGN_NODE}
                value={value}
                onClick={onClick}
            >
                <MdFormatAlignLeft />
            </NodeButton>
            <NodeButton
                node={nodes.CENTER_ALIGN_NODE}
                value={value}
                onClick={onClick}
            >
                <MdFormatAlignCenter />
            </NodeButton>
            <NodeButton
                node={nodes.RIGHT_ALIGN_NODE}
                value={value}
                onClick={onClick}
            >
                <MdFormatAlignRight />
            </NodeButton>
            <NodeButton
                node={nodes.IMAGE_NODE}
                value={value}
                onClick={(id) => {
                    const url = prompt('Image URL:');
                    onClick(id, url);
                }}
            >
                <MdInsertPhoto />
            </NodeButton>
            <NodeButton
                node={nodes.BULLET_LIST_NODE}
                value={value}
                onClick={onClick}
            >
                <MdFormatListBulleted />
            </NodeButton>
            <NodeButton
                node={nodes.NUMBERED_LIST_NODE}
                value={value}
                onClick={onClick}
            >
                <MdFormatListNumbered />
            </NodeButton>
            <Dropdown>
                <MarkButton
                    mark={marks.NORMAL_MARK}
                    value={value}
                    onClick={onClick}
                    dropdown
                >
                    Normal Text
                </MarkButton>
                <MarkButton
                    mark={marks.H1_MARK}
                    value={value}
                    onClick={onClick}
                    dropdown
                >
                    Title
                </MarkButton>
                <MarkButton
                    mark={marks.H2_MARK}
                    value={value}
                    onClick={onClick}
                    dropdown
                >
                    Subtitle
                </MarkButton>
                <MarkButton
                    mark={marks.H3_MARK}
                    value={value}
                    onClick={onClick}
                    dropdown
                >
                    Section
                </MarkButton>
                <MarkButton
                    mark={marks.H4_MARK}
                    value={value}
                    onClick={onClick}
                    dropdown
                >
                    SubSection
                </MarkButton>
                <MarkButton
                    mark={marks.H5_MARK}
                    value={value}
                    onClick={onClick}
                    dropdown
                >
                    SubSubSection
                </MarkButton>
                <MarkButton
                    mark={marks.H6_MARK}
                    value={value}
                    onClick={onClick}
                    dropdown
                >
                    SubSubSubSection
                </MarkButton>
            </Dropdown>
        </Row>
    </Container>
);
