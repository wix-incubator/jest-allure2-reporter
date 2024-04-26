import type { SourceCodePluginCustomizer } from 'jest-allure2-reporter';

import { merge } from '../../../utils';

export type FallbackSourceCodePluginOptions = {
  languagePatterns?: Record<string, Array<string | RegExp>>;
};

function compilePatterns(record: Record<string, Array<string | RegExp>> | undefined) {
  if (!record) return [];

  return Object.entries(record).map(([language, patterns]): [string, RegExp[]] => [
    language,
    patterns.map((pattern) => (typeof pattern === 'string' ? new RegExp(pattern) : pattern)),
  ]);
}

export const file: SourceCodePluginCustomizer = ({ $, value = {} }) => {
  const options = merge(
    {
      languagePatterns: {
        javascript: [/\.[cm]?jsx?$/],
        typescript: [/\.[cm]?tsx?$/],
      },
    },
    value as FallbackSourceCodePluginOptions,
  );

  const patterns = compilePatterns(options.languagePatterns);

  function detectLanguage(fileName: string) {
    return patterns.find(([, patterns]) => patterns.some((pattern) => pattern.test(fileName)))?.[0];
  }

  return {
    name: 'file',

    extractSourceCode: ({ fileName, lineNumber }) => {
      if (fileName && !lineNumber) {
        return $.getFileNavigator(fileName).then((navigator) => {
          const language = detectLanguage(fileName);
          if (navigator) {
            return {
              code: navigator.getContent(),
              language,
              fileName,
            };
          }

          if (language) {
            return { language };
          }

          return;
        });
      }

      return;
    },
  };
};
