import * as T from './types';
import { NextRouter } from 'next/router';

export const origin = `https://live-countdown-picker.vercel.app`;

export const siteMetaGenerator = (router: NextRouter): T.IMeta => ({
  title: 'Frontend Framework Trend',
  description:
    'Watch the current states and popularities of frontend development frameworks.',
  ogType: T.MetaOgType.website,
  canonicalPath: router.asPath,
});
