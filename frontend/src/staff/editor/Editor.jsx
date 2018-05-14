// @flow
import * as React from 'react';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';
import DropOrPasteImages from 'slate-drop-or-paste-images';
import styled from 'styled-components';

import EditorButtons from './toolbar/Toolbar';
import { isMark, toggleMark, renderMark, markHotkey, marks } from '../../dynamic/marks/index';
import { isNode, toggleNode, renderNode, nodes } from '../../dynamic/nodes/index';

// ----- STYLES ----- //
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledEditor = styled(SlateEditor)`
    padding: 5px 5px 10px 5px;
    flex-grow: 2;
    overflow-y: auto;
`;

type Props = {
    defaultValue?: Value,
    onChange?: (value: Value) => any,
    onSave?: (value: Value) => any,
    onPreview?: (value: Value) => any,
    onPublish?: (value: Value) => any,
}

type State = {
    value: Value,
}

// ----- SLATE PLUGINS ----- //
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

// ----- COMPONENT ----- //
export default class Editor extends React.Component<Props, State> {
    static defaultProps = {
        defaultValue: Value.fromJSON({
            document: {
                nodes: [
                    {
                        object: 'block',
                        type: nodes.LEFT_ALIGN_NODE,
                        nodes: [
                            {
                                object: 'text',
                                leaves: [
                                    {
                                        text: '',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        }),
        onChange: () => {},
        onSave: () => {},
        onPreview: () => {},
        onPublish: () => {},
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.defaultValue,
        };
    }

    onChange = ({ value }: { value: Value}) => this.setState({ value }, () => {
        if (this.props.onChange) this.props.onChange(value);
    })

    onSave = () => {
        if (this.props.onSave) this.props.onSave(this.state.value);
    }

    onPreview = () => {
        if (this.props.onPreview) this.props.onPreview(this.state.value);
    }

    onPublish = () => {
        if (this.props.onPublish) this.props.onPublish(this.state.value);
    }

    onClick = (type: string, data?: any) => {
        if (isNode(type)) {
            const change = toggleNode(type, this.state.value, data).focus();
            this.setState({
                value: change.value,
            });
        } else if (isMark(type)) {
            const change = toggleMark(type, this.state.value).focus();
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
                    onSave={this.onSave}
                    onPreview={this.onPreview}
                    onPublish={this.onPublish}
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
