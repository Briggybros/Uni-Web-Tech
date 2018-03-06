// @flow
import * as React from 'react';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';
import DropOrPasteImages from 'slate-drop-or-paste-images';
import styled from 'styled-components';

import EditorButtons from './toolbar/Toolbar';

import { renderMark, markHotkey, exclusiveMarks, marks } from './content/marks/index';

import { renderNode, nodes } from './content/nodes/index';

import { serializeToJSONString } from './serializer';

const plugins = [
    markHotkey({ key: 'b', type: marks.BOLD_MARK }),
    markHotkey({ key: 'i', type: marks.ITALIC_MARK }),
    markHotkey({ key: '~', type: marks.STRIKETHROUGH_MARK }),
    markHotkey({ key: 'u', type: marks.UNDERLINE_MARK }),
    DropOrPasteImages({
        insertImage: (transform, file) => new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const src = reader.result;
                transform.insertBlock({
                    type: nodes.IMAGE_NODE,
                    isVoid: true,
                    data: { src },
                });
                resolve();
            });
            reader.readAsDataURL(file);
        }),
    }),
];

const initialValue = {
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'A line of text in a paragraph.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledEditor = styled(SlateEditor)`
    border: 1px solid lightgrey;
    border-radius: 0 0 10px 10px;
    padding: 5px 5px 10px 5px;
    flex-grow: 2;
    overflow-y: auto;
`;

type State = {
    value : Object,
}

export default class Editor extends React.Component<{}, State> {
    constructor(props : Object) {
        super(props);
        const storedString = localStorage.getItem('draft');
        if (storedString) {
            this.state = { value: Value.fromJSON(JSON.parse(storedString)) };
        } else {
            this.state = {
                value: Value.fromJSON(initialValue),
            };
        }
    }

    onChange = ({ value } : { value : Value}) => {
        if (value.document !== this.state.value.document) {
            localStorage.setItem('draft', serializeToJSONString(value));
        }
        this.setState({ value });
    }

    onClick = (button : string, data? : any) => {
        if (button.endsWith('_NODE')) {
            if (button === nodes.IMAGE_NODE) {
                const change = this.state.value.change().insertInline({
                    type: button,
                    isVoid: true,
                    data: { src: data },
                }).focus();
                this.setState({
                    value: change.value,
                });
            } else {
                const change = this.state.value.change().setBlocks(button).focus();
                this.setState({
                    value: change.value,
                });
            }
        } else if (button.endsWith('_MARK')) {
            const change = this.state.value.change();
            exclusiveMarks(button).forEach(mark => change.removeMark(mark));
            change.toggleMark(button);
            change.focus();
            this.setState({
                value: change.value,
            });
        }
    }

    render() {
        return (
            <Container {...this.props}>
                <EditorButtons
                    onClick={this.onClick}
                    editor={this.state.value}
                />
                <StyledEditor
                    {...this.props}
                    value={this.state.value}
                    onChange={this.onChange}
                    plugins={plugins}
                    renderNode={renderNode}
                    renderMark={renderMark}
                />
            </Container>
        );
    }
}
