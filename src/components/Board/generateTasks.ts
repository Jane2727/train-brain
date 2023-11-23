import { evaluate } from "mathjs";
import { MAX_NUMBER, MathSigns, mathSymbols } from "../../constants";
import {
  generateRandomArrayOfMathSymbols,
  generateRandomEnumValue,
  generateRandomInteger,
} from "../../helpers";
import {
  AnswerModel,
  GenerateTasksParams,
  MathSymbolsMatrix,
  TaskModel,
} from "../../models";

const getMathSign = (sign: string, symbols: MathSymbolsMatrix) => {
  switch (sign) {
    case MathSigns.PLUS:
      return symbols?.PLUS;
    case MathSigns.MINUS:
      return symbols?.MINUS;
    case MathSigns.MULTIPLY:
      return symbols?.MULTIPLY;
    default:
      return;
  }
};

export const generateTasks = ({
  tasksQuantity,
  addTasks,
  addAnswers,
  addRandomMathSymbols,
  isTrickyGameMode,
}: GenerateTasksParams) => {
  if (!tasksQuantity) {
    addTasks([]);
    addAnswers({});
    return;
  }
  const tasksArray = [] as TaskModel[];
  let answersObject = {} as AnswerModel;
  let randomSymbols = {} as MathSymbolsMatrix;

  if (isTrickyGameMode) {
    randomSymbols = generateRandomArrayOfMathSymbols(mathSymbols);
  }

  for (let index = 0; index < tasksQuantity; index++) {
    const id = index.toString();
    const firstSummand = generateRandomInteger(MAX_NUMBER);
    const secondSummand = generateRandomInteger(MAX_NUMBER);
    const thirdSummand = generateRandomInteger(MAX_NUMBER);

    const firstSymbol = generateRandomEnumValue<typeof MathSigns>(MathSigns);
    const secondSymbol = generateRandomEnumValue<typeof MathSigns>(MathSigns);

    const answer = evaluate(
      `${firstSummand}${firstSymbol}${secondSummand}${secondSymbol}${thirdSummand}`
    );

    let task = {
      id,
      firstSummand,
      firstSymbol,
      secondSummand,
      secondSymbol,
      thirdSummand,
    } as TaskModel;

    if (isTrickyGameMode) {
      task = {
        ...task,
        firstSymbol:
          (randomSymbols && getMathSign(firstSymbol, randomSymbols)) ||
          firstSymbol,
        secondSymbol:
          (randomSymbols && getMathSign(secondSymbol, randomSymbols)) ||
          secondSymbol,
      };
    }

    tasksArray.push(task);

    answersObject = {
      ...answersObject,
      [id]: { answer: answer.toString() },
    };
  }

  addTasks(tasksArray);
  addAnswers(answersObject);
  if (isTrickyGameMode && randomSymbols) {
    addRandomMathSymbols(randomSymbols);
  }
};
