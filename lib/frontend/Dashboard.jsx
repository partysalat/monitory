import React, { Component } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class Dashboard extends Component {
  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    );
  }
}

export default Dashboard;
