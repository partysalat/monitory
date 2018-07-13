import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Dashboard(props) {
  return (
    <Container>
      {props.children}
    </Container>
  );
}
Dashboard.propTypes = {
  children: PropTypes.any,
};
Dashboard.defaultProps = {
  children: '',

};
export default Dashboard;
