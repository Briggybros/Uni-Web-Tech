// @flow
import * as React from 'react';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';
import DropOrPasteImages from 'slate-drop-or-paste-images';
import styled from 'styled-components';

import EditorButtons from './toolbar/Toolbar';
import { renderMark, markHotkey, exclusiveMarks, marks } from './content/marks/index';
import { renderNode, nodes } from './content/nodes/index';
import { noop } from '../util/util';


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

type Props = {
    defaultValue? : Object,
    onChange? : (value : Value) => any,
}

type State = {
    value : Value,
}

export default class Editor extends React.Component<Props, State> {
    defaultProps = {
        defaultValue: { document: {} },
        onChange: () => {},
    }

    constructor(props : Props) {
        super(props);
        this.state = {
            value: Value.fromJSON(props.defaultValue),
        };
    }

    onChange = ({ value } : { value : Value}) => this.setState({ value }, () => {
        if (this.props.onChange) this.props.onChange(value);
    })

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
