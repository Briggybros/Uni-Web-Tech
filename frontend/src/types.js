// @flow
export type EventType = {
    id: number,
    date: string,
    title: string,
    content: string
};
export type UserType = {
    firstName: string,
    lastName: string,
    email: string,
    verified: boolean,
}

export type ArticleType = {
    id: string,
    content: string,
    published: boolean,
    type: 'NEWS',
    timestamp: string,
    title: string,
    author: UserType,
}
