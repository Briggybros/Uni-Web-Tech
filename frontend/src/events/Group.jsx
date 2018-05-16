// @flow
import * as React from 'react';
import styled from 'styled-components';
import EventEntry from './EventEntry';
import type { EventType } from '../types';

const TimelineGroup = styled.div`
    position: relative;
    &:not(:first-of-type){
        margin-top: 4rem;
    }
    @media (min-width: 641px){
        padding-top:55px;
    }
    @media (max-width: 640px){
        padding-top:40px;
    }
`;

const TimelineMonthEntry = styled.h2`
    padding: 0.5rem 1.5rem;
    color: white;
    background-color: ${props => props.theme.colours.primary};
    position: absolute;
    left: 0;
    top: 0;
`;

export default (month: number, events: EventType[]) => (
    <TimelineGroup>
        <TimelineMonthEntry>
            {month}
        </TimelineMonthEntry>
        {events.map(event => <EventEntry event={event} />)}
    </TimelineGroup>
);
