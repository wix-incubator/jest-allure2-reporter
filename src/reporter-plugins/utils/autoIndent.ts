export function autoIndent(text: string) {
  const [first, ...rest] = text.split('\n');
  const indent = detectIndent(rest);
  if (indent > 0) {
    return [first, ...rest.map((line) => line.slice(indent))].join('\n');
  }

  return text;
}

function detectIndent(lines: string[]) {
  return lines.reduce((indent, line) => {
    const size = line.length - line.trimStart().length;
    return size < indent ? size : indent;
  }, Number.POSITIVE_INFINITY);
}
