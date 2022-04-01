import { FC } from 'react';
import Styled from 'styled-components';

import EmptyFullScreenModal from '@/components/EmptyFullScreenModal';
import SVG from '@/components/SVG';
import {
  flexBox,
  Direction,
  MainAlignment,
  CrossAlignment,
} from '@/utils/flexbox';

const HeaderRow = Styled.div`
    width: 100%;
`;

const CloseButton = Styled.div`
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  width: 50px;
  height: 50px;

  ${flexBox({
    direction: Direction.row,
    mainAlign: MainAlignment.center,
    crossAlign: CrossAlignment.center,
  })};

  &:hover {
    background: ${props => props.theme.colors.BLACK_004};
  }
`;

interface IProps {
  show: boolean;
  onClose: () => void;
}

const DetailModal: FC<IProps> = ({ show, onClose }) => {
  return (
    <EmptyFullScreenModal show={show}>
      <HeaderRow>
        <CloseButton onClick={onClose}>
          <SVG src='/close.svg' />
        </CloseButton>
      </HeaderRow>
    </EmptyFullScreenModal>
  );
};

export default DetailModal;
