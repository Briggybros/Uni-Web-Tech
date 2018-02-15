// @flow
import * as React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { connect } from 'react-redux';

import EditorControls from './EditorControls';
import { updateContent } from './reducer';

type State = {
    editorState : EditorState,
}

class ContentEditor extends React.Component<{}, State> {
    constructor(props : {}) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
    }

    onChange(editorState : EditorState) {
        this.setState({ editorState });
    }

    onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }

    handleKeyCommand(command : string, editorState : EditorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    render() {
        return (
            <div>
                <EditorControls
                    editorState={this.state.editorState}
                    onChange={this.onChange.bind(this)}
                />
                <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand.bind(this)}
                    onChange={this.onChange.bind(this)}
                />
            </div>
        );
    }
}

export default connect(null, { updateContent })(ContentEditor);
