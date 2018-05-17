// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Container as StandardContainer } from '../style-utils';
import { unique } from '../util/lists';
import Group from './Group';
import type { EventType } from '../types';


const Container = StandardContainer.extend`
    margin-top: 1rem;
`;

const TimeLineContainer = styled.div`
    position: relative;
    padding: 3rem, 0rem;
    &:before {
        content: "";
        width: 4px;
        height: 100%;
        background-color: ${props => props.theme.colours.primary};
        position: absolute;
        top: 0;
        @media (min-width: 641px){
            left:30px;
        }
        @media (max-width: 640px){
            left:0;
        }
    }
`;

type Props = {
    // events: EventType[],
    // updateEvents: (EventType[])
}

const events: Array<any> = [{
    id: 1, date: new Date().getTime().toString(), title: 'event', content: 'content',
}, {
    id: 2, date: new Date().getTime().toString(), title: 'event', content: 'content',
}, {
    id: 3, date: new Date(2018, 11, 24, 10, 33, 30, 0).getTime().toString(), title: 'event', content: 'content',
}];

export default class Timeline extends React.Component<Props> {
    componentDidMount() {
        // fetch('/api/events')
        //     .then(response => response.json())
        //     .then(json => this.props.updateEvents(json.events));
    }
    render() {
        const eventsList : EventType[] = events;
        const groups : number[] = unique(eventsList.reduce((acc, event) => {
            const d = new Date(parseInt(event.date, 10));
            return [
                ...acc,
                d.getMonth(),
            ];
        }, []));
        return (
            <Container>
                <TimeLineContainer>
                    {groups.map((group) => {
                        function getMonthsEvents(g: number): EventType[] {
                            return eventsList.filter(event =>
                                new Date(parseInt(event.date, 10)).getMonth() === g);
                        }
                        return (
                            <Group
                                key={group.toString()}
                                month={group}
                                events={getMonthsEvents(group)}
                            />
                        );
                    })}
                </TimeLineContainer>
            </Container>
        );
    }
}
