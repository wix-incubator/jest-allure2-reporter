import type { LineNavigator } from '../utils';

export function extractJsdocAbove(
  navigator: LineNavigator,
  testLineIndex: number,
): string {
  if (!navigator.jump(testLineIndex)) return '';
  if (!navigator.prev()) return '';

  let currentLine = navigator.read();
  const docblockEndIndex = getCommentEnd(currentLine);
  if (docblockEndIndex === -1) return '';

  if (isSingleLineDocblock(currentLine, docblockEndIndex)) {
    return currentLine;
  }

  const buffer: string[] = [];
  buffer.unshift(currentLine.slice(0, Math.max(0, docblockEndIndex + 2)));

  while (navigator.prev()) {
    currentLine = navigator.read();
    buffer.unshift(currentLine);

    const start = getCommentStart(currentLine);
    if (isDocblockStart(currentLine, start)) {
      return buffer.join('\n');
    }

    if (start >= 0) {
      break;
    }
  }

  return '';
}

function isSingleLineDocblock(line: string, end: number): boolean {
  const start = getCommentStart(line);
  if (start < 0) return false;

  return start < end;
}

function getCommentStart(line: string): number {
  const start = line.indexOf('/*');
  if (start <= 0) return start;

  const whitespace = line.slice(0, start);
  return whitespace.trim() ? -1 : start;
}

function getCommentEnd(line: string): number {
  return line.lastIndexOf('*/');
}

function isDocblockStart(line: string, commentIndex: number): boolean {
  return commentIndex >= 0 && line[commentIndex + 2] === '*';
}
