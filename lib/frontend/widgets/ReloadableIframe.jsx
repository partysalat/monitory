import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Base from '../utils/Base';
import Content from '../utils/Content';
import withReloadableSrc from '../hoc/withReloadableSrc';


const StyledIframe = styled.iframe`
  width:${props => 100 / props.zoom}%;
  height:${props => 100 / props.zoom}%;
  position:absolute;
  border: 0;
  transform: scale(${props => props.zoom});
`;

const ReloadableIframe = props => (
  <Base {...props} >
    <Content>
      <StyledIframe src={props.src} border={0} allowfullscreen zoom={props.zoom} />
    </Content>
  </Base>);


export default compose(withReloadableSrc)(ReloadableIframe);
ReloadableIframe.defaultProps = {
  zoom: 1,
};
ReloadableIframe.propTypes = {
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
  cols: PropTypes.number,
  rows: PropTypes.number,
  zoom: PropTypes.number,

  src: PropTypes.string.isRequired,
};
