declare module 'jest-allure2-reporter' {
  interface GlobalExtractorContextAugmentation {
    /**
     * The contents of the `package.json` file if it exists.
     */
    manifest?: {
      name: string;
      version: string;
      [key: string]: unknown;
    } | null;
  }
}
