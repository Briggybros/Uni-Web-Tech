// @flow
import type { EventType } from '../types';

const UPDATE_EVENTS = 'UPDATE_EVENTS';
type UpdateEventsAction = {
    type: 'UPDATE_EVENTS',
    events: EventType[],
}
export function updateEvents(events: EventType[]): UpdateEventsAction {
    return {
        type: UPDATE_EVENTS,
        events,
    };
}

const CLEAR_EVENTS = 'CLEAR_EVENTS';
type ClearEventsAction = {
    type: 'CLEAR_EVENTS',
}
export function clearEvents(): ClearEventsAction {
    return {
        type: CLEAR_EVENTS,
    };
}

type Action =
    | UpdateEventsAction
    | ClearEventsAction

type State = {
    [id: string]: EventType,
};

export function eventReducer(state: State = {}, action: Action) {
    switch (action.type) {
    case UPDATE_EVENTS:
        return {
            ...state,
            ...action.events.reduce((acc, event) => ({
                ...acc,
                [event.id]: event,
            }), {}),
        };
    case CLEAR_EVENTS:
        return {};
    default:
        return state;
    }
}
