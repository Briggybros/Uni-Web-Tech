// @flow
import * as React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { connect } from 'react-redux';

import { updateContent } from './reducer';

type State = {
    editorState : EditorState,
}

class ContentEditor extends React.Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onChange(editorState) {
        this.setState({
            editorState,
        });
    }

    render() {
        return (
            <Editor
                editorState={this.state.editorState}
                onChange={this.onChange.bind(this)}
            />
        );
    }
}

export default connect(state => ({
    content: state.editor.content,
}), {
    updateContent,
})(ContentEditor);
