import type {
  SourceCodeExtractionContext,
  SourceCodePluginCustomizer,
} from 'jest-allure2-reporter';
import { extract, parseWithComments } from 'jest-docblock';

import { autoIndent, importCwd } from '../../../utils';

import { ASTHelper } from './ASTHelper';

export const typescript: SourceCodePluginCustomizer = async ({ $ }) => {
  const ts = await importCwd('typescript').catch(() => null);

  function detectLanguage(fileName: string | undefined) {
    if (fileName) {
      if (/\.m?jsx?$/.test(fileName)) return 'javascript';
      if (/\.m?tsx?$/.test(fileName)) return 'typescript';
    }

    return;
  }

  function canProcess(
    context: SourceCodeExtractionContext,
  ): context is Required<SourceCodeExtractionContext> {
    const { fileName, lineNumber, columnNumber } = context;
    return Boolean(ts && fileName && lineNumber && columnNumber && detectLanguage(fileName));
  }

  const hast = new ASTHelper(ts);
  return {
    name: 'typescript',

    detectLanguage({ fileName }) {
      return detectLanguage(fileName);
    },

    extractSourceCode(context) {
      return canProcess(context)
        ? $.getFileNavigator(context.fileName).then((navigator) => {
            if (!navigator) return;

            const ast =
              hast.getAST(context.fileName) ||
              hast.parseAST(context.fileName, navigator.getContent());
            const expression = hast.findNodeInAST(ast, context.lineNumber, context.columnNumber);
            return autoIndent(ast.text.slice(expression.getStart(), expression.getEnd()));
          })
        : undefined;
    },

    extractDocblock(context) {
      return canProcess(context)
        ? $.getFileNavigator(context.fileName).then((navigator) => {
            if (!navigator) return;

            const ast =
              hast.getAST(context.fileName) ||
              hast.parseAST(context.fileName, navigator.getContent());
            const expression = hast.findNodeInAST(ast, context.lineNumber, context.columnNumber);
            const fullStart = expression.getFullStart();
            const start = expression.getStart();
            const docblock = extract(ast.text.slice(fullStart, start).trim());
            return docblock ? parseWithComments(docblock) : undefined;
          })
        : undefined;
    },
  };
};