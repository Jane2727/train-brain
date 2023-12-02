import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ModalState } from "./modalSlice";

// Task
const taskSelectDomain = (state: RootState) => state.task;
export const taskInputValues = createSelector(
  [taskSelectDomain],
  (m) => m.inputValues
);

// Modal
export const modalSelectDomain = (state: RootState) => state.modal;
const isOpenSelector = createSelector(
  [modalSelectDomain],
  (modal) => modal.isOpen
);

export const modalIsOpenSelector = createSelector(
  [isOpenSelector, (_state, id) => id],
  (isOpen, id) => isOpen[id as keyof ModalState]
);
