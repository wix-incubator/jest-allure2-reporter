/** @type {import('jest-allure2-reporter').SourceCodePluginCustomizer} */
module.exports = async ({ $ }) => {
  const coffee = await import('coffeescript').catch(() => null);
  const { extract, parseWithComments } = await import('jest-docblock');

  return {
    name: 'coffee',

    detectLanguage({ fileName }) {
      return detectCoffee(fileName);
    },

    extractDocblock({ fileName, lineNumber }) {
      if (coffee && fileName && detectCoffee(fileName)) {
        return $.getFileNavigator(fileName).then((navigator) => {
          if (!navigator) return;

          let docblock = '';
          if (lineNumber) {
            docblock = extractCoffeeBlock(coffee, navigator, lineNumber);
          } else {
            const sourceCode = coffee.compile(navigator.getContent(), { bare: true });
            docblock = extract(sourceCode);
          }

          docblock = docblock.trim();
          return docblock ? parseWithComments(docblock.trim()) : undefined;
        });
      }

      return;
    },
  };
};

/**
 * This function detects if the given file is a CoffeeScript file.
 * @param {string | undefined} fileName - The file name.
 */
function detectCoffee(fileName) {
  return fileName && /\.coffee$/.test(fileName) ? 'coffeescript' : undefined;
}

/**
 * This function extracts a CoffeeScript block from the given code.
 *
 * @param {any} coffee - The CoffeeScript compiler instance.
 * @param {import('jest-allure2-reporter').FileNavigator} navigator - The file navigator.
 * @param {number} testLineIndex - The index of the test line.
 * @returns {string} - The compiled CoffeeScript code block.
 */
function extractCoffeeBlock(coffee, navigator, testLineIndex) {
  if (testLineIndex > navigator.getLineCount()) return '';

  let currentLineIndex = testLineIndex - 2;
  if (currentLineIndex < 0) return '';

  if (!navigator.jump(currentLineIndex + 1)) return '';
  let currentLine = navigator.readLine();

  const docblockEndIndex = currentLine.indexOf('###');
  if (docblockEndIndex === -1) return '';

  const docblockSignature = currentLine.slice(0, docblockEndIndex + 1);
  if (docblockSignature.trimStart() !== '#') return '';

  const commentBoundary = currentLine.slice(0, docblockEndIndex + 3);
  const docblockStart = commentBoundary + '*';
  const buffer = [];

  buffer.unshift(commentBoundary.trimStart());
  while (currentLineIndex >= 0) {
    if (!navigator.moveUp()) break;
    currentLineIndex--;
    currentLine = navigator.readLine();

    if (!currentLine.startsWith(docblockSignature)) {
      break;
    }

    buffer.unshift(currentLine.trimStart());

    if (currentLine.startsWith(docblockStart)) {
      return coffee.compile(buffer.join('\n'), { bare: true });
    }

    if (currentLine.startsWith(commentBoundary)) {
      break;
    }
  }

  return '';
}
