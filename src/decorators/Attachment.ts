import realm from '../realms';

const allure = realm.runtime;

export function Attachment(filename: string, contentType?: string) {
  return function (
    _target: object,
    _propertyName: string,
    descriptor: TypedPropertyDescriptor<(...arguments_: any[]) => any>,
  ) {
    descriptor.value = allure.createAttachment(
      filename,
      descriptor.value!,
      contentType,
    );

    return descriptor;
  };
}
