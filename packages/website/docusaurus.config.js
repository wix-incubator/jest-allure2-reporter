// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'jest-allure2-reporter',
  tagline: 'Idiomatic Jest reporter for Allure Framework',
  favicon: 'img/favicon.ico',
  url: 'https://wix-incubator.github.io',
  baseUrl: '/jest-allure2-reporter/',

  // GitHub pages deployment config.
  organizationName: 'wix-incubator',
  projectName: 'jest-allure2-reporter',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    'docusaurus-plugin-sass',
    require.resolve('@cmfcmf/docusaurus-search-local'),
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../../docs',
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
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
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
            sidebarId: 'apiSidebar',
            position: 'left',
            label: 'API',
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
                label: 'Features',
                to: '/docs/features',
              },
              {
                label: 'Demo',
                href: 'https://allure-framework.github.io/allure-demo/5/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/wix-incubator/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Wix Incubator. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
