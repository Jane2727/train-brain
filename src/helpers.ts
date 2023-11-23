import { MathSymbolsMatrix } from "./models";

export const generateRandomInteger = (max: number): number => {
  return Math.floor(Math.random() * max) + 1;
};

export const generateRandomEnumValue = <T extends { [key: string]: string }>(
  obj: T
) => {
  const random = Math.floor(Math.random() * Object.keys(obj).length);
  return obj[Object.keys(obj)[random]];
};

export const generateRandomArray = <T>(arr: T[], maxLength?: number) => {
  let randomArray = [] as T[];

  const createRandomValue = () => {
    const random = Math.floor(Math.random() * arr.length);
    if (!randomArray.includes(arr[random])) {
      randomArray.push(arr[random]);
    }
  };

  while (randomArray.length < (maxLength ? maxLength : arr.length)) {
    createRandomValue();
  }

  return randomArray;
};

export const generateRandomArrayOfMathSymbols = <
  T extends { [key: string]: string[] }
>(
  obj: T
): MathSymbolsMatrix => {
  let randomColorsArray = [] as string[];

  for (let [_, arr] of Object.entries(obj)) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    randomColorsArray.push(arr[randomIndex]);
  }

  let randomArray = generateRandomArray(randomColorsArray);

  return {
    PLUS: randomArray[0],
    MINUS: randomArray[1],
    MULTIPLY: randomArray[2],
  };
};

export const isClickInsideRectangle = (
  e: React.MouseEvent<HTMLDialogElement, MouseEvent>,
  element: HTMLElement
) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};
