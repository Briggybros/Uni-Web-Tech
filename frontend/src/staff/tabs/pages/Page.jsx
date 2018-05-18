// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Value } from 'slate';
import styled from 'styled-components';

import type { PageType } from '../../../types';

import { updatePages } from '../../../reducers/pageReducer';

import Editor from '../../editor/Editor';
import { JSXFromJSONString, serializeToJSONString } from '../../../dynamic/serializer';

const Window = styled.div`
    flex-grow: 2;
    display: flex;
    flex-direction: column;
`;

const ButtonWrapper = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 0.5rem 1rem;
`;

const Button = styled.button`
    background: none;
    border: none;
    border-left: 1px solid lightgrey;
    cursor: pointer;
    &:hover {
        color: ${props => props.theme.colours.primary};
    }

    &:first-child {
        border-left: none;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    border: none;
    border-top: 1px solid lightgrey;
    font-family: ${props => props.theme.fonts.title}, serif;
    font-size: 2.5rem;
`;

const InNav = styled.span`
    display: flex;
    flex-direction: row;
    padding: 0.5rem 0;
    background: white;
    border-top: 1px solid lightgrey;
    justify-content: flex-end;

    > * {
        margin-right: 0.5rem;
    }
`;

type Props = {
    page?: PageType,
    updatePages: Function,
}

type State = {
    preview: boolean,
    url: string,
    inNav: boolean,
    title: string,
    value?: Value,
}

class Page extends React.Component<Props, State> {
    static defaultProps = {
        page: undefined,
    }

    constructor(props) {
        super(props);
        this.state = {
            preview: false,
            url: props.page && props.page.url ? props.page.url : '',
            inNav: props.page && props.page.inNav,
            title: props.page && props.page.title ? props.page.title : '',
        };

        if (props.page) {
            this.state = {
                ...this.state,
                value: Value.fromJSON(JSON.parse(props.page.content)),
            };
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.page &&
            this.props.page &&
            prevProps.page.id !== this.props.page.id
        ) {
            /*
             * Note here, that airbnb has rules against setting state in update
             * If there's a better way to do this, please inform
             */
            /* eslint-disable-next-line react/no-did-update-set-state */
            this.setState({
                url: this.props.page.url,
                inNav: this.props.page.inNav,
                title: this.props.page.title,
                value: Value.fromJSON(JSON.parse(this.props.page.content)),
            });
        }
    }

    onChange = (value: Value) => {
        this.setState({
            value,
        });
    }

    onTitleChange = (title: string) => {
        this.setState({
            title,
        });
    }

    onURLChange = (url: string) => {
        this.setState({
            url,
        });
    }

    onInNavChange = () => {
        this.setState(prevState => ({
            inNav: !prevState.inNav,
        }));
    }

    onSave = () => fetch(`/api/page/save/${this.props.page ? this.props.page.id : 'new'}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            url: this.state.url,
            inNav: this.state.inNav,
            title: this.state.title,
            content: serializeToJSONString(this.state.value),
        }),
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Library Error');
    }).then((body) => {
        if (body.response.isError) {
            alert(`${body.response.code}: ${body.response.message}`);
            return null;
        }
        this.props.updatePages([body.page]);
        return body.page;
    }).catch(console.error);

    onPreview = () => {
        this.setState(prevState => ({
            preview: !prevState.preview,
        }));
    };

    onPublish = () => {
        this.onSave().then((page) => {
            if (page) {
                fetch(`/api/page/publish/${page.id}`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: 'same-origin',
                }).then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Library Error');
                }).then((body) => {
                    if (body.response.isError) {
                        alert(`${body.response.code}: ${body.response.message}`);
                        return null;
                    }
                    this.props.updatePages([body.page]);
                    return body.page;
                }).catch(console.error);
            }
        });
    }

    render() {
        return (
            <Window>
                <ButtonWrapper>
                    <Button
                        onClick={this.onSave}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={this.onPreview}
                    >
                        {this.state.preview ? 'Edit' : 'Preview'}
                    </Button>
                    {(
                        (this.props.page && !this.props.page.published) ||
                        (!this.props.page)
                    ) &&
                        <Button
                            onClick={this.onPublish}
                        >
                            Publish
                        </Button>
                    }
                </ButtonWrapper>
                {this.state.preview ?
                    this.state.value &&
                    <Wrapper>
                        <h1>{this.state.title}</h1>
                        <span>{this.state.url} - In navigation: <input type="checkbox" value={this.state.inNav.toString()} disabled /></span>
                        {JSXFromJSONString(serializeToJSONString(this.state.value))}
                    </Wrapper>
                    :
                    <Wrapper>
                        <Input
                            value={this.state.title}
                            placeholder="Page title"
                            onChange={event => this.onTitleChange(event.target.value)}
                        />
                        <Input
                            value={this.state.url}
                            placeholder="Page URL"
                            onChange={event => this.onURLChange(event.target.value)}
                        />
                        <InNav>
                            <span>In navigation:</span>
                            <input
                                type="checkbox"
                                checked={this.state.inNav}
                                onChange={this.onInNavChange}
                            />
                        </InNav>
                        <Editor
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </Wrapper>
                }
            </Window>
        );
    }
}

function mapStateToProps(state, ownProps: Object) {
    return {
        page: ownProps.isNew ? null : state.pages[ownProps.match.params.id],
    };
}

export default connect(mapStateToProps, {
    updatePages,
})(Page);
