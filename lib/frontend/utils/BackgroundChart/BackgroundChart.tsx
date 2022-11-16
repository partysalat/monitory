import React from 'react';
import PropTypes from 'prop-types';
import { ILineChartOptions } from 'chartist';
import ChartistGraph from 'react-chartist';
import { merge } from 'lodash';
import isFunction from 'lodash/isFunction';
import { ThemeConsumer } from '../Theme';
import AbsoluteContainer from './styled/AbsoluteContainer';
import { ValueFn } from '../../hoc';

export type BackgroundChartProps<C, V> = {
  current: C;
  viewValue: V;
  graph?: ValueFn<C, V, boolean>;
  graphOptions?: ILineChartOptions;
  graphColor?: ValueFn<C, V, string>;
};
const BackgroundChart = <C, V>(props: BackgroundChartProps<C, V>) => {
  const {
    current,
    viewValue,
    graph = false,
    graphOptions = {},
    graphColor = '',
  } = props;
  if (!graph || !current) {
    return null;
  }
  // TODO: Move this into HOC or another function
  const graphColorValue = isFunction(graphColor)
    ? graphColor(current, viewValue)
    : graphColor;

  const data = isFunction(graph) ? graph(current, viewValue) : current;
  const series = {
    series: [data],
  };
  const defaultOptions: ILineChartOptions = {
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
