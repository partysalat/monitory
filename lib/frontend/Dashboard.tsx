import React, { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { ThemeConsumer } from './utils/Theme';

interface ContainerProps {
  cols: number;
  rowHeight: string;
}

const Container: React.FC<ContainerProps> = styled.div`
  margin: 0 10px;
  display: grid;

  grid-auto-flow: row dense;
  grid-auto-rows: ${({ rowHeight }) =>
    css`
      ${`${rowHeight}`}
    `};

  grid-template-columns: ${({ cols }) => {
    const str = `repeat(${cols}, 1fr)`;
    return css`
      ${str}
    `;
  }};
`;
interface TitleProps {
  headlineColor: string;
  headlineBackground: string;
}
const Title: React.FC<TitleProps> = styled.h3`
  color: ${({ headlineColor }) =>
    css`
      ${headlineColor}
    `};
  background-color: ${({ headlineBackground }) =>
    css`
      ${headlineBackground}
    `};
  text-align: center;
  margin: 10px;
  padding: 10px 0;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
`;

interface DashboardProps extends ContainerProps {
  title: string;
}

export const Dashboard: React.FC<PropsWithChildren<DashboardProps>> = ({
  rowHeight = '200px',
  cols = 4,
  title,
  children,
}) => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <div>
          {title && <Title {...theme}>{title}</Title>}
          <Container rowHeight={rowHeight} cols={cols}>
            {children}
          </Container>
        </div>
      )}
    </ThemeConsumer>
  );
};
export default Dashboard;
