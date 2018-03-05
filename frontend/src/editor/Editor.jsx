// @flow
import * as React from 'react';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';
import styled from 'styled-components';

import EditorButtons from './Buttons';

import { renderMark, markHotkey, exclusiveMarks,
    BOLD_MARK,
    ITALIC_MARK,
    STRIKETHROUGH_MARK,
    UNDERLINE_MARK,
} from './Marks';
import type { Mark } from './Marks';

import { renderNode,
    IMAGE_NODE,
} from './Nodes';
import type { Node } from './Nodes';

const plugins = [
    markHotkey({ key: 'b', type: BOLD_MARK }),
    markHotkey({ key: 'i', type: ITALIC_MARK }),
    markHotkey({ key: '~', type: STRIKETHROUGH_MARK }),
    markHotkey({ key: 'u', type: UNDERLINE_MARK }),
];

const initialValue = Value.fromJSON({
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
});

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
    state = {
        value: initialValue,
    }

    onChange = ({ value } : { value : Object}) => {
        this.setState({ value });
    }

    onClick = (button : Mark | Node, data? : any) => {
        if (button.endsWith('_NODE')) {
            if (button === IMAGE_NODE) {
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
