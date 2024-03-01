import type {
  LabelName,
  Link,
  Parameter,
  Status,
  StatusDetails,
} from 'jest-allure2-reporter';

import type { AllureTestItemMetadataProxy } from '../../metadata';
import type { AllureRuntimeContext } from '../AllureRuntimeContext';

export type CoreModuleContext = {
  readonly metadata: AllureTestItemMetadataProxy;
};

export class CoreModule {
  constructor(protected readonly context: CoreModuleContext) {}

  static create(context: AllureRuntimeContext): CoreModule {
    return new CoreModule({
      get metadata() {
        return context.getCurrentMetadata();
      },
    });
  }

  description(value: string) {
    this.context.metadata.$bind(null).push('description', [value]);
  }

  descriptionHtml(value: string) {
    this.context.metadata.$bind(null).push('descriptionHtml', [value]);
  }

  fullName(value: string) {
    this.context.metadata.set('fullName', value);
  }

  historyId(value: string) {
    this.context.metadata.$bind(null).set('historyId', value);
  }

  label(name: LabelName | string, value: string) {
    this.context.metadata.push('labels', [{ name, value }]);
  }

  link(link: Link) {
    this.context.metadata.push('links', [link]);
  }

  parameter(parameter: Parameter) {
    this.context.metadata.push('parameters', [parameter]);
  }

  status(status: Status) {
    this.context.metadata.set('status', status);
  }

  statusDetails(statusDetails: StatusDetails) {
    this.context.metadata.set('statusDetails', statusDetails);
  }
}
