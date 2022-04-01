import { gql } from '@apollo/client';

import { FRAMEWORK_LIST } from '@/constants/frameworks';

export const REPOSITORY = gql`
  query getRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      nameWithOwner
      description
      url
      createdAt
      diskUsage
      forkCount
      homepageUrl
      openGraphImageUrl
      updatedAt
      stargazerCount
      licenseInfo {
        name
      }
      ...language
    }
  }

  fragment language on Repository {
    languages(last: 100, orderBy: { field: SIZE, direction: DESC }) {
      nodes {
        color
        id
        name
      }
      totalCount
      totalSize
    }
  }
`;

const REPOSITORYS_QUERY_LIST_RAW_STRING = FRAMEWORK_LIST.map(item => {
  return `${item.owner.split('-')[0]}: repository(owner: "${
    item.owner
  }", name: "${item.name}") {
      id
      name
      nameWithOwner
      description
      url
      createdAt
      diskUsage
      forkCount
      homepageUrl
      openGraphImageUrl
      updatedAt
      stargazerCount
      licenseInfo {
        name
      }
      ...language
    }`;
}).join('\n');

export const REPOSITORYS_QUERY_LIST_STRING = gql(
  'query GetRepositories {' +
    REPOSITORYS_QUERY_LIST_RAW_STRING +
    '}\n' +
    `fragment language on Repository {
  languages(last: 100, orderBy: { field: SIZE, direction: DESC }) {
    nodes {
      color
      id
      name
    }
    totalCount
    totalSize
  }
}`
);
