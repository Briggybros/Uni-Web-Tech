// @flow
export type UserType = {
    firstName: string,
    lastName: string,
    email: string,
    verified: boolean,
}

export type ArticleType = {
    id: string,
    content: string,
    type: 'NEWS',
    timestamp: string,
    title: string,
    author: UserType,
}
