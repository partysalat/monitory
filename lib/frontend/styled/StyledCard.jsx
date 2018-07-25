import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { flipInX, pulse } from 'react-animations';


const bounceAnimation = keyframes`${flipInX}`;
const pulseAnimation = keyframes`${pulse}`;


export default styled.div`
  animation: ${({ alert }) => (alert ? css`1s ${pulseAnimation} infinite` : css`1s ${bounceAnimation}`)};
  grid-column: span ${({ cols }) => css`${cols}`};
  grid-row: span ${({ rows }) => css`${rows}`};
  
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content:space-between;
  
  margin:1px;
  font-size: 1.5rem;
  
`;

