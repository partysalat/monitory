import React, { PropsWithChildren } from 'react';
import format from 'date-fns/format';
import { StyledCard, Title, UpdatedAt } from './styled';
import { ValueFn } from '../../hoc';
import { usePlaySound } from '../../hoc/withAudio';
import { useDynamicRowsAndCols } from '../../hoc/withDynamicRowsAndCols';
import { useColor } from '../../hoc/withColor';
import { useAlert } from '../../hoc/withAlert';

function formatDate(date: Date) {
  if (!date) {
    return '';
  }
  return format(date, 'HH:mm');
}

export type BaseProps = {
  current: any;
  viewValue: string | number;
  lastUpdated: Date;
  title: string;
  cols: ValueFn<string>;
  rows: ValueFn<string>;
  alert: ValueFn<boolean>;
  color: ValueFn<string>;
  playAudioWhen: ValueFn<string>;
};
export default function Base({
  current,
  viewValue,
  color,
  alert: isAlertFn = false,
  rows: rowsFn = '1',
  cols: colsFn = '1',
  playAudioWhen,
  title,
  lastUpdated,
  children,
}: PropsWithChildren<BaseProps>) {
  const { backgroundColor, fontColorLight, fontColor } = useColor(
    current,
    viewValue,
    color
  );
  const isAlert = useAlert(current, viewValue, isAlertFn);
  const { cols, rows } = useDynamicRowsAndCols(
    current,
    viewValue,
    rowsFn,
    colsFn
  );
  usePlaySound(current, viewValue, playAudioWhen);
  return (
    <StyledCard
      style={{ backgroundColor, color: fontColor }}
      alert={isAlert}
      rows={rows}
      cols={cols}
    >
      <Title style={{ color: fontColorLight }}>{title}</Title>
      {children}
      {lastUpdated && (
        <UpdatedAt style={{ color: fontColorLight }}>
          Last updated at: {formatDate(lastUpdated)}
        </UpdatedAt>
      )}
    </StyledCard>
  );
}
