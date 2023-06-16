/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'getting-started',
    {
      type: 'category',
      label: 'Features',
      link: {
        type: 'generated-index',
        title: 'Features',
        description: 'Learn about the features of jest-allure2-reporter',
        slug: '/features',
        keywords: ['features'],
      },
      items: [
        { type: 'autogenerated', dirName: 'features' },
      ],
    },
    {
      type: 'category',
      label: 'Annotations',
      link: {
        type: 'generated-index',
        title: 'Annotations',
        description: 'Learn about the annotations of jest-allure2-reporter',
        slug: '/anotations',
        keywords: ['annotations'],
      },
      items: [
        { type: 'autogenerated', dirName: 'annotations' },
      ],
    },
    {type: 'autogenerated', dirName: 'contributing'},
  ],
  apiSidebar: [
    {type: 'autogenerated', dirName: 'api'}
  ],
};

module.exports = sidebars;
