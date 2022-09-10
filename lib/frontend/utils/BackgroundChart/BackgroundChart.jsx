import React from 'react';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';
import { merge } from 'lodash';
import isFunction from 'lodash/isFunction';
import { ThemeConsumer } from '../Theme';
import AbsoluteContainer from './styled/AbsoluteContainer';

const BackgroundChart = (props) => {
  const { current, viewValue, graph, graphOptions, graphColor } = props;
  if (!graph || !current) {
    return null;
  }
  // TODO: Move this into HOC or another function
  const graphColorValue = isFunction(graphColor)
    ? graphColor(current, viewValue)
    : graphColor;

  const data = isFunction(graph) ? graph(current) : current;
  const series = {
    series: [data],
  };
  const defaultOptions = {
    fullWidth: true,
    showArea: true,
    showPoint: false,
    lineSmooth: false,
    low: 0,
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
    <ThemeConsumer>
      {(theme) => (
        <AbsoluteContainer graphColor={graphColorValue || theme.graphColor}>
          <ChartistGraph
            data={series}
            type="Line"
            options={merge(defaultOptions, graphOptions)}
            style={{ height: '100%' }}
          />
        </AbsoluteContainer>
      )}
    </ThemeConsumer>
  );
};

export default BackgroundChart;

BackgroundChart.propTypes = {
  graph: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  graphOptions: PropTypes.object,
  graphColor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  current: PropTypes.any,
};
BackgroundChart.defaultProps = {
  graphOptions: {},
};
