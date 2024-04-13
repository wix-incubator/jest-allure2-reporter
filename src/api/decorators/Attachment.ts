import realm from '../../realms';
import type { ContentAttachmentOptions } from '../../runtime';
import { typeAssertions } from '../../utils';

const allure = realm.runtime;

export function Attachment(options: ContentAttachmentOptions): MethodDecorator;
export function Attachment(name: string, mimeType?: string): MethodDecorator;
export function Attachment(
  name: string | ContentAttachmentOptions,
  mimeType?: string,
): MethodDecorator {
  typeAssertions.assertNotNullish(name, 'name string or options');

  return function (
    _target: object,
    _propertyName: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const options = typeof name === 'string' ? { name, mimeType } : name;
    descriptor.value = allure.createAttachment(descriptor.value!, options);

    return descriptor;
  };
}
