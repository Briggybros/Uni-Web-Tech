// @flow
import * as React from 'react';
import CKEditor from 'react-ckeditor-component';
import styled from 'styled-components';

import { connect } from 'react-redux';

import { updateContent } from './reducer';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.span`
    align-self: flex-end;
`;

const EditorButton = styled.button`
    border-radius: 10px;
    border: none;
    color: white;
    padding: 1rem;
    margin: 1rem;
    outline: none;
`;

const SaveButton = EditorButton.extend`
    background: #0aa;
`;

const PublishButton = EditorButton.extend`
    background: #0a0;
`;

type Props = {
    onSave : (string) => null,
    onPublish : (string) => null,
    content : string,
}

const Editor = (props : Props) => (
    <Container>
        <CKEditor
            events={{
                change: event => updateContent(event.editor.getContent()),
            }}
        />
        <ButtonContainer>
            <SaveButton
                onClick={() => props.onSave(props.content)}
            >
                        Save Draft
            </SaveButton>
            <PublishButton
                onClick={() => props.onPublish(props.content)}
            >
                        Publish
            </PublishButton>
        </ButtonContainer>
    </Container>
);

export default connect(state => ({
    content: state.editor.content,
}), {
    updateContent,
})(Editor);
