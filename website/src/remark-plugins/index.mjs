import npm2yarn from '@docusaurus/remark-plugin-npm2yarn';

import articleHeader from './article-header.mjs';
import customComponents from './custom-directives.mjs';

export default [
  articleHeader,
  customComponents,
  [npm2yarn, { sync: true }],
];
