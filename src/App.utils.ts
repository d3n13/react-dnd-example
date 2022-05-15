const getMaxIndex = <T>(fullArray: T[]) => fullArray.length - 1;
const MIN_INDEX = 0;

export const isMoveUpImpossible = (index: number) => index <= MIN_INDEX;

export const isMoveDownImpossible = <T>(fullArray: T[], index: number) =>
  index >= getMaxIndex(fullArray);
