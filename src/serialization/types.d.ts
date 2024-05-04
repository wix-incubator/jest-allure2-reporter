declare module 'properties' {
  export function stringify(data: Record<string, unknown>, options: { unicode: boolean }): string;
}
