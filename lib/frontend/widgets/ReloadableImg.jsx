import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { withReloadableSrc } from '../hoc';
import Base from '../utils/Base';
import Content from '../utils/Content';


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


export default compose(withReloadableSrc)(IFrame);

IFrame.propTypes = {
  job: PropTypes.string.isRequired,
  title: PropTypes.string,
  showWhen: PropTypes.func,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  alert: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]).isRequired,
  cols: PropTypes.number,
  rows: PropTypes.number,
  value: PropTypes.func,

  src: PropTypes.string.isRequired,
};
