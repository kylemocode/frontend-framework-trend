import axios from 'axios';
import { FC, useState, useEffect } from 'react';
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
import LoadingCircle from '@/components/LoadingCircle';

const HeaderRow = Styled.div`
  width: 100%;
`;

const CircleContainer = Styled.div`
  width: 100%;
  height: 100%;

  ${flexBox({
    direction: Direction.row,
    mainAlign: MainAlignment.center,
    crossAlign: CrossAlignment.center,
  })};
`;

const DataWrapper = Styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const CircleWrapper = Styled.div`
  width: 50px;
  height: 50px;
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

  ${props => props.theme.tablet`
    width: 100%;
    height: 100%;
  `}
`;

const RepoName = Styled.div`
  font-size: 32px;
  font-weight: 600;
  color: ${props => props.theme.colors.WHITE_100};
  text-transform: capitalize;
`;

const Description = Styled.div`
  margin-top: 10px;
  margin-bottom: 40px;
  font-size: 20px;
  color: ${props => props.theme.colors.WHITE_085};
`;

const DataRow = Styled.div`
  margin-bottom: 3px;
  ${flexBox({
    direction: Direction.column,
    mainAlign: MainAlignment.center,
    crossAlign: CrossAlignment.center,
  })};
`;

const ItemTitle = Styled.div`
  background: ${props => props.theme.colors.DETAIL_SECONDARY};
  color: ${props => props.theme.colors.WHITE_100};
  font-weight: 500;
  padding: 5px;
  width: auto;
  white-space:nowrap;
  border-radius: 5px;
  display: inline-block;
`;

const Content = Styled.div`
  margin-left: 5px;
  color: ${props => props.theme.colors.WHITE_085};
  font-size: 18px;
  margin-top: 5px;
`;

const LanguageTitle = Styled.div`
  font-size: 20px;
  color: ${props => props.theme.colors.WHITE_085};
  margin-top: 20px;
`;

const TagsWrapper = Styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const Tag = Styled.div<{ bg: string }>`
  background: ${props => props.bg};
  color: ${props => props.theme.colors.WHITE_100};
  font-weight: 500;
  padding: 10px;
  width: auto;
  white-space:nowrap;
  border-radius: 12px;
  display: inline-block;
`;

const StyledImage = Styled.img`
  width: 20px;
  height: 20px;
  margin-left: 15px;
`;

const ImageTitleWrapper = Styled.div`
  ${flexBox({
    direction: Direction.row,
    crossAlign: CrossAlignment.center,
  })};
`;

interface IProps {
  show: boolean;
  onClose: () => void;
  data?: GetRepositoryQuery['repository'] | null;
}

const DetailModal: FC<IProps> = ({ show, onClose, data }) => {
  const [npmData, setNpmData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) {
      setNpmData(null);
      return;
    }
    const fetchData = async () => {
      if (!data?.name) return;
      setLoading(true);
      const repoName =
        data.name === 'ember.js' ? 'ember' : data.name.toLowerCase();
      const repoData = await axios.get(`/api/npm-data/${repoName}`);
      setNpmData(repoData.data.data);
      setLoading(false);
    };

    fetchData();
  }, [data?.name, show]);

  return (
    <EmptyFullScreenModal show={show}>
      <HeaderRow>
        <CloseButton onClick={onClose}>
          <SVG src='/close.svg' />
        </CloseButton>
      </HeaderRow>
      <ContentRow>
        <ContentWrapper>
          <ImageTitleWrapper>
            <RepoName>{data?.name}</RepoName>
            <StyledImage src={data?.openGraphImageUrl} />
          </ImageTitleWrapper>
          {loading || !data || !npmData ? (
            <CircleContainer>
              <CircleWrapper>
                <LoadingCircle />
              </CircleWrapper>
            </CircleContainer>
          ) : (
            <div>
              <Description>{data.description}</Description>
              <DataWrapper>
                <DataRow>
                  <ItemTitle>Star Count</ItemTitle>
                  <Content>{data.stargazerCount}</Content>
                </DataRow>
                <DataRow>
                  <ItemTitle>Fork Count</ItemTitle>
                  <Content>{data.forkCount}</Content>
                </DataRow>
                <DataRow>
                  <ItemTitle>Created Time</ItemTitle>
                  <Content>{data.createdAt.split('T')[0]}</Content>
                </DataRow>
                <DataRow>
                  <ItemTitle>Homepage Link</ItemTitle>
                  <Content>
                    <a href={data.homepageUrl} target='_blank' rel='noreferrer'>
                      Link
                    </a>
                  </Content>
                </DataRow>
                <DataRow>
                  <ItemTitle>License</ItemTitle>
                  <Content>{npmData.license ?? ''}</Content>
                </DataRow>
                <DataRow>
                  <ItemTitle>Weekly Download</ItemTitle>
                  <Content>{npmData.download ?? ''}</Content>
                </DataRow>
                <DataRow>
                  <ItemTitle>Disk Usage</ItemTitle>
                  <Content>
                    {data.diskUsage
                      ? `${Math.round(data.diskUsage / 1024)} KB`
                      : ''}
                  </Content>
                </DataRow>
              </DataWrapper>
              <LanguageTitle>
                Languages used to build this project:
              </LanguageTitle>
              <TagsWrapper>
                {data &&
                  data.languages?.nodes?.map(lang => {
                    return (
                      <Tag key={lang?.id} bg={lang?.color ?? ''}>
                        {lang?.name}
                      </Tag>
                    );
                  })}
              </TagsWrapper>
            </div>
          )}
        </ContentWrapper>
      </ContentRow>
    </EmptyFullScreenModal>
  );
};

export default DetailModal;
