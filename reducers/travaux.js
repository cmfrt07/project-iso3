import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { 
    travaux: null,
    cpt: 0,
  },
};

export const travauxSlice = createSlice({
  name: 'travaux',
  initialState,
  reducers: {
    setTravaux: (state, action) => {
      state.value.travaux = action.payload;
    },
    clearTravaux: (state, action) => {
      state.value.travaux = null;
    },
    setNewCpt: (state, action) => {
      state.value.cpt = state.value.cpt + 1;
    },
    clearCpt: (state, action) => {
      state.value.cpt = 0;
    },
  },
});

export const { setTravaux, clearTravaux, setNewCpt, clearCpt } = travauxSlice.actions;
export default travauxSlice.reducer;