// @flow
export type UserType = {
    firstName: string,
    lastName: string,
    email: string,
    verified: boolean,
    roles: string[],
}

export type ArticleType = {
    id: number,
    content: string,
    published: boolean,
    type: 'NEWS',
    timestamp: string,
    title: string,
    author: UserType,
}

export type EventType = {
    id: number,
    content: string,
    published: boolean,
    type: 'EVENT',
    timestamp: string,
    title: string,
}

export type PageType = {
    id: number,
    content: string,
    published: boolean,
    type: 'PAGE',
    url: string,
    inNav: boolean,
    title: string,
}
