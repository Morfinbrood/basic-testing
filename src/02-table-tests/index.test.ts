import { simpleCalculator, Action } from './index';
const testCases = [
  { a: 7, b: 2, action: Action.Add, expected: 9 },
  { a: 7, b: 2, action: Action.Subtract, expected: 5 },
  { a: 7, b: 2, action: Action.Multiply, expected: 14 },
  { a: 7, b: 2, action: Action.Divide, expected: 3.5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 7, b: 2, action: 'InvalidAction', expected: null },
  { a: 'InvalidNumber', b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should return ${expected} when performing ${action} on ${a} and ${b}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });
});
