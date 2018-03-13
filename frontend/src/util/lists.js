// @flow
export function functionalSplice(
    array: Array<any>,
    start: number,
    deleteCount: number,
    ...replace: any
): { array: Array<any>, removed: Array<any> } {
    const clone = array.splice(0);
    const removed = clone.splice(start, deleteCount, ...replace);
    return {
        array: clone,
        removed,
    };
}

export function remove(array: Array<any>, item: any): Array<any> {
    const index = array.indexOf(item);
    if (index !== -1) return functionalSplice(array, index, 1).array;
    return array;
}

export function unique(array: Array<any>): Array<any> {
    return Array.from(new Set(array));
}
