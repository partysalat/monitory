import styled, { css, keyframes } from 'styled-components';
import { flipInX as normalAnimation, pulse as alertAnimation } from 'react-animations';


const normalKeyframe = keyframes`${normalAnimation}`;
const alertKeyframe = keyframes`${alertAnimation}`;


export default styled.div`
  animation: ${({ alert }) => (alert ? css`1s ${alertKeyframe} infinite` : css`1s ${normalKeyframe}`)};
  grid-column: span ${({ cols }) => css`${cols}`};
  grid-row: span ${({ rows }) => css`${rows}`};
  
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content:space-between;
  
  margin:1px;
  font-size: 1.5rem;
  
`;

