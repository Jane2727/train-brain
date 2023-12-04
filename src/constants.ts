export const DARK_CLASS = "dark";
export const LIGHT_CLASS = "light";

export const TASKS_QUANTITY = 20;
export const MAX_NUMBER = 9;
export const WORDS_QUANTITY = 21;

export const HOME_PATH = "/train-brain";
export const GAME_PATH = "/game";

export const BUTTON_BACK_TO_MENU = "Back to Menu";
export const BUTTON_BACK_HOME = "Back to Home Page";
export const BUTTON_RESTART = "Restart";
export const BUTTON_SUBMIT = "Submit";
export const BUTTON_RETRY = "Retry";

export const mathSymbols = {
  heart: ["💛", "💜", "💙"],
  circle: ["🟣", "🟠", "🟢"],
  square: ["🟦", "🟪", "🟩"],
};

export enum MathSigns {
  PLUS = "+",
  MINUS = "-",
  MULTIPLY = "*",
}

export enum GameMode {
  EASY = "easy",
  TRICKY = "tricky",
}

export enum GameType {
  MATH = "math",
  STROOP = "stroop",
}

export interface GameModeProps {
  type: GameType;
  mode: GameMode;
}

export const COLOR_NAMES = ["black", "green", "blue", "red", "orange"];
