import assert from 'node:assert';
import JestAllure2Reporter from 'jest-allure2-reporter';
import environmentListener from 'jest-allure2-reporter/environment-listener';
import JsdomTestEnvironment from 'jest-allure2-reporter/environment-jsdom';
import NodeTestEnvironment from 'jest-allure2-reporter/environment-node';
import { Attachment, $Owner, allure } from 'jest-allure2-reporter/api';

assert(isClass(JestAllure2Reporter), 'jest-allure2-reporter should export a class as its default export');
assert(typeof environmentListener === 'function', 'jest-allure2-reporter/environment-listener should export a class as its default export');
assert(isClass(JsdomTestEnvironment), 'jest-allure2-reporter/environment-jsdom should export a class as its default export');
assert(isClass(NodeTestEnvironment), 'jest-allure2-reporter/environment-node should export a class as its default export');
assert(typeof allure === 'object', 'jest-allure2-reporter should export allure object as a named export');
assert(typeof Attachment === 'function', 'jest-allure2-reporter should export Attachment decorator as a named export');
assert(typeof $Owner === 'function', 'jest-allure2-reporter should export $Owner function as a named export');

function isClass(obj) {
  return typeof obj === 'function' && /^class\s/.test(Function.prototype.toString.call(obj));
}
