import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 1, b: 3, action: Action.Multiply, expected: 3 },
  { a: 5, b: 1, action: Action.Divide, expected: 5 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
];

describe.each(testCases)(
  'should return expected value',
  ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toEqual(expected);
  },
);
