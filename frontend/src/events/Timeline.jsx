// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Container as StandardContainer } from '../style-utils';
import { unique } from '../util/lists';


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

export default class Timeline extends React.Component<Props> {
    componentDidMount() {
        fetch('/api/events')
            .then(response => response.json())
            .then(json => this.props.updateEvents(json.posts, json.start));
    }

    render() {
        const groups = unique(events.reduce((acc, event) => {
            return new Date(parseInt(event.date, 10)).getMonth();
        }, []));
        return (
            <Container>
                <TimeLineContainer>
                    { this.props.children }
                </TimeLineContainer>
            </Container>
        );
    }
}
