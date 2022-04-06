import { FC, useState, useCallback, useMemo, ChangeEvent } from 'react';
import Styled, { css } from 'styled-components';

import { GetRepositoryQuery } from '@/generated/graphql';
import FrameworkCard from '@/components/FrameworkCard';
import SelectionInput from '@/components/SelectionInput';
import {
  flexBox,
  Direction,
  MainAlignment,
  CrossAlignment,
} from '@/utils/flexbox';
import DetailModal from '@/components/DetailModal';
import { SORT_BY_LIST } from '@/constants/sortBy';
import { SortBy } from '@/constants/enums';

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
    margin: 20px 0;
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
  margin-top: 30px;
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
  const [sortedBy, setSortedBy] = useState(SortBy.STAR_COUNT);
  const [currentItemData, setCurrentItemData] = useState<
    GetRepositoryQuery['repository'] | null | undefined
  >(null);

  const displayData = useMemo(() => {
    switch (sortedBy) {
      case SortBy.STAR_COUNT:
        return repoData.sort((a, b) => {
          if (b?.stargazerCount && a?.stargazerCount) {
            return b?.stargazerCount - a?.stargazerCount;
          }

          return -1;
        });
      case SortBy.FORK_COUNT:
        return repoData.sort((a, b) => {
          if (b?.forkCount && a?.forkCount) {
            return b?.forkCount - a?.forkCount;
          }

          return -1;
        });
      case SortBy.CREATED_TIME:
        return repoData.sort((a, b) => {
          if (b?.createdAt && a?.createdAt) {
            return (
              new Date(b?.createdAt).valueOf() -
              new Date(a?.createdAt).valueOf()
            );
          }

          return -1;
        });
      default:
        return repoData;
    }
  }, [repoData, sortedBy]);

  const handleModalOpen = useCallback(
    (repoName: string) => {
      setShowModal(true);

      const selectedData = repoData.find(item => item?.name === repoName);
      setCurrentItemData(selectedData);
    },
    [repoData]
  );

  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSortedBy(e.target.value as unknown as SortBy);
  }, []);

  return (
    <>
      <HomePageWrapper>
        <Title>
          <StyledSpan>Frontend Framework </StyledSpan>Trend
        </Title>
        <SelectionInput
          title='Sorted By'
          options={SORT_BY_LIST}
          onSelect={handleSelect}
        />
        <CardWrapper>
          {displayData &&
            displayData.map((item, idx) => {
              return (
                <FrameworkCard
                  key={item?.id}
                  onCardClick={() => handleModalOpen(item?.name ?? '')}
                  rank={idx}
                  repoName={item?.name ?? ''}
                  ownerName={item?.nameWithOwner.split('/')[0] ?? ''}
                  starCount={item?.stargazerCount ?? 0}
                  forkCount={item?.forkCount ?? 0}
                  createdAt={item?.createdAt ?? ''}
                />
              );
            })}
        </CardWrapper>
      </HomePageWrapper>
      <DetailModal
        show={showModal}
        onClose={handleModalClose}
        data={currentItemData}
      />
    </>
  );
};

export default HomeContainer;
