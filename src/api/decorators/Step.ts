import type { UserParameter } from '../../runtime';
import realm from '../../realms';
import { typeAssertions } from '../../utils';

const allure = realm.runtime;

export function Step(name: string, arguments_?: UserParameter[]): MethodDecorator {
  if (arguments_ !== undefined) {
    typeAssertions.assertArray(arguments_, 'arguments');
  }

  return function (
    _target: object,
    _propertyName: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    descriptor.value =
      arguments_ === undefined
        ? allure.createStep(name, descriptor.value!)
        : allure.createStep(name, arguments_, descriptor.value!);

    return descriptor;
  };
}
