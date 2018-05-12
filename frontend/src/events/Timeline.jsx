// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Container } from '../style-utils';

const TimeLineContainer = styled.div`
    &:before {
        content: "";
        width: 4px;
        height: 100%;
        background-color: ${props => props.theme.colours.primary};
        position: absolute;
        top: 0;
    }
    position: relative;
    padding: 1rem, 1rem;
`;

const TimelineEventEntry = styled.div`

`;

const TimelineMonthEntry = styled.div`
    padding: .5rem, 1.5rem;
    color: white;
    background-color: ${props => props.theme.colours.primary};
    position: absolute;
    left: 0;
    top: 0;
`;

const Date = styled.div``;

const Day = styled.span``;

const Month = styled.span``;

const Post = styled.div`
    border-left: 3px solid ${props => props.theme.colours.primary};
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 1px 2px 0 rgba(0, 0, 0, .24);
    padding: 1.5rem 2rem;
    background-color: #c1c1c1;
`;

const Content = styled.div``;

const Title = styled.h2``;

export default () => (
    <Container>
        <TimeLineContainer>
            <TimelineMonthEntry>
                June 2018
            </TimelineMonthEntry>
            <TimelineEventEntry>
                <Date><Day>10</Day><Month>June</Month></Date>
                <Post>
                    <Title>Charity Event</Title>
                    <Content>Event thing</Content>
                </Post>
            </TimelineEventEntry>
            <TimelineMonthEntry>
                June 2018
            </TimelineMonthEntry>
            <TimelineEventEntry>
                <Date><Day>10</Day><Month>June</Month></Date>
                <Post>
                    <Title>Charity Event</Title>
                    <Content>Event thing</Content>
                </Post>
            </TimelineEventEntry>
        </TimeLineContainer>
    </Container>
);
