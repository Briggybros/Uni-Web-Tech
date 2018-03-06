import * as React from 'react';
import styled from 'styled-components';
import { column, Container } from './style-utils';

const Column = column(3);

const FooterContainer = styled.div`
    background-color: ${props => props.theme.colours.grey};
`;

const Footer = () => (
    <FooterContainer>
        <Container>
            <Column>
                Charities
            </Column>
            <Column>
                Sponsors
            </Column>
            <Column>
                Social shit
            </Column>
        </Container>
    </FooterContainer>
);

export default Footer;
