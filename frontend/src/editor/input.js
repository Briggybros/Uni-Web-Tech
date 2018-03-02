// @flow
export default function onKeyDown(event : Object/* , change : Object */) {
    if (!event.ctrlKey) return false;

    // Decide what to do based on the key code...
    switch (event.key) {
    default: return false;
    }
}
