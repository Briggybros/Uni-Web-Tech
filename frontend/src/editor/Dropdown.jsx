// @flow
import * as React from 'react';
import styled from 'styled-components';

import { MdArrowDropDown } from 'react-icons/lib/md';

type Props = {
    children : Array<React.Element<any>>
}

type State = {
    open : boolean,
    selected : number
}

const Container = styled.div`
    position: relative;
`;

const Selected = styled.div`
    border-right: 1px solid lightgrey;
    border-left: 1px solid lightgrey;
    padding: 0 0.5rem;
    cursor: pointer;
`;

const Menu = styled.div`
    display: ${props => (props.open ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    background: ${props => props.theme.colors.white};
    border: 1px solid lightgrey;
    border-top: none;
    border-radius: 0 0 5px 5px;
    width: 100%;
`;

const OptionBox = styled.div`
    background: ${props => (props.selected ? 'lightgrey' : 'none')};
    padding: 0.125rem 0.5rem;
    margin: 0.125rem 0;
    cursor: pointer;
    
    &:first-child {
        margin-top: 0.75rem;
    }

    &:hover {
        color: ${props => props.theme.colors.primary};
    }
`;

type OptionProps = {
    id : number,
    selected : boolean,
    children : React.Element<any> | Array<React.Element<any>>,
    onClick : (id : number) => void
}

const Option = ({
    id, selected, children, onClick,
} : OptionProps) => (
    <OptionBox
        onClick={() => onClick(id)}
        role="button"
        tabIndex={0}
        selected={selected}
    >
        {children}
    </OptionBox>
);

export default class Dropdown extends React.Component<Props, State> {
    state = {
        open: false,
        selected: 0,
    }

    optionClicked = (id : number) => {
        this.setState({ selected: id });
    }

    render() {
        const { children, ...props } = this.props;
        return (
            <Container
                onClick={() => this.setState(prevState => ({ open: !prevState.open }))}
                {...props}
            >
                <Selected>
                    {children[this.state.selected]}
                    <MdArrowDropDown />
                </Selected>
                <Menu open={this.state.open}>
                    {children.map((option, idx) => (<Option id={idx} selected={idx === this.state.selected} onClick={this.optionClicked}>{option}</Option>))}
                </Menu>
            </Container>
        );
    }
}
