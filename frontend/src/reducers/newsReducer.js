// @flow
import type { ArticleType } from '../types';

const UPDATE_ARTICLES = 'UPDATE_ARTICLES';
type UpdateArticlesAction = {
    type: 'UPDATE_ARTICLES',
    articles: ArticleType[],
}
export function updateArticles(articles: ArticleType[]): UpdateArticlesAction {
    return {
        type: UPDATE_ARTICLES,
        articles,
    };
}

const CLEAR_ARTICLES = 'CLEAR_ARTICLES';
type ClearArticlesAction = {
    type: 'CLEAR_ARTICLES',
}
export function clearArticles(): ClearArticlesAction {
    return {
        type: CLEAR_ARTICLES,
    };
}

type Action =
    | UpdateArticlesAction
    | ClearArticlesAction

type State = {
    [id: string]: ArticleType,
};

export function newsReducer(state: State = {}, action: Action) {
    switch (action.type) {
    case UPDATE_ARTICLES:
        return {
            ...state,
            ...action.articles.reduce((acc, article) => ({
                ...acc,
                [article.id]: article,
            }), {}),
        };
    case CLEAR_ARTICLES:
        return {};
    default:
        return state;
    }
}
