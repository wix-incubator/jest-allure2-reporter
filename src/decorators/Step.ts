import type { ParameterOrString } from 'jest-allure2-reporter';

import realm from '../realms';

const allure = realm.runtime;

export function Step(
  name: string,
  arguments_?: ParameterOrString[],
): MethodDecorator {
  return function (
    _target: object,
    _propertyName: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    descriptor.value = arguments_
      ? allure.createStep(name, arguments_, descriptor.value!)
      : allure.createStep(name, descriptor.value!);

    return descriptor;
  };
}
