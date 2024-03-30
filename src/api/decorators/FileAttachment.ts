import realm from '../../realms';

const allure = realm.runtime;

export function FileAttachment(name: string, mimeType?: string): MethodDecorator {
  return function (
    _target: object,
    _propertyName: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    descriptor.value = allure.createFileAttachment(descriptor.value!, {
      name,
      mimeType,
    });

    return descriptor;
  };
}
