import React, { useContext, useEffect, useState } from "react";
import {
  BUTTON_BACK_TO_MENU,
  BUTTON_RESTART,
  BUTTON_RETRY,
  BUTTON_SUBMIT,
  GameMode,
  HOME_PATH,
  MathSigns,
  TASKS_QUANTITY,
} from "../../constants";
import {
  AnswerModel,
  MathSymbolsMatrix,
  RenderTaskProps,
  TaskModel,
} from "../../models";
import InputControl from "../InputControl/InputControl";
import { generateTasks } from "./generateTasks";
import "./Board.css";
import ButtonControl from "../ButtonControl/ButtonControl";
import { checkAnswers } from "./checkAnswers";
import { useNavigate } from "react-router-dom";
import Dialog from "../Dialog/Dialog";
import GameModeContext from "../../contexts/GameModeContext";

const Board = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [answers, setAnswers] = useState<AnswerModel>({});
  const [inputValues, setInputValues] = useState<{
    [key: string]: string;
  }>({});
  const [isDialogOpened, setDialogOpened] = useState<boolean>(false);
  const [randomMathSymbols, setRandomMathSymbols] =
    useState<MathSymbolsMatrix>();

  const navigate = useNavigate();

  const { gameMode } = useContext(GameModeContext);
  const isTrickyGameMode = gameMode === GameMode.TRICKY;

  useEffect(() => {
    generateTasks({
      tasksQuantity: TASKS_QUANTITY,
      addTasks: setTasks,
      addAnswers: setAnswers,
      addRandomMathSymbols: setRandomMathSymbols,
      isTrickyGameMode,
    });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => {
    const inpValue = e?.target?.value;
    let validValue = inpValue.match(/^-?\d*$/) && inpValue;
    let minus = inpValue === "--" && "-";

    setInputValues({
      ...inputValues,
      [taskId]: validValue || minus || "",
    });
  };

  const renderTask = ({
    task,
    inputValue,
    handleInputChange,
  }: RenderTaskProps) => {
    return (
      <>
        <label className="task-item__label" htmlFor={task.id.toString()}>
          <span>{`${task.firstSummand} ${task.firstSymbol} ${task.secondSummand} ${task.secondSymbol} ${task.thirdSummand}`}</span>
          <span>{"="}</span>
        </label>
        <InputControl
          value={inputValue ?? ""}
          handleChange={(e) => handleInputChange(e, task.id)}
          id={task.id.toString()}
        />
      </>
    );
  };

  const restartGame = () => {
    setInputValues({});

    generateTasks({
      tasksQuantity: TASKS_QUANTITY,
      addTasks: setTasks,
      addAnswers: setAnswers,
      addRandomMathSymbols: setRandomMathSymbols,
      isTrickyGameMode,
    });
  };

  const backToMenu = () => {
    navigate(HOME_PATH);
  };

  const [totalQuantityOfCorrectAnswers, setTotalQuantityOfCorrectAnswers] =
    useState<number>(0);

  const finishGame = () => {
    const { quantityCorrectAnswers, indexesOfCorrectAnswers } = checkAnswers({
      studentAnswers: inputValues,
      listOfCorrectAnswers: answers,
    });

    console.log(indexesOfCorrectAnswers);

    setTotalQuantityOfCorrectAnswers(quantityCorrectAnswers);
    setDialogOpened(true);
  };

  const retryGame = () => {
    setDialogOpened(false);
    restartGame();
  };

  return (
    <div>
      {isTrickyGameMode && (
        <div className="symbols-container">
          <div className="symbols-item">{randomMathSymbols?.PLUS}</div>
          <div className="symbols-item">{randomMathSymbols?.MINUS}</div>
          <div className="symbols-item">{randomMathSymbols?.MULTIPLY}</div>
          <div className="symbols-item">{MathSigns.PLUS}</div>
          <div className="symbols-item">{MathSigns.MINUS}</div>
          <div className="symbols-item">{MathSigns.MULTIPLY}</div>
        </div>
      )}

      <div className="buttons-container">
        <ButtonControl handleClick={restartGame} label={BUTTON_RESTART} />
        <ButtonControl handleClick={backToMenu} label={BUTTON_BACK_TO_MENU} />
      </div>

      <ul className="tasks-list">
        {tasks?.map((task) => (
          <li key={task.id} className="task-item">
            {renderTask({
              task,
              inputValue: inputValues?.[task.id],
              handleInputChange,
            })}
          </li>
        ))}
      </ul>
      <div className="buttons-container">
        <ButtonControl handleClick={finishGame} label={BUTTON_SUBMIT} />
      </div>
      <Dialog
        title="Results:"
        isOpened={isDialogOpened}
        handleCloseModal={() => setDialogOpened(false)}
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
    </div>
  );
};

export default Board;
