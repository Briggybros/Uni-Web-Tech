// @flow
import type { UserType } from '../types';

const UPDATE_USER = 'UPDATE_USER';
type UpdateUserAction = {
    type: 'UPDATE_USER',
    user: UserType,
}
export function updateUser(user: UserType): UpdateUserAction {
    return {
        type: UPDATE_USER,
        user,
    };
}

type Action =
    | UpdateUserAction

type State = UserType | null

export function userReducer(state: State = null, action: Action) {
    switch (action.type) {
    case UPDATE_USER:
        return action.user;
    default:
        return state;
    }
}
