import "./App.css";
import { useColorScheme } from "./components/ColorSchemeToggle/useColorScheme";
import {
  DARK_CLASS,
  GAME_PATH,
  GameMode,
  GameModeProps,
  GameType,
  HOME_PATH,
  LIGHT_CLASS,
} from "./constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Navbar from "./components/Navbar/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import GameModeContext from "./contexts/GameModeContext";
import { useState } from "react";

function App() {
  const [gameMode, setGameMode] = useState<GameModeProps>({
    type: GameType.MATH,
    mode: GameMode.EASY,
  });
  const { isDark, setDarkTheme } = useColorScheme();

  // avoid flashing on start
  if (
    !document.documentElement.classList.contains(DARK_CLASS) &&
    !document.documentElement.classList.contains(LIGHT_CLASS)
  ) {
    document.documentElement.className = isDark ? DARK_CLASS : LIGHT_CLASS;
  }

  return (
    <GameModeContext.Provider value={{ gameMode, setGameMode }}>
      <Router>
        <h1>Train Brain</h1>
        <Navbar isDark={isDark} setDarkTheme={setDarkTheme} />
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={GAME_PATH} element={<Game />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </GameModeContext.Provider>
  );
}

export default App;
