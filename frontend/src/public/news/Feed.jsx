// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import type { Article } from '../../types';

import PostSummary from './PostSummary';
import { updatePosts } from '../../reducers/newsReducer';

type Props = {
    posts: Article[],
    updatePosts: (Article[], number) => void,
}

const News = (props: Props) => (
    <div />
);

function mapStateToProps(state: Object): Object {
    return {
        // posts: state.news.posts,
    };
}

function mapDispatchToProps(): Object {
    return {
        // updatePosts,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
