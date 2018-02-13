// @flow
import styled from 'styled-components';
import { css } from 'styled-components';

const sizes = {
    giant: 1170,
    desktop: 992,
    tablet: 768,
    phablet: 572,
    phone: 376
  }
  
export const media = Object.keys(sizes).reduce((accumulator, label) => {
    accumulator[label] = (...args: any[]) => css`
      @media (max-width: ${sizes[label]}px) {
        ${css(...args)}
      }
    `
    return accumulator
  }, {})

export const Container = styled.div`
    width:80%;
    ${media.phablet`width: 95%;`}
    max-width:1280px;
    margin: 0 auto;
`;