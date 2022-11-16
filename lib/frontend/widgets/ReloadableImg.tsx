import styled, { css } from 'styled-components';
import React from 'react';
import Base from '../utils/Base';
import Content from '../utils/Content';
import { ShowWhen, WithShowWhenProps } from '../hoc/withShowWhen';
import { BaseProps } from '../utils/Base/Base';
import { useReloadableSrc } from '../hoc/withReloadableSrc';

const StyledImg = styled(Content)`
  height: 100%;
  width: 100%;
  background-image: url(${({ src }: { src: string }) =>
    css`
      ${src}
    `});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
export interface ReloadableImageProps
  extends Omit<
      BaseProps<string, string>,
      'current' | 'lastUpdated' | 'viewValue'
    >,
    Omit<
      WithShowWhenProps<string, string>,
      'current' | 'lastUpdated' | 'viewValue'
    > {
  src: string;
}

export default (props: ReloadableImageProps) => {
  const { showWhen } = props;
  const { src, lastUpdated } = useReloadableSrc(props.src);
  return (
    <ShowWhen
      showWhen={showWhen}
      viewValue={src}
      current={src}
      lastUpdated={lastUpdated}
    >
      <Base {...props} viewValue={src} current={src} lastUpdated={lastUpdated}>
        <StyledImg src={src} />
      </Base>
    </ShowWhen>
  );
};
