import React from "react";
import { GameMode, GameModeProps, GameType } from "../constants";

const GameModeContext = React.createContext({
  gameMode: { type: GameType.MATH, mode: GameMode.EASY },
  setGameMode: (_: GameModeProps) => {},
});

export default GameModeContext;
