const assert = require('assert');

const JestAllure2Reporter = require('jest-allure2-reporter');
assert(isClass(JestAllure2Reporter), 'jest-allure2-reporter should export a class as its default export');
// assert(typeof JestAllure2Reporter.query === 'object', 'jest-allure2-reporter/reporter class should export .query helper');

const environmentListener = require('jest-allure2-reporter/environment-listener');
assert(typeof environmentListener === 'function', 'jest-allure2-reporter/environment-listener should export a class as its default export');

const JsdomTestEnvironment = require('jest-allure2-reporter/environment-jsdom');
assert(isClass(JsdomTestEnvironment), 'jest-allure2-reporter/environment-jsdom should export a class as its default export');

const NodeTestEnvironment = require('jest-allure2-reporter/environment-node');
assert(isClass(NodeTestEnvironment), 'jest-allure2-reporter/environment-node should export a class as its default export');

const { Attachment, $Owner, allure } = require('jest-allure2-reporter/api');
assert(typeof Attachment === 'function', 'jest-allure2-reporter should export Attachment decorator as a named export');
assert(typeof $Owner === 'function', 'jest-allure2-reporter should export $Owner function as a named export');
assert(typeof allure === 'object', 'jest-allure2-reporter should export allure object as a named export');

function isClass(obj) {
  return typeof obj === 'function' && /^class\s/.test(Function.prototype.toString.call(obj));
}
