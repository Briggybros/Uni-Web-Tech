// @flow
export type UserType = {
    firstName: string,
    lastName: string,
    email: string,
    verified: boolean,
    roles: string[],
}

type DynamicType = {
    id: number,
    content: string,
    published: boolean,
}

export type ArticleType = DynamicType & {
    type: 'NEWS',
    timestamp: string,
    title: string,
    author: UserType,
}

export type EventType = DynamicType & {
    type: 'EVENT',
    timestamp: string,
    title: string,
}

export type PageType = DynamicType & {
    type: 'PAGE',
    url: string,
    inNav: boolean,
    title: string,
}
