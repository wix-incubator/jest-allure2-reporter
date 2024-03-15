/// <reference path="augs.d.ts" />

import type { Plugin, PluginConstructor } from 'jest-allure2-reporter';

export const remarkPlugin: PluginConstructor = async () => {
  const remark = await import('remark');
  const [
    remarkGfm,
    remarkRehype,
    rehypeSanitize,
    rehypeStringify,
    rehypeHighlight,
  ] = await Promise.all([
    import('remark-gfm'),
    import('remark-rehype'),
    import('rehype-sanitize'),
    import('rehype-stringify'),
    import('rehype-highlight'),
  ]);

  const processor = remark
    .remark()
    .use(remarkGfm.default)
    .use(remarkRehype.default)
    .use(rehypeSanitize.default)
    .use(rehypeHighlight.default)
    .use(rehypeStringify.default);

  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/remark',
    helpers($) {
      $.markdown2html = async (markdown: string) => {
        return processor.process(markdown).then((result) => result.toString());
      };

      $.sourceCode2Markdown = ({ code, language = '' } = {}) => {
        return code ? '```' + language + '\n' + code + '\n```' : '';
      };
    },
  };

  return plugin;
};
