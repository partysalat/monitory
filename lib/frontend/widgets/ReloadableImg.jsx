import styled from "styled-components";
import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { withReloadableSrc } from '../hoc';
import Base from '../utils/Base';
import Content from '../utils/Content';


const StyledImg = styled(Content)`
  height:100%;
  width:100%;
  background-image: url(${({ src }) => css`${src}`});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const IFrame = props => (
  <Base {...props}>
    <StyledImg src={props.src} />
  </Base>
);


export default compose(withReloadableSrc)(IFrame);

IFrame.propTypes = {
  title: PropTypes.string,
  showWhen: PropTypes.func,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  alert: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  cols: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ]),
  rows: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ]),
  src: PropTypes.string.isRequired,
};
