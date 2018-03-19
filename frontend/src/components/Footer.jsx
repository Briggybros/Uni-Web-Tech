// @flow
import * as React from 'react';
import styled from 'styled-components';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import FacebookIcon from 'react-icons/lib/fa/facebook';

const Footer = styled.footer`
    border-top: 1px solid ${props => props.theme.colours.grey};
    bottom: 0;
    width: 100%;
    margin-top: auto;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
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
                    <Link href="/">
                        <FacebookIcon />
                    </Link>
                    <Link href="/">
                        <TwitterIcon />
                    </Link>
                </FooterText>
            </Column>
        </Container>
    </Footer>
);
