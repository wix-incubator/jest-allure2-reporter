import type { KeyedHelperCustomizer } from 'jest-allure2-reporter';

import { resolvePlugin } from './resolvePlugin';

export const markdown2html: KeyedHelperCustomizer<'markdown2html'> = async ({ config }) => {
  const remark = await import('remark');
  const plugins = await Promise.all(
    [
      'remark-gfm',
      'remark-rehype',
      ...config.markdown!.remarkPlugins,
      'rehype-sanitize',
      'rehype-highlight',
      ...config.markdown!.rehypePlugins,
      'rehype-stringify',
    ].map(resolvePlugin),
  );

  const processor = remark.remark();
  for (const [plugin, options] of plugins) {
    processor.use(plugin, options);
  }

  return async (markdown: string) => {
    return processor.process(markdown).then((result) => result.toString());
  };
};