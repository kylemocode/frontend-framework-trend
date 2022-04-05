// @ts-ignore
interface FrameworkItem {
  name: string;
  owner: string;
}

export const FRAMEWORK_LIST: FrameworkItem[] = [
  {
    name: 'react',
    owner: 'facebook',
  },
  {
    name: 'vue',
    owner: 'vuejs',
  },
  {
    name: 'angular',
    owner: 'angular',
  },
  {
    name: 'svelte',
    owner: 'sveltejs',
  },
  {
    name: 'stencil',
    owner: 'ionic-team',
  },
  {
    name: 'lit',
    owner: 'lit',
  },
  {
    name: 'alpine',
    owner: 'alpinejs',
  },
  {
    name: 'preact',
    owner: 'preactjs',
  },
  {
    name: 'stimulus',
    owner: 'hotwired',
  },
  {
    name: 'ember.js',
    owner: 'emberjs',
  },
  {
    name: 'jquery',
    owner: 'jquery',
  },
  {
    name: 'backbone',
    owner: 'jashkenas',
  },
  {
    name: 'foundation-sites',
    owner: 'foundation',
  },
  {
    name: 'Semantic-UI',
    owner: 'Semantic-Org',
  },
];

export const FRAMEWORKS_COLOR_MAPPER: Record<string, string> = {
  react: '#61dafb',
  vue: '#42b883',
  angular: '#ef0441',
  svelte: '#ff3e00',
  stencil: '#4c48ff',
  lit: '#325cff',
  alpine: '#77c1d2',
  preact: '#673ab8',
  stimulus: '#77e8b9',
  'ember.js': '#ce2d1f',
  jquery: '#0968ad',
  backbone: '#002a41',
  'foundation-sites': '#0f1e26',
  'Semantic-UI': '#35bcb2',
};
