import React, { Component } from 'react';
import isFunction from 'lodash/isFunction';
import { ThemeConsumer } from '../Theme';
import SubContainer from './styled/SubContainer';
import StyledArrow from './styled/StyledArrow';


class Tendency extends Component {
  static defaultRotation(viewValue, last) {
    return viewValue - last > 0 ? '-45deg' : '45deg';
  }

  constructor(props) {
    super(props);
    this.state = {
      rotation: 0,
      last: 0, //eslint-disable-line
    };
  }

  static getDerivedStateFromProps({ withTendency, viewValue, current }, prevState) {
    if (!withTendency) {
      return prevState;
    }
    const { last, lastViewValue } = prevState;
    const isTendencyCalculationProvided = isFunction(withTendency);
    return {
      rotation: isTendencyCalculationProvided
        ? withTendency(current, viewValue, last, lastViewValue)
        : Tendency.defaultRotation(viewValue, lastViewValue),
      last: current,
      lastViewValue: viewValue,
    };
  }

  render() {
    const { withTendency } = this.props;
    if (!withTendency) {
      return null;
    }
    return (
      <ThemeConsumer>
        {(theme) => (
          <SubContainer>
            <StyledArrow rotation={this.state.rotation} color={theme.fontColor} />
          </SubContainer>
        )}
      </ThemeConsumer>
);
  }
}

export default Tendency;
