import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { flipInX, pulse } from 'react-animations';


const bounceAnimation = keyframes`${flipInX}`;
const pulseAnimation = keyframes`${pulse}`;


export default styled.div`
  animation: ${({ alert }) => (alert ? css`1s ${pulseAnimation} infinite` : css`1s ${bounceAnimation}`)};
  grid-column: span ${({ cols }) => css`${cols}`};
  grid-row: span ${({ rows }) => css`${rows}`};
  overflow: hidden;
  flex-direction: column;
  padding: 2%;
  flex: 1 16%;
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.25);
  font-size: 2rem;
`;

