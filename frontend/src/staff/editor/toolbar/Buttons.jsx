// @flow
import * as React from 'react';
import styled from 'styled-components';

import FocusslessButton from '../../../util/FocusslessButton';

type Children = any;

const EditorButton = ({
    children,
    id,
    onClick,
    active,
    ...props
}: {
    children: Children,
    id: string,
    onClick: Function,
    active: (string: string) => boolean,
}) => (
    <FocusslessButton
        onClick={() => onClick(id)}
        active={active(id)}
        {...props}
    >
        {children}
    </FocusslessButton>
);

const Button = styled(({ dropdown, ...rest }) => <EditorButton {...rest} />)`
    color: ${props => (props.active(props.id) ? props.theme.colors.primary : 'black')};
    margin-right: ${props => (props.dropdown ? '0' : '0.5rem')};
    width: ${props => (props.dropdown ? 'initial' : '24px')};
    height: ${props => (props.dropdown ? 'initial' : '24px')};
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

export const MarkButton = ({
    children,
    mark,
    editor,
    onClick,
    dropdown,
    ...props
}: {
    children: Children,
    mark: string,
    editor: Object,
    onClick: Function,
    dropdown?: boolean,
}) => (
    <Button
        active={markType => editor.activeMarks.some(activeMark => activeMark.type === markType)}
        id={mark}
        onClick={onClick}
        dropdown={dropdown}
        {...props}
    >
        {children}
    </Button>
);
MarkButton.defaultProps = {
    dropdown: false,
};

export const NodeButton = ({
    children,
    node,
    editor,
    onClick,
    dropdown,
    ...props
}: {
    children: Children,
    node: string,
    editor: Object,
    onClick: Function,
    dropdown?: boolean,
}) => (
    <Button
        active={nodeType => editor.blocks.some(activeNode => activeNode.type === nodeType)}
        id={node}
        onClick={onClick}
        dropdown={dropdown}
        {...props}
    >
        {children}
    </Button>
);
NodeButton.defaultProps = {
    dropdown: false,
};
