// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import PostSummary from './PostSummary';
import { updatePosts } from './reducer';

type Props = {
    posts: Array<Object>,
    updatePosts: (Array<Object>, number) => void,
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
