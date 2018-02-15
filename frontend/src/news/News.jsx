// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import PostSummary from './PostSummary';
import Authed from '../auth/Authed';
import { updatePosts } from './reducer';

type Props = {
    posts : Array<Object>,
    updatePosts : (Array<Object>, number) => void,
}

class News extends React.Component<Props> {
    componentWillMount() {
        fetch('/api/news')
            .then(response => response.json())
            .then(json => this.props.updatePosts(json.posts, json.start));
    }

    render() {
        return (
            <div>
                <Authed>
                    <button>
                        New Post
                    </button>
                </Authed>
                {this.props.posts.map(post => <PostSummary key={post.id} post={post} />)}
            </div>
        );
    }
}

export default connect(state => ({
    posts: state.news.posts,
}), {
    updatePosts,
})(News);
