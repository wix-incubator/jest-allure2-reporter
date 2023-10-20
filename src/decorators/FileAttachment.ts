import realm from '../realms';

const allure = realm.runtime;

export function FileAttachment(name: string, mimeType?: string) {
  return function (
    _target: object,
    _propertyName: string,
    descriptor: TypedPropertyDescriptor<(...arguments_: any[]) => any>,
  ) {
    descriptor.value = allure.createFileAttachment(descriptor.value!, {
      name,
      mimeType,
    });

    return descriptor;
  };
}
