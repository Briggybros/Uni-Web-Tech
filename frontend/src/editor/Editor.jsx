// It is important to import the Editor which accepts plugins.
import * as React from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';


import 'draft-js/dist/Draft.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';

// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const toolbarPlugin = createToolbarPlugin();

// The Editor accepts an array of plugins. In this case, only the toolbarPlugin
// is passed in, although it is possible to pass in multiple plugins.
class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onChange(editorState) {
        this.setState({ editorState });
    }

    render() {
        return (
            <Editor
                editorState={this.state.editorState}
                onChange={this.onChange.bind(this)}
                plugins={[toolbarPlugin]}
            />
        );
    }
}


export default MyEditor;
