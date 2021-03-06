// @flow
import * as React from 'react';
import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

import type { EventType } from '../../types';

import { JSXFromJSONString } from '../../dynamic/serializer';

const TimelineEventEntry = styled(UnstyledLink)`
    display: block;
    text-decoration: none;
    color: inherit;
    position: relative;
    margin-top: 3rem;
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
        padding-left:120px;
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

const DateBox = styled.div`
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
    padding: 1rem 2rem;
    background-color: ${props => props.theme.colours.white};
`;

const Content = styled(({ summary, ...rest }) => <div {...rest} />)`
    > *:not(:first-child) {
        display: ${props => (props.summary ? 'none' : 'block')};
    }
`;

const Title = styled.h2`
    margin-top: 0;
`;

type Props = {
    event: EventType,
};

function findMonth(m: number) {
    const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[m];
}

export default ({ event }: Props) => {
    const date : Date = new Date(parseInt(event.timestamp, 10));
    return (
        <TimelineEventEntry
            to={`/${event.id}`}
        >
            <DateBox>
                <Day>{date.getDate()}</Day>
                <Month>{findMonth(date.getMonth())}</Month>
            </DateBox>
            <Post>
                <Title>{event.title}</Title>
                <Content>{JSXFromJSONString(event.content)}</Content>
            </Post>
        </TimelineEventEntry>
    );
};
