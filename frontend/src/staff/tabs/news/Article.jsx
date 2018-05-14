// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Value } from 'slate';
import styled from 'styled-components';

import type { ArticleType } from '../../../types';

import Editor from '../../editor/Editor';
import { JSXFromJSONString, serializeToJSONString } from '../../../dynamic/serializer';

const Window = styled.div`
    flex-grow: 2;
`;

type Props = {
    article: ArticleType | null,
}

type State = {
    preview: boolean,
    value?: Value,
}

class Article extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            preview: false,
            value: props.article ? Value.fromJSON(props.article.content) : undefined,
        };
    }

    render() {
        return (
            <Window>
                {this.state.preview ?
                    this.state.value && JSXFromJSONString(serializeToJSONString(this.state.value))
                    :
                    <Editor
                        defaultValue={this.state.value}
                        onChange={value => this.setState({
                            value,
                        })}
                        onSave={() => { /* What do? */ }}
                        onPreview={() => this.setState({
                            preview: true,
                        })}
                        onPublish={() => { /* What do? */ }}
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

export default connect(mapStateToProps)(Article);
