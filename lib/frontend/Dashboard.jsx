import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ThemeConsumer } from './utils/Theme';

const Container = styled.div`
      margin: 0 10px; 
      display: grid;
      
      grid-auto-flow: row dense;
      grid-auto-rows: ${({ rowHeight }) => css`${`${rowHeight}`}`};
      
      grid-template-columns: ${({ cols }) => {
    const str = `repeat(${cols}, 1fr)`;
    return (css`${str}`);
  }};
`;
const Title = styled.h3`
  color: ${({ headlineColor }) => css`${headlineColor}`};
  background-color: ${({ headlineBackground }) => css`${headlineBackground}`};
  text-align:center;
  margin: 10px;
  padding: 10px 0;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.25);
`;

function Dashboard(props) {
  return (
    <ThemeConsumer>
      {theme => (
        <div>
          {props.title && (<Title {...theme}>{props.title}</Title>)}
          <Container {...props}>
            {props.children}
          </Container>
        </div>
      )
    }
    </ThemeConsumer>
  );
}
Dashboard.propTypes = {
  children: PropTypes.any,
  cols: PropTypes.number,
  rowHeight: PropTypes.string,
  title: PropTypes.string,
};
Dashboard.defaultProps = {
  children: '',
  cols: 4,
  rowHeight: '200px',

};
export default Dashboard;
