import { FC } from 'react';
import Styled, { css } from 'styled-components';

import {
  flexBox,
  Direction,
  MainAlignment,
  CrossAlignment,
} from '@/utils/flexbox';
import { FRAMEWORKS_COLOR_MAPPER } from '@/constants/frameworks';

const StyledImg = Styled.img`
  width: 14px;
  height: 14px;
`;

const Content = Styled.span`
  margin-left: 5px;
  color: ${props => props.theme.colors.BLACK_065};
  font-size: 14px;
`;

const ContentWrapper = Styled.div`
  margin-top: 15px;
`;

const ContentRow = Styled.div`
  margin-bottom: 3px;
`;

const CardContainer = Styled.div`
  width: 200px;
  height: 150px;
  margin: 0 16px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  border-radius: 8px;
  transition: transform 0.3s;
  position: relative;
  cursor: pointer;
  background: white;
  padding: 15px 0 15px 15px;

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

const RepoName = Styled.div`
  font-size: 20px;
  color: ${props => props.theme.colors.TITLE_SECONDARY_BLUE};
`;

const OwnerName = Styled.div`
  color: ${props => props.theme.colors.BLACK_045};
  font-size: 14px;
`;

const SideBar = Styled.div<{ color: string }>`
  position: absolute;
  right: 0;
  top: 0;
  width: 15px;
  height: 100%;
  background-color: ${props => props.color};
  border-radius: 0 8px 8px 0;
`;

interface IProps {
  onCardClick: () => void;
  rank: number;
  repoName: string;
  ownerName: string;
  starCount: number;
  forkCount: number;
  createdAt: string;
}

const FrameworkCard: FC<IProps> = ({
  onCardClick,
  rank,
  repoName,
  ownerName,
  starCount,
  forkCount,
  createdAt,
}) => {
  return (
    <CardContainer onClick={onCardClick}>
      {rank <= 2 && <Medal rank={rank}>{rank + 1}</Medal>}
      <RepoName>{repoName}</RepoName>
      <OwnerName>Created By {ownerName}</OwnerName>
      <ContentWrapper>
        <ContentRow>
          <StyledImg src='/star.svg' />
          <Content>{starCount}</Content>
        </ContentRow>
        <ContentRow>
          <StyledImg src='/fork.svg' />
          <Content>{forkCount}</Content>
        </ContentRow>
        <ContentRow>
          <StyledImg src='/date.svg' />
          <Content>{createdAt.split('T')[0]}</Content>
        </ContentRow>
      </ContentWrapper>
      <SideBar color={FRAMEWORKS_COLOR_MAPPER[repoName] ?? 'white'} />
    </CardContainer>
  );
};

export default FrameworkCard;
