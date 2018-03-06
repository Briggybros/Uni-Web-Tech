// @flow
import createDOMPurify from 'dompurify';
import { Value } from 'slate';
import Html from 'slate-html-serializer';

import { renderNode } from './content/nodes/index';
import { renderMark } from './content/marks/index';

createDOMPurify();

export function serializeToJSONString(value : Value) : string {
    return JSON.stringify(value.toJSON());
}

export function deserializeFromJSONString(string : string) : Value {
    return Value.fromJSON(JSON.parse(string));
}

const rules = [
    {
        serialize(obj, children) {
            if (obj.object === 'block') {
                return renderNode({
                    attributes: {},
                    children,
                    node: obj,
                });
            } else if (obj.object === 'mark') {
                return renderMark({ children, mark: obj });
            }
            return null;
        },
    },
];

export function toHTML(value : Value) : string {
    const html = new Html({ rules });
    return html.serialize(value);
}
