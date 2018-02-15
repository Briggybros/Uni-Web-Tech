// @flow
export function safeSplice(
    array : Array<any>,
    start : number,
    deleteCount : number,
    ...replace : any
) : { array : Array<any>, removed : Array<any> } {
    const clone = array.splice(0);
    const removed = clone.splice(start, deleteCount, ...replace);
    return {
        array,
        removed,
    };
}

export const placeholder = 'placeholder';
