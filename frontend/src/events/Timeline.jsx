// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Container as StandardContainer } from '../style-utils';

const Container = StandardContainer.extend`
    margin: 1rem, 0;
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
    }
    @media (min-width: 641px){
        left:30px;
    }
    @media (max-width: 640px){
        left:0;
    }
`;

const TimelineEventEntry = styled.div`
    position: relative;
    &:not(:last-of-type){
        margin-bottom: 30px;
    }
    &:before {
        content: "";
        width: 100%;
        height: 2px;
        background-color: ${props => props.theme.colours.primary};
        position: absolute;
        left: 0;
        z-index: -1;
    }
    @media (min-width: 641px){
        padding-left:80px;
        &:before {
            top: 50%;
            transform: translateY(-50%);
        }
    }
    @media (max-width: 640px){
        padding-top:70px;
        padding-left:20px;
        &:before {
            top:90px;
        }
    }
`;

const TimelineMonthEntry = styled.div`
    padding: .5rem, 1.5rem;
    color: white;
    background-color: ${props => props.theme.colours.primary};
    position: absolute;
    left: 0;
    top: 0;
`;

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

const Date = styled.div`
    min-width: 65px;
    position: absolute;
    left: 0;
    box-sizing: border-box;
    padding: .5rem 1.5rem;
    text-align: center;
    background-color: ${props => props.theme.colours.primary};
    color: white;
    @media (min-width: 641px){
        top:50%;
        margin-top: -27px;
    }
    @media (max-width: 640px){
        top:0;
    }
`;

const Day = styled.span`
    font-size: 2rem;
    font-weight: 700;
    display: block;
`;

const Month = styled.span`
    display: block;
    font-size: .8em;
    text-transform: uppercase;
`;

const Post = styled.div`
    margin-left: 10px;
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
            <TimelineGroup>
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
            </TimelineGroup>
            <TimelineGroup>
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
            </TimelineGroup>
        </TimeLineContainer>
    </Container>
);
