const { type } = require('.');

test("A Sample Test", () => (
    expect(type([]))
    .toBe('array')
))