/** @type {import('jest-allure2-reporter').Plugin} */
const remarkProcessorPlugin = (options) => {
  return {
    name: 'jest-allure2-remark-processor',

    beforeReport: (context) => {
      for (const metadata of context.metadata.all()) {
        const { description, descriptionHtml } = metadata.get(['allure2']);
        if (!descriptionHtml && description) {
          metadata.assign(['allure2'], {
            description: undefined,
            descriptionHtml: context.processMd(description),
          });
        }
      }
    },
  };
};

module.exports = {};
