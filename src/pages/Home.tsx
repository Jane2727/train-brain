import ButtonControl from "../components/ButtonControl/ButtonControl";
import { useNavigate } from "react-router-dom";
import { GAME_PATH, GameMode, GameType } from "../constants";
import "./Home.css";
import { useContext, useState } from "react";
import GameModeContext from "../contexts/GameModeContext";

const Home = () => {
  const [isGameModeShown, setIsGameModeShown] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setGameMode } = useContext(GameModeContext);

  const startGame = (gameType: GameType, gameMode: GameMode) => {
    setGameMode({ type: gameType, mode: gameMode });
    navigate(GAME_PATH);
  };

  const showGameMode = () => {
    setIsGameModeShown(true);
  };

  return (
    <div className="home-page">
      <h1>Simple Game inspired by Ryuta Kawashima's system</h1>
      <div className="buttons-mode-container">
        {!isGameModeShown ? (
          <>
            <ButtonControl
              handleClick={() => showGameMode()}
              label={"To do sums"}
            />
            <ButtonControl
              handleClick={() => startGame(GameType.STROOP, GameMode.EASY)}
              label={"Stroop Test"}
            />
          </>
        ) : (
          <>
            <ButtonControl
              handleClick={() => startGame(GameType.MATH, GameMode.EASY)}
              label={"Easy mode"}
            />
            <ButtonControl
              handleClick={() => startGame(GameType.MATH, GameMode.TRICKY)}
              label={"Tricky mode"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
