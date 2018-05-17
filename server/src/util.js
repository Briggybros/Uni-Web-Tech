// @flow
export function PromiseReduce(promises: (() => Promise<*>)[]): Promise<any> {
    return promises.reduce(
        (chain, promise) => chain.then(() => Promise.resolve(promise())),
        Promise.resolve(),
    );
}

export const placeholder = '';
