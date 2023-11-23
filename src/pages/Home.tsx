import ButtonControl from "../components/ButtonControl/ButtonControl";
import { useNavigate } from "react-router-dom";
import { GAME_PATH, GameMode } from "../constants";
import "./Home.css";
import { useContext } from "react";
import GameModeContext from "../contexts/GameModeContext";

const Home = () => {
  const navigate = useNavigate();
  const { setGameMode } = useContext(GameModeContext);

  const startGame = (type: GameMode) => {
    setGameMode(type);
    navigate(GAME_PATH);
  };

  return (
    <div className="home-page">
      <h1>Simple Game inspired by Ryuta Kawashima's system</h1>
      <div className="buttons-mode-container">
        <ButtonControl
          handleClick={() => startGame(GameMode.EASY)}
          label={"Easy mode"}
        />
        <ButtonControl
          handleClick={() => startGame(GameMode.TRICKY)}
          label={"Tricky mode"}
        />
      </div>
    </div>
  );
};

export default Home;
