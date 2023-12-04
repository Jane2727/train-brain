import { CheckAnswersParams } from "../../models";

export const checkAnswers = ({
  studentAnswers,
  listOfCorrectAnswers,
}: CheckAnswersParams) => {
  let quantityCorrectAnswers = 0;
  let indexesOfCorrectAnswers = [];

  for (let [taskId, studentAnswer] of Object.entries(studentAnswers)) {
    if (studentAnswer?.answer === listOfCorrectAnswers[taskId].answer) {
      indexesOfCorrectAnswers.push(taskId);
      quantityCorrectAnswers += 1;
    }
  }

  return { quantityCorrectAnswers, indexesOfCorrectAnswers };
};
