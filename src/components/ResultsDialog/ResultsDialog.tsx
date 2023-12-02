import { useDispatch, useSelector } from "react-redux";
import { BUTTON_RETRY } from "../../constants";
import ButtonControl from "../ButtonControl/ButtonControl";
import Dialog from "../Dialog/Dialog";
import { setIsOpen } from "../../store/modalSlice";
import { modalIsOpenSelector, taskInputValues } from "../../store/selectors";
import { useEffect, useState } from "react";
import { checkAnswers } from "../Board/checkAnswers";
import { ResultsDialogProps } from "../../models";
import "./ResultsDialog.css";
import { setInputValues } from "../../store/taskSlice";

const ResultsDialog = ({ restartGame, answers }: ResultsDialogProps) => {
  const dispatch = useDispatch();
  const isDialogOpened = useSelector((state) =>
    modalIsOpenSelector(state, "results")
  );

  const inputValues = useSelector(taskInputValues);

  const [totalQuantityOfCorrectAnswers, setTotalQuantityOfCorrectAnswers] =
    useState<number>(0);

  useEffect(() => {
    if (isDialogOpened) {
      const { quantityCorrectAnswers, indexesOfCorrectAnswers } = checkAnswers({
        studentAnswers: inputValues,
        listOfCorrectAnswers: answers,
      });

      setTotalQuantityOfCorrectAnswers(quantityCorrectAnswers);

      let updatedValues = { ...inputValues };

      for (let [key, val] of Object.entries(inputValues)) {
        if (indexesOfCorrectAnswers.includes(key)) {
          updatedValues[key] = { answer: val?.answer, isCorrect: true };
        } else {
          updatedValues[key] = { answer: val?.answer, isCorrect: false };
        }
      }

      dispatch(setInputValues(updatedValues));
    }
  }, [isDialogOpened]);

  const closeDialog = () => {
    dispatch(
      setIsOpen({
        id: "results",
        isOpen: false,
      })
    );
  };

  const retryGame = () => {
    closeDialog();
    restartGame();
  };

  return (
    <Dialog
      title="Results:"
      isOpened={isDialogOpened ?? false}
      handleCloseModal={closeDialog}
      children={
        <>
          <div>
            Correct answers:{" "}
            <span className="correct-answers">
              {totalQuantityOfCorrectAnswers}
            </span>
          </div>
          <div>Wanna try again?</div>
          <ButtonControl
            handleClick={retryGame}
            label={BUTTON_RETRY}
            className={"retry-button"}
          />
        </>
      }
    />
  );
};

export default ResultsDialog;
