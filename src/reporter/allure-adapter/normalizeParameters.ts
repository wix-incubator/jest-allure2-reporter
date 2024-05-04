import type { AllureTestCaseResult, AllureTestStepResult, Parameter } from 'jest-allure2-reporter';

export function normalizeParameters(result: AllureTestCaseResult | AllureTestStepResult) {
  return result.parameters?.map(stringifyParameter);
}

function stringifyParameter({ name, value }: Parameter) {
  return { name, value: String(value) };
}
