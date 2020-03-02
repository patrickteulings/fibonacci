


export const compareArrays = (array1: number[], array2: number[]): boolean => {
  const arrayLength: number = array1.length;

  for (let i = 0; i < arrayLength; i++) { // @TODO number[] is not iterable, why?
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
};
