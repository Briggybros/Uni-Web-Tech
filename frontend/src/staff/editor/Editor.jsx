// @flow
import * as React from 'react';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';
import DropOrPasteImages from 'slate-drop-or-paste-images';
import styled from 'styled-components';

import Toolbar from './toolbar/Toolbar';
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
    value?: Value,
    onChange?: (value: Value) => any,
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

const Editor = ({ value, onChange, ...rest }: Props) => {
    const onClick = (type: string, data?: any) => {
        if (isNode(type)) {
            const change = toggleNode(type, value, data).focus();
            if (onChange) onChange(change.value);
        } else if (isMark(type)) {
            const change = toggleMark(type, value).focus();
            if (onChange) onChange(change.value);
        }
    };

    if (value && onChange) {
        return (
            <Container {...rest}>
                <Toolbar
                    onClick={onClick}
                    value={value}
                />
                <StyledEditor
                    value={value}
                    onChange={change => onChange(change.value)}
                    plugins={plugins}
                    renderNode={renderNode}
                    renderMark={renderMark}
                />
            </Container>
        );
    }
    return null;
};

Editor.defaultProps = {
    value: Value.fromJSON({
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
};

export default Editor;
