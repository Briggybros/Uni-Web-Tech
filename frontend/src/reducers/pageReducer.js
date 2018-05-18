// @flow
import type { PageType } from '../types';

const UPDATE_PAGES = 'UPDATE_PAGES';
type UpdatePagesAction = {
    type: 'UPDATE_PAGES',
    pages: PageType[],
}
export function updatePages(pages: PageType[]): UpdatePagesAction {
    return {
        type: UPDATE_PAGES,
        pages,
    };
}

const CLEAR_PAGES = 'CLEAR_PAGES';
type ClearPagesAction = {
    type: 'CLEAR_PAGES',
}
export function clearPages(): ClearPagesAction {
    return {
        type: CLEAR_PAGES,
    };
}

type Action =
    | UpdatePagesAction
    | ClearPagesAction

type State = {
    [url: string]: PageType,
};

export function pageReducer(state: State = {}, action: Action) {
    switch (action.type) {
    case UPDATE_PAGES:
        return {
            ...state,
            ...action.pages.reduce((acc, page) => ({
                ...acc,
                [page.id]: page,
            }), {}),
        };
    case CLEAR_PAGES:
        return {};
    default:
        return state;
    }
}
