// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import type { EventType } from '../../types';
import { updateEvents } from '../../reducers/eventReducer';

import { Container as StandardContainer } from '../../style-utils';
import { unique } from '../../util/lists';
import Group from './Group';


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
    events: EventType[],
    updateEvents: Function
}

class Timeline extends React.Component<Props> {
    componentDidMount() {
        fetch('/api/event')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Library Error');
            })
            .then((body) => {
                if (body.response.isError) {
                    alert(`${body.response.code}: ${body.response.message}`);
                }
                this.props.updateEvents(body.events);
            })
            .catch(console.error);
    }

    render() {
        const upcomingEvents =
            this.props.events
                .filter(event => event.published)
                .filter(event => parseInt(event.timestamp, 10) > Date.now());

        const groups : number[] = unique(upcomingEvents.reduce((acc, event) => {
            const d = new Date(parseInt(event.timestamp, 10));
            return [
                ...acc,
                d.getMonth(),
            ];
        }, []));
        return (
            <Container>
                <TimeLineContainer>
                    {groups.map((group) => {
                        const getMonthsEvents = (g: number) => upcomingEvents.filter(event =>
                            new Date(parseInt(event.timestamp, 10)).getMonth() === g);
                        return (
                            <Group
                                key={group}
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

export default connect(state => ({
    events: Object.values(state.events),
}), {
    updateEvents,
})(Timeline);
