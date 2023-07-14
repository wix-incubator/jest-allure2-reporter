// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Jest Allure2 Reporter',
  tagline: 'Idiomatic Jest reporter for Allure Framework',
  favicon: 'img/favicon.ico',
  url: 'https://wix-incubator.github.io',
  baseUrl: '/jest-allure2-reporter/',
  trailingSlash: true,

  // GitHub pages deployment config.
  organizationName: 'wix-incubator',
  projectName: 'jest-allure2-reporter',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    '@noomorph/docusaurus-plugin-sass',
    require.resolve('@noomorph/docusaurus-search-local'),
    // [
    //   'docusaurus-plugin-typedoc',
    //   {
    //     out: 'reference',
    //     docsRoot: '../../docs',
    //     entryPoints: [
    //       '../library/src/index.ts',
    //       '../library/src/environment-node.ts',
    //       '../library/src/annotations.ts',
    //     ],
    //     tsconfig: '../library/tsconfig.json',
    //   },
    // ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../../docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social.jpg',
      navbar: {
        title: 'jest-allure2-reporter',
        logo: {
          alt: 'Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'docSidebar',
            sidebarId: 'referenceSidebar',
            position: 'left',
            label: 'Reference',
          },
          {
            href: 'https://allure-framework.github.io/allure-demo/5/',
            label: 'Demo',
            position: 'left',
          },
          {
            href: 'https://github.com/wix-incubator/jest-allure2-reporter',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs',
              },
              {
                label: 'Config',
                to: '/docs/config',
              },
              {
                label: 'API',
                to: '/docs/api',
              },
              {
                label: 'Reference',
                to: '/docs/reference',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Demo',
                href: 'https://allure-framework.github.io/allure-demo/5/',
              },
              {
                label: 'Acknowledgements',
                to: '/about/acknowledgements',
              },
              {
                label: 'Contributing',
                to: '/about/contributing',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/wix-incubator/jest-allure2-reporter',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Wix Incubator. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.darcula,
      },
    }),
};

module.exports = config;
