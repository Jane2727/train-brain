import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalPayload {
  id?: string;
  isOpen?: boolean;
}

export interface ModalState {
  isOpen: ModalPayload;
}

export const initialState: ModalState = {
  isOpen: {},
};

const modalR = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<ModalPayload>) => {
      const { id, isOpen } = action.payload;
      if (id) {
        state.isOpen[id as keyof ModalState] = isOpen;
      }
    },
  },
});

export const { setIsOpen } = modalR.actions;

export default modalR.reducer;
