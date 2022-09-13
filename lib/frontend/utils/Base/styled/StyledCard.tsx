import styled, { css, keyframes } from 'styled-components';
import {
  flipInX as normalAnimation,
  pulse as alertAnimation,
} from 'react-animations';

const normalKeyframe = keyframes`${normalAnimation}`;
const alertKeyframe = keyframes`${alertAnimation}`;
type StyledCardProps = {
  cols: string;
  rows: string;
  alert: boolean;
};
export default styled.div`
  animation: ${({ alert }: StyledCardProps) =>
    alert ? css`1s ${alertKeyframe} infinite` : css`1s ${normalKeyframe}`};
  grid-column: span
    ${({ cols }: StyledCardProps) =>
      css`
        ${cols}
      `};
  grid-row: span
    ${({ rows }: StyledCardProps) =>
      css`
        ${rows}
      `};

  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;

  margin: 1px;
  font-size: 1.5rem;
`;
