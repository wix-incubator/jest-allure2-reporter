import realm from '../../realms';
import type { FileAttachmentOptions } from '../../runtime';

const allure = realm.runtime;

export function FileAttachment(options?: FileAttachmentOptions): MethodDecorator;
export function FileAttachment(name: string, mimeType?: string): MethodDecorator;
export function FileAttachment(
  name?: string | FileAttachmentOptions,
  mimeType?: string,
): MethodDecorator {
  return function (
    _target: object,
    _propertyName: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const options = typeof name === 'string' ? { name, mimeType } : name;
    descriptor.value = allure.createFileAttachment(descriptor.value!, options);

    return descriptor;
  };
}
