const path = require('path');

// eslint-disable-next-line node/no-unpublished-import
const fs = require('fs-extra');

class DumpReporter {
  constructor(globalConfig) {
    this._rootDir = globalConfig.rootDir;
    this._outFile = path.join(this._rootDir, 'recordings', require('jest/package.json').version + '.jsonl');
  }
  onRunStart(aggregatedResult, options) {
    console.log('Starting dump: %s', this._outFile);
    fs.ensureFileSync(this._outFile);
    fs.writeFileSync(this._outFile, '');
    this._append({ method: 'onRunStart', params: [aggregatedResult, options] });
  }
  onTestFileStart(test) {
    this._append({ method: 'onTestFileStart', params: [test] });
  }
  onTestCaseResult(test, testCaseResult) {
    this._append({ method: 'onTestCaseResult', params: [test, testCaseResult] });
  }
  onTestFileResult(test, testResult, aggregatedResult) {
    this._append({ method: 'onTestFileResult', params: [test, testResult, aggregatedResult] });
  }
  onRunComplete(_testContexts, results) {
    this._append({ method: 'onRunComplete', params: [{}, results] });
  }
  getLastError() { }
  _append(payload) {
    console.log('Append: %s', payload.method);
    const timedPayload = { ...payload, time: Date.now() };
    fs.appendFileSync(this._outFile, JSON.stringify(timedPayload) + '\n');
  }
}

module.exports = DumpReporter;
