// @flow
import type { ArticleType } from '../types';

const UPDATE_POSTS = 'UPDATE_POSTS';
type UpdatePostsAction = {
    type: 'UPDATE_POSTS',
    posts: ArticleType[],
}
export function updatePosts(posts: ArticleType[]): UpdatePostsAction {
    return {
        type: UPDATE_POSTS,
        posts,
    };
}

type Action =
    | UpdatePostsAction

type State = {
    [id: string]: ArticleType,
};

export function newsReducer(state: State = {}, action: Action) {
    switch (action.type) {
    case UPDATE_POSTS:
        return {
            ...state,
            ...action.posts.reduce((acc, post) => ({
                ...acc,
                [post.id]: post,
            }), {}),
        };
    default:
        return state;
    }
}
