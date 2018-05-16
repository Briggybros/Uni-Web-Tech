// @flow
import * as React from 'react';
import styled from 'styled-components';
import { unique } from '../util/lists';

const TimelineEventEntry = styled.div`
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
    padding: 1rem 2rem;
    background-color: whitdatee;
`;

const Content = styled.div``;

const Title = styled.h2`
    margin-top: 0;
`;

type Props = {
    date: Date,
    title: String,
    content: String
};

export default ({ date, title, content }: Props) => {
    const day = date.getDate();
    const month = date.getMonth();
    return (
        <TimelineEventEntry>
            <Date><Day>${day}</Day><Month>${month}</Month></Date>
            <Post>
                <Title>${title}</Title>
                <Content>${content}</Content>
            </Post>
        </TimelineEventEntry>
    );
};
