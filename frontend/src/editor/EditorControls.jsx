import * as React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import styled from 'styled-components';

import { Toggleable } from '../util/Components';

type onChangeType = (editorState : EditorState) => null;

function toggleInlineStyle(style : string, editorState : EditorState, onChange : onChangeType) {
    return () => {
        onChange(RichUtils.toggleInlineStyle(editorState, style));
    };
}

function toggleBold(editorState : EditorState, onChange : onChangeType) {
    return toggleInlineStyle('BOLD', editorState, onChange);
}

function toggleItalic(editorState : EditorState, onChange : onChangeType) {
    return toggleInlineStyle('ITALIC', editorState, onChange);
}

type Props = {
    editorState : EditorState,
    onChange : onChangeType,
}

const FocuslessButton = ({
    children,
    onClick,
    onMouseDown,
    ...props
} : {
    children : Node | Array<Node>,
    onClick : Function,
    onMouseDown : Function
}) => (
    <div
        onMouseDown={(event) => {
            event.preventDefault();
            if (onClick) onClick(event);
            if (onMouseDown) onMouseDown(event);
        }}
        role="button"
        tabIndex={0}
    >
        <button
            {...props}
        >
            {children}
        </button>
    </div>
);

const ToggleButton = ({ children, ...props } : { children : Node | Array<Node>}) => (
    <Toggleable>
        <FocuslessButton
            {...props}
        >
            {children}
        </FocuslessButton>
    </Toggleable>
);

const Container = styled.span`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Button = styled(ToggleButton)`
    border: none;
    border-radius: 2px;
    min-width: 32px;
    min-height: 32px;
    background: ${props => (props.toggled ? 'lightblue' : 'lightgrey')};
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
`;

const BoldButton = Button.extend`
    font-weight: bold;
`;

const ItalicButton = Button.extend`
    text-decoration: italic;
`;

export default ({ editorState, onChange } : Props) => (
    <Container>
        <BoldButton
            onClick={toggleBold(editorState, onChange)}
        >
            B
        </BoldButton>
        <ItalicButton
            onClick={toggleItalic(editorState, onChange)}
        >
            i
        </ItalicButton>
    </Container>
);
