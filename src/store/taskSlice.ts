import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InputModel } from "../models";

export interface TaskState {
  inputValues: InputModel;
}

const initialState: TaskState = {
  inputValues: {},
};

export const taskR = createSlice({
  name: "taskValues",
  initialState,
  reducers: {
    setInputValues: (state, action: PayloadAction<InputModel>) => {
      state.inputValues = action.payload;
    },
  },
});

export const { setInputValues } = taskR.actions;

export default taskR.reducer;
