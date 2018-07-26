import React, { Component } from 'react';
import styled from 'styled-components';
import { ThemeConsumer } from './Theme';

const AbsoluteContainer = styled.div`
  flex: 0 0 auto;
  font-size: 0.7rem;  
`;


class Tendency extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    const { viewValue, withTendency } = this.props;
    if (!withTendency) {
      return null;
    }
    return (
      <ThemeConsumer>
        {theme => (
          <AbsoluteContainer>
            {viewValue}
          </AbsoluteContainer>
      )}
      </ThemeConsumer>
    );
  }
}

export default Tendency;
