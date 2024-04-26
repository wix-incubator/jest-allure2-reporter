import type {
  SourceCodeExtractionContext,
  SourceCodePluginCustomizer,
} from 'jest-allure2-reporter';
import { extract, parseWithComments } from 'jest-docblock';

import { autoIndent, importCwd } from '../../../utils';
import { detectJS } from '../common';

import { ASTHelper } from './ASTHelper';

export const typescript: SourceCodePluginCustomizer = async ({ $ }) => {
  const ts = await importCwd('typescript').catch(() => null);

  function canProcess(
    context: SourceCodeExtractionContext,
  ): context is Required<SourceCodeExtractionContext> {
    const { fileName, lineNumber, columnNumber } = context;
    return Boolean(ts && fileName && lineNumber && columnNumber && detectJS(fileName));
  }

  const hast = new ASTHelper(ts);
  return {
    name: 'typescript',

    extractSourceCode(context) {
      return canProcess(context)
        ? $.getFileNavigator(context.fileName).then((navigator) => {
            if (!navigator) return;
            if (!navigator.jump(context.lineNumber)) return;
            const lineNumber = context.lineNumber;
            const columnNumber = Math.min(context.columnNumber, navigator.readLine().length);

            const ast =
              hast.getAST(context.fileName) ||
              hast.parseAST(context.fileName, navigator.getContent());
            const expression = hast.findNodeInAST(ast, lineNumber, columnNumber);
            const code = autoIndent(ast.text.slice(expression.getStart(), expression.getEnd()));
            navigator.jumpToPosition(expression.getStart());
            const [startLine] = navigator.getPosition();
            navigator.jumpToPosition(expression.getEnd());
            const [endLine] = navigator.getPosition();

            return {
              code,
              language: 'typescript',
              fileName: context.fileName,
              startLine,
              endLine,
            };
          })
        : undefined;
    },

    extractDocblock(context) {
      return canProcess(context)
        ? $.getFileNavigator(context.fileName).then((navigator) => {
            if (!navigator) return;
            if (!navigator.jump(context.lineNumber)) return;
            const lineNumber = context.lineNumber;
            const columnNumber = Math.min(context.columnNumber, navigator.readLine().length);

            const ast =
              hast.getAST(context.fileName) ||
              hast.parseAST(context.fileName, navigator.getContent());
            const expression = hast.findNodeInAST(ast, lineNumber, columnNumber);
            const fullStart = expression.getFullStart();
            const start = expression.getStart();
            const docblock = extract(ast.text.slice(fullStart, start).trim());
            return docblock ? parseWithComments(docblock) : undefined;
          })
        : undefined;
    },
  };
};
