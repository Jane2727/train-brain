import React from "react";

export interface TaskModel {
  id: string;
  firstSummand: number;
  firstSymbol: string;
  secondSummand: number;
  secondSymbol: string;
  thirdSummand: number;
}

export interface AnswerModel {
  [key: string]: { answer: string };
}

export interface InputModel {
  [key: string]: { answer: string; isCorrect?: boolean };
}

export interface InputControlProps<T> {
  type?: string;
  id: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: T;
  className?: string;
  isCorrect?: boolean;
}

export interface RenderTaskProps {
  task: TaskModel;
  inputValue?: string;
  handleInputChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => void;
}

export interface GenerateTasksParams {
  tasksQuantity: number;
  addTasks: (tasks: TaskModel[]) => void;
  addAnswers: (answers: AnswerModel) => void;
  addRandomMathSymbols: (randomMathSymbols: MathSymbolsMatrix) => void;
  isTrickyGameMode: boolean;
}

export interface GenerateWordsParams {
  wordsQuantity: number;
  addWords: (words: WordModel[]) => void;
}

export interface ColorSchemeToggleProps {
  isDark: boolean;
  setDarkTheme: (value: boolean) => void;
}

export interface ButtonControlProps {
  label: string;
  handleClick: () => void;
  isDisabled?: boolean;
  type?: "submit" | "reset" | "button";
  className?: string;
}

export interface CheckAnswersParams {
  studentAnswers: InputModel;
  listOfCorrectAnswers: AnswerModel;
}

export interface DialogProps {
  className?: string;
  title?: string;
  isOpened: boolean;
  handleCloseModal: () => void;
  children?: React.ReactNode;
}

export interface MathSymbolsMatrix {
  PLUS: string;
  MINUS: string;
  MULTIPLY: string;
}
export interface ResultsDialogProps {
  restartGame: () => void;
  answers: AnswerModel;
}

export interface WordModel {
  id: string;
  name: string;
  color: string;
}
