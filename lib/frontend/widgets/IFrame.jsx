import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withAlert, withColor } from '../hoc';
import Base from '../utils/Base';
import Content from '../styled/Content';


const StyledIframe = styled.iframe`
  width:100%;
  height:100%;
`;

//<StyledIframe src={props.src} border={0} allowfullscreen />
const IFrame = props => (
  <Base {...props} >
    <Content>
      <StyledIframe src={props.src} border={0} allowfullscreen />
    </Content>
  </Base>);


export default compose(
  withColor,
  withAlert,
)(IFrame);

IFrame.propTypes = {
  src: PropTypes.string.isRequired,
};
