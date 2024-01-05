import path from 'node:path';

import type { ContentAttachmentContext } from 'jest-allure2-reporter';

import { inferMimeType } from '../../utils/inferMimeType';
import { formatString } from '../../utils/formatString';
import type { Function_, MaybePromise } from '../../utils/types';
import { processMaybePromise } from '../../utils/processMaybePromise';
import { hijackFunction } from '../../utils/hijackFunction';

import type {
  AttachmentContent,
  ContentAttachmentOptions,
  FileAttachmentOptions,
} from './IAllureRuntime';

import type { AllureRuntimeConfig, AttachmentOptions } from './index';

class AttachmentsRuntime {
  readonly #contentHandlers: AllureRuntimeConfig['contentHandlers'];
  readonly #fileHandlers: AllureRuntimeConfig['fileHandlers'];

  attachment<T extends AttachmentContent>(
    name: string,
    content: MaybePromise<T>,
    mimeType?: string,
  ): typeof content {
    return processMaybePromise(
      content,
      this.#handleContentAttachment({ name, mimeType }),
    );
  }

  createAttachment<T extends AttachmentContent>(
    function_: Function_<MaybePromise<T>>,
    rawOptions: string | AttachmentOptions,
  ): typeof function_ {
    const options = this.#resolveAttachmentOptions(rawOptions);
    return hijackFunction(function_, this.#handleContentAttachment(options));
  }

  fileAttachment(
    filePathOrPromise: MaybePromise<string>,
    rawOptions?: string | AttachmentOptions,
  ): any {
    const options = this.#resolveAttachmentOptions(rawOptions);
    return processMaybePromise(
      filePathOrPromise,
      this.#handleFileAttachment(options),
    );
  }

  createFileAttachment(
    function_: Function_<MaybePromise<string>>,
    rawOptions?: string | AttachmentOptions,
  ): typeof function_ {
    const options = this.#resolveAttachmentOptions(rawOptions);
    return hijackFunction<string>(
      function_,
      this.#handleFileAttachment(options),
    );
  }

  #resolveAttachmentOptions(rawOptions?: string | AttachmentOptions) {
    return !rawOptions || typeof rawOptions === 'string'
      ? { name: rawOptions, mimeType: undefined }
      : rawOptions;
  }
  #handleContentAttachment =
    ({ name: nameFormat, mimeType }: ContentAttachmentOptions) =>
    (content: AttachmentContent, arguments_?: unknown[]) => {
      const name = this.#formatName(nameFormat, arguments_);
      const source = this.#attachmentsHandler.placeAttachment(name, content);
      const context: ContentAttachmentContext = {
        contentHandlers: this.#contentHandlers,
        content: '',
        outDir: '',
      };
      const promise = Promise.resolve(this.#contentHandler(context)).then(
        (destinationPath) => {
          this.#metadata.push(this.#localPath('attachments'), [
            {
              name: context.name,
              source: path.resolve(destinationPath),
              type: context.mimeType,
            },
          ]);
        },
      );
      this.#idle = this.#idle.then(() => promise);
    };

  #handleFileAttachment =
    ({ name: rawName, mimeType }: FileAttachmentOptions) =>
    (filePath: string, arguments_?: unknown[]) => {
      const name = this.#formatName(
        rawName ?? path.basename(filePath),
        arguments_,
      );
      const securedPath = this.#attachmentsHandler.placeAttachment(name);
      const result = this.#attachmentsHandler.secureAttachment(
        filePath,
        securedPath,
      );
      this.#metadata.push(this.#localPath('attachments'), [
        {
          name,
          source: path.resolve(result.destinationPath),
          type: mimeType ?? inferMimeType(name, filePath),
        },
      ]);
      if (result.promise) {
        this.#idle = this.#idle.then(() => result.promise);
      }
    };

  #formatName(nameFormat?: string, arguments_?: unknown[]) {
    return arguments_
      ? formatString(nameFormat ?? 'untitled', ...arguments_)
      : nameFormat ?? 'untitled';
  }
}
