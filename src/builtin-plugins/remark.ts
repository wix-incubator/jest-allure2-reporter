/// <reference path="augs.d.ts" />

import type { Plugin, PluginConstructor } from 'jest-allure2-reporter';

export const remarkPlugin: PluginConstructor = () => {
  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/remark',
    async globalContext(context) {
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

      context.processMarkdown = async (markdown: string) => {
        return processor.process(markdown).then((result) => result.toString());
      };
    },
  };

  return plugin;
};
