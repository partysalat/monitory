import styled from 'styled-components';

const getGraphColorFromProps = ({ graphColor }: { graphColor: string }) =>
  graphColor;
export default styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 0;
  .ct-series-a .ct-area {
    fill: ${getGraphColorFromProps};
  }
  .ct-series-a .ct-line {
    stroke: ${getGraphColorFromProps};
  }
`;
