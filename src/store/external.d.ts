declare module 'properties' {
  type Options = {
    sections: boolean;
    comments: string;
    separators: string;
    unicode: boolean;
  };

  export function parse(text: string, options?: Partial<Options>): Record<string, string>;
  export function stringify(data: Record<string, unknown>, options?: Partial<Options>): string;
}
