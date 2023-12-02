import { useContext, useEffect, useState } from "react";
import {
  BUTTON_BACK_TO_MENU,
  BUTTON_RESTART,
  BUTTON_SUBMIT,
  GameMode,
  HOME_PATH,
  MathSigns,
  TASKS_QUANTITY,
} from "../../constants";
import { AnswerModel, MathSymbolsMatrix, TaskModel } from "../../models";
import { generateTasks } from "./generateTasks";
import "./Board.css";
import ButtonControl from "../ButtonControl/ButtonControl";
import { useNavigate } from "react-router-dom";
import GameModeContext from "../../contexts/GameModeContext";
import Task from "../Task/Task";
import { useDispatch } from "react-redux";
import { setInputValues } from "../../store/taskSlice";
import ResultsDialog from "../ResultsDialog/ResultsDialog";
import { setIsOpen } from "../../store/modalSlice";

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [answers, setAnswers] = useState<AnswerModel>({});
  const [randomMathSymbols, setRandomMathSymbols] =
    useState<MathSymbolsMatrix>();

  const { gameMode } = useContext(GameModeContext);
  const isTrickyGameMode = gameMode === GameMode.TRICKY;

  const createTasks = () => {
    generateTasks({
      tasksQuantity: TASKS_QUANTITY,
      addTasks: setTasks,
      addAnswers: setAnswers,
      addRandomMathSymbols: setRandomMathSymbols,
      isTrickyGameMode,
    });
  };

  const clear = () => {
    dispatch(setInputValues({}));
  };

  useEffect(() => {
    createTasks();
    return () => clear();
  }, []);

  const restartGame = () => {
    clear();
    createTasks();
  };

  const backToMenu = () => {
    navigate(HOME_PATH);
  };

  const finishGame = () => {
    dispatch(
      setIsOpen({
        id: "results",
        isOpen: true,
      })
    );
  };

  const symbolsItems = [
    randomMathSymbols ? randomMathSymbols.PLUS : MathSigns.PLUS,
    randomMathSymbols ? randomMathSymbols?.MINUS : MathSigns.MINUS,
    randomMathSymbols ? randomMathSymbols?.MULTIPLY : MathSigns.MULTIPLY,
    MathSigns.PLUS,
    MathSigns.MINUS,
    MathSigns.MULTIPLY,
  ];

  return (
    <>
      <div className="buttons-container">
        <ButtonControl handleClick={restartGame} label={BUTTON_RESTART} />
        <ButtonControl handleClick={backToMenu} label={BUTTON_BACK_TO_MENU} />
      </div>

      <h2>Try to solve 20 examples 😉</h2>

      {isTrickyGameMode && (
        <div className="symbols-container">
          {symbolsItems?.map((symbolItem) => (
            <div className="symbol-item" key={symbolItem}>
              {symbolItem}
            </div>
          ))}
        </div>
      )}

      <div className="tasks-list__wrapper">
        <ul className="tasks-list">
          {tasks?.map((task) => (
            <li key={task.id} className="task-item">
              <Task task={task} />
            </li>
          ))}
        </ul>
      </div>

      <div className="buttons-container-submit">
        <ButtonControl handleClick={finishGame} label={BUTTON_SUBMIT} />
      </div>

      <ResultsDialog restartGame={restartGame} answers={answers} />
    </>
  );
};

export default Board;
