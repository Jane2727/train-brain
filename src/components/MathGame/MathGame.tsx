import { useContext, useEffect, useState } from "react";
import Task from "../Task/Task";
import { AnswerModel, MathSymbolsMatrix, TaskModel } from "../../models";
import { generateTasks } from "./generateTasks";
import {
  BUTTON_SUBMIT,
  GameMode,
  GameType,
  MathSigns,
  TASKS_QUANTITY,
} from "../../constants";
import { useDispatch } from "react-redux";
import { setInputValues } from "../../store/taskSlice";
import ResultsDialog from "../ResultsDialog/ResultsDialog";
import GameModeContext from "../../contexts/GameModeContext";
import ButtonControl from "../ButtonControl/ButtonControl";
import { setIsOpen } from "../../store/modalSlice";
import "./MathGame.css";

const MathGame = ({
  isRestarted,
  handleRestart,
}: {
  isRestarted: boolean;
  handleRestart: () => void;
}) => {
  const dispatch = useDispatch();

  const { gameMode } = useContext(GameModeContext);
  const isMathGame = gameMode.type === GameType.MATH;
  const isTrickyGameMode = isMathGame && gameMode.mode === GameMode.TRICKY;

  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [answers, setAnswers] = useState<AnswerModel>({});
  const [randomMathSymbols, setRandomMathSymbols] =
    useState<MathSymbolsMatrix>();
  const [symbolsItems, setSymbolsItems] = useState<string[]>([]);

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
    handleRestart();
  };

  useEffect(() => {
    if (isRestarted) {
      restartGame();
    }
  }, [isRestarted]);

  useEffect(() => {
    if (isTrickyGameMode && randomMathSymbols) {
      setSymbolsItems([
        randomMathSymbols.PLUS || MathSigns.PLUS,
        randomMathSymbols.MINUS || MathSigns.MINUS,
        randomMathSymbols.MULTIPLY || MathSigns.MULTIPLY,
        MathSigns.PLUS,
        MathSigns.MINUS,
        MathSigns.MULTIPLY,
      ]);
    }
  }, [randomMathSymbols]);

  const finishGame = () => {
    dispatch(
      setIsOpen({
        id: "results",
        isOpen: true,
      })
    );
  };

  return (
    <>
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

export default MathGame;
