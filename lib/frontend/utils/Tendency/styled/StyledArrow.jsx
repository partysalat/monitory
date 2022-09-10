import styled, { css } from 'styled-components';
import { ArrowRightCircle as Arrow } from 'styled-icons/feather';


export default styled(Arrow)`
  height: 1.5rem;
  transition-duration: 0.8s;
  transition-property: transform;
  transform : rotate(${({ rotation }) => css`${rotation}`});
  color: ${({ color }) => css`${color}`}
`;
