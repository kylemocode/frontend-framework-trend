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
import { GetRepositoryQuery } from '@/generated/graphql';

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

const ContentRow = Styled.div`
  width: 100%;
  height: 100%;

  ${flexBox({
    direction: Direction.row,
    mainAlign: MainAlignment.center,
    crossAlign: CrossAlignment.center,
  })};
`;

const ContentWrapper = Styled.div`
  width: 800px;
  height: 500px;
  background: ${props => props.theme.colors.DETAIL_PRIMARY};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  padding: 50px;
`;

const RepoName = Styled.div`
  font-size: 32px;
  font-weight: 600;
  color: ${props => props.theme.colors.DETAIL_SECONDARY};
  text-transform: capitalize;
`;

interface IProps {
  show: boolean;
  onClose: () => void;
  data?: GetRepositoryQuery['repository'] | null;
}

const DetailModal: FC<IProps> = ({ show, onClose, data }) => {
  // console.log('data ', data);
  return (
    <EmptyFullScreenModal show={show}>
      <HeaderRow>
        <CloseButton onClick={onClose}>
          <SVG src='/close.svg' />
        </CloseButton>
      </HeaderRow>
      <ContentRow>
        <ContentWrapper>
          <RepoName>{data?.name}</RepoName>
        </ContentWrapper>
      </ContentRow>
      {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
    </EmptyFullScreenModal>
  );
};

export default DetailModal;
