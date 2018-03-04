// @flow
import * as React from 'react';
import styled from 'styled-components';

import {
    FaCode,
} from 'react-icons/lib/fa';


import {
    HEADER_1_MARK,
    HEADER_2_MARK,
    HEADER_3_MARK,
    HEADER_4_MARK,
    HEADER_5_MARK,
    HEADER_6_MARK,
    BOLD_MARK,
    ITALIC_MARK,
    UNDERLINE_MARK,
    STRIKETHROUGH_MARK,
} from './Marks';

import {
    CODE_NODE,
} from './Nodes';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.span`
    display: flex;
    flex-direction: row;
`;

const FocusslessButton = ({
    children,
    onClick,
    ...props
} : {
    children : any,
    onClick : Function
}) => (
    <div
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(e);
        }}
        onKeyPress={(e) => {
            if (e.key === 'space') {
                e.preventDefault();
                e.stopPropagation();
                onClick(e);
            }
        }}
        role="button"
        tabIndex={0}
    >
        <button {...props}>
            {children}
        </button>
    </div>
);

const Button = styled(FocusslessButton)`

`;

export default ({ onClick, ...props } : { onClick : (button : string) => any}) => (
    <Container
        {...props}
    >
        <Row>
            <Button
                onClick={() => onClick(HEADER_1_MARK)}
            >
                <strong>Title</strong>
            </Button>
            <Button
                onClick={() => onClick(HEADER_2_MARK)}
            >
                <strong>Sub Title</strong>
            </Button>
            <Button
                onClick={() => onClick(HEADER_3_MARK)}
            >
                <strong>Section</strong>
            </Button>
            <Button
                onClick={() => onClick(HEADER_4_MARK)}
            >
                <strong>SubSection</strong>
            </Button>
            <Button
                onClick={() => onClick(HEADER_5_MARK)}
            >
                <strong>SubSubSection</strong>
            </Button>
            <Button
                onClick={() => onClick(HEADER_6_MARK)}
            >
                <strong>SubSubSubSection</strong>
            </Button>
        </Row>
        <Row>
            <Button
                onClick={() => onClick(BOLD_MARK)}
            >
                <strong>B</strong>
            </Button>
            <Button
                onClick={() => onClick(ITALIC_MARK)}
            >
                <em>i</em>
            </Button>
            <Button
                onClick={() => onClick(UNDERLINE_MARK)}
            >
                <u>U</u>
            </Button>
            <Button
                onClick={() => onClick(STRIKETHROUGH_MARK)}
            >
                <del>S</del>
            </Button>
        </Row>
        <Row>
            <Button
                onClick={() => onClick(CODE_NODE)}
            >
                <FaCode />
            </Button>
        </Row>
    </Container>
);
