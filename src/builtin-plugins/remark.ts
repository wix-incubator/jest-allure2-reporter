/// <reference path="augs.d.ts" />

import type { Plugin, PluginConstructor } from 'jest-allure2-reporter';

export const remarkPlugin: PluginConstructor = () => {
  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/remark',
    async globalContext(context) {
      const remark = await import('remark');
      const [remarkRehype, rehypeSanitize, rehypeStringify, rehypeHighlight] =
        await Promise.all([
          import('remark-rehype'),
          import('rehype-sanitize'),
          import('rehype-stringify'),
          import('rehype-highlight'),
        ]);

      const processor = remark
        .remark()
        .use(remarkRehype.default)
        .use(rehypeSanitize.default)
        .use(rehypeHighlight.default)
        .use(rehypeStringify.default);

      context.processMarkdown = (markdown: string) => {
        const result = processor.processSync(markdown);
        return String(result);
      };
    },
  };

  return plugin;
};
