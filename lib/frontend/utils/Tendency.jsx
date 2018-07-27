import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { ArrowRightCircle as Arrow } from 'styled-icons/feather/ArrowRightCircle';
import { ThemeConsumer } from './Theme';

const AbsoluteContainer = styled.div`
  flex: 0 0 auto;
  font-size: 0.7rem;
  margin-top:5px;
`;

const StyledArrow = Arrow.extend`
  height: 1.5rem;
  transition-duration: 0.8s;
  transition-property: transform;
  transform : rotate(${({ rotation }) => css`${rotation}`});
  color: ${({ color }) => css`${color}`}
`;
class Tendency extends Component {
  constructor(props) {
    super(props);
    this.state = { rotation: 0, last: 0 };
  }
  componentWillReceiveProps() {
    this.setState(({ last }, { viewValue }) => ({
      rotation: viewValue - last > 0 ? '-45deg' : '45deg',
      last: viewValue,
    }));
  }
  render() {
    const { withTendency } = this.props;
    if (!withTendency) {
      return null;
    }
    return (
      <ThemeConsumer>
        {theme => (
          <AbsoluteContainer>
            <StyledArrow rotation={this.state.rotation} color={theme.fontColor} />
          </AbsoluteContainer>
      )}
      </ThemeConsumer>);
  }
}

export default Tendency;
