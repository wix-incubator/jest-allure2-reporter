import { formatString } from './formatString';

describe('formatString', () => {
  it('should take only used arguments', () => {
    const formatted = formatString('%s %s %s', 'one', 'two', 'three', 'four');
    expect(formatted).toBe('one two three');
  });

  it('should ignore unused arguments', () => {
    const formatted = formatString('No placeholders here', 'one', 'two');
    expect(formatted).toBe('No placeholders here');
  });

  it('should handle escaped placeholders', () => {
    const formatted = formatString('Escaped %%s here %s', 'one', 'two');
    expect(formatted).toBe('Escaped %s here one');
  });

  it('should handle simple messages', () => {
    const formatted = formatString('No arguments here');
    expect(formatted).toBe('No arguments here');
  });
});
