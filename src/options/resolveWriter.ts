import importFrom from 'import-from';
import type { AllureWriter } from 'allure-store';
import { FileAllureWriter } from 'allure-store';
import type { GlobalExtractorContext } from 'jest-allure2-reporter';

export interface DefaultWriterOptions {
  resultsDir: string;
  overwrite: boolean;
}

export async function resolveWriter(
  writerReference: any,
  context: GlobalExtractorContext,
  defaultOptions: DefaultWriterOptions,
): Promise<AllureWriter> {
  // If no custom writer specified, create default FileAllureWriter
  if (!writerReference) {
    return new FileAllureWriter({
      resultsDirectory: defaultOptions.resultsDir,
      overwrite: defaultOptions.overwrite,
    });
  }

  let WriterImpl = writerReference;
  let customOptions = defaultOptions;

  // Handle array pattern [WriterImpl, customOptions]
  if (Array.isArray(writerReference)) {
    [WriterImpl, customOptions = defaultOptions] = writerReference;
  }

  // If it's already an instance, just return it
  if (
    WriterImpl &&
    typeof WriterImpl === 'object' &&
    typeof WriterImpl.writeResult === 'function'
  ) {
    return WriterImpl as AllureWriter;
  }

  // If it's a string, import it first
  if (typeof WriterImpl === 'string') {
    const imported = importFrom(context.globalConfig.rootDir, WriterImpl);
    WriterImpl = (imported as any)?.default || imported;
  }

  // If it's a function/constructor
  if (typeof WriterImpl === 'function') {
    try {
      // Try as constructor
      return new WriterImpl(context, customOptions);
    } catch (constructorError: any) {
      try {
        // Try as factory function
        return await WriterImpl(context, customOptions);
      } catch (factoryError: any) {
        throw new Error(
          `Failed to instantiate writer: ${constructorError?.message || constructorError}. ` +
            `Also failed as factory: ${factoryError?.message || factoryError}`,
        );
      }
    }
  }

  // Fallback: assume it's already a valid writer instance
  return WriterImpl as AllureWriter;
}
