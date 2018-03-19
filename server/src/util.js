// @flow
export function PromiseReduce(promises: Array<Promise<any>>): Promise<any> {
    return promises.reduce(
        (chain, promise) => chain.then(() => Promise.resolve(promise)),
        Promise.resolve(),
    );
}

export const placeholder = '';
