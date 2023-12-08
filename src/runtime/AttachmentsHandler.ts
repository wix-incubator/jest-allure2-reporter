import path from 'node:path';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';

import type { SharedReporterConfig } from './SharedReporterConfig';

export interface IAttachmentsHandler {
  placeAttachment(name: string, content?: Buffer | string): string;

  secureAttachment(
    filePath: string,
    content?: Buffer | string,
  ): {
    destinationPath: string;
    promise?: Promise<void>;
  };

  writeAttachment(filePath: string, content: Buffer | string): Promise<void>;
}

export class AttachmentsHandler implements IAttachmentsHandler {
  #getSharedConfig: () => SharedReporterConfig;

  constructor(getSharedConfig: () => SharedReporterConfig | undefined) {
    this.#getSharedConfig = () =>
      getSharedConfig() ?? {
        resultsDir: path.join(os.tmpdir(), 'jest_allure2_reporter'),
        overwrite: false,
        injectGlobals: true,
        attachments: {
          subDir: 'attachments',
          fileHandler: 'ref',
        },
      };
  }

  placeAttachment(name: string): string {
    const { resultsDir, attachments } = this.#getSharedConfig();
    const fileName = randomUUID() + path.extname(name);
    return path.isAbsolute(attachments.subDir)
      ? path.join(attachments.subDir, fileName)
      : path.join(resultsDir, attachments.subDir, fileName);
  }

  secureAttachment(sourcePath: string) {
    const config = this.#getSharedConfig();
    const strategy = config.attachments.fileHandler;
    const destinationPath =
      strategy === 'ref' ? sourcePath : this.placeAttachment(sourcePath);

    switch (strategy) {
      case 'copy': {
        return {
          destinationPath,
          promise: this.#copyFile(sourcePath, destinationPath),
        };
      }
      case 'move': {
        return {
          destinationPath,
          promise: this.#moveFile(sourcePath, destinationPath),
        };
      }
      default: {
        return {
          destinationPath: sourcePath,
        };
      }
    }
  }

  async writeAttachment(filePath: string, content: Buffer | string) {
    try {
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      await fs.promises.writeFile(filePath, content);
    } catch (error: any) {
      console.warn(
        `Failed to write attachment at: ${filePath}\nReason: ${
          error?.message ?? error
        }`,
      );
    }
  }

  async #copyFile(sourcePath: string, destinationPath: string) {
    try {
      await fs.promises.mkdir(path.dirname(destinationPath), {
        recursive: true,
      });
      await fs.promises.copyFile(sourcePath, destinationPath);
    } catch (error: any) {
      console.warn(
        `Failed to copy attachment from: ${sourcePath} to: ${destinationPath}\nReason: ${
          error?.message ?? error
        }`,
      );
    }
  }

  async #moveFile(sourcePath: string, destinationPath: string) {
    try {
      await fs.promises.mkdir(path.dirname(destinationPath), {
        recursive: true,
      });
      await fs.promises.rename(sourcePath, destinationPath);
    } catch (error: any) {
      console.warn(
        `Failed to move attachment from: ${sourcePath} to: ${destinationPath}\nReason: ${
          error?.message ?? error
        }`,
      );
    }
  }
}
