import React from 'react';
import styled from 'styled-components';
import Base from '../utils/Base';
import Content from '../utils/Content';
import { useReloadableSrc } from '../hoc/withReloadableSrc';
import { BaseProps } from '../utils/Base/Base';
import { WithShowWhenProps } from '../hoc/withShowWhen';

const StyledIframe = styled.iframe`
  width: ${(props) => 100 / props.zoom}%;
  height: ${(props: { zoom: number }) => 100 / props.zoom}%;
  position: absolute;
  border: 0;
  transform: scale(${(props) => props.zoom});
`;
export interface ReloadableIFrameProps
  extends Omit<
      BaseProps<string, string>,
      'current' | 'lastUpdated' | 'viewValue'
    >,
    Omit<
      WithShowWhenProps<string, string>,
      'current' | 'lastUpdated' | 'viewValue'
    > {
  src: string;
  zoom: number;
}

export default (props: ReloadableIFrameProps) => {
  const { src, lastUpdated } = useReloadableSrc(props.src);
  return (
    <Base {...props} viewValue={src} current={src} lastUpdated={lastUpdated}>
      <Content>
        <StyledIframe src={props.src} allowFullScreen zoom={props.zoom ?? 1} />
      </Content>
    </Base>
  );
};
