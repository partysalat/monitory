import * as React from 'react';
import { compose } from 'redux';
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

interface ReloadableImgProps{
    src:string
}
const IFrame = (props:ReloadableImgProps) => (
  <Base {...props} >
    <StyledImg src={props.src} />
  </Base>);


export default compose(withReloadableSrc)(IFrame);

// IFrame.propTypes = {
//   title: PropTypes.string,
//   showWhen: PropTypes.func,
//   color: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.func,
//   ]),
//   alert: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.bool,
//   ]),
//   cols: PropTypes.number,
//   rows: PropTypes.number,
//
//   src: PropTypes.string.isRequired,
// };
