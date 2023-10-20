import realm from '../realms';

const allure = realm.runtime;

export function Attachment(name: string, mimeType?: string) {
  return function (
    _target: object,
    _propertyName: string,
    descriptor: TypedPropertyDescriptor<(...arguments_: any[]) => any>,
  ) {
    descriptor.value = allure.createAttachment(descriptor.value!, {
      name,
      mimeType,
    });

    return descriptor;
  };
}
