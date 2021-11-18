/* eslint-disable react/jsx-props-no-spreading */

import { readableColor } from 'polished';
import React, { ReactNode, useRef, RefObject } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import { Portal } from 'components/Portal';
import { Color } from 'libs/utils/color';
import { colors } from 'theme';

const Container = styled.div<{ fillColor: Color }>`
  display: flex;
  
  background: ${({ fillColor }) => String(fillColor)};
  color: ${({ fillColor }) => readableColor(String(fillColor))};
  border-radius: 6px;
`;

const Content = styled.div`
  position: relative;
`;

const ArrowWrapper = styled.div`
  width: 10px;
  height: 10px;

  [data-popper-placement^='top']> & { bottom: -4px; }
  [data-popper-placement^='right']> & { left: -4px; }
  [data-popper-placement^='bottom']> & { top: -4px; }
  [data-popper-placement^='left']> & { right: -4px; }
`;

const Arrow = styled.div<{ fillColor: Color }>`
  width: 100%;
  height: 100%;

  background: ${({ fillColor }) => String(fillColor)};
  transform: rotate(45deg);
`;

interface Props {
  readonly children: ReactNode;
  readonly targetRef: RefObject<HTMLElement>;
  readonly color?: Color;
}

export default function Tooltip({
  children,
  targetRef,
  color = colors.gray900,
}: Props) {
  const arrowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { styles, attributes: popperAttributes } = usePopper(targetRef.current, containerRef.current, {
    placement: 'top',
    modifiers: [{
      name: 'arrow',
      options: {
        element: arrowRef.current,
        padding: 8,
      },
    }],
  });

  return (
    <Portal>
      <Container
        ref={containerRef}
        fillColor={color}
        style={styles.popper}
        {...popperAttributes.popper}
      >
        <ArrowWrapper
          ref={arrowRef}
          style={styles.arrow}
        >
          <Arrow fillColor={color} />
        </ArrowWrapper>
        <Content>
          {children}
        </Content>
      </Container>
    </Portal>
  );
}
