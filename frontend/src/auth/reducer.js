// @flow
const SET_VALIDATED = 'SET_VALIDATED';
type SetValidatedAction = {
    type: 'SET_VALIDATED',
    validated: boolean,
}
export function setValidated(validated: boolean): SetValidatedAction {
    return {
        type: SET_VALIDATED,
        validated,
    };
}

const SET_USER = 'SET_USER';
type SetUserAction = {
    type: 'SET_USER',
    user: Object,
}
export function setUser(user: Object): SetUserAction {
    return {
        type: SET_USER,
        user,
    };
}

type Action =
    | SetValidatedAction
    | SetUserAction

type State = {
    validated: boolean,
    user: Object | null,
};

export function authReducer(state: State = {
    validated: false,
    user: null,
}, action: Action) {
    switch (action.type) {
    case SET_VALIDATED:
        return {
            ...state,
            validated: action.validated,
        };
    case SET_USER:
        return {
            ...state,
            user: action.user,
        };
    default:
        return state;
    }
}
