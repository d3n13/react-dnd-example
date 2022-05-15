import { moveArrayItemImmutable, moveArrayItemInPlace } from './moveArrayItem';

type TargetA = typeof moveArrayItemImmutable;
type CaseA = [Parameters<TargetA>, ReturnType<TargetA>];

type TargetB = typeof moveArrayItemInPlace;
type CaseB = [Parameters<TargetB>, ReturnType<TargetB>];

const arr = (length: number) =>
  Array(length)
    .fill('')
    .map((_, i) => i);

// Note: Gets mutated during B
const casesA: CaseA[] = [
  [
    [arr(3), 0, 0],
    [0, 1, 2],
  ],

  [
    [arr(3), 1, 1],
    [0, 1, 2],
  ],

  [
    [arr(3), 0, 1],
    [1, 0, 2],
  ],

  [
    [arr(3), 1, 200],
    [0, 2, 1],
  ],

  [
    [arr(3), 200, 1],
    [0, 1, 2],
  ],

  [
    [arr(6), -1, 1],
    [0, 5, 1, 2, 3, 4],
  ],

  [
    [arr(6), -2, 1],
    [0, 4, 1, 2, 3, 5],
  ],

  [
    [arr(6), -2, 2],
    [0, 1, 4, 2, 3, 5],
  ],

  [
    [arr(6), -2, 200],
    [0, 1, 2, 3, 5, 4],
  ],

  [
    [arr(6), -2, -1],
    [0, 1, 2, 3, 5, 4],
  ],

  [
    [arr(6), -3, -1],
    [0, 1, 2, 4, 5, 3],
  ],

  [
    [arr(6), 3, -1],
    [0, 1, 2, 4, 5, 3],
  ],

  [
    [arr(6), 3, -2],
    [0, 1, 2, 4, 3, 5],
  ],

  [
    [arr(6), -2, -200],
    [4, 0, 1, 2, 3, 5],
  ],

  [
    [arr(6), 1, -200],
    [1, 0, 2, 3, 4, 5],
  ],

  [
    [arr(6), 1, -3],
    [0, 2, 3, 1, 4, 5],
  ],

  [
    [arr(5), 0, -1],
    [1, 2, 3, 4, 0],
  ],

  [
    [arr(5), 0, 4],
    [1, 2, 3, 4, 0],
  ],

  [
    [arr(5), 0, -0],
    [0, 1, 2, 3, 4],
  ],
];

const casesB: CaseB[] = casesA;

describe('moveArrayItemImmutable', () => {
  casesA.forEach(([params, expected], index) => {
    it('Case ' + index, () => {
      const result = moveArrayItemImmutable(...params);
      expect(result).toEqual(expected);
      expect(params[0]).not.toBe(result);
    });
  });
});

describe('moveArrayItemInPlace', () => {
  casesB.forEach(([params, expected], index) => {
    it('Case ' + index, () => {
      const result = moveArrayItemInPlace(...params);
      expect(result).toEqual(expected);
      expect(params[0]).toBe(result);
    });
  });
});
