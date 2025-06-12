"use strict";

const { describe, expect, test } = require('@jest/globals');

describe('Sourcemap support', () => {
    test('should have comments and tags', () => {
        expect(2 + 2).toBe(4);
    });
});
//# sourceMappingURL=sourcemap.test.js.map
