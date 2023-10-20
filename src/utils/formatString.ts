import * as util from 'node:util';

export function formatString(format: string, ...arguments_: unknown[]): string {
  return util.format(format, ...arguments_.slice(0, countPlaceholders(format)));
}

function countPlaceholders(format: string): number {
  let count = 0;
  let lastIndex = -1;

  while ((lastIndex = format.indexOf('%', lastIndex + 1)) !== -1) {
    if (isEscaped(format, lastIndex)) {
      lastIndex++;
    } else {
      count++;
    }
  }
  return count;
}

function isEscaped(format: string, index: number) {
  return format.length <= index || format[index + 1] === '%';
}
