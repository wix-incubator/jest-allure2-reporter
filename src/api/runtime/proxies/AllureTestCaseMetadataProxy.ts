import type { AllureTestCaseMetadata } from 'jest-allure2-reporter';

import { AllureTestItemMetadataProxy } from './AllureTestItemMetadataProxy';

export class AllureTestCaseMetadataProxy extends AllureTestItemMetadataProxy<AllureTestCaseMetadata> {
  $startStep(): this {
    const count = this.get('steps', []).length;
    this.$metadata.push('steps', [{}]);
    this.push('currentStep', ['steps', `${count}`]);
    return this;
  }

  $stopStep(): this {
    const currentStep = this.$metadata.get('currentStep', []) as string[];
    this.$metadata.set('currentStep', currentStep.slice(0, -2));
    return this;
  }
}
