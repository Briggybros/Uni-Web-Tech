// @flow
import * as React from 'react';

export const CODE_NODE = 'CODE_NODE';

type Props = {
    attributes : any,
    children : any,
    node : any,
}

function CodeBlock(props : Props) {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
}

export function renderNode(props : Props) {
    switch (props.node.type) {
    case CODE_NODE:
        return <CodeBlock {...props} />;
    default:
        return <div {...props} />;
    }
}

export function nodeHotkey(options : { type : string, key : string }) {
    const { type, key } = options;

    return {
        onKeyDown(event : Object, change : Object) {
            if (event.ctrlKey && event.key === key) {
                event.preventDefault();
                change.setBlocks(type);
                return true;
            }
            return null;
        },
    };
}
