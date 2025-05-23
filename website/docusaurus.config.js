// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes: prismThemes } = require('prism-react-renderer');

module.exports = async () => {
  /** @type {import('@docusaurus/types').Config} */
  const config = {
    title: 'jest-allure2-reporter',
    tagline: 'The idiomatic Jest reporter for Allure Framework',
    favicon: 'img/favicon.ico',
    url: 'https://wix-incubator.github.io',
    baseUrl: '/jest-allure2-reporter/',
    trailingSlash: true,

    // GitHub pages deployment config.
    organizationName: 'wix-incubator',
    projectName: 'jest-allure2-reporter',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',

    i18n: {
      defaultLocale: 'en',
      locales: ['en'],
    },

    plugins: [
      'docusaurus-plugin-sass',
      require.resolve('@noomorph/docusaurus-search-local'),
    ],

    presets: [
      [
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            path: '../docs',
            routeBasePath: '/',
            sidebarPath: require.resolve('./sidebars.js'),
            editUrl:
              'https://github.com/wix-incubator/jest-allure2-reporter/tree/master/docs/',
            showLastUpdateAuthor: true,
            showLastUpdateTime: true,
            remarkPlugins: (await import('./src/remark-plugins/index.mjs')).default,
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
              sidebarId: 'apiSidebar',
              position: 'left',
              label: 'API',
            },
            {
              href: 'https://jest-allure2-reporter-demo.surge.sh',
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
                  to: '/api',
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
        docs: {
          sidebar: {
            hideable: true,
          },
        },
        prism: {
          theme: prismThemes.github,
          darkTheme: prismThemes.darcula,
        },
      }),
  };

  return config;
};
