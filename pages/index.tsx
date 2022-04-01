import type { NextPage } from 'next';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import HomeContainer from '@/components/HomeContainer';
import { REPOSITORYS_QUERY_LIST_STRING } from '@/graphql/queries/repository';
import { GetRepositoryQuery } from '@/generated/graphql';

interface IProps {
  repoData: GetRepositoryQuery['repository'][];
}

const Home: NextPage<IProps> = ({ repoData }) => {
  return <HomeContainer repoData={repoData} />;
};

export async function getStaticProps() {
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    const token = process.env.GITHUB_TOKEN;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: REPOSITORYS_QUERY_LIST_STRING,
  });

  const dataList = Object.keys(data).map(key => {
    return data[key];
  });

  return {
    props: {
      repoData: dataList,
    },
  };
}

export default Home;
