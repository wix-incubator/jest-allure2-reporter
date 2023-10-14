import realm from '../realms';
import type { ParameterOrString } from '../utils/types';

const allure = realm.runtime;

export function Step(name: string, arguments_?: ParameterOrString[]) {
  return function (
    _target: object,
    _propertyName: string,
    descriptor: TypedPropertyDescriptor<(...arguments_: any[]) => Promise<any>>,
  ) {
    descriptor.value = arguments_
      ? allure.createStep(name, arguments_, descriptor.value!)
      : allure.createStep(name, descriptor.value!);

    return descriptor;
  };
}
