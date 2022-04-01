import { FC, ReactNode, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import Portal from '@/components/Portal/Loadable';
import ZIndices from '@/constants/zIndices';
import delayUnmounting from '@/utils/delayUnmounting';

const DEFAULT_DELAY_DURATION = 200;

const FadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const FadeOut = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`;

const ModalWrapper = styled.div<{ $show: boolean; $duration: number }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: ${ZIndices.Modal};
  background: ${props => props.theme.colors.WHITE_100};
  animation: ${props => (props.$show ? FadeIn : FadeOut)}
    ${props => props.$duration}ms linear 1;
`;

interface Props {
  show: boolean;
  delay?: number;
  children: ReactNode;
}

const FullScreenModal: FC<Props> = ({
  show,
  delay = DEFAULT_DELAY_DURATION,
  children,
}) => {
  // Freeze body scroll
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  return (
    <Portal>
      <ModalWrapper $show={show} $duration={delay}>
        {children}
      </ModalWrapper>
    </Portal>
  );
};

export default delayUnmounting(FullScreenModal, DEFAULT_DELAY_DURATION);
