import { stripAnsi } from './stripAnsi';

describe('stripAnsi', () => {
  test.each`
    description                           | input                                                                         | expected
    ${'string with ANSI escape codes'}    | ${'Hello \u001B[31mWorld\u001B[0m'}                                           | ${'Hello World'}
    ${'string without ANSI escape codes'} | ${'Hello World'}                                                              | ${'Hello World'}
    ${'array of strings'}                 | ${['Hello \u001B[31mWorld\u001B[0m', 'Foo \u001B[32mBar\u001B[0m']}           | ${['Hello World', 'Foo Bar']}
    ${'array of mixed types'}             | ${['Hello \u001B[31mWorld\u001B[0m', 42, true]}                               | ${['Hello World', 42, true]}
    ${'object with string values'}        | ${{ name: 'John \u001B[31mDoe\u001B[0m', age: 30 }}                           | ${{ name: 'John Doe', age: 30 }}
    ${'object with mixed value types'}    | ${{ name: 'John \u001B[31mDoe\u001B[0m', age: 30, active: true }}             | ${{ name: 'John Doe', age: 30, active: true }}
    ${'nested object'}                    | ${{ person: { name: 'John \u001B[31mDoe\u001B[0m', age: 30 }, active: true }} | ${{ person: { name: 'John Doe', age: 30 }, active: true }}
    ${'non-string primitive'}             | ${42}                                                                         | ${42}
    ${'boolean'}                          | ${true}                                                                       | ${true}
    ${'null'}                             | ${null}                                                                       | ${null}
    ${'undefined'}                        | ${undefined}                                                                  | ${undefined}
  `('should handle $description', ({ input, expected }) => {
    expect(stripAnsi(input)).toEqual(expected);
  });
});
