import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';


const AbsoluteContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index:0;
  opacity: 0.5;
  .ct-series-a .ct-area{
    fill: blue;
  }
  .ct-series-a .ct-line {
    stroke: blue;
  }
  
`;


const BackgroundChart = (props) => {
  const {
    current,
    last,
    graph,
  } = props;
  if (!graph) {
    return null;
  }
  const data = graph && graph({ current, last });
  const series = {
    series: [data],

  };
  const options = {
    fullWidth: true,
    showArea: true,
    showPoint: false,
    lineSmooth: false,
    axisX: {
      offset: 0,
      showLabel: false,
      showGrid: false,
    },
    axisY: {
      offset: 0,
      showLabel: false,
      showGrid: false,
    },
  };
  return (
    <AbsoluteContainer>
      <ChartistGraph data={series} type="Line" options={options} style={{ height: '100%' }} />
    </AbsoluteContainer>);
};


export default BackgroundChart;

BackgroundChart.propTypes = {
  viewValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
