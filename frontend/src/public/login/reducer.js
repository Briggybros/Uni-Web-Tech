// @flow
type User = {
    firstName: string,
    lastName: string,
    email: string,
    verified: boolean,
};

const UPDATE_USER = 'UPDATE_USER';
type UpdateUserAction = {
    type: 'UPDATE_USER',
    user: User,
}
export function updateUser(user: User): UpdateUserAction {
    return {
        type: UPDATE_USER,
        user,
    };
}

type Action =
    | UpdateUserAction

type State = User | null

export function authReducer(state: State = null, action: Action) {
    switch (action.type) {
    case UPDATE_USER:
        return action.user;
    default:
        return state;
    }
}
