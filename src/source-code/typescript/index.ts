import type { SourceCodePluginCustomizer } from 'jest-allure2-reporter';
import { extract, parseWithComments } from 'jest-docblock';

import { autoIndent, importDefault } from '../../utils';

import { ASTHelper } from './ASTHelper';

export const typescript: SourceCodePluginCustomizer = async ({ $ }) => {
  const ts = await importDefault('typescript').catch(() => null);
  if (!ts) {
    return {};
  }

  const hast = new ASTHelper(ts);
  return {
    extractSourceCode({ fileName, lineNumber, columnNumber }) {
      if (fileName && lineNumber && columnNumber) {
        return $.getFileNavigator(fileName).then((navigator) => {
          const ast = hast.getAST(fileName) || hast.parseAST(fileName, navigator.getContent());
          const expression = hast.findNodeInAST(ast, lineNumber, columnNumber);
          return autoIndent(ast.text.slice(expression.getStart(), expression.getEnd()));
        });
      }

      return;
    },
    extractDocblock({ fileName, lineNumber, columnNumber }) {
      if (fileName && lineNumber && columnNumber) {
        return $.getFileNavigator(fileName).then((navigator) => {
          const ast = hast.getAST(fileName) || hast.parseAST(fileName, navigator.getContent());
          const expression = hast.findNodeInAST(ast, lineNumber, columnNumber);
          const fullStart = expression.getFullStart();
          const start = expression.getStart();
          const docblock = extract(ast.text.slice(fullStart, start));
          return parseWithComments(docblock);
        });
      }

      return;
    },
  };
};
