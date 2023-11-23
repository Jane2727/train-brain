import React from "react";
import { GameMode } from "../constants";

const GameModeContext = React.createContext({
  gameMode: GameMode.EASY,
  setGameMode: (_: GameMode) => {},
});

export default GameModeContext;
