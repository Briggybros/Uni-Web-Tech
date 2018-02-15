// @flow
import styled from 'styled-components';
import { css } from 'styled-components';

export const Container = styled.div`
    width:100%;
    max-width:1280px;
    margin: 0 auto;
    @media (min-width: 768px) {
        width:80%;
    }
`;