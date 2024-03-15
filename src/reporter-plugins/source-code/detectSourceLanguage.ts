import path from 'node:path';

export function detectSourceLanguage(fileName: string): string {
  switch (path.extname(fileName)) {
    case '.js':
    case '.jsx':
    case '.cjs':
    case '.mjs': {
      return 'javascript';
    }
    case '.ts':
    case '.tsx':
    case '.cts':
    case '.mts': {
      return 'typescript';
    }
    default: {
      return '';
    }
  }
}
