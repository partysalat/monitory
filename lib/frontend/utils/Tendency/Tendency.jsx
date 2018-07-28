import React, { Component } from 'react';
import { ThemeConsumer } from './../Theme';
import SubContainer from './styled/SubContainer';
import StyledArrow from './styled/StyledArrow';


class Tendency extends Component {
  constructor(props) {
    super(props);
    this.state = { rotation: 0, last: 0 };
  }
  componentWillReceiveProps() {
    //TODO: make user optionally provide calculation of rotation
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
          <SubContainer>
            <StyledArrow rotation={this.state.rotation} color={theme.fontColor} />
          </SubContainer>
      )}
      </ThemeConsumer>);
  }
}

export default Tendency;
