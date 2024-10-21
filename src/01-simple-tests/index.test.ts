// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput = {
      a: 7,
      b: 2,
      action: Action.Add,
    };

    const result = simpleCalculator(rawInput);

    expect(result).toBe(9);
  });

  test('should subtract two numbers', () => {
    const rawInput = {
      a: 7,
      b: 2,
      action: Action.Subtract,
    };

    const result = simpleCalculator(rawInput);

    expect(result).toBe(5);
  });

  test('should multiply two numbers', () => {
    const rawInput = {
      a: 7,
      b: 2,
      action: Action.Multiply,
    };

    const result = simpleCalculator(rawInput);

    expect(result).toBe(14);
  });

  test('should divide two numbers', () => {
    const rawInput = {
      a: 7,
      b: 2,
      action: Action.Divide,
    };

    const result = simpleCalculator(rawInput);

    expect(result).toBe(3.5);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = {
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    };

    const result = simpleCalculator(rawInput);

    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const rawInput = {
      a: 7,
      b: 2,
      action: 'invalid_action',
    };

    const result = simpleCalculator(rawInput);

    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const rawInput = {
      a: 7,
      b: 'invalid_number',
      action: Action.Add,
    };

    const result = simpleCalculator(rawInput);

    expect(result).toBe(null);
  });
});
