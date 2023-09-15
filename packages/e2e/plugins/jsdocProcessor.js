const parser = require('jsdoc-undocumented');

/** @type {import('jest-allure2-reporter').Plugin} */
const jsdocProcessorPlugin = (options) => {
  return {
    name: 'jest-allure2-jsdoc-processor',

    testEntry: (context) => {
      const metadata = context.metadata.entry;
      const { code } = metadata.get(['allure2']);
      const { body, description, descriptionHtml, owner, link } = parser.parse(code);
    },
  };
};

module.exports = {};
