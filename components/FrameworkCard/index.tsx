import { FC } from 'react';
import Styled, { css } from 'styled-components';

import {
  flexBox,
  Direction,
  MainAlignment,
  CrossAlignment,
} from '@/utils/flexbox';

const CardContainer = Styled.div`
  width: 200px;
  height: 150px;
  margin: 0 16px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  border-radius: 8px;
  transition: transform 0.3s;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const Medal = Styled.div<{ rank: Number }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  left: -10px;
  color: ${props => props.theme.colors.WHITE_100};
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  font-weight: 500;

  ${flexBox({
    direction: Direction.row,
    mainAlign: MainAlignment.center,
    crossAlign: CrossAlignment.center,
  })};
  

  ${props =>
    props.rank === 0 &&
    css`
      background: ${props.theme.colors.MEDAL_FIRST};
    `}

  ${props =>
    props.rank === 1 &&
    css`
      background: ${props.theme.colors.MEDAL_SECOND};
    `}

  ${props =>
    props.rank === 2 &&
    css`
      background: ${props.theme.colors.MEDAL_THIRD};
    `}
`;

interface IProps {
  onCardClick: () => void;
  rank: number;
}

const FrameworkCard: FC<IProps> = ({ onCardClick, rank }) => {
  return (
    <CardContainer onClick={onCardClick}>
      {rank <= 2 && <Medal rank={rank}>{rank + 1}</Medal>}
    </CardContainer>
  );
};

export default FrameworkCard;
