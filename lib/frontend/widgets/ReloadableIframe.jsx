import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Base from '../utils/Base';
import Content from '../styled/Content';
import withReloadableSrc from '../hoc/withReloadableSrc';


const StyledIframe = styled.iframe`
  width:100%;
  height:100%;
  border: 0;
`;

const ReloadableIframe = props => (
  <Base {...props} >
    <Content>
      <StyledIframe src={props.src} border={0} allowfullscreen width={100} height={100} />
    </Content>
  </Base>);


export default compose(withReloadableSrc)(ReloadableIframe);

ReloadableIframe.propTypes = {
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
