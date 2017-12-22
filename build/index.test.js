'use strict';

var _require = require('.'),
    type = _require.type;

test("A Sample Test", function () {
    return expect(type([])).toBe('array');
});