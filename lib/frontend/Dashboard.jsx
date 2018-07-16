import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
      display: grid;
      
      grid-auto-flow: row dense;
      grid-auto-rows: ${({ rowHeight }) => css`${`${rowHeight}`}`};
      
      grid-template-columns: ${({ cols }) => {
    const str = `repeat(${cols}, 1fr)`;
    return (css`${str}`);
  }};
`;

function Dashboard(props) {
  return (
    <Container {...props}>
      {props.children}
    </Container>
  );
}
Dashboard.propTypes = {
  children: PropTypes.any,
  cols: PropTypes.number,
  rowHeight: PropTypes.string,
};
Dashboard.defaultProps = {
  children: '',
  cols: 4,
  rowHeight: '200px',

};
export default Dashboard;
