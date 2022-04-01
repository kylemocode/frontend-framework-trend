import dynamic from 'next/dynamic';

const LazyComponent = dynamic(() => import('.'), {
  loading: () => null,
  ssr: false,
});

export default LazyComponent;
