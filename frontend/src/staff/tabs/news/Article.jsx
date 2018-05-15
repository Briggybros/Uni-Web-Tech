// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Value } from 'slate';
import styled from 'styled-components';

import type { ArticleType } from '../../../types';

import { updateArticles } from '../../../reducers/newsReducer';

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

type Props = {
    article?: ArticleType,
    updateArticles: Function,
}

type State = {
    preview: boolean,
    value?: Value,
    article?: ArticleType,
}

class Article extends React.Component<Props, State> {
    static defaultProps = {
        article: undefined,
    }

    constructor(props) {
        super(props);
        this.state = {
            preview: false,
            value: props.article ? Value.fromJSON(JSON.parse(props.article.content)) : undefined,
            article: props.article,
        };
    }

    onChange = (value) => {
        this.setState({
            value,
        });
    }

    onSave = () => fetch(`/api/news/save/${this.state.article ? this.state.article.id : 'new'}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            title: 'Title', // TODO
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
        this.setState({
            article: body.article,
        });
        this.props.updateArticles([body.article]);
        return body.article;
    }).catch(console.error);

    onPreview = () => {
        this.setState(prevState => ({
            preview: !prevState.preview,
        }));
    };

    onPublish = () => {
        this.onSave().then((article) => {
            if (article) {
                fetch(`/api/news/publish/${article.id}`, {
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
                    this.setState({
                        article: body.article,
                    });
                    this.props.updateArticles([body.article]);
                    return body.article;
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
                        (this.state.article && !this.state.article.published) ||
                        (!this.state.article)
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
                    JSXFromJSONString(serializeToJSONString(this.state.value))
                    :
                    <Editor
                        defaultValue={
                            this.state.value ?
                                Value.fromJSON(this.state.value)
                                :
                                undefined
                        }
                        onChange={this.onChange}
                    />
                }
            </Window>
        );
    }
}

function mapStateToProps(state, ownProps: Object) {
    return {
        article: ownProps.isNew ? null : state.news[ownProps.match.params.id],
    };
}

function mapDispatchToProps() {
    return {
        updateArticles,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
