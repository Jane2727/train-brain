import { useContext, useState } from "react";
import {
  BUTTON_BACK_TO_MENU,
  BUTTON_RESTART,
  GameType,
  HOME_PATH,
} from "../../constants";
import "./Board.css";
import ButtonControl from "../ButtonControl/ButtonControl";
import { useNavigate } from "react-router-dom";
import GameModeContext from "../../contexts/GameModeContext";
import MathGame from "../MathGame/MathGame";
import StroopTest from "../StroopTest/StroopTest";

const Board = () => {
  const [isRestarted, setRestartGame] = useState<boolean>(false);

  const navigate = useNavigate();

  const { gameMode } = useContext(GameModeContext);

  const title = {
    [GameType.MATH]: "Try to solve 20 examples 😉",
    [GameType.STROOP]: "Try to say color of words 😉",
  };

  const backToMenu = () => {
    navigate(HOME_PATH);
  };

  const restartGame = () => {
    setRestartGame(true);
  };

  const handleRestart = () => {
    setRestartGame(false);
  };

  return (
    <>
      <div className="buttons-container">
        <ButtonControl handleClick={restartGame} label={BUTTON_RESTART} />
        <ButtonControl handleClick={backToMenu} label={BUTTON_BACK_TO_MENU} />
      </div>

      <h2>{title[gameMode.type]}</h2>

      {gameMode.type === GameType.MATH ? (
        <MathGame isRestarted={isRestarted} handleRestart={handleRestart} />
      ) : (
        <StroopTest isRestarted={isRestarted} handleRestart={handleRestart} />
      )}
    </>
  );
};

export default Board;
