const descriptionHtml = async ({ $, value, result }) => {
  const description = await result.description;
  const html = await value;
  const markdown = description ? await $.markdown2html(description) : '';
  return [html, markdown].filter(Boolean).join('\n\n');
};

/** @type {import('jest-allure2-reporter').ReporterOptions} */
module.exports = {
  helpers: {
    markdown2html: async () => {
      const remark = await import('remark');
      const remark_gfm = await import('remark-gfm');
      const remark_rehype = await import('remark-rehype');
      const rehype_highlight = await import('rehype-highlight');
      const rehype_stringify = await import('rehype-stringify');

      const processor = remark.remark()
        .use(remark_gfm.default)
        .use(remark_rehype.default)
        .use(rehype_highlight.default)
        .use(rehype_stringify.default);

      return async (markdown) => {
        const vfile = await processor.process(markdown);
        return vfile.toString();
      };
    },
  },
  testRun: { descriptionHtml },
  testFile: { descriptionHtml },
  testCase: { descriptionHtml },
};
