import realm from '../../realms';

const allure = realm.runtime;

export function Attachment(name: string, mimeType?: string): MethodDecorator {
  return function (
    _target: object,
    _propertyName: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    descriptor.value = allure.createAttachment(descriptor.value!, {
      name,
      mimeType,
    });

    return descriptor;
  };
}
