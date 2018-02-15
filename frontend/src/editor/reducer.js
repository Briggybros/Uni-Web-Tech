// @flow
const UPDATE_CONTENT = 'UPDATE_CONTENT';
type UpdateContentAction = {
    type : 'UPDATE_CONTENT',
    content : string,
}
export function updateContent(content : string) : UpdateContentAction {
    return {
        type: UPDATE_CONTENT,
        content,
    };
}

type Action =
    | UpdateContentAction

type State = {
    content : string,
};

export function editorReducer(state : State = {
    content: '',
}, action : Action) {
    switch (action.type) {
    case UPDATE_CONTENT:
        return {
            ...state,
            content: action.content,
        };
    default:
        return state;
    }
}
