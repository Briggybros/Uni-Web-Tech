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

type Props = {
    events: EventType[],
    month: number
}

function findMonth(m: number) {
    const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[m];
}

export default (props: Props) => (
    <TimelineGroup>
        <TimelineMonthEntry>
            {findMonth(props.month)}
        </TimelineMonthEntry>
        {props.events.map(event => (<EventEntry
            key={event.id.toString()}
            event={event}
            monthString={findMonth(props.month)}
        />))}
    </TimelineGroup>
);
