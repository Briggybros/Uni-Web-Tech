// @flow
import * as React from 'react';
import styled from 'styled-components';

export const IMAGE_NODE = 'IMAGE_NODE';

type Props = {
    node : Object,
    attributes : Object,
}

const SizedImage = styled.img`
    width: fit-content;
    height: fit-content;
`;

export const Image = ({ node, attributes } : Props) => (
    <SizedImage
        {...attributes}
        src={node.data.get('src')}
        alt=""
    />
);
