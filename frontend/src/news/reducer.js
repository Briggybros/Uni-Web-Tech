// @flow
import { safeSplice } from '../util/reducer';

const UPDATE_POSTS = 'UPDATE_POSTS';
type UpdatePostsAction = {
    type : 'UPDATE_POSTS',
    posts : Array<Object>,
    start: number;
}
export function updatePosts(
    posts : Array<Object>,
    start : number,
) : UpdatePostsAction {
    return {
        type: UPDATE_POSTS,
        posts,
        start,
    };
}

type Action =
    | UpdatePostsAction

type State = {
    posts : Array<Object>,
};

export function authReducer(state : State = {
    posts: [],
}, action : Action) {
    switch (action.type) {
    case UPDATE_POSTS:
        return {
            ...state,
            posts: safeSplice(
                action.posts,
                action.start,
                action.posts.length,
                ...action.posts,
            ).array,
        };
    default:
        return state;
    }
}
