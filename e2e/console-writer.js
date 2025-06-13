class ConsoleAllureWriter {
  constructor(config = {}, options = {}) {
    this.config = config;
    this.options = options;
    console.log('🔧 ConsoleAllureWriter initialized with config:', JSON.stringify(config));
    console.log('🔧 ConsoleAllureWriter initialized with options:', JSON.stringify(options, null, 2));
  }

  async init() {
    console.log('📝 ConsoleAllureWriter initialized');
  }

  async writeResult(result) {
    console.log('📊 Test Result:', JSON.stringify({
      uuid: result.uuid,
      name: result.name,
      fullName: result.fullName,
      status: result.status,
      stage: result.stage,
      start: result.start,
      stop: result.stop,
      labels: result.labels,
      links: result.links,
      parameters: result.parameters,
      attachments: result.attachments?.map(a => ({ name: a.name, type: a.type })),
      statusDetails: result.statusDetails
    }, null, 2));
  }

  async writeContainer(container) {
    console.log('📦 Test Container:', JSON.stringify({
      uuid: container.uuid,
      name: container.name,
      children: container.children,
      befores: container.befores?.length || 0,
      afters: container.afters?.length || 0,
      start: container.start,
      stop: container.stop
    }, null, 2));
  }

  async writeCategories(categories) {
    console.log('📂 Categories:', JSON.stringify(categories, null, 2));
  }

  async writeEnvironmentInfo(environment) {
    console.log('🌍 Environment Info:', JSON.stringify(environment, null, 2));
  }

  async writeExecutorInfo(executor) {
    console.log('⚡ Executor Info:', JSON.stringify(executor, null, 2));
  }

  async cleanup() {
    console.log('🧹 ConsoleAllureWriter cleanup completed');
  }
}

module.exports = ConsoleAllureWriter;
