const path = require('node:path');

const description = async ({ $, testRunMetadata, testFileMetadata, testCaseMetadata }) => {
  const metadata = testCaseMetadata ?? testFileMetadata ?? testRunMetadata;
  const text = metadata.description?.join('\n\n') ?? '';
  const steps = metadata.steps || [];
  const before = steps.filter(s => s.hookType?.startsWith('before'));
  const after = steps.filter(s => s.hookType?.startsWith('after'));
  const locations = [...before, metadata, ...after].map(m => m.sourceLocation);
  const codes = await Promise.all(locations.map(loc => $.extractSourceCode(loc, true)));
  const snippets = codes.filter(Boolean).map($.source2markdown);
  return [text, ...snippets].filter(t => t != null).join('\n\n');
};

const FENCE = '```';

/** @type {import('jest-allure2-reporter').ReporterOptions} */
module.exports = {
  helpers: {
    source2markdown: ({ globalConfig }) => {
      const relativize = (fileName) => path.relative(globalConfig.rootDir, fileName);

      /**
       * @param {import('jest-allure2-reporter').ExtractSourceCodeHelperResult | undefined} item
       */
      function template(item) {
        if (!item || !item.code) return '';
        const language = item.language || '';
        const title = item.fileName ? ` title="${relativize(item.fileName)}"` : '';
        // this snippet also includes file name to work with Markdown plugin
        return `${FENCE}${language}${title}\n${item.code}\n${FENCE}`;
      }

      return template;
    },
  },
  testFile: { description },
  testCase: { description },
};
