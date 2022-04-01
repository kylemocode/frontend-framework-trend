import { FC, useState, useCallback } from 'react';
import Styled, { css } from 'styled-components';

import { GetRepositoryQuery } from '@/generated/graphql';
import FrameworkCard from '@/components/FrameworkCard';
import {
  flexBox,
  Direction,
  MainAlignment,
  CrossAlignment,
} from '@/utils/flexbox';
import DetailModal from '@/components/DetailModal';

const HomePageWrapper = Styled.div`
    min-height: 100vh;
    width: 100vw;
    padding: 4rem 0;
    flex: 1;
    ${flexBox({
      direction: Direction.column,
      mainAlign: MainAlignment.flexStart,
      crossAlign: CrossAlignment.center,
    })};

`;

const Title = Styled.div`
    margin-top: 20px;
    line-height: 1.15;
    font-size: 3.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors.TITLE_SECONDARY_BLUE};

    ${props =>
      props.theme.tablet`
        font-size: 2.5rem; 
    `}
`;

const StyledSpan = Styled.span`
    ${props => css`
      color: ${props.theme.colors.TITLE_BLUE};
    `}
`;

const CardWrapper = Styled.div`
  max-width: 100%;
  padding: 50px;
  margin-top: 80px;
  ${flexBox({
    direction: Direction.row,
    mainAlign: MainAlignment.center,
    crossAlign: CrossAlignment.center,
  })};
  flex-wrap: wrap;
  row-gap: 20px;
`;

interface IProps {
  repoData: GetRepositoryQuery['repository'][];
}

const HomeContainer: FC<IProps> = ({ repoData }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <HomePageWrapper>
        <Title>
          <StyledSpan>Frontend Framework </StyledSpan>Trend
        </Title>
        <CardWrapper>
          {repoData &&
            repoData.map((item, idx) => {
              return (
                <FrameworkCard
                  key={item?.id}
                  onCardClick={handleModalOpen}
                  rank={idx}
                />
              );
            })}
        </CardWrapper>
      </HomePageWrapper>
      <DetailModal show={showModal} onClose={handleModalClose} />
    </>
  );
};

export default HomeContainer;
