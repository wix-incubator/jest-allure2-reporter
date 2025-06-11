import { describe, expect, it } from '@jest/globals';

import { getFullExtension } from './getFullExtension';

describe('getFullExtension', () => {
  it('should return the full extension for a file with multiple dots', () => {
    const filePath = 'example.viewhierarchy.zip';
    const extension = getFullExtension(filePath);
    expect(extension).toBe('.viewhierarchy.zip');
  });

  it('should return the extension for a file with a single dot', () => {
    const filePath = 'example.txt';
    const extension = getFullExtension(filePath);
    expect(extension).toBe('.txt');
  });

  it('should return the extension for a file starting with a dot', () => {
    const filePath = '.gitignore';
    const extension = getFullExtension(filePath);
    expect(extension).toBe('.gitignore');
  });

  it('should return an empty string for a file without an extension', () => {
    const filePath = 'example';
    const extension = getFullExtension(filePath);
    expect(extension).toBe('');
  });

  it('should return an empty string for empty or dot paths', () => {
    expect(getFullExtension('')).toBe('');
    expect(getFullExtension('.')).toBe('');
    expect(getFullExtension('..')).toBe('');
  });
});
