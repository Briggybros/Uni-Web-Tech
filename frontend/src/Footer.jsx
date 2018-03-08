import * as React from 'react';
import styled from 'styled-components';
import { Link as UnstyledLink } from 'react-router-dom';
import { FaTwitter, FaFacebook } from 'react-icons/lib/fa';
import { column, FlexContainer } from './style-utils';

const Column = column(3);

const FooterContainer = styled.div`
`;

const FooterText = styled.div`
    color: ${props => props.theme.colours.grey};
`;

const Link = styled(UnstyledLink)`
    color: ${props => props.theme.colours.grey};
    &:hover {
        color: ${props => props.theme.colours.primary};
    }
`;

const Footer = () => (
    <FooterContainer>
        <hr />
        <FlexContainer>
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
                    <Link to="/"><FaFacebook /></Link> <Link to="/"><FaTwitter /></Link>
                </FooterText>
            </Column>
        </FlexContainer>
    </FooterContainer>
);

export default Footer;
