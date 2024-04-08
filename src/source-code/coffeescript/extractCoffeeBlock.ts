import type { FileNavigator } from 'jest-allure2-reporter';

export function extractCoffeeBlock(
  coffee: any,
  navigator: FileNavigator,
  testLineIndex: number,
): string {
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
