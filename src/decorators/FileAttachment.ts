import realm from '../realms';

const allure = realm.runtime;

export function FileAttachment(fileName: string, contentType: string) {
  return function (
    _target: object,
    _propertyName: string,
    descriptor: TypedPropertyDescriptor<(...arguments_: any[]) => any>,
  ) {
    descriptor.value = allure.createFileAttachment(
      fileName,
      descriptor.value!,
      contentType,
    );

    return descriptor;
  };
}
