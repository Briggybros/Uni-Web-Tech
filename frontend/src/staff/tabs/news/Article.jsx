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

const EditorWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TitleInput = styled.input`
    border: none;
    border-top: 1px solid lightgrey;
    font-family: ${props => props.theme.fonts.title}, serif;
    font-size: 2.5rem;
`;

type Props = {
    article?: ArticleType,
    updateArticles: Function,
}

type State = {
    preview: boolean,
    title: string,
    value?: Value,
}

class Article extends React.Component<Props, State> {
    static defaultProps = {
        article: undefined,
    }

    constructor(props) {
        super(props);
        this.state = {
            preview: false,
            title: props.article && props.article.title ? props.article.title : '',
            value: props.article ? Value.fromJSON(JSON.parse(props.article.content)) : undefined,
        };
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.article &&
            this.props.article &&
            prevProps.article.id !== this.props.article.id
        ) {
            /*
             * Note here, that airbnb has rules against setting state in update
             * If there's a better way to do this, please inform
             */
            /* eslint-disable-next-line react/no-did-update-set-state */
            this.setState({
                title: this.props.article.title,
                value: Value.fromJSON(JSON.parse(this.props.article.content)),
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

    onSave = () => fetch(`/api/news/save/${this.props.article ? this.props.article.id : 'new'}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
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
                        (this.props.article && !this.props.article.published) ||
                        (!this.props.article)
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
                    <div>
                        <h1>{this.state.title}</h1>
                        {JSXFromJSONString(serializeToJSONString(this.state.value))}
                    </div>
                    :
                    <EditorWrapper>
                        <TitleInput
                            value={this.state.title}
                            placeholder="Article title"
                            onChange={event => this.onTitleChange(event.target.value)}
                        />
                        <Editor
                            defaultValue={
                                this.state.value ?
                                    Value.fromJSON(this.state.value)
                                    :
                                    undefined
                            }
                            onChange={this.onChange}
                        />
                    </EditorWrapper>
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

export default connect(mapStateToProps, {
    updateArticles,
})(Article);
