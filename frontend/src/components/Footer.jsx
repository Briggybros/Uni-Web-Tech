import * as React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaFacebook } from 'react-icons/lib/fa';

const Footer = styled.footer`
    border-top: 1px solid ${props => props.theme.colours.grey};
    position: relative;
    bottom: 0;
    width: 100%;
    margin-top: 1rem;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const FooterText = styled.div`
    color: ${props => props.theme.colours.grey};
`;

const Link = styled.a`
    color: ${props => props.theme.colours.grey};
    &:hover {
        color: ${props => props.theme.colours.primary};
    }
`;

export default () => (
    <Footer>
        <Container>
            <Column>
                <FooterText>
                    <h2>Charities</h2>
                    images of charities
                </FooterText>
            </Column>
            <Column>
                <FooterText>
                    <h2>Sponsors</h2>
                    images of sponsors
                </FooterText>
            </Column>
            <Column>
                <FooterText>
                    <h2>Social</h2>
                    <p>Follow us on:</p>
                    <Link href="/"><FaFacebook /></Link> <Link href="/"><FaTwitter /></Link>
                </FooterText>
            </Column>
        </Container>
    </Footer>
);
