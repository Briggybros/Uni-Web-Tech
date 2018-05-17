// @flow
export type UserType = {
    firstName: string,
    lastName: string,
    email: string,
    verified: boolean,
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
    date: string,
    title: string,
}
