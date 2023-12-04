import { COLOR_NAMES } from "../../constants";
import { generateRandomInteger } from "../../helpers";
import { GenerateWordsParams, WordModel } from "../../models";

export const generateWords = ({
  wordsQuantity,
  addWords,
}: GenerateWordsParams) => {
  if (!wordsQuantity) {
    addWords([]);
    return;
  }
  let words = [] as WordModel[];

  for (let index = 0; index < wordsQuantity; index++) {
    const id = index.toString();
    const nameIdx = generateRandomInteger(COLOR_NAMES.length - 1);
    const colorIdx = generateRandomInteger(COLOR_NAMES.length - 1);

    words.push({
      id,
      name: COLOR_NAMES[nameIdx],
      color: COLOR_NAMES[colorIdx],
    });
  }

  addWords(words);
};
