// @flow
import * as React from 'react';
import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.colours.lightgrey};
    padding: 1rem;
    border-radius: 1rem;
    width: 17.5%;
    align-items: center;
`;

export const Title = styled.h1`
    margin: 0.5rem 0;
`;

const EntryLabel = styled.label`
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;
`;

export const SubmitButton = styled.input`
    background: ${props => props.theme.colours.primary};
    color: ${props => props.theme.colours.white};
    border: none;
    align-self: center;
    padding: 0.25rem 1rem;
    margin: 1rem 0;
    cursor: pointer;
`;

type EntryProps = {
    label: string,
    id: string,
    validation?: (element: HTMLInputElement, (error: string) => void) => void,
};

export const Entry = ({
    label, id, validation, ...rest
}: EntryProps) => (
    <EntryLabel
        htmlFor={id}
    >
        <span>{label}</span>
        <input
            id={id}
            key={id}
            ref={(input) => {
                if (input && validation) {
                    validation(input, (error: string) => {
                        if (input) {
                            input.setCustomValidity(error);
                        }
                    });
                }
            }}
            {...rest}
        />
    </EntryLabel>
);

Entry.defaultProps = {
    validation: (_, done) => done(''),
};
