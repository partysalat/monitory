import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { withAlert, withColor, withReloadableSrc } from '../hoc';
import Base from '../utils/Base';
import Content from '../styled/Content';


const StyledImg = Content.extend`
  height:100%;
  width:100%;
  background-image: url(${({ src }) => css`${src}`});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const IFrame = props => (
  <Base {...props} >
    <StyledImg src={props.src} />
  </Base>);


export default compose(
  withReloadableSrc,
)(IFrame);

IFrame.propTypes = {
  src: PropTypes.string.isRequired,
};
