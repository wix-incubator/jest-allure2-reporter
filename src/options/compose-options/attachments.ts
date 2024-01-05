import type { AttachmentsOptions } from 'jest-allure2-reporter';

export function composeAttachments(
  base: Required<AttachmentsOptions>,
  custom: AttachmentsOptions | undefined,
): Required<AttachmentsOptions> {
  if (!custom) {
    return base;
  }

  return {
    subDir: custom?.subDir ?? base.subDir,
    contentHandler: custom?.contentHandler ?? base.contentHandler,
    fileHandler: custom?.fileHandler ?? base.fileHandler,
  };
}
